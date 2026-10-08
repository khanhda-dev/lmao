import { CHALLENGES,rewardLevel } from './challenges';
import { COSTUME_PUZZLES } from './levels';
import { isSolved,shuffleTiles,swapTiles,validTiles } from './imageGrid';
import { freshDetective,freshReconstruction,reconstructionAccuracy } from './challengeLogic';
import { migrateReward } from './rewardMigration';
import type { Challenge,GridRun,Point,Progress,PuzzleLevel,PuzzlePiece,UnlockKind } from './types';

// Keep the original storage key and migrate its content without losing earned items.
export const STORAGE_KEY='viet-phuc-remix:puzzle:v1';
export const emptyProgress=():Progress=>({version:2,completed:[],placed:{},activeLevel:CHALLENGES[0].id,runs:{},best:{},unlockedItems:{costumes:[],headwear:[],accessories:[],colors:[]},migrated:false});
export const canPlay=(p:Progress,c:Pick<Challenge,'id'|'prerequisites'>)=>c.prerequisites.every(id=>p.completed.includes(id));
const count=(input:unknown)=>typeof input==='number'&&Number.isFinite(input)&&input>=0?Math.floor(input):0;
function earn(p:Progress,c:Challenge):Progress{
  const unlockedItems={...p.unlockedItems};
  for(const reward of c.rewards)unlockedItems[reward.kind]=[...new Set([...unlockedItems[reward.kind],reward.id])];
  return {...p,unlockedItems};
}
export function normalizeProgress(input:unknown):Progress{
  let result=emptyProgress();
  if(!input||typeof input!=='object')return result;
  const saved=input as Omit<Partial<Progress>,'version'>&{version?:number};
  if(saved.version!==2&&(saved.version as number)!==1)return result;
  const legacy=(saved.version as number)===1;
  result.migrated=legacy||saved.migrated===true;
  const completed=Array.isArray(saved.completed)?saved.completed:[];
  if(legacy){
    // Old assembly rewards remain earned. New mechanics receive a fresh run.
    for(const costume of COSTUME_PUZZLES)if(completed.includes(costume.id)&&costume.prerequisites.every(id=>completed.includes(id))){
      const challenge=CHALLENGES.find(c=>c.id===costume.id);
      if(challenge)result=earn(result,challenge);
      if(costume.id==='con-phuc')result=earn(result,CHALLENGES.find(c=>c.id==='hoang-bao')!);
    }
  }else{
    for(const kind of Object.keys(result.unlockedItems) as UnlockKind[]){
      const ids=saved.unlockedItems?.[kind];
      if(Array.isArray(ids))for(const id of ids){
        if(typeof id!=='string')continue;
        const mapped=migrateReward(kind,id);
        if(rewardLevel(mapped.kind,mapped.id))result.unlockedItems[mapped.kind]=[...new Set([...result.unlockedItems[mapped.kind],mapped.id])];
      }
    }
  }
  for(const challenge of CHALLENGES){
    if(!canPlay(result,challenge))continue;
    if(challenge.type==='assemble'){
      const ids=saved.placed?.[challenge.id];
      result.placed[challenge.id]=challenge.costume.pieces.filter(piece=>Array.isArray(ids)&&ids.includes(piece.id)).map(piece=>piece.id);
    }
    const run=saved.runs?.[challenge.id];
    if(challenge.type==='image-grid'&&run?.type==='image-grid'&&validTiles(run.tiles,challenge.gridSize)){
      result.runs[challenge.id]={type:'image-grid',tiles:run.tiles.slice(),moves:count(run.moves),previewsUsed:Math.min(challenge.previewLimit,count(run.previewsUsed)),previewSeen:run.previewSeen===true};
    }
    if(challenge.type==='detective'&&run?.type==='detective')result.runs[challenge.id]={type:'detective',fixed:challenge.errors.filter(error=>Array.isArray(run.fixed)&&run.fixed.includes(error.id)).map(error=>error.id),attempts:count(run.attempts)};
    if(challenge.type==='reconstruction'&&run?.type==='reconstruction'){
      const choices:Record<string,string>={};
      for(const slot of challenge.slots)if(slot.choices.some(choice=>choice.id===run.choices?.[slot.id]))choices[slot.id]=run.choices[slot.id];
      result.runs[challenge.id]={type:'reconstruction',choices,submissions:count(run.submissions),lastAccuracy:typeof run.lastAccuracy==='number'&&count(run.submissions)>0?reconstructionAccuracy(challenge,choices):null};
    }
    if(completed.includes(challenge.id)&&(!legacy||challenge.id==='giao-linh')){
      result.completed.push(challenge.id);result=earn(result,challenge);
    }
    const best=saved.best?.[challenge.id];
    if(!legacy&&best&&result.completed.includes(challenge.id))result.best[challenge.id]={actions:count(best.actions),previews:count(best.previews),total:challenge.total,completedAt:count(best.completedAt)};
  }
  const active=CHALLENGES.find(c=>c.id===saved.activeLevel&&canPlay(result,c));
  if(active)result.activeLevel=active.id;
  return result;
}
export function finishChallenge(p:Progress,c:Challenge,actions:number,previews=0):Progress{
  const previous=p.best[c.id];
  const improved=!previous||actions<previous.actions||(actions===previous.actions&&previews<previous.previews);
  return earn({...p,completed:[...new Set([...p.completed,c.id])],best:improved?{...p.best,[c.id]:{actions,previews,total:c.total,completedAt:Date.now()}}:p.best},c);
}
export function placePiece(p:Progress,id:string,pieceId:string):Progress{
  const c=CHALLENGES.find(c=>c.id===id);
  if(c?.type!=='assemble'||!canPlay(p,c)||!c.costume.pieces.some(piece=>piece.id===pieceId))return p;
  const placed=[...new Set([...(p.placed[id]??[]),pieceId])];
  const next={...p,placed:{...p.placed,[id]:placed}};
  return placed.length===c.total?finishChallenge(next,c,placed.length):next;
}
export function startGrid(p:Progress,id:string,reset=false):Progress{
  const c=CHALLENGES.find(c=>c.id===id);
  if(c?.type!=='image-grid'||!canPlay(p,c)||(!reset&&p.runs[id]))return p;
  const run:GridRun={type:'image-grid',tiles:shuffleTiles(c.gridSize),moves:0,previewsUsed:0,previewSeen:false};
  return {...p,runs:{...p.runs,[id]:run}};
}
export function swapGrid(p:Progress,id:string,a:number,b:number):Progress{
  const c=CHALLENGES.find(c=>c.id===id),run=p.runs[id];
  if(c?.type!=='image-grid'||run?.type!=='image-grid'||!canPlay(p,c)||isSolved(run.tiles))return p;
  const tiles=swapTiles(run.tiles,a,b);if(tiles===run.tiles)return p;
  const next={...p,runs:{...p.runs,[id]:{...run,tiles,moves:run.moves+1}}};
  return isSolved(tiles)?finishChallenge(next,c,run.moves+1,run.previewsUsed):next;
}
export function previewGrid(p:Progress,id:string):Progress{
  const c=CHALLENGES.find(c=>c.id===id),run=p.runs[id];
  if(c?.type!=='image-grid'||run?.type!=='image-grid'||!canPlay(p,c)||isSolved(run.tiles)||run.previewsUsed>=c.previewLimit)return p;
  return {...p,runs:{...p.runs,[id]:{...run,previewsUsed:run.previewsUsed+1}}};
}
export function markGridSeen(p:Progress,id:string):Progress{
  const run=p.runs[id];if(run?.type!=='image-grid'||run.previewSeen)return p;
  return {...p,runs:{...p.runs,[id]:{...run,previewSeen:true}}};
}
export function resetLevel(p:Progress,id:string):Progress{
  const c=CHALLENGES.find(c=>c.id===id);if(!c||!canPlay(p,c))return p;
  if(c.type==='image-grid')return startGrid(p,id,true);
  if(c.type==='detective')return {...p,runs:{...p.runs,[id]:freshDetective()}};
  if(c.type==='reconstruction')return {...p,runs:{...p.runs,[id]:freshReconstruction()}};
  return {...p,placed:{...p.placed,[id]:[]}};
}
export function startChallenge(p:Progress,id:string):Progress{
  const c=CHALLENGES.find(c=>c.id===id);
  if(!c||!canPlay(p,c)||p.runs[id])return p;
  if(c.type==='detective')return {...p,runs:{...p.runs,[id]:freshDetective()}};
  if(c.type==='reconstruction')return {...p,runs:{...p.runs,[id]:freshReconstruction()}};
  return p;
}
export function answerDetective(p:Progress,id:string,errorId:string,optionId:string):Progress{
  const c=CHALLENGES.find(c=>c.id===id),run=p.runs[id];
  if(c?.type!=='detective'||run?.type!=='detective'||!canPlay(p,c)||run.fixed.includes(errorId))return p;
  const error=c.errors.find(error=>error.id===errorId);
  if(!error?.options.some(option=>option.id===optionId))return p;
  const fixed=optionId===error.correctOption?[...run.fixed,errorId]:run.fixed;
  const next={...p,runs:{...p.runs,[id]:{...run,fixed,attempts:run.attempts+1}}};
  return fixed.length===c.total?finishChallenge(next,c,run.attempts+1):next;
}
export function chooseReconstruction(p:Progress,id:string,slotId:string,choiceId:string):Progress{
  const c=CHALLENGES.find(c=>c.id===id),run=p.runs[id];
  if(c?.type!=='reconstruction'||run?.type!=='reconstruction'||!canPlay(p,c)||run.lastAccuracy===c.total||!c.slots.find(slot=>slot.id===slotId)?.choices.some(choice=>choice.id===choiceId))return p;
  return {...p,runs:{...p.runs,[id]:{...run,choices:{...run.choices,[slotId]:choiceId},lastAccuracy:null}}};
}
export function submitReconstruction(p:Progress,id:string):Progress{
  const c=CHALLENGES.find(c=>c.id===id),run=p.runs[id];
  if(c?.type!=='reconstruction'||run?.type!=='reconstruction'||!canPlay(p,c)||run.lastAccuracy===c.total||c.slots.some(slot=>!run.choices[slot.id]))return p;
  const lastAccuracy=reconstructionAccuracy(c,run.choices);
  const next={...p,runs:{...p.runs,[id]:{...run,submissions:run.submissions+1,lastAccuracy}}};
  return lastAccuracy===c.total?finishChallenge(next,c,run.submissions+1):next;
}
export function isUnlocked(p:Progress,kind:UnlockKind,id:string){return !rewardLevel(kind,id)||p.unlockedItems[kind].includes(id);}
export function targetOf(level:PuzzleLevel,piece:PuzzlePiece):Point{return{x:level.figure.x+(piece.bounds[0]+piece.bounds[2]/2)*level.scale,y:level.figure.y+(piece.bounds[1]+piece.bounds[3]/2)*level.scale};}
export function isCorrectDrop(level:PuzzleLevel,piece:PuzzlePiece,center:Point){const target=targetOf(level,piece);return Math.hypot(center.x-target.x,center.y-target.y)<=52;}
