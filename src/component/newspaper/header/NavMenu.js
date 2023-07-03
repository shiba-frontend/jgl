import React, { useEffect, useState } from "react";
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
  let navigate = useNavigate();
  const handleClose = () => setShow(false);
  const token = localStorage.getItem('accessToken');

  const dispatch = useDispatch();
  const sidebarShownews = useSelector((state) => state.sidebarShownews);


  var DynmicClass = "";

  if (sidebarShownews === true) {
    DynmicClass = "";
  }
  if (sidebarShownews === false) {
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
    dispatch({ type: "setnews", sidebarShownews: !sidebarShownews })
    toast.success(response.data.message);
    dispatch({ type: "setToken", accessToken: null })
    localStorage.clear();
    setTimeout(()=>{
      navigate("/login-newspaper", { replace: true });
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
   
      <div className="sidebar-logo">
    <img src={IMAGE.logo}  />
  
    </div>
        <button
          className="close-btn"
          onClick={() => dispatch({ type: "setnews", sidebarShownews: !sidebarShownews })}
        >
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>

      <div className="sidebar">
        <ul>
          <li>
            <NavLink
              to="/news-category"
              className={({ isActive }) => (isActive ? "active" : undefined)}
              onClick={() =>
                width
                  ? dispatch({ type: "setnews", sidebarShownews: !sidebarShownews })
                  : null
              }
            >
              <img src={IMAGE.dealIcon} alt="home" />
              News Category
              <span>
                <i class="fa-solid fa-angle-right"></i>
              </span>
            </NavLink>
      
          </li>
          <li>
            <NavLink
              to="/news-sub-category"
              className={({ isActive }) => (isActive ? "active" : undefined)}
              onClick={() =>
                width
                  ? dispatch({ type: "setnews", sidebarShownews: !sidebarShownews })
                  : null
              }
            >
              <img src={IMAGE.dealIcon} alt="home" />
              News Sub Category
              <span>
                <i class="fa-solid fa-angle-right"></i>
              </span>
            </NavLink>
            
          
          </li>
          
          <li>
            <NavLink
              to="/news-articles"
              className={({ isActive }) => (isActive ? "active" : undefined)}
              onClick={() =>
                width
                  ? dispatch({ type: "setnews", sidebarShownews: !sidebarShownews })
                  : null
              }
            >
              <img src={IMAGE.dealIcon} alt="deal" />
            News articles
              <span>
                <i class="fa-solid fa-angle-right"></i>
              </span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/news-analytics"
              className={({ isActive }) => (isActive ? "active" : undefined)}
              onClick={() =>
                width
                  ? dispatch({ type: "setnews", sidebarShownews: !sidebarShownews })
                  : null
              }
            >
              <img src={IMAGE.dealIcon} alt="deal" />
            News analytics
              <span>
                <i class="fa-solid fa-angle-right"></i>
              </span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/newspaper-about-us"
              className={({ isActive }) => (isActive ? "active" : undefined)}
              onClick={() =>
                width
                  ? dispatch({ type: "setnews", sidebarShownews: !sidebarShownews })
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
              to="/newspaper-terms-condition"
              className={({ isActive }) => (isActive ? "active" : undefined)}
              onClick={() =>
                width
                  ? dispatch({ type: "setnews", sidebarShownews: !sidebarShownews })
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
              to="/newspaper-user-agreement"
              className={({ isActive }) => (isActive ? "active" : undefined)}
              onClick={() =>
                width
                  ? dispatch({ type: "setnews", sidebarShownews: !sidebarShownews })
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
              to="/newspaper-privacy-policy"
              className={({ isActive }) => (isActive ? "active" : undefined)}
              onClick={() =>
                width
                  ? dispatch({ type: "setnews", sidebarShownews: !sidebarShownews })
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
              to="/newspaper-contact-us"
              className={({ isActive }) => (isActive ? "active" : undefined)}
              onClick={() =>
                width
                  ? dispatch({ type: "setnews", sidebarShownews: !sidebarShownews })
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
            <NavLink
              to="/newspaper-update-profile"
              className={({ isActive }) => (isActive ? "active" : undefined)}
              onClick={() =>
                width
                  ? dispatch({ type: "setnews", sidebarShownews: !sidebarShownews })
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
              to="/newspaper-change-password"
              className={({ isActive }) => (isActive ? "active" : undefined)}
              onClick={() =>
                width
                  ? dispatch({ type: "setnews", sidebarShownews: !sidebarShownews })
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
    </div>
    </>
  );
};

export default NavMenu;
