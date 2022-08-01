import React, { useState } from 'react'
import { getAuth, signInWithPopup, GoogleAuthProvider,signOut,createUserWithEmailAndPassword,signInWithEmailAndPassword   } from "firebase/auth";
import intalizeAuthentication from '../firebase/firebase.initaliz';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css'

const provider = new GoogleAuthProvider();
intalizeAuthentication();
const auth = getAuth();

const Login = () => {
  const [email, setEmail]= useState('');
  const [password, setPassword] = useState('');
  const [isLoogedIn, setIsLoogedIn] = useState(false);
  const [error, setError] = useState('');
  const [user, setUser] = useState({})

  getAuth();
  const handleGoogleSingIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const {displayName, email, photoUrl} = result.user;
        const loggedInUser = {
          name:displayName,
          email:email,
          photoUrl:photoUrl,
        }
        setUser(loggedInUser)
      console.log(user,token)
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const emai = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
    }   

    const handleGoogleSingOut = () => {
      const auth = getAuth();
    signOut(auth).then(() => {
      setUser({})
     }).catch((error) => {
       console.log(error)
     });
    }
    const auth = getAuth();
    const handleRegistration = (e) => {
        e.preventDefault();
       isLoogedIn ? processLogin(email,password) : createNewUser(email,password)
        // if (password.length > 6){
        //   setError('password must be at least 6 characters');
        //   return;
        // }
        
    }
     const createNewUser = (email,password) => {
      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
     })
     .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
 
           });
    }
    const processLogin = (e) =>{
      signInWithEmailAndPassword (auth, email, password)
      .then((userCredential) => {
        
        const user = userCredential.user;
        console.log("after login",user)
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });

    }
    const handleEmailChange= (e) =>{
     setEmail(e.target.value);
    }
    const handlePasswordChange = (e) =>{
      setPassword(e.target.value);     
    }
    const toggoLogin = (e) =>{
      setIsLoogedIn(e.target.checked)
    }
  return (
    <>
    <section className="From-container from " style={{hight:"1000px",width:"1000px", alignItem:"center", alignContent:"center"}}>
    <div className="container"> 
    <div className="row" style={{border:"3px solid white",borderRadius:"5px",boxShadow:"8px 8px 8px 8px",}}>
     <div className="col-1" style={{padding:"0"}}>
       <img src="https://i.ibb.co/gWF4gbc/typewriter-498204-1920.jpg"  alt="typewriter" style={{hight:"450px",width:"470px",margin:"0",padding:"0"}}/>
     </div>
     <div className="col-2 d-flex flex-column align-items-center justify-content-center" style={{hight:"500px",width:"500px"}}>
     {
      user.email && <>
        <h6><b className="text-primary">{user.name}</b> is LoggedIn.</h6>
      </>
      }
     <h1>Express</h1>
     <h5>{isLoogedIn ? "SingUp" : "SingIn"} into your account.</h5>
     <from onSubmit={handleRegistration}>
      <div className="">
         <div className="col-log-7">
           <input type="email" 
                  placeholder="Email" 
                  className="form-control my-3 p-2" 
                  onBlur={handleEmailChange}/>
         </div>
      </div>
      <div className="from-row">
      <div className="col-log-7">
        <input type="password" 
              placeholder="Password" 
              className="form-control my-3 p-2" 
              onBlur={handlePasswordChange}/>
      </div>
      </div>
      <input type="checkbox" onClick={toggoLogin} className="header-btn"/><p>{error}</p>
      <div className="from-row">
      <button type="submit" className="header-btn submit-btn">{isLoogedIn ? "SingUp" : "SingIn"}</button>
      <hr/>
         <div className="col-log-7">
         {
      user.email ? <button className="header-btn" onClick={handleGoogleSingOut}>Log Out Now</button> :
      <button className="header-btn"  onClick={handleGoogleSingIn}>Log In With Google</button>
     }
         </div>
      </div>
      <br/>
      <a href='#' style={{alignContent:"center"}}>Forget Password ?</a>
      <div className="social-media">
      </div>
     </from>
    </div>
    </div>
    </div>
    </section>
</>

  )
}

export default Login