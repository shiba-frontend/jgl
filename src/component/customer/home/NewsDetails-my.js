import React,{useState,useEffect} from 'react'
import { useSelector, useDispatch } from "react-redux";
import AfterLoginTopbar from '../header/AfterLoginTopbar'
import PageMenu from '../header/PageMenu'
import BottomTabCustomer from '../header/BottomTabCustomer';
import { NavLink, Navigate, useNavigate,useParams } from "react-router-dom";
import axios from 'axios';
import { toast } from 'react-toastify';
import CustomLoader from '../../../common/CustomLoader';
import { useSpeechSynthesis } from 'react-speech-kit';


const NewsDetails = () => {

  const [loading, setloading] = useState(false)
  const [newsData, setnewsData] = useState({})
  const [progressive, setprogressive] = useState(0)
  const [index, setindex] = useState(0)
  const [isshowing, setisshowing] = useState(false)
  const [isstart, setisstart] = useState(false);
  const { speak, cancel } = useSpeechSynthesis();
  const [voiceText, setvoiceText] = useState('')

  const dispatch = useDispatch();
 
   const {id} =  useParams()
   const navigate = useNavigate()
  //  const synthesis = window.speechSynthesis;
  //  const voices = synthesis.getVoices();
   const token = localStorage.getItem('accessToken');

  //  const handleSpeak = () => {
  //   const utterance = new SpeechSynthesisUtterance(voiceText);
  //   const selectedVoice = voices.find((voice) => voice.lang === "en-US");
  //   utterance.voice = selectedVoice;
  //   synthesis.speak(utterance);
  // };


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
      setvoiceText(response.data.data.title)
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
    window.speechSynthesis.cancel();
     }, [])


     useEffect(() => {
if(newsData?.random_deals && newsData?.random_deals.length > index){

  const interval = setInterval(() => {
    if(progressive < 9){
      setprogressive(progressive + 1);
    }
  }, 1000);
  
 
   if(progressive > 8){
    setprogressive(0)
    setindex(index + 1)
    
  } 

  if(progressive == 0){
    HandleSpeakrandom(index)
  }

  return () => clearInterval(interval);


} else if(newsData?.random_deals && newsData?.random_deals.length <= index){
  setisshowing(true);

  HandleSpeak();
}

    
  }, [progressive, newsData?.random_deals]);



  const HandleSpeakrandom = (index)=>{
    const speechSynthesis = window.speechSynthesis;
    const message = new SpeechSynthesisUtterance();
    const voice = window.speechSynthesis.getVoices()[4]
    message.lang = "en-US";
    message.pitch = 1;
    message.rate = 0.9;
    message.voice = voice
    var businessName = `From ${newsData?.random_deals&&newsData?.random_deals[index]?.business_name}`
    var title = newsData?.random_deals&&newsData?.random_deals[index]?.title;
    var des = newsData?.random_deals&&newsData?.random_deals[index]?.deal_text == '' ? "" : newsData?.random_deals&&newsData?.random_deals[index]?.deal_text
    var content =  title&&title.concat(businessName + des)
    message.text = content;
    speechSynthesis.speak(message);
   // speak({text:content})
  }
 

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
  var title = newsData?.title
  var raw = newsData?.reading_short_description
  //var result = raw.replace(/\&nbsp;/g, '').substring(0, 1500);
  var result = raw.substring(0, 1000);
  var finalResult = `Story ${title + result}`
  const speechSynthesis = window.speechSynthesis;
 
  const message = new SpeechSynthesisUtterance();
  const voice = window.speechSynthesis.getVoices()[4]
  message.lang = "en-US";
  message.pitch = 1;
  message.rate = 0.9;
 // message.voice = voice
  message.text = finalResult;
  // speak({text:finalResult, voice: SpeechSynthesisVoice})
  speechSynthesis.speak(message);
console.log(result)
  setisstart(true)
  message.onend = () => {
    speak({text:"Thanks for listening"})
    setTimeout(() => {
      navigate("/home")
    },1000)
  };
}
const StopSpeak = ()=>{
  cancel({text:""})
  setisstart(false)
}


  return (
    <div className='customer-layout '>
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
          <div className='progress-bar-fill' style={{width:`${progressive * 12.5}%`}}>
            
            </div>
        </div>
      </div>
      <div className='comon-layout'>
      
      <div className='container'>
      
       {!isshowing ?
         <div className='article-d'>
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
                 <h4>{newsData?.random_deals&&newsData?.random_deals[index]?.title}</h4>
                {newsData?.random_deals&&newsData?.random_deals[index]?.is_cart === 0 ? <button className='themeBtn' onClick={()=>CartHandle(newsData?.random_deals&&newsData?.random_deals[index]?.deal_id)}>
                  Add to cart
                </button>
                :
                <NavLink to="/cart" className='themeBtn'>
                  Go to cart
                </NavLink>
                 
              }

              </div>
             </div>
:
<>

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