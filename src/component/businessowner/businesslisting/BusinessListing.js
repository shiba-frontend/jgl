import React, { useEffect, useState } from "react";
import AfterLoginTopbar from "../../businessowner/header/AfterLoginTopbar";
import BottomNavigation from "../header/BottomNavigation";
import { NavLink } from "react-router-dom";
import CustomLoader from '../../../common/CustomLoader';
import axios from 'axios';
import { toast } from 'react-toastify';
import { IMAGE } from '../../../common/Theme';
import { useSelector, useDispatch } from "react-redux";

const BusinessListing = () => {
  const [loading, setloading] = useState(false)
  const [business, setbusiness] = useState({})

  const token = localStorage.getItem('accessToken');
  const isbusiness = useSelector((state) => state.isbusinessadded);

  const GetData = async ()=>{
      setloading(true)
      
      let body = {
        "key":"facb6e0a6fcbe200dca2fb60dec75be7",
        "source":"WEB",
        "app_access_token":token&&token,
      }
  
    await axios.post("/business-owner/list-business", JSON.stringify(body))
    .then((response) => {
     
        setloading(false)
      if(response.data.success){
          console.log(response.data.data)
          setbusiness(response.data.data)
      }
    })
    .catch((error) => {
        setloading(false)
      
        if(error.response.status === 404){
            toast.error(error.response.data.message);
        }
        
    });
  
    }
  
  
    useEffect(()=>{
      GetData()
    },[])


  return (
    <>
     {loading && <CustomLoader/>}
  
    <div className="ownerLayout">
      <div className="top-f-header">
        <AfterLoginTopbar />
        <div className="header-info">
          <div className="container"><img src={IMAGE.business_icon}  alt="business" /> My Business Listing</div>
        </div>
      </div>

      <div className="comon-layout deal-listing">
        <div className="container">
          <div className="listing-card">
            <h3>{business?.business_name}</h3>
            <p>
              <img src={IMAGE.location_fill_icon} /> {business?.address}
            </p>
            <p>
              <img src={IMAGE.phone_fill_icon} /> Phone: {business?.contact_no}
            </p>
            <div className="listing-card-btn">
              <NavLink to="/add-business" className="fillBtn">
                Edit Business
              </NavLink>
              <NavLink to="/delete-listing" className="outlinebtn">
                Delete Business
              </NavLink>
            </div>
          </div>
          {isbusiness &&
          <div className="addIcon">
            <NavLink to="/add-business">
              <img src={IMAGE.addicon} alt="addicon" />
            </NavLink>
          </div>
}
        </div>
      </div>
      <BottomNavigation />
    </div>
    </>
  );
};

export default BusinessListing;
