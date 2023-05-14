import React from 'react'
import AfterLoginTopbar from '../header/AfterLoginTopbar'
import { NavLink } from 'react-router-dom'
import deal from "../../../image/deal-image.png";
import dealIcon from "../../../image/headingicon/bank-card-fill 1.svg";

const Business = () => {
  return (
    <>
    <AfterLoginTopbar/>
    <div className="header-info">
        <div className="container"><img src={dealIcon}/> Business</div>
      </div>
    <div className='comon-layout'>
         <div className='container'>
            <div className='row'>
                <div className='col-6 col-lg-3 col-md-4'>
                    <div className='deal-box'>
                        <div className='deal-box-image'>
                            <NavLink to="/business-details/2">
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
    </>
  )
}

export default Business