import fs from 'fs';
import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
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

// Helper to create organic lofted cloth geometry
function createOrganicLoftedGeometry(profile, radialSegments = 36) {
  const heightSegments = profile.length - 1;
  const vertices = [];
  const uvs = [];
  const indices = [];

  for (let j = 0; j <= heightSegments; j++) {
    const p = profile[j];
    const v = j / heightSegments;
    for (let i = 0; i <= radialSegments; i++) {
      const u = i / radialSegments;
      const theta = u * Math.PI * 2;

      // Soft natural cloth folds (gentle sinusoidal ripples)
      const ripple = 1.0 + (p.ripple || 0.03) * Math.sin(theta * 6 + j * 0.4) + 0.015 * Math.cos(theta * 4);
      const x = p.rx * Math.cos(theta) * ripple;
      const z = p.rz * Math.sin(theta) * ripple;
      const y = p.y;

      vertices.push(x, y, z);
      uvs.push(u, v);
    }
  }

  for (let j = 0; j < heightSegments; j++) {
    for (let i = 0; i < radialSegments; i++) {
      const a = j * (radialSegments + 1) + i;
      const b = (j + 1) * (radialSegments + 1) + i;
      const c = (j + 1) * (radialSegments + 1) + (i + 1);
      const d = j * (radialSegments + 1) + (i + 1);

      indices.push(a, b, d);
      indices.push(b, c, d);
    }
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geo.setIndex(indices);
  geo.computeVertexNormals();
  return geo;
}

// 1. ORGANIC SOFT TUNIC JACKET (Áo vạt rộng mềm mại)
function createOrganicSoftTunic(linenMat) {
  const tunicGroup = new THREE.Group();
  tunicGroup.name = 'OrganicSoftTunic';

  // Torso profile with natural human curvature, soft chest fullness and relaxed A-line drape
  const tunicProfile = [
    { y: 1.46, rx: 0.095, rz: 0.090, ripple: 0.01 },  // Collar base
    { y: 1.41, rx: 0.165, rz: 0.125, ripple: 0.02 },  // Shoulders / upper chest
    { y: 1.30, rx: 0.225, rz: 0.155, ripple: 0.035 }, // Pectoral chest fullness
    { y: 1.18, rx: 0.235, rz: 0.160, ripple: 0.04 },  // Lower ribcage
    { y: 1.05, rx: 0.245, rz: 0.170, ripple: 0.045 }, // Waist drape (relaxed & loose)
    { y: 0.92, rx: 0.265, rz: 0.185, ripple: 0.05 },  // Hips
    { y: 0.81, rx: 0.285, rz: 0.198, ripple: 0.055 }, // Hem line covering upper thighs
    { y: 0.79, rx: 0.280, rz: 0.192, ripple: 0.03 }   // Inward hem fold
  ];

  const tunicGeo = createOrganicLoftedGeometry(tunicProfile, 40);
  const tunicMesh = new THREE.Mesh(tunicGeo, linenMat);
  tunicGroup.add(tunicMesh);

  // Soft rolled Mandarin collar
  const collarGeo = new THREE.TorusGeometry(0.098, 0.016, 16, 32);
  collarGeo.rotateX(Math.PI / 2);
  const collar = new THREE.Mesh(collarGeo, linenMat);
  collar.position.set(0, 1.455, 0.0);
  tunicGroup.add(collar);

  // Stitched front overlap placket with subtle cloth relief
  const placketGeo = new THREE.BoxGeometry(0.026, 0.65, 0.014);
  const placket = new THREE.Mesh(placketGeo, linenMat);
  placket.position.set(0.01, 1.13, 0.165);
  tunicGroup.add(placket);

  // Three-quarter relaxed sleeves (Ống tay áo lửng mềm)
  function createSoftSleeve(side) {
    const isLeft = side === 'left';
    const xMult = isLeft ? 1 : -1;
    const sleeve = new THREE.Group();

    const sleeveProfile = [
      { y: 0.00, rx: 0.125, rz: 0.125, ripple: 0.02 },  // Shoulder seam
      { y: -0.10, rx: 0.115, rz: 0.115, ripple: 0.035 }, // Bicep drape
      { y: -0.22, rx: 0.108, rz: 0.108, ripple: 0.04 },  // Above elbow
      { y: -0.34, rx: 0.102, rz: 0.102, ripple: 0.045 }, // Below elbow (loose opening)
      { y: -0.36, rx: 0.098, rz: 0.098, ripple: 0.02 }   // Rolled sleeve cuff
    ];

    const sleeveGeo = createOrganicLoftedGeometry(sleeveProfile, 28);
    const sleeveMesh = new THREE.Mesh(sleeveGeo, linenMat);
    sleeve.add(sleeveMesh);

    sleeve.position.set(xMult * 0.28, 1.42, 0.0);
    return sleeve;
  }
  tunicGroup.add(createSoftSleeve('left'));
  tunicGroup.add(createSoftSleeve('right'));

  return tunicGroup;
}

// 2. ORGANIC WIDE-LEG LINEN PANTS (Quần ống suông rộng mềm mại)
function createOrganicSoftPants(linenMat) {
  const pantsGroup = new THREE.Group();
  pantsGroup.name = 'OrganicSoftPants';

  function createSoftLeg(side) {
    const isLeft = side === 'left';
    const xMult = isLeft ? 1 : -1;
    const leg = new THREE.Group();

    // Natural flowing pants leg from crotch to ankle
    const legProfile = [
      { y: 0.84, rx: 0.138, rz: 0.142, ripple: 0.03 },  // Waist/hip join
      { y: 0.70, rx: 0.135, rz: 0.138, ripple: 0.04 },  // Upper thigh
      { y: 0.52, rx: 0.132, rz: 0.135, ripple: 0.045 }, // Knee zone (ample loose room)
      { y: 0.32, rx: 0.128, rz: 0.130, ripple: 0.045 }, // Calf zone (straight drape)
      { y: 0.15, rx: 0.125, rz: 0.128, ripple: 0.04 },  // Above ankle
      { y: 0.10, rx: 0.122, rz: 0.125, ripple: 0.025 }  // Bottom rolled cuff
    ];

    const legGeo = createOrganicLoftedGeometry(legProfile, 32);
    const legMesh = new THREE.Mesh(legGeo, linenMat);
    leg.add(legMesh);

    // Rolled hem cuff ring resting cleanly above the sneakers
    const cuffGeo = new THREE.TorusGeometry(0.125, 0.015, 12, 28);
    cuffGeo.rotateX(Math.PI / 2);
    const cuff = new THREE.Mesh(cuffGeo, linenMat);
    cuff.position.set(0, 0.10, 0.0);
    leg.add(cuff);

    leg.position.set(xMult * 0.105, 0, 0.0);
    return leg;
  }

  pantsGroup.add(createSoftLeg('left'));
  pantsGroup.add(createSoftLeg('right'));

  return pantsGroup;
}

// 3. REFINED VINTAGE CAMERA WITH ORGANIC STRAP (Máy ảnh vintage tinh xảo)
function createArtisanVintageCamera() {
  const group = new THREE.Group();
  group.name = 'Accessory_VintageCamera';

  const bodyMat = new THREE.MeshStandardMaterial({
    name: 'CameraBodyLeather',
    color: 0x161618,
    roughness: 0.60,
    metalness: 0.10
  });

  const chromeMat = new THREE.MeshStandardMaterial({
    name: 'CameraBrushedChrome',
    color: 0xe0e0e4,
    roughness: 0.20,
    metalness: 0.88
  });

  const glassMat = new THREE.MeshStandardMaterial({
    name: 'CameraLensOptics',
    color: 0x060c18,
    roughness: 0.04,
    metalness: 0.95
  });

  const strapMat = new THREE.MeshStandardMaterial({
    name: 'CameraLeatherStrap',
    color: 0x221a16,
    roughness: 0.65,
    metalness: 0.05
  });

  // Camera chassis with rounded beveled edges
  const chassisGeo = new THREE.BoxGeometry(0.138, 0.082, 0.046);
  const chassis = new THREE.Mesh(chassisGeo, bodyMat);
  group.add(chassis);

  // Silver top plate
  const topPlateGeo = new THREE.BoxGeometry(0.140, 0.022, 0.048);
  const topPlate = new THREE.Mesh(topPlateGeo, chromeMat);
  topPlate.position.set(0, 0.043, 0);
  group.add(topPlate);

  // Knurled shutter button & exposure dials
  const shutterGeo = new THREE.CylinderGeometry(0.009, 0.009, 0.014, 20);
  const shutter = new THREE.Mesh(shutterGeo, chromeMat);
  shutter.position.set(0.046, 0.060, 0.004);
  group.add(shutter);

  const dialGeo = new THREE.CylinderGeometry(0.013, 0.013, 0.010, 20);
  const dial = new THREE.Mesh(dialGeo, chromeMat);
  dial.position.set(-0.046, 0.058, 0.004);
  group.add(dial);

  // Rangefinder optical window
  const vfGeo = new THREE.BoxGeometry(0.018, 0.014, 0.008);
  const vf = new THREE.Mesh(vfGeo, glassMat);
  vf.position.set(0.040, 0.043, 0.024);
  group.add(vf);

  // Multi-element camera lens barrel
  const lensBaseGeo = new THREE.CylinderGeometry(0.038, 0.038, 0.024, 32);
  lensBaseGeo.rotateX(Math.PI / 2);
  const lensBase = new THREE.Mesh(lensBaseGeo, chromeMat);
  lensBase.position.set(0, 0, 0.033);
  group.add(lensBase);

  const lensRingGeo = new THREE.CylinderGeometry(0.033, 0.035, 0.026, 32);
  lensRingGeo.rotateX(Math.PI / 2);
  const lensRing = new THREE.Mesh(lensRingGeo, bodyMat);
  lensRing.position.set(0, 0, 0.045);
  group.add(lensRing);

  const lensGlassGeo = new THREE.CylinderGeometry(0.029, 0.029, 0.010, 32);
  lensGlassGeo.rotateX(Math.PI / 2);
  const lensGlass = new THREE.Mesh(lensGlassGeo, glassMat);
  lensGlass.position.set(0, 0, 0.060);
  group.add(lensGlass);

  // Smooth curved strap looping around the neck
  const leftStrapCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.068, 0.035, 0.0),
    new THREE.Vector3(-0.115, 0.16, -0.06),
    new THREE.Vector3(-0.125, 0.25, -0.15),
    new THREE.Vector3(-0.085, 0.285, -0.24),
    new THREE.Vector3(0, 0.285, -0.26)
  ]);
  const leftStrapGeo = new THREE.TubeGeometry(leftStrapCurve, 28, 0.005, 8, false);
  const leftStrap = new THREE.Mesh(leftStrapGeo, strapMat);
  group.add(leftStrap);

  const rightStrapCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.068, 0.035, 0.0),
    new THREE.Vector3(0.115, 0.16, -0.06),
    new THREE.Vector3(0.125, 0.25, -0.15),
    new THREE.Vector3(0.085, 0.285, -0.24),
    new THREE.Vector3(0, 0.285, -0.26)
  ]);
  const rightStrapGeo = new THREE.TubeGeometry(rightStrapCurve, 28, 0.005, 8, false);
  const rightStrap = new THREE.Mesh(rightStrapGeo, strapMat);
  group.add(rightStrap);

  // Position hanging freely in front of the loose tunic
  group.position.set(0, 1.18, 0.195);
  group.rotation.x = -0.06;

  return group;
}

