import React, { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import { recognition, speak, SpeechSynthesis } from "./utils";
import { Actions, getAction } from "./actions";
import { newsFeed } from "./data";
import useRecognition from "./useRecognition";

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

  const listen = (timeout) => {
    emitter.dispatchEvent(
      new CustomEvent("listen", {
        detail: timeout,
      })
    );
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
          speak(`Sorry!, I can't get you, please say again.`, () => {
            listen(7000);
          });
        }
        if (notFoundCount === 3) {
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
        speak(`Thank you! Have a good day!`, () => {
          setStatus(STATUS_CODES.IDLE);
          // recognition.start();
        });
      }

      if (action.action == Actions.READ_STORY) {
        setConversations((preState) => [
          ...preState,
          {
            agent: "bot",
            message: `I will start the story now. ${searchResult[0]?.body}`,
          },
        ]);
        speak(`I will start the story now. ${searchResult[0]?.body}`, () => {
          setConversations((preState) => [
            ...preState,
            {
              agent: "bot",
              message: `Can I search for any other story?.`,
            },
          ]);
          speak(`Can I search for any other story?.`, () => {
            listen(7000);
          });
        });
      }

      if (action.action === Actions.SEARCH) {
        let response = newsFeed.filter((i) => i.category === "political");
        // searchResult = response;
        setConversations((preState) => [
          ...preState,
          {
            agent: "bot",
            message: `I found ${response.length} story in political`,
          },
        ]);
        speak(`I found ${response.length} story in political`, () => {
          setConversations((preState) => [
            ...preState,
            {
              agent: "bot",
              message: `The title is ${response[0]?.title}`,
            },
          ]);
          speak(`The title is ${response[0]?.title}`, () => {
            setConversations((preState) => [
              ...preState,
              {
                agent: "bot",
                message: `Do you want me to read the story for you?`,
              },
            ]);
            speak(`Do you want me to read the story for you?`, () => {
              listen(3000);
            });
          });
        });
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
