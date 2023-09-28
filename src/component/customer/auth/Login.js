import React, { useEffect, useState } from 'react'
import { NavLink , useNavigate} from 'react-router-dom'
import logo from "../../../image/logo.png";
import loginVector from "../../../image/login-vector.png";
import axios, * as others from 'axios';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from "react-redux";
import CustomLoader from '../../../common/CustomLoader';


const Login = () => {
const [email, setemail] = useState('')
const [password, setpassword] = useState('')
const [loading, setloading] = useState(false)
let navigate = useNavigate();
const dispatch = useDispatch();


const LoginHandler = async () =>{
  

    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

   if (reg.test(email) === false) {
    toast.error('Email should be proper!');
    } else if(password === ''){
        toast.error('Password is required');
    } else {
        setloading(true)
        let body = {
            "key":"facb6e0a6fcbe200dca2fb60dec75be7",
            "source":"WEB",
            "email":email,
            "password":password,
            "device_type":"",
            "device_token":"",
        }

        await axios.post("/signinweb", JSON.stringify(body))
        .then((response) => {
            setloading(false)
          if(response.data.success){
            toast.success(response.data.message);
            var Token = response.data.data.app_access_token
            var RoleId = response.data.data.user_role
            dispatch({ type: "setToken", accessToken: Token })
            localStorage.setItem("accessToken", Token);
            localStorage.setItem("role_id", RoleId);
            // if(RoleId == "5"){
            //     navigate("/home", { replace: true });
            // } else {
            //     navigate("/dashboard", { replace: true });
            // }
          }
        })
        .catch((error) => {
            setloading(false)
            if(error.response.status === 404){
                toast.error(error.response.data.message);
            }
        });
    }


}


  return (
    <>
   {loading && <CustomLoader/>}
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
            <h3>Login</h3>
            <div className='form-group'>
                <input type="text" className='form-control' 
                placeholder='Enter Your Email'
                value={email}
                onChange={(e)=>setemail(e.target.value)}
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
                <NavLink to="/forgot-password" className="theme-color">Forgot Password?</NavLink>
            </div>
            <div className='form-group  mt-3'>
               <h5>Skip Login ? <NavLink to="/home">Click here. <i className="fa-solid fa-arrow-right"></i></NavLink></h5>
            </div>
            <div className='form-group mb-4 mt-2'>
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
    </>
  )
}

export default Login