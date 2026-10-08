# Việt Phục Remix — sửa Trang 2 và kết nối tủ đồ

## Nhánh và phạm vi

- Làm trên `page2-puzzle`, tích hợp `origin/khanh` ở `bd694e9` (nhánh default mà người dùng đã chọn).
- Đã kiểm tra `origin/main` ở `a17506c`; không thay nền `khanh` bằng nhánh này vì đây là lịch sử khác.
- Không tạo PR, không merge vào `main` hoặc `khanh`. Renderer trang phục và các điều khiển của đồng đội được giữ; Trang 1 chỉ đổi tủ đồ/mở khóa và sửa neo phụ kiện.

## Cấu hình đã chốt

| Chặng | Trò chơi | Trang phục mở khóa |
| --- | --- | --- |
| 1 | Ghép cấu kiện Giao lĩnh | Giao lĩnh nam và nữ; Guốc mộc |
| 2 | Ghép ảnh Áo Tấc 3×3 | Áo Tấc nam và nữ; Khăn vành dây, Khăn xếp |
| 3 | Bắt lỗi Long Bào | Long Bào nam và Phượng Bào nữ |
| 4 | Phục dựng Cổn Phục | Cổn Phục nam và Giá Cô Bơ nữ |

Các bảng màu thưởng vẫn nằm trong `CHALLENGES`. Nhật Bình nữ, Ngũ thân và Viên lĩnh là bộ khởi đầu. Mẫu Nhật Bình nam không tồn tại nên không hiển thị hoặc ép model giả. Long Bào/Phượng Bào và Cổn Phục/Giá Cô Bơ là cặp phần thưởng theo yêu cầu, không phải khẳng định chúng là cùng một loại trang phục lịch sử.

Màn 2 giữ ID lưu `nhat-binh` để không mất lượt chơi/kỷ lục cũ, nhưng tên, ảnh chơi và phần thưởng hiện tại là Áo Tấc.

## Nguyên nhân và sửa chữa

- **Giao lĩnh mất tay:** bản tách trước thiếu một nhóm bàn tay. Tách lại từ SVG trang phục gốc, giữ cả `Hand/R` và `Hand/R_2` sau tay áo; đầu/cổ nằm trên cổ áo. So sánh raster hình ghép với bản gốc giữ ngưỡng sai khác dưới 0,2%.
- **Phụ kiện nhỏ hoặc lệch:** nhiều SVG có canvas lớn hơn hình vẽ, trong khi màn phục dựng đặt chúng theo khung của một món khác. Đo bounds bằng SVG `getBBox()`, giữ nguyên path/mask và dùng phép biến đổi đồng dạng theo neo đầu, cổ tay, eo và gấu áo.
- **Màn 4 chỉ có đầu/tay:** trước đây body trống là toàn bộ nền. Nay dùng đầu/da/bàn tay tách riêng và lớp nền Ngũ thân nam thật có sẵn, không vẽ thêm nhân vật. Lớp nền giữ liên tục trong lúc phối; áo, tay áo, hạ y, đai, mũ và giày có thứ tự riêng.
- **Thẻ phụ kiện khó đọc:** chuẩn hóa viewport theo bounds hình vẽ; giày là đôi giày riêng thay vì crop cả nhân vật. Máy ảnh/túi/kính/tai nghe dùng chính component đang mặc trên nhân vật. Khôi phục cả các đường trang trí hài nằm ngoài nhóm bàn chân trong SVG gốc.
- **Mũ Nón lá bị nổi:** đặt và mở rộng viewport theo rig nam/nữ, thay neo cũ làm vành nón tách khỏi đầu. Các mũ Figma khác giữ cấu hình neo riêng.
- **Màn 2 thiếu phản hồi:** viền xanh nhẹ dựa trực tiếp trên `tileId === index`; cập nhật sau đổi chỗ, không làm ô đổi kích thước.
- **Mở khóa theo giới tính không đồng bộ:** `wardrobeFamilies.ts` quản lý family và asset tương thích; mọi biến thể thật cùng hưởng một quyền mở khóa. Trang 1 có tủ khả dụng và bộ sưu tập khóa với preview xám, icon khóa và nút đến thử thách.
- **Rời bộ đặc biệt sang phụ kiện có thể lỗi model:** khi đổi giới tính hoặc thử phần thưởng, bảo đảm mẫu thường đang giữ vẫn có asset tương thích; giày dùng được trực tiếp trên bộ đặc biệt.

## Figma và asset

