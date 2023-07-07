const startLatDiv=document.getElementById("start-lat"),startLonDiv=document.getElementById("start-lon"),currentLatDiv=document.getElementById("current-lat"),currentLonDiv=document.getElementById("current-lon"),stabalizedLatDiv=document.getElementById("stabalized-lat"),stabalizedLonDiv=document.getElementById("stabalized-lon"),distanceLatDiv=document.getElementById("distance-lat"),distanceLonDiv=document.getElementById("distance-lon"),distanceTotalDiv=document.getElementById("distance-total"),staticOverlay=document.getElementById("static-overlay"),outofboundsWarning=document.getElementById("outofbounds-warning-container"),gpsIdentifier=document.getElementById("gps-identifier");let currentLat,currentLon,startLat,startLon,distanceFromHotspotTotal,distanceFromHotspotLon,distanceFromHotspotLat,stabilizedCoords;const radius=10;let positionsList=[];const geolocationOptions={enableHighAccuracy:!0,timeout:1e3,maximumAge:0};function initLocation(){navigator.geolocation?(navigator.geolocation.getCurrentPosition(startPosition),navigator.geolocation.watchPosition(currentLocation,locationError,geolocationOptions),setTimeout((()=>{navigator.geolocation.getCurrentPosition(startPosition)}),"3000")):alert("This device does not support the required geolocation functions for this app to work properly. For best results see FAQ section.")}function startPosition(t){startLat=t.coords.latitude,startLon=t.coords.longitude,startLatDiv.innerHTML="start lat "+startLat,startLonDiv.innerHTML="start lon "+startLon}function calculatePIP(t,e){gpsIdentifier.style.top=10*t+"%",gpsIdentifier.style.left=10*e+"%",gpsIdentifier.style.transform=`translate(${t}%,${e}%)`}function currentLocation(t){positionsList.push(t),positionsList.length>5&&positionsList.shift(),stabilizedCoords=stabilizeCoordinates(positionsList),currentLat=stabilizedCoords.latitude,currentLon=stabilizedCoords.longitude,distanceFromHotspotLat=calculateLatitudeDistance(startLat,currentLat),distanceFromHotspotLon=calculateLongitudeDistance(startLon,currentLon,currentLat),calculatePIP(distanceFromHotspotLat,distanceFromHotspotLon),distanceFromHotspotTotal=calculateTotalDistance(distanceFromHotspotLon,distanceFromHotspotLat),distanceFromHotspotTotal>10?($("#slide-GPS > .slide-item-info ").html("You are outside the radius. Distance from center: "+distanceFromHotspotTotal.toFixed(2)+"m"),staticOverlay.style.opacity="1",outofboundsWarning.style.opacity="1",navigator.vibrate(10)):distanceFromHotspotTotal>8?($("#slide-GPS > .slide-item-info ").html("You are inside the radius. Distance from center: "+distanceFromHotspotTotal.toFixed(2)+"m"),staticOverlay.style.opacity=""+distanceFromHotspotLat/10,outofboundsWarning.style.opacity=""+distanceFromHotspotLat/10):($("#slide-GPS > .slide-item-info ").html("You are inside the radius. Distance from center: "+distanceFromHotspotTotal.toFixed(2)+"m"),staticOverlay.style.opacity="0",outofboundsWarning.style.opacity="0"),currentLatDiv.innerHTML="current Latitude: "+t.coords.latitude,currentLonDiv.innerHTML="current Longitude: "+t.coords.longitude,distanceLatDiv.innerHTML="distance Latitude: "+distanceFromHotspotLon,distanceLonDiv.innerHTML="distance Longitude: "+distanceFromHotspotLat,distanceTotalDiv.innerHTML="distance Total: "+distanceFromHotspotTotal}function locationError(){switch(error.code){case error.PERMISSION_DENIED:alert("User denied the request for Geolocation.");break;case error.POSITION_UNAVAILABLE:alert("Location information is unavailable.");break;case error.TIMEOUT:alert("The request to get user location timed out.");break;case error.UNKNOWN_ERROR:alert("An unknown error occurred.")}}function calculateLatitudeDistance(t,e){return 6371e3*deg2rad(e-t)}function calculateLongitudeDistance(t,e,o){var n=deg2rad(e-t),a=Math.sin(n/2)*Math.sin(n/2)*Math.cos(deg2rad(o))*Math.cos(deg2rad(o)),i=6371e3*(2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a)));return e<t&&(i*=-1),i}function calculateTotalDistance(t,e){return Math.sqrt(Math.pow(t,2)+Math.pow(e,2))}function convertLonLatToXY(t,e){const o=6371e3;return{x:t*Math.PI/180*o*Math.cos(e*Math.PI/180),y:e*Math.PI/180*o}}function deg2rad(t){return t*(Math.PI/180)}function stabilizeCoordinates(t){for(var e={latitude:0,longitude:0},o=0;o<t.length;o++)e.latitude+=t[o].coords.latitude,e.longitude+=t[o].coords.longitude;return e.latitude/=t.length,e.longitude/=t.length,stabalizedLatDiv.innerHTML="stabalized Latitude: "+e.latitude,stabalizedLonDiv.innerHTML="stabalized Longitude: "+e.longitude,e}