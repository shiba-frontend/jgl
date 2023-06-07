import React, { useEffect, useState } from 'react'
import AfterLoginTopbar from '../../businessowner/header/AfterLoginTopbar'
import { NavLink } from 'react-router-dom';

const DeleteListing = () => {
  return (
    <>
    
    <div className="top-f-header">
    <AfterLoginTopbar/>
    </div>
   
    <div className="comon-bg">
    <div className="container">
    <div className="comon-white delete-account">
          <h3>Delete Business</h3>
          <h5>Are you sure you want to delete your Business Listing?  </h5>
          <p>If you delete the business listing you will no longer be able to access all your data pertaining to your business listing. So please confirm whether you want to delete the business listing.</p>
         
          <ul className='s-btn'>
                        <li>
                             <button type="button" className="themeBtn">Delete</button>
                        </li>
                        <li>
                            <NavLink to="/business-listing" className="themeBtnOutline">Cancel</NavLink>
                        </li>
                      </ul>
         
 
            
        </div>

    </div>
  </div>
  </>
  )
}

export default DeleteListing