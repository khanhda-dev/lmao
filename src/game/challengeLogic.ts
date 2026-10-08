import type { Challenge,DetectiveChallengeData,DetectiveError,DetectiveRun,Progress,ReconstructionChallengeData,ReconstructionRun,WardrobeLook } from './types';
import { isSolved } from './imageGrid';

export function challengeSolved(p:Progress,c:Challenge){
  const run=p.runs[c.id];
  switch(c.type){
    case 'assemble':return(p.placed[c.id]?.length??0)===c.total;
    case 'image-grid':return run?.type==='image-grid'&&isSolved(run.tiles);
    case 'detective':return run?.type==='detective'&&run.fixed.length===c.total;
    case 'reconstruction':return run?.type==='reconstruction'&&run.lastAccuracy===c.total;
  }
}
export function reconstructionAccuracy(c:ReconstructionChallengeData,choices:Record<string,string>){
  return c.slots.filter(slot=>choices[slot.id]===slot.correctChoice).length;
}
export function detectiveLook(c:DetectiveChallengeData,run:DetectiveRun|undefined):WardrobeLook{
  let look={...c.initialLook,genz:[...c.initialLook.genz]};
  for(const error of c.errors){
    if(!run?.fixed.includes(error.id))continue;
    const replacement=error.options.find(o=>o.id===error.correctOption)?.look;
    if(!replacement)continue;
    look=applyDetectiveOption(look,error,replacement);
  }
  return look;
}
export function applyDetectiveOption(look:WardrobeLook,error:DetectiveError,replacement:Partial<WardrobeLook>):WardrobeLook{
  const {genz,...properties}=replacement;
  return {...look,...properties,genz:genz?[...look.genz.filter(id=>!error.genzKeys?.includes(id)),...genz]:look.genz};
}
export const freshDetective=():DetectiveRun=>({type:'detective',fixed:[],attempts:0});
export const freshReconstruction=():ReconstructionRun=>({type:'reconstruction',choices:{},submissions:0,lastAccuracy:null});
