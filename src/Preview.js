import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { v4 as uuid } from 'uuid'
import firebase from 'firebase'
import { resetCameraImage, selectCameraImage } from './features/cameraSlice'
import { db, storage } from './firebase'
import { selectUser } from './features/appSlice'
import './Preview.css'


// Material Icons
import CloseIcon from '@material-ui/icons/Close';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import CreateIcon from '@material-ui/icons/Create';
import NoteIcon from '@material-ui/icons/Note';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import CropIcon from '@material-ui/icons/Crop';
import TimerIcon from '@material-ui/icons/Timer';
import SendIcon from '@material-ui/icons/Send';


function Preview() {
    const cameraImage = useSelector(selectCameraImage)
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector(selectUser);

    useEffect(() => {
        if (!cameraImage) {
            history.replace('/')
        }
    }, [cameraImage, history])

    const closePreview = () => {
        dispatch(resetCameraImage());
    };

    const sendPost = () => {
        const id = uuid();
        const unploadTask = storage
            .ref(`posts/${id}`)
            .putString(cameraImage, 'data_url');

        unploadTask.on('state_changed', null, (error) => {
            console.log(error);
        }, () => {
            storage
                .ref('posts')
                .child(id)
                .getDownloadURL()
                .then((url) => {
                    db.collection('posts').add({
                        imageUrl: url,
                        username: user.username,
                        read: false,
                        profilePic: user.profilePic,
                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    });
                    history.replace('/chats');
                });
        });
    };

    return (

        <div className="preview" >

            <CloseIcon
                onClick={closePreview}
                className='preview__close'
            />

            <div className="preview__toolbarRight">
                <TextFieldsIcon />
                <CreateIcon />
                <NoteIcon />
                <MusicNoteIcon />
                <AttachFileIcon />
                <CropIcon />
                <TimerIcon />
            </div>

            <img src={cameraImage} alt="" />

            <div onClick={sendPost} className="preview__footer">
                <h2>Send Now</h2>

                <SendIcon
                    fontSize='small'
                    className="preview__sendIcon"
                />
            </div>

        </div>
    )
}

export default Preview
