import React, { useEffect, useState } from 'react'
import AfterLoginTopbar from '../../businessowner/header/AfterLoginTopbar'
import BottomNavigation from '../header/BottomNavigation'
import { NavLink } from 'react-router-dom';
import { IMAGE } from '../../../common/Theme';
import CustomLoader from '../../../common/CustomLoader';
import axios from 'axios';
import { toast } from 'react-toastify';

const MyOrder = () => {
    const [loading, setloading] = useState(false)
    const [tabs, settabs] = useState(1)

    const token = localStorage.getItem('accessToken');

    const GetData = async ()=>{
        setloading(true)
        
        let body = {
          "key":"facb6e0a6fcbe200dca2fb60dec75be7",
          "source":"WEB",
          "app_access_token":token&&token,
        }
    
      await axios.post("/business-owner/order-list", JSON.stringify(body))
      .then((response) => {
       
          setloading(false)
        if(response.data.success){
            console.log(response.data.data)
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
      <div className="container"><img src={IMAGE.checkin_icon} alt="owner"/> My Order History</div>
    </div>
    </div>
    <div className="comon-layout">
      <div className="container">
        <div className='order-tab'>
            <ul>
                <li>
                    <button onClick={()=>settabs(1)} style={{background:tabs === 1 ? "#ff0000": '#ccc', color:tabs === 1 ? "#fff": '#000'}}>New Order</button>
                </li>
                <li>
                    <button onClick={()=>settabs(2)} style={{background:tabs === 2 ? "#ff0000": '#ccc', color:tabs === 2 ? "#fff": '#000'}} >Purchased Order</button>
                </li>
            </ul>
        </div>

        {tabs === 1 && 
            <>

            <div className='order-history-card'>
                <div className='order-history-card-fl'>
                    <h3>Order No: 1947034</h3>
                    <h5>05-12-2019</h5>
                </div>
                <h5>Tracking number: <label>IW3475453455</label></h5>
                <div className='order-history-card-fl'>
                <h5>Quantity: <label>3</label></h5>
                <h5>Total Amount: <label>$100</label></h5>
                </div>
                <div className='order-history-card-fl mt-4'>
                    <NavLink>Details</NavLink>
                    <span className='text-success'>Delivered</span>
                </div>
            </div>
           
            </>
            }
             {tabs === 2 && 
            <>

            <div className='order-history-card'>
                <div className='order-history-card-fl'>
                    <h3>Order No: 1947034</h3>
                    <h5>05-12-2019</h5>
                </div>
                <h5>Tracking number: <label>IW3475453455</label></h5>
                <div className='order-history-card-fl'>
                <h5>Quantity: <label>3</label></h5>
                <h5>Total Amount: <label>$100</label></h5>
                </div>
                <div className='order-history-card-fl mt-4'>
                    <NavLink>Details</NavLink>
                    <span className='text-success'>Delivered</span>
                </div>
            </div>
            <div className='order-history-card'>
                <div className='order-history-card-fl'>
                    <h3>Order No: 1947034</h3>
                    <h5>05-12-2019</h5>
                </div>
                <h5>Tracking number: <label>IW3475453455</label></h5>
                <div className='order-history-card-fl'>
                <h5>Quantity: <label>3</label></h5>
                <h5>Total Amount: <label>$100</label></h5>
                </div>
                <div className='order-history-card-fl mt-4'>
                    <NavLink>Details</NavLink>
                    <span className='text-success'>Delivered</span>
                </div>
            </div>
            <div className='order-history-card'>
                <div className='order-history-card-fl'>
                    <h3>Order No: 1947034</h3>
                    <h5>05-12-2019</h5>
                </div>
                <h5>Tracking number: <label>IW3475453455</label></h5>
                <div className='order-history-card-fl'>
                <h5>Quantity: <label>3</label></h5>
                <h5>Total Amount: <label>$100</label></h5>
                </div>
                <div className='order-history-card-fl mt-4'>
                    <NavLink>Details</NavLink>
                    <span className='text-success'>Delivered</span>
                </div>
            </div>
            <div className='order-history-card'>
                <div className='order-history-card-fl'>
                    <h3>Order No: 1947034</h3>
                    <h5>05-12-2019</h5>
                </div>
                <h5>Tracking number: <label>IW3475453455</label></h5>
                <div className='order-history-card-fl'>
                <h5>Quantity: <label>3</label></h5>
                <h5>Total Amount: <label>$100</label></h5>
                </div>
                <div className='order-history-card-fl mt-4'>
                    <NavLink>Details</NavLink>
                    <span className='text-success'>Delivered</span>
                </div>
            </div>
            </>
            }
      </div>
    </div>
    <BottomNavigation/>
  </div>
  </>
  )
}

export default MyOrder