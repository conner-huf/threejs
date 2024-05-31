import * as THREE from "https://cdn.skypack.dev/three@0.132.2/build/three.module.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.132.2/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.132.2/examples/jsm/loaders/GLTFLoader.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

let object;
let controls;
let objToRender = 'guitar';

const loader = new GLTFLoader();

loader.load(
    `./models/${objToRender}/scene.gltf`,
    function (gltf) {
        object = gltf.scene;
        object.position.y = -0.3;
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
    camera.position.x = -0.5;
    camera.position.y = 0;
    camera.position.z = 1;
} else if (objToRender === 'sirFrog') {
    camera.position.z = 2.5;
} else {
    camera.position.z = 5;
}

const topLight = new THREE.DirectionalLight(0xFFFFFF, 1);
topLight.position.set(1, 1, 1);
topLight.castShadow = true;
scene.add(topLight);

const pointLight = new THREE.DirectionalLight(0x00FFEC, 2);
pointLight.position.set(-2, 2, 1);
pointLight.castShadow = true;
scene.add(pointLight);

const groundLight = new THREE.DirectionalLight(0xFF5A18, 0.05);
groundLight.position.set(6, -1.5, -0.5);
groundLight.castShadow = true;
scene.add(groundLight);

const ambientLight = new THREE.AmbientLight(0x3E3E3E, 0.75);
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
