import { BookOpen, Check, ChevronRight, Crown, Gift, Lock, Sparkles, Trophy } from 'lucide-react';
import { CHALLENGES } from './challenges';
import { canPlay } from './progress';
import { usePuzzleProgress } from './PuzzleProgress';
import type { Challenge } from './types';

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
  return <aside className="puzzle-info">
    <span className="puzzle-eyebrow"><BookOpen size={14}/> CÂU CHUYỆN BỘ ĐỒ</span>
    <h2>{level.name}</h2><span className="puzzle-period">{level.period}</span>
    <p>{level.description}</p><h3>Nhìn đâu để nhận ra?</h3>
    <ul>{level.features.map(f=><li key={f}>{f}</li>)}</ul>
    <h3>Khám phá & sử dụng</h3><div className="puzzle-tags">{level.usage.map(u=><span key={u}>{u}</span>)}</div>
    {level.type==='assemble'&&<details className="puzzle-reference"><summary>Xem bộ hoàn chỉnh <Sparkles size={14}/></summary><img src={level.thumbnail} alt={`Bộ ${level.name} hoàn chỉnh`}/></details>}
  </aside>;
}
export function RewardPreview({level,conceal=false}:{level:Challenge;conceal?:boolean}) {
  const {isUnlocked}=usePuzzleProgress();
  const earned=level.rewards.every(reward=>isUnlocked(reward.kind,reward.id));
  return <section className="puzzle-rewards" aria-label="Phần thưởng của màn">
    <h3><Gift size={19}/>{earned?'Đã thêm vào tủ đồ của bạn':'Hoàn thành màn này để mở khóa'}</h3>
    <div className="puzzle-reward-grid">{level.rewards.map(reward=><div className={`puzzle-reward ${earned?'earned':''}`} key={`${reward.kind}-${reward.id}`}>
      <div>{conceal?<Gift size={26}/>:reward.image?<img src={reward.image} alt=""/>:reward.kind==='colors'?<span className="puzzle-color-reward"><i/><i/><i/></span>:<Gift size={26}/>}<span className="puzzle-reward-status">{earned?<Check size={12}/>:<Lock size={12}/>}</span></div>
      <strong>{reward.name}</strong>
    </div>)}</div>
  </section>;
}
