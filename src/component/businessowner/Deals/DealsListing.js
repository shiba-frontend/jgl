import React, { useEffect, useState } from 'react'
import AfterLoginTopbar from '../../businessowner/header/AfterLoginTopbar'
import BottomNavigation from '../header/BottomNavigation'
import Dropdown from 'react-bootstrap/Dropdown';
import { NavLink } from 'react-router-dom';
import { IMAGE } from '../../../common/Theme';
import CustomLoader from '../../../common/CustomLoader';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from "react-redux";
import Modal from 'react-bootstrap/Modal';


const DealsListing = () => {
  const [loading, setloading] = useState(false)
  const [deallist, setdeallist] = useState([])
  const [show, setShow] = useState(false);
  const [dealid, setdealid] = useState("")
  const token = localStorage.getItem('accessToken');
  const BusinessId = localStorage.getItem('business_id');
  const handleClose = () => setShow(false);

  const GetData = async ()=>{
      setloading(true)
      
      let body = {
        "key":"facb6e0a6fcbe200dca2fb60dec75be7",
        "source":"WEB",
        "app_access_token":token&&token,
        "business_id":BusinessId&&BusinessId
      }
  
    await axios.post("/business-owner/list-deal", JSON.stringify(body))
    .then((response) => {
     
        setloading(false)
      if(response.data.success){
        setdeallist(response.data.data)
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

  
    function ModalControl(id){
      setShow(true)
      setdealid(id)
    }



    const DeleteHandle = async () =>{
      setloading(true)
   
      let body = {
        "key":"facb6e0a6fcbe200dca2fb60dec75be7",
        "source":"WEB",
        "app_access_token":token&&token,
        "deal_id":dealid
      }
  
    await axios.post("/business-owner/delete-deal", JSON.stringify(body))
   .then((response) => {
    setloading(false)
        if(response.data.success){
          setShow(false)
          toast.success(response.data.message);
          GetData()
        }
    })
   .catch((error) => {
    setloading(false)
        if(error.response.status === 404){
            toast.error(error.response.data.message);
        }
        
    });
  
    }
   



  return (
    <>
      {loading && <CustomLoader/>}
   
    <div className='ownerLayout'>
        <div className="top-f-header">
    <AfterLoginTopbar />
    <div className="header-info">
      <div className="container"><img src={IMAGE.business_icon_one} alt="owner"/> My Deals (You can create multiple deals)</div>
    </div>
    </div>

    <div className="comon-layout analytics-details">
        <div className="container">
          

{deallist&& deallist.map((item, index)=>{
          return (
            <div key={index}>
            <ul >
        <li>
              <label>Deal Type</label>
              <span>{item?.deal_type}</span>
            </li>
            <li>
              <label>Title</label>
              <span>{item?.title}</span>
            </li>
            <li>
              <label>Category</label>
              <span>{item?.deal_category}</span>
            </li>
            <li>
              <label>Deal Start Date</label>
              <span>{item?.deal_start_date}</span>
            </li>
            <li>
              <label>Deal End Date</label>
              <span>{item?.deal_end_date}</span>
            </li>
            <li>
              <label>Price Deal</label>
              <span>{item?.price}</span>
            </li>
            <li>
              <label>Deal Content</label>
              {item?.deal_text !== "" ? 
              
              <h4 className='dealTxt' style={{background:item?.primary_bgcolor, 
                color:item?.primary_fontcolor,
                fontStyle:item?.primary_font_style,
                padding:"7px",
                fontSize:15
              }}
              
              >{item?.deal_text
              }</h4>
              :
              <img src={item.deal_image} className='dealImage'  />  
            } 
            </li>
            <li>
           
            </li>
          </ul>
          <ul className='deal-edit-del'>
            <li>
            <NavLink to={`/edit-deal/${item?.deal_id}`} className="fillBtn">
                Edit Deal
              </NavLink>
             
            </li>
            <li>
              <button className="outlinebtn" onClick={()=>ModalControl(item?.deal_id)}>
              Delete Deal
              </button>
         
            </li>
          </ul>
          </div>
          )
        })}
         
          <div className='addIcon'>
              <NavLink to="/add-deal">
                  <img src ={IMAGE.addicon}   alt="addicon" />
              </NavLink>
            </div>
        </div>
      </div>

    <BottomNavigation/>
  </div>
  <Modal show={show} onHide={handleClose} centered size="sm" className='AlertMsg'>
    <Modal.Header>
      <Modal.Title><i class="fa-solid fa-triangle-exclamation"></i> Alert !</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <h4>Are You sure delete deal ?</h4>
      <ul>
      <li>
        <button onClick={handleClose} className='btn btn-md btn-danger'>
            No
        </button>
     
      </li>
      <li>
      <button onClick={DeleteHandle} className='btn btn-md btn-success'>
            Yes
        </button>
    
      </li>
    </ul>

    </Modal.Body>
  
   
  </Modal>
  </>
  )
}

export default DealsListing