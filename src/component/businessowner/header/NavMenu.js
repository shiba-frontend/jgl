import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import home from "../../../image/icon/home.svg";
import deal from "../../../image/icon/deal.svg";
import business from "../../../image/icon/business.svg";
import addBusiness from "../../../image/headingicon/File_dock_add_fill.svg";
import customerIcon from "../../../image/icon/my-deal.svg";
import Checkin from "../../../image/icon/checkin.svg";
import about from "../../../image/icon/about.svg";
import terms from "../../../image/icon/terms.svg";
import Agreement from "../../../image/icon/agreement.svg";
import privacy from "../../../image/icon/privacy.svg";
import contact from "../../../image/icon/contact.svg";
import owner from "../../../image/icon/owner.svg";
import profile from "../../../image/icon/profile.svg";
import password from "../../../image/icon/password.svg";
import account from "../../../image/icon/delete-accoint.svg";
import analytics from "../../../image/icon/Chart_fill.svg";
import signout from "../../../image/icon/sign_out.svg";

const NavMenu = () => {


  const dispatch = useDispatch();
  const sidebarShowbusiness = useSelector((state) => state.sidebarShowbusiness);

  var DynmicClass = "";

  if (sidebarShowbusiness === true) {
    DynmicClass = "";
  }
  if (sidebarShowbusiness === false) {
    DynmicClass = "closes";
  }

  var width = window.innerWidth < 1920;

  // const HandleImage = (e) => {
  //   var file = e.target.files[0];
  //   setprofileimage(file);
  //   var reader = new FileReader();
  //   //var url = reader.readAsDataURL(file);
  //   reader.onloadend = function (e) {
  //     const fsize = file.size;
  //     const fileSize = Math.round(fsize / 1024);
  //     if (fileSize >= 800) {
  //       //notify();
  //     } else {
  //       var editImg = document.getElementById("editImg");
  //       editImg.src = reader.result;
  //     }

  //   };
  //   reader.readAsDataURL(file);
  // };

  return (
    <div className={`left-panel sidebar-fixed ${DynmicClass}`}>
      <div className="panel-logo">
        {/* <div className='profile-pic'>
            <img src="../images/profile-img.png" alt="profile" id="editImg" />
            <div className='file-upload'>
                <input type="file" accept="image/*" onChange={HandleImage} />
                <i class="fa-solid fa-camera"></i>
            </div>
          </div>
          <h5>John Miller</h5> */}
        <button
          className="close-btn"
          onClick={() => dispatch({ type: "setbusiness", sidebarShowbusiness: !sidebarShowbusiness })}
        >
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>

      <div className="sidebar">
        <ul>
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) => (isActive ? "active" : undefined)}
              onClick={() =>
                width
                  ? dispatch({ type: "setbusiness", sidebarShowbusiness: !sidebarShowbusiness })
                  : null
              }
            >
              <img src={owner} alt="home" />
              Business Owner Dashboard
              <span>
                <i class="fa-solid fa-angle-right"></i>
              </span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/business-listing"
              className={({ isActive }) => (isActive ? "active" : undefined)}
              onClick={() =>
                width
                  ? dispatch({ type: "setbusiness", sidebarShowbusiness: !sidebarShowbusiness })
                  : null
              }
            >
              <img src={addBusiness} alt="deal" />
              Add Business Listing
              <span>
                <i class="fa-solid fa-angle-right"></i>
              </span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/deal-listing"
              className={({ isActive }) => (isActive ? "active" : undefined)}
              onClick={() =>
                width
                  ? dispatch({ type: "setbusiness", sidebarShowbusiness: !sidebarShowbusiness })
                  : null
              }
            >
              <img src={business} alt="business" />
              My Deals
              <span>
                <i class="fa-solid fa-angle-right"></i>
              </span>
            </NavLink>
          </li>
          
          <li>
            <NavLink
              to="/review-list"
              className={({ isActive }) => (isActive ? "active" : undefined)}
              onClick={() =>
                width
                  ? dispatch({ type: "setbusiness", sidebarShowbusiness: !sidebarShowbusiness })
                  : null
              }
            >
              <img src={deal} alt="review" />
              My Reviews
              <span>
                <i class="fa-solid fa-angle-right"></i>
              </span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/customer-list"
              className={({ isActive }) => (isActive ? "active" : undefined)}
              onClick={() =>
                width
                  ? dispatch({ type: "setbusiness", sidebarShowbusiness: !sidebarShowbusiness })
                  : null
              }
            >
              <img src={customerIcon} alt="checkin" />
              Customers
              <span>
                <i class="fa-solid fa-angle-right"></i>
              </span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/my-order"
              className={({ isActive }) => (isActive ? "active" : undefined)}
              onClick={() =>
                width
                  ? dispatch({ type: "setbusiness", sidebarShowbusiness: !sidebarShowbusiness })
                  : null
              }
            >
              <img src={Checkin} alt="checkin" />
              Order History
              <span>
                <i class="fa-solid fa-angle-right"></i>
              </span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/analytics"
              className={({ isActive }) => (isActive ? "active" : undefined)}
              onClick={() =>
                width
                  ? dispatch({ type: "setbusiness", sidebarShowbusiness: !sidebarShowbusiness })
                  : null
              }
            >
              <img src={analytics} alt="checkin" />
              Analytics
              <span>
                <i class="fa-solid fa-angle-right"></i>
              </span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/business-about-us"
              className={({ isActive }) => (isActive ? "active" : undefined)}
              onClick={() =>
                width
                  ? dispatch({ type: "setbusiness", sidebarShowbusiness: !sidebarShowbusiness })
                  : null
              }
            >
              <img src={about} alt="about" />
              About Us
              <span>
                <i class="fa-solid fa-angle-right"></i>
              </span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/business-terms-condition"
              className={({ isActive }) => (isActive ? "active" : undefined)}
              onClick={() =>
                width
                  ? dispatch({ type: "setbusiness", sidebarShowbusiness: !sidebarShowbusiness })
                  : null
              }
            >
              <img src={terms} alt="terms" />
              Terms of Use
              <span>
                <i class="fa-solid fa-angle-right"></i>
              </span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/business-user-agreement"
              className={({ isActive }) => (isActive ? "active" : undefined)}
              onClick={() =>
                width
                  ? dispatch({ type: "setbusiness", sidebarShowbusiness: !sidebarShowbusiness })
                  : null
              }
            >
              <img src={Agreement} alt="agreement" />
              User Agreement
              <span>
                <i class="fa-solid fa-angle-right"></i>
              </span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/business-privacy-policy"
              className={({ isActive }) => (isActive ? "active" : undefined)}
              onClick={() =>
                width
                  ? dispatch({ type: "setbusiness", sidebarShowbusiness: !sidebarShowbusiness })
                  : null
              }
            >
              <img src={privacy}  alt="privacy"/>
              Privacy Policy
              <span>
                <i class="fa-solid fa-angle-right"></i>
              </span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/business-contact-us"
              className={({ isActive }) => (isActive ? "active" : undefined)}
              onClick={() =>
                width
                  ? dispatch({ type: "setbusiness", sidebarShowbusiness: !sidebarShowbusiness })
                  : null
              }
            >
              <img src={contact} alt="contact" />
              Contact Us
              <span>
                <i class="fa-solid fa-angle-right"></i>
              </span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/home"
              className={({ isActive }) => (isActive ? "active" : undefined)}
              onClick={() =>
                width
                  ? dispatch({ type: "setbusiness", sidebarShowbusiness: !sidebarShowbusiness })
                  : null
              }
            >
              <img src={home} alt="contact" />
              Customer Home
              <span>
                <i class="fa-solid fa-angle-right"></i>
              </span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/business-update-profile"
              className={({ isActive }) => (isActive ? "active" : undefined)}
              onClick={() =>
                width
                  ? dispatch({ type: "setbusiness", sidebarShowbusiness: !sidebarShowbusiness })
                  : null
              }
            >
              <img src={profile} alt="profile" />
              Update Profile
              <span>
                <i class="fa-solid fa-angle-right"></i>
              </span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/business-change-password"
              className={({ isActive }) => (isActive ? "active" : undefined)}
              onClick={() =>
                width
                  ? dispatch({ type: "setbusiness", sidebarShowbusiness: !sidebarShowbusiness })
                  : null
              }
            >
              <img src={password} alt="lock" />
              Change Password
              <span>
                <i class="fa-solid fa-angle-right"></i>
              </span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/business-delete-account"
              className={({ isActive }) => (isActive ? "active" : undefined)}
              onClick={() =>
                width
                  ? dispatch({ type: "setbusiness", sidebarShowbusiness: !sidebarShowbusiness })
                  : null
              }
            >
              <img src={account} alt="account" />
              Delete Account
              <span>
                <i class="fa-solid fa-angle-right"></i>
              </span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active" : undefined)}
              onClick={() =>
                width
                  ? dispatch({ type: "setbusiness", sidebarShowbusiness: !sidebarShowbusiness })
                  : null
              }
            >
              <img src={signout} alt="signout" />
              Logout
              <span>
                <i class="fa-solid fa-angle-right"></i>
              </span>
            </NavLink>
          </li>
       
        </ul>
      </div>
    </div>
  );
};

export default NavMenu;
