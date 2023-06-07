import React, { useEffect, useState } from "react";
import AfterLoginTopbar from "../../businessowner/header/AfterLoginTopbar";
import BottomNavigation from "../header/BottomNavigation";
import phoneIcon from "../../../image/Phone_fill.png";
import LocationIcon from "../../../image/Pin_alt_fill.png";
import addicon from "../../../image/Add_round_fill.png";
import { NavLink } from "react-router-dom";

const BusinessListing = () => {
  return (
    <div className="ownerLayout">
      <div className="top-f-header">
        <AfterLoginTopbar />
        <div className="header-info">
          <div className="container"> My Business Listing</div>
        </div>
      </div>

      <div className="comon-layout deal-listing">
        <div className="container">
          <div className="listing-card">
            <h3>Tony’s Motor Garage</h3>
            <p>
              <img src={LocationIcon} /> 123 XYZ Road, Bowie, MD, USA
            </p>
            <p>
              <img src={phoneIcon} /> Phone: 98765433210
            </p>
            <div className="listing-card-btn">
              <NavLink to="/add-business" className="fillBtn">
                Edit Listing
              </NavLink>
              <NavLink to="/delete-listing" className="outlinebtn">
                Delete Listing
              </NavLink>
            </div>
          </div>
          <div className="addIcon">
            <NavLink to="/add-business">
              <img src={addicon} alt="addicon" />
            </NavLink>
          </div>
        </div>
      </div>
      <BottomNavigation />
    </div>
  );
};

export default BusinessListing;
