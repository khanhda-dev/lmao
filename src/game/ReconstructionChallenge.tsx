import { useEffect,useState } from 'react';
import { Check,RotateCcw,Send,X } from 'lucide-react';
import CostumeLayers from './CostumeLayers';
import SvgArtwork from './SvgArtwork';
import {reconstructionLayer} from './attachments';
import { reconstructionAccuracy } from './challengeLogic';
import type { ReconstructionChallengeData,ReconstructionRun } from './types';
import './answer-feedback.css';

export default function ReconstructionChallenge({level,run,onInitialize,onChoose,onSubmit,onReset,onComplete}:{level:ReconstructionChallengeData;run:ReconstructionRun|undefined;onInitialize:()=>void;onChoose:(slot:string,choice:string)=>void;onSubmit:()=>void;onReset:()=>void;onComplete:()=>void}){
  const [active,setActive]=useState(level.slots[0].id);
  useEffect(()=>{onInitialize();},[]);
  const choices=run?.choices??{},slot=level.slots.find(slot=>slot.id===active)!,selected=Object.keys(choices).length,complete=run?.lastAccuracy===level.total;
  const checked=run?.lastAccuracy!=null;
  const layers=level.costume.pieces.flatMap(piece=>{
    const choice=level.slots.find(slot=>slot.id===piece.id)?.choices.find(choice=>choice.id===choices[piece.id]);
    return choice?[reconstructionLayer(piece.id,choice,piece.zIndex)]:[];
  });
  return <section className="challenge-card reconstruction-challenge">
    <div className="challenge-heading"><div><h2>Phục dựng lễ phục</h2></div><button className="puzzle-button light" onClick={()=>{onReset();setActive(level.slots[0].id);}}><RotateCcw size={15}/>Chơi lại</button></div>
    <div className="reconstruction-layout">
      <div className={`reconstruction-stage ${complete?'challenge-solved':''}`}><CostumeLayers costume={level.costume} layers={layers} label="Bản phục dựng đang phối"/></div>
      <div className="reconstruction-wardrobe">
        <div className="reconstruction-slots" role="group" aria-label="Các nhóm cấu kiện">{level.slots.map(item=>{
          const answer=checked&&choices[item.id]?(choices[item.id]===item.correctChoice?'correct':'incorrect'):undefined;
          return <button key={item.id} data-testid={`reconstruction-slot-${item.id}`} data-answer={answer} aria-label={`${item.label}${answer==='correct'?' · đúng':answer==='incorrect'?' · chưa đúng':''}`} aria-pressed={active===item.id} onClick={()=>setActive(item.id)}>{choices[item.id]&&(answer==='incorrect'?<X size={14}/>:<Check size={14}/>)}<span>{item.label}</span></button>;
        })}</div>
        <h3>{slot.label}</h3>
        <div className={`reconstruction-options preview-category-${slot.id}`}>{slot.choices.map(choice=>{
          const answer=checked&&choices[slot.id]===choice.id?(choice.id===slot.correctChoice?'correct':'incorrect'):undefined;
          return <button key={choice.id} data-testid={`reconstruction-choice-${choice.id}`} data-answer={answer} aria-pressed={choices[slot.id]===choice.id} disabled={complete} onClick={()=>onChoose(slot.id,choice.id)}><span><SvgArtwork asset={choice.asset}/></span><strong>{choice.label}</strong>{answer&&<small className="answer-status">{answer==='correct'?<Check size={14}/>:<X size={14}/>} {answer==='correct'?'Đúng':'Chưa đúng'}</small>}</button>;
        })}</div>
      </div>
    </div>
    <div className="reconstruction-submit"><div role="status" data-testid="reconstruction-feedback">{run?.lastAccuracy!=null?<p>{`Đúng ${run.lastAccuracy}/${level.total} món${complete?'.':', hãy thử lại.'}`}</p>:<p>{selected===level.total?'Đã đủ cấu kiện. Bạn sẵn sàng nộp bản phục dựng?':`Chọn đủ ${level.total} cấu kiện để nộp.`}</p>}</div><button className="puzzle-button primary" disabled={selected!==level.total||complete} onClick={()=>{onSubmit();if(reconstructionAccuracy(level,choices)===level.total)onComplete();}}><Send size={15}/>Nộp phục dựng</button></div>
  </section>;
}
