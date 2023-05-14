import React, { useState } from 'react'
import AfterLoginTopbar from '../../newspaper/header/AfterLoginTopbar'
import Dropdown from 'react-bootstrap/Dropdown';
import dealIcon from "../../../image/headingicon/File_dock_add_fill.svg";
import { NavLink } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddArticles = () => {
    const [status, setstatus] = useState("1");
    const [place, setplace] = useState("local");
    const [startDate, setStartDate] = useState(new Date());


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


  return (
    <>
    <AfterLoginTopbar/>
    <div className='header-info'>
        <div className='container'>
        <img src={dealIcon}/>  Add News Article
        </div>
    
      </div>
      <div className='comon-layout'>
      <div className='container'>
           
                <div className='form-group'>
                    <label>Article Title</label>
                    <input type='text' className='form-control' placeholder='Title'/>
                </div>
                <div className='form-group'>
                    <label>Select Category</label>
                    <select className='form-control'>
                        <option>Top Storiews</option>
                        <option>US</option>
                        <option>Business</option>
                        <option>Politics</option>
                    </select>
                </div>
                <div className='form-group'>
                    <label>Writers Name</label>
                    <input type='text' className='form-control' placeholder='Writers Name'/>
                </div>
                <div className='form-group'>
                    <label>Deal Start Date</label>
                    <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} className='form-control' />
                    <span className='form-icon'><i class="fa-solid fa-calendar"></i></span>
                </div>
                <div className='form-group'>
                    <label>Select Position</label>
                    <select className='form-control'>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                    </select>
                </div>
                <div className='form-group'>
                    <ul className='acInflex'>
                        <li>
                            <input type='radio' id="local" name='place' value="local" checked={place == 'local'} onChange={handleChangePlace}  />
                            <label for="local">Local</label>
                        </li>
                        <li>
                            <input type='radio' id="national" name='place' value="national" checked={place == 'national'} onChange={handleChangePlace} />
                            <label for="national">National</label>
                        </li>
                        <li>
                            <input type='radio' id="international" name='place' value="international" checked={place == 'international'} onChange={handleChangePlace} />
                            <label for="international">International</label>
                        </li>
                    </ul>
                </div>
                <div className='form-group'>
                    <ul className='acInflex'>
                        <li>
                            <input type='radio' id="active" name='status' value="1" checked={status == '1'} onChange={handleChange}  />
                            <label for="active">Active</label>
                        </li>
                        <li>
                            <input type='radio' id="inactive" name='status' value="0" checked={status == '0'} onChange={handleChange} />
                            <label for="inactive">Inactive</label>
                        </li>
                    </ul>
                </div>
                <div className='form-group'>
                    <label>Description</label>
                    <textarea className='form-control' placeholder='Text Here'>  </textarea>
                </div>
                <div className='form-group'>
                <label>Choose Image</label>
                    <input type='file' className='form-control'/>
                </div>
                <div className='form-group'>
                    <button className='themeBtn'>Submit</button>
                </div>
        </div>
       

    </div>
    </>
  )
}

export default AddArticles