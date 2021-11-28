import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as dat from "dat.gui";
/*BISOGNA IMPORTARE TEXT GEOMETRY*/
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
/*BISOGNA IMPORTARE FONT LOADER*/
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
/*IMPORT FONT*/
// import typefaceFont from "three/examples/fonts/helvetiker_regular.typeface.json";
import font from "../static/fonts/helvetiker_regular.typeface.json"; /*CARICATO DA STATIC*/
import {
  Mesh,
  MeshBasicMaterial,
  MeshMatcapMaterial,
  MeshStandardMaterial,
} from "three";

/*DAT.GUI*/
const gui = new dat.GUI();

/*SCENE*/
const scene = new THREE.Scene();

/*TEXTURES*/
const textureLoader = new THREE.TextureLoader();
const matcapTexture = textureLoader.load("textures/matcaps/8.png");

/*MESH*/

/*FONT*/
const fontLoader = new FontLoader(); /*SERVE IL FONT LOADER*/
/*BISOGNA CARICARE IL FONT IN QUESTA MANIERA*/
fontLoader.load("fonts/helvetiker_regular.typeface.json", (font) => {
  const textGeometry = new TextGeometry("Che fissa Three.Js", {
    font: font,
    size: 1,
    height: 0.3,
    curveSegments: 5,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 4,
  }); /*IL PRIMO ARGOMENTO E' IL TESTO, IL SECONDO LE PROPRIETA'*/
  /*OGNI MESH CHE VIENE VISUALIZZATA POSSIEDE UN CONTNITORE (SFRICO O CUBO) CHE LO CONTIENE CON .CENTER L'ASSE VERRA' INSERITA AL CENTRO DEL CONTENITORE*/
  textGeometry.center();
  const textMaterial = new MeshMatcapMaterial({
    /*wireframe: true*/
    matcap: matcapTexture,
  });
  const text = new Mesh(textGeometry, textMaterial);
  scene.add(text);
}); /*IL SECONDO ARGOMENTO E' UNA FUNZIONE ONLOAD IL PRIMO E' IL PATH DEL FONT*/
/*FONT DEBUG*/

/*SIZES*/
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

/*CAMERA*/
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 5;
scene.add(camera);

/*ADAPTIVE*/
window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/*AXIS HELPER*/
const axisHelper = new THREE.AxisHelper();
scene.add(axisHelper);

/*RENDERER*/
const canvas = document.querySelector("canvas.webgl");
const renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.render(scene, camera);

/*CONTROLS*/
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/*ANIMATION*/
const clock = new THREE.Clock();
const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  controls.update;
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};
tick();
