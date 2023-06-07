import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../../image/logo.png";
import otpVector from "../../../image/change-password.png";
import AfterLoginTopbar from "../header/AfterLoginTopbar";

const ChangePassword = () => {
  return (
    <>
    <AfterLoginTopbar/>
    <div className="comon-bg">
    <div className="container">
     
      <div className="row">
        <div className="col-lg-5">
          <div className="vector-img">
              <img src={otpVector}  alt="forgot" />
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
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="New Password"
              />
            </div>
            <div className="form-group mb-4">
              <input
                type="password"
                className="form-control"
                placeholder="Confirm Password"
              />
            </div>
            <div className="form-group">
              <button type="button" className="themeBtn">
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