// 4. SHOPIFY ARTISAN SNEAKERS (Giày sneakers trắng chuẩn phom dáng xịn)
async function loadArtisanSneakers() {
  const gltfLoader = new GLTFLoader();
  const shoeBuf = fs.readFileSync('/tmp/MaterialsVariantsShoe.glb');
  const shoeAb = shoeBuf.buffer.slice(shoeBuf.byteOffset, shoeBuf.byteOffset + shoeBuf.byteLength);

  let shoeMesh = null;
  await new Promise((resolve) => {
    gltfLoader.parse(shoeAb, '', (gltf) => {
      gltf.scene.updateMatrixWorld(true);
      gltf.scene.traverse((c) => {
        if (c.isMesh) shoeMesh = c;
      });
      resolve();
    });
  });

  // Bake matrix into geometry to normalize coordinates
  const bakedGeo = shoeMesh.geometry.clone();
  bakedGeo.applyMatrix4(shoeMesh.matrixWorld);
  bakedGeo.computeBoundingBox();
  const box = bakedGeo.boundingBox;
  bakedGeo.translate(-(box.min.x + box.max.x) / 2, -box.min.y, -(box.min.z + box.max.z) / 2);

  const sneakersGroup = new THREE.Group();
  sneakersGroup.name = 'ShopifyArtisanSneakers';

  // Crisp clay white sneaker material
  const whiteSneakerMat = new THREE.MeshStandardMaterial({
    name: 'SneakerWhiteLeather',
    color: 0xffffff, // Pure crisp white
    roughness: 0.35,
    metalness: 0.02
  });

  // Left shoe: rotate -90 deg so toe points +Z, scale 0.80 for real human sneaker size (24cm)
  const leftShoe = new THREE.Mesh(bakedGeo.clone(), whiteSneakerMat);
  leftShoe.rotation.y = -Math.PI / 2;
  leftShoe.scale.set(0.80, 0.80, 0.80);
  leftShoe.position.set(0.105, 0.0, 0.02);
  sneakersGroup.add(leftShoe);

  // Right shoe: mirror along X
  const rightShoe = new THREE.Mesh(bakedGeo.clone(), whiteSneakerMat);
  rightShoe.rotation.y = -Math.PI / 2;
  rightShoe.scale.set(-0.80, 0.80, 0.80);
  rightShoe.position.set(-0.105, 0.0, 0.02);
  sneakersGroup.add(rightShoe);

  return sneakersGroup;
}

