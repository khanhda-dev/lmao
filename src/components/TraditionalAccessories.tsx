import React from 'react';
import {nonLaPlacement,type CustomHeadwear} from './HeadwearSVG';

// Supplemental vector artwork for the existing options that had no model layer.
// All coordinates are relative to the original Figma head/hand attachment points.
export function HeadwearArt({ id, x, female,costumeKey }: { id?: string; x: number; female: boolean;costumeKey?:CustomHeadwear['costumeKey'] }) {
  if (id !== 'non-la') return null;
  // Keep the front brim above the forehead, with both eyes fully visible.
  const placement=nonLaPlacement({id,x,female,costumeKey});
  return <g transform={`translate(${x} ${placement.y}) scale(${placement.scale})`} fill="none" strokeLinejoin="round" data-accessory={id}>
    {id === 'non-la' && <g>
      <path d="M-89 5 L0-52 L89 5 Q0 28-89 5Z" fill="#EBD5A0" stroke="#A58146" strokeWidth="1.5" />
      <path d="M-89 5 Q0-7 89 5 M-64-11 Q0 0 64-11 M-40-27 Q0-19 40-27" stroke="#C4A971" />
      {[-63,-30,0,30,63].map(v => <path key={v} d={`M0-52 L${v} 13`} stroke="#CFB782" strokeWidth=".8" />)}
      <path d="M-89 5 Q0 28 89 5" stroke="#96723A" strokeWidth="2" />
    </g>}
  </g>;
}

export function HairpinArt({ x }: { x: number }) {
  // The shaft enters the back hair; only the right-hand ornament is exposed.
  // Render this before the costume so the original hair hides the inserted end.
  return <g transform={`translate(${x} 0)`} data-accessory="tram-cai" fill="none">
    <path d="M3 10 L40-8" stroke="#B88C32" strokeWidth="2.6" strokeLinecap="round" />
    <path d="M3 9.7 L40-8.3" stroke="#F4D476" strokeWidth="1.2" strokeLinecap="round" />
    <path d="M40-3 V15 M44-2 V19" stroke="#D5AF51" strokeWidth="1" strokeLinecap="round" />
    <circle cx="40" cy="17" r="1.7" fill="#FAF0D4" stroke="#D5AF51" strokeWidth=".7" />
    <circle cx="44" cy="21" r="1.7" fill="#FAF0D4" stroke="#D5AF51" strokeWidth=".7" />
    <circle cx="40" cy="-8" r="5.2" fill="#F7D37A" stroke="#D5A448" strokeWidth="1" />
    <circle cx="40" cy="-8" r="3.3" fill="#E65A3B" />
    <circle cx="40" cy="-8" r="1.4" fill="#FFF0D2" />
  </g>;
}
