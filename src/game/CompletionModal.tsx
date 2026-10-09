import { useEffect, useRef } from 'react';
import { ArrowRight, Check, PartyPopper, Shirt, X } from 'lucide-react';
import type { Challenge } from './types';
import RewardArtwork from './RewardArtwork';

export default function CompletionModal({level,onClose,onTry,onNext,hasNext}:{level:Challenge;onClose:()=>void;onTry:()=>void;onNext:()=>void;hasNext:boolean}) {
  const modal=useRef<HTMLDivElement>(null),first=useRef<HTMLButtonElement>(null);
  useEffect(()=>{
    const previous=document.activeElement as HTMLElement|null;
    first.current?.focus();
    const handle=(event:KeyboardEvent)=>{
      if(event.key==='Escape') onClose();
      if(event.key==='Tab') {
        const buttons=modal.current?.querySelectorAll<HTMLButtonElement>('button');
        if(!buttons?.length)return;
        const a=buttons[0],b=buttons[buttons.length-1];
        if(event.shiftKey&&document.activeElement===a){event.preventDefault();b.focus();}
        else if(!event.shiftKey&&document.activeElement===b){event.preventDefault();a.focus();}
      }
    };
    const oldOverflow=document.body.style.overflow;document.body.style.overflow='hidden';
    window.addEventListener('keydown',handle);
    return ()=>{document.body.style.overflow=oldOverflow;window.removeEventListener('keydown',handle);previous?.focus();};
  },[onClose]);
  return <div className="puzzle-modal-backdrop">
    <div ref={modal} className="puzzle-modal" role="dialog" aria-modal="true" aria-labelledby="puzzle-completion-title">
      <div className="puzzle-celebration" aria-hidden="true">{Array.from({length:14},(_,i)=><i key={i} style={{left:`${8+i*6}%`,animationDelay:`${i%5*0.13}s`,background:['#d8a74a','#ae3437','#63977c'][i%3]}}/>)}<PartyPopper size={32}/></div>
      <button ref={first} className="puzzle-modal-close" aria-label="Đóng chúc mừng" onClick={onClose}><X size={18}/></button>
      <h2 id="puzzle-completion-title">Đã hoàn thành thử thách</h2>
      <p className="puzzle-modal-unlocked">Đã mở khóa:</p>
      <div className="puzzle-modal-rewards" aria-label="Các món đồ đã mở khóa">{level.rewards.map(reward=><div className="puzzle-modal-reward" key={`${reward.kind}-${reward.id}`}>
        <div className="puzzle-modal-reward-art" role="img" aria-label={reward.name}>
          <RewardArtwork reward={reward}/>
          <span className="puzzle-reward-status" aria-hidden="true"><Check size={13}/></span>
        </div>
        <strong>{reward.name}</strong>
      </div>)}</div>
      <div className="puzzle-modal-actions"><button className="puzzle-button primary" onClick={onTry}><Shirt size={17}/>Thử ngay trong tủ đồ</button><button className="puzzle-button light" onClick={onNext}>{hasNext?'Màn tiếp theo':'Xem lại hành trình'}<ArrowRight size={16}/></button></div>
    </div>
  </div>;
}
