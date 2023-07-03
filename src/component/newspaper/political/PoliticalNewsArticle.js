import React,{useState, useEffect} from 'react'
import AfterLoginTopbar from '../../newspaper/header/AfterLoginTopbar'
import Dropdown from 'react-bootstrap/Dropdown';
import { NavLink, useNavigate , useParams, useLocation} from 'react-router-dom';
import CustomLoader from '../../../common/CustomLoader';
import axios from 'axios';
import { toast } from 'react-toastify';
import { IMAGE } from '../../../common/Theme';

const PoliticalNewsArticle = () => {
  const [ListData, setListData] = useState([]);
  const [loading, setloading] = useState(false)
  const cateinfo = useLocation();


  const token = localStorage.getItem('accessToken');
  let navigate = useNavigate();
  const GetData = async ()=>{
    setloading(true)
    let body = {
      "key":"facb6e0a6fcbe200dca2fb60dec75be7",
      "source":"WEB",
      "app_access_token":token&&token,
      "news_cat_id":cateinfo.state.cate_id
  }

  await axios.post("/newspaper/article-list", JSON.stringify(body))
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


  const StatusHandler = async (id)=>{
    setloading(true)
    let body = {
      "key":"facb6e0a6fcbe200dca2fb60dec75be7",
      "source":"WEB",
      "app_access_token":token&&token,
      "article_id":id
  }

  await axios.post("newspaper/article-change-status", JSON.stringify(body))
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
      "article_id":id
  }

  await axios.post("newspaper/article-delete", JSON.stringify(body))
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
        <img src={IMAGE.dealIcon}/> {cateinfo.state.catename&&cateinfo.state.catename} News Articles
        </div>
        </div>
      </div>
      <div className='comon-layout category-list'>
      <div className='container'>
        {ListData.length > 0 ? 
           <ul>
            {ListData&& ListData.map((item,index)=>{
              return (
                <li key={index}>
                <p>{item.title}</p>
                <Dropdown>
                            <Dropdown.Toggle id="dropdown-basic">
                            <i class="fa-solid fa-ellipsis-vertical"></i>
                            </Dropdown.Toggle>

                              <Dropdown.Menu>
                              <NavLink to={`/article-details/${item.article_id}`}>Edit</NavLink>
                                  <button onClick={()=>DeleteHandle(item.article_id)}>Delete</button>
                                  <button onClick={()=>StatusHandler(item.article_id)}>{item.category_status === "0" ? "Mark as Active" : "Mark as Deactive"}</button>
                              </Dropdown.Menu>
                        </Dropdown>
            </li>
              )
            })}
           
           </ul>
      :
      <h4>No Articles by {cateinfo.state.catename&&cateinfo.state.catename}</h4>
}  


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

export default PoliticalNewsArticle