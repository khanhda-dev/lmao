import { useEffect,useRef,useState,type PointerEvent } from 'react';
import { Check,Eye,RotateCcw } from 'lucide-react';
import { correctTiles,isSolved,swapTiles } from './imageGrid';
import type { GridRun } from './types';

type Props={image:string;gridSize:number;title:string;aspectRatio:number;previewMs:number;previewLimit:number;run:GridRun|undefined;
  onInitialize:()=>void;onSeen:()=>void;onSwap:(a:number,b:number)=>void;onPreview:()=>void;onReset:()=>void;onComplete:()=>void};
export default function ImageGridPuzzle({image,gridSize,title,aspectRatio,previewMs,previewLimit,run,onInitialize,onSeen,onSwap,onPreview,onReset,onComplete}:Props){
  const board=useRef<HTMLDivElement>(null),pointer=useRef<number|null>(null),completionTimer=useRef<number|undefined>(undefined);
  const [preview,setPreview]=useState(false),[previewRound,setPreviewRound]=useState(0);
  const [selected,setSelected]=useState<number|null>(null);
  const [drag,setDrag]=useState<{index:number;x:number;y:number;startX:number;startY:number;over:number|null}|null>(null);
  const [message,setMessage]=useState('Ghi nhớ hình mẫu, rồi đổi chỗ hai ô bất kỳ.');
  useEffect(()=>{onInitialize();},[]);
  useEffect(()=>{
    if(run&&!run.previewSeen){setPreview(true);setPreviewRound(n=>n+1);onSeen();}
  },[run?.previewSeen]);
  useEffect(()=>{
    if(!preview)return;
    const timer=window.setTimeout(()=>setPreview(false),previewMs);
    return()=>window.clearTimeout(timer);
  },[preview,previewRound,previewMs]);
  useEffect(()=>()=>window.clearTimeout(completionTimer.current),[]);
  if(!run)return <section className="puzzle-game challenge-loading" aria-live="polite">Đang xếp bàn chơi…</section>;
  const solved=isSolved(run.tiles),correct=correctTiles(run.tiles);
  const background=(tile:number)=>({backgroundImage:`url("${image}")`,backgroundSize:`${gridSize*100}% ${gridSize*100}%`,backgroundPosition:`${tile%gridSize/(gridSize-1)*100}% ${Math.floor(tile/gridSize)/(gridSize-1)*100}%`});
  function swap(a:number,b:number){
    if(preview||solved||a===b)return;
    const next=swapTiles(run!.tiles,a,b);onSwap(a,b);setSelected(null);
    setMessage(`Đã đổi ô ${a+1} và ô ${b+1}. ${correctTiles(next)}/${next.length} mảnh đúng.`);
    if(isSolved(next))completionTimer.current=window.setTimeout(onComplete,800);
  }
  function cell(x:number,y:number){
    const r=board.current!.getBoundingClientRect();
    if(x<r.left||x>=r.right||y<r.top||y>=r.bottom)return null;
    return Math.floor((y-r.top)/r.height*gridSize)*gridSize+Math.floor((x-r.left)/r.width*gridSize);
  }
  function select(index:number){
    if(selected===null){setSelected(index);setMessage(`Đã chọn ô ${index+1}. Chọn ô khác để đổi chỗ.`);}
    else if(selected===index)setSelected(null);else swap(selected,index);
  }
  function start(event:PointerEvent<HTMLButtonElement>,index:number){
    if(preview||solved||pointer.current!==null||(event.pointerType==='mouse'&&event.button!==0))return;
    event.preventDefault();event.currentTarget.setPointerCapture(event.pointerId);pointer.current=event.pointerId;
    setDrag({index,x:event.clientX,y:event.clientY,startX:event.clientX,startY:event.clientY,over:index});
  }
  function end(event:PointerEvent<HTMLButtonElement>){
    if(pointer.current!==event.pointerId||!drag)return;
    pointer.current=null;setDrag(null);
    if(Math.hypot(event.clientX-drag.startX,event.clientY-drag.startY)<6){select(drag.index);return;}
    const target=cell(event.clientX,event.clientY);
    if(target!==null)swap(drag.index,target);else setMessage('Thả vào một ô trong bảng để đổi chỗ. Các mảnh vẫn ở vị trí cũ.');
  }
  return <section className="puzzle-game image-grid-game" aria-label={`Ghép hình ${title}`}>
    <div className="puzzle-toolbar"><div><span className="puzzle-eyebrow">NHỚ HÌNH · ĐỔI CHỖ · KHÔI PHỤC</span><h2>Ghép lại {title}</h2></div>
      <div className="puzzle-tools"><button className="puzzle-button light" disabled={preview||solved||run.previewsUsed>=previewLimit} onClick={()=>{onPreview();setSelected(null);setPreview(true);setPreviewRound(n=>n+1);}}><Eye size={16}/>Xem lại mẫu ({previewLimit-run.previewsUsed})</button>
      <button className="puzzle-icon-button" aria-label="Xếp lại bảng ảnh" onClick={()=>{window.clearTimeout(completionTimer.current);pointer.current=null;setDrag(null);setSelected(null);setPreview(false);onReset();setMessage('Bảng đã xếp lại. Phần thưởng và kỷ lục vẫn được giữ.');}}><RotateCcw size={16}/></button></div>
    </div>
    <div className="challenge-stats"><span>MẢNH ĐÚNG <strong data-testid="grid-progress">{correct}/{gridSize*gridSize}</strong></span><span>SỐ LƯỢT <strong data-testid="grid-moves">{run.moves}</strong></span><span>{solved?<><Check size={14}/> Đã khôi phục</>:preview?'Đang xem mẫu':'Đổi chỗ hai ô bất kỳ'}</span></div>
    <div className="image-grid-stage">
      <div ref={board} className={`image-grid-board ${solved?'solved':''}`} data-testid="image-grid-board" role="group" aria-label="Bảng ảnh 3×3" style={{aspectRatio,gridTemplateColumns:`repeat(${gridSize},1fr)`,gridTemplateRows:`repeat(${gridSize},1fr)`}}>
        {run.tiles.map((tile,index)=><button type="button" key={index} data-testid={`grid-cell-${index}`} data-tile-id={tile} disabled={preview||solved}
          aria-label={`Ô ${index+1}`} aria-pressed={selected===index} className={`image-grid-tile ${selected===index?'selected':''} ${drag?.index===index?'held':''} ${drag&&drag.over===index&&drag.index!==index?'drop-target':''}`}
          style={background(tile)} onPointerDown={e=>start(e,index)} onPointerMove={e=>{if(pointer.current===e.pointerId&&drag)setDrag({...drag,x:e.clientX,y:e.clientY,over:cell(e.clientX,e.clientY)});}}
          onPointerUp={end} onPointerCancel={()=>{pointer.current=null;setDrag(null);}} onLostPointerCapture={()=>{pointer.current=null;setDrag(null);}}
          onClick={e=>{if(e.detail===0)select(index);}} onKeyDown={e=>{if(e.key==='Escape')setSelected(null);}}/>) }
        {preview&&<div className="image-grid-preview" data-testid="grid-preview"><img src={image} alt={`Hình mẫu ${title}`}/><span>Nhìn kỹ hình — bảng sẽ trộn sau một chút</span></div>}
      </div>
      {drag&&Math.hypot(drag.x-drag.startX,drag.y-drag.startY)>=6&&<div aria-hidden="true" className="image-grid-drag-ghost" style={{...background(run.tiles[drag.index]),left:drag.x,top:drag.y,width:board.current!.clientWidth/gridSize,height:board.current!.clientHeight/gridSize}}/>}
    </div>
    <div className="puzzle-feedback" role="status" aria-live="polite">{message}</div>
    <p className="puzzle-keyboard-help">Kéo ô này lên ô khác, hoặc chọn hai ô bằng cách chạm / Tab và Enter. Không có ô trống.</p>
  </section>;
}
