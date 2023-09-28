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
import Modal from 'react-bootstrap/Modal';
import { useSpeechSynthesis } from 'react-speech-kit';
import Artyom from "artyom.js"
import { useSpeechRecognition } from 'react-speech-recognition';
import alanBtn from "@alan-ai/alan-sdk-web";

const Home = () => {
  const [loading, setloading] = useState(false)
  const [text, settext] = useState('');
  const [CategoryList, setCategoryList] = useState([])
  const [isListening, setIsListening] = useState(false);
  const [show, setShow] = useState(false);

  const Voice = useSelector((state) => state.voicesearch);
  const [singledata, setsingledata] = useState({})
  const [isread, setisread] = useState(false)
  const [progressive, setprogressive] = useState(0)
    const [index, setindex] = useState(0)
    const { speak, cancel } = useSpeechSynthesis();
    const [isToggled, setToggle] = useState(false);
  const handleClose = () => setShow(false);
  const recognition = new window.webkitSpeechRecognition();
  const [speechResult, setSpeechResult] = useState('');
  const [synth, setSynth] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const { transcript, listening, startListening, stopListening, browserSupportsSpeechRecognition } = useSpeechRecognition();

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const token = localStorage.getItem('accessToken');
 const isLoc = localStorage.getItem("locstatus");
 const is_modal = localStorage.getItem('ismodal');
 const newsResultList = useSelector((state) => state.newsresult);
 const getprofileName = useSelector((state) => state.getprofile);
 const newsVoiceResultList = useSelector((state) => state.newsresultread);




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
    setisread(false)
    dispatch({ type: "newsresultread", newsresultread: [] })
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
 if(!is_modal){
  setShow(true)
  setTimeout(()=>{
    setShow(false)
    setIsListening(true)
    localStorage.setItem("ismodal", true)
  },3000)
 }



  }, [])




 

  // useEffect(() => {
  //   // Create a new instance of Artyom
  //     if ('speechSynthesis' in window) {
  //       window.speechSynthesis.onvoiceschanged = () => {
  //         console.log('SpeechSynthesis is ready!');
  //       };
  //     } else {
  //       console.error('SpeechSynthesis API is not available in this browser.');
  //     }
  //   const artyom = new Artyom();

  //   // Add commands that you want Artyom to recognize
  //   artyom.addCommands([
  //     {
  //       indexes: ['hello', 'hi', 'hey'],
  //       action: () => {
  //         console.log('Hello, how can I help you?');
  //         artyom.say("Hey buddy ! How are you today?");
  //       },
  //     },
  //     // Add more commands here as needed
  //   ]);

  //   // Start the speech recognition
  //   artyom.initialize({
  //     lang: 'en-US', // Set the language for recognition
  //     continuous: true, // Keep listening for commands continuously
  //     debug: true, // Enable debug mode for logging
  //   });

  //   // Clean up on component unmount
  //   return () => {
  //     artyom.fatality();
  //   };
  // }, []);

  useEffect(() => {
    alanBtn({
        key: '300ac89da58053f6f624f460a731363f2e956eca572e1d8b807a3e2338fdd0dc/stage',
        onCommand: ({command}) => {
          if (command === 'give'){
            alert("You have")
          }
        }
    });
  }, []);

  const handleSpeechResult = (userSaid) => {
    
    // Process the user's speech here
    setSpeechResult(userSaid);
    handleVoiceCommand(userSaid);
  };

  const handleVoiceCommand = (userSaid) => {

    console.log('Handle voice command', userSaid[0].toUpperCase())

    var text = userSaid[0].toUpperCase();
    var Matchresultone = text.match('HEY JOHN');
    var Matchresulttwo = text.match('HI JOHN');
    var Matchresultthree = text.match('JOHN');
    var splitText = text.split('ME')
    var rawText = splitText[1]?.toLowerCase()
    var matchTextone = text.match('CAN YOU GIVE')
    var matchTexttwo = text.match('YOU GIVE')

    var readTextOne = text.match('DETAILS OF');
    var readTextTwo = text.match('DETAILS');

    if (text.includes(Matchresultone)) {
      respondToUser(`hello ${getprofileName} How can I assist you?`);
    } else if (text.includes(Matchresulttwo)) {
      respondToUser(`hello! ${getprofileName} How can I assist you?`);
    } else if (text.includes(Matchresultthree)) {
      respondToUser(`hello! ${getprofileName} How can I assist you?`);
    } else if (text.includes(matchTextone)) {
      respondToUser(`Thanks! you are search for  ${rawText}`);
      setTimeout(()=>{
        settext(rawText)
        voicesearch(rawText)
      },2500)
    } else if (text.includes(matchTexttwo)) {
      respondToUser(`Thanks! you are search for  ${rawText}`);
      setTimeout(()=>{
        settext(rawText)
        voicesearch(rawText)
      },2500)
    } else if (text.includes(readTextOne)) {
      respondToUser(`Thanks! you are search for  ${text}`);
      setTimeout(()=>{
        settext(rawText)
        ReadList(text?.toLowerCase())
      },2500)
    } else if (text.includes(readTextTwo)) {
      respondToUser(`Thanks! you are search for  ${text}`);
      setTimeout(()=>{
        settext(rawText)
        ReadList(text?.toLowerCase())
      },2500)
    } else {
      respondToUser(`I'm sorry, ${getprofileName} I didn't understand that. please try again`);
    }
  };

  const respondToUser = (text) => {
    const speechSynthesis = window.speechSynthesis;
    const message = new SpeechSynthesisUtterance();
    const voice = window.speechSynthesis.getVoices()[4]
    message.lang = "en-US";
    message.pitch = 1;
    message.rate = 0.9;
    message.voice = voice
    message.text = text;
   console.log(message);
    speechSynthesis.speak(message);
  };




 const voicesearch = (saerchtext)=>{
  dispatch({ type: "newsresultread", newsresultread: [] })
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
      dispatch({ type: "newsresultread", newsresultread: response.data.data })
      // setgetdata(response.data.data)
      setindex(0)

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

 const ReadList = (saerchtextx)=>{
  setloading(true)
  let body = {
    "key":"facb6e0a6fcbe200dca2fb60dec75be7",
    "source":"WEB",
    "app_access_token":token&&token,
    "search_phrase":saerchtextx
  }

  console.log(body)

axios.post("/voice-newspaper-read-single", JSON.stringify(body))
  .then((response) => {
      setloading(false)
    if(response.data.success){
      setsingledata(response.data.data)
      setisread(true)
      
      console.log(response.data.data)

      navigate(`/news-details/${response.data.data.article_id}`)
      dispatch({ type: "newsresultread", newsresultread: [] })
      // setgetdata(response.data.data)
      setindex(0)
    }
  })
  .catch((error) => {
      setloading(false)
      if(error.response.status === 403){
        toast.error(error.response.data.message);
       
    }
      if(error.response.status === 404){
          toast.error(error.response.data.message);
          getCheckedInRequest()
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


function StopLisning(){
  setToggle(!isToggled);
  if(isToggled){
    window.speechSynthesis.resume();
  } else {
    window.speechSynthesis.pause();
  }

  //setindex(index + newsResultList &&newsResultList.length)
}

useEffect(() => {

  if(newsVoiceResultList&&newsVoiceResultList.length > index){
    const interval = setInterval(() => {
      if(progressive < 7){
        setprogressive(progressive + 1);
      }
    }, 1000);
     if(progressive > 6){
      setprogressive(0)
      setindex(index + 1)
    } 
    if(progressive == 0){
    textToSpeech(index);
    }
    return () => clearInterval(interval);
  } else if(newsVoiceResultList.length !== 0 && newsVoiceResultList.length <= index){
    elseVoice()
  }


// Cleanup the speech synthesis when the component unmounts
return () => {
  window.speechSynthesis.cancel();
};

}, [progressive, newsVoiceResultList]);

const elseVoice = ()=>{
  const speechSynthesis = window.speechSynthesis;
  const message = new SpeechSynthesisUtterance();
  const voice = window.speechSynthesis.getVoices()[4]
  message.lang = "en-US";
  message.pitch = 1;
  message.rate = 0.9;
  message.voice = voice
  message.text = 'Thanks for listen any think else';
  speechSynthesis.speak(message);
  
}


const textToSpeech = (index) => {
  console.log(index)
  const speechSynthesis = window.speechSynthesis;
    const message = new SpeechSynthesisUtterance();
    const voice = window.speechSynthesis.getVoices()[4]
    message.lang = "en-US";
    message.pitch = 1;
    message.rate = 0.9;
    message.voice = voice
    message.text = `Title is ${newsResultList&&newsResultList[index]?.reading_title}`;
    speechSynthesis.speak(message);

  // utterance.onend = () => {
  //   setIsSpeaking(false);
  //   console.log('Speech has ended.'); // You can add your custom logic here
  // };
};


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
           {index > 0 &&  <button className='btn btn-sm btn-danger mb-2' onClick={StopLisning}>{isToggled ? ' Resume Listen' : 'Pause Listen'}</button>}
            <h1>Top Stories For The Day: <span>{text}</span> </h1>
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
<h4>No data found for : {text}</h4>
<button className='themeBtn' onClick={ResetNews}>Get All News</button>
</div>
            }

        </div>
     

<div className='float-btn-text'>
   <button onClick={()=>setShow(true)}>Say <br></br> 'hey john'</button>
</div>

    </div>
    <BottomTabCustomer/>

    <Modal show={show} onHide={handleClose} centered size="sm" className='AlertMsg'>
    <Modal.Header>
      <Modal.Title><i class="fa-solid fa-triangle-exclamation"></i> Alert !</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <h6>Just say <b>'hey john'</b>, search for any article </h6>
      <h6>Just say <b>'details of'</b>, search for single article <small>(Example- details of Prime Minister Benjamin )</small></h6>
      
      <ul>
      <li>
        <button onClick={handleClose} className='btn btn-md btn-danger mt-3'>
            Close
        </button>
     
      </li>
   
    </ul>

    </Modal.Body>
  
   
  </Modal>
    </div>
    
  )
}

export default Home