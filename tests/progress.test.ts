import test from 'node:test';
import assert from 'node:assert/strict';
import { CHALLENGES } from '../src/game/challenges';
import { COSTUME_PUZZLES } from '../src/game/levels';
import { correctTiles,isSolved,shuffleTiles,swapTiles,validTiles } from '../src/game/imageGrid';
import { canPlay,emptyProgress,isCorrectDrop,isUnlocked,normalizeProgress,placePiece,resetLevel,startGrid,swapGrid,previewGrid,targetOf,startChallenge,answerDetective,chooseReconstruction,submitReconstruction } from '../src/game/progress';
import { challengeSolved,detectiveLook } from '../src/game/challengeLogic';
import { GARMENTS,SPECIAL_GARMENTS,HEADWEAR,COLOR_PRESETS,FOOTWEAR,JEWELRY,HANDHELD } from '../src/data/costumeData';
import {compatibleCostume,familyVariant} from '../src/game/wardrobeFamilies';

function tutorial(){let p=emptyProgress();for(const part of COSTUME_PUZZLES[0].pieces)p=placePiece(p,'giao-linh',part.id);return p;}
function gridCompleted(){let p=startGrid(tutorial(),'nhat-binh');for(let i=0;i<9;i++){const run=p.runs['nhat-binh'];if(run.type==='image-grid')p=swapGrid(p,'nhat-binh',run.tiles.indexOf(i),i);}return p;}

