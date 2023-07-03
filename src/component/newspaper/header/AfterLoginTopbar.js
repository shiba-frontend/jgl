import React, { useState, useEffect } from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios';
import { toast } from 'react-toastify';
import { IMAGE } from '../../../common/Theme';

const AfterLoginTopbar = (props) => {
  const dispatch = useDispatch();
  const sidebarShownews = useSelector((state) => state.sidebarShownews);
  let navigate = useNavigate();
  const token = localStorage.getItem('accessToken');
  // var p_data = useSelector((state) => state.profiledata);


  const GetData = async ()=>{
 
    let body = {
      "key":"facb6e0a6fcbe200dca2fb60dec75be7",
      "source":"WEB",
      "app_access_token":token&&token,
    }

  await axios.post("/get-profile", JSON.stringify(body))
  .then((response) => {
   
    if(response.data.success){
      dispatch({ type: "setprofile", profiledata: response.data.data })
    }
  })
  .catch((error) => {

      if(error.response.status === 404){
          toast.error(error.response.data.message);
      }
      if(error.response.status === 403){
        toast.error(error.response.data.message);
        localStorage.clear();
        navigate("/login-newspaper", { replace: true });
    }
  });

  }


  useEffect(()=>{
    GetData()
  },[])

  
  return (
    <div className='login-after-top'>
      <div className='container'>
          <div className='row align-items-center'>
              <div className='col-4 col-lg-4'>
              <div className='login-after-top-left'>
                  <img src={IMAGE.logo}/>
                </div>
              </div>
              <div className='col-8 col-lg-8'>
              <div className='login-after-top-right'>
        
        <button
        onClick={() =>
          dispatch({ type: "setnews", sidebarShownews: !sidebarShownews })
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