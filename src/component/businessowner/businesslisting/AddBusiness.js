import React, { useEffect, useState,useRef } from "react";
import AfterLoginTopbar from "../../businessowner/header/AfterLoginTopbar";
import BottomNavigation from "../header/BottomNavigation";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { IMAGE, baseUrl } from "../../../common/Theme";
import CustomLoader from "../../../common/CustomLoader";
// import GooglePlacesAutocomplete,{geocodeByAddress} from "react-google-places-autocomplete";
import { StandaloneSearchBox, LoadScript, Autocomplete, useJsApiLoader } from '@react-google-maps/api';
// import PlacesAutocomplete, {
//   geocodeByAddress,
//   getLatLng,
// } from "react-places-autocomplete";

const AddBusiness = () => {
  const [selectData, setselectData] = useState([]);
  const [show, setshow] = useState(false);
  const [place, setplace] = useState("Local");
  const [category, setcategory] = useState([]);
  const [loading, setloading] = useState(false);
  const [businessname, setbusinessname] = useState("");
  const [businessurl, setbusinessurl] = useState("");
  const [businessemail, setbusinessemail] = useState("");
  const [contactperson, setcontactperson] = useState("");
  const [phone, setphone] = useState("");
  const [description, setdescription] = useState("");
  const [video, setvideo] = useState("");
  const [businessImage, setbusinessImage] = useState([]);
  const [rowsData, setRowsData] = useState([{
    address:'',
    country:'',
    state:'' , 
    city:'' , 
    zipcode:'' , 
    lat:'' , 
    lng:'' , 
  }]);
  const [value, setValue] = useState(null);
  const [searchResult, setSearchResult] = useState('')
  const token = localStorage.getItem("accessToken");
  let navigate = useNavigate();
  const url = baseUrl();
const inputRef = useRef();
  const GetData = async () => {
    setloading(true);

    let body = {
      key: "facb6e0a6fcbe200dca2fb60dec75be7",
      source: "WEB",
      app_access_token: token && token,
    };

    await axios
      .post("/business-owner/list-business-category", JSON.stringify(body))
      .then((response) => {
        setloading(false);
        if (response.data.success) {
          setcategory(response.data.data);
        }
      })
      .catch((error) => {
        setloading(false);

        if (error.response.status === 404) {
          toast.error(error.response.data.message);
        }
      });
  };
console.log(businessImage)

  useEffect(() => {
    GetData();
  }, []);

  const handleChangePlace = (e) => {
    const target = e.target;
    if (target.checked) {
      setplace(target.value);
    }
  };

  const DropdownHandle = () => {
    setshow(!show);
  };

  const ChageHandle = (e) => {
    const value = e.target.value;
    const checked = e.target.checked;
    if (checked) {
      setselectData([...selectData, value]);
    } else {
      setselectData(selectData.filter((e) => e !== value));
    }
  };
  const HandleImage = (e) => {
    const tempArr = [];

    [...e.target.files].forEach(file => {
      console.log("file >>> ", file);
        
      tempArr.push({
        data: file,
        url: URL.createObjectURL(file)
      });
  
    });
  
    setbusinessImage(tempArr);


    // let images = [];

    // for (let i = 0; i < e.target.files.length; i++) {
    //   images.push(URL.createObjectURL(e.target.files[i]));
    // }

    // setbusinessImage([...businessImage, e.target.files]);
    // setImagePreviews([...imagePreviews, images]);

    // var file = e.target.files[0];
    // setbusinessImage(file);
    // var reader = new FileReader();
    // //var url = reader.readAsDataURL(file);
    // reader.onloadend = function (e) {
    //   const fsize = file.size;

    //     var editImg = document.getElementById("editImg");
    //     editImg.src = reader.result;

    // };
    // reader.readAsDataURL(file);
  };

  const AddHandle = ()=>{
    const rowsInput={
        address:'',
        country:'',
        state:'' , 
        city:'' , 
        zipcode:'' ,
        lat:'' , 
        lng:'' ,  
    } 
    setRowsData([...rowsData, rowsInput])
  }

  const RemoveHandle = (index)=>{
    const rows = [...rowsData];
    rows.splice(index, 1);
    setRowsData(rows);
}



const { isLoaded } = useJsApiLoader({
  googleMapsApiKey: "AIzaSyBrRtkwvBcSh3_uISG8CVAX2IqykHdQEP4",
  libraries:["places"]
})
function onLoad(autocomplete) {
  setSearchResult(autocomplete);
}


  const onPlaceChanged = (val,index) =>{
   
    const place = searchResult.getPlace();

    var _address = place.formatted_address;
    var _country = "";
    var _city = "";
    var _state = "";
    var _zipcode = ""
    var _lat = place.geometry.location.lat()
    var _lng = place.geometry.location.lng()

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
        _country = component.long_name
      }
      if(addressType == "postal_code"){
        _zipcode = component.long_name
      }
    }


    let obj = {
      address:_address,
      country:_country,
      state:_state , 
      city:_city, 
      zipcode:_zipcode , 
      lat:_lat, 
      lng:_lng,  
    }
    
     const rowsInput = [...rowsData];
    rowsInput[index] = obj;
    console.log("rows", rowsInput)
    setRowsData(rowsInput);

   
  }


  const SubmitHandle = async () => {


    let AddArr = []
    let countryArr = []
    let stateArr = []
    let cityArr = []
    let zipcodeArr = []
    let latArr = []
    let lngArr = []

    rowsData.map((val)=>{
      AddArr.push(val.address)
      countryArr.push(val.country)
      stateArr.push(val.state)
      cityArr.push(val.city)
      zipcodeArr.push(val.zipcode)
      latArr.push(val.lat)
      lngArr.push(val.lng)
    })



    if (businessname === "") {
      toast.error("Name is mandatory!");
    }  else {
      setloading(true);
      const FormData = require("form-data");
      let data = new FormData();
      data.append("key", "facb6e0a6fcbe200dca2fb60dec75be7");
      data.append("source", "WEB");
      data.append("app_access_token", token && token);
      data.append("business_name", businessname);
      data.append("business_url", businessurl);
      data.append("business_ower_emailid", businessemail);
      data.append("contact_person_name", contactperson);
      data.append("contact_no", phone);
      data.append("description", description);
      data.append("business_native", place);
      data.append("business_video", video);

      for(let i = 0; i < selectData.length; i++){
        data.append('business_category[]', selectData[i]);
      }
      
      for(let i = 0; i < businessImage.length; i++){
        data.append('business_image[]', businessImage[i]);
      }

      for(let i = 0; i < AddArr.length; i++){
        data.append('address[]', AddArr[i]);
      }

      for(let i = 0; i < countryArr.length; i++){
        data.append('country[]', countryArr[i]);
      }

      for(let i = 0; i < stateArr.length; i++){
        data.append('state[]', stateArr[i]);
      }

      for(let i = 0; i < cityArr.length; i++){
        data.append('city[]', cityArr[i]);
      }

      for(let i = 0; i < zipcodeArr.length; i++){
        data.append('pincode[]', zipcodeArr[i]);
      }

      for(let i = 0; i < latArr.length; i++){
        data.append('lat[]', latArr[i]);
      }
     
      for(let i = 0; i < lngArr.length; i++){
        data.append('lng[]', lngArr[i]);
      }
 

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${url}/business-owner/add-business`,
        data: data,
      };

      axios
        .request(config)
        .then((response) => {
          setloading(false);
          if (response.data.success) {
            toast.success(response.data.message);
            setTimeout(() => {
              navigate("/business-listing", { replace: true });
            }, 2000);
          }
        })
        .catch((error) => {
          setloading(false);
          if (error.response.status === 404) {
            toast.error(error.response.data.message);
          }
        });
    }
  };

  return (
    <>
      {loading && <CustomLoader />}

      <div className="ownerLayout">
        <div className="top-f-header">
          <AfterLoginTopbar />
          <div className="header-info">
            <div className="container">
              <img src={IMAGE.business_icon} alt="owner" /> Add Your Business
            </div>
          </div>
        </div>
        <div className="comon-layout">
          <div className="container">
            <div className="row">
              <div className="col-lg-4 col-12">
                <div className="form-group">
                  <label>Business Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Business Name"
                    value={businessname}
                    onChange={(e) => setbusinessname(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-lg-4 col-12">
                <div className="form-group">
                  <label>Business URL</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Business URL"
                    value={businessurl}
                    onChange={(e) => setbusinessurl(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-lg-4 col-12">
                <div className="form-group">
                  <label>Business Contact Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Business Contact Name"
                    value={contactperson}
                    onChange={(e) => setcontactperson(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-lg-4 col-12">
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="john.smith@email.com"
                    value={businessemail}
                    onChange={(e) => setbusinessemail(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-lg-4 col-12">
                <div className="form-group">
                  <label>Phone No</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Phone"
                    maxLength="10"
                    minLength="10"
                    onKeyPress={(event) => {
                      if (!/[0-9]/.test(event.key)) {
                        event.preventDefault();
                      }
                    }}
                    value={phone}
                    onChange={(e) => setphone(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-lg-4 col-12">
                <div className="form-group">
                  <label>Select Business List</label>
                  <div className="custom-drodown">
                    <button onClick={DropdownHandle}>
                      Select Category ({selectData.length}){" "}
                      <span>
                        <i className="fa-sharp fa-solid fa-angle-down"></i>
                      </span>
                    </button>
                    <div
                      className={`custom-dropdown-box ${show ? "active" : ""}`}
                    >
                      <ul>
                        {category.map((item, index) => {
                          return (
                            <li key={index}>
                              <input
                                type="checkbox"
                                name="blist"
                                value={parseInt(item.category_id)}
                                id={`list_${index}`}
                                onChange={ChageHandle}
                              />
                              <label htmlFor={`list_${index}`}>
                                {item.category_name}
                              </label>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              {businessImage && (
                <div className="col-lg-4 col-12">
                  <div className="form-group">
                    <ul className="preview-list">
                      {businessImage.map((img, i) => {
                        return (
                          <li>
                            <img
                              className="preview"
                              src={img.url}
                              alt={"image-" + i}
                              key={i}
                            />
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              )}
              <div className="col-lg-4 col-12">
                <div className="form-group">
                  <label>Business Image</label>
                  <input
                    type="file"
                    className="form-control"
                    multiple
                    accept="image/*"
                    onChange={HandleImage}
                  />
                </div>
              </div>
              <div className="col-lg-4 col-12">
                <div className="form-group">
                  <label>Youtube video link</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Video Link"
                    value={video}
                    onChange={(e) => setvideo(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-lg-4 col-12">
                <div className="form-group">
                  <label>Business Description</label>
                  <textarea
                    className="form-control"
                    placeholder="Description Here"
                    value={description}
                    onChange={(e) => setdescription(e.target.value)}
                  ></textarea>
                </div>
              </div>
              <div className="col-lg-4 col-12">
                <div className="form-group">
                  <ul className="acInflex">
                    <li>
                      <input
                        type="radio"
                        id="local"
                        name="place"
                        value="Local"
                        checked={place == "Local"}
                        onChange={handleChangePlace}
                      />
                      <label htmlFor="local">Local</label>
                    </li>
                    <li>
                      <input
                        type="radio"
                        id="national"
                        name="place"
                        value="National"
                        checked={place == "National"}
                        onChange={handleChangePlace}
                      />
                      <label htmlFor="national">National</label>
                    </li>
                    <li>
                      <input
                        type="radio"
                        id="international"
                        name="place"
                        value="International"
                        checked={place == "International"}
                        onChange={handleChangePlace}
                      />
                      <label htmlFor="international">International</label>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="col-lg-4 col-12">
                <div className="form-group">
                {rowsData&& rowsData.map((val, index)=>{
                    return (
                        <div className="addressField" key={index}>
                        <div className="form-group">
                          <label>Address</label>
                          {isLoaded && 
                                      <Autocomplete
                                        onLoad={(autocomplete)=>onLoad(autocomplete)}
                                        onPlaceChanged={(place) => onPlaceChanged(place,index)}
                                     
                                      >
                                        <input
                                          type="text"
                                          placeholder="Enter Your Address"
                                        className="form-control"
                                        // onChange={(e)=>hiddenInput(e.target.value)}
                                        />
                                      </Autocomplete>
                                    }

                        </div>
                        <div className="form-group">
                          <label>Country</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="country"
                            value={val.country}
                            readOnly
                          />
                        </div>
                        <div className="form-group">
                          <label>State</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="state"
                            value={val.state}
                            readOnly
                          />
                        </div>
                        <div className="form-group">
                          <label>City</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="city"
                            value={val.city}
                            readOnly
                          />
                        </div>
    
                        <div className="form-group">
                          <label>Zipcode</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="zipcode"
                            value={val.zipcode}
                            readOnly
                          />
                        </div>
                        {
                            index === 0 ?
                            <button onClick={AddHandle} className="AddBtn">Add</button>
                            :
                            <button onClick={RemoveHandle} className="RemoveBtn">Remove</button>
                        }
                        
                      </div>
                    )
                })}
                 
                </div>
              </div>
              {/* <GooglePlacesAutocomplete
                selectProps={{
                  value,
                  onChange: ControlHandle,
                  
                }}
              /> */}



              <div className="col-lg-4 col-12 mt-3">
                <div className="form-group">
                  <button className="themeBtn" onClick={SubmitHandle}>
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <BottomNavigation />
      </div>
    </>
  );
};

export default AddBusiness;
