import React,{useState, useEffect} from 'react'
import { useSelector, useDispatch } from "react-redux";
import AfterLoginTopbar from '../../newspaper/header/AfterLoginTopbar'
import Dropdown from 'react-bootstrap/Dropdown';
import { NavLink, useNavigate } from 'react-router-dom';
import CustomLoader from '../../../common/CustomLoader';
import axios from 'axios';
import { toast } from 'react-toastify';
import { IMAGE } from '../../../common/Theme';

const NewsAnalyticsList = () => {
  const [ListData, setListData] = useState([]);
  const [loading, setloading] = useState(false)
  const token = localStorage.getItem('accessToken');
  let navigate = useNavigate();

  const GetData = async ()=>{



    setloading(true)
    
    let body = {
      "key":"facb6e0a6fcbe200dca2fb60dec75be7",
      "source":"WEB",
      "app_access_token":token&&token,
    }

  await axios.post("/newspaper/analytics", JSON.stringify(body))
  .then((response) => {
   
      setloading(false)
    if(response.data.success){
      setListData(response.data.data)
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
    <AfterLoginTopbar/>
    <div className='header-info'>
        <div className='container'>
        <img src={IMAGE.dealIcon}/> News Analytics
        </div>
        </div>
      </div>
      <div className='comon-layout category-list'>
      <div className='container'>
           <ul>
            {ListData && ListData.map((item,index)=>{
              return (
                <li key={index}>
                  <div className='cl-left'>
                  <NavLink to={`/analyticle-details/${item.category_id}`} className="btnlink">
                    <label>{item.category_name} <i className="fa-solid fa-arrow-right-long"></i></label>
                    <span>({item.business_advertised}) Business Advertised</span>
                    <span>({item.deals_advertised}) Deals Advertised</span>
                 </NavLink>
              </div>
            </li>
              )
            })}
           
           </ul>

           


        </div>
       
        </div>
        <div className='addIcon'>
              <NavLink to="/add-category">
                <img src ={IMAGE.addicon}   alt="addicon" />
              </NavLink>
            </div>
    </div>
   
    </>
  )
}

export default NewsAnalyticsList