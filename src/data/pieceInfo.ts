export type PieceInfo = { description: string; occasion?: string };

// Garment descriptions: “Kế hoạch việt phục remix (5).pdf”.
// Occasions and accessory descriptions: “Kế hoạch việt phục remix (4).pdf”.
// Khăn đóng/khăn xếp retain the user's separate female/male variants.
export const PIECE_INFO: Record<string, PieceInfo> = {
  'nhat-binh': {
    description: "Nguồn gốc từ áo Phi Phong của nhà Minh, được triều Nguyễn bản địa hóa. Tên gọi xuất phát từ hoa văn trang trí tạo thành một hình chữ nhật lớn ở trước ngực. Áo xẻ tà, có dải lụa ngũ sắc (tượng trưng cho ngũ hành) buộc ở trước ngực thay cho cúc áo. Ống tay áo có các dải màu phân cấp bậc (nhiều màu hoặc đơn màu tùy thuộc vào địa vị của Hậu phi hay Công chúa).",
    occasion: 'Cưới hỏi, lễ Tết, sự kiện văn hóa lớn hoặc chụp ảnh nghệ thuật trang trọng.',
  },
  'ao-tac': {
    description: "Kích thước viền tay áo (cửa tay) rộng đúng một tấc cổ (khoảng 10cm), tà áo dài qua gối. Khi chắp tay trước ngực hành lễ, hai tay áo tạo thành hình vuông vức chùng xuống, thể hiện sự khiêm nhường và cung kính. Đây là trang phục được chúa Nguyễn Phúc Khoát quy định làm lễ phục chung cho toàn dân từ thế kỷ 18.",
    occasion: 'Nghi lễ truyền thống, dâng hương tế tự, cưới hỏi hoặc các dịp cần sự nghiêm trang.',
  },
  'ngu-than-tay-chen': {
    description: "Cấu tạo từ 5 thân vải, trong đó 4 thân ngoài tượng trưng cho \"tứ thân phụ mẫu\" (cha mẹ mình và cha mẹ vợ/chồng), 1 thân con ẩn bên trong tượng trưng cho bản thân người mặc. Hàng 5 chiếc khuy áo cài từ cổ xuống nách bên phải đại diện cho \"Ngũ thường\" (Nhân, Nghĩa, Lễ, Trí, Tín) và \"Ngũ luân\" (5 mối quan hệ giường mối của xã hội).",
    occasion: 'Cực kỳ đa dụng, thoải mái mặc đi chơi, dạo phố, uống cà phê, du xuân.',
  },
  'giao-linh': {
    description: "Áo vạt chéo (vạt trái vắt sang phải để buộc hoặc cài khuy), xuất hiện và thịnh hành từ thời Lý, Trần, Lê. Phụ nữ thường mặc giao lĩnh kết hợp với váy đụp (váy quây) và yếm bên trong, trong khi nam giới mặc với quần ống rộng. Cổ áo thường được lót mếch hoặc xếp lớp để giữ phom thẳng, cứng cáp.",
    occasion: 'Tham gia lễ hội cổ truyền, sự kiện giao lưu văn hóa hoặc chụp ảnh concept cổ trang.',
  },
  'vien-linh': {
    description: "Áo cổ tròn khoét sát chân cổ, gài cúc bên vai phải. Dưới thời Hậu Lê và Nguyễn, viên lĩnh tay thụng được dùng làm \"Bổ phục\" (quan phục thiết triều) cho quan lại. Trước ngực và sau lưng áo quan sẽ được đính thêm một mảnh vải thêu hình chim thú (gọi là Bổ tử) để phân biệt rõ phẩm hàm văn/võ.",
    occasion: 'Trình diễn văn hóa, sự kiện hội hè, chụp ảnh nghệ thuật hoặc dạo phố (đối với phom dáng cách tân).',
  },
  'special-long-bao-nam': {
    description: "May bằng tơ lụa cao cấp, thêu chỉ kim tuyến (chỉ vàng). Họa tiết rồng ngũ trảo (rồng 5 móng) là cấm tiết, đại diện độc quyền cho quyền lực tối cao của thiên tử. Ngoài rồng cuộn ở ngực và lưng, áo còn thêu họa tiết \"Thủy ba\" (sóng nước) ở gấu áo và dải \"Lập thủy\" (các đường sọc chéo nhiều màu) tượng trưng cho biển cả, đất đai và giang sơn xã tắc vững bền.",
  },
  'special-phuong-bao-nu': {
    description: "Sử dụng kỹ thuật thêu nổi tinh xảo. Chim phượng hoàng thường được thêu ở tư thế sải cánh bay lên (phi phượng) hoặc quần tụ, kết hợp cùng họa tiết hoa mẫu đơn, mây ngũ sắc để tôn vinh vị thế mẫu nghi thiên hạ. Các chi tiết viền áo thường được đính ngọc trai hoặc kim sa.",
  },
  'special-quan-phuc-nam': {
    description: "Tuân thủ triết lý Âm Dương Ngũ Hành cực kỳ nghiêm ngặt. Hệ thống \"Thập nhị chương\" (12 biểu tượng) được thêu phân bổ rõ ràng: Áo đen thêu mặt trời, mặt trăng, các vì sao, núi non, rồng, chim trĩ; Váy đỏ thêu các họa tiết như tảo (sự sạch sẽ), lửa (sự minh sáng), v.v. Mũ Miện đi kèm có 12 dải lưu (chuỗi ngọc) rủ xuống che khuất một phần tầm nhìn, mang ý nghĩa nhắc nhở bậc quân vương không nên để tâm vào những điều vụn vặt mà phải nhìn nhận đại cục.",
  },
  'special-bach-y-nu': {
    description: "Nằm trong hệ thống Tứ Phủ (Thiên, Nhạc, Thoải, Địa) của tín ngưỡng thờ Mẫu. Cô Bơ đại diện cho Thoải Phủ (miền nước) nên trang phục bắt buộc tuân theo sắc trắng. Cấu trúc \"mớ ba mớ bảy\" gồm nhiều lớp áo the, voan, lụa mỏng đan xen chồng lên nhau. Khi Thanh đồng thực hiện các vũ điệu (như múa mái chèo), nhiều lớp dải lụa mỏng nhẹ sẽ bay bổng, tạo hiệu ứng thị giác như những gợn sóng nước nhấp nhô trên mặt sông.",
  },
  'non-ba-tam': {
    description: 'Nón vành rộng, mặt phẳng như chiếc lọng của phụ nữ Bắc Bộ xưa, thường đi kèm quai thao điệu đà.',
  },
  'non-dau': {
    description: 'Mũ chóp nhọn đan bằng lạt tre hoặc bọc lá, phụ kiện đội đầu đặc trưng của binh lính thời phong kiến.',
  },
  'non-la': {
    description: 'Biểu tượng truyền thống quen thuộc, chóp nhọn bọc lá cọ, mộc mạc và đa dụng.',
  },
  'khan-vanh-day': {
    description: 'Khăn lụa dài quấn nhiều vòng to bản, dẹt và rộng, phụ kiện đội đầu quyền quý dành riêng cho hậu phi, công chúa triều Nguyễn.',
  },
  'khan-xep': {
    description: 'Khăn lụa quấn nếp sẵn ôm sát đầu, phụ kiện chuẩn mực khi kết hợp cùng áo dài ngũ thân nam giới.',
  },
  'khan-dong': {
    description: 'Khăn lụa quấn nếp sẵn ôm sát đầu.',
  },
  'hai-theu': {
    description: 'Giày bọc vải với mũi vòm cong vút, thêu hoa văn ngũ sắc hoặc kim tuyến tinh xảo, dành cho dịp lễ trọng hoặc giới quý tộc.',
  },
  'guoc-moc': {
    description: 'Guốc đẽo từ nguyên khối gỗ, quai vắt ngang mu bàn chân, mang nét dân dã, mộc mạc đặc trưng của người Việt xưa.',
  },
  'kieng-co': {
    description: 'Vòng cổ kim loại đúc dạng ống tròn đặc, ôm sát vòm cổ, tôn lên vẻ đài các và thanh lịch của phụ nữ Việt.',
  },
  'tram-cai': {
    description: 'Phụ kiện cài búi tóc bằng kim loại, ngọc hoặc sừng, được chạm trổ hoa lá tinh tế.',
  },
  'dan-nguyet': {
    description: 'Nhạc cụ gảy truyền thống với bầu đàn tròn như mặt trăng, âm sắc trong trẻo vang vọng, linh hồn của nghệ thuật Hát Văn.',
  },
  'o-du': {
    description: 'Ô cán tre lợp giấy dầu hoặc lụa, phụ kiện che mưa nắng mang đậm nét thơ mộng, cổ điển.',
  },
  'quat': {
    description: 'Quạt xếp bằng giấy hoặc lụa mỏng, phụ kiện làm mát và tạo nét phong lưu cho bậc nho nhã hoặc điểm xuyết nét duyên cho nữ giới.',
  },
};
