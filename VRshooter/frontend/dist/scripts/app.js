import*as THREE from"./three.module.js";import{DeviceOrientationControls}from"./DeviceOrientationControls.js";let camera,scene,renderer,orientationControls,raycaster,pointerPosition,sceneCubes,cubesDestroyed;var monsterMesh;sceneCubes=[],cubesDestroyed=0;const startButton=document.getElementById("startButton"),cameraXDiv=document.getElementById("camera-x"),cameraZDiv=document.getElementById("camera-z"),videoWidth=window.innerWidth,videoHeight=.7*window.innerHeight;function startVideo(){const e=document.getElementById("video");navigator.mediaDevices.getUserMedia({audio:!1,video:{facingMode:{exact:"environment"}}}).then((t=>{e.srcObject=t,e.play()})).catch((e=>{console.error("Unable to access the camera.",e)}))}function handleTouch(e){pointerPosition.x=e.touches[0].clientX/videoWidth*2-1,pointerPosition.y=-e.touches[0].clientY/videoHeight*2+1}function generateSplitRandomClamped(){const e=Math.floor(19*Math.random())+-10;return e>=-1?e+(e>=0?2:-2):e}function addItemTimed(){}function getRandomPosition(e){return{x:e.position.x,y:Math.floor(4*Math.random()+0),z:e.position.z}}function moveObjectRandom(e){var t=getRandomPosition(e);new TWEEN.Tween(e.position).to(t,2e3).easing(TWEEN.Easing.Quadratic.InOut).onComplete((function(){moveObjectRandom(e)})).start()}function initMonster(){const e=new THREE.BoxGeometry(1,1,1),t=new THREE.MeshBasicMaterial({color:65280});(monsterMesh=new THREE.Mesh(e,t)).position.set(0,1,-3),scene.add(monsterMesh),moveObjectRandom(monsterMesh)}function rotateCamera(){camera.rotation.y+=.01}function init(){camera=new THREE.PerspectiveCamera(75,videoWidth/videoHeight,1,1100),camera.position.set(0,1,0),orientationControls=new DeviceOrientationControls(camera),raycaster=new THREE.Raycaster,pointerPosition=new THREE.Vector2,scene=new THREE.Scene;const e=new THREE.BoxBufferGeometry(100,100,100,4,4,4),t=new THREE.MeshBasicMaterial({color:16711935,wireframe:!0}),n=new THREE.Mesh(e,t);scene.add(n),renderer=new THREE.WebGLRenderer({antialias:!0,alpha:!0}),renderer.setPixelRatio(window.devicePixelRatio),renderer.setSize(videoWidth,videoHeight),document.body.appendChild(renderer.domElement),window.addEventListener("resize",onWindowResize,!1),window.addEventListener("touchstart",handleTouch),initMonster()}startButton.addEventListener("click",(function(){document.getElementById("overlay").remove(),startVideo(),initLocation(),init(),animate()}),!1);const planeWidth=100,planeHeight=100;function animate(){window.requestAnimationFrame(animate),orientationControls.update(),raycaster.setFromCamera(pointerPosition,camera);const e=raycaster.intersectObjects(scene.children);if(TWEEN.update(),startLat&&startLon){var t=distanceFromHotspotLon,n=distanceFromHotspotLat;camera.position.set(t,1,n),cameraXDiv.innerHTML="camera x "+distanceFromHotspotLon,cameraZDiv.innerHTML="camera z "+distanceFromHotspotLat}for(let t=0;t<e.length;t++);renderer.render(scene,camera)}function onWindowResize(){camera.aspect=videoWidth/videoHeight,camera.updateProjectionMatrix(),renderer.setSize(videoWidth,videoHeight)}