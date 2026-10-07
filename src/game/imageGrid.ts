/** Tile ID is its source image index; the array index is its current board cell. */
export const solvedTiles=(size:number)=>Array.from({length:size*size},(_,index)=>index);
export const isSolved=(tiles:number[])=>tiles.length>0&&tiles.every((tile,index)=>tile===index);
export const correctTiles=(tiles:number[])=>tiles.filter((tile,index)=>tile===index).length;
export function validTiles(input:unknown,size:number):input is number[]{
  return Array.isArray(input)&&input.length===size*size&&new Set(input).size===size*size&&input.every(n=>Number.isInteger(n)&&n>=0&&n<size*size);
}
export function shuffleTiles(size:number,random:()=>number=Math.random):number[]{
  const tiles=solvedTiles(size);
  for(let i=tiles.length-1;i>0;i--){const j=Math.min(i,Math.max(0,Math.floor(random()*(i+1))));[tiles[i],tiles[j]]=[tiles[j],tiles[i]];}
  if(isSolved(tiles)) [tiles[0],tiles[1]]=[tiles[1],tiles[0]];
  return tiles;
}
export function swapTiles(tiles:number[],a:number,b:number){
  if(a===b||![a,b].every(i=>Number.isInteger(i)&&i>=0&&i<tiles.length))return tiles;
  const next=tiles.slice();[next[a],next[b]]=[next[b],next[a]];return next;
}
