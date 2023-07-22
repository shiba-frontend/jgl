import React,{useState} from 'react'
import search from '../../../image/bottom-search.png'
import voice from '../../../image/voice-assistant.png'
import cart from '../../../image/shopping-cart.png'
import { useSelector, useDispatch } from "react-redux";

import axios from 'axios';
import { toast } from 'react-toastify';
import { NavLink, useNavigate } from "react-router-dom";
import { IMAGE } from '../../../common/Theme';

const BottomTabCustomer = () => {
 

    let navigate = useNavigate();
   
    const token = localStorage.getItem('accessToken');
    const cartData = useSelector((state) => state.cartstore);
    const dispatch = useDispatch();
  

    function cartqty (){
        var total = 0;
        cartData&&cartData.forEach(function(element){
        total += parseInt(element.qty);
    });
    return total;
    }

    



  

   
    

  return (
    <div className='bottom-bar customer-bottom'>
    
        <ul>

        <li>
                <NavLink to="/home">
                    <img src={IMAGE.home_icon} alt="widget" />
                </NavLink>
            </li>
            <li>
                <NavLink to="/deal">
                    <img src={IMAGE.checkin_icon} alt="widget" />
                </NavLink>
            </li>
            <li>
                <NavLink to="/business">
                    <img src={IMAGE.business_icon_one} alt="widget" />
                </NavLink>
            </li>
        
            <li>
                <NavLink to="/cart">
                    <img src={cart} alt="dash" />
                    <span>({cartqty()})</span>
                </NavLink>
            </li>
            
          
        </ul>
    </div>
  )
}

export default BottomTabCustomer