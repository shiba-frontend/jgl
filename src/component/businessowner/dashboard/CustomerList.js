import React, { useEffect, useState } from 'react'
import AfterLoginTopbar from '../../businessowner/header/AfterLoginTopbar'
import BottomNavigation from '../header/BottomNavigation'
import customerIcon from "../../../image/icon/my-deal.svg";
import Phone_fill from "../../../image/Phone_fill.png";
import message_fill from "../../../image/Message_fill.png";

const CustomerList = () => {
  return (
    <div className='ownerLayout'>
       <div className="top-f-header">
    <AfterLoginTopbar />
    <div className="header-info">
      <div className="container"><img src={customerIcon} alt="owner"/> Customers Who Bought From Us…</div>
    </div>
    </div>
    <div className="comon-layout">
      <div className="container">
          <div className='customer-list'>
                <p><img src={Phone_fill}  alt='icon' /> Steven Williams +11234567890</p>
                <p><img src={message_fill}  alt='icon' /> Steve.williams@email.com</p>
          </div>
          <div className='customer-list'>
                <p><img src={Phone_fill}  alt='icon' /> Steven Williams +11234567890</p>
                <p><img src={message_fill}  alt='icon' /> Steve.williams@email.com</p>
          </div>
          <div className='customer-list'>
                <p><img src={Phone_fill}  alt='icon' /> Steven Williams +11234567890</p>
                <p><img src={message_fill}  alt='icon' /> Steve.williams@email.com</p>
          </div>
          <div className='customer-list'>
                <p><img src={Phone_fill}  alt='icon' /> Steven Williams +11234567890</p>
                <p><img src={message_fill}  alt='icon' /> Steve.williams@email.com</p>
          </div>
          <div className='customer-list'>
                <p><img src={Phone_fill}  alt='icon' /> Steven Williams +11234567890</p>
                <p><img src={message_fill}  alt='icon' /> Steve.williams@email.com</p>
          </div>
          <div className='customer-list'>
                <p><img src={Phone_fill}  alt='icon' /> Steven Williams +11234567890</p>
                <p><img src={message_fill}  alt='icon' /> Steve.williams@email.com</p>
          </div>
      </div>
    </div>
    <BottomNavigation/>
  </div>
  )
}

export default CustomerList