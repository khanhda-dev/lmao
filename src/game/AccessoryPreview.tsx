import {useLayoutEffect,useRef,useState} from 'react';
import {MaleExistingAccessories} from '../components/ExistingAccessories';

/** Reuse equipped artwork and fit its painted bounds, including the straps. */
export default function AccessoryPreview({id}:{id:string}){
 const drawing=useRef<SVGGElement>(null),[viewport,setViewport]=useState('0 0 231 561');
 useLayoutEffect(()=>{
  const b=drawing.current?.getBBox();
  if(b&&b.width&&b.height)setViewport(`${b.x-4} ${b.y-4} ${b.width+8} ${b.height+8}`);
 },[id]);
 return <svg className="svg-artwork" viewBox={viewport} preserveAspectRatio="xMidYMid meet" aria-hidden="true"><g ref={drawing}><MaleExistingAccessories selectedGenZ={[id]} selectedJewelry={[]}/></g></svg>;
}
