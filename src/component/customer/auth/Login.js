import React, { useEffect, useState } from 'react'
import { NavLink , useNavigate} from 'react-router-dom'
import logo from "../../../image/logo.png";
import loginVector from "../../../image/login-vector.png";
import axios, * as others from 'axios';
import {ApiConnection, CommonapiBody} from '../../../common/ApiConnection';
import CustomLoader from '../../../common/CustomLoader';


const Login = () => {
const [username, setusername] = useState('')
const [password, setpassword] = useState('')
const [usernamechecking, setusernamechecking] = useState(false)

let navigate = useNavigate();
let obj = CommonapiBody();


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

useEffect(()=>{
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({
      "key": "facb6e0a6fcbe200dca2fb60dec75be7",
      "source": "WEB"
    });
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch("https://itiffyconsultants.com/JUST-GO-LIVE/api/faq", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
},[])



const LoginHandler = async () =>{


    var body = {
        "key":obj.key,
        "source":obj.source,
        "email": username,
        "password": password
    }

   



    console.log(body)

    // try{
    //     const response = await ApiConnection.post("/signin", body)
    //     console.log("response", response);
    // } catch(error){
        
    // }




    // navigate("/home")








}


  return (
    <>
    {/* <CustomLoader/> */}
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
                <NavLink to="/forgot-password" className="theme-color">Forgot Password?</NavLink>
            </div>
            <div className='form-group mb-4 mt-3'>
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