import React from "react";

const useStopRecognition = () => {
  const emitter = new EventTarget();

  const MIN_DECIBELS = -31;
  emitter.addEventListener("start", () => {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.start();

      const audioChunks = [];
      mediaRecorder.addEventListener("dataavailable", (event) => {
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
            setTimeout(() => {
              mediaRecorder.stop();
            }, 5000);
          }
        }

        window.requestAnimationFrame(detectSound);
      };

      window.requestAnimationFrame(detectSound);

      mediaRecorder.addEventListener("stop", () => {
        const audioBlob = new Blob(audioChunks);
        transcribe(audioBlob);
      });
    });

    const transcribe = (file) => {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "audio/mpeg");
      myHeaders.append(
        "Authorization",
        "TOKEN ad2f0855b943e19265c4d4b0fda9f8fb4590bdca"
      );

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: file,
        redirect: "follow",
      };

      let url = `https://api.deepgram.com/v1/listen?model=nova&punctuate=true&detect_topics=true`;

      fetch(url, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          let transcript =
            result?.results.channels[0].alternatives[0].transcript;
          console.log("Transcript: ", transcript);
          if (/(stop)/gi.test(transcript)) {
            emitter.dispatchEvent(new CustomEvent("onStop"));
          } else {
            emitter.dispatchEvent(new CustomEvent("start"));
          }
        })
        .catch((error) => console.log("error", error));
    };
  });

  return emitter;
};

export default useStopRecognition;
