import { useEffect,useState } from 'react';
import { Check,Crown,RotateCcw,Send } from 'lucide-react';
import CostumeLayers from './CostumeLayers';
import SvgArtwork from './SvgArtwork';
import {reconstructionLayer} from './attachments';
import { reconstructionAccuracy } from './challengeLogic';
import type { ReconstructionChallengeData,ReconstructionRun } from './types';

export default function ReconstructionChallenge({level,run,onInitialize,onChoose,onSubmit,onReset,onComplete}:{level:ReconstructionChallengeData;run:ReconstructionRun|undefined;onInitialize:()=>void;onChoose:(slot:string,choice:string)=>void;onSubmit:()=>void;onReset:()=>void;onComplete:()=>void}){
  const [active,setActive]=useState(level.slots[0].id);
  useEffect(()=>{onInitialize();},[]);
  const choices=run?.choices??{},slot=level.slots.find(slot=>slot.id===active)!,selected=Object.keys(choices).length,complete=run?.lastAccuracy===level.total;
  const layers=level.costume.pieces.flatMap(piece=>{
    const choice=level.slots.find(slot=>slot.id===piece.id)?.choices.find(choice=>choice.id===choices[piece.id]);
    return choice?[reconstructionLayer(piece.id,choice,piece.zIndex)]:[];
  });
  return <section className="challenge-card reconstruction-challenge">
    <div className="challenge-heading"><div><span className="puzzle-eyebrow"><Crown size={14}/> THỬ THÁCH CUỐI</span><h2>Phục dựng lễ phục</h2></div><button className="puzzle-button light" onClick={()=>{onReset();setActive(level.slots[0].id);}}><RotateCcw size={15}/>Chơi lại</button></div>
    <div className="reconstruction-context"><span><small>NHÂN VẬT</small><strong>{level.scenario.character}</strong></span><span><small>BỐI CẢNH</small><strong>{level.scenario.occasion}</strong></span><p>{level.scenario.mission}</p></div>
    <div className="reconstruction-layout">
      <div className={`reconstruction-stage ${complete?'challenge-solved':''}`}><CostumeLayers costume={level.costume} layers={layers} label="Bản phục dựng đang phối"/><span>{selected}/{level.total} cấu kiện đã chọn</span></div>
      <div className="reconstruction-wardrobe"><span className="puzzle-eyebrow">TỦ CẤU KIỆN · CHỌN THEO BỐI CẢNH</span>
        <div className="reconstruction-slots" role="group" aria-label="Các nhóm cấu kiện">{level.slots.map(item=><button key={item.id} data-testid={`reconstruction-slot-${item.id}`} aria-pressed={active===item.id} onClick={()=>setActive(item.id)}>{choices[item.id]&&<Check size={12}/>}<span>{item.label}</span></button>)}</div>
        <h3>{slot.label}</h3><p className="challenge-scope">Dấu chọn chỉ ghi nhận món bạn đã mặc. Kết quả được chấm khi nộp cả bộ.</p>
        <div className={`reconstruction-options preview-category-${slot.id}`}>{slot.choices.map(choice=><button key={choice.id} data-testid={`reconstruction-choice-${choice.id}`} aria-pressed={choices[slot.id]===choice.id} disabled={complete} onClick={()=>onChoose(slot.id,choice.id)}><span><SvgArtwork asset={choice.asset}/></span><strong>{choice.label}</strong></button>)}</div>
      </div>
    </div>
    <div className="reconstruction-submit"><div role="status" data-testid="reconstruction-feedback">{run?.lastAccuracy!=null?<><small>ĐỘ CHÍNH XÁC</small><strong>{run.lastAccuracy}/{level.total}</strong><p>{complete?'Phục dựng hoàn tất!':`Có ${level.total-run.lastAccuracy} chi tiết chưa phù hợp. Xem lại bản phối và thử tiếp.`}</p></>:<p>{selected===level.total?'Đã đủ cấu kiện. Bạn sẵn sàng nộp bản phục dựng?':`Chọn đủ ${level.total} cấu kiện để nộp.`}</p>}</div><button className="puzzle-button primary" disabled={selected!==level.total||complete} onClick={()=>{onSubmit();if(reconstructionAccuracy(level,choices)===level.total)onComplete();}}><Send size={15}/>Nộp phục dựng</button></div>
    <small className="challenge-scope">Lượt nộp: {run?.submissions??0}. Các cấu kiện được ghép theo hình gốc trong bộ sưu tập; đây không phải hướng dẫn thứ tự mặc lễ phục.</small>
  </section>;
}
