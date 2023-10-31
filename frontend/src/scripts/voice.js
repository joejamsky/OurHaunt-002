const voiceForm = document.getElementById('voice-form')
const voiceFormInput = document.getElementById('voice-input')
const voiceFormMicButton = document.getElementById('voice-mic-button')
const voiceRequest = document.getElementById('voice-request');



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
            typeWriterEffect(GLOBAL_ENTITY.Age);
            break;
        case "what's your name":
        case "what is your name":
        case "what can i call you":
        case "can you give me your name":
        case "name":
            typeWriterEffect(GLOBAL_ENTITY.Name);
            break;
        case "what is your birth date":
        case "what is your birthday":
        case "when is your birth date":
        case "when is your birthday":
        case "what day were you born":
        case "when were you born":
        case "birth date":
        case "birthday":
            typeWriterEffect(`I was born ${GLOBAL_ENTITY.Birthdate.month}/${GLOBAL_ENTITY.Birthdate.day}/${GLOBAL_ENTITY.Birthdate.year}.`);
            break;
        case "what is your death date":
        case "what is your death day":
        case "when is your death date":
        case "when is your death day":
        case "death date":
        case "death day":
            typeWriterEffect(`I died ${GLOBAL_ENTITY.Deathdate.month}/${GLOBAL_ENTITY.Deathdate.day}/${GLOBAL_ENTITY.Deathdate.year}.`);
            break;
        case "how did you die":
        case "what was your cause of death":
        case "cause of death":
            typeWriterEffect(GLOBAL_ENTITY.CauseOfDeath);
            break;
        case "what do you want":
        case "why are you here":
        case "what is your motive":
        case "how can i help":
            typeWriterEffect(GLOBAL_ENTITY.Intention);
            break;
        // case "where you from":
        // case "where are you from":
        //     typeWriterEffect(`I am from ${GLOBAL_ENTITY.address.city}.`);
        //     break;
        case "what do you like to do":
        case "what did you like to do":
        case "hobbies":
            typeWriterEffect(`I liked ${handleTextArray(GLOBAL_ENTITY.Hobbies)}.`);
            break;
        case "are you telling the truth":
            if(GLOBAL_ENTITY.Ordered === "lawful"){
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
            if(GLOBAL_ENTITY.Relationships.Mom){
                typeWriterEffect(`I have a mother but I don't know where she is`);
            } else {
                typeWriterEffect(`I don't have a mother`);
            }
            break;
        case "what was your job":
        case "job":
        case "occupation":
            typeWriterEffect(GLOBAL_ENTITY.Profession);
            break;
        case "were you rich":
        case "were you poor":
        case "how much money did you make":
        case "how much were you worth":
        case "income":
            typeWriterEffect(GLOBAL_ENTITY.Income);
            break;
        case "what is your favorite food":
        case "do you have a favorite food":
            typeWriterEffect(`I liked ${handleTextArray(GLOBAL_ENTITY.Favorites.Food)}.`);
            break;
        case "what is your favorite drink":
        case "do you have a favorite drink":
            typeWriterEffect(`I liked ${handleTextArray(GLOBAL_ENTITY.Favorites.Drink)}.`);
            break;
        case "what is your favorite band":
        case "do you have a favorite band":
        case "who is your favorite musician":
        case "do you have a favorite musician":
            typeWriterEffect(`I liked ${handleTextArray(GLOBAL_ENTITY.Favorites.Music)}.`);
            break;
        case "what is your favorite book":
        case "do you have a favorite book":
            typeWriterEffect(`I liked ${handleTextArray(GLOBAL_ENTITY.Favorites.Literature)}.`);
            break;

        // case "what is your favorite place":
        // case "do you have a favorite place":
        //     typeWriterEffect(`I liked ${handleTextArray(GLOBAL_ENTITY.Favorites.place)}.`);
        //     break;

        case "what is your favorite film":
        case "do you have a favorite film":
            typeWriterEffect(`I liked ${handleTextArray(GLOBAL_ENTITY.Favorites.Film)}.`);
            break;
        case "what is your favorite clothing":
        case "do you have a favorite clothing":
        case "do you have a favorite outfit":
        case "do you have a favorite piece of clothing":
        case "do you have a favorite article of clothing":
            typeWriterEffect(`I liked ${handleTextArray(GLOBAL_ENTITY.Favorites.Film)}.`);
            break;
        case "what is your favorite color":
        case "do you have a favorite color":
            typeWriterEffect(`I liked ${handleTextArray(GLOBAL_ENTITY.Favorites.Color)}.`);
            break;
        // case "what is your favorite sports team":
        // case "what is your favorite sport":
        // case "do you have a favorite sports team":
        // case "do you have a favorite sport":
        //     typeWriterEffect(`I liked ${handleTextArray(GLOBAL_ENTITY.Favorites.sport)}.`);
        //     break;
        // case "do you have a favorite animal":
        //     typeWriterEffect(`I liked ${handleTextArray(GLOBAL_ENTITY.Favorites.animal)}.`);
        //     break;
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
 
async function fetchAndType(transcript) {
    console.log('fetch and type message', transcript)
    try {
        const message = await getChatGPTMessage(transcript, GLOBAL_BACKSTORY);
        typeWriterEffect(message);
    } catch (error) {
        console.error('Error:', error);
    }
}


async function getChatGPTMessage (voiceMessage, backstory){
    try {
        const response = await fetch('/.netlify/functions/chatgpt/chatgpt', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                message: voiceMessage,
                systemContext: backstory
            }),
        });
        
        const data = await response.json();
        console.log('gpt response', data)
        const message = data.response.choices[0].message.content;
        return message;
    } catch (error) {
        console.error('Error:', error);
    }
}


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
    function startSpeechRecognition(event) {
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
        fetchAndType(transcript)
        // checkInputPhrase(transcript.toLowerCase().trim())
        document.getElementById('voice-request').innerText = ""
    }


    recognition.onresult = function(event) {
        let finalTranscript = '';
        let interimTranscript = '';
    
        // Loop through the results
        for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
    
            if (event.results[i].isFinal) {
                finalTranscript += transcript + ' ';
            } else {
                interimTranscript += transcript;
            }
        }
    
        console.log('interimTranscript', interimTranscript)
        console.log('finalTranscript', finalTranscript)
        typeWriterEffect(finalTranscript, 'voice-request', 50);
    };
    
    recognition.addEventListener("result", resultOfSpeechRecognition); // same as recognition.onresult = function(event) {...} - Fires when you stop talking
    function resultOfSpeechRecognition(event) {
        const current = event.resultIndex;
        transcript = event.results[current][0].transcript;
        
        
        
        if(transcript.toLowerCase().trim()==="close channel") {
        recognition.stop();
        }
        // else if(!voiceFormInput.value) {
        //     voiceFormInput.value = transcript;
        // }
        else {
        // if(transcript.toLowerCase().trim()==="go") {
        //     // voiceForm.submit();      // default behavior will submit to google on that form. Leaving this just in case I want to setup chatgpt
            
        // }
        // else if(transcript.toLowerCase().trim()==="reset input") {
        //     voiceFormInput.value = "";
        // }
        // else {
            voiceFormInput.value = transcript;
        // }
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