/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import {
  Layers,
  FileText,
  Sparkles,
  RefreshCw,
  ZoomIn,
  ZoomOut,
  Crown,
  Palette,
  Check,
  Eye,
  Info,
  SlidersHorizontal,
  Bookmark,
  User,
  HeartHandshake,
  Shirt,
  Sparkle,
  Camera,
  Glasses,
  ShoppingBag,
  Headphones,
  Watch,
  Music,
  Umbrella,
  Fan
} from 'lucide-react';
import GiaoLinhNam from './components/GiaoLinhNam';
import HoangBaoLongTrieu from './components/HoangBaoLongTrieu';
import LePhucNguSac from './components/LePhucNguSac';
import GiaoLinhThienThanh from './components/GiaoLinhThienThanh';
import NguThanXanhCham from './components/NguThanXanhCham';
import NguThanTuSac from './components/NguThanTuSac';
import AoTacDoSon from './components/AoTacDoSon';
import PhuongBaoHoangHau from './components/PhuongBaoHoangHau';
import AoTacNuTocDai from './components/AoTacNuTocDai';
import AoDoiKhamLamHong from './components/AoDoiKhamLamHong';
import NguThanBichThuy from './components/NguThanBichThuy';
import BachYNu from './components/BachYNu';
import AccessoryVisuals from './components/AccessoryVisuals';

// Model Registry Definition with Gender Grouping
export interface ModelDef {
  id: string;
  name: string;
  subname?: string;
  shortName: string;
  gender: 'nam' | 'nu';
  badge: string;
  category: 'hoangtrieu' | 'nguthan' | 'giaolinh';
  era: string;
  desc: string;
  historicalNote: string;
  accentColor: string;
  defaultColors: {
    tunic: string;
    pants: string;
    sash: string;
  };
  targets: { id: number; label: string }[];
}

