import React from 'react'
import { NavLink } from 'react-router-dom'
import search from '../../../image/bottom-search.png'
import voice from '../../../image/voice-assistant.png'
import cart from '../../../image/shopping-cart.png'
import { useSelector, useDispatch } from "react-redux";

const BottomTabCustomer = () => {

    const cartData = useSelector((state) => state.cartstore);

    console.log(cartData)

    function cartqty (){
        var total = 0;
        cartData.forEach(function(element){
        total += parseInt(element.qty);
    });
    return total;
    }


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
                    <span>({cartqty()})</span>
                </NavLink>
            </li>
            
          
        </ul>
    </div>
  )
}

export default BottomTabCustomer