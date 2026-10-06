import fs from 'fs';
import * as THREE from 'three';
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

function createRoundedBox(w, h, d, r, s = 3) {
  const shape = new THREE.Shape();
  const x = -w / 2;
  const y = -h / 2;
  shape.moveTo(x + r, y);
  shape.lineTo(x + w - r, y);
  shape.quadraticCurveTo(x + w, y, x + w, y + r);
  shape.lineTo(x + w, y + h - r);
  shape.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  shape.lineTo(x + r, y + h);
  shape.quadraticCurveTo(x, y + h, x, y + h - r);
  shape.lineTo(x, y + r);
  shape.quadraticCurveTo(x, y, x + r, y);

  const extrudeSettings = {
    depth: d - 2 * r,
    bevelEnabled: true,
    bevelSegments: s,
    steps: 1,
    bevelSize: r,
    bevelThickness: r
  };

  const geo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
  geo.center();
  return geo;
}

function createTaperedLimb(topW, botW, topD, botD, height) {
  const geo = new THREE.CylinderGeometry(topW / 2, botW / 2, height, 28, 4);
  geo.scale(1, 1, topD / topW);
  return geo;
}

function buildModel(armAngleDegrees = 0) {
  const root = new THREE.Group();
  root.name = 'RobloxRthroAvatar';

  // Materials
  const matHead = new THREE.MeshStandardMaterial({
    name: 'HeadMaterial',
    color: 0xf5cd2f, // Classic Roblox Yellow
    roughness: 0.35,
    metalness: 0.05
  });

  const matTorso = new THREE.MeshStandardMaterial({
    name: 'TorsoMaterial',
    color: 0x0078d7, // Classic Roblox Blue
    roughness: 0.30,
    metalness: 0.05
  });

  const matArms = new THREE.MeshStandardMaterial({
    name: 'ArmsMaterial',
    color: 0xf5cd2f, // Yellow
    roughness: 0.35,
    metalness: 0.05
  });

  const matLegs = new THREE.MeshStandardMaterial({
    name: 'LegsMaterial',
    color: 0x27ae60, // Classic Roblox Green
    roughness: 0.35,
    metalness: 0.05
  });

  const matJoints = new THREE.MeshStandardMaterial({
    name: 'JointsMaterial',
    color: 0x222226,
    roughness: 0.45,
    metalness: 0.20
  });

  const matFace = new THREE.MeshStandardMaterial({
    name: 'FaceMaterial',
    color: 0x111115,
    roughness: 0.20,
    metalness: 0.05
  });

  const matStud = new THREE.MeshStandardMaterial({
    name: 'StudMaterial',
    color: 0xddb622,
    roughness: 0.35,
    metalness: 0.05
  });

  // ==================== 1. HEAD & STUD ====================
  const headGroup = new THREE.Group();
  headGroup.name = 'HeadGroup';
  headGroup.position.set(0, 1.62, 0);

  // Cylinder Head with rounded top/bottom caps
  const headGeo = new THREE.CylinderGeometry(0.135, 0.135, 0.22, 32);
  const headMesh = new THREE.Mesh(headGeo, matHead);
  headMesh.name = 'Head';
  headGroup.add(headMesh);

  // Top Dome
  const topCapGeo = new THREE.SphereGeometry(0.135, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.35);
  const topCapMesh = new THREE.Mesh(topCapGeo, matHead);
  topCapMesh.position.y = 0.075;
  headGroup.add(topCapMesh);

  // Bottom Dome
  const botCapGeo = new THREE.SphereGeometry(0.135, 32, 16, 0, Math.PI * 2, Math.PI * 0.65, Math.PI * 0.35);
  const botCapMesh = new THREE.Mesh(botCapGeo, matHead);
  botCapMesh.position.y = -0.075;
  headGroup.add(botCapMesh);

  // Iconic Top Stud (Trademark Roblox Cylinder Stud)
  const studGeo = new THREE.CylinderGeometry(0.065, 0.065, 0.045, 32);
  const studMesh = new THREE.Mesh(studGeo, matStud);
  studMesh.name = 'HeadStud';
  studMesh.position.set(0, 0.165, 0);
  headGroup.add(studMesh);

  const studCapGeo = new THREE.CylinderGeometry(0.058, 0.065, 0.012, 32);
  const studCap = new THREE.Mesh(studCapGeo, matStud);
  studCap.position.set(0, 0.19, 0);
  headGroup.add(studCap);

  // Classic Friendly Roblox Face (High precision 3D embossed features)
  const eyeGeo = new THREE.CylinderGeometry(0.018, 0.018, 0.012, 20);
  eyeGeo.rotateX(Math.PI / 2);

  const leftEye = new THREE.Mesh(eyeGeo, matFace);
  leftEye.position.set(-0.045, 0.02, 0.137);
  headGroup.add(leftEye);

  const rightEye = new THREE.Mesh(eyeGeo, matFace);
  rightEye.position.set(0.045, 0.02, 0.137);
  headGroup.add(rightEye);

  // Smile
  const smileGeo = new THREE.TorusGeometry(0.045, 0.008, 12, 28, Math.PI * 0.85);
  smileGeo.rotateZ(Math.PI * 1.075);
  const smile = new THREE.Mesh(smileGeo, matFace);
  smile.position.set(0, -0.035, 0.136);
  headGroup.add(smile);

  root.add(headGroup);

  // ==================== 2. NECK ====================
  const neckGeo = new THREE.CylinderGeometry(0.06, 0.068, 0.05, 24);
  const neckMesh = new THREE.Mesh(neckGeo, matJoints);
  neckMesh.name = 'Neck';
  neckMesh.position.set(0, 1.48, 0);
  root.add(neckMesh);

  // ==================== 3. UPPER TORSO (CHEST) ====================
  const chestGroup = new THREE.Group();
  chestGroup.name = 'UpperTorso';
  chestGroup.position.set(0, 1.26, 0);

  const chestGeo = createRoundedBox(0.42, 0.38, 0.22, 0.035, 4);
  const chestMesh = new THREE.Mesh(chestGeo, matTorso);
  chestMesh.name = 'ChestBlock';
  chestGroup.add(chestMesh);

  const collarGeo = new THREE.CylinderGeometry(0.09, 0.11, 0.04, 24);
  const collar = new THREE.Mesh(collarGeo, matTorso);
  collar.position.set(0, 0.18, 0);
  chestGroup.add(collar);

  // Roblox Logo badge (tilted square emblem)
  const badgeGeo = new THREE.BoxGeometry(0.06, 0.06, 0.014);
  badgeGeo.rotateZ(Math.PI / 4);
  const badgeMesh = new THREE.Mesh(badgeGeo, matStud);
  badgeMesh.position.set(0, 0.06, 0.115);
  chestGroup.add(badgeMesh);

  const badgeHole = new THREE.BoxGeometry(0.024, 0.024, 0.016);
  badgeHole.rotateZ(Math.PI / 4);
  const badgeHoleMesh = new THREE.Mesh(badgeHole, matTorso);
  badgeHoleMesh.position.set(0, 0.06, 0.116);
  chestGroup.add(badgeHoleMesh);

  root.add(chestGroup);

  // ==================== 4. LOWER TORSO (PELVIS / WAIST) ====================
  const pelvisGroup = new THREE.Group();
  pelvisGroup.name = 'LowerTorso';
  pelvisGroup.position.set(0, 0.98, 0);

  const waistJointGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.06, 24);
  const waistJoint = new THREE.Mesh(waistJointGeo, matJoints);
  waistJoint.position.set(0, 0.07, 0);
  pelvisGroup.add(waistJoint);

  const pelvisGeo = createRoundedBox(0.36, 0.18, 0.20, 0.03, 4);
  const pelvisMesh = new THREE.Mesh(pelvisGeo, matTorso);
  pelvisMesh.name = 'PelvisBlock';
  pelvisGroup.add(pelvisMesh);

  root.add(pelvisGroup);

  // ==================== 5. ARMS ====================
  function createArm(side) {
    const isLeft = side === 'left';
    const xMult = isLeft ? 1 : -1;
    const armGroup = new THREE.Group();
    armGroup.name = isLeft ? 'LeftArmGroup' : 'RightArmGroup';
    armGroup.position.set(xMult * 0.28, 1.40, 0.0);

    // Apply arm angle (0 for vertical I-pose, e.g. 35 for A-pose)
    const angleRad = (armAngleDegrees * Math.PI) / 180;
    armGroup.rotation.z = isLeft ? -angleRad : angleRad;

    const shoulderBallGeo = new THREE.SphereGeometry(0.065, 24, 16);
    const shoulderBall = new THREE.Mesh(shoulderBallGeo, matJoints);
    armGroup.add(shoulderBall);

    const shoulderCapGeo = createRoundedBox(0.11, 0.09, 0.12, 0.02, 3);
    const shoulderCap = new THREE.Mesh(shoulderCapGeo, matArms);
    shoulderCap.position.set(xMult * 0.01, -0.02, 0);
    armGroup.add(shoulderCap);

    // Upper Arm
    const upperArmGeo = createTaperedLimb(0.10, 0.088, 0.10, 0.088, 0.26);
    const upperArm = new THREE.Mesh(upperArmGeo, matArms);
    upperArm.name = isLeft ? 'LeftUpperArm' : 'RightUpperArm';
    upperArm.position.set(0, -0.17, 0);
    armGroup.add(upperArm);

    // Elbow Joint
    const elbowGeo = new THREE.SphereGeometry(0.048, 20, 16);
    const elbow = new THREE.Mesh(elbowGeo, matJoints);
    elbow.position.set(0, -0.31, 0);
    armGroup.add(elbow);

    // Lower Arm
    const lowerArmGeo = createTaperedLimb(0.086, 0.075, 0.086, 0.075, 0.25);
    const lowerArm = new THREE.Mesh(lowerArmGeo, matArms);
    lowerArm.name = isLeft ? 'LeftLowerArm' : 'RightLowerArm';
    lowerArm.position.set(0, -0.45, 0);
    armGroup.add(lowerArm);

    // Wrist Joint
    const wristGeo = new THREE.SphereGeometry(0.042, 16, 12);
    const wrist = new THREE.Mesh(wristGeo, matJoints);
    wrist.position.set(0, -0.585, 0);
    armGroup.add(wrist);

    // Hand (Iconic Roblox mitten/clamp hand)
    const handGroup = new THREE.Group();
    handGroup.position.set(0, -0.66, 0);

    const handGeo = createRoundedBox(0.07, 0.11, 0.08, 0.02, 3);
    const handMesh = new THREE.Mesh(handGeo, matArms);
    handMesh.name = isLeft ? 'LeftHand' : 'RightHand';
    handGroup.add(handMesh);

    const cuffGeo = new THREE.CylinderGeometry(0.042, 0.042, 0.03, 16);
    const cuff = new THREE.Mesh(cuffGeo, matJoints);
    cuff.position.set(0, 0.055, 0);
    handGroup.add(cuff);

    // Thumb notch on front
    const thumbGeo = createRoundedBox(0.025, 0.04, 0.03, 0.008, 2);
    const thumb = new THREE.Mesh(thumbGeo, matArms);
    thumb.position.set(0, -0.01, 0.042);
    handGroup.add(thumb);

    armGroup.add(handGroup);
    return armGroup;
  }

  root.add(createArm('left'));
  root.add(createArm('right'));

  // ==================== 6. LEGS & FEET ====================
  function createLeg(side) {
    const isLeft = side === 'left';
    const xMult = isLeft ? 1 : -1;
    const legGroup = new THREE.Group();
    legGroup.name = isLeft ? 'LeftLegGroup' : 'RightLegGroup';
    legGroup.position.set(xMult * 0.11, 0.90, 0);

    const hipBallGeo = new THREE.SphereGeometry(0.065, 20, 16);
    const hipBall = new THREE.Mesh(hipBallGeo, matJoints);
    legGroup.add(hipBall);

    const thighGeo = createTaperedLimb(0.125, 0.105, 0.13, 0.11, 0.38);
    const thigh = new THREE.Mesh(thighGeo, matLegs);
    thigh.name = isLeft ? 'LeftThigh' : 'RightThigh';
    thigh.position.set(0, -0.21, 0);
    legGroup.add(thigh);

    const kneeGeo = new THREE.SphereGeometry(0.058, 20, 16);
    const knee = new THREE.Mesh(kneeGeo, matJoints);
    knee.position.set(0, -0.41, 0);
    legGroup.add(knee);

    const kneeCapGeo = createRoundedBox(0.085, 0.08, 0.04, 0.015, 2);
    const kneeCap = new THREE.Mesh(kneeCapGeo, matLegs);
    kneeCap.position.set(0, -0.41, 0.05);
    legGroup.add(kneeCap);

    const shinGeo = createTaperedLimb(0.105, 0.09, 0.11, 0.095, 0.36);
    const shin = new THREE.Mesh(shinGeo, matLegs);
    shin.name = isLeft ? 'LeftShin' : 'RightShin';
    shin.position.set(0, -0.61, 0);
    legGroup.add(shin);

    const ankleGeo = new THREE.SphereGeometry(0.05, 16, 12);
    const ankle = new THREE.Mesh(ankleGeo, matJoints);
    ankle.position.set(0, -0.80, 0);
    legGroup.add(ankle);

    // Shoe
    const footGroup = new THREE.Group();
    footGroup.position.set(0, -0.85, 0.03);

    const shoeGeo = createRoundedBox(0.12, 0.095, 0.22, 0.02, 3);
    const shoe = new THREE.Mesh(shoeGeo, matLegs);
    shoe.name = isLeft ? 'LeftShoe' : 'RightShoe';
    footGroup.add(shoe);

    const soleGeo = createRoundedBox(0.125, 0.025, 0.23, 0.01, 2);
    const sole = new THREE.Mesh(soleGeo, matJoints);
    sole.position.set(0, -0.04, 0);
    footGroup.add(sole);

    legGroup.add(footGroup);
    return legGroup;
  }

  root.add(createLeg('left'));
  root.add(createLeg('right'));

  // Calculate bounding box and place feet on ground at Y = 0
  const box = new THREE.Box3().setFromObject(root);
  const yOffset = -box.min.y;
  root.position.y += yOffset;

  return root;
}

async function exportGLB(root, outputPath) {
  const scene = new THREE.Scene();
  scene.add(root);

  const exporter = new GLTFExporter();
  await new Promise((resolve, reject) => {
    exporter.parse(
      scene,
      (result) => {
        fs.writeFileSync(outputPath, Buffer.from(result));
        console.log(`SUCCESS! Exported ${outputPath}! Size:`, fs.statSync(outputPath).size);
        resolve();
      },
      (err) => reject(err),
      { binary: true }
    );
  });
}

async function main() {
  // 1. I-Pose (Buông thõng 2 tay thẳng đứng dọc hông)
  const iPose = buildModel(0);
  await exportGLB(iPose, 'public/models/roblox_anthro.glb');

  // 2. A-Pose (Mở tay 30 độ kiểm tra khớp)
  const aPose = buildModel(30);
  await exportGLB(aPose, 'public/models/roblox_anthro_apose.glb');
}

main().catch(console.error);
