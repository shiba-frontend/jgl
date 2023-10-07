import { grammar } from "./grammer";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const SpeechGrammarList =
  window.SpeechGrammarList || window.webkitSpeechGrammarList;
const SpeechRecognitionEvent =
  window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;

const recognition = new SpeechRecognition();
const speechRecognitionList = new SpeechGrammarList();

const SpeechSynthesis = window.speechSynthesis;

const lang = "en-US";
const SpeechEngineMName = "Google US English";

speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
recognition.continuous = true;
recognition.lang = lang;
recognition.interimResults = false;
recognition.maxAlternatives = 1;

let voiceList = SpeechSynthesis.getVoices();

if (SpeechSynthesis.onvoiceschanged !== undefined) {
  SpeechSynthesis.onvoiceschanged = () => {
    voiceList = SpeechSynthesis.getVoices();
  };
}

const getUserMediaPermission = () => {
  return new Promise((resolve, reject) => {
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: true })
      .then(() => {
        resolve({ status: "granted" });
      })
      .catch((error) => {
        console.log("Error: ", error);
        alert("Permission Error");

        reject(error);
      });
  });
};

const speak = (message, onEnd = () => {}) => {
  getUserMediaPermission()
    .then(() => {
      let speechUtterance = new SpeechSynthesisUtterance(message);

      speechUtterance.voice = voiceList.filter(
        (i) => i.name === SpeechEngineMName
      )[0];
      recognition.stop();
      SpeechSynthesis.speak(speechUtterance);

      speechUtterance.onend = onEnd;

      if (!SpeechSynthesis.speaking) {
        window.confirm("Make sure you enable sound permission to allow.");
      }
    })
    .catch((error) => {
      console.log("Error: ", error);
    });
};

export { recognition, speak, SpeechSynthesis };
