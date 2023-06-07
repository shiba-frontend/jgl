import React, { useEffect, useState } from 'react'
import AfterLoginTopbar from '../../businessowner/header/AfterLoginTopbar'
import BottomNavigation from '../header/BottomNavigation'
import business from "../../../image/icon/business.svg";
import Dropdown from 'react-bootstrap/Dropdown';
import addicon from '../../../image/Add_round_fill.png'
import { NavLink } from 'react-router-dom';

const DealsListing = () => {
  return (
    <div className='ownerLayout'>
        <div className="top-f-header">
    <AfterLoginTopbar />
    <div className="header-info">
      <div className="container"><img src={business} alt="owner"/> My Deals (You can create multiple deals)</div>
    </div>
    </div>
    <div className="comon-layout deal-listing">
      <div className="container">
            <h3>Text Deals will be Voiced</h3>
            <div className='row'>
                <div className='col-lg-3 col-6'>
                    <div className='delas-card'>
                        <div className='details-csrd-bg'>
                        <Dropdown className='dropDownBtn'>
                            <Dropdown.Toggle id="dropdown-basic">
                            <i class="fa-solid fa-ellipsis-vertical"></i>
                            </Dropdown.Toggle>

                              <Dropdown.Menu className='dropdownMenu'>
                                  <button>Edit</button>
                                  <button>Delete</button>
                                  <button>Mark as Active</button>
                              </Dropdown.Menu>
                        </Dropdown>
                          <p>Get 20% Discount on Engine Oil Change in the first week of New Year</p>
                        </div>
                        <h5>New Year Deal</h5>
                    </div>
                </div>
                <div className='col-lg-3 col-6'>
                    <div className='delas-card'>
                        <div className='details-csrd-bg'>
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
                          <p>Get 20% Discount on Engine Oil Change in the first week of New Year</p>
                        </div>
                        <h5>20% Off For Thanks Giving</h5>
                    </div>
                </div>
                <div className='col-lg-3 col-6'>
                    <div className='delas-card'>
                        <div className='details-csrd-bg'>
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
                          <p>Get 20% Discount on Engine Oil Change in the first week of New Year</p>
                        </div>
                        <h5>20% Off For Thanks Giving</h5>
                    </div>
                </div>
            </div>
            <div className='addIcon'>
              <NavLink to="/add-deal">
                  <img src ={addicon}   alt="addicon" />
              </NavLink>
            </div>
      </div>
    </div>
    <BottomNavigation/>
  </div>
  )
}

export default DealsListing