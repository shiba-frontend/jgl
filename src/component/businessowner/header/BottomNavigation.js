import React from 'react'
import { NavLink } from 'react-router-dom'
import { IMAGE } from '../../../common/Theme'

const BottomNavigation = () => {
  return (
    <div className='bottom-bar'>
     <ul>

<li>
        <NavLink to="/dashboard">
            <img src={IMAGE.widget_icon} alt="widget" />
        </NavLink>
    </li>
    <li>
        <NavLink to="/my-order">
            <img src={IMAGE.file_icon} alt="file" />
        </NavLink>
    </li>
    <li className='bottom-d'>
        <NavLink to="/analytics">
            <img src={IMAGE.analytics_icon} alt="dash" />
        </NavLink>
    </li>
    <li>
        <NavLink to="/review-list">
            <img src={IMAGE.Star_icon} alt="star" />
        </NavLink>
    </li>
    <li>
        <NavLink to="/deal-listing">
            <img src={IMAGE.money_icon} alt="money" />
        </NavLink>
    </li>
  
</ul>
    </div>
  )
}

export default BottomNavigation