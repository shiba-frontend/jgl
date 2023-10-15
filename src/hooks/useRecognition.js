import React, { useState } from "react";
// import pingVoice from "../assets/ic_ping.wav";
import { recognition } from "./utils";
import axios from "axios";

const useRecognition = (recognizer) => {
  const [recording, setRecording] = useState();
  const [recordChunks, setRecordChunks] = useState([]);
  const NORMAL_TIMEOUT = 6000;
  const MIN_DECIBELS = -45;
  const STATUS_CODES = {
    IDLE: "IDLE",
    LISTENING: "LISTENING",
    RECOGNIZED: "RECOGNIZED",
  };
  const [status, setStatus] = useState(STATUS_CODES.IDLE);

  //   recognition.onspeechend = () => {
  //     //
  //     recognition.stop();
  //   };

  //   recognition.onend = () => {
  //     recognition.start();
  //   };

  const changeStatus = (detail) => {
    let dispatchEvent = new CustomEvent("onStatusChanged", {
      detail,
    });
    recognizer.dispatchEvent(dispatchEvent);
  };

  const pingAudio = () => {
    let audio = new Audio(require("../assets/ic_ping.wav"));
    audio.play();
  };

  const init = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: true })
      .then((stream) => {
        // recognition.start();
        

        let mediaRecorder = new MediaRecorder(stream);

        // recognition.onresult = (result) => {
        //   alert("Get Speech Result");
        //   console.log("Transcript", result);
        // };

        recognizer.addEventListener("listen", (event) => {
          changeStatus(STATUS_CODES.LISTENING);
          let timeout = event?.detail || 6000;
          pingAudio();
          mediaRecorder.start();

          setTimeout(() => mediaRecorder.stop(), timeout);
        });

        /**
         * Start the media recorder
         */
        recognizer.addEventListener("start", () => {
          mediaRecorder.start();
        });

        /**
         * Stop the media recorder
         */
        recognizer.addEventListener("stop", () => {
          mediaRecorder.stop();
        });

        mediaRecorder.addEventListener("dataavailable", async (event) => {
          pingAudio();
          let startTime = new Date().getTime();

          let audioBlob = new Blob([event.data]);
          let transcribeData = await transcribe(audioBlob);
          let transcript =
            transcribeData?.results?.channels?.[0]?.alternatives?.[0]
              ?.transcript;
          let dispatchEvent = new CustomEvent("onSpeechRecognized", {
            detail: { transcript },
          });

          recognizer.dispatchEvent(dispatchEvent);

          changeStatus(STATUS_CODES.RECOGNIZED);

          let endTime = new Date().getTime();
          let diff = endTime - startTime;
          console.log({ diff, startTime, endTime });
        });
      })
      .catch((error) => {
        alert("Device does'nt support recognition");
      });
  };

  const transcribe = async (audioBlob) => {
    // var reader = new FileReader();
    // reader.readAsDataURL(audioBlob);
    // reader.onloadend = function () {
    //   var base64data: any = reader.result;
    //   var base64 = base64data?.split(",")[1];
    //   console.log(base64);
    // };
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "audio/mpeg");
    myHeaders.append(
      "Authorization",
      "TOKEN ea1a3d8b5b5d98392eed95b128ebd146a1a49ef8"
    );

    let url =
      "https://api.deepgram.com/v1/listen?punctuate=true&detect_topics=true";

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: audioBlob,
      redirect: "follow",
    };

    try {
      let response = await fetch(url, requestOptions);
      console.log("Response: ", response);
      let data = await response.json();
      return data;
    } catch (error) {
      console.log("Transcribe Error: ", error);
      alert("Error Trans scribing");
    }
  };

  const isSoundDetected = (stream, cb) => {
    let soundDetected = false;

    const audioContext = new AudioContext();
    const audioStreamSource = audioContext.createMediaStreamSource(stream);
    const analyser = audioContext.createAnalyser();

    analyser.minDecibels = MIN_DECIBELS;
    audioStreamSource.connect(analyser);

    const bufferLength = analyser.frequencyBinCount;
    const domainData = new Uint8Array(bufferLength);

    analyser.getByteFrequencyData(domainData);

    for (let i = 0; i < bufferLength; i++) {
      const value = domainData[i];

      if (domainData[i] > 0) {
        soundDetected = true;
      }
    }
    return soundDetected;
  };

  return { init, status };
};

export default useRecognition;
