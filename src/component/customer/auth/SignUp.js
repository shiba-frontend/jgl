import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import logo from "../../../image/logo.png";
import { toast } from 'react-toastify';
import ApiConnection from '../../../common/ApiConnection';
import CustomLoader from '../../../common/CustomLoader';
import axios, * as others from 'axios';
//import { postApi } from '../../../common/ApiConnection';




const SignUp = () => {

const [fname, setfname] = useState("");
const [lname, setlname] = useState("");
const [email, setemail] = useState("");
const [phone, setphone] = useState("");
const [address, setaddress] = useState("");
const [password, setpassword] = useState("");
const [confirmpassword, setconfirmpassword] = useState("");

const SubmitHandler = async ()=>{
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

//    if (reg.test(email) === false) {
//     toast.error('Email should be proper!');
//     } else if (phone == ''){
//         toast.error('Phone is required');
//     } else if (password == '' ){
//         toast.error('Password is required');
//     } else if (confirmpassword == '' ){
//         toast.error('Confirm Password is required');
//     } else if (confirmpassword !== password){
//         toast.error('Confirm Password do not same as password');
//     }

    // else {
        // let body = {
        //     "key":"facb6e0a6fcbe200dca2fb60dec75be7",
        //     "source":"WEB",
        //     "role_id":"2",
        //     "first_name":fname,
        //     "last_name":lname,
        //     "email_id":email,
        //     "contact_no":phone,
        //     "password":password,
        //     "confirm_password":confirmpassword,
        //     "address":address,
        //     "city":"",
        //     "state":"",
        //     "country":"",
        //     "zipcode":"",
        //     "latitude":"",
        //     "longitude":""
        // }
        // try{
        //     const response = await ApiConnection.post("/signup", body)
        //     console.log(response);
        // } catch{

        // }
       
    // }



let body = {
  "key": "facb6e0a6fcbe200dca2fb60dec75be7",
  "source": "WEB",
  "role_id": "2",
  "first_name": "shibu",
  "last_name": "Sankar",
  "email_id": "test1@yopmail.com",
  "contact_no": "90513718",
  "password": "123456",
  "confirm_password": "123456",
  "address": "test",
  "city": "Bowie",
  "state": "MD",
  "country": "US",
  "zipcode": "20715",
  "latitude": "38.9760088",
  "longitude": "-76.74705809999999"
};

await axios.post("/signup", JSON.stringify(body))
.then((response) => {
  console.log(response.data);
})
.catch((error) => {
    console.log(error.response)
    if(error.response.status === 404){
        toast.error(error.response.data.message);
    }
    if(error.response.status === 401){
        
    } 
});

   
}


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
  )
}

export default SignUp