import * as THREE from 'https://unpkg.com/three/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://unpkg.com/three/examples/jsm/loaders/GLTFLoader.js';
 
var scene, camera, renderer, cube, controls, draughts, board;
 
function init() {
  draughts = new Draughts();
 
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
 
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
 
  const square = new THREE.BoxGeometry(1, 0.1, 1);
  const lightsquare = new THREE.MeshBasicMaterial( { color: 0xE0C4A8 } );
  const darksquare = new THREE.MeshBasicMaterial( { color: 0x6A4236 });
 
  board = new THREE.Group();
 
  let squareNumber = 1;
  for (let x = 0; x < 10; x++) {
    for (let z = 0; z < 10; z++) {
      let cube;
      if (z % 2 == 0) {
        cube = new THREE.Mesh(square, x % 2 == 0 ? lightsquare : darksquare);
        if (x % 2 != 0) {
          cube.userData.squareNumber = squareNumber;
          squareNumber++;
        }
      } else {
        cube = new THREE.Mesh(square, x % 2 == 0 ? darksquare : lightsquare);
        if (x % 2 == 0) {
          cube.userData.squareNumber = squareNumber;
          squareNumber++;
        }
      }
 
      cube.position.set(x, 0, z);
      board.add(cube);
    }
  }
 
  scene.add(board);
 
  camera.position.y = 1;
  camera.position.z = 3;
 
  controls = new OrbitControls(camera, renderer.domElement);
 
  controls.target.set(4.5, 0, 4.5);
 
  controls.enablePan = false;
  controls.maxPolarAngle = Math.PI / 2;
 
  controls.enableDamping = true;
 
  window.requestAnimationFrame(animate);
}
 
function animate() {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(animate);
}
 
function onWindowResize() {
 
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
 
  renderer.setSize( window.innerWidth, window.innerHeight );
 
}
 
 
window.addEventListener('resize', onWindowResize);
 
window.onload = init;