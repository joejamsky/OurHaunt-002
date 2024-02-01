const slideData=[{slideID:"slide-filter",itemName:"Camera Filter",unlocked:!1,itemIcon:"camera.svg",summaryText:"Adjusts the camera's filter. Toggle the switches to reveal the identity of the spirit."},{slideID:"slide-radio",itemName:"Radio",unlocked:!1,itemIcon:"recorder.svg",summaryText:"Detects sounds from the spirits."},{slideID:"slide-voice",itemName:"Voice",unlocked:!1,itemIcon:"recorder.svg",summaryText:"Allows you to communicate with spirit. Press record button to begin voice recording. The red light indicates that recording is active. Press the button again to end recording."},{slideID:"slide-portal",itemName:"Portal",unlocked:!1,itemIcon:"gate.svg",summaryText:"Identify characteristics about the spirit to activate the portal. Once activated, the portal is open your judgement will determine the spirits fate."}];function initSlides(){const e=document.getElementById("slide-filter"),t=document.getElementById("camera-module-container");e.append(t);const i=document.getElementById("slide-voice"),n=document.getElementById("voice-module-container");i.append(n);const o=document.getElementById("slide-radio"),d=document.getElementById("radio-module-container");o.append(d);const s=document.getElementById("slide-portal"),l=document.getElementById("portal-module-container");s.append(l)}function initSlider(){$("#ui-slider").slick({dots:!1,infinite:!0,slidesToShow:1,arrows:!0}),$("#ui-slider").on("afterChange",(function(e,t,i){setSlide(i),checkSlide(i)}))}function initDetailsButtons(){$(".details-button").each((function(){$(this).on("click",(function(){setTimeout((()=>{$(".item-details-toggle-layer").show()}),250)}))})),$(".details-close-button").each((function(){$(this).on("click",(function(){$(".item-details-toggle-layer").hide()}))}))}function initAbout(){$("#about-button").on("click",(function(){setTimeout((()=>{$("#about-page").show()}),250)})),$("#about-close").on("click",(function(){$("#about-page").hide()}))}window.onload=function(){window.jQuery?($.each(slideData,(function(e,t){$("#ui-slider").append("\n                <div class='slide-card'>\n                    <div class='slide-body' id='"+t.slideID+'\'>\n                        \n                        \n                        \n                        <div>\n                            <button class="details-button" data-slide-button-id="'+e+'">?</button>\n                        </div>\n                        \n                        <div class="item-details-toggle-layer"> \n                            <div class="item-details-container">                             \n                                <div class="item-details">                             \n                                    <div class=\'slide-item-summary\'> Summary: '+t.summaryText+'</div>\n                                    <button class="details-close-button" data-slide-close-button-id='+e+"> EXIT </button>\n                                </div>    \n                            </div>\n                        </div>\n                        <div class='slide-item-name'>"+t.itemName+"</div>\n                    </div>\n                </div>")})),initSlides(),initSlider(),initAbout(),initDetailsButtons()):alert("jQuery is not loaded.")};