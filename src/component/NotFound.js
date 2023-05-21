import React from 'react'
import notfound from '../image/404.jpg'
import { NavLink } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className='not-found'>
        <img src={notfound} />
        <NavLink to="/home" className="themeBtn">Back to home</NavLink>
    </div>
  )
}

export default NotFound