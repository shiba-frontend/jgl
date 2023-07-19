import React,{useState,useEffect} from "react";
import AfterLoginTopbar from "../header/AfterLoginTopbar";
import BottomTabCustomer from "../header/BottomTabCustomer";
import { NavLink } from "react-router-dom";
import { IMAGE } from "../../../common/Theme";
import CustomLoader from '../../../common/CustomLoader';
import axios from 'axios';
import { toast } from 'react-toastify';

const Payment = () => {
    const [loading, setloading] = useState(false);




  return (
    <div className='customer-layout'>
    {loading && <CustomLoader/>}
   <div className="top-f-header">
  <AfterLoginTopbar />
  <div className="header-info">
    <div className="container"><img src={IMAGE.cart_icon}/> Check Out</div>
  </div>
  </div>
  <div className="comon-layout">
    <div className="container">
      <div className="checkout-page">
          <h4>Fill in the following details to make payment with your credit card:</h4>
          <h3>Card Information</h3>
          <div className="row">
             
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
             
              <div className="col-lg-4 col-12">
                  <div className="form-group mt-3">
                  <button className='themeBtn' >Pay Now</button>
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

export default Payment