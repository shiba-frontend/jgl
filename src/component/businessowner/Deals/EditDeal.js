import React, { useEffect, useState } from 'react'
import AfterLoginTopbar from '../../businessowner/header/AfterLoginTopbar'
import BottomNavigation from '../header/BottomNavigation'
import Dropdown from 'react-bootstrap/Dropdown';
import { NavLink, useNavigate , useParams} from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IMAGE, baseUrl } from "../../../common/Theme";
import CustomLoader from '../../../common/CustomLoader';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from "react-redux";
import Multiselect from 'multiselect-react-dropdown';
import moment from "moment";

const EditDeal = () => {
    const [loading, setloading] = useState(false)
    const [status, setstatus] = useState("TEXT");
    const [startDate, setStartDate] = useState(new Date());
    const [EndDate, setEndDate] = useState(new Date());
    const [checked, setChecked] = useState(false)
    const [dealcategory, setdealcategory] = useState([])
    const [keywordList, setkeywordList] = useState([])
    const [keywordData, setkeywordData] = useState([])
    const [editkeywordData, seteditkeywordData] = useState([])
    const [title, settitle] = useState("")
    const [category, setcategory] = useState("")
    const [price, setprice] = useState("")
    const [description, setdescription] = useState("")
    const [fontfamily, setfontfamily] = useState("")
    const [fontstyle, setfontstyle] = useState("")
    const [bgcolor, setbgcolor] = useState("")
    const [fontcolor, setfontcolor] = useState("")
    const [voiceprice, setvoiceprice] = useState("")
    const [dealimage, setdealimage] = useState("")

    let navigate = useNavigate();
    let {id} = useParams()

    const token = localStorage.getItem('accessToken');
    const BusinessId = localStorage.getItem('business_id');
    const url = baseUrl();
    var editImg = document.getElementById("editImg");
    

    const GetKeyword = async ()=>{
        setloading(true)
        
        let body = {
          "key":"facb6e0a6fcbe200dca2fb60dec75be7",
          "source":"WEB",
          "app_access_token":token&&token,
        }
    
      await axios.post("/business-owner/list-business-category", JSON.stringify(body))
      .then((response) => {
       
          setloading(false)
        if(response.data.success){
            let temparray = []
            var _data = response.data.data
            for(var i = 0; i < _data.length; i++){
                temparray.push({
                    label: _data[i].category_name,
                    value: _data[i].category_id
                })
            }
            setkeywordList(temparray)
        }
      })
      .catch((error) => {
          setloading(false)
        
          if(error.response.status === 404){
              toast.error(error.response.data.message);
          }
          
      });
    
      }
    
      const Getdealcategory = async ()=>{
        setloading(true)
        
        let body = {
          "key":"facb6e0a6fcbe200dca2fb60dec75be7",
          "source":"WEB",
          "app_access_token":token&&token,
        }
    
      await axios.post("/newspaper/sub-category-list", JSON.stringify(body))
      .then((response) => {
       
          setloading(false)
        if(response.data.success){
            setdealcategory(response.data.data)
        }
      })
      .catch((error) => {
          setloading(false)
        
          if(error.response.status === 404){
              toast.error(error.response.data.message);
          }
          
      });
    
      }

     const getdealdta = async () =>{
        setloading(true)
        
        let body = {
          "key":"facb6e0a6fcbe200dca2fb60dec75be7",
          "source":"WEB",
          "app_access_token":token&&token,
          "deal_id":id
        }
        await axios.post("/business-owner/get-deal", JSON.stringify(body))
        .then((response) => {
         
            setloading(false)
          if(response.data.success){
            
             var _data = response.data.data
             setstatus(_data?.deal_type)
             setStartDate(new Date(_data?.deal_start_date))
             setEndDate(new Date(_data?.deal_end_date))
             setChecked(_data?.is_voice == "1" ? true : false)
             setcategory(_data?.deal_category)
             settitle(_data?.title)
             setprice(_data?.price)
             setdescription(_data?.deal_text)
             setfontfamily(_data?.primary_font_family)
             setfontstyle(_data?.primary_font_style)
             setbgcolor(_data?.primary_bgcolor)
             setfontcolor(_data?.primary_fontcolor)
             setkeywordData(_data?.keywords)
             editImg.src = _data?.deal_image;
          
          }
        })
        .catch((error) => {
            setloading(false)
        
            
        });
     }
    
      useEffect(()=>{
        Getdealcategory()
        GetKeyword()
        getdealdta()
      },[])
  
      const selectedkeyword = () => {  
 
        var raws = [...keywordList]
 

    let temparr = []

    raws.forEach(function(val){
        if(keywordData.includes(val.value)){
        temparr.push({
            label: val.label, 
            value:val.value
        })
        }
    })

    return temparr
       
    }

  


    const handleChange = e => {
        const target = e.target;
        if (target.checked) {
            setstatus(target.value);
        }
      };

      const HandleImage = (e) => {
        var file = e.target.files[0];
        setdealimage(file);
        var reader = new FileReader();
        reader.onloadend = function (e) {
          const fsize = file.size;
          const fileSize = Math.round(fsize / 1024);
          var editImg = document.getElementById("editImg");
            editImg.src = reader.result;
    
          //setPreviewImage(e.target.result)
          //console.log(editImg)
        };
        reader.readAsDataURL(file);
      };


      const handleChangecheckbox = () => {
        setChecked(!checked);
      };

      function onSelect(selectedList, selectedItem) {
        // var raws = [...keywordData]
        // raws = selectedList
        // setkeywordData(raws)
        seteditkeywordData(selectedList)
      }
    
      function onRemove(selectedList){
        seteditkeywordData(selectedList)
      }


      const UpdateHandle = async ()=>{

        var tempkey = []

        editkeywordData.forEach(element => {
            tempkey.push(element.value)
        });
        
    
        setloading(true);
        const FormData = require("form-data");
        let data = new FormData();
        data.append("key", "facb6e0a6fcbe200dca2fb60dec75be7");
        data.append("source", "WEB");
        data.append("app_access_token", token && token);
        data.append("business_id", BusinessId);
        data.append("title", title);
        data.append("deal_type", status);
        data.append("deal_category", category);
        data.append("deal_start_date", moment(startDate).format("YYYY-MM-DD"));
        data.append("deal_end_date",  moment(EndDate).format("YYYY-MM-DD"));
        data.append("is_voice", checked == true ? "1" : "0");
        data.append("keywords", tempkey.length > 0 ? tempkey : keywordData);
        data.append("deal_image", dealimage)
        data.append("deal_text", description);
        data.append("primary_fontcolor", fontcolor);
        data.append("primary_font_style", fontstyle);
        data.append("primary_bgcolor", bgcolor);
        data.append("primary_font_family", fontfamily);
        data.append("price", price);
        data.append("deal_id", id)
  
        let config = {
          method: "post",
          maxBodyLength: Infinity,
          url: `${url}/business-owner/edit-deal`,
          data: data,
        };
  
        axios
          .request(config)
          .then((response) => {
            setloading(false);
            if (response.data.success) {
              toast.success(response.data.message);
              setTimeout(() => {
                navigate("/payment", { replace: true });
              }, 2000);
            }
          })
          .catch((error) => {
            setloading(false);
            if (error.response.status === 404) {
              toast.error(error.response.data.message);
            }
          });

       // navigate("/payment", { replace: true });
      }



  return (
    <>
    {loading && <CustomLoader/>}



    <div className='ownerLayout'>
        <div className="top-f-header">
    <AfterLoginTopbar />
    <div className="header-info">
      <div className="container"><img src={IMAGE.bankCard_icon} alt="owner"/> Add new {status} Deal</div>
    </div>
    </div>
    <div className="comon-layout add-deal-listing">
      <div className="container">
            <div className='row'>
                <div className='col-lg-4'>
                    <div className='form-group'>
                        <ul className='acInflex'>
                            <li>
                                <input type='radio' id="active" name='status' value="TEXT" checked={status == 'TEXT'} onChange={handleChange}  />
                                <label htmlFor="active">Text</label>
                            </li>
                            <li>
                                <input type='radio' id="inactive" name='status' value="IMAGE" checked={status == 'IMAGE'} onChange={handleChange} />
                                <label htmlFor="inactive">Image</label>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className='col-lg-4'>
                    <div className='form-group'>
                        <label>Deal Title</label>
                        <input type='text' className='form-control' placeholder='Add Deal Title'
                        value={title}
                        onChange={(e)=>settitle(e.target.value)}
                        />
                    </div>
                </div>
                <div className='col-lg-4'>
                    <div className='form-group'>
                        <label>Deal Category</label>
                        <select className='form-control'
                         value={category}
                         onChange={(e)=>setcategory(e.target.value)}
                        >
                            {dealcategory&& dealcategory.map((item,index)=>{
                                return (
                                    <option value={item.category_id}>{item.parent_category}</option>
                                )
                            })}
                        </select>
                    </div>
                </div>
                <div className='col-lg-4'>
                    <div className='form-group'>
                        <label>Keywords</label>
                        <Multiselect
                        showArrow="true"
                        placeholder="Select keyword"
                        options={keywordList}
                        displayValue="label"
                        selectedValues={selectedkeyword()}
                        onSelect={(selectedList)=>onSelect(selectedList)}
                        onRemove={onRemove}
                        />
                    </div>
                </div>
               
                <div className='col-lg-4'>
                    <div className='form-group'>
                        <label>Deal Price</label>
                        <input type='text' className='form-control' placeholder='Deal Price'
                         onKeyPress={(event) => {
                            if (!/[0-9]/.test(event.key)) {
                              event.preventDefault();
                            }
                          }}
                         value={price}
                         onChange={(e)=>setprice(e.target.value)}
                        />
                    </div>
                </div>
                <div className='col-lg-4'>
                    <div className='form-group'>
                        <label>Deal Start Date</label>
                        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} className='form-control' />
                        <span className='form-icon'><i class="fa-solid fa-calendar"></i></span>
                    </div>  
                </div>
                <div className='col-lg-4'>
                    <div className='form-group'>
                        <label>Deal End Date</label>
                        <DatePicker minDate={startDate} selected={EndDate} onChange={(date) => setEndDate(date)} className='form-control' />
                        <span className='form-icon'><i class="fa-solid fa-calendar"></i></span>
                    </div>  
                </div>
               
                {status == "IMAGE" &&
                <div className='col-lg-4'>
                    <div className='form-group'>
                        <div>
                        <img  src=""
                      className="w-100"
                      id="editImg"
                     
                    />
                        </div>
                    
                    <label>Deal image</label>
                    <input type='file' className='form-control' onChange={HandleImage}   />
                    </div>
                </div>
                    }
                     {status == "TEXT" &&
                        <div className='col-lg-4'>
                    <div className='form-group'>
                    <label>Deal description</label>
                        <textarea placeholder='Add Deal Text (Max 60 characters)' className='form-control'
                         value={description}
                         onChange={(e)=>setdescription(e.target.value)}
                        >

                        </textarea>
                    </div>
                </div>
}
               

                {status == "TEXT" && 
                <div className='col-lg-4'>
                    <div className='form-group'>
                        <label>Select Font Family</label>
                        <select className='form-control'
                         value={fontfamily}
                         onChange={(e)=>setfontfamily(e.target.value)}
                        >
                            <option>Select font family</option>
                            <option value="Verdana">Verdana</option>
                            <option value="Arial">Arial</option>
                            <option value="Tahoma">Tahoma</option>
                            <option value="Serif">Serif</option>
                        </select>
                    </div>
                </div>  
                }
                {status == "TEXT" && 
                <div className='col-lg-4'>
                    <div className='form-group'>
                        <label>Font Style</label>
                        <select className='form-control'
                          value={fontstyle}
                          onChange={(e)=>setfontstyle(e.target.value)}
                        >
                            <option>Select font Style</option>
                            <option value="italic">Italic</option>
                            <option value="normal">Normal</option>
                            <option value="oblique">Oblique</option>
                        </select>
                    </div>
                </div>  
                }
                 {status == "TEXT" &&
                <div className='col-lg-4'>
                    <div className='form-group'>
                        <label>Select background color </label>
                        <input type='color' className='form-control color-div'
                        value={bgcolor}
                        onChange={(e)=>setbgcolor(e.target.value)}
                        />
                    </div>
                </div>
}
                {status == "TEXT" && 
                <div className='col-lg-4'>
                    <div className='form-group'>
                        <label>Select font color</label>
                        <input type='color' className='form-control color-div'
                         value={fontcolor}
                         onChange={(e)=>setfontcolor(e.target.value)}
                        />
                    </div>
                </div>
}
               
                
                <div className='col-lg-4'>
                    <div className='form-group'>
                        <div className="voicedeal">
                            <input type="checkbox" id="voice" checked={checked}
                            onChange={handleChangecheckbox}   />
                            <label htmlFor="voice">Voice my deals</label>
                        </div>
                    </div>
                </div>
                {checked && 
                <div className='col-lg-4'>
                    <div className='form-group'>
                        <label>Buy Voice Option</label>
                        <select className='form-control'  
                          value={voiceprice}
                          onChange={(e)=>setvoiceprice(e.target.value)}
                        >
                            <option>$10 - 100 Ads</option>
                            <option>$100 - 1000 Ads</option>
                            <option>$1000 - 1000 Ads</option>
                        </select>
                    </div>
                </div>
}
                <div className='col-lg-4 mt-4'>
                <div className='form-group'>
                    <button className='themeBtn' onClick={UpdateHandle}>Update</button>
                </div>
            </div>
            </div>
      </div>
    </div>
    <BottomNavigation/>
  </div>
  </>
  )
}

export default EditDeal