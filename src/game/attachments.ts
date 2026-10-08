import {artBounds} from './SvgArtwork';
import type {CostumeLayer} from './CostumeLayers';
import type {ReconstructionChoice} from './types';

const maleToFemaleHead=57.394/48.546;
const shoulderRatio=(242.46-158.681)/(229.013-143.135);
/** Similarity transforms: one scale for both axes, anchored to the exported rig. */
export function reconstructionLayer(slot:string,choice:ReconstructionChoice,zIndex:number):CostumeLayer{
 const [x,y,w,h]=artBounds(choice.asset);
 let scale=1,dx=0,dy=0;
 if(choice.asset.includes('giao-linh')||choice.asset.includes('nhat-binh')){
  const nhat=choice.asset.includes('nhat-binh'),axis=nhat?163.635:143.135;
  scale=shoulderRatio;dx=158.681-axis*scale;dy=325.012-261.079*scale;
  if(slot==='belt'||slot==='front'){
   scale=130/99;dx=158.681-143.5*scale;dy=296-170*scale;
  }else if(slot==='lower'){
   const waist=nhat?190:185;
   scale=(592.007-320)/(519-waist);dx=158.681-axis*scale;dy=320-waist*scale;
  }else if(slot==='hat'){
   scale=maleToFemaleHead;dx=158.681-164*scale;dy=33-15*scale;
  }
 }else if(choice.id==='khan-xep'){
  dx=158.681-1709.68;dy=110.9824-90.9824;
 }
 return {id:slot,asset:choice.asset,bounds:[x*scale+dx,y*scale+dy,w*scale,h*scale],zIndex};
}
