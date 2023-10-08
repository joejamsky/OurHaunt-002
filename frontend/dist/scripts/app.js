import*as THREE from"three";import{GLTFLoader}from"https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";import{DeviceOrientationControls}from"./DeviceOrientationControls.js";import{OBJLoader}from"https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/OBJLoader.js";let camera,scene,renderer,orientationControls,raycaster,pointerPosition,sceneCubes,cubesDestroyed,monsterMesh;sceneCubes=[],cubesDestroyed=0;const videoWidth=window.innerWidth,videoHeight=.7*window.innerHeight,startButton=document.getElementById("start-button"),startOverlay=document.getElementById("start-overlay");function handleInitClick(){setTimeout((()=>{startOverlay.remove()}),250),startVideo(),initScene(),initSlides(),initMonster(),initRadio(),animate()}function onWindowResize(){camera.aspect=videoWidth/videoHeight,camera.updateProjectionMatrix(),renderer.setSize(videoWidth,videoHeight)}function initSlides(){const e=document.getElementById("slide-motion"),t=document.getElementById("motion-module-container");e.append(t);const o=document.getElementById("slide-voice"),n=document.getElementById("voice-module-container");o.append(n);const i=document.getElementById("slide-radio"),a=document.getElementById("radio-module-container");i.append(a);const r=document.getElementById("slide-emf"),s=document.getElementById("emf-module-container");r.append(s);const d=document.getElementById("slide-portal"),c=document.getElementById("portal-module-container");d.append(c);const l=document.getElementById("slide-judgement"),m=document.getElementById("judgement-module-container");l.append(m);const u=document.getElementById("slide-filter"),p=document.getElementById("filter-module-container");u.append(p)}function startVideo(){const e=document.getElementById("video");navigator.mediaDevices.getUserMedia({audio:!1,video:{facingMode:{exact:"environment"}}}).then((t=>{e.srcObject=t,e.play()})).catch((e=>{console.error("User denied the request to access the camera or environment camera not supported.",e)}))}function handleTouch(e){pointerPosition.x=e.touches[0].clientX/videoWidth*2-1,pointerPosition.y=-e.touches[0].clientY/videoHeight*2+1}function generateSplitRandomClamped(){const e=Math.floor(19*Math.random())+-10;return e>=-1?e+(e>=0?2:-2):e}function addOfferingOnClick(){if(sceneOfferingObjects.length<5){const e=new THREE.BoxGeometry(1,1,1),t=new THREE.MeshBasicMaterial({color:16777215}),o=new THREE.Mesh(e,t);o.velocity=new THREE.Vector3(0,0,0);let n=generateSplitRandomClamped(),i=THREE.MathUtils.randFloat(0,5),a=generateSplitRandomClamped();o.position.set(n,i,a),sceneOfferingObjects.push(o),scene.add(o)}}startButton.addEventListener("click",handleInitClick);const maxX=8,maxY=10,maxZ=8,minX=-8,minY=1,minZ=-8;function getRandomPosition(){return{x:Math.floor(16*Math.random()-8),y:Math.floor(9*Math.random()+1),z:Math.floor(16*Math.random()-8)}}function moveObjectRandom(e){var t=getRandomPosition(),o=Math.floor(1e3*Math.random()+4e3),n=Math.floor(1e3*Math.random()+4e3);new TWEEN.Tween(e.position).to(t,o).easing(TWEEN.Easing.Quadratic.InOut).onComplete((function(){setTimeout((()=>{moveObjectRandom(e)}),`${n}`)})).start()}const listener=new THREE.AudioListener,audioObject=new THREE.PositionalAudio(listener),audioLoader=new THREE.AudioLoader,meshUrl="../assets/meshes/ghostie-retop.obj",loader=new OBJLoader;function initMonster(){loader.load(meshUrl,(e=>{const t=new THREE.MeshStandardMaterial({color:16777215,flatShading:!0});e.children[0].material=t,monsterMesh=e.children[0],monsterMesh.scale.set(.2,.2,.2),monsterMesh.position.set(0,cameraHeight,-3),monsterMesh.visible=!0,audioLoader.load(audioFileUrl,(e=>{audioContext.createBufferSource().buffer=e,audioObject.setBuffer(e),audioObject.setRefDistance(10),audioObject.setDistanceModel("linear"),audioObject.setRolloffFactor(1),audioObject.setVolume(0),audioObject.setLoop(!0),monsterMesh.add(audioObject),audioObject.play(),renderRadio(e)})),scene.add(monsterMesh),moveObjectRandom(monsterMesh)}),void 0,(e=>{console.error("Error loading 3D model:",e)}))}function updateVolumeBasedOnProximity(e,t,o){if(!1===o)audioObject.setVolume(0);else{const o=e.position,n=t.position,i=o.distanceTo(n);audioObject.setVolume(1/i)}}function handleIntersectVibration(e){e.x<=1&&e.z}zPositionSlider.addEventListener("input",(()=>{const e=scene.getObjectByName("Ground"),t=parseFloat(zPositionSlider.value);e.position.z=t})),yPositionSlider.addEventListener("input",(()=>{const e=scene.getObjectByName("Ground"),t=parseFloat(yPositionSlider.value);e.position.y=t})),fovSlider.addEventListener("input",(()=>{const e=parseFloat(fovSlider.value);camera.fov=e,camera.updateProjectionMatrix()}));const texturesFiles=["../assets/textures/portal/blood-glyph.png","../assets/textures/portal/elemental-glyph.png","../assets/textures/portal/floral-glyph.png","../assets/textures/portal/pentagram.png","../assets/textures/portal/runic-glyph.png","../assets/textures/portal/salt-glyph.png","../assets/textures/portal/sigil-glyph.png"],textures=[];function swapTexture(e,t){const o=scene.getObjectByName("Ground");o.material.opacity=t?1:0,o.material.map=textures[e],o.material.needsUpdate=!0}export{swapTexture};const cameraHeight=10;function initScene(){camera=new THREE.PerspectiveCamera(60,videoWidth/videoHeight,1,1100),camera.position.set(0,cameraHeight,0),camera.add(listener),orientationControls=new DeviceOrientationControls(camera),raycaster=new THREE.Raycaster,pointerPosition=new THREE.Vector2,scene=new THREE.Scene;const e=new THREE.BoxBufferGeometry(100,100,100,4,4,4),t=new THREE.MeshBasicMaterial({color:16711935,wireframe:!0});new THREE.Mesh(e,t);texturesFiles.forEach((e=>{const t=(new THREE.TextureLoader).load(e);textures.push(t)}));const o=new THREE.PlaneGeometry(10,10),n=new THREE.MeshStandardMaterial({transparent:!0,opacity:0}),i=new THREE.Mesh(o,n);i.name="Ground",i.rotation.x=-Math.PI/2,i.position.set(0,0,-3),scene.add(i);new THREE.CylinderGeometry(.1,.1,.5,32);const a=new THREE.AmbientLight(16777215,.5);scene.add(a);const r=new THREE.DirectionalLight(16777215,.5);r.position.set(.1,-1,.1),r.castShadow=!0,r.shadow.mapSize.width=1024,r.shadow.mapSize.height=1024,scene.add(r),renderer=new THREE.WebGLRenderer({antialias:!0,alpha:!0}),renderer.setPixelRatio(window.devicePixelRatio),renderer.setSize(videoWidth,videoHeight),document.body.appendChild(renderer.domElement),window.addEventListener("resize",onWindowResize,!1),window.addEventListener("touchstart",handleTouch)}function rotateCamera(){camera.rotation.y+=.01}const gravity=new THREE.Vector3(0,-.1,0);let initialVelocity,sceneOfferingObjects=[];const offeringDivs=document.getElementsByClassName("offering-item");let pressHold=1;function setHoldTimer(){return setInterval((function(){pressHold++}),600),!1}function shootObject(){const e=new THREE.SphereGeometry(.1,32,32),t=new THREE.MeshBasicMaterial({color:16711680}),o=new THREE.Mesh(e,t);o.position.set(0,10,0),o.velocity=new THREE.Vector3(0,0,0),o.displacement=new THREE.Vector3(0,0,0),o.speed=pressHold>10?10:pressHold,pressHold=1,o.direction=new THREE.Vector3,camera.getWorldDirection(o.direction),sceneOfferingObjects.push(o),scene.add(o)}Array.from(offeringDivs).forEach((e=>{e.addEventListener("touchstart",setHoldTimer)})),Array.from(offeringDivs).forEach((e=>{e.addEventListener("touchend",shootObject)}));let clock=new THREE.Clock;const direction=new THREE.Vector3(0,-10,-10);let wasVisible=!0;function toggleVisibility(){filterBool!==wasVisible&&(monsterMesh.visible=filterBool,wasVisible=filterBool)}function animate(){window.requestAnimationFrame(animate),orientationControls.update(),raycaster.setFromCamera(pointerPosition,camera);const e=raycaster.intersectObjects(scene.children);TWEEN.update(),monsterMesh&&monsterMesh.position&&(updateVolumeBasedOnProximity(camera,monsterMesh,radioActive),updatePip(monsterMesh.position),updateTrackerRotation(THREE.Math.radToDeg(camera.rotation.y)),toggleVisibility());clock.getDelta();sceneOfferingObjects.forEach(((e,t)=>{e.position.y<.1&&(e.position.y=0,e.speed=0)}));for(let t=0;t<e.length;t++);renderer.render(scene,camera)}