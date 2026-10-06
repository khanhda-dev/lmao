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

// Build a smooth, organic, continuous Tunic Jacket
function buildUnifiedTunic(linenMat) {
  const group = new THREE.Group();
  group.name = 'UnifiedTunic';

  // 1. Main Tunic Body (Torso from neck base down past hips)
  // Cross-sections along height Y
  const bodyProfile = [
    { y: 1.45, rx: 0.095, rz: 0.090 }, // Neck base
    { y: 1.41, rx: 0.180, rz: 0.130 }, // Shoulders
    { y: 1.30, rx: 0.220, rz: 0.150 }, // Chest
    { y: 1.18, rx: 0.225, rz: 0.155 }, // Mid-torso
    { y: 1.05, rx: 0.230, rz: 0.160 }, // Waist (straight relaxed drape)
    { y: 0.92, rx: 0.245, rz: 0.170 }, // Hips
    { y: 0.80, rx: 0.255, rz: 0.175 }, // Lower hem
    { y: 0.78, rx: 0.245, rz: 0.165 }  // Inward hem fold
  ];

  const radialSegments = 36;
  const heightSegments = bodyProfile.length - 1;
  const vertices = [];
  const uvs = [];
  const indices = [];

  for (let j = 0; j <= heightSegments; j++) {
    const p = bodyProfile[j];
    const v = j / heightSegments;
    for (let i = 0; i <= radialSegments; i++) {
      const u = i / radialSegments;
      const theta = u * Math.PI * 2;

      // Subtle organic cloth ripple
      const ripple = 1.0 + 0.02 * Math.sin(theta * 6) + 0.01 * Math.cos(theta * 4);
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

  const bodyGeo = new THREE.BufferGeometry();
  bodyGeo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  bodyGeo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  bodyGeo.setIndex(indices);
  bodyGeo.computeVertexNormals();

  const bodyMesh = new THREE.Mesh(bodyGeo, linenMat);
  group.add(bodyMesh);

  // 2. Mandarin Stand Collar
  const collarGeo = new THREE.TorusGeometry(0.092, 0.015, 16, 32);
  collarGeo.rotateX(Math.PI / 2);
  const collar = new THREE.Mesh(collarGeo, linenMat);
  collar.position.set(0, 1.45, 0.0);
  group.add(collar);

  // 3. Front Overlap Placket
  const placketGeo = new THREE.BoxGeometry(0.024, 0.64, 0.012);
  const placket = new THREE.Mesh(placketGeo, linenMat);
  placket.position.set(0.01, 1.12, 0.16);
  group.add(placket);

  // 4. Continuous Relaxed Sleeves (Flowing naturally from shoulder down to wrist)
  function createSleeve(side) {
    const isLeft = side === 'left';
    const xMult = isLeft ? 1 : -1;
    const sleeve = new THREE.Group();

    // Curve along the arm from shoulder (Y = 1.38) down to wrist (Y = 0.88)
    const sleevePoints = [
      { y: 1.38, rx: 0.115, rz: 0.115 }, // Shoulder join
      { y: 1.25, rx: 0.105, rz: 0.105 }, // Upper bicep
      { y: 1.12, rx: 0.098, rz: 0.098 }, // Elbow
      { y: 0.98, rx: 0.092, rz: 0.092 }, // Mid-forearm
      { y: 0.88, rx: 0.088, rz: 0.088 }  // Sleeve cuff (hand emerges below)
    ];

    const sVerts = [];
    const sUvs = [];
    const sIndices = [];
    const sSegs = 24;

    for (let j = 0; j < sleevePoints.length; j++) {
      const p = sleevePoints[j];
      const v = j / (sleevePoints.length - 1);
      for (let i = 0; i <= sSegs; i++) {
        const u = i / sSegs;
        const theta = u * Math.PI * 2;
        const x = p.rx * Math.cos(theta);
        const z = p.rz * Math.sin(theta);
        const y = p.y;
        sVerts.push(x, y, z);
        sUvs.push(u, v);
      }
    }

    for (let j = 0; j < sleevePoints.length - 1; j++) {
      for (let i = 0; i < sSegs; i++) {
        const a = j * (sSegs + 1) + i;
        const b = (j + 1) * (sSegs + 1) + i;
        const c = (j + 1) * (sSegs + 1) + (i + 1);
        const d = j * (sSegs + 1) + (i + 1);
        sIndices.push(a, b, d);
        sIndices.push(b, c, d);
      }
    }

    const sGeo = new THREE.BufferGeometry();
    sGeo.setAttribute('position', new THREE.Float32BufferAttribute(sVerts, 3));
    sGeo.setAttribute('uv', new THREE.Float32BufferAttribute(sUvs, 2));
    sGeo.setIndex(sIndices);
    sGeo.computeVertexNormals();

    const sMesh = new THREE.Mesh(sGeo, linenMat);
    sleeve.add(sMesh);

    // Rolled sleeve cuff
    const cuffGeo = new THREE.TorusGeometry(0.086, 0.012, 12, 24);
    cuffGeo.rotateX(Math.PI / 2);
    const cuff = new THREE.Mesh(cuffGeo, linenMat);
    cuff.position.set(0, 0.88, 0.0);
    sleeve.add(cuff);

    sleeve.position.set(xMult * 0.28, 0, 0);
    return sleeve;
  }

  group.add(createSleeve('left'));
  group.add(createSleeve('right'));

  return group;
}

// Build Wide-Leg Linen Pants (Quần ống suông rộng)
function buildWideLegPants(linenMat) {
  const group = new THREE.Group();
  group.name = 'WideLegPants';

  function createTrouserLeg(side) {
    const isLeft = side === 'left';
    const xMult = isLeft ? 1 : -1;
    const leg = new THREE.Group();

    // From under the tunic (Y = 0.82) straight down to sneakers (Y = 0.08)
    const legPoints = [
      { y: 0.82, rx: 0.125, rz: 0.125 }, // Top join under tunic
      { y: 0.65, rx: 0.120, rz: 0.120 }, // Upper thigh
      { y: 0.45, rx: 0.118, rz: 0.118 }, // Knee (loose straight cut)
      { y: 0.25, rx: 0.115, rz: 0.115 }, // Shin
      { y: 0.09, rx: 0.112, rz: 0.112 }  // Bottom hem above sneakers
    ];

    const lVerts = [];
    const lUvs = [];
    const lIndices = [];
    const lSegs = 28;

    for (let j = 0; j < legPoints.length; j++) {
      const p = legPoints[j];
      const v = j / (legPoints.length - 1);
      for (let i = 0; i <= lSegs; i++) {
        const u = i / lSegs;
        const theta = u * Math.PI * 2;
        // Subtle vertical cloth fold
        const fold = 1.0 + 0.025 * Math.sin(theta * 4);
        const x = p.rx * Math.cos(theta) * fold;
        const z = p.rz * Math.sin(theta) * fold;
        const y = p.y;
        lVerts.push(x, y, z);
        lUvs.push(u, v);
      }
    }

    for (let j = 0; j < legPoints.length - 1; j++) {
      for (let i = 0; i < lSegs; i++) {
        const a = j * (lSegs + 1) + i;
        const b = (j + 1) * (lSegs + 1) + i;
        const c = (j + 1) * (lSegs + 1) + (i + 1);
        const d = j * (lSegs + 1) + (i + 1);
        lIndices.push(a, b, d);
        lIndices.push(b, c, d);
      }
    }

    const lGeo = new THREE.BufferGeometry();
    lGeo.setAttribute('position', new THREE.Float32BufferAttribute(lVerts, 3));
    lGeo.setAttribute('uv', new THREE.Float32BufferAttribute(lUvs, 2));
    lGeo.setIndex(lIndices);
    lGeo.computeVertexNormals();

    const lMesh = new THREE.Mesh(lGeo, linenMat);
    leg.add(lMesh);

    // Trouser hem cuff ring resting right on top of the sneaker
    const cuffGeo = new THREE.TorusGeometry(0.110, 0.012, 12, 28);
    cuffGeo.rotateX(Math.PI / 2);
    const cuff = new THREE.Mesh(cuffGeo, linenMat);
    cuff.position.set(0, 0.09, 0.0);
    leg.add(cuff);

    leg.position.set(xMult * 0.105, 0, 0);
    return leg;
  }

  group.add(createTrouserLeg('left'));
  group.add(createTrouserLeg('right'));

  return group;
}

// Load Khronos Sunglasses with PROPORTIONAL SIZE (scale = 1.08)
async function loadProportionalSunglasses(onForehead = false) {
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
    color: 0x121214, // Matte black
    roughness: 0.25,
    metalness: 0.15
  });

  const lensMat = new THREE.MeshStandardMaterial({
    name: 'KhronosLensMat',
    color: 0x060608, // Dark polarized glass
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

  // Proportional scale: 1.08 (Width = 16.3 cm, matches mannequin facial width perfectly!)
  sunglassesScene.scale.set(1.08, 1.08, 1.08);

  if (!onForehead) {
    // Resting on bridge of nose and eyes
    wrapper.position.set(0, 1.585, 0.125);
    wrapper.rotation.x = 0.02;
  } else {
    // Pushed up onto forehead (matching bird's eye view)
    wrapper.position.set(0, 1.685, 0.095);
    wrapper.rotation.x = -0.58;
  }

  return wrapper;
}

// Shopify Sneakers
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

  const bakedGeo = shoeMesh.geometry.clone();
  bakedGeo.applyMatrix4(shoeMesh.matrixWorld);
  bakedGeo.computeBoundingBox();
  const box = bakedGeo.boundingBox;
  bakedGeo.translate(-(box.min.x + box.max.x) / 2, -box.min.y, -(box.min.z + box.max.z) / 2);

  const sneakersGroup = new THREE.Group();
  sneakersGroup.name = 'ShopifyArtisanSneakers';

  const whiteSneakerMat = new THREE.MeshStandardMaterial({
    name: 'SneakerWhiteLeather',
    color: 0xffffff,
    roughness: 0.35,
    metalness: 0.02
  });

  // Left shoe
  const leftShoe = new THREE.Mesh(bakedGeo.clone(), whiteSneakerMat);
  leftShoe.rotation.y = -Math.PI / 2;
  leftShoe.scale.set(0.80, 0.80, 0.80);
  leftShoe.position.set(0.105, 0.0, 0.02);
  sneakersGroup.add(leftShoe);

  // Right shoe (mirrored)
  const rightShoe = new THREE.Mesh(bakedGeo.clone(), whiteSneakerMat);
  rightShoe.rotation.y = -Math.PI / 2;
  rightShoe.scale.set(-0.80, 0.80, 0.80);
  rightShoe.position.set(-0.105, 0.0, 0.02);
  sneakersGroup.add(rightShoe);

  return sneakersGroup;
}

// Vintage Camera with Strap
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

  const chassisGeo = new THREE.BoxGeometry(0.138, 0.082, 0.046);
  const chassis = new THREE.Mesh(chassisGeo, bodyMat);
  group.add(chassis);

  const topPlateGeo = new THREE.BoxGeometry(0.140, 0.022, 0.048);
  const topPlate = new THREE.Mesh(topPlateGeo, chromeMat);
  topPlate.position.set(0, 0.043, 0);
  group.add(topPlate);

  const shutterGeo = new THREE.CylinderGeometry(0.009, 0.009, 0.014, 20);
  const shutter = new THREE.Mesh(shutterGeo, chromeMat);
  shutter.position.set(0.046, 0.060, 0.004);
  group.add(shutter);

  const dialGeo = new THREE.CylinderGeometry(0.013, 0.013, 0.010, 20);
  const dial = new THREE.Mesh(dialGeo, chromeMat);
  dial.position.set(-0.046, 0.058, 0.004);
  group.add(dial);

  const vfGeo = new THREE.BoxGeometry(0.018, 0.014, 0.008);
  const vf = new THREE.Mesh(vfGeo, glassMat);
  vf.position.set(0.040, 0.043, 0.024);
  group.add(vf);

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

  group.position.set(0, 1.18, 0.190);
  group.rotation.x = -0.06;

  return group;
}

