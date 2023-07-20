import React,{useEffect,useState} from 'react'
import AfterLoginTopbar from '../header/AfterLoginTopbar'
import { NavLink } from 'react-router-dom'
import BottomTabCustomer from '../header/BottomTabCustomer';
import { IMAGE } from '../../../common/Theme';
import axios from 'axios';
import { toast } from 'react-toastify';
import CustomLoader from '../../../common/CustomLoader';

const MyDeal = () => {
    const [loading, setloading] = useState(false)
    const [getdata, setgetdata] = useState([])
    const token = localStorage.getItem('accessToken');


    const GetData = async ()=>{
        setloading(true)
        
        let body = {
          "key":"facb6e0a6fcbe200dca2fb60dec75be7",
          "source":"WEB",
          "app_access_token":token&&token,
        }
    
      await axios.post("/user/order-list", JSON.stringify(body))
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
        <div className="container"><img src={IMAGE.dealIcon}/> My Deals</div>
      </div>
      </div>
    <div className='comon-layout'>
         <div className='container'>
         {getdata&&getdata.map((item,index)=>{
            return (
                <div className='order-history-card' key={index}>
                     <div className='customer-info'>
                        <h5 >Order No: <label>{item?.order_no}</label></h5>
                        <h5 >Order Date: <label>{item?.payment_date}</label></h5>
                       
                        <h5 >Payment Date: <label>{item?.payment_date}</label></h5>

                    </div>
                    <div className='customer-info'>
                    <h5 ><label>Payment Status:</label></h5>
                  
                    <h5><label>{item?.payment_status}</label></h5>
                </div>
                <div className='customer-info'>
                    <h5 ><label>Sub Total:</label></h5>
                  
                    <h5><label>{item?.total_amount}</label></h5>
                </div>
               
               <NavLink className="themeBtn" to={`/order-details/${item.order_id}`}>
                    View Details

               </NavLink>
               
            </div>
            )
        })}
        </div>
    </div>
    <BottomTabCustomer/>
    </div>
   
  )
}

export default MyDeal