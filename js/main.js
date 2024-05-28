import * as THREE from "https://cdn.skypack.dev/three@0.132.2/build/three.module.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.132.2/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.132.2/examples/jsm/loaders/GLTFLoader.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

let object;
let controls;
let objToRender = 'sirFrog';

const loader = new GLTFLoader();

loader.load(
    `./models/${objToRender}/scene.gltf`,
    function (gltf) {
        object = gltf.scene;
        scene.add(object);
    },
    function (xhr){
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function (error) {
        console.error(error);
    }
);

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);

document.getElementById("container3D").appendChild(renderer.domElement);

if (objToRender === 'guitar') {
    camera.position.z = 1.5;
} else if (objToRender === 'sirFrog') {
    camera.position.z = 2.5;
} else {
    camera.position.z = 5;
}

const topLight = new THREE.DirectionalLight(0xffffff, 1);
const backLight = new THREE.DirectionalLight(0xffffff, 2);
const goundLight = new THREE.DirectionalLight(0xffffff, 3);

backLight.position.set(-1, -5, -1);
goundLight.position.set(-1, -5, -5);

if (objToRender === 'sirFrog') {
    topLight.position.set(1, 1, 1);
} else {
    topLight.position.set(500, 500, 500);
}

topLight.castShadow = true;
backLight.castShadow = true;
goundLight.castShadow = true;

scene.add(topLight);
scene.add(backLight);
scene.add(goundLight);

const ambientLight = new THREE.AmbientLight(0x333333, 5);
scene.add(ambientLight);

controls = new OrbitControls(camera, renderer.domElement);

function animate() {
    requestAnimationFrame(animate);

    renderer.render(scene, camera);
}

window.addEventListener("resize", function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();
