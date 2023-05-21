import React, { useEffect, useState } from 'react'
import AfterLoginTopbar from '../../businessowner/header/AfterLoginTopbar'
import BottomNavigation from '../header/BottomNavigation'
import business from "../../../image/headingicon/bank-card-fill 1.png";
import Dropdown from 'react-bootstrap/Dropdown';
import { NavLink } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddDeal = () => {
    const [status, setstatus] = useState("text");
    const [startDate, setStartDate] = useState(new Date());


    const handleChange = e => {
        const target = e.target;
        if (target.checked) {
            setstatus(target.value);
        }
      };


  return (
    <div className='ownerLayout'>
    <AfterLoginTopbar />
    <div className="header-info">
      <div className="container"><img src={business} alt="owner"/> Add new {status} Deal</div>
    </div>
    <div className="comon-layout add-deal-listing">
      <div className="container">
            <div className='row'>
                <div className='col-lg-4'>
                    <div className='form-group'>
                        <ul className='acInflex'>
                            <li>
                                <input type='radio' id="active" name='status' value="text" checked={status == 'text'} onChange={handleChange}  />
                                <label for="active">Text</label>
                            </li>
                            <li>
                                <input type='radio' id="inactive" name='status' value="image" checked={status == 'image'} onChange={handleChange} />
                                <label for="inactive">Image</label>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className='col-lg-4'>
                    <div className='form-group'>
                        <label>Deal Title</label>
                        <input type='text' className='form-control' placeholder='Add Deal Title' />
                    </div>
                </div>
                <div className='col-lg-4'>
                    <div className='form-group'>
                    <label>Deal description</label>
                        <input type='text' className='form-control' placeholder='Add Deal Text (Max 60 characters)' />
                    </div>
                </div>
                {status == "image" &&
                <div className='col-lg-4'>
                    <div className='form-group'>
                    <label>Deal image</label>
                    <input type='file' className='form-control'/>
                    </div>
                </div>
}
                {status == "text" &&
                <div className='col-lg-4'>
                    <div className='form-group'>
                        <label>Select background color</label>
                        <input type='color' className='form-control' />
                    </div>
                </div>
}
                {status == "text" && 
                <div className='col-lg-4'>
                    <div className='form-group'>
                        <label>Select Font</label>
                        <select className='form-control'>
                            <option>1</option>
                            <option>1</option>
                            <option>1</option>
                        </select>
                    </div>
                </div>  
                }
                {status == "text" && 
                <div className='col-lg-4'>
                    <div className='form-group'>
                        <label>Select font color</label>
                        <input type='color' className='form-control' />
                    </div>
                </div>
}
                <div className='col-lg-4'>
                    <div className='form-group'>
                        <label>Select Keywords</label>
                        <select className='form-control'>
                            <option>1</option>
                            <option>1</option>
                            <option>1</option>
                        </select>
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
                        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} className='form-control' />
                        <span className='form-icon'><i class="fa-solid fa-calendar"></i></span>
                    </div>  
                </div>
                <div className='col-lg-4 mt-4'>
                <div className='form-group'>
                    <button className='themeBtn'>Submit</button>
                </div>
            </div>
            </div>
      </div>
    </div>
    <BottomNavigation/>
  </div>
  )
}

export default AddDeal