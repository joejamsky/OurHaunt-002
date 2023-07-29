import * as THREE from 'three';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';
import { DeviceOrientationControls } from "./DeviceOrientationControls.js";
import { OBJLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/OBJLoader.js';


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

const startButton = document.getElementById("start-button");
const startOverlay = document.getElementById("start-overlay");

startButton.addEventListener("click", handleInitClick);

function handleInitClick() {
    setTimeout(() => {
        startOverlay.remove();
      }, 250);
    


    startVideo();
    initLocation();
    initScene();
    initSlides();
    initMonster();
    animate();
}

// Utilities
function onWindowResize() {
    camera.aspect = videoWidth / videoHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(videoWidth, videoHeight);
}


function initSlides() {
    const gpsDiv = document.getElementById('slide-GPS')
    const gpsModuleContainer = document.getElementById('gps-module-container')
    gpsDiv.append(gpsModuleContainer)

    const voiceDiv = document.getElementById('slide-Voice')
    const voiceModuleContainer = document.getElementById('voice-module-container')
    voiceDiv.append(voiceModuleContainer)

    const soundDiv = document.getElementById('slide-SS')
    const soundModuleContainer = document.getElementById('sound-module-container')
    soundDiv.append(soundModuleContainer)

    const emfDiv = document.getElementById('slide-EMF')
    const emfModuleContainer = document.getElementById('emf-module-container')
    emfDiv.append(emfModuleContainer)

    const offeringDiv = document.getElementById('slide-Offering')
    const offeringModuleContainer = document.getElementById('offering-module-container')
    offeringDiv.append(offeringModuleContainer)

    const glyphDiv = document.getElementById('slide-Glyph')
    const glyphModuleContainer = document.getElementById('glyph-module-container')
    glyphDiv.append(glyphModuleContainer)
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

const listener = new THREE.AudioListener();
const audioObject = new THREE.PositionalAudio(listener);        // Create a Three.js audio object

// The index runs the dist js files so use the dist asset folder when referencing files
const meshUrl = '../src/assets/mesh/ghostie-retop.obj'

const loader = new OBJLoader();

function initMonster() {
    loader.load(meshUrl,
        (gltf) => {
            // Model loaded successfully, add it to the scene

            // const monsterGeo = new THREE.BoxGeometry(1, 1, 1);
            const monsterMat = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
            // monsterMesh = new THREE.Mesh(monsterGeo, monsterMat);
            // monsterMesh.position.set(0, 1, -3);

            
            gltf.children[0].material = monsterMat;
            monsterMesh = gltf.children[0]
            monsterMesh.scale.set(0.2,0.2,0.2)
            monsterMesh.position.set(0,1,-3)


            const audioLoader = new THREE.AudioLoader();
            // const audioFileUrl = 'path/to/audio/file.mp3';

            audioLoader.load(audioFileUrl, (audioBuffer) => {

                const audioSource = audioContext.createBufferSource();
                audioSource.buffer = audioBuffer;
                
                audioObject.setBuffer(audioBuffer);
                audioObject.setRefDistance(10); // Set the reference distance for volume falloff
                audioObject.setDistanceModel('linear'); // Use linear distance model for volume
                audioObject.setRolloffFactor(1); // Set the rolloff factor for volume falloff

                // Attach the audio object to the desired object in the scene
                monsterMesh.add(audioObject);

                // Start playing the audio
                audioObject.play();
            });


            // scene.add(monsterMesh);



            scene.add( monsterMesh )
            moveObjectRandom(monsterMesh)

        },
        undefined,
        (error) => {
            console.error('Error loading 3D model:', error);
        }
    );




    
}


function updateVolumeBasedOnProximity(camera, monster) {
    const cameraPosition = camera.position;
    const monsterPosition = monster.position;

    // Calculate the distance between the camera and the object
    const distance = cameraPosition.distanceTo(monsterPosition);

    // Update the volume based on the distance
    audioObject.setVolume(1 / distance);
}
  



function handleIntersectVibration(mesh) {
    if (mesh.x <= 1 && mesh.z <= 1) {
        // navigator.vibrate(10);
    }
}



function initScene() {

    
    camera = new THREE.PerspectiveCamera(60, videoWidth / videoHeight, 1, 1100);
    camera.position.set(0,1,0)


    camera.add( listener );

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

    // TODO update so that the mesh is added to the scene before the animate function is fired so the animate function doesn't
    // throw an error when trying to run these other functions
    if(monsterMesh && monsterMesh.position){
        updateVolumeBasedOnProximity(camera, monsterMesh);
        handleIntersectVibration(monsterMesh.position)
    }
    

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