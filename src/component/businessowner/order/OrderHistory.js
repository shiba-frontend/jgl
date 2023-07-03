import React from 'react'
import { NavLink } from 'react-router-dom'

const OrderHistory = ({data}) => {

console.log(data)

  return (
    <div className='order-history'>
  <ul>
        {data && data.map((value,index)=>{
            return (
                <li key={index}>
                    <h5>Order from <b>{value?.customer}</b> for <b>{value?.product}</b> <span>{value?.qty}</span> Qty</h5>
                
                </li>
            )
        })}
      
          
        </ul>
    </div>
  )
}

export default OrderHistory