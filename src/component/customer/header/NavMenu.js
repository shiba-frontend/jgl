import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import axios from 'axios';
import { toast } from 'react-toastify';
import { IMAGE } from "../../../common/Theme";
import Modal from 'react-bootstrap/Modal';

const NavMenu = () => {
const [isBusiness, setisBusiness] = useState(false)
const [show, setShow] = useState(false);
const [show1, setShow1] = useState(false);
const [loading, setloading] = useState(false)

let navigate = useNavigate();
const handleClose = () => setShow(false);
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
    toast.success(response.data.message);
    dispatch({ type: "setToken", accessToken: null })
    dispatch({ type: "set", sidebarShow: !sidebarShow })
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


  const NavigateControl = ()=>{
    setShow1(false)
    dispatch({ type: "set", sidebarShow: !sidebarShow })
    localStorage.setItem("role_id", "2")
    navigate("/dashboard", { replace: true});
  }

  return (
    <div className={`left-panel sidebar-fixed ${DynmicClass}`}>
    <div className="left-panel-sidebar">
        
   

  <div className="panel-logo">
    <div className="sidebar-logo">
    <img src={IMAGE.logo} alt="logo" />
    <span> <img src={IMAGE.location_icon}/> Bowie, MD, USA</span>
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
          <img src={IMAGE.home_icon} alt="home" />
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
          <img src={IMAGE.deal_icon} alt="deal" />
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
          <img src={IMAGE.business_icon_one} alt="business" />
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
          <img src={IMAGE.customer_icon} alt="deal" />
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
          <img src={IMAGE.review_icon} alt="review" />
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
          <img src={IMAGE.checkin_icon} alt="checkin" />
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
          <img src={IMAGE.about_icon} alt="about" />
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
          <img src={IMAGE.terms_icon} alt="terms" />
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
          <img src={IMAGE.agreement_icon} alt="agreement" />
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
          <img src={IMAGE.privacy_icon}  alt="privacy"/>
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
          <img src={IMAGE.contact_icon} alt="contact" />
          Contact Us
          <span>
            <i class="fa-solid fa-angle-right"></i>
          </span>
        </NavLink>
      </li>
      <li>
<button className="logoutBtnn" onClick={()=>setShow1(true)}>
<img src={IMAGE.home_icon} alt="contact" />
Business Panel
      <span>
        <i class="fa-solid fa-angle-right"></i>
      </span>
  </button>
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
          <img src={IMAGE.profile_icon} alt="profile" />
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
          <img src={IMAGE.password_icon} alt="lock" />
          Change Password
          <span>
            <i class="fa-solid fa-angle-right"></i>
          </span>
        </NavLink>
      </li>
     
      <li>
  <button className="logoutBtnn" onClick={()=>setShow(true)}>
    <img src={IMAGE.signout_icon} alt="signout" />
      Logout
      <span>
        <i class="fa-solid fa-angle-right"></i>
      </span>
  </button>

</li>
   
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

  <Modal show={show1} onHide={handleClose} centered size="sm" className='AlertMsg'>
    <Modal.Header>
      <Modal.Title><i class="fa-solid fa-triangle-exclamation"></i> Alert !</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      {isBusiness ===  true ? 
      <h4>You have no business! Please add your business first</h4>
      :
      <h4>Are You sure switch to business panel ?</h4>
}
      <ul>
      <li>
        <button onClick={()=>setShow1(false)} className='btn btn-md btn-danger'>
            No
        </button>
     
      </li>
      <li>
      {isBusiness ===  true ? 
      <NavLink
  to="/add-business"
  className='btn btn-md btn-success'
  onClick={() =>
    {
      setShow1(false)
   dispatch({ type: "set", sidebarShow: !sidebarShow })

    }
  }
>
 Add Business
</NavLink>
:

        <button onClick={NavigateControl} className='btn btn-md btn-success'>
            Yes
        </button>
}
      </li>
    </ul>

    </Modal.Body>
  
   
  </Modal>
</div>
  );
};

export default NavMenu;
