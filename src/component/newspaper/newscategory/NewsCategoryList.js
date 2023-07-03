import React,{useEffect, useState} from 'react'
import AfterLoginTopbar from '../../newspaper/header/AfterLoginTopbar'
import Dropdown from 'react-bootstrap/Dropdown';
import { NavLink, useNavigate } from 'react-router-dom';
import CustomLoader from '../../../common/CustomLoader';
import axios from 'axios';
import { toast } from 'react-toastify';
import { IMAGE } from '../../../common/Theme';



const NewsCategoryList = () => {
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

  const StatusHandler = async (id)=>{
    setloading(true)
    let body = {
      "key":"facb6e0a6fcbe200dca2fb60dec75be7",
      "source":"WEB",
      "app_access_token":token&&token,
      "category_id":id
  }

  await axios.post("newspaper/category-change-status", JSON.stringify(body))
  .then((response) => {
      setloading(false)
    if(response.data.success){
        toast.success(response.data.message);
        GetData();
    }
  })
  .catch((error) => {
      setloading(false)
    
      if(error.response.status === 404){
          toast.error(error.response.data.message);
      }
      
     
  });


  }

  const DeleteHandle = async (id)=>{


    setloading(true)
    let body = {
      "key":"facb6e0a6fcbe200dca2fb60dec75be7",
      "source":"WEB",
      "app_access_token":token&&token,
      "category_id":id
  }

  await axios.post("newspaper/category-delete", JSON.stringify(body))
  .then((response) => {
      setloading(false)
    if(response.data.success){
        toast.success(response.data.message);
        GetData();
    }
  })
  .catch((error) => {
      setloading(false)
    
      if(error.response.status === 404){
          toast.error(error.response.data.message);
      }
     
  });
  }



  return (
    <>
     {loading && <CustomLoader/>}
     <div className='newspaper-layout'>
       <div className="top-f-header">
    <AfterLoginTopbar/>
    <div className='header-info'>
        <div className='container'>
        <img src={IMAGE.dealIcon} alt="deal" /> News Category
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
                
                <Dropdown>
                            <Dropdown.Toggle id="dropdown-basic">
                            <i class="fa-solid fa-ellipsis-vertical"></i>
                            </Dropdown.Toggle>

                              <Dropdown.Menu>
                                <NavLink to={`/edit-category/${item.category_id}`}>Edit</NavLink>
                                  <button onClick={()=>DeleteHandle(item.category_id)}>Delete</button>
                                  <button onClick={()=>StatusHandler(item.category_id)}>{item.category_status === "0" ? "Mark as Active" : "Mark as Deactive"}</button>
                              </Dropdown.Menu>
                        </Dropdown>
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

export default NewsCategoryList