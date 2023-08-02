import React,{useEffect,useState} from 'react'
import AfterLoginTopbar from '../header/AfterLoginTopbar'
import { NavLink } from 'react-router-dom'
import BottomTabCustomer from '../header/BottomTabCustomer';
import { IMAGE } from '../../../common/Theme';
import axios from "axios";
import { toast } from "react-toastify";
import CustomLoader from '../../../common/CustomLoader';
import { useSelector, useDispatch } from "react-redux";

const Business = () => {
    const [loading, setloading] = useState(false)

    const getbusiness = useSelector((state) => state.businessLocationList);
    const getstatus = useSelector((state) => state.isstatus);
    const dispatch = useDispatch();

 
    const token = localStorage.getItem('accessToken');
    var localLat = localStorage.getItem("lat_name");
     var localLng = localStorage.getItem("lng_name");

    const getbusinessList = async ()=>{

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition (function (position) {
          var lat = position.coords.latitude;
          var lng = position.coords.longitude;
          

          setloading(true)

          let body = {
              "key":"facb6e0a6fcbe200dca2fb60dec75be7",
              "source":"WEB",
              "lat":lat,
              "lng":lng,
              "app_access_token":token,
            }
            axios.post("/get-home-screen", JSON.stringify(body))
            .then((response) => {
              setloading(false)
              if(response.data.success){
                dispatch({ type: "businesslocation", businessLocationList: response.data.data })
                dispatch({ type: "status", isstatus: false })
              } 
            })
            .catch((error) => {
              setloading(false)
                if(error.response.status === 404){
                    toast.error(error.response.data.message);
                }
              
            });

        });
     
      }

        

    }

    const customLocation = async () => {
      setloading(true)

      let body = {
          "key":"facb6e0a6fcbe200dca2fb60dec75be7",
          "source":"WEB",
          "lat":localLat,
          "lng":localLng,
          "app_access_token":token,
        }
        axios.post("/get-home-screen", JSON.stringify(body))
        .then((response) => {
          setloading(false)
          if(response.data.success){
            dispatch({ type: "businesslocation", businessLocationList: response.data.data })
            dispatch({ type: "status", isstatus: false })
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

    

      if(localLat && localLng){
        customLocation();
      } else {
        getbusinessList();
      }

    },[getstatus])


      return (
        <div className='customer-layout'>
             {loading && <CustomLoader />}
             <div className="top-f-header">
        <AfterLoginTopbar/>
        <div className="header-info">
            <div className="container"><img src={IMAGE.business_icon_one}/> Business</div>
          </div>
          </div>
        <div className='comon-layout'>
             <div className='container'>
                   
                <div className='row'>
                    {getbusiness&&getbusiness.map((item, index)=>{
                        return (
                            <div className='col-6 col-lg-3 col-md-4' key={index}>
                            <div className='deal-box'>
                            <NavLink to={`/business-details/${item.business_id}`}>
                                <div className='deal-box-image'>
                                   
                                   
                                        <img src={item?.category_image} loading="lazy" />
                                        <div className='overlay-info'>
                                        
                                        <h5> <span>{item?.business_name}</span> </h5>
                                        </div>
                                 
                                </div>
                                <div className='deal-box-info'>
                                    <h4>{item?.address}</h4>
                                    <label>Deal</label>
                          
                                </div>
                                </NavLink>
                            </div>
                        </div>
                        )   
                    })}
                   
                </div>
            </div>
        </div>
        <BottomTabCustomer/>
        </div>
      )
}

export default Business