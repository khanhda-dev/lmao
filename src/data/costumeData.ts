export interface Garment {
  id: string;
  name: string;
  gender: 'Nữ' | 'Nam & Nữ' | 'Nam';
  playScore: number; // Thang điểm 5 "đi chơi"
  eventScore: number; // Thang điểm 5 "sự kiện"
  description: string;
  distinction: string;
  collarType: string;
  suitableFor: string;
  defaultColors: {
    dress: string;
    dressBack: string;
    dressEdge: string;
    pants: string;
    lining: string;
  };
}

export interface Headwear {
  id: string;
  name: string;
  description: string;
  matchWith: string;
  gender: string;
}

export interface Footwear {
  id: string;
  name: string;
  description: string;
  style: string;
  shoeColor: string;
  soleColor: string;
}

export interface Jewelry {
  id: string;
  name: string;
  description: string;
  material: string;
}

export interface Handheld {
  id: string;
  name: string;
  description: string;
  vibe: string;
}

export interface GenZAccessory {
  id: string;
  name: string;
  category: string;
  description: string;
  trendTip: string;
}

export interface ColorPreset {
  id: string;
  name: string;
  tagline: string;
  lining: string;    // Lớp lót trong (hoặc viền nẹp)
  dress: string;     // Áo ngoài
  pants: string;     // Quần / váy
  dressBack?: string;
  dressEdge?: string;
}

export interface SpecialGarment {
  id: string;
  name: string;
  gender: 'Nam' | 'Nữ';
  title: string;
  dynasty: string;
  description: string;
}

export const SPECIAL_GARMENTS: SpecialGarment[] = [
  {
    id: 'special-long-bao-nam',
    name: 'Long Bào Hoàng Đế',
    gender: 'Nam',
    title: 'Đại triều phục Hoàng đế',
    dynasty: 'Triều Nguyễn',
    description: 'Trang phục tối cao của bậc Thiên tử với sắc vàng chính hoàng, thêu rồng uốn lượn mây ngũ sắc cùng sóng thuỷ ba và dải ngũ hành lộng lẫy.'
  },
  {
    id: 'special-quan-phuc-nam',
    name: 'Triều Phục Quan Viên',
    gender: 'Nam',
    title: 'Triều phục Văn Võ Đại thần',
    dynasty: 'Triều Nguyễn',
    description: 'Triều phục trang trọng của quan viên với thân áo màu xanh sẫm, bổ tử thêu huy hiệu phẩm cấp trước ngực, ngọc đái và dải lụa phụng mệnh uy nghi.'
  },
  {
    id: 'special-phuong-bao-nu',
    name: 'Phượng Bào Hoàng Hậu',
    gender: 'Nữ',
    title: 'Đại triều phục Hoàng Hậu',
    dynasty: 'Triều Nguyễn',
    description: 'Trang phục cao quý nhất của bậc Mẫu nghi thiên hạ với sắc cam rực rỡ, vân kiên mây ngũ sắc thêu phượng hoàng và hài phụng mũi cong.'
  },
  {
    id: 'special-bach-y-nu',
    name: 'Bạch Y Công Chúa',
    gender: 'Nữ',
    title: 'Bạch Y Nhật Bình Công Chúa',
    dynasty: 'Triều Nguyễn',
    description: 'Áo Nhật Bình sắc trắng tinh khôi thoát tục, thêu chìm hoa sen bạc quý phái, chuỗi ngọc bội ngũ sắc và mũ trâm cài hoa bạch ngọc.'
  }
];

