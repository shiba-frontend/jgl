import React from 'react'
import AfterLoginTopbar from '../../businessowner/header/AfterLoginTopbar'
import BottomNavigation from '../header/BottomNavigation'
import OrderHistory from '../order/OrderHistory'
import owner from "../../../image/icon/owner.svg";

const Dashboard = () => {
  return (
    <div className='ownerLayout'>
         <div className="top-f-header">
    <AfterLoginTopbar />
    <div className="header-info">
      <div className="container"><img src={owner} alt="owner"/> Business Owner Dashboard</div>
    </div>
    </div>
    <div className="comon-layout">
      <div className="container">
          <ul className='dashboard-counter'>
            <li>
                <div className='count-card'>
                    <label>15</label>
                    <h4>New Orders</h4>
                </div>
            </li>
            <li>
                <div className='count-card'>
                    <label>47</label>
                    <h4>Total Orders</h4>
                </div>
            </li>
            <li>
                <div className='count-card'>
                    <label>47</label>
                    <h4>Active Deals</h4>
                </div>
            </li>
            <li>
                <div className='count-card'>
                    <label>47</label>
                    <h4>Video Reviews</h4>
                </div>
            </li>
            <li>
                <div className='count-card'>
                    <label>10</label>
                    <h4>Total Reviews</h4>
                </div>
            </li>
            <li>
                <div className='count-card'>
                    <label>10</label>
                    <h4>Total Deals</h4>
                </div>
            </li>
          </ul>
          <div className='Dashboard-order'>
              <h3>New Order</h3>
              <OrderHistory/>
          </div>
      </div>
    </div>
    <BottomNavigation/>
  </div>


  )
}

export default Dashboard