import {useLayoutEffect,useRef,useState} from 'react';
import {MaleExistingAccessories,RearExistingAccessories} from '../components/ExistingAccessories';
import {HairpinArt} from '../components/TraditionalAccessories';
import {HandheldArt} from '../components/HandheldSVG';
import {HANDHELD} from '../data/costumeData';

/** Reuse equipped artwork and fit its painted bounds, including the straps. */
export default function AccessoryPreview({id}:{id:string}){
 const drawing=useRef<SVGGElement>(null),[viewport,setViewport]=useState('0 0 231 561');
 useLayoutEffect(()=>{
  const b=drawing.current?.getBBox();
  if(b&&b.width&&b.height)setViewport(`${b.x-4} ${b.y-4} ${b.width+8} ${b.height+8}`);
 },[id]);
 const handheld=HANDHELD.some(item=>item.id===id);
 const selection={id,costumeKey:'male-ao-tac'};
 return <svg className="svg-artwork" viewBox={viewport} preserveAspectRatio="xMidYMid meet" aria-hidden="true"><g ref={drawing}>
  {handheld?<><HandheldArt selection={selection} layer="rear"/><HandheldArt selection={selection} layer="front"/></>:
   id==='tram-cai'?<HairpinArt x={0}/>:
   id==='kieng-co'?<><RearExistingAccessories female={false} selectedGenZ={[]} selectedJewelry={[id]}/><MaleExistingAccessories selectedGenZ={[]} selectedJewelry={[id]}/></>:
   <MaleExistingAccessories selectedGenZ={[id]} selectedJewelry={[]}/>}
 </g></svg>;
}
