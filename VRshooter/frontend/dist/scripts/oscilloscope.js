const audioFileUrl="../assets/audio/ImperialMarch60.wav",audioContext=new(window.AudioContext||window.webkitAudioContext);let oscilloscopeActive=!1;function renderOscilloscope(e){const o=document.getElementById("oscilloscope-svg"),t=o.clientWidth,l=o.clientHeight;console.log("width",t),console.log("height",l),o.innerHTML="";const c=document.createElementNS("http://www.w3.org/2000/svg","polyline");c.setAttribute("fill","none"),c.setAttribute("stroke","white"),c.setAttribute("stroke-width","1"),o.appendChild(c);const s=audioContext.createAnalyser();s.fftSize=256;const n=audioContext.createBufferSource();console.log("audioBuffer",e),n.buffer=e,n.connect(s),console.log("analyserNode2",s);const i=()=>{const e=new Float32Array(s.fftSize);s.getFloatTimeDomainData(e);const o=Math.floor(e.length/t),n=l/2;let a="";for(let c=0;c<t;c++){const t=(c+1)*o;let s=0;for(let l=c*o;l<t;l++){const o=Math.abs(e[l]);s=Math.max(s,o)}a+=`${c},${l/2-s*n} `}c.setAttribute("points",a),"running"===audioContext.state&&requestAnimationFrame(i)};n.start(),i()}const oscilloscopeButton=document.getElementById("oscilloscope-activate-button");function toggleOscilloscope(){oscilloscopeActive=!oscilloscopeActive}function activateOscilloscope(){oscilloscopeActive=!0}function disableOscilloscope(){oscilloscopeActive=!1}oscilloscopeButton.addEventListener("click",(()=>{toggleOscilloscope()}));const oscilloscopeSlider=document.getElementById("oscilloscope-slider"),oscilloscopeValueInput=document.getElementById("oscilloscope-valueInput");oscilloscopeSlider.addEventListener("input",(e=>{oscilloscopeValueInput.innerHTML=`${parseFloat(e.target.value).toFixed(1)}<span class="hz">hz</span>`}));