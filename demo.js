import * as THREE from './three.module.js';
import { OrbitControls } from './OrbitControls.js';

const section = document.querySelector("section");
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor( 0xffffff, 1);
section.appendChild( renderer.domElement );

const ambient = new THREE.AmbientLight(0xffffff);
//scene.add(ambient);

const light = new THREE.DirectionalLight(0xffffff);
light.position.set(10,5,6);
light.wireframe = true;
//scene.add(light);

const light1 = new THREE.PointLight(0xffffff, 4.5, 18);
light1.position.set(10,7,5);
light1.castShadow = false;
light1.shadow.camera.near = 1;
light1.shadow.camera.far = 1;
scene.add(light1);

const light1 = new THREE.PointLight(0xffffff, 4.5, 18);
light1.position.set(10,7,5);
light1.castShadow = false;
light1.shadow.camera.near = 1;
light1.shadow.camera.far = 1;
scene.add(light1);

const loader = new THREE.TextureLoader();

const urls = [
    "src/edge.png", "src/spine.png",
    "src/top.png", "src/bottom.png",
    "src/front.png", "src/back.png"
];

const materials = urls.map(url => {
    return new THREE.MeshLambertMaterial({
        map: loader.load(url)
    })
})

const geometry = new THREE.BoxGeometry(3.5, 5, 0.5);
const cube = new THREE.Mesh( geometry, materials );
scene.add( cube );

camera.position.z = 6;

const orbitControls = new OrbitControls(camera, renderer.domElement);

function animate() {
    requestAnimationFrame( animate );

    //const currentTimeline = window.pageYOffset / 3000;
    
    //const rx = currentTimeline * Math.PI;
    //const ry = currentTimeline * Math.PI * 2;
    //const rz = currentTimeline * Math.PI * 3;

    //cube.rotation.set(rx, ry , rz);

    renderer.render( scene, camera );
};

animate();