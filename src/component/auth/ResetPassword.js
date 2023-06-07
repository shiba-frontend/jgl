import React, { useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import logo from "../../image/logo.png";
import otpVector from "../../image/reset-p.png";
import axios from "axios";
import { toast } from 'react-toastify';
import CustomLoader from '../../common/CustomLoader';

const ResetPassword = () => {

  const [password, setpassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");
  const [loading, setloading] = useState(false);


  let navigate = useNavigate();
  const userId = useLocation();
  var UserId = userId.state && userId.state.userId


  const SubmitHandler = async ()=>{
    if(password === ''){
      toast.error("Password is mandatory");
    } else if (confirmpassword === ''){
      toast.error("Confirm password is mandatory");
    } else if(confirmpassword !== password ){
      toast.error("Confirm password does not match with password");
    } else {

      setloading(true)
      let body = {
        "key":"facb6e0a6fcbe200dca2fb60dec75be7",
        "source":"WEB",
        "user_id":UserId && UserId,
        "password":password,
        "confirm_password":confirmpassword
    }

    await axios.post("/reset-password", JSON.stringify(body))
    .then((response) => {
      setloading(false)
    if(response.data.success){
      toast.success(response.data.message);
      setTimeout(()=>{
        navigate("/", { replace: true });
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
    <div className="comon-bg">
      <div className="container">
        <div className="comon-logo">
        <img src={logo} alt="logo" />
        </div>
        <div className="row">
          <div className="col-lg-5">
            <div className="vector-img">
            <img src={otpVector}  alt="forgot" />
            </div>
          </div>
          <div className="col-lg-7">
            <div className="comon-white">
              <h3>Reset Password</h3>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
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
              <div className="form-group mb-4">
                <button type="button" className="themeBtn" onClick={SubmitHandler}>
                  Reset
                </button>
              </div>
              <div className="form-group">
                <h5>
                  Back to login?{" "}
                  <NavLink to="/login-customer">
                    Click here. <i className="fa-solid fa-arrow-right"></i>
                  </NavLink>
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default ResetPassword;
