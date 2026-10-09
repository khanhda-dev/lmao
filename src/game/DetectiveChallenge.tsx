import { useEffect,useRef,useState } from 'react';
import { Check,RotateCcw,Search,X } from 'lucide-react';
import { CostumeModel } from '../components/CostumeModel';
import { CeremonialHatPreview } from '../components/CeremonialHeadwear';
import SvgArtwork from './SvgArtwork';
import AccessoryPreview from './AccessoryPreview';
import { applyDetectiveOption,detectiveLook } from './challengeLogic';
import type { DetectiveChallengeData,DetectiveRun,WardrobeLook } from './types';
import './answer-feedback.css';

function WardrobeFigure({level,look}:{level:DetectiveChallengeData;look:WardrobeLook}){
  return <div className="detective-figure" style={{aspectRatio:level.dimensions[0]/level.dimensions[1]}}>
    <CostumeModel gender="male" garmentId="giao-linh" garmentName={level.name} specialId={level.modelId} headwearId={look.headwear==='none'?undefined:look.headwear} ceremonialHeadwearOverride footwearId={look.footwear} jewelry={look.jewelry} handheldId={look.handheld} genZ={look.genz}/>
  </div>;
}
export default function DetectiveChallenge({level,run,onInitialize,onAnswer,onReset,onComplete}:{level:DetectiveChallengeData;run:DetectiveRun|undefined;onInitialize:()=>void;onAnswer:(error:string,option:string)=>void;onReset:()=>void;onComplete:()=>void}){
  const [active,setActive]=useState<string|null>(null),[feedback,setFeedback]=useState('Quan sát bản phối và chạm vào chi tiết bạn muốn thay.');
  const [checkedOptions,setCheckedOptions]=useState<Record<string,string>>({});
  const option=useRef<HTMLButtonElement>(null),lastZone=useRef<HTMLButtonElement|null>(null),zones=useRef<Record<string,HTMLButtonElement|null>>({});
  useEffect(()=>{onInitialize();},[]);
  useEffect(()=>{if(active)option.current?.focus();},[active]);
  useEffect(()=>{if(!run?.attempts)setCheckedOptions({});},[run?.attempts]);
  const error=level.errors.find(error=>error.id===active),look=detectiveLook(level,run),fixed=run?.fixed??[];
  const complete=fixed.length===level.total;
  return <section className="challenge-card detective-challenge">
    <div className="challenge-heading"><div><h2>Bắt lỗi Việt phục</h2></div><button className="puzzle-button light" onClick={()=>{onReset();setActive(null);setCheckedOptions({});setFeedback('Bản phối đã trở về trạng thái ban đầu.');}}><RotateCcw size={15}/>Chơi lại</button></div>
    <div className="sr-only"><strong data-testid="detective-progress">{fixed.length}/{level.total}</strong></div>
    <div className="detective-layout">
      <div className={`detective-stage ${complete?'challenge-solved':''}`} onClick={()=>setFeedback('Vùng này chưa cần sửa. Hãy quan sát phụ kiện trên nhân vật.')}>
        <WardrobeFigure level={level} look={look}/>
        {level.errors.map(error=>{const done=fixed.includes(error.id),answer=done?'correct':checkedOptions[error.id]?'incorrect':undefined,[x,y,w,h]=error.bounds;return <button ref={element=>{zones.current[error.id]=element;}} key={error.id} data-testid={`detective-zone-${error.id}`} data-answer={answer} className={`detective-zone ${active===error.id?'selected':''} ${done?'fixed':''}`} style={{left:`${x/level.dimensions[0]*100}%`,top:`${y/level.dimensions[1]*100}%`,width:`${w/level.dimensions[0]*100}%`,height:`${h/level.dimensions[1]*100}%`}} disabled={done} aria-label={`Kiểm tra ${error.label.toLowerCase()}${done?' · đã sửa':answer==='incorrect'?' · lựa chọn chưa đúng':''}`} onClick={event=>{event.stopPropagation();lastZone.current=event.currentTarget;setActive(error.id);setFeedback('Chọn phương án phù hợp để thay chi tiết ở vùng này.');}}>{done?<Check size={19}/>:answer==='incorrect'?<X size={19}/>:null}</button>;})}
      </div>
      <div className="detective-tray" onKeyDown={event=>{if(event.key==='Escape'){setActive(null);lastZone.current?.focus();}}}>
        {error&&!fixed.includes(error.id)?<><span className="puzzle-eyebrow">CHỌN MÓN THAY THẾ</span><h3>{error.label}</h3><div className="detective-options">{error.options.map((item,index)=>{
          const preview=applyDetectiveOption(look,error,item.look),accessory=item.look.genz?.[0];
          const answer=checkedOptions[error.id]===item.id?(item.id===error.correctOption?'correct':'incorrect'):undefined;
          return <button ref={index===0?option:undefined} key={item.id} data-testid={`detective-option-${item.id}`} data-answer={answer} onClick={()=>{
            setCheckedOptions(previous=>({...previous,[error.id]:item.id}));
            onAnswer(error.id,item.id);
            if(item.id===error.correctOption){
              setFeedback(error.learning);setActive(null);
              const next=level.errors.find(candidate=>candidate.id!==error.id&&!fixed.includes(candidate.id));
              if(next)zones.current[next.id]?.focus();
              if(fixed.length+1===level.total)onComplete();
            }
            else setFeedback('Chi tiết này chưa phù hợp với bản phối đang phục hồi. Thử phương án khác nhé.');
          }}><span className={`detective-option-art preview-category-${error.id}`} style={{aspectRatio:error.bounds[2]/error.bounds[3]}}>{error.id==='feet'?<SvgArtwork asset={`/puzzle/items/special-long-bao-nam-${item.look.footwear==='hai-theu'?'hai':item.look.footwear}.svg`}/>:error.id==='head'&&(item.look.headwear==='mu-cuu-long'||item.look.headwear==='mu-phuong')?<CeremonialHatPreview id={item.look.headwear}/>:accessory?<AccessoryPreview id={accessory}/>:<span className="detective-option-crop" style={{width:`${level.dimensions[0]/error.bounds[2]*100}%`,left:`${-error.bounds[0]/error.bounds[2]*100}%`,top:`${-error.bounds[1]/error.bounds[3]*100}%`}}><WardrobeFigure level={level} look={preview}/></span>}</span><strong>{item.label}</strong>{answer&&<small className="answer-status">{answer==='correct'?<Check size={14}/>:<X size={14}/>} {answer==='correct'?'Đúng':'Chưa đúng'}</small>}</button>;
        })}</div></>:<div className="detective-empty"><Search size={28}/><h3>{complete?'Bản phối đã được phục hồi':'Bạn phát hiện chi tiết nào sai?'}</h3><p>{complete?'Ba chi tiết đã được thay. Phần thưởng đang chờ trong tủ đồ.':'Chạm vào bộ phận để bắt lỗi.'}</p></div>}
      </div>
    </div>
    <p className="sr-only" role="status" aria-live="polite" data-testid="detective-feedback">{feedback}</p>
  </section>;
}
