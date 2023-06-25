import*as THREE from"./three.module.js";import{DeviceOrientationControls}from"./DeviceOrientationControls.js";let camera,scene,renderer,orientationControls,raycaster,pointerPosition,sceneCubes,cubesDestroyed;var monsterMesh;sceneCubes=[],cubesDestroyed=0;const startButton=document.getElementById("startButton"),cameraXDiv=document.getElementById("camera-x"),cameraZDiv=document.getElementById("camera-z"),videoWidth=window.innerWidth,videoHeight=.7*window.innerHeight;function startVideo(){const e=document.getElementById("video");navigator.mediaDevices.getUserMedia({audio:!1,video:{facingMode:{exact:"environment"}}}).then((t=>{e.srcObject=t,e.play()})).catch((e=>{console.error("Unable to access the camera.",e)}))}function handleTouch(e){pointerPosition.x=e.touches[0].clientX/videoWidth*2-1,pointerPosition.y=-e.touches[0].clientY/videoHeight*2+1}function generateSplitRandomClamped(){const e=Math.floor(19*Math.random())+-10;return e>=-1?e+(e>=0?2:-2):e}function addItemTimed(){}function getRandomPosition(){return{x:Math.random(),y:0,z:0}}function moveObjectRandom(e){var t=getRandomPosition();e.position.x=t.x,e.position.y=t.y,e.position.z=t.z}function initMonster(){const e=new THREE.BoxGeometry(1,1,1),t=new THREE.MeshBasicMaterial({color:65280});(monsterMesh=new THREE.Mesh(e,t)).position.set(0,0,0),scene.add(monsterMesh)}function init(){camera=new THREE.PerspectiveCamera(75,videoWidth/videoHeight,1,1100),orientationControls=new DeviceOrientationControls(camera),raycaster=new THREE.Raycaster,pointerPosition=new THREE.Vector2,scene=new THREE.Scene;new THREE.SphereBufferGeometry(500,60,40).scale(-1,1,1);const e=new THREE.BoxBufferGeometry(100,100,100,4,4,4),t=new THREE.MeshBasicMaterial({color:16711935,wireframe:!0}),n=new THREE.Mesh(e,t);scene.add(n),renderer=new THREE.WebGLRenderer({antialias:!0,alpha:!0}),renderer.setPixelRatio(window.devicePixelRatio),renderer.setSize(videoWidth,videoHeight),document.body.appendChild(renderer.domElement),window.addEventListener("resize",onWindowResize,!1),window.addEventListener("touchstart",handleTouch),initMonster()}function animate(){window.requestAnimationFrame(animate),orientationControls.update(),raycaster.setFromCamera(pointerPosition,camera);const e=raycaster.intersectObjects(scene.children);camera.position.set(startLon-currentLon,0,startLat-currentLat),cameraXDiv.innerHTML="camera x "+(startLat-currentLat),cameraZDiv.innerHTML="camera z "+(startLon-currentLon);for(let t=0;t<e.length;t++);renderer.render(scene,camera)}function onWindowResize(){camera.aspect=videoWidth/videoHeight,camera.updateProjectionMatrix(),renderer.setSize(videoWidth,videoHeight)}startButton.addEventListener("click",(function(){document.getElementById("overlay").remove(),startVideo(),initLocation(),init(),animate()}),!1);