// 1. Áo ngoài (5 loại theo file PDF)
export const GARMENTS: Garment[] = [
  {
    id: 'nhat-binh',
    name: 'Nhật Bình',
    gender: 'Nữ',
    playScore: 3,
    eventScore: 5,
    description: 'Áo có cổ hình chữ nhật to bản xẻ dọc giữa ngực, nẹp cổ dệt thêu hoa văn ngũ hành tinh xảo. Vạt áo khép lại bằng dải buộc hoặc cúc gài ngọc bội, tay áo có các dải màu ngũ sắc rực rỡ.',
    distinction: 'Cổ áo khoét vuông hình chữ nhật đặc trưng không lẫn với bất kỳ trang phục nào; nẹp cổ thêu hoa văn và cổ tay viền ngũ sắc tượng trưng ngũ hành.',
    collarType: 'Cổ chữ nhật xẻ giữa',
    suitableFor: 'Hậu phi, công chúa triều Nguyễn, ngày nay rất thịnh hành trong lễ ăn hỏi, tiệc cưới, chụp hình nghệ thuật truyền thống.',
    defaultColors: {
      dress: '#B8262C',
      dressBack: '#961E23',
      dressEdge: '#E5A93C',
      pants: '#FFFFFF',
      lining: '#FDBA1D',
    },
  },
  {
    id: 'ao-tac',
    name: 'Áo Tấc (Áo thụng)',
    gender: 'Nam & Nữ',
    playScore: 2,
    eventScore: 5,
    description: 'Áo ngũ thân tay thụng dài và rộng (độ rộng ống tay từ một tấc trở lên), tà dài quá gối, cài 5 cúc bên nẹp phải. Là lễ phục trang trọng nhất của thường dân đến quý tộc thời Nguyễn.',
    distinction: 'Ống tay áo thụng rất rộng, dài buông thõng phủ kín bàn tay khi thả lỏng, phom dáng uy nghiêm mang tính lễ nghi cung đình và đại sự.',
    collarType: 'Cổ đứng năm thân',
    suitableFor: 'Các dịp đại lễ, cúng tế tổ tiên, lễ cưới hỏi long trọng cho cả nam và nữ.',
    defaultColors: {
      dress: '#1E4A7A',
      dressBack: '#15365A',
      dressEdge: '#D4AF37',
      pants: '#FFFFFF',
      lining: '#E2D3B8',
    },
  },
  {
    id: 'ngu-than-tay-chen',
    name: 'Ngũ thân tay chẽn',
    gender: 'Nam & Nữ',
    playScore: 5,
    eventScore: 4,
    description: 'Áo gồm 5 thân vải ghép lại tượng trưng tứ thân phụ mẫu và chính bản thân, tay áo may chẽn bó gọn từ khuỷu tay xuống cổ tay. Cổ đứng cao vuông vắn, cài 5 cúc bên ngực phải.',
    distinction: 'Ống tay ôm sát gọn gàng thuận tiện cử động hàng ngày; chính là tiền thân trực tiếp của chiếc Áo dài tân thời Việt Nam ngày nay.',
    collarType: 'Cổ đứng 5 cúc',
    suitableFor: 'Trang phục thường nhật, dạo phố, chụp ảnh du xuân, đi làm công sở hoặc sự kiện văn hóa thanh lịch.',
    defaultColors: {
      dress: '#FDBA1D',
      dressBack: '#E2A00E',
      dressEdge: '#E8A312',
      pants: '#FFFFFF',
      lining: '#F9F1DC',
    },
  },
  {
    id: 'giao-linh',
    name: 'Giao lĩnh',
    gender: 'Nam & Nữ',
    playScore: 4,
    eventScore: 4,
    description: 'Kiểu áo cổ chéo vắt sang bên phải (vạt trái đè vạt phải), có dải thắt lưng buộc ngang eo, phổ biến xuyên suốt từ thời Lý, Trần, Lê cho tới đầu triều Nguyễn.',
    distinction: 'Hai vạt cổ áo giao nhau tạo hình chữ V thanh thoát trước ngực, không dùng cúc đứng như áo ngũ thân, mang đậm vẻ đẹp cổ phong ngàn năm.',
    collarType: 'Cổ chéo giao vạt',
    suitableFor: 'Phong cách cổ phong đại việt, dạo phố cổ, tham quan di tích lịch sử và biểu diễn nghệ thuật.',
    defaultColors: {
      dress: '#2C5E47',
      dressBack: '#204735',
      dressEdge: '#C5A059',
      pants: '#222222',
      lining: '#C8B27A',
    },
  },
  {
    id: 'vien-linh',
    name: 'Viên lĩnh',
    gender: 'Nam & Nữ',
    playScore: 3,
    eventScore: 5,
    description: 'Áo có đường viền cổ tròn cong khép kín ôm lấy chân cổ, cài cúc bên vai phải, vạt áo buông rộng phủ gối. Là quan phục hoặc thường phục cao cấp triều Lê - Nguyễn.',
    distinction: 'Đường cổ áo tròn (Viên = tròn, Lĩnh = cổ áo) gài khuy sang bên phải, thường được thêu bổ tử trước ngực ở quan phục phẩm hàm.',
    collarType: 'Cổ tròn gài vai',
    suitableFor: 'Nam giới yêu thích phong cách nho nhã quý phái, các sự kiện triển lãm, lễ kỷ niệm truyền thống.',
    defaultColors: {
      dress: '#682F57',
      dressBack: '#502343',
      dressEdge: '#D1AC60',
      pants: '#FFFFFF',
      lining: '#F5EBDD',
    },
  },
  {
    id: 'thuong-phuc-casual',
    name: 'Quần áo bình thường',
    gender: 'Nam & Nữ',
    playScore: 5,
    eventScore: 2,
    description: 'Trang phục thường nhật bình thường (Casual Wear) mang phom dáng hiện đại năng động, kế thừa tỷ lệ hình thể và bảng phối sắc từ trang phục truyền thống để tạo nên vẻ ngoài trẻ trung, gần gũi.',
    distinction: 'Áo phông/polo dáng gọn phối cùng quần suông/khaki hiện đại, có thể tự do tùy biến màu sắc và kết hợp cực kỳ ăn ý với các phụ kiện truyền thống hoặc Gen Z.',
    collarType: 'Cổ tròn / Cổ bẻ Polo hiện đại',
    suitableFor: 'Dạo phố hàng ngày, cà phê bạn bè, phong cách Gen Z năng động kết hợp phụ kiện cổ phong.',
    defaultColors: {
      dress: '#2563EB',
      dressBack: '#1D4ED8',
      dressEdge: '#3B82F6',
      pants: '#1E293B',
      lining: '#F8FAFC',
    },
  },
];

