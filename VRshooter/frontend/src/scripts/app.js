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
var monsterMesh

const startButton = document.getElementById("startButton");

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
        initScene();
        initMonster();
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

function getRandomPosition(mesh) {
    var x = mesh.position.x
    var y = Math.floor(Math.random() * (3 - 0 + 1) + 0); 
    var z = mesh.position.z;
    return { x: x, y: y, z: z };
}

function moveObjectRandom(mesh) {
    var targetPosition = getRandomPosition(mesh);
    // var targetPosition = {x: 2, y: 1, z: -3}
    var tween = new TWEEN.Tween(mesh.position)
        .to(targetPosition, 2000)                   //targetPosition, duration in milliseconds
        .easing(TWEEN.Easing.Quadratic.InOut)       
        .onComplete(function () {
            // Animation completed, start a new motion
            moveObjectRandom(mesh);
        })
        .start();


}

function initMonster() {
    const monsterGeo = new THREE.BoxGeometry(1, 1, 1);
    const monsterMat = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    monsterMesh = new THREE.Mesh(monsterGeo, monsterMat);

    // let xPos = generateSplitRandomClamped();
    // let yPos = THREE.MathUtils.randFloat(0, 5);
    // let zPos = generateSplitRandomClamped();
    // monsterMesh.position.set(xPos, yPos, zPos);
    monsterMesh.position.set(0, 1, -3);
    scene.add(monsterMesh);
    moveObjectRandom(monsterMesh)
}

function rotateCamera() {
    // Rotate the camera around its Y-axis
    camera.rotation.y += 0.01; // Adjust the rotation speed as needed
}

let heading


function handleOrientation(event) {
    if (event.webkitCompassHeading) {
      // Some devices provide the compass heading directly
      heading = event.webkitCompassHeading;
      // Use the compass heading value
      // (0 degrees represents magnetic north, rotating clockwise)
      // ...
    } else if (event.alpha !== null) {
      // For other devices, calculate the compass heading
      heading = 360 - event.alpha;
      // Use the calculated heading value
      // (0 degrees represents true north, rotating clockwise)
      // ...
    }
    // ...
}

function startCompassListener() {
    if (window.DeviceOrientationEvent) {
        window.addEventListener('deviceorientation', handleOrientation, false);
      } else {
        console.warn("DeviceOrientation API not supported");
    }
}

function onWindowResize() {
    camera.aspect = videoWidth / videoHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(videoWidth, videoHeight);
}


function initScene() {

    camera = new THREE.PerspectiveCamera(75, videoWidth / videoHeight, 1, 1100);
    camera.position.set(0,1,0)


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
    const helperGeometry = new THREE.BoxBufferGeometry(100, 100, 100, 4, 4, 4);     //BoxGeometry(width, height, depth, widthSegments, heightSegments, depthSegments)
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

    window.setInterval(function () {                            // Setup add items
        // addItemTimed();
        startCompassListener();
        scene.rotation.set(0, heading, 0);
    }, 4000);
}


function animate() {
    window.requestAnimationFrame(animate);
    
    orientationControls.update();
    raycaster.setFromCamera(pointerPosition, camera);
    const sceneObjectIntersects = raycaster.intersectObjects(scene.children);
    // rotateCamera();     // This is for debug
    TWEEN.update();


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