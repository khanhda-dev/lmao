import assets from '../data/costumeAssets.json' with {type:'json'};
export type Gender='male'|'female';
export const COSTUME_FAMILIES=[
 {id:'nhat-binh',variants:['nhat-binh'],starter:true},
 {id:'ngu-than',variants:['ngu-than-tay-chen'],starter:true},
 {id:'vien-linh',variants:['vien-linh'],starter:true},
 {id:'giao-linh',variants:['giao-linh'],starter:false},
 {id:'ao-tac',variants:['ao-tac'],starter:false},
 // Paired rewards requested by the team; each keeps its own real model and name.
 {id:'dai-trieu',variants:['special-long-bao-nam','special-phuong-bao-nu'],starter:false},
 {id:'le-phuc',variants:['special-quan-phuc-nam','special-bach-y-nu'],starter:false},
] as const;
export function costumeFamily(id:string){
 const raw=id.replace(/^(female|male)-/,'').replace(/[-_](female|male|nam|nu)$/,'');
 return COSTUME_FAMILIES.find(f=>(f.variants as readonly string[]).includes(id)||(f.variants as readonly string[]).includes(raw))?.id;
}
export const starterCostume=(id:string)=>COSTUME_FAMILIES.some(f=>f.starter&&(f.variants as readonly string[]).includes(id));
export function compatibleCostume(id:string,gender:Gender){return `${gender}-${id}` in assets||id in assets&&id.endsWith(gender==='male'?'-nam':'-nu');}
export function familyVariant(id:string,gender:Gender){const f=COSTUME_FAMILIES.find(f=>f.id===costumeFamily(id));return f?.variants.find(v=>compatibleCostume(v,gender));}
