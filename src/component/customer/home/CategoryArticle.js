import React,{useState, useEffect} from 'react'
import AfterLoginTopbar from '../header/AfterLoginTopbar'
import PageMenu from '../header/PageMenu'
import { NavLink, useNavigate, useParams,useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import BottomTabCustomer from '../header/BottomTabCustomer';
import { IMAGE } from '../../../common/Theme';
import axios from 'axios';
import { toast } from 'react-toastify';
import CustomLoader from '../../../common/CustomLoader';


const CategoryArticle = () => {

    const [loading, setloading] = useState(false)
    const [text, settext] = useState('');
  const [isListening, setIsListening] = useState(false);
    const [catelength, setcatelength] = useState(false);
    const recognition = new window.webkitSpeechRecognition();
  
    const newsResultList = useSelector((state) => state.newsresult);
    
    const dispatch = useDispatch();
    const pagedetails = useLocation()
  console.log(pagedetails.state.id)
    const token = localStorage.getItem('accessToken');
  
   
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
          "news_cat_id":pagedetails.state.id,
          "search_phrase":transcript
        }
    
     axios.post("/newspaper/article-list", JSON.stringify(body))
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
    };
    
    const handleStartStop = async () => {
      setIsListening(true);
      recognition.start();
    };
  
  const getCheckedInRequest = async () => {
    setloading(true)

  let body = {
      "key":"facb6e0a6fcbe200dca2fb60dec75be7",
      "source":"WEB",
      "app_access_token":token&&token,
      "news_cat_id":pagedetails.state.id,
      "search_phrase":""
    }

await axios.post("/newspaper/article-list", JSON.stringify(body))
.then((response) => {
 
    setloading(false)
  if(response.data.success){
    if(response.data.data.length > 0){
        setcatelength(true)
    }
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
  
  
  useEffect(() => {
    getCheckedInRequest();
 
    }, [])
  
  





  return (
    <div className='customer-layout'>
       {loading && <CustomLoader />}
       <div className="top-f-header">
    <AfterLoginTopbar
      />
      <div className='header-info'>
        <div className='container'>
          News for {pagedetails.state.name}
        </div>
    
      </div>
      </div>
      <div className='comon-layout'>
      <div className='container'>

      <ul className='bredcrams'>
                <li><NavLink to="/home">Home</NavLink></li>
                <li>/</li>
                <li>{pagedetails.state.name}</li>
            </ul>

      {newsResultList&&newsResultList.length > 0 ?
        <div className='top-stories'>
           
         
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
{catelength ? <button className='themeBtn' onClick={ResetNews}>Get All</button>
:
<NavLink className='themeBtn' to="/home">Back to home</NavLink>
}

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

export default CategoryArticle