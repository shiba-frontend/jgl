import React, { useEffect, useState } from 'react'
import AfterLoginTopbar from '../../businessowner/header/AfterLoginTopbar'
import BottomNavigation from '../header/BottomNavigation'
import addBusiness from "../../../image/headingicon/File_dock_add_fill.svg";


const AddBusiness = () => {
    const [dropdownData, setdropdownData] = useState([])
    const [selectData, setselectData] = useState([])
    const [show, setshow] = useState(false)
    const [place, setplace] = useState("local");

    const businessListing = [
        {
            id:1,
            name:"Accounting & Tax Services (0)"
        },
        {
            id:2,
            name:"Apartments (0)"
        },
        {
            id:3,
            name:"Arts Culture & Entertainment (0)"
        },
        {
            id:4,
            name:"Bakery (0)"
        },
        {
            id:5,
            name:"Banking & Finance (0)"
        },

        
    ]

    useEffect(()=>{
        setdropdownData(businessListing)   
    },[])

    const handleChangePlace = e => {
        const target = e.target;
        if (target.checked) {
            setplace(target.value);
        }
      };


    const DropdownHandle = ()=>{
        setshow(!show);
    }


    const ChageHandle = (e)=>{
        const value = e.target.value;
        const checked = e.target.checked;
        if(checked){
            setselectData([
                ...selectData, value
            ])
        } else {
            setselectData(selectData.filter((e)=>(
                e !== value
            )))
        }
    }

    const SubmitHandle = ()=>{
        console.log(selectData)
    }


  return (
    <div className='ownerLayout'>
    <AfterLoginTopbar />
    <div className="header-info">
      <div className="container"><img src={addBusiness} alt="owner"/> Add Your Business Listing</div>
    </div>
    <div className="comon-layout">
      <div className="container">
          <div className='row'>
                <div className='col-lg-4 col-12'>
                    <div className='form-group'>
                        <label>Business Name</label>
                        <input type='text' className='form-control' placeholder='Business Name'/>
                    </div>
                </div>
                <div className='col-lg-4 col-12'>
                    <div className='form-group'>
                        <label>Business URL</label>
                        <input type='text' className='form-control' placeholder='Business URL'/>
                    </div>
                </div>
                <div className='col-lg-4 col-12'>
                    <div className='form-group'>
                        <label>Email</label>
                        <input type='email' className='form-control' placeholder='john.smith@email.com'/>
                    </div>
                </div>
                <div className='col-lg-4 col-12'>
                    <div className='form-group'>
                        <label>Phone No</label>
                        <input type='email' className='form-control' placeholder='Enter Phone'/>
                    </div>
                </div>
                <div className='col-lg-4 col-12'>
                    <div className='form-group'>
                    <label>Select Business List</label>
                        <div className='custom-drodown'>
                            <button onClick={DropdownHandle}>Select  Category ({selectData.length}) <span><i class="fa-sharp fa-solid fa-angle-down"></i></span></button>
                           <div className={`custom-dropdown-box ${show ? "active" : ''}`}>
                                <ul>
                                    {dropdownData.map((item, index)=>{
                                        return (
                                            <li key={index}>
                                                <input type='checkbox' name="blist" value={item.id} id={`list_${index}`} onChange={ChageHandle}  />
                                                 <label htmlFor={`list_${index}`}>{item.name}</label>
                                            </li>
                                        )
                                    })}
                                   
                                </ul>
                           </div>
                        </div>

                    </div>
                </div>
                <div className='col-lg-4 col-12'>
                    <div className='form-group'>
                        <label>Upload Logo</label>
                       <input type='file' className='form-control'/>
                    </div>
                </div>
                <div className='col-lg-4 col-12'>
                    <div className='form-group'>
                        <label>Youtube video link</label>
                       <input type='text' className='form-control' placeholder='Video Link'  />
                    </div>
                </div>
                <div className='col-lg-4 col-12'>
                    <div className='form-group'>
                        <label>Business Description</label>
                         <textarea className='form-control' placeholder='Description Here'></textarea>
                    </div>
                </div>
                <div className='col-lg-4 col-12'>
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
                </div>
                <div className='col-lg-4 col-12'>
                    <div className='form-group'>
                        <label>Address</label>
                       <input type='text' className='form-control' placeholder='Address'  />
                    </div>
                </div>
                <div className='col-lg-4 col-12 mt-3'>
                    <div className='form-group'>
                        <button className='themeBtn' onClick={SubmitHandle}>Submit</button>
                    </div>
                </div>
          </div>
      </div>
    </div>
    <BottomNavigation/>
  </div>
  )
}

export default AddBusiness