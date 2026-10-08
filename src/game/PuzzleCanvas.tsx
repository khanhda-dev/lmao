import { useEffect, useRef, useState, type PointerEvent } from 'react';
import { Check, Lightbulb, RotateCcw } from 'lucide-react';
import { isCorrectDrop, targetOf } from './progress';
import type { Point, PuzzleLevel, PuzzlePiece } from './types';

const WIDTH=800, HEIGHT=650, TRAY_SCALE=0.62;
export default function PuzzleCanvas({level,placed,onPlace,onReset}:{
  level:PuzzleLevel; placed:string[]; onPlace:(id:string)=>void; onReset:()=>void;
}) {
  const board=useRef<HTMLDivElement>(null);
  const activePointer=useRef<number|null>(null);
  const [drag,setDrag]=useState<{id:string;center:Point;offset:Point;start:Point}|null>(null);
  const [selected,setSelected]=useState<string|null>(null);
  const [hint,setHint]=useState<string|null>(null);
  const [message,setMessage]=useState('Kéo từng mảnh vào bóng mờ tương ứng.');
  const [wrong,setWrong]=useState<string|null>(null);
  useEffect(()=>{
    if (!hint && !wrong) return;
    const timer=window.setTimeout(()=>{setHint(null);setWrong(null);},2400);
    return ()=>window.clearTimeout(timer);
  },[hint,wrong]);
  const pointOf=(event:PointerEvent):Point=>{
    const rect=board.current!.getBoundingClientRect();
    return {x:(event.clientX-rect.left)*WIDTH/rect.width,y:(event.clientY-rect.top)*HEIGHT/rect.height};
  };
  const initialCenter=(p:PuzzlePiece):Point=>({x:p.initialPosition.x+p.bounds[2]*TRAY_SCALE/2,y:p.initialPosition.y+p.bounds[3]*TRAY_SCALE/2});
  function start(event:PointerEvent<HTMLButtonElement>,piece:PuzzlePiece) {
    if (placed.includes(piece.id) || activePointer.current!==null || (event.pointerType==='mouse' && event.button!==0)) return;
    event.preventDefault();
    const cursor=pointOf(event);
    // Start where the piece is actually drawn, including during a return animation.
    const rect=event.currentTarget.getBoundingClientRect(),scene=board.current!.getBoundingClientRect();
    const center={x:(rect.left+rect.width/2-scene.left)*WIDTH/scene.width,y:(rect.top+rect.height/2-scene.top)*HEIGHT/scene.height};
    activePointer.current=event.pointerId;
    event.currentTarget.setPointerCapture(event.pointerId);
    setSelected(null); setWrong(null);
    setDrag({id:piece.id,center,offset:{x:center.x-cursor.x,y:center.y-cursor.y},start:cursor});
  }
  function moved(event:PointerEvent<HTMLButtonElement>) {
    if (activePointer.current!==event.pointerId || !drag) return;
    const p=pointOf(event);
    setDrag({...drag,center:{x:p.x+drag.offset.x,y:p.y+drag.offset.y}});
  }
  function finish(event:PointerEvent<HTMLButtonElement>,piece:PuzzlePiece) {
    if (activePointer.current!==event.pointerId || !drag) return;
    const cursor=pointOf(event);
    const center={x:cursor.x+drag.offset.x,y:cursor.y+drag.offset.y};
    activePointer.current=null;
    setDrag(null);
    if (Math.hypot(cursor.x-drag.start.x,cursor.y-drag.start.y)<4) {
      setSelected(piece.id); setMessage(`Đã chọn ${piece.label}. Chọn bóng mờ tương ứng để ghép.`); return;
    }
    if (isCorrectDrop(level,piece,center)) success(piece);
    else {setWrong(piece.id);setMessage('Chưa đúng vị trí. Mảnh đã trở về chỗ cũ — thử lại nhé!');}
  }
  function success(piece:PuzzlePiece) {
    onPlace(piece.id); setSelected(null); setHint(null);
    setMessage(`${piece.label} · ${piece.note}`);
  }
  const complete=placed.length===level.pieces.length;
  return <section className="puzzle-game" aria-label={`Ghép trang phục ${level.name}`}>
    <div className="puzzle-toolbar">
      <div><span className="puzzle-eyebrow">GHÉP MỘT BỘ ĐỒ · MỞ MỘT CÂU CHUYỆN</span><h2>{level.name}</h2></div>
      <div className="puzzle-tools">
        <button className="puzzle-button light" disabled={complete} onClick={()=>{
          const piece=level.pieces.find(p=>!placed.includes(p.id));
          if (piece) {setHint(piece.id);setMessage(`Gợi ý: ghép ${piece.label} vào vùng đang sáng.`);}
        }}><Lightbulb size={16}/>Gợi ý</button>
        <button className="puzzle-icon-button" aria-label="Chơi lại màn này" title="Chơi lại màn này" onClick={()=>{
          setDrag(null);activePointer.current=null;setSelected(null);setHint(null);setWrong(null);
          setMessage('Màn đã được xếp lại. Phần thưởng đã nhận vẫn được giữ.');onReset();
        }}><RotateCcw size={16}/></button>
      </div>
    </div>
    <div className="puzzle-progress-row"><span>{complete?'Đủ bộ rồi!': 'Kéo mảnh ghép về đúng vị trí trên nhân vật'}</span><strong data-testid="piece-progress">{placed.length}/{level.pieces.length} mảnh</strong></div>
    <div className="puzzle-progress-track" role="progressbar" aria-label="Tiến trình ghép" aria-valuemin={0} aria-valuemax={level.pieces.length} aria-valuenow={placed.length}><span style={{width:`${placed.length/level.pieces.length*100}%`}}/></div>
    <div ref={board} className="puzzle-board" data-testid="puzzle-board">
      <span className="puzzle-board-label">PHÒNG GHÉP VIỆT PHỤC</span>
      <div className="puzzle-character" style={{left:`${level.figure.x/WIDTH*100}%`,top:`${level.figure.y/HEIGHT*100}%`,width:`${level.dimensions[0]*level.scale/WIDTH*100}%`,height:`${level.dimensions[1]*level.scale/HEIGHT*100}%`}}>
        <img src={level.base} alt="Nhân vật nền" draggable={false}/>
      </div>
      <div className="puzzle-character" aria-hidden="true" style={{left:`${level.figure.x/WIDTH*100}%`,top:`${level.figure.y/HEIGHT*100}%`,width:`${level.dimensions[0]*level.scale/WIDTH*100}%`,height:`${level.dimensions[1]*level.scale/HEIGHT*100}%`,zIndex:5}}>
        <img src={level.baseFront} alt="" draggable={false}/>
      </div>
      {level.pieces.map(piece=>{
        const target=targetOf(level,piece), isPlaced=placed.includes(piece.id);
        const w=piece.bounds[2]*level.scale/WIDTH*100,h=piece.bounds[3]*level.scale/HEIGHT*100;
        return <button key={`target-${piece.id}`} type="button" className={`puzzle-zone ${hint===piece.id?'hint':''} ${selected?'selectable':''}`}
          data-testid={`target-${piece.id}`} aria-label={`Vị trí ${piece.label}`} tabIndex={selected&&!isPlaced?0:-1} disabled={isPlaced}
          style={{left:`${target.x/WIDTH*100}%`,top:`${target.y/HEIGHT*100}%`,width:`${w}%`,height:`${h}%`,zIndex:piece.zIndex}}
          onClick={()=>{
            if (!selected) return;
            if (selected===piece.id) success(piece);
            else {setWrong(selected);setSelected(null);setMessage('Chưa đúng mảnh. Hãy chọn mảnh và thử vị trí khác.');}
          }}>
          {!isPlaced && <img src={piece.asset} alt="" draggable={false}/>}
        </button>;
      })}
      {level.pieces.map(piece=>{
        const isPlaced=placed.includes(piece.id), dragging=drag?.id===piece.id;
        const center=isPlaced?targetOf(level,piece):dragging?drag.center:initialCenter(piece);
        const scale=isPlaced?level.scale:TRAY_SCALE;
        return <button key={piece.id} type="button" data-testid={`piece-${piece.id}`}
          aria-label={`${piece.label}${isPlaced?' · đã ghép':''}`} aria-pressed={selected===piece.id}
          disabled={isPlaced} className={`puzzle-piece ${isPlaced?'placed':''} ${dragging?'dragging':''} ${selected===piece.id?'selected':''} ${hint===piece.id?'hint':''} ${wrong===piece.id?'wrong':''}`}
          style={{left:`${center.x/WIDTH*100}%`,top:`${center.y/HEIGHT*100}%`,width:`${piece.bounds[2]*scale/WIDTH*100}%`,height:`${piece.bounds[3]*scale/HEIGHT*100}%`,zIndex:dragging?30:isPlaced?piece.zIndex:20}}
          onPointerDown={e=>start(e,piece)} onPointerMove={moved} onPointerUp={e=>finish(e,piece)}
          onPointerCancel={()=>{activePointer.current=null;setDrag(null);}}
          onLostPointerCapture={()=>{activePointer.current=null;setDrag(null);}}
          onClick={e=>{if (e.detail===0) {setSelected(piece.id);setMessage(`Đã chọn ${piece.label}. Chọn bóng mờ tương ứng.`);}}}
          onKeyDown={e=>{if(e.key==='Escape'){setSelected(null);setMessage('Đã bỏ chọn mảnh.');}}}>
          <img src={piece.asset} alt="" draggable={false}/>
          {!isPlaced && <span className="puzzle-piece-caption">{piece.label}</span>}
        </button>;
      })}
      {complete && <span className="puzzle-board-complete"><Check size={14}/>Bộ trang phục đã hoàn chỉnh</span>}
    </div>
    <div className="puzzle-feedback" aria-live="polite" role="status">{message}</div>
    <p className="puzzle-keyboard-help">Bạn cũng có thể chọn một mảnh, rồi chọn bóng mờ. Dùng Tab và Enter trên bàn phím.</p>
  </section>;
}
