const tempPlus = document.getElementById("temperature-plus")
const tempMinus = document.getElementById("temperature-minus")
const tempInput = document.getElementById("temperature-quantity")

// tempPlus.addEventListener('click', () => {
//     tempInput.stepUp()
//     handleActive(tempInput.value)
// })

// tempMinus.addEventListener('click', () => {
//     tempInput.stepDown()
//     handleActive(tempInput.value)
// })

const handleActive = (value) => {
    if (parseInt(value) === -10){
        console.log('-10')
        tempMinus.classList.add('inactive')
    } else if (parseInt(value) === -9){
        console.log('-9')
        tempMinus.classList.remove('inactive')
    } else if (parseInt(value) === 120) {
        console.log('120')
        tempPlus.classList.add('inactive')
    } else if (parseInt(value) === 119) {
        console.log('119')
        tempPlus.classList.remove('inactive')
    }
}