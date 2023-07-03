import React,{useState, useEffect} from "react";
import AfterLoginTopbar from "../../customer/header/AfterLoginTopbar";
import BottomTabCustomer from "../header/BottomTabCustomer";
import { IMAGE } from "../../../common/Theme";
import axios from 'axios';
import { toast } from 'react-toastify';
import CustomLoader from '../../../common/CustomLoader';

const About = () => {

  const [cmsData, setcmsData] = useState({});
  const [loading, setloading] = useState(false)




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
    <div className='customer-layout'>
       <div className="top-f-header">
    <AfterLoginTopbar />
    <div className="header-info">
      <div className="container"><img src={IMAGE.folder_icon}/> About Us</div>
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
    <BottomTabCustomer/>
  </div>
  </>
  )
}

export default About