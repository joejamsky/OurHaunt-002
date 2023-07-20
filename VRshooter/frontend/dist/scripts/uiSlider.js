const slideData=[{slideID:"slide-Voice",itemName:"Voice",unlocked:!1,summaryText:"Allows you to communicate with spirit. Voice Commands: 'close channel', 'reset input', 'go';"},{slideID:"slide-GPS",itemName:"GPS",unlocked:!0,summaryText:"Detects distance from objective."},{slideID:"slide-SS",itemName:"Sound Sensor",unlocked:!1,summaryText:"Detects sounds from spirits."},{slideID:"slide-EMF",itemName:"EMF Reader",unlocked:!1,summaryText:"Detects electromagnetic frequencies from spirits."},{slideID:"slide-WB",itemName:"Writing Book",unlocked:!1,summaryText:"Allows spirits to write messages."},{slideID:"slide-Lights",itemName:"Lighting",unlocked:!1,summaryText:"Set lights."},{slideID:"slide-Sacrifice",itemName:"Sacrifice",unlocked:!1,summaryText:"Sacifice object to the spirit."},{slideID:"slide-Gram",itemName:"Gram",unlocked:!1,summaryText:"Place gram"}];function initSlider(){$("#ui-slider").slick({dots:!1,infinite:!0,slidesToShow:1,arrows:!1})}function initAbout(){$("#about-button").on("click",(function(){setTimeout((()=>{$("#about-page").show()}),250)})),$("#about-close").on("click",(function(){$("#about-page").hide()}))}function initDetailsButtons(){$(".details-button").each((function(){$(this).on("click",(function(){setTimeout((()=>{$(".item-details-toggle-layer").show()}),250)}))})),$(".details-close-button").each((function(){$(this).on("click",(function(){$(".item-details-toggle-layer").hide()}))}))}window.onload=function(){window.jQuery?($.each(slideData,(function(i,e){$("#ui-slider").append("\n                <div class='slide-card'>\n                    <div class='slide-body' id='"+e.slideID+'\'>\n                        \n                        \n                        \n                        <div>\n                            <button class="details-button" data-slide-button-id="'+i+'">?</button>\n                        </div>\n                        \n                        <div class="item-details-toggle-layer"> \n                            <div class="item-details-container">                             \n                                <div class="item-details">                             \n                                    <div class=\'slide-item-summary\'> Summary: '+e.summaryText+'</div>\n                                    <button class="details-close-button" data-slide-close-button-id='+i+"> EXIT </button>\n                                </div>    \n                            </div>\n                        </div>\n\n                        <div class='slide-item-name'>"+e.itemName+"</div>\n                    </div>\n                </div>")})),initSlider(),initAbout(),initDetailsButtons()):alert("jQuery is not loaded.")};