// 2. Đồ đội đầu (5 loại theo file PDF)
export const HEADWEAR: Headwear[] = [
  {
    id: 'non-ba-tam',
    name: 'Nón ba tầm',
    gender: 'Nữ',
    description: 'Nón phẳng hình đĩa tròn to đường kính 70-80cm dệt từ lá cọ khâu chỉ thao, quai nón bằng sợi tơ thao buông dài rủ hạt châu duyên dáng xứ Kinh Bắc.',
    matchWith: 'Áo Giao Lĩnh, Áo Tứ Thân, Ngũ thân',
  },
  {
    id: 'non-dau',
    name: 'Nón dấu',
    gender: 'Nam / Quân lại',
    description: 'Loại nón chóp nhọn nhỏ có chỏm kim loại bằng đồng sáng bóng trên đỉnh, đặc trưng cho binh lính, lính lệ và các thị vệ nha môn thời phong kiến.',
    matchWith: 'Viên Lĩnh, Ngũ thân tay chẽn nam',
  },
  {
    id: 'non-la',
    name: 'Nón lá',
    gender: 'Nam & Nữ',
    description: 'Chiếc nón hình chóp quen thuộc đan từ lá nón hoặc lá cọ, lợp nan tre chuốt kỹ, vừa che mưa nắng vừa là biểu tượng mộc mạc thanh tú của người Việt.',
    matchWith: 'Mọi loại áo ngũ thân, tấc, giao lĩnh',
  },
  {
    id: 'khan-vanh-day',
    name: 'Khăn vành dây',
    gender: 'Chỉ dành riêng cho Nữ',
    description: 'Dải vải lụa hoặc gấm dài nhiều mét quấn xếp từng vòng ngay ngắn tạo thành hình vành tròn trang trọng quanh đầu của các bậc mệnh phụ, hoàng hậu, công chúa (chỉ dành riêng cho phái nữ).',
    matchWith: 'Áo Nhật Bình, Áo Tấc nữ, Phượng Bào',
  },
  {
    id: 'khan-xep',
    name: 'Khăn xếp',
    gender: 'Nam & Nữ',
    description: 'Khăn đóng xếp nếp hình chữ Nhân (人) mang đạo làm người hoặc chữ Nhất (一), thiết kế gọn ghẽ ôm lấy trán tạo thần thái nho nhã đoan chính.',
    matchWith: 'Áo ngũ thân tay chẽn, Áo Tấc',
  },
];

