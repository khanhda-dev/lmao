export type PieceInfo = { description: string; culture?: string; occasion?: string; occasionLabel?: string };

// Outfit introductions: approved Page 1 culture draft, including the user's edits.
// Accessory descriptions: original project content.
export const PIECE_INFO: Record<string, PieceInfo> = {
  "nhat-binh": {
    "description": "Nhật Bình dễ nhận ra nhờ **mảng nẹp cổ to bản tạo hình chữ nhật trước ngực**, đi cùng **tay áo rộng**. Cổ áo mở ở giữa, khác với cổ chéo của Giao lĩnh, cổ tròn của Viên lĩnh và cổ đứng của áo ngũ thân. Các dải màu ở cổ tay là một điểm nhấn thường gặp. Khi phân biệt Nhật Bình với các bộ áo thêu hoa văn khác, hình dáng nẹp cổ là dấu hiệu rõ hơn màu áo hay họa tiết chim phượng.",
    "culture": "Trên chiếc Nhật Bình của Đoan Huy Hoàng thái hậu còn lưu giữ tại Huế, chim phượng, hoa lá và sóng nước phủ khắp cổ, thân và tay áo. Hai bên cổ được nối bằng khuy kim loại gọi là phượng khấu, phía dưới có các dải thùy lưu trang trí. Những chi tiết ấy cho thấy một chiếc áo cung đình vừa thể hiện vị thế người mặc, vừa lưu giữ sự tinh tế của nghệ thuật thêu và những ước vọng tốt lành.",
    "occasionLabel": "Dịp mặc ngày nay",
    "occasion": "Cưới hỏi, lễ Tết, sự kiện văn hóa và chụp ảnh trang trọng."
  },
  "ao-tac": {
    "description": "Áo Tấc có **cổ đứng, hàng khuy lệch sang bên phải và tay áo thụng rộng**, với tà áo dài qua gối. Điểm phân biệt rõ nhất với Ngũ thân tay chẽn là **dáng tay áo**: tay áo Tấc rộng và buông, còn tay chẽn gọn hơn. Dù cùng có tay rộng như một số mẫu Giao lĩnh hay Nhật Bình, áo Tấc vẫn nhận ra bằng cổ đứng và cách cài khuy lệch của áo ngũ thân.",
    "culture": "Lịch sử của áo gắn với quá trình định chế trang phục ở Đàng Trong thời chúa Nguyễn Phúc Khoát. Trong những dịp cưới hỏi, tế lễ hay ngày Tết, bộ áo trở thành một phần của cách người Việt bày tỏ sự kính trọng với gia đình, tổ tiên và cộng đồng. Vẻ đẹp của áo nằm ở cả đường may và dáng người mặc: chậm rãi, chỉnh tề, phù hợp với không khí của một dịp quan trọng.",
    "occasionLabel": "Dịp mặc",
    "occasion": "Nghi lễ truyền thống, dâng hương, cưới hỏi, lễ Tết và các dịp trang trọng."
  },
  "ngu-than-tay-chen": {
    "description": "Ngũ thân tay chẽn có **cổ đứng, năm khuy cài lệch bên phải và tay áo gọn dần về cổ tay**. Áo được ghép từ năm thân vải, trong đó có một thân nhỏ nằm phía trong. Cùng thuộc nhóm ngũ thân như áo Tấc, nhưng **ống tay chẽn nhỏ và gọn hơn tay thụng**, thuận tiện cho cử động. Cổ đứng cũng giúp phân biệt bộ áo với cổ chéo của Giao lĩnh và cổ tròn của Viên lĩnh.",
    "culture": "Theo cách diễn giải văn hóa được nhiều người nghiên cứu và phục hồi áo ngũ thân nhắc đến, bốn thân ngoài tượng trưng cho cha mẹ hai bên, còn thân thứ năm ẩn bên trong tượng trưng cho người mặc. Năm chiếc khuy cũng được liên hệ với Nhân, Nghĩa, Lễ, Trí, Tín. Qua những cách diễn giải ấy, bộ áo mang thêm câu chuyện về lòng biết ơn và cách ứng xử, bên cạnh giá trị của kỹ thuật cắt may.",
    "occasionLabel": "Dịp mặc ngày nay",
    "occasion": "Du xuân, dạo phố, gặp gỡ bạn bè hoặc tham gia hoạt động văn hóa."
  },
  "giao-linh": {
    "description": "Giao lĩnh nổi bật với **hai vạt cổ bắt chéo, tạo hình chữ V trước ngực**, thường khép vạt trái sang bên phải. Đường nẹp chạy chéo xuống thân áo, thay vì khép quanh chân cổ như Viên lĩnh hoặc dựng đứng như áo ngũ thân. **Cổ chéo là dấu hiệu nhận biết chính**; tay áo có thể thay đổi theo mẫu, nên độ rộng của tay hay màu áo không đủ để phân biệt Giao lĩnh với các kiểu áo khác.",
    "culture": "Giao lĩnh từng được sử dụng ở nhiều tầng lớp, với cách mặc thay đổi theo thời kỳ và hoàn cảnh. Các lớp áo trong, phần áo khoác ngoài và hạ y kết hợp để tạo thành một bộ trang phục hoàn chỉnh. Sự đa dạng ấy cho thấy Việt phục phát triển qua cả sinh hoạt đời thường, nghi lễ và quá trình giao lưu văn hóa.",
    "occasionLabel": "Dịp mặc ngày nay",
    "occasion": "Lễ hội truyền thống, giao lưu văn hóa và chụp ảnh cổ phục."
  },
  "vien-linh": {
    "description": "Viên lĩnh nhận ra bằng **đường cổ tròn khép quanh chân cổ**, còn được gọi là cổ kiềng, với phần khuy thường đặt bên vai phải. Cổ áo không bắt chéo thành chữ V như Giao lĩnh, không tạo mảng chữ nhật như Nhật Bình và không dựng thành cổ đứng như áo ngũ thân. **Dáng cổ tròn là nét chung**, còn độ rộng tay áo và phần trang trí có thể khác nhau giữa các dạng Viên lĩnh.",
    "culture": "Một số dạng quan phục viên lĩnh được kết hợp với bổ tử: mảnh vải thêu đính ở ngực và lưng, dùng để thể hiện thứ bậc theo quy chế từng triều đại. Vì vậy, hoa văn trên áo quan còn mang thông tin về địa vị người mặc. Cùng một dáng cổ tròn, nhưng kiểu tay, màu áo và các chi tiết đi kèm có thể nói lên những bối cảnh sử dụng rất khác nhau.",
    "occasionLabel": "Dịp mặc ngày nay",
    "occasion": "Trình diễn, lễ hội, sự kiện văn hóa hoặc chụp ảnh cổ phục."
  },
  "special-long-bao-nam": {
    "description": "Long Bào trong bộ sưu tập nổi bật với **nền áo vàng, hình rồng lớn trên thân và những dải sóng nước ở gấu áo**. Hoa văn phủ trên thân và tay áo tạo vẻ cầu kỳ hơn các mẫu áo thường. Khi so với Phượng Bào, điểm khác nổi bật là **hình rồng thay cho chim phượng**; khi so với Cổn Phục, bộ áo vàng liền dáng khác rõ với tổng thể áo sẫm, hạ y đỏ và phần buông trước thân.",
    "culture": "Long Bào gắn với trang phục của hoàng đế trong những dịp đại triều và lễ trọng, với chất liệu, sắc áo và hoa văn được quy định trong điển chế. Rồng năm móng gắn với quyền lực đế vương; những lớp sóng nước, gọi là thủy ba, góp phần thể hiện hình ảnh non sông dưới sự cai quản của nhà vua. Các hiện vật bằng sa đoạn, thêu chỉ kim tuyến còn lưu giữ cũng cho thấy tài nghệ của những người thợ cung đình.",
    "occasionLabel": "Bối cảnh sử dụng trong lịch sử",
    "occasion": "Đại triều, lễ Tết và các nghi lễ cung đình theo điển chế."
  },
  "special-phuong-bao-nu": {
    "description": "Phượng Bào trong bộ sưu tập có **sắc cam nổi bật, họa tiết chim phượng và lớp vân kiên trang trí phủ quanh vai**. So với Long Bào, hình chim phượng và phần trang trí ở vai là những điểm dễ phân biệt. Chim phượng cũng có thể xuất hiện trên Nhật Bình, nên **họa tiết phượng riêng lẻ chưa đủ để nhận biết bộ áo**: cần nhìn thêm dáng cổ, phần vai và bố cục hoa văn của cả bộ.",
    "culture": "Trong mỹ thuật cung đình Nguyễn, chim phượng thường xuất hiện trên phục sức của hoàng thái hậu, hoàng hậu và công chúa. Theo quan niệm truyền thống, phượng gắn với điều tốt lành, vẻ đẹp và đức hạnh. Hình tượng ấy vừa mang giá trị trang trí, vừa gửi gắm những phẩm chất được đề cao ở người phụ nữ. Cách thêu từng cánh chim, sắp đặt hoa lá và phối màu cũng thể hiện sự chăm chút dành cho phục sức cung đình.",
    "occasionLabel": "Bối cảnh văn hóa",
    "occasion": "Phục sức phụ nữ hoàng gia và nghệ thuật trang trí cung đình."
  },
  "special-quan-phuc-nam": {
    "description": "Cổn Phục trong bộ sưu tập nhận ra nhờ **mũ miện có các chuỗi ngọc rủ, áo trên màu sẫm và hạ y đỏ**. Phía trước có **một phần trang trí dài buông từ đai xuống**, làm rõ cấu trúc nhiều phần của bộ lễ phục. Khác với Long Bào vàng có hình rồng lớn chạy trên thân áo, Cổn Phục nổi bật bằng sự kết hợp giữa mũ miện, áo, hạ y và các phần buông trước thân.",
    "culture": "Cổn Phục gắn với nghi lễ tế Giao của nhà vua. Dưới triều Nguyễn, lễ tế Trời Đất tại đàn Nam Giao là một nghi lễ quan trọng, được tổ chức với quy trình và phục sức riêng. Trang phục tế Giao thuộc một hệ thống khác với Long Bào dùng khi đại triều. Sự phân biệt ấy cho thấy cách ăn mặc của hoàng đế gắn chặt với từng nghi thức và với quan niệm về vai trò của nhà vua trước Trời Đất.",
    "occasionLabel": "Bối cảnh sử dụng trong lịch sử",
    "occasion": "Nghi lễ tế Giao của hoàng đế."
  },
  "special-bach-y-nu": {
    "description": "Trang phục Giá Cô Bơ trong bộ sưu tập nổi bật với **sắc trắng chủ đạo, nhiều lớp áo mềm và các dải lụa buông dài**, đi cùng trang sức. Tổng thể tạo cảm giác nhẹ, nhiều lớp, khác với mảng áo liền dáng của Long Bào hoặc các phần áo sẫm, hạ y đỏ của Cổn Phục. **Màu trắng cần được nhìn cùng dáng áo và phục sức đi kèm**: một chiếc áo Tấc hay Nhật Bình màu trắng vẫn là kiểu áo riêng, không trở thành trang phục Giá Cô Bơ chỉ vì cùng màu.",
    "culture": "Bộ đồ gắn với giá hầu Cô Bơ, vị thánh thuộc Thoải Phủ — miền nước — trong tín ngưỡng thờ Mẫu, với sắc trắng là màu đại diện. Những lớp áo và dải lụa góp phần làm nổi bật chuyển động của người mặc. Đặt bên cạnh âm nhạc, động tác và đồ dùng trong thực hành hầu đồng, phục sức trở thành một phần của cách cộng đồng thể hiện tín ngưỡng và gìn giữ những câu chuyện về các vị thánh.",
    "occasionLabel": "Bối cảnh văn hóa",
    "occasion": "Giá hầu Cô Bơ trong nghi lễ hầu đồng Tứ Phủ, biểu diễn nghệ thuật sân khấu và hát văn."
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
