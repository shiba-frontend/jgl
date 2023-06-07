import React from 'react'
import { NavLink } from 'react-router-dom'
import widget from '../../../image/Widget-1.png'
import file from '../../../image/File_dock_light.png'
import dash from '../../../image/dash-icon.png'
import Star from '../../../image/Star.png'
import money from '../../../image/Money.png'
import analytics from "../../../image/icon/Chart_fill.svg";

const BottomNavigation = () => {
  return (
    <div className='bottom-bar'>
        <ul>

        <li>
                <NavLink to="/dashboard">
                    <img src={widget} alt="widget" />
                </NavLink>
            </li>
            <li>
                <NavLink to="/my-order">
                    <img src={file} alt="file" />
                </NavLink>
            </li>
            <li className='bottom-d'>
                <NavLink to="/analytics">
                    <img src={analytics} alt="dash" />
                </NavLink>
            </li>
            <li>
                <NavLink to="/review-list">
                    <img src={Star} alt="star" />
                </NavLink>
            </li>
            <li>
                <NavLink to="/deal-listing">
                    <img src={money} alt="money" />
                </NavLink>
            </li>
          
        </ul>
    </div>
  )
}

export default BottomNavigation