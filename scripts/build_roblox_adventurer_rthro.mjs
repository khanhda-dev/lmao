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

// 1. BUILD TAILORED SHIRT ACCENTS (Cổ bẻ, nẹp cúc, đai vai, thắt lưng có khóa, tay áo xắn)
function buildTailoredShirtAccents(shirtMat, leatherMat, metalMat) {
  const group = new THREE.Group();
  group.name = 'TailoredShirtAccents';

  // 1. Shirt V-neck collar & lapels at neck (Y = 1.43m)
  const leftCollarShape = new THREE.Shape();
  leftCollarShape.moveTo(0, 0);
  leftCollarShape.lineTo(-0.065, 0.035);
  leftCollarShape.lineTo(-0.045, -0.045);
  leftCollarShape.lineTo(0.005, -0.060);
  leftCollarShape.closePath();

  const collarExtrude = { depth: 0.008, bevelEnabled: true, bevelSegments: 2, steps: 1, bevelSize: 0.003, bevelThickness: 0.003 };
  const leftCollarGeo = new THREE.ExtrudeGeometry(leftCollarShape, collarExtrude);
  const leftCollar = new THREE.Mesh(leftCollarGeo, shirtMat);
  leftCollar.position.set(0.042, 1.435, 0.105);
  leftCollar.rotation.set(-0.25, 0.20, -0.05);
  group.add(leftCollar);

  const rightCollar = leftCollar.clone();
  rightCollar.scale.set(-1, 1, 1);
  rightCollar.position.set(-0.042, 1.435, 0.105);
  rightCollar.rotation.set(-0.25, -0.20, 0.05);
  group.add(rightCollar);

  // 2. Button placket down front chest
  const placketGeo = new THREE.BoxGeometry(0.022, 0.42, 0.008);
  const placket = new THREE.Mesh(placketGeo, shirtMat);
  placket.position.set(0, 1.22, 0.142);
  group.add(placket);

  // Small shirt buttons
  for (let i = 0; i < 4; i++) {
    const btnGeo = new THREE.CylinderGeometry(0.004, 0.004, 0.003, 12);
    btnGeo.rotateX(Math.PI / 2);
    const btn = new THREE.Mesh(btnGeo, metalMat);
    btn.position.set(0, 1.36 - i * 0.08, 0.147);
    group.add(btn);
  }

  // 3. Leather Shoulder Harness Straps (Dây đai vai phiêu lưu như trong ảnh minh họa)
  function createHarnessStrap(xMult) {
    const strapCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(xMult * 0.08, 1.02, 0.13),   // Belt front
      new THREE.Vector3(xMult * 0.09, 1.25, 0.14),   // Mid chest
      new THREE.Vector3(xMult * 0.10, 1.43, 0.04),   // Over shoulder
      new THREE.Vector3(xMult * 0.09, 1.25, -0.12),  // Mid back
      new THREE.Vector3(xMult * 0.08, 1.02, -0.12)   // Belt back
    ]);
    const strapGeo = new THREE.TubeGeometry(strapCurve, 24, 0.008, 8, false);
    return new THREE.Mesh(strapGeo, leatherMat);
  }
  group.add(createHarnessStrap(1));
  group.add(createHarnessStrap(-1));

  // Small holster pouch on right harness strap (just like in image.png)
  const harnessPouchGeo = new THREE.BoxGeometry(0.038, 0.052, 0.024);
  const harnessPouch = new THREE.Mesh(harnessPouchGeo, leatherMat);
  harnessPouch.position.set(0.095, 1.28, 0.145);
  harnessPouch.rotation.z = -0.12;
  group.add(harnessPouch);

  // 4. Leather Belt at Waist with Metal Buckle
  const beltCurve = new THREE.EllipseCurve(0, 0, 0.185, 0.135, 0, 2 * Math.PI, false, 0);
  const beltPoints = beltCurve.getPoints(36).map(p => new THREE.Vector3(p.x, 0, p.y));
  const beltPath = new THREE.CatmullRomCurve3(beltPoints, true);
  const beltGeo = new THREE.TubeGeometry(beltPath, 36, 0.016, 8, true);
  beltGeo.scale(1.0, 1.4, 1.0); // Flatten slightly
  const belt = new THREE.Mesh(beltGeo, leatherMat);
  belt.position.set(0, 1.005, 0.0);
  group.add(belt);

  // Metallic Belt Buckle
  const buckleOuterGeo = new THREE.BoxGeometry(0.048, 0.038, 0.012);
  const buckleOuter = new THREE.Mesh(buckleOuterGeo, metalMat);
  buckleOuter.position.set(0, 1.005, 0.142);
  group.add(buckleOuter);

  const buckleInnerGeo = new THREE.BoxGeometry(0.028, 0.022, 0.014);
  const buckleInner = new THREE.Mesh(buckleInnerGeo, leatherMat);
  buckleInner.position.set(0, 1.005, 0.142);
  group.add(buckleInner);

  // 5. Rolled-up sleeve cuffs right above the elbows
  function createRolledCuff(xMult) {
    const cuffGeo = new THREE.TorusGeometry(0.078, 0.016, 12, 24);
    cuffGeo.rotateX(Math.PI / 2);
    const cuff = new THREE.Mesh(cuffGeo, shirtMat);
    cuff.position.set(xMult * 0.285, 1.135, -0.035);
    return cuff;
  }
  group.add(createRolledCuff(1));
  group.add(createRolledCuff(-1));

  // Fabric armband wraps above elbow (blue/accent armband in image.png)
  const armBandMat = new THREE.MeshStandardMaterial({
    name: 'ArmBandAccent',
    color: 0x3b5998, // Classic navy/denim blue accent
    roughness: 0.60
  });
  function createArmBand(xMult) {
    const bandGeo = new THREE.TorusGeometry(0.082, 0.012, 10, 24);
    bandGeo.rotateX(Math.PI / 2);
    const band = new THREE.Mesh(bandGeo, armBandMat);
    band.position.set(xMult * 0.285, 1.185, -0.035);
    return band;
  }
  group.add(createArmBand(1));
  group.add(createArmBand(-1));

  // Leather wristband on right wrist (from image.png)
  const wristbandGeo = new THREE.TorusGeometry(0.045, 0.012, 12, 20);
  wristbandGeo.rotateX(Math.PI / 2);
  const wristband = new THREE.Mesh(wristbandGeo, leatherMat);
  wristband.position.set(-0.355, 0.82, 0.02);
  group.add(wristband);

  return group;
}

