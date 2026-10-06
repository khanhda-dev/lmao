import React from 'react';

export interface AccessoryVisualsProps {
  modelId: string;
  gender: 'nam' | 'nu';
  headwear: string;
  footwear: string;
  jewelry: string[];
  handheld: string;
  genz: string[];
}

export default function AccessoryVisuals({
  modelId,
  gender,
  headwear,
  footwear,
  jewelry,
  handheld,
  genz
}: AccessoryVisualsProps) {
  // Determine viewBox and anchor offsets based on current model
  let viewBox = '0 0 288 560';
  let cx = 144;
  let headY = 45;
  let neckY = 120;
  let chestY = 175;
  let waistY = 270;
  let wristLeft = { x: 30, y: 310 };
  let wristRight = { x: 255, y: 310 };
  let feetY = 530;

  if (modelId === 'giao_linh_nam') {
    viewBox = '0 0 360 595';
    cx = 180;
    headY = 55;
    neckY = 135;
    chestY = 200;
    waistY = 300;
    wristLeft = { x: 45, y: 340 };
    wristRight = { x: 315, y: 340 };
    feetY = 565;
  } else if (modelId === 'hoang_bao_long_trieu') {
    viewBox = '0 0 288 602';
    cx = 144;
    headY = 60;
    neckY = 140;
    chestY = 210;
    waistY = 310;
    wristLeft = { x: 40, y: 350 };
    wristRight = { x: 248, y: 350 };
    feetY = 575;
  } else if (modelId === 'phuong_bao_hoang_hau') {
    viewBox = '0 0 300 568';
    cx = 150;
    headY = 50;
    neckY = 130;
    chestY = 195;
    waistY = 270;
    wristLeft = { x: 50, y: 330 };
    wristRight = { x: 250, y: 330 };
    feetY = 545;
  } else if (modelId === 'bach_y_cong_chua') {
    viewBox = '0 0 340 538';
    cx = 170;
    headY = 40;
    neckY = 110;
    chestY = 180;
    waistY = 245;
    wristLeft = { x: 50, y: 310 };
    wristRight = { x: 285, y: 310 };
    feetY = 530;
  } else if (modelId === 'ao_tac_nu_toc_dai') {
    viewBox = '0 0 272 561';
    cx = 136;
    headY = 40;
    neckY = 110;
    chestY = 160;
    waistY = 250;
    wristLeft = { x: 45, y: 320 };
    wristRight = { x: 227, y: 320 };
    feetY = 535;
  } else if (modelId === 'ao_doi_kham_lam_hong') {
    viewBox = '0 0 300 519';
    cx = 150;
    headY = 35;
    neckY = 100;
    chestY = 155;
    waistY = 240;
    wristLeft = { x: 55, y: 280 };
    wristRight = { x: 245, y: 280 };
    feetY = 500;
  } else if (modelId === 'ngu_than_bich_thuy') {
    viewBox = '0 0 175 427';
    cx = 87.5;
    headY = 20;
    neckY = 70;
    chestY = 120;
    waistY = 190;
    wristLeft = { x: 25, y: 220 };
    wristRight = { x: 150, y: 220 };
    feetY = 410;
  } else if (modelId.startsWith('ngu_than')) {
    viewBox = '0 0 231 561';
    cx = 115.5;
    headY = 45;
    neckY = 115;
    chestY = 170;
    waistY = 265;
    wristLeft = { x: 22, y: 315 };
    wristRight = { x: 209, y: 315 };
    feetY = 535;
  } else if (modelId.startsWith('ao_tac') || modelId.startsWith('le_phuc')) {
    const hasHat = modelId.includes('hat') || modelId.includes('khan');
    viewBox = hasHat ? '0 0 328 534' : '0 0 328 519';
    cx = 164;
    headY = hasHat ? 40 : 35;
    neckY = 110;
    chestY = 160;
    waistY = 250;
    wristLeft = { x: 55, y: 280 };
    wristRight = { x: 273, y: 280 };
    feetY = 505;
  } else if (modelId.startsWith('giao_linh_thien_thanh')) {
    const hasBun = modelId.includes('bun');
    viewBox = hasBun ? '0 0 287 519' : '0 0 287 561';
    cx = 143.5;
    headY = hasBun ? 35 : 45;
    neckY = 115;
    chestY = 170;
    waistY = 260;
    wristLeft = { x: 35, y: 300 };
    wristRight = { x: 252, y: 300 };
    feetY = hasBun ? 500 : 535;
  }

  const hasKiengCo = jewelry.includes('kieng_co');
  const hasTramCai = jewelry.includes('tram_cai');
  const hasMayAnh = genz.includes('may_anh');
  const hasKinhRam = genz.includes('kinh_ram');
  const hasTuiXach = genz.includes('tui_xach');
  const hasTaiNghe = genz.includes('tai_nghe');
  const hasDongHo = genz.includes('dong_ho');

  return (
    <svg
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 w-full h-full max-h-[500px] object-contain pointer-events-none transition-all duration-300 z-20"
    >
      <defs>
        {/* Gradients & Filters */}
        <linearGradient id="goldKieng" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF2A3" />
          <stop offset="50%" stopColor="#E5B232" />
          <stop offset="100%" stopColor="#9C6B0B" />
        </linearGradient>

        <linearGradient id="silverGloss" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="50%" stopColor="#DDE1E7" />
          <stop offset="100%" stopColor="#8A92A0" />
        </linearGradient>

        <linearGradient id="sunglassGlass" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1E232A" stopOpacity="0.95" />
          <stop offset="60%" stopColor="#101216" stopOpacity="0.98" />
          <stop offset="100%" stopColor="#2D3748" stopOpacity="0.9" />
        </linearGradient>

        <linearGradient id="leatherStrap" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#693B18" />
          <stop offset="100%" stopColor="#3E1E09" />
        </linearGradient>

        <linearGradient id="bagLeather" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8E4822" />
          <stop offset="70%" stopColor="#5E2C11" />
          <stop offset="100%" stopColor="#3A1705" />
        </linearGradient>

        <linearGradient id="cameraBody" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#383D44" />
          <stop offset="40%" stopColor="#22252A" />
          <stop offset="100%" stopColor="#121417" />
        </linearGradient>

        <linearGradient id="nonLaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F5E8C7" />
          <stop offset="50%" stopColor="#E2CA9A" />
          <stop offset="100%" stopColor="#BFA069" />
        </linearGradient>

        <linearGradient id="sneakerWhite" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="80%" stopColor="#E2E8F0" />
          <stop offset="100%" stopColor="#CBD5E1" />
        </linearGradient>

        <filter id="accessoryShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="2.5" floodColor="#000" floodOpacity="0.3" />
        </filter>
      </defs>

      {/* ========================================================
          1. TRADITIONAL HEADWEAR (Đồ đội đầu)
          ======================================================== */}
      {headwear === 'non_ba_tam' && (
        <g id="nonBaTam" filter="url(#accessoryShadow)">
          {/* Broad flat circle brim of Nón Ba Tầm */}
          <ellipse cx={cx} cy={headY - 5} rx="68" ry="18" fill="url(#nonLaGrad)" stroke="#8A6935" strokeWidth="1.2" />
          <ellipse cx={cx} cy={headY - 6} rx="64" ry="15" fill="none" stroke="#A8874D" strokeWidth="0.8" strokeDasharray="3 2" />
          <circle cx={cx} cy={headY - 6} r="14" fill="#E2CA9A" stroke="#8A6935" strokeWidth="1" />
          <circle cx={cx} cy={headY - 6} r="4" fill="#C49B52" />
          {/* Quai Thao silk ribbons hanging down */}
          <path d={`M${cx - 32} ${headY + 5} Q${cx - 38} ${headY + 65} ${cx - 28} ${headY + 120}`} stroke="#881337" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.9" />
          <path d={`M${cx + 32} ${headY + 5} Q${cx + 38} ${headY + 65} ${cx + 28} ${headY + 120}`} stroke="#881337" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.9" />
          <circle cx={cx - 28} cy={headY + 120} r="2.5" fill="#EAB308" />
          <circle cx={cx + 28} cy={headY + 120} r="2.5" fill="#EAB308" />
        </g>
      )}

      {headwear === 'non_dau' && (
        <g id="nonDau" filter="url(#accessoryShadow)">
          {/* Conical military mandarin hat with brass tip */}
          <path
            d={`M${cx - 38} ${headY + 8} Q${cx} ${headY - 2} ${cx + 38} ${headY + 8} L${cx + 12} ${headY - 26} L${cx - 12} ${headY - 26} Z`}
            fill="#C92A2A"
            stroke="#800F15"
            strokeWidth="1.2"
          />
          <ellipse cx={cx} cy={headY + 8} rx="38" ry="8" fill="#800F15" />
          {/* Brass apex finial */}
          <polygon points={`${cx},${headY - 38} ${cx - 5},${headY - 26} ${cx + 5},${headY - 26}`} fill="url(#goldKieng)" stroke="#8A6208" strokeWidth="0.8" />
          <circle cx={cx} cy={headY - 38} r="3" fill="#FFE066" />
        </g>
      )}

      {headwear === 'non_la' && (
        <g id="nonLa" filter="url(#accessoryShadow)">
          {/* Classic Conical Leaf Hat */}
          <path
            d={`M${cx - 46} ${headY + 12} Q${cx} ${headY + 2} ${cx + 46} ${headY + 12} L${cx} ${headY - 35} Z`}
            fill="url(#nonLaGrad)"
            stroke="#8A6935"
            strokeWidth="1.2"
          />
          {/* Inner ring stitches */}
          <path d={`M${cx - 36} ${headY + 3} Q${cx} ${headY - 5} ${cx + 36} ${headY + 3}`} stroke="#B08D51" strokeWidth="0.8" strokeDasharray="3 2" fill="none" />
          <path d={`M${cx - 24} ${headY - 10} Q${cx} ${headY - 16} ${cx + 24} ${headY - 10}`} stroke="#B08D51" strokeWidth="0.8" strokeDasharray="3 2" fill="none" />
          <path d={`M${cx - 12} ${headY - 22} Q${cx} ${headY - 26} ${cx + 12} ${headY - 22}`} stroke="#B08D51" strokeWidth="0.8" strokeDasharray="3 2" fill="none" />
          {/* Silk strap under chin */}
          <path d={`M${cx - 25} ${headY + 10} Q${cx} ${headY + 45} ${cx + 25} ${headY + 10}`} stroke="#0D9488" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </g>
      )}

      {headwear === 'khan_vanh_day' && (
        <g id="khanVanhDay" filter="url(#accessoryShadow)">
          {/* Layered tiered royal / bridal wrap */}
          <ellipse cx={cx} cy={headY - 10} rx="34" ry="12" fill="url(#goldKieng)" stroke="#8A6208" strokeWidth="1" />
          <ellipse cx={cx} cy={headY - 6} rx="36" ry="13" fill="none" stroke="#D97706" strokeWidth="1.8" />
          <ellipse cx={cx} cy={headY - 2} rx="38" ry="14" fill="none" stroke="#B45309" strokeWidth="2.2" />
          <ellipse cx={cx} cy={headY + 2} rx="40" ry="15" fill="none" stroke="#92400E" strokeWidth="2.5" />
        </g>
      )}

      {headwear === 'khan_xep' && (
        <g id="khanXep" filter="url(#accessoryShadow)">
          {/* Traditional layered folded turban */}
          <path
            d={`M${cx - 30} ${headY + 8} Q${cx} ${headY - 2} ${cx + 30} ${headY + 8} Q${cx + 32} ${headY - 18} ${cx} ${headY - 22} Q${cx - 32} ${headY - 18} ${cx - 30} ${headY + 8} Z`}
            fill="#18181B"
            stroke="#3F3F46"
            strokeWidth="1"
          />
          {/* Layered folding ridges */}
          <path d={`M${cx - 28} ${headY + 3} Q${cx} ${headY - 6} ${cx + 28} ${headY + 3}`} stroke="#52525B" strokeWidth="1.5" fill="none" />
          <path d={`M${cx - 25} ${headY - 4} Q${cx} ${headY - 13} ${cx + 25} ${headY - 4}`} stroke="#71717A" strokeWidth="1.2" fill="none" />
          <path d={`M${cx - 20} ${headY - 11} Q${cx} ${headY - 19} ${cx + 20} ${headY - 11}`} stroke="#52525B" strokeWidth="1" fill="none" />
        </g>
      )}

      {/* ========================================================
          2. TRÂM CÀI (Hairpin - traditional jewelry)
          ======================================================== */}
      {hasTramCai && (
        <g id="tramCai" filter="url(#accessoryShadow)">
          {/* Golden hairpin with phoenix / floral crest & dangling beads on the hair */}
          <path
            d={`M${cx + 16} ${headY - 18} L${cx + 38} ${headY - 28}`}
            stroke="url(#goldKieng)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Blossom flower head */}
          <circle cx={cx + 38} cy={headY - 28} r="5.5" fill="#DC2626" stroke="#FEF08A" strokeWidth="1" />
          <circle cx={cx + 38} cy={headY - 28} r="2.5" fill="#FEF08A" />
          {/* Pearl bead tassels */}
          <path d={`M${cx + 36} ${headY - 24} Q${cx + 40} ${headY - 10} ${cx + 38} ${headY}`} stroke="#FACC15" strokeWidth="1" fill="none" />
          <circle cx={cx + 38} cy={headY} r="2" fill="#FFFFFF" stroke="#CA8A04" strokeWidth="0.5" />
          <path d={`M${cx + 41} ${headY - 26} Q${cx + 45} ${headY - 14} ${cx + 43} ${headY - 4}`} stroke="#FACC15" strokeWidth="1" fill="none" />
          <circle cx={cx + 43} cy={headY - 4} r="1.8" fill="#FFFFFF" stroke="#CA8A04" strokeWidth="0.5" />
        </g>
      )}

      {/* ========================================================
          3. KÍNH RÂM GEN Z (Sunglasses - ONLY visible front shades)
          Rule: "kính râm thì không cần hiển thị gọng kính" (no ear temple arms)
          ======================================================== */}
      {hasKinhRam && (
        <g id="kinhRam" filter="url(#accessoryShadow)">
          {/* Bridge connector */}
          <path d={`M${cx - 5} ${headY + 12} Q${cx} ${headY + 10} ${cx + 5} ${headY + 12}`} stroke="#D4AF37" strokeWidth="2.2" strokeLinecap="round" fill="none" />
          {/* Left Lens */}
          <rect
            x={cx - 24}
            y={headY + 8}
            width="17"
            height="11"
            rx="3.5"
            fill="url(#sunglassGlass)"
            stroke="#E5B232"
            strokeWidth="1.2"
          />
          {/* Left Lens Glare */}
          <path d={`M${cx - 22} ${headY + 10} L${cx - 17} ${headY + 10} L${cx - 20} ${headY + 16} Z`} fill="#FFFFFF" opacity="0.35" />

          {/* Right Lens */}
          <rect
            x={cx + 7}
            y={headY + 8}
            width="17"
            height="11"
            rx="3.5"
            fill="url(#sunglassGlass)"
            stroke="#E5B232"
            strokeWidth="1.2"
          />
          {/* Right Lens Glare */}
          <path d={`M${cx + 9} ${headY + 10} L${cx + 14} ${headY + 10} L${cx + 11} ${headY + 16} Z`} fill="#FFFFFF" opacity="0.35" />
        </g>
      )}

      {/* ========================================================
          4. TAI NGHE TRÙM ĐẦU GEN Z (Over-ear Headphones)
          Rests around the neck or ears with visible earcups and front cushion
          ======================================================== */}
      {hasTaiNghe && (
        <g id="taiNghe" filter="url(#accessoryShadow)">
          {/* Left Ear Cushion */}
          <rect x={cx - 36} y={neckY - 14} width="12" height="20" rx="5" fill="#18181B" stroke="#71717A" strokeWidth="1.5" />
          <rect x={cx - 33} y={neckY - 11} width="6" height="14" rx="3" fill="#D4D4D8" opacity="0.2" />

          {/* Right Ear Cushion */}
          <rect x={cx + 24} y={neckY - 14} width="12" height="20" rx="5" fill="#18181B" stroke="#71717A" strokeWidth="1.5" />
          <rect x={cx + 27} y={neckY - 11} width="6" height="14" rx="3" fill="#D4D4D8" opacity="0.2" />

          {/* Visible front headband curve resting on collar */}
          <path
            d={`M${cx - 28} ${neckY - 4} Q${cx} ${neckY + 16} ${cx + 28} ${neckY - 4}`}
            stroke="#27272A"
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d={`M${cx - 28} ${neckY - 4} Q${cx} ${neckY + 16} ${cx + 28} ${neckY - 4}`}
            stroke="#A1A1AA"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
        </g>
      )}

      {/* ========================================================
          5. KIỀNG CỔ (Traditional Gold Torque Necklace)
          Rule: "kiềng cổ thì không cần hiện cả vòng" (ONLY front crescent arc & pendant)
          ======================================================== */}
      {hasKiengCo && (
        <g id="kiengCo" filter="url(#accessoryShadow)">
          {/* Visible Front Solid Golden Crescent Arc resting on chest */}
          <path
            d={`M${cx - 28} ${neckY + 4} Q${cx} ${neckY + 36} ${cx + 28} ${neckY + 4}`}
            stroke="url(#goldKieng)"
            strokeWidth="4.5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d={`M${cx - 24} ${neckY + 7} Q${cx} ${neckY + 34} ${cx + 24} ${neckY + 7}`}
            stroke="#FFFBEB"
            strokeWidth="1.2"
            strokeLinecap="round"
            fill="none"
            opacity="0.7"
          />
          {/* Center Lock / Carved Lotus Pendant */}
          <rect
            x={cx - 7}
            y={neckY + 32}
            width="14"
            height="11"
            rx="3"
            fill="url(#goldKieng)"
            stroke="#854D0E"
            strokeWidth="0.8"
          />
          <circle cx={cx} cy={neckY + 37.5} r="2.5" fill="#DC2626" />
        </g>
      )}

      {/* ========================================================
          6. DÂY ĐEO & MÁY ẢNH GEN Z (Vintage / Modern Camera)
          Rule: "dây đeo máy ảnh thì không cần phải hiển thị cả phần dây ở cổ"
          (ONLY visible front diagonal strap across chest to camera)
          ======================================================== */}
      {hasMayAnh && (
        <g id="mayAnh" filter="url(#accessoryShadow)">
          {/* Visible front diagonal leather strap coming from right shoulder down to left torso */}
          <path
            d={`M${cx + 34} ${chestY - 32} Q${cx + 8} ${chestY + 15} ${cx - 24} ${chestY + 68}`}
            stroke="url(#leatherStrap)"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
          />
          {/* Strap stitch detail */}
          <path
            d={`M${cx + 34} ${chestY - 32} Q${cx + 8} ${chestY + 15} ${cx - 24} ${chestY + 68}`}
            stroke="#D97706"
            strokeWidth="0.8"
            strokeDasharray="2 2"
            fill="none"
          />

          {/* Camera Body positioned at side/chest */}
          <g transform={`translate(${cx - 48}, ${chestY + 58}) rotate(-8)`}>
            {/* Main body */}
            <rect x="0" y="0" width="36" height="25" rx="4" fill="url(#cameraBody)" stroke="#475569" strokeWidth="1" />
            <rect x="2" y="2" width="32" height="7" rx="1.5" fill="#E2E8F0" />
            {/* Viewfinder & Flash */}
            <rect x="5" y="4" width="4" height="3" fill="#0F172A" />
            <circle cx="28" cy="5.5" r="2.5" fill="#FDE047" stroke="#CA8A04" strokeWidth="0.5" />
            {/* Camera Lens with glass reflection */}
            <circle cx="18" cy="15" r="8" fill="#1E293B" stroke="#94A3B8" strokeWidth="1.2" />
            <circle cx="18" cy="15" r="5.5" fill="#0284C7" stroke="#0369A1" strokeWidth="0.8" />
            <circle cx="16.5" cy="13.5" r="2" fill="#FFFFFF" opacity="0.6" />
            {/* Shutter button */}
            <rect x="7" y="-2" width="5" height="2" rx="0.8" fill="#E2E8F0" stroke="#64748B" strokeWidth="0.5" />
          </g>
        </g>
      )}

      {/* ========================================================
          7. TÚI XÁCH GEN Z (Crossbody Bag / Handbag)
          Rule: "túi xách cx đừng hiển thị phần dây bị che khuất"
          (ONLY visible front strap across torso down to hip bag)
          ======================================================== */}
      {hasTuiXach && (
        <g id="tuiXach" filter="url(#accessoryShadow)">
          {/* Visible front diagonal strap from left shoulder to right hip */}
          <path
            d={`M${cx - 36} ${chestY - 30} Q${cx - 10} ${chestY + 25} ${cx + 32} ${waistY + 30}`}
            stroke="url(#bagLeather)"
            strokeWidth="3.8"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d={`M${cx - 36} ${chestY - 30} Q${cx - 10} ${chestY + 25} ${cx + 32} ${waistY + 30}`}
            stroke="#FDE047"
            strokeWidth="0.6"
            strokeDasharray="2 2"
            fill="none"
          />

          {/* Designer Bag Body at right hip */}
          <g transform={`translate(${cx + 18}, ${waistY + 15}) rotate(6)`}>
            <rect x="0" y="0" width="38" height="28" rx="6" fill="url(#bagLeather)" stroke="#3E1E09" strokeWidth="1.2" />
            {/* Bag flap */}
            <path d="M0 0 L38 0 L34 16 Q19 22 4 16 Z" fill="#78350F" stroke="#3E1E09" strokeWidth="0.8" />
            {/* Gold Clasp */}
            <circle cx="19" cy="15" r="3.2" fill="url(#goldKieng)" stroke="#854D0E" strokeWidth="0.8" />
            <rect x="17.5" y="14" width="3" height="4" rx="1" fill="#FEF08A" />
          </g>
        </g>
      )}

      {/* ========================================================
          8. ĐỒNG HỒ GEN Z (Wristwatch on exposed wrist)
          ======================================================== */}
      {hasDongHo && (
        <g id="dongHo" filter="url(#accessoryShadow)">
          {/* Wristwatch on right wrist */}
          <g transform={`translate(${wristRight.x - 6}, ${wristRight.y - 12})`}>
            {/* Strap */}
            <rect x="2" y="-1" width="10" height="16" rx="2" fill="#18181B" stroke="#3F3F46" strokeWidth="0.8" />
            {/* Watch Case / Screen */}
            <rect x="0" y="2" width="14" height="10" rx="3" fill="#09090B" stroke="#D4AF37" strokeWidth="1.2" />
            <circle cx="7" cy="7" r="3.5" fill="#1E293B" />
            {/* Clock hands */}
            <line x1="7" y1="7" x2="7" y2="4.5" stroke="#38BDF8" strokeWidth="0.8" strokeLinecap="round" />
            <line x1="7" y1="7" x2="9" y2="7" stroke="#38BDF8" strokeWidth="0.8" strokeLinecap="round" />
          </g>
        </g>
      )}

      {/* ========================================================
          9. ĐỒ CẦM TAY TRUYỀN THỐNG (Handheld: Đàn nguyệt, Ô dù, Quạt)
          ======================================================== */}
      {handheld === 'dan_nguyet' && (
        <g id="danNguyet" filter="url(#accessoryShadow)">
          {/* Vietnamese Moon Lute (Đàn Nguyệt) held diagonally */}
          <g transform={`translate(${cx - 55}, ${waistY - 30}) rotate(32)`}>
            {/* Long Neck */}
            <rect x="18" y="-55" width="5.5" height="75" rx="1.5" fill="#451A03" stroke="#260C02" strokeWidth="1" />
            {/* Frets */}
            {[ -45, -35, -25, -15, -5, 5 ].map((fy) => (
              <line key={fy} x1="18" y1={fy} x2="23.5" y2={fy} stroke="#FDE047" strokeWidth="1" />
            ))}
            {/* Peghead & Tuning pegs */}
            <rect x="16" y="-68" width="9.5" height="14" rx="2" fill="#78350F" stroke="#451A03" strokeWidth="1" />
            <circle cx="13" cy="-62" r="2.5" fill="#D97706" />
            <circle cx="28" cy="-62" r="2.5" fill="#D97706" />
            <circle cx="13" cy="-55" r="2.5" fill="#D97706" />
            <circle cx="28" cy="-55" r="2.5" fill="#D97706" />
            {/* Round Soundboard (Thùng đàn hình trăng tròn) */}
            <circle cx="21" cy="40" r="28" fill="#F5E6C8" stroke="#78350F" strokeWidth="2.5" />
            <circle cx="21" cy="40" r="24" fill="none" stroke="#D97706" strokeWidth="0.8" strokeDasharray="3 2" />
            {/* Bridge & Tailpiece */}
            <rect x="15" y="44" width="12" height="4.5" rx="1" fill="#451A03" />
            {/* Strings */}
            <line x1="19.5" y1="-55" x2="19.5" y2="44" stroke="#FFFFFF" strokeWidth="0.8" />
            <line x1="22.5" y1="-55" x2="22.5" y2="44" stroke="#FFFFFF" strokeWidth="0.8" />
          </g>
        </g>
      )}

      {handheld === 'o_du' && (
        <g id="oDu" filter="url(#accessoryShadow)">
          {/* Traditional Oiled Silk / Paper Parasol held vertically */}
          <g transform={`translate(${cx + 42}, ${waistY - 95}) rotate(-12)`}>
            {/* Bamboo Handle Pole */}
            <line x1="20" y1="-20" x2="20" y2="185" stroke="#78350F" strokeWidth="3" strokeLinecap="round" />
            {/* Curved Handle bottom */}
            <path d="M20 185 Q20 198 12 198" stroke="#78350F" strokeWidth="3" fill="none" strokeLinecap="round" />
            {/* Parasol Canopy */}
            <path
              d="M-22 35 Q20 -15 62 35 Q20 22 -22 35 Z"
              fill="#BE123C"
              stroke="#881337"
              strokeWidth="1.5"
            />
            {/* Decorative Gold Rings & ribs */}
            <path d="M-10 33 Q20 5 50 33" stroke="#FDE047" strokeWidth="1" fill="none" />
            <line x1="20" y1="-10" x2="-22" y2="35" stroke="#9F1239" strokeWidth="0.8" />
            <line x1="20" y1="-10" x2="2" y2="35" stroke="#9F1239" strokeWidth="0.8" />
            <line x1="20" y1="-10" x2="38" y2="35" stroke="#9F1239" strokeWidth="0.8" />
            <line x1="20" y1="-10" x2="62" y2="35" stroke="#9F1239" strokeWidth="0.8" />
            {/* Top Finial */}
            <polygon points="20,-22 17,-10 23,-10" fill="#FDE047" stroke="#B45309" strokeWidth="0.8" />
          </g>
        </g>
      )}

      {handheld === 'quat' && (
        <g id="quat" filter="url(#accessoryShadow)">
          {/* Folded Silk Fan with tassel held in hand */}
          <g transform={`translate(${wristRight.x - 22}, ${wristRight.y - 35}) rotate(25)`}>
            {/* Fan Ribs & Silk Leaf */}
            <path
              d="M15 45 L-12 5 Q15 -8 42 5 Z"
              fill="#BE185D"
              stroke="#9D174D"
              strokeWidth="1.2"
            />
            <path d="M-5 12 Q15 2 35 12" stroke="#FDE047" strokeWidth="0.8" fill="none" />
            {/* Bamboo struts */}
            <line x1="15" y1="45" x2="-12" y2="5" stroke="#D97706" strokeWidth="1.5" />
            <line x1="15" y1="45" x2="2" y2="-4" stroke="#D97706" strokeWidth="1" />
            <line x1="15" y1="45" x2="15" y2="-7" stroke="#D97706" strokeWidth="1" />
            <line x1="15" y1="45" x2="28" y2="-4" stroke="#D97706" strokeWidth="1" />
            <line x1="15" y1="45" x2="42" y2="5" stroke="#D97706" strokeWidth="1.5" />
            {/* Pivot pin & Silk Red Tassel */}
            <circle cx="15" cy="45" r="2.5" fill="#CA8A04" />
            <path d="M15 47 Q13 60 14 72" stroke="#DC2626" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <circle cx="14" cy="72" r="2" fill="#FDE047" />
          </g>
        </g>
      )}

      {/* ========================================================
          10. GIÀY DÉP TRUYỀN THỐNG / SNEAKER (Footwear)
          ======================================================== */}
      {footwear === 'guoc_moc' && (
        <g id="guocMoc" filter="url(#accessoryShadow)">
          {/* Wooden Clogs with Velvet Strap at feet */}
          {/* Left Clog */}
          <g transform={`translate(${cx - 36}, ${feetY - 8})`}>
            <rect x="0" y="6" width="28" height="8" rx="2" fill="#78350F" stroke="#451A03" strokeWidth="0.8" />
            {/* Clog front & heel riser */}
            <rect x="3" y="14" width="6" height="4" fill="#451A03" />
            <rect x="19" y="14" width="6" height="4" fill="#451A03" />
            {/* Velvet Red Strap */}
            <path d="M4 6 Q14 -2 24 6" stroke="#991B1B" strokeWidth="3" fill="none" strokeLinecap="round" />
          </g>
          {/* Right Clog */}
          <g transform={`translate(${cx + 8}, ${feetY - 8})`}>
            <rect x="0" y="6" width="28" height="8" rx="2" fill="#78350F" stroke="#451A03" strokeWidth="0.8" />
            <rect x="3" y="14" width="6" height="4" fill="#451A03" />
            <rect x="19" y="14" width="6" height="4" fill="#451A03" />
            <path d="M4 6 Q14 -2 24 6" stroke="#991B1B" strokeWidth="3" fill="none" strokeLinecap="round" />
          </g>
        </g>
      )}

      {footwear === 'sneaker' && (
        <g id="sneaker" filter="url(#accessoryShadow)">
          {/* Modern Chunky Sneakers at feet */}
          {/* Left Sneaker */}
          <g transform={`translate(${cx - 40}, ${feetY - 12})`}>
            <path
              d="M2 14 L8 2 Q18 2 24 8 L32 10 Q34 14 30 18 L2 18 Z"
              fill="url(#sneakerWhite)"
              stroke="#94A3B8"
              strokeWidth="1"
            />
            {/* Chunky sole */}
            <path d="M0 17 L33 17 Q34 22 28 22 L2 22 Q0 20 0 17 Z" fill="#0F172A" />
            {/* Cyan / Orange accent swoosh */}
            <path d="M8 12 Q16 10 26 14" stroke="#0284C7" strokeWidth="2" fill="none" strokeLinecap="round" />
            {/* Laces */}
            <line x1="12" y1="6" x2="16" y2="9" stroke="#E2E8F0" strokeWidth="1.2" />
            <line x1="15" y1="8" x2="19" y2="11" stroke="#E2E8F0" strokeWidth="1.2" />
          </g>
          {/* Right Sneaker */}
          <g transform={`translate(${cx + 8}, ${feetY - 12})`}>
            <path
              d="M2 10 Q10 8 16 2 L22 2 L30 14 L30 18 L2 18 Z"
              fill="url(#sneakerWhite)"
              stroke="#94A3B8"
              strokeWidth="1"
            />
            <path d="M-1 17 L32 17 Q32 22 26 22 L0 22 Q-1 20 -1 17 Z" fill="#0F172A" />
            <path d="M6 14 Q16 10 24 12" stroke="#0284C7" strokeWidth="2" fill="none" strokeLinecap="round" />
            <line x1="13" y1="11" x2="17" y2="8" stroke="#E2E8F0" strokeWidth="1.2" />
            <line x1="16" y1="9" x2="20" y2="6" stroke="#E2E8F0" strokeWidth="1.2" />
          </g>
        </g>
      )}
    </svg>
  );
}
