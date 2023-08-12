import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import './Login.css';
import { auth } from './firebase';
import { login } from './features/userSlice';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { connect } from 'react-redux';
import { signInAPI } from './app/actions';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';


// export function signInAPI() {
//     return (dispatch) => {
//     signInWithPopup(auth, provider)
//     .then((payload) => {
//         console.log(payload)
//     })
//     .catch(error => alert(error.message))
// } 
// }


function Login() {
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
    <div className='login'>
        <nav>
            <a href='/'>
             <img src='https://www.logo.wine/a/logo/LinkedIn/LinkedIn-Logo.wine.svg' alt=''/>
            </a>
                <div className='join'>
                <a className='j' href='/SignUp'>Join Now</a>
                <a  className="s" href='/Login'>Sign in</a>
                </div>
        </nav>
    <div className='login__field'>
        <div className='login__hero'>
        <h1 className='sign__professional'> Welcome to your professional community</h1>
        <form> 
        <label>Email or phone</label>
        <input
             value={email} 
             onChange={e => setEmail(e.target.value)}
             placeholder='Email' type='email'/>

        <label>Password</label>
        <input 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            placeholder='password' type='password'/>
             <p className='forgot__password'>Forgot Password?</p>

             <button type="submit" onClick={loginToApp}> Sign in</button>

             
             <p className='login__or'>  ----------------------------------   or   ---------------------------------- </p>

             <button className='button__options' onClick={() => Login()}> <img className='logo' src='https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg' alt=''/> Continue with Google</button>

             <button className='button__options__'> <a href='/SignUp'>  New to LinkedIn? Join now </a></button>
        </form>

        <img src='https://static.licdn.com/aero-v1/sc/h/dxf91zhqd2z6b0bwg85ktm5s4' alt=''/>
    {/* <form>
             <input 
             value={name} 
             onChange={e => setName(e.target.value)} 
             placeholder='Full Name' type='text'/> 

            <input 
            value={profile} 
            onChange={e => setProfile(e.target.value)} 
            type='text' placeholder='Profile picture'/>
        </form>
             <button className='button__options'> <img className='logo' src='https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' alt=''/> Sign in with Apple</button>

        <p className='login__p'> New to LinkedIn? {"  "} <span className='register' onClick={register}> Join now</span> </p> */}
        </div>

       
    </div>
    </div>
  )
}


// const mapStateToProps = (state) => {
//     return {};
// }

// const mapDispatchToProps = (dispatch) => ({
//     Login: () => dispatch(signInAPI()),
// })


export default Login;

