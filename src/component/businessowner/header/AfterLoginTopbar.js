import React, { useEffect } from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { IMAGE } from '../../../common/Theme';
import axios from 'axios';
import { toast } from 'react-toastify';

const AfterLoginTopbar = (props) => {

  const dispatch = useDispatch();
  const sidebarShowbusiness = useSelector((state) => state.sidebarShowbusiness);

  let navigate = useNavigate();

  const token = localStorage.getItem('accessToken');



  
  return (
    <div className='login-after-top'>
      <div className='container'>
          <div className='row align-items-center'>
              <div className='col-4 col-lg-4'>
              <div className='login-after-top-left'>
                  <NavLink to="/home"> <img src={IMAGE.logo}/></NavLink>
                </div>
              </div>
              <div className='col-8 col-lg-8'>
              <div className='login-after-top-right'>
          <span>  <img src={IMAGE.location_icon}/> Bowie, MD, USA</span>
        <button
        onClick={() =>
          dispatch({ type: "setbusiness", sidebarShowbusiness: !sidebarShowbusiness })
        }
      >
    <img src={IMAGE.hamberger_icon}/>
</button>
        </div>
              </div>
          </div>
     
        
      </div>
     
    </div>
  )
}

export default AfterLoginTopbar