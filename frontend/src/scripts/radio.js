// Audio file URL
const audioFileUrl = '../src/assets/audio/ImperialMarch60.wav';

// Create an AudioContext instance
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

let radioActive = false

function renderRadio(analyserNode) {
    // Get SVG element and its dimensions
    const svg = document.getElementById('radio-svg');
    const width = svg.clientWidth;
    const height = svg.clientHeight;
    svg.innerHTML = ''; // Clear SVG

    // Create SVG polyline element
    const polyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
    polyline.setAttribute('fill', 'none');
    polyline.setAttribute('stroke', 'white');
    polyline.setAttribute('stroke-width', '1');
    svg.appendChild(polyline);

    // Set up the AnalyserNode
    analyserNode.fftSize = 2048;
    const bufferLength = analyserNode.fftSize;
    const dataArray = new Uint8Array(bufferLength);

    // Function to draw the waveform
    const drawRadio = () => {
        analyserNode.getByteTimeDomainData(dataArray);

        let points = '';
        for (let i = 0; i < bufferLength; i++) {
            const x = i * width / bufferLength;
            const y = (dataArray[i] / 255.0) * height; // Direct mapping of amplitude to SVG height

            points += `${x},${y} `;
        }

        polyline.setAttribute('points', points);

        // Request animation frame for continuous rendering
        requestAnimationFrame(drawRadio);
    };

    // Start drawing the radio waveform
    drawRadio();
}



function toggleRadio() {
    radioActive = !radioActive
}

function activateRadio() {
    radioActive = true
}

function disableRadio() {
    radioActive = false
}


const radioSliderInteger = document.getElementById('radio-slider-integer');
const radioSliderDecimal = document.getElementById('radio-slider-decimal');
const radioValueInteger = document.getElementById('radio-value-integer');
const radioValueDecimal = document.getElementById('radio-value-decimal');


function initRadio() {
    setFrequency(88.1);
    setModulation(0);
    checkRadioMatch();
}

let frequencyBool = false,
    modulationBool = false;
     

const setFrequency = (value) => {
    const range = 1.0;
    if (Math.abs(GLOBAL_ENTITY.frequency - parseFloat(value)) <= range) {
        frequencyBool = true;
    } else {
        frequencyBool = false;
    }
    checkRadioMatch();
}

const setModulation = (value) => {
    if (parseInt(GLOBAL_ENTITY.modulation) === parseInt(value)){
        modulationBool = true;
    } else {
        modulationBool = false;
    }
    checkRadioMatch();
}

const checkRadioMatch = () => {
    if (modulationBool && frequencyBool){
        $('.radio-values-container').addClass('active');
        $('.voice-board-border').removeClass('hide');
        $('.voice-identifier').removeClass('hide');
        $('.emf-module').removeClass('hide');
        $('.voice-disable').addClass('hide');
        activateRadio()
    } else {
        $('.radio-values-container').removeClass('active');
        $('.voice-board-border').addClass('hide');
        $('.voice-identifier').addClass('hide');
        $('.emf-module').addClass('hide');
        $('.voice-disable').removeClass('hide');
        disableRadio()
    }
}

// Add event listener to the radioSlider for input changes
radioSliderInteger.addEventListener('input', (e) => {
    // Update the value of the input field when the radioSlider value changes
    radioValueInteger.innerHTML = `${parseFloat(e.target.value).toFixed(1)}`;

    setFrequency(parseFloat(e.target.value).toFixed(1));
});

radioSliderDecimal.addEventListener('input', (e) => {
    // Update the value of the input field when the radioSlider value changes
    if(e.target.value == 0){
        radioValueDecimal.innerHTML = `AM`;

    } else {
        radioValueDecimal.innerHTML = `FM`;
    }

    setModulation(e.target.value);
});