import React, { useEffect, useState } from 'react'
import AfterLoginTopbar from '../../businessowner/header/AfterLoginTopbar'
import BottomNavigation from '../header/BottomNavigation'

import { NavLink } from 'react-router-dom';
import { IMAGE } from '../../../common/Theme';
import CustomLoader from '../../../common/CustomLoader';
import axios from 'axios';
import { toast } from 'react-toastify';

const Analytics = () => {
    const [loading, setloading] = useState(false)
    const [countdata, setcountdata] = useState({})
    const token = localStorage.getItem('accessToken');

    const GetData = async ()=>{
        setloading(true)
        
        let body = {
          "key":"facb6e0a6fcbe200dca2fb60dec75be7",
          "source":"WEB",
          "app_access_token":token&&token,
        }
    
      await axios.post("/business-owner/analytics", JSON.stringify(body))
      .then((response) => {
       
          setloading(false)
        if(response.data.success){
            setcountdata(response.data.data)
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
  
    <div className='ownerLayout'>
        <div className="top-f-header">
    <AfterLoginTopbar />
    <div className="header-info">
      <div className="container"><img src={IMAGE.analytics_icon} alt="owner"/> Analytics</div>
    </div>
    </div>
    <div className="comon-layout">
      <div className="container">
            <div className='row'>
                <div className='col-12'>
                    <div className='analytics-card' style={{minHeight:"auto"}}>
                        <img src={IMAGE.search_icon} alt="search" />
                        <h3>Searches</h3>
                        <b>{countdata?.search_count}</b>
                        <p>People Who Have Searched Your Type of Business and Your Business Appeared as a Recommended Business.</p>
                    </div>
                </div>
                <div className='col-6'>
                    <div className='analytics-card'>
                        <img src={IMAGE.userfill_icon} alt="search" />
                        <h3>CUSTOMERS</h3>
                        <b>{countdata?.customer_count}</b>
                        <p>People Who Have Searched Your Type of Business and Your Business Appeared as a Recommended Business.</p>
                    </div>
                </div>
                <div className='col-6'>
                    <div className='analytics-card'>
                        <img src={IMAGE.leads_icon} alt="search" />
                        <h3>LEADS</h3>
                        <b>{countdata?.lead_count}</b>
                        <p>People Who Have Visited Your Business Places.</p>
                    </div>
                </div>
                <div className='col-6'>
                    <div className='analytics-card'>
                        <img src={IMAGE.adv_icon} alt="search" />
                        <h3>DEALS ADDED</h3>
                        <b>{countdata?.deals_added_count}</b>
                        <p>Business and Your Business Appeared as a Recommended Business.</p>
                    </div>
                </div>
                
              
                <div className='col-6'>
                    <div className='analytics-card'>
                        <img src={IMAGE.expenses_icon} alt="search" />
                        <h3>DEALS PURCHASED</h3>
                        <b>{countdata?.deals_purchased_count
}</b>
                        <p>People Who Have Visited Your Business Places.</p>
                    </div>
                </div>
            </div>
           
          
      </div>
    </div>
    <BottomNavigation/>
  </div>
  </>
  )
}

export default Analytics