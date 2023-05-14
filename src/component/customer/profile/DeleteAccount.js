import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../../image/logo.png";
import otpVector from "../../../image/change-password.png";
import AfterLoginTopbar from "../header/AfterLoginTopbar";

const DeleteAccount = () => {
  return (
    <>
    <AfterLoginTopbar/>
    <div className="comon-bg">
    <div className="container">
    <div className="comon-white delete-account">
          <h3>Delete Account</h3>
          <h5>Are you sure you want to delete your account? </h5>
          <p>If you delete the Account you will no longer be able to login to the account and all your data pertaining to your account will be lost. So please confirm whether you want to delete the account.</p>
         
          <ul className='s-btn'>
                        <li>
                        <button type="button" className="themeBtn">Delete</button>
                        </li>
                        <li>
                            <NavLink to="/home" className="themeBtnOutline">Cancel</NavLink>
                        </li>
                      </ul>
         
 
            
        </div>

    </div>
  </div>
  </>
  )
}

export default DeleteAccount