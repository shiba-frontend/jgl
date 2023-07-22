import React, { useState, useEffect, useRef } from 'react';
import AfterLoginTopbar from '../header/AfterLoginTopbar'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { NavLink,useParams } from 'react-router-dom';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import BottomTabCustomer from '../header/BottomTabCustomer';
import { IMAGE, baseUrl } from '../../../common/Theme';
import axios from 'axios';
import { toast } from 'react-toastify';
import CustomLoader from '../../../common/CustomLoader';
import Modal from 'react-bootstrap/Modal';
import Webcam from 'react-webcam';
import { useSelector, useDispatch } from "react-redux";


//import './Video'

const BusinessDetails = () => {
  const [loading, setloading] = useState(false)
  const [key, setKey] = useState('home');
  const [show, setShow] = useState(false);
  const [type, settype] = useState("text");
  const [reviewcategory, setreviewcategory] = useState([])
  const [reviewsubcategory, setreviewsubcategory] = useState([])
  const [categoryvalue, setcategoryvalue] = useState("")
  const [subcategoryvalue, setsubcategoryvalue] = useState("")
  const [reviewcontent, setreviewcontent] = useState("")
  const [isgolive, setisgolive] = useState(false)
  const [stream, setStream] = useState(true)
  const [videoBlob, setVideoUrlBlob] = useState(null)
  const [uploadvideofile, setuploadvideofile] = useState(null)
  const [videourl, setvideourl] = useState("")
  const [isrecording, setIsRecording] = useState(false)
  const [bdata, setbdata] = useState({})
  const [checkedStatus, setcheckedStatus] = useState(0)

  const dispatch = useDispatch();
  const {id} = useParams();
  const url = baseUrl();

    const webcamRef = useRef(null);
    const videoConstraints = {
      width: 300,
      height: 300,
      facingMode: 'user',
    };
  
   
  
    const startRecording = () => {
      const videoElement = webcamRef.current.video;
      const mediaRecorder = new MediaRecorder(videoElement.captureStream());
      const chunks = [];
  
   
  
      mediaRecorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          chunks.push(event.data);
        }
      };
  
      setIsRecording(true)
  
      mediaRecorder.onstop = () => {
        const recordedBlob = new Blob(chunks, { type: 'video/webm' });
        setVideoUrlBlob(recordedBlob)
        const url = URL.createObjectURL(recordedBlob)
        setvideourl(url)
        setStream(false)
        //setIsRecording(false)
        // Do something with the recorded video blob, e.g., upload to a server
      };
  
   
  
      mediaRecorder.start();
      setTimeout(() => {
        mediaRecorder.stop();
      }, 5000); // Stop recording after 5 seconds, adjust the duration as needed
    };






  const handleClose = () => setShow(false);
  const token = localStorage.getItem('accessToken');
  const businessId = localStorage.getItem('business_id'); 



 
  


  const handleChange = e => {
    const target = e.target;
    if (target.checked) {
      settype(target.value);
    }
  };

  const getCheckedInRequest = async () => {
   
    let body = {
        "key":"facb6e0a6fcbe200dca2fb60dec75be7",
        "source":"WEB",
        "app_access_token":token&&token,
        "businessId":businessId
      }

  await axios.post("/get-single-check-in", JSON.stringify(body))
  .then((response) => {
   
    if(response.data.success){
        setcheckedStatus(response.data.data?.checkin_status)
    }
  })
  .catch((error) => {
  
      if(error.response.status === 404){
          toast.error(error.response.data.message);
      }
    
  });
  }

  const CheckedInHandle = async ()=>{
    setloading(true)

    let body = {
        "key":"facb6e0a6fcbe200dca2fb60dec75be7",
        "source":"WEB",
        "app_access_token":token&&token,
        "businessId":businessId
      }

  await axios.post("/apply-check-in", JSON.stringify(body))
  .then((response) => {
   
      setloading(false)
    if(response.data.success){
      toast.success(response.data.message);
      getBusinessData()
    }
  })
  .catch((error) => {
      setloading(false)
    
      if(error.response.status === 404){
          toast.error(error.response.data.message);
      }
    
  });
  }


  const reviewMainCategory = async () => {
    setloading(true)

    let body = {
        "key":"facb6e0a6fcbe200dca2fb60dec75be7",
        "source":"WEB",
      }

  await axios.post("/user/get-review-main-category", JSON.stringify(body))
  .then((response) => {
      setloading(false)
    if(response.data.success){
      setreviewcategory(response.data.data)
    }
  })
  .catch((error) => {
      setloading(false)
      if(error.response.status === 404){
          toast.error(error.response.data.message);
      }
  });



  }

  const getBusinessData = async () => {
    setloading(true)

    let body = {
        "key":"facb6e0a6fcbe200dca2fb60dec75be7",
        "source":"WEB",
        "app_access_token":token&&token,
        "business_id":id
      }

  await axios.post("/business-details", JSON.stringify(body))
  .then((response) => {
   
      setloading(false)
    if(response.data.success){
      setbdata(response.data.data)
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

  useEffect(() => {
      getCheckedInRequest()
      reviewMainCategory()
      getBusinessData()
    }, [])

    
  const GetcartData = async ()=>{
    setloading(true)
    
    let body = {
      "key":"facb6e0a6fcbe200dca2fb60dec75be7",
      "source":"WEB",
      "app_access_token":token&&token,
    }

  await axios.post("/user/cart", JSON.stringify(body))
  .then((response) => {
   
      setloading(false)
    if(response.data.success){
      dispatch({ type: "cartpage", cartstore: response.data.data?.cartData })
    }
  })
  .catch((error) => {
      setloading(false)
    
      if(error.response.status === 404){
          toast.error(error.response.data.message);
      }
      
  });

  }

    const CategoryReviewHandle = async (e) =>{

      setcategoryvalue(e.target.value)


      let body = {
        "key":"facb6e0a6fcbe200dca2fb60dec75be7",
        "source":"WEB",
        "category_id":e.target.value
      }

      await axios.post("/user/get-review-sub-category", JSON.stringify(body))
      .then((response) => {
          setloading(false)
        if(response.data.success){
          setreviewsubcategory(response.data.data)
        }
      })
      .catch((error) => {
          setloading(false)
          if(error.response.status === 404){
              toast.error(error.response.data.message);
          }
      });

    }


      var settings = {
        dots: false,
        className: "center",
        infinite: true,
        centerMode: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows:false,
        centerPadding:"60px",
        autoplay:true
      };


      const CartHandle = async (cart_id) => {
        setloading(true)
        let body = {
          "key":"facb6e0a6fcbe200dca2fb60dec75be7",
          "source":"WEB",
          "app_access_token":token&&token,
          "deal_id":cart_id
        }
  
    await axios.post("user/add-to-cart", JSON.stringify(body))
    .then((response) => {
     
        setloading(false)
      if(response.data.success){
        toast.success(response.data.message);
        getBusinessData()
        GetcartData()
      }
    })
    .catch((error) => {
        setloading(false)
      
        if(error.response.status === 404){
            toast.error(error.response.data.message);
        }
      
    });
      }

      const uploadVideoHandler = (event) => {
        const file = event.target.files[0];
        setVideoUrlBlob(file)
      }

const SubmitReview = async () => {

  if(categoryvalue == ''){
    toast.error("Please select a category")
  } else if(subcategoryvalue == ''){
    toast.error("Please select a sub category")
  } else {

    setloading(true)
    const FormData = require("form-data");
      let data = new FormData();
      data.append("key", "facb6e0a6fcbe200dca2fb60dec75be7");
      data.append("source", "WEB");
      data.append("app_access_token", token && token);
      data.append("business_id", id);
      data.append("custom_checkbox1", type);
      data.append("review_category", categoryvalue);
      data.append("review_category1", '');
      data.append("review_sub_category", subcategoryvalue);
      data.append("review_sub_category1", '');
      data.append("review_content", reviewcontent);
      data.append("review_content1", '');
      data.append("video_filename", videoBlob);

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${url}/user/submit-review`,
        data: data,
      };

      axios
        .request(config)
        .then((response) => {
          setloading(false);
          if (response.data.success) {
            toast.success(response.data.message);
            setShow(false)
          }
        })
        .catch((error) => {
          setloading(false);
          if (error.response.status === 404) {
            toast.error(error.response.data.message);
          }
        });


  }


}
  


  return (
    <div className='customer-layout'>
       {loading && <CustomLoader />}
       <div className="top-f-header">
    <AfterLoginTopbar
      />
      <div className='header-info'>
        <div className='container'>
          {bdata?.business_name}
        </div>
    </div>
      </div>
      <div className='comon-layout'>
      <div className='container'>
        <div className='row'>
            <div className='col-lg-5 col-12'>
            <div className='details-slider'>
                <Slider {...settings}>
                {bdata?.business_images&&bdata?.business_images.map((item, index)=>{
                    return (
                    <div className='slider-image' key={index}>
                        <img src={item}/>
                    
                    </div>
                    )
                })}
                
                
                </Slider>
            </div>
            </div>
            <div className='col-lg-7 col-12'>
                  <div className='product-info'>
                      <table>
                        <tr>
                          <td>
                             <label>Company</label>
                          </td>
                          <td>
                              <span>{bdata?.business_name}</span>
                          </td>
                        </tr>
                        {bdata?.business_address&&bdata?.business_address.map((add, index)=>{
                          return (
                            <tr key={index}>
                              <td>
                                <label><i className="fa-solid fa-location-dot"></i> Address {index + 1}:</label>
                              </td>
                              <td>
                                  <h5>{add?.address}</h5>
                              </td>
                            </tr>
                          )
                        })}
                        
                        <tr>
                          <td>
                             <label><i className="fa-solid fa-phone"></i> Phone:</label>
                          </td>
                          <td>
                              <a href={`tel:${bdata?.contact_no}`}>{bdata?.contact_no}</a>
                          </td>
                        </tr>
                        <tr>
                          <td>
                             <label><i className="fa-solid fa-clock"></i> Opening Hours:</label>
                          </td>
                          <td>
                              <ul>
                                {bdata?.working_hours&&bdata?.working_hours.map((val,i)=>{
                                  return(
                                    <li key={i}>{val}</li>
                                  )
                                })}
                               
                              </ul>
                          </td>
                        </tr>
                      </table>
                      <ul className='s-btn'>
                        <li>
                          <button className='themeBtn' onClick={()=>setShow(true)}>Add A Review</button>
                        </li>
                        <li>
                          <button onClick={CheckedInHandle} className="themeBtnOutline" disabled={checkedStatus == 1 ? true : false}>{checkedStatus == 1 ? <i className="fa-solid fa-check"></i> : null}Check In</button>
                            
                        </li>
                      </ul>
                  </div>
            </div>
        </div>

        <div className='product-tabs mt-4'>
        <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3"
    >
      <Tab eventKey="home" title={`Deals (${bdata?.business_deals&&bdata?.business_deals.length})`}>
        {bdata?.business_deals&&bdata?.business_deals.length > 0 ?
          bdata?.business_deals&&bdata?.business_deals.map((item, index) =>{
            return (
              <div className='deal-card' key={index}>
                {item?.deal_image &&
                  <div className='dealcard-img'>
                      <img src={item?.deal_image} className='w-100'/>
                  </div>
                 }
                 {item?.deal_text &&
                  <div className='dealcard-text' style={{background:item?.primary_bgcolor,padding:'5px'}}>
                      <h5 style={{color:item?.primary_fontcolor,fontStyle:item?.primary_font_style,fontFamily:item?.primary_font_family,fontSize:'17px'}}>{item?.deal_text}</h5>
                  </div>
                 }

{item?.is_cart === 0 ? <button className='themeBtn' onClick={()=>CartHandle(item.deal_id)}>
                  Add to cart
                </button>
                :
                <NavLink to="/cart" className='themeBtn'>
                  Go to cart
                </NavLink>
                 
              }


              </div>
            )
          })
        :
        <h5>No Deals for {bdata?.business_name}</h5>
        }
      </Tab>
      <Tab eventKey="profile" title={`Video Reviews (${bdata?.video_reviews&&bdata?.video_reviews.length})`}>
      <div className='text-review'>

          {bdata?.video_reviews&&bdata?.video_reviews.length > 0 ?

                        bdata?.video_reviews&&bdata?.video_reviews.map((review,index)=>{
                            var rating = parseInt(review.rating)
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
                              <div className='rating-container' key={index}>
                                  {StarData}
                                  <h3>{review?.category}</h3>
                                  <iframe src={review?.video_filename} width="100%" height="200">

                                  </iframe>
                                  <span>--{review?.review_by}</span>
                              </div>
                          )
                        })
                      :
                      <h5>No videos review for {bdata?.business_name}</h5>
                      
                      }
          </div>
      </Tab>
      <Tab eventKey="contact" title={`Reviews (${bdata?.text_reviews&&bdata?.text_reviews.length})`}>
          <div className='text-review'>
              {bdata?.text_reviews&&bdata?.text_reviews.length > 0 ?

                        bdata?.text_reviews&&bdata?.text_reviews.map((review,index)=>{
                            var rating = parseInt(review.rating)
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
                              <div className='rating-container' key={index}>
                                  {StarData}
                                  <h3>{review?.category}</h3>
                                  <p>{review?.content}</p>
                                  <span>--{review?.review_by}</span>
                              </div>
                          )
                        })
                        :
                        <h5>No review for {bdata?.business_name}</h5>
                      
                      }
          </div>
      </Tab>
    </Tabs>
          </div> 

     


        </div>
       

    </div>
    <BottomTabCustomer/>


    <Modal show={show} onHide={handleClose} centered size="lg" className='ReviewModal'>
    <Modal.Header>
      <Modal.Title>Business Review Of Sanjay Medicure Hall</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <h4>Write a Review</h4>
      
      <div className='form-group'>
          <ul className='acInflex'>
              <li>
                  <input type='radio' id="active" name='status' value="video" checked={type == 'video'} onChange={handleChange}  />
                  <label htmlFor="active">Review in Video</label>
              </li>
              <li>
                  <input type='radio' id="inactive" name='status' value="text" checked={type == 'text'} onChange={handleChange} />
                  <label htmlFor="inactive">Review in Text</label>
              </li>
          </ul>
      </div>
      
      
      <div className='form-group'>
        <label>Review Category</label>
        <select className='form-control' onChange={(e)=>CategoryReviewHandle(e)}>
        <option value="">Select Review Category</option>
        {reviewcategory&&reviewcategory.map((item, index)=>{
          return (
            <option value={item?.review_category_id} key={index}>{item?.category_name}</option>
          )
        })}
        
        </select>
      </div>
      {categoryvalue == "19" ? null : 
      <div className='form-group'>
        <label>Review Sub Category</label>
        <select className='form-control' value={subcategoryvalue} onChange={(e)=>setsubcategoryvalue(e.target.value)}>
        <option value="">Select review sub category</option>
            {reviewsubcategory&&reviewsubcategory.map((item, index)=>{
              return (
                <option value={item?.review_category_id} >{item?.category_name}</option>
              )
            })}
           
          
        </select>
      </div>
      }
      {categoryvalue == "19" && 
      <div className='form-group'>
        <textarea className='form-control' placeholder='Review Content' value={reviewcontent} onChange={(e)=>setreviewcontent(e.target.value)}>
                
        </textarea>
      </div>
}


{type == "video" && (
  <>
  {!isgolive ?
    <div className='video-type text-center'>
        <div className='form-group'>
          <label style={{display:'block',color:'red'}}>Need to upload video within 2MB size.</label>
            <button className='golivebtn' onClick={()=>setisgolive(true)}>
                Go Live
            </button>
        </div>
        <h5>OR</h5>
        <div className='form-group'>
          <div className='custom-v-file'>
          <label>Upload your videos</label>
          <input type='file' onChange={uploadVideoHandler} accept='video/*'  />
          </div>
         
        </div>
    </div>
:
<>
      <div className='form-group'>
        {isrecording ? <h5>Recording...(Only 1 Mints)</h5>
        :
        
        <button  id="startrecord" onClick={startRecording} className='btn btn-sm btn-primary mr-2'>Start Recording</button>
      }
     
     <button className='btn btn-sm btn-warning' onClick={()=>setisgolive(false)}>No interest</button>
     
      </div>
      <div className='form-group'>
      {stream ?  <Webcam audio={false} ref={webcamRef} videoConstraints={videoConstraints} />
      :
      <video src={videourl} controls muted></video>
      
    }
    </div>
    </>
}
    </>
)
}
      <ul>
      
      <li>
      <button className='btn btn-md btn-success' onClick={SubmitReview}>
         Submit Review
        </button>
    
      </li>
    </ul>

    </Modal.Body>
  
   
  </Modal>

    </div>
  )
}

export default BusinessDetails