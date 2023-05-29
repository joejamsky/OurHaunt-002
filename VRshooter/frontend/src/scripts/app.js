import * as THREE from "./three.module.js";
import { DeviceOrientationControls } from "./DeviceOrientationControls.js";

let camera,
    scene,
    renderer,
    controls,
    raycaster,
    pointerPosition,
    sceneCubes,
    cubesDestroyed,
    currentLat,
    currentLon,
    startLat,
    startLon,
    positions;
positions = [];
sceneCubes = [];
cubesDestroyed = 0;

const startButton = document.getElementById("startButton");
const startLatDiv = document.getElementById("start-lat");
const startLonDiv = document.getElementById("start-lon");
const currentLatDiv = document.getElementById("current-lat");
const currentLonDiv = document.getElementById("current-lon");
const cameraXDiv = document.getElementById("camera-x");
const cameraZDiv = document.getElementById("camera-z");

const videoWidth = window.innerWidth;
const videoHeight = window.innerHeight * (70 / 100);
console.log("video height", videoHeight);
console.log("window height", window.innerHeight);

startButton.addEventListener(
    "click",
    function () {
        const overlay = document.getElementById("overlay");
        overlay.remove();

        // openFullscreen()
        startVideo();
        initLocation();
        init();
        animate();
    },
    false
);

function initLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(startPosition);
        navigator.geolocation.watchPosition(currentLocation);
    } else {
        console.error("Geolocation is not supported by this browser.");
    }
}


function startPosition(position) {
    startLat = position.coords.latitude;
    startLon = position.coords.longitude;
    startLatDiv.innerHTML = "start lat " + startLat;
    startLonDiv.innerHTML = "start lon " + startLon;
}

function currentLocation(position) {
    positions.push(position);
    if (positions.length > 5) {
        positions.shift();
    }

    var stabilizedCoords = stabilizeCoordinates(positions);

    console.log('stablized coords', stabilizedCoords)
    currentLat = stabilizedCoords.latitude;
    currentLon = stabilizedCoords.longitude;
    // currentLatDiv.innerHTML = "current lat " + currentLat;
    // currentLonDiv.innerHTML = "current lon " + currentLon;

    // var distance = getDistanceFromLatLonInM(
    //     stabilizedCoords.latitude,
    //     stabilizedCoords.longitude,
    //     startLat,
    //     startLon
    // );

    // Update the latitude and longitude in the HTML divs
    currentLatDiv.innerHTML = "current Latitude: " + currentLat
    // .toFixed(5);
    currentLonDiv.innerHTML = "current Longitude: " + currentLon
    // .toFixed(5);

    // Update the distance in the HTML div and change the text color based on whether the user is within the radius
    // if (distance <= radius) {
    // distanceDiv.innerHTML = 'You are inside the radius. Distance from center: ' + distance.toFixed(2) + 'm';
    // distanceDiv.style.color = 'black';
    // } else {
    // distanceDiv.innerHTML = 'You are outside the radius. Distance from center: ' + distance.toFixed(2) + 'm';
    // distanceDiv.style.color = 'red';
    // }
}

// function getDistanceFromLatLonInM(lat1, lon1, lat2, lon2) {
//     var R = 6371e3; // Radius of the earth in meters
//     var dLat = deg2rad(lat2 - lat1); // deg2rad below
//     var dLon = deg2rad(lon2 - lon1);
//     var a =
//         Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//         Math.cos(deg2rad(lat1)) *
//             Math.cos(deg2rad(lat2)) *
//             Math.sin(dLon / 2) *
//             Math.sin(dLon / 2);
//     var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//     var d = R * c; // Distance in meters
//     return d;
// }

// function deg2rad(deg) {
//     return deg * (Math.PI / 180);
// }

function stabilizeCoordinates(positions) {
    var stabilizedCoords = {
        latitude: 0,
        longitude: 0,
    };

    for (var i = 0; i < positions.length; i++) {
        stabilizedCoords.latitude += positions[i].coords.latitude;
        stabilizedCoords.longitude += positions[i].coords.longitude;
    }

    console.log("coords lat", stabilizedCoords.latitude)
    console.log("coords lon", stabilizedCoords.longitude)
    stabilizedCoords.latitude /= positions.length;
    stabilizedCoords.longitude /= positions.length;

    return stabilizedCoords;
}

