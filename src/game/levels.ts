import type { PuzzleLevel, PuzzlePiece } from './types';

function piece(level: string, id: string, label: string, note: string, bounds: PuzzlePiece['bounds'], x: number, y: number, zIndex: number): PuzzlePiece {
  return {id, label, note, bounds, initialPosition:{x,y}, zIndex, asset:`/puzzle/${level}/${id}.svg`};
}
// Source artwork metadata retained independently of the challenge journey.
export const COSTUME_PUZZLES: PuzzleLevel[] = [
  {
    id:'giao-linh', name:'Giao lĩnh', gender:'nu', difficulty:'Dễ · 4 mảnh',
    period:'Trang phục cổ truyền Việt Nam',
    description:'Bắt đầu với cổ áo giao nhau, tay áo rộng và dải thắt eo. Ghép từng phần để khám phá dáng áo Giao lĩnh.',
    features:['Cổ áo giao nhau ở phía trước','Tay áo rộng, buông mềm','Dải thắt eo và hạ y dài'],
    usage:['Khám phá cổ phục','Phối đồ cổ phong'],
    learning:'Điểm dễ nhận ra của Giao lĩnh là hai vạt cổ giao nhau. Thử phối hai phiên bản tóc của bộ Thiên Thanh trong tủ đồ nhé!',
    thumbnail:'/puzzle/giao-linh/full.svg', base:'/puzzle/giao-linh/base.svg',
    baseFront:'/puzzle/giao-linh/base-front.svg',
    dimensions:[287,519], figure:{x:256,y:48}, scale:1, prerequisites:[], outfitId:'giao-linh',
    pieces:[
      piece('giao-linh','sleeves','Đôi tay áo','Hai tay áo rộng tạo dáng buông mềm.',[-1,88,289,191],20,115,3),
      piece('giao-linh','lower','Hạ y & hài','Phần trang phục phía dưới và đôi hài đi kèm.',[54,159,179,362],615,150,1),
      piece('giao-linh','robe','Thân áo giao lĩnh','Hai vạt cổ giao nhau là dấu hiệu nhận diện.',[97,88,93,97],70,345,4),
      piece('giao-linh','sash','Đai & dải buộc','Dải buộc nằm ngang eo, buông ở phía trước.',[94,170,99,102],620,430,6),
    ],
    rewards:[], // Rewards belong to the current journey registry.
  },
  {
    id:'nhat-binh', name:'Nhật Bình', gender:'nu', difficulty:'Vừa · 5 mảnh',
    period:'Cảm hứng trang phục cung đình',
    description:'Tìm vị trí cho thân áo, hai tay áo ngũ sắc, hạ y và mũ. Chú ý mảng cổ chữ nhật ở chính giữa.',
    features:['Mảng cổ hình chữ nhật','Cửa tay có dải màu ngũ sắc','Hạ y dài với viền trang trí'],
    usage:['Lễ phục','Chụp hình văn hóa'],
    learning:'Mảng cổ chữ nhật và những dải màu ở cửa tay giúp nhận diện mẫu Nhật Bình. Hai phiên bản có mũ và tóc búi đã sẵn sàng để phối!',
    thumbnail:'/puzzle/nhat-binh/full.svg', base:'/puzzle/nhat-binh/base.svg',
    baseFront:'/puzzle/nhat-binh/base-front.svg',
    dimensions:[328,534], figure:{x:236,y:36}, scale:1, prerequisites:['giao-linh'], outfitId:'nhat-binh',
    pieces:[
      piece('nhat-binh','hat','Mũ triều nghi','Mũ là phần phối đầu của mẫu minh họa này.',[94,-2,140,60],60,60,8),
      piece('nhat-binh','left','Tay áo trái','Tay áo phía trái hình có cửa tay ngũ sắc.',[-2,104,134,194],36,185,3),
      piece('nhat-binh','right','Tay áo phải','Ghép tay áo còn lại ở phía phải hình.',[196,104,134,194],665,80,3),
      piece('nhat-binh','lower','Hạ y & hài','Hạ y dài hoàn thiện phần dưới của bộ đồ.',[74,174,180,362],615,285,1),
      piece('nhat-binh','robe','Thân áo Nhật Bình','Mảng cổ chữ nhật nằm chính giữa thân áo.',[97,104,134,232],45,380,4),
    ],
    rewards:[], // Rewards belong to the current journey registry.
  },
  {
    id:'con-phuc', name:'Cổn Phục – Tế Nam Giao', gender:'nam', difficulty:'Khó · 7 mảnh',
    period:'Cảm hứng lễ phục cung đình',
    description:'Bộ lễ phục nhiều lớp: ghép mũ, thân áo, tay áo, đai, phần buông trước, hạ y và hài theo hình mẫu.',
    features:['Miện quan với các chuỗi hạt','Áo sẫm màu, tay áo có họa tiết rồng','Huân thường đỏ và phần buông trước'],
    usage:['Bộ minh họa lễ phục','Khám phá cấu kiện'],
    // TODO: Have a costume historian verify period-specific terminology before publication.
    learning:'Bạn đã nhận diện được bảy cấu kiện của mẫu Cổn Phục. Bộ hoàn chỉnh và Hoàng Bào được mở để tiếp tục khám phá trong tủ đồ.',
    thumbnail:'/puzzle/con-phuc/full.svg', base:'/puzzle/con-phuc/base.svg',
    baseFront:'/puzzle/con-phuc/base-front.svg',
    dimensions:[360,654], figure:{x:245,y:10}, scale:0.94, prerequisites:['nhat-binh'], outfitId:'special-quan-phuc-nam',
    pieces:[
      piece('con-phuc','hat','Miện quan','Phần mũ có các chuỗi hạt buông phía trước.',[88,3,141,81],45,35,9),
      piece('con-phuc','robe','Thân áo Cổn','Thân áo sẫm màu mang các chi tiết trang trí.',[48,138,217,184],570,45,4),
      piece('con-phuc','sleeves','Đôi tay áo','Hai tay áo rộng có họa tiết rồng.',[-1,138,316,225],12,165,3),
      piece('con-phuc','belt','Đại đới','Phần đai nằm ngang eo trong mẫu minh họa.',[91,296,134,28],60,395,8),
      piece('con-phuc','front','Tế tất & dải buông','Nhóm chi tiết dài buông ở phía trước bộ đồ.',[103,302,112,173],675,260,7),
      piece('con-phuc','lower','Huân thường','Phần hạ y màu đỏ phía dưới áo.',[75,215,166,358],590,400,1),
      piece('con-phuc','shoes','Hài','Đôi hài hoàn thiện bộ lễ phục.',[56,538,206,57],32,510,0.5),
    ],
    rewards:[], // Rewards belong to the current journey registry.
  },
];
