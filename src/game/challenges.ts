import { COSTUME_PUZZLES } from './levels';
import type { Challenge,UnlockKind,UnlockReward } from './types';
import { RECONSTRUCTION_SLOTS } from './reconstructionData';

const [giao,nhat,corn]=COSTUME_PUZZLES;
const palette=(id:string,name:string):UnlockReward=>({kind:'colors',id,name});
export const CHALLENGES:Challenge[]=[
  {...giao,type:'assemble',title:'Tập mặc',gameLabel:'Ghép cấu kiện',total:4,costume:giao,outfitId:'giao-linh',
    rewards:[{kind:'costumes',id:'giao-linh',name:'Giao lĩnh · Nam & Nữ',image:giao.thumbnail},{kind:'accessories',id:'guoc-moc',name:'Guốc mộc',image:'/puzzle/items/special-quan-phuc-nam-guoc-moc.svg'},{kind:'accessories',id:'quat',name:'Quạt · Nam & Nữ'},palette('truc-lam','Trúc Lâm Thanh Nhã')]},
  {...nhat,type:'image-grid',title:'Ghép lại Việt phục',gameLabel:'Ghép hình 3×3',total:9,
    name:'Áo Tấc',outfitId:'ao-tac',thumbnail:'/puzzle/current-ao-tac.svg',image:'/puzzle/current-ao-tac.svg',imageAspect:290/519,
    gridSize:3,previewMs:2500,previewLimit:2,difficulty:'Vừa · ghi nhớ hình ảnh',
    description:'Ghi nhớ hình Áo Tấc, rồi đổi chỗ các ô để khôi phục hình ảnh. Cả chín ô luôn nằm trong bảng 3×3.',features:['Cổ đứng và nẹp áo','Tay áo thụng rộng','Dáng áo dài phủ hạ y'],
    learning:'Bạn đã phục hồi hình Áo Tấc. Cả mẫu nam và nữ được mở cùng nhau. Nhật Bình vẫn có sẵn trong tủ đồ khởi đầu.',
    rewards:[{kind:'costumes',id:'ao-tac',name:'Áo Tấc · Nam & Nữ',image:'/puzzle/current-ao-tac.svg'},{kind:'headwear',id:'khan-vanh-day',name:'Khăn vành dây'},{kind:'headwear',id:'khan-xep',name:'Khăn xếp',image:'/puzzle/items/khan-xep.svg'},{kind:'accessories',id:'kieng-co',name:'Kiềng cổ · Nam & Nữ'},palette('thanh-da-luu-ly','Thanh Dạ Lưu Ly')]},
  {id:'hoang-bao',name:'Long Bào Hoàng Đế',gender:'nam',type:'detective',title:'Bắt lỗi Việt phục',gameLabel:'Thám tử bản phối',total:3,
    difficulty:'Khó · nhận diện & lựa chọn',period:'Bản phối cổ phong trong bộ sưu tập',
    description:'Một bản phối Long Bào đã bị đổi ba phụ kiện. Tìm vùng chưa phù hợp và chọn phương án để trả lại bản phối cổ phong.',
    features:['Tìm chi tiết trước khi chọn món thay','Mỗi vùng có ba phương án','Chọn sai vẫn có thể thử lại'],usage:['Quan sát chi tiết','Phân biệt kiểu phối'],
    learning:'Bạn đã bỏ kính râm, máy ảnh và sneaker để hiện lại bản Long Bào gốc. Đây là mục tiêu của thử thách; phòng thử đồ vẫn cho phép bạn phối Gen Z tự do.',
    thumbnail:'/puzzle/current-long-bao.svg',prerequisites:['nhat-binh'],outfitId:'special-long-bao-nam',modelId:'special-long-bao-nam',dimensions:[308,622],
    rewards:[{kind:'costumes',id:'special-long-bao-nam',name:'Long Bào Hoàng Đế',image:'/puzzle/current-long-bao.svg'},{kind:'costumes',id:'special-phuong-bao-nu',name:'Phượng Bào Hoàng Hậu'},{kind:'accessories',id:'o-du',name:'Ô (Dù) · Nam & Nữ'},{kind:'accessories',id:'tram-cai',name:'Trâm cài · Nữ'},palette('kim-sa-hoang-toc','Kim Sa Hoàng Tộc')],
    initialLook:{headwear:'none',footwear:'sneaker',jewelry:[],handheld:'none',genz:['kinh-ram','may-anh']},
    errors:[
      {id:'head',label:'Vùng đầu',bounds:[89,40,110,91],genzKeys:['kinh-ram','tai-nghe-trum-dau'],correctOption:'head-original',learning:'Đã bỏ kính râm để hiện lại gương mặt và phần đội đầu của mẫu gốc.',options:[
        {id:'head-glasses',label:'Giữ kính râm',look:{genz:['kinh-ram']}},
        {id:'head-original',label:'Giữ mẫu gốc',look:{genz:[]}},
        {id:'head-headphones',label:'Tai nghe trùm đầu',look:{genz:['tai-nghe-trum-dau']}}]},
      {id:'chest',label:'Vùng thân trước',bounds:[91,146,135,162],genzKeys:['may-anh','tui-xach'],correctOption:'chest-original',learning:'Đã bỏ máy ảnh để hiện trọn họa tiết trên thân Long Bào.',options:[
        {id:'chest-camera',label:'Máy ảnh',look:{genz:['may-anh']}},
        {id:'chest-bag',label:'Túi xách',look:{genz:['tui-xach']}},
        {id:'chest-original',label:'Giữ họa tiết gốc',look:{genz:[]}}]},
      {id:'feet',label:'Vùng giày',bounds:[80,555,155,55],correctOption:'feet-hai',learning:'Đã bỏ sneaker để hiện lại đôi hài trong hình gốc.',options:[
        {id:'feet-hai',label:'Hài của mẫu gốc',look:{footwear:'hai-theu'}},
        {id:'feet-guoc',label:'Guốc mộc',look:{footwear:'guoc-moc'}},
        {id:'feet-sneaker',label:'Sneaker',look:{footwear:'sneaker'}}]},
    ]},
  {...corn,type:'reconstruction',title:'Phục dựng',gameLabel:'Thử thách cuối',total:7,costume:corn,outfitId:'special-quan-phuc-nam',
    difficulty:'Cao nhất · tự chọn cấu kiện',prerequisites:['hoang-bao'],
    description:'Dựa vào bối cảnh, chọn và phối bảy cấu kiện trong tủ đồ. Nộp bản phục dựng để biết tổng số chi tiết phù hợp.',
    features:['Không có hình mẫu hoặc bóng mờ','Các lựa chọn đều đến từ bộ sưu tập','Chấm tổng thể, tự kiểm tra và sửa'],usage:['Ghi nhớ & lựa chọn','Phục dựng bản minh họa'],
    rewards:[{kind:'costumes',id:'special-quan-phuc-nam',name:'Cổn Phục (Tế Nam Giao)',image:corn.thumbnail},{kind:'costumes',id:'special-bach-y-nu',name:'Giá Cô Bơ'},{kind:'accessories',id:'dan-nguyet',name:'Đàn nguyệt · Nam & Nữ'},palette('thuy-mac-giay-do','Thủy Mặc Giấy Dó')],
    scenario:{character:'Hoàng đế',occasion:'Đại lễ Tế Nam Giao',mission:'Phục dựng mẫu lễ phục phù hợp với bối cảnh từ bộ sưu tập Việt Phục Remix.'},slots:RECONSTRUCTION_SLOTS},
];
export const rewardLevel=(kind:UnlockKind,id:string)=>CHALLENGES.find(c=>c.rewards.some(r=>r.kind===kind&&r.id===id));
