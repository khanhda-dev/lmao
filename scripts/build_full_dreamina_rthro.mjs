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
    roughness: 0.08,
    metalness: 0.85
  });

  // Main frame bar across face
  const frameGeo = new THREE.BoxGeometry(0.24, 0.052, 0.022);
  const frameMesh = new THREE.Mesh(frameGeo, frameMat);
  group.add(frameMesh);

  // Left & Right Lenses (dark reflective)
  const lensGeo = new THREE.BoxGeometry(0.088, 0.044, 0.016);
  const leftLens = new THREE.Mesh(lensGeo, lensMat);
  leftLens.position.set(-0.056, -0.002, 0.006);
  group.add(leftLens);

  const rightLens = new THREE.Mesh(lensGeo, lensMat);
  rightLens.position.set(0.056, -0.002, 0.006);
  group.add(rightLens);

  // Bridge
  const bridgeGeo = new THREE.BoxGeometry(0.026, 0.016, 0.018);
  const bridge = new THREE.Mesh(bridgeGeo, frameMat);
  bridge.position.set(0, 0.014, 0.004);
  group.add(bridge);

  // Side Temples (gọng kính hai bên đầu ôm sát mang tai)
  const templeGeo = new THREE.BoxGeometry(0.014, 0.018, 0.19);
  const leftTemple = new THREE.Mesh(templeGeo, frameMat);
  leftTemple.position.set(-0.118, 0.008, -0.095);
  group.add(leftTemple);

  const rightTemple = new THREE.Mesh(templeGeo, frameMat);
  rightTemple.position.set(0.118, 0.008, -0.095);
  group.add(rightTemple);

  if (!onForehead) {
    // Exact position resting on eyes and bridge of nose
    group.position.set(0, 1.585, 0.128);
    group.rotation.x = 0.04;
  } else {
    // Pushed up onto forehead (matching top-down bird's eye photo)
    group.position.set(0, 1.685, 0.095);
    group.rotation.x = -0.58;
  }

  return group;
}

function createVintageCamera() {
  const group = new THREE.Group();
  group.name = 'Accessory_VintageCamera';

  const bodyMat = new THREE.MeshStandardMaterial({
    name: 'CameraBody',
    color: 0x141416, // Black textured leather
    roughness: 0.65,
    metalness: 0.15
  });

  const metalMat = new THREE.MeshStandardMaterial({
    name: 'CameraMetal',
    color: 0xdcdce0, // Brushed chrome / silver
    roughness: 0.25,
    metalness: 0.85
  });

  const lensGlassMat = new THREE.MeshStandardMaterial({
    name: 'CameraLensGlass',
    color: 0x050810,
    roughness: 0.05,
    metalness: 0.95
  });

  const strapMat = new THREE.MeshStandardMaterial({
    name: 'CameraStrap',
    color: 0x221a16, // Dark brown leather strap
    roughness: 0.65,
    metalness: 0.05
  });

  // 1. Camera Body Box
  const bodyGeo = new THREE.BoxGeometry(0.14, 0.085, 0.048);
  const bodyMesh = new THREE.Mesh(bodyGeo, bodyMat);
  group.add(bodyMesh);

  // 2. Silver Top Plate
  const topPlateGeo = new THREE.BoxGeometry(0.142, 0.024, 0.050);
  const topPlate = new THREE.Mesh(topPlateGeo, metalMat);
  topPlate.position.set(0, 0.045, 0);
  group.add(topPlate);

  // 3. Shutter Button & Dials on top
  const shutterGeo = new THREE.CylinderGeometry(0.010, 0.010, 0.014, 16);
  const shutter = new THREE.Mesh(shutterGeo, metalMat);
  shutter.position.set(0.048, 0.062, 0.005);
  group.add(shutter);

  const dialGeo = new THREE.CylinderGeometry(0.013, 0.013, 0.010, 16);
  const dial = new THREE.Mesh(dialGeo, metalMat);
  dial.position.set(-0.048, 0.060, 0.005);
  group.add(dial);

  // 4. Optical Viewfinder Window
  const vfGeo = new THREE.BoxGeometry(0.020, 0.015, 0.010);
  const vf = new THREE.Mesh(vfGeo, lensGlassMat);
  vf.position.set(0.042, 0.045, 0.025);
  group.add(vf);

  // 5. Camera Lens Rings & Glass
  const lensBaseGeo = new THREE.CylinderGeometry(0.038, 0.038, 0.025, 32);
  lensBaseGeo.rotateX(Math.PI / 2);
  const lensBase = new THREE.Mesh(lensBaseGeo, metalMat);
  lensBase.position.set(0, 0, 0.034);
  group.add(lensBase);

  const lensBarrelGeo = new THREE.CylinderGeometry(0.032, 0.034, 0.028, 32);
  lensBarrelGeo.rotateX(Math.PI / 2);
  const lensBarrel = new THREE.Mesh(lensBarrelGeo, bodyMat);
  lensBarrel.position.set(0, 0, 0.046);
  group.add(lensBarrel);

  const lensGlassGeo = new THREE.CylinderGeometry(0.028, 0.028, 0.010, 32);
  lensGlassGeo.rotateX(Math.PI / 2);
  const lensGlass = new THREE.Mesh(lensGlassGeo, lensGlassMat);
  lensGlass.position.set(0, 0, 0.062);
  group.add(lensGlass);

  // 6. Leather Neck Strap: loops from camera lugs around the neck
  // Camera hangs at Y = 1.18m, Z = 0.185m in world coordinates
  // Left strap curve (relative to camera position)
  const leftStrapCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.07, 0.035, 0.0),
    new THREE.Vector3(-0.11, 0.16, -0.06),
    new THREE.Vector3(-0.12, 0.25, -0.15),
    new THREE.Vector3(-0.08, 0.28, -0.24),
    new THREE.Vector3(0, 0.28, -0.26) // Behind back of neck
  ]);
  const leftStrapGeo = new THREE.TubeGeometry(leftStrapCurve, 28, 0.006, 8, false);
  const leftStrap = new THREE.Mesh(leftStrapGeo, strapMat);
  group.add(leftStrap);

  // Right strap curve
  const rightStrapCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.07, 0.035, 0.0),
    new THREE.Vector3(0.11, 0.16, -0.06),
    new THREE.Vector3(0.12, 0.25, -0.15),
    new THREE.Vector3(0.08, 0.28, -0.24),
    new THREE.Vector3(0, 0.28, -0.26) // Behind back of neck
  ]);
  const rightStrapGeo = new THREE.TubeGeometry(rightStrapCurve, 28, 0.006, 8, false);
  const rightStrap = new THREE.Mesh(rightStrapGeo, strapMat);
  group.add(rightStrap);

  // Position camera resting in front of loose tunic on chest
  group.position.set(0, 1.18, 0.185);
  group.rotation.x = -0.06;

  return group;
}

