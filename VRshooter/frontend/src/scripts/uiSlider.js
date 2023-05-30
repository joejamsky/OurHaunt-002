// import $ from 'jquery'
// import 'slick-carousel'

function initSlider(){
    
    $("#ui-slider").slick({
 
        // normal options...
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        // adaptiveHeight: true,
        // centerMode: true,
        arrows: false,

      });


    }
    
window.onload = function() {
    if (window.jQuery) {  
        // jQuery is loaded  
        initSlider()
    } else {
        // jQuery is not loaded
        alert("Doesn't Work");
    }
}