import React from 'react'
import { NavLink } from 'react-router-dom'
import { IMAGE } from '../common/Theme'

const NotFound = () => {

  return (
    <div className='not-found'>
        <img src={IMAGE.notfound} />
        <NavLink to="/" className="themeBtn">Back to home</NavLink>
    </div>
  )
}

export default NotFound