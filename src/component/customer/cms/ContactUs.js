import React from "react";
import AfterLoginTopbar from "../../customer/header/AfterLoginTopbar";
import dealIcon from "../../../image/headingicon/message-3-fill.svg";
import BottomTabCustomer from "../header/BottomTabCustomer";

const ContactUs = () => {
  return (
    <div className='customer-layout'>
    <AfterLoginTopbar />
    <div className="header-info">
      <div className="container"><img src={dealIcon}/> Contact Us</div>
    </div>
    <div className="comon-layout">
      <div className="container">
            <div className="contact-us">
                <h2>Get In Touch</h2>
                <div className="row">
                    <div className="col-lg-4 col-12">
                        <div className="form-group">
                            <label>First Name</label>
                            <input type="text" className="form-control" placeholder="Enter Here" />
                        </div>
                    </div>
                    <div className="col-lg-4 col-12">
                        <div className="form-group">
                            <label>Last Name</label>
                            <input type="text" className="form-control" placeholder="Enter Here" />
                        </div>
                    </div>
                    <div className="col-lg-4 col-12">
                        <div className="form-group">
                            <label>Primary Mail Id</label>
                            <input type="email" className="form-control" placeholder="Enter Here" />
                        </div>
                    </div>
                    <div className="col-lg-4 col-12">
                        <div className="form-group">
                            <label>Mobile Number</label>
                            <input type="text" className="form-control" placeholder="Enter Here" />
                        </div>
                    </div>
                    <div className="col-lg-4 col-12">
                        <div className="form-group">
                            <label>Subject</label>
                            <input type="text" className="form-control" placeholder="Enter Here" />
                        </div>
                    </div>
                    <div className="col-lg-4 col-12 mb-4">
                        <div className="form-group">
                            <label>Message</label>
                            <textarea placeholder="Enter message here" className="form-control"></textarea>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-4 col-12">
                        <button className="themeBtn">Send Messege</button>
                    </div>
                </div>
            </div>
      </div>
    </div>
    <BottomTabCustomer/>
  </div>
  )
}

export default ContactUs