import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AfterLoginTopbar from "../../businessowner/header/AfterLoginTopbar";
import CustomLoader from '../../../common/CustomLoader';
import axios from 'axios';
import { toast } from 'react-toastify';

const UpdateProfile = () => {

  const [loading, setloading] = useState(false)
  const [fname, setfname] = useState("");
  const [lname, setlname] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [address, setaddress] = useState("");


  const token = localStorage.getItem('accessToken');
  let navigate = useNavigate();


  const GetData = async ()=>{
    setloading(true)
    
    let body = {
      "key":"facb6e0a6fcbe200dca2fb60dec75be7",
      "source":"WEB",
      "app_access_token":token&&token,
    }

  await axios.post("/get-profile", JSON.stringify(body))
  .then((response) => {
   
      setloading(false)
    if(response.data.success){
      var _data = response.data.data
      setfname(_data.first_name)
      setlname(_data.last_name)
      setemail(_data.email_id)
      setphone(_data.contact_no)
      setaddress(_data.address)
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


  const SubmitHandler = async ()=>{
    if (fname == ''){
      toast.error('First name is required');
  } else if (phone == ''){
    toast.error('Phone is required');
} else if (lname == ''){
        toast.error('Last name is required');
    } 

    else {

        setloading(true)

        let body = {
            "key":"facb6e0a6fcbe200dca2fb60dec75be7",
            "source":"WEB",
            "app_access_token":token&&token,
            "first_name":fname,
            "last_name":lname,
            "contact_no":phone,
            "address":address,
            "country":"",
            "state":"",
            "city":"",
            "zipcode":"",
            "latitude":"",
            "longitude":""
        }
    

await axios.post("/update-profile", JSON.stringify(body))
.then((response) => {
    setloading(false)
  if(response.data.success){
    toast.success(response.data.message);
    setTimeout(()=>{
      navigate('/dashboard');
    },3000)
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
    <AfterLoginTopbar/>
    <div className="comon-bg">
      <div className="container">
        
      <div className="comon-white">
          <h3>Update Profile</h3>
          <div className="row">
            <div className="col-12 col-lg-4 col-md-6">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="First Name"
                  value={fname}
                  onChange={(e)=>setfname(e.target.value)}
                />
              </div>
            </div>
            <div className="col-12 col-lg-4 col-md-6">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Last Name"
                  value={lname}
                  onChange={(e)=>setlname(e.target.value)}
                />
              </div>
            </div>
            <div className="col-12 col-lg-4 col-md-6">
              <div className="form-group">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  readOnly
                  value={email}
                onChange={(e)=>setemail(e.target.value)}
                />
              </div>
            </div>
            <div className="col-12 col-lg-4 col-md-6">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Phone"
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
            <div className="col-12 col-lg-4 col-md-6">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Address"
                  value={address}
                  onChange={(e)=>setaddress(e.target.value)}
                />
              </div>
            </div>
           
          </div>

          <div className="row">
            <div className="col-12 col-lg-12 col-md-12">
              <div className="form-group mt-4">
                <button className="themeBtn" onClick={SubmitHandler}>Update Profile</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default UpdateProfile;
