import React,{useState, useEffect, useRef} from 'react'
import AfterLoginTopbar from '../header/AfterLoginTopbar'
import PageMenu from '../header/PageMenu'
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import BottomTabCustomer from '../header/BottomTabCustomer';
import { IMAGE } from '../../../common/Theme';
import axios from 'axios';
import { toast } from 'react-toastify';
import CustomLoader from '../../../common/CustomLoader';
import Dropdown from 'react-bootstrap/Dropdown';
import annyang from 'annyang';




const Home = () => {
  const [loading, setloading] = useState(false)
  const [text, settext] = useState('');
  const [CategoryList, setCategoryList] = useState([])
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const newsResultList = useSelector((state) => state.newsresult);
  const Voice = useSelector((state) => state.voicesearch);

  const recognition = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const token = localStorage.getItem('accessToken');
 const isLoc = localStorage.getItem("locstatus");

  const GetData = async ()=>{
       
    let body = {
      "key":"facb6e0a6fcbe200dca2fb60dec75be7",
      "source":"WEB",
      "app_access_token":token&&token,
    }

  await axios.post("/newspaper/category-list", JSON.stringify(body))
  .then((response) => {
   
    if(response.data.success){
      setCategoryList(response.data.data)
    }
  })
  .catch((error) => {
     
      if(error.response.status === 404){
          toast.error(error.response.data.message);
      }
      
  });

  }

 

const getCheckedInRequest = async () => {
  setloading(true)
  settext('');
  let body = {
      "key":"facb6e0a6fcbe200dca2fb60dec75be7",
      "source":"WEB",
      "app_access_token":token&&token,
      "search_phrase":''
    }

await axios.post("/newspaper-home", JSON.stringify(body))
.then((response) => {
 
    setloading(false)
  if(response.data.success){
    dispatch({ type: "news", newsresult: response.data.data })
    // setgetdata(response.data.data)
  }
})
.catch((error) => {
    setloading(false)
  
    if(error.response.status === 404){
        toast.error(error.response.data.message);
    }
  
});
}



const ResetNews = async() =>{
  settext('');
  getCheckedInRequest();
 
}

const GetCurrentLocation = async ()=>{
    
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPositionDetect);
  } else {
    console.log('Geolocation is not supported by this browser.');
  }

  function showPositionDetect(position) {			  	
    var google_api_key 	= 'AIzaSyBMbNCogNokCwVmJCRfefB6iCYUWv28LjQ';
    var latitudeAuto 	= position.coords.latitude;
    var longitudeAuto	= position.coords.longitude;
    
        var cityName		= '';
        var stateName 		= '';
        var countryName 	= '';
        var pincodeName 	= '';
        var location_name 	= ''
            
        var latitude 	= latitudeAuto;
          var longitude 	= longitudeAuto;

          fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${google_api_key}`)
          .then(response => response.json())
          .then(data => {
      
            for (var ac = 0; ac < data.results[0].address_components.length; ac++) {    
              var component 	= data.results[0].address_components[ac];	
             // console.log(component);
             
              if(component.types.includes('locality') || component.types.includes('sublocality_level_1') || component.types.includes('postal_town')) {
             cityName = component.long_name;
              }
              if(component.types.includes('administrative_area_level_1')) {
             stateName = component.short_name;
              }
              if(component.types.includes('country')) {
             countryName = component.short_name;
              }
              if(component.types.includes('postal_code')) {
             pincodeName = component.short_name;
              }							
         };

        location_name 	= cityName + ', ' + stateName + ', ' + countryName;
        localStorage.setItem("location_name",location_name);
        localStorage.setItem("lat_name",latitude);
        localStorage.setItem("lng_name",longitude);
        localStorage.setItem("locstatus",true);
          })
          .catch(error => console.log('error', ))
         

  }

}

useEffect(() => {
  // if(newsData == ''){
  //   getCheckedInRequest();
  // } else {
  //   ApiCall()
  // }
  getCheckedInRequest();
  GetData()
  
  if(!isLoc){
    GetCurrentLocation()
  }
 


  }, [])

  useEffect(() => {



    console.log("checking")
    // Check if speech recognition is available in the browser
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      // Create a new SpeechRecognition instance
      recognition.current = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

      // Continuous results: Speech recognition continues to listen for speech until stopped manually.
      recognition.current.continuous = true;

      // Set the language for recognition, change it as needed
      recognition.current.lang = 'en-US';

      // Event listener when the recognition result is available
      recognition.current.onresult = (event) => {
        const currentTranscript = event.results[event.results.length - 1][0].transcript;
        setTranscript(currentTranscript);
      };

      // Event listener when the recognition service starts (speech is detected)
      recognition.current.onstart = () => {
        setIsListening(true);
      };

      // Event listener when the recognition service stops (speech input ends)
      recognition.current.onend = () => {
        setIsListening(false);
      };

      // Start speech recognition
      recognition.current.start();
    } else {
      console.log('Speech recognition is not supported in this browser.');
    }

    return () => {
      if (recognition.current) {
        recognition.current.stop();
      }
    };
  }, [transcript]);


  // useEffect(() => {
  //   if (annyang) {
  //     annyang.start({ autoRestart: true, continuous: true, soundstart:false });
  //     annyang.addCallback('result', (phrases) => {
        
  //       // phrases is an array of the recognized speech
  //       if (phrases && phrases.length > 0) {

  //         var text = phrases[0]?.toUpperCase();
  //         console.log(text)
  //         var Matchresult = text.match('HEY ALEXA' || 'HEY ALEXA' || 'HI ALEXA' || 'ALEXA' || 'HE ALEXA');
       
  //           if (text.includes(Matchresult)) {
  //             var fresult = text.split(Matchresult, 2)[1].toLowerCase()
  //             settext(fresult)
  //             setTimeout(()=>{
  //               voicesearch(fresult)
  //             },1000)
  //           } else {
  //             console.log("does not contain.");
  //           }

       
  //       }
  //     });

  //     // Handle errors
  //     annyang.addCallback('error', (error) => {
  //       //console.error('Speech recognition error:', error);
  //     });
  //   } else {
  //     console.log('Web Speech API is not supported in this browser.');
  //   }

  //   // Clean up the annyang instance when the component unmounts
  //   return () => {
  //     if (annyang) {
  //       annyang.abort();
  //     }
  //   };
  // }, []);

 const voicesearch = (saerchtext)=>{
  setloading(true)
  let body = {
    "key":"facb6e0a6fcbe200dca2fb60dec75be7",
    "source":"WEB",
    "app_access_token":token&&token,
    "search_phrase":saerchtext
  }
axios.post("/newspaper-home", JSON.stringify(body))
  .then((response) => {
      setloading(false)
    if(response.data.success){
      dispatch({ type: "news", newsresult: response.data.data })
      // setgetdata(response.data.data)
    }
  })
  .catch((error) => {
      setloading(false)
      if(error.response.status === 403){
        toast.error(error.response.data.message);
    }
      if(error.response.status === 404){
          toast.error(error.response.data.message);
      }
    
  });
 }


const NextTopage = (id, name) => {
  navigate("/home-article",
  {
    state:{
      id:id,
      name:name,
    }
  }
  )
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
      </div>
      <div className='comon-layout'>
      <div className='container'>

      <div className='pageMenu'>
        <ul>
            
            <li>
                <button onClick={()=>NextTopage(CategoryList&&CategoryList[0]?.category_id, CategoryList&&CategoryList[0]?.category_name)}>
                {CategoryList&&CategoryList[0]?.category_name}
                </button>
            </li>
            <li>
                <button onClick={()=>NextTopage(CategoryList&&CategoryList[1]?.category_id, CategoryList&&CategoryList[1]?.category_name)}>
                {CategoryList&&CategoryList[1]?.category_name}
                </button>
            </li>
            <li>
                <button onClick={()=>NextTopage(CategoryList&&CategoryList[2]?.category_id, CategoryList&&CategoryList[2]?.category_name)}>
                {CategoryList&&CategoryList[2]?.category_name}
                </button>
            </li>
            <li>
                <button onClick={()=>NextTopage(CategoryList&&CategoryList[3]?.category_id, CategoryList&&CategoryList[3]?.category_name)}>
                {CategoryList&&CategoryList[3]?.category_name}
                </button>
            </li>
            <li>
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    More
                </Dropdown.Toggle>

                <Dropdown.Menu>
                   <ul>
                    {CategoryList&&CategoryList.slice(4).map((cat,i)=>{
                        return (
                            <li key={i}>
                            <button onClick={()=>NextTopage(cat?.category_id, cat?.category_name)}>
                {cat?.category_name}
                </button>
                        </li>
                        )
                       
                    })}
                    
                   
                   </ul>
                </Dropdown.Menu>
                </Dropdown>
            </li>
        </ul>
    </div>

      {newsResultList&&newsResultList.length > 0 ?
        <div className='top-stories'>
            <h1>Top Stories For The Day: <span>{transcript}</span> </h1>
            <div className='row'>
            {newsResultList&&newsResultList.map((item,index)=>{
                return (
                  <div className='col-lg-4 col-12' key={index}>
                    <NavLink to={`/news-details/${item.article_id}`}>
                    <div className='story-list'>
                        <div className='story-list-img'>
                            <img src={item?.article_image}/>
                          </div>
                          <div className='story-list-info'>
                            <h2> {item?.title}</h2>
                            <div dangerouslySetInnerHTML={{ __html: item?.short_description }} />
                         
                          </div>
                      </div>
                    </NavLink>
                     
                    </div>
                )
              })}
              
            
            </div>
         
        </div>
:
<div className='notFound'>
<h4>No data found</h4>
<button className='themeBtn' onClick={ResetNews}>Get All News</button>
</div>
            }

        </div>
        {/* <div className='float-btn'>
        {!iscondition ? 
                <button onClick={StartListening}>
                <i class="fa-solid fa-microphone-lines"></i> Speech to Search
                </button>
           
            :
        
                <button onClick={StopListening}>
                <i class="fa-solid fa-microphone-lines-slash"></i> Stop to confirm
                </button>
              
         
}
</div> */}

{/* <div className='float-btn'>
   
                <button >
              {isListening ? <i class="fa-solid fa-microphone-lines-slash"></i> :  <i class="fa-solid fa-microphone-lines"></i>  }
                
             
                </button>
           
      
</div> */}

    </div>
    <BottomTabCustomer/>

  
    </div>
    
  )
}

export default Home