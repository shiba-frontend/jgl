import React, { useState, useEffect } from "react";
import AfterLoginTopbar from "../header/AfterLoginTopbar";
import BottomTabCustomer from "../header/BottomTabCustomer";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { IMAGE } from "../../../common/Theme";
import CustomLoader from "../../../common/CustomLoader";
import axios from "axios";
import { toast } from "react-toastify";

const Payment = () => {
  const [loading, setloading] = useState(false);
  const [usercartdata, setusercartdata] = useState({});
  const [cardname, setcardname] = useState("");
  const [cardno, setcardno] = useState("");
  const [cardmo, setcardmo] = useState("");
  const [cardyear, setcardyear] = useState("");
  const [cardcvv, setcardcvv] = useState("");

  const orderlocation = useLocation();
  const navigate = useNavigate();
  var OrderId = orderlocation.state.orderid;
  const token = localStorage.getItem("accessToken");

 

  const getpaymentRequest = async () => {
    setloading(true);

    let body = {
      key: "facb6e0a6fcbe200dca2fb60dec75be7",
      source: "WEB",
      app_access_token: token && token,
      order_id: OrderId,
    };

    await axios
      .post("/user/payment", JSON.stringify(body))
      .then((response) => {
        setloading(false);
        if (response.data.success) {
          setusercartdata(response.data.data);
          console.log(response.data.data);
        }
      })
      .catch((error) => {
        setloading(false);

        if (error.response.status === 404) {
          toast.error(error.response.data.message);
        }
      });
  };

  useEffect(() => {
    getpaymentRequest();
  }, []);

  const PayNow = async () => {
    if (cardname == "") {
      toast.error("Name is required");
    } else if (cardno == "") {
      toast.error("Card number is required");
    } else if (cardno.length < 16) {
      toast.error("Card number should be 16 digits");
    } else if (cardmo == "") {
      toast.error("Expire month is required");
    } else if (cardyear == "") {
      toast.error("Expire year is required");
    } else if (cardcvv == "") {
      toast.error("CVV is required");
    } else if (cardcvv.length < 3) {
      toast.error("CVV should be 3 digits");
    } else {
      setloading(true);

      let body = {
        "key": "facb6e0a6fcbe200dca2fb60dec75be7",
        "source": "WEB",
        "app_access_token": token && token,
        "order_id":OrderId.toString(),
        "cardNo":cardno,
        "cardExpiryMM":cardmo,
        "cardExpiryYY":cardyear,
        "cardCvv":cardcvv,
        "cardHolderName":cardname,
        "total_amount":usercartdata?.total_amount
      };

      await axios.post("user/order-payment", JSON.stringify(body))
      .then((response) => {
       
          setloading(false)
        if(response.data.success){
    
          toast.success(response.data.message);
          navigate("/home")
        }
      })
      .catch((error) => {
          setloading(false)
        
          if(error.response.status === 404){
              toast.error(error.response.data.message);
          }
        
      });


    }
  };

  return (
    <div className="customer-layout">
      {loading && <CustomLoader />}
      <div className="top-f-header">
        <AfterLoginTopbar />
        <div className="header-info">
          <div className="container">
            <img src={IMAGE.cart_icon} /> Check Out
          </div>
        </div>
      </div>
      <div className="comon-layout">
        <div className="container">
          <div className="checkout-page">
            <h4>
              Fill in the following details to make payment with your credit
              card:
            </h4>
            <h3>Card Information</h3>
            <div className="row">
              <div className="col-lg-4 col-12">
                <div className="form-group">
                  <label>Name on Card</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="card Name"
                    value={cardname}
                    onChange={(e) => setcardname(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-lg-4 col-12">
                <div className="form-group">
                  <label>Card Number</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="0000-0000-0000-0000"
                    maxLength="16"
                    minLength="16"
                    onKeyPress={(event) => {
                      if (!/[0-9]/.test(event.key)) {
                        event.preventDefault();
                      }
                    }}
                    value={cardno}
                    onChange={(e) => setcardno(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-lg-4 col-12">
                <div className="form-group">
                  <label>Expire Date</label>
                  <div className="row">
                    <div className="col-4">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="MM"
                        maxLength="2"
                        minLength="2"
                        onKeyPress={(event) => {
                          if (!/[0-9]/.test(event.key)) {
                            event.preventDefault();
                          }
                        }}
                        value={cardmo}
                        onChange={(e) => setcardmo(e.target.value)}
                      />
                    </div>
                    <div className="col-8">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="YYYY"
                        maxLength="4"
                        minLength="4"
                        onKeyPress={(event) => {
                          if (!/[0-9]/.test(event.key)) {
                            event.preventDefault();
                          }
                        }}
                        value={cardyear}
                        onChange={(e) => setcardyear(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-12 mb-4">
                <div className="form-group">
                  <label>CVV</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="CVV"
                    maxLength="3"
                    minLength="3"
                    onKeyPress={(event) => {
                      if (!/[0-9]/.test(event.key)) {
                        event.preventDefault();
                      }
                    }}
                    value={cardcvv}
                    onChange={(e) => setcardcvv(e.target.value)}
                  />
                </div>
              </div>

              <div className="col-lg-4 col-12">
                <div className="form-group mt-3">
                  <button className="themeBtn" onClick={PayNow}>
                    Pay Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <BottomTabCustomer />
    </div>
  );
};

export default Payment;
