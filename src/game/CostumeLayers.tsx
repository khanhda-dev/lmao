import type { PuzzleLevel } from './types';

export type CostumeLayer={id:string;asset:string;bounds:[number,number,number,number];zIndex:number};
/** Shared source-coordinate composition. Layer order is drawing order, not dressing history. */
export default function CostumeLayers({costume,layers,label}:{costume:PuzzleLevel;layers:CostumeLayer[];label:string}){
  const [w,h]=costume.dimensions;
  return <div className="costume-layers" role="img" aria-label={label} style={{aspectRatio:w/h}}>
    <img className="costume-base" src={costume.base} alt="" draggable={false}/>
    <img className="costume-base" src={costume.baseFront} alt="" draggable={false} style={{zIndex:5}}/>
    {layers.map(layer=><img key={layer.id} src={layer.asset} alt="" draggable={false} style={{left:`${layer.bounds[0]/w*100}%`,top:`${layer.bounds[1]/h*100}%`,width:`${layer.bounds[2]/w*100}%`,height:`${layer.bounds[3]/h*100}%`,zIndex:layer.zIndex}}/>)}
  </div>;
}
