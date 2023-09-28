import React,{useEffect, useState} from "react";
import AfterLoginTopbar from "../header/AfterLoginTopbar";
import Dropdown from 'react-bootstrap/Dropdown';
import { NavLink } from "react-router-dom";
import BottomTabCustomer from "../header/BottomTabCustomer";
import CustomLoader from '../../../common/CustomLoader';
import axios from 'axios';
import { toast } from 'react-toastify';
import { IMAGE } from '../../../common/Theme';
import Modal from 'react-bootstrap/Modal';
import { useSelector, useDispatch } from "react-redux";

const Cart = () => {
  const [loading, setloading] = useState(false)
  const [cart, setcart] = useState([])
  const [cartinfo, setcartinfo] = useState({})
  const [show, setShow] = useState(false);
  const [CartId, setCartId] = useState("")
  const[couponcode, secouponcode] = useState("")

  const handleClose = () => setShow(false);
  const token = localStorage.getItem('accessToken');
  const dispatch = useDispatch();

  const GetData = async ()=>{
      setloading(true)
      
      let body = {
        "key":"facb6e0a6fcbe200dca2fb60dec75be7",
        "source":"WEB",
        "app_access_token":token&&token,
      }
  
    await axios.post("/user/cart", JSON.stringify(body))
    .then((response) => {
     
        setloading(false)
      if(response.data.success){
        dispatch({ type: "cartpage", cartstore: response.data.data?.cartData })
        setcart(response.data.data?.cartData)
        setcartinfo(response.data.data)
      }
    })
    .catch((error) => {
        setloading(false)
      
        if(error.response.status === 404){
            toast.error(error.response.data.message);
        }
        
    });
  
    }

  
    useEffect(()=>{
      GetData()
    },[])

    const IncrementHandle = (card_id, index) =>{
      let arr = [...cart]
      arr[index].qty = parseInt(arr[index].qty ) + (parseInt(arr[index].qty) < 10 ? 1 : 0); 
     
    setcart(arr)
      updateCartquantity(card_id, index, arr)
    }

    const DecrementHandle = (card_id, index) =>{
      let arr = [...cart]
      arr[index].qty = parseInt(arr[index].qty ) - (parseInt(arr[index].qty) > 1 ? 1 : 0); 
     
    setcart(arr)
      updateCartquantity(card_id, index, arr)
      // setcart(cart => 
      //   cart.map((item)=> 
      //   card_id === item.cart_id ? {...item, qty:parseInt(item.qty) - (parseInt(item.qty) > 1 ? 1 : 0)} : item
      //   )
      //   )
    }

    const  updateCartquantity  =  async (card_id, indexing, array) =>{

      var quantity = array[indexing].qty

      let body = {
        "key":"facb6e0a6fcbe200dca2fb60dec75be7",
        "source":"WEB",
        "app_access_token":token&&token,
        "cart_id":card_id,
        "qty":quantity
      }
  
    await axios.post("/user/update-cart-item", JSON.stringify(body))
    .then((response) => {
     
        setloading(false)
      if(response.data.success){
        toast.success(response.data.message);
        GetData()
      }
    })
    .catch((error) => {
        setloading(false)
      
        if(error.response.status === 404){
            toast.error(error.response.data.message);
        }
        
    });
    }


    const DeleteHandling = async ()=>{
      setloading(true)
      let body = {
        "key":"facb6e0a6fcbe200dca2fb60dec75be7",
        "source":"WEB",
        "app_access_token":token&&token,
        "cart_id":CartId,
      }
  
    await axios.post("/user/delete-cart-item", JSON.stringify(body))
    .then((response) => {
     
        setloading(false)
        setShow(false)
      if(response.data.success){
        GetData()
        toast.success(response.data.message);
      }
    })
    .catch((error) => {
        setloading(false)
      
        if(error.response.status === 404){
            toast.error(error.response.data.message);
        }
        
    });
    }

    const ApplyCoupon = async ()=>{
      if(couponcode == ''){
        toast.error('Coupon code is required');
      } else {
        setloading(true)
        let body = {
          "key":"facb6e0a6fcbe200dca2fb60dec75be7",
          "source":"WEB",
          "app_access_token":token&&token,
          "coupon_code":couponcode,
        }
    
      await axios.post("/user/apply-coupon-code", JSON.stringify(body))
      .then((response) => {
       
          setloading(false)
        if(response.data.success){
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
          setloading(false)
        
          if(error.response.status === 404){
              toast.error(error.response.data.message);
          }
          
      });
      }
    }

  return (
    <>
    {loading && <CustomLoader/>}
    <div className='customer-layout'>
       <div className="top-f-header">
      <AfterLoginTopbar />
      <div className="header-info">
        <div className="container"><img src={IMAGE.cart_icon}/> Cart</div>
      </div>
      </div>
      <div className="comon-layout">
        <div className="container">
        {cart&&cart.length > 0 ?
          <>
           { cart&&cart.map((item, index)=>{
                return (
                    <div className="cart-list" key={index}>
                        {item.deal_text &&
                      <div className="cart-text" style={{backgroundColor:item.primary_bgcolor}}>
                          <h4 style={{color:item.primary_fontcolor}}>{item.deal_text}</h4>
                      </div>
           }
                      {item.dealimage &&
                        <div className="cart-image">
                                <img src={item.dealimage}/>
                        </div>
                   }
                        <div className="cart-info">
                            <h3>{item?.item_name}</h3>
                            <span>{item?.item_owner
}</span>
                            <div className="quantity-box">
                              <ul>
                                <li>
                                    <button onClick={()=>DecrementHandle(item.cart_id, index
)}><i class="fa-solid fa-minus"></i></button>
                                </li>
                                <li>
                                  <label>{parseInt(item.qty)}</label>
                                </li>
                                <li>
                                    <button onClick={()=>IncrementHandle(item.cart_id, index
)}><i class="fa-solid fa-plus"></i></button>
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
                                  <button onClick={()=>{setShow(true)
                                    setCartId(item.cart_id)
                                  }}>Delete from the list</button>
                              </Dropdown.Menu>
                        </Dropdown>
                        <label>${item?.price.replaceAll(',','') *  parseInt(item.qty)}</label>
                          </div>
                    </div>
                )
            })}

            <div class="apply-coupon mb-3">
              <input type="text" class="form-control" placeholder="Coupon Code"
              maxLength="10"
                value={couponcode}
                onChange={(e)=>secouponcode(e.target.value)}
              />
              <button onClick={ApplyCoupon}>Apply</button>
            </div>
            
           <ul className="total-l">
            <li><label>Sub Total</label></li>
            <li>
             
              <strong>${cartinfo?.cart_total}</strong>
              </li>
              
           </ul>
           <ul className="total-l">
            <li><label>Discount</label></li>
            <li>
             
              <strong>${cartinfo?.discount}</strong>
              </li>
              
           </ul>
           <ul className="total-l">
            <li><label>Total</label></li>
            <li>
             
              <strong>${cartinfo?.total}</strong>
              </li>
              
           </ul>
            <div className="mt-4">
            {token ?  <NavLink className='themeBtn' to="/check-out">Check Out</NavLink> :
             <NavLink className='themeBtn' to="/">Check Out</NavLink> 
            }
           
            </div>
            </>
            :
            <h3>Cart is Empty</h3>
}
        </div>
      </div>
      <BottomTabCustomer/>
    </div>
    <Modal show={show} onHide={handleClose} centered size="sm" className='AlertMsg'>
    <Modal.Header>
      <Modal.Title><i class="fa-solid fa-triangle-exclamation"></i> Alert !</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <h4>Are You sure delete from cart ?</h4>
      <ul>
      <li>
        <button onClick={handleClose} className='btn btn-md btn-danger'>
            No
        </button>
     
      </li>
      <li>
      <button onClick={DeleteHandling} className='btn btn-md btn-success'>
            Yes
        </button>
    
      </li>
    </ul>

    </Modal.Body>
  
   
  </Modal>
    </>
  )
}

export default Cart