// 3. Giày dép (3 loại theo file PDF)
export const FOOTWEAR: Footwear[] = [
  {
    id: 'hai-theu',
    name: 'Hài thêu',
    description: 'Đôi hài vải nhung cổ điển mũi cong vút, mặt hài được nghệ nhân thêu tay họa tiết hoa sen, mây nước hoặc phụng hoàng tinh tế.',
    style: 'Cung đình cổ truyền',
    shoeColor: '#FFFFFF',
    soleColor: '#8C1D24',
  },
  {
    id: 'guoc-moc',
    name: 'Guốc mộc',
    description: 'Guốc đẽo thủ công từ gỗ mít hoặc xoan ta, sơn then bóng hoặc giữ vân gỗ mộc, quai vải nhung đỏ/đen đệm êm chân, gõ lộc cộc duyên dáng.',
    style: 'Dân gian mộc mạc',
    shoeColor: '#D29B63',
    soleColor: '#4A2A18',
  },
  {
    id: 'sneaker',
    name: 'Sneaker',
    description: 'Đôi giày thể thao trắng hoặc retro runner hiện đại, tạo nên bản phối streetwear phá cách độc lạ cho giới trẻ khi diện cổ phục dạo phố.',
    style: 'Gen Z Remix streetwear',
    shoeColor: '#F3F4F6',
    soleColor: '#111827',
  },
];

// 4. Trang sức (2 loại theo file PDF)
export const JEWELRY: Jewelry[] = [
  {
    id: 'kieng-co',
    name: 'Kiềng cổ',
    description: 'Chiếc kiềng tròn kim loại bằng bạc hoặc mạ vàng bóng sáng, ôm quanh cổ áo, điểm xuyết nét quý phái và quyền quý cổ xưa.',
    material: 'Bạc ta / Vàng tây chạm hoa văn sen lượn',
  },
  {
    id: 'tram-cai',
    name: 'Trâm cài',
    description: 'Chiếc trâm ngọc bích hoặc bạc khắc rồng phượng, đính ngọc trai hoặc tua rua đung đưa bên búi tóc tôn lên nét đài các kiêu sa.',
    material: 'Ngọc bích / Bạc thau cổ',
  },
];

// 5. Đồ cầm tay (3 loại theo file PDF)
export const HANDHELD: Handheld[] = [
  {
    id: 'dan-nguyet',
    name: 'Đàn nguyệt',
    description: 'Cây đàn cổ thân tròn tựa mặt trăng khuyết đầy, phím cao ngân vang cung bậc tao nhã đậm chất văn nhân tài tử xứ Việt.',
    vibe: 'Cốt cách văn nhân nghệ sĩ',
  },
  {
    id: 'quat',
    name: 'Quạt',
    description: 'Chiếc quạt xếp nan tre phất giấy dó hoặc lụa tơ tằm, đề thơ thư pháp hoặc vẽ hoa sen, cử chỉ phẩy quạt toát lên vẻ phong lưu nhàn tản.',
    vibe: 'Phong lưu nho nhã',
  },
];

// 6. Gen Z (5 phụ kiện theo file PDF)
export const GEN_Z_ACCESSORIES: GenZAccessory[] = [
  {
    id: 'may-anh',
    name: 'Máy ảnh',
    category: 'Nhiếp ảnh đường phố',
    description: 'Chiếc máy ảnh film retro hoặc mirrorless nhỏ gọn đeo chéo vai, phụ kiện không thể thiếu khi các bạn trẻ chụp lookbook dạo phố cổ.',
    trendTip: 'Đeo chéo vắt ngang ngực trên nền tà áo ngũ thân tạo điểm nhấn tương phản thú vị.',
  },
  {
    id: 'kinh-ram',
    name: 'Kính râm',
    category: 'Mắt kính thời trang',
    description: 'Kính râm gọng tròn retro, kính mắt mèo hoặc kính chữ nhật đen bóng high-fashion tạo nét ngầu và phá cách.',
    trendTip: 'Đeo trễ mũi hoặc cài trên cổ áo ngũ thân để tăng thần thái streetwear.',
  },
  {
    id: 'tui-xach',
    name: 'Túi xách',
    category: 'Phụ kiện thời trang',
    description: 'Túi đeo chéo da tối giản, túi tote vải canvas in typo chữ Nôm hoặc túi baguette thời thượng đựng đồ cá nhân tiện lợi.',
    trendTip: 'Chọn túi tông màu trung tính (đen, nâu be) để tôn lên màu sắc của tà áo chính.',
  },
  {
    id: 'tai-nghe-trum-dau',
    name: 'Tai nghe trùm đầu',
    category: 'Y2K Cyberfolk',
    description: 'Chiếc headphone over-ear đeo quanh cổ áo, biểu tượng năng động của thế hệ số kết hợp bất ngờ cùng cổ phục truyền thống.',
    trendTip: 'Kết hợp cùng áo tay chẽn và giày sneaker mang đến phong cách Cyber-Vietnamese đỉnh cao.',
  },
  {
    id: 'dong-ho',
    name: 'Đồng hồ',
    category: 'Công nghệ & Phụ kiện',
    description: 'Chiếc smartwatch dây da hoặc đồng hồ kim loại thanh mảnh trên cổ tay, lấp ló sau ống tay áo ngũ thân chẽn.',
    trendTip: 'Lộ nhẹ nơi cổ tay áo chẽn khi tạo dáng cầm quạt hoặc xắn nhẹ gấu tay.',
  },
];

