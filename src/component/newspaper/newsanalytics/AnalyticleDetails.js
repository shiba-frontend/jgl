import React,{useState, useEffect} from 'react'
import { useSelector, useDispatch } from "react-redux";
import AfterLoginTopbar from '../../newspaper/header/AfterLoginTopbar'
import Dropdown from 'react-bootstrap/Dropdown';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import CustomLoader from '../../../common/CustomLoader';
import axios from 'axios';
import { toast } from 'react-toastify';
import { IMAGE } from '../../../common/Theme';

const AnalyticleDetails = () => {

  const [ListData, setListData] = useState([]);
  const [loading, setloading] = useState(false)
  const[isData, setisData] = useState(false)

  const token = localStorage.getItem('accessToken');
  let navigate = useNavigate();
  let {id} = useParams()

  const GetData = async ()=>{



    setloading(true)
    
    let body = {
      "key":"facb6e0a6fcbe200dca2fb60dec75be7",
      "source":"WEB",
      "app_access_token":token&&token,
      "category_id":id
    }

  await axios.post("/newspaper/analytics-data", JSON.stringify(body))
  .then((response) => {
   
      setloading(false)
    if(response.data.success){
      setListData(response.data.data)
    }
  })
  .catch((error) => {
      setloading(false)
    
      if(error.response.status === 404){
        setisData(true)
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
    <AfterLoginTopbar/>
    <div className='header-info'>
        <div className='container'>
        <img src={IMAGE.dealIcon}/> News Analytics
        </div>
        </div>
      </div>
      <div className='comon-layout analytics-details'>
      <div className='container'>
        {!isData ? 
        ListData&& ListData.map((item, index)=>{
          return (
            <ul key={index}>
            <li>
              <label>Business Name</label>
              <span>{item?.business_name}</span>
            </li>
            <li>
              <label>Deal Name</label>
              <span>{item?.title}</span>
            </li>
            <li>
              <label>Deal Type</label>
              <span>{item?.deal_type}</span>
            </li>
           
            <li>
              <label>Deal Start Date</label>
              <span>{item?.deal_start_date}</span>
            </li>
            <li>
              <label>Deal End Date</label>
              <span>{item?.deal_end_date}</span>
            </li>
            <li>
              <label>Deal Content</label>
              {item?.deal_image !== "" ? 
              <img src={item.deal_image} className='dealImage'  />  
              : 
              <h4 className='dealTxt' style={{background:item?.primary_bgcolor, 
                color:item?.primary_fontcolor,
                fontStyle:item?.primary_font_style,
                padding:"7px",
                fontSize:15
              }}
              
              >{item?.deal_text
              }</h4>
            } 
            </li>
          </ul>
          )
        })

        :
        <h5>No Data Found</h5>
      }
         

           


        </div>
       
        </div>
     
    </div>
   
    </>
  )
}

export default AnalyticleDetails