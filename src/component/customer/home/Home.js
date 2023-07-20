import React,{useState, useEffect} from 'react'
import AfterLoginTopbar from '../header/AfterLoginTopbar'
import PageMenu from '../header/PageMenu'
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import BottomTabCustomer from '../header/BottomTabCustomer';
import { IMAGE } from '../../../common/Theme';
import axios from 'axios';
import { toast } from 'react-toastify';
import CustomLoader from '../../../common/CustomLoader';

const Home = () => {
  
  const [loading, setloading] = useState(false)
  const [getdata, setgetdata] = useState([])

  const newsData = useSelector((state) => state.voicesearch);
  const newsResultList = useSelector((state) => state.newsresult);
  const dispatch = useDispatch();


  console.log("from home", newsResultList)

  const token = localStorage.getItem('accessToken');

const getCheckedInRequest = async () => {
  setloading(true)

  let body = {
      "key":"facb6e0a6fcbe200dca2fb60dec75be7",
      "source":"WEB",
      "app_access_token":token&&token,
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

const ApiCall = async ()=>{
  setloading(true);
  let body = {
      "key":"facb6e0a6fcbe200dca2fb60dec75be7",
      "source":"WEB",
      "app_access_token":token&&token,
      "search_phrase":newsData
    }

    await axios.post("/voice-search-newspaper", JSON.stringify(body))
.then((response) => {
  setloading(false);
  if(response.data.success){
    dispatch({ type: "news", newsresult: response.data.data })
   // setgetdata(response.data.data)
  }
})
.catch((error) => {
  setloading(false);
    if(error.response.status === 404){
        toast.error(error.response.data.message);
    }
    
});
}

function ResetNews(){
  getCheckedInRequest();
}


useEffect(() => {
  if(newsData == ''){
    getCheckedInRequest();
    GetcartData();
  } else {
    ApiCall()
  }
   
 
  }, [newsData])










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

      <PageMenu/>
      {newsResultList&&newsResultList.length > 0 ?
        <div className='top-stories'>
            <h1>Top Stories For The Day:</h1>
            <div className='row'>
            {newsResultList&&newsResultList.map((item,index)=>{
                return (
                  <div className='col-lg-4 col-12' key={index}>
                    <NavLink to={`/news-details/${item.id}`}>
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
       

    </div>
    <BottomTabCustomer/>

  
    </div>
    
  )
}

export default Home