Nguồn: [ao_dai / Page 3](https://www.figma.com/design/Fy1QwbfwPhFJExz9CGpYII/ao_dai?node-id=1-9).

- Khăn xếp `328:452`: thay artwork cũ bằng SVG xuất trực tiếp; dùng chung cho hai trang.
- Guốc mộc `302:352`, Sneaker `314:291`: đối chiếu bản hiện tại và dùng lại geometry chuẩn của Trang 1 cho preview/giày mặc ở Trang 2. SVG tham chiếu đã xuất lưu trong `src/assets/references`.
- Cổn Phục `141:291`: kiểm tra bảy phần và thứ tự hiển thị từ thiết kế thật.
- Mũ tròn xanh: đã kiểm tra hình ellipse thực trong cụm Nhật Bình; artwork giữ nguyên, sửa bounds/neo và kích thước preview.
- **Chưa xác định được node Nón lá và Trâm cài tương ứng trong Figma đã truy cập.** Không tạo hình thay thế. Giữ artwork hiện có; chỉ sửa neo Nón lá. Muốn thay đúng bản mới cần node Figma của những món đó.

## File chính

- `src/game/challenges.ts`, `wardrobeFamilies.ts`, `progress.ts`, `types.ts`: chặng, thưởng, family, lưu v3 và migration.
- `src/game/PuzzleProgress.tsx`: chế độ người dùng mới chỉ trong development.
- `src/game/WardrobeCollection.tsx`, `wardrobe.css`, `src/App.tsx`: hai khu tủ đồ, CTA, giới tính và thử thưởng.
- `src/game/SvgArtwork.tsx`, `artworkBounds.json`, `attachments.ts`, `CostumeLayers.tsx`: chuẩn hóa bounds và ghép lớp.
- `src/game/AccessoryPreview.tsx`, `DetectiveChallenge.tsx`, `ReconstructionChallenge.tsx`, `reconstructionData.ts`, `puzzle.css`: preview, màn 3/4 và responsive.
- `src/game/ImageGridPuzzle.tsx`: ô đúng và trạng thái kéo riêng.
- `src/components/HeadwearSVG.ts`, `TraditionalAccessories.tsx`, `CostumeModel.tsx`, `src/data/headwearAssets.json`: neo mũ.
- `public/puzzle/**`, `src/assets/headwear/khan-xep.svg`: các lớp trích từ asset thật.
- `scripts/repair-puzzle-assets.py`, `scripts/measure-puzzle-art.cjs`: tái tạo lớp/bounds; không vẽ lại path.
- `tests/progress.test.ts`, `tests/e2e/puzzle.spec.ts`: migration, bốn màn, phản hồi xanh, giới tính và responsive.

## Chạy và thử

Trong PowerShell dùng `npm.cmd` để tránh lỗi execution policy của `npm.ps1`:

```powershell
npm.cmd ci
npm.cmd run dev
```

Mở địa chỉ Vite in ra, thường là `http://localhost:3000/`. Để thử người dùng mới: `http://localhost:3000/?fresh-user=1`. Đây là phiên thử trong bộ nhớ, không ghi hoặc xóa save thật; refresh bắt đầu phiên thử mới. Bấm **Thoát chế độ thử** để đọc lại tiến trình thật. Bản production bỏ qua tham số này.

Save vẫn dùng khóa `viet-phuc-remix:puzzle:v1`; nâng cấu trúc lên v3, đọc được v1/v2, giữ đồ kiếm được, chặng hoàn thành và kỷ lục. Chơi lại không thu hồi thưởng.

## Kiểm chứng

```powershell
npm.cmd run lint
npm.cmd test
npm.cmd run test:e2e
```

- 12 kiểm tra logic: migration, giữ thưởng/kỷ lục, family và giới tính, điểm phục dựng, đổi ô, điều kiện mở chặng.
- 11 kiểm tra Chrome: chơi hết bốn màn; sai/thử lại; lưu giữa chừng; mobile touch/keyboard; ô đúng đổi trạng thái; chọn model thật cả hai giới; phụ kiện và thao tác Trang 1; mọi lựa chọn phục dựng; chuyển từ phần thưởng sang tủ đồ; fresh-user bảo vệ save thật.
- Kiểm tra responsive ở 1440, 1024, 800, 390 và 360 px; kiểm tra không tràn ngang. Đã xem ảnh render nhân vật nền, phối đủ, đai, giày, lựa chọn máy ảnh/túi và mũ nam/nữ.
- Build còn cảnh báo bundle trên 500 kB và cấu hình Vite cũ dùng `__dirname`; không phải lỗi build. Chưa tối ưu tải các model lớn của dự án trong phạm vi này.

Giới hạn: chưa thay Nón lá/Trâm cài bằng bản Figma chưa xác định; kiểm tra thuật ngữ lịch sử chuyên sâu không thuộc kiểm chứng kỹ thuật. Các ảnh QA và báo cáo kiểm tra là bằng chứng cho bản local; không đồng nghĩa đã đưa commit lên GitHub.