async function main() {
  const fbxLoader = new FBXLoader();
  const fbxBuffer = fs.readFileSync('/tmp/RthroMannequin.fbx');
  const arrayBuffer = fbxBuffer.buffer.slice(fbxBuffer.byteOffset, fbxBuffer.byteOffset + fbxBuffer.byteLength);

  const fbxObj = fbxLoader.parse(arrayBuffer, '');

  const root = new THREE.Group();
  root.name = 'ArtisanRobloxRthroScene';

  const matClaySkin = new THREE.MeshStandardMaterial({
    name: 'ClaySkinHeadHands',
    color: 0xf5ded0, // Clean porcelain/clay skin tone
    roughness: 0.60,
    metalness: 0.03
  });

  // HIDE hidden body parts (NO tight yellow body underneath!)
  // Keep ONLY exposed skin: Head & Hands!
  fbxObj.traverse((child) => {
    if (child.isMesh) {
      if (child.name.includes('Head') || child.name.includes('Hand')) {
        child.material = matClaySkin;
        child.visible = true;
      } else {
        child.visible = false; // Hide inner torso, arms, legs, feet!
      }
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  fbxObj.scale.set(0.28, 0.28, 0.28);
  root.add(fbxObj);

  root.updateMatrixWorld(true);
  const rawBox = new THREE.Box3().setFromObject(fbxObj);
  fbxObj.position.y = -rawBox.min.y;
  root.updateMatrixWorld(true);

  // Soft Butter Yellow Linen Material
  const linenMat = new THREE.MeshStandardMaterial({
    name: 'YellowLinenOutfit',
    color: 0xf5dc82, // Dreamina pastel butter yellow
    roughness: 0.78, // Soft linen matte
    metalness: 0.02
  });

  // Add 1. Seamless, unified Tunic Jacket
  const tunic = buildUnifiedTunic(linenMat);
  root.add(tunic);

  // Add 2. Tailored Wide-Leg Pants
  const pants = buildWideLegPants(linenMat);
  root.add(pants);

  // Add 3. Shopify White Sneakers
  const sneakers = await loadArtisanSneakers();
  root.add(sneakers);

  // Add 4. Vintage Camera with Leather Neck Strap
  const camera = createArtisanVintageCamera();
  root.add(camera);

  // Add 5. Proportional Khronos Sunglasses (scale = 1.08)
  const sunglasses = await loadProportionalSunglasses(false);
  root.add(sunglasses);

  root.updateMatrixWorld(true);
  console.log('--- CLEAN VERIFIED BOUNDS ---');
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
        console.log(`Exported clean full set: ${outPath} (${fs.statSync(outPath).size} bytes)`);
        resolve();
      },
      (err) => reject(err),
      { binary: true }
    );
  });

  // Export 2: Forehead Glasses (Sunglasses pushed up on forehead)
  sunglasses.parent?.remove(sunglasses);
  const foreheadGlasses = await loadProportionalSunglasses(true);
  root.add(foreheadGlasses);

  await new Promise((resolve, reject) => {
    exporter.parse(
      scene,
      (result) => {
        const outPath = 'public/models/roblox_rthro_equipped_forehead.glb';
        fs.writeFileSync(outPath, Buffer.from(result));
        console.log(`Exported clean forehead glasses: ${outPath} (${fs.statSync(outPath).size} bytes)`);
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
        console.log(`Exported clean camera only: ${outPath} (${fs.statSync(outPath).size} bytes)`);
        resolve();
      },
      (err) => reject(err),
      { binary: true }
    );
  });

  // Export 4: Glasses Only (No camera)
  camera.parent?.remove(camera);
  const eyeGlassesOnly = await loadProportionalSunglasses(false);
  root.add(eyeGlassesOnly);

  await new Promise((resolve, reject) => {
    exporter.parse(
      scene,
      (result) => {
        const outPath = 'public/models/roblox_rthro_glasses_only.glb';
        fs.writeFileSync(outPath, Buffer.from(result));
        console.log(`Exported clean glasses only: ${outPath} (${fs.statSync(outPath).size} bytes)`);
        resolve();
      },
      (err) => reject(err),
      { binary: true }
    );
  });
}

main().catch(console.error);
