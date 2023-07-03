import React, { useEffect, useState,useRef } from "react";
import AfterLoginTopbar from "../../businessowner/header/AfterLoginTopbar";
import BottomNavigation from "../header/BottomNavigation";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { IMAGE, baseUrl } from "../../../common/Theme";
import CustomLoader from "../../../common/CustomLoader";
// import GooglePlacesAutocomplete,{geocodeByAddress} from "react-google-places-autocomplete";
import { StandaloneSearchBox, LoadScript, Autocomplete } from '@react-google-maps/api';
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
  const [address, setaddress] = useState("");
  const [businessImage, setbusinessImage] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [countryValue, setcountryValue] = useState(null);
  const [stateValue, setstateValue] = useState(null);
  const [cityValue, setcityValue] = useState(null);
  const [zipcode, setzipcode] = useState("");
  const [rowsData, setRowsData] = useState([{
    address:'',
    country:'',
    state:'' , 
    city:'' , 
    zipcode:'' , 
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
  console.log("sds", stateValue);

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
    let images = [];

    for (let i = 0; i < e.target.files.length; i++) {
      images.push(URL.createObjectURL(e.target.files[i]));
    }

    setbusinessImage([...businessImage, e.target.files]);
    setImagePreviews([...imagePreviews, images]);

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
    } 
    setRowsData([...rowsData, rowsInput])
  }

  const RemoveHandle = (index)=>{
    const rows = [...rowsData];
    rows.splice(index, 1);
    setRowsData(rows);
}
  const InputHandle = async (e, index) =>{
    const rowsInput = [...rowsData];
    rowsInput[index]= e;
    setRowsData(rowsInput);
  }

  const handleSelect = async (value, index) => {

    // const results = await geocodeByAddress(value);
    // var fresults = results[0];

    // const rowsInput = [...rowsData];
    // rowsInput[index]= fresults.formatted_address;
    // setRowsData(rowsInput)
    // var _address = fresults.formatted_address;
    // var _country = fresults.address_components[5].long_name;
    // var _state = fresults.address_components[4].long_name;
    // var _city = fresults.address_components[2].long_name;

   
    // // setaddress(_address);
    // // setcountryValue(_country);
    // // setstateValue(_state);
    // // setcityValue(_city);

    // const f_Results = await getLatLng(results[0]);
  }


  // const ControlHandle = (e) =>{
  //   geocodeByAddress(e)
  // .then(results => console.log(results))
  // .catch(error => console.error(error));
  // }
  function onLoad(autocomplete) {
    setSearchResult(autocomplete);
  }
  const onPlaceChanged = () =>{
    const place = searchResult.getPlace();
    console.log(place)
    // const [place] = inputRef.current.getPlaces();
    // if(place){
    //   console.log(place.formatted_address)
    // }
  }


  const SubmitHandle = async () => {
    if (businessname === "") {
      toast.error("Name is mandatory!");
    } else if (businessImage == "") {
      toast.error("Business image is mandatory!");
    } else {
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

      selectData.forEach((element) => {
        data.append("business_category", element);
      });

      data.append("business_image", businessImage);
      data.append("address", address);
      data.append("country", ["india", "aus"]);
      data.append("state", "ADS");
      data.append("city", "Sd");
      data.append("pincode", "70000");
      data.append("lat", "22.5896406");
      data.append("lng", "88.36614139999999");

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
              {imagePreviews && (
                <div className="col-lg-4 col-12">
                  <div className="form-group">
                    <ul className="preview-list">
                      {imagePreviews.map((img, i) => {
                        return (
                          <li>
                            <img
                              className="preview"
                              src={img}
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
                          {/* <PlacesAutocomplete
                            value={val.address}
                            onChange={(e)=>InputHandle(e,index)}
                            onSelect={(e)=>handleSelect(e,index)}
                            shouldFetchSuggestions={address.length > 3}
                            name="address"
                          >
                            {({
                              getInputProps,
                              suggestions,
                              getSuggestionItemProps,
                              loading,
                            }) => (
                              <div>
                                <input
                                  {...getInputProps({
                                    placeholder: "Search Places ...",
                                    className: "form-control",
                                  })}
                                />
                                <div className="autocomplete-dropdown-container">
                                  {loading && <div>Loading...</div>}
                                  {suggestions.map((suggestion) => {
                                    const className = suggestion.active
                                      ? "suggestion-item--active"
                                      : "suggestion-item";
                                    // inline style for demonstration purpose
                                    const style = suggestion.active
                                      ? {
                                          backgroundColor: "#fafafa",
                                          cursor: "pointer",
                                        }
                                      : {
                                          backgroundColor: "#ffffff",
                                          cursor: "pointer",
                                        };
                                    return (
                                      <div
                                        {...getSuggestionItemProps(suggestion, {
                                          className,
                                          style,
                                        })}
                                      >
                                        <span>{suggestion.description}</span>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            )}
                          </PlacesAutocomplete> */}
                        </div>
                        <div className="form-group">
                          <label>Country</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="country"
                            value={countryValue && countryValue}
                            readOnly
                          />
                        </div>
                        <div className="form-group">
                          <label>State</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="state"
                            value={stateValue && stateValue}
                            readOnly
                          />
                        </div>
                        <div className="form-group">
                          <label>City</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="city"
                            value={cityValue && cityValue}
                            readOnly
                          />
                        </div>
    
                        <div className="form-group">
                          <label>Zipcode</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="zipcode"
                            value={zipcode}
                            onChange={(e) => setzipcode(e.target.value)}
                          />
                        </div>
                        {
                            index === 0 ?
                            <button onClick={AddHandle}>Add</button>
                            :
                            <button onClick={RemoveHandle}>Remove</button>
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


<LoadScript
googleMapsApiKey="AIzaSyBrRtkwvBcSh3_uISG8CVAX2IqykHdQEP4"
libraries={['places']}
>
      
          <Autocomplete
            onLoad={onLoad}
            onPlaceChanged={(place) => onPlaceChanged(place)}
          >
            <input
              type="text"
              placeholder="Enter Your Address"
             className="form-control"
            />
          </Autocomplete>

      </LoadScript>
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
