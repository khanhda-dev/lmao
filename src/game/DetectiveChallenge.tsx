import { useEffect,useRef,useState } from 'react';
import { Check,MousePointer2,RotateCcw,Search } from 'lucide-react';
import { CostumeModel } from '../components/CostumeModel';
import SvgArtwork from './SvgArtwork';
import AccessoryPreview from './AccessoryPreview';
import { applyDetectiveOption,detectiveLook } from './challengeLogic';
import type { DetectiveChallengeData,DetectiveRun,WardrobeLook } from './types';

function WardrobeFigure({level,look}:{level:DetectiveChallengeData;look:WardrobeLook}){
  return <div className="detective-figure" style={{aspectRatio:level.dimensions[0]/level.dimensions[1]}}>
    <CostumeModel gender="male" garmentId="giao-linh" garmentName={level.name} specialId={level.modelId} headwearId={look.headwear==='none'?undefined:look.headwear} footwearId={look.footwear} jewelry={look.jewelry} handheldId={look.handheld} genZ={look.genz}/>
  </div>;
}
export default function DetectiveChallenge({level,run,onInitialize,onAnswer,onReset,onComplete}:{level:DetectiveChallengeData;run:DetectiveRun|undefined;onInitialize:()=>void;onAnswer:(error:string,option:string)=>void;onReset:()=>void;onComplete:()=>void}){
  const [active,setActive]=useState<string|null>(null),[feedback,setFeedback]=useState('Quan sát bản phối và chạm vào chi tiết bạn muốn thay.');
  const option=useRef<HTMLButtonElement>(null),lastZone=useRef<HTMLButtonElement|null>(null),zones=useRef<Record<string,HTMLButtonElement|null>>({});
  useEffect(()=>{onInitialize();},[]);
  useEffect(()=>{if(active)option.current?.focus();},[active]);
  const error=level.errors.find(error=>error.id===active),look=detectiveLook(level,run),fixed=run?.fixed??[];
  const complete=fixed.length===level.total;
  return <section className="challenge-card detective-challenge">
    <div className="challenge-heading"><div><span className="puzzle-eyebrow"><Search size={14}/> TÌM · CHỌN · SỬA</span><h2>Bắt lỗi Việt phục</h2></div><button className="puzzle-button light" onClick={()=>{onReset();setActive(null);setFeedback('Bản phối đã trở về trạng thái ban đầu.');}}><RotateCcw size={15}/>Chơi lại</button></div>
    <div className="challenge-stats"><span>ĐÃ SỬA <strong data-testid="detective-progress">{fixed.length}/{level.total}</strong></span><span>LƯỢT CHỌN <strong>{run?.attempts??0}</strong></span></div>
    <p className="challenge-instructions"><MousePointer2 size={15}/>Tìm ba phụ kiện cần đổi để khôi phục bản phối cổ phong. Chạm một vùng trên nhân vật để xem lựa chọn.</p>
    <div className="detective-layout">
      <div className={`detective-stage ${complete?'challenge-solved':''}`} onClick={()=>setFeedback('Vùng này chưa cần sửa. Hãy quan sát phụ kiện trên nhân vật.')}>
        <WardrobeFigure level={level} look={look}/>
        {level.errors.map(error=>{const done=fixed.includes(error.id),[x,y,w,h]=error.bounds;return <button ref={element=>{zones.current[error.id]=element;}} key={error.id} data-testid={`detective-zone-${error.id}`} className={`detective-zone ${active===error.id?'selected':''} ${done?'fixed':''}`} style={{left:`${x/level.dimensions[0]*100}%`,top:`${y/level.dimensions[1]*100}%`,width:`${w/level.dimensions[0]*100}%`,height:`${h/level.dimensions[1]*100}%`}} disabled={done} aria-label={`Kiểm tra ${error.label.toLowerCase()}${done?' · đã sửa':''}`} onClick={event=>{event.stopPropagation();lastZone.current=event.currentTarget;setActive(error.id);setFeedback('Chọn phương án phù hợp để thay chi tiết ở vùng này.');}}>{done&&<Check size={19}/>}</button>;})}
      </div>
      <div className="detective-tray" onKeyDown={event=>{if(event.key==='Escape'){setActive(null);lastZone.current?.focus();}}}>
        {error&&!fixed.includes(error.id)?<><span className="puzzle-eyebrow">CHỌN MÓN THAY THẾ</span><h3>{error.label}</h3><div className="detective-options">{error.options.map((item,index)=>{
          const preview=applyDetectiveOption(look,error,item.look),accessory=item.look.genz?.[0];
          return <button ref={index===0?option:undefined} key={item.id} data-testid={`detective-option-${item.id}`} onClick={()=>{
            onAnswer(error.id,item.id);
            if(item.id===error.correctOption){
              setFeedback(error.learning);setActive(null);
              const next=level.errors.find(candidate=>candidate.id!==error.id&&!fixed.includes(candidate.id));
              if(next)zones.current[next.id]?.focus();
              if(fixed.length+1===level.total)onComplete();
            }
            else setFeedback('Chi tiết này chưa phù hợp với bản phối đang phục hồi. Thử phương án khác nhé.');
          }}><span className={`detective-option-art preview-category-${error.id}`} style={{aspectRatio:error.bounds[2]/error.bounds[3]}}>{error.id==='feet'?<SvgArtwork asset={`/puzzle/items/special-long-bao-nam-${item.look.footwear==='hai-theu'?'hai':item.look.footwear}.svg`}/>:accessory?<AccessoryPreview id={accessory}/>:<span className="detective-option-crop" style={{width:`${level.dimensions[0]/error.bounds[2]*100}%`,left:`${-error.bounds[0]/error.bounds[2]*100}%`,top:`${-error.bounds[1]/error.bounds[3]*100}%`}}><WardrobeFigure level={level} look={preview}/></span>}</span><strong>{item.label}</strong></button>;
        })}</div></>:<div className="detective-empty"><Search size={28}/><h3>{complete?'Bản phối đã được phục hồi':'Bạn phát hiện chi tiết nào?'}</h3><p>{complete?'Ba chi tiết đã được thay. Phần thưởng đang chờ trong tủ đồ.':'Chạm vào nhân vật để mở khay thay đồ. Chọn sai vẫn có thể thử tiếp.'}</p></div>}
      </div>
    </div>
    <p className="challenge-feedback" role="status" data-testid="detective-feedback">{feedback}</p>
    <small className="challenge-scope">Mục tiêu là bản phối cổ phong của trò chơi. Trong tủ đồ, bạn vẫn có thể phối phụ kiện Gen Z theo ý thích.</small>
  </section>;
}