function startVideo() {
    const video = document.getElementById("video");
    const constraints = {
        audio: false,
        video: {
            // width: window.innerWidth,
            // height: window.innerHeight,
            facingMode: { exact: "environment" },
        },
    };
    // const constraints = { video: {width: videoWidth, height: videoHeight };
    // const constraints = { video: true };

    navigator.mediaDevices
        .getUserMedia(constraints)
        .then((stream) => {
            // Attach the camera stream to the video element
            video.srcObject = stream;
            video.play();
        })
        .catch((error) => {
            console.error("Unable to access the camera.", error);
        });
}

function openFullscreen() {
    var elem = document.documentElement;
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
        /* Safari */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
        /* IE11 */
        elem.msRequestFullscreen();
    }

    screen.orientation.lock("landscape");
}

function handleTouch(e) {
    pointerPosition.x = (e.touches[0].clientX / videoWidth) * 2 - 1;
    pointerPosition.y = -(e.touches[0].clientY / videoHeight) * 2 + 1;
}

function generateSplitRandomClamped() {
    const min = -10;
    const max = 10;
    const excludeMin = -1;
    const excludeMax = 1;
    const range = max - min + 1 - 2;
    const random = Math.floor(Math.random() * range) + min;
    const adjustment = random >= 0 ? 2 : -2;
    const adjusted = random >= excludeMin ? random + adjustment : random;
    return adjusted;
}

function addItemTimed() {
    if (sceneCubes.length < 5) {
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const cube = new THREE.Mesh(geometry, material);
        let xPos = generateSplitRandomClamped();
        let yPos = THREE.MathUtils.randFloat(0, 5);
        let zPos = generateSplitRandomClamped();
        cube.position.set(xPos, yPos, zPos);
        scene.add(cube);
        sceneCubes.push(cube.id);
        console.log("cubes", sceneCubes);
    }

    console.log("running");
}

function init() {
    camera = new THREE.PerspectiveCamera(75, videoWidth / videoHeight, 1, 1100);

    controls = new DeviceOrientationControls(camera);
    raycaster = new THREE.Raycaster();
    pointerPosition = new THREE.Vector2();

    scene = new THREE.Scene();

    const geometry = new THREE.SphereBufferGeometry(500, 60, 40);
    // invert the geometry on the x-axis so that all of the faces point inward
    geometry.scale(-1, 1, 1);

    const material = new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load(
            "./src/textures/2294472375_24a3b8ef46_o.jpg"
        ),
    });

    const mesh = new THREE.Mesh(geometry, material);
    // scene.add( mesh );

    const helperGeometry = new THREE.BoxBufferGeometry(100, 100, 100, 4, 4, 4);
    const helperMaterial = new THREE.MeshBasicMaterial({
        color: 0xff00ff,
        wireframe: true,
    });
    const helper = new THREE.Mesh(helperGeometry, helperMaterial);
    scene.add(helper);

    //

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(videoWidth, videoHeight);
    document.body.appendChild(renderer.domElement);

    //
    window.addEventListener("resize", onWindowResize, false);
    window.addEventListener("touchstart", handleTouch);
    window.setInterval(function () {
        addItemTimed();
    }, 1000);
}

function animate() {
    window.requestAnimationFrame(animate);
    controls.update();
    raycaster.setFromCamera(pointerPosition, camera);
    const intersects = raycaster.intersectObjects(scene.children);

    camera.position.set(
        (startLon - currentLon) * 100000,
        0,
        (startLat - currentLat) * 100000
    );
    cameraXDiv.innerHTML = "camera x " + (startLat - currentLat) * 100000;
    cameraZDiv.innerHTML = "camera z " + (startLon - currentLon) * 100000;

    for (let i = 0; i < intersects.length; i++) {
        if (sceneCubes.includes(intersects[i].object.id)) {
            const deadCubeIndex = sceneCubes.findIndex(
                (elem) => elem == intersects[i].object.id
            );
            scene.remove(intersects[i].object);
            sceneCubes.splice(deadCubeIndex, 1);
            cubesDestroyed += 1;
            document.getElementById("info").innerText =
                "Cubes destroyed: " + cubesDestroyed;
        }
    }
    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = videoWidth / videoHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(videoWidth, videoHeight);
}
