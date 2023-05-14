import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import deal from "../../../image/icon/deal.svg";
import about from "../../../image/icon/about.svg";
import terms from "../../../image/icon/terms.svg";
import Agreement from "../../../image/icon/agreement.svg";
import privacy from "../../../image/icon/privacy.svg";
import contact from "../../../image/icon/contact.svg";
import profile from "../../../image/icon/profile.svg";
import password from "../../../image/icon/password.svg";
import account from "../../../image/icon/delete-accoint.svg";
import signout from "../../../image/icon/sign_out.svg";
import home from "../../../image/headingicon/Paper_fill.svg";

const NavMenu = () => {


  const dispatch = useDispatch();
  const sidebarShownews = useSelector((state) => state.sidebarShownews);

  console.log("scd", sidebarShownews)

  var DynmicClass = "";

  if (sidebarShownews === true) {
    DynmicClass = "";
  }
  if (sidebarShownews === false) {
    DynmicClass = "closes";
  }

  var width = window.innerWidth < 1920;

 

  return (
    <div className={`left-panel sidebar-fixed ${DynmicClass}`}>
      <div className="panel-logo">
       
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
              <img src={home} alt="home" />
              News Category
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
              <img src={home} alt="deal" />
            News analytics
              <span>
                <i class="fa-solid fa-angle-right"></i>
              </span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/political-news"
              className={({ isActive }) => (isActive ? "active" : undefined)}
              onClick={() =>
                width
                  ? dispatch({ type: "setnews", sidebarShownews: !sidebarShownews })
                  : null
              }
            >
              <img src={home} alt="deal" />
            Politycal news articles
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
              <img src={about} alt="about" />
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
              <img src={terms} alt="terms" />
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
              <img src={Agreement} alt="agreement" />
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
              <img src={privacy}  alt="privacy"/>
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
              <img src={contact} alt="contact" />
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
              <img src={profile} alt="profile" />
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
              <img src={password} alt="lock" />
              Change Password
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
                  ? dispatch({ type: "setnews", sidebarShownews: !sidebarShownews })
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
