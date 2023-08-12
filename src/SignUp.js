
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import './signUp.css';
import { auth } from './firebase';
import { login } from './features/userSlice';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';



function SignUp() {
  const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [profile, setProfile] = useState("");
    const dispatch = useDispatch();

    const loginToApp = (e) => {
        e.preventDefault();

        signInWithEmailAndPassword(auth, email, password)
        .then((userAuth) => {
            dispatch(login({
                email: userAuth.user.email,
                uid: userAuth.user.uid, 
                displayName: userAuth.user.displayName,
                profile: userAuth.user.photoURL,
            })
            );
        }).catch(error => alert(error.message))
    };
    const register = () => {
        if(!email) {
            return alert("please enter your email!")
        }
        if (!password) {
            alert("Please enter a password!");
            return;
          }

        createUserWithEmailAndPassword(auth, email, password)
        .then((userAuth) => {
             const user = userAuth.user;
             updateProfile(user, {
                displayName: name,
                photoURL: profile,
              })
            .then(() => {
                dispatch(login({
                    email: userAuth.user.email,
                    uid: userAuth.user.uid, 
                    displayName: name,
                    photoUrl: profile,
                }));
            })
            .catch(error => alert(error.message));
        })
        .catch(error => alert(error.message));    
    };

  return (
    <div className='signUp'>
          <nav>
            <a href='/'>
             <img src='https://www.logo.wine/a/logo/LinkedIn/LinkedIn-Logo.wine.svg' alt=''/>
            </a>
        </nav>

    <div className='signUp__field'>
         <div className='signUp__hero'>
         <div className='signUp__header'>
            <h1> Make the most of your professional life. </h1>
         </div>
            <form>
            <label> Full Name.</label>
            <input 
             value={name} 
             onChange={e => setName(e.target.value)} 
             type='text'/> 

            <label> Profile picture Url.</label>
            <input 
            value={profile} 
            onChange={e => setProfile(e.target.value)} 
            type='text'/>
             
             <label> Email or Phone number</label>
            <input 
               value={email} 
               onChange={e => setEmail(e.target.value)}
                type='email'/>

            {/* <input type='text' placeholder='Profile picture'/> */}

            <label> Password (6+ characters)</label>
            <input
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            type='password'/>
        <span className='span1'> By clicking Agree & Join, you agree to the LinkedIn <span className='span2'>User <br/> Agreement, Privacy Policy </span> and <span className='span3'>Cookie Policy.</span></span>
       
        <button type="submit" onClick={register}> Agree & Join </button>
        


<p className='login__or'>  or  </p>

<button className='button__options__' onClick={() => SignUp()}> <img className='logo' src='https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg' alt=''/> Continue with Google</button>

<button className='button__options'> <a href='/'>  Already on LinkedIn? <span className='span3'> Sign In</span></a></button>
       
        </form>
         </div>
    </div>
    </div>
  )
}

export default SignUp