import React, { useState,useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import CustomLoader from '../../../common/CustomLoader';
import axios from 'axios';
import { IMAGE } from "../../../common/Theme";

const NavMenu = () => {
  const [show, setShow] = useState(false);
  const [loading, setloading] = useState(false)
  const [isBusiness, setisBusiness] = useState(false)
  let navigate = useNavigate();
  const handleClose = () => setShow(false);
  const token = localStorage.getItem('accessToken');

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

  const LogoutHandling = async ()=>{
    setloading(true)

    let body = {
      "key":"facb6e0a6fcbe200dca2fb60dec75be7",
      "source":"WEB",
      "app_access_token":token
  }
  await axios.post("/sign-out", JSON.stringify(body))
  .then((response) => {
    setloading(false)
  if(response.data.success){
    setShow(false)
    dispatch({ type: "setnews", sidebarShowbusiness: !sidebarShowbusiness })
    toast.success(response.data.message);
    dispatch({ type: "setToken", accessToken: null })
    localStorage.clear();
    setTimeout(()=>{
      navigate("/", { replace: true });
    },2000)
  }
})
.catch((error) => {
  setloading(false)
    if(error.response.status === 404){
        toast.error(error.response.data.message);
    }
});
  }

  return (
    <>
     {loading && <CustomLoader/>}
    <div className={`left-panel sidebar-fixed ${DynmicClass}`}>
       <div className="left-panel-sidebar">
      <div className="panel-logo">
      <button className='logoutBtn' onClick={()=>setShow(true)}>
                <i className="fa-solid fa-arrow-right-from-bracket"></i> Logout
      </button>
      <div className="sidebar-logo">
    <img src={IMAGE.logo}  />
    <span> <img src={IMAGE.location_icon}/> Bowie, MD, USA</span>
    </div>
        <button
          className="close-btn"
          onClick={() => dispatch({ type: "setbusiness", sidebarShowbusiness: !sidebarShowbusiness })}
        >
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>

      <div className="sidebar">
        <ul>
          {!isBusiness &&
    
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
              <img src={IMAGE.owner_icon} alt="home" />
              Business Owner Dashboard
              <span>
                <i class="fa-solid fa-angle-right"></i>
              </span>
            </NavLink>
          </li>
}
{!isBusiness &&
    
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
              <img src={IMAGE.business_icon} alt="deal" />
             Business Listing
              <span>
                <i class="fa-solid fa-angle-right"></i>
              </span>
            </NavLink>
          </li>
}
{!isBusiness &&
    
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
              <img src={IMAGE.business_icon_one} alt="business" />
              My Deals
              <span>
                <i class="fa-solid fa-angle-right"></i>
              </span>
            </NavLink>
          </li>
}
{!isBusiness &&
    
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
              <img src={IMAGE.deal_icon} alt="review" />
              My Reviews
              <span>
                <i class="fa-solid fa-angle-right"></i>
              </span>
            </NavLink>
          </li>
}
{!isBusiness &&
    
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
              <img src={IMAGE.customer_icon} alt="checkin" />
              Customers
              <span>
                <i class="fa-solid fa-angle-right"></i>
              </span>
            </NavLink>
          </li>
}
{!isBusiness &&
    
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
              <img src={IMAGE.checkin_icon} alt="checkin" />
              Order History
              <span>
                <i class="fa-solid fa-angle-right"></i>
              </span>
            </NavLink>
          </li>
}
{!isBusiness &&
    
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
              <img src={IMAGE.analytics_icon} alt="checkin" />
              Analytics
              <span>
                <i class="fa-solid fa-angle-right"></i>
              </span>
            </NavLink>
          </li>
}
{!isBusiness &&
    
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
              <img src={IMAGE.about_icon} alt="about" />
              About Us
              <span>
                <i class="fa-solid fa-angle-right"></i>
              </span>
            </NavLink>
          </li>
}
{!isBusiness &&
    
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
              <img src={IMAGE.terms_icon} alt="terms" />
              Terms of Use
              <span>
                <i class="fa-solid fa-angle-right"></i>
              </span>
            </NavLink>
          </li>
}
{!isBusiness &&
    
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
              <img src={IMAGE.agreement_icon} alt="agreement" />
              User Agreement
              <span>
                <i class="fa-solid fa-angle-right"></i>
              </span>
            </NavLink>
          </li>
}
{!isBusiness &&
    
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
              <img src={IMAGE.privacy_icon}  alt="privacy"/>
              Privacy Policy
              <span>
                <i class="fa-solid fa-angle-right"></i>
              </span>
            </NavLink>
          </li>
}
{!isBusiness &&
    
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
              <img src={IMAGE.contact_icon} alt="contact" />
              Contact Us
              <span>
                <i class="fa-solid fa-angle-right"></i>
              </span>
            </NavLink>
          </li>
}

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
              <img src={IMAGE.home_icon} alt="contact" />
              Customer Home
              <span>
                <i class="fa-solid fa-angle-right"></i>
              </span>
            </NavLink>
          </li>
          {!isBusiness &&
    
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
              <img src={IMAGE.profile_icon} alt="profile" />
              Update Profile
              <span>
                <i class="fa-solid fa-angle-right"></i>
              </span>
            </NavLink>
          </li>
}
{!isBusiness &&
    
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
              <img src={IMAGE.password_icon} alt="lock" />
              Change Password
              <span>
                <i class="fa-solid fa-angle-right"></i>
              </span>
            </NavLink>
          </li>
}
{!isBusiness &&
    
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
              <img src={IMAGE.delete_icon} alt="account" />
              Delete Account
              <span>
                <i class="fa-solid fa-angle-right"></i>
              </span>
            </NavLink>
          </li>
}
       
        </ul>
      </div>
    </div>
    <Modal show={show} onHide={handleClose} centered size="sm" className='AlertMsg'>
    <Modal.Header>
      <Modal.Title><i class="fa-solid fa-triangle-exclamation"></i> Alert !</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <h4>Are You sure log out ?</h4>
      <ul>
      <li>
        <button onClick={handleClose} className='btn btn-md btn-danger'>
            No
        </button>
     
      </li>
      <li>
      <button onClick={LogoutHandling} className='btn btn-md btn-success'>
            Yes
        </button>
    
      </li>
    </ul>

    </Modal.Body>
  
   
  </Modal>
    </div>
    </>
  );
};

export default NavMenu;
