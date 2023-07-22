import React,{useState, useEffect} from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { IMAGE } from '../../../common/Theme';
import axios from 'axios';
import { toast } from 'react-toastify';
import Modal from 'react-bootstrap/Modal';
import { StandaloneSearchBox, LoadScript, Autocomplete, useJsApiLoader } from '@react-google-maps/api';

const AfterLoginTopbar = (props) => {
  const [show, setShow] = useState(false);
  const [searchResult, setSearchResult] = useState('')

  const dispatch = useDispatch();
  const sidebarShow = useSelector((state) => state.sidebarShow);


  const token = localStorage.getItem('accessToken');
  const LocationName = localStorage.getItem("location_name");
  let navigate = useNavigate();
  const handleClose = () => setShow(false);

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
    var _zipcode = "";

    var _lat = place.geometry.location.lat()
    var _lng = place.geometry.location.lng()

    for (const component of place.address_components){
      const addressType = component.types[0]

     

      if(addressType == "administrative_area_level_3"){
        _city = component.long_name
      } 
      if(addressType == "administrative_area_level_1"){
        _state = component.long_name
      }
      if(addressType == "country"){
        _country = component.long_name
      }
      if(addressType == "postal_code"){
        _zipcode = component.long_name
      }
    }

    localStorage.setItem("location_name",_address);
    setShow(false)
    localStorage.setItem("lat_name",_lat);
    localStorage.setItem("lng_name",_lng);


    dispatch({ type: "status", isstatus: true })

  }

  const GetCurrentLocation = async ()=>{
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPositionDetect);
    } else {
      console.log('Geolocation is not supported by this browser.');
    }

    function showPositionDetect(position) {			  	
      var google_api_key 	= 'AIzaSyBMbNCogNokCwVmJCRfefB6iCYUWv28LjQ';
      var latitudeAuto 	= position.coords.latitude;
      var longitudeAuto	= position.coords.longitude;
      
          var cityName		= '';
          var stateName 		= '';
          var countryName 	= '';
          var pincodeName 	= '';
          var location_name 	= ''
        	    
        	var latitude 	= latitudeAuto;
    	    	var longitude 	= longitudeAuto;

            fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${google_api_key}`)
            .then(response => response.json())
            .then(data => {
              setShow(false)
              for (var ac = 0; ac < data.results[0].address_components.length; ac++) {    
                var component 	= data.results[0].address_components[ac];	
               // console.log(component);
               
                if(component.types.includes('locality') || component.types.includes('sublocality_level_1') || component.types.includes('postal_town')) {
               cityName = component.long_name;
                }
                if(component.types.includes('administrative_area_level_1')) {
               stateName = component.short_name;
                }
                if(component.types.includes('country')) {
               countryName = component.short_name;
                }
                if(component.types.includes('postal_code')) {
               pincodeName = component.short_name;
                }							
           };

          location_name 	= cityName + ', ' + stateName + ', ' + countryName;
          localStorage.setItem("location_name",location_name);
          localStorage.setItem("lat_name",latitude);
          localStorage.setItem("lng_name",longitude);
          dispatch({ type: "status", isstatus: true })
            })
            .catch(error => console.log('error', ))
           

    }

  }



  const GetcartData = async ()=>{
  
    let body = {
      "key":"facb6e0a6fcbe200dca2fb60dec75be7",
      "source":"WEB",
      "app_access_token":token&&token,
    }
  
  await axios.post("/user/cart", JSON.stringify(body))
  .then((response) => {
   
    if(response.data.success){
      dispatch({ type: "cartpage", cartstore: response.data.data?.cartData })
    }
  })
  .catch((error) => {
     
      if(error.response.status === 404){
          toast.error(error.response.data.message);
      } 

      if(error.response.status === 403){
        dispatch({ type: "setToken", accessToken: null })
        localStorage.clear();
        setTimeout(()=>{
          navigate("/", { replace: true });
        },2000)
    }
      
  });
  
  }


  useEffect(()=>{

    GetcartData();

  },[])
  

  
  return (
    <>
    
        <div className='login-after-top'>
      <div className='container'>
          <div className='row align-items-center'>
              <div className='col-3 col-lg-3'>
              <div className='login-after-top-left'>
                  <NavLink to="/home"> <img src={IMAGE.logo}/></NavLink>
                </div>
              </div>
              <div className='col-9 col-lg-9'>
              <div className='login-after-top-right'>
                
          <button className='locationbuttn' onClick={()=>setShow(true)}>  <img src={IMAGE.location_icon}/> <span id="LocationPreview">{LocationName && LocationName ? LocationName : "Get Current Location"}</span></button>
        <button
        onClick={() =>
          dispatch({ type: "set", sidebarShow: !sidebarShow })
        }
      >
    <img src={IMAGE.hamberger_icon}/>
</button>
        </div>
              </div>
          </div>
     
        
      </div>
   

      

    </div>
 
    <Modal show={show} onHide={handleClose} centered size="sm" className='AlertMsg'>
   
    <Modal.Body>
      <h4>Select Your Location</h4>
      <div className='text-center'>
              <button onClick={GetCurrentLocation}  className='btn btn-md btn-success mb-2'>
      <i class="fa-solid fa-location-arrow"></i>   Get Current Location
        </button>
        <h5>OR</h5>
              </div>
      {isLoaded && 
                        <Autocomplete
                        onLoad={(autocomplete)=>onLoad(autocomplete)}
                        onPlaceChanged={(place) => onPlaceChanged(place)}
                        
                        >
                        <input
                            type="text"
                            placeholder={LocationName && LocationName ? LocationName : "Enter Your Location" }
                            className="form-control"
                            
                        // onChange={(e)=>hiddenInput(e.target.value)}
                        />
                        </Autocomplete>
                    }

              
<ul className='mt-4'>
      <li>
        <button onClick={handleClose} className='btn btn-md btn-danger'>
            Cancel
        </button>
     
      </li>
      <li>
     
    
      </li>
    </ul>

    </Modal.Body>
  
   
  </Modal>


    </>
  )
}

export default AfterLoginTopbar