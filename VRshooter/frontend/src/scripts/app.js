import * as THREE from "./three.module.js";
import { DeviceOrientationControls } from "./DeviceOrientationControls.js";


let camera,
    scene,
    renderer,
    orientationControls,
    raycaster,
    pointerPosition,
    sceneCubes,
    cubesDestroyed,
    monsterMesh;
sceneCubes = [];
cubesDestroyed = 0;

const videoWidth = window.innerWidth;
const videoHeight = window.innerHeight * (70 / 100);

const startButton = document.getElementById("startButton");


startButton.addEventListener("click", handleInitClick);

function handleInitClick() {
    const overlay = document.getElementById("overlay");
    overlay.remove();

    startVideo();
    initLocation();
    initScene();
    initMonster();
    animate();
}

// Utilities
function onWindowResize() {
    camera.aspect = videoWidth / videoHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(videoWidth, videoHeight);
}

function startVideo() {
    const video = document.getElementById("video");
    const constraints = {
        audio: false,
        video: {
            facingMode: { exact: "environment" },
        },
    };

    navigator.mediaDevices
        .getUserMedia(constraints)
        .then((stream) => {
            // Attach the camera stream to the video element
            video.srcObject = stream;
            video.play();
        })
        .catch((error) => {
            // alert('User denied the request to access the camera or environment camera not supported.');
            console.error("User denied the request to access the camera or environment camera not supported.", error);
        });
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

const maxX = 10;
const maxY = 3;
const maxZ = 10;
const minX = -10;
const minY = 0;
const minZ = -10;

function getRandomPosition() {
    var x = Math.floor(Math.random() * (maxX - minX) + minX); 
    var y = Math.floor(Math.random() * (maxY - minY) + minY); 
    var z = Math.floor(Math.random() * (maxZ - minZ) + minZ);
    return { x: x, y: y, z: z };
}


function moveObjectRandom(mesh) {
    var targetPosition = getRandomPosition();
    var randomSpeed = Math.floor(Math.random() * (5000 - 4000) + 4000);
    var randomDelay = Math.floor(Math.random() * (5000 - 4000) + 4000);

    var tween = new TWEEN.Tween(mesh.position)
        .to(targetPosition, randomSpeed)                   //targetPosition, duration in milliseconds
        .easing(TWEEN.Easing.Quadratic.InOut)
        .onComplete(function () {
            // Animation completed, start a new motion
            setTimeout(() => {
                moveObjectRandom(mesh);
              }, `${randomDelay}`);
            
        })
        .start();


}

function initMonster() {
    const monsterGeo = new THREE.BoxGeometry(1, 1, 1);
    const monsterMat = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    monsterMesh = new THREE.Mesh(monsterGeo, monsterMat);


    monsterMesh.position.set(0, 1, -3);
    scene.add(monsterMesh);
    moveObjectRandom(monsterMesh)
}

function initScene() {

    camera = new THREE.PerspectiveCamera(60, videoWidth / videoHeight, 1, 1100);
    camera.position.set(0,1,0)

    orientationControls = new DeviceOrientationControls(camera);
    raycaster = new THREE.Raycaster();
    pointerPosition = new THREE.Vector2();
    scene = new THREE.Scene();

    // Debug
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
}





// Debug
function rotateCamera() {
    // Rotate the camera around its Y-axis
    camera.rotation.y += 0.01; // Adjust the rotation speed as needed
}

function animate(time) {
    window.requestAnimationFrame(animate);
    
    orientationControls.update();
    raycaster.setFromCamera(pointerPosition, camera);
    const sceneObjectIntersects = raycaster.intersectObjects(scene.children);
    // rotateCamera();     // This is for debug. Don't forget to comment out orientation controls.
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