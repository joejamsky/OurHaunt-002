const startLatDiv = document.getElementById("start-lat");
const startLonDiv = document.getElementById("start-lon");
const currentLatDiv = document.getElementById("current-lat");
const currentLonDiv = document.getElementById("current-lon");
const stabalizedLatDiv = document.getElementById("stabalized-lat");
const stabalizedLonDiv = document.getElementById("stabalized-lon");
const distanceLatDiv = document.getElementById("distance-lat");
const distanceLonDiv = document.getElementById("distance-lon");

let currentLat,
    currentLon,
    startLat,
    startLon,
    distanceFromHotspot,
    stabilizedCoords;

let positionsList = [];

function initLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(startPosition);
        navigator.geolocation.watchPosition(currentLocation);
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

function currentLocation(position) {


    // Debug
    currentLatDiv.innerHTML = "current Latitude: " + position.coords.latitude
    currentLonDiv.innerHTML = "current Longitude: " +  position.coords.longitude

    

    positionsList.push(position);
    if (positionsList.length > 5) {
        positionsList.shift();
    }

    stabilizedCoords = stabilizeCoordinates(positionsList);
    currentLat = stabilizedCoords.latitude;
    currentLon = stabilizedCoords.longitude;


    distanceLatDiv.innerHTML = "distance Latitude: " + distanceFromHotspot
    distanceLonDiv.innerHTML = "distance Longitude: " + distanceFromHotspot



    distanceFromHotspot = getDistanceFromLatLonInM(
        stabilizedCoords.latitude,
        stabilizedCoords.longitude,
        startLat,
        startLon
    );





    // Update the distance in the HTML div and change the text color based on whether the user is within the radius
    // if (distance <= radius) {
    // distanceDiv.innerHTML = 'You are inside the radius. Distance from center: ' + distance.toFixed(2) + 'm';
    // distanceDiv.style.color = 'black';
    // } else {
    // distanceDiv.innerHTML = 'You are outside the radius. Distance from center: ' + distance.toFixed(2) + 'm';
    // distanceDiv.style.color = 'red';
    // }
}

function getDistanceFromLatLonInM(lat1, lon1, lat2, lon2) {
    var R = 6371e3; // Radius of the earth in meters
    var dLat = deg2rad(lat2 - lat1); // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) *
            Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in meters
    return d;
}

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