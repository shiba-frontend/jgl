import React, { useState } from 'react'
import { NavLink , useNavigate} from 'react-router-dom'
import logo from "../../../image/logo.png";
import loginVector from "../../../image/login-vector.png";


const Login = () => {
const [username, setusername] = useState('')
const [password, setpassword] = useState('')
const [usernamechecking, setusernamechecking] = useState(false)

let navigate = useNavigate();

const InputHandling = (e)=>{
    var U_name = e.target.value
    setusername(U_name)
    if(U_name !== ''){
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(U_name) === false) {
        setusernamechecking(false)
      return false;
    } 
    else{
        setusernamechecking(true)
    }
    }else {
        setusernamechecking(false)
    }
}

const LoginHandler = () =>{
    navigate("/news-category")
}


  return (
    <div className='comon-bg'>
        <div className='container'>
        <div className='comon-logo'>
        <img src={logo} alt="logo" />
        </div>
        <div className='row'>
            <div className='col-lg-5'>
            <div className='vector-img'>
         <img src={loginVector} alt='vector'/>
        </div>
            </div>
            <div className='col-lg-7'>
            <div className='comon-white'>
            <h3>Newspaper Admin Login</h3>
            <div className='form-group'>
                <input type="text" className='form-control' 
                placeholder='Enter Your Email'
                value={username}
                onChange={(e)=>InputHandling(e)}
                />
               
            </div>
            <div className='form-group mb-1'>
                <input className="form-control"
                placeholder='Password'
                type="password"
                value={password}
                onChange={(e)=>setpassword(e.target.value)}
                />
                
            </div>
            <div className='form-group text-right'>
                <NavLink to="/newspaper-forgot-password" className="theme-color">Forgot Password?</NavLink>
            </div>
            <div className='form-group'>
               <h5>New User ? <NavLink to="/sign-up">Signup here. <i className="fa-solid fa-arrow-right"></i></NavLink></h5>
            </div>
            <div className='form-group'>
                <button type='button' className='themeBtn' onClick={LoginHandler}>LOGIN</button>
            </div>
            
         </div>
            </div>
        </div>
        
        
         </div>
    </div>
  )
}

export default Login