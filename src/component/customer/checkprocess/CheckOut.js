import React,{useState,useEffect} from "react";
import AfterLoginTopbar from "../header/AfterLoginTopbar";
import BottomTabCustomer from "../header/BottomTabCustomer";
import { NavLink, useNavigate } from "react-router-dom";
import { IMAGE } from "../../../common/Theme";
import CustomLoader from '../../../common/CustomLoader';
import axios from 'axios';
import { toast } from 'react-toastify';
import { StandaloneSearchBox, LoadScript, Autocomplete, useJsApiLoader } from '@react-google-maps/api';
const CheckOut = () => {
  const [loading, setloading] = useState(false);
  const [checked, setChecked] = useState(false);
  const [checked1, setChecked1] = useState(false);
  const [fname, setfname] = useState("");
  const [lname, setlname] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [address, setaddress] = useState("");
  const [country, setcountry] = useState("");
  const [state, setstate] = useState("");
  const [city, setcity] = useState("");
  const [zipcode, setzipcode] = useState("");
  const [orderData, setorderData] = useState({});
  const [searchResult, setSearchResult] = useState('')
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBrRtkwvBcSh3_uISG8CVAX2IqykHdQEP4",
    libraries:["places"]
  })
  function onLoad(autocomplete) {
    setSearchResult(autocomplete);
  }

  const onPlaceChanged = async (val) =>{

    const place = searchResult.getPlace();
    var _address = place.formatted_address;
    var _country = "";
    var _city = "";
    var _state = "";
    var _zipcode = ""

    for (const component of place.address_components){
      const addressType = component.types[0]
      console.log(addressType)
      if(addressType == "administrative_area_level_3"){
        _city = component.long_name
      } 
      if(addressType == "administrative_area_level_1"){
        _state = component.long_name
      }
      if(addressType == "country"){
        _country = component.short_name
      }
      if(addressType == "postal_code"){
        _zipcode = component.long_name
      }
    }
    setcountry(_country)
    setstate(_state)
    setcity(_city)
    setzipcode(_zipcode)
    setaddress(_address)
  }

  const token = localStorage.getItem('accessToken');
  const navigate = useNavigate();

  const handleChangecheckbox = () => {
    setChecked(!checked);
  };

  const handleChangecheckbox1 = () => {
    setChecked1(!checked1);
  };


  const GetData = async ()=>{
    setloading(true)
    
    let body = {
      "key":"facb6e0a6fcbe200dca2fb60dec75be7",
      "source":"WEB",
      "app_access_token":token&&token,
    }

  await axios.post("/user/checkout", JSON.stringify(body))
  .then((response) => {
   
      setloading(false)
    if(response.data.success){
      var _val = response.data.data
      var _user = _val?.userData
      setfname(_user?.fname)
      setlname(_user?.lname)
      setemail(_user?.email)
      setphone(_user?.phone)
      setaddress(_user?.address)
      setcountry(_user?.country)
      setstate(_user?.state)
      setcity(_user?.city)
      setzipcode(_user?.zipcode)
      setorderData(_val)
      console.log(response.data.data)
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


  const checkoutHandle = async () =>{
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

    if (email == '') {
     toast.error('Email is required');
     } else if (phone == ''){
         toast.error('Phone is required');
     } else if (address == '' ){
         toast.error('Address is required');
     }  else if (country == '' ){
      toast.error('Country is required');
  } else if (state == '' ){
    toast.error('State is required');
} else if (city == '' ){
  toast.error('City is required');
} else if (zipcode == '' ){
  toast.error('Zipcode is required');
} 

else {
  setloading(true)
  let body = {
    "key":"facb6e0a6fcbe200dca2fb60dec75be7",
    "source":"WEB",
    "app_access_token":token&&token,
    "billing_fname":fname,
    "billing_lname":lname,
    "billing_email":email,
    "billing_phone":phone,
    "billing_country":country,
    "billing_state":state,
    "billing_city":city,
    "billing_zipcode":zipcode,
    "billing_address":address,
    "coupon_code":orderData?.coupon_code,
    "subtotal_amount":orderData?.cart_total,
    "discount_amount":orderData?.discount,
    "total_amount":orderData?.total
}


await axios.post("/user/order-place", JSON.stringify(body))
.then((response) => {
setloading(false)
if(response.data.success){
toast.success(response.data.message);
navigate("/payment-deal",{
  state:{
    orderid:response.data.data?.order_id
  }
})
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
    <div className='customer-layout'>
        {loading && <CustomLoader/>}
       <div className="top-f-header">
      <AfterLoginTopbar />
      <div className="header-info">
        <div className="container"><img src={IMAGE.cart_icon}/> Check Out</div>
      </div>
      </div>
      <div className="comon-layout">
        <div className="container">
          <div className="checkout-page">
              <h4>Fill in the following details to make payment with your credit card:</h4>
              <h3>Billing Information</h3>
              <div className="row">
                  <div className="col-lg-4 col-12">
                      <div className="form-group">
                        <label>First Name</label>
                        <input type="text" className="form-control" placeholder="First Name"
                         value={fname}
                         onChange={(e)=>setfname(e.target.value)}
                        />
                      </div>
                  </div>
                  <div className="col-lg-4 col-12">
                      <div className="form-group">
                        <label>Last Name</label>
                        <input type="text" className="form-control" placeholder="Last Name"
                        value={lname}
                        onChange={(e)=>setlname(e.target.value)}
                        />
                      </div>
                  </div>
                  <div className="col-lg-4 col-12">
                      <div className="form-group">
                        <label>Email</label>
                        <input type="email" className="form-control" placeholder="Email"
                         value={email}
                         onChange={(e)=>setemail(e.target.value)}
                        />
                      </div>
                  </div>
                  <div className="col-lg-4 col-12">
                      <div className="form-group">
                        <label>Phone</label>
                        <input type="text" className="form-control" placeholder="Phone Number" 
                        
                        maxLength="10"
                        minLength="10"
                        onKeyPress={(event) => {
                                  if (!/[0-9]/.test(event.key)) {
                                    event.preventDefault();
                                  }
                                }}
                                value={phone}
                                onChange={(e)=>setphone(e.target.value)}    
                        />
                      </div>
                  </div>
                  <div className="col-lg-4 col-12">
                      <div className="form-group">
                        <label>Address</label>
                        <Autocomplete
                            onLoad={(autocomplete)=>onLoad(autocomplete)}
                            onPlaceChanged={(place) => onPlaceChanged(place)}
                            defaultValue={address}
                            >
                            <input
                                type="text"
                                placeholder={address && address ? address : "Enter Your Address" }
                                className="form-control"
                                
                            // onChange={(e)=>hiddenInput(e.target.value)}
                            />
                            </Autocomplete>
                      </div>
                  </div>
                  <div className="col-lg-4 col-12">
                      <div className="form-group">
                        <label>Country</label>
                        <input type="text" className="form-control" placeholder="Country" 
                         value={country}
                         onChange={(e)=>setcountry(e.target.value)}
                        />
                      </div>
                  </div>
                  <div className="col-lg-4 col-12">
                      <div className="form-group">
                        <label>State</label>
                        <input type="text" className="form-control" placeholder="State"
                        value={state}
                        onChange={(e)=>setstate(e.target.value)}
                        />
                      </div>
                  </div>
                  
                  <div className="col-lg-4 col-12">
                      <div className="form-group">
                        <label>City</label>
                        <input type="text" className="form-control" placeholder="City"
                        value={city}
                        onChange={(e)=>setcity(e.target.value)}
                        />
                      </div>
                  </div>
                 
                  <div className="col-lg-4 col-12">
                      <div className="form-group">
                        <label>Zipcode</label>
                        <input type="text" className="form-control" placeholder="Zipcode"
                         maxLength="6"
                         minLength="6"
                         onKeyPress={(event) => {
                                   if (!/[0-9]/.test(event.key)) {
                                     event.preventDefault();
                                   }
                                 }}
                        value={zipcode}
                        onChange={(e)=>setzipcode(e.target.value)}
                        />
                      </div>
                  </div>
                 
                  
                  <div className="col-lg-4 col-12 mt-4">
                      <div className="form-group">
                        <h3>Your Order</h3>
                      </div>
                  </div>  
                  <div className="col-lg-4 col-12 mt-4">
                      <div className="form-group">
                        {orderData?.cartData&&orderData?.cartData.map((val, index)=>{
                          return (
                            <ul className="order-details" key={index}>
                            <li>
                              <label style={{display:'block'}}>{val?.item_name}</label>
                              <label>{val?.item_owner}</label>
                              </li>
                            <li>
                            
                              <strong>${val?.price} X {val?.qty}</strong>
                              </li>
                              
                          </ul>
                          )
                        })}
                         <ul className="order-details" >
                            <li>
                              <label style={{display:'block'}}><b>Sub Total</b></label>
                              </li>
                            <li>
                            
                              <strong>${orderData?.cart_total}</strong>
                              </li>
                              
                          </ul>
                          <ul className="order-details" >
                            <li>
                              <label style={{display:'block'}}><b>Discount</b></label>
                              </li>
                            <li>
                            
                              <strong>${orderData?.discount}</strong>
                              </li>
                              
                          </ul>
                          <ul className="order-details" >
                            <li>
                              <label style={{display:'block'}}><b>Total</b></label>
                              </li>
                            <li>
                            
                              <strong>${orderData?.total}</strong>
                              </li>
                              
                          </ul>
                      </div>
                  </div>  
             
                  {/* <div className="col-lg-4 col-12 mt-4">
                      <div className="form-group">
                        <h3>Credit Card Information</h3>
                      </div>
                  </div>  
                  <div className="col-lg-4 col-12">
                      <div className="form-group">
                        <label>Name on Card</label>
                        <input type="text" className="form-control" placeholder="card Name" />
                      </div>
                  </div>
                  <div className="col-lg-4 col-12">
                      <div className="form-group">
                        <label>Card Number</label>
                        <input type="text" className="form-control" placeholder="card Number" />
                      </div>
                  </div>
                  <div className="col-lg-4 col-12">
                      <div className="form-group">
                        <label>Expire Date</label>
                        <input type="text" className="form-control" placeholder="date" />
                      </div>
                  </div>
                  <div className="col-lg-4 col-12 mb-4">
                      <div className="form-group">
                        <label>CVV</label>
                        <input type="text" className="form-control" placeholder="CVV" />
                      </div>
                  </div> */}
                  <div className='col-lg-4'>
                    <div className='form-group'>
                        <div className="voicedeal">
                            <input type="checkbox" id="voice" checked={checked}
                            onChange={handleChangecheckbox}   />
                            <label htmlFor="voice">Set as default payment method</label>
                        </div>
                    </div>
                </div>
                <div className='col-lg-4'>
                    <div className='form-group'>
                        <div className="voicedeal">
                            <input type="checkbox" id="voice1" checked={checked1}
                            onChange={handleChangecheckbox1}   />
                            <label htmlFor="voice1">By clicking this checkbox you agree to our </label>
                        </div>
                        <NavLink to="/terms-condition" style={{color:'red',marginLeft:'25px',marginTop:"5px"}}>Terms & Conditions</NavLink>
                    </div>
                </div>
                  <div className="col-lg-4 col-12">
                      <div className="form-group mt-3">
                      <button className='themeBtn' onClick={checkoutHandle}>Process to check out</button>
                      </div>
                  </div>
              </div>
          </div>
           
        </div>
      </div>
      <BottomTabCustomer/>
    </div>
  )
}

export default CheckOut