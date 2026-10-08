import {Lock,Check,ArrowRight} from 'lucide-react';
import {GARMENTS,SPECIAL_GARMENTS} from '../data/costumeData';
import {compatibleCostume,type Gender} from './wardrobeFamilies';
import {usePuzzleProgress} from './PuzzleProgress';
const costumes=import.meta.glob('../assets/costumes/*.svg',{query:'?url',import:'default',eager:true}) as Record<string,string>;
type Item={id:string;name:string;kind:'costumes';image?:string};
export default function WardrobeCollection({gender,selected,onSelect,onExplore}:{gender:Gender;selected:string;onSelect:(item:Item)=>void;onExplore:()=>void}){
 const {isUnlocked,progress}=usePuzzleProgress();
 const outfits:Item[]=[...GARMENTS,...SPECIAL_GARMENTS].filter(g=>compatibleCostume(g.id,gender)).map(g=>({id:g.id,name:g.name,kind:'costumes',image:costumes[`../assets/costumes/${g.id.startsWith('special-')?g.id:`${gender}-${g.id}`}.svg`]}));
 const available=outfits.filter(i=>isUnlocked(i.kind,i.id)),locked=outfits.filter(i=>!isUnlocked(i.kind,i.id));
 const card=(item:Item,locked=false)=><button key={item.id} type="button" className={`wardrobe-item ${locked?'locked':''} ${selected===item.id?'selected':''}`} disabled={locked} aria-label={item.name} title={locked?'Hoàn thành thử thách để mở khóa':item.name} onClick={()=>onSelect(item)} data-wardrobe-id={item.id}>
   <span className="wardrobe-art">{item.image&&<img src={item.image} alt=""/>}{locked&&<span className="wardrobe-lock"><Lock size={18}/></span>}</span>
   <strong>{item.name}</strong>{!locked&&progress.unlockedItems[item.kind].includes(item.id)&&<small><Check size={11}/>Đã mở khóa</small>}
 </button>;
 return <div className="wardrobe-collection">
  <section aria-label="Tủ đồ của bạn"><h3 className="wardrobe-title">Tủ đồ của bạn</h3><p>Bộ khởi đầu và những món bạn đã khám phá.</p><div className="wardrobe-grid">{available.map(i=>card(i))}</div></section>
  {locked.length>0&&<section className="wardrobe-locked-collection" aria-label="Bộ sưu tập chưa mở khóa"><h3>BỘ SƯU TẬP CHƯA MỞ KHÓA</h3><div className="wardrobe-grid">{locked.map(i=>card(i,true))}</div><div className="wardrobe-invitation"><strong>Kho báu Việt phục vẫn đang chờ bạn khám phá!</strong><p>Hoàn thành thử thách ở Trang 2 để mở khóa thêm trang phục và phụ kiện.</p><button type="button" onClick={onExplore}>KHÁM PHÁ THỬ THÁCH <ArrowRight size={15}/></button></div></section>}
 </div>;
}
