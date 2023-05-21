import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../../image/logo.png";
import otpVector from "../../../image/reset-p.png";

const ResetPassword = () => {
  return (
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
                />
              </div>
              <div className="form-group mb-4">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Confirm Password"
                />
              </div>
              <div className="form-group mb-4">
                <button type="button" className="themeBtn">
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
  );
};

export default ResetPassword;
