const slideData=[{slideID:"slide-Glyph",itemName:"Glyph",unlocked:!1,summaryText:"Place the appropriate glyphs to trap or release spirit."},{slideID:"slide-Offering",itemName:"Offerings",unlocked:!1,summaryText:"Present an object to the spirit."},{slideID:"slide-Voice",itemName:"Voice",unlocked:!1,summaryText:"Allows you to communicate with spirit. Voice Commands: 'close channel', 'reset input', 'go';"},{slideID:"slide-EMF",itemName:"EMF Reader",unlocked:!1,summaryText:"Detects electromagnetic frequencies from spirits."},{slideID:"slide-GPS",itemName:"GPS",unlocked:!0,summaryText:"Detects distance from objective."},{slideID:"slide-Oscilloscope",itemName:"Oscilloscope",unlocked:!1,summaryText:"Detects sounds from spirits."}];function initSlider(){$("#ui-slider").slick({dots:!1,infinite:!0,slidesToShow:1,arrows:!1}),$("#ui-slider").on("afterChange",(function(e,i,t){setSlide(t),checkSlide(t)}))}function initAbout(){$("#about-button").on("click",(function(){setTimeout((()=>{$("#about-page").show()}),250)})),$("#about-close").on("click",(function(){$("#about-page").hide()}))}function initDetailsButtons(){$(".details-button").each((function(){$(this).on("click",(function(){setTimeout((()=>{$(".item-details-toggle-layer").show()}),250)}))})),$(".details-close-button").each((function(){$(this).on("click",(function(){$(".item-details-toggle-layer").hide()}))}))}window.onload=function(){window.jQuery?($.each(slideData,(function(e,i){$("#ui-slider").append("\n                <div class='slide-card'>\n                    <div class='slide-body' id='"+i.slideID+'\'>\n                        \n                        \n                        \n                        <div>\n                            <button class="details-button" data-slide-button-id="'+e+'">?</button>\n                        </div>\n                        \n                        <div class="item-details-toggle-layer"> \n                            <div class="item-details-container">                             \n                                <div class="item-details">                             \n                                    <div class=\'slide-item-summary\'> Summary: '+i.summaryText+'</div>\n                                    <button class="details-close-button" data-slide-close-button-id='+e+"> EXIT </button>\n                                </div>    \n                            </div>\n                        </div>\n\n                        <div class='slide-item-name'>"+i.itemName+"</div>\n                    </div>\n                </div>")})),initSlider(),initAbout(),initDetailsButtons()):alert("jQuery is not loaded.")};const scrollableDiv=document.getElementById("glyph-module"),glyphUpArrow=document.getElementById("glyph-up-arrow"),glyphDownArrow=document.getElementById("glyph-down-arrow");scrollableDiv.addEventListener("scroll",(function(){0===scrollableDiv.scrollTop?glyphUpArrow.innerHTML="&#9651;":scrollableDiv.scrollTop+scrollableDiv.clientHeight===scrollableDiv.scrollHeight?glyphDownArrow.innerHTML="&#9661;":(glyphUpArrow.innerHTML="&#9650;",glyphDownArrow.innerHTML="&#9660;")}));