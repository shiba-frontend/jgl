import React, { useEffect, useState } from 'react'
import AfterLoginTopbar from '../../businessowner/header/AfterLoginTopbar'
import BottomNavigation from '../header/BottomNavigation'
import Checkin from "../../../image/icon/checkin.svg";
import { NavLink } from 'react-router-dom';

const MyOrder = () => {
  return (
    <div className='ownerLayout'>
    <AfterLoginTopbar />
    <div className="header-info">
      <div className="container"><img src={Checkin} alt="owner"/> My Order History</div>
    </div>
    <div className="comon-layout">
      <div className="container">
            <div className='order-history-card'>
                <div className='order-history-card-fl'>
                    <h3>Order No: 1947034</h3>
                    <h5>05-12-2019</h5>
                </div>
                <h5>Tracking number: <label>IW3475453455</label></h5>
                <div className='order-history-card-fl'>
                <h5>Quantity: <label>3</label></h5>
                <h5>Total Amount: <label>$100</label></h5>
                </div>
                <div className='order-history-card-fl mt-4'>
                    <NavLink>Details</NavLink>
                    <span className='text-success'>Delivered</span>
                </div>
            </div>
            <div className='order-history-card'>
                <div className='order-history-card-fl'>
                    <h3>Order No: 1947034</h3>
                    <h5>05-12-2019</h5>
                </div>
                <h5>Tracking number: <label>IW3475453455</label></h5>
                <div className='order-history-card-fl'>
                <h5>Quantity: <label>3</label></h5>
                <h5>Total Amount: <label>$100</label></h5>
                </div>
                <div className='order-history-card-fl mt-4'>
                    <NavLink>Details</NavLink>
                    <span className='text-success'>Delivered</span>
                </div>
            </div>
            <div className='order-history-card'>
                <div className='order-history-card-fl'>
                    <h3>Order No: 1947034</h3>
                    <h5>05-12-2019</h5>
                </div>
                <h5>Tracking number: <label>IW3475453455</label></h5>
                <div className='order-history-card-fl'>
                <h5>Quantity: <label>3</label></h5>
                <h5>Total Amount: <label>$100</label></h5>
                </div>
                <div className='order-history-card-fl mt-4'>
                    <NavLink>Details</NavLink>
                    <span className='text-success'>Delivered</span>
                </div>
            </div>
            <div className='order-history-card'>
                <div className='order-history-card-fl'>
                    <h3>Order No: 1947034</h3>
                    <h5>05-12-2019</h5>
                </div>
                <h5>Tracking number: <label>IW3475453455</label></h5>
                <div className='order-history-card-fl'>
                <h5>Quantity: <label>3</label></h5>
                <h5>Total Amount: <label>$100</label></h5>
                </div>
                <div className='order-history-card-fl mt-4'>
                    <NavLink>Details</NavLink>
                    <span className='text-success'>Delivered</span>
                </div>
            </div>
      </div>
    </div>
    <BottomNavigation/>
  </div>
  )
}

export default MyOrder