export const OUTFIT_MODELS: ModelDef[] = [
  // =================== CỔ PHỤC NAM (7 MẪU) ===================
  {
    id: 'giao_linh_nam',
    name: 'Cổ Phục',
    subname: 'Tế Nam Giao',
    shortName: 'Cổ Phục',
    gender: 'nam',
    badge: 'Tế Nam Giao',
    category: 'giaolinh',
    era: 'Triều Lê - Nguyễn (Thế kỷ XV - XIX)',
    desc: 'Trang phục Giao Lĩnh cổ chéo vạt sang phải viền chu biên (đỏ son), thân áo huyền sắc trang nghiêm, đội Mũ Bình Thiên đính 12 dải lưu miện ngũ sắc và tay cầm thẻ hốt ngọc biểu trưng quyền uy.',
    historicalNote: 'Áo Giao Lĩnh (cổ giao) là một trong những dạng thức y phục truyền thống tiêu biểu nhất của người Việt, xuất hiện từ thời Lý - Trần và được quy chuẩn hoá trang trọng trong triều đình Lê - Nguyễn.',
    accentColor: '#8D3435',
    defaultColors: {
      tunic: '#1A1A1A',
      pants: '#8B1A1A',
      sash: '#8D3435'
    },
    targets: [
      { id: 0, label: 'Thân áo (Hắc y)' },
      { id: 1, label: 'Hạ y (Thường đỏ)' },
      { id: 2, label: 'Viền cổ & Đai' }
    ]
  },
  {
    id: 'hoang_bao_long_trieu',
    name: 'Long Bào Đại Triều',
    subname: 'Hoàng Bào Triều Nguyễn',
    shortName: 'Long Bào Đại Triều',
    gender: 'nam',
    badge: 'Hoàng Bào Triều Nguyễn',
    category: 'hoangtrieu',
    era: 'Đại Triều Phục (Lê Sơ - Nguyễn)',
    desc: 'Hoàng Bào chính thống của bậc Thiên Tử sắc vàng hoàng kim lộng lẫy, dệt thêu rồng ẩn mây ngũ sắc, viền cổ ngọc bích đính ngọc trai, gấu áo thêu hoa văn sóng nước Thủy Ba ngũ hành và đội Mũ Xung Thiên / Bình Thiên đính ngọc quý.',
    historicalNote: 'Hoàng bào dùng trong các đại lễ tế Giao, thiết triều mừng lễ vạn thọ và tiếp sứ giả. Họa tiết sóng nước Thủy Ba biểu trưng cho sự trường tồn, mưa thuận gió hòa và vương quyền tối thượng.',
    accentColor: '#D8A20A',
    defaultColors: {
      tunic: '#F6D36A',
      pants: '#1A1A1A',
      sash: '#D8A20A'
    },
    targets: [
      { id: 0, label: 'Sắc Hoàng Bào' },
      { id: 1, label: 'Quần lót / Hài' },
      { id: 2, label: 'Đai ngọc hoàng tộc' }
    ]
  },
  {
    id: 'ngu_than_xanh_cham',
    name: 'Ngũ Thân Nam',
    subname: '',
    shortName: 'Ngũ Thân Nam',
    gender: 'nam',
    badge: '',
    category: 'nguthan',
    era: 'Triều Nguyễn (Năm 1744 - 1945)',
    desc: 'Áo Dài Ngũ Thân tay chẽn nam giới chuẩn mực sắc xanh chàm thâm trầm, vạt hò chéo cài 5 chiếc cúc vàng tượng trưng cho Ngũ Thường (Nhân, Lễ, Nghĩa, Trí, Tín), quần lụa trắng và đầu đội khăn đóng truyền thống.',
    historicalNote: 'Áo Ngũ Thân được chúa Nguyễn Phúc Khoát định hình năm 1744 và vua Minh Mạng phổ quát toàn quốc năm 1837, trở thành quốc phục chính thống của người Việt trong suốt hơn 200 năm.',
    accentColor: '#3F5A86',
    defaultColors: {
      tunic: '#3F5A86',
      pants: '#F2F2EC',
      sash: '#D9B25B'
    },
    targets: [
      { id: 0, label: 'Thân áo xanh chàm' },
      { id: 1, label: 'Quần lụa trắng' },
      { id: 2, label: 'Khăn đóng & Cúc' }
    ]
  },
  {
    id: 'ngu_than_tu_sac',
    name: 'Tấc Nam',
    subname: '',
    shortName: 'Tấc Nam',
    gender: 'nam',
    badge: '',
    category: 'nguthan',
    era: 'Triều Nguyễn - Quý Tộc',
    desc: 'Áo Ngũ Thân sắc tím mận chín (Tử Sắc) thanh cao dành cho giới thượng lưu và hoàng thân, cài hàng khuy vàng sang trọng, phối cùng khăn đóng tím đồng điệu và quần lụa ngà mềm mại.',
    historicalNote: 'Màu tím xứ Huế và sắc tử thảo truyền thống là màu sắc mang tính hoài cổ, biểu trưng cho sự thủy chung, kín đáo và phong thái quý tộc trang nhã.',
    accentColor: '#8F7DB0',
    defaultColors: {
      tunic: '#8F7DB0',
      pants: '#F5F5F0',
      sash: '#D9B25B'
    },
    targets: [
      { id: 0, label: 'Thân áo tím mận' },
      { id: 1, label: 'Quần lụa ngà' },
      { id: 2, label: 'Khăn đóng tím' }
    ]
  },
  {
    id: 'ao_tac_do_son_khan',
    name: 'Viên Lĩnh Nam',
    subname: '',
    shortName: 'Viên Lĩnh Nam',
    gender: 'nam',
    badge: '',
    category: 'nguthan',
    era: 'Triều Nguyễn - Lễ Cưới & Đại Lễ',
    desc: 'Áo Tấc nam (áo ngũ thân tay thụng dài một tấc) sắc đỏ son rực rỡ, cổ áo đứng viền trắng bên trong, hàng cúc mạ vàng óng ánh, phối cùng quần lụa màu xanh lam thẫm quý phái và khăn đóng đỏ trang nghiêm.',
    historicalNote: 'Áo Tấc màu đỏ son thường được các chú rể, tân khoa hoặc gia chủ mặc trong các dịp đại hỷ như cưới hỏi, lễ tế gia tiên, hội làng mùa xuân, mang ý nghĩa chúc phúc may mắn và thịnh vượng.',
    accentColor: '#A3202F',
    defaultColors: {
      tunic: '#A3202F',
      pants: '#23407A',
      sash: '#E3B778'
    },
    targets: [
      { id: 0, label: 'Thân áo đỏ son' },
      { id: 1, label: 'Quần lụa lam thẫm' },
      { id: 2, label: 'Cúc & Khăn đóng' }
    ]
  },
  {
    id: 'giao_linh_thien_thanh',
    name: 'Giao Lĩnh Nam',
    subname: '',
    shortName: 'Giao Lĩnh Nam',
    gender: 'nam',
    badge: '',
    category: 'giaolinh',
    era: 'Thời Lý - Trần - Lê',
    desc: 'Áo Giao Lĩnh sắc xanh mây trời (Thiên Thanh) thanh thoát, cổ vạt chéo viền sắc ngà kem, đai ngọc đới buông dải thắt nơ mềm mại thướt tha, mang vẻ đẹp tao nhã phong nhã.',
    historicalNote: 'Màu Thiên Thanh (xanh da trời nhạt) là biểu trưng cho nét đẹp tinh khiết, thanh cao và thanh nhã của các danh gia vọng tộc thời xưa.',
    accentColor: '#7F9FBA',
    defaultColors: {
      tunic: '#B3CEE5',
      pants: '#F8F9FA',
      sash: '#FFFDD0'
    },
    targets: [
      { id: 0, label: 'Thân áo mây trời' },
      { id: 1, label: 'Nội y / Váy lụa' },
      { id: 2, label: 'Dải thắt lưng ngọc' }
    ]
  },
  {
    id: 'ao_tac_nu_toc_dai',
    name: 'Viên Lĩnh Nam',
    subname: '',
    shortName: 'Viên Lĩnh Nam',
    gender: 'nam',
    badge: '',
    category: 'nguthan',
    era: 'Triều Nguyễn (Kinh Kỳ)',
    desc: 'Áo đỏ son tay thụng viền trắng kem bên trong, cài 5 hạt khuy vàng, phối cùng quần lụa màu xanh lam thẫm quý phái và phong thái lịch thiệp của nam nhân Kinh kỳ.',
    historicalNote: 'Áo tay thụng dài kết hợp phong thái thanh lịch, vừa giữ được nét e ấp khiêm nhường truyền thống, vừa toát lên vẻ đẹp thanh tân của người Việt.',
    accentColor: '#A3202F',
    defaultColors: {
      tunic: '#A3202F',
      pants: '#23407A',
      sash: '#E3B778'
    },
    targets: [
      { id: 0, label: 'Thân áo đỏ son' },
      { id: 1, label: 'Quần lụa lam thẫm' },
      { id: 2, label: 'Cúc & Viền ngà' }
    ]
  },

  // =================== CỔ PHỤC NỮ (7 MẪU) ===================
  {
    id: 'phuong_bao_hoang_hau',
    name: 'Phượng Bào',
    subname: 'Phụng Bào Triều Nguyễn',
    shortName: 'Phượng Bào',
    gender: 'nu',
    badge: 'Phụng Bào Triều Nguyễn',
    category: 'hoangtrieu',
    era: 'Triều Lê - Nguyễn (Đại Lễ Cung Đình)',
    desc: 'Hoàng phục / Phượng Bào cao quý bậc nhất của bậc Hoàng Hậu và Mệnh Phụ, thân thêu tường vân ngũ sắc, đai ngọc đới, gấu áo thêu sóng nước Thủy Ba ba tầng và đầu đội Mão Phượng / Mũ Miện Phượng Đình đính ngọc vàng lộng lẫy.',
    historicalNote: 'Phượng Bào kết hợp cùng Mão Phượng đính 9 con chim phượng ngậm ngọc là biểu tượng tối thượng của bậc Mẫu nghi thiên hạ, tượng trưng cho phúc lộc trường tồn và sự tôn quý mẫu mực.',
    accentColor: '#F58B3E',
    defaultColors: {
      tunic: '#F58B3E',
      pants: '#2E617D',
      sash: '#FDBA1D'
    },
    targets: [
      { id: 0, label: 'Thân Phượng Bào' },
      { id: 1, label: 'Hạ xiêm Thủy Ba' },
      { id: 2, label: 'Đai & Viền vàng' }
    ]
  },
  {
    id: 'le_phuc_ngu_sac_hat',
    name: 'Nhật Bình Nữ',
    subname: '',
    shortName: 'Nhật Bình Nữ',
    gender: 'nu',
    badge: '',
    category: 'hoangtrieu',
    era: 'Triều Lê - Nguyễn (Hậu Cung & Mệnh Phụ)',
    desc: 'Lễ phục thụng xanh chàm (Lam bảo), cửa tay dệt dải viền ngũ sắc tượng trưng cho ngũ hành (Kim, Mộc, Thủy, Hỏa, Thổ), thường màu ngà dệt ngọc văn và đầu đội Mũ Triều Nghi tròn hoa văn lam bảo trang nghiêm.',
    historicalNote: 'Viền cổ tay ngũ sắc là nét văn hóa đặc thù mang triết lý âm dương ngũ hành của trang phục cung đình và quý tộc Việt cổ, bảo hộ thân chủ và tôn vinh sự cao quý đoan trang của nữ giới.',
    accentColor: '#1F2A78',
    defaultColors: {
      tunic: '#1F2A78',
      pants: '#F6EEDC',
      sash: '#E2A93B'
    },
    targets: [
      { id: 0, label: 'Thân áo lam' },
      { id: 1, label: 'Váy thêu ngà' },
      { id: 2, label: 'Bổ tử & Đai' }
    ]
  },
  {
    id: 'le_phuc_ngu_sac_nohat',
    name: 'Nhật Bình Nữ',
    subname: '',
    shortName: 'Nhật Bình Nữ',
    gender: 'nu',
    badge: '',
    category: 'hoangtrieu',
    era: 'Triều Lê - Nguyễn (Dạo Yến)',
    desc: 'Phiên bản thường triều và dạo yến của Lễ Phục Ngũ Sắc nữ, không đội mũ triều nghi để lộ mái tóc búi cài trâm tao nhã, toát lên phong thái quyền quý nhẹ nhàng, thanh tú và dịu dàng.',
    historicalNote: 'Phong cách tóc búi tự nhiên cài trâm thịnh hành trong các buổi yến tiệc thân mật của hoàng thân và tiểu thư quyền quý, vừa giữ trọn nét tôn nghiêm vừa thể hiện nét đẹp mềm mại của phụ nữ Việt.',
    accentColor: '#2B4FA0',
    defaultColors: {
      tunic: '#1F2A78',
      pants: '#F6EEDC',
      sash: '#E2A93B'
    },
    targets: [
      { id: 0, label: 'Thân áo lam' },
      { id: 1, label: 'Váy thêu ngà' },
      { id: 2, label: 'Bổ tử & Đai' }
    ]
  },
  {
    id: 'ngu_than_bich_thuy',
    name: 'Ngũ Thân Nữ',
    subname: '',
    shortName: 'Ngũ Thân Nữ',
    gender: 'nu',
    badge: '',
    category: 'nguthan',
    era: 'Triều Nguyễn (Năm 1744 - 1945)',
    desc: 'Áo Dài Ngũ Thân tay chẽn màu xanh ngọc bích (Bích Thủy) thanh tao thoát tục, vạt hò cài 5 cúc mạ vàng óng ả, phối cùng quần lụa đen tuyền trang nhã và phong thái đoan trang của bậc tiểu thư quý tộc.',
    historicalNote: 'Sắc ngọc bích tượng trưng cho ngũ hành Mộc - đại diện cho mùa xuân, sự sinh sôi nảy nở, khí chất thanh cao và tâm hồn trong sáng của người phụ nữ.',
    accentColor: '#0D7482',
    defaultColors: {
      tunic: '#0D7482',
      pants: '#1A1A1A',
      sash: '#D9B25B'
    },
    targets: [
      { id: 0, label: 'Thân áo ngọc bích' },
      { id: 1, label: 'Quần lụa đen' },
      { id: 2, label: 'Cúc & Khăn đóng' }
    ]
  },
  {
    id: 'ao_doi_kham_lam_hong',
    name: 'Viên Lĩnh Nữ',
    subname: '',
    shortName: 'Viên Lĩnh Nữ',
    gender: 'nu',
    badge: '',
    category: 'hoangtrieu',
    era: 'Thời Lê Trung Hưng - Nguyễn',
    desc: 'Trang phục lễ hội nhị tầng phối hợp độc đáo giữa áo khoác vạt lỡ sắc đỏ son thắm tươi bên ngoài và thân áo dài màu xanh lam thẫm bên trong, quần lụa ngà mềm mại và cúc ngọc cài quý phái.',
    historicalNote: 'Phong cách mặc nhiều tầng lớp áo (nhị tầng / tam tầng y phục) vừa tôn vinh độ đài các phong lưu, vừa thể hiện sự tôn nghiêm và chỉn chu trong các nghi lễ trang trọng của người xưa.',
    accentColor: '#A3202F',
    defaultColors: {
      tunic: '#A3202F',
      pants: '#23407A',
      sash: '#F1DECA'
    },
    targets: [
      { id: 0, label: 'Áo ngoài đỏ thắm' },
      { id: 1, label: 'Lớp trong áo lam' },
      { id: 2, label: 'Quần lụa ngà' }
    ]
  },
  {
    id: 'giao_linh_thien_thanh_bun',
    name: 'Giao Lĩnh Nữ',
    subname: '',
    shortName: 'Giao Lĩnh Nữ',
    gender: 'nu',
    badge: '',
    category: 'giaolinh',
    era: 'Thời Lý - Trần - Lê',
    desc: 'Biến thể Áo Giao Lĩnh Thiên Thanh phối búi tóc mộc mạc cài trâm, vạt áo chéo viền kem thanh lịch buông dài qua gối, toát lên phong thái đoan trang của nàng thơ dạo hoa thưởng ngoạn.',
    historicalNote: 'Dạng vạt chéo kết hợp dải đai ngọc đới buông dài là hình tượng y phục nữ giới tiêu biểu được ghi chép qua các văn bản cổ và tượng điêu khắc thời Lý - Trần.',
    accentColor: '#5B86AB',
    defaultColors: {
      tunic: '#B3CEE5',
      pants: '#F8F9FA',
      sash: '#FFFDD0'
    },
    targets: [
      { id: 0, label: 'Thân áo mây trời' },
      { id: 1, label: 'Nội y / Váy lụa' },
      { id: 2, label: 'Dải thắt lưng ngọc' }
    ]
  },
  {
    id: 'ao_tac_do_son_bun',
    name: 'Viên Lĩnh Nữ',
    subname: '',
    shortName: 'Viên Lĩnh Nữ',
    gender: 'nu',
    badge: '',
    category: 'nguthan',
    era: 'Triều Nguyễn - Lễ Cưới Cô Dâu',
    desc: 'Biến thể Áo Tấc đỏ son tay thụng phối kiểu tóc búi cài trâm hoa truyền thống, khoe trọn nét duyên dáng rạng rỡ, tươi tắn và quý phái của các cô dâu hay tiểu thư đài các trong ngày vu quy.',
    historicalNote: 'Tay áo thụng dài che kín hai bàn tay khi hành lễ bái gia tiên, thể hiện phong thái đoan trang, khiêm cung và tôn trọng lễ nghĩa gia đình truyền thống.',
    accentColor: '#C42B3E',
    defaultColors: {
      tunic: '#A3202F',
      pants: '#23407A',
      sash: '#E3B778'
    },
    targets: [
      { id: 0, label: 'Thân áo đỏ son' },
      { id: 1, label: 'Quần lụa lam thẫm' },
      { id: 2, label: 'Cúc & Trâm hoa' }
    ]
  },
  {
    id: 'bach_y_cong_chua',
    name: 'Hầu Đồng',
    subname: 'Khăn Chầu Áo Ngự',
    shortName: 'Hầu Đồng',
    gender: 'nu',
    badge: 'Khăn Chầu Áo Ngự',
    category: 'hoangtrieu',
    era: 'Nghi Lễ Tứ Phủ - Tín Ngưỡng Thờ Mẫu',
    desc: 'Trang phục nghi lễ Hầu Đồng (Khăn chầu áo ngự) lộng lẫy và linh thiêng, thêu hoa văn sen mây sóng nước, kết hợp dải lụa thắt đai ngọc, chuỗi hạt kim ngọc cùng mão miện trâm cài hoa ngọc uy nghiêm.',
    historicalNote: 'Nghi lễ Chầu văn Hầu Đồng trong Tín ngưỡng thờ Mẫu Tam phủ của người Việt là Di sản văn hóa phi vật thể đại diện của nhân loại được UNESCO công nhận, mang đậm bản sắc tâm linh và nghệ thuật tạo hình dân gian.',
    accentColor: '#2E9B73',
    defaultColors: {
      tunic: '#FFFFFF',
      pants: '#FAFAFA',
      sash: '#2E9B73'
    },
    targets: [
      { id: 0, label: 'Thân áo ngự' },
      { id: 1, label: 'Quần lụa' },
      { id: 2, label: 'Đai ngọc' }
    ]
  }
];

