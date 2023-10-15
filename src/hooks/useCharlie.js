import React, { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import { recognition, speak, SpeechSynthesis } from "./utils";
import { Actions, getAction } from "./actions";
import { newsFeed } from "./data";
import useRecognition from "./useRecognition";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const STATUS_CODES = {
  IDLE: "IDLE",
  LISTENING: "LISTENING",
  RECOGNIZED: "RECOGNIZED",
};

const useCharlie = () => {
  const [conversations, setConversations] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [notFoundCount, setNotFoundCount] = useState(0);
  const [status, setStatus] = useState(STATUS_CODES.IDLE);
  const [actionStatus, setActionStatus] = useState();
  const [transcript, setTranscript] = useState("");

  const emitter = new EventTarget();
  const recognizer = useRecognition(emitter);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const news = useSelector((state) => state.newsresultread);
  const SingleFlow = useSelector((state) => state.singleFlow);
  const CharlieState = useSelector((state)=> state.charlie)
  let newsresult = [];
  let isSingleFlow = false;
  let singleStoryId;
  let titleReadLastIndex = 0;
  let isMultiFlow = false;

  const listen = (timeout, isAnotherPage) => {
    console.log("Charlie Listening: ", timeout);
    setStatus(STATUS_CODES.LISTENING);
    if (isAnotherPage) {
      recognizer.init();
      setTimeout(() => {
        emitter.dispatchEvent(
          new CustomEvent("listen", {
            detail: timeout,
          })
        );
      }, 1000);
    } else {
      emitter.dispatchEvent(
        new CustomEvent("listen", {
          detail: timeout,
        })
      );
    }
  };

  const handleSearch = (action) => {
    let { topic } = action;

    if (topic.status == "FOUND") {
      let body = {
        key: "facb6e0a6fcbe200dca2fb60dec75be7",
        source: "WEB",
        search_phrase: topic.topic,
      };
      axios.post("/newspaper-home", JSON.stringify(body)).then((response) => {
        if (response.data.success) {
          dispatch({ type: "news", newsresult: response.data.data });
          dispatch({
            type: "newsresultread",
            newsresultread: response.data.data,
          });
          newsresult = response?.data?.data;
          if (response?.data?.data?.length > 0) {
            let message = `I found ${response?.data?.data.length} story in ${topic?.topic}`;
            let firstStory = response?.data?.data[0];
            // setStatus(STATUS_CODES.IDLE);
            speak(message, () => {
              let message = `Do you want me to read the titles for you?`;
              speak(message, () => {
                listen(3000);
                // let message = `Do you want me to read the story for you?`;
                // speak(message, () => {
                //   listen(3000);
                // });
              });
            });
          } else {
            let message = `I did not found any stories. Do you want me to search for an another category?`;
            // setStatus(STATUS_CODES.IDLE);
            speak(message, () => {
              listen(7000);
            });
          }
        } else {
          let message = `I'm unable to search the stories on ${topic.topic}. Do you want me to search for an another category?.`;
          // setStatus(STATUS_CODES.IDLE);
          speak(message, () => {
            listen(7000);
          });
        }
        console.log("News Paper Response: ", response);
      });
    } else {
      let message = `I can't understand what are your looking for. Can you repeat again.`;
      // setStatus(STATUS_CODES.IDLE);
      speak(message, () => {
        listen(7000);
      });
    }
  };

  const handleReadStory = (action) => {
    if (SingleFlow?.isSingleFlow) {
      let description = SingleFlow?.news?.reading_short_description;
      speak(description, () => {
        speak(`Thank you have a good day.`, () => {});
      });
    }

    if (isSingleFlow) {
      navigate(`/news-details/${singleStoryId}`);
    } else {
      isMultiFlow = true;
      let title1 = `Title 1: ${newsresult[titleReadLastIndex].title}`;
      speak(title1, () => {
        let title2 = `Title 2: ${newsresult[titleReadLastIndex + 1].title}`;
        speak(title2, () => {
          let title3 = `Title 3: ${newsresult[titleReadLastIndex + 2].title}`;
          speak(title3, () => {
            let message = `Do you want me to continue reading the other titles?`;
            speak(message, () => {
              titleReadLastIndex = titleReadLastIndex + 3;
              listen(3000);
            });
          });
        });
      });

      // let newsToRead = newsresult[0];
      // if (newsToRead) {
      //   let message = `I will start the story now. ${newsToRead.reading_short_description}`;
      //   // setStatus(STATUS_CODES.IDLE);
      //   speak(message, () => {
      //     // speak(`Do you`)
      //     let message = `Do you want me to search for an another story?`;
      //     speak(message, () => {
      //       listen(7000);
      //     });
      //   });
      // }
    }
  };

  const handleEvent = (event) => {
    if (event?.detail) {
      setTranscript(event?.detail);
      let action = getAction(event?.detail?.transcript?.toLowerCase());
      setActionStatus(action);
      setConversations((preState) => [
        ...preState,
        {
          agent: "client",
          message: event?.detail?.transcript,
        },
      ]);

      if (action.action === Actions.SEARCH_SINGLE) {
        isSingleFlow = true;
        // alert(action.topic);
        let body = {
          key: "facb6e0a6fcbe200dca2fb60dec75be7",
          source: "WEB",
          search_phrase: action.topic,
        };
        axios
          .post("/voice-newspaper-read-single", JSON.stringify(body))
          .then((response) => {
            console.log("Single Story Data:", response);
            if (response?.data?.data) {
              let news = response?.data?.data;
              singleStoryId = news?.article_id;
              dispatch({
                type: "setSingleFlow",
                singleFlow: { isSingleFlow: true, news },
              });
              let message = `I have found 1 story matching with ${action.topic}`;
              speak(message, () => {
                let message = `The title is ${news?.title} The story is written by ${news?.writer_name}`;
                speak(message, () => {
                  speak(`Do you want me to read the story for you?`, () => {
                    listen(3000);
                  });
                });
              });
              console.log("News: ", news);
              // navigate(`/news-details/${news?.article_id}`);
            } else {
              let message = `I can't find any news. Do you want me to search for an another story.`;
              speak(message, () => {
                listen(7000);
              });
            }
          })
          .catch((error) => {});
      }

      if (action.action === Actions.NOT_FOUND) {
        if (notFoundCount <= 2) {
          // setStatus(STATUS_CODES.IDLE);
          speak(`Sorry!, I can't get you, please say again.`, () => {
            listen(7000);
          });
        }
        if (notFoundCount === 3) {
          // setStatus(STATUS_CODES.IDLE);
          speak(`Thank you! Have a good day!`, () => {});
        }
      }

      if (action.action == Actions.STOP_READ_STORY) {
        setConversations((preState) => [
          ...preState,
          {
            agent: "bot",
            message: `Thank you! Have a good day!`,
          },
        ]);
        if (isMultiFlow) {
          speak(`Can I search for any other story? `, () => {
            isMultiFlow = false;
            titleReadLastIndex = 0;
            listen(5000);
          });
        } else {
          // setStatus(STATUS_CODES.IDLE);
          speak(`Thank you! Have a good day!`, () => {
            setStatus(STATUS_CODES.IDLE);
            // recognition.start();
          });
        }
      }

      if (action.action == Actions.READ_STORY) {
        handleReadStory(action);
      }

      if (action.action === Actions.SEARCH) {
        handleSearch(action);
        // let response = newsFeed.filter((i) => i.category === "political");
        // // searchResult = response;
        // setConversations((preState) => [
        //   ...preState,
        //   {
        //     agent: "bot",
        //     message: `I found ${response.length} story in political`,
        //   },
        // ]);
        // speak(`I found ${response.length} story in political`, () => {
        //   setConversations((preState) => [
        //     ...preState,
        //     {
        //       agent: "bot",
        //       message: `The title is ${response[0]?.title}`,
        //     },
        //   ]);
        //   speak(`The title is ${response[0]?.title}`, () => {
        //     setConversations((preState) => [
        //       ...preState,
        //       {
        //         agent: "bot",
        //         message: `Do you want me to read the story for you?`,
        //       },
        //     ]);
        //     speak(`Do you want me to read the story for you?`, () => {
        //       listen(3000);
        //     });
        //   });
        // });
      }
      console.log("On Speech Recognized", action);
    }
  };

  emitter.addEventListener("onSpeechRecognized", handleEvent);

  emitter.addEventListener("onStatusChanged", (event) => {
    setStatus(event?.detail);
  });

  useEffect(() => {
    if (isMobile && !CharlieState?.isInitialized) {
      recognizer.init();
      start();
    }
  }, []);

  window.onload = () => {
    recognizer.init();
    // start();
  };

  const start = () => {
    dispatch({ type: "setCharlie", charlie: { isInitialized: true } });
    let message = "Hello, I am Charlie! How can I assist you?";
    setConversations((preState) => [...preState, { agent: "bot", message }]);
    speak(message, () => {
      listen(7000);
    });
  };

  // recognition.onresult = (event: any) => {
  //   let transcript = event.results[0][0].transcript;
  //   let action = getAction(transcript);
  //   console.log({ transcript, action });

  //   if (action.action == Actions.NOT_FOUND) {
  //     setIsSpeaking(true);
  //     speak(`Sorry!, I can't get you, please says once.`, () => {
  //       setIsSpeaking(false);
  //       recognition.start();
  //     });
  //   }

  //   if (action.action == Actions.STOP_READ_STORY) {
  //     setIsSpeaking(true);
  //     speak(`Thank you! Have a good day!`, () => {
  //       setIsSpeaking(false);
  //       recognition.start();
  //     });
  //   }

  //   if (action.action == Actions.READ_STORY) {
  //     setIsSpeaking(true);
  //     speak(`I will start the story now. ${searchResult[0]?.body}`, () => {
  //       speak(`Can I search for any other story?.`, () => {
  //         setIsSpeaking(false);
  //         recognition.start();
  //       });
  //     });
  //   }

  //   if (action.action == Actions.SEARCH) {
  //     let response = newsFeed.filter((i) => i.category === "political");
  //     setSearchResult(response);
  //     if (response.length === 0) {
  //       // speak(
  //       //   `I did't found any story. Do you want me search for an another story.`,
  //       //   () => {
  //       //     // recognition.start();
  //       //   }
  //       // );
  //     } else {
  //       setIsSpeaking(true);
  //       speak(`I found ${response.length} story in political`, () => {
  //         speak(`The title is ${response[0]?.title}`, () => {
  //           speak(`Do you want me to read the story for you?`, () => {
  //             setIsSpeaking(false);
  //             recognition.start();
  //           });
  //         });
  //       });
  //     }
  //   }
  // };

  // recognition.onspeechend = () => {
  //   recognition.stop();
  // };

  return {
    conversations,
    transcript,
    status: recognition.status,
    start,
    status,
    emitter,
    listen,
    actionStatus,
  };
};

export default useCharlie;
