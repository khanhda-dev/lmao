import type { ReconstructionSlot } from './types';
// Every candidate is an existing SVG component export; none is fabricated.
export const RECONSTRUCTION_SLOTS:ReconstructionSlot[]=[
  {id:'hat',label:'Đồ đội đầu',correctChoice:'mien-quan',choices:[
    {id:'mu-tron',label:'Mũ tròn xanh',asset:'/puzzle/nhat-binh/hat.svg'},
    {id:'mien-quan',label:'Miện quan',asset:'/puzzle/con-phuc/hat.svg'},
    {id:'khan-xep',label:'Khăn xếp',asset:'/puzzle/items/khan-xep.svg',wardrobeItemId:'khan-xep'}]},
  {id:'robe',label:'Thân áo',correctChoice:'ao-sam',choices:[
    {id:'ao-co-cheo',label:'Thân áo cổ chéo',asset:'/puzzle/giao-linh/robe.svg'},
    {id:'ao-co-vuong',label:'Thân áo cổ chữ nhật',asset:'/puzzle/nhat-binh/robe.svg'},
    {id:'ao-sam',label:'Thân áo sẫm thêu họa tiết',asset:'/puzzle/con-phuc/robe.svg'}]},
  {id:'sleeves',label:'Tay áo',correctChoice:'tay-rong',choices:[
    {id:'tay-rong',label:'Tay áo có họa tiết rồng',asset:'/puzzle/con-phuc/sleeves.svg'},
    {id:'tay-thien-thanh',label:'Tay áo thiên thanh',asset:'/puzzle/giao-linh/sleeves.svg'},
    {id:'tay-ngu-sac',label:'Tay áo có cửa tay ngũ sắc',asset:'/puzzle/nhat-binh/sleeves.svg'}]},
  {id:'belt',label:'Đai / dải buộc',correctChoice:'dai-do',choices:[
    {id:'dai-mem',label:'Dải buộc mềm màu ngà',asset:'/puzzle/giao-linh/sash.svg'},
    {id:'dai-do',label:'Đai đỏ có mặt trang trí',asset:'/puzzle/con-phuc/belt.svg'}]},
  {id:'front',label:'Phần buông trước',correctChoice:'te-tat',choices:[
    {id:'te-tat',label:'Mảng vàng có biểu tượng',asset:'/puzzle/con-phuc/front.svg'},
    {id:'dai-buong',label:'Dải buộc buông màu ngà',asset:'/puzzle/giao-linh/sash.svg'}]},
  {id:'lower',label:'Hạ y',correctChoice:'huan-thuong',choices:[
    {id:'ha-y-trang',label:'Hạ y trắng',asset:'/puzzle/giao-linh/lower.svg'},
    {id:'ha-y-vien-vang',label:'Hạ y có viền vàng',asset:'/puzzle/nhat-binh/lower.svg'},
    {id:'huan-thuong',label:'Huân thường đỏ',asset:'/puzzle/con-phuc/lower.svg'}]},
  {id:'shoes',label:'Giày / hài',correctChoice:'hai-den',choices:[
    {id:'guoc-moc',label:'Guốc mộc',asset:'/puzzle/items/special-quan-phuc-nam-guoc-moc.svg',wardrobeItemId:'guoc-moc'},
    {id:'hai-den',label:'Hài đen',asset:'/puzzle/items/special-quan-phuc-nam-hai.svg'},
    {id:'sneaker',label:'Sneaker',asset:'/puzzle/items/special-quan-phuc-nam-sneaker.svg',wardrobeItemId:'sneaker'}]},
];
