import React, { useState, useEffect } from "react";
import AfterLoginTopbar from "../../businessowner/header/AfterLoginTopbar";
import BottomNavigation from '../header/BottomNavigation'
import { toast } from 'react-toastify';
import CustomLoader from '../../../common/CustomLoader';
import axios, * as others from 'axios';
import { NavLink,useNavigate } from 'react-router-dom'
import { IMAGE } from '../../../common/Theme';

const ContactUs = () => {

    const [fname, setfname] = useState("");
    const [lname, setlname] = useState("");
    const [email, setemail] = useState("");
    const [phone, setphone] = useState("");
    const [subject, setsubject] = useState("");
    const [message, setmessage] = useState("");
    const [loading, setloading] = useState(false)
    let navigate = useNavigate();
    const token = localStorage.getItem('accessToken');

    const GetData = async ()=>{
 
        let body = {
          "key":"facb6e0a6fcbe200dca2fb60dec75be7",
          "source":"WEB",
          "app_access_token":token&&token,
        }
    
      await axios.post("/get-profile", JSON.stringify(body))
      .then((response) => {
       
        if(response.data.success){
            var data = response.data.data
            setfname(data.first_name)
            setlname(data.last_name)
            setemail(data.email_id)
            setphone(data.contact_no)
        }
      })
      .catch((error) => {
    
          if(error.response.status === 404){
              toast.error(error.response.data.message);
          }
         
      });
    
      }
    
    
      useEffect(()=>{
        GetData()
      },[])


    const SubmitHandler = async ()=>{
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    
       if (reg.test(email) === false) {
        toast.error('Email should be proper!');
        } else if (phone == ''){
            toast.error('Phone is required');
        } 
    
        else {
    
            setloading(true)
    
            let body = {
                "key":"facb6e0a6fcbe200dca2fb60dec75be7",
                "source":"WEB",
                "fname":fname,
                "lname":lname,
                "email":email,
                "phone":phone,
                "subject":subject,
                "message":message
            }
        
    
    await axios.post("/post-contact", JSON.stringify(body))
    .then((response) => {
        setloading(false)
      if(response.data.success){
        toast.success(response.data.message);
        setTimeout(()=>{
            navigate('/dashboard');
        },3000)
      }
    })
    .catch((error) => {
        setloading(false)
       
        if(error.response.status === 404){
            toast.error(error.response.data.message);
        }
        
    });
    
    }
     
    }



  return (
    <>
    {loading && <CustomLoader/>}

    <div className='ownerLayout'>
         <div className="top-f-header">
    <AfterLoginTopbar />
    <div className="header-info">
      <div className="container"><img src={IMAGE.chat_icon}/> Contact Us</div>
    </div>
    </div>
    <div className="comon-layout">
      <div className="container">
            <div className="contact-us">
                <h2>Get In Touch</h2>
                <div className="row mb-4">
                    <div className="col-lg-4 col-12">
                        <div className="form-group">
                            <label>First Name</label>
                            <input type="text" className="form-control" placeholder="Enter Here"
                            value={fname}
                            onChange={(e)=>setfname(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="col-lg-4 col-12">
                        <div className="form-group">
                            <label>Last Name</label>
                            <input type="text" className="form-control" placeholder="Enter Here" 
                            value={lname}
                            onChange={(e)=>setlname(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="col-lg-4 col-12">
                        <div className="form-group">
                            <label>Primary Mail Id</label>
                            <input type="email" className="form-control" placeholder="Enter Here"
                            value={email}
                            onChange={(e)=>setemail(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="col-lg-4 col-12">
                        <div className="form-group">
                            <label>Mobile Number</label>
                            <input type="text" className="form-control" placeholder="Enter Here"
                            maxLength="10"
                            minLength="10"
                            onKeyPress={(event) => {
                                      if (!/[0-9]/.test(event.key)) {
                                        event.preventDefault();
                                      }
                                    }}
                                    value={phone}
                                    onChange={(e)=>setphone(e.target.value)}  
                            />
                        </div>
                    </div>
                    <div className="col-lg-4 col-12">
                        <div className="form-group">
                            <label>Subject</label>
                            <input type="text" className="form-control" placeholder="Enter Here" 
                             value={subject}
                             onChange={(e)=>setsubject(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="col-lg-4 col-12">
                        <div className="form-group">
                            <label>Message</label>
                            <textarea placeholder="Enter message here" className="form-control"
                              value={message}
                              onChange={(e)=>setmessage(e.target.value)}
                            ></textarea>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-4 col-12">
                        <button className="themeBtn" onClick={SubmitHandler}>Send Messege</button>
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

export default ContactUs