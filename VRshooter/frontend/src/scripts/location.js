const startLatDiv = document.getElementById("start-lat");
const startLonDiv = document.getElementById("start-lon");
const currentLatDiv = document.getElementById("current-lat");
const currentLonDiv = document.getElementById("current-lon");
const stabalizedLatDiv = document.getElementById("stabalized-lat");
const stabalizedLonDiv = document.getElementById("stabalized-lon");
const distanceLatDiv = document.getElementById("distance-lat");
const distanceLonDiv = document.getElementById("distance-lon");
const distanceTotalDiv = document.getElementById("distance-total");
const staticOverlay = document.getElementById("static-overlay");
const outofboundsWarning = document.getElementById("outofbounds-warning-container");
const gpsIdentifier = document.getElementById("gps-identifier");

let currentLat,
    currentLon,
    startLat,
    startLon,
    distanceFromHotspotTotal,
    distanceFromHotspotLon,
    distanceFromHotspotLat,
    stabilizedCoords;

const radius = 10;

let positionsList = [];

const geolocationOptions = {
    enableHighAccuracy: true,
    timeout: 1000,                  // 1000 = 1 second
    maximumAge: 0       
};


function initLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(startPosition);
        navigator.geolocation.watchPosition(currentLocation, locationError, geolocationOptions);
        setTimeout(() => {
            navigator.geolocation.getCurrentPosition(startPosition);
        }, "3000");
    } else {
        alert("This device does not support the required geolocation functions for this app to work properly. For best results see FAQ section.");
    }
}

function startPosition(position) {
    startLat = position.coords.latitude;
    startLon = position.coords.longitude;


    // Debug
    startLatDiv.innerHTML = "start lat " + startLat;
    startLonDiv.innerHTML = "start lon " + startLon;

}

function calculatePIP(lat, lon){
    gpsIdentifier.style.top = `${convertRange( lat )}%`
    gpsIdentifier.style.left = `${convertRange( lon )}%`
    gpsIdentifier.style.transform = `translate(-${convertRange( lat )}%, -${convertRange( lon )}%)`
}

function convertRange(value, min1 = -10, max1 = 10, min2 = 0, max2 = 100) {
    var range1 = max1 - min1;
    var range2 = max2 - min2;
    var scaledValue = (value - min1) / range1;  // Scale the value to a range of 0 to 1
    var convertedValue = (scaledValue * range2) + min2;  // Scale the value to the desired range
    return convertedValue;
  }

function currentLocation(position) {

    positionsList.push(position);
    if (positionsList.length > 5) {
        positionsList.shift();
    }

    stabilizedCoords = stabilizeCoordinates(positionsList);
    currentLat = stabilizedCoords.latitude;
    currentLon = stabilizedCoords.longitude;

    distanceFromHotspotLat = calculateLatitudeDistance(
        startLat,
        currentLat
      );

    distanceFromHotspotLon = calculateLongitudeDistance(
        startLon,
        currentLon,
        currentLat
    );

    calculatePIP(distanceFromHotspotLat, distanceFromHotspotLon)

    // Calculate the total distance
    distanceFromHotspotTotal = calculateTotalDistance (
        distanceFromHotspotLon,
        distanceFromHotspotLat
    );


    // Update the distance in the HTML div and change the text color based on whether the user is within the radius
    if (distanceFromHotspotTotal > radius) {
        $("#slide-GPS > .slide-item-info ").html('You are outside the radius. Distance from center: ' + distanceFromHotspotTotal.toFixed(2) + 'm')
        staticOverlay.style.opacity = '1';
        outofboundsWarning.style.opacity = '1';
        // navigator.vibrate([ 100, 30, 100, 30, 100, 30, 200, 30, 200, 30, 200, 30, 100, 30, 100, 30, 100 ]); 
        // navigator.vibrate(10); 
    } else if (distanceFromHotspotTotal > radius - 2) {
        $("#slide-GPS > .slide-item-info ").html('You are inside the radius. Distance from center: ' + distanceFromHotspotTotal.toFixed(2) + 'm')
        // staticOverlay.style.opacity = `${distanceFromHotspotLat / 10}`;
        outofboundsWarning.style.opacity = `${distanceFromHotspotLat / 10}`;
    } else {
        $("#slide-GPS > .slide-item-info ").html('You are inside the radius. Distance from center: ' + distanceFromHotspotTotal.toFixed(2) + 'm')
        // staticOverlay.style.opacity = '0';
        outofboundsWarning.style.opacity = '0';
    }



    // Debug
    currentLatDiv.innerHTML = "current Latitude: " + position.coords.latitude
    currentLonDiv.innerHTML = "current Longitude: " +  position.coords.longitude
    distanceLatDiv.innerHTML = "distance Latitude: " + distanceFromHotspotLon
    distanceLonDiv.innerHTML = "distance Longitude: " + distanceFromHotspotLat
    distanceTotalDiv.innerHTML = "distance Total: " + distanceFromHotspotTotal
    
}

function locationError(error) {
    console.log('Location error: ', error)
    switch (error.code) {
        case error.PERMISSION_DENIED:
          alert('User denied the request for Geolocation.');
          break;
        case error.POSITION_UNAVAILABLE:
          alert('Location information is unavailable.');
          break;
        case error.TIMEOUT:
        //   alert('The request to get user location timed out.');
          break;
        case error.UNKNOWN_ERROR:
          alert('An unknown error occurred.');
          break;
    }
}

// Function to calculate the distance between two points on the earth's surface for latitude
function calculateLatitudeDistance(lat1, lat2) {
    var earthRadius = 6371e3; // Radius of the earth in meters
    var dLat = deg2rad(lat2 - lat1);
    // var a = Math.sin(dLat / 2) * Math.sin(dLat / 2);
    // var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    // var distance = earthRadius * c;
    var distance = earthRadius * dLat;
    return distance;
}

function calculateLongitudeDistance(lon1, lon2, lat) {
    var earthRadius = 6371e3; // Radius of the earth in meters
    var dLon = deg2rad(lon2 - lon1);
    var a = Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(deg2rad(lat)) * Math.cos(deg2rad(lat));
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var distance = earthRadius * c;
    if (lon2 < lon1) {
        distance *= -1; // Apply negative sign for negative longitude difference
      }
    return distance;
}




function calculateTotalDistance (latitudeDistance, longitudeDistance) {
    return Math.sqrt( Math.pow(latitudeDistance, 2) + Math.pow(longitudeDistance, 2) );
}

function convertLonLatToXY(lon, lat) {
    const R = 6371e3; // Earth's radius in meters
    const x = lon * Math.PI / 180 * R * Math.cos(lat * Math.PI / 180);
    const y = lat * Math.PI / 180 * R;
    return { x, y };
  }

// Function to convert degrees to radians
function deg2rad(deg) {
    return deg * (Math.PI / 180);
}

function stabilizeCoordinates(positionsList) {
    var stabilizedCoords = {
        latitude: 0,
        longitude: 0,
    };

    for (var i = 0; i < positionsList.length; i++) {
        stabilizedCoords.latitude += positionsList[i].coords.latitude;
        stabilizedCoords.longitude += positionsList[i].coords.longitude;
    }

    stabilizedCoords.latitude /= positionsList.length;
    stabilizedCoords.longitude /= positionsList.length;

    stabalizedLatDiv.innerHTML = "stabalized Latitude: " + stabilizedCoords.latitude
    stabalizedLonDiv.innerHTML = "stabalized Longitude: " + stabilizedCoords.longitude

    return stabilizedCoords;
}