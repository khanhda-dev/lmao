import type { PuzzleLevel } from './types';
import SvgArtwork from './SvgArtwork';

export type CostumeLayer={id:string;asset:string;bounds:[number,number,number,number];zIndex:number};
/** Shared source-coordinate composition. Layer order is drawing order, not dressing history. */
export default function CostumeLayers({costume,layers,label}:{costume:PuzzleLevel;layers:CostumeLayer[];label:string}){
  const [w,h]=costume.dimensions;
  return <div className="costume-layers" role="img" aria-label={label} style={{aspectRatio:w/h}}>
    <div className="costume-base" data-testid="reconstruction-base">
      {['lower','sleeves','robe'].filter(slot=>!layers.some(layer=>layer.id===slot)).map(slot=><div className="costume-underlayer" data-fallback-slot={slot} key={slot} style={{position:'absolute',left:`${41.5/w*100}%`,top:`${31.514/h*100}%`,width:`${231/w*100}%`,height:`${561/h*100}%`,clipPath:slot==='robe'&&layers.some(layer=>layer.id==='lower')?'inset(0 0 50.35% 0)':undefined}}><SvgArtwork asset={`/puzzle/con-phuc/underlayer-${slot}.svg`} crop={false}/></div>)}
      {!layers.some(layer=>layer.id==='shoes')&&<SvgArtwork asset="/puzzle/items/special-quan-phuc-nam-hai.svg" crop={false}/>}
    </div>
    <div className="costume-base" style={{zIndex:2}}><SvgArtwork asset="/puzzle/con-phuc/hands.svg" crop={false}/></div>
    <div className="costume-base" style={{zIndex:5}}><SvgArtwork asset="/puzzle/con-phuc/body.svg" crop={false}/></div>
    {layers.map(layer=><div className="costume-equipped-layer" data-layer={layer.id} key={layer.id} style={{left:`${layer.bounds[0]/w*100}%`,top:`${layer.bounds[1]/h*100}%`,width:`${layer.bounds[2]/w*100}%`,height:`${layer.bounds[3]/h*100}%`,zIndex:layer.zIndex}}><SvgArtwork asset={layer.asset} stretch/></div>)}
  </div>;
}
