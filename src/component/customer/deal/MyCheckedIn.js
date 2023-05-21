import React from 'react'
import AfterLoginTopbar from '../header/AfterLoginTopbar'
import { NavLink } from 'react-router-dom'
import deal from "../../../image/deal-image.png";
import dealIcon from "../../../image/headingicon/calendar-fill 1.svg";
import BottomTabCustomer from '../header/BottomTabCustomer';

const MyCheckedIn = () => {
  return (
    <div className='customer-layout'>
    <AfterLoginTopbar/>
    <div className="header-info">
        <div className="container"><img src={dealIcon}/> My Checked-Ins</div>
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

export default MyCheckedIn