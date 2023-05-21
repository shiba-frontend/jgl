import React from 'react'
import { NavLink } from 'react-router-dom'
import logo from "../../../image/logo.png";



const SignUp = () => {
  return (
    <div className='comon-bg'>
        <div className='container'>
        <div className='comon-logo'>
             <img src={logo} alt="logo" />
        </div>
        <div className='comon-white'>
            <h3>Signup</h3>
            <div className='row'>
                <div className='col-12 col-lg-4 col-md-6'>
                <div className='form-group'>
                <input type='text' className='form-control' placeholder='First Name'/>
            </div>
                </div>
                <div className='col-12 col-lg-4 col-md-6'>
                <div className='form-group'>
                <input type='text' className='form-control' placeholder='Last Name'/>
            </div> 
                </div>
                <div className='col-12 col-lg-4 col-md-6'>
                <div className='form-group'>
                <input type='email' className='form-control' placeholder='Email'/>
            </div>  
                </div>
                <div className='col-12 col-lg-4 col-md-6'>
                <div className='form-group'>
                <input type='text' className='form-control' placeholder='Phone'/>
            </div> 
                </div>
                <div className='col-12 col-lg-4 col-md-6'>
                <div className='form-group'>
                <input type='text' className='form-control' placeholder='Address'/>
            </div> 
                </div>
                <div className='col-12 col-lg-4 col-md-6'>
                <div className='form-group'>
                <input type='password' className='form-control' placeholder='Password'/>
            </div>
                </div>
                <div className='col-12 col-lg-4 col-md-6'>
                <div className='form-group'>
                <input type='password' className='form-control' placeholder='Confirm Password'/>
            </div> 
                </div>
                
            </div>
           
            <div className='row'>
            <div className='col-12 col-lg-12 col-md-12'>
                       
                       <div className='form-group mt-4 mb-4'>
                          <button className='themeBtn'>Signup</button>
                       </div> 
                           </div>
                           <div className='col-12 col-lg-12 col-md-12'>
                           <div className='form-group'>
                          <h5>Existing User? <NavLink to="/login-customer">Please Login here. <i className="fa-solid fa-arrow-right"></i></NavLink></h5>
                       </div>    
                           </div>
                           <div className='col-12 col-lg-12 col-md-12'>
                           <div className='form-group'>
                          <h5>Newspaper Admin? <NavLink to="/login-newspaper">Please Login here. <i className="fa-solid fa-arrow-right"></i></NavLink></h5>
                       </div>
                           </div>
            </div>
           
          
           
            
            
           
           
           
        </div>
    </div>
    </div>
  )
}

export default SignUp