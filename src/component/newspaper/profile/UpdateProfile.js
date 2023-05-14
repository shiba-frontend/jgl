import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../../image/logo.png";
import AfterLoginTopbar from "../header/AfterLoginTopbar";


const UpdateProfile = () => {
  return (
    <>
    <AfterLoginTopbar/>
    <div className="comon-bg">
      <div className="container">
        
        <div className="comon-white">
          <h3>Update Profile</h3>
          <div className="row">
            <div className="col-12 col-lg-4 col-md-6">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="First Name"
                />
              </div>
            </div>
            <div className="col-12 col-lg-4 col-md-6">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Last Name"
                />
              </div>
            </div>
            <div className="col-12 col-lg-4 col-md-6">
              <div className="form-group">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                />
              </div>
            </div>
            <div className="col-12 col-lg-4 col-md-6">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Phone"
                />
              </div>
            </div>
            <div className="col-12 col-lg-4 col-md-6">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Address"
                />
              </div>
            </div>
           
          </div>

          <div className="row">
            <div className="col-12 col-lg-12 col-md-12">
              <div className="form-group mt-4">
                <button className="themeBtn">Update Profile</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default UpdateProfile;