test('jewelry and handheld rewards unlock by stage for both genders and backfill existing saves',()=>{
 const stages=[['quat'],['kieng-co'],['o-du','tram-cai'],['dan-nguyet']];
 const all=stages.flat();
 let p=emptyProgress();
 for(const id of all)assert.equal(isUnlocked(p,'accessories',id),false,id);
 p=tutorial();
 for(let stage=0;stage<4;stage++){
  if(stage===1)p=gridCompleted();
  if(stage===2){const c=CHALLENGES[2];if(c.type!=='detective')throw Error();p=startChallenge(p,c.id);for(const error of c.errors)p=answerDetective(p,c.id,error.id,error.correctOption);}
  if(stage===3){const c=CHALLENGES[3];if(c.type!=='reconstruction')throw Error();p=startChallenge(p,c.id);for(const slot of c.slots)p=chooseReconstruction(p,c.id,slot.id,slot.correctChoice);p=submitReconstruction(p,c.id);}
  for(const [index,ids] of stages.entries())for(const id of ids)assert.equal(isUnlocked(p,'accessories',id),index<=stage,id);
  // Every stage includes an accessory that the male model can wear.
  assert.ok(stages[stage].some(id=>HANDHELD.some(item=>item.id===id)||JEWELRY.some(item=>item.id===id&&item.allowedGender!=='female')));
  const legacy=JSON.parse(JSON.stringify(p));legacy.unlockedItems.accessories=['guoc-moc'];
  const backfilled=normalizeProgress(legacy);
  assert.deepEqual(backfilled.best,p.best);
  for(const id of stages.slice(0,stage+1).flat())assert.ok(isUnlocked(backfilled,'accessories',id));
  assert.ok(isUnlocked(resetLevel(backfilled,CHALLENGES[stage].id),'accessories',stages[stage][0]));
 }
});
test('tutorial still unlocks its wardrobe and sequential prerequisites',()=>{
  let p=emptyProgress();assert.ok(isUnlocked(p,'costumes','nhat-binh'));
  assert.equal(canPlay(p,CHALLENGES[1]),false);assert.equal(placePiece(p,'con-phuc','hat'),p);
  p=tutorial();assert.ok(canPlay(p,CHALLENGES[1]));assert.ok(isUnlocked(p,'costumes','giao-linh'));
  p=normalizeProgress(resetLevel(p,'giao-linh'));
  assert.deepEqual(p.placed['giao-linh'],[]);assert.ok(isUnlocked(p,'costumes','giao-linh'));
});
test('fixed-grid shuffles are valid, unsolved, and swap only two cells',()=>{
  for(let n=0;n<100;n++){const tiles=shuffleTiles(3);assert.ok(validTiles(tiles,3));assert.equal(isSolved(tiles),false);}
  assert.equal(isSolved(shuffleTiles(3,()=>0.999)),false);
  const original=[0,1,2,3,4,5,6,7,8],swapped=swapTiles(original,0,8);
  assert.deepEqual(swapped,[8,1,2,3,4,5,6,7,0]);assert.equal(correctTiles(swapped),7);
  assert.deepEqual(original,[0,1,2,3,4,5,6,7,8]);assert.equal(swapTiles(original,-1,1),original);
  assert.equal(validTiles([0,0,2,3,4,5,6,7,8],3),false);
});
test('grid completion, preview limit, partial persistence, reset and best result',()=>{
  let p=startGrid(tutorial(),'nhat-binh');p=previewGrid(previewGrid(p,'nhat-binh'),'nhat-binh');assert.equal(previewGrid(p,'nhat-binh'),p);
  p=normalizeProgress(JSON.parse(JSON.stringify(p)));const initial=p.runs['nhat-binh'];assert.equal(initial.type,'image-grid');
  for(let i=0;i<9;i++){const run=p.runs['nhat-binh'];if(run.type!=='image-grid')throw Error();const source=run.tiles.indexOf(i);p=swapGrid(p,'nhat-binh',source,i);}
  assert.ok(isUnlocked(p,'colors','thanh-da-luu-ly'));assert.ok(p.completed.includes('nhat-binh'));assert.ok(p.best['nhat-binh'].actions>0);
  const best=p.best['nhat-binh'];p=resetLevel(p,'nhat-binh');assert.deepEqual(p.best['nhat-binh'],best);
  assert.ok(isUnlocked(p,'headwear','khan-vanh-day'));const replay=p.runs['nhat-binh'];if(replay.type!=='image-grid')throw Error();
  assert.equal(isSolved(replay.tiles),false);assert.equal(replay.moves,0);assert.equal(replay.previewsUsed,0);
});
test('v1 migration preserves completions and rewards across the new family system',()=>{
  const p=normalizeProgress({version:1,completed:['giao-linh','nhat-binh','con-phuc'],placed:{'giao-linh':['robe']},activeLevel:'con-phuc'});
  assert.deepEqual(p.completed,['giao-linh','nhat-binh','hoang-bao','con-phuc']);assert.deepEqual(p.placed['giao-linh'],['robe']);assert.ok(p.migrated);
  for(const id of ['special-quan-phuc-nam','special-long-bao-nam','giao-linh'])assert.ok(isUnlocked(p,'costumes',id));
  assert.ok(isUnlocked(p,'costumes','special-quan-phuc-nam'));assert.ok(isUnlocked(p,'colors','thuy-mac-giay-do'));
  assert.deepEqual(normalizeProgress(JSON.parse(JSON.stringify(p))).unlockedItems,p.unlockedItems);
});
test('invalid storage and unknown IDs recover without breaking starter wardrobe',()=>{
  assert.deepEqual(normalizeProgress(null),emptyProgress());assert.deepEqual(normalizeProgress({version:99}),emptyProgress());
  const p=normalizeProgress({version:2,completed:['fake','con-phuc'],placed:{'giao-linh':['robe','fake','robe']},activeLevel:'con-phuc'});
  assert.deepEqual(p.completed,[]);assert.deepEqual(p.placed['giao-linh'],['robe']);assert.equal(p.activeLevel,'giao-linh');
});
test('tutorial drop tolerance accepts nearby drops and rejects wrong locations',()=>{
  for(const piece of COSTUME_PUZZLES[0].pieces){const level=COSTUME_PUZZLES[0],target=targetOf(level,piece);
    assert.ok(isCorrectDrop(level,piece,{x:target.x+40,y:target.y+20}));assert.equal(isCorrectDrop(level,piece,{x:target.x+70,y:target.y}),false);
  }
});
test('detective validates answers, locks fixed areas, persists partial run and earns actual wardrobe reward',()=>{
  const c=CHALLENGES[2];if(c.type!=='detective')throw Error();
  assert.equal(startChallenge(emptyProgress(),c.id).runs[c.id],undefined);
  let p=startChallenge(gridCompleted(),c.id);
  const first=c.errors[0];p=answerDetective(p,c.id,first.id,first.options.find(o=>o.id!==first.correctOption)!.id);
  let run=p.runs[c.id];if(run.type!=='detective')throw Error();assert.equal(run.attempts,1);assert.deepEqual(run.fixed,[]);assert.equal(isUnlocked(p,'costumes',c.outfitId),false);
  p=answerDetective(p,c.id,first.id,first.correctOption);assert.equal(answerDetective(p,c.id,first.id,first.correctOption),p);
  p=normalizeProgress(JSON.parse(JSON.stringify(p)));assert.equal(challengeSolved(p,c),false);
  for(const error of c.errors)p=answerDetective(p,c.id,error.id,error.correctOption);
  run=p.runs[c.id];if(run.type!=='detective')throw Error();
  assert.deepEqual(detectiveLook(c,run).genz,[]);assert.equal(detectiveLook(c,run).footwear,'hai-theu');assert.deepEqual(detectiveLook(c,run).jewelry,[]);
  assert.ok(challengeSolved(p,c));assert.ok(canPlay(p,CHALLENGES[3]));assert.ok(isUnlocked(p,'costumes',c.outfitId));assert.equal(p.best[c.id].actions,4);
  p=resetLevel(p,c.id);assert.equal(challengeSolved(p,c),false);assert.equal(p.best[c.id].actions,4);assert.ok(isUnlocked(p,'costumes',c.outfitId));
});
test('reconstruction rejects incomplete/unknown choices, scores aggregate, allows retry and keeps best/rewards',()=>{
  const c=CHALLENGES[3],det=CHALLENGES[2];if(c.type!=='reconstruction'||det.type!=='detective')throw Error();
  let p=startChallenge(gridCompleted(),det.id);for(const error of det.errors)p=answerDetective(p,det.id,error.id,error.correctOption);
  p=startChallenge(p,c.id);assert.equal(submitReconstruction(p,c.id),p);assert.equal(chooseReconstruction(p,c.id,'hat','fake'),p);
  for(const [i,slot] of c.slots.entries())p=chooseReconstruction(p,c.id,slot.id,i<2?slot.choices.find(choice=>choice.id!==slot.correctChoice)!.id:slot.correctChoice);
  p=submitReconstruction(p,c.id);let run=p.runs[c.id];if(run.type!=='reconstruction')throw Error();
  assert.equal(run.lastAccuracy,5);assert.equal(run.submissions,1);assert.equal(isUnlocked(p,'costumes',c.outfitId),false);
  p=normalizeProgress(JSON.parse(JSON.stringify(p)));assert.deepEqual(p.runs[c.id],run);
  for(const slot of c.slots)p=chooseReconstruction(p,c.id,slot.id,slot.correctChoice);
  p=submitReconstruction(p,c.id);assert.ok(challengeSolved(p,c));assert.equal(p.best[c.id].actions,2);assert.ok(isUnlocked(p,'costumes',c.outfitId));assert.equal(chooseReconstruction(p,c.id,'hat','mu-tron'),p);
  p=resetLevel(p,c.id);assert.equal(challengeSolved(p,c),false);for(const slot of c.slots)p=chooseReconstruction(p,c.id,slot.id,slot.correctChoice);
  p=submitReconstruction(p,c.id);assert.equal(p.best[c.id].actions,1);assert.ok(isUnlocked(p,'costumes','special-quan-phuc-nam'));assert.ok(isUnlocked(p,'colors','thuy-mac-giay-do'));
});
test('all rewards exist in the current wardrobe and defaults remain playable',()=>{
  const registries={costumes:[...GARMENTS,...SPECIAL_GARMENTS],headwear:HEADWEAR,colors:COLOR_PRESETS,accessories:[...FOOTWEAR,...JEWELRY,...HANDHELD]};
  for(const c of CHALLENGES)for(const reward of c.rewards)assert.ok(registries[reward.kind].some(item=>item.id===reward.id),reward.id);
  const p=emptyProgress();assert.ok(isUnlocked(p,'costumes','nhat-binh'));assert.ok(isUnlocked(p,'colors',COLOR_PRESETS[0].id));assert.ok(isUnlocked(p,'headwear','non-ba-tam'));
});
test('previous v2 item names migrate to current real items and ceremonial full models',()=>{
  const p=normalizeProgress({version:2,unlockedItems:{costumes:['giao_linh_thien_thanh_bun','hoang_bao_long_trieu'],headwear:['mien_quan','khan_vanh_day'],accessories:['dai_doi'],colors:['hoang_trieu']}});
  assert.ok(p.unlockedItems.costumes.includes('giao-linh'));assert.ok(p.unlockedItems.costumes.includes('special-long-bao-nam'));assert.ok(p.unlockedItems.costumes.includes('special-quan-phuc-nam'));
  assert.ok(p.unlockedItems.headwear.includes('khan-vanh-day'));assert.ok(p.unlockedItems.colors.includes('kim-sa-hoang-toc'));assert.deepEqual(p.unlockedItems.accessories,[]);
  assert.deepEqual(normalizeProgress(JSON.parse(JSON.stringify(p))).unlockedItems,p.unlockedItems);
});
test('fresh collection, paired rewards, actual gender compatibility and old gender IDs',()=>{
 const fresh=emptyProgress();
 for(const id of ['giao-linh','ao-tac','special-long-bao-nam','special-phuong-bao-nu','special-quan-phuc-nam','special-bach-y-nu'])assert.equal(isUnlocked(fresh,'costumes',id),false);
 assert.equal(compatibleCostume('nhat-binh','male'),false);assert.equal(compatibleCostume('nhat-binh','female'),true);
 assert.equal(familyVariant('nhat-binh','male'),undefined);
 const migrated=normalizeProgress({version:2,unlockedItems:{costumes:['giao-linh-female','special-long-bao-nam','special-quan-phuc-nam']}});
 for(const id of ['giao-linh','special-long-bao-nam','special-phuong-bao-nu','special-quan-phuc-nam','special-bach-y-nu'])assert.ok(isUnlocked(migrated,'costumes',id),id);
 assert.equal(familyVariant('special-long-bao-nam','female'),'special-phuong-bao-nu');
 assert.equal(familyVariant('special-quan-phuc-nam','female'),'special-bach-y-nu');
 const grid=gridCompleted();assert.ok(isUnlocked(grid,'costumes','ao-tac'));assert.ok(compatibleCostume('ao-tac','female'));assert.ok(compatibleCostume('ao-tac','male'));
 assert.deepEqual(normalizeProgress(JSON.parse(JSON.stringify(migrated))).unlockedCostumeFamilies,migrated.unlockedCostumeFamilies);
});

test('legacy explicit earned items and best records survive family migration',()=>{
 const p=normalizeProgress({version:1,completed:['giao-linh','nhat-binh'],unlockedItems:{costumes:['special-phuong-bao-nu'],accessories:['guoc-moc']},best:{'nhat-binh':{actions:6,previews:1,total:5,completedAt:42}}});
 assert.ok(isUnlocked(p,'costumes','special-long-bao-nam'));assert.ok(isUnlocked(p,'costumes','special-phuong-bao-nu'));assert.ok(isUnlocked(p,'accessories','guoc-moc'));assert.equal(p.best['nhat-binh'].actions,6);assert.equal(p.best['nhat-binh'].completedAt,42);
});
