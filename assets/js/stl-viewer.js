import * as THREE from './build/three.module.min.js';
import { GLTFLoader } from './examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from './examples/jsm/controls/OrbitControls.js';

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('stl-viewer');
  if (!container) return;

  const scene = new THREE.Scene();
  scene.background = null;

  const camera = new THREE.PerspectiveCamera(45, Math.max(container.clientWidth, 1) / Math.max(container.clientHeight, 1), 0.1, 1000);
  camera.position.set(0, 0.4, 2.2);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  container.innerHTML = '';
  container.appendChild(renderer.domElement);

  const ambientLight = new THREE.AmbientLight(0xfff5e8, 0.75);
  scene.add(ambientLight);

  const keyLight = new THREE.DirectionalLight(0xffffff, 1.15);
  keyLight.position.set(2.5, 3.5, 2);
  scene.add(keyLight);

  const fillLight = new THREE.DirectionalLight(0xd4e8d0, 0.45);
  fillLight.position.set(-2.5, 1, -1.5);
  scene.add(fillLight);

  const rimLight = new THREE.DirectionalLight(0xffd9a8, 0.35);
  rimLight.position.set(0, 1, -3);
  scene.add(rimLight);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.07;
  controls.screenSpacePanning = false;
  controls.minDistance = 0.8;
  controls.maxDistance = 8;
  controls.target.set(0, 0, 0);

  let model = null;
  let modelBaseY = 0;
  let autoSpin = true;
  let resumeTimer = null;
  const clock = new THREE.Clock();

  const pauseAutoSpin = () => {
    autoSpin = false;
    clearTimeout(resumeTimer);
    resumeTimer = setTimeout(() => {
      autoSpin = true;
    }, 2500);
  };

  controls.addEventListener('start', pauseAutoSpin);

  const loader = new GLTFLoader();
  loader.load(
    '/assets/models/mushrooms_-_blue_oyster.glb',
    (gltf) => {
      const root = gltf.scene;

      root.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = false;
          child.receiveShadow = false;
          if (child.material) {
            child.material.metalness = Math.min(child.material.metalness ?? 0, 0.1);
            child.material.roughness = Math.max(child.material.roughness ?? 0.6, 0.45);
          }
        }
      });

      const box = new THREE.Box3().setFromObject(root);
      const center = new THREE.Vector3();
      const size = new THREE.Vector3();
      box.getCenter(center);
      box.getSize(size);

      root.position.sub(center);

      const maxDim = Math.max(size.x, size.y, size.z) || 1;
      root.scale.setScalar(1.35 / maxDim);

      // Drop lower in the hero frame — fills the empty bottom space
      modelBaseY = -0.42;
      root.position.y += modelBaseY;

      scene.add(root);
      model = root;

      camera.near = 0.01;
      camera.far = 100;
      camera.position.set(0, -0.05, 2.6);
      camera.lookAt(0, modelBaseY, 0);
      camera.updateProjectionMatrix();
      controls.target.set(0, modelBaseY, 0);
      controls.update();
    },
    undefined,
    (error) => {
      console.error('GLB loading error:', error);
    }
  );

  function resizeRenderer() {
    const width = Math.max(container.clientWidth, 1);
    const height = Math.max(container.clientHeight, 1);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }

  window.addEventListener('resize', resizeRenderer);
  resizeRenderer();

  function animate() {
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    if (model && autoSpin) {
      // Gentle left–right sway + soft float
      model.rotation.y = Math.sin(t * 0.55) * 0.45;
      model.position.y = modelBaseY + Math.sin(t * 0.9) * 0.04;
    }

    controls.update();
    renderer.render(scene, camera);
  }
  animate();
});
