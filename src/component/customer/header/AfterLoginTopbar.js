import React from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import logo from "../../../image/logo.png";
import menu from "../../../image/hamberger-menu.png";
import location from "../../../image/location-outline.png";

const AfterLoginTopbar = (props) => {

  const dispatch = useDispatch();
  const sidebarShow = useSelector((state) => state.sidebarShow);
  let navigate = useNavigate();
  
  return (
    <div className='login-after-top'>
      <div className='container'>
          <div className='row align-items-center'>
              <div className='col-4 col-lg-4'>
              <div className='login-after-top-left'>
                  <NavLink to="/home"> <img src={logo}/></NavLink>
                </div>
              </div>
              <div className='col-8 col-lg-8'>
              <div className='login-after-top-right'>
          <span>  <img src={location}/> Bowie, MD, USA</span>
        <button
        onClick={() =>
          dispatch({ type: "set", sidebarShow: !sidebarShow })
        }
      >
    <img src={menu}/>
</button>
        </div>
              </div>
          </div>
     
        
      </div>
     
    </div>
  )
}

export default AfterLoginTopbar