// 7. Phối màu: 6 phong cách, mỗi phong cách có 3 màu hex cho lớp lót trong, áo ngoài, quần/váy
export const COLOR_PRESETS: ColorPreset[] = [
  {
    id: 'hoang-trieu',
    name: 'Hoàng Triều Quý Phái',
    tagline: 'Sắc đỏ son & vàng kim cung đình Huế',
    lining: '#FDBA1D',    // Lớp lót trong (vàng hoàng gia)
    dress: '#C22026',     // Áo ngoài (đỏ son)
    pants: '#FFFFFF',     // Quần (trắng lụa)
    dressBack: '#A0151A',
    dressEdge: '#E6A817',
  },
  {
    id: 'co-do',
    name: 'Cố Đô Trầm Mặc',
    tagline: 'Tím hoa cà & sắc be giấy điệp hoài niệm',
    lining: '#E8D5B7',    // Lớp lót trong (be giấy điệp)
    dress: '#6B2D5C',     // Áo ngoài (tím cố đô)
    pants: '#FFFFFF',     // Quần (trắng lụa)
    dressBack: '#521F46',
    dressEdge: '#D6A660',
  },
  {
    id: 'truc-lam',
    name: 'Trúc Lâm Thanh Nhã',
    tagline: 'Xanh lục trúc & vàng hổ phách nho nhã',
    lining: '#C8B27A',    // Lớp lót trong (vàng hổ phách)
    dress: '#2D5A43',     // Áo ngoài (xanh ngọc bích/lục trúc)
    pants: '#222222',     // Quần (đen huyền tuyền)
    dressBack: '#1F4230',
    dressEdge: '#D4AF37',
  },
  {
    id: 'sen-hong',
    name: 'Sen Hồng Đồng Nội',
    tagline: 'Hồng cánh sen & nâu gụ thuần khiết',
    lining: '#F8E2E7',    // Lớp lót trong (hồng phấn)
    dress: '#DE6B83',     // Áo ngoài (hồng sen)
    pants: '#3B2F2F',     // Quần (nâu gụ)
    dressBack: '#B84E64',
    dressEdge: '#EAA6B5',
  },
  {
    id: 'gen-z-cyberfolk',
    name: 'Gen Z Cyberfolk',
    tagline: 'Xanh lam cobalt & cam san hô phá cách',
    lining: '#FF6B6B',    // Lớp lót trong (cam san hô)
    dress: '#205493',     // Áo ngoài (xanh cobalt hiện đại)
    pants: '#1E293B',     // Quần (xám than slate)
    dressBack: '#163E70',
    dressEdge: '#FFA07A',
  },
  {
    id: 'tram-huong',
    name: 'Trầm Hương Nhật Nguyệt',
    tagline: 'Nâu mộc quế hương & vàng đồng thanh tao',
    lining: '#F3E5D8',    // Lớp lót trong (trắng sữa mộc)
    dress: '#8C6D52',     // Áo ngoài (nâu trầm hương)
    pants: '#D4AF37',     // Quần (vàng đồng nhẹ)
    dressBack: '#6E523A',
    dressEdge: '#D1AC60',
  },
];
