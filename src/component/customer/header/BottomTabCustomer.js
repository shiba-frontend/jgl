import React from 'react'
import { NavLink } from 'react-router-dom'
import search from '../../../image/bottom-search.png'
import voice from '../../../image/voice-assistant.png'
import cart from '../../../image/shopping-cart.png'


const BottomTabCustomer = () => {
  return (
    <div className='bottom-bar customer-bottom'>
        <ul>

        <li>
                <NavLink to="/search">
                    <img src={search} alt="widget" />
                </NavLink>
            </li>
            <li>
                <NavLink to="/voice">
                    <img src={voice} alt="file" />
                </NavLink>
            </li>
            <li>
                <NavLink to="/cart">
                    <img src={cart} alt="dash" />
                </NavLink>
            </li>
            
          
        </ul>
    </div>
  )
}

export default BottomTabCustomer