// 5. KHRONOS OFFICIAL SUNGLASSES (Kính râm đen thời trang gọng cong chuẩn)
async function loadKhronosSunglasses(onForehead = false) {
  const gltfLoader = new GLTFLoader();
  const sBuf = fs.readFileSync('/tmp/SunglassesKhronos.glb');
  const sAb = sBuf.buffer.slice(sBuf.byteOffset, sBuf.byteOffset + sBuf.byteLength);

  let sunglassesScene = null;
  await new Promise((resolve) => {
    gltfLoader.parse(sAb, '', (gltf) => {
      sunglassesScene = gltf.scene;
      resolve();
    });
  });

  const frameMat = new THREE.MeshStandardMaterial({
    name: 'KhronosFrameMat',
    color: 0x141416, // Matte black wayfarer frame
    roughness: 0.25,
    metalness: 0.15
  });

  const lensMat = new THREE.MeshStandardMaterial({
    name: 'KhronosLensMat',
    color: 0x060608, // Dark polarized reflective lenses
    roughness: 0.06,
    metalness: 0.90
  });

  sunglassesScene.traverse((c) => {
    if (c.isMesh) {
      if (c.name.includes('Lenses')) {
        c.material = lensMat;
      } else {
        c.material = frameMat;
      }
    }
  });

  const wrapper = new THREE.Group();
  wrapper.name = 'Accessory_Sunglasses';
  wrapper.add(sunglassesScene);

  // Scale Khronos glasses (orig width 0.15m) to fit Rthro face (width ~0.22m)
  sunglassesScene.scale.set(1.48, 1.48, 1.48);

  if (!onForehead) {
    // Normal position over eyes and bridge of nose
    wrapper.position.set(0, 1.585, 0.125);
    wrapper.rotation.x = 0.03;
  } else {
    // Pushed up onto forehead (matching top-down bird's eye view)
    wrapper.position.set(0, 1.690, 0.095);
    wrapper.rotation.x = -0.58;
  }

  return wrapper;
}

