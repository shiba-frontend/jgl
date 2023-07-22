import React,{useEffect,useState} from 'react'
import AfterLoginTopbar from '../header/AfterLoginTopbar'
import { NavLink,useNavigate, useParams } from 'react-router-dom'
import BottomTabCustomer from '../header/BottomTabCustomer';
import { IMAGE } from '../../../common/Theme';
import axios from 'axios';
import { toast } from 'react-toastify';
import CustomLoader from '../../../common/CustomLoader';

const OrderDetails = () => {
    const [loading, setloading] = useState(false)
    const [getdata, setgetdata] = useState({})
    const token = localStorage.getItem('accessToken');

    const id =  useParams()

    const GetData = async ()=>{
        setloading(true)
        
        let body = {
          "key":"facb6e0a6fcbe200dca2fb60dec75be7",
          "source":"WEB",
          "app_access_token":token&&token,
          "order_id":id
        }
    
      await axios.post("/user/order-details", JSON.stringify(body))
      .then((response) => {
       
          setloading(false)
        if(response.data.success){
          setgetdata(response.data.data)
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
    <div className='customer-layout'>
            {loading && <CustomLoader />}
         <div className="top-f-header">
    <AfterLoginTopbar/>
    <div className="header-info">
        <div className="container"><img src={IMAGE.dealIcon}/> Order Details</div>
      </div>
      </div>
    <div className='comon-layout'>
         <div className='container'>
              <div className='customerOrder-details'>
                  <h1></h1>


                  <h3>Order# JGL/2023/00013</h3>
                  <div className='order-bg'>
                    <h4>Order Information</h4>
                    <p><b>Order date:</b>{getdata?.order_date + ' '  + getdata?.order_time}</p>
                    <p><b>Payment date:</b>{getdata?.payment_date + ' '  + getdata?.payment_time}</p>
                    <p><b>payment_status:</b>{getdata?.payment_status}</p>
                    <h4>Account Information</h4>
                    <p><b>Customer Name:</b>{getdata?.billing_fname + ' '  + getdata?.billing_lname}</p>
                    <p><b>Email:</b>{getdata?.billing_email}</p>
                    <p><b>Phone:</b>{getdata?.billing_phone}</p>
                  </div>
                  <div className='billing-add'>
                    <h4>Billing Information</h4>
                    <p>{getdata?.billing_address}</p>
                    <p>{getdata?.billing_country}</p>
                    <p>{getdata?.billing_state}</p>
                    <p>{getdata?.billing_city}</p>
                    <p>{getdata?.billing_zipcode}</p>
                
                  </div>
                
                  <div className='billing-item'>
                    <h4>Order Information</h4>
                    {getdata?.orderDetailsData&&getdata?.orderDetailsData.map((item,index)=>{
                      return (
                        <div className='billing-item_list' key={index}>
                    <div className='itemList'>
                        <b>ITEM NAME</b>
                        <p>{item?.item_name}</p>
                    </div>
                    <div className='itemList'>
                        <b>ITEM OWNER	</b>
                        <p>{item?.item_owner}</p>
                    </div>
                    <div className='itemList'>
                        <b>QUANTITY</b>
                        <p>{item?.qty}</p>
                    </div>
                    <div className='itemList'>
                        <b>PRICE</b>
                        <p>{item?.price}</p>
                    </div>
                    <div className='itemList'>
                        <b>SUBTOTAL</b>
                        <p>{item?.subtotal}</p>
                    </div>
                  </div>
                      )
                    })}
                    
                  </div>

                    <div className='t-info'>
                      <ul>
                        <li>
                          <b>Sub Total</b>
                          <span>{getdata?.subtotal_amount}</span>
                        </li>
                        <li>
                          <b>Discount</b>
                          <span>{getdata?.discount_amount}</span>
                        </li>
                        <li>
                          <b>Total</b>
                          <span>{getdata?.total_amount}</span>
                        </li>
                      </ul>
                    </div>

              </div>
        </div>
    </div>
    <BottomTabCustomer/>
    </div>
   
  )
}

export default OrderDetails