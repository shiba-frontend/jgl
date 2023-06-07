import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import logo from "../../image/logo.png";
import forgotVector from "../../image/forgot-vector.png";
import { toast } from 'react-toastify';
import CustomLoader from '../../common/CustomLoader';
import axios, * as others from 'axios';


const ForgotPassword = () => {
  const [email, setemail] = useState("");
  const [loading, setloading] = useState(false)

  let navigate = useNavigate();

const VerifyOtp = async () =>{
  
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  if (reg.test(email) === false) {
   toast.error('Email should be proper!');
   } else {
    setloading(true)
    let body = {
      "key":"facb6e0a6fcbe200dca2fb60dec75be7",
      "source":"WEB",
      "email":email
  }
    
await axios.post("/forgot-password", JSON.stringify(body))
.then((response) => {
    setloading(false)
  if(response.data.success){
    toast.success(response.data.message);
    setTimeout(()=>{
      navigate('/otp',{state:{userId:response.data.data.user_id}});
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
            <div className='row'>
            <div className='col-lg-5'>
            <div className='vector-img'>
              <img src={forgotVector}  alt="forgot" />
            </div>
            </div>
            <div className='col-lg-7'>
            <div className='comon-white'>
            <h3>Forget Password?</h3>
      
            <div className='form-group mb-5'>
              <input type="email" className='form-control' placeholder='Enter your Email'
              value={email}
              onChange={(e)=>setemail(e.target.value)}
              />
            </div>
            <div className='form-group'>
                <button type='button' className='themeBtn' onClick={VerifyOtp}>Submit</button>
            </div>
            
          </div>
              </div>
          
           
        </div>
        </div>
        </div>
     </>
  )
}

export default ForgotPassword