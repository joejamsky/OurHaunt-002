const motionIdentifier=document.getElementById("motion-identifier"),motionModule=document.getElementById("motion-module");function convertRange(e,t=-10,n=10,o=0,i=100){return(e-t)/(n-t)*(i-o)+o}const updateTrackerRotation=e=>{motionModule.style.transform=`rotate(${e}deg)`},updatePip=e=>{motionIdentifier.style.top=`${convertRange(e.z)}%`,motionIdentifier.style.left=`${convertRange(e.x)}%`,motionIdentifier.style.transform=`translate(-${convertRange(e.x)}%, -${convertRange(e.z)}%)`};window.addEventListener("deviceorientation",(e=>{updateTrackerRotation(e)}));