import*as THREE from"./three.module.js";import{DeviceOrientationControls}from"./DeviceOrientationControls.js";let camera,scene,renderer,orientationControls,raycaster,pointerPosition,sceneCubes,cubesDestroyed,monsterMesh;sceneCubes=[],cubesDestroyed=0;const videoWidth=window.innerWidth,videoHeight=.7*window.innerHeight,startButton=document.getElementById("start-button"),startOverlay=document.getElementById("start-overlay");function handleInitClick(){setTimeout((()=>{startOverlay.remove()}),250),startVideo(),initLocation(),initScene(),initSlides(),initMonster(),animate()}function onWindowResize(){camera.aspect=videoWidth/videoHeight,camera.updateProjectionMatrix(),renderer.setSize(videoWidth,videoHeight)}function initSlides(){const e=document.getElementById("slide-GPS"),t=document.getElementById("gps-module-container");e.append(t);const n=document.getElementById("slide-Voice"),o=document.getElementById("voice-module-container");n.append(o);const i=document.getElementById("slide-SS"),r=document.getElementById("sound-module-container");i.append(r)}function startVideo(){const e=document.getElementById("video");navigator.mediaDevices.getUserMedia({audio:!1,video:{facingMode:{exact:"environment"}}}).then((t=>{e.srcObject=t,e.play()})).catch((e=>{console.error("User denied the request to access the camera or environment camera not supported.",e)}))}function handleTouch(e){pointerPosition.x=e.touches[0].clientX/videoWidth*2-1,pointerPosition.y=-e.touches[0].clientY/videoHeight*2+1}function generateSplitRandomClamped(){const e=Math.floor(19*Math.random())+-10;return e>=-1?e+(e>=0?2:-2):e}function addItemTimed(){}startButton.addEventListener("click",handleInitClick);const maxX=10,maxY=3,maxZ=10,minX=-10,minY=0,minZ=-10;function getRandomPosition(){return{x:Math.floor(20*Math.random()-10),y:Math.floor(3*Math.random()+0),z:Math.floor(20*Math.random()-10)}}function moveObjectRandom(e){var t=getRandomPosition(),n=Math.floor(1e3*Math.random()+4e3),o=Math.floor(1e3*Math.random()+4e3);new TWEEN.Tween(e.position).to(t,n).easing(TWEEN.Easing.Quadratic.InOut).onComplete((function(){setTimeout((()=>{moveObjectRandom(e)}),`${o}`)})).start()}function initMonster(){const e=new THREE.BoxGeometry(1,1,1),t=new THREE.MeshBasicMaterial({color:65280});monsterMesh=new THREE.Mesh(e,t),monsterMesh.position.set(0,1,-3),scene.add(monsterMesh),moveObjectRandom(monsterMesh)}function handleIntersectVibration(e){e.x<=1&&e.z<=1&&navigator.vibrate(10)}function initScene(){camera=new THREE.PerspectiveCamera(60,videoWidth/videoHeight,1,1100),camera.position.set(0,1,0),orientationControls=new DeviceOrientationControls(camera),raycaster=new THREE.Raycaster,pointerPosition=new THREE.Vector2,scene=new THREE.Scene;const e=new THREE.BoxBufferGeometry(100,100,100,4,4,4),t=new THREE.MeshBasicMaterial({color:16711935,wireframe:!0});new THREE.Mesh(e,t);renderer=new THREE.WebGLRenderer({antialias:!0,alpha:!0}),renderer.setPixelRatio(window.devicePixelRatio),renderer.setSize(videoWidth,videoHeight),document.body.appendChild(renderer.domElement),window.addEventListener("resize",onWindowResize,!1),window.addEventListener("touchstart",handleTouch)}function rotateCamera(){camera.rotation.y+=.01}function animate(e){window.requestAnimationFrame(animate),orientationControls.update(),raycaster.setFromCamera(pointerPosition,camera);const t=raycaster.intersectObjects(scene.children);TWEEN.update(),handleIntersectVibration(monsterMesh.position);for(let e=0;e<t.length;e++);renderer.render(scene,camera)}