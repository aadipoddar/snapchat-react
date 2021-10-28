import './Login.css'
import { Button } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { auth, provider } from './firebase'
import { login } from './features/appSlice';

function Login() {
    const dispatch = useDispatch();

    const signIn = () => {
        auth
            .signInWithPopup(provider)
            .then((result) => {
                dispatch(
                    login({
                        username: result.user.displayName,
                        profilePic: result.user.photoURL,
                        id: result.user.uid
                    })
                );
            }).catch(error => { alert(error.message) });
    };

    return (
        <div className="login">
            <div className="login__container">
                <img src='https://images.unsplash.com/photo-1611162617263-4ec3060a058e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=774&q=80' alt="" />

                <Button variant='outlined' onClick={signIn}>
                    Sign In
                </Button>
            </div>
        </div >
    )
}

export default Login
