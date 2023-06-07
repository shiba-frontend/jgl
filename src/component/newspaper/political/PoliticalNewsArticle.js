import React,{useState, useEffect} from 'react'
import AfterLoginTopbar from '../../newspaper/header/AfterLoginTopbar'
import Dropdown from 'react-bootstrap/Dropdown';
import addicon from '../../../image/Add_round_fill.png'
import dealIcon from "../../../image/headingicon/Paper_fill.svg";
import { NavLink, useNavigate } from 'react-router-dom';
import CustomLoader from '../../../common/CustomLoader';
import axios from 'axios';
import { toast } from 'react-toastify';

const PoliticalNewsArticle = () => {
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
      "news_cat_id":"9"
  }

  await axios.post("/newspaper/article-list", JSON.stringify(body))
  .then((response) => {
   
      setloading(false)
    if(response.data.success){
      console.log(response.data)
      //setListData(response.data.data)
    }
  })
  .catch((error) => {
      setloading(false)
    
      if(error.response.status === 404){
          toast.error(error.response.data.message);
      }
      if(error.response.status === 403){
        toast.error(error.response.data.message);
        localStorage.clear();
        navigate("/login-newspaper", { replace: true });
    }
  });

  }


  useEffect(()=>{
    GetData()
  },[])


    const categoryList = [
        {
          id:1,
          title:"Who are the Republicans opposing McCarthy’s bid for House speaker?"
        },
        {
          id:2,
          title:"Who are the Republicans opposing McCarthy’s bid for House speaker?"
        },
        {
          id:3,
          title:"Who are the Republicans opposing McCarthy’s bid for House speaker?"
        },
        {
          id:4,
          title:"Who are the Republicans opposing McCarthy’s bid for House speaker?"
        },
        {
          id:5,
          title:"Who are the Republicans opposing McCarthy’s bid for House speaker?"
        },
      ]

  return (
    <>
     <div className='newspaper-layout'>
       <div className="top-f-header">
    <AfterLoginTopbar/>
    <div className='header-info'>
        <div className='container'>
        <img src={dealIcon}/> Political News Articles
        </div>
        </div>
      </div>
      <div className='comon-layout category-list'>
      <div className='container'>
           <ul>
            {categoryList.map((item,index)=>{
              return (
                <li key={index}>
                <p>{item.title}</p>
                <Dropdown>
                            <Dropdown.Toggle id="dropdown-basic">
                            <i class="fa-solid fa-ellipsis-vertical"></i>
                            </Dropdown.Toggle>

                              <Dropdown.Menu>
                                  <button>Edit</button>
                                  <button>Delete</button>
                                  <button>Mark as Active</button>
                              </Dropdown.Menu>
                        </Dropdown>
            </li>
              )
            })}
           
           </ul>

            


        </div>
       
    </div>
    <div className='addIcon'>
              <NavLink to="/add-articles">
                <img src ={addicon}   alt="addicon" />
              </NavLink>
            </div>
    </div>
   
    </>
  )
}

export default PoliticalNewsArticle