import React, { useEffect, useState } from 'react'
import AfterLoginTopbar from '../../businessowner/header/AfterLoginTopbar'
import BottomNavigation from '../header/BottomNavigation'
import analytics from "../../../image/icon/Chart_fill.svg";
import search_icon from "../../../image/Search_alt_fill.svg";
import customer_icon from "../../../image/User_fill.svg";
import leads_icon from "../../../image/Pipe_fill.svg";
import adv_icon from "../../../image/Form_fill.svg";
import expenses_icon from "../../../image/Money_fill.svg";
import { NavLink } from 'react-router-dom';

const Analytics = () => {
  return (
    <div className='ownerLayout'>
        <div className="top-f-header">
    <AfterLoginTopbar />
    <div className="header-info">
      <div className="container"><img src={analytics} alt="owner"/> Analytics</div>
    </div>
    </div>
    <div className="comon-layout">
      <div className="container">
            <div className='row'>
                <div className='col-12'>
                    <div className='analytics-card' style={{minHeight:"auto"}}>
                        <img src={search_icon} alt="search" />
                        <h3>Searches</h3>
                        <b>136</b>
                        <p>People Who Have Searched Your Type of Business and Your Business Appeared as a Recommended Business.</p>
                    </div>
                </div>
                <div className='col-6'>
                    <div className='analytics-card'>
                        <img src={customer_icon} alt="search" />
                        <h3>CUSTOMERS</h3>
                        <b>1</b>
                        <p>People Who Have Searched Your Type of Business and Your Business Appeared as a Recommended Business.</p>
                    </div>
                </div>
                <div className='col-6'>
                    <div className='analytics-card'>
                        <img src={adv_icon} alt="search" />
                        <h3>Advertisement</h3>
                        <b>60</b>
                        <p>Business and Your Business Appeared as a Recommended Business.</p>
                    </div>
                </div>
                <div className='col-6'>
                    <div className='analytics-card'>
                        <img src={leads_icon} alt="search" />
                        <h3>LEADS</h3>
                        <b>600</b>
                        <p>People Who Have Visited Your Business Places.</p>
                    </div>
                </div>
              
                <div className='col-6'>
                    <div className='analytics-card'>
                        <img src={expenses_icon} alt="search" />
                        <h3>Expenses</h3>
                        <b>$674k</b>
                        <p>People Who Have Visited Your Business Places.</p>
                    </div>
                </div>
            </div>
           
          
      </div>
    </div>
    <BottomNavigation/>
  </div>
  )
}

export default Analytics