// 2. BUILD CARGO PANTS ACCENTS (Túi hộp 3D, gân đầu gối, gấu quần)
function buildCargoPantsAccents(pantsMat, leatherMat) {
  const group = new THREE.Group();
  group.name = 'CargoPantsAccents';

  // 1. Right Hip Cargo Holster Pouch (from image.png)
  const hipPouchGroup = new THREE.Group();
  const hipPouchGeo = new THREE.BoxGeometry(0.055, 0.12, 0.045);
  const hipPouch = new THREE.Mesh(hipPouchGeo, pantsMat);
  hipPouchGroup.add(hipPouch);

  const hipFlapGeo = new THREE.BoxGeometry(0.058, 0.032, 0.048);
  const hipFlap = new THREE.Mesh(hipFlapGeo, pantsMat);
  hipFlap.position.set(0, 0.055, 0.002);
  hipPouchGroup.add(hipFlap);

  // Leg strap securing hip pouch
  const legStrapGeo = new THREE.CylinderGeometry(0.125, 0.125, 0.018, 24);
  const legStrap = new THREE.Mesh(legStrapGeo, leatherMat);
  legStrap.position.set(-0.015, -0.02, 0);
  hipPouchGroup.add(legStrap);

  hipPouchGroup.position.set(0.185, 0.72, 0.02);
  hipPouchGroup.rotation.z = -0.05;
  group.add(hipPouchGroup);

  // 2. Left Knee Cargo Pocket (from image.png)
  const kneePouchGroup = new THREE.Group();
  const kneePouchGeo = new THREE.BoxGeometry(0.048, 0.095, 0.040);
  const kneePouch = new THREE.Mesh(kneePouchGeo, pantsMat);
  kneePouchGroup.add(kneePouch);

  const kneeFlapGeo = new THREE.BoxGeometry(0.052, 0.028, 0.044);
  const kneeFlap = new THREE.Mesh(kneeFlapGeo, pantsMat);
  kneeFlap.position.set(0, 0.042, 0.002);
  kneePouchGroup.add(kneeFlap);

  kneePouchGroup.position.set(-0.170, 0.52, 0.02);
  group.add(kneePouchGroup);

  // 3. Horizontal Knee Seam Ridges on both legs
  function createKneeRidge(xMult) {
    const ridgeGeo = new THREE.TorusGeometry(0.092, 0.009, 8, 24);
    ridgeGeo.rotateX(Math.PI / 2);
    const ridge = new THREE.Mesh(ridgeGeo, pantsMat);
    ridge.position.set(xMult * 0.092, 0.49, -0.02);
    return ridge;
  }
  group.add(createKneeRidge(1));
  group.add(createKneeRidge(-1));

  // 4. Trouser cuffs above sneakers
  function createPantsCuff(xMult) {
    const cuffGeo = new THREE.TorusGeometry(0.088, 0.016, 12, 24);
    cuffGeo.rotateX(Math.PI / 2);
    const cuff = new THREE.Mesh(cuffGeo, leatherMat);
    cuff.position.set(xMult * 0.100, 0.135, 0.01);
    return cuff;
  }
  group.add(createPantsCuff(1));
  group.add(createPantsCuff(-1));

  return group;
}

