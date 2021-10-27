import firebase from "firebase"

const firebaseConfig = {
    apiKey: "AIzaSyDuD9HMhMcbhTs6ZJl79eDeHs9fUaOAu0A",
    authDomain: "snapchat-react-877a2.firebaseapp.com",
    projectId: "snapchat-react-877a2",
    storageBucket: "snapchat-react-877a2.appspot.com",
    messagingSenderId: "874457243760",
    appId: "1:874457243760:web:4bc51308120f72594f54b5"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const provider = new firebase.auth.GoogleAuthProvider();

export {db, auth, storage, provider};