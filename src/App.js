import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import WebcamCapture from './WebcamCapture';
import Preview from './Preview';
import Chats from './Chats';
import ChatView from './ChatView';
import { login, logout, selectUser } from './features/appSlice';
import { useDispatch, useSelector } from 'react-redux';
import Login from './Login';
import { useEffect } from 'react';
import { auth } from './firebase';

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            username: authUser.displayName,
            profilePic: authUser.photoURL,
            id: authUser.uid,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, []);

  return (
    <div className="app">
      <Router>

        {!user ? (
          <Login />
        ) : (

          <>
            <img
              className="app__logo"
              src="https://images.unsplash.com/photo-1611162617263-4ec3060a058e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=774&q=80"
              alt=""
            />

            <div className="app__body">
              <div className="app__bodyBackground">
                <Switch>

                  <Route path="/chats/view">
                    <ChatView />
                  </Route>

                  <Route path="/chats">
                    <Chats />
                  </Route>

                  <Route path="/preview">
                    <Preview />
                  </Route>

                  <Route exact path="/">
                    <WebcamCapture />
                  </Route>

                </Switch>
              </div>
            </div>
          </>
        )}

      </Router>
    </div>
  );
}

export default App;
