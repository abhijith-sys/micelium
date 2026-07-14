import * as THREE from './build/three.module.min.js';
import { STLLoader } from './examples/jsm/loaders/STLLoader.js';
import { OrbitControls } from './examples/jsm/controls/OrbitControls.js';

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('stl-viewer');
  if (!container) return;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xfdfbf7);

  const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
  camera.position.set(0, 0, 2);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setClearColor(0xfdfbf7, 0);
  container.innerHTML = '';
  container.appendChild(renderer.domElement);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.65);
  directionalLight.position.set(1, 1, 1);
  scene.add(directionalLight);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.07;
  controls.screenSpacePanning = false;
  controls.minDistance = 0.8;
  controls.maxDistance = 6;

  const loader = new STLLoader();
  loader.load('assets/models/3dmushroom.stl', (geometry) => {
    geometry.computeBoundingBox();
    const material = new THREE.MeshStandardMaterial({ color: 0x6d8b61, metalness: 0.2, roughness: 0.7 });
    const mesh = new THREE.Mesh(geometry, material);

    const bbox = geometry.boundingBox;
    const center = new THREE.Vector3();
    bbox.getCenter(center);
    mesh.position.sub(center);

    const size = new THREE.Vector3();
    bbox.getSize(size);
    const maxDim = Math.max(size.x, size.y, size.z);
    if (maxDim > 0) {
      camera.position.set(0, maxDim * 0.55, maxDim * 1.2);
    }
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    scene.add(mesh);
  }, undefined, (error) => {
    console.error('STL loading error:', error);
  });

  function resizeRenderer() {
    const width = container.clientWidth;
    const height = container.clientHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }

  window.addEventListener('resize', resizeRenderer);

  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  }
  animate();
});
