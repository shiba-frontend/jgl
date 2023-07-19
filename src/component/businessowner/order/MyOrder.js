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
    const [newOrder, setneworder] = useState([])
    const [processOrder, setprocessorder] = useState([])

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
            setneworder(response.data.data.new_orders)
            setprocessorder(response.data.data.processed_orders)
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
        {newOrder&&newOrder.map((item,index)=>{
            return (
                <div className='order-history-card' key={index}>
                     <div className='customer-info'>
                        <h5 >Order No: <label>{item?.order_no}</label></h5>
                        <h5 >Order Date: <label>{item?.payment_date}</label></h5>
                        {item?.transaction_id &&
                        <h5 >Tracking number: <label>{item?.transaction_id}</label></h5>
}
                    </div>
             
              
                <div className='customer-info'>
                    <h5><label>Product Info:</label></h5>
                    <h5 >Item: <label>{item?.item_name}</label></h5>
                    <h5 >Price: <label>${item?.price} X {item?.qty}</label></h5>
                    <h5 >Total Amount: <label>${item?.subtotal}</label></h5>
                </div>
                <div className='customer-info'>
                    <h5 ><label>Customer Info:</label></h5>
                    <h5 >Name: <label>{item?.billing_fname} {item?.billing_lname}</label></h5>
                    <h5 >Email: <label>{item?.billing_email}</label></h5>
                    <h5>Phone: <label>{item?.billing_phone}</label></h5>
                </div>
                <div className='order-history-card-fl mt-4'>
                   
                    <span className={item?.transaction_id == "" ? "text-danger" : 'text-success'}>{item?.payment_status}</span>
                </div>
            </div>
            )
        })}
            
           
            </>
            }
             {tabs === 2 && 
            <>

{processOrder&&processOrder.map((item,index)=>{
            return (
                <div className='order-history-card' key={index}>
                     <div className='customer-info'>
                        <h5 >Order No: <label>{item?.order_no}</label></h5>
                        <h5 >Order Date: <label>{item?.payment_date}</label></h5>
                        {item?.transaction_id &&
                        <h5 >Tracking number: <label>{item?.transaction_id}</label></h5>
}
                    </div>
             
              
                <div className='customer-info'>
                    <h5><label>Product Info:</label></h5>
                    <h5 >Item: <label>{item?.item_name}</label></h5>
                    <h5 >Price: <label>${item?.price} X {item?.qty}</label></h5>
                    <h5 >Total Amount: <label>${item?.subtotal}</label></h5>
                </div>
                <div className='customer-info'>
                    <h5 ><label>Customer Info:</label></h5>
                    <h5 >Name: <label>{item?.billing_fname} {item?.billing_lname}</label></h5>
                    <h5 >Email: <label>{item?.billing_email}</label></h5>
                    <h5>Phone: <label>{item?.billing_phone}</label></h5>
                </div>
                <div className='order-history-card-fl mt-4'>
                   
                    <span className={item?.transaction_id == "" ? "text-danger" : 'text-success'}>{item?.payment_status}</span>
                </div>
            </div>
            )
        })}
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