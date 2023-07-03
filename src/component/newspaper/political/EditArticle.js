import React, { useState,useEffect } from 'react'
import AfterLoginTopbar from '../../newspaper/header/AfterLoginTopbar'
import { NavLink, useNavigate , useParams} from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CustomLoader from '../../../common/CustomLoader';
import axios from 'axios';
import { toast } from 'react-toastify';
import { IMAGE, baseUrl } from '../../../common/Theme';
import moment from "moment";

const EditArticle = () => {
    const [title, settitle] = useState("");
    const [parentcategorvalue, setparentcategorvalue] = useState("");
    const [subcategorvalue, setsubcategorvalue] = useState("");
    const [writers, setwriters] = useState("");
    const [description, setdescription] = useState("");
    const [shortdescription, setshortdescription] = useState("");
    const [ishome, setishome] = useState("1");
    const [status, setstatus] = useState("1");
    const [place, setplace] = useState("local");
    const [startDate, setStartDate] = useState(new Date());
    const [position, setposition] = useState("");
    const [articleImage, setarticleImage] = useState("");
    const [CategoryList, setCategoryList] = useState([]);
    const [SubCategoryList, setSubCategoryList] = useState([]);
    const [loading, setloading] = useState(false)
    

    const token = localStorage.getItem('accessToken');
    let navigate = useNavigate();
    const url = baseUrl();
    const { id } = useParams()

    const GeteditData = async ()=>{
        setloading(true)
        let body = {
          "key":"facb6e0a6fcbe200dca2fb60dec75be7",
          "source":"WEB",
          "app_access_token":token&&token,
          "article_id":id
      }
    
      await axios.post("/newspaper/article-edit", JSON.stringify(body))
      .then((response) => {
       
          setloading(false)
        if(response.data.success){
           console.log(response.data.data)

           var _data = response.data.data
           settitle(_data.title)
           setparentcategorvalue(_data.news_cat_id)
           setsubcategorvalue(_data.news_sub_cat_id)
           setwriters(_data.writer_name)
           setdescription(_data.description.replace(/<[^>]+>/g, ''))
           setstatus(_data.status)
           setishome(_data.is_show_home == "YES" ? "1" : "0")
           setplace(_data.article_native)
           setposition(_data.article_section)
           setshortdescription(_data.short_description.replace(/<[^>]+>/g, ''))
           setStartDate(new Date(_data.deal_start_date))
        }
      })
      .catch((error) => {
          setloading(false)
        
          if(error.response.status === 404){
              toast.error(error.response.data.message);
          }
         
      });
    
      }



    const GetData = async ()=>{
      setloading(true)
      let body = {
        "key":"facb6e0a6fcbe200dca2fb60dec75be7",
        "source":"WEB",
        "app_access_token":token&&token
    }
  
    await axios.post("/newspaper/category-list", JSON.stringify(body))

    .then((response) => {
        setloading(false)
      if(response.data.success){
        setCategoryList(response.data.data)
      }
    })
    .catch((error) => {
        setloading(false)
      
        if(error.response.status === 404){
            toast.error(error.response.data.message);
        }
       
    });
    }
  
    const getsubcategory = async () =>{
        let body = {
            "key":"facb6e0a6fcbe200dca2fb60dec75be7",
            "source":"WEB",
            "app_access_token":token&&token,
            "parent_category_id":parentcategorvalue
        }
    
        await axios.post("/newspaper/get-sub-category-by-category", JSON.stringify(body))
    
        .then((response) => {
            setloading(false)
          if(response.data.success){
            setSubCategoryList(response.data.data)
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
      setTimeout(()=>{
        getsubcategory()
      },3000)
    },[])

    
  const HandleImage = (e) => {
    var file = e.target.files[0];
    setarticleImage(file);
    var reader = new FileReader();
    //var url = reader.readAsDataURL(file);
    reader.onloadend = function (e) {
      const fsize = file.size;
    
        var editImg = document.getElementById("editImg");
        editImg.src = reader.result;
   

    };
    reader.readAsDataURL(file);
  };


    const handleChange = e => {
        const target = e.target;
        if (target.checked) {
            setstatus(target.value);
        }
      };

      const handleChangePlace = e => {
        const target = e.target;
        if (target.checked) {
            setplace(target.value);
        }
      };

      const handleChangehome = e =>{
        const target = e.target;
        if (target.checked) {
            setishome(target.value);
        }
      }

      const CategoryHandler = async (e) =>{
        var _value = e.target.value;
        setparentcategorvalue(_value)

        if(_value !== "select"){
            setloading(true)
            let body = {
              "key":"facb6e0a6fcbe200dca2fb60dec75be7",
              "source":"WEB",
              "app_access_token":token&&token,
              "parent_category_id":_value
          }
      
          await axios.post("/newspaper/get-sub-category-by-category", JSON.stringify(body))
      
          .then((response) => {
              setloading(false)
            if(response.data.success){
              console.log(response.data.data)
              setSubCategoryList(response.data.data)
            }
          })
          .catch((error) => {
              setloading(false)
            
              if(error.response.status === 404){
                  toast.error(error.response.data.message);
              }
             
          });
        }
        else {
            setSubCategoryList([])
        }
  


      }

      const SubmitHandling = async () =>{
        if(title === ''){
            toast.error('Title is mandatory!');
        } else if(parentcategorvalue === ''){
            toast.error('Category is mandatory!');
        } else if(subcategorvalue === ''){
            toast.error('Sub category is mandatory!');
        } else if(articleImage == ''){
            toast.error('Article image is mandatory!');
        }
        else {

            setloading(true)
        const FormData = require('form-data');
        let data = new FormData();
        data.append('key', 'facb6e0a6fcbe200dca2fb60dec75be7');
        data.append('source', 'WEB');
        data.append('app_access_token', token&&token);
        data.append('news_cat_id', parentcategorvalue);
        data.append('title', title);
        data.append('writer_name', writers);
        data.append('deal_start_date', moment(startDate).format("YYYY-MM-DD"));
        data.append('article_native', place);
        data.append('description', description);
        data.append('article_image', articleImage);
        data.append('status', status);
        data.append('news_sub_cat_id', subcategorvalue);
        data.append('is_show_home', ishome);
        data.append('article_section', position);
        data.append('short_description', shortdescription);
        data.append('article_id', id);
        
        let config = {
          method: 'post',
          maxBodyLength: Infinity,
          url: `${url}/newspaper/article-update`,
          data : data
        };
       
        axios.request(config)
         .then((response) => {
            setloading(false)
          if(response.data.success){
            toast.success(response.data.message);
            setTimeout(()=>{
                navigate("/news-articles", { replace: true });
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
        <img src={IMAGE.add_cate}/>  Edit News Article
        </div>
        </div>
      </div>
      <div className='comon-layout'>
      <div className='container'>
           
                <div className='form-group'>
                    <label>Article Title</label>
                    <input type='text' className='form-control' placeholder='Title'
                    value={title}
                    onChange={(e)=>settitle(e.target.value)}
                    />
                </div>
                <div className='form-group'>
                    <label>Select Category</label>
                    <select className='form-control'
                    value={parentcategorvalue}
                    onChange={(e)=>CategoryHandler(e)}
                    disabled
                    >
                        <option value="select">--Select--</option>
                        {CategoryList && CategoryList.map((list, index)=>{
                            return (
                                <option key={index} value={list.category_id}>{list.category_name}</option>
                            )
                        })}
                       
                    </select>
                </div>
                <div className='form-group'>
                    <label>Select Sub Category</label>
                    <select className='form-control'  value={subcategorvalue}
                    onChange={(e)=>setsubcategorvalue(e.target.value)}>
                         <option>--Select--</option>
                        {SubCategoryList && SubCategoryList.map((list, index)=>{
                            return (
                                <option key={index} value={list.category_id}>{list.category_name}</option>
                            )
                        })}
                       
                    </select>
                </div>
                <div className='form-group'>
                    <label>Writers Name</label>
                    <input type='text' className='form-control' placeholder='Writers Name'
                    value={writers}
                    onChange={(e)=>setwriters(e.target.value)}
                    />
                </div>
                <div className='form-group'>
                    <label>Deal Start Date</label>
                    <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} className='form-control' />
                    <span className='form-icon'><i class="fa-solid fa-calendar"></i></span>
                </div>
                
                <div className='form-group mt-3 mb-3'>
                    <ul className='acInflex'>
                        <li>
                            <input type='radio' id="local" name='place' value="Local" checked={place == 'Local'} onChange={handleChangePlace}  />
                            <label htmlFor="local">Local</label>
                        </li>
                        <li>
                            <input type='radio' id="national" name='place' value="National" checked={place == 'National'} onChange={handleChangePlace} />
                            <label htmlFor="national">National</label>
                        </li>
                        <li>
                            <input type='radio' id="international" name='place' value="International" checked={place == 'International'} onChange={handleChangePlace} />
                            <label htmlFor="international">International</label>
                        </li>
                    </ul>
                </div>
                <div className='form-group'>
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
                    <label>Description</label>
                    <textarea className='form-control' placeholder='Text Here'
                    value={description}
                    onChange={(e)=>setdescription(e.target.value)}
                    >  </textarea>
                </div>
                <div className='form-group'>
                    <label>Meassage </label>
                    <textarea className='form-control' placeholder='Text Here'
                    value={shortdescription}
                    onChange={(e)=>setshortdescription(e.target.value)}
                    >  </textarea>
                </div>
                <div className='form-group text-center'>
                    <label>is showing on home </label>
                    <ul className='acInflex'>
                        <li>
                            <input type='radio' id="yes" name='show' value="1" checked={ishome == '1'} onChange={handleChangehome}  />
                            <label htmlFor="yes">Yes</label>
                        </li>
                        <li>
                            <input type='radio' id="no" name='show' value="0" checked={ishome == '0'} onChange={handleChangehome} />
                            <label htmlFor="no">No</label>
                        </li>
                    </ul>
                </div>
                <div className='form-group'>
                <label>Article Position</label>
                    <select className='form-control' value={position} onChange={(e)=>setposition(e.target.value)}>
                        <option value="LEFT">Left</option>
                        <option value="RIGHT">Right</option>
                        <option value="BOTTOM">Bottom</option>
                        <option value="TOP">Top</option>
                        <option value="CENTER">Center</option>
                    </select>
                </div>
                <img src='' id="editImg" className='w-100'  />
                <div className='form-group mb-5'>
                <label>Choose Image</label>
                    <input type='file' className='form-control' onChange={HandleImage} />
                </div>
                <div className='form-group'>
                    <button className='themeBtn' onClick={SubmitHandling}>Submit</button>
                </div>
        </div>
       
        </div>
    </div>
    </>
  )
}

export default EditArticle