import React from "react";
import AfterLoginTopbar from "../header/AfterLoginTopbar";
import cartIcon from "../../../image/headingicon/Bag_fill.png";
import dealImage from "../../../image/deal-image.png";
import Dropdown from 'react-bootstrap/Dropdown';
import { NavLink } from "react-router-dom";
import BottomTabCustomer from "../header/BottomTabCustomer";

const Cart = () => {

const cartList = [
    {
        id:1,
        image:dealImage,
        title:"Pullover",
        color:"black",
        size:"L",
        price:"10"
    },
    {
        id:2,
        image:dealImage,
        title:"Coffee Bucks",
        color:"Gray",
        size:"M",
        price:"15"
    },
    {
        id:3,
        image:dealImage,
        title:"H&M",
        color:"Gray",
        size:"M",
        price:"15"
    },
]


  return (
    <div className='customer-layout'>
       <div className="top-f-header">
      <AfterLoginTopbar />
      <div className="header-info">
        <div className="container"><img src={cartIcon}/> Cart</div>
      </div>
      </div>
      <div className="comon-layout">
        <div className="container">
            {cartList.map((item, index)=>{
                return (
                    <div className="cart-list" key={index}>
                        <div className="cart-image">
                                <img src={item.image}/>
                        </div>
                        <div className="cart-info">
                            <h3>{item.title}</h3>
                            <span>Color: {item.color}</span> <span>Size: {item.size}</span>
                            <div className="quantity-box">
                              <ul>
                                <li>
                                    <button><i class="fa-solid fa-minus"></i></button>
                                </li>
                                <li>
                                  <label>1</label>
                                </li>
                                <li>
                                    <button><i class="fa-solid fa-plus"></i></button>
                                </li>
                              </ul>
                            </div>

                        </div>
                        <div className="cart-price">
                          <Dropdown>
                            <Dropdown.Toggle id="dropdown-basic">
                            <i class="fa-solid fa-ellipsis-vertical"></i>
                            </Dropdown.Toggle>

                              <Dropdown.Menu>
                                  <button>Delete from the list</button>
                              </Dropdown.Menu>
                        </Dropdown>
                        <label>${item.price}</label>
                          </div>
                    </div>
                )
            })}
           <ul className="total-l">
            <li><label>Total Amount</label></li>
            <li><strong>$200</strong></li>
           </ul>

            <div className="mt-4">

            <NavLink className='themeBtn' to="/check-out">Check Out</NavLink>
            </div>

        </div>
      </div>
      <BottomTabCustomer/>
    </div>
  )
}

export default Cart