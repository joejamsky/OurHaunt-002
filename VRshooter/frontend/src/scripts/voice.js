const voiceForm = document.getElementById('voice-form')
const voiceFormInput = document.getElementById('voice-input')
const voiceFormMicButton = document.getElementById('voice-mic-button')


function typeWriterEffect(text, elementId = 'voice-response', delay = 250) {
    const element = document.getElementById(elementId);
    let currentText = '';
    let index = 0;
  
    function type() {
      if (index < text.length) {
        currentText += text.charAt(index);
        element.innerText = currentText;
        index++;
        setTimeout(type, delay);
      }
    }
  
    type();
}

function checkInputPhrase(phrase) {
    console.log('phrase', phrase)
    if(phrase.toLowerCase().includes('name')){
        typeWriterEffect('My name is Baba Yaga.');
    } else if (phrase.toLowerCase().includes('help')) {
        typeWriterEffect('There is no help.');
    }
}

// The speech recognition interface lives on the browser’s window object
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition; // if none exists -> undefined

if(SpeechRecognition) {
  console.log("Speech recognition connected.");
  
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    // recognition.lang = "en-US";


    voiceFormMicButton.classList.remove('hide')
    const micIcon = voiceFormMicButton.firstElementChild;

    voiceFormMicButton.addEventListener("click", micBtnClick);
    function micBtnClick() {
        if(micIcon.classList.contains("fa-microphone")) { // Start Voice Recognition
        recognition.start(); // First time you have to allow access to mic!
        }
        else {
        recognition.stop();
        }
    }

    recognition.addEventListener("start", startSpeechRecognition); // <=> recognition.onstart = function() {...}
    function startSpeechRecognition() {
        micIcon.classList.remove("fa-microphone");
        micIcon.classList.add("fa-ear-listen");
        voiceFormInput.focus();
        console.log("Voice activated, SPEAK");
    }

    recognition.addEventListener("end", endSpeechRecognition); // <=> recognition.onend = function() {...}
    function endSpeechRecognition() {
        micIcon.classList.remove("fa-ear-listen");
        micIcon.classList.add("fa-microphone");
        voiceFormInput.focus();
        console.log("Speech recognition service disconnected");
        checkInputPhrase(transcript)
    }


    var transcript
    recognition.addEventListener("result", resultOfSpeechRecognition); // <=> recognition.onresult = function(event) {...} - Fires when you stop talking
    function resultOfSpeechRecognition(event) {
        const current = event.resultIndex;
        transcript = event.results[current][0].transcript;
        
        console.log('transcript', transcript)
        if(transcript.toLowerCase().trim()==="close channel") {
        recognition.stop();
        }
        else if(!voiceFormInput.value) {
            voiceFormInput.value = transcript;
        }
        else {
        if(transcript.toLowerCase().trim()==="go") {
            // voiceForm.submit();      // default behavior will submit to google on that form. Leaving this just in case I want to setup chatgpt
            
        }
        else if(transcript.toLowerCase().trim()==="reset input") {
            voiceFormInput.value = "";
        }
        else {
            voiceFormInput.value = transcript;
        }
        }
        // voiceFormInput.value = transcript;
        // voiceFormInput.focus();
        // setTimeout(() => {
        //   voiceForm.submit();
        // }, 500);
    }

  
}
else {
    console.log("Your Browser does not support speech Recognition");
    alert("Your Browser does not support Speech Recognition");
}








// Chat GPT hookup.
// Need API key
// async function sendMessage(message) {
//     const response = await fetch('https://api.openai.com/v1/chat/completions', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': 'Bearer YOUR_API_KEY',
//       },
//       body: JSON.stringify({
//         model: 'gpt-3.5-turbo',
//         messages: [{ role: 'system', content: 'You are a helpful assistant.' }, { role: 'user', content: message }],
//       }),
//     });
  
//     const data = await response.json();
//     const reply = data.choices[0].message.content;
//     return reply;
//   }
  
//   // Example usage:
//   sendMessage('Hello, how are you?').then(reply => {
//     console.log('Bot:', reply);
//   }).catch(error => {
//     console.error('Error:', error);
//   });
  