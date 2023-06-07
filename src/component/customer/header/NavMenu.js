import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import home from "../../../image/icon/home.svg";
import deal from "../../../image/icon/deal.svg";
import business from "../../../image/icon/business.svg";
import mydeal from "../../../image/icon/my-deal.svg";
import reviews from "../../../image/icon/review.svg";
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
import signout from "../../../image/icon/sign_out.svg";
import logo from "../../../image/logo.png";
import location from "../../../image/location-outline.png";

const NavMenu = () => {
  const [profileimage, setprofileimage] = useState("");
  const [PreviewImage, setPreviewImage] = useState("");

  const dispatch = useDispatch();
  const sidebarShow = useSelector((state) => state.sidebarShow);

  var DynmicClass = "";

  if (sidebarShow === true) {
    DynmicClass = "";
  }
  if (sidebarShow === false) {
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
    <div className="left-panel-sidebar">
        
   

  <div className="panel-logo">
    <div className="sidebar-logo">
    <img src={logo}  />
    <span> <img src={location}/> Bowie, MD, USA</span>
    </div>
    <button
      className="close-btn"
      onClick={() => dispatch({ type: "set", sidebarShow: !sidebarShow })}
    >
      <i class="fa-solid fa-xmark"></i>
    </button>
  </div>

  <div className="sidebar">
    <ul>
      <li>
        <NavLink
          to="/home"
          className={({ isActive }) => (isActive ? "active" : undefined)}
          onClick={() =>
            width
              ? dispatch({ type: "set", sidebarShow: !sidebarShow })
              : null
          }
        >
          <img src={home} alt="home" />
          Home
          <span>
            <i class="fa-solid fa-angle-right"></i>
          </span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/deal"
          className={({ isActive }) => (isActive ? "active" : undefined)}
          onClick={() =>
            width
              ? dispatch({ type: "set", sidebarShow: !sidebarShow })
              : null
          }
        >
          <img src={deal} alt="deal" />
          Deals
          <span>
            <i class="fa-solid fa-angle-right"></i>
          </span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/business"
          className={({ isActive }) => (isActive ? "active" : undefined)}
          onClick={() =>
            width
              ? dispatch({ type: "set", sidebarShow: !sidebarShow })
              : null
          }
        >
          <img src={business} alt="business" />
          Business
          <span>
            <i class="fa-solid fa-angle-right"></i>
          </span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/my-deal"
          className={({ isActive }) => (isActive ? "active" : undefined)}
          onClick={() =>
            width
              ? dispatch({ type: "set", sidebarShow: !sidebarShow })
              : null
          }
        >
          <img src={mydeal} alt="deal" />
          My Deals
          <span>
            <i class="fa-solid fa-angle-right"></i>
          </span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/customer-review-list"
          className={({ isActive }) => (isActive ? "active" : undefined)}
          onClick={() =>
            width
              ? dispatch({ type: "set", sidebarShow: !sidebarShow })
              : null
          }
        >
          <img src={reviews} alt="review" />
          My Reviews
          <span>
            <i class="fa-solid fa-angle-right"></i>
          </span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/my-checked-in"
          className={({ isActive }) => (isActive ? "active" : undefined)}
          onClick={() =>
            width
              ? dispatch({ type: "set", sidebarShow: !sidebarShow })
              : null
          }
        >
          <img src={Checkin} alt="checkin" />
          My Check-Ins
          <span>
            <i class="fa-solid fa-angle-right"></i>
          </span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/about-us"
          className={({ isActive }) => (isActive ? "active" : undefined)}
          onClick={() =>
            width
              ? dispatch({ type: "set", sidebarShow: !sidebarShow })
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
          to="/terms-condition"
          className={({ isActive }) => (isActive ? "active" : undefined)}
          onClick={() =>
            width
              ? dispatch({ type: "set", sidebarShow: !sidebarShow })
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
          to="/user-agreement"
          className={({ isActive }) => (isActive ? "active" : undefined)}
          onClick={() =>
            width
              ? dispatch({ type: "set", sidebarShow: !sidebarShow })
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
          to="/privacy-policy"
          className={({ isActive }) => (isActive ? "active" : undefined)}
          onClick={() =>
            width
              ? dispatch({ type: "set", sidebarShow: !sidebarShow })
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
          to="/contact-us"
          className={({ isActive }) => (isActive ? "active" : undefined)}
          onClick={() =>
            width
              ? dispatch({ type: "set", sidebarShow: !sidebarShow })
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
          to="/dashboard"
          className={({ isActive }) => (isActive ? "active" : undefined)}
          onClick={() =>
            width
              ? dispatch({ type: "set", sidebarShow: !sidebarShow })
              : null
          }
        >
          <img src={owner} alt="owner" />
          Business Owner Dashboard
          <span>
            <i class="fa-solid fa-angle-right"></i>
          </span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/update-profile"
          className={({ isActive }) => (isActive ? "active" : undefined)}
          onClick={() =>
            width
              ? dispatch({ type: "set", sidebarShow: !sidebarShow })
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
          to="/change-password"
          className={({ isActive }) => (isActive ? "active" : undefined)}
          onClick={() =>
            width
              ? dispatch({ type: "set", sidebarShow: !sidebarShow })
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
          to="/delete-account"
          className={({ isActive }) => (isActive ? "active" : undefined)}
          onClick={() =>
            width
              ? dispatch({ type: "set", sidebarShow: !sidebarShow })
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
              ? dispatch({ type: "set", sidebarShow: !sidebarShow })
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
</div>
  );
};

export default NavMenu;
