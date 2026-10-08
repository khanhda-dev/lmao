import {artBounds} from './SvgArtwork';
import type {CostumeLayer} from './CostumeLayers';
import type {ReconstructionChoice} from './types';
import headwear from '../data/headwearAssets.json';
import rigs from '../data/costumeAssets.json';

const maleToFemaleHead=57.394/48.546;
const shoulderRatio=(242.46-158.681)/(229.013-143.135);
/** Fit clothing to the same shoulder/wrist rig; headwear keeps its proportions. */
export function reconstructionLayer(slot:string,choice:ReconstructionChoice,zIndex:number):CostumeLayer{
 const asset=choice.equippedAsset??choice.asset;
 const [x,y,w,h]=artBounds(asset);
 let scale=1,scaleY=1,dx=0,dy=0;
 if(asset.includes('giao-linh')||asset.includes('nhat-binh')){
  const nhat=asset.includes('nhat-binh'),axis=nhat?163.635:143.135;
  scale=shoulderRatio;scaleY=(325.012-140)/(261.079-90.8497);
  dx=158.681-axis*scale;dy=140-90.8497*scaleY;
  if(slot==='belt'||slot==='front'){
   scale=scaleY=130/99;dx=158.681-143.5*scale;dy=296-170*scale;
  }else if(slot==='lower'){
   scale=161/w;scaleY=(570-302)/h;
   dx=158.681-(x+w/2)*scale;dy=302-y*scaleY;
  }else if(slot==='hat'){
   scale=scaleY=maleToFemaleHead;dx=158.681-164*scale;dy=33-15*scale;
  }
 }else if(choice.id==='khan-xep'){
  const rig=rigs['special-quan-phuc-nam'],reference=headwear['khan-xep'];
  dx=rig.headX-reference.anchorX;
  dy=60.4683+rig.handY-293.498-reference.anchorY;
 }
 return {id:slot,asset,bounds:[x*scale+dx,y*scaleY+dy,w*scale,h*scaleY],zIndex};
}
