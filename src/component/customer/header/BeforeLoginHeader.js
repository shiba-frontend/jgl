import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

const BeforeLoginHeader = (props) => {

  let navigate = useNavigate();


  return (
    <div className='top-b-header'>
        <button className='back-btn' onClick={() => navigate(-1)}>
            <i class="fa-solid fa-arrow-left"></i>
        </button>
        <h3>{props.title}</h3>
        <div></div>
    </div>
  )
}

export default BeforeLoginHeader