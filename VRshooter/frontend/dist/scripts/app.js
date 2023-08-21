import*as THREE from"three";import{GLTFLoader}from"https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";import{DeviceOrientationControls}from"./DeviceOrientationControls.js";import{OBJLoader}from"https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/OBJLoader.js";let camera,scene,renderer,orientationControls,raycaster,pointerPosition,sceneCubes,cubesDestroyed,monsterMesh;sceneCubes=[],cubesDestroyed=0;const videoWidth=window.innerWidth,videoHeight=.7*window.innerHeight,startButton=document.getElementById("start-button"),startOverlay=document.getElementById("start-overlay");function handleInitClick(){setTimeout((()=>{startOverlay.remove()}),250),startVideo(),initLocation(),initScene(),initSlides(),initMonster(),animate()}function onWindowResize(){camera.aspect=videoWidth/videoHeight,camera.updateProjectionMatrix(),renderer.setSize(videoWidth,videoHeight)}function initSlides(){const e=document.getElementById("slide-GPS"),t=document.getElementById("gps-module-container");e.append(t);const o=document.getElementById("slide-Voice"),n=document.getElementById("voice-module-container");o.append(n);const i=document.getElementById("slide-Oscilloscope"),r=document.getElementById("oscilloscope-module-container");i.append(r);const a=document.getElementById("slide-EMF"),s=document.getElementById("emf-module-container");a.append(s);const c=document.getElementById("slide-Offering"),d=document.getElementById("offering-module-container");c.append(d);const l=document.getElementById("slide-Glyph"),m=document.getElementById("glyph-module-container");l.append(m)}function startVideo(){const e=document.getElementById("video");navigator.mediaDevices.getUserMedia({audio:!1,video:{facingMode:{exact:"environment"}}}).then((t=>{e.srcObject=t,e.play()})).catch((e=>{console.error("User denied the request to access the camera or environment camera not supported.",e)}))}function handleTouch(e){pointerPosition.x=e.touches[0].clientX/videoWidth*2-1,pointerPosition.y=-e.touches[0].clientY/videoHeight*2+1}function generateSplitRandomClamped(){const e=Math.floor(19*Math.random())+-10;return e>=-1?e+(e>=0?2:-2):e}function addOfferingOnClick(){if(sceneOfferingObjects.length<5){const e=new THREE.BoxGeometry(1,1,1),t=new THREE.MeshBasicMaterial({color:65280}),o=new THREE.Mesh(e,t);o.velocity=new THREE.Vector3(0,0,0);let n=generateSplitRandomClamped(),i=THREE.MathUtils.randFloat(0,5),r=generateSplitRandomClamped();o.position.set(n,i,r),sceneOfferingObjects.push(o),scene.add(o)}}startButton.addEventListener("click",handleInitClick);const maxX=10,maxY=3,maxZ=10,minX=-10,minY=0,minZ=-10;function getRandomPosition(){return{x:Math.floor(20*Math.random()-10),y:Math.floor(3*Math.random()+0),z:Math.floor(20*Math.random()-10)}}function moveObjectRandom(e){var t=getRandomPosition(),o=Math.floor(1e3*Math.random()+4e3),n=Math.floor(1e3*Math.random()+4e3);new TWEEN.Tween(e.position).to(t,o).easing(TWEEN.Easing.Quadratic.InOut).onComplete((function(){setTimeout((()=>{moveObjectRandom(e)}),`${n}`)})).start()}const listener=new THREE.AudioListener,audioObject=new THREE.PositionalAudio(listener),audioLoader=new THREE.AudioLoader,meshUrl="../assets/mesh/ghostie-retop.obj",loader=new OBJLoader;function initMonster(){loader.load(meshUrl,(e=>{const t=new THREE.MeshBasicMaterial({color:65280});e.children[0].material=t,monsterMesh=e.children[0],monsterMesh.scale.set(.2,.2,.2),monsterMesh.position.set(0,cameraHeight,-3),audioLoader.load(audioFileUrl,(e=>{console.log("Loaded audioBuffer:",e);audioContext.createBufferSource().buffer=e,audioObject.setBuffer(e),audioObject.setRefDistance(10),audioObject.setDistanceModel("linear"),audioObject.setRolloffFactor(1),audioObject.setVolume(0),audioObject.setLoop(!0),monsterMesh.add(audioObject),audioObject.play(),renderOscilloscope(e)})),scene.add(monsterMesh),moveObjectRandom(monsterMesh)}),void 0,(e=>{console.error("Error loading 3D model:",e)}))}function updateVolumeBasedOnProximity(e,t,o){if(!1===o)audioObject.setVolume(0);else{const o=e.position,n=t.position,i=o.distanceTo(n);audioObject.setVolume(1/i)}}function handleIntersectVibration(e){e.x<=1&&e.z}const cameraHeight=2;function initScene(){camera=new THREE.PerspectiveCamera(60,videoWidth/videoHeight,1,1100),camera.position.set(0,cameraHeight,0),camera.add(listener),orientationControls=new DeviceOrientationControls(camera),raycaster=new THREE.Raycaster,pointerPosition=new THREE.Vector2,scene=new THREE.Scene;const e=new THREE.BoxBufferGeometry(100,100,100,4,4,4),t=new THREE.MeshBasicMaterial({color:16711935,wireframe:!0}),o=new THREE.Mesh(e,t);scene.add(o);const n=new THREE.PlaneGeometry(10,10),i=new THREE.MeshBasicMaterial({color:65280}),r=new THREE.Mesh(n,i);r.rotation.x=-Math.PI/2,r.position.set(0,0,0),scene.add(r),renderer=new THREE.WebGLRenderer({antialias:!0,alpha:!0}),renderer.setPixelRatio(window.devicePixelRatio),renderer.setSize(videoWidth,videoHeight),document.body.appendChild(renderer.domElement),window.addEventListener("resize",onWindowResize,!1),window.addEventListener("touchstart",handleTouch)}function rotateCamera(){camera.rotation.y+=.001}const gravity=new THREE.Vector3(0,-.1,0);let initialVelocity,sceneOfferingObjects=[];const offeringDivs=document.getElementsByClassName("offering-item");let pressHold=1;function setHoldTimer(){return setInterval((function(){pressHold++}),600),!1}function shootObject(){const e=new THREE.SphereGeometry(.1,32,32),t=new THREE.MeshBasicMaterial({color:16711680}),o=new THREE.Mesh(e,t);o.position.set(0,10,0),o.velocity=new THREE.Vector3(0,0,0),o.displacement=new THREE.Vector3(0,0,0),o.speed=pressHold>10?10:pressHold,pressHold=1,o.direction=new THREE.Vector3,camera.getWorldDirection(o.direction),console.log("direction",o.direction),sceneOfferingObjects.push(o),scene.add(o)}Array.from(offeringDivs).forEach((e=>{e.addEventListener("touchstart",setHoldTimer)})),Array.from(offeringDivs).forEach((e=>{e.addEventListener("touchend",shootObject)}));let clock=new THREE.Clock;const direction=new THREE.Vector3(0,-10,-10);function animate(){window.requestAnimationFrame(animate),raycaster.setFromCamera(pointerPosition,camera);const e=raycaster.intersectObjects(scene.children);rotateCamera(),TWEEN.update(),monsterMesh&&monsterMesh.position&&updateVolumeBasedOnProximity(camera,monsterMesh,oscilloscopeActive);clock.getDelta();sceneOfferingObjects.forEach(((e,t)=>{e.position.y<.1&&(e.position.y=0,e.speed=0)}));for(let t=0;t<e.length;t++);renderer.render(scene,camera)}