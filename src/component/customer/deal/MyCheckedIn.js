import React,{useState, useEffect} from 'react'
import AfterLoginTopbar from '../header/AfterLoginTopbar'
import { NavLink } from 'react-router-dom'
import BottomTabCustomer from '../header/BottomTabCustomer';
import { IMAGE } from '../../../common/Theme';
import axios from 'axios';
import { toast } from 'react-toastify';
import CustomLoader from '../../../common/CustomLoader';

const MyCheckedIn = () => {
    const [loading, setloading] = useState(false)
    const [getdata, setgetdata] = useState([])
    

    const token = localStorage.getItem('accessToken');

  const getCheckedInRequest = async () => {
    setloading(true)

    let body = {
        "key":"facb6e0a6fcbe200dca2fb60dec75be7",
        "source":"WEB",
        "app_access_token":token&&token,
      }

  await axios.post("/user/get-all-check-ins", JSON.stringify(body))
  .then((response) => {
   
      setloading(false)
    if(response.data.success){
        setgetdata(response.data.data)
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

  useEffect(() => {
      getCheckedInRequest()
    }, [])




  return (
    <div className='customer-layout'>
         {loading && <CustomLoader />}
         <div className="top-f-header">
    <AfterLoginTopbar/>
    <div className="header-info">
        <div className="container"><img src={IMAGE.checkedIn_icon}/> My Checked-Ins</div>
      </div>
      </div>
    <div className='comon-layout'>
         <div className='container'>
            {getdata&&getdata.length > 0 ? (
            <div className='row'>
                {getdata&&getdata.map((item, index)=>{
                    return(
                        <div className='col-6 col-lg-3 col-md-4' key={index}>
                        <div className='deal-box'>
                            <div className='deal-box-image'>
                                <NavLink to={`/business-details/${item.encoded_business_id}`}>
                                    <img src={item?.business_image} alt="checkedImg" />
                                    <div className='overlay-info'>
                                    <h5>{item?.business_name}</h5>
                                    </div>
                                </NavLink>
                            </div>
                           
                        </div>
                    </div>
                    )
                })}
              
               
            </div>
        ) : <h2>No Data Found</h2>}
        </div>
    </div>
    <BottomTabCustomer/>
    </div>
  )
}

export default MyCheckedIn