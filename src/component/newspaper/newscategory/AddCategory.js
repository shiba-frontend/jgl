import React, { useState } from 'react'
import AfterLoginTopbar from '../../newspaper/header/AfterLoginTopbar'
import Dropdown from 'react-bootstrap/Dropdown';
import dealIcon from "../../../image/headingicon/File_dock_add_fill.svg";
import { NavLink } from 'react-router-dom';

const AddCategory = () => {
    const [status, setstatus] = useState("1");


    const handleChange = e => {
        const target = e.target;
        if (target.checked) {
            setstatus(target.value);
        }
      };

  return (
    <>
    <AfterLoginTopbar/>
    <div className='header-info'>
        <div className='container'>
        <img src={dealIcon}/>  Add News Categories
        </div>
    
      </div>
      <div className='comon-layout'>
      <div className='container'>
           
                <div className='form-group'>
                    <label>Category Name</label>
                    <input type='text' className='form-control' placeholder='Category Name'/>
                </div>
                <div className='form-group'>
                    <label>Position</label>
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
                    <button className='themeBtn'>Submit</button>
                </div>
        </div>
       

    </div>
    </>
  )
}

export default AddCategory