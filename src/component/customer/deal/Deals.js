import React from 'react'
import AfterLoginTopbar from '../header/AfterLoginTopbar'
import { NavLink } from 'react-router-dom'
import deal from "../../../image/deal-image.png";
import dealIcon from "../../../image/headingicon/Money_fill.svg";
import BottomTabCustomer from '../header/BottomTabCustomer';
import cart from "../../../image/cart-icon.png";

const Deals = () => {
  return (
    <div className='customer-layout'>
         <div className="top-f-header">
    <AfterLoginTopbar/>
    <div className="header-info">
        <div className="container"><img src={dealIcon}/> Deals</div>
      </div>
      </div>
    <div className='comon-layout'>
         <div className='container'>
            <div className='row'>
                <div className='col-6 col-lg-3 col-md-4'>
                    <div className='deal-box'>
                        <div className='deal-box-image'>
                            <div className='cart-icon'>
                                <img src={cart} />
                            </div>
                            <NavLink to="/">
                                <img src={deal}/>
                                <div className='overlay-info'>
                                <h5><span>H&M</span> McLean, Virginia,22102</h5>
                                </div>
                            </NavLink>
                        </div>
                        <div className='deal-box-info'>
                            <label>Deal</label>
                            <h3>Come and try our new flavour</h3>
                        </div>
                    </div>
                </div>
                <div className='col-6 col-lg-3 col-md-4'>
                    <div className='deal-box'>
                        <div className='deal-box-image'>
                        <div className='cart-icon'>
                                <img src={cart} />
                            </div>
                            <NavLink to="/">
                            <img src={deal}/>
                                <div className='overlay-info'>
                                <h5><span>H&M</span> McLean, Virginia,22102</h5>
                                </div>
                            </NavLink>
                        </div>
                        <div className='deal-box-info'>
                            <label>Deal</label>
                            <h3>Come and try our new flavour</h3>
                        </div>
                    </div>
                </div>
                <div className='col-6 col-lg-3 col-md-4'>
                    <div className='deal-box'>
                        <div className='deal-box-image'>
                        <div className='cart-icon'>
                                <img src={cart} />
                            </div>
                            <NavLink to="/">
                            <img src={deal}/>
                                <div className='overlay-info'>
                                <h5><span>H&M</span> McLean, Virginia,22102</h5>
                                </div>
                            </NavLink>
                        </div>
                        <div className='deal-box-info'>
                            <label>Deal</label>
                            <h3>Come and try our new flavour</h3>
                        </div>
                    </div>
                </div>
                <div className='col-6 col-lg-3 col-md-4'>
                    <div className='deal-box'>
                        <div className='deal-box-image'>
                        <div className='cart-icon'>
                                <img src={cart} />
                            </div>
                            <NavLink to="/">
                            <img src={deal}/>
                                <div className='overlay-info'>
                                <h5><span>H&M</span> McLean, Virginia,22102</h5>
                                </div>
                            </NavLink>
                        </div>
                        <div className='deal-box-info'>
                            <label>Deal</label>
                            <h3>Come and try our new flavour</h3>
                        </div>
                    </div>
                </div>
                <div className='col-6 col-lg-3 col-md-4'>
                    <div className='deal-box'>
                        <div className='deal-box-image'>
                        <div className='cart-icon'>
                                <img src={cart} />
                            </div>
                            <NavLink to="/">
                            <img src={deal}/>
                                <div className='overlay-info'>
                                <h5><span>H&M</span> McLean, Virginia,22102</h5>
                                </div>
                            </NavLink>
                        </div>
                        <div className='deal-box-info'>
                            <label>Deal</label>
                            <h3>Come and try our new flavour</h3>
                        </div>
                    </div>
                </div>
                <div className='col-6 col-lg-3 col-md-4'>
                    <div className='deal-box'>
                        <div className='deal-box-image'>
                        <div className='cart-icon'>
                                <img src={cart} />
                            </div>
                            <NavLink to="/">
                            <img src={deal}/>
                                <div className='overlay-info'>
                                <h5><span>H&M</span> McLean, Virginia,22102</h5>
                                </div>
                            </NavLink>
                        </div>
                        <div className='deal-box-info'>
                            <label>Deal</label>
                            <h3>Come and try our new flavour</h3>
                        </div>
                    </div>
                </div>
                <div className='col-6 col-lg-3 col-md-4'>
                    <div className='deal-box'>
                        <div className='deal-box-image'>
                        <div className='cart-icon'>
                                <img src={cart} />
                            </div>
                            <NavLink to="/">
                            <img src={deal}/>
                                <div className='overlay-info'>
                                <h5><span>H&M</span> McLean, Virginia,22102</h5>
                                </div>
                            </NavLink>
                        </div>
                        <div className='deal-box-info'>
                            <label>Deal</label>
                            <h3>Come and try our new flavour</h3>
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

export default Deals