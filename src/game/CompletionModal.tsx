import { useEffect, useRef } from 'react';
import { ArrowRight, Check, PartyPopper, Shirt, X } from 'lucide-react';
import type { Challenge } from './types';

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
    <div ref={modal} className="puzzle-modal" role="dialog" aria-modal="true" aria-labelledby="puzzle-completion-title" aria-describedby="puzzle-completion-copy">
      <div className="puzzle-celebration" aria-hidden="true">{Array.from({length:14},(_,i)=><i key={i} style={{left:`${8+i*6}%`,animationDelay:`${i%5*0.13}s`,background:['#d8a74a','#ae3437','#63977c'][i%3]}}/>)}<PartyPopper size={32}/></div>
      <button ref={first} className="puzzle-modal-close" aria-label="Đóng chúc mừng" onClick={onClose}><X size={18}/></button>
      <span className="puzzle-eyebrow">THÊM MỘT BỘ ĐỒ · THÊM MỘT KHÁM PHÁ</span>
      <h2 id="puzzle-completion-title">{level.type==='reconstruction'?'Phục dựng hoàn tất!':level.type==='image-grid'?'Hình ảnh đã phục hồi!':'Thử thách hoàn tất!'}</h2><h3>{level.name} · {level.title}</h3>
      <span className="puzzle-completion-count"><Check size={15}/>{level.total}/{level.total} chính xác</span>
      <p id="puzzle-completion-copy">{level.learning}</p>
      <div className="puzzle-modal-rewards">{level.rewards.map(r=><span key={`${r.kind}-${r.id}`}><Check size={13}/>{r.name}</span>)}</div>
      <div className="puzzle-modal-actions"><button className="puzzle-button primary" onClick={onTry}><Shirt size={17}/>Thử ngay trong tủ đồ</button><button className="puzzle-button light" onClick={onNext}>{hasNext?'Màn tiếp theo':'Xem lại hành trình'}<ArrowRight size={16}/></button></div>
      <small>Phần thưởng được giữ khi bạn chơi lại.</small>
    </div>
  </div>;
}
