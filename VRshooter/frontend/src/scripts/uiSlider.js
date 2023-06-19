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
    
window.onload = function() {
    if (window.jQuery) {  
        // jQuery is loaded  

        // Add slides
        $.each(slideData, function(index, slide) {
            $('#ui-slider').append(`
                <div class='slide-card'>
                    <div class='slide-body' id='` + slide.slideID + `'>
                        <div class='slide-item-name'> Item: ` + slide.itemName + `</div>
                        <div class='slide-item-unlocked'> Unlocked: ` + slide.unlocked + `</div>
                        <div class='slide-item-summary'> Summary: ` + slide.summaryText + `</div>
                        <div class='slide-item-info'> Info: </div>
                    </div>
                </div>`)
        })

        initSlider()
    } else {
        // jQuery is not loaded
        alert("Doesn't Work");
    }
}