async function main() {
  const fbxLoader = new FBXLoader();
  const fbxBuffer = fs.readFileSync('/tmp/RthroMannequin.fbx');
  const arrayBuffer = fbxBuffer.buffer.slice(fbxBuffer.byteOffset, fbxBuffer.byteOffset + fbxBuffer.byteLength);

  const fbxObj = fbxLoader.parse(arrayBuffer, '');

  const root = new THREE.Group();
  root.name = 'ArtisanRobloxRthroScene';

  // Skin tone for head & hands (Dreamina clay skin)
  const matClaySkin = new THREE.MeshStandardMaterial({
    name: 'ClaySkinHeadHands',
    color: 0xf5ded0,
    roughness: 0.60,
    metalness: 0.03
  });

  const matBaseUnderwear = new THREE.MeshStandardMaterial({
    name: 'BaseUnderwear',
    color: 0xf5dc82,
    roughness: 0.70,
    metalness: 0.02
  });

  fbxObj.traverse((child) => {
    if (child.isMesh) {
      const name = child.name;
      if (name.includes('Head') || name.includes('Hand')) {
        child.material = matClaySkin;
      } else {
        child.material = matBaseUnderwear;
      }
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  // Scale mannequin to real meters
  fbxObj.scale.set(0.28, 0.28, 0.28);
  root.add(fbxObj);

  // Offset mannequin so feet are exactly at Y = 0
  root.updateMatrixWorld(true);
  const rawBox = new THREE.Box3().setFromObject(fbxObj);
  fbxObj.position.y = -rawBox.min.y;
  root.updateMatrixWorld(true);

  // 1. Organic Soft Linen Material (Vải đũi mềm mại màu vàng bơ Dreamina)
  const linenMat = new THREE.MeshStandardMaterial({
    name: 'YellowLinenOutfit',
    color: 0xf5dc82,
    roughness: 0.80, // Soft fabric feel
    metalness: 0.02
  });

  // Add Organic Tunic & Wide-Leg Pants
  const tunic = createOrganicSoftTunic(linenMat);
  root.add(tunic);

  const pants = createOrganicSoftPants(linenMat);
  root.add(pants);

  // Add Shopify High-Quality White Sneakers
  const sneakers = await loadArtisanSneakers();
  root.add(sneakers);

  // Add Artisan Vintage Camera
  const camera = createArtisanVintageCamera();
  root.add(camera);

  // Add Khronos High-Quality Sunglasses
  const sunglasses = await loadKhronosSunglasses(false);
  root.add(sunglasses);

  root.updateMatrixWorld(true);
  console.log('--- VERIFYING ARTISAN SCENE BOUNDS ---');
  console.log('Sunglasses Box:', new THREE.Box3().setFromObject(sunglasses));
  console.log('Sneakers Box:', new THREE.Box3().setFromObject(sneakers));
  console.log('Tunic Box:', new THREE.Box3().setFromObject(tunic));
  console.log('Pants Box:', new THREE.Box3().setFromObject(pants));
  console.log('Camera Box:', new THREE.Box3().setFromObject(camera));
  console.log('Total Scene Box:', new THREE.Box3().setFromObject(root));

  const scene = new THREE.Scene();
  scene.add(root);

  const exporter = new GLTFExporter();

  // Export 1: Full Set (Sunglasses on eyes)
  await new Promise((resolve, reject) => {
    exporter.parse(
      scene,
      (result) => {
        const outPath = 'public/models/roblox_rthro_equipped.glb';
        fs.writeFileSync(outPath, Buffer.from(result));
        console.log(`Exported artisan full set: ${outPath} (${fs.statSync(outPath).size} bytes)`);
        resolve();
      },
      (err) => reject(err),
      { binary: true }
    );
  });

  // Export 2: Forehead Glasses (Sunglasses pushed up on forehead)
  sunglasses.parent?.remove(sunglasses);
  const foreheadGlasses = await loadKhronosSunglasses(true);
  root.add(foreheadGlasses);

  await new Promise((resolve, reject) => {
    exporter.parse(
      scene,
      (result) => {
        const outPath = 'public/models/roblox_rthro_equipped_forehead.glb';
        fs.writeFileSync(outPath, Buffer.from(result));
        console.log(`Exported artisan forehead glasses: ${outPath} (${fs.statSync(outPath).size} bytes)`);
        resolve();
      },
      (err) => reject(err),
      { binary: true }
    );
  });

  // Export 3: Camera Only (No glasses)
  foreheadGlasses.parent?.remove(foreheadGlasses);
  await new Promise((resolve, reject) => {
    exporter.parse(
      scene,
      (result) => {
        const outPath = 'public/models/roblox_rthro_camera_only.glb';
        fs.writeFileSync(outPath, Buffer.from(result));
        console.log(`Exported artisan camera only: ${outPath} (${fs.statSync(outPath).size} bytes)`);
        resolve();
      },
      (err) => reject(err),
      { binary: true }
    );
  });

  // Export 4: Glasses Only (No camera)
  camera.parent?.remove(camera);
  const eyeGlassesOnly = await loadKhronosSunglasses(false);
  root.add(eyeGlassesOnly);

  await new Promise((resolve, reject) => {
    exporter.parse(
      scene,
      (result) => {
        const outPath = 'public/models/roblox_rthro_glasses_only.glb';
        fs.writeFileSync(outPath, Buffer.from(result));
        console.log(`Exported artisan glasses only: ${outPath} (${fs.statSync(outPath).size} bytes)`);
        resolve();
      },
      (err) => reject(err),
      { binary: true }
    );
  });
}

main().catch(console.error);