// 3. KHRONOS SUNGLASSES (Scaled to 1.05 to fit face perfectly)
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
    color: 0x121214,
    roughness: 0.25,
    metalness: 0.15
  });

  const lensMat = new THREE.MeshStandardMaterial({
    name: 'KhronosLensMat',
    color: 0x060608,
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

  // Scaled to 1.05: width = 15.8 cm, height = 6.0 cm (ideal human proportion!)
  sunglassesScene.scale.set(1.05, 1.05, 1.05);

  if (!onForehead) {
    wrapper.position.set(0, 1.585, 0.125);
    wrapper.rotation.x = 0.02;
  } else {
    wrapper.position.set(0, 1.685, 0.095);
    wrapper.rotation.x = -0.58;
  }

  return wrapper;
}

// 4. SHOPIFY SNEAKERS
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

  const leftShoe = new THREE.Mesh(bakedGeo.clone(), whiteSneakerMat);
  leftShoe.rotation.y = -Math.PI / 2;
  leftShoe.scale.set(0.80, 0.80, 0.80);
  leftShoe.position.set(0.100, 0.0, 0.015);
  sneakersGroup.add(leftShoe);

  const rightShoe = new THREE.Mesh(bakedGeo.clone(), whiteSneakerMat);
  rightShoe.rotation.y = -Math.PI / 2;
  rightShoe.scale.set(-0.80, 0.80, 0.80);
  rightShoe.position.set(-0.100, 0.0, 0.015);
  sneakersGroup.add(rightShoe);

  return sneakersGroup;
}

// 5. VINTAGE CAMERA WITH STRAP
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

  group.position.set(0, 1.18, 0.185);
  group.rotation.x = -0.06;

  return group;
}

