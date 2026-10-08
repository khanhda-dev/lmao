import { useState } from 'react';
import { ArrowRight, Check, Trophy } from 'lucide-react';
import { CHALLENGES } from './challenges';
import { challengeSolved } from './challengeLogic';
import ChallengeGame from './ChallengeGame';
import { usePuzzleProgress } from './PuzzleProgress';
import { CostumeInfoPanel, LevelSidebar, RewardPreview } from './PuzzlePanels';
import CompletionModal from './CompletionModal';
import './puzzle.css';

export default function PuzzlePage({onTryOutfit}:{onTryOutfit:(id:string)=>void}) {
  const {progress,select,storageError}=usePuzzleProgress();
  const [completion,setCompletion]=useState<string|null>(null);
  const level=CHALLENGES.find(l=>l.id===progress.activeLevel) ?? CHALLENGES[0];
  const index=CHALLENGES.findIndex(l=>l.id===level.id);
  const complete=challengeSolved(progress,level);
  const next=CHALLENGES[index+1];
  return <div className="puzzle-page">
    <LevelSidebar level={level} onSelect={id=>{select(id);setCompletion(null);}}/>
    <div className="puzzle-main">
      <div className="puzzle-chapter"><span>CHẶNG {String(index+1).padStart(2,'0')} / {String(CHALLENGES.length).padStart(2,'0')} · {level.title}</span><span>{level.difficulty}</span></div>
      {progress.migrated&&<p className="challenge-migration">Đồ đã mở từ phiên bản trước vẫn được giữ. Các kiểu thử thách mới có thể chơi lại từ đầu.</p>}
      {storageError && <p className="puzzle-storage-note" role="status">Trình duyệt chưa cho phép lưu tiến trình. Bạn vẫn có thể chơi trong phiên này.</p>}
      <ChallengeGame key={level.id} level={level} onReset={()=>setCompletion(null)} onComplete={()=>setCompletion(level.id)}/>
      <RewardPreview level={level} conceal={level.type==='reconstruction'&&!complete}/>
      <div className="puzzle-finish-row"><span>{complete?<><Check size={15}/>Phần thưởng đã vào tủ đồ</>:<>Vượt thử thách để mở thêm đồ</>}</span><button className="puzzle-button primary" disabled={!complete} onClick={()=>setCompletion(level.id)}>{complete?'Xem phần thưởng':'Đang thử thách'}<ArrowRight size={16}/></button></div>
    </div>
    <CostumeInfoPanel level={level}/>
    {progress.completed.length===CHALLENGES.length && <div className="puzzle-journey-complete"><Trophy size={18}/>Huy hiệu Nhà khám phá Việt phục đã thuộc về bạn.</div>}
    {completion===level.id && <CompletionModal level={level} onClose={()=>setCompletion(null)} hasNext={!!next}
      onTry={()=>{setCompletion(null);onTryOutfit(level.outfitId);}}
      onNext={()=>{setCompletion(null);if(next)select(next.id);}}/>}
  </div>;
}
