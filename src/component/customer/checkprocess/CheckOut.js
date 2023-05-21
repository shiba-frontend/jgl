import React from "react";
import AfterLoginTopbar from "../header/AfterLoginTopbar";
import cartIcon from "../../../image/headingicon/Bag_fill.png";
import dealImage from "../../../image/deal-image.png";
import BottomTabCustomer from "../header/BottomTabCustomer";

const CheckOut = () => {
  return (
    <div className='customer-layout'>
      <AfterLoginTopbar />
      <div className="header-info">
        <div className="container"><img src={cartIcon}/> Check Out</div>
      </div>
      <div className="comon-layout">
        <div className="container">
          <div className="checkout-page">
              <h4>Fill in the following details to make payment with your credit card:</h4>
              <h3>Customer Information</h3>
              <div className="row">
                  <div className="col-lg-4 col-12">
                      <div className="form-group">
                        <label>Name</label>
                        <input type="text" className="form-control" placeholder="Full Name" />
                      </div>
                  </div>
                  <div className="col-lg-4 col-12">
                      <div className="form-group">
                        <label>Address</label>
                        <input type="text" className="form-control" placeholder="Address" />
                      </div>
                  </div>
                  <div className="col-lg-4 col-12">
                      <div className="form-group">
                        <label>City</label>
                        <input type="text" className="form-control" placeholder="City" />
                      </div>
                  </div>
                  <div className="col-lg-4 col-12">
                      <div className="form-group">
                        <label>State</label>
                        <input type="text" className="form-control" placeholder="State" />
                      </div>
                  </div>
                  <div className="col-lg-4 col-12">
                      <div className="form-group">
                        <label>Zipcode</label>
                        <input type="text" className="form-control" placeholder="Zipcode" />
                      </div>
                  </div>
                  <div className="col-lg-4 col-12">
                      <div className="form-group">
                        <label>Country</label>
                        <input type="text" className="form-control" placeholder="Country" />
                      </div>
                  </div>
                  <div className="col-lg-4 col-12 mt-4">
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
                  <div className="col-lg-4 col-12">
                      <div className="form-group">
                      <button className='themeBtn' to="/check-out">Pay Now</button>
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

export default CheckOut