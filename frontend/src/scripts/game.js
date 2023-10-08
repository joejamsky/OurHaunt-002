// let GLOBAL_ENTITY

const emfLights = document.querySelectorAll('.emf-light-bulb')
function addHostility() {
    if(GLOBAL_ENTITY.hostility < 5){
        GLOBAL_ENTITY.hostility += 1;
    }
    
    emfLights.forEach((light, i) => {
        if(GLOBAL_ENTITY.hostility >= i){
            light.classList.remove('emf-light-off')
        }
    })
}

function removeHostility() {
    if(GLOBAL_ENTITY.hostility > 0){
        GLOBAL_ENTITY.hostility -= 1;
    }
    
    emfLights.forEach((light, i) => {
        if(GLOBAL_ENTITY.hostility < i){
            light.classList.add('emf-light-off')
        }
    })
}


// Slide position

let slide 

function setSlide(slide) {
    slide = slide
}

function getSlide(){
    return slide
}

function checkSlide(){
    if(slide === 5){
        activateRadio()
    } else {
        disableRadio()
    }
}