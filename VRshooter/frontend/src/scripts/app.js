import * as THREE from "./three.module.js";
import { DeviceOrientationControls } from "./DeviceOrientationControls.js";

let camera,
    scene,
    renderer,
    orientationControls,
    raycaster,
    pointerPosition,
    sceneCubes,
    cubesDestroyed;
sceneCubes = [];
cubesDestroyed = 0;
// var monsterMesh

const startButton = document.getElementById("startButton");
const cameraXDiv = document.getElementById("camera-x");
const cameraZDiv = document.getElementById("camera-z");

const videoWidth = window.innerWidth;
const videoHeight = window.innerHeight * (70 / 100);

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


// Open full screen doesn't work on apple products
// function openFullscreen() {
//     var elem = document.documentElement;
//     if (elem.requestFullscreen) {
//         elem.requestFullscreen();
//     } else if (elem.webkitRequestFullscreen) {
//         /* Safari */
//         elem.webkitRequestFullscreen();
//     } else if (elem.msRequestFullscreen) {
//         /* IE11 */
//         elem.msRequestFullscreen();
//     }

//     screen.orientation.lock("landscape");
// }

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
    // if (sceneCubes.length < 5) {
    //     const geometry = new THREE.BoxGeometry(1, 1, 1);
    //     const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    //     const cube = new THREE.Mesh(geometry, material);
    //     let xPos = generateSplitRandomClamped();
    //     let yPos = THREE.MathUtils.randFloat(0, 5);
    //     let zPos = generateSplitRandomClamped();
    //     cube.position.set(xPos, yPos, zPos);
    //     scene.add(cube);
    //     sceneCubes.push(cube.id);
    // }

}

function getRandomPosition() {
    var x = Math.random();
    var y = 0; // Keep the vertical position constant
    var z = 0;
    return { x: x, y: y, z: z };
}

function moveObjectRandom(mesh) {
    var position = getRandomPosition();
    mesh.position.x = position.x;
    mesh.position.y = position.y;
    mesh.position.z = position.z;
}

function initMonster() {
    const monsterGeo = new THREE.BoxGeometry(1, 1, 1);
    const monsterMat = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const monsterMesh = new THREE.Mesh(monsterGeo, monsterMat);

    // let xPos = generateSplitRandomClamped();
    // let yPos = THREE.MathUtils.randFloat(0, 5);
    // let zPos = generateSplitRandomClamped();
    // monsterMesh.position.set(xPos, yPos, zPos);
    monsterMesh.position.set(1, 1, 1);
    scene.add(monsterMesh);
}

function init() {
    camera = new THREE.PerspectiveCamera(75, videoWidth / videoHeight, 1, 1100);

    orientationControls = new DeviceOrientationControls(camera);
    raycaster = new THREE.Raycaster();
    pointerPosition = new THREE.Vector2();

    scene = new THREE.Scene();

    // < Mesh for default room environment
    // const geometry = new THREE.SphereBufferGeometry(500, 60, 40);
    // invert the geometry on the x-axis so that all of the faces point inward
    // geometry.scale(-1, 1, 1);

    
    // const material = new THREE.MeshBasicMaterial({
    //     map: new THREE.TextureLoader().load(
    //         "./src/textures/2294472375_24a3b8ef46_o.jpg"
    //     ),
    // });

    // const mesh = new THREE.Mesh(geometry, material);
    // scene.add( mesh );
    // </ 

    // < Mesh for wireframe
    const helperGeometry = new THREE.BoxBufferGeometry(100, 100, 100, 4, 4, 4);
    const helperMaterial = new THREE.MeshBasicMaterial({
        color: 0xff00ff,
        wireframe: true,
    });
    const helper = new THREE.Mesh(helperGeometry, helperMaterial);
    scene.add(helper);
    // </ 


    // < Setup renderer
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(videoWidth, videoHeight);
    document.body.appendChild(renderer.domElement);
    // </


    
    window.addEventListener("resize", onWindowResize, false);   // Setup window resize

    window.addEventListener("touchstart", handleTouch);         // Setup screen tap

    // window.setInterval(function () {                            // Setup add items
    //     addItemTimed();
    // }, 1000);
    initMonster();
}

function animate() {
    window.requestAnimationFrame(animate);
    orientationControls.update();
    raycaster.setFromCamera(pointerPosition, camera);
    const sceneObjectIntersects = raycaster.intersectObjects(scene.children);
    // moveObjectRandom(monsterMesh);
    
    camera.position.set(
        (startLon - currentLon),    // z?
        0,                          // y
        (startLat - currentLat)     // x?
    );

    cameraXDiv.innerHTML = "camera x " + (startLat - currentLat);
    cameraZDiv.innerHTML = "camera z " + (startLon - currentLon);

    // Check if ray trace intersects any objects
    for (let i = 0; i < sceneObjectIntersects.length; i++) {


        // if (sceneCubes.includes(sceneObjectIntersects[i].object.id)) {
        //     const deadCubeIndex = sceneCubes.findIndex(
        //         (elem) => elem == sceneObjectIntersects[i].object.id
        //     );
        //     scene.remove(sceneObjectIntersects[i].object);
        //     sceneCubes.splice(deadCubeIndex, 1);
        //     cubesDestroyed += 1;
        //     document.getElementById("debug").innerText =
        //         "Cubes destroyed: " + cubesDestroyed;
        // }
    }
    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = videoWidth / videoHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(videoWidth, videoHeight);
}
