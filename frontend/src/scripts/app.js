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

// Function to calculate dimensions based on orientation
function calculateDimensions() {
    let isLandscape = window.innerWidth > window.innerHeight;
    if (isLandscape) {
        // Landscape mode: 60% of width
        globalWidth = window.innerWidth * 0.5;
        globalHeight = window.innerHeight;
    } else {
        // Portrait mode: 60% of height
        globalWidth = window.innerWidth;
        globalHeight = window.innerHeight * 0.6;
    }
}
// Global variables for width and height, initialized based on orientation
let globalWidth, globalHeight;

const startButton = document.getElementById("start-button");
const startOverlay = document.getElementById("start-overlay");
const closeTutorial = document.getElementById("close-tutorial");
closeTutorial.addEventListener("click", handleCloseTutorial);

function handleCloseTutorial() {
    setTimeout(() => {
        $("#tutorial").hide()
    }, 250);
  
}

startButton.addEventListener("click", handleInitClick);

function handleInitClick() {
    setTimeout(() => {
        startOverlay.remove();
        $("#tutorial").css("display", "flex");
      }, 250);
    

    calculateDimensions();
    startVideo();
    initScene();
    initSlides();
    initMonster();
    // initModels();
    initRadio();
    animate();
}

// Utilities
function onWindowResize() {
    // Update dimensions based on new orientation
    calculateDimensions();

    // Update the renderer and camera
    renderer.setSize(globalWidth, globalHeight);
    camera.aspect = globalWidth / globalHeight;
    camera.updateProjectionMatrix();
}


