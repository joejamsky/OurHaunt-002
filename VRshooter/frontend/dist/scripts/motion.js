const motionIdentifier=document.getElementById("motion-identifier");function convertRange(e,t=-10,n=10,o=0,i=100){return(e-t)/(n-t)*(i-o)+o}const updatePip=e=>{motionIdentifier.style.top=`${convertRange(e.y)}%`,motionIdentifier.style.left=`${convertRange(e.x)}%`,motionIdentifier.style.transform=`translate(-${convertRange(e.x)}%, -${convertRange(e.y)}%)`};