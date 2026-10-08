import { BookOpen, Check, ChevronRight, Crown, Gift, Lock, Sparkles, Trophy } from 'lucide-react';
import { CHALLENGES } from './challenges';
import { canPlay } from './progress';
import { usePuzzleProgress } from './PuzzleProgress';
import type { Challenge } from './types';
import AccessoryPreview from './AccessoryPreview';
import SvgArtwork from './SvgArtwork';
import {JEWELRY,HANDHELD} from '../data/costumeData';

export function LevelSidebar({level,onSelect}:{level:Challenge;onSelect:(id:string)=>void}) {
  const {progress}=usePuzzleProgress();
  return <aside className="puzzle-sidebar">
    <span className="puzzle-eyebrow">VIỆT PHỤC CHALLENGE</span>
    <h1>Hành trình<br/>{' '}Việt phục</h1>
    <p>Mỗi chặng, một cách khám phá.<br/>Tủ đồ của bạn sẽ lớn dần!</p>
    <div className="puzzle-sidebar-progress"><span>{progress.completed.length}/{CHALLENGES.length} màn hoàn thành</span><div><i style={{width:`${progress.completed.length/CHALLENGES.length*100}%`}}/></div></div>
    <nav aria-label="Các thử thách Việt phục">
      {CHALLENGES.map((item,index)=>{
        const completed=progress.completed.includes(item.id),locked=!canPlay(progress,item);
        return <button type="button" key={item.id} className={`puzzle-level ${item.id===level.id?'active':''} ${locked?'locked':''}`} aria-current={item.id===level.id?'step':undefined} disabled={locked}
          aria-label={`Màn ${index+1}: ${item.name}${locked?' · khóa':completed?' · hoàn thành':''}`} onClick={()=>onSelect(item.id)}>
          <span className="puzzle-level-art">{item.type==='reconstruction'?<Crown size={28}/>:<img src={item.thumbnail} alt=""/>}</span>
          <span><small>MÀN {String(index+1).padStart(2,'0')}</small><strong>{item.name}</strong><em>{item.title}</em><em>{locked?'Hoàn thành màn trước':item.difficulty}</em>{item.type!=='assemble'&&progress.best[item.id]&&<em>Kỷ lục: {progress.best[item.id].actions} {item.type==='reconstruction'?'lượt nộp':item.type==='detective'?'lượt chọn':'lượt đổi'}</em>}</span>
          {completed?<Check size={17}/>:locked?<Lock size={15}/>:<ChevronRight size={17}/>}
        </button>;
      })}
    </nav>
    <div className={`puzzle-badge ${progress.completed.length===CHALLENGES.length?'earned':''}`}><Trophy size={24}/><div><strong>{progress.completed.length===CHALLENGES.length?'Nhà khám phá Việt phục':'Huy hiệu đang chờ bạn'}</strong><p>{progress.completed.length===CHALLENGES.length?'Bạn đã chinh phục cả hành trình!':`Hoàn thành ${CHALLENGES.length} màn để nhận huy hiệu.`}</p></div></div>
  </aside>;
}
export function CostumeInfoPanel({level}:{level:Challenge}) {
  const instructions:Record<Challenge['type'],string[]>={
    assemble:[
      'Kéo từng mảnh trang phục vào vùng tương ứng trên nhân vật. Mảnh đúng sẽ tự khớp vào vị trí.',
      'Nếu thả chưa đúng, kéo lại để thử tiếp. Bấm Gợi ý khi cần xem vị trí của một mảnh.',
      'Ghép đủ các mảnh để nhận phần thưởng và mở màn tiếp theo.',
    ],
    'image-grid':[
      'Ghi nhớ hình mẫu trước khi bảng ảnh được trộn.',
      'Kéo một ô lên ô khác để đổi chỗ. Bạn cũng có thể chạm lần lượt hai ô. Ô đúng vị trí có viền xanh lá.',
      'Dùng Xem lại mẫu khi cần; số lượt còn lại hiện trên nút. Xếp đúng cả 9 ô để mở khóa phần thưởng.',
    ],
    detective:[
      'Chạm vào vùng đầu, thân trước hoặc giày trên nhân vật để mở các lựa chọn thay thế.',
      'Chọn một món để kiểm tra ngay. Chọn sai sẽ hiện dấu × đỏ; vùng đã sửa đúng có dấu ✓.',
      'Thử lại các vùng còn sai. Sửa đúng cả 3 vùng để nhận phần thưởng.',
    ],
    reconstruction:[
      'Chọn lần lượt 7 nhóm cấu kiện, rồi chọn món bạn muốn mặc trong từng nhóm. Bản phối cập nhật trên nhân vật.',
      'Chọn đủ 7 món và bấm Nộp phục dựng để chấm đáp án. Nhóm đúng có viền xanh lá, nhóm sai có viền đỏ.',
      'Mở nhóm có viền đỏ, đổi món rồi nộp lại. Đạt 7/7 để hoàn thành và nhận phần thưởng.',
    ],
  };
  return <aside className="puzzle-info">
    <span className="puzzle-eyebrow"><BookOpen size={16}/> PHỤC DỰNG BỘ ĐỒ</span>
    <h2>{level.name}</h2>
    <h3>Cách chơi</h3>
    <ol className="puzzle-howto">{instructions[level.type].map(step=><li key={step}>{step}</li>)}</ol>
    {level.type==='assemble'&&<details className="puzzle-reference"><summary>Xem bộ hoàn chỉnh <Sparkles size={14}/></summary><img src={level.thumbnail} alt={`Bộ ${level.name} hoàn chỉnh`}/></details>}
  </aside>;
}
export function RewardPreview({level,conceal=false}:{level:Challenge;conceal?:boolean}) {
  const {isUnlocked}=usePuzzleProgress();
  const earned=level.rewards.every(reward=>isUnlocked(reward.kind,reward.id));
  return <section className="puzzle-rewards" aria-label="Phần thưởng của màn">
    <h3><Gift size={19}/>{earned?'Đã thêm vào tủ đồ của bạn':'Hoàn thành màn này để mở khóa'}</h3>
    <div className="puzzle-reward-grid">{level.rewards.map(reward=><div className={`puzzle-reward ${earned?'earned':''}`} key={`${reward.kind}-${reward.id}`}>
      <div>{conceal&&!earned?<Gift size={26}/>:reward.image?<SvgArtwork asset={reward.image}/>:reward.kind==='headwear'?<SvgArtwork asset={`/puzzle/items/${reward.id}.svg`}/>:reward.kind==='colors'?<span className="puzzle-color-reward"><i/><i/><i/></span>:reward.kind==='accessories'&&[...JEWELRY,...HANDHELD].some(item=>item.id===reward.id)?<AccessoryPreview id={reward.id}/>:<Gift size={26}/>}<span className="puzzle-reward-status">{earned?<Check size={12}/>:<Lock size={12}/>}</span></div>
      <strong>{reward.name}</strong>
    </div>)}</div>
  </section>;
}
