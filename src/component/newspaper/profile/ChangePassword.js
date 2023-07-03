import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AfterLoginTopbar from "../header/AfterLoginTopbar";
import CustomLoader from '../../../common/CustomLoader';
import axios from 'axios';
import { toast } from 'react-toastify';
import { IMAGE } from "../../../common/Theme";

const ChangePassword = () => {

  const [oldpassword, setoldpassword] = useState("");
  const [password, setpassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");
  const [loading, setloading] = useState(false)

  const token = localStorage.getItem('accessToken');
  let navigate = useNavigate();
  
  const SubmitHandler = async ()=>{
    if (oldpassword == '' ){
      toast.error('Old Password is required');
    }else if (password == '' ){
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
            "app_access_token":token&&token,
            "old_password":oldpassword,
            "new_password":password,
            "confirm_password":confirmpassword
        }
    

await axios.post("/change-password", JSON.stringify(body))
.then((response) => {
    setloading(false)
  if(response.data.success){
    toast.success(response.data.message);
    setTimeout(()=>{
      navigate('/login-newspaper');
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
    <AfterLoginTopbar/>
    <div className="comon-bg">
    <div className="container">

      <div className="row">
        <div className="col-lg-5">
          <div className="vector-img">
              <img src={IMAGE.password_img}  alt="forgot" />
          </div>
        </div>
        <div className="col-lg-7">
          <div className="comon-white">
            <h3>Change Password</h3>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Existing Password"
                value={oldpassword}
                onChange={(e)=>setoldpassword(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="New Password"
                value={password}
                onChange={(e)=>setpassword(e.target.value)}
              />
            </div>
            <div className="form-group mb-4">
              <input
                type="password"
                className="form-control"
                placeholder="Confirm Password"
                value={confirmpassword}
                onChange={(e)=>setconfirmpassword(e.target.value)}
              />
            </div>
            <div className="form-group">
              <button type="button" className="themeBtn" onClick={SubmitHandler}>
                Update Password
              </button>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  </div>
  </>
  )
}

export default ChangePassword