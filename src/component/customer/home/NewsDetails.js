import React,{useState,useEffect} from 'react'
import { useSelector, useDispatch } from "react-redux";
import AfterLoginTopbar from '../header/AfterLoginTopbar'
import PageMenu from '../header/PageMenu'
import BottomTabCustomer from '../header/BottomTabCustomer';
import { NavLink, useNavigate,useParams } from "react-router-dom";
import axios from 'axios';
import { toast } from 'react-toastify';
import CustomLoader from '../../../common/CustomLoader';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useSpeechSynthesis } from 'react-speech-kit';


const NewsDetails = () => {

  const [loading, setloading] = useState(false)
  const [newsData, setnewsData] = useState({})
  const [progressive, setprogressive] = useState(0)
  const [index, setindex] = useState(0)
  const [isshowing, setisshowing] = useState(false)
  const [isstart, setisstart] = useState(false);
  const { speak, cancel } = useSpeechSynthesis();

  const dispatch = useDispatch();
 
   const id =  useParams()


   const token = localStorage.getItem('accessToken');

   const getdetailsdata = async () => {
     setloading(true)
   
     let body = {
         "key":"facb6e0a6fcbe200dca2fb60dec75be7",
         "source":"WEB",
         "app_access_token":token&&token,
         "article_id":id
       }
   
   await axios.post("/newspaper-article-details", JSON.stringify(body))
   .then((response) => {
    
       setloading(false)
     if(response.data.success){
      setnewsData(response.data.data)

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
    getdetailsdata()
     }, [])


     useEffect(() => {
if(newsData?.random_deals && newsData?.random_deals.length > index){
  const interval = setInterval(() => {
    if(progressive < 6){
      setprogressive(progressive + 1);
    }

  }, 1000);

  if(progressive > 5){
    setprogressive(0)
    setindex(index + 1)
  }

 

  
  return () => clearInterval(interval);
} else if(newsData?.random_deals && newsData?.random_deals.length <= index){
  setisshowing(true);
}

    
  }, [progressive, newsData?.random_deals]);


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
    

const HandleSpeak = ()=>{
  speak({text:newsData?.description})
  setisstart(true)
}
const StopSpeak = ()=>{
  cancel({text:""})
  setisstart(false)
}


  return (
    <div className='customer-layout'>
        {loading && <CustomLoader />}
       <div className="top-f-header">
    <AfterLoginTopbar
      />
      <div className='header-info'>
        <div className='container'>
          Top Stories
        </div>
        </div>
        <div className='progress-bar-container'>
          <div className='progress-bar-fill' style={{width:`${progressive * 20}%`}}>
            
            </div>
        </div>
      </div>
      <div className='comon-layout'>
      
      <div className='container'>
       {!isshowing ?
                  <div className='deal-card'>
                {newsData?.random_deals&&newsData?.random_deals[index]?.deal_image &&
                  <div className='dealcard-img'>
                      <img src={newsData?.random_deals&&newsData?.random_deals[index]?.deal_image} className='w-100'/>
                  </div>
                 }
                
                {newsData?.random_deals&&newsData?.random_deals[index]?.deal_text &&
                  <div className='dealcard-text' style={{background:newsData?.random_deals&&newsData?.random_deals[index]?.primary_bgcolor,padding:'5px'}}>
                      <h5 style={{color:newsData?.random_deals&&newsData?.random_deals[index]?.primary_fontcolor,fontStyle:newsData?.random_deals&&newsData?.random_deals[index]?.primary_font_style,fontFamily:newsData?.random_deals&&newsData?.random_deals[index]?.primary_font_family,fontSize:'17px'}}>{newsData?.random_deals&&newsData?.random_deals[index]?.deal_text}</h5>
                  </div>
                 }
                {newsData?.random_deals&&newsData?.random_deals[index]?.is_cart === 0 ? <button className='themeBtn' onClick={()=>CartHandle(newsData?.random_deals&&newsData?.random_deals[index]?.deal_id)}>
                  Add to cart
                </button>
                :
                <NavLink to="/cart" className='themeBtn'>
                  Go to cart
                </NavLink>
                 
              }

              </div>
             
:
<>
      <PageMenu/>
    <div className='listen-btn text-right mb-2'>
      {!isstart ? 
    <button onClick={HandleSpeak} className='btn btn-sm btn-success'> <i class="fa-solid fa-volume-low"></i> Listen</button>
    :
    <button onClick={StopSpeak} className='btn btn-sm btn-danger ml-2'><i class="fa-solid fa-volume-xmark"></i> Stop Listen</button>
      }
    </div>
        <div className='top-stories'>
           
                <div className='story-list stry-details'>
                <div className='row'>
                    <div className='col-lg-5 col-12'>
                        <div className='story-list-img'>
                        <img src={newsData?.article_image}/>
                        </div>
                    </div>
                    <div className='col-lg-7 col-12'>
                    <div className='story-list-info'>
                        <h2>{newsData?.title}</h2>
                        <div dangerouslySetInnerHTML={{ __html: newsData?.description }} />
                    </div>
                </div>
              </div>
            
             
            </div>
       
        </div>
        </>
}

        </div>
       

    </div>
    <BottomTabCustomer/>
    </div>
  )
}

export default NewsDetails