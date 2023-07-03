import React, { useEffect, useState } from 'react'
import AfterLoginTopbar from '../../businessowner/header/AfterLoginTopbar'
import BottomNavigation from '../header/BottomNavigation'
import { IMAGE } from '../../../common/Theme';
import CustomLoader from '../../../common/CustomLoader';
import axios from 'axios';
import { toast } from 'react-toastify';

const CustomerList = () => {
      const [clist, setclist] = useState([])
      const [loading, setloading] = useState(false)
 


      const token = localStorage.getItem('accessToken');
    
    
      const GetData = async ()=>{
          setloading(true)
          
          let body = {
            "key":"facb6e0a6fcbe200dca2fb60dec75be7",
            "source":"WEB",
            "app_access_token":token&&token,
          }
      
        await axios.post("/business-owner/customer-list", JSON.stringify(body))
        .then((response) => {
         
            setloading(false)
          if(response.data.success){
            setclist(response.data.data)
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
      <div className="container"><img src={IMAGE.customer_icon} alt="owner"/> Customers Who Bought From Us…</div>
    </div>
    </div>
    <div className="comon-layout">
      <div className="container">
        {clist&&clist.map((item,index)=>{
          return (
            <div className='customer-list' key={index}>
              <h5>{item?.name}</h5>
            <p><img src={IMAGE.phone_fill_icon}  alt='icon' /> {item?.phone}</p>
            <p><img src={IMAGE.msg_fill_icon}  alt='icon' /> {item?.email}</p>
      </div>
          )
        })}
         
    
      </div>
    </div>
    <BottomNavigation/>
  </div>
  </>
  )
}

export default CustomerList