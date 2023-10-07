import React, { useEffect, useState } from "react";
import { speak } from "./utils";

const useVoiceAssistant = () => {
  let mediaStream = new MediaStream();
  const [isSpeaking, setIsSpeaking] = useState(false);

  
  useEffect(() => {
    const MIN_DECIBELS = -45;

    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.start();

      const audioChunks: any = [];
      mediaRecorder.addEventListener("dataavailable", (event) => {
        console.log("Data:", event);

        audioChunks.push(event.data);
      });

      const audioContext = new AudioContext();
      const audioStreamSource = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();
      analyser.minDecibels = MIN_DECIBELS;
      audioStreamSource.connect(analyser);

      const bufferLength = analyser.frequencyBinCount;
      const domainData = new Uint8Array(bufferLength);

      let soundDetected = false;

      const detectSound = () => {
        if (soundDetected) {
          return;
        }

        analyser.getByteFrequencyData(domainData);

        for (let i = 0; i < bufferLength; i++) {
          const value = domainData[i];

          if (domainData[i] > 0) {
            soundDetected = true;
          }
        }

        window.requestAnimationFrame(detectSound);
      };

      window.requestAnimationFrame(detectSound);

      mediaRecorder.addEventListener("stop", () => {
        const audioBlob = new Blob(audioChunks);
        transcribe(audioBlob);
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        audio.play();

        console.log({ soundDetected });
      });

      setTimeout(() => {
        mediaRecorder.stop();
      }, 5000);
    });
  }, []);

  const transcribe = (file: Blob) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "audio/mpeg");
    myHeaders.append(
      "Authorization",
      "TOKEN ad2f0855b943e19265c4d4b0fda9f8fb4590bdca"
    );

    var requestOptions: any = {
      method: "POST",
      headers: myHeaders,
      body: file,
      redirect: "follow",
    };

    fetch(
      "https://api.deepgram.com/v1/listen?model=nova&punctuate=true&detect_topics=true",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        alert(result?.results.channels[0].alternatives[0].transcript);
      })
      .catch((error) => console.log("error", error));
  };

  // window.onload = () => {
  //   speak(`Hello Steven, I am Charlie! How can I assist you?`, () => {});
  // };

  const helloFunction = (args: any) => {
    console.log(args);

    alert("jbjb");
  };

  useEffect(() => {}, []);

  return {};
};

export default useVoiceAssistant;
