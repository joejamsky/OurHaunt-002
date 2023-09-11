// import $ from 'jquery'
// import 'slick-carousel'


const slideData = [
    
    {
        slideID: 'slide-Glyph',
        itemName: 'Glyph', 
        unlocked: false,
        summaryText: "Place the appropriate glyphs to trap or release spirit." 
    },
    {
        slideID: 'slide-Offering',
        itemName: 'Offerings', 
        unlocked: false,
        summaryText: "Present an object to the spirit." 
    },
    { 
        slideID: 'slide-Voice',
        itemName: 'Voice', 
        unlocked: false,
        summaryText: "Allows you to communicate with spirit. Voice Commands: 'close channel', 'reset input', 'go';" 
    },
    { 
        slideID: 'slide-EMF',
        itemName: 'EMF Reader', 
        unlocked: false,
        summaryText: "Detects electromagnetic frequencies from spirits." 
    },
    { 
        slideID: 'slide-GPS',
        itemName: 'GPS', 
        unlocked: true,
        summaryText: "Detects distance from objective." 
    },
    { 
        slideID: 'slide-Oscilloscope',
        itemName: 'Oscilloscope',
        unlocked: false,
        summaryText: "Detects sounds from spirits." 
    },
    { 
        slideID: 'slide-Temp',
        itemName: 'Temperature',
        unlocked: false,
        summaryText: "Adjusts surrounding temperature." 
    },
    { 
        slideID: 'slide-Filter',
        itemName: 'Filter',
        unlocked: false,
        summaryText: "Adjusts camera filter." 
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
        arrows: false,
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