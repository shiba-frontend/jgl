import React,{useEffect,useState} from 'react'
import AfterLoginTopbar from '../header/AfterLoginTopbar'
import { NavLink } from 'react-router-dom'
import BottomTabCustomer from '../header/BottomTabCustomer';
import { IMAGE } from '../../../common/Theme';
import axios from "axios";
import { toast } from "react-toastify";
import CustomLoader from '../../../common/CustomLoader';
import { useSelector, useDispatch } from "react-redux";
import { useSpeechSynthesis } from 'react-speech-kit';

const Deals = () => {
    const [loading, setloading] = useState(false)
    const [text, settext] = useState('');
    const [isListening, setIsListening] = useState(false);
    const [progressive, setprogressive] = useState(0)
    const [index, setindex] = useState(0)
    const { speak, cancel } = useSpeechSynthesis();
    const getdeals = useSelector((state) => state.dealsLocationList);
    const getstatus = useSelector((state) => state.isstatus);
    const dispatch = useDispatch();

    const recognition = new window.webkitSpeechRecognition();

    var localLat = localStorage.getItem("lat_name");
     var localLng = localStorage.getItem("lng_name");
     const token = localStorage.getItem('accessToken');

     const getbusinessList = async ()=>{

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition (function (position) {
          var lat = position.coords.latitude;
          var lng = position.coords.longitude;
          

          setloading(true)

          let body = {
              "key":"facb6e0a6fcbe200dca2fb60dec75be7",
              "source":"WEB",
              "lat":lat,
              "lng":lng
            }
            axios.post("/get-home-deals", JSON.stringify(body))
            .then((response) => {
              setloading(false)
              if(response.data.success){
                dispatch({ type: "dealslocation", dealsLocationList: response.data.data })
                dispatch({ type: "status", isstatus: false })



              } 
            })
            .catch((error) => {
              setloading(false)
                if(error.response.status === 404){
                    toast.error(error.response.data.message);
                }
              
            });

        });
     
      }

        

    }

    const customLocation = async () => {
      setloading(true)

      let body = {
          "key":"facb6e0a6fcbe200dca2fb60dec75be7",
          "source":"WEB",
          "lat":localLat,
          "lng":localLng,
        }
        axios.post("/get-home-deals", JSON.stringify(body))
        .then((response) => {
          setloading(false)
          if(response.data.success){
            dispatch({ type: "dealslocation", dealsLocationList: response.data.data })
            dispatch({ type: "status", isstatus: false })
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
        "deal_id":cart_id
      }

  await axios.post("user/add-to-cart", JSON.stringify(body))
  .then((response) => {
   
      setloading(false)
    if(response.data.success){
      if(localLat && localLng){
        customLocation();
      } else {
        getbusinessList();
      }
      GetcartData()
      toast.success(response.data.message);
    }
  })
  .catch((error) => {
      setloading(false)
    
      if(error.response.status === 404){
          toast.error(error.response.data.message);
      }
    
  });
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
    useEffect(()=>{

      if(localLat && localLng){
        customLocation();
      } else {
        getbusinessList();
      }

    },[getstatus])


    useEffect(()=>{
      if(getdeals &&getdeals.length > index){
        const interval = setInterval(() => {
          if(progressive < 6){
            setprogressive(progressive + 1);
          }
        }, 1000);
         if(progressive > 5){
          setprogressive(0)
          setindex(index + 1)
        } 
        if(progressive == 0){
          randamTextSpeak(index)
        }
        return () => clearInterval(interval);
      }

    },[progressive, getdeals])


    const randamTextSpeak = (index)=>{
      var businessName = `From ${getdeals&&getdeals[index]?.business_name}`
      var title =  getdeals&&getdeals[index]?.title;
      var description = getdeals&&getdeals[index].deal_text == '' ? '' : getdeals&&getdeals[index].deal_text
      var content =  title&&title.concat(businessName + description)
      speak({text: content})
    }

    function StopLisning(){
      cancel({text:""})
      setindex(index + getdeals &&getdeals.length)
    }
    


  recognition.onstart = () => {
    setTimeout(()=>{
      setIsListening(false);
      recognition.stop();
    },4000)
  };
  
  recognition.onresult =  (event) => {
      const transcript = event.results[0][0].transcript;
    dispatch({ type: "voice", voicesearch: transcript })
    settext(transcript);
    setloading(true)

          let body = {
          "key":"facb6e0a6fcbe200dca2fb60dec75be7",
          "source":"WEB",
          "app_access_token":token&&token,
          "search_phrase":transcript
        }
  
   axios.post("/deal-voice-search", JSON.stringify(body))
    .then((response) => {
     
        setloading(false)
      if(response.data.success){
        dispatch({ type: "dealslocation", dealsLocationList: response.data.data })
      }
    })
    .catch((error) => {
        setloading(false)
      
        if(error.response.status === 404){
            toast.error(error.response.data.message);
        }
      
    });
  };
  
  const handleStartStop = async () => {
    setIsListening(true);
    recognition.start();
  };

  const ResetNews = async() =>{
    settext('');
    if(localLat && localLng){
      customLocation();
    } else {
      getbusinessList();
    }
  }



  return (
    <div className='customer-layout'>
         {loading && <CustomLoader />}
         <div className="top-f-header">
    <AfterLoginTopbar/>
    <div className="header-info">
        <div className="container"><img src={IMAGE.deal_icon}/> Deals</div>
      </div>
      </div>
    <div className='comon-layout'>
         <div className='container'>
          {index > 0 &&  <button className='btn btn-sm btn-danger mb-2' onClick={StopLisning}>Stop Listen</button>}
           

            {getdeals&&getdeals.length > 0 ?

            getdeals&&getdeals.map((item, index) =>{
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
                 <h4>{item?.title}</h4>

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
          <div className='notFound'>
          <h4>No data found</h4>
          <button className='themeBtn' onClick={ResetNews}>Get All Deals</button>
          </div>
        }
        </div>
        <div className='float-btn'>
   
   <button onClick={handleStartStop}>
 {isListening ? <i class="fa-solid fa-microphone-lines-slash"></i> :  <i class="fa-solid fa-microphone-lines"></i>  }
   

   </button>


</div>

    </div>
    <BottomTabCustomer/>
    </div>
  )
}

export default Deals