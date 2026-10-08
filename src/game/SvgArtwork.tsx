import {useId,useMemo} from 'react';
import metadata from './artworkBounds.json';
import {prepareCostumeSvg} from '../components/costumeSvg';

const sources=import.meta.glob(['/public/puzzle/con-phuc/*.svg','/public/puzzle/giao-linh/*.svg','/public/puzzle/nhat-binh/*.svg','/public/puzzle/items/khan-*.svg','/public/puzzle/items/special-*.svg','!/public/puzzle/**/full.svg','!/public/puzzle/**/base.svg','!/public/puzzle/**/base-front.svg'],{query:'?raw',import:'default',eager:true}) as Record<string,string>;
export function artBounds(asset:string):[number,number,number,number]{
 const m=metadata[asset as keyof typeof metadata];
 return (m?.bounds??[0,0,100,100]) as [number,number,number,number];
}
/** Crop the viewport, never the paths. The same source geometry is used when equipped. */
export default function SvgArtwork({asset,label='',className='',crop=true,stretch=false}:{asset:string;label?:string;className?:string;crop?:boolean;stretch?:boolean}){
 const id=useId().replace(/[^\w-]/g,'');
 const source=sources['/public'+asset];
 const markup=useMemo(()=>source?prepareCostumeSvg(source,`art-${id}`,false):'',[source,id]);
 if(!source)return <img src={asset} alt={label} className={className} draggable={false}/>;
 const meta=metadata[asset as keyof typeof metadata];
 const bounds=crop?artBounds(asset):meta?.viewport??artBounds(asset);
 return <svg className={`svg-artwork ${className}`} viewBox={bounds.join(' ')} preserveAspectRatio={stretch?'none':'xMidYMid meet'} fill="none" role={label?'img':undefined} aria-label={label||undefined} aria-hidden={!label} dangerouslySetInnerHTML={{__html:markup}}/>;
}
