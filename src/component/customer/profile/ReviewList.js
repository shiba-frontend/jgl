import React, { useEffect, useState } from "react";
import AfterLoginTopbar from "../../customer/header/AfterLoginTopbar";
import Dropdown from "react-bootstrap/Dropdown";
import { NavLink } from "react-router-dom";
import BottomTabCustomer from "../header/BottomTabCustomer";
import { IMAGE } from "../../../common/Theme";
import CustomLoader from '../../../common/CustomLoader';
import axios from 'axios';
import { toast } from 'react-toastify';

const ReviewList = () => {
    const [loading, setloading] = useState(false)
    const [data, setData] = useState([])

    const token = localStorage.getItem('accessToken');


    const GetData = async ()=>{
        setloading(true)
        
        let body = {
          "key":"facb6e0a6fcbe200dca2fb60dec75be7",
          "source":"WEB",
          "app_access_token":token&&token,
        }
    
      await axios.post("/user/get-all-reviews", JSON.stringify(body))
      .then((response) => {
       
          setloading(false)
        if(response.data.success){
            setData(response.data.data)
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
    
    <div className="customer-layout">
      <div className="top-f-header">
        <AfterLoginTopbar />
        <div className="header-info">
          <div className="container">
            <img src={IMAGE.dealIcon} alt="review" /> My Reviews
          </div>
        </div>
      </div>
      <div className="comon-layout review-listing">
        <div className="container">
        <div className='row'>
            {data&&data.map((item, index)=>{
                var rating = parseInt(item.rating)
                var StarData = [];
                    for(var i = 0; i <5; i++){
                        if(i < rating){
                            StarData.push(<i className="fa-solid fa-star"></i>)
                        }
                        else {
                            StarData.push(<i className="fa-regular fa-star"></i>)
                        }
                    }
                return (
                    <div className='col-lg-4 col-12' key={index}>
                    <div className='review-card'>
                    <div className='review-card-header'>
                         <div className='review-card-header-l'>
                         <h5>{item?.business_name}</h5>
                        {StarData}
                        </div>
                        
                        <Dropdown className='dropDownBtn'>
                            <Dropdown.Toggle id="dropdown-basic">
                            <i class="fa-solid fa-ellipsis-vertical"></i>
                            </Dropdown.Toggle>

                              <Dropdown.Menu className='dropdownMenu'>
                                  <button>Approve</button>
                                  <button>Reject</button>
                              </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    
                        <p> {item?.review_main_category} {item?.review_sub_category}</p>
                        {item?.review_type == "video" && 
                            <video width="100%" controls>
                                <source src={item?.video_filename} type="video/mp4" />
                            </video>
                        }

                        <span>{item?.review_on}</span>
                    </div>
                </div>
                )
                })}
                
              
           </div>
        </div>
      </div>
      <BottomTabCustomer />
    </div>
    </>
  );
};

export default ReviewList;
