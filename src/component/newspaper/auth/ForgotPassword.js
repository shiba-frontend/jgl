import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import logo from "../../../image/logo.png";
import forgotVector from "../../../image/forgot-vector.png";

const ForgotPassword = () => {
  let navigate = useNavigate();

const VerifyOtp = () =>{
  navigate("/newspaper-otp", { replace: true });
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
              <img src={forgotVector}  alt="forgot" />
            </div>
            </div>
            <div className='col-lg-7'>
            <div className='comon-white'>
            <h3>Forget Password?</h3>
      
            <div className='form-group mb-4'>
              <input type="email" className='form-control' placeholder='Enter your Email'/>
            </div>
            <div className='form-group'>
                <button type='button' className='themeBtn' onClick={VerifyOtp}>Submit</button>
            </div>
            
          </div>
              </div>
          
           
        </div>
        </div>
        </div>
  )
}

export default ForgotPassword