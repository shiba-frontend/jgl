import React from 'react'
import { NavLink } from 'react-router-dom'

const OrderHistory = () => {



  return (
    <div className='order-history'>
        <ul>
            <li>
                <h5>Order from John Smith for ABC Deal X <span>1</span> Qty</h5>
                <NavLink className="procedBtn">Processed</NavLink>
            </li>
            <li>
                <h5>Order from John Smith for ABC Deal X <span>1</span> Qty</h5>
                <NavLink className="procedBtn">Processed</NavLink>
            </li>
            <li>
                <h5>Order from John Smith for ABC Deal X <span>1</span> Qty</h5>
                <NavLink className="procedBtn">Processed</NavLink>
            </li>
            <li>
                <h5>Order from John Smith for ABC Deal X <span>1</span> Qty</h5>
                <NavLink className="procedBtn">Processed</NavLink>
            </li>
        </ul>
    </div>
  )
}

export default OrderHistory