import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { CHALLENGES } from './challenges';
import { canPlay, emptyProgress, isUnlocked, normalizeProgress, placePiece, resetLevel, startGrid, swapGrid, previewGrid, markGridSeen,startChallenge,answerDetective,chooseReconstruction,submitReconstruction, STORAGE_KEY } from './progress';
import type { UnlockKind } from './types';

function readProgress() {
  try { return normalizeProgress(JSON.parse(localStorage.getItem(STORAGE_KEY) ?? 'null')); }
  catch { return emptyProgress(); }
}
function useProgressStore() {
  const [progress,setProgress] = useState(readProgress);
  const [storageError,setStorageError] = useState(false);
  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY,JSON.stringify(progress)); setStorageError(false); }
    catch { setStorageError(true); }
  },[progress]);
  useEffect(() => {
    const sync = (event: StorageEvent) => { if (event.key === STORAGE_KEY) setProgress(readProgress()); };
    window.addEventListener('storage',sync);
    return () => window.removeEventListener('storage',sync);
  },[]);
  return {
    progress, storageError,
    place:(level:string,piece:string) => setProgress(p=>placePiece(p,level,piece)),
    reset:(level:string) => setProgress(p=>resetLevel(p,level)),
    startGrid:(id:string)=>setProgress(p=>startGrid(p,id)),
    swapGrid:(id:string,a:number,b:number)=>setProgress(p=>swapGrid(p,id,a,b)),
    previewGrid:(id:string)=>setProgress(p=>previewGrid(p,id)),
    markGridSeen:(id:string)=>setProgress(p=>markGridSeen(p,id)),
    startChallenge:(id:string)=>setProgress(p=>startChallenge(p,id)),
    answerDetective:(id:string,error:string,option:string)=>setProgress(p=>answerDetective(p,id,error,option)),
    chooseReconstruction:(id:string,slot:string,choice:string)=>setProgress(p=>chooseReconstruction(p,id,slot,choice)),
    submitReconstruction:(id:string)=>setProgress(p=>submitReconstruction(p,id)),
    select:(id:string) => setProgress(p=>{
      const level=CHALLENGES.find(l=>l.id===id);
      return level && canPlay(p,level) ? {...p,activeLevel:id} : p;
    }),
    isUnlocked:(kind:UnlockKind,id:string) => isUnlocked(progress,kind,id),
    unlockedItems:progress.unlockedItems,
  };
}
const Context = createContext<ReturnType<typeof useProgressStore> | null>(null);
export function PuzzleProgressProvider({children}:{children:ReactNode}) {
  const store=useProgressStore();
  return <Context.Provider value={store}>{children}</Context.Provider>;
}
export function usePuzzleProgress() {
  const context=useContext(Context);
  if (!context) throw new Error('PuzzleProgressProvider is required');
  return context;
}