function createBaggyClothing() {
  const clothingGroup = new THREE.Group();
  clothingGroup.name = 'LooseBaggyOutfit';

  const linenMat = new THREE.MeshStandardMaterial({
    name: 'YellowLinenOutfit',
    color: 0xf5dc82, // Dreamina pastel butter yellow
    roughness: 0.75, // Matte fabric/clay
    metalness: 0.02
  });

  // ==================== 1. LOOSE OVERSIZED TUNIC JACKET ====================
  // Torso jacket body: spans from neck (Y = 1.44) down past pelvis/groin to Y = 0.78
  // Loose A-line cylinder/box shape
  const tunicBodyGeo = new THREE.CylinderGeometry(0.24, 0.27, 0.64, 32);
  tunicBodyGeo.scale(1.0, 1.0, 0.78); // Flatten slightly for human torso depth
  const tunicBody = new THREE.Mesh(tunicBodyGeo, linenMat);
  tunicBody.position.set(0, 1.12, 0.01);
  clothingGroup.add(tunicBody);

  // Mandarin collar at neck
  const collarGeo = new THREE.CylinderGeometry(0.11, 0.12, 0.05, 24);
  const collar = new THREE.Mesh(collarGeo, linenMat);
  collar.position.set(0, 1.45, 0.0);
  clothingGroup.add(collar);

  // Front closure placket (center fold)
  const placketGeo = new THREE.BoxGeometry(0.028, 0.62, 0.015);
  const placket = new THREE.Mesh(placketGeo, linenMat);
  placket.position.set(0, 1.11, 0.12);
  clothingGroup.add(placket);

  // Hem cuff band at bottom of tunic
  const tunicHemGeo = new THREE.CylinderGeometry(0.275, 0.28, 0.04, 32);
  tunicHemGeo.scale(1.0, 1.0, 0.78);
  const tunicHem = new THREE.Mesh(tunicHemGeo, linenMat);
  tunicHem.position.set(0, 0.81, 0.01);
  clothingGroup.add(tunicHem);

  // Left & Right Loose Sleeves (covering upper arm & elbow down to three-quarter length)
  function createSleeve(side) {
    const isLeft = side === 'left';
    const xMult = isLeft ? 1 : -1;
    const sleeveGroup = new THREE.Group();

    // Upper loose sleeve
    const sleeveGeo = new THREE.CylinderGeometry(0.115, 0.095, 0.38, 24);
    const sleeve = new THREE.Mesh(sleeveGeo, linenMat);
    sleeve.position.set(0, -0.19, 0);
    sleeveGroup.add(sleeve);

    // Sleeve wide cuff
    const cuffGeo = new THREE.CylinderGeometry(0.10, 0.10, 0.04, 24);
    const cuff = new THREE.Mesh(cuffGeo, linenMat);
    cuff.position.set(0, -0.37, 0);
    sleeveGroup.add(cuff);

    sleeveGroup.position.set(xMult * 0.28, 1.42, 0.0);
    return sleeveGroup;
  }
  clothingGroup.add(createSleeve('left'));
  clothingGroup.add(createSleeve('right'));

  // ==================== 2. WIDE-LEG BAGGY TROUSERS ====================
  // Covers from waist/crotch down to ankle (Y = 0.82 down to Y = 0.10)
  function createPantsLeg(side) {
    const isLeft = side === 'left';
    const xMult = isLeft ? 1 : -1;
    const legGroup = new THREE.Group();

    // Wide straight-leg cylinder (generous loose fit)
    const legGeo = new THREE.CylinderGeometry(0.125, 0.12, 0.72, 28);
    const leg = new THREE.Mesh(legGeo, linenMat);
    leg.position.set(0, -0.36, 0);
    legGroup.add(leg);

    // Bottom rolled cuff
    const cuffGeo = new THREE.CylinderGeometry(0.128, 0.128, 0.05, 28);
    const cuff = new THREE.Mesh(cuffGeo, linenMat);
    cuff.position.set(0, -0.70, 0);
    legGroup.add(cuff);

    legGroup.position.set(xMult * 0.10, 0.82, 0.0);
    return legGroup;
  }
  clothingGroup.add(createPantsLeg('left'));
  clothingGroup.add(createPantsLeg('right'));

  return clothingGroup;
}

