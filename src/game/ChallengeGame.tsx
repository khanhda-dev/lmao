import PuzzleCanvas from './PuzzleCanvas';
import ImageGridPuzzle from './ImageGridPuzzle';
import DetectiveChallenge from './DetectiveChallenge';
import ReconstructionChallenge from './ReconstructionChallenge';
import { usePuzzleProgress } from './PuzzleProgress';
import type { Challenge } from './types';

export default function ChallengeGame({level,onComplete,onReset}:{level:Challenge;onComplete:()=>void;onReset:()=>void}){
  const store=usePuzzleProgress(),{progress}=store,run=progress.runs[level.id];
  const reset=()=>{store.reset(level.id);onReset();};
  switch(level.type){
    case 'assemble':{
      const placed=progress.placed[level.id]??[];
      return <PuzzleCanvas level={level.costume} placed={placed} onReset={reset} onPlace={id=>{if(!placed.includes(id)&&placed.length+1===level.total)onComplete();store.place(level.id,id);}}/>;
    }
    case 'image-grid':return <ImageGridPuzzle image={level.image} gridSize={level.gridSize} title={level.name} aspectRatio={level.imageAspect} previewMs={level.previewMs} previewLimit={level.previewLimit} run={run?.type==='image-grid'?run:undefined} onInitialize={()=>store.startGrid(level.id)} onSeen={()=>store.markGridSeen(level.id)} onSwap={(a,b)=>store.swapGrid(level.id,a,b)} onPreview={()=>store.previewGrid(level.id)} onReset={reset} onComplete={onComplete}/>;
    case 'detective':return <DetectiveChallenge level={level} run={run?.type==='detective'?run:undefined} onInitialize={()=>store.startChallenge(level.id)} onAnswer={(error,option)=>store.answerDetective(level.id,error,option)} onReset={reset} onComplete={onComplete}/>;
    case 'reconstruction':return <ReconstructionChallenge level={level} run={run?.type==='reconstruction'?run:undefined} onInitialize={()=>store.startChallenge(level.id)} onChoose={(slot,choice)=>store.chooseReconstruction(level.id,slot,choice)} onSubmit={()=>store.submitReconstruction(level.id)} onReset={reset} onComplete={onComplete}/>;
  }
}
