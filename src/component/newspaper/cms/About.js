import React,{useEffect, useState} from 'react'
import AfterLoginTopbar from "../../newspaper/header/AfterLoginTopbar";
import CustomLoader from '../../../common/CustomLoader';
import axios from 'axios';
import { toast } from 'react-toastify';
import { NavLink, useNavigate } from 'react-router-dom';
import { IMAGE } from '../../../common/Theme';


const About = () => {
  const [cmsData, setcmsData] = useState({});
  const [loading, setloading] = useState(false)

  let navigate = useNavigate();


  const GetData = async ()=>{
    setloading(true)
    let body = {
      "key":"facb6e0a6fcbe200dca2fb60dec75be7",
      "source":"WEB",
      "page_slug":"about-us"
  }

  await axios.post("/page", JSON.stringify(body))
  .then((response) => {
   
      setloading(false)
    if(response.data.success){
      setcmsData(response.data.data)
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


  return (
    <>
     {loading && <CustomLoader/>}
    <div className='newspaper-layout'>
       <div className="top-f-header">
    <AfterLoginTopbar />
    <div className="header-info">
      <div className="container"><img src={IMAGE.dealIcon}/> {cmsData && cmsData.title}</div>
    </div>
    </div>
    <div className="comon-layout cms-page">
      <div className="container">
        <h2>{cmsData && cmsData.title}</h2>
        <div
      dangerouslySetInnerHTML={{__html: cmsData && cmsData.content}}
    />
        
        </div>
      </div>
    </div>
  </>
  )
}

export default About