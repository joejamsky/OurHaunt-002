// Audio file URL
const audioFileUrl = './dist/assets/audio/ImperialMarch60.wav';

// Create an AudioContext instance
const audioContext = new (window.AudioContext || window.webkitAudioContext)();


function initAudio() {

}


function renderOscilloscope() {
    
    // Load the audio file
    fetch(audioFileUrl)
    .then(response => response.arrayBuffer())
    .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
    .then(audioBuffer => {

        // Get SVG element
        const svg = document.getElementById('oscilloscope-svg');

        // Set SVG dimensions based on audio length
        const width = svg.clientWidth;
        const height = svg.clientHeight;

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
        analyserNode.fftSize = 2048; // Adjust the fftSize for smoother waveform

        // Connect the AnalyserNode to the audioContext
        const source = audioContext.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(analyserNode);
        analyserNode.connect(audioContext.destination);

        // Draw oscilloscope waveform
        const drawOscilloscope = () => {
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
                requestAnimationFrame(drawOscilloscope);
            }
        };

        // Start playing the audio
        source.start();

        // Start drawing the oscilloscope waveform
        drawOscilloscope();
    })
    .catch(error => console.error('Error loading audio:', error));
}
  

const listenButton = document.getElementById('listen');
listenButton.addEventListener('click', () => {
    renderOscilloscope();
})
listenButton.addEventListener('touchstart', () => {
    renderOscilloscope();
})