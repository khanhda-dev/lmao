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

async function processFBX(fbxPath, outGlbPath, modelName) {
  const loader = new FBXLoader();
  const fbxBuffer = fs.readFileSync(fbxPath);
  const arrayBuffer = fbxBuffer.buffer.slice(fbxBuffer.byteOffset, fbxBuffer.byteOffset + fbxBuffer.byteLength);

  const fbxObj = loader.parse(arrayBuffer, '');

  const root = new THREE.Group();
  root.name = modelName;

  // We assign semantic materials to each body part
  const materials = {
    Head: new THREE.MeshStandardMaterial({
      name: 'HeadMaterial',
      color: 0x8e9297, // Studio Mannequin Gray default
      roughness: 0.42,
      metalness: 0.05
    }),
    UpperTorso: new THREE.MeshStandardMaterial({
      name: 'UpperTorsoMaterial',
      color: 0x8e9297,
      roughness: 0.42,
      metalness: 0.05
    }),
    LowerTorso: new THREE.MeshStandardMaterial({
      name: 'LowerTorsoMaterial',
      color: 0x8e9297,
      roughness: 0.42,
      metalness: 0.05
    }),
    Arms: new THREE.MeshStandardMaterial({
      name: 'ArmsMaterial',
      color: 0x8e9297,
      roughness: 0.42,
      metalness: 0.05
    }),
    Hands: new THREE.MeshStandardMaterial({
      name: 'HandsMaterial',
      color: 0x8e9297,
      roughness: 0.42,
      metalness: 0.05
    }),
    Legs: new THREE.MeshStandardMaterial({
      name: 'LegsMaterial',
      color: 0x8e9297,
      roughness: 0.42,
      metalness: 0.05
    }),
    Feet: new THREE.MeshStandardMaterial({
      name: 'FeetMaterial',
      color: 0x8e9297,
      roughness: 0.42,
      metalness: 0.05
    })
  };

  fbxObj.traverse((child) => {
    if (child.isMesh) {
      const name = child.name;
      if (name.includes('Head')) {
        child.material = materials.Head;
      } else if (name.includes('UpperTorso')) {
        child.material = materials.UpperTorso;
      } else if (name.includes('LowerTorso')) {
        child.material = materials.LowerTorso;
      } else if (name.includes('Hand')) {
        child.material = materials.Hands;
      } else if (name.includes('Arm')) {
        child.material = materials.Arms;
      } else if (name.includes('Foot')) {
        child.material = materials.Feet;
      } else if (name.includes('Leg')) {
        child.material = materials.Legs;
      } else {
        child.material = materials.Head;
      }
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  root.add(fbxObj);

  // 1 Stud = 0.28m standard
  root.scale.set(0.28, 0.28, 0.28);

  const box = new THREE.Box3().setFromObject(root);
  const yOffset = -box.min.y;
  root.position.y += yOffset;

  const finalBox = new THREE.Box3().setFromObject(root);
  console.log(`[${modelName}] Height: ${(finalBox.max.y - finalBox.min.y).toFixed(3)}m, Min Y: ${finalBox.min.y.toFixed(4)}`);

  const scene = new THREE.Scene();
  scene.add(root);

  const exporter = new GLTFExporter();
  await new Promise((resolve, reject) => {
    exporter.parse(
      scene,
      (result) => {
        fs.writeFileSync(outGlbPath, Buffer.from(result));
        console.log(`Exported ${outGlbPath} (${fs.statSync(outGlbPath).size} bytes)`);
        resolve();
      },
      (err) => reject(err),
      { binary: true }
    );
  });
}

async function main() {
  await processFBX('/tmp/RthroMannequin.fbx', 'public/models/roblox_rthro_normal.glb', 'RobloxRthroNormal');
  await processFBX('/tmp/RthroSlenderMannequin.fbx', 'public/models/roblox_rthro_slender.glb', 'RobloxRthroSlender');
}

main().catch(console.error);
