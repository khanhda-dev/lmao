/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Shuffle, Search } from 'lucide-react';
import { 
  GARMENTS, 
  HEADWEAR, 
  FOOTWEAR, 
  JEWELRY, 
  HANDHELD, 
  GEN_Z_ACCESSORIES, 
  COLOR_PRESETS,
  SPECIAL_GARMENTS,
  type Garment,
  type Headwear,
  type Footwear,
  type ColorPreset
} from './data/costumeData';
import { FemaleVienLinh, FemaleNhatBinh, FemaleAoTac, FemaleNguThan } from './components/FemaleCostumes';
import { MaleGiaoLinh, MaleAoTac, MaleVienLinh, MaleNguThan, MaleHands, MaleShoes } from './components/MaleCostumes';
import { SpecialLongBaoNam, SpecialQuanPhucNam, SpecialPhuongBaoNu, SpecialBachYNu } from './components/special';

export default function App() {
  // Navigation: 1 = Trang 1 (Phối đồ), 2 = Trang 2 (Cẩm nang thông tin)
  const [activePage, setActivePage] = useState<number>(1);

  // Model Gender: 'male' (Nam) | 'female' (Nữ)
  const [modelGender, setModelGender] = useState<'male' | 'female'>('male');

  // Slot 1: Garment selection (Trang phục phổ thông)
  const [selectedGarment, setSelectedGarment] = useState<Garment>(GARMENTS[2]); // Default: Ngũ thân tay chẽn

  // Slot Đặc biệt: Trang phục đặc biệt cố định nguyên bản (null nếu mặc đồ thường)
  const [selectedSpecialId, setSelectedSpecialId] = useState<string | null>(null);

  // Slot 2: Color customization (3 hex colors: lining, dress, pants)
  const [selectedPreset, setSelectedPreset] = useState<ColorPreset>(COLOR_PRESETS[0]);
  const [liningColor, setLiningColor] = useState<string>(COLOR_PRESETS[0].lining);
  const [dressColor, setDressColor] = useState<string>(COLOR_PRESETS[0].dress);
  const [pantsColor, setPantsColor] = useState<string>(COLOR_PRESETS[0].pants);

  // Slot 3: Traditional accessories
  const [selectedHeadwear, setSelectedHeadwear] = useState<Headwear | null>(HEADWEAR[4]); // Default: Khăn xếp
  const [selectedFootwear, setSelectedFootwear] = useState<Footwear>(FOOTWEAR[0]); // Default: Hài thêu
  const [selectedJewelry, setSelectedJewelry] = useState<string[]>(['kieng-co']); // Kiềng cổ
  const [selectedHandheld, setSelectedHandheld] = useState<string>('quat'); // Quạt

  // Slot 4: Gen Z modern accessories (5 items from PDF)
  const [selectedGenZ, setSelectedGenZ] = useState<string[]>(['kinh-ram']);

  // Builder Tab: 'garment' | 'color' | 'accessory' | 'genz'
  const [builderTab, setBuilderTab] = useState<'garment' | 'color' | 'accessory' | 'genz'>('garment');

  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);

  // Update CSS Variables on root whenever colors or footwear changes
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--dress', dressColor);
    root.style.setProperty('--lining', liningColor);
    root.style.setProperty('--pants', pantsColor);

    // Compute subtle tone variations for dress back and dress edge
    if (selectedPreset.dress === dressColor) {
      root.style.setProperty('--dress-back', selectedPreset.dressBack || '#E2A00E');
      root.style.setProperty('--dress-edge', selectedPreset.dressEdge || liningColor);
    } else {
      root.style.setProperty('--dress-back', dressColor);
      root.style.setProperty('--dress-edge', liningColor);
    }

    // Footwear styling
    root.style.setProperty('--shoe', selectedFootwear.shoeColor);
    root.style.setProperty('--sole', selectedFootwear.soleColor);
  }, [dressColor, liningColor, pantsColor, selectedFootwear, selectedPreset]);

  // Apply a color preset
  const handleApplyPreset = (preset: ColorPreset) => {
    setSelectedSpecialId(null);
    setSelectedPreset(preset);
    setLiningColor(preset.lining);
    setDressColor(preset.dress);
    setPantsColor(preset.pants);
  };

  // Select garment and apply its characteristic look
  const handleSelectGarment = (g: Garment) => {
    setSelectedSpecialId(null);
    setSelectedGarment(g);
  };

  // Select special garment (toggles on/off - chỉ hiện hoặc không hiện)
  const handleSelectSpecial = (id: string) => {
    setSelectedSpecialId(prev => (prev === id ? null : id));
  };

  // Toggle jewelry
  const handleToggleJewelry = (id: string) => {
    setSelectedSpecialId(null);
    setSelectedJewelry(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Toggle Gen Z item
  const handleToggleGenZ = (id: string) => {
    setSelectedSpecialId(null);
    setSelectedGenZ(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Randomize look
  const handleRandomRemix = () => {
    setSelectedSpecialId(null);
    const validGarments = GARMENTS.filter(g => modelGender === 'female' || g.id !== 'nhat-binh');
    const randomGarment = validGarments[Math.floor(Math.random() * validGarments.length)];
    const randomPreset = COLOR_PRESETS[Math.floor(Math.random() * COLOR_PRESETS.length)];
    const randomHead = Math.random() > 0.3 ? HEADWEAR[Math.floor(Math.random() * HEADWEAR.length)] : null;
    const randomFoot = FOOTWEAR[Math.floor(Math.random() * FOOTWEAR.length)];
    const randomGenZ = GEN_Z_ACCESSORIES.filter(() => Math.random() > 0.6).map(i => i.id);

    setSelectedGarment(randomGarment);
    handleApplyPreset(randomPreset);
    setSelectedHeadwear(randomHead);
    setSelectedFootwear(randomFoot);
    setSelectedGenZ(randomGenZ);
  };

  // Keydown for Esc to close lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && lightboxOpen) {
        setLightboxOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen]);

  // Toggle gender
  const handleToggleGender = () => {
    setModelGender(prev => {
      const nextGender = prev === 'male' ? 'female' : 'male';
      // Nếu đang mặc trang phục đặc biệt, chuyển sang trang phục đặc biệt tương ứng của giới tính mới
      if (selectedSpecialId) {
        if (nextGender === 'female') {
          if (selectedSpecialId === 'special-long-bao-nam') setSelectedSpecialId('special-phuong-bao-nu');
          else if (selectedSpecialId === 'special-quan-phuc-nam') setSelectedSpecialId('special-bach-y-nu');
          else setSelectedSpecialId('special-phuong-bao-nu');
        } else {
          if (selectedSpecialId === 'special-phuong-bao-nu') setSelectedSpecialId('special-long-bao-nam');
          else if (selectedSpecialId === 'special-bach-y-nu') setSelectedSpecialId('special-quan-phuc-nam');
          else setSelectedSpecialId('special-long-bao-nam');
        }
      } else {
        if (nextGender === 'male' && selectedGarment.id === 'nhat-binh') {
          const fallback = GARMENTS.find(g => g.id === 'ngu-than-tay-chen') || GARMENTS[0];
          setSelectedGarment(fallback);
        }
      }
      return nextGender;
    });
  };

  // Render Female Model wearing Traditional Costumes
  const renderFemaleModelSVG = (isLightbox: boolean = false) => (
    <div className="model model-female" id={isLightbox ? "lb-model" : "stage-model"}>
      <svg 
        viewBox="0 -18 310 567" 
        role="img" 
        aria-label={`Người mẫu nữ mặc ${selectedGarment.name}`}
        className="overflow-visible"
      >
        <g transform="translate(155, 0) scale(1.058) translate(-143.5, 0)">
          {/* 1. TÓC PHÍA SAU VÀ BÚI TÓC TRUYỀN THỐNG */}
          <path 
            d="M103.845 43.6051C103.426 19.9083 120.626 0.388443 142.262 0.00625526C163.899 -0.375933 181.747 16.7944 182.165 40.4912C182.364 51.7269 189.147 72.3167 182.879 80.8634C174.005 92.9628 155.156 85.619 143.778 85.82C131.337 86.0398 115.418 92.5689 104.527 82.2474C92.9734 71.2973 104.023 53.6755 103.845 43.6051Z" 
            fill="#20150B" 
          />

          {/* 2. CHÂN & GIÀY */}
          {/* Cổ chân da */}
          <path d="M183.206 462.634C194.81 462.106 204.664 471.044 205.267 482.645L205.626 489.558C206.26 501.745 196.55 511.974 184.346 511.974C172.577 511.974 163.037 502.433 163.037 490.664V483.741C163.037 472.445 171.921 463.147 183.206 462.634Z" fill="#FDBA90" />
          <path d="M104.068 462.634C92.4639 462.106 82.6097 471.044 82.0065 482.645L81.6471 489.558C81.0136 501.745 90.724 511.974 102.927 511.974C114.696 511.974 124.237 502.433 124.237 490.664V483.741C124.237 472.445 115.352 463.148 104.068 462.634Z" fill="#FDBA90" />

          {/* Giày phải */}
          <path 
            className="shoe"
            d="M211.913 494.049C211.167 493.322 210.165 492.915 209.123 492.915H162.422C160.213 492.915 158.422 494.706 158.422 496.915V510.411H228.717L211.913 494.049Z" 
            fill="var(--shoe)" 
          />
          <path 
            className="sole"
            d="M158.422 514.118C158.422 516.327 160.213 518.118 162.422 518.118H226.791C230.381 518.118 232.154 513.756 229.582 511.252L228.717 510.411H158.422V514.118Z" 
            fill="var(--sole)" 
          />

          {/* Giày trái */}
          <path 
            className="shoe"
            d="M75.3601 494.049C76.1069 493.322 77.1082 492.915 78.1506 492.915H124.852C127.061 492.915 128.852 494.706 128.852 496.915V510.315H58.654L75.3601 494.049Z" 
            fill="var(--shoe)" 
          />
          <path 
            className="sole"
            fillRule="evenodd" 
            clipRule="evenodd" 
            d="M128.852 510.315V514.118C128.852 516.327 127.061 518.118 124.852 518.118H60.4822C56.8928 518.118 55.1201 513.756 57.6917 511.252L58.654 510.315H128.852Z" 
            fill="var(--sole)" 
          />

          {/* Phụ kiện sneaker nếu được chọn */}
          {selectedGenZ.includes('giay-sneaker') && (
            <g id="female-sneaker-acc">
              <rect x="56" y="512" width="74" height="6.5" rx="2" fill="#ffffff" stroke="#e2e8f0" strokeWidth="0.8" />
              <line x1="60" y1="515.5" x2="126" y2="515.5" stroke="#ef4444" strokeWidth="1.2" />
              <rect x="156" y="512" width="74" height="6.5" rx="2" fill="#ffffff" stroke="#e2e8f0" strokeWidth="0.8" />
              <line x1="160" y1="515.5" x2="226" y2="515.5" stroke="#ef4444" strokeWidth="1.2" />
              <path d="M78 497 L88 505 M88 497 L98 505" stroke="#09090b" strokeWidth="1" strokeLinecap="round" />
              <path d="M198 497 L208 505 M208 497 L218 505" stroke="#09090b" strokeWidth="1" strokeLinecap="round" />
            </g>
          )}

          {/* 3. TRANG PHỤC NỮ TƯƠNG ỨNG THEO TỪNG LOẠI ÁO */}
          {/* 3.1. Chân váy dài Giao Lĩnh */}
          {selectedGarment.id === 'giao-linh' && (
            <g id="female-skirt-giao-linh">
              <path 
                className="pants"
                d="M101.5 172.85H185.5C189.5 264.85 213.5 394.85 221.5 490.85C185.5 496.85 101.5 496.85 65.5 490.85C73.5 394.85 97.5 264.85 101.5 172.85Z" 
                fill="var(--pants)" 
                stroke="rgba(0,0,0,0.06)" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
              />
              <path d="M125 185 C122 280, 118 410, 115 492" stroke="rgba(0,0,0,0.06)" strokeWidth="1.2" strokeLinecap="round" fill="none" />
              <path d="M162 185 C165 280, 169 410, 172 492" stroke="rgba(0,0,0,0.06)" strokeWidth="1.2" strokeLinecap="round" fill="none" />
            </g>
          )}

          {/* 3.2. Áo Nhật Bình Nữ */}
          {selectedGarment.id === 'nhat-binh' && (
            <FemaleNhatBinh dressColor={dressColor} liningColor={liningColor} pantsColor={pantsColor} selectedHeadwearId={selectedHeadwear?.id} />
          )}

          {/* 3.3. Áo Tấc (Áo thụng) Nữ */}
          {selectedGarment.id === 'ao-tac' && (
            <FemaleAoTac dressColor={dressColor} liningColor={liningColor} pantsColor={pantsColor} />
          )}

          {/* 3.4. Áo Ngũ Thân Tay Chẽn Nữ */}
          {selectedGarment.id === 'ngu-than-tay-chen' && (
            <FemaleNguThan dressColor={dressColor} liningColor={liningColor} pantsColor={pantsColor} />
          )}

          {/* 3.5. Áo Viên Lĩnh Nữ */}
          {selectedGarment.id === 'vien-linh' && (
            <FemaleVienLinh dressColor={dressColor} liningColor={liningColor} pantsColor={pantsColor} />
          )}

          {/* 4. CỔ VÀ BÓNG ĐỔ CỔ */}
          <path 
            d="M143.047 65.1283C149.185 65.1284 154.16 70.1041 154.16 76.2415V90.8743C154.16 97.0116 149.185 101.986 143.047 101.987C136.91 101.987 131.934 97.0117 131.934 90.8743V76.2415C131.934 70.104 136.91 65.1283 143.047 65.1283Z" 
            fill="#FDBA90" 
            stroke="#FDBA90" 
          />

          {/* 5. TAY ÁO DÀI RỘNG (TAY THỤNG GIAO LĨNH - Đổi màu theo dressColor) */}
          {selectedGarment.id === 'giao-linh' && (
            <g id="female-sleeves-giao-linh">
              <path 
                className="dress"
                d="M125.5 90.8497L109.5 91.8497C89.5 89.8497 73.5 94.8497 67.5 105.85L46.5 172.85C35.5 209.85 21.5 239.85 1.5 262.85C19.5 280.85 49.5 280.85 73.5 264.85L83.5 244.85L94.5 212.85L102.5 188.85L103.5 144.85L109.5 104.85L125.5 90.8497Z" 
                fill="var(--dress)" 
                stroke="var(--dress-edge)" 
                strokeWidth="0.8"
              />
              <path 
                d="M1.5 262.85C19.5 280.85 49.5 280.85 73.5 264.85" 
                stroke={liningColor} 
                strokeWidth="3.2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                fill="none"
              />

              <path 
                className="dress"
                d="M161.5 90.8497L177.5 91.8497C197.5 89.8497 213.5 94.8497 219.5 105.85L240.5 172.85C251.5 209.85 265.5 239.85 285.5 262.85C267.5 280.85 237.5 280.85 213.5 264.85L203.5 244.85L192.5 212.85L184.5 188.85L183.5 144.85L177.5 104.85L161.5 90.8497Z" 
                fill="var(--dress)" 
                stroke="var(--dress-edge)" 
                strokeWidth="0.8"
              />
              <path 
                d="M285.5 262.85C267.5 280.85 237.5 280.85 213.5 264.85" 
                stroke={liningColor} 
                strokeWidth="3.2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                fill="none"
              />
            </g>
          )}

          {/* 6. BÀN TAY (Lộ ra dưới cửa tay áo rộng) */}
          <path d="M37.7429 259.866C41.2373 250.41 47.5751 246.696 58.5177 248.719C69.4603 250.742 73.4617 256.756 73.8017 270.028C74.0519 279.795 73.543 292.569 70.0199 297.815C68.6044 299.922 65.9704 301.66 64.0434 300.609C62.1165 299.558 62.7239 297.272 63.6855 294.758C64.7725 291.915 65.4913 287.919 63.3372 286.797C62.0666 286.135 59.6238 287.447 58.8301 289.291C57.5279 292.315 56.9213 294.968 56.4053 298.388C56.0523 300.728 55.7831 302.831 55.6022 304.348C55.5119 305.106 55.4438 305.716 55.3986 306.134L55.3355 306.733C54.9441 309.506 52.9749 310.911 50.9291 310.708C47.0026 310.318 47.3002 306.592 47.3624 306.065C47.2743 306.737 47.2085 307.269 47.1646 307.633C47.142 307.821 47.1143 308.059 47.1143 308.059C46.8869 310.102 45.304 311.178 43.3492 310.989C41.3944 310.801 40.1809 309.026 40.0103 307.664C39.8397 306.301 40.057 304.346 40.057 304.346C36.0152 304.514 34.3728 301.784 34.2546 299.921C34.1365 298.058 34.3498 295.703 34.8791 292.563C34.9585 292.092 35.0183 291.769 35.0933 291.359C34.5421 291.635 33.9074 291.76 33.249 291.687C31.4328 291.485 30.7131 289.909 30.7079 288.006C30.7027 286.104 31.5427 279.518 32.6301 275.567C33.7175 271.616 34.2485 269.321 37.7429 259.866Z" fill="#FDBA90"/>
          <path d="M36.2516 285.187C36.8298 281.733 38.337 274.619 39.7398 273.79M40.7847 299.226C41.4306 293.52 43.3587 281.292 45.9038 278.033M53.6291 279.456C52.0036 283.881 48.5865 294.954 47.9219 303.842" stroke="#ED9D63" strokeLinecap="round" strokeLinejoin="round"/>

          <path d="M248.65 259.866C245.156 250.41 238.818 246.696 227.875 248.719C216.933 250.742 212.931 256.756 212.591 270.028C212.341 279.795 212.85 292.569 216.373 297.815C217.789 299.922 220.423 301.66 222.35 300.609C224.277 299.558 223.669 297.272 222.708 294.758C221.621 291.915 220.902 287.919 223.056 286.797C224.326 286.135 226.769 287.447 227.563 289.291C228.865 292.315 229.472 294.968 229.988 298.388C230.341 300.728 230.61 302.831 230.791 304.348C230.881 305.106 230.949 305.716 230.995 306.134L231.058 306.733C231.449 309.506 233.418 310.911 235.464 310.708C239.39 310.318 239.093 306.592 239.031 306.065C239.119 306.737 239.185 307.269 239.228 307.633C239.251 307.821 239.279 308.059 239.279 308.059C239.506 310.102 241.089 311.178 243.044 310.989C244.999 310.801 246.212 309.026 246.383 307.664C246.553 306.301 246.336 304.346 246.336 304.346C250.378 304.514 252.02 301.784 252.138 299.921C252.257 298.058 252.043 295.703 251.514 292.563C251.435 292.092 251.375 291.769 251.3 291.359C251.851 291.635 252.486 291.76 253.144 291.687C254.96 291.485 255.68 289.909 255.685 288.006C255.69 286.104 254.85 279.518 253.763 275.567C252.676 271.616 252.145 269.321 248.65 259.866Z" fill="#FDBA90"/>
          <path d="M250.545 286.987C249.966 283.533 248.459 276.419 247.056 275.59M246.012 301.026C245.366 295.32 243.438 283.092 240.892 279.833M233.167 281.256C234.793 285.681 238.21 296.754 238.874 305.642" stroke="#ED9D63" strokeLinecap="round" strokeLinejoin="round"/>

          {/* 7. PHẦN THÂN TRÊN & CỔ ÁO VẠT CHÉO (GIAO LĨNH) */}
          {selectedGarment.id === 'giao-linh' && (
            <g id="female-upper-giao-linh">
              {/* Lớp áo lót trong cổ chữ V (Đổi màu theo liningColor) */}
              <path d="M129.5 90.8497H157.5L143.5 132.85L129.5 90.8497Z" fill={liningColor} />

              {/* Vạt áo trái dưới (Đổi màu theo dressColor) */}
              <path 
                className="dress"
                d="M129.5 90.8497L109.5 91.8497C103.5 92.8497 99.5 95.8497 99.5 101.85L102.5 182.85H111.5C120.5 164.85 135.5 146.85 143.5 132.85L129.5 90.8497Z" 
                fill="var(--dress)" 
                stroke="var(--dress-edge)" 
                strokeLinejoin="round" 
              />

              {/* Vạt áo phải vắt chéo đè lên trên (Đổi màu theo dressColor) */}
              <path 
                className="dress"
                d="M157.5 90.8497L177.5 91.8497C183.5 92.8497 187.5 95.8497 187.5 101.85L184.5 182.85H111.5C120.5 164.85 135.5 146.85 143.5 132.85L157.5 90.8497Z" 
                fill="var(--dress)" 
                stroke="var(--dress-edge)" 
                strokeLinejoin="round" 
              />

              {/* Đường nẹp viền cổ áo giao lĩnh (Đổi màu viền cổ) */}
              <path 
                d="M129.5 90.8497L143.5 132.85M157.5 92.8497L143.5 132.85C135.5 146.85 120.5 164.85 111.5 182.85" 
                stroke="var(--dress-edge)" 
                strokeWidth="4.5" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
              />
              <path 
                d="M129.5 90.8497L143.5 132.85M157.5 92.8497L143.5 132.85C135.5 146.85 120.5 164.85 111.5 182.85" 
                stroke={liningColor} 
                strokeWidth="2.4" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
              />

              {/* 8. ĐAI THẮT LƯNG & DẢI LỤA BUÔNG (Đổi màu theo liningColor hoặc viền) */}
              <path 
                d="M96.5 172.85H190.5L189.5 190.85H97.5L96.5 172.85Z" 
                fill={liningColor} 
                stroke="var(--dress-edge)" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
              />
              <path 
                d="M108.5 186.85L100.5 264.85L108.5 269.85L114.5 187.85L108.5 186.85Z" 
                fill={liningColor} 
                stroke="rgba(0,0,0,0.12)" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
              />
              <path 
                d="M114.5 186.85L119.5 250.85L127.5 248.85L121.5 185.85L114.5 186.85Z" 
                fill={liningColor} 
                stroke="rgba(0,0,0,0.12)" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
              />
              <path 
                d="M105.5 181.85C105.5 175.85 117.5 175.85 117.5 181.85C117.5 187.85 105.5 187.85 105.5 181.85Z" 
                fill={liningColor} 
                stroke="var(--dress-edge)" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
              />
            </g>
          )}

          {/* DÂY MÁY ẢNH VÒNG PHÍA SAU GÁY / CỔ (Nằm trên vai áo, vòng ra sau gáy) */}
          {selectedGenZ.includes('may-anh') && (
            <g id="female-back-may-anh">
              <path 
                d="M122.5 106 C119 72, 168 72, 164.5 106" 
                fill="none" 
                stroke="#000000" 
                strokeWidth="5.5" 
                strokeLinecap="round" 
                opacity="0.25"
                transform="translate(0.5, 1)"
              />
              <path 
                d="M122.5 106 C119 72, 168 72, 164.5 106" 
                fill="none" 
                stroke="#18181b" 
                strokeWidth="5" 
                strokeLinecap="round" 
              />
              <path 
                d="M122.5 106 C119 72, 168 72, 164.5 106" 
                fill="none" 
                stroke="#27272a" 
                strokeWidth="3" 
                strokeLinecap="round" 
              />
              <path 
                d="M122.5 106 C119 72, 168 72, 164.5 106" 
                fill="none" 
                stroke="#d4af37" 
                strokeWidth="0.8" 
                strokeLinecap="round" 
                strokeDasharray="3 2" 
              />
            </g>
          )}

          {/* CỔ DA (Nằm đè lên dây để dây máy ảnh vòng ra sau gáy / cổ) */}
          <path 
            d="M143.047 65.1283C149.185 65.1284 154.16 70.1041 154.16 76.2415V90.85H131.934V76.2415C131.934 70.104 136.91 65.1283 143.047 65.1283Z" 
            fill="#FDBA90" 
          />

          {/* 9. KHUÔN MẶT, TAI VÀ TÓC MÁI (Vẽ trước các phụ kiện ngoài) */}
          <path d="M168.012 44.9437C171.851 44.9438 174.963 48.0556 174.963 51.8939C174.963 55.7321 171.851 58.844 168.012 58.8441C164.174 58.8441 161.062 55.7322 161.062 51.8939C161.062 48.0555 164.174 44.9437 168.012 44.9437Z" fill="#FDBA90" stroke="#FDBA90"/>
          <path d="M118.082 44.9437C121.92 44.9438 125.032 48.0556 125.032 51.8939C125.032 55.7321 121.92 58.8439 118.082 58.8441C114.243 58.8441 111.132 55.7321 111.131 51.8939C111.131 48.0555 114.243 44.9437 118.082 44.9437Z" fill="#FDBA90" stroke="#FDBA90"/>
          <path d="M172.718 50.0549C170.891 50.0549 170.174 52.4219 170.058 53.7322" stroke="#20150B" strokeLinecap="round"/>
          <path d="M113.581 50.0549C115.408 50.0549 116.125 52.4219 116.241 53.7322" stroke="#20150B" strokeLinecap="round"/>

          <path d="M140.203 16.3192H145.889C157.719 16.3192 167.319 26.0193 167.319 37.9969V52.3045C167.319 65.878 155.563 77.6561 142.939 77.6561C130.321 77.656 118.773 65.8835 118.773 52.3045V37.9969C118.773 26.0193 128.373 16.3192 140.203 16.3192Z" fill="#FDBA90" stroke="#FDBA90"/>

          <path d="M153.301 9.11324C153.301 15.4093 149.441 23.3011 142.519 30.6255C135.598 37.9499 113.526 38.2337 113.526 38.2337C111.47 22.6062 129.598 -1.72156 153.301 9.11324Z" fill="#20150B"/>
          <path d="M148.221 10.4791C150.002 13.6819 151.132 24.918 156.772 32.1592C162.411 39.4004 172.03 39.638 172.03 39.638C170.523 25.5457 160.771 10.4791 148.221 10.4791Z" fill="#20150B"/>

          <path d="M123.94 40.0443C126.444 37.0885 135.369 36.2913 137.775 40.0443" stroke="#20150B" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M147.727 40.0443C150.231 37.0885 159.156 36.2913 161.562 40.0443" stroke="#20150B" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          
          <ellipse cx="130.635" cy="46.9875" rx="2.78392" ry="3.6967" fill="#20150B"/>
          <circle cx="131.6" cy="45.8" r="0.9" fill="#FFFFFF"/>
          
          <ellipse cx="154.66" cy="46.9875" rx="2.78392" ry="3.6967" fill="#20150B"/>
          <circle cx="155.6" cy="45.8" r="0.9" fill="#FFFFFF"/>

          <path d="M142.13 48.9125L140.214 56.8607C140.214 56.8607 141.907 58.7811 144.683 58.6811" stroke="#20150B" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M139.016 66.7729C141.02 68.054 146.885 67.709 148.471 65.9154" stroke="#e11d48" strokeWidth="1.2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>

          {/* 10. KIỀNG CỔ TRUYỀN THỐNG NẾU ĐƯỢC CHỌN */}
          {selectedJewelry.includes('kieng-co') && (
            <g id="female-layer-kieng-co">
              <ellipse cx="143.5" cy="102" rx="22" ry="12" fill="none" stroke="#e2e8f0" strokeWidth="3" />
              <ellipse cx="143.5" cy="102" rx="22" ry="12" fill="none" stroke="#94a3b8" strokeWidth="1" />
              <circle cx="143.5" cy="114" r="2.5" fill="#e2e8f0" stroke="#64748b" strokeWidth="0.8" />
            </g>
          )}

          {/* GEN Z LAYER 1: TÚI XÁCH SHOULDER BAG (Bê nguyên xi từ nam) */}
          {selectedGenZ.includes('tui-xach') && (
            <g id="female-layer-tui-xach" transform="translate(46, -24)">
              {/* Quai đeo to bản buông từ vai người mẫu xuống */}
              <path 
                d="M52 118 C51 155, 41 205, 36 248" 
                fill="none" 
                stroke="#09090b" 
                strokeWidth="6.5" 
                strokeLinecap="round" 
              />
              {/* Đường gân chỉ may nổi trên quai túi */}
              <path 
                d="M52 119 C51 155, 41 204, 36 247" 
                fill="none" 
                stroke="#27272a" 
                strokeWidth="1.2" 
                strokeLinecap="round" 
                strokeDasharray="3 2" 
              />
              {/* Khuyên kim loại móc quai túi */}
              <ellipse cx="36" cy="248" rx="3.5" ry="2.2" fill="none" stroke="#a1a1aa" strokeWidth="1.5" />

              {/* Thân túi xách dáng shoulder bag đen to bản, thời thượng */}
              <g>
                {/* Bóng đổ nhẹ của túi lên trang phục */}
                <path 
                  d="M16 250 C16 243, 56 243, 58 250 L63 285 C63 301, 52 312, 38 312 C24 312, 13 301, 13 285 Z" 
                  fill="#000000" 
                  opacity="0.25" 
                  transform="translate(1.5, 2)" 
                />
                {/* Thân túi da đen */}
                <path 
                  d="M16 250 C16 243, 56 243, 58 250 L63 285 C63 301, 52 312, 38 312 C24 312, 13 301, 13 285 Z" 
                  fill="#18181b" 
                  stroke="#09090b" 
                  strokeWidth="1.5" 
                  strokeLinejoin="round" 
                />
                {/* Nắp túi xếp nếp da mềm sang trọng */}
                <path 
                  d="M14 252 C24 257, 50 257, 60 252 L59 274 C50 279, 24 279, 15 274 Z" 
                  fill="#27272a" 
                  stroke="#09090b" 
                  strokeWidth="1" 
                />
                {/* Khóa cài kim loại bạc sang trọng */}
                <rect x="34.5" y="271" width="7" height="4.5" rx="1.2" fill="#e4e4e7" stroke="#71717a" strokeWidth="0.8" />
                <line x1="36" y1="273.2" x2="40" y2="273.2" stroke="#52525b" strokeWidth="0.8" />
                {/* Ánh sáng phản quang trên da bóng */}
                <path 
                  d="M17 282 C17 296, 26 307, 38 307" 
                  fill="none" 
                  stroke="#3f3f46" 
                  strokeWidth="1.2" 
                  strokeLinecap="round" 
                  opacity="0.6" 
                />
              </g>
            </g>
          )}

          {/* GEN Z LAYER 2: MÁY ẢNH ĐEO TRƯỚC NGỰC (Bê nguyên xi từ layer nam, buông từ 2 vai xuống thân máy) */}
          {selectedGenZ.includes('may-anh') && (
            <g id="female-layer-may-anh" transform="translate(29.5, -2)">
              {/* Bóng đổ của 2 dây máy ảnh trước ngực buông từ sau vai xuống */}
              <path 
                d="M93 108 C91 128, 95 154, 97 178 M135 108 C137 128, 133 154, 131 178" 
                fill="none" 
                stroke="#000000" 
                strokeWidth="5" 
                strokeLinecap="round" 
                opacity="0.25" 
                transform="translate(0.8, 1.2)"
              />
              {/* Dây đeo máy ảnh bản dày thả từ sau vai xuống thân máy */}
              <path 
                d="M93 108 C91 128, 95 154, 97 178 M135 108 C137 128, 133 154, 131 178" 
                fill="none" 
                stroke="#18181b" 
                strokeWidth="4.8" 
                strokeLinecap="round" 
              />
              {/* Đệm êm dệt viền trong */}
              <path 
                d="M93 108 C91 128, 95 154, 97 178 M135 108 C137 128, 133 154, 131 178" 
                fill="none" 
                stroke="#27272a" 
                strokeWidth="2.8" 
                strokeLinecap="round" 
              />
              {/* Đường chỉ may gân nổi màu vàng phong cách retro cổ điển */}
              <path 
                d="M93 108 C91 128, 95 154, 97 178 M135 108 C137 128, 133 154, 131 178" 
                fill="none" 
                stroke="#d4af37" 
                strokeWidth="0.8" 
                strokeLinecap="round" 
                strokeDasharray="3 2" 
              />
              {/* Khoen móc kim loại 2 bên thân máy */}
              <circle cx="97" cy="177" r="2" fill="#cbd5e1" stroke="#475569" strokeWidth="0.8" />
              <circle cx="131" cy="177" r="2" fill="#cbd5e1" stroke="#475569" strokeWidth="0.8" />

              {/* Bóng nhẹ của máy ảnh lên áo */}
              <rect x="94" y="177" width="40" height="24" rx="3.5" fill="#000000" opacity="0.3" transform="translate(1, 2)" />

              {/* Thân máy ảnh retro / mirrorless đặt ngay chính giữa ngực */}
              <g>
                {/* Thân dưới bọc da đen */}
                <rect x="94" y="177" width="40" height="24" rx="3.5" fill="#18181b" stroke="#09090b" strokeWidth="1" />
                {/* Báng cầm vân nổi */}
                <rect x="95.5" y="183" width="5.5" height="16.5" rx="1.5" fill="#27272a" />
                {/* Phần nắp trên kim loại bạc cổ điển */}
                <rect x="94" y="174" width="40" height="6.5" rx="2" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="0.8" />
                {/* Nút bấm chụp & bánh răng xoay */}
                <rect x="97" y="172" width="4" height="2.5" rx="0.6" fill="#94a3b8" />
                <circle cx="130" cy="173" r="1.8" fill="#ef4444" />
                <rect x="110" y="172.5" width="8" height="2" rx="0.5" fill="#64748b" />
                {/* Chấm đỏ phong cách Leica */}
                <circle cx="102" cy="184" r="1.5" fill="#ef4444" />
                {/* Ống kính trung tâm (Lens) */}
                <circle cx="114" cy="189" r="9" fill="#27272a" stroke="#cbd5e1" strokeWidth="1.5" />
                <circle cx="114" cy="189" r="6.8" fill="#09090b" />
                <circle cx="114" cy="189" r="4.8" fill="#0284c7" opacity="0.65" />
                {/* Vệt phản quang thấu kính */}
                <ellipse cx="112" cy="187" rx="2" ry="1.2" fill="#ffffff" opacity="0.85" />
                <rect x="123" y="175" width="4.5" height="3" rx="0.6" fill="#38bdf8" opacity="0.6" />
              </g>
            </g>
          )}

          {/* GEN Z LAYER 5: ĐỒNG HỒ ĐEO TAY (Bê nguyên xi từ nam, đeo ôm trọn vòng cổ tay áo bên phải) */}
          {selectedGenZ.includes('dong-ho') && (
            <g id="female-layer-dong-ho" transform="translate(225, 250) scale(0.86) rotate(-22.5)">
              {/* Bóng đổ nhẹ thanh mảnh */}
              <path 
                d="M-22.5 -1 C-22.5 -3.5, 22.5 -3.5, 22.5 -1 C23.5 2, 23.5 3, 22.5 4 C22.5 6.5, -22.5 6.5, -22.5 4 C-23.5 3, -23.5 2, -22.5 -1 Z" 
                fill="#000000" 
                opacity="0.25" 
                transform="translate(0, 1.2)"
              />
              {/* Quai sau mỏng ôm khít cổ tay */}
              <path 
                d="M-22.5 -0.5 C-22.5 -3, -15 -4.2, 0 -4.2 C15 -4.2, 22.5 -3, 22.5 -0.5 C22.5 1.5, 21 2.8, 17 2.8 L-17 2.8 C-21 2.8, -22.5 1.5, -22.5 -0.5 Z" 
                fill="#09090b" 
              />
              {/* Quai đeo trước mỏng thanh lịch, ôm sát viền cổ tay không bị cộm */}
              <path 
                d="M-22 -2.8 C-11 -4, 11 -4, 22 -2.8 C23.5 -1.8, 23.5 2, 22 3.2 C11 4.5, -11 4.5, -22 3.2 C-23.5 2, -23.5 -1.8, -22 -2.8 Z" 
                fill="#18181b" 
                stroke="#09090b" 
                strokeWidth="1.2" 
                strokeLinejoin="round" 
              />
              {/* Rãnh khâu / vân thể thao mảnh mai trên quai */}
              <line x1="-19" y1="0.2" x2="-9" y2="0.2" stroke="#3f3f46" strokeWidth="0.8" strokeLinecap="round" />
              <line x1="9" y1="0.2" x2="19" y2="0.2" stroke="#3f3f46" strokeWidth="0.8" strokeLinecap="round" />

              {/* Mặt đồng hồ tròn màu xám bạc viền kim loại thanh lịch đặt chính giữa */}
              <circle cx="0" cy="0" r="8.8" fill="#09090b" stroke="#27272a" strokeWidth="1" />
              <circle cx="0" cy="0" r="7.6" fill="#e2e8f0" stroke="#09090b" strokeWidth="1.2" />
              <circle cx="0" cy="0" r="6.2" fill="#cbd5e1" />
              <circle cx="0" cy="0" r="1.1" fill="#09090b" />
              <line x1="0" y1="0" x2="0" y2="-4" stroke="#09090b" strokeWidth="1" strokeLinecap="round" />
              <line x1="0" y1="0" x2="2.8" y2="1.4" stroke="#09090b" strokeWidth="1" strokeLinecap="round" />
              <line x1="0" y1="0" x2="-1.8" y2="3.2" stroke="#ef4444" strokeWidth="0.6" strokeLinecap="round" />
              <rect x="7.8" y="-1.8" width="1.8" height="3.6" rx="0.7" fill="#94a3b8" stroke="#09090b" strokeWidth="0.4" />
            </g>
          )}

          {/* GEN Z LAYER 3: KÍNH RÂM (Bê nguyên xi từ nam, vừa vặn sống mũi và đôi mắt) */}
          {selectedGenZ.includes('kinh-ram') && (
            <g id="female-layer-kinh-ram" transform="translate(29.65, -13.5)">
              <path 
                d="M87 58 C87 54, 107 53, 109 57 C111 56, 115 56, 117 57 C119 53, 139 54, 139 58 L138 66 C137 70, 118 70, 114 65 C112 65, 110 65, 108 65 C104 70, 88 70, 87 66 Z" 
                fill="#18181b" 
                stroke="#27272a" 
                strokeWidth="1.2" 
                strokeLinejoin="round" 
              />
              <rect x="89" y="56" width="18" height="9.5" rx="3" fill="#09090b" opacity="0.95" />
              <rect x="116" y="56" width="18" height="9.5" rx="3" fill="#09090b" opacity="0.95" />
              <line x1="92" y1="57.5" x2="98" y2="63.5" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" opacity="0.45" />
              <line x1="119" y1="57.5" x2="125" y2="63.5" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" opacity="0.45" />
              <path d="M87 59 L79 61" stroke="#18181b" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M139 59 L147 61" stroke="#18181b" strokeWidth="1.8" strokeLinecap="round" />
            </g>
          )}

          {/* GEN Z LAYER 4: TAI NGHE TRÙM ĐẦU (Bê nguyên xi từ nam) */}
          {selectedGenZ.includes('tai-nghe-trum-dau') && (
            <g id="female-layer-tai-nghe" transform="translate(29.5, -9.5)">
              {/* Vòm đệm tai nghe vòng rộng trên đỉnh đầu, dày dặn và chunky */}
              <path 
                d="M75 48 C71 -2, 157 -2, 153 48" 
                fill="none" 
                stroke="#09090b" 
                strokeWidth="9" 
                strokeLinecap="round" 
              />
              {/* Lớp đệm êm ái lót trong vòm tai nghe */}
              <path 
                d="M76 46 C73 2, 155 2, 152 46" 
                fill="none" 
                stroke="#1e293b" 
                strokeWidth="5" 
                strokeLinecap="round" 
              />
              {/* Đường gân chỉ may nổi trên vòm đệm */}
              <path 
                d="M78 45 C75 5, 153 5, 150 45" 
                fill="none" 
                stroke="#475569" 
                strokeWidth="1.2" 
                strokeLinecap="round" 
                strokeDasharray="4 3" 
              />
              {/* Khớp trượt kéo dài kim loại mạ bạc sáng bóng 2 bên nối vào củ tai */}
              <rect x="72" y="42" width="6" height="9" rx="1.5" fill="#cbd5e1" stroke="#64748b" strokeWidth="0.8" />
              <rect x="150" y="42" width="6" height="9" rx="1.5" fill="#cbd5e1" stroke="#64748b" strokeWidth="0.8" />

              {/* Củ tai trái (Bên trái người xem) - ôm trùm tai */}
              <g transform="translate(76, 61.5) rotate(-6)">
                <ellipse cx="0" cy="0" rx="11.5" ry="18" fill="#09090b" stroke="#18181b" strokeWidth="1.5" />
                <ellipse cx="0" cy="0" rx="9" ry="15" fill="#18181b" />
                <ellipse cx="-2" cy="0" rx="7" ry="13" fill="#0f172a" stroke="#475569" strokeWidth="1.2" />
                <circle cx="-2" cy="0" r="2.8" fill="#64748b" stroke="#94a3b8" strokeWidth="0.8" />
                <path d="M-5 -6 C-7 -2, -7 2, -5 6" fill="none" stroke="#94a3b8" strokeWidth="1.2" opacity="0.6" strokeLinecap="round" />
              </g>

              {/* Củ tai phải (Bên phải người xem) - ôm trùm tai */}
              <g transform="translate(152, 61.5) rotate(6)">
                <ellipse cx="0" cy="0" rx="11.5" ry="18" fill="#09090b" stroke="#18181b" strokeWidth="1.5" />
                <ellipse cx="0" cy="0" rx="9" ry="15" fill="#18181b" />
                <ellipse cx="2" cy="0" rx="7" ry="13" fill="#0f172a" stroke="#475569" strokeWidth="1.2" />
                <circle cx="2" cy="0" r="2.8" fill="#64748b" stroke="#94a3b8" strokeWidth="0.8" />
                <path d="M5 -6 C7 -2, 7 2, 5 6" fill="none" stroke="#94a3b8" strokeWidth="1.2" opacity="0.6" strokeLinecap="round" />
              </g>
            </g>
          )}
        </g>
      </svg>
    </div>
  );

  // Render SVG Character component
  const renderCharacterSVG = (isLightbox: boolean = false) => {
    // 1. Kiểm tra nếu đang mặc Trang phục Đặc biệt (nguyên gốc, cố định)
    if (selectedSpecialId === 'special-long-bao-nam') {
      return <SpecialLongBaoNam isLightbox={isLightbox} />;
    }
    if (selectedSpecialId === 'special-quan-phuc-nam') {
      return <SpecialQuanPhucNam isLightbox={isLightbox} />;
    }
    if (selectedSpecialId === 'special-phuong-bao-nu') {
      return <SpecialPhuongBaoNu isLightbox={isLightbox} />;
    }
    if (selectedSpecialId === 'special-bach-y-nu') {
      return <SpecialBachYNu isLightbox={isLightbox} />;
    }

    if (modelGender === 'female') {
      return renderFemaleModelSVG(isLightbox);
    }

    return (
      <div className="model" id={isLightbox ? "lb-model" : "stage-model"}>
        <svg viewBox="-45 0 315 561" role="img" aria-label={`Nhân vật mặc ${selectedGarment.name}`} className="overflow-visible">
        <defs>
          <g id={isLightbox ? "arm-lb" : "arm"}>
            <path className="dress" d="M36.5 137.5C38.9 127.8 48.7 121.9 58.3 124.2C68 126.5 73.9 136.1 71.5 145.8L53.6 218.4C51.2 228.1 41.4 234 31.8 231.8C22.1 229.5 16.2 219.8 18.6 210.1Z"/>
            <path className="dress" d="M43.4 312.6L3.7 307.8L16.6 220.7C18.1 210.7 27.3 203.7 37.3 204.9C47.3 206.1 54.5 215.1 53.3 225.2Z"/>
            <circle className="dress" cx="35.6" cy="218.5" r="18.7"/>
            <path className="skin" d="M4.9 295.6C7.6 284.5 14.3 279.4 26.9 280.3C39.5 281.1 44.9 287.4 47 302.4C48.6 313.4 49.7 327.9 46.4 334.3C45 336.9 42.3 339.2 40 338.2C37.7 337.3 38 334.6 38.8 331.7C39.7 328.3 39.9 323.7 37.4 322.7C35.8 322.1 33.2 323.9 32.6 326.1C31.5 329.7 31.2 332.8 31 336.7C31 339.4 30.9 341.8 30.9 343.6C30.9 344.4 30.9 345.1 30.9 345.6L30.9 346.3C30.9 349.5 28.8 351.3 26.5 351.4C22 351.4 21.8 347.2 21.8 346.6C21.8 347.4 21.8 348 21.8 348.4C21.8 348.6 21.8 348.9 21.8 348.9C21.8 351.2 20.2 352.6 17.9 352.7C15.7 352.7 14.1 350.9 13.7 349.4C13.4 347.8 13.3 345.6 13.3 345.6C8.8 346.3 6.6 343.5 6.2 341.4C5.8 339.3 5.8 336.6 5.9 333C6 332.4 6 332.1 6 331.6C5.4 332 4.7 332.2 4 332.2C1.9 332.2 0.9 330.5 0.6 328.4C0.4 326.2 0.5 318.7 1.2 314.1C1.9 309.4 2.2 306.8 4.9 295.6Z"/>
            <path d="M5.5 331.5C5.4 328 5.6 320.7 7 319.6M13.3 344.4C12.9 338.7 12.5 326.3 14.6 322.7M23.4 322.7C22.5 327.3 21 338.8 22.1 347.7" fill="none" stroke="#ED9D63" strokeLinecap="round"/>
          </g>
          <g id={isLightbox ? "leg-lb" : "leg"}>
            <circle className="skin" cx="67.7" cy="529.8" r="21"/>
            <path className="shoe" d="M40.5 530.9C41.2 530.2 42.2 529.9 43.2 529.9H89.1C91.3 529.9 93.1 531.7 93.1 533.9V548.8H20.3Z"/>
            <path className="sole" d="M93.1 556.5C93.1 558.7 91.3 560.5 89.1 560.5H17.7C14 560.5 12.3 555.9 15.1 553.5L20.3 548.8H93.1Z"/>
            <path className="pants" d="M80 357C68 356 58 365 57 377L44 521H92L101 380C101 368 92 358 80 357Z"/>
          </g>
          <path id={isLightbox ? "neck-lb" : "neck"} d="M114 78.9C122.6 78.9 129.6 85.9 129.6 94.5V109.6C129.6 118.2 122.6 125.2 114 125.2C105.5 125.2 98.5 118.2 98.5 109.6V94.5C98.5 85.7 105.6 78.9 114 78.9Z"/>
          <clipPath id={isLightbox ? "neckClip-lb" : "neckClip"}><use href={`#${isLightbox ? "neck-lb" : "neck"}`}/></clipPath>
          <clipPath id={isLightbox ? "hairClip-lb" : "hairClip"}><path d="M84.8 52.2C84.8 52.2 84.5 43.2 85.2 40.6C86.4 35.8 90.5 34 91.5 32.6C99.8 42.4 119.1 52.1 134.8 48.4C134.8 54.2 137.7 65 140.3 65C143 65 143.9 51.3 147.4 52.1C154.1 41.8 167.2 24.9 147.4 12.4L149 10.1L151.9 8.3C149.5 5.6 140.5 4.3 138 7.9C138 7.9 133.8 -3.9 115 -12C93.2 -21.4 61.2 5.2 61.2 5.2L49.2 27.7L74.9 60.9C74.9 60.9 74.5 56.2 79.5 53.2C81.9 51.8 84.8 52.2 84.8 52.2Z"/></clipPath>
        </defs>

        {/* Chân & Giày nam */}
        <MaleShoes shoeColor={selectedFootwear.shoeColor} soleColor={selectedFootwear.soleColor} />

        {/* 4 Trang phục Cổ phục Nam tương ứng */}
        {selectedGarment.id === 'giao-linh' && (
          <MaleGiaoLinh dressColor={dressColor} liningColor={liningColor} pantsColor={pantsColor} />
        )}
        {selectedGarment.id === 'ao-tac' && (
          <MaleAoTac dressColor={dressColor} liningColor={liningColor} pantsColor={pantsColor} />
        )}
        {selectedGarment.id === 'vien-linh' && (
          <MaleVienLinh dressColor={dressColor} liningColor={liningColor} pantsColor={pantsColor} />
        )}
        {(selectedGarment.id === 'ngu-than-tay-chen' || selectedGarment.id === 'nhat-binh') && (
          <MaleNguThan dressColor={dressColor} liningColor={liningColor} pantsColor={pantsColor} />
        )}

        {/* Bàn tay nam đồng bộ lộ ra từ mép ống tay áo */}
        <MaleHands />

        {/* Dây máy ảnh quấn vòng phía sau gáy / cổ (Vòng qua đằng sau cổ theo đúng thực tế) */}
        {selectedGenZ.includes('may-anh') && (
          <path 
            d="M93 108 C90 88, 138 88, 135 108" 
            fill="none" 
            stroke="#18181b" 
            strokeWidth="5" 
            strokeLinecap="round" 
          />
        )}

        {/* Cổ + đầu */}
        <use href={`#${isLightbox ? "neck-lb" : "neck"}`} className="skin"/>
        <ellipse cx="109.5" cy="48.8" rx="32.5" ry="50.8" fill="#ED9D63" clipPath={`url(#${isLightbox ? "neckClip-lb" : "neckClip"})`}/>
        <path fill="#934103" d="M65.4 30.9C65.5 31.2 65.5 31.5 65.6 31.8C66 33.3 66.6 34.8 67.4 36.2C67.7 36.8 68.1 37.3 68.4 37.8C69.4 39.2 70.4 40.4 71.5 41.6L72.2 42.4C72.6 42.8 73.1 43.3 73.5 43.8C71.1 43.3 68.8 45.4 68.4 47.7C67.9 50.1 68.9 52.4 70.1 54.5C72.2 58.1 75.2 60.6 77.9 63.8C79.9 66.2 81 69 83.1 71.2L83.3 71.4C89 77.2 98.1 78.5 105.6 81C108.3 81.9 120.6 96.5 135.6 91C139 89.7 140.5 88.5 144.1 85.2C157.1 73.4 161.6 51.9 153.9 36.3C145.6 19.4 127.9 6.2 115.1 4.3C102.3 2.3 96.5 1.8 91.2 4.3C85.9 6.8 83.2 14.5 87.7 18.3C84.9 16.3 81.4 15.3 78 15.6C74.8 15.8 71.7 17.1 69.5 19.3C67.7 21 66.4 23.2 65.7 25.5C65.2 27.3 65.1 29.1 65.4 30.9Z"/>
        <circle className="skin" cx="144.2" cy="61.1" r="8.5"/>
        <circle className="skin" cx="83.9" cy="61.1" r="8.5"/>
        <path d="M79.7 58.2C80.5 58.9 82.2 60.8 82 62.3M148.5 58.6C147.1 58.6 146.1 61.3 146.2 62.7" fill="none" stroke="#662D03" strokeLinecap="round"/>
        <path className="skin" d="M85.4 41.8C86 22.5 105.2 9.1 123.6 15.6C135.1 19.7 142.7 30.5 142.7 42.7V67.9C142.7 83.7 129.9 96.6 114 96.6C98.2 96.6 85.4 83.7 85.4 67.9V42.7Z"/>
        <g clipPath={`url(#${isLightbox ? "hairClip-lb" : "hairClip"})`}>
          <path fill="#934103" d="M65.2 29.6C65.3 29.9 65.4 30.2 65.4 30.5C65.8 32.1 66.4 33.6 67.2 35C67.5 35.6 67.9 36.1 68.2 36.7C69.2 38 70.2 39.3 71.3 40.6L72 41.3C72.4 41.8 72.8 42.3 73.3 42.7C70.9 42.2 68.6 44.4 68.2 46.8C67.8 49.2 68.7 51.5 69.9 53.7C72 57.4 75 59.9 77.6 63.2C79.6 65.6 80.7 68.5 82.8 70.8L83 71C88.6 76.9 97.6 78.2 105.1 80.8C107.7 81.7 136.8 89.8 136.8 91.6C136.8 91.2 139.6 88.4 143.2 85C156.1 73 160.6 51.1 152.9 35.1C144.7 17.9 128.6 6 114.5 2.4C100.4 -1.3 96.1 -0.2 90.8 2.4C85.5 4.9 82.9 12.8 87.3 16.7C84.5 14.6 81.1 13.7 77.7 13.9C74.5 14.1 71.5 15.5 69.3 17.7C67.5 19.5 66.2 21.7 65.5 24.1C65.1 25.9 65 27.7 65.2 29.6Z"/>
          <path fill="#662D03" d="M65.1 29C65.1 29.5 65.1 30 65.2 30.3C65.4 32 66.2 34.3 66.5 34.9C66.9 35.4 67.8 37 68.2 37.6C69.2 39 70.7 40.8 70.7 40.8L72.5 42.8C71 42.5 68.3 44.7 67.9 47.2C67.4 49.7 68.5 52.2 69.8 54.4C72.1 58.4 75.5 61 78.4 64.4C80.6 66.9 81.9 69.9 84.3 72.4C87.1 69.3 88.9 65.5 89.4 61.6C90.4 54.2 96 48.9 96.3 41.5C94.8 35 91.9 33.2 88.8 29.4C86.4 26.6 83.6 24.1 80.4 22C78 20.5 74.8 20.3 71.9 20.7C69.3 21 66.7 22 65.8 23.2C65.3 25 65.1 26.7 65.1 29Z"/>
        </g>

        {/* Mặt: miệng, mũi, lông mày, mắt, tóc mai */}
        <g fill="none" stroke="#662D03" strokeLinecap="round" strokeLinejoin="round">
          <path d="M120.4 82.3C116.8 83.9 112.7 84.2 108.9 83"/>
          <path d="M110.8 61.2C107.9 64.2 107.5 74.5 107.5 74.5H112.8"/>
          <path d="M133.6 53C128.5 52 123.3 51.8 118.1 52.6M105.8 53C100.7 52 95.5 51.8 90.3 52.6"/>
          <path d="M85.1 59.4C85.1 58 84.7 47.5 84.7 44.6C84.7 37.3 91.1 32.5 91.1 32.5"/>
        </g>
        <ellipse cx="125" cy="60.5" rx="2.6" ry="3.5" fill="#662D03"/>
        <ellipse cx="98" cy="60.5" rx="2.6" ry="3.5" fill="#662D03"/>

        {/* GEN Z LAYER 3: Kính râm (Sunglasses) */}
        {selectedGenZ.includes('kinh-ram') && (
          <g id="layer-kinh-ram">
            {/* Gọng kính retro */}
            <path 
              d="M87 58 C87 54, 107 53, 109 57 C111 56, 115 56, 117 57 C119 53, 139 54, 139 58 L138 66 C137 70, 118 70, 114 65 C112 65, 110 65, 108 65 C104 70, 88 70, 87 66 Z" 
              fill="#18181b" 
              stroke="#27272a" 
              strokeWidth="1.2" 
              strokeLinejoin="round" 
            />
            {/* Tròng kính râm đen bóng */}
            <rect x="89" y="56" width="18" height="9.5" rx="3" fill="#09090b" opacity="0.95" />
            <rect x="116" y="56" width="18" height="9.5" rx="3" fill="#09090b" opacity="0.95" />
            {/* Vệt sáng phản quang kính râm */}
            <line x1="92" y1="57.5" x2="98" y2="63.5" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" opacity="0.45" />
            <line x1="119" y1="57.5" x2="125" y2="63.5" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" opacity="0.45" />
            {/* Càng kính hướng về tai */}
            <path d="M87 59 L79 61" stroke="#18181b" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M139 59 L147 61" stroke="#18181b" strokeWidth="1.8" strokeLinecap="round" />
          </g>
        )}

        {/* GEN Z LAYER 4: Tai nghe trùm đầu - giãn nhẹ ra khỏi mặt, ôm vừa vặn che tai (Comfortable Over-ear Headphones) */}
        {selectedGenZ.includes('tai-nghe-trum-dau') && (
          <g id="layer-tai-nghe">
            {/* Vòm đệm tai nghe vòng rộng trên đỉnh đầu, dày dặn và chunky */}
            <path 
              d="M75 48 C71 -2, 157 -2, 153 48" 
              fill="none" 
              stroke="#09090b" 
              strokeWidth="9" 
              strokeLinecap="round" 
            />
            {/* Lớp đệm êm ái lót trong vòm tai nghe */}
            <path 
              d="M76 46 C73 2, 155 2, 152 46" 
              fill="none" 
              stroke="#1e293b" 
              strokeWidth="5" 
              strokeLinecap="round" 
            />
            {/* Đường gân chỉ may nổi trên vòm đệm */}
            <path 
              d="M78 45 C75 5, 153 5, 150 45" 
              fill="none" 
              stroke="#475569" 
              strokeWidth="1.2" 
              strokeLinecap="round" 
              strokeDasharray="4 3" 
            />
            {/* Khớp trượt kéo dài kim loại mạ bạc sáng bóng 2 bên nối vào củ tai */}
            <rect x="72" y="42" width="6" height="9" rx="1.5" fill="#cbd5e1" stroke="#64748b" strokeWidth="0.8" />
            <rect x="150" y="42" width="6" height="9" rx="1.5" fill="#cbd5e1" stroke="#64748b" strokeWidth="0.8" />

            {/* Củ tai trái (Bên trái người xem) - giãn nhẹ ra không ép sát mặt, ôm trùm tai */}
            <g transform="translate(76, 61.5) rotate(-6)">
              {/* Đệm da mút xốp to bản ôm trọn tai */}
              <ellipse cx="0" cy="0" rx="11.5" ry="18" fill="#09090b" stroke="#18181b" strokeWidth="1.5" />
              {/* Lớp viền đệm mút êm ái */}
              <ellipse cx="0" cy="0" rx="9" ry="15" fill="#18181b" />
              {/* Vỏ ngoài củ tai kim loại nhám cao cấp */}
              <ellipse cx="-2" cy="0" rx="7" ry="13" fill="#0f172a" stroke="#475569" strokeWidth="1.2" />
              {/* Trục xoay kim loại */}
              <circle cx="-2" cy="0" r="2.8" fill="#64748b" stroke="#94a3b8" strokeWidth="0.8" />
              {/* Vệt phản quang ánh sáng trên vỏ củ tai */}
              <path d="M-5 -6 C-7 -2, -7 2, -5 6" fill="none" stroke="#94a3b8" strokeWidth="1.2" opacity="0.6" strokeLinecap="round" />
            </g>

            {/* Củ tai phải (Bên phải người xem) - giãn nhẹ ra không ép sát mặt, ôm trùm tai */}
            <g transform="translate(152, 61.5) rotate(6)">
              {/* Đệm da mút xốp to bản ôm trọn tai */}
              <ellipse cx="0" cy="0" rx="11.5" ry="18" fill="#09090b" stroke="#18181b" strokeWidth="1.5" />
              {/* Lớp viền đệm mút êm ái */}
              <ellipse cx="0" cy="0" rx="9" ry="15" fill="#18181b" />
              {/* Vỏ ngoài củ tai kim loại nhám cao cấp */}
              <ellipse cx="2" cy="0" rx="7" ry="13" fill="#0f172a" stroke="#475569" strokeWidth="1.2" />
              {/* Trục xoay kim loại */}
              <circle cx="2" cy="0" r="2.8" fill="#64748b" stroke="#94a3b8" strokeWidth="0.8" />
              {/* Vệt phản quang ánh sáng trên vỏ củ tai */}
              <path d="M5 -6 C7 -2, 7 2, 5 6" fill="none" stroke="#94a3b8" strokeWidth="1.2" opacity="0.6" strokeLinecap="round" />
            </g>
          </g>
        )}

        {/* Kiềng cổ nếu được chọn */}
        {selectedJewelry.includes('kieng-co') && (
          <ellipse cx="114" cy="127" rx="20" ry="12" fill="none" stroke="#E5E7EB" strokeWidth="2.5" filter="drop-shadow(0 1px 2px rgba(0,0,0,0.3))" />
        )}

        {/* GEN Z LAYER 1: Túi xách shoulder bag đen to bản, quai rộng - đeo bên phải model (bên trái người xem) */}
        {selectedGenZ.includes('tui-xach') && (
          <g id="layer-tui-xach">
            {/* Quai đeo to bản, mềm mại buông từ vai phải người mẫu xuống */}
            <path 
              d="M52 118 C51 155, 41 205, 36 248" 
              fill="none" 
              stroke="#09090b" 
              strokeWidth="6.5" 
              strokeLinecap="round" 
            />
            {/* Đường gân chỉ may nổi trên quai túi */}
            <path 
              d="M52 119 C51 155, 41 204, 36 247" 
              fill="none" 
              stroke="#27272a" 
              strokeWidth="1.2" 
              strokeLinecap="round" 
              strokeDasharray="3 2" 
            />
            {/* Khuyên kim loại móc quai túi */}
            <ellipse cx="36" cy="248" rx="3.5" ry="2.2" fill="none" stroke="#a1a1aa" strokeWidth="1.5" />

            {/* Thân túi xách dáng shoulder bag đen to bản, thời thượng */}
            <g>
              {/* Bóng đổ nhẹ của túi lên trang phục */}
              <path 
                d="M16 250 C16 243, 56 243, 58 250 L63 285 C63 301, 52 312, 38 312 C24 312, 13 301, 13 285 Z" 
                fill="#000000" 
                opacity="0.25" 
                transform="translate(1.5, 2)" 
              />
              {/* Thân túi da đen */}
              <path 
                d="M16 250 C16 243, 56 243, 58 250 L63 285 C63 301, 52 312, 38 312 C24 312, 13 301, 13 285 Z" 
                fill="#18181b" 
                stroke="#09090b" 
                strokeWidth="1.5" 
                strokeLinejoin="round" 
              />
              {/* Nắp túi xếp nếp da mềm sang trọng */}
              <path 
                d="M14 252 C24 257, 50 257, 60 252 L59 274 C50 279, 24 279, 15 274 Z" 
                fill="#27272a" 
                stroke="#09090b" 
                strokeWidth="1" 
              />
              {/* Khóa cài kim loại bạc sang trọng */}
              <rect x="34.5" y="271" width="7" height="4.5" rx="1.2" fill="#e4e4e7" stroke="#71717a" strokeWidth="0.8" />
              <line x1="36" y1="273.2" x2="40" y2="273.2" stroke="#52525b" strokeWidth="0.8" />
              {/* Ánh sáng phản quang trên da bóng */}
              <path 
                d="M17 282 C17 296, 26 307, 38 307" 
                fill="none" 
                stroke="#3f3f46" 
                strokeWidth="1.2" 
                strokeLinecap="round" 
                opacity="0.6" 
              />
            </g>
          </g>
        )}

        {/* GEN Z LAYER 2: Máy ảnh đeo quàng qua cổ thả buông trước ngực (Camera with strap hanging from behind neck) */}
        {selectedGenZ.includes('may-anh') && (
          <g id="layer-may-anh">
            {/* Bóng đổ của 2 dây máy ảnh trước ngực buông từ sau vai xuống */}
            <path 
              d="M93 108 C91 128, 95 154, 97 178 M135 108 C137 128, 133 154, 131 178" 
              fill="none" 
              stroke="#000000" 
              strokeWidth="5" 
              strokeLinecap="round" 
              opacity="0.25" 
              transform="translate(0.8, 1.2)"
            />
            {/* Dây đeo máy ảnh bản dày thả từ sau vai xuống thân máy */}
            <path 
              d="M93 108 C91 128, 95 154, 97 178 M135 108 C137 128, 133 154, 131 178" 
              fill="none" 
              stroke="#18181b" 
              strokeWidth="4.8" 
              strokeLinecap="round" 
            />
            {/* Đệm êm dệt viền trong */}
            <path 
              d="M93 108 C91 128, 95 154, 97 178 M135 108 C137 128, 133 154, 131 178" 
              fill="none" 
              stroke="#27272a" 
              strokeWidth="2.8" 
              strokeLinecap="round" 
            />
            {/* Đường chỉ may gân nổi màu vàng phong cách retro cổ điển */}
            <path 
              d="M93 108 C91 128, 95 154, 97 178 M135 108 C137 128, 133 154, 131 178" 
              fill="none" 
              stroke="#d4af37" 
              strokeWidth="0.8" 
              strokeLinecap="round" 
              strokeDasharray="3 2" 
            />
            {/* Khoen móc kim loại 2 bên thân máy */}
            <circle cx="97" cy="177" r="2" fill="#cbd5e1" stroke="#475569" strokeWidth="0.8" />
            <circle cx="131" cy="177" r="2" fill="#cbd5e1" stroke="#475569" strokeWidth="0.8" />

            {/* Bóng nhẹ của máy ảnh lên áo */}
            <rect x="94" y="177" width="40" height="24" rx="3.5" fill="#000000" opacity="0.3" transform="translate(1, 2)" />

            {/* Thân máy ảnh retro / mirrorless đặt ngay chính giữa ngực */}
            <g>
              {/* Thân dưới bọc da đen */}
              <rect x="94" y="177" width="40" height="24" rx="3.5" fill="#18181b" stroke="#09090b" strokeWidth="1" />
              {/* Báng cầm vân nổi */}
              <rect x="95.5" y="183" width="5.5" height="16.5" rx="1.5" fill="#27272a" />
              {/* Phần nắp trên kim loại bạc cổ điển */}
              <rect x="94" y="174" width="40" height="6.5" rx="2" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="0.8" />
              {/* Nút bấm chụp & bánh răng xoay */}
              <rect x="97" y="172" width="4" height="2.5" rx="0.6" fill="#94a3b8" />
              <circle cx="130" cy="173" r="1.8" fill="#ef4444" />
              <rect x="110" y="172.5" width="8" height="2" rx="0.5" fill="#64748b" />
              {/* Chấm đỏ phong cách Leica */}
              <circle cx="102" cy="184" r="1.5" fill="#ef4444" />
              {/* Ống kính trung tâm (Lens) */}
              <circle cx="114" cy="189" r="9" fill="#27272a" stroke="#cbd5e1" strokeWidth="1.5" />
              <circle cx="114" cy="189" r="6.8" fill="#09090b" />
              <circle cx="114" cy="189" r="4.8" fill="#0284c7" opacity="0.65" />
              {/* Vệt phản quang thấu kính */}
              <ellipse cx="112" cy="187" rx="2" ry="1.2" fill="#ffffff" opacity="0.85" />
              <rect x="123" y="175" width="4.5" height="3" rx="0.6" fill="#38bdf8" opacity="0.6" />
            </g>
          </g>
        )}

        {/* GEN Z LAYER 5: Đồng hồ đeo ôm khít vòng quanh cổ tay - quai mỏng thanh mảnh (Slim Wrap-around Wristwatch) */}
        {selectedGenZ.includes('dong-ho') && (
          <g id="layer-dong-ho" transform="translate(196, 285) rotate(-5)">
            {/* Bóng đổ nhẹ thanh mảnh */}
            <path 
              d="M-22.5 -1 C-22.5 -3.5, 22.5 -3.5, 22.5 -1 C23.5 2, 23.5 3, 22.5 4 C22.5 6.5, -22.5 6.5, -22.5 4 C-23.5 3, -23.5 2, -22.5 -1 Z" 
              fill="#000000" 
              opacity="0.25" 
              transform="translate(0, 1.2)"
            />
            {/* Quai sau mỏng ôm khít cổ tay */}
            <path 
              d="M-22.5 -0.5 C-22.5 -3, -15 -4.2, 0 -4.2 C15 -4.2, 22.5 -3, 22.5 -0.5 C22.5 1.5, 21 2.8, 17 2.8 L-17 2.8 C-21 2.8, -22.5 1.5, -22.5 -0.5 Z" 
              fill="#09090b" 
            />
            {/* Quai đeo trước mỏng thanh lịch, ôm sát viền cổ tay không bị cộm */}
            <path 
              d="M-22 -2.8 C-11 -4, 11 -4, 22 -2.8 C23.5 -1.8, 23.5 2, 22 3.2 C11 4.5, -11 4.5, -22 3.2 C-23.5 2, -23.5 -1.8, -22 -2.8 Z" 
              fill="#18181b" 
              stroke="#09090b" 
              strokeWidth="1.2" 
              strokeLinejoin="round" 
            />
            {/* Rãnh khâu / vân thể thao mảnh mai trên quai */}
            <line x1="-19" y1="0.2" x2="-9" y2="0.2" stroke="#3f3f46" strokeWidth="0.8" strokeLinecap="round" />
            <line x1="9" y1="0.2" x2="19" y2="0.2" stroke="#3f3f46" strokeWidth="0.8" strokeLinecap="round" />

            {/* Mặt đồng hồ tròn màu xám bạc viền kim loại thanh lịch đặt chính giữa */}
            {/* Viền ngoài kim loại đen dày (black bezel) */}
            <circle cx="0" cy="0" r="8.8" fill="#09090b" stroke="#27272a" strokeWidth="1" />
            {/* Vành kim loại thép sáng bóng */}
            <circle cx="0" cy="0" r="7.6" fill="#e2e8f0" stroke="#09090b" strokeWidth="1.2" />
            {/* Mặt số màu xám bạc (grey dial) */}
            <circle cx="0" cy="0" r="6.2" fill="#cbd5e1" />
            {/* Vạch số và tâm đồng hồ */}
            <circle cx="0" cy="0" r="1.1" fill="#09090b" />
            {/* Kim đồng hồ đen thanh lịch */}
            <line x1="0" y1="0" x2="0" y2="-4" stroke="#09090b" strokeWidth="1" strokeLinecap="round" />
            <line x1="0" y1="0" x2="2.8" y2="1.4" stroke="#09090b" strokeWidth="1" strokeLinecap="round" />
            {/* Điểm nhấn kim giây đỏ */}
            <line x1="0" y1="0" x2="-1.8" y2="3.2" stroke="#ef4444" strokeWidth="0.6" strokeLinecap="round" />
            {/* Núm vặn chỉnh giờ kim loại bên phải */}
            <rect x="7.8" y="-1.8" width="1.8" height="3.6" rx="0.7" fill="#94a3b8" stroke="#09090b" strokeWidth="0.4" />
          </g>
        )}
      </svg>
    </div>
    );
  };

  return (
    <div className="flex flex-col h-full w-full min-h-0 overflow-hidden">
      {/* Top Header */}
      <header className="topbar">
        <div className="brand">
          <span className="text-amber-600">✦</span>
          <span>Việt Phục Remix</span>
        </div>
        <nav className="tabs" role="tablist">
          <button 
            role="tab" 
            className={activePage === 1 ? 'active' : ''} 
            aria-selected={activePage === 1}
            onClick={() => setActivePage(1)}
          >
            Trang 1
          </button>
          <button 
            role="tab" 
            className={activePage === 2 ? 'active' : ''} 
            aria-selected={activePage === 2}
            onClick={() => setActivePage(2)}
          >
            Trang 2
          </button>
        </nav>
      </header>

      {/* Main Content Area */}
      <main>
        {/* ===== TRANG 1: PHỐI ĐỒ & BẢNG ĐIỀU KHIỂN ===== */}
        <section className={`page ${activePage === 1 ? 'active' : ''}`}>
          <div className="split">
            
            {/* Trái: Nhân vật */}
            <div className="card stage-col">
              <div className="stage">
                {/* Nút gạt chuyển đổi model M / F ở góc trình chiếu */}
                <div className="model-switch-container">
                  <button
                    type="button"
                    role="switch"
                    aria-checked={modelGender === 'female'}
                    aria-label="Chuyển đổi người mẫu Nam (M) và Nữ (F)"
                    onClick={handleToggleGender}
                    className={`model-switch-toggle ${modelGender === 'female' ? 'active-female' : ''}`}
                    title={modelGender === 'male' ? 'Đang chọn mẫu Nam (M) - Gạt để chuyển sang mẫu Nữ (F)' : 'Đang chọn mẫu Nữ (F) - Gạt để chuyển sang mẫu Nam (M)'}
                  >
                    <span className="model-switch-thumb">
                      {modelGender === 'male' ? 'M' : 'F'}
                    </span>
                  </button>
                </div>

                {renderCharacterSVG(false)}
              </div>
              <div className="grid grid-cols-2 gap-3 shrink-0 pt-1">
                <button 
                  type="button"
                  className="builder-btn flex items-center justify-center gap-2 py-2.5 px-4 font-medium text-[13px] text-slate-700 hover:border-slate-400 bg-white" 
                  onClick={handleRandomRemix}
                  title="Ngẫu nhiên"
                >
                  <Shuffle className="w-4 h-4 text-slate-700 shrink-0" strokeWidth={2} />
                  <span>Ngẫu nhiên</span>
                </button>
                <button 
                  type="button"
                  className="builder-btn flex items-center justify-center py-2.5 px-4 text-slate-700 hover:border-slate-400 bg-white" 
                  onClick={() => setLightboxOpen(true)}
                  title="Phóng to"
                  aria-label="Phóng to"
                >
                  <Search className="w-4 h-4 text-slate-700 shrink-0" strokeWidth={2} />
                </button>
              </div>
            </div>

            {/* Phải: Khung chứa Tab Menu và Vùng nội dung theo ảnh mẫu */}
            <div className="builder-panel">
              {/* Thanh điều hướng (Tab Menu) dạng khối liền kề */}
              <div className="tab-menu-nav">
                <button
                  type="button"
                  className={`tab-menu-btn ${builderTab === 'garment' ? 'active' : ''}`}
                  onClick={() => setBuilderTab('garment')}
                >
                  Trang phục
                </button>
                <button
                  type="button"
                  className={`tab-menu-btn ${builderTab === 'color' ? 'active' : ''}`}
                  onClick={() => setBuilderTab('color')}
                >
                  Màu sắc
                </button>
                <button
                  type="button"
                  className={`tab-menu-btn ${builderTab === 'accessory' ? 'active' : ''}`}
                  onClick={() => setBuilderTab('accessory')}
                >
                  Phụ kiện
                </button>
                <button
                  type="button"
                  className={`tab-menu-btn ${builderTab === 'genz' ? 'active' : ''}`}
                  onClick={() => setBuilderTab('genz')}
                >
                  Gen Z
                </button>
              </div>

              {/* Vùng nội dung (Body): Trải dọc phía dưới, chia thành các phân nhóm thuộc tính */}
              <div className="tab-body-scroll">
                
                {/* 1. TAB TRANG PHỤC */}
                {builderTab === 'garment' && (
                  <div>
                    {/* Phân nhóm 1: Kiểu áo ngoài phổ thông */}
                    <div className="sub-section">
                      <h3 className="sub-section-title">Kiểu áo ngoài</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                        {GARMENTS
                          .filter(g => modelGender === 'female' || g.id !== 'nhat-binh')
                          .map((g) => {
                            const isSelected = selectedSpecialId === null && selectedGarment.id === g.id;
                            return (
                              <button
                                key={g.id}
                                type="button"
                                onClick={() => handleSelectGarment(g)}
                                className={`builder-btn ${isSelected ? 'active' : ''}`}
                              >
                                {g.name}
                              </button>
                            );
                          })}
                      </div>
                    </div>

                    {/* Phân nhóm 2: Trang phục Đặc biệt (Được đẩy xuống để không sát hàng trên, nút đơn giản) */}
                    <div className="sub-section mt-7">
                      <h3 className="sub-section-title">Đặc biệt</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                        {SPECIAL_GARMENTS
                          .filter(sg => (modelGender === 'male' ? sg.gender === 'Nam' : sg.gender === 'Nữ'))
                          .map((sg) => {
                            const isSelected = selectedSpecialId === sg.id;
                            return (
                              <button
                                key={sg.id}
                                type="button"
                                onClick={() => handleSelectSpecial(sg.id)}
                                className={`builder-btn ${isSelected ? 'active' : ''}`}
                              >
                                {sg.name}
                              </button>
                            );
                          })}
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. TAB MÀU SẮC */}
                {builderTab === 'color' && (
                  <div className="sub-section">
                    <h3 className="sub-section-title">Phong cách phối màu (Lót trong · Áo ngoài · Quần)</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {COLOR_PRESETS.map((preset) => {
                        const isSelected = selectedPreset.id === preset.id;
                        return (
                          <button
                            key={preset.id}
                            type="button"
                            onClick={() => handleApplyPreset(preset)}
                            className={`builder-btn flex flex-col items-center gap-2 p-3 ${isSelected ? 'active' : ''}`}
                          >
                            {/* Dải 3 màu trực quan như ô màu tóc trong ảnh mẫu */}
                            <div className="w-full h-8 rounded-lg flex overflow-hidden border border-black/10 shrink-0">
                              <span 
                                className="flex-1 h-full" 
                                style={{ backgroundColor: preset.lining }} 
                                title={`Lót trong: ${preset.lining}`} 
                              />
                              <span 
                                className="flex-1 h-full" 
                                style={{ backgroundColor: preset.dress }} 
                                title={`Áo ngoài: ${preset.dress}`} 
                              />
                              <span 
                                className="flex-1 h-full" 
                                style={{ backgroundColor: preset.pants }} 
                                title={`Quần/váy: ${preset.pants}`} 
                              />
                            </div>
                            <span className="text-[13px] truncate w-full text-center">
                              {preset.name}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* 3. TAB PHỤ KIỆN */}
                {builderTab === 'accessory' && (
                  <div className="space-y-6">
                    {/* Phân nhóm 1: Đồ đội đầu */}
                    <div className="sub-section">
                      <h3 className="sub-section-title">Đồ đội đầu</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                        <button
                          type="button"
                          onClick={() => { setSelectedSpecialId(null); setSelectedHeadwear(null); }}
                          className={`builder-btn ${selectedHeadwear === null ? 'active' : ''}`}
                        >
                          ✕ Không đội đầu
                        </button>
                        {HEADWEAR.map((hw) => {
                          const isSelected = selectedHeadwear?.id === hw.id;
                          return (
                            <button
                              key={hw.id}
                              type="button"
                              onClick={() => { setSelectedSpecialId(null); setSelectedHeadwear(hw); }}
                              className={`builder-btn ${isSelected ? 'active' : ''}`}
                            >
                              {hw.name}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Phân nhóm 2: Giày dép */}
                    <div className="sub-section">
                      <h3 className="sub-section-title">Giày dép</h3>
                      <div className="grid grid-cols-3 gap-2.5">
                        {FOOTWEAR.map((fw) => {
                          const isSelected = selectedFootwear.id === fw.id;
                          return (
                            <button
                              key={fw.id}
                              type="button"
                              onClick={() => { setSelectedSpecialId(null); setSelectedFootwear(fw); }}
                              className={`builder-btn ${isSelected ? 'active' : ''}`}
                            >
                              {fw.name}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Phân nhóm 3: Trang sức */}
                    <div className="sub-section">
                      <h3 className="sub-section-title">Trang sức</h3>
                      <div className="grid grid-cols-2 gap-2.5">
                        {JEWELRY.map((jw) => {
                          const isChecked = selectedJewelry.includes(jw.id);
                          return (
                            <button
                              key={jw.id}
                              type="button"
                              onClick={() => handleToggleJewelry(jw.id)}
                              className={`builder-btn ${isChecked ? 'active' : ''}`}
                            >
                              {jw.name}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Phân nhóm 4: Đồ cầm tay */}
                    <div className="sub-section">
                      <h3 className="sub-section-title">Đồ cầm tay</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                        <button
                          type="button"
                          onClick={() => { setSelectedSpecialId(null); setSelectedHandheld('none'); }}
                          className={`builder-btn ${selectedHandheld === 'none' ? 'active' : ''}`}
                        >
                          ✕ Không cầm đồ
                        </button>
                        {HANDHELD.map((hh) => {
                          const isSelected = selectedHandheld === hh.id;
                          return (
                            <button
                              key={hh.id}
                              type="button"
                              onClick={() => { setSelectedSpecialId(null); setSelectedHandheld(hh.id); }}
                              className={`builder-btn ${isSelected ? 'active' : ''}`}
                            >
                              {hh.name}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {/* 4. TAB PHONG CÁCH GEN Z */}
                {builderTab === 'genz' && (
                  <div className="sub-section">
                    <h3 className="sub-section-title">Phụ kiện hiện đại Gen Z</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      {GEN_Z_ACCESSORIES.map((item) => {
                        const isChecked = selectedGenZ.includes(item.id);
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => handleToggleGenZ(item.id)}
                            className={`builder-btn ${isChecked ? 'active' : ''}`}
                          >
                            {item.name}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

              </div>
            </div>

          </div>
        </section>

        {/* ===== TRANG 2: ĐỂ TRỐNG ===== */}
        <section className={`page ${activePage === 2 ? 'active' : ''}`}>
          <div className="card h-full min-h-0 flex items-center justify-center p-8 text-slate-400">
            {/* Để trống cho người dùng thêm nội dung sau */}
          </div>
        </section>
      </main>

      {/* Lightbox Zoom */}
      {lightboxOpen && (
        <div 
          className="lightbox" 
          role="dialog" 
          aria-modal="true" 
          aria-label="Phóng to ảnh"
          onClick={(e) => {
            if (e.target === e.currentTarget) setLightboxOpen(false);
          }}
        >
          {/* Nút gạt M/F và nút đóng trong Lightbox */}
          <div className="absolute top-3.5 right-4 z-60 flex items-center gap-3">
            <div className="model-switch-container !relative !top-auto !right-auto shadow-md">
              <button
                type="button"
                role="switch"
                aria-checked={modelGender === 'female'}
                aria-label="Chuyển đổi người mẫu Nam (M) và Nữ (F)"
                onClick={handleToggleGender}
                className={`model-switch-toggle ${modelGender === 'female' ? 'active-female' : ''}`}
                title={modelGender === 'male' ? 'Đang chọn mẫu Nam (M) - Gạt để chuyển sang mẫu Nữ (F)' : 'Đang chọn mẫu Nữ (F) - Gạt để chuyển sang mẫu Nam (M)'}
              >
                <span className="model-switch-thumb">
                  {modelGender === 'male' ? 'M' : 'F'}
                </span>
              </button>
            </div>
            <button className="btn lb-close !static shadow-md" onClick={() => setLightboxOpen(false)}>
              Đóng (Esc)
            </button>
          </div>
          <div className="lb-body">
            {renderCharacterSVG(true)}
          </div>
        </div>
      )}
    </div>
  );
}