function createChunkySneakers() {
  const shoesGroup = new THREE.Group();
  shoesGroup.name = 'WhiteChunkySneakers';

  const sneakerMat = new THREE.MeshStandardMaterial({
    name: 'ChunkySneakersUpper',
    color: 0xffffff, // Pure clean white
    roughness: 0.35,
    metalness: 0.02
  });

  const soleMat = new THREE.MeshStandardMaterial({
    name: 'ChunkySneakersSole',
    color: 0xf2f2f4, // Off-white thick platform sole
    roughness: 0.50,
    metalness: 0.01
  });

  function createSingleShoe(side) {
    const isLeft = side === 'left';
    const xMult = isLeft ? 1 : -1;
    const shoe = new THREE.Group();

    // 1. Thick Chunky Platform Sole
    const soleShape = new THREE.Shape();
    soleShape.moveTo(-0.065, -0.12);
    soleShape.lineTo(0.065, -0.12);
    soleShape.quadraticCurveTo(0.075, 0.0, 0.07, 0.10);
    soleShape.quadraticCurveTo(0.06, 0.16, 0.0, 0.17); // Rounded toe
    soleShape.quadraticCurveTo(-0.06, 0.16, -0.07, 0.10);
    soleShape.quadraticCurveTo(-0.075, 0.0, -0.065, -0.12);

    const soleExtrude = {
      depth: 0.045,
      bevelEnabled: true,
      bevelSegments: 3,
      steps: 1,
      bevelSize: 0.008,
      bevelThickness: 0.008
    };

    const soleGeo = new THREE.ExtrudeGeometry(soleShape, soleExtrude);
    soleGeo.rotateX(-Math.PI / 2);
    const soleMesh = new THREE.Mesh(soleGeo, soleMat);
    soleMesh.position.set(0, 0.01, 0.02);
    shoe.add(soleMesh);

    // 2. Chunky Upper
    const upperGeo = new THREE.BoxGeometry(0.12, 0.08, 0.22);
    const upper = new THREE.Mesh(upperGeo, sneakerMat);
    upper.position.set(0, 0.07, 0.02);
    shoe.add(upper);

    // 3. Rounded Toe Cap
    const toeGeo = new THREE.SphereGeometry(0.058, 20, 16, 0, Math.PI * 2, 0, Math.PI * 0.5);
    toeGeo.scale(1.0, 0.65, 1.2);
    const toe = new THREE.Mesh(toeGeo, sneakerMat);
    toe.position.set(0, 0.055, 0.09);
    shoe.add(toe);

    // 4. Padded Collar around ankle
    const collarGeo = new THREE.TorusGeometry(0.052, 0.016, 12, 24);
    collarGeo.rotateX(Math.PI / 2);
    const collar = new THREE.Mesh(collarGeo, sneakerMat);
    collar.position.set(0, 0.105, -0.01);
    shoe.add(collar);

    // Position on feet (Feet_Geo X center is around ±0.10m)
    shoe.position.set(xMult * 0.10, 0.0, 0.0);
    return shoe;
  }

  shoesGroup.add(createSingleShoe('left'));
  shoesGroup.add(createSingleShoe('right'));

  return shoesGroup;
}

