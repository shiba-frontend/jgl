import React,{useEffect, useState} from 'react'
import AfterLoginTopbar from '../../newspaper/header/AfterLoginTopbar'
import { NavLink, useNavigate } from 'react-router-dom';
import CustomLoader from '../../../common/CustomLoader';
import axios from 'axios';
import { toast } from 'react-toastify';
import { IMAGE } from '../../../common/Theme';

const ArticlesList = () => {
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
  
    await axios.post("/newspaper/category-list", JSON.stringify(body))
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

    function DetailsPage(id,name){
        navigate('/article-details',{state:{cate_id:id,catename:name}});
    }



  return (
    <>
     {loading && <CustomLoader/>}
     <div className='newspaper-layout'>
       <div className="top-f-header">
    <AfterLoginTopbar/>
    <div className='header-info'>
        <div className='container'>
        <img src={IMAGE.dealIcon} alt="deal" /> News Article
        </div>
        </div>
      </div>
      <div className='comon-layout category-list'>
      <div className='container'>
           <ul>
            {ListData && ListData.map((item,index)=>{
              return (
                <li key={index}>
                  <button onClick={()=>DetailsPage(item.category_id,item.category_name)} className='btnlink'>
                <label style={{color:item.category_status === "0" ? "#666":"#222"}}>{item && item.category_name} <i className="fa-solid fa-arrow-right-long"></i></label>
                </button>
            </li>
              )
            })}
           
           </ul>

           


        </div>
        </div> 
        <div className='addIcon'>
              <NavLink to="/add-articles">
                <img src ={IMAGE.addicon}   alt="addicon" />
              </NavLink>
            </div>
    </div>
    
    </>
  )
}

export default ArticlesList