async function main() {
  const fbxLoader = new FBXLoader();
  const fbxBuffer = fs.readFileSync('/tmp/RthroMannequin.fbx');
  const arrayBuffer = fbxBuffer.buffer.slice(fbxBuffer.byteOffset, fbxBuffer.byteOffset + fbxBuffer.byteLength);

  const fbxObj = fbxLoader.parse(arrayBuffer, '');

  const root = new THREE.Group();
  root.name = 'AdventurerRobloxRthroScene';

  // 1. SKIN MATERIAL (Head, Forearms, Hands)
  const matClaySkin = new THREE.MeshStandardMaterial({
    name: 'ClaySkinMat',
    color: 0xf5ded0,
    roughness: 0.58,
    metalness: 0.02
  });

  // 2. ADVENTURER SHIRT MATERIAL (Light safari blue as in image.png)
  const matShirt = new THREE.MeshStandardMaterial({
    name: 'AdventureShirtMat',
    color: 0xb5ccd9, // Pale adventurer blue from image.png
    roughness: 0.72,
    metalness: 0.02
  });

  // 3. CARGO PANTS MATERIAL (Khaki tan utility pants from image.png)
  const matPants = new THREE.MeshStandardMaterial({
    name: 'CargoPantsMat',
    color: 0x98826a, // Khaki cargo tan from image.png
    roughness: 0.76,
    metalness: 0.02
  });

  // 4. LEATHER HARNESS & BELT MATERIAL (Warm saddle brown)
  const matLeather = new THREE.MeshStandardMaterial({
    name: 'LeatherHarnessMat',
    color: 0x5a3d28, // Dark leather brown
    roughness: 0.65,
    metalness: 0.05
  });

  // 5. METAL HARDWARE (Buckle, buttons, rings)
  const matMetal = new THREE.MeshStandardMaterial({
    name: 'MetalHardwareMat',
    color: 0xd8d8de,
    roughness: 0.25,
    metalness: 0.85
  });

  // Apply materials directly to anatomical Rthro body meshes
  fbxObj.traverse((child) => {
    if (child.isMesh) {
      const name = child.name;
      if (name.includes('Head') || name.includes('Hand') || name.includes('LowerArm')) {
        child.material = matClaySkin;
        child.visible = true;
      } else if (name.includes('UpperTorso') || name.includes('UpperArm')) {
        child.material = matShirt;
        child.visible = true;
      } else if (name.includes('LowerTorso') || name.includes('Leg')) {
        child.material = matPants;
        child.visible = true;
      } else if (name.includes('Foot')) {
        // Feet will be encased in the Shopify sneakers
        child.visible = false;
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

  // Add 3D Tailored Shirt Accents (Collar lapels, harness, belt & buckle, rolled cuffs, armband)
  const shirtAccents = buildTailoredShirtAccents(matShirt, matLeather, matMetal);
  root.add(shirtAccents);

  // Add 3D Cargo Pants Accents (Holster pouch, knee cargo pocket, knee seam ridges, leg cuffs)
  const cargoAccents = buildCargoPantsAccents(matPants, matLeather);
  root.add(cargoAccents);

  // Add Shopify White Sneakers
  const sneakers = await loadArtisanSneakers();
  root.add(sneakers);

  // Add Vintage Camera with Strap
  const camera = createArtisanVintageCamera();
  root.add(camera);

  // Add Khronos Sunglasses
  const sunglasses = await loadProportionalSunglasses(false);
  root.add(sunglasses);

  root.updateMatrixWorld(true);
  console.log('--- VERIFYING ADVENTURER RTHRO BOUNDS ---');
  console.log('Sunglasses Box:', new THREE.Box3().setFromObject(sunglasses));
  console.log('Sneakers Box:', new THREE.Box3().setFromObject(sneakers));
  console.log('Shirt Accents Box:', new THREE.Box3().setFromObject(shirtAccents));
  console.log('Cargo Accents Box:', new THREE.Box3().setFromObject(cargoAccents));
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
        console.log(`Exported adventurer full set: ${outPath} (${fs.statSync(outPath).size} bytes)`);
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
        console.log(`Exported adventurer forehead glasses: ${outPath} (${fs.statSync(outPath).size} bytes)`);
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
        console.log(`Exported adventurer camera only: ${outPath} (${fs.statSync(outPath).size} bytes)`);
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
        console.log(`Exported adventurer glasses only: ${outPath} (${fs.statSync(outPath).size} bytes)`);
        resolve();
      },
      (err) => reject(err),
      { binary: true }
    );
  });
}

main().catch(console.error);
