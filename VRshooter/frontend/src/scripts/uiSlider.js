// import $ from 'jquery'
// import 'slick-carousel'


const slideData = [
    { 
        slideID: 'slide-GPS',
        itemName: 'GPS', 
        unlocked: true,
        summaryText: "Detects distance from objective." 
    },
    { 
        slideID: 'slide-SS',
        itemName: 'Sound Sensor',
        unlocked: false,
        summaryText: "Detects sounds from spirits." 
    },
    { 
        slideID: 'slide-EMF',
        itemName: 'EMF Reader', 
        unlocked: false,
        summaryText: "Detects electromagnetic frequencies from spirits." 
    },
    { 
        slideID: 'slide-WB',
        itemName: 'Writing Book', 
        unlocked: false,
        summaryText: "Allows spirits to write messages." 
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
}

function initAbout(){
    $('#about-button').on("click", function(){
        $( "#about-page" ).show();
    })
    $('#about-close').on("click", function(){
        $('#about-page').hide();
    })
}
    
function initDetailsButtons(){
    $('.details-button').each(function() {
        $(this).on("click", function() {
            $( ".item-details-container" ).show();
        })
    })
    

    $('.details-close-button').each(function() {
        $(this).on("click", function() {
            $( ".item-details-container" ).hide();
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
                        
                        
                            <button class="details-button" data-slide-button-id="` + index + `">?</button>
                        
                        <div class="item-details-container"> 
                            <div class="item-details">                             
                                <div class='slide-item-summary'> Summary: ` + slide.summaryText + `</div>
                                <div class='slide-item-info'> Info: </div>
                                <button class="details-close-button" data-slide-close-button-id=` + index + `> EXIT </button>
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