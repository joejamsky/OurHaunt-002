const slideData = [
    { 
        slideID: 'slide-camera',
        itemName: 'Camera',
        unlocked: false,
        itemIcon: 'camera.svg',
        summaryText: "Adjusts the camera's filter. Toggle the switches to reveal the identity of the spirit." 
    },
    { 
        slideID: 'slide-radio',
        itemName: 'Radio',
        unlocked: false,
        itemIcon: 'recorder.svg',
        summaryText: "Detects sounds from the spirits." 
    },
    { 
        slideID: 'slide-microphone',
        itemName: 'Microphone', 
        unlocked: false,
        itemIcon: 'recorder.svg',
        summaryText: "Allows you to communicate with spirit. Press record button to begin voice recording. The red light indicates that recording is active. Press the button again to end recording." 
    },
    {
        slideID: 'slide-portal',
        itemName: 'Portal', 
        unlocked: false,
        itemIcon: 'gate.svg',
        summaryText: "Identify characteristics about the spirit to activate the portal. Once activated, the portal is open your judgement will determine the spirits fate." 
    }
];

function initSlides() {
    $('.slide-camera').append($('.camera-module-container'));
    $('.slide-microphone').append($('.voice-module-container'));
    $('.slide-radio').append($('.radio-module-container'));
    $('.slide-portal').append($('.portal-module-container'));
}

function initSlider(){
    $("#ui-slider").slick({
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

window.onload = function() {
    if (window.jQuery) {  
        // jQuery is loaded  

        // Add slides
        $.each(slideData, function(index, slide) {
            $('#ui-slider').append(`
                <div class='slide-card'>
                    <div class='slide-body ` + slide.slideID + `'>
                        
                        
                        
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

        initSlides();
        initSlider()
        initAbout()
        initDetailsButtons()
    } else {
        alert("jQuery is not loaded.");
    }
}
// {/* <div class='slide-item-name'><img src='../src/assets/icons/` + slide.itemIcon + `' /></div> */}