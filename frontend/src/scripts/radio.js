// Audio file URL
const audioFileUrl = '../src/assets/audio/ImperialMarch60.wav';

// Create an AudioContext instance
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

let radioActive = false

function renderRadio(audioBuffer) {
    
    // Load the audio file
    // fetch(audioFileUrl)
    // .then(response => response.arrayBuffer())
    // .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
    // .then(audioBuffer => {
        
        // console.log('audiobuffer js', audiobuffer)

        // Get SVG element
        const svg = document.getElementById('radio-svg');

        // Set SVG dimensions based on audio length
        const width = svg.clientWidth;
        const height = svg.clientHeight;

        // console.log('width',width)
        // console.log('height',height)

        // Clear SVG
        svg.innerHTML = '';

        // Create SVG polyline element
        const polyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
        polyline.setAttribute('fill', 'none');
        polyline.setAttribute('stroke', 'white');
        polyline.setAttribute('stroke-width', '1');
        svg.appendChild(polyline);

        // Create AnalyserNode
        const analyserNode = audioContext.createAnalyser();
        analyserNode.fftSize = 256; // Adjust the fftSize for smoother waveform
        
        // Connect the AnalyserNode to the audioContext
        const source = audioContext.createBufferSource();
        // console.log('audioBuffer', audioBuffer)
        source.buffer = audioBuffer;
        source.connect(analyserNode);
        // analyserNode.connect(audioContext.destination);
        // console.log('analyserNode2', analyserNode)


        // Draw radio waveform
        const drawRadio = () => {
            // Get the current waveform data from the AnalyserNode
            const dataArray = new Float32Array(analyserNode.fftSize);
            analyserNode.getFloatTimeDomainData(dataArray);

            // Calculate the number of audio samples per SVG pixel
            const samplesPerPixel = Math.floor(dataArray.length / width);

            // Calculate the vertical scale factor for the waveform
            const scaleFactor = height / 2;

            // Build the points string for the polyline
            let points = '';

            // Iterate over SVG pixels and build the waveform points
            for (let x = 0; x < width; x++) {
                const startSample = x * samplesPerPixel;
                const endSample = (x + 1) * samplesPerPixel;

                let maxAmplitude = 0;

                // Find the maximum amplitude within the current pixel range
                for (let i = startSample; i < endSample; i++) {
                const amplitude = Math.abs(dataArray[i]);
                maxAmplitude = Math.max(maxAmplitude, amplitude);
                }

                // Calculate the y-coordinate for the waveform point
                const y = height / 2 - maxAmplitude * scaleFactor;

                // Append the point to the points string
                points += `${x},${y} `;
            }

            // Set the points attribute of the polyline
            polyline.setAttribute('points', points);

            // Request animation frame for continuous rendering
            if (audioContext.state === 'running') {
                requestAnimationFrame(drawRadio);
            }
        };

        source.start();

        // Start drawing the radio waveform
        drawRadio();

    // })
    // .catch(error => console.error('Error loading audio:', error));
}

// const radioButton = document.getElementById('radio-activate-button');
// radioButton.addEventListener('click', () => {
//     toggleRadio();
// })

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

const radioValuesContainer = document.getElementById('radio-values-container');
const checkRadioMatch = () => {
    if (modulationBool && frequencyBool){
        radioValuesContainer.classList.add('active')
    } else {
        radioValuesContainer.classList.remove('active')
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