import React, { useState, useEffect } from 'react'
import AfterLoginTopbar from '../../newspaper/header/AfterLoginTopbar'
import Dropdown from 'react-bootstrap/Dropdown';
import dealIcon from "../../../image/headingicon/File_dock_add_fill.svg";
import {useNavigate,useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import CustomLoader from '../../../common/CustomLoader';

const EditCategory = () => {
    const [status, setstatus] = useState("1");
    const [catename, setcatename] = useState("");
    const [position, setposition] = useState("");
    const [loading, setloading] = useState(false)
    const token = localStorage.getItem('accessToken');
    let navigate = useNavigate();
    const { id } = useParams()

    const handleChange = e => {
        const target = e.target;
        if (target.checked) {
            setstatus(target.value);
        }
      };

      const GetData = async ()=>{
        setloading(true)
        let body = {
          "key":"facb6e0a6fcbe200dca2fb60dec75be7",
          "source":"WEB",
          "app_access_token":token&&token,
          "category_id":id
      }
    
      await axios.post("/newspaper/category-edit", JSON.stringify(body))
      .then((response) => {
       
          setloading(false)
        if(response.data.success){
            setstatus(response.data.data.category_status)
            setcatename(response.data.data.category_name)
            setposition(response.data.data.rank)
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

      const SubmitHandler = async ()=>{
        if(catename === ''){
            toast.error('Category name should be proper!');
        } else if(position === ''){
            toast.error('Position should be proper!');
        } else {
            setloading(true)
            let body = {
              "key":"facb6e0a6fcbe200dca2fb60dec75be7",
              "source":"WEB",
              "app_access_token":token&&token,
              "category_id":id,
                "category_name":catename,
                "rank":position,
                "category_status":status
          }
        
          await axios.post("newspaper/category-update", JSON.stringify(body))
          .then((response) => {
              setloading(false)
            if(response.data.success){
                toast.success(response.data.message);
                setTimeout(()=>{
                    navigate("/news-category", { replace: true });
                  },2000)
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
      }



  return (
    <>
      {loading && <CustomLoader/>}
     <div className='newspaper-layout'>
       <div className="top-f-header">
    <AfterLoginTopbar/>
    <div className='header-info'>
        <div className='container'>
        <img src={dealIcon}/>  Edit News Categories
        </div>
        </div>
      </div>
      <div className='comon-layout'>
      <div className='container'>
           
           <div className='form-group'>
               <label>Category Name</label>
               <input type='text' className='form-control' placeholder='Category Name'
               value={catename}
               onChange={(e)=>setcatename(e.target.value)}
               />
           </div>
           <div className='form-group'>
               <label>Position</label>
               <select className='form-control' value={position} onChange={(e)=>setposition(e.target.value)}>
                  <option value="">--Select--</option>
                   <option value="1">1</option>
                   <option value="2">2</option>
                   <option value="3">3</option>
                   <option value="4">4</option>
                   <option value="5">5</option>
                   <option value="6">6</option>
                   <option value="7">7</option>
                   <option value="8">8</option>
                   <option value="9">9</option>
                   <option value="10">4</option>
               </select>
           </div>
           <div className='form-group mb-4 mt-4'>
               <ul className='acInflex'>
                   <li>
                       <input type='radio' id="active" name='status' value="1" checked={status == '1'} onChange={handleChange}  />
                       <label htmlFor="active">Active</label>
                   </li>
                   <li>
                       <input type='radio' id="inactive" name='status' value="0" checked={status == '0'} onChange={handleChange} />
                       <label htmlFor="inactive">Inactive</label>
                   </li>
               </ul>
           </div>
           <div className='form-group'>
               <button className='themeBtn' onClick={SubmitHandler}>Update</button>
           </div>
   </div>
        </div> 

    </div>
    </>
  )
}

export default EditCategory