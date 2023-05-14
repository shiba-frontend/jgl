import React, { useState, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../../image/logo.png";
import otpVector from "../../../image/otp-vector.png";

const Otp = () => {
  const [otp1, setotp1] = useState("");
  const [otp2, setotp2] = useState("");
  const [otp3, setotp3] = useState("");
  const [otp4, setotp4] = useState("");

  const textInput1 = useRef(null);
  const textInput2 = useRef(null);
  const textInput3 = useRef(null);
  const textInput4 = useRef(null);

  const [counter, setCounter] = useState(59);
  let navigate = useNavigate();

  const VerifyHandler = () => {
    navigate("/newspaper-reset-password", { replace: true });
  };

  return (
    <div className="comon-bg">
      <div className="container">
        <div className="comon-logo">
        <img src={logo} alt="logo" />
        </div>
        <div className="row">
          <div className="col-lg-5">
            <div className="vector-img">
            <img src={otpVector}  alt="forgot" />
            </div>
          </div>
          <div className="col-lg-7">
            <div className="comon-white">
              <h3>Verify OTP</h3>

              <div className="form-group">
                <ul className="otp-l">
                  <li>
                    <input
                      type="text"
                      maxLength="1"
                      ref={textInput1}
                      className="form-control input-style"
                      placeholder="-"
                      onKeyPress={(event) => {
                        if (!/[0-9]/.test(event.key)) {
                          event.preventDefault();
                        }
                      }}
                      value={otp1}
                      onChange={(e) => {
                        setotp1(e.target.value);
                      }}
                      onKeyUp={(e) => {
                        if (otp1 != "") {
                          textInput2.current.focus();
                        } else if (otp1 == "") {
                          textInput1.current.focus();
                        }
                      }}
                    />
                  </li>
                  <li>
                    <input
                      type="text"
                      maxLength="1"
                      ref={textInput2}
                      className="form-control input-style"
                      placeholder="-"
                      onKeyPress={(event) => {
                        if (!/[0-9]/.test(event.key)) {
                          event.preventDefault();
                        }
                      }}
                      value={otp2}
                      onChange={(e) => {
                        setotp2(e.target.value);
                      }}
                      onKeyUp={(e) => {
                        if (otp2 != "") {
                          textInput3.current.focus();
                        } else if (otp2 == "") {
                          textInput1.current.focus();
                        }
                      }}
                    />
                  </li>
                  <li>
                    <input
                      type="text"
                      maxLength="1"
                      ref={textInput3}
                      className="form-control input-style"
                      placeholder="-"
                      onKeyPress={(event) => {
                        if (!/[0-9]/.test(event.key)) {
                          event.preventDefault();
                        }
                      }}
                      value={otp3}
                      onChange={(e) => {
                        setotp3(e.target.value);
                      }}
                      onKeyUp={(e) => {
                        if (otp3 != "") {
                          textInput4.current.focus();
                        } else if (otp3 == "") {
                          textInput2.current.focus();
                        }
                      }}
                    />
                  </li>
                  <li>
                    <input
                      type="text"
                      maxLength="1"
                      ref={textInput4}
                      className="form-control input-style"
                      placeholder="-"
                      onKeyPress={(event) => {
                        if (!/[0-9]/.test(event.key)) {
                          event.preventDefault();
                        }
                      }}
                      value={otp4}
                      onChange={(e) => {
                        setotp4(e.target.value);
                      }}
                      onKeyUp={(e) => {
                        if (otp4 != "") {
                          textInput4.current.focus();
                        } else if (otp4 == "") {
                          textInput3.current.focus();
                        }
                      }}
                    />
                  </li>
                </ul>
              </div>
              <div className="form-group my-4">
                <button
                  type="button"
                  className="themeBtn"
                  onClick={VerifyHandler}
                >
                  VERIFY
                </button>
              </div>

              <div className="form-group">
                <h5>
                  Did not receive the code? <button>Resend OTP.</button>
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Otp;
