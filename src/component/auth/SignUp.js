import React, { useState } from 'react'
import { NavLink,useNavigate } from 'react-router-dom'
import logo from "../../image/logo.png";
import { toast } from 'react-toastify';
import CustomLoader from '../../common/CustomLoader';
import axios, * as others from 'axios';





const SignUp = () => {

const [fname, setfname] = useState("");
const [lname, setlname] = useState("");
const [email, setemail] = useState("");
const [phone, setphone] = useState("");
const [address, setaddress] = useState("");
const [password, setpassword] = useState("");
const [confirmpassword, setconfirmpassword] = useState("");
const [loading, setloading] = useState(false)
let navigate = useNavigate();


const SubmitHandler = async ()=>{
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

   if (reg.test(email) === false) {
    toast.error('Email should be proper!');
    } else if (phone == ''){
        toast.error('Phone is required');
    } else if (password == '' ){
        toast.error('Password is required');
    } else if (confirmpassword == '' ){
        toast.error('Confirm Password is required');
    } else if (confirmpassword !== password){
        toast.error('Confirm Password do not same as password');
    }

    else {

        setloading(true)

        let body = {
            "key":"facb6e0a6fcbe200dca2fb60dec75be7",
            "source":"WEB",
            "role_id":"5",
            "first_name":fname,
            "last_name":lname,
            "email_id":email,
            "contact_no":phone,
            "password":password,
            "confirm_password":confirmpassword,
            "address":address,
            "city":"",
            "state":"",
            "country":"",
            "zipcode":"",
            "latitude":"",
            "longitude":""
        }
    

await axios.post("/signup", JSON.stringify(body))
.then((response) => {
    setloading(false)
  if(response.data.success){
    toast.success(response.data.message);
    setTimeout(()=>{
        navigate('/signup-otp',{state:{userId:response.data.data.user_id}});
    },3000)
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
        <div className='comon-white'>
            <h3>Signup</h3>
            <div className='row'>
                <div className='col-12 col-lg-4 col-md-6'>
                <div className='form-group'>
                <input type='text'
                 className='form-control' placeholder='First Name'
                 value={fname}
                 onChange={(e)=>setfname(e.target.value)}
                 />
            </div>
                </div>
                <div className='col-12 col-lg-4 col-md-6'>
                <div className='form-group'>
                <input type='text' className='form-control' placeholder='Last Name'
                value={lname}
                onChange={(e)=>setlname(e.target.value)}
                />
            </div> 
                </div>
                <div className='col-12 col-lg-4 col-md-6'>
                <div className='form-group'>
                <input type='email' className='form-control' placeholder='Email'
                value={email}
                onChange={(e)=>setemail(e.target.value)}
                />
            </div>  
                </div>
                <div className='col-12 col-lg-4 col-md-6'>
                <div className='form-group'>
                <input type='text' className='form-control' placeholder='Phone' 
                maxLength="10"
                minLength="10"
                onKeyPress={(event) => {
                          if (!/[0-9]/.test(event.key)) {
                            event.preventDefault();
                          }
                        }}
                        value={phone}
                        onChange={(e)=>setphone(e.target.value)}    
                />
            </div> 
                </div>
                <div className='col-12 col-lg-4 col-md-6'>
                <div className='form-group'>
                <input type='text' className='form-control' placeholder='Address'
                value={address}
                onChange={(e)=>setaddress(e.target.value)}
                />
            </div> 
                </div>
                <div className='col-12 col-lg-4 col-md-6'>
                <div className='form-group'>
                <input type='password' className='form-control' placeholder='Password'
                value={password}
                onChange={(e)=>setpassword(e.target.value)}
                />
            </div>
                </div>
                <div className='col-12 col-lg-4 col-md-6'>
                <div className='form-group'>
                <input type='password' className='form-control' placeholder='Confirm Password'
                value={confirmpassword}
                onChange={(e)=>setconfirmpassword(e.target.value)}
                />
            </div> 
                </div>
                
            </div>
           
            <div className='row'>
            <div className='col-12 col-lg-12 col-md-12'>
                       
                       <div className='form-group mt-4 mb-4'>
                          <button className='themeBtn' onClick={SubmitHandler}>Signup</button>
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
    </>
  )
}

export default SignUp