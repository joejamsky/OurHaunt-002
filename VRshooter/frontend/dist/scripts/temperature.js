const tempPlus=document.getElementById("temperature-plus"),tempMinus=document.getElementById("temperature-minus"),tempInput=document.getElementById("temperature-quantity");tempPlus.addEventListener("click",(()=>{tempInput.stepUp(),handleActive(tempInput.value)})),tempMinus.addEventListener("click",(()=>{tempInput.stepDown(),handleActive(tempInput.value)}));const handleActive=e=>{-10===parseInt(e)?(console.log("-10"),tempMinus.classList.add("inactive")):-9===parseInt(e)?(console.log("-9"),tempMinus.classList.remove("inactive")):120===parseInt(e)?(console.log("120"),tempPlus.classList.add("inactive")):119===parseInt(e)&&(console.log("119"),tempPlus.classList.remove("inactive"))};