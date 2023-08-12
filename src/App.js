import React, { useEffect } from 'react';
import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import Header from './Header';
import Sidebar from './Sidebar';
import Feed from './Feed';
import { login, logout, selectUser } from './features/userSlice';
import Login from './Login';
import SignUp from './SignUp'
import { auth } from './firebase';
import Widget from './Widget';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {
  const user = useSelector(selectUser)
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged(userAuth => {
      if(userAuth) {
        //user is logged in
        dispatch(login ({
          email: userAuth.email,
          uid:userAuth.uid,
          displayName: userAuth.displayName,
          photoUrl:userAuth.photoURL,
        }))
      } else {
        //user is logged out 
        dispatch(logout)
      }
    })
  }, []) 

  return (
    <div className="app">
      <Router>
      {!user ? (
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/SignUp" element={<SignUp />} /> 
          </Routes>
        ) : (
         <div className='container'>
   
            <Header/>
            <div className='app_body'> 
            <Sidebar/>
            <Feed/>
            <Widget/>
          </div>
         </div>
      )}
      </Router>
    </div>
  );
}

export default App;
