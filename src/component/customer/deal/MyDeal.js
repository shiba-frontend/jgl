import React from 'react'
import AfterLoginTopbar from '../header/AfterLoginTopbar'
import { NavLink } from 'react-router-dom'
import deal from "../../../image/deal-image.png";
import dealIcon from "../../../image/headingicon/Bookmark_fill.svg";
import BottomTabCustomer from '../header/BottomTabCustomer';

const MyDeal = () => {
  return (
    <div className='customer-layout'>
         <div className="top-f-header">
    <AfterLoginTopbar/>
    <div className="header-info">
        <div className="container"><img src={dealIcon}/> My Deals</div>
      </div>
      </div>
    <div className='comon-layout'>
         <div className='container'>
            <div className='row'>
                <div className='col-6 col-lg-3 col-md-4'>
                    <div className='deal-box'>
                        <div className='deal-box-image'>
                            <NavLink to="/">
                                <img src={deal}/>
                                <div className='overlay-info'>
                                <h5><span>H&M</span> McLean, Virginia,22102</h5>
                                </div>
                            </NavLink>
                        </div>
                       
                    </div>
                </div>
                <div className='col-6 col-lg-3 col-md-4'>
                    <div className='deal-box'>
                        <div className='deal-box-image'>
                            <NavLink to="/">
                            <img src={deal}/>
                                <div className='overlay-info'>
                                <h5><span>H&M</span> McLean, Virginia,22102</h5>
                                </div>
                            </NavLink>
                        </div>
                       
                    </div>
                </div>
                <div className='col-6 col-lg-3 col-md-4'>
                    <div className='deal-box'>
                        <div className='deal-box-image'>
                            <NavLink to="/">
                            <img src={deal}/>
                                <div className='overlay-info'>
                                <h5><span>H&M</span> McLean, Virginia,22102</h5>
                                </div>
                            </NavLink>
                        </div>
                       
                    </div>
                </div>
                <div className='col-6 col-lg-3 col-md-4'>
                    <div className='deal-box'>
                        <div className='deal-box-image'>
                            <NavLink to="/">
                            <img src={deal}/>
                                <div className='overlay-info'>
                                <h5><span>H&M</span> McLean, Virginia,22102</h5>
                                </div>
                            </NavLink>
                        </div>
                       
                    </div>
                </div>
                <div className='col-6 col-lg-3 col-md-4'>
                    <div className='deal-box'>
                        <div className='deal-box-image'>
                            <NavLink to="/">
                            <img src={deal}/>
                                <div className='overlay-info'>
                                <h5><span>H&M</span> McLean, Virginia,22102</h5>
                                </div>
                            </NavLink>
                        </div>
                        
                    </div>
                </div>
                <div className='col-6 col-lg-3 col-md-4'>
                    <div className='deal-box'>
                        <div className='deal-box-image'>
                            <NavLink to="/">
                            <img src={deal}/>
                                <div className='overlay-info'>
                                <h5><span>H&M</span> McLean, Virginia,22102</h5>
                                </div>
                            </NavLink>
                        </div>
                       
                    </div>
                </div>
                <div className='col-6 col-lg-3 col-md-4'>
                    <div className='deal-box'>
                        <div className='deal-box-image'>
                            <NavLink to="/">
                            <img src={deal}/>
                                <div className='overlay-info'>
                                <h5><span>H&M</span> McLean, Virginia,22102</h5>
                                </div>
                            </NavLink>
                        </div>
                      
                    </div>
                </div>
            </div>
        </div>
    </div>
    <BottomTabCustomer/>
    </div>
   
  )
}

export default MyDeal