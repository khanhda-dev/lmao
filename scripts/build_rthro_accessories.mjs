import fs from 'fs';
import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';

class MockFileReader {
  readAsArrayBuffer(blob) {
    blob.arrayBuffer().then((buf) => {
      this.result = buf;
      if (typeof this.onloadend === 'function') {
        this.onloadend({ target: { result: buf } });
      }
    });
  }
}
global.FileReader = MockFileReader;
global.self = global;
global.window = global;

function createSunglasses(onForehead = false) {
  const group = new THREE.Group();
  group.name = 'Accessory_Sunglasses';

  const frameMat = new THREE.MeshStandardMaterial({
    name: 'SunglassesFrame',
    color: 0x111113,
    roughness: 0.25,
    metalness: 0.20
  });

  const lensMat = new THREE.MeshStandardMaterial({
    name: 'SunglassesLens',
    color: 0x050507,
    roughness: 0.10,
    metalness: 0.85
  });

  // Main frame bar
  const frameGeo = new THREE.BoxGeometry(0.24, 0.055, 0.02);
  const frameMesh = new THREE.Mesh(frameGeo, frameMat);
  group.add(frameMesh);

  // Left & Right Lenses
  const lensGeo = new THREE.BoxGeometry(0.09, 0.046, 0.015);
  const leftLens = new THREE.Mesh(lensGeo, lensMat);
  leftLens.position.set(-0.055, -0.002, 0.005);
  group.add(leftLens);

  const rightLens = new THREE.Mesh(lensGeo, lensMat);
  rightLens.position.set(0.055, -0.002, 0.005);
  group.add(rightLens);

  // Bridge
  const bridgeGeo = new THREE.BoxGeometry(0.028, 0.015, 0.018);
  const bridge = new THREE.Mesh(bridgeGeo, frameMat);
  bridge.position.set(0, 0.015, 0.003);
  group.add(bridge);

  // Side Temples
  const templeGeo = new THREE.BoxGeometry(0.012, 0.018, 0.20);
  const leftTemple = new THREE.Mesh(templeGeo, frameMat);
  leftTemple.position.set(-0.116, 0.008, -0.095);
  group.add(leftTemple);

  const rightTemple = new THREE.Mesh(templeGeo, frameMat);
  rightTemple.position.set(0.116, 0.008, -0.095);
  group.add(rightTemple);

  if (!onForehead) {
    group.position.set(0, 1.56, 0.128);
    group.rotation.x = 0.05;
  } else {
    group.position.set(0, 1.69, 0.095);
    group.rotation.x = -0.55;
  }

  return group;
}

function createVintageCamera() {
  const group = new THREE.Group();
  group.name = 'Accessory_VintageCamera';

  const bodyMat = new THREE.MeshStandardMaterial({
    name: 'CameraBody',
    color: 0x18181b,
    roughness: 0.65,
    metalness: 0.15
  });

  const metalMat = new THREE.MeshStandardMaterial({
    name: 'CameraMetal',
    color: 0xd4d4d8,
    roughness: 0.25,
    metalness: 0.85
  });

  const lensGlassMat = new THREE.MeshStandardMaterial({
    name: 'CameraLensGlass',
    color: 0x0a101d,
    roughness: 0.05,
    metalness: 0.95
  });

  const strapMat = new THREE.MeshStandardMaterial({
    name: 'CameraStrap',
    color: 0x241d1a,
    roughness: 0.70,
    metalness: 0.05
  });

  // 1. Camera Body
  const bodyGeo = new THREE.BoxGeometry(0.13, 0.08, 0.045);
  const bodyMesh = new THREE.Mesh(bodyGeo, bodyMat);
  group.add(bodyMesh);

  // 2. Silver Top Plate
  const topPlateGeo = new THREE.BoxGeometry(0.132, 0.022, 0.046);
  const topPlate = new THREE.Mesh(topPlateGeo, metalMat);
  topPlate.position.set(0, 0.042, 0);
  group.add(topPlate);

  // 3. Shutter Button & Dial
  const shutterGeo = new THREE.CylinderGeometry(0.009, 0.009, 0.012, 16);
  const shutter = new THREE.Mesh(shutterGeo, metalMat);
  shutter.position.set(0.045, 0.058, 0.005);
  group.add(shutter);

  const dialGeo = new THREE.CylinderGeometry(0.012, 0.012, 0.008, 16);
  const dial = new THREE.Mesh(dialGeo, metalMat);
  dial.position.set(-0.045, 0.056, 0.005);
  group.add(dial);

  // 4. Viewfinder
  const vfGeo = new THREE.BoxGeometry(0.018, 0.014, 0.008);
  const vf = new THREE.Mesh(vfGeo, lensGlassMat);
  vf.position.set(0.038, 0.042, 0.024);
  group.add(vf);

  // 5. Camera Lens
  const lensBaseGeo = new THREE.CylinderGeometry(0.035, 0.035, 0.022, 28);
  lensBaseGeo.rotateX(Math.PI / 2);
  const lensBase = new THREE.Mesh(lensBaseGeo, metalMat);
  lensBase.position.set(0, 0, 0.032);
  group.add(lensBase);

  const lensBarrelGeo = new THREE.CylinderGeometry(0.030, 0.032, 0.025, 28);
  lensBarrelGeo.rotateX(Math.PI / 2);
  const lensBarrel = new THREE.Mesh(lensBarrelGeo, bodyMat);
  lensBarrel.position.set(0, 0, 0.042);
  group.add(lensBarrel);

  const lensGlassGeo = new THREE.CylinderGeometry(0.026, 0.026, 0.008, 28);
  lensGlassGeo.rotateX(Math.PI / 2);
  const lensGlass = new THREE.Mesh(lensGlassGeo, lensGlassMat);
  lensGlass.position.set(0, 0, 0.056);
  group.add(lensGlass);

  // 6. Leather Strap
  const leftStrapCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.065, 0.03, 0),
    new THREE.Vector3(-0.085, 0.16, -0.01),
    new THREE.Vector3(-0.09, 0.28, -0.05),
    new THREE.Vector3(-0.06, 0.35, -0.11),
    new THREE.Vector3(0, 0.36, -0.13)
  ]);
  const leftStrapGeo = new THREE.TubeGeometry(leftStrapCurve, 24, 0.005, 8, false);
  const leftStrap = new THREE.Mesh(leftStrapGeo, strapMat);
  group.add(leftStrap);

  const rightStrapCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.065, 0.03, 0),
    new THREE.Vector3(0.085, 0.16, -0.01),
    new THREE.Vector3(0.09, 0.28, -0.05),
    new THREE.Vector3(0.06, 0.35, -0.11),
    new THREE.Vector3(0, 0.36, -0.13)
  ]);
  const rightStrapGeo = new THREE.TubeGeometry(rightStrapCurve, 24, 0.005, 8, false);
  const rightStrap = new THREE.Mesh(rightStrapGeo, strapMat);
  group.add(rightStrap);

  group.position.set(0, 1.15, 0.142);
  group.rotation.x = -0.08;

  return group;
}

