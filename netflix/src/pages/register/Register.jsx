import {React, useState, useRef} from 'react';
import './register.scss';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [username, setusername] = useState("");
    const axiosInstance = axios.create({baseURL:process.env.REACT_APP_API_URL});
    const usernameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate()
    const handleStart = ()=>{
     setemail(emailRef.current.value)
     setusername(emailRef.current.value.split('@')[0])
    }
    
    const handleFinish = async(e)=>{
     e.preventDefault();
     setpassword(passwordRef.current.value)
     
     try {
       await axiosInstance.post('/auth/register',{email,username,password:passwordRef.current.value});
       navigate('/login')
     } catch (error) {
      console.log(error);
     }
    }
  return (
    <div className='register'>
       <div className="top">
        <div className="wrapper">
        <img src="/images/logo.svg" alt="" className='logo' />
        <Link to='/login' className='link' style={{cursor : 'pointer',zIndex:20,position:'relative'}}>
        <button className='loginButton'>Sign In</button>
        </Link>
       </div>
       </div>
       <div className="container">
        <h1>Unlimited movies, TV shows,and more</h1>
        <h2>Watch  anywhere. Cancel anytime.</h2>
        <p>Ready to watch? Enter your email to create  or restart your membership</p>
        {!email ? (<div className="input">
            <input type="email" placeholder='Email Address' ref={emailRef}/>
            <button className="registerButton" onClick={handleStart}>Get Started</button>
        </div> ): 
        (<form className="input">
            <input type="password" placeholder='Password' ref={passwordRef}/>
            {/* <input type="text" placeholder='Username' ref={usernameRef}/> */}
            <button className="registerButton" onClick={handleFinish}>Start</button>
        </form>)}
        
       </div>
    </div>
  );
}

export default Register;
