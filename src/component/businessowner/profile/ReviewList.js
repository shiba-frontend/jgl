import React, { useEffect, useState } from 'react'
import AfterLoginTopbar from '../../businessowner/header/AfterLoginTopbar'
import BottomNavigation from '../header/BottomNavigation'
import Dropdown from 'react-bootstrap/Dropdown';
import deal from "../../../image/icon/deal.svg";
import { NavLink } from 'react-router-dom';

const ReviewList = () => {
  return (
    <div className='ownerLayout'>
    <AfterLoginTopbar />
    <div className="header-info">
      <div className="container"><img src={deal} alt="review" /> My Reviews</div>
    </div>
    <div className="comon-layout review-listing">
      <div className="container">
           <div className='row'>
                <div className='col-lg-4 col-12'>
                    <div className='review-card'>
                    <div className='review-card-header'>
                         <div className='review-card-header-l'>
                         <h5>Aaron Bracewell</h5>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-regular fa-star"></i>
                        </div>
                        
                        <Dropdown className='dropDownBtn'>
                            <Dropdown.Toggle id="dropdown-basic">
                            <i class="fa-solid fa-ellipsis-vertical"></i>
                            </Dropdown.Toggle>

                              <Dropdown.Menu className='dropdownMenu'>
                                  <button>View More</button>
                                  <button>Approve</button>
                                  <button>Respond to review</button>
                              </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    
                        <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. …….</p>
                        <span>December 27, 2022</span>
                    </div>
                </div>
                <div className='col-lg-4 col-12'>
                    <div className='review-card'>
                    <div className='review-card-header'>
                         <div className='review-card-header-l'>
                         <h5>Aaron Bracewell</h5>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-regular fa-star"></i>
                        </div>
                        
                        <Dropdown className='dropDownBtn'>
                            <Dropdown.Toggle id="dropdown-basic">
                            <i class="fa-solid fa-ellipsis-vertical"></i>
                            </Dropdown.Toggle>

                              <Dropdown.Menu className='dropdownMenu'>
                                  <button>View More</button>
                                  <button>Approve</button>
                                  <button>Respond to review</button>
                              </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    
                        <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. …….</p>
                        <span>December 27, 2022</span>
                    </div>
                </div>
                <div className='col-lg-4 col-12'>
                    <div className='review-card'>
                    <div className='review-card-header'>
                         <div className='review-card-header-l'>
                         <h5>Aaron Bracewell</h5>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-regular fa-star"></i>
                        </div>
                        
                        <Dropdown className='dropDownBtn'>
                            <Dropdown.Toggle id="dropdown-basic">
                            <i class="fa-solid fa-ellipsis-vertical"></i>
                            </Dropdown.Toggle>

                              <Dropdown.Menu className='dropdownMenu'>
                                  <button>View More</button>
                                  <button>Approve</button>
                                  <button>Respond to review</button>
                              </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    
                        <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. …….</p>
                        <span>December 27, 2022</span>
                    </div>
                </div>
                <div className='col-lg-4 col-12'>
                    <div className='review-card'>
                    <div className='review-card-header'>
                         <div className='review-card-header-l'>
                         <h5>Aaron Bracewell</h5>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-regular fa-star"></i>
                        </div>
                        
                        <Dropdown className='dropDownBtn'>
                            <Dropdown.Toggle id="dropdown-basic">
                            <i class="fa-solid fa-ellipsis-vertical"></i>
                            </Dropdown.Toggle>

                              <Dropdown.Menu className='dropdownMenu'>
                                  <button>View More</button>
                                  <button>Approve</button>
                                  <button>Respond to review</button>
                              </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    
                        <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. …….</p>
                        <span>December 27, 2022</span>
                    </div>
                </div>
           </div>
           
      </div>
    </div>
    <BottomNavigation/>
  </div>
  )
}

export default ReviewList