function initSlides() {
    const motionDiv = document.getElementById('slide-motion')
    const motionModuleContainer = document.getElementById('motion-module-container')
    motionDiv.append(motionModuleContainer)

    const voiceDiv = document.getElementById('slide-voice')
    const voiceModuleContainer = document.getElementById('voice-module-container')
    voiceDiv.append(voiceModuleContainer)

    const radioDiv = document.getElementById('slide-radio')
    const radioModuleContainer = document.getElementById('radio-module-container')
    radioDiv.append(radioModuleContainer)

    const emfDiv = document.getElementById('slide-emf')
    const emfModuleContainer = document.getElementById('emf-module-container')
    emfDiv.append(emfModuleContainer)

    // const offeringDiv = document.getElementById('slide-Offering')
    // const offeringModuleContainer = document.getElementById('offering-module-container')
    // offeringDiv.append(offeringModuleContainer)

    const portalDiv = document.getElementById('slide-portal')
    const portalModuleContainer = document.getElementById('portal-module-container')
    portalDiv.append(portalModuleContainer)

    // const tempDiv = document.getElementById('slide-Temp')
    // const tempModuleContainer = document.getElementById('temperature-module-container')
    // tempDiv.append(tempModuleContainer)

    const judgementDiv = document.getElementById('slide-judgement')
    const judgementModuleContainer = document.getElementById('judgement-module-container')
    judgementDiv.append(judgementModuleContainer)

    const filterDiv = document.getElementById('slide-filter')
    const filterModuleContainer = document.getElementById('filter-module-container')
    filterDiv.append(filterModuleContainer)
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
    pointerPosition.x = (e.touches[0].clientX / globalWidth) * 2 - 1;
    pointerPosition.y = -(e.touches[0].clientY / globalHeight) * 2 + 1;
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




function addOfferingOnClick() {
    if (sceneOfferingObjects.length < 5) {
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
        const cube = new THREE.Mesh(geometry, material);
        cube.velocity = new THREE.Vector3(0, 0, 0);
        let xPos = generateSplitRandomClamped();
        let yPos = THREE.MathUtils.randFloat(0, 5);
        let zPos = generateSplitRandomClamped();
        cube.position.set(xPos, yPos, zPos);
        sceneOfferingObjects.push(cube);
        scene.add(cube);
    }

}

const maxX = 8;
const maxY = 10;
const maxZ = 8;
const minX = -8;
const minY = 1;
const minZ = -8;

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
const audioLoader = new THREE.AudioLoader();

// The index runs the dist js files so use the dist asset folder when referencing files
const meshUrl = '../src/assets/meshes/ghostie-retop.obj'


const loader = new OBJLoader();

// Figure this out later. Need to figure out how to load multiple models
// const modelPaths = ['../src/assets/meshes/candle.obj']
// function loadModel(modelPath) {
//     return new Promise((resolve, reject) => {
//         // const loader = new THREE.GLTFLoader(); // Double loader. Not sure why this is needed.
//         loader.load(modelPath, (gltf) => {
//             resolve(gltf.scene);
//         }, undefined, (error) => {
//             reject(error);
//         });
//     });
// }

// const loadModelPromises = modelPaths.map(loadModel);


// function initModels(){

//     Promise.all(loadModelPromises)
//     .then((models) => {
//         // All models are loaded successfully, you can now add them to your scene.
//         models.forEach((model, index) => {
//             // Position, scale, or manipulate the loaded models as needed.
//             model.position.set(index * 2, 0, 0); // Example: Position models side by side
//             scene.add(model);
//         });
//     })
//     .catch((error) => {
//         console.error('Error loading models:', error);
//     });
// }


function initMonster() {
    loader.load(meshUrl,
        (gltf) => {
            // Model loaded successfully, add it to the scene

            // const monsterGeo = new THREE.BoxGeometry(1, 1, 1);
            const monsterMat = new THREE.MeshStandardMaterial({ color: 0xffffff, flatShading: true });
            // monsterMesh = new THREE.Mesh(monsterGeo, monsterMat);
            // monsterMesh.position.set(0, 1, -3);

            
            gltf.children[0].material = monsterMat;
            monsterMesh = gltf.children[0]
            monsterMesh.scale.set(0.2,0.2,0.2)
            monsterMesh.position.set(0,cameraHeight,-3)
            monsterMesh.visible = false;


            // const audioFileUrl = 'path/to/audio/file.mp3';

            audioLoader.load(audioFileUrl, (audioBuffer) => {

                // console.log('Loaded audioBuffer:', audioBuffer);

                const audioSource = audioContext.createBufferSource();
                audioSource.buffer = audioBuffer;

                audioObject.setBuffer(audioBuffer);
                audioObject.setRefDistance(10); // Set the reference distance for volume falloff
                audioObject.setDistanceModel('linear'); // Use linear distance model for volume
                audioObject.setRolloffFactor(1); // Set the rolloff factor for volume falloff
                audioObject.setVolume(0)  //0 to 1 for volume
                audioObject.setLoop(true);
                
                
                // Attach the audio object to the desired object in the scene
                monsterMesh.add(audioObject);
                audioObject.play();

                renderRadio(audioBuffer)

            });

            scene.add( monsterMesh )
            moveObjectRandom(monsterMesh)

        },
        undefined,
        (error) => {
            console.error('Error loading 3D model:', error);
        }
    );
}


function updateVolumeBasedOnProximity(camera, monster, active) {
    if(active === false){
        audioObject.setVolume(0)
    } else {
        const cameraPosition = camera.position;
        const monsterPosition = monster.position;
    
        // Calculate the distance between the camera and the object
        const distance = cameraPosition.distanceTo(monsterPosition);
    
        // Update the volume based on the distance
        audioObject.setVolume(1 / distance);
    }
}

function handleIntersectVibration(mesh) {
    if (mesh.x <= 1 && mesh.z <= 1) {
        // navigator.vibrate(10);
    }
}

const texturesFiles = [ 
    '../src/assets/textures/portal/blood-glyph.png',
    '../src/assets/textures/portal/elemental-glyph.png',
    '../src/assets/textures/portal/floral-glyph.png',
    '../src/assets/textures/portal/pentagram.png',
    '../src/assets/textures/portal/runic-glyph.png',
    '../src/assets/textures/portal/salt-glyph.png',
    '../src/assets/textures/portal/sigil-glyph.png'
]
const textures = []

function swapTexture (index, toggle) {
    // get the ground mesh
    const ground = scene.getObjectByName('Ground');
    // swap in the new texture
    ground.material.opacity = toggle ? 1 : 0;
    ground.material.map = textures[index];
    ground.material.needsUpdate = true;
}

export { swapTexture }

const cameraHeight = 10;

function initScene() {
    camera = new THREE.PerspectiveCamera(60, globalWidth / globalHeight, 1, 1100);
    camera.position.set(0,cameraHeight,0)


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
    // const monsterGeo = new THREE.BoxGeometry(1, 1, 1);

    


    texturesFiles.forEach(textureFile => {
        const textureLoader = new THREE.TextureLoader();
        const texture = textureLoader.load(textureFile);
        textures.push(texture)
    })

    const groundGeometry = new THREE.PlaneGeometry(10, 10); // Width and height of the ground
    const groundMaterial = new THREE.MeshStandardMaterial({ transparent: true, opacity: 0 });
   


    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.name = 'Ground'

    // Rotate the ground to be horizontal
    ground.rotation.x = -Math.PI / 2;
    ground.position.set(0,0,-3)
    
    // Add the ground to the scene
    scene.add(ground);

    const candleGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.5, 32);

    const ambLight = new THREE.AmbientLight( 0xffffff, 0.5 ); // soft white light
    // const ambLight = new THREE.AmbientLight( 0xffffff, 0.02 ); // soft white light
    scene.add( ambLight );
    const dirLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
    dirLight.position.set(0.1, -1, 0.1); 
    // dirLight.target.position.set(0, -10, 0);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;

    scene.add( dirLight );


    // < Setup renderer
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(globalWidth, globalHeight);
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



const gravity = new THREE.Vector3(0, -0.1, 0);
let sceneOfferingObjects = []
let initialVelocity 

const offeringDivs = document.getElementsByClassName('offering-item')

let pressHold = 1;
Array.from(offeringDivs).forEach(offeringDiv => {
    offeringDiv.addEventListener('touchstart', setHoldTimer)
    // offeringDiv.addEventListener('mousedown', setHoldTimer)
});

Array.from(offeringDivs).forEach(offeringDiv => {
    offeringDiv.addEventListener('touchend', shootObject)
    // offeringDiv.addEventListener('mouseup', shootObject)
});

function setHoldTimer(){
    setInterval(function(){
        pressHold++;
    }, 600);

    return false;
}

function shootObject() {
    
    const geometry = new THREE.SphereGeometry(0.1, 32, 32);
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const shootObject = new THREE.Mesh(geometry, material);
    shootObject.position.set(0, 10, 0);
    shootObject.velocity = new THREE.Vector3(0, 0, 0);
    shootObject.displacement = new THREE.Vector3(0,0,0);

    if(pressHold > 10){
        shootObject.speed = 10;
    } else {
        shootObject.speed = pressHold;
    }
    pressHold = 1
    shootObject.direction = new THREE.Vector3();
    camera.getWorldDirection(shootObject.direction);


    sceneOfferingObjects.push(shootObject);

    scene.add(shootObject);
    // const cameraDirection = new THREE.Vector3();
    // const gravity = new THREE.Vector3(0,-1,0)
    // camera.getWorldDirection(cameraDirection);
    // const combined = new THREE.Vector3();
    // console.log('camerad', cameraDirection.clone())

    // combined.addVectors(cameraDirection, gravity)
    // initialVelocity = combined.clone();
}

let clock = new THREE.Clock();
// let speed = 1;
const direction = new THREE.Vector3(0,-10,-10);
// const velocity = new THREE.Vector3();


let wasVisible = true; // Initialize a variable to track the previous state

function toggleVisibility() {
    if (filterBool !== wasVisible) { // Check if the boolean has changed
        monsterMesh.visible = filterBool; // Set the visibility of the mesh based on the boolean
        wasVisible = filterBool; // Update the previous state
        // const startButton = document.getElementById("ghost-visible");
        // startButton.innerHTML = "Ghost Visible: " + filterBool
    }
}

function animate() {
    window.requestAnimationFrame(animate);
    
    orientationControls.update();
    raycaster.setFromCamera(pointerPosition, camera);
    const sceneObjectIntersects = raycaster.intersectObjects(scene.children);
    // rotateCamera();     // This is for debug. Don't forget to comment out orientation controls.
    TWEEN.update();
    
    // TODO update so that the mesh is added to the scene before the animate function is fired so the animate function doesn't
    // throw an error when trying to run these other functions
    if(monsterMesh && monsterMesh.position){
        updateVolumeBasedOnProximity(camera, monsterMesh, radioActive);
        updatePip(monsterMesh.position)
        updateTrackerRotation(THREE.Math.radToDeg(camera.rotation.y))
        // handleIntersectVibration(monsterMesh.position)
        toggleVisibility()
    }
    
    const delta = clock.getDelta();

    
    sceneOfferingObjects.forEach((object, i) => {
        // object.speed -= 0.2 * delta;
        // object.speed = Math.max(object.speed, 0)
        // object.velocity.copy(object.direction).multiplyScalar(object.speed)
        // object.displacement.copy(object.velocity).multiplyScalar(delta)
        // // console.log('position', object.position)
        // // console.log('displacement', object.displacement)
        // // console.log('speed',  object.speed)
        // object.position.add(object.displacement);

        // const displacement = initialVelocity.clone().multiplyScalar(time).add(gravity.clone().multiplyScalar(0.5 * time * time));
        // ball.position.copy(displacement);

        // Apply floor constraint
        if (object.position.y < 0.1) {
            object.position.y = 0;
            object.speed = 0
        }
    });

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