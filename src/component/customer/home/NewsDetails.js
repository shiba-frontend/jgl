import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import AfterLoginTopbar from "../header/AfterLoginTopbar";
import PageMenu from "../header/PageMenu";
import BottomTabCustomer from "../header/BottomTabCustomer";
import { NavLink, Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import CustomLoader from "../../../common/CustomLoader";
import { useSpeechSynthesis } from "react-speech-kit";
import { SpeechSynthesis, speak } from "../../../hooks/utils";
import useStopRecognition from "../../../hooks/useStopRecognition";
import useCharlie from "../../../hooks/useCharlie";

const NewsDetails = () => {
  const [loading, setloading] = useState(false);
  const [newsData, setnewsData] = useState({});
  const [progressive, setprogressive] = useState(0);
  const [index, setindex] = useState(0);
  const [isshowing, setisshowing] = useState(false);
  const [isstart, setisstart] = useState(false);
  const { cancel } = useSpeechSynthesis();
  const [voiceText, setvoiceText] = useState("");

  const { listen, actionStatus } = useCharlie();

  const stopRecognition = useStopRecognition();

  const dispatch = useDispatch();

  const { id } = useParams();
  const navigate = useNavigate();
  //  const synthesis = window.speechSynthesis;
  //  const voices = synthesis.getVoices();
  const token = localStorage.getItem("accessToken");

  //  const handleSpeak = () => {
  //   const utterance = new SpeechSynthesisUtterance(voiceText);
  //   const selectedVoice = voices.find((voice) => voice.lang === "en-US");
  //   utterance.voice = selectedVoice;
  //   synthesis.speak(utterance);
  // };

  console.log("index", index);

  // stopRecognition.addEventListener("onStop", () => {
  //   console.log("Stop Signal: ", "");
  //   speak(`Ok, Do you want me to search for an another story?`, () => {
  //     listen(7000);
  //   });
  //   SpeechSynthesis.cancel();
  // });

  const getdetailsdata = async () => {
    setloading(true);

    let body = {
      key: "facb6e0a6fcbe200dca2fb60dec75be7",
      source: "WEB",
      app_access_token: token && token,
      article_id: id,
    };

    await axios
      .post("/newspaper-article-details", JSON.stringify(body))
      .then((response) => {
        setloading(false);
        if (response.data.success) {
          setnewsData(response.data.data);
          setvoiceText(response.data.data.title);
          //startPlaying(response.data.data.random_deals)
          console.log(response.data.data);
        }
      })
      .catch((error) => {
        setloading(false);
      });
  };

  useEffect(() => {
    getdetailsdata();
    window.speechSynthesis.cancel();
  }, []);

  useEffect(() => {
    if (newsData?.random_deals && newsData?.random_deals.length > index) {
      HandleSpeakrandom(index);
    } else if (
      newsData?.random_deals &&
      newsData?.random_deals.length <= index
    ) {
      setisshowing(true);

      HandleSpeak();
    }
  }, [index, newsData?.random_deals]);

  const HandleSpeakrandom = (index) => {
    const speechSynthesis = window.speechSynthesis;
    const message = new SpeechSynthesisUtterance();
    const voice = window.speechSynthesis.getVoices()[5];
    message.lang = "en-US";
    message.pitch = 0;
    message.rate = 0.9;
    message.voice = voice;
    var businessName = `From ${
      newsData?.random_deals && newsData?.random_deals[index]?.business_name
    }`;
    var title = newsData?.random_deals && newsData?.random_deals[index]?.title;
    var des =
      newsData?.random_deals && newsData?.random_deals[index]?.deal_text == ""
        ? ""
        : newsData?.random_deals && newsData?.random_deals[index]?.deal_text;
    var content = title && title.concat(businessName + des);
    message.text = content;
    speechSynthesis.speak(message);
    message.onend = () => doOnEnd(index);
    // speak({text:content})
  };

  const doOnEnd = (playIndex) => {
    console.log("onEnd", playIndex);
    let newIndex = playIndex + 1;
    setindex(newIndex);
  };

  const GetcartData = async () => {
    setloading(true);

    let body = {
      key: "facb6e0a6fcbe200dca2fb60dec75be7",
      source: "WEB",
      app_access_token: token && token,
    };

    await axios
      .post("/user/cart", JSON.stringify(body))
      .then((response) => {
        setloading(false);
        if (response.data.success) {
          dispatch({
            type: "cartpage",
            cartstore: response.data.data?.cartData,
          });
        }
      })
      .catch((error) => {
        setloading(false);

        if (error.response.status === 404) {
          toast.error(error.response.data.message);
        }
      });
  };

  const CartHandle = async (cart_id) => {
    setloading(true);
    let body = {
      key: "facb6e0a6fcbe200dca2fb60dec75be7",
      source: "WEB",
      app_access_token: token && token,
      deal_id: cart_id,
    };

    await axios
      .post("user/add-to-cart", JSON.stringify(body))
      .then((response) => {
        setloading(false);
        if (response.data.success) {
          toast.success(response.data.message);
          GetcartData();
        }
      })
      .catch((error) => {
        setloading(false);

        if (error.response.status === 404) {
          toast.error(error.response.data.message);
        }
      });
  };

  const HandleSpeak = () => {
    var title = newsData?.title;
    var raw = newsData?.reading_short_description;
    speak(`I will start the story now. ${raw}.`, () => {
      let message = `Do you want me to repeat the story`;
      speak(message, () => {
        listen(3000, true);
      });
      // setTimeout(() => {
      //   navigate("/home");
      // }, 1000);
    });
    stopRecognition.dispatchEvent(new CustomEvent("start"));
    //   //var result = raw.replace(/\&nbsp;/g, '').substring(0, 1500);
    //   var result = raw.substring(0, 1000);
    //   var finalResult = `Story ${title + result}`
    //   const speechSynthesis = window.speechSynthesis;

    //   const message = new SpeechSynthesisUtterance();
    //   const voice = window.speechSynthesis.getVoices()[5]
    //   message.lang = "en-US";
    //   message.pitch = 0;
    //   message.rate = 0.9;
    //  // message.voice = voice
    //   message.text = finalResult;
    //   // speak({text:finalResult, voice: SpeechSynthesisVoice})
    //   speechSynthesis.speak(message);
    // console.log(result)
    //   setisstart(true)
    //   message.onend = () => {
    //     speak({text:"Thanks for listening"})
    //
    //   };
  };

  const StopSpeak = () => {
    cancel({ text: "" });
    setisstart(false);
    navigate("/home");
  };

  return (
    <div className="customer-layout ">
      {loading && <CustomLoader />}
      <div className="top-f-header">
        <AfterLoginTopbar />
        <div className="header-info">
          <div className="container">Top Stories</div>
        </div>
        <div className="progress-bar-container">
          <div
            className="progress-bar-fill"
            style={{ width: `${progressive * 12.5}%` }}
          ></div>
        </div>
      </div>
      <div className="comon-layout">
        <div className="container">
          {!isshowing ? (
            <div className="article-d">
              <div className="deal-card">
                {newsData?.random_deals &&
                  newsData?.random_deals[index]?.deal_image && (
                    <div className="dealcard-img">
                      <img
                        src={
                          newsData?.random_deals &&
                          newsData?.random_deals[index]?.deal_image
                        }
                        className="w-100"
                      />
                    </div>
                  )}

                {newsData?.random_deals &&
                  newsData?.random_deals[index]?.deal_text && (
                    <div
                      className="dealcard-text"
                      style={{
                        background:
                          newsData?.random_deals &&
                          newsData?.random_deals[index]?.primary_bgcolor,
                        padding: "5px",
                      }}
                    >
                      <h5
                        style={{
                          color:
                            newsData?.random_deals &&
                            newsData?.random_deals[index]?.primary_fontcolor,
                          fontStyle:
                            newsData?.random_deals &&
                            newsData?.random_deals[index]?.primary_font_style,
                          fontFamily:
                            newsData?.random_deals &&
                            newsData?.random_deals[index]?.primary_font_family,
                          fontSize: "17px",
                        }}
                      >
                        {newsData?.random_deals &&
                          newsData?.random_deals[index]?.deal_text}
                      </h5>
                    </div>
                  )}
                <h4>
                  {newsData?.random_deals &&
                    newsData?.random_deals[index]?.title}
                </h4>
                {newsData?.random_deals &&
                newsData?.random_deals[index]?.is_cart === 0 ? (
                  <button
                    className="themeBtn"
                    onClick={() =>
                      CartHandle(
                        newsData?.random_deals &&
                          newsData?.random_deals[index]?.deal_id
                      )
                    }
                  >
                    Add to cart
                  </button>
                ) : (
                  <NavLink to="/cart" className="themeBtn">
                    Go to cart
                  </NavLink>
                )}
              </div>
            </div>
          ) : (
            <>
              <div className="listen-btn text-right mb-2">
                {isstart ? (
                  <button
                    onClick={StopSpeak}
                    className="btn btn-sm btn-danger ml-2"
                  >
                    <i class="fa-solid fa-volume-xmark"></i> Stop Listen
                  </button>
                ) : null}
              </div>
              <div className="top-stories">
                <div className="story-list stry-details">
                  <div className="row">
                    <div className="col-lg-5 col-12">
                      <div className="story-list-img">
                        <img src={newsData?.article_image} />
                      </div>
                    </div>
                    <div className="col-lg-7 col-12">
                      <div className="story-list-info">
                        <h2>{newsData?.title}</h2>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: newsData?.description,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <BottomTabCustomer />
    </div>
  );
};

export default NewsDetails;