async function buildFullModel() {
  const loader = new FBXLoader();
  const fbxBuffer = fs.readFileSync('/tmp/RthroMannequin.fbx');
  const arrayBuffer = fbxBuffer.buffer.slice(fbxBuffer.byteOffset, fbxBuffer.byteOffset + fbxBuffer.byteLength);

  const fbxObj = loader.parse(arrayBuffer, '');

  const root = new THREE.Group();
  root.name = 'EquippedRobloxRthro';

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

  // Scale mannequin to meters
  fbxObj.scale.set(0.28, 0.28, 0.28);
  root.add(fbxObj);

  // Offset mannequin so feet are exactly on floor Y = 0
  root.updateMatrixWorld(true);
  const rawBox = new THREE.Box3().setFromObject(fbxObj);
  fbxObj.position.y = -rawBox.min.y;
  root.updateMatrixWorld(true);

  // Add 1. Loose Baggy Outfit (Tunic + Wide-leg pants)
  const baggyOutfit = createBaggyClothing();
  root.add(baggyOutfit);

  // Add 2. White Chunky Sneakers
  const chunkySneakers = createChunkySneakers();
  root.add(chunkySneakers);

  // Add 3. Vintage Camera with Neck Strap
  const camera = createVintageCamera();
  root.add(camera);

  // Add 4. Sunglasses (normal on eyes)
  const sunglasses = createSunglasses(false);
  root.add(sunglasses);

  // Verify bounding boxes
  root.updateMatrixWorld(true);
  console.log('--- VERIFYING BOUNDS ---');
  console.log('Sunglasses Box:', new THREE.Box3().setFromObject(sunglasses));
  console.log('Camera Box:', new THREE.Box3().setFromObject(camera));
  console.log('Sneakers Box:', new THREE.Box3().setFromObject(chunkySneakers));
  console.log('Baggy Outfit Box:', new THREE.Box3().setFromObject(baggyOutfit));
  console.log('Total Scene Box:', new THREE.Box3().setFromObject(root));

  // Export 1: Full Set (Sunglasses on eyes)
  const scene = new THREE.Scene();
  scene.add(root);

  const exporter = new GLTFExporter();
  await new Promise((resolve, reject) => {
    exporter.parse(
      scene,
      (result) => {
        const outPath = 'public/models/roblox_rthro_equipped.glb';
        fs.writeFileSync(outPath, Buffer.from(result));
        console.log(`Exported full set: ${outPath} (${fs.statSync(outPath).size} bytes)`);
        resolve();
      },
      (err) => reject(err),
      { binary: true }
    );
  });

  // Export 2: Forehead Glasses (Sunglasses pushed up on forehead)
  sunglasses.parent?.remove(sunglasses);
  const foreheadGlasses = createSunglasses(true);
  root.add(foreheadGlasses);

  await new Promise((resolve, reject) => {
    exporter.parse(
      scene,
      (result) => {
        const outPath = 'public/models/roblox_rthro_equipped_forehead.glb';
        fs.writeFileSync(outPath, Buffer.from(result));
        console.log(`Exported forehead glasses: ${outPath} (${fs.statSync(outPath).size} bytes)`);
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
        console.log(`Exported camera only: ${outPath} (${fs.statSync(outPath).size} bytes)`);
        resolve();
      },
      (err) => reject(err),
      { binary: true }
    );
  });

  // Export 4: Glasses Only (No camera)
  camera.parent?.remove(camera);
  root.add(createSunglasses(false));
  await new Promise((resolve, reject) => {
    exporter.parse(
      scene,
      (result) => {
        const outPath = 'public/models/roblox_rthro_glasses_only.glb';
        fs.writeFileSync(outPath, Buffer.from(result));
        console.log(`Exported glasses only: ${outPath} (${fs.statSync(outPath).size} bytes)`);
        resolve();
      },
      (err) => reject(err),
      { binary: true }
    );
  });
}

buildFullModel().catch(console.error);
