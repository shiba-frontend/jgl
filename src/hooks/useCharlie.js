import React, { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import { recognition, speak, SpeechSynthesis } from "./utils";
import { Actions, getAction } from "./actions";
import { newsFeed } from "./data";
import useRecognition from "./useRecognition";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

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
  const [transcript, setTranscript] = useState("");

  const emitter = new EventTarget();
  const recognizer = useRecognition(emitter);
  const dispatch = useDispatch();
  const news = useSelector((state) => state.newsresultread);
  let newsresult = [];

  const listen = (timeout) => {
    setStatus(STATUS_CODES.LISTENING)
    emitter.dispatchEvent(
      new CustomEvent("listen", {
        detail: timeout,
      })
    );
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
            setStatus(STATUS_CODES.IDLE)
            speak(message, () => {
              let message = `The title of the first story is ${firstStory.title}`;
              speak(message, () => {
                let message = `Do you want me to read the story for you?`;
                speak(message, () => {
                  listen(3000);
                });
              });
            });
          } else {
            let message = `I did not found any stories. Do you want me to search for an another category?`;
            setStatus(STATUS_CODES.IDLE)
            speak(message, () => {
              listen(7000);
            });
          }
        } else {
          let message = `I'm unable to search the stories on ${topic.topic}. Do you want me to search for an another category?.`;
          setStatus(STATUS_CODES.IDLE)
          speak(message, () => {
            listen(7000);
          });
        }
        console.log("News Paper Response: ", response);
      });
    } else {
      let message = `I can't understand what are your looking for. Can you repeat again.`;
      setStatus(STATUS_CODES.IDLE)
      speak(message, () => {
        listen(7000);
      });
    }
  };

  const handleReadStory = (action) => {
    let newsToRead = newsresult[0];
    console.log("News to read: ", newsToRead);
    if (newsToRead) {
      let message = `I will start the story now. ${newsToRead.reading_short_description}`;
      setStatus(STATUS_CODES.IDLE)
      speak(message, () => {
        // speak(`Do you`)
        let message = `Do you want me to search for an another story?`;
        speak(message, () => {
          listen(7000);
        });
      });
    }
  };

  const handleEvent = (event) => {
    if (event?.detail) {
      setTranscript(event?.detail);
      let action = getAction(event?.detail?.transcript?.toLowerCase());
      setConversations((preState) => [
        ...preState,
        {
          agent: "client",
          message: event?.detail?.transcript,
        },
      ]);

      if (action.action === Actions.NOT_FOUND) {
        if (notFoundCount <= 2) {
          setStatus(STATUS_CODES.IDLE)
          speak(`Sorry!, I can't get you, please say again.`, () => {
            listen(7000);
          });
        }
        if (notFoundCount === 3) {
          setStatus(STATUS_CODES.IDLE)
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
        setStatus(STATUS_CODES.IDLE)
        speak(`Thank you! Have a good day!`, () => {
          setStatus(STATUS_CODES.IDLE);
          // recognition.start();
        });
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
    if (isMobile) {
      recognizer.init();
      start();
    }
  }, []);

  window.onload = () => {
    recognizer.init();
    start();
  };

  const start = () => {
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
  };
};

export default useCharlie;
