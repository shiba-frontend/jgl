import React, { useEffect, useState } from "react";
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
import axios from 'axios';
import { toast } from 'react-toastify';

const NavMenu = () => {
const [isBusiness, setisBusiness] = useState(false)

  const dispatch = useDispatch();
  const sidebarShow = useSelector((state) => state.sidebarShow);

  const token = localStorage.getItem('accessToken');

    const Getbusiness = async ()=>{
        let body = {
          "key":"facb6e0a6fcbe200dca2fb60dec75be7",
          "source":"WEB",
          "app_access_token":token&&token,
        }
    
      await axios.post("/check-business-added", JSON.stringify(body))
      .then((response) => {
        if(response.data.success){
          setisBusiness(true)
        } else {
          localStorage.setItem("business_id", response.data.data.business_id)
        }
     
      })
      .catch((error) => {
     
          if(error.response.status === 404){
              toast.error(error.response.data.message);
          }
          
      });
    
      }

      useEffect(()=>{
        Getbusiness()
      },[])



  var DynmicClass = "";

  if (sidebarShow === true) {
    DynmicClass = "";
  }
  if (sidebarShow === false) {
    DynmicClass = "closes";
  }

  var width = window.innerWidth < 1920;


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
      {isBusiness ===  true ? 

<li>
<NavLink
  to="/add-business"
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
         : 
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


    }
      
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
