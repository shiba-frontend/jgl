import React, { useEffect, useState } from 'react'
import AfterLoginTopbar from '../../businessowner/header/AfterLoginTopbar'
import BottomNavigation from '../header/BottomNavigation'
import business from "../../../image/headingicon/bank-card-fill 1.png";
import Dropdown from 'react-bootstrap/Dropdown';
import { NavLink, useNavigate } from 'react-router-dom';

const PaymentCard = () => {
    const [checked1, setChecked1] = useState(false)


    const handleChangecheckbox1 = () => {
        setChecked1(!checked1);
      };







  return (
    <div className='ownerLayout'>
    <div className="top-f-header">
<AfterLoginTopbar />
<div className="header-info">
  <div className="container"><img src={business} alt="owner"/> Pay Now</div>
</div>
</div>
<div className="comon-layout">
  <div className="container">
  <div className="checkout-page">
              <h4>Fill in the following details to make payment with your credit card:</h4>
              <div className="row">
                 
                  <div className="col-lg-4 col-12">
                      <div className="form-group">
                        <h3>Credit Card Information</h3>
                      </div>
                  </div>  
                  <div className="col-lg-4 col-12">
                      <div className="form-group">
                        <label>Name on Card</label>
                        <input type="text" className="form-control" placeholder="card Name" />
                      </div>
                  </div>
                  <div className="col-lg-4 col-12">
                      <div className="form-group">
                        <label>Card Number</label>
                        <input type="text" className="form-control" placeholder="card Number" />
                      </div>
                  </div>
                  <div className="col-lg-4 col-12">
                      <div className="form-group">
                        <label>Expire Date</label>
                        <input type="text" className="form-control" placeholder="date" />
                      </div>
                  </div>
                  <div className="col-lg-4 col-12 mb-4">
                      <div className="form-group">
                        <label>CVV</label>
                        <input type="text" className="form-control" placeholder="CVV" />
                      </div>
                  </div>
                
                <div className='col-lg-4'>
                    <div className='form-group'>
                        <div className="voicedeal">
                            <input type="checkbox" id="voice1" checked={checked1}
                            onChange={handleChangecheckbox1}   />
                            <label htmlFor="voice1">By clicking this checkbox you agree to our </label>
                        </div>
                        <NavLink to="/terms-condition" style={{color:'red',marginLeft:'25px',marginTop:"5px"}}>Terms & Conditions</NavLink>
                    </div>
                </div>
                  <div className="col-lg-4 col-12">
                      <div className="form-group mt-3">
                      <button className='themeBtn'>Pay Now</button>
                      </div>
                  </div>
              </div>
          </div>
  </div>
</div>
<BottomNavigation/>
</div>
  )
}

export default PaymentCard