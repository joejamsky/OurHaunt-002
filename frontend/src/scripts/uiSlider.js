// import $ from 'jquery'
// import 'slick-carousel'

// item ideas. Tonics that can cure sanity or calm spirit
// Incense that can calm spirit or make it angry.
// MP3 player that can play music to calm spirit or make it angry.
// Mortar and pestle to make tonics.

const slideData = [
    { 
        slideID: 'slide-motion',
        itemName: 'Motion Sensor', 
        unlocked: true,
        itemIcon: 'gate.svg',
        summaryText: "Detects movement of the spirit." 
    },
    {
        slideID: 'slide-portal',
        itemName: 'Eldritch Portal', 
        unlocked: false,
        itemIcon: 'gate.svg',
        summaryText: "Identify characteristics about the spirit to activate the portal. Once activated, the portal is open your judgement will determine the spirits fate." 
    },
    // {
    //     slideID: 'slide-tonics',
    //     itemName: 'Tonics', 
    //     unlocked: false,
    //     itemIcon: 'gate.svg',
    //     summaryText: "Click to consume tonic." 
    // },
    { 
        slideID: 'slide-voice',
        itemName: 'Voice', 
        unlocked: false,
        itemIcon: 'recorder.svg',
        summaryText: "Allows you to communicate with spirit. Press record button to begin voice recording. The red light indicates that recording is active. Press the button again to end recording." 
    },
    { 
        slideID: 'slide-emf',
        itemName: 'EMF Reader', 
        unlocked: false,
        itemIcon: 'emf.svg',
        summaryText: "Detects electromagnetic energy from spirits. The angrier the spirit, the higher the reading." 
    },

    { 
        slideID: 'slide-radio',
        itemName: 'Radio',
        unlocked: false,
        itemIcon: 'recorder.svg',
        summaryText: "Detects sounds from the spirits." 
    },
    { 
        slideID: 'slide-judgement',
        itemName: 'Judgement',
        unlocked: false,
        itemIcon: 'recorder.svg',
        summaryText: "Decide the fate of the spirit." 
    },
    // { 
    //     slideID: 'slide-Temp',
    //     itemName: 'Temperature',
    //     unlocked: false,
    //     itemIcon: 'recorder.svg',
    //     summaryText: "Adjusts surrounding temperature." 
    // },
    { 
        slideID: 'slide-filter',
        itemName: 'Camera Filter',
        unlocked: false,
        itemIcon: 'camera.svg',
        summaryText: "Adjusts the camera's filter. Toggle the switches to reveal the identity of the spirit." 
    }

];

function initSlider(){
    $("#ui-slider").slick({
        // normal options...
        dots: false,
        infinite: true,
        slidesToShow: 1,
        // adaptiveHeight: true,
        // centerMode: true,
        arrows: true,
      });


    $("#ui-slider").on('afterChange', function(event, slick, currentSlide) {
        setSlide(currentSlide);
        checkSlide(currentSlide);
    });
}

function initAbout(){
    $('#about-button').on("click", function(){
        setTimeout(() => {
            $( "#about-page" ).show();
          }, 250);
    })
    $('#about-close').on("click", function(){
        $('#about-page').hide();
    })
}
    
function initDetailsButtons(){
    $('.details-button').each(function() {
        $(this).on("click", function() {
            setTimeout(() => {
                $( ".item-details-toggle-layer" ).show();
              }, 250);
        })
    })
    

    $('.details-close-button').each(function() {
        $(this).on("click", function() {
            $( ".item-details-toggle-layer" ).hide();
        })
    })
}
    

window.onload = function() {
    if (window.jQuery) {  
        // jQuery is loaded  

        // Add slides
        // <div class='slide-item-unlocked'> Unlocked: ` + slide.unlocked + `</div>
        $.each(slideData, function(index, slide) {
            $('#ui-slider').append(`
                <div class='slide-card'>
                    <div class='slide-body' id='` + slide.slideID + `'>
                        
                        
                        
                        <div>
                            <button class="details-button" data-slide-button-id="` + index + `">?</button>
                        </div>
                        
                        <div class="item-details-toggle-layer"> 
                            <div class="item-details-container">                             
                                <div class="item-details">                             
                                    <div class='slide-item-summary'> Summary: ` + slide.summaryText + `</div>
                                    <button class="details-close-button" data-slide-close-button-id=` + index + `> EXIT </button>
                                </div>    
                            </div>
                        </div>
                        <div class='slide-item-name'>` + slide.itemName + `</div>
                    </div>
                </div>`)
        })

        initSlider()
        initAbout()
        initDetailsButtons()
    } else {
        // jQuery is not loaded
        alert("jQuery is not loaded.");
    }
}
// {/* <div class='slide-item-name'><img src='../src/assets/icons/` + slide.itemIcon + `' /></div> */}