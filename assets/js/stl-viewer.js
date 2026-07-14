import * as THREE from './build/three.module.min.js';
import { STLLoader } from './examples/jsm/loaders/STLLoader.js';
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
  container.innerHTML = '';
  container.appendChild(renderer.domElement);

  const ambientLight = new THREE.AmbientLight(0xfff5e8, 0.75);
  scene.add(ambientLight);

  const keyLight = new THREE.DirectionalLight(0xffffff, 1.1);
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

  // STL has no materials — yellow-to-white height gradient.
  // Bottom of stem → rich yellow; rising toward the cap → fades to white.
  function applyMushroomColors(geometry) {
    geometry.computeBoundingBox();
    geometry.computeVertexNormals();
    const { min, max } = geometry.boundingBox;
    const height = Math.max(max.y - min.y, 1e-6);
    const positions = geometry.attributes.position;
    const normals = geometry.attributes.normal;
    const colors = new Float32Array(positions.count * 3);

    const yellow = new THREE.Color(0xe0c05a); // richer yellow at the base
    const white = new THREE.Color(0xffffff);
    const tmp = new THREE.Color();

    for (let i = 0; i < positions.count; i++) {
      const y = (positions.getY(i) - min.y) / height;
      const ny = normals.getY(i);

      // Smooth yellow → white along height (ease so the top reads clean white)
      const t = THREE.MathUtils.smoothstep(y, 0.05, 0.85);
      tmp.copy(yellow).lerp(white, t);

      // Cap tops (strong upward normals) push fully white
      if (ny > 0.25) {
        const capMix = THREE.MathUtils.clamp((ny - 0.25) / 0.6, 0, 1);
        tmp.lerp(white, capMix * t);
      }

      colors[i * 3] = tmp.r;
      colors[i * 3 + 1] = tmp.g;
      colors[i * 3 + 2] = tmp.b;
    }

    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  }

  const loader = new STLLoader();
  loader.load(
    '/assets/models/3dmushroom.stl',
    (geometry) => {
      geometry.computeBoundingBox();
      geometry.computeVertexNormals();

      let material;
      if (geometry.hasColors) {
        material = new THREE.MeshStandardMaterial({
          vertexColors: true,
          metalness: 0.05,
          roughness: 0.7,
        });
      } else {
        applyMushroomColors(geometry);
        material = new THREE.MeshStandardMaterial({
          vertexColors: true,
          metalness: 0.05,
          roughness: 0.55,
        });
      }

      const mesh = new THREE.Mesh(geometry, material);

      const bbox = geometry.boundingBox;
      const center = new THREE.Vector3();
      const size = new THREE.Vector3();
      bbox.getCenter(center);
      bbox.getSize(size);

      mesh.geometry.translate(-center.x, -center.y, -center.z);

      const maxDim = Math.max(size.x, size.y, size.z) || 1;
      mesh.scale.setScalar(1.2 / maxDim);

      scene.add(mesh);
      model = mesh;

      camera.near = 0.01;
      camera.far = 100;
      camera.position.set(0, 0.35, 2.6);
      camera.lookAt(0, 0, 0);
      camera.updateProjectionMatrix();
      controls.target.set(0, 0, 0);
      controls.update();
    },
    undefined,
    (error) => {
      console.error('STL loading error:', error);
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
      model.position.y = Math.sin(t * 0.9) * 0.04;
    }

    controls.update();
    renderer.render(scene, camera);
  }
  animate();
});
