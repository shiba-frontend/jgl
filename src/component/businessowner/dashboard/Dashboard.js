import React,{useState, useEffect} from 'react'
import AfterLoginTopbar from '../../businessowner/header/AfterLoginTopbar'
import BottomNavigation from '../header/BottomNavigation'
import OrderHistory from '../order/OrderHistory'
import CustomLoader from '../../../common/CustomLoader';
import axios from 'axios';
import { toast } from 'react-toastify';
import { IMAGE } from '../../../common/Theme';
import { useSelector, useDispatch } from "react-redux";

const Dashboard = () => {
    const [loading, setloading] = useState(false)
    const [countData, setcountData] = useState({})
    const [neworder, setneworder] = useState([])
    const dispatch = useDispatch();

    const token = localStorage.getItem('accessToken');

    const Getbusiness = async ()=>{
 
      
        let body = {
          "key":"facb6e0a6fcbe200dca2fb60dec75be7",
          "source":"WEB",
          "app_access_token":token&&token,
        }
    
      await axios.post("/check-business-added", JSON.stringify(body))
      .then((response) => {
       localStorage.setItem("business_id", response.data.data.business_id)
      })
      .catch((error) => {
     
          if(error.response.status === 404){
              toast.error(error.response.data.message);
          }
          
      });
    
      }
  

    const GetData = async ()=>{
        setloading(true)
        
        let body = {
          "key":"facb6e0a6fcbe200dca2fb60dec75be7",
          "source":"WEB",
          "app_access_token":token&&token,
        }
    
      await axios.post("/business-owner/dashboard", JSON.stringify(body))
      .then((response) => {
       
          setloading(false)
        if(response.data.success){
            setcountData(response.data.data)
            setneworder(response.data.data.newOrder)
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
        Getbusiness()
      },[])


  return (
    <>
     {loading && <CustomLoader/>}
   
    <div className='ownerLayout'>
         <div className="top-f-header">
    <AfterLoginTopbar />
    <div className="header-info">
      <div className="container"><img src={IMAGE.owner_icon} alt="owner"/> Business Owner Dashboard</div>
    </div>
    </div>
    <div className="comon-layout">
      <div className="container">
          <ul className='dashboard-counter'>
            <li>
                <div className='count-card'>
                    <label>{countData?.business_review}</label>
                    <h4>Business Review</h4>
                </div>
            </li>
            <li>
                <div className='count-card'>
                    <label>{countData?.video_review}</label>
                    <h4>Video Reviews</h4>
                </div>
            </li>
            <li>
                <div className='count-card'>
                    <label>{countData?.new_order}</label>
                    <h4>New Order</h4>
                </div>
            </li>
            <li>
                <div className='count-card'>
                    <label>{countData?.order}</label>
                    <h4>Total Order</h4>
                </div>
            </li>
            <li>
                <div className='count-card'>
                    <label>{countData?.active_deal}</label>
                    <h4>Active Deals</h4>
                </div>
            </li>
            <li>
                <div className='count-card'>
                    <label>{countData?.deal}</label>
                    <h4>Total Deals</h4>
                </div>
            </li>
          </ul>
          <div className='Dashboard-order'>
              <h3>New Order</h3>
              <OrderHistory data={neworder} />
          </div>
      </div>
    </div>
    <BottomNavigation/>
  </div>
  </>

  )
}

export default Dashboard