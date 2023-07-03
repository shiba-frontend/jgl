import React, { useState, useEffect } from 'react'
import AfterLoginTopbar from '../../newspaper/header/AfterLoginTopbar'
import {useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import CustomLoader from '../../../common/CustomLoader';
import { IMAGE } from '../../../common/Theme';

const EditSubCategory = () => {


    const [status, setstatus] = useState("1");
    const [catename, setcatename] = useState("");
    const [position, setposition] = useState("");
    const [parentcategory, setparentcategory] = useState("");
    const [ListData, setListData] = useState([]);
    const [loading, setloading] = useState(false)
    let navigate = useNavigate();
    const { id } = useParams()
    const token = localStorage.getItem('accessToken');
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
    
      const GeteditData = async ()=>{
        setloading(true)
        let body = {
          "key":"facb6e0a6fcbe200dca2fb60dec75be7",
            "source":"WEB",
            "app_access_token":token&&token,
            "category_id":id
      }
    
      await axios.post("/newspaper/sub-category-edit", JSON.stringify(body))
      .then((response) => {
       
          setloading(false)
        if(response.data.success){
            setstatus(response.data.data.category_status)
            setcatename(response.data.data.category_name)
            setposition(response.data.data.rank)
            setparentcategory(response.data.data.parent_category_id)
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
        GeteditData()
      },[])

      const SubmitHandler = async ()=>{
        if(catename === ''){
            toast.error('Category name is mandatory!');
        } else if(parentcategory === ''){
            toast.error('Parent category is mandatory!');
        } else if(position === ''){
            toast.error('Position is mandatory!');
        } else {
            setloading(true)
            let body = {
                "key":"facb6e0a6fcbe200dca2fb60dec75be7",
                "source":"WEB",
                "app_access_token":token&&token,
                "parent_category_id":parentcategory,
                "category_name":catename,
                "rank":position,
                "category_status":status,
                "category_id":id,
          }
        
          await axios.post("newspaper/sub-category-update", JSON.stringify(body))
          .then((response) => {
              setloading(false)
            if(response.data.success){
                toast.success(response.data.message);
                setTimeout(()=>{
                    navigate("/news-sub-category", { replace: true });
                  },2000)
            }
          })
          .catch((error) => {
              setloading(false)
            
              if(error.response.status === 404){
                  toast.error(error.response.data.message);
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
       <img src={IMAGE.add_cate}/>  Add Sub News Categories
       </div>
       </div>
     </div>
     <div className='comon-layout'>
     <div className='container'>
          
               <div className='form-group'>
                   <label>Parent Category</label>
                   <select className='form-control'
                   value={parentcategory}
                   onChange={(e)=>setparentcategory(e.target.value)}
                   >
                    {ListData&& ListData.map((list,index)=>{
                        return (
                            <option key={index} value={list.category_id}>{list.category_name}</option>
                        )
                    })}
                       
                   </select>
               </div>
               <div className='form-group'>
                   <label>Sub Category Name</label>
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
                       <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                        <option value="13">13</option>
                        <option value="14">14</option>
                        <option value="15">15</option>
                        <option value="16">16</option>
                        <option value="17">17</option>
                        <option value="18">18</option>
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
                   <button className='themeBtn' onClick={SubmitHandler}>Submit</button>
               </div>
       </div>
      
       </div>
   </div>
   </>
  )
}

export default EditSubCategory