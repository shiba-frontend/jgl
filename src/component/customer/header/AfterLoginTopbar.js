import React,{useState} from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { IMAGE } from '../../../common/Theme';


const AfterLoginTopbar = (props) => {


  const dispatch = useDispatch();
  const sidebarShow = useSelector((state) => state.sidebarShow);



    // useEffect(()=>{
  //   if (navigator.geolocation) {
  //     navigator.geolocation.watchPosition(function(position) {
  //       console.log("Latitude is :", position.coords.latitude);
  //       console.log("Longitude is :", position.coords.longitude);
  //     });
  //   }
  // },[])

  
  return (
    <>
    
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
          dispatch({ type: "set", sidebarShow: !sidebarShow })
        }
      >
    <img src={IMAGE.hamberger_icon}/>
</button>
        </div>
              </div>
          </div>
     
        
      </div>
   

      

    </div>
 
    </>
  )
}

export default AfterLoginTopbar