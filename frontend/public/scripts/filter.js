let filterBool=!0;document.addEventListener("DOMContentLoaded",(function(){const t=document.querySelectorAll(".filter-switch input"),r=Array.from(t),e=document.getElementsByClassName("filter-light-bulb"),n=Array.from(e),o=document.getElementById("filter-overlay");function s(){let t=0,e=0,s=0;r.forEach(((r,o)=>{const a=n[o];r.checked?(r.classList.contains("r-switch")?t=150:r.classList.contains("g-switch")?e=150:r.classList.contains("b-switch")&&(s=150),a.classList.remove("filter-light-off")):a.classList.add("filter-light-off")}));const a=`rgba(${t}, ${e}, ${s}, 0.15)`;o.style.backgroundColor=a,(t=>{filterBool=t===GLOBAL_ENTITY.candle})(function(t){const r=t.match(/^rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)$/);if(!r)throw new Error("Invalid RGBA color format");const e=parseInt(r[1]),n=parseInt(r[2]),o=parseInt(r[3]);return`${e.toString(16).padStart(2,"0")}${n.toString(16).padStart(2,"0")}${o.toString(16).padStart(2,"0")}`}(a)),0===t&&0===e&&0===s&&(o.style.backgroundColor="transparent")}r.forEach(((t,r)=>{t.addEventListener("change",s)}))}));