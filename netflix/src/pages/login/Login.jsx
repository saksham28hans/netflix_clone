import React, { useContext } from 'react';
import './login.scss';
import { useState } from 'react';
import { login } from '../../context/authContext/apiCalls';
import { AuthContext } from '../../context/authContext/AuthContext';
import { Link } from 'react-router-dom';


const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  // const [error, seterror] = useState(false);
  const {error,dispatch} = useContext(AuthContext);
  const handleClick = async(e)=>{
   e.preventDefault();
   
    login({email,password},dispatch);
  }
  return (
    <div className='login'>
       <div className="top">
        <div className="wrapper">
        <img src="/images/logo.svg" alt="" className='logo' />
       </div>
       </div>
       <div className="container">
        <form>
            <h1>Sign In</h1>
            <input type="email" placeholder='Email or Phone Number' onChange={(e)=>{setemail(e.target.value)}}/>
            <input type="password" placeholder='Password' onChange={(e)=>{setpassword(e.target.value)}}/>
            <button className="loginButton" onClick={handleClick}>Sign In</button>
            <span>
                New to Netflix ? <Link to='/register' style={{textDecoration:'none'}}><b>Sign up now.</b></Link>
            </span>
            {error && <small>
                <b>Invalid Credentials please try again</b>.
            </small>}
        </form>
       </div>
    </div>
  );
}

export default Login;
