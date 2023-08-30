const voiceForm = document.getElementById('voice-form')
const voiceFormInput = document.getElementById('voice-input')
const voiceFormMicButton = document.getElementById('voice-mic-button')



// function getRandomInt(max) {
//     return Math.floor(Math.random() * max);
// }

function handleTextArray(textArray) {
    return textArray.length === 1 ? textArray[0] : textArray.slice(0, -1).join(', ') + ', and ' + textArray[textArray.length - 1];
}


// // Styling effects
// voiceFormMicButton.addEventListener("touchstart", function() {

// }, true);





// Functionality

var fontarr = ["font-family: courier new, sans-serif", 
               "font-family: comic sans, sans-serif", 
               "font-family: arial black, sans-serif"];

function fontRandomizer(input){ 
    const fontchange = fontarr[Math.floor(((Math.random() * 3) + 1)%3)];
     
    return "<span style=\"" + fontchange + "\">" + input + "</span>"
}

function typeWriterEffect(text, elementId = 'voice-response', delay = 250) {
    const element = document.getElementById(elementId);
    let currentText = '';
    let index = 0;
  
    function type() {
      if (index < text.length) {
        // console.log('text', text)
        currentText += text.charAt(index);
        // console.log('text', currentText)
        // element.innerHTML = fontRandomizer(currentText);
        element.innerText = currentText;
        index++;
        setTimeout(type, delay);
      }
    }
  
    type();
}



function checkInputPhrase(phrase) {
    
    switch(phrase){
        case "how old are you":
        case "how young are you":
        case "what is your age":
        case "age":
            typeWriterEffect(monsterData.age);
            break;
        case "what's your name":
        case "what is your name":
        case "what can i call you":
        case "can you give me your name":
        case "name":
            typeWriterEffect(monsterData.name);
            break;
        case "what is your birth date":
        case "what is your birthday":
        case "when is your birth date":
        case "when is your birthday":
        case "what day were you born":
        case "when were you born":
        case "birth date":
        case "birthday":
            typeWriterEffect(`I was born ${monsterData.birthDate.month}/${monsterData.birthDate.day}/${monsterData.birthDate.year}.`);
            break;
        case "what is your death date":
        case "what is your death day":
        case "when is your death date":
        case "when is your death day":
        case "death date":
        case "death day":
            typeWriterEffect(`I died ${monsterData.deathDate.month}/${monsterData.deathDate.day}/${monsterData.deathDate.year}.`);
            break;
        case "how did you die":
        case "what was your cause of death":
        case "cause of death":
            typeWriterEffect(monsterData.deathCause);
            break;
        case "what do you want":
        case "why are you here":
        case "what is your motive":
        case "how can i help":
            typeWriterEffect(monsterData.motive);
            break;
        case "where you from":
        case "where are you from":
            typeWriterEffect(`I am from ${monsterData.address.city}.`);
            break;
        case "what do you like to do":
        case "what did you like to do":
        case "hobbies":
            typeWriterEffect(`I liked ${handleTextArray(monsterData.hobbies)}.`);
            break;
        case "are you telling the truth":
            if(monsterData.honest){
                typeWriterEffect(`Yes.`);
            // } else if(getRandomInt(2) === 0) {
            } else if(true) {       // This is temperarily disabled until i get 'getrandomint' sorted. There are two functions named getrandomint. the other is in entity generator. until then this will be disables. This needs to be reworked anyway though
                typeWriterEffect(`Yes.`);
            } else {
                typeWriterEffect(`No.`);
            }
            break;
        case "do you have a mother":
        case "where is your mother":
        case "mother":
            if(monsterData.relationships.mom){
                typeWriterEffect(`I have a mother but I don't know where she is`);
            } else {
                typeWriterEffect(`I don't have a mother`);
            }
            break;
        case "what was your job":
        case "job":
        case "occupation":
            typeWriterEffect(monsterData.occupation);
            break;
        case "were you rich":
        case "were you poor":
        case "how much money did you make":
        case "how much were you worth":
        case "income":
            typeWriterEffect(monsterData.income);
            break;
        case "what is your favorite food":
        case "do you have a favorite food":
            typeWriterEffect(`I liked ${handleTextArray(monsterData.favorites.food)}.`);
            break;
        case "what is your favorite book":
        case "do you have a favorite book":
            typeWriterEffect(`I liked ${handleTextArray(monsterData.favorites.book)}.`);
            break;
        case "what is your favorite place":
        case "do you have a favorite place":
            typeWriterEffect(`I liked ${handleTextArray(monsterData.favorites.place)}.`);
            break;
        case "what is your favorite band":
        case "do you have a favorite band":
        case "who is your favorite musician":
        case "do you have a favorite musician":
            typeWriterEffect(`I liked ${handleTextArray(monsterData.favorites.music)}.`);
            break;
        case "what is your favorite film":
        case "do you have a favorite film":
            typeWriterEffect(`I liked ${handleTextArray(monsterData.favorites.film)}.`);
            break;
        case "what is your favorite sports team":
        case "what is your favorite sport":
        case "do you have a favorite sports team":
        case "do you have a favorite sport":
            typeWriterEffect(`I liked ${handleTextArray(monsterData.favorites.sport)}.`);
            break;
        case "do you have a favorite animal":
            typeWriterEffect(`I liked ${handleTextArray(monsterData.favorites.animal)}.`);
            break;
        default: 
            typeWriterEffect("...?");
            addHostility()
    }

    // if(phrase.includes('name')){
    //     typeWriterEffect('My name is Baba Yaga.');
    // } else if (phrase.includes('help')) {
    //     typeWriterEffect('There is no help.');
    // }
}

// The speech recognition interface lives on the browser’s window object
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition; // if none exists -> undefined

if(SpeechRecognition) {
    console.log("Speech recognition connected.");
  
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    // recognition.lang = "en-US";

    const micIcon = voiceFormMicButton.firstElementChild;
    const micLight = document.getElementsByClassName('voice-light-bulb')[0];

    voiceFormMicButton.addEventListener("click", micBtnClick);
    function micBtnClick() {
        if(micIcon.classList.contains("fa-microphone")) {
            recognition.start();         // Start Voice Recognition. First time you have to allow access to mic!
        } else {
            recognition.stop();
        }
    }

    recognition.addEventListener("start", startSpeechRecognition); // <=> recognition.onstart = function() {...}
    function startSpeechRecognition() {
        micIcon.classList.remove("fa-microphone");
        micIcon.classList.add("fa-ear-listen");
        micLight.classList.remove("voice-light-off");
        voiceFormInput.focus();
        console.log("Voice activated, SPEAK");
    }

    var transcript

    recognition.addEventListener("end", endSpeechRecognition); // <=> recognition.onend = function() {...}
    function endSpeechRecognition() {
        micIcon.classList.remove("fa-ear-listen");
        micIcon.classList.add("fa-microphone");
        micLight.classList.add("voice-light-off");
        voiceFormInput.focus();
        console.log("Speech recognition service disconnected");
        checkInputPhrase(transcript.toLowerCase().trim())
    }


    
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
    // voiceFormMicButton.classList.add('hide')
    // if i want text input unhide text input here
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
  