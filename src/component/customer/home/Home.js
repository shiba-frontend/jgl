import React, { useState, useEffect, useRef, Fragment } from "react";
import AfterLoginTopbar from "../header/AfterLoginTopbar";
import PageMenu from "../header/PageMenu";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import BottomTabCustomer from "../header/BottomTabCustomer";
import { IMAGE } from "../../../common/Theme";
import axios from "axios";
import { toast } from "react-toastify";
import CustomLoader from "../../../common/CustomLoader";
import Dropdown from "react-bootstrap/Dropdown";
import annyang from "annyang";
import Modal from "react-bootstrap/Modal";
import { useSpeechSynthesis } from "react-speech-kit";
import useCharlie, { STATUS_CODES } from "../../../hooks/useCharlie";

const Home = () => {
  const [loading, setloading] = useState(false);
  const [text, settext] = useState("");
  const [CategoryList, setCategoryList] = useState([]);
  const [isresume, setisresume] = useState(false);
  const [show, setShow] = useState(false);
  const [isread, setisread] = useState(false);
  const [progressive, setprogressive] = useState(0);
  const [index, setindex] = useState(0);
  const [speechResult, setSpeechResult] = useState("");
  const [isToggled, setToggle] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [listening, setListening] = useState(false);
  const [speechText, setSpeechText] = useState("");
  const [newresult, setNewResult] = useState([]);

  const { conversations, status, start, transcript } = useCharlie();

  const handleClose = () => setShow(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = localStorage.getItem("accessToken");
  const isLoc = localStorage.getItem("locstatus");
  const is_modal = localStorage.getItem("ismodal");
  const newsResultList = useSelector((state) => state.newsresult);
  const getprofileName = useSelector((state) => state.getprofile);
  const newsVoiceResultList = useSelector((state) => state.newsresultread);

  console.log("newsResultList", newsVoiceResultList);

  /** Written by
   * @Rajesh
   */
  useEffect(() => {
    if (
      status === STATUS_CODES.LISTENING ||
      status === STATUS_CODES.RECOGNIZED
    ) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [status]);

  const GetData = async () => {
    let body = {
      key: "facb6e0a6fcbe200dca2fb60dec75be7",
      source: "WEB",
    };

    await axios
      .post("/newspaper/category-list", JSON.stringify(body))
      .then((response) => {
        if (response.data.success) {
          setCategoryList(response.data.data);
        }
      })
      .catch((error) => {
        if (error.response.status === 404) {
          toast.error(error.response.data.message);
        }
      });
  };

  const getCheckedInRequest = async () => {
    setloading(true);
    settext("");
    let body = {
      key: "facb6e0a6fcbe200dca2fb60dec75be7",
      source: "WEB",
      search_phrase: "",
    };

    await axios
      .post("/newspaper-home", JSON.stringify(body))
      .then((response) => {
        setloading(false);
        if (response.data.success) {
          dispatch({ type: "news", newsresult: response.data.data });
          setisread(false);
          dispatch({ type: "newsresultread", newsresultread: [] });
          // start();
        }
      })
      .catch((error) => {
        setloading(false);

        if (error.response.status === 404) {
          toast.error(error.response.data.message);
        }
      });
  };

  const ResetNews = async () => {
    settext("");
    getCheckedInRequest();
  };

  const GetCurrentLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPositionDetect);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }

    function showPositionDetect(position) {
      var google_api_key = "AIzaSyBMbNCogNokCwVmJCRfefB6iCYUWv28LjQ";
      var latitudeAuto = position.coords.latitude;
      var longitudeAuto = position.coords.longitude;

      var cityName = "";
      var stateName = "";
      var countryName = "";
      var pincodeName = "";
      var location_name = "";

      var latitude = latitudeAuto;
      var longitude = longitudeAuto;

      fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${google_api_key}`
      )
        .then((response) => response.json())
        .then((data) => {
          for (
            var ac = 0;
            ac < data.results[0].address_components.length;
            ac++
          ) {
            var component = data.results[0].address_components[ac];
            // console.log(component);

            if (
              component.types.includes("locality") ||
              component.types.includes("sublocality_level_1") ||
              component.types.includes("postal_town")
            ) {
              cityName = component.long_name;
            }
            if (component.types.includes("administrative_area_level_1")) {
              stateName = component.short_name;
            }
            if (component.types.includes("country")) {
              countryName = component.short_name;
            }
            if (component.types.includes("postal_code")) {
              pincodeName = component.short_name;
            }
          }

          location_name = cityName + ", " + stateName + ", " + countryName;
          localStorage.setItem("location_name", location_name);
          localStorage.setItem("lat_name", latitude);
          localStorage.setItem("lng_name", longitude);
          localStorage.setItem("locstatus", true);
        })
        .catch((error) => console.log("error"));
    }
  };

  useEffect(() => {
    getCheckedInRequest();
    GetData();

    if (!isLoc) {
      GetCurrentLocation();
    }
    if (!is_modal) {
      setShow(true);
      setTimeout(() => {
        setShow(false);
        localStorage.setItem("ismodal", true);
      }, 3000);
    }
  }, []);

  const StartFirstReply = () => {
    window.speechSynthesis.cancel();
    annyang.abort();
    const speechSynthesis = window.speechSynthesis;
    const message = new SpeechSynthesisUtterance();
    const voice = window.speechSynthesis.getVoices()[5];
    message.lang = "en-US";
    message.pitch = 0;
    message.rate = 0.9;
    message.voice = voice;
    message.text = `hello ${getprofileName}, i am charlie!, How can I assist you?`;
    message.onend = () => {
      annyang.addCallback("result", handleSpeechResult);
      annyang.debug(true);
      annyang.start();
    };
    speechSynthesis.speak(message);
  };

  const handleSpeechResult = (userSaid) => {
    // Process the user's speech here
    setSpeechResult(userSaid);
    handleVoiceCommand(userSaid);
  };

  const handleVoiceCommand = async (userSaid) => {
    console.log("User said : " + userSaid);

    var speech = userSaid[0].toUpperCase();

    console.log("Speech : " + speech);

    console.log("Starting...");
    var splitText = speech.split("ME");
    var rawText = splitText[1]?.toLowerCase();

    settext(rawText);

    // if(speech.includes('HEY JOHN') || speech.includes('HI JOHN') || speech.includes('JOHN')){
    //   respondToUser(`hello ${getprofileName} How can I assist you?`);
    // } else
    if (
      speech.includes("GIVE") ||
      speech.includes("SHOW") ||
      speech.includes("TELL") ||
      speech.includes("LOOK UP") ||
      speech.includes("GET") ||
      speech.includes("SEARCH")
    ) {
      // respondToUser(`Thanks! you are search for  ${rawText}`);
      annyang.abort();
      setTimeout(() => {
        voicesearch(rawText);
      }, 1500);
    }
    if (speech.includes("DETAILS") || speech.includes("READ")) {
      annyang.abort();
      //setListening(false);
      // setTimeout(() => {
      //     ReadList(speech?.toLowerCase())
      // }, 1500);
    }
    if (speech.includes("STOP")) {
      window.scrollTo(0, 0);
      setIsPlaying(false);
      setisresume(false);
      respondToUserNo(`Thank you ${getprofileName}! have a nice day`);
      setTimeout(() => {
        getCheckedInRequest();
      }, 5000);
    }

    if (
      speech.includes("YES") ||
      speech.includes("YEAH") ||
      speech.includes("OKAY") ||
      speech.includes("OK")
    ) {
      setToggle(true);
      setActiveIndex(0);
      window.scrollTo(0, 0);
      setIsPlaying(true);
    }

    if (speech.includes("CONTINUE")) {
      setActiveIndex(0);
      window.scrollTo(0, 0);
      setActiveIndex(activeIndex);
      setisresume(true);
    }

    if (speech.includes("NO") || speech.includes("NOTHING")) {
      window.scrollTo(0, 0);
      setIsPlaying(false);
      setisresume(false);
      respondToUserNo(`Thank you ${getprofileName}! have a nice day`);
    }

    // if(speech.includes('STOP') || speech.includes('STOP')) {
    //   window.scrollTo(0, 0);
    //   setIsPlaying(false)
    //   setisresume(false)
    //   respondToUserNo(`Thank you ${getprofileName}! have a nice day`)
    //   }
  };

  const voicesearch = (saerchtext) => {
    alert(saerchtext);
    dispatch({ type: "newsresultread", newsresultread: [] });
    setloading(true);
    let body = {
      key: "facb6e0a6fcbe200dca2fb60dec75be7",
      source: "WEB",
      search_phrase: saerchtext,
    };
    axios
      .post("/newspaper-home", JSON.stringify(body))
      .then((response) => {
        setloading(false);
        if (response.data.success) {
          dispatch({ type: "news", newsresult: response.data.data });
          dispatch({
            type: "newsresultread",
            newsresultread: response.data.data,
          });
          setNewResult(response.data.data);
          if (response.data.data.length > 0 && response.data.data.length < 1) {
            ReplyToUserSingle(response.data.data.length);
          } else {
            const speechSynthesis = window.speechSynthesis;
            const message = new SpeechSynthesisUtterance();
            const voice = window.speechSynthesis.getVoices()[5];
            message.lang = "en-US";
            message.pitch = 1;
            message.rate = 0.9;
            message.voice = voice;
            message.text = `I have  found ${response.data.data.length} results matching with ${saerchtext}. Do you want me to read title for you?`;
            console.log(message);
            message.onend = () => {
              let synth = window.speechSynthesis;
              synth.cancel();
              console.log("onEnd");
              annyang.addCallback("result", handleSpeechResult);
              annyang.debug(true);
              annyang.start();
            };

            speechSynthesis.speak(message);

            // playNotFound();
          }
        }
      })
      .catch((error) => {
        setloading(false);
      });
  };

  const respondToUserSTop = (text) => {
    const speechSynthesis = window.speechSynthesis;
    const message = new SpeechSynthesisUtterance();
    const voice = window.speechSynthesis.getVoices()[5];
    message.lang = "en-US";
    message.pitch = 1;
    message.rate = 0.9;
    message.voice = voice;
    message.text = text;
    speechSynthesis.speak(message);
    message.onend = () => {
      annyang.addCallback("result", handleSpeechResult);
      annyang.start();
    };
  };

  const respondToUserNo = (text) => {
    console.log("responding to no", text);

    const speechSynthesis = window.speechSynthesis;
    const message = new SpeechSynthesisUtterance();
    const voice = window.speechSynthesis.getVoices()[5];
    message.lang = "en-US";
    message.pitch = 1;
    message.rate = 0.9;
    message.voice = voice;
    message.text = text;
    message.onend = () => {
      // let synth = window.speechSynthesis;
      // synth.cancel()
      annyang.addCallback("result", handleSpeechResult);
      annyang.start();
    };

    speechSynthesis.speak(message);
  };

  const ReplyToUserSingle = (length) => {
    var text = "Do you want to continue read";
    const speechSynthesis = window.speechSynthesis;
    const message = new SpeechSynthesisUtterance();
    const voice = window.speechSynthesis.getVoices()[5];
    message.lang = "en-US";
    message.pitch = 1;
    message.rate = 0.9;
    message.voice = voice;
    message.text = text;
    console.log(message);
    speechSynthesis.speak(message);
    message.onend = () => {
      annyang.addCallback("result", handleSpeechResult);
      annyang.debug(true);
      annyang.start();
    };
  };

  useEffect(() => {
    if (isPlaying) {
      startPlaying(newsVoiceResultList);
    }
  }, [newsVoiceResultList, isPlaying, isresume]);

  const startPlaying = (data) => {
    // annyang.abort();
    // window.speechSynthesis.cancel();
    // console.log("Playing Started", data);
    // // console.log("Title : " + newsVoiceResultList[playIndex]?.reading_title)
    // const speechSynthesis = window.speechSynthesis;
    // const message = new SpeechSynthesisUtterance();
    // const voice = window.speechSynthesis.getVoices()[5];
    // message.lang = "en-US";
    // message.pitch = 0;
    // message.rate = 0.9;
    // message.voice = voice;
    // message.text = `Title is.. ${data[0]?.reading_title}`;
    // message.onend = () => doOnEnd(0, data);
    // speechSynthesis.speak(message);
  };

  const doOnEnd = (playIndex, data) => {
    if (playIndex === data.length - 1) {
      window.scrollTo(0, 0);
      setIsPlaying(false);
      setActiveIndex(0);
      console.log("Ended");

      const speechSynthesis = window.speechSynthesis;
      const message = new SpeechSynthesisUtterance();
      const voice = window.speechSynthesis.getVoices()[5];
      message.lang = "en-US";
      message.pitch = 0;
      message.rate = 0.9;
      message.voice = voice;
      message.text = "Would you like to hear any other news?";
      message.onend = () => {
        annyang.addCallback("result", handleSpeechResult);
        annyang.debug(true);
        annyang.start();

        setListening(true);
        setSpeechText("");
      };

      speechSynthesis.speak(message);
    } else {
      let newIndex = playIndex + 1;
      setActiveIndex(newIndex);

      let element = document.getElementById("news-div-" + newIndex + "");

      let rect = element.getBoundingClientRect();
      let scrollTop = document.documentElement.scrollTop;
      let absoluteY = scrollTop + rect.top - 155;

      console.log("Offset : " + absoluteY);

      window.scrollTo(0, absoluteY);

      setTimeout(() => {
        playArticle(newIndex, data);
      }, 500);
    }
  };

  const playArticle = (playIndex, data) => {
    // if(playIndex > 4){

    //   const speechSynthesis = window.speechSynthesis;
    //   const message = new SpeechSynthesisUtterance();
    //   const voice = window.speechSynthesis.getVoices()[5]
    //   message.lang = "en-US";
    //   message.pitch = 0;
    //   message.rate = 0.9;
    //   message.voice = voice;
    //   message.text = 'do you want to repeat articles! just say continue. if not say no ';
    //    message.onend = () => {
    //       annyang.addCallback('result', handleSpeechResult);
    //       annyang.debug(true);
    //       annyang.start();
    //       };

    //   speechSynthesis.speak(message);
    // } else {

    console.log("Now playing index : " + playIndex);
    // console.log("Title : " + newsVoiceResultList[playIndex]?.reading_title)
    const speechSynthesis = window.speechSynthesis;
    const message = new SpeechSynthesisUtterance();
    const voice = window.speechSynthesis.getVoices()[5];
    message.lang = "en-US";
    message.pitch = 0;
    message.rate = 0.9;
    message.voice = voice;
    message.text = `Title is.. ${data[playIndex]?.reading_title}`;
    message.onend = () => doOnEnd(playIndex, data);

    speechSynthesis.speak(message);
  };

  const ReadList = (saerchtextx) => {
    setloading(true);

    let body = {
      key: "facb6e0a6fcbe200dca2fb60dec75be7",
      source: "WEB",
      app_access_token: token && token,
      search_phrase: saerchtextx,
    };

    console.log(body);

    axios
      .post("/voice-newspaper-read-single", JSON.stringify(body))
      .then((response) => {
        setloading(false);
        if (response.data.success) {
          setListening(false);
          console.log(response.data.data);

          navigate(`/news-details/${response.data.data.article_id}`);
          dispatch({ type: "newsresultread", newsresultread: [] });
        }
      })
      .catch((error) => {
        setloading(false);
        if (error.response.status === 403) {
          toast.error(error.response.data.message);
        }
        if (error.response.status === 404) {
          toast.error(error.response.data.message);
          //getCheckedInRequest()
        }
      });
  };

  const NextTopage = (id, name) => {
    navigate("/home-article", {
      state: {
        id: id,
        name: name,
      },
    });
  };

  return (
    <div className="customer-layout">
      {loading && <CustomLoader />}
      <div className="top-f-header">
        <AfterLoginTopbar />
        <div className="header-info">
          <div className="container d-flex align-items-center">
            Top Stories
            {/* {
         isToggled ?
          <button className='btn btn-sm btn-danger ml-auto' onClick={() => StopLisning()}>Stop Listening</button>
        : null
        } */}
          </div>
        </div>
      </div>
      <div className="comon-layout">
        <div className="container">
          <div className="pageMenu">
            <ul>
              <li>
                <button
                  onClick={() =>
                    NextTopage(
                      CategoryList && CategoryList[0]?.category_id,
                      CategoryList && CategoryList[0]?.category_name
                    )
                  }
                >
                  {CategoryList && CategoryList[0]?.category_name}
                </button>
              </li>
              <li>
                <button
                  onClick={() =>
                    NextTopage(
                      CategoryList && CategoryList[1]?.category_id,
                      CategoryList && CategoryList[1]?.category_name
                    )
                  }
                >
                  {CategoryList && CategoryList[1]?.category_name}
                </button>
              </li>
              <li>
                <button
                  onClick={() =>
                    NextTopage(
                      CategoryList && CategoryList[2]?.category_id,
                      CategoryList && CategoryList[2]?.category_name
                    )
                  }
                >
                  {CategoryList && CategoryList[2]?.category_name}
                </button>
              </li>
              <li>
                <button
                  onClick={() =>
                    NextTopage(
                      CategoryList && CategoryList[3]?.category_id,
                      CategoryList && CategoryList[3]?.category_name
                    )
                  }
                >
                  {CategoryList && CategoryList[3]?.category_name}
                </button>
              </li>
              <li>
                <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    More
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <ul>
                      {CategoryList &&
                        CategoryList.slice(4).map((cat, i) => {
                          return (
                            <li key={i}>
                              <button
                                onClick={() =>
                                  NextTopage(
                                    cat?.category_id,
                                    cat?.category_name
                                  )
                                }
                              >
                                {cat?.category_name}
                              </button>
                            </li>
                          );
                        })}
                    </ul>
                  </Dropdown.Menu>
                </Dropdown>
              </li>
            </ul>
          </div>

          {newsResultList && newsResultList.length > 0 ? (
            <div className="top-stories">
              <h1>
                Top Stories For The Day: <span>{text}</span>{" "}
              </h1>
              <div className="row">
                {newsResultList &&
                  newsResultList.map((item, index) => {
                    return (
                      <div
                        className="col-lg-4 col-12"
                        key={index}
                        id={"news-div-" + index + ""}
                      >
                        <NavLink to={`/news-details/${item.article_id}`}>
                          <div className="story-list">
                            <div className="story-list-img">
                              <img src={item?.article_image} />
                            </div>
                            <div className="story-list-info">
                              <h2> {item?.title}</h2>
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: item?.short_description,
                                }}
                              />
                            </div>
                          </div>
                        </NavLink>
                      </div>
                    );
                  })}
              </div>
            </div>
          ) : (
            <div className="notFound">
              <h4>No data found for : {text}</h4>
              <button className="themeBtn" onClick={ResetNews}>
                Get All News
              </button>
            </div>
          )}
        </div>

        {/* <div className='float-btn-text'>
   <button onClick={()=>setShow(true)}>Say <br></br> 'hey john'</button>
</div> */}
      </div>
      <BottomTabCustomer />

      <Modal
        show={show}
        onHide={handleClose}
        centered
        size="sm"
        className="AlertMsg"
      >
        <Modal.Header>
          <Modal.Title>Just Go Live!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="modal-main">
            <div className="modal-body-icon">
              <i class="fa-solid fa-microphone"></i>
            </div>
            {status === STATUS_CODES.LISTENING && (
              <Fragment>
                <div className="modal-body-title">Say Now! I'm Listening.</div>
                <div className="modal-section-title">
                  For results on any Topic
                </div>
                <div className="modal-section-msg">
                  Just say, Give me <span>Topic Name</span>
                </div>
                <div className="modal-section-note">
                  For example <span>Give me Politics</span> or{" "}
                  <span>Give me Sports</span>
                </div>
                <div className="modal-section-title">
                  For any specific article
                </div>
                <div className="modal-section-msg">
                  Just say, Details of <span>Article Name</span>
                </div>
                <div className="modal-section-note">
                  For example <span>Details of Barbie</span> or{" "}
                  <span>Details of Messi</span>
                </div>
              </Fragment>
            )}
            {status === STATUS_CODES.RECOGNIZED && (
              <Fragment>
                <div className="modal-body-title">You Said:</div>
                <div className="modal-section-msg">{transcript?.transcript}</div>
              </Fragment>
            )}
          </div>

          <ul>
            <li>
              <button
                onClick={handleClose}
                className="btn btn-md btn-success mt-3"
              >
                Don't need assistance
              </button>
            </li>
          </ul>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Home;