function loadBaseRig() {
  const loader = new FBXLoader();
  const fbxBuffer = fs.readFileSync('/tmp/RthroMannequin.fbx');
  const arrayBuffer = fbxBuffer.buffer.slice(fbxBuffer.byteOffset, fbxBuffer.byteOffset + fbxBuffer.byteLength);

  const fbxObj = loader.parse(arrayBuffer, '');

  const root = new THREE.Group();
  root.name = 'RobloxRthroWithAccessories';

  const matYellowLinen = new THREE.MeshStandardMaterial({
    name: 'YellowLinenOutfit',
    color: 0xf5dc82, // Dreamina pastel butter yellow
    roughness: 0.75,
    metalness: 0.02
  });

  const matClaySkin = new THREE.MeshStandardMaterial({
    name: 'ClaySkinHeadHands',
    color: 0xf6dfcf, // Clean clay skin
    roughness: 0.60,
    metalness: 0.03
  });

  const matChunkySneakers = new THREE.MeshStandardMaterial({
    name: 'ChunkySneakers',
    color: 0xfafafa, // Clean white clay sneakers
    roughness: 0.45,
    metalness: 0.05
  });

  fbxObj.traverse((child) => {
    if (child.isMesh) {
      const name = child.name;
      if (name.includes('Head') || name.includes('Hand')) {
        child.material = matClaySkin;
      } else if (name.includes('Foot')) {
        child.material = matChunkySneakers;
      } else {
        child.material = matYellowLinen;
      }
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  root.add(fbxObj);
  root.scale.set(0.28, 0.28, 0.28);

  const box = new THREE.Box3().setFromObject(root);
  root.position.y += -box.min.y;

  return root;
}

async function exportToGLB(object, outPath) {
  const scene = new THREE.Scene();
  scene.add(object);

  const exporter = new GLTFExporter();
  await new Promise((resolve, reject) => {
    exporter.parse(
      scene,
      (result) => {
        fs.writeFileSync(outPath, Buffer.from(result));
        console.log(`Saved: ${outPath} (${fs.statSync(outPath).size} bytes)`);
        resolve();
      },
      (err) => reject(err),
      { binary: true }
    );
  });
}

async function main() {
  // 1. Full Set: Glasses on eyes + Camera on neck
  {
    const root = loadBaseRig();
    root.add(createSunglasses(false));
    root.add(createVintageCamera());
    await exportToGLB(root, 'public/models/roblox_rthro_equipped.glb');
  }

  // 2. Forehead Set: Glasses pushed up on forehead + Camera on neck (matching Image 2 bird's eye view)
  {
    const root = loadBaseRig();
    root.add(createSunglasses(true));
    root.add(createVintageCamera());
    await exportToGLB(root, 'public/models/roblox_rthro_equipped_forehead.glb');
  }

  // 3. Camera Only (Không đeo kính)
  {
    const root = loadBaseRig();
    root.add(createVintageCamera());
    await exportToGLB(root, 'public/models/roblox_rthro_camera_only.glb');
  }

  // 4. Glasses Only (Chỉ đeo kính râm)
  {
    const root = loadBaseRig();
    root.add(createSunglasses(false));
    await exportToGLB(root, 'public/models/roblox_rthro_glasses_only.glb');
  }
}

main().catch(console.error);