// Preset Color Palettes (Image 1)
export interface ColorPalettePreset {
  id: string;
  name: string;
  inner: string;
  outer: string;
  pants: string;
}

export const COLOR_PALETTES: ColorPalettePreset[] = [
  {
    id: 'hoang_trieu',
    name: 'Hoàng Triều Quý Phái',
    inner: '#F5B017',
    outer: '#C02428',
    pants: '#FFFFFF'
  },
  {
    id: 'co_do',
    name: 'Cố Đô Trầm Mặc',
    inner: '#E5D3BD',
    outer: '#6B2D5C',
    pants: '#FFFFFF'
  },
  {
    id: 'truc_lam',
    name: 'Trúc Lâm Thanh Nhã',
    inner: '#CBB484',
    outer: '#275B44',
    pants: '#26282A'
  },
  {
    id: 'sen_hong',
    name: 'Sen Hồng Đồng Nội',
    inner: '#FCE4E8',
    outer: '#D65C78',
    pants: '#3A2E2F'
  },
  {
    id: 'cyberfolk',
    name: 'Gen Z Cyberfolk',
    inner: '#F85F64',
    outer: '#20508F',
    pants: '#1E2838'
  },
  {
    id: 'tram_huong',
    name: 'Trầm Hương Nhật Nguyệt',
    inner: '#EFE5D7',
    outer: '#906E4D',
    pants: '#D6A734'
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<'tab1' | 'tab2'>('tab1');

  // Sub-tabs on Right Control Panel of Trang 1 (Trang phục / Màu sắc / Phụ kiện / Gen Z)
  const [activeSubTab, setActiveSubTab] = useState<'outfit' | 'color' | 'accessories' | 'genz'>('outfit');

  // Primary Gender Filter: 'all' | 'nam' | 'nu'
  const [selectedGender, setSelectedGender] = useState<'all' | 'nam' | 'nu'>('all');

  // Secondary Category Filter: 'all' | 'hoangtrieu' | 'nguthan' | 'giaolinh'
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Selected Model State
  const [selectedModelIdx, setSelectedModelIdx] = useState<number>(0);
  const currentModel = OUTFIT_MODELS[selectedModelIdx];

  // Selected Preset Palette
  const [selectedPaletteId, setSelectedPaletteId] = useState<string | null>(null);

  // Customizer state
  const [selectedColorTarget, setSelectedColorTarget] = useState<number>(0);

  // Traditional Accessories State (Image 2)
  const [selectedHeadwear, setSelectedHeadwear] = useState<string>('none');
  const [selectedFootwear, setSelectedFootwear] = useState<string>('hai_theu');
  const [selectedJewelry, setSelectedJewelry] = useState<string[]>(['kieng_co']);
  const [selectedHandheld, setSelectedHandheld] = useState<string>('none');

  // Gen Z Modern Accessories State (Image 3)
  const [selectedGenZAccessories, setSelectedGenZAccessories] = useState<string[]>([]);

  // Colors customization
  const [tunicColor, setTunicColor] = useState<string>(currentModel.defaultColors.tunic);
  const [pantsColor, setPantsColor] = useState<string>(currentModel.defaultColors.pants);
  const [sashColor, setSashColor] = useState<string>(currentModel.defaultColors.sash);
  const [useCustomColors, setUseCustomColors] = useState<boolean>(false);
  const [isZoomed, setIsZoomed] = useState<boolean>(false);

  // Gallery preview modal state (for Trang 2)
  const [previewModalIdx, setPreviewModalIdx] = useState<number | null>(null);

  const handleSelectModel = (idx: number) => {
    setSelectedModelIdx(idx);
    const targetModel = OUTFIT_MODELS[idx];
    setUseCustomColors(false);
    setSelectedPaletteId(null);
    setTunicColor(targetModel.defaultColors.tunic);
    setPantsColor(targetModel.defaultColors.pants);
    setSashColor(targetModel.defaultColors.sash);
    setSelectedColorTarget(0);
  };

  const handleSwitchGender = (gender: 'all' | 'nam' | 'nu') => {
    setSelectedGender(gender);
    if (gender !== 'all') {
      const firstMatchIdx = OUTFIT_MODELS.findIndex((m) => m.gender === gender);
      if (firstMatchIdx !== -1) {
        handleSelectModel(firstMatchIdx);
      }
    }
  };

  const handleApplyPalette = (palette: ColorPalettePreset) => {
    setSelectedPaletteId(palette.id);
    setUseCustomColors(true);
    setSashColor(palette.inner);
    setTunicColor(palette.outer);
    setPantsColor(palette.pants);
  };

  const toggleJewelry = (id: string) => {
    setSelectedJewelry((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleGenZAccessory = (id: string) => {
    setSelectedGenZAccessories((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Palette colors for customization
  const neutralColors = [
    { hex: '#1A1A1A', label: 'Đen huyền' },
    { hex: '#8B1A1A', label: 'Đỏ son / Chu' },
    { hex: '#A3202F', label: 'Đỏ thắm lễ hội' },
    { hex: '#F6D36A', label: 'Vàng hoàng kim' },
    { hex: '#1F2A78', label: 'Xanh chàm cổ' },
    { hex: '#3F5A86', label: 'Lam chàm trầm' },
    { hex: '#8F7DB0', label: 'Tím mận chín' },
    { hex: '#B3CEE5', label: 'Xanh thiên thanh' },
    { hex: '#637A67', label: 'Xanh rêu nhã' },
    { hex: '#F8F9FA', label: 'Trắng sứ' }
  ];

  const handleSelectColor = (hex: string) => {
    setUseCustomColors(true);
    setSelectedPaletteId(null);
    if (selectedColorTarget === 0) {
      setTunicColor(hex);
    } else if (selectedColorTarget === 1) {
      setPantsColor(hex);
    } else {
      setSashColor(hex);
    }
  };

  const handleResetColors = () => {
    setUseCustomColors(false);
    setSelectedPaletteId(null);
    setTunicColor(currentModel.defaultColors.tunic);
    setPantsColor(currentModel.defaultColors.pants);
    setSashColor(currentModel.defaultColors.sash);
  };

  // Helper to render the appropriate model component
  const renderModelView = (modelIdx: number, customColorsActive = useCustomColors) => {
    const model = OUTFIT_MODELS[modelIdx];
    if (!model) return <GiaoLinhNam />;

    switch (model.id) {
      case 'giao_linh_nam':
        return (
          <GiaoLinhNam
            robeColor={tunicColor}
            skirtColor={pantsColor}
            collarColor={sashColor}
            useCustomColors={customColorsActive}
          />
        );
      case 'hoang_bao_long_trieu':
        return (
          <HoangBaoLongTrieu
            robeColor={tunicColor}
            useCustomColors={customColorsActive}
          />
        );
      case 'ngu_than_xanh_cham':
        return (
          <NguThanXanhCham
            robeColor={tunicColor}
            pantsColor={pantsColor}
            useCustomColors={customColorsActive}
          />
        );
      case 'ngu_than_tu_sac':
        return (
          <NguThanTuSac
            robeColor={tunicColor}
            pantsColor={pantsColor}
            useCustomColors={customColorsActive}
          />
        );
      case 'ngu_than_bich_thuy':
        return (
          <NguThanBichThuy
            robeColor={tunicColor}
            pantsColor={pantsColor}
            sashColor={sashColor}
            useCustomColors={customColorsActive}
          />
        );
      case 'ao_doi_kham_lam_hong':
        return (
          <AoDoiKhamLamHong
            robeColor={tunicColor}
            innerRobeColor={pantsColor}
            pantsColor={sashColor}
            useCustomColors={customColorsActive}
          />
        );
      case 'ao_tac_do_son_khan':
        return (
          <AoTacDoSon
            showBun={false}
            robeColor={tunicColor}
            pantsColor={pantsColor}
            useCustomColors={customColorsActive}
          />
        );
      case 'phuong_bao_hoang_hau':
        return (
          <PhuongBaoHoangHau
            robeColor={tunicColor}
            skirtColor={pantsColor}
            sashColor={sashColor}
            useCustomColors={customColorsActive}
          />
        );
      case 'le_phuc_ngu_sac_hat':
        return (
          <LePhucNguSac
            showHat={true}
            robeColor={tunicColor}
            skirtColor={pantsColor}
            useCustomColors={customColorsActive}
          />
        );
      case 'le_phuc_ngu_sac_nohat':
        return (
          <LePhucNguSac
            showHat={false}
            robeColor={tunicColor}
            skirtColor={pantsColor}
            useCustomColors={customColorsActive}
          />
        );
      case 'giao_linh_thien_thanh':
        return (
          <GiaoLinhThienThanh
            showBun={false}
            robeColor={tunicColor}
            collarColor={pantsColor}
            beltColor={sashColor}
            useCustomColors={customColorsActive}
          />
        );
      case 'giao_linh_thien_thanh_bun':
        return (
          <GiaoLinhThienThanh
            showBun={true}
            robeColor={tunicColor}
            collarColor={pantsColor}
            beltColor={sashColor}
            useCustomColors={customColorsActive}
          />
        );
      case 'ao_tac_do_son_bun':
        return (
          <AoTacDoSon
            showBun={true}
            robeColor={tunicColor}
            pantsColor={pantsColor}
            useCustomColors={customColorsActive}
          />
        );
      case 'ao_tac_nu_toc_dai':
        return (
          <AoTacNuTocDai
            robeColor={tunicColor}
            pantsColor={pantsColor}
            sashColor={sashColor}
            useCustomColors={customColorsActive}
          />
        );
      case 'bach_y_cong_chua':
        return (
          <BachYNu
            robeColor={tunicColor}
            pantsColor={pantsColor}
            sashColor={sashColor}
            useCustomColors={customColorsActive}
          />
        );
      default:
        return <GiaoLinhNam />;
    }
  };

  const filteredModels = OUTFIT_MODELS.map((item, originalIdx) => ({
    ...item,
    originalIdx
  })).filter((item) => {
    const matchGender = selectedGender === 'all' || item.gender === selectedGender;
    const matchCat = selectedCategory === 'all' || item.category === selectedCategory;
    return matchGender && matchCat;
  });

  const maleModels = OUTFIT_MODELS.map((item, originalIdx) => ({
    ...item,
    originalIdx
  })).filter((m) => m.gender === 'nam');

  const femaleModels = OUTFIT_MODELS.map((item, originalIdx) => ({
    ...item,
    originalIdx
  })).filter((m) => m.gender === 'nu');

  // Label map for active accessories
  const headwearLabels: Record<string, string> = {
    none: 'Không đội đầu',
    non_ba_tam: 'Nón ba tầm',
    non_dau: 'Nón dấu',
    non_la: 'Nón lá',
    khan_vanh_day: 'Khăn vành dây',
    khan_xep: 'Khăn xếp'
  };

  const footwearLabels: Record<string, string> = {
    hai_theu: 'Hài thêu',
    guoc_moc: 'Guốc mộc',
    sneaker: 'Sneaker'
  };

  const handheldLabels: Record<string, string> = {
    none: 'Không cầm đồ',
    dan_nguyet: 'Đàn nguyệt',
    o_du: 'Ô (Dù)',
    quat: 'Quạt'
  };

  const genzLabels: Record<string, string> = {
    may_anh: 'Máy ảnh',
    kinh_ram: 'Kính râm',
    tui_xach: 'Túi xách',
    tai_nghe: 'Tai nghe trùm đầu',
    dong_ho: 'Đồng hồ'
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-slate-100 text-slate-800 font-sans">
      {/* HEADER & TAB NAVIGATION */}
      <header className="w-full bg-white border-b border-slate-200 px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 sticky top-0 z-30 shadow-2xs">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-600 via-rose-700 to-indigo-900 flex items-center justify-center text-white text-xs font-bold shadow-xs">
            <Crown className="w-4 h-4 text-amber-200" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm text-slate-900">
                Studio Phối Cổ Phục Việt
              </span>
              <span className="bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full">
                {OUTFIT_MODELS.length} Mẫu Cổ Phục • Bảng Màu • Phụ Kiện • Gen Z
              </span>
            </div>
            <span className="text-[11px] text-slate-500 font-normal hidden sm:inline">
              {maleModels.length} Mẫu Cổ Phục Nam & {femaleModels.length} Mẫu Cổ Phục Nữ Chuẩn Lịch Sử
            </span>
          </div>
        </div>

        {/* Tab Switcher: Trang 1 / Trang 2 */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
          <button
            type="button"
            onClick={() => setActiveTab('tab1')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'tab1'
                ? 'bg-white text-slate-900 shadow-2xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Trang 1: Phòng Thử Đồ</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('tab2')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'tab2'
                ? 'bg-white text-slate-900 shadow-2xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Trang 2: Đại Triển Lãm Nam - Nữ</span>
          </button>
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 w-full p-4 sm:p-6 flex flex-col items-center justify-center">
        {activeTab === 'tab1' ? (
          /* TRANG 1: 42% BÊN TRÁI (HIỂN THỊ MODEL) + 58% BÊN PHẢI (4 TAB ĐIỀU KHIỂN) */
          <div className="w-full max-w-6xl bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
            {/* Top Frame Bar */}
            <div className="w-full px-4 py-2.5 bg-slate-50/80 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              </div>
              <span className="text-[11px] text-slate-600 font-medium flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>
                  Đang thử đồ:{' '}
                  <strong className="text-slate-900">{currentModel.name}</strong>
                  {currentModel.subname ? ` (${currentModel.subname})` : ''} •{' '}
                  <span
                    className={`font-semibold ${
                      currentModel.gender === 'nam' ? 'text-blue-700' : 'text-rose-700'
                    }`}
                  >
                    [{currentModel.gender === 'nam' ? 'Cổ Phục Nam' : 'Cổ Phục Nữ'}]
                  </span>{' '}
                  • {currentModel.era}
                </span>
              </span>
              <div className="text-[11px] text-slate-500 hidden sm:block">
                Vector chuẩn tỉ lệ di sản
              </div>
            </div>

            {/* Split View: 42% Left + 58% Right */}
            <div className="w-full p-4 sm:p-6 flex flex-col lg:flex-row gap-6">
              {/* 42% BÊN TRÁI: GIAO DIỆN HIỂN THỊ MODEL ĐANG CHỌN */}
              <div className="w-full lg:w-[42%] min-h-[580px] rounded-2xl bg-[#F7F4EE] border border-[#E9E3D8] p-4 sm:p-5 flex flex-col items-center justify-between relative shadow-2xs overflow-hidden">
                {/* Top Viewport Indicator */}
                <div className="w-full flex justify-between items-center text-[11px] text-stone-600 z-10">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-stone-900 bg-white/90 px-3 py-1 rounded-full border border-stone-200/80 shadow-2xs flex items-center gap-1">
                      {currentModel.gender === 'nam' ? (
                        <User className="w-3 h-3 text-blue-600 inline" />
                      ) : (
                        <HeartHandshake className="w-3 h-3 text-rose-500 inline" />
                      )}
                      {currentModel.name}
                    </span>
                    {currentModel.subname ? (
                      <span
                        className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${
                          currentModel.gender === 'nam'
                            ? 'bg-blue-50 text-blue-800 border-blue-200'
                            : 'bg-rose-50 text-rose-800 border-rose-200'
                        }`}
                      >
                        {currentModel.subname}
                      </span>
                    ) : null}
                  </div>

                  <div className="flex items-center gap-1 bg-white/90 px-1.5 py-0.5 rounded-lg border border-stone-200/80">
                    <button
                      type="button"
                      onClick={() => setIsZoomed(!isZoomed)}
                      className="p-1 hover:text-stone-900 cursor-pointer text-stone-600 transition-colors"
                      title={isZoomed ? 'Thu nhỏ' : 'Phóng to'}
                    >
                      {isZoomed ? <ZoomOut className="w-3.5 h-3.5" /> : <ZoomIn className="w-3.5 h-3.5" />}
                    </button>
                    {(useCustomColors || selectedPaletteId) && (
                      <button
                        type="button"
                        onClick={handleResetColors}
                        className="p-1 hover:text-stone-900 cursor-pointer text-stone-600 transition-colors flex items-center gap-1 text-[10px]"
                        title="Về màu chuẩn gốc"
                      >
                        <RefreshCw className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Model Graphic Canvas */}
                <div
                  className={`relative flex-1 w-full flex items-center justify-center py-2 transition-transform duration-300 ${
                    isZoomed ? 'scale-115' : 'scale-100'
                  }`}
                >
                  {renderModelView(selectedModelIdx)}
                  <AccessoryVisuals
                    modelId={currentModel.id}
                    gender={currentModel.gender}
                    headwear={selectedHeadwear}
                    footwear={selectedFootwear}
                    jewelry={selectedJewelry}
                    handheld={selectedHandheld}
                    genz={selectedGenZAccessories}
                  />
                </div>

                {/* Applied Accessories Badges Overlay on Model Box */}
                {(selectedHeadwear !== 'none' ||
                  selectedFootwear !== 'hai_theu' ||
                  selectedJewelry.length > 0 ||
                  selectedHandheld !== 'none' ||
                  selectedGenZAccessories.length > 0) && (
                  <div className="w-full z-10 py-1.5 px-2 bg-white/80 backdrop-blur-xs rounded-xl border border-stone-200/70 mb-2 flex items-center gap-1 flex-wrap text-[10px] text-stone-700">
                    <span className="font-bold text-stone-900 flex items-center gap-0.5">
                      <SlidersHorizontal className="w-2.5 h-2.5 text-amber-700" />
                      <span>Phụ kiện:</span>
                    </span>
                    {selectedHeadwear !== 'none' && (
                      <span className="bg-amber-100/90 text-amber-900 px-1.5 py-0.2 rounded border border-amber-200">
                        {headwearLabels[selectedHeadwear]}
                      </span>
                    )}
                    {selectedFootwear !== 'hai_theu' && (
                      <span className="bg-stone-100 text-stone-800 px-1.5 py-0.2 rounded border border-stone-200">
                        {footwearLabels[selectedFootwear]}
                      </span>
                    )}
                    {selectedJewelry.map((j) => (
                      <span
                        key={j}
                        className="bg-yellow-100 text-yellow-900 px-1.5 py-0.2 rounded border border-yellow-200"
                      >
                        {j === 'kieng_co' ? 'Kiềng cổ' : 'Trâm cài'}
                      </span>
                    ))}
                    {selectedHandheld !== 'none' && (
                      <span className="bg-blue-100 text-blue-900 px-1.5 py-0.2 rounded border border-blue-200">
                        {handheldLabels[selectedHandheld]}
                      </span>
                    )}
                    {selectedGenZAccessories.map((g) => (
                      <span
                        key={g}
                        className="bg-indigo-100 text-indigo-900 px-1.5 py-0.2 rounded border border-indigo-200 font-medium"
                      >
                        ✨ {genzLabels[g]}
                      </span>
                    ))}
                  </div>
                )}

                {/* Bottom Status & Color Mode Toggle */}
                <div className="w-full flex items-center justify-between z-10 pt-2 border-t border-stone-200/80">
                  <div className="flex flex-col">
                    <span className="text-[11px] font-semibold text-stone-800">
                      {selectedPaletteId
                        ? `Phối màu: ${
                            COLOR_PALETTES.find((p) => p.id === selectedPaletteId)?.name
                          }`
                        : useCustomColors
                        ? 'Đang phối màu tùy chỉnh'
                        : 'Màu truyền thống nguyên bản'}
                    </span>
                    <span className="text-[10px] text-stone-500">
                      {useCustomColors || selectedPaletteId
                        ? 'Nhấn reset để về màu gốc'
                        : 'Màu sắc lưu truyền lịch sử'}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      if (useCustomColors || selectedPaletteId) {
                        handleResetColors();
                      } else {
                        setActiveSubTab('color');
                      }
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold shadow-2xs cursor-pointer transition-all ${
                      useCustomColors || selectedPaletteId
                        ? 'bg-amber-600 text-white hover:bg-amber-700'
                        : 'bg-white text-stone-700 border border-stone-300 hover:bg-stone-50'
                    }`}
                  >
                    {useCustomColors || selectedPaletteId ? 'Xem màu gốc' : 'Đổi bảng màu'}
                  </button>
                </div>
              </div>

              {/* 58% BÊN PHẢI: BẢNG ĐIỀU KHIỂN CHÍNH (4 MỤC: TRANG PHỤC · MÀU SẮC · PHỤ KIỆN · GEN Z) */}
              <div className="w-full lg:w-[58%] flex flex-col justify-between space-y-4">
                {/* 4-SUBTAB NAVIGATION BAR (Exact layout as User Screenshots) */}
                <div className="grid grid-cols-4 gap-1 bg-[#EEF2F6] p-1.5 rounded-2xl border border-slate-200/70">
                  <button
                    type="button"
                    onClick={() => setActiveSubTab('outfit')}
                    className={`py-2 px-2 text-center text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                      activeSubTab === 'outfit'
                        ? 'bg-white text-slate-900 shadow-xs font-bold'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Trang phục
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveSubTab('color')}
                    className={`py-2 px-2 text-center text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                      activeSubTab === 'color'
                        ? 'bg-white text-slate-900 shadow-xs font-bold'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Màu sắc
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveSubTab('accessories')}
                    className={`py-2 px-2 text-center text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                      activeSubTab === 'accessories'
                        ? 'bg-white text-slate-900 shadow-xs font-bold'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Phụ kiện
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveSubTab('genz')}
                    className={`py-2 px-2 text-center text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                      activeSubTab === 'genz'
                        ? 'bg-white text-slate-900 shadow-xs font-bold'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Gen Z
                  </button>
                </div>

                {/* ================= CONTENT OF SUB-TAB 1: TRANG PHỤC ================= */}
                {activeSubTab === 'outfit' && (
                  <div className="space-y-3 animate-in fade-in duration-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                          <Shirt className="w-4 h-4 text-amber-600" />
                          <span>Danh mục Cổ Phục ({OUTFIT_MODELS.length} mẫu)</span>
                        </h3>
                        <p className="text-xs text-slate-500">
                          Phân nhóm theo <strong>{maleModels.length} Mẫu Nam</strong> & <strong>{femaleModels.length} Mẫu Nữ</strong>
                        </p>
                      </div>
                      <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
                        Mẫu {selectedModelIdx + 1} / {OUTFIT_MODELS.length}
                      </span>
                    </div>

                    {/* MAIN GENDER TABS: NAM / NỮ */}
                    <div className="grid grid-cols-3 gap-1.5 bg-slate-100 p-1.5 rounded-xl text-xs font-semibold">
                      <button
                        type="button"
                        onClick={() => handleSwitchGender('all')}
                        className={`py-2 rounded-lg cursor-pointer transition-all text-center flex items-center justify-center gap-1.5 ${
                          selectedGender === 'all'
                            ? 'bg-white text-slate-900 shadow-2xs font-bold'
                            : 'text-slate-500 hover:text-slate-800'
                        }`}
                      >
                        <Crown className="w-3.5 h-3.5 text-amber-600" />
                        <span>Tất cả ({OUTFIT_MODELS.length})</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleSwitchGender('nam')}
                        className={`py-2 rounded-lg cursor-pointer transition-all text-center flex items-center justify-center gap-1.5 ${
                          selectedGender === 'nam'
                            ? 'bg-blue-600 text-white shadow-xs font-bold'
                            : 'text-slate-600 hover:text-blue-700 hover:bg-blue-50/50'
                        }`}
                      >
                        <User className="w-3.5 h-3.5" />
                        <span>👦 Cổ Phục Nam ({maleModels.length})</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleSwitchGender('nu')}
                        className={`py-2 rounded-lg cursor-pointer transition-all text-center flex items-center justify-center gap-1.5 ${
                          selectedGender === 'nu'
                            ? 'bg-rose-600 text-white shadow-xs font-bold'
                            : 'text-slate-600 hover:text-rose-700 hover:bg-rose-50/50'
                        }`}
                      >
                        <HeartHandshake className="w-3.5 h-3.5" />
                        <span>👧 Cổ Phục Nữ ({femaleModels.length})</span>
                      </button>
                    </div>

                    {/* Secondary Category Filter */}
                    <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200/80 p-1 rounded-xl text-xs overflow-x-auto">
                      <span className="text-[10px] text-slate-400 font-medium px-2 shrink-0">
                        Kiểu dáng:
                      </span>
                      {[
                        { id: 'all', label: 'Tất cả kiểu' },
                        { id: 'hoangtrieu', label: 'Hoàng Triều & Lễ Phục' },
                        { id: 'nguthan', label: 'Ngũ Thân & Áo Tấc' },
                        { id: 'giaolinh', label: 'Áo Giao Lĩnh' }
                      ].map((cat) => (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => setSelectedCategory(cat.id)}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-medium cursor-pointer transition-all whitespace-nowrap ${
                            selectedCategory === cat.id
                              ? 'bg-slate-900 text-white shadow-2xs font-semibold'
                              : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          {cat.label}
                        </button>
                      ))}
                    </div>

                    {/* Outfit Model Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-56 overflow-y-auto pr-1">
                      {filteredModels.map((item) => {
                        const isSelected = selectedModelIdx === item.originalIdx;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => handleSelectModel(item.originalIdx)}
                            className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all flex flex-col justify-between relative overflow-hidden ${
                              isSelected
                                ? item.gender === 'nam'
                                  ? 'border-blue-600 bg-blue-50/60 shadow-xs ring-1 ring-blue-600'
                                  : 'border-rose-500 bg-rose-50/60 shadow-xs ring-1 ring-rose-500'
                                : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/60'
                            }`}
                          >
                            <div className="flex items-start justify-between gap-1 mb-1">
                              <div className="flex items-center gap-1">
                                <span
                                  className="w-3.5 h-3.5 rounded-full border border-black/20 shrink-0"
                                  style={{ backgroundColor: item.accentColor }}
                                />
                                <span
                                  className={`text-[9px] font-bold px-1.5 py-0.2 rounded ${
                                    item.gender === 'nam'
                                      ? 'bg-blue-100 text-blue-800'
                                      : 'bg-rose-100 text-rose-800'
                                  }`}
                                >
                                  {item.gender === 'nam' ? 'Nam' : 'Nữ'}
                                </span>
                              </div>
                              {isSelected ? (
                                <span
                                  className={`w-4 h-4 rounded-full text-white flex items-center justify-center text-[10px] ${
                                    item.gender === 'nam' ? 'bg-blue-600' : 'bg-rose-600'
                                  }`}
                                >
                                  <Check className="w-2.5 h-2.5" />
                                </span>
                              ) : (
                                <span className="text-[9.5px] text-slate-400 font-medium">
                                  #{item.originalIdx + 1}
                                </span>
                              )}
                            </div>
                            <div>
                              <span className="font-bold text-xs text-slate-900 block leading-tight line-clamp-1">
                                {item.name}
                              </span>
                              <span className="text-[9.5px] text-slate-500 block mt-0.5 line-clamp-1 min-h-[14px]">
                                {item.subname || ''}
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {/* Selected Model Description Banner */}
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-start gap-2.5">
                      <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <div className="text-xs space-y-1">
                        <div className="font-semibold text-slate-900 flex items-center gap-1.5">
                          <span>{currentModel.name}</span>
                          {currentModel.subname && (
                            <span className="text-slate-500 text-[11px] font-normal">
                              ({currentModel.subname})
                            </span>
                          )}
                          <span
                            className={`text-[10px] px-2 py-0.2 rounded-full font-bold ${
                              currentModel.gender === 'nam'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-rose-100 text-rose-800'
                            }`}
                          >
                            {currentModel.gender === 'nam' ? 'Cổ Phục Nam' : 'Cổ Phục Nữ'}
                          </span>
                        </div>
                        <p className="text-slate-600 text-[11px] leading-relaxed">
                          {currentModel.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* ================= CONTENT OF SUB-TAB 2: MÀU SẮC (IMAGE 1) ================= */}
                {activeSubTab === 'color' && (
                  <div className="space-y-4 animate-in fade-in duration-200">
                    <div>
                      <h3 className="text-xs font-semibold text-slate-800">
                        Phong cách phối màu (Lót trong · Áo ngoài · Quần)
                      </h3>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Chọn bảng màu mẫu chuẩn thẩm mỹ hoặc tự do pha màu chi tiết bên dưới
                      </p>
                    </div>

                    {/* 6 Preset Palettes Grid (Exact Match to Image 1) */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {COLOR_PALETTES.map((palette) => {
                        const isSelected = selectedPaletteId === palette.id;
                        return (
                          <button
                            key={palette.id}
                            type="button"
                            onClick={() => handleApplyPalette(palette)}
                            className={`p-3 rounded-2xl border text-center cursor-pointer transition-all flex flex-col items-center justify-between gap-2.5 shadow-2xs ${
                              isSelected
                                ? 'bg-[#FFF9EC] border-[#B8860B] ring-1 ring-[#B8860B] shadow-xs'
                                : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/80'
                            }`}
                          >
                            {/* Color Bar Pill (3 parts: Lót trong · Áo ngoài · Quần) */}
                            <div className="w-full h-8 rounded-xl overflow-hidden flex border border-slate-300/80 shadow-2xs">
                              <div
                                className="h-full flex-1"
                                style={{ backgroundColor: palette.inner }}
                                title={`Lót trong: ${palette.inner}`}
                              />
                              <div
                                className="h-full flex-1"
                                style={{ backgroundColor: palette.outer }}
                                title={`Áo ngoài: ${palette.outer}`}
                              />
                              <div
                                className="h-full flex-1"
                                style={{ backgroundColor: palette.pants }}
                                title={`Quần / Váy: ${palette.pants}`}
                              />
                            </div>

                            <span
                              className={`text-xs font-medium ${
                                isSelected ? 'text-amber-950 font-bold' : 'text-slate-800'
                              }`}
                            >
                              {palette.name}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Fine-tune Custom Colors Section */}
                    <div className="space-y-2.5 pt-3 border-t border-slate-200">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                          <Palette className="w-3.5 h-3.5 text-slate-700" />
                          <span>Pha màu từng bộ phận chi tiết:</span>
                        </span>
                        {(useCustomColors || selectedPaletteId) && (
                          <button
                            type="button"
                            onClick={handleResetColors}
                            className="text-[11px] text-amber-700 font-medium hover:underline cursor-pointer"
                          >
                            Khôi phục màu gốc
                          </button>
                        )}
                      </div>

                      {/* Target Selector */}
                      <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs">
                        {currentModel.targets.map((tgt) => (
                          <button
                            key={tgt.id}
                            type="button"
                            onClick={() => setSelectedColorTarget(tgt.id)}
                            className={`flex-1 py-1.5 rounded-lg text-center cursor-pointer transition-all ${
                              selectedColorTarget === tgt.id
                                ? 'bg-white text-slate-900 shadow-2xs font-bold'
                                : 'text-slate-600 hover:text-slate-900'
                            }`}
                          >
                            {tgt.label}
                          </button>
                        ))}
                      </div>

                      {/* Swatch circles */}
                      <div className="flex items-center gap-2 flex-wrap">
                        {neutralColors.map((color, idx) => {
                          const currentColor =
                            selectedColorTarget === 0
                              ? tunicColor
                              : selectedColorTarget === 1
                              ? pantsColor
                              : sashColor;
                          const isSelected =
                            useCustomColors &&
                            currentColor.toLowerCase() === color.hex.toLowerCase();

                          return (
                            <button
                              key={idx}
                              type="button"
                              title={color.label}
                              onClick={() => handleSelectColor(color.hex)}
                              style={{ backgroundColor: color.hex }}
                              className={`w-6.5 h-6.5 rounded-full border cursor-pointer transition-transform ${
                                isSelected
                                  ? 'border-slate-900 scale-115 shadow-xs ring-2 ring-slate-400'
                                  : 'border-black/15 hover:scale-110'
                              }`}
                            />
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {/* ================= CONTENT OF SUB-TAB 3: PHỤ KIỆN (IMAGE 2) ================= */}
                {activeSubTab === 'accessories' && (
                  <div className="space-y-4 max-h-[460px] overflow-y-auto pr-1 animate-in fade-in duration-200">
                    {/* 1. Đồ đội đầu */}
                    <div className="space-y-2">
                      <span className="text-xs font-semibold text-slate-800 block">Đồ đội đầu</span>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {[
                          { id: 'none', label: '✕ Không đội đầu' },
                          { id: 'non_ba_tam', label: 'Nón ba tầm' },
                          { id: 'non_dau', label: 'Nón dấu' },
                          { id: 'non_la', label: 'Nón lá' },
                          { id: 'khan_vanh_day', label: 'Khăn vành dây' },
                          { id: 'khan_xep', label: 'Khăn xếp' }
                        ].map((item) => {
                          const isSelected = selectedHeadwear === item.id;
                          return (
                            <button
                              key={item.id}
                              type="button"
                              onClick={() => setSelectedHeadwear(item.id)}
                              className={`py-2.5 px-3 rounded-xl border text-center text-xs font-medium cursor-pointer transition-all shadow-2xs ${
                                isSelected
                                  ? 'bg-[#FFF9EC] border-[#B8860B] text-amber-950 font-bold ring-1 ring-[#B8860B]'
                                  : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                              }`}
                            >
                              {item.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* 2. Giày dép */}
                    <div className="space-y-2 pt-2 border-t border-slate-100">
                      <span className="text-xs font-semibold text-slate-800 block">Giày dép</span>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { id: 'hai_theu', label: 'Hài thêu' },
                          { id: 'guoc_moc', label: 'Guốc mộc' },
                          { id: 'sneaker', label: 'Sneaker' }
                        ].map((item) => {
                          const isSelected = selectedFootwear === item.id;
                          return (
                            <button
                              key={item.id}
                              type="button"
                              onClick={() => setSelectedFootwear(item.id)}
                              className={`py-2.5 px-3 rounded-xl border text-center text-xs font-medium cursor-pointer transition-all shadow-2xs ${
                                isSelected
                                  ? 'bg-[#FFF9EC] border-[#B8860B] text-amber-950 font-bold ring-1 ring-[#B8860B]'
                                  : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                              }`}
                            >
                              {item.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* 3. Trang sức */}
                    <div className="space-y-2 pt-2 border-t border-slate-100">
                      <span className="text-xs font-semibold text-slate-800 block">Trang sức</span>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { id: 'kieng_co', label: 'Kiềng cổ' },
                          { id: 'tram_cai', label: 'Trâm cài' }
                        ].map((item) => {
                          const isSelected = selectedJewelry.includes(item.id);
                          return (
                            <button
                              key={item.id}
                              type="button"
                              onClick={() => toggleJewelry(item.id)}
                              className={`py-2.5 px-3 rounded-xl border text-center text-xs font-medium cursor-pointer transition-all shadow-2xs ${
                                isSelected
                                  ? 'bg-[#FFF9EC] border-[#B8860B] text-amber-950 font-bold ring-1 ring-[#B8860B]'
                                  : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                              }`}
                            >
                              {item.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* 4. Đồ cầm tay */}
                    <div className="space-y-2 pt-2 border-t border-slate-100">
                      <span className="text-xs font-semibold text-slate-800 block">Đồ cầm tay</span>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {[
                          { id: 'none', label: '✕ Không cầm đồ' },
                          { id: 'dan_nguyet', label: 'Đàn nguyệt' },
                          { id: 'o_du', label: 'Ô (Dù)' },
                          { id: 'quat', label: 'Quạt' }
                        ].map((item) => {
                          const isSelected = selectedHandheld === item.id;
                          return (
                            <button
                              key={item.id}
                              type="button"
                              onClick={() => setSelectedHandheld(item.id)}
                              className={`py-2.5 px-3 rounded-xl border text-center text-xs font-medium cursor-pointer transition-all shadow-2xs ${
                                isSelected
                                  ? 'bg-[#FFF9EC] border-[#B8860B] text-amber-950 font-bold ring-1 ring-[#B8860B]'
                                  : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                              }`}
                            >
                              {item.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {/* ================= CONTENT OF SUB-TAB 4: GEN Z (IMAGE 3) ================= */}
                {activeSubTab === 'genz' && (
                  <div className="space-y-4 animate-in fade-in duration-200">
                    <div>
                      <h3 className="text-xs font-semibold text-slate-800">
                        Phụ kiện hiện đại Gen Z
                      </h3>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Phối kết hợp phong cách Cyberfolk đương đại với cổ phục truyền thống
                      </p>
                    </div>

                    {/* Gen Z Accessories Grid (Exact match to Image 3) */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {[
                        { id: 'may_anh', label: 'Máy ảnh', icon: Camera },
                        { id: 'kinh_ram', label: 'Kính râm', icon: Glasses },
                        { id: 'tui_xach', label: 'Túi xách', icon: ShoppingBag },
                        { id: 'tai_nghe', label: 'Tai nghe trùm đầu', icon: Headphones },
                        { id: 'dong_ho', label: 'Đồng hồ', icon: Watch }
                      ].map((item) => {
                        const isSelected = selectedGenZAccessories.includes(item.id);
                        const Icon = item.icon;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => toggleGenZAccessory(item.id)}
                            className={`py-3 px-4 rounded-xl border text-center text-xs font-medium cursor-pointer transition-all flex items-center justify-center gap-2 shadow-2xs ${
                              isSelected
                                ? 'bg-indigo-50/80 border-indigo-600 text-indigo-950 font-bold ring-1 ring-indigo-500 shadow-xs'
                                : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                            }`}
                          >
                            <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-indigo-600' : 'text-slate-500'}`} />
                            <span>{item.label}</span>
                          </button>
                        );
                      })}
                    </div>

                    <div className="bg-indigo-50/50 border border-indigo-100 rounded-2xl p-4 text-xs text-indigo-900 flex items-start gap-2.5 mt-4">
                      <Sparkle className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                      <p className="text-[11px] leading-relaxed">
                        <strong>Xu hướng Việt Phục Gen Z:</strong> Sự giao thoa tinh tế giữa trang phục truyền thống nghìn năm và phụ kiện công nghệ đương đại giúp lan tỏa vẻ đẹp cổ phục vào đời sống trẻ một cách đầy cá tính và tự hào!
                      </p>
                    </div>
                  </div>
                )}

                {/* Quick Action Footer Buttons */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-200">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <span>Mục đang chọn:</span>
                    <strong className="text-slate-800">
                      {activeSubTab === 'outfit'
                        ? 'Trang phục'
                        : activeSubTab === 'color'
                        ? 'Bảng màu'
                        : activeSubTab === 'accessories'
                        ? 'Phụ kiện'
                        : 'Gen Z'}
                    </strong>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setActiveTab('tab2')}
                      className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50 cursor-pointer shadow-2xs flex items-center gap-1.5"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Xem cả 2 gian Triển Lãm</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const nextIdx = (selectedModelIdx + 1) % OUTFIT_MODELS.length;
                        handleSelectModel(nextIdx);
                      }}
                      className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 cursor-pointer shadow-2xs flex items-center gap-1.5"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                      <span>Mẫu kế tiếp</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Historical Note */}
            <div className="w-full bg-[#FDFCF9] px-6 py-3 border-t border-slate-200 text-center text-xs text-stone-600">
              <strong>Ý nghĩa văn hóa:</strong> {currentModel.historicalNote}
            </div>
          </div>
        ) : (
          /* TRANG 2: ĐẠI TRIỂN LÃM GOM RÕ RỆT THÀNH 2 PHẦN: CỔ PHỤC NAM & CỔ PHỤC NỮ */
          <div className="w-full max-w-6xl flex flex-col gap-8">
            {/* Gallery Header */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold text-slate-900">
                    Đại Triển Lãm Cổ Phục Nam & Nữ
                  </h2>
                  <span className="bg-amber-100 text-amber-800 text-xs font-bold px-2.5 py-0.5 rounded-full border border-amber-300">
                    2 Đại Sảnh Di Sản
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1 max-w-2xl">
                  Tổng hợp toàn bộ 14 kiệt tác cổ phục được phân định rõ ràng thành 2 khu triển lãm: <strong>Gian Cổ Phục Nam (7 bộ)</strong> và <strong>Gian Cổ Phục Nữ (7 bộ)</strong>. Nhấp vào để xem chi tiết lớn hoặc chuyển ngay vào phòng thử đồ.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('tab1')}
                  className="px-4 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors shadow-2xs shrink-0 flex items-center gap-2 cursor-pointer"
                >
                  <Layers className="w-4 h-4 text-amber-300" />
                  <span>Vào phòng thử đồ</span>
                </button>
              </div>
            </div>

            {/* PHẦN 1: GIAN TRIỂN LÃM CỔ PHỤC NAM (7 MẪU) */}
            <section className="space-y-4">
              <div className="flex items-center justify-between border-b border-blue-200 pb-2.5">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                      <span>Phần I: Bộ Sưu Tập Cổ Phục Nam</span>
                      <span className="bg-blue-100 text-blue-800 text-[11px] font-semibold px-2 py-0.5 rounded-full">
                        7 Mẫu Nam Giới
                      </span>
                    </h3>
                    <p className="text-xs text-slate-500">
                      Cổ Phục - Tế Nam Giao, Long Bào Đại Triều, Ngũ Thân Nam, Tấc Nam, Giao Lĩnh Nam & Viên Lĩnh Nam
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {maleModels.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow group ring-1 ring-blue-50"
                  >
                    {/* Top Bar */}
                    <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between bg-blue-50/40">
                      <span className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-blue-600" />
                        {item.name}
                      </span>
                      {item.subname ? (
                        <span className="text-[10px] font-semibold bg-blue-100 text-blue-800 border border-blue-200 px-2 py-0.5 rounded-full">
                          {item.subname}
                        </span>
                      ) : null}
                    </div>

                    {/* Visual Window */}
                    <div className="h-80 bg-[#F9F7F2] p-4 flex items-center justify-center relative overflow-hidden">
                      <div className="w-full h-full flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                        {renderModelView(item.originalIdx, false)}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4 flex flex-col justify-between flex-1 border-t border-slate-100 bg-white">
                      <div className="text-[11px] text-blue-900 font-semibold mb-1 flex items-center gap-1">
                        <Bookmark className="w-3 h-3 text-blue-600" />
                        <span>{item.era}</span>
                      </div>
                      <p className="text-xs text-slate-600 line-clamp-3 mb-4 leading-relaxed">
                        {item.desc}
                      </p>

                      <div className="flex items-center gap-2 pt-2">
                        <button
                          type="button"
                          onClick={() => setPreviewModalIdx(item.originalIdx)}
                          className="flex-1 py-2 px-3 rounded-xl border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Chi tiết</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            handleSelectModel(item.originalIdx);
                            setActiveTab('tab1');
                          }}
                          className="flex-1 py-2 px-3 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Thử đồ này</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* PHẦN 2: GIAN TRIỂN LÃM CỔ PHỤC NỮ (7 MẪU) */}
            <section className="space-y-4 pt-4">
              <div className="flex items-center justify-between border-b border-rose-200 pb-2.5">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-rose-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                    <HeartHandshake className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                      <span>Phần II: Bộ Sưu Tập Cổ Phục Nữ</span>
                      <span className="bg-rose-100 text-rose-800 text-[11px] font-semibold px-2 py-0.5 rounded-full">
                        {femaleModels.length} Mẫu Nữ Giới
                      </span>
                    </h3>
                    <p className="text-xs text-slate-500">
                      Phượng Bào Triều Nguyễn, Nhật Bình Nữ, Ngũ Thân Nữ, Giao Lĩnh Nữ, Viên Lĩnh Nữ & Hầu Đồng
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {femaleModels.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow group ring-1 ring-rose-50"
                  >
                    {/* Top Bar */}
                    <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between bg-rose-50/40">
                      <span className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                        <HeartHandshake className="w-3.5 h-3.5 text-rose-500" />
                        {item.name}
                      </span>
                      {item.subname ? (
                        <span className="text-[10px] font-semibold bg-rose-100 text-rose-800 border border-rose-200 px-2 py-0.5 rounded-full">
                          {item.subname}
                        </span>
                      ) : null}
                    </div>

                    {/* Visual Window */}
                    <div className="h-80 bg-[#F9F7F2] p-4 flex items-center justify-center relative overflow-hidden">
                      <div className="w-full h-full flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                        {renderModelView(item.originalIdx, false)}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4 flex flex-col justify-between flex-1 border-t border-slate-100 bg-white">
                      <div className="text-[11px] text-rose-900 font-semibold mb-1 flex items-center gap-1">
                        <Bookmark className="w-3 h-3 text-rose-600" />
                        <span>{item.era}</span>
                      </div>
                      <p className="text-xs text-slate-600 line-clamp-3 mb-4 leading-relaxed">
                        {item.desc}
                      </p>

                      <div className="flex items-center gap-2 pt-2">
                        <button
                          type="button"
                          onClick={() => setPreviewModalIdx(item.originalIdx)}
                          className="flex-1 py-2 px-3 rounded-xl border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Chi tiết</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            handleSelectModel(item.originalIdx);
                            setActiveTab('tab1');
                          }}
                          className="flex-1 py-2 px-3 rounded-xl bg-rose-600 text-white text-xs font-semibold hover:bg-rose-700 transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Thử đồ này</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}
      </main>

      {/* MODAL PREVIEW FOR GALLERY */}
      {previewModalIdx !== null && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl flex flex-col gap-4 border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-lg text-slate-900">
                    {OUTFIT_MODELS[previewModalIdx].name}
                  </h3>
                  {OUTFIT_MODELS[previewModalIdx].subname && (
                    <span className="text-sm text-slate-500 font-medium">
                      ({OUTFIT_MODELS[previewModalIdx].subname})
                    </span>
                  )}
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      OUTFIT_MODELS[previewModalIdx].gender === 'nam'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {OUTFIT_MODELS[previewModalIdx].gender === 'nam' ? 'Cổ Phục Nam' : 'Cổ Phục Nữ'}
                  </span>
                </div>
                <span className="text-xs text-amber-700 font-medium">
                  {OUTFIT_MODELS[previewModalIdx].era}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setPreviewModalIdx(null)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 flex items-center justify-center font-bold text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="h-[420px] bg-[#F7F4EE] rounded-2xl flex items-center justify-center p-4 border border-[#E9E3D8]">
              {renderModelView(previewModalIdx, false)}
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              {OUTFIT_MODELS[previewModalIdx].desc}
            </p>

            <div className="bg-amber-50 border border-amber-200/80 rounded-xl p-3 text-xs text-amber-900">
              <strong>Ý nghĩa văn hóa:</strong> {OUTFIT_MODELS[previewModalIdx].historicalNote}
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setPreviewModalIdx(null)}
                className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50 cursor-pointer"
              >
                Đóng
              </button>
              <button
                type="button"
                onClick={() => {
                  handleSelectModel(previewModalIdx);
                  setPreviewModalIdx(null);
                  setActiveTab('tab1');
                }}
                className={`px-5 py-2 rounded-xl text-white text-xs font-semibold cursor-pointer shadow-2xs ${
                  OUTFIT_MODELS[previewModalIdx].gender === 'nam'
                    ? 'bg-blue-600 hover:bg-blue-700'
                    : 'bg-rose-600 hover:bg-rose-700'
                }`}
              >
                Đưa vào phòng thử đồ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
