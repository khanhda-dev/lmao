import React from 'react';

export interface AccessoryVisualsProps {
  modelId: string;
  gender: 'nam' | 'nu';
  headwear: string;
  footwear: string;
  jewelry: string[];
  handheld: string;
  genz: string[];
  layer?: 'all' | 'back' | 'front';
}

export default function AccessoryVisuals({
  modelId,
  gender,
  headwear,
  footwear,
  jewelry,
  handheld,
  genz,
  layer = 'all'
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
    viewBox = '0 -50 360 615';
    cx = 180;
    headY = 45;
    neckY = 112;
    chestY = 165;
    waistY = 250;
    wristLeft = { x: 55, y: 305 };
    wristRight = { x: 305, y: 305 };
    feetY = 535;
  } else if (modelId === 'hoang_bao_long_trieu') {
    viewBox = '0 -50 288 615';
    cx = 144;
    headY = 45;
    neckY = 112;
    chestY = 165;
    waistY = 250;
    wristLeft = { x: 40, y: 308 };
    wristRight = { x: 248, y: 308 };
    feetY = 535;
  } else if (modelId === 'ngu_than_xanh_cham') {
    viewBox = '0 -50 231 615';
    cx = 115.5;
    headY = 45;
    neckY = 110;
    chestY = 160;
    waistY = 250;
    wristLeft = { x: 22, y: 305 };
    wristRight = { x: 209, y: 305 };
    feetY = 535;
  } else if (modelId === 'ngu_than_tu_sac') {
    viewBox = '0 -50 285 615';
    cx = 142.5;
    headY = 45;
    neckY = 110;
    chestY = 160;
    waistY = 250;
    wristLeft = { x: 40, y: 305 };
    wristRight = { x: 245, y: 305 };
    feetY = 535;
  } else if (modelId === 'ao_tac_do_son_khan') {
    viewBox = '0 -50 272 615';
    cx = 136;
    headY = 45;
    neckY = 110;
    chestY = 160;
    waistY = 250;
    wristLeft = { x: 45, y: 305 };
    wristRight = { x: 227, y: 305 };
    feetY = 535;
  } else if (modelId === 'giao_linh_thien_thanh') {
    viewBox = '0 -50 279 615';
    cx = 139.5;
    headY = 45;
    neckY = 110;
    chestY = 160;
    waistY = 250;
    wristLeft = { x: 40, y: 305 };
    wristRight = { x: 239, y: 305 };
    feetY = 535;
  } else if (modelId === 'phuong_bao_hoang_hau') {
    viewBox = '0 0 300 519';
    cx = 150;
    headY = 20;
    neckY = 88;
    chestY = 145;
    waistY = 220;
    wristLeft = { x: 50, y: 280 };
    wristRight = { x: 250, y: 280 };
    feetY = 505;
  } else if (modelId === 'bach_y_cong_chua') {
    viewBox = '0 0 340 519';
    cx = 170;
    headY = 20;
    neckY = 88;
    chestY = 160;
    waistY = 225;
    wristLeft = { x: 65, y: 290 };
    wristRight = { x: 275, y: 290 };
    feetY = 510;
  } else if (modelId === 'ao_tac_nu' || modelId === 'ao_tac_do_son_bun') {
    viewBox = '0 0 290 519';
    cx = 145;
    headY = 20;
    neckY = 88;
    chestY = 140;
    waistY = 220;
    wristLeft = { x: 42, y: 280 };
    wristRight = { x: 248, y: 280 };
    feetY = 505;
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
    headY = 20;
    neckY = 88;
    chestY = 140;
    waistY = 220;
    wristLeft = { x: 45, y: 280 };
    wristRight = { x: 255, y: 280 };
    feetY = 505;
  } else if (modelId === 'ngu_than_bich_thuy') {
    viewBox = '0 0 226 519';
    cx = 113;
    headY = 20;
    neckY = 88;
    chestY = 135;
    waistY = 210;
    wristLeft = { x: 20, y: 270 };
    wristRight = { x: 206, y: 270 };
    feetY = 505;
  } else if (modelId.startsWith('ngu_than')) {
    viewBox = '0 0 231 561';
    cx = 115.5;
    headY = 45;
    neckY = 110;
    chestY = 170;
    waistY = 265;
    wristLeft = { x: 22, y: 315 };
    wristRight = { x: 209, y: 315 };
    feetY = 535;
  } else if (modelId.startsWith('ao_tac') || modelId.startsWith('le_phuc')) {
    viewBox = '0 0 328 519';
    cx = 164;
    headY = 20;
    neckY = 88;
    chestY = 140;
    waistY = 220;
    wristLeft = { x: 55, y: 280 };
    wristRight = { x: 273, y: 280 };
    feetY = 505;
  } else if (modelId.startsWith('giao_linh_thien_thanh')) {
    const hasBun = modelId.includes('bun');
    viewBox = hasBun ? '0 0 287 519' : '0 -50 279 615';
    cx = hasBun ? 143.5 : 139.5;
    headY = hasBun ? 20 : 45;
    neckY = hasBun ? 88 : 110;
    chestY = hasBun ? 140 : 160;
    waistY = hasBun ? 220 : 250;
    wristLeft = hasBun ? { x: 35, y: 280 } : { x: 40, y: 305 };
    wristRight = hasBun ? { x: 252, y: 280 } : { x: 239, y: 305 };
    feetY = hasBun ? 505 : 535;
  }

  const isNu = gender === 'nu';
  const zIndexClass = layer === 'back' ? 'z-0' : layer === 'front' ? 'z-20' : 'z-10';
  const isRestrictedHeadwearModel =
    ['phuong_bao_hoang_hau', 'giao_linh_nam', 'hoang_bao_long_trieu', 'bach_y_cong_chua'].includes(modelId) ||
    modelId.includes('phuong_bao') ||
    modelId.includes('long_bao') ||
    modelId.includes('con_phuc') ||
    modelId.includes('quan_phuc') ||
    modelId.includes('hau_dong');

  const activeHeadwear = isRestrictedHeadwearModel ? 'none' : headwear;
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
      className={`absolute inset-0 w-full h-full max-h-[500px] object-contain pointer-events-none transition-all duration-300 ${zIndexClass} overflow-visible`}
      style={{ overflow: 'visible', zIndex: layer === 'back' ? 0 : layer === 'front' ? 20 : 10 }}
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

        <linearGradient id="blueSilkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="50%" stopColor="#1D4ED8" />
          <stop offset="100%" stopColor="#1E3A8A" />
        </linearGradient>

        <filter id="accessoryShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="2.5" floodColor="#000" floodOpacity="0.3" />
        </filter>
      </defs>

      {/* ========================================================
          1. TRADITIONAL HEADWEAR (Đồ đội đầu)
          ======================================================== */}
      {/* Nón Dấu - Dark Inner Underside Socket (Render in back layer behind head) */}
      {activeHeadwear === 'non_dau' && (layer === 'back' || layer === 'all') && (() => {
        const rx = isNu ? 48 : 55;
        const ry = isNu ? 11 : 13;
        const baseY = headY + (isNu ? 6 : 7);
        return (
          <g id="nonDauInner" filter="url(#accessoryShadow)">
            <ellipse cx={cx} cy={baseY} rx={rx} ry={ry} fill="#7A0C12" stroke="#4A0508" strokeWidth="1.2" />
            <ellipse cx={cx} cy={baseY - 2} rx={rx * 0.72} ry={ry * 0.72} fill="#4E0509" />
          </g>
        );
      })()}

      {activeHeadwear === 'non_ba_tam' && (() => {
        const scale = isNu ? 0.175 : 0.195;
        const tx = cx - 450 * scale;
        const ty = headY - 14 - 230 * scale;

        return (
          <g id="nonBaTam" filter="url(#accessoryShadow)" transform={`translate(${tx}, ${ty}) scale(${scale})`}>
            {/* Quai Thao Ribbons & Silk Chin Straps (Render in front layer) */}
            {(layer === 'front' || layer === 'all') && (
              <>
                <path d="M229 369C233 581 279 888 432 951C555 1003 649 663 673 389" stroke="#172E3D" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M229 369C233 581 279 888 432 951C555 1003 649 663 673 389" stroke="#526874" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </>
            )}

            {/* Nón Ba Tầm Circular Flat Rim & Top Crown (Render in back layer behind head) */}
            {(layer === 'back' || layer === 'all') && (
              <>
                <path d="M450 191C542.408 191 626.021 206.655 686.495 231.928C716.734 244.565 741.141 259.587 757.972 276.217C774.799 292.843 784 311.017 784 330C784 348.983 774.799 367.157 757.972 383.783C741.141 400.413 716.734 415.435 686.495 428.072C626.021 453.345 542.408 469 450 469C357.592 469 273.979 453.345 213.505 428.072C183.266 415.435 158.859 400.413 142.028 383.783C125.201 367.157 116 348.983 116 330C116 311.017 125.201 292.843 142.028 276.217C158.859 259.587 183.266 244.565 213.505 231.928C273.979 206.655 357.592 191 450 191Z" fill="#C49B51" stroke="#584631" strokeWidth="2" />
            <path d="M450 197.65C540.512 197.65 622.425 212.528 681.687 236.558C711.319 248.573 735.256 262.863 751.774 278.699C768.291 294.533 777.35 311.87 777.35 330C777.35 348.13 768.291 365.467 751.774 381.301C735.256 397.137 711.319 411.427 681.687 423.442C622.425 447.472 540.512 462.35 450 462.35C359.488 462.35 277.575 447.472 218.313 423.442C188.681 411.427 164.744 397.137 148.226 381.301C131.709 365.467 122.65 348.13 122.65 330C122.65 311.87 131.709 294.533 148.226 278.699C164.744 262.863 188.681 248.573 218.313 236.558C277.575 212.528 359.488 197.65 450 197.65Z" stroke="#92703C" strokeWidth="1.3" />
            <path d="M450 202.05C536.951 202.05 615.654 216.406 672.606 239.602C701.084 251.201 724.106 265.004 740.003 280.312C755.899 295.62 764.65 312.41 764.65 330C764.65 347.589 755.899 364.381 740.003 379.688C724.106 394.997 701.083 408.798 672.606 420.397C615.654 443.594 536.951 457.95 450 457.95C363.049 457.95 284.346 443.594 227.394 420.397C198.917 408.798 175.894 394.997 159.997 379.688C144.101 364.381 135.35 347.589 135.35 330C135.35 312.41 144.101 295.62 159.997 280.312C175.894 265.004 198.916 251.201 227.394 239.602C284.346 216.406 363.049 202.05 450 202.05Z" stroke="#D8B775" strokeWidth="0.7" />
            <path d="M450 206.75C533.361 206.75 608.814 220.579 663.414 242.925C690.715 254.099 712.785 267.395 728.024 282.141C743.262 296.886 751.65 313.059 751.65 330C751.65 346.941 743.263 363.114 728.024 377.859C712.785 392.605 690.715 405.901 663.414 417.075C608.814 439.421 533.361 453.25 450 453.25C366.639 453.25 291.186 439.421 236.586 417.075C209.285 405.901 187.215 392.605 171.976 377.859C156.737 363.114 148.35 346.941 148.35 330C148.35 313.059 156.738 296.886 171.976 282.141C187.215 267.395 209.285 254.099 236.586 242.925C291.186 220.579 366.639 206.75 450 206.75Z" stroke="#D8B775" strokeWidth="0.7" />
            <path d="M450 211.75C529.742 211.75 601.904 225.049 654.106 246.526C680.209 257.265 701.291 270.037 715.836 284.185C730.379 298.331 738.35 313.813 738.35 330C738.349 346.187 730.379 361.669 715.836 375.815C701.291 389.963 680.209 402.735 654.106 413.474C601.904 434.951 529.742 448.25 450 448.25C370.258 448.25 298.096 434.951 245.894 413.474C219.791 402.735 198.709 389.963 184.164 375.815C169.621 361.669 161.651 346.187 161.65 330C161.65 313.813 169.621 298.331 184.164 284.185C198.709 270.037 219.791 257.265 245.894 246.526C298.096 225.049 370.258 211.75 450 211.75Z" stroke="#92703C" strokeWidth="1.3" />
            <path d="M450 216.15C526.181 216.15 595.133 228.927 645.027 249.572C669.975 259.894 690.142 272.177 704.065 285.798C717.988 299.418 725.65 314.355 725.65 330C725.65 345.645 717.988 360.581 704.065 374.201C690.142 387.823 669.975 400.105 645.027 410.428C595.133 431.073 526.181 443.85 450 443.85C373.819 443.85 304.867 431.073 254.973 410.428C230.025 400.105 209.858 387.823 195.935 374.201C182.012 360.581 174.35 345.645 174.35 330C174.35 314.355 182.012 299.418 195.935 285.798C209.858 272.177 230.025 259.894 254.973 249.572C304.867 228.927 373.819 216.15 450 216.15Z" stroke="#D8B775" strokeWidth="0.7" />
            <path d="M450 220.85C522.591 220.85 588.293 233.101 635.835 252.895C659.606 262.792 678.821 274.568 692.087 287.627C705.352 300.684 712.65 315.003 712.65 330C712.65 344.997 705.352 359.316 692.087 372.373C678.821 385.432 659.606 397.208 635.835 407.105C588.293 426.899 522.591 439.15 450 439.15C377.409 439.15 311.707 426.899 264.165 407.105C240.394 397.208 221.179 385.432 207.913 372.373C194.648 359.316 187.35 344.997 187.35 330C187.35 315.003 194.648 300.684 207.913 287.627C221.179 274.568 240.394 262.792 264.165 252.895C311.707 233.101 377.409 220.85 450 220.85Z" stroke="#D8B775" strokeWidth="0.7" />
            <path d="M450 225.85C518.971 225.85 581.382 237.571 626.525 256.495C649.099 265.958 667.324 277.208 679.896 289.669C692.466 302.127 699.35 315.755 699.35 330C699.35 344.245 692.466 357.873 679.896 370.331C667.324 382.791 649.099 394.043 626.525 403.506C581.382 422.43 518.971 434.15 450 434.15C381.029 434.15 318.618 422.43 273.475 403.506C250.901 394.043 232.676 382.791 220.104 370.331C207.534 357.873 200.65 344.245 200.65 330C200.65 315.755 207.534 302.127 220.104 289.669C232.676 277.208 250.901 265.958 273.475 256.495C318.618 237.571 381.029 225.85 450 225.85Z" stroke="#92703C" strokeWidth="1.3" />
            <path d="M450 230.25C515.411 230.25 574.612 241.448 617.448 259.541C638.867 268.587 656.177 279.35 668.128 291.284C680.077 303.216 686.65 316.299 686.65 330C686.65 343.7 680.077 356.783 668.128 368.715C656.177 380.649 638.867 391.412 617.448 400.459C574.612 418.551 515.411 429.75 450 429.75C384.589 429.75 325.388 418.551 282.552 400.459C261.133 391.412 243.823 380.649 231.872 368.715C219.923 356.783 213.35 343.7 213.35 330C213.35 316.299 219.923 303.216 231.872 291.284C243.823 279.35 261.133 268.587 282.552 259.541C325.388 241.448 384.589 230.25 450 230.25Z" stroke="#D8B775" strokeWidth="0.7" />
            <path d="M450 234.95C511.82 234.95 567.772 245.622 608.255 262.864C628.497 271.485 644.855 281.742 656.148 293.113C667.44 304.482 673.65 316.948 673.65 330C673.65 343.053 667.44 355.517 656.148 366.887C644.855 378.258 628.497 388.515 608.255 397.136C567.772 414.378 511.82 425.05 450 425.05C388.18 425.05 332.228 414.378 291.745 397.136C271.503 388.515 255.145 378.258 243.852 366.887C232.56 355.517 226.35 343.053 226.35 330C226.35 316.948 232.56 304.482 243.852 293.113C255.145 281.742 271.503 271.485 291.745 262.864C332.228 245.622 388.18 234.95 450 234.95Z" stroke="#D8B775" strokeWidth="0.7" />
            <path d="M450 239.95C508.199 239.95 560.858 250.091 598.942 266.462C617.986 274.648 633.356 284.38 643.955 295.152C654.552 305.921 660.35 317.696 660.35 330C660.35 342.304 654.552 354.08 643.955 364.849C633.356 375.621 617.986 385.351 598.942 393.537C560.858 409.908 508.199 420.05 450 420.05C391.801 420.05 339.142 409.908 301.058 393.537C282.014 385.351 266.644 375.621 256.045 364.849C245.448 354.08 239.65 342.304 239.65 330C239.65 317.696 245.448 305.921 256.045 295.152C266.644 284.38 282.014 274.648 301.058 266.462C339.142 250.091 391.801 239.95 450 239.95Z" stroke="#92703C" strokeWidth="1.3" />
            <path d="M450 244.35C504.64 244.35 554.091 253.97 589.868 269.51C607.757 277.28 622.212 286.524 632.189 296.77C642.165 307.014 647.65 318.243 647.65 330C647.65 341.757 642.165 352.986 632.189 363.23C622.212 373.476 607.757 382.72 589.868 390.49C554.091 406.03 504.64 415.65 450 415.65C395.36 415.65 345.909 406.03 310.132 390.49C292.243 382.72 277.788 373.476 267.811 363.23C257.835 352.986 252.35 341.757 252.35 330C252.35 318.243 257.835 307.014 267.811 296.77C277.788 286.524 292.243 277.28 310.132 269.51C345.909 253.97 395.36 244.35 450 244.35Z" stroke="#D8B775" strokeWidth="0.7" />
            <path d="M450 249.05C501.05 249.05 547.249 258.144 580.674 272.833C597.387 280.177 610.89 288.914 620.21 298.597C629.528 308.279 634.65 318.89 634.65 330C634.65 341.11 629.528 351.721 620.21 361.403C610.89 371.087 597.387 379.823 580.674 387.168C547.249 401.856 501.049 410.95 450 410.95C398.951 410.95 352.751 401.856 319.326 387.168C302.613 379.823 289.11 371.087 279.79 361.403C270.472 351.721 265.35 341.11 265.35 330C265.35 318.89 270.472 308.279 279.79 298.597C289.11 288.914 302.613 280.177 319.326 272.833C352.751 258.144 398.95 249.05 450 249.05Z" stroke="#D8B775" strokeWidth="0.7" />
            <path d="M450 254.05C497.427 254.05 540.334 262.612 571.358 276.429C586.871 283.338 599.385 291.548 608.012 300.631C616.635 309.711 621.349 319.635 621.35 330C621.35 340.365 616.635 350.289 608.012 359.369C599.385 368.452 586.871 376.662 571.358 383.571C540.334 397.388 497.427 405.95 450 405.95C402.573 405.95 359.666 397.388 328.642 383.571C313.129 376.662 300.615 368.452 291.988 359.369C283.365 350.289 278.65 340.365 278.65 330C278.651 319.635 283.365 309.711 291.988 300.631C300.615 291.548 313.129 283.338 328.642 276.429C359.666 262.612 402.573 254.05 450 254.05Z" stroke="#92703C" strokeWidth="1.3" />
            <path d="M450 258.45C493.869 258.45 533.568 266.491 562.286 279.478C591.037 292.479 608.65 310.368 608.65 330C608.65 349.632 591.036 367.521 562.286 380.522C533.568 393.508 493.869 401.55 450 401.55C406.131 401.55 366.432 393.508 337.714 380.522C308.964 367.521 291.35 349.632 291.35 330C291.35 310.368 308.963 292.479 337.714 279.478C366.432 266.491 406.131 258.45 450 258.45Z" stroke="#D8B775" strokeWidth="0.7" />
            <path d="M450 263.15C490.278 263.15 526.726 270.665 553.091 282.8C579.486 294.949 595.65 311.663 595.65 330C595.65 348.338 579.486 365.05 553.091 377.199C526.726 389.335 490.278 396.85 450 396.85C409.722 396.85 373.274 389.335 346.909 377.199C320.514 365.05 304.35 348.338 304.35 330C304.35 311.663 320.514 294.949 346.909 282.8C373.274 270.665 409.722 263.15 450 263.15Z" stroke="#D8B775" strokeWidth="0.7" />
            <path d="M450 268.15C486.653 268.15 519.805 275.133 543.769 286.395C567.784 297.68 582.35 313.141 582.35 330C582.35 346.859 567.784 362.32 543.769 373.605C519.805 384.867 486.653 391.85 450 391.85C413.347 391.85 380.195 384.867 356.231 373.605C332.216 362.32 317.65 346.859 317.65 330C317.65 313.141 332.216 297.68 356.231 286.395C380.195 275.133 413.347 268.15 450 268.15Z" stroke="#92703C" strokeWidth="1.3" />
            <path d="M450 272.55C483.096 272.55 513.042 279.012 534.701 289.444C556.385 299.888 569.65 314.25 569.65 330C569.65 345.75 556.385 360.111 534.701 370.555C513.042 380.988 483.096 387.45 450 387.45C416.904 387.45 386.958 380.988 365.299 370.555C343.615 360.111 330.35 345.75 330.35 330C330.35 314.25 343.615 299.888 365.299 289.444C386.958 279.012 416.904 272.55 450 272.55Z" stroke="#D8B775" strokeWidth="0.7" />

            {/* Radial Weave Texture Ribs */}
            <path d="M537 330H777" stroke="#8F6F3C" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M536.828 332.26L776.355 338.351" stroke="#E6C98E" strokeWidth="0.65" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M536.314 334.512L774.421 346.669" stroke="#E6C98E" strokeWidth="0.65" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M535.459 336.746L771.208 354.922" stroke="#E6C98E" strokeWidth="0.65" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M534.267 338.953L766.727 363.076" stroke="#8F6F3C" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M532.742 341.125L760.996 371.099" stroke="#E6C98E" strokeWidth="0.65" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M530.891 343.252L754.037 378.961" stroke="#E6C98E" strokeWidth="0.65" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M528.72 345.328L745.878 386.629" stroke="#E6C98E" strokeWidth="0.65" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M526.239 347.343L736.552 394.073" stroke="#8F6F3C" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M523.457 349.29L726.095 401.265" stroke="#E6C98E" strokeWidth="0.65" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M520.384 351.16L714.548 408.175" stroke="#E6C98E" strokeWidth="0.65" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M517.035 352.947L701.958 414.777" stroke="#E6C98E" strokeWidth="0.65" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M513.42 354.644L688.373 421.045" stroke="#8F6F3C" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M509.556 356.243L673.847 426.953" stroke="#E6C98E" strokeWidth="0.65" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M505.456 357.739L658.438 432.478" stroke="#E6C98E" strokeWidth="0.65" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M501.137 359.125L642.206 437.599" stroke="#E6C98E" strokeWidth="0.65" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M496.617 360.396L625.216 442.296" stroke="#8F6F3C" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M491.913 361.547L607.533 446.549" stroke="#E6C98E" strokeWidth="0.65" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M487.043 362.574L589.23 450.342" stroke="#E6C98E" strokeWidth="0.65" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M482.027 363.472L570.377 453.66" stroke="#E6C98E" strokeWidth="0.65" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M476.884 364.238L551.048 456.491" stroke="#8F6F3C" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M471.636 364.869L531.322 458.822" stroke="#E6C98E" strokeWidth="0.65" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M466.302 365.362L511.274 460.644" stroke="#E6C98E" strokeWidth="0.65" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M460.904 365.716L490.984 461.951" stroke="#E6C98E" strokeWidth="0.65" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M455.463 365.929L470.533 462.738" stroke="#8F6F3C" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M450 366V463" stroke="#E6C98E" strokeWidth="0.65" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M444.537 365.929L429.467 462.738" stroke="#E6C98E" strokeWidth="0.65" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M439.096 365.716L409.016 461.951" stroke="#E6C98E" strokeWidth="0.65" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M433.698 365.362L388.727 460.644" stroke="#8F6F3C" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M428.364 364.869L368.678 458.822" stroke="#E6C98E" strokeWidth="0.65" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M423.116 364.238L348.952 456.491" stroke="#E6C98E" strokeWidth="0.65" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M417.973 363.472L329.623 453.66" stroke="#E6C98E" strokeWidth="0.65" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M412.957 362.574L310.77 450.342" stroke="#8F6F3C" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M408.088 361.547L292.467 446.549" stroke="#E6C98E" strokeWidth="0.65" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M403.383 360.396L274.785 442.296" stroke="#E6C98E" strokeWidth="0.65" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M398.863 359.125L257.794 437.599" stroke="#E6C98E" strokeWidth="0.65" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M394.544 357.739L241.562 432.478" stroke="#8F6F3C" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M390.445 356.243L226.153 426.953" stroke="#E6C98E" strokeWidth="0.65" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M386.58 354.644L211.627 421.045" stroke="#E6C98E" strokeWidth="0.65" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M382.965 352.947L198.042 414.777" stroke="#E6C98E" strokeWidth="0.65" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M379.616 351.16L185.452 408.175" stroke="#8F6F3C" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M376.543 349.29L173.905 401.265" stroke="#E6C98E" strokeWidth="0.65" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M373.761 347.343L163.448 394.073" stroke="#E6C98E" strokeWidth="0.65" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M371.28 345.328L154.122 386.629" stroke="#E6C98E" strokeWidth="0.65" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M369.109 343.252L145.963 378.961" stroke="#8F6F3C" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M367.258 341.125L139.004 371.099" stroke="#E6C98E" strokeWidth="0.65" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M365.733 338.953L133.273 363.076" stroke="#E6C98E" strokeWidth="0.65" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M364.541 336.746L128.792 354.922" stroke="#E6C98E" strokeWidth="0.65" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M363.686 334.512L125.579 346.669" stroke="#8F6F3C" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M363.171 332.26L123.645 338.351" stroke="#E6C98E" strokeWidth="0.65" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M363 330H123" stroke="#E6C98E" strokeWidth="0.65" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M363.171 327.74L123.645 321.649" stroke="#E6C98E" strokeWidth="0.65" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M363.686 325.488L125.579 313.331" stroke="#8F6F3C" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M364.541 323.254L128.792 305.078" stroke="#E6C98E" strokeWidth="0.65" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M365.733 321.047L133.273 296.924" stroke="#E6C98E" strokeWidth="0.65" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M367.258 318.875L139.004 288.901" stroke="#E6C98E" strokeWidth="0.65" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M369.109 316.748L145.963 281.039" stroke="#8F6F3C" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M371.28 314.672L154.122 273.371" stroke="#E6C98E" strokeWidth="0.65" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M373.761 312.657L163.448 265.927" stroke="#E6C98E" strokeWidth="0.65" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M376.543 310.71L173.905 258.735" stroke="#E6C98E" strokeWidth="0.65" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M379.616 308.84L185.452 251.825" stroke="#8F6F3C" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M382.965 307.053L198.042 245.223" stroke="#E6C98E" strokeWidth="0.65" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M386.58 305.356L211.627 238.955" stroke="#E6C98E" strokeWidth="0.65" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M390.445 303.757L226.153 233.047" stroke="#E6C98E" strokeWidth="0.65" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M394.544 302.262L241.562 227.522" stroke="#8F6F3C" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M398.863 300.875L257.794 222.401" stroke="#E6C98E" strokeWidth="0.65" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M403.383 299.604L274.785 217.704" stroke="#E6C98E" strokeWidth="0.65" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M408.088 298.453L292.467 213.451" stroke="#E6C98E" strokeWidth="0.65" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M412.957 297.426L310.77 209.658" stroke="#8F6F3C" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M417.973 296.528L329.623 206.34" stroke="#E6C98E" strokeWidth="0.65" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M423.116 295.762L348.952 203.51" stroke="#E6C98E" strokeWidth="0.65" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M428.364 295.131L368.678 201.178" stroke="#E6C98E" strokeWidth="0.65" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M433.698 294.638L388.727 199.356" stroke="#8F6F3C" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M439.096 294.284L409.016 198.049" stroke="#E6C98E" strokeWidth="0.65" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M444.537 294.071L429.467 197.262" stroke="#E6C98E" strokeWidth="0.65" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M450 294L450 197" stroke="#E6C98E" strokeWidth="0.65" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M455.463 294.071L470.533 197.262" stroke="#8F6F3C" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M460.904 294.284L490.984 198.049" stroke="#E6C98E" strokeWidth="0.65" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M466.302 294.638L511.274 199.356" stroke="#E6C98E" strokeWidth="0.65" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M471.636 295.131L531.322 201.178" stroke="#E6C98E" strokeWidth="0.65" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M476.884 295.762L551.048 203.51" stroke="#8F6F3C" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M482.027 296.528L570.377 206.34" stroke="#E6C98E" strokeWidth="0.65" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M487.043 297.426L589.23 209.658" stroke="#E6C98E" strokeWidth="0.65" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M491.913 298.453L607.533 213.451" stroke="#E6C98E" strokeWidth="0.65" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M496.617 299.604L625.216 217.704" stroke="#8F6F3C" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M501.137 300.875L642.206 222.401" stroke="#E6C98E" strokeWidth="0.65" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M505.456 302.262L658.438 227.522" stroke="#E6C98E" strokeWidth="0.65" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M509.556 303.757L673.847 233.047" stroke="#E6C98E" strokeWidth="0.65" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M513.42 305.356L688.373 238.955" stroke="#8F6F3C" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M517.035 307.053L701.958 245.223" stroke="#E6C98E" strokeWidth="0.65" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M520.384 308.84L714.548 251.825" stroke="#E6C98E" strokeWidth="0.65" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M523.457 310.71L726.095 258.735" stroke="#E6C98E" strokeWidth="0.65" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M526.239 312.657L736.552 265.927" stroke="#8F6F3C" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M528.72 314.672L745.878 273.371" stroke="#E6C98E" strokeWidth="0.65" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M530.891 316.748L754.037 281.039" stroke="#E6C98E" strokeWidth="0.65" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M532.742 318.875L760.996 288.901" stroke="#E6C98E" strokeWidth="0.65" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M534.267 321.047L766.727 296.924" stroke="#8F6F3C" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M535.459 323.254L771.208 305.078" stroke="#E6C98E" strokeWidth="0.65" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M536.314 325.488L774.421 313.331" stroke="#E6C98E" strokeWidth="0.65" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M536.828 327.74L776.355 321.649" stroke="#E6C98E" strokeWidth="0.65" strokeLinecap="round" strokeLinejoin="round" />

            {/* Inner Crown & Inset Socket */}
            <path d="M450 280C477.501 280 502.349 285.241 520.285 293.671C538.3 302.138 549 313.637 549 326C549 338.363 538.3 349.862 520.285 358.329C502.349 366.759 477.501 372 450 372C422.499 372 397.651 366.759 379.715 358.329C361.7 349.862 351 338.363 351 326C351 313.637 361.7 302.138 379.715 293.671C397.651 285.241 422.499 280 450 280Z" fill="#92703D" stroke="#634C2D" strokeWidth="2" />
            <path d="M450 286C474.754 286 497.117 290.182 513.255 296.906C521.326 300.269 527.792 304.248 532.226 308.615C536.655 312.979 539 317.671 539 322.5C539 327.329 536.655 332.021 532.226 336.385C527.792 340.752 521.326 344.731 513.255 348.094C497.117 354.818 474.754 359 450 359C425.246 359 402.883 354.818 386.745 348.094C378.674 344.731 372.208 340.752 367.774 336.385C363.345 332.021 361 327.329 361 322.5C361 317.671 363.345 312.979 367.774 308.615C372.208 304.248 378.674 300.269 386.745 296.906C402.883 290.182 425.246 286 450 286Z" fill="#544934" stroke="#B18B49" strokeWidth="2" />
            <path d="M362 319C389 342 506 352 538 319L537 340C505 367 393 358 362 334V319Z" fill="#D7B777" stroke="#6E5733" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />

            {/* Flat Cylindrical Hat Wall */}
            <path d="M115 260C115 79 785 79 785 260V330C785 151 115 151 115 330V260Z" fill="#F0D69E" stroke="#67543B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M115 264V326" stroke="#C2A169" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M115.153 259.923V321.923" stroke="#DEC18B" strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M115.611 255.849V317.849" stroke="#DEC18B" strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M116.375 251.783V313.783" stroke="#DEC18B" strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M117.442 247.728V309.728" stroke="#C2A169" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M118.814 243.687V305.687" stroke="#DEC18B" strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M120.487 239.666V301.666" stroke="#DEC18B" strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M122.461 235.666V297.666" stroke="#DEC18B" strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M124.734 231.692V293.692" stroke="#C2A169" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M127.304 227.748V289.748" stroke="#DEC18B" strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M130.168 223.837V285.837" stroke="#DEC18B" strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M133.325 219.963V281.963" stroke="#DEC18B" strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M136.77 216.128V278.128" stroke="#C2A169" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M140.5 212.338V274.338" stroke="#DEC18B" strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M144.514 208.594V270.594" stroke="#DEC18B" strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M148.806 204.901V266.901" stroke="#DEC18B" strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M153.372 201.262V263.262" stroke="#C2A169" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M158.209 197.681V259.681" stroke="#DEC18B" strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M163.313 194.159V256.159" stroke="#DEC18B" strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M168.679 190.702V252.702" stroke="#DEC18B" strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M174.3 187.311V249.311" stroke="#C2A169" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M180.174 183.991V245.991" stroke="#DEC18B" strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M186.293 180.743V242.743" stroke="#DEC18B" strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M192.654 177.571V239.571" stroke="#DEC18B" strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M199.249 174.478V236.478" stroke="#C2A169" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M206.073 171.467V233.467" stroke="#DEC18B" strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M213.119 168.541V230.541" stroke="#DEC18B" strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M220.382 165.701V227.701" stroke="#DEC18B" strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M227.854 162.951V224.951" stroke="#C2A169" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M235.529 160.293V222.293" stroke="#DEC18B" strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M243.399 157.73V219.73" stroke="#DEC18B" strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M251.458 155.264V217.264" stroke="#DEC18B" strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M259.698 152.897V214.897" stroke="#C2A169" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M268.112 150.632V212.632" stroke="#DEC18B" strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M276.692 148.469V210.469" stroke="#DEC18B" strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M285.43 146.413V208.413" stroke="#DEC18B" strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M294.318 144.463V206.463" stroke="#C2A169" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M303.348 142.623V204.623" stroke="#DEC18B" strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M312.512 140.894V202.894" stroke="#DEC18B" strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M321.801 139.276V201.276" stroke="#DEC18B" strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M331.208 137.773V199.773" stroke="#C2A169" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M340.722 136.385V198.385" stroke="#DEC18B" strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M350.336 135.113V197.113" stroke="#DEC18B" strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M360.042 133.958V195.958" stroke="#DEC18B" strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M369.829 132.923V194.923" stroke="#C2A169" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M379.69 132.007V194.007" stroke="#DEC18B" strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M389.615 131.211V193.211" stroke="#DEC18B" strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M399.594 130.537V192.537" stroke="#DEC18B" strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M409.62 129.984V191.984" stroke="#C2A169" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M419.683 129.554V191.554" stroke="#DEC18B" strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M429.773 129.246V191.246" stroke="#DEC18B" strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M439.882 129.062V191.062" stroke="#DEC18B" strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M450 129V191" stroke="#C2A169" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M460.118 129.062V191.062" stroke="#DEC18B" strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M470.227 129.246V191.246" stroke="#DEC18B" strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M480.317 129.554V191.554" stroke="#DEC18B" strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M490.38 129.984V191.984" stroke="#C2A169" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M500.406 130.537V192.537" stroke="#DEC18B" strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M510.385 131.211V193.211" stroke="#DEC18B" strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M520.31 132.007V194.007" stroke="#DEC18B" strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M530.171 132.923V194.923" stroke="#C2A169" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M539.958 133.958V195.958" stroke="#DEC18B" strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M549.664 135.113V197.113" stroke="#DEC18B" strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M559.278 136.385V198.385" stroke="#DEC18B" strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M568.792 137.773V199.773" stroke="#C2A169" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M578.199 139.276V201.276" stroke="#DEC18B" strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M587.488 140.894V202.894" stroke="#DEC18B" strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M596.652 142.623V204.623" stroke="#DEC18B" strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M605.682 144.463V206.463" stroke="#C2A169" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M614.57 146.413V208.413" stroke="#DEC18B" strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M623.308 148.469V210.469" stroke="#DEC18B" strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M631.888 150.632V212.632" stroke="#DEC18B" strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M640.302 152.897V214.897" stroke="#C2A169" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M648.542 155.264V217.264" stroke="#DEC18B" strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M656.601 157.73V219.73" stroke="#DEC18B" strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M664.471 160.293V222.293" stroke="#DEC18B" strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M672.146 162.951V224.951" stroke="#C2A169" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M679.618 165.701V227.701" stroke="#DEC18B" strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M686.881 168.541V230.541" stroke="#DEC18B" strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M693.927 171.467V233.467" stroke="#DEC18B" strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M700.751 174.478V236.478" stroke="#C2A169" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M707.346 177.571V239.571" stroke="#DEC18B" strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M713.707 180.743V242.743" stroke="#DEC18B" strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M719.826 183.991V245.991" stroke="#DEC18B" strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M725.7 187.311V249.311" stroke="#C2A169" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M731.321 190.702V252.702" stroke="#DEC18B" strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M736.687 194.159V256.159" stroke="#DEC18B" strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M741.791 197.681V259.681" stroke="#DEC18B" strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M746.628 201.262V263.262" stroke="#C2A169" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M751.194 204.901V266.901" stroke="#DEC18B" strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M755.486 208.594V270.594" stroke="#DEC18B" strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M759.5 212.338V274.338" stroke="#DEC18B" strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M763.23 216.128V278.128" stroke="#C2A169" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M766.675 219.963V281.963" stroke="#DEC18B" strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M769.832 223.837V285.837" stroke="#DEC18B" strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M772.696 227.748V289.748" stroke="#DEC18B" strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M775.266 231.692V293.692" stroke="#C2A169" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M777.539 235.666V297.666" stroke="#DEC18B" strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M779.513 239.666V301.666" stroke="#DEC18B" strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M781.186 243.687V305.687" stroke="#DEC18B" strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M782.558 247.728V309.728" stroke="#C2A169" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M783.625 251.783V313.783" stroke="#DEC18B" strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M784.389 255.849V317.849" stroke="#DEC18B" strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M784.847 259.923V321.923" stroke="#DEC18B" strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M785 264V326" stroke="#C2A169" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M115 260C115 79 785 79 785 260" stroke="#FCEDC6" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M115 330C115 151 785 151 785 330" stroke="#A88951" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M115 330C115 517 785 517 785 330" stroke="#665135" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M119 331C119 511 781 511 781 331" stroke="#ECD29C" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

            {/* Front Brocade Embroidered Trim & Pearls */}
            <path d="M153 390C263 478 615 488 752 390L743 406C596 498 270 487 164 408L153 390Z" fill="#243A4B" stroke="#536170" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M166.167 386.586L169.167 382.586L172.167 386.586L169.167 390.586L166.167 386.586Z" fill="#E5D8B6" />
            <path d="M179.314 399.253L182.314 395.253L185.314 399.253L182.314 403.253L179.314 399.253Z" fill="#E5D8B6" />
            <path d="M194.999 411.254L197.999 407.254L200.999 411.254L197.999 415.254L194.999 411.254Z" fill="#E5D8B6" />
            <path d="M213.072 422.475L216.072 418.475L219.072 422.475L216.072 426.475L213.072 422.475Z" fill="#E5D8B6" />
            <path d="M233.361 432.811L236.361 428.811L239.361 432.811L236.361 436.811L233.361 432.811Z" fill="#E5D8B6" />
            <path d="M255.676 442.162L258.676 438.162L261.676 442.162L258.676 446.162L255.676 442.162Z" fill="#E5D8B6" />
            <path d="M279.803 450.442L282.803 446.442L285.803 450.442L282.803 454.442L279.803 450.442Z" fill="#E5D8B6" />
            <path d="M305.516 457.57L308.516 453.57L311.516 457.57L308.516 461.57L305.516 457.57Z" fill="#E5D8B6" />
            <path d="M332.568 463.479L335.568 459.479L338.568 463.479L335.568 467.479L332.568 463.479Z" fill="#E5D8B6" />
            <path d="M360.706 468.115L363.706 464.115L366.706 468.115L363.706 472.115L360.706 468.115Z" fill="#E5D8B6" />
            <path d="M389.661 471.432L392.661 467.432L395.661 471.432L392.661 475.432L389.661 471.432Z" fill="#E5D8B6" />
            <path d="M419.16 473.399L422.16 469.399L425.16 473.399L422.16 477.399L419.16 473.399Z" fill="#E5D8B6" />
            <path d="M448.923 473.997L451.923 469.997L454.923 473.997L451.923 477.997L448.923 473.997Z" fill="#E5D8B6" />
            <path d="M478.667 473.221L481.667 469.221L484.667 473.221L481.667 477.221L478.667 473.221Z" fill="#E5D8B6" />
            <path d="M508.111 471.079L511.111 467.079L514.111 471.079L511.111 475.079L508.111 471.079Z" fill="#E5D8B6" />
            <path d="M536.977 467.59L539.977 463.59L542.977 467.59L539.977 471.59L536.977 467.59Z" fill="#E5D8B6" />
            <path d="M564.989 462.788L567.989 458.788L570.989 462.788L567.989 466.788L564.989 462.788Z" fill="#E5D8B6" />
            <path d="M591.883 456.717L594.883 452.717L597.883 456.717L594.883 460.717L591.883 456.717Z" fill="#E5D8B6" />
            <path d="M617.404 449.436L620.404 445.436L623.404 449.436L620.404 453.436L617.404 449.436Z" fill="#E5D8B6" />
            <path d="M641.31 441.014L644.31 437.014L647.31 441.014L644.31 445.014L641.31 441.014Z" fill="#E5D8B6" />
            <path d="M663.375 431.531L666.375 427.531L669.375 431.531L666.375 435.531L663.375 431.531Z" fill="#E5D8B6" />
            <path d="M683.389 421.075L686.389 417.075L689.389 421.075L686.389 425.075L683.389 421.075Z" fill="#E5D8B6" />
            <path d="M701.162 409.747L704.162 405.747L707.162 409.747L704.162 413.747L701.162 409.747Z" fill="#E5D8B6" />
              </>
            )}

            {/* Left & Right Quai Thao Hanging Tassels & Knots (Render in front layer) */}
            {(layer === 'front' || layer === 'all') && (
              <>
                {/* Left Quai Thao Hanging Tassels */}
                <path d="M217 307C211 335 221 348 217 360" stroke="#EEE4CF" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M217 352.5C218.725 352.5 220.338 353.498 221.54 355.216C222.741 356.932 223.5 359.329 223.5 362C223.5 364.671 222.741 367.068 221.54 368.784C220.338 370.502 218.725 371.5 217 371.5C215.275 371.5 213.662 370.502 212.46 368.784C211.259 367.068 210.5 364.671 210.5 362C210.5 359.329 211.259 356.932 212.46 355.216C213.662 353.498 215.275 352.5 217 352.5Z" fill="#E9DCC3" stroke="#B9A689" />
                <path d="M211 369C206 451.6 207 509 202 529C212 534.333 222 534.333 232 529C227 443.4 224 382 223 369H211Z" fill="#F5EFDF" stroke="#C6B697" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M212 373C212.333 430.867 210.667 482.533 207 528" stroke="#DED2BB" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M213 373C213.267 430.867 211.933 482.533 209 528" stroke="#FFFCF3" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M214 373C214.2 430.867 213.2 482.533 211 528" stroke="#DED2BB" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M215 373C215.133 430.867 214.467 482.533 213 528" stroke="#FFFCF3" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M216 373C216.067 430.867 215.733 482.533 215 528" stroke="#DED2BB" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M217 373C217 430.867 217 482.533 217 528" stroke="#FFFCF3" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M218 373C217.933 430.867 218.267 482.533 219 528" stroke="#DED2BB" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M219 373C218.867 430.867 219.533 482.533 221 528" stroke="#FFFCF3" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M220 373C219.8 430.867 220.8 482.533 223 528" stroke="#DED2BB" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M221 373C220.733 430.867 222.067 482.533 225 528" stroke="#FFFCF3" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M222 373C221.667 430.867 223.333 482.533 227 528" stroke="#DED2BB" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />

                {/* Right Quai Thao Hanging Tassels */}
                <path d="M691 322C685 350 695 363 691 375" stroke="#EEE4CF" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M691 367.5C692.725 367.5 694.338 368.498 695.54 370.216C696.741 371.932 697.5 374.329 697.5 377C697.5 379.671 696.741 382.068 695.54 383.784C694.338 385.502 692.725 386.5 691 386.5C689.275 386.5 687.662 385.502 686.46 383.784C685.259 382.068 684.5 379.671 684.5 377C684.5 374.329 685.259 371.932 686.46 370.216C687.662 368.498 689.275 367.5 691 367.5Z" fill="#E9DCC3" stroke="#B9A689" />
                <path d="M685 384C680 475.05 681 537 676 557C686 562.333 696 562.333 706 557C701 466.2 698 397 697 384H685Z" fill="#F5EFDF" stroke="#C6B697" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M686 388C686.333 451.933 684.667 507.933 681 556" stroke="#DED2BB" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M687 388C687.267 451.933 685.933 507.933 683 556" stroke="#FFFCF3" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M688 388C688.2 451.933 687.2 507.933 685 556" stroke="#DED2BB" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M689 388C689.133 451.933 688.467 507.933 687 556" stroke="#FFFCF3" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M690 388C690.067 451.933 689.733 507.933 689 556" stroke="#DED2BB" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M691 388C691 451.933 691 507.933 691 556" stroke="#FFFCF3" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M692 388C691.933 451.933 692.267 507.933 693 556" stroke="#DED2BB" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M693 388C692.867 451.933 693.533 507.933 695 556" stroke="#FFFCF3" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M694 388C693.8 451.933 694.8 507.933 697 556" stroke="#DED2BB" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M695 388C694.733 451.933 696.067 507.933 699 556" stroke="#FFFCF3" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M696 388C695.667 451.933 697.333 507.933 701 556" stroke="#DED2BB" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />

                {/* Quai Thao Knot Fasteners */}
                <path d="M222 366C211.333 361.333 207 355.333 209 348C219 344 227 349.333 233 364C242.333 352.667 249.333 350.333 254 357C254 367 245.667 371.333 229 370" stroke="#263D4E" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M673 389C662.333 380.333 659.667 373.333 665 368C675.667 370.667 679.667 377.667 677 389C685.667 378.333 693.333 376.667 700 384C696 394 687 395.667 673 389Z" stroke="#263D4E" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
              </>
            )}
          </g>
        );
      })()}

      {(layer === 'front' || layer === 'all') && (
        <>
          {activeHeadwear === 'non_dau' && (() => {
            const rx = isNu ? 48 : 55;
            const ry = isNu ? 11 : 13;
            const baseY = headY + (isNu ? 6 : 7);
            const apexY = headY - (isNu ? 36 : 42);
            const strapY = neckY - (isNu ? 4 : 2);

            return (
              <g id="nonDauFront" filter="url(#accessoryShadow)">
                {/* Conical military mandarin hat - front red canopy shell */}
                <path
                  d={`M${cx - rx} ${baseY} Q${cx} ${baseY + ry * 0.85} ${cx + rx} ${baseY} L${cx + 7} ${apexY + 10} L${cx - 7} ${apexY + 10} Z`}
                  fill="#C92A2A"
                  stroke="#800F15"
                  strokeWidth="1.2"
                />

                {/* Shaded cone contour ribs & highlight */}
                <path d={`M${cx - rx} ${baseY} Q${cx} ${baseY + ry * 0.85} ${cx + rx} ${baseY}`} stroke="#FFA8A8" strokeWidth="1" fill="none" opacity="0.4" />
                <path d={`M${cx} ${baseY + ry * 0.85} L${cx} ${apexY + 10}`} stroke="#800F15" strokeWidth="1.2" opacity="0.6" />
                <path d={`M${cx - rx * 0.5} ${baseY + ry * 0.55} L${cx - 4} ${apexY + 10}`} stroke="#E03131" strokeWidth="1" opacity="0.5" />
                <path d={`M${cx + rx * 0.5} ${baseY + ry * 0.55} L${cx + 4} ${apexY + 10}`} stroke="#9B111E" strokeWidth="1.2" opacity="0.7" />

                {/* Brass apex finial / Chỏm đồng nhọn đỉnh nón */}
                <polygon points={`${cx},${apexY - 6} ${cx - 5},${apexY + 10} ${cx + 5},${apexY + 10}`} fill="url(#goldKieng)" stroke="#8A6208" strokeWidth="1" />
                <circle cx={cx} cy={apexY - 6} r="3" fill="#FFE066" stroke="#8A6208" strokeWidth="0.8" />
                <ellipse cx={cx} cy={apexY + 10} rx="6" ry="2" fill="#D4AF37" stroke="#8A6208" strokeWidth="0.8" />

                {/* Silk chin straps wrapping down to neck */}
                <path
                  d={`M${cx - rx * 0.55} ${baseY + 4} C${cx - rx * 0.35} ${strapY - 8}, ${cx - 15} ${strapY + 2}, ${cx} ${strapY + 2} C${cx + 15} ${strapY + 2}, ${cx + rx * 0.35} ${strapY - 8}, ${cx + rx * 0.55} ${baseY + 4}`}
                  stroke="#9B111E"
                  strokeWidth="2.4"
                  fill="none"
                  strokeLinecap="round"
                />
                <path
                  d={`M${cx - rx * 0.55} ${baseY + 4} C${cx - rx * 0.35} ${strapY - 8}, ${cx - 15} ${strapY + 2}, ${cx} ${strapY + 2} C${cx + 15} ${strapY + 2}, ${cx + rx * 0.35} ${strapY - 8}, ${cx + rx * 0.55} ${baseY + 4}`}
                  stroke="#FF8787"
                  strokeWidth="0.7"
                  fill="none"
                  strokeLinecap="round"
                />
              </g>
            );
          })()}

      {activeHeadwear === 'non_la' && (() => {
        const rx = isNu ? 56 : 64;
        const baseY = headY + (isNu ? 8 : 10);
        const apexY = headY - (isNu ? 42 : 48);
        const strapY = neckY - (isNu ? 4 : 2);

        return (
          <g id="nonLa" filter="url(#accessoryShadow)">
            {/* Classic Conical Leaf Hat */}
            <path
              d={`M${cx - rx} ${baseY} Q${cx} ${baseY - 6} ${cx + rx} ${baseY} L${cx} ${apexY} Z`}
              fill="url(#nonLaGrad)"
              stroke="#8A6935"
              strokeWidth="1.2"
            />
            {/* Woven rib stitches */}
            <path d={`M${cx - rx * 0.78} ${baseY - 8} Q${cx} ${baseY - 14} ${cx + rx * 0.78} ${baseY - 8}`} stroke="#B08D51" strokeWidth="0.8" strokeDasharray="3.5 2" fill="none" />
            <path d={`M${cx - rx * 0.56} ${baseY - 17} Q${cx} ${baseY - 23} ${cx + rx * 0.56} ${baseY - 17}`} stroke="#B08D51" strokeWidth="0.8" strokeDasharray="3 2" fill="none" />
            <path d={`M${cx - rx * 0.35} ${baseY - 26} Q${cx} ${baseY - 31} ${cx + rx * 0.35} ${baseY - 26}`} stroke="#B08D51" strokeWidth="0.8" strokeDasharray="3 2" fill="none" />
            <path d={`M${cx - rx * 0.18} ${baseY - 34} Q${cx} ${baseY - 38} ${cx + rx * 0.18} ${baseY - 34}`} stroke="#B08D51" strokeWidth="0.7" strokeDasharray="2.5 1.5" fill="none" />

            {/* Silk strap under chin / neck */}
            <path
              d={`M${cx - (isNu ? 24 : 28)} ${headY + 10} C${cx - (isNu ? 15 : 18)} ${strapY - 8}, ${cx - 10} ${strapY + 2}, ${cx} ${strapY + 2} C${cx + 10} ${strapY + 2}, ${cx + (isNu ? 15 : 18)} ${strapY - 8}, ${cx + (isNu ? 24 : 28)} ${headY + 10}`}
              stroke="#0D9488"
              strokeWidth="2.2"
              fill="none"
              strokeLinecap="round"
            />
          </g>
        );
      })()}

      {activeHeadwear === 'khan_xep' && (() => {
        const w = isNu ? 34 : 39;
        const topY = headY - (isNu ? 22 : 26);
        const baseY = headY + (isNu ? 8 : 9);

        return (
          <g id="khanXep" filter="url(#accessoryShadow)">
            {/* Traditional layered folded turban - Sea Blue silk */}
            <path
              d={`M${cx - w} ${baseY} Q${cx} ${baseY - 4} ${cx + w} ${baseY} Q${cx + w + 3} ${topY + 6} ${cx} ${topY} Q${cx - w - 3} ${topY + 6} ${cx - w} ${baseY} Z`}
              fill="url(#blueSilkGrad)"
              stroke="#1E3A8A"
              strokeWidth="1.2"
            />
            {/* Inner crown dome opening */}
            <ellipse cx={cx} cy={topY + 4} rx={w * 0.55} ry="4.5" fill="#1E3A8A" stroke="#1D4ED8" strokeWidth="0.8" />

            {/* Layered folding silk ridges (Nếp khăn xếp truyền thống) */}
            <path d={`M${cx - w * 0.95} ${baseY - 3} Q${cx} ${baseY - 8} ${cx + w * 0.95} ${baseY - 3}`} stroke="#60A5FA" strokeWidth="1.3" fill="none" opacity="0.9" />
            <path d={`M${cx - w * 0.88} ${baseY - 9} Q${cx} ${baseY - 14} ${cx + w * 0.88} ${baseY - 9}`} stroke="#93C5FD" strokeWidth="1.2" fill="none" opacity="0.85" />
            <path d={`M${cx - w * 0.78} ${baseY - 15} Q${cx} ${baseY - 20} ${cx + w * 0.78} ${baseY - 15}`} stroke="#60A5FA" strokeWidth="1.1" fill="none" opacity="0.8" />
            <path d={`M${cx - w * 0.65} ${baseY - 21} Q${cx} ${baseY - 25} ${cx + w * 0.65} ${baseY - 21}`} stroke="#3B82F6" strokeWidth="1.0" fill="none" opacity="0.75" />
            {/* Diagonal wrap crossover folds (chữ Nhân / chữ Nhất) */}
            <path d={`M${cx - 12} ${baseY - 1} L${cx + 14} ${baseY - 18}`} stroke="#93C5FD" strokeWidth="0.9" opacity="0.7" />
            <path d={`M${cx + 12} ${baseY - 1} L${cx - 14} ${baseY - 18}`} stroke="#3B82F6" strokeWidth="0.8" opacity="0.6" />
          </g>
        );
      })()}

      {activeHeadwear === 'khan_vanh_day' && isNu && (
        <g id="khanVanhDay" filter="url(#accessoryShadow)" transform={`translate(${cx - 68 * 0.55}, ${headY - 22.5}) scale(0.55)`}>
          <path
            d="M68 0.5C86.7286 0.5 103.661 3.62661 115.893 8.66309C122.01 11.1818 126.927 14.1683 130.308 17.459C133.686 20.7482 135.5 24.3104 135.5 28C135.5 31.6896 133.686 35.2518 130.308 38.541C126.927 41.8317 122.01 44.8182 115.893 47.3369C103.661 52.3734 86.7286 55.5 68 55.5C49.2714 55.5 32.339 52.3734 20.1074 47.3369C13.9905 44.8182 9.07263 41.8317 5.69238 38.541C2.31371 35.2518 0.5 31.6896 0.5 28C0.5 24.3104 2.31371 20.7482 5.69238 17.459C9.07263 14.1683 13.9905 11.1818 20.1074 8.66309C32.339 3.62661 49.2714 0.5 68 0.5Z"
            fill="#2A5DB0"
            stroke="#1B3F85"
          />
          <ellipse cx="68" cy="23" rx="56" ry="20" fill="#1F4A99" />
          <path
            d="M68 8.5C80.6647 8.5 92.1101 10.175 100.372 12.8691C104.506 14.2171 107.815 15.8113 110.08 17.5576C112.352 19.3092 113.5 21.1527 113.5 23C113.5 24.8473 112.352 26.6908 110.08 28.4424C107.815 30.1887 104.506 31.7829 100.372 33.1309C92.1101 35.825 80.6647 37.5 68 37.5C55.3353 37.5 43.8899 35.825 35.6279 33.1309C31.4943 31.7829 28.185 30.1887 25.9199 28.4424C23.6481 26.6908 22.5 24.8473 22.5 23C22.5 21.1527 23.6481 19.3092 25.9199 17.5576C28.185 15.8113 31.4943 14.2171 35.6279 12.8691C43.8899 10.175 55.3353 8.5 68 8.5Z"
            stroke="#4F86D6"
          />
          <path
            d="M68 13C77.9074 13 86.8578 14.1722 93.3154 16.0557C96.5473 16.9983 99.1269 18.1108 100.887 19.3242C102.662 20.5484 103.5 21.7992 103.5 23C103.5 24.2008 102.662 25.4516 100.887 26.6758C99.1269 27.8892 96.5473 29.0017 93.3154 29.9443C86.8578 31.8278 77.9074 33 68 33C58.0926 33 49.1422 31.8278 42.6846 29.9443C39.4527 29.0017 36.8731 27.8892 35.1133 26.6758C33.338 25.4516 32.5 24.2008 32.5 23C32.5 21.7992 33.338 20.5484 35.1133 19.3242C36.8731 18.1108 39.4527 16.9983 42.6846 16.0557C49.1422 14.1722 58.0926 13 68 13Z"
            stroke="#4F86D6"
          />
          <path
            d="M68 16.5C75.1488 16.5 81.6031 17.2808 86.2549 18.5332C88.5843 19.1604 90.4336 19.8985 91.6885 20.6973C92.9671 21.5112 93.5 22.3014 93.5 23C93.5 23.6986 92.9671 24.4888 91.6885 25.3027C90.4336 26.1015 88.5843 26.8396 86.2549 27.4668C81.6031 28.7192 75.1488 29.5 68 29.5C60.8512 29.5 54.3969 28.7192 49.7451 27.4668C47.4157 26.8396 45.5664 26.1015 44.3115 25.3027C43.0329 24.4888 42.5 23.6986 42.5 23C42.5 22.3014 43.0329 21.5112 44.3115 20.6973C45.5664 19.8985 47.4157 19.1604 49.7451 18.5332C54.3969 17.2808 60.8512 16.5 68 16.5Z"
            stroke="#4F86D6"
          />
          <path
            d="M68 19.5C72.3896 19.5 76.347 19.9449 79.1924 20.6562C80.6188 21.0129 81.738 21.4296 82.4883 21.873C83.272 22.3363 83.5 22.7336 83.5 23C83.5 23.2664 83.272 23.6637 82.4883 24.127C81.738 24.5704 80.6188 24.9871 79.1924 25.3438C76.347 26.0551 72.3896 26.5 68 26.5C63.6104 26.5 59.653 26.0551 56.8076 25.3438C55.3812 24.9871 54.262 24.5704 53.5117 24.127C52.728 23.6637 52.5 23.2664 52.5 23C52.5 22.7336 52.728 22.3363 53.5117 21.873C54.262 21.4296 55.3812 21.0129 56.8076 20.6562C59.653 19.9449 63.6104 19.5 68 19.5Z"
            stroke="#4F86D6"
          />
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
          3. KÍNH RÂM GEN Z (Sunglasses - SVG 1 & SVG 7)
          ======================================================== */}
      {hasKinhRam && (() => {
        const scale = isNu ? 0.46 : 0.52;
        const tx = cx - 34 * scale;
        const ty = headY + (isNu ? 6 : 8);
        return (
          <g id="kinhRam" filter="url(#accessoryShadow)" transform={`translate(${tx}, ${ty}) scale(${scale})`}>
            {/* Top Brow Bar / Frame Wire (SVG 1) */}
            <path
              d="M0.550049 0.550049C21.55 8.55005 56.55 7.55005 76.55 0.550049"
              stroke="#42464E"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              transform="translate(-5, 4)"
            />
            {/* Lenses & Glare Shapes (SVG 7) */}
            <path d="M4.00008 6C12.0001 4.66667 20.3334 4.66667 29.0001 6C30.3334 6 30.6667 7.33333 30.0001 10L28.0001 19C27.3334 21.6667 25.3334 23 22.0001 23H12.0001C8.66675 23 6.66675 21.6667 6.00008 19L3.00008 10C2.33341 8 2.66675 6.66667 4.00008 6Z" fill="#253039"/>
            <path d="M39.0001 6C47.6667 4.66667 56.0001 4.66667 64.0001 6C65.3334 6.66667 65.6667 8 65.0001 10L62.0001 19C61.3334 21.6667 59.3334 23 56.0001 23H46.0001C42.6667 23 40.6667 21.6667 40.0001 19L38.0001 10C37.3334 7.33333 37.6667 6 39.0001 6Z" fill="#253039"/>
            <path d="M7 8C10.3333 7.33333 13.6667 7 17 7L10 19C8.66667 19 8 18 8 16L7 8Z" fill="#3B4852"/>
            <path d="M42 8C45.3333 7.33333 48.6667 7 52 7L45 19C43.6667 19 43 18 43 16L42 8Z" fill="#3B4852"/>
          </g>
        );
      })()}

      {/* ========================================================
          4. TAI NGHE TRÙM ĐẦU GEN Z (Over-ear Headphones - SVG 5)
          ======================================================== */}
      {hasTaiNghe && (() => {
        const scale = isNu ? 0.54 : 0.60;
        const tx = cx - 58 * scale;
        const ty = neckY - (isNu ? 36 : 40) * scale;
        return (
          <g id="taiNghe" filter="url(#accessoryShadow)" transform={`translate(${tx}, ${ty}) scale(${scale})`}>
            <path d="M15.0001 67L13.0001 43C9.00006 0 106 0 103 43L101 67" stroke="#2B323B" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M11.9999 43C7.99989 1 107 1 104 43" stroke="#53616D" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M22 26C30 5 86 5 94 26" stroke="#414A56" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            <rect x="12" y="43" width="7" height="20" rx="2" fill="#98A3AB"/>
            <rect x="97" y="43" width="7" height="20" rx="2" fill="#98A3AB"/>
            <rect x="11" y="57" width="10" height="10" rx="3" fill="#29313B"/>
            <rect x="95" y="57" width="10" height="10" rx="3" fill="#29313B"/>
            <rect x="20" y="61" width="12" height="33" rx="5" fill="#20262E"/>
            <rect x="84" y="61" width="12" height="33" rx="5" fill="#20262E"/>
            <rect x="6" y="59" width="20" height="36" rx="7" fill="#364652"/>
            <rect x="90" y="59" width="20" height="36" rx="7" fill="#364652"/>
            <rect x="9" y="63" width="13" height="27" rx="5" fill="#4B606D"/>
            <rect x="94" y="63" width="13" height="27" rx="5" fill="#4B606D"/>
            <path d="M11 67V81" stroke="#70838B" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M104 67V81" stroke="#70838B" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            <rect x="98" y="86" width="5" height="2" rx="1" fill="#A9B3B4"/>
          </g>
        );
      })()}

      {/* ========================================================
          5. KIỀNG CỔ (Traditional Vietnamese Gold / Silver Torque)
          Authentic solid torque ring hugging the base of the neck
          ======================================================== */}
      {hasKiengCo && (() => {
        const isMale = gender === 'nam';
        const rx = isMale ? 25 : 19;
        const ry = isMale ? 15.5 : 12;
        const baseY = isMale ? neckY : neckY + 1;
        const arcY = baseY + ry;

        return (
          <g id="kiengCo" filter="url(#accessoryShadow)">
            {/* Ambient Dark Gold Rim / Shadow */}
            <path
              d={`M${cx - rx} ${baseY - 1} C${cx - rx} ${arcY + 4}, ${cx + rx} ${arcY + 4}, ${cx + rx} ${baseY - 1}`}
              stroke="#78350F"
              strokeWidth={isMale ? '5.2' : '4'}
              strokeLinecap="round"
              fill="none"
              opacity="0.5"
            />
            {/* Main Solid Gold Torque Body */}
            <path
              d={`M${cx - rx} ${baseY - 1} C${cx - rx} ${arcY + 3}, ${cx + rx} ${arcY + 3}, ${cx + rx} ${baseY - 1}`}
              stroke="url(#goldKieng)"
              strokeWidth={isMale ? '4.6' : '3.5'}
              strokeLinecap="round"
              fill="none"
            />
            {/* Metallic Specular Highlight / Reflection Sheen */}
            <path
              d={`M${cx - rx + 3} ${baseY + 1} C${cx - rx + 3} ${arcY + 1}, ${cx + rx - 3} ${arcY + 1}, ${cx + rx - 3} ${baseY + 1}`}
              stroke="url(#silverGloss)"
              strokeWidth={isMale ? '1.4' : '1'}
              strokeLinecap="round"
              fill="none"
              opacity="0.9"
            />
            {/* Delicate Engraved Cloud / Lotus Motifs on the Torque */}
            <path
              d={`M${cx - rx + 5} ${baseY + 5} Q${cx} ${arcY + 3.2} ${cx + rx - 5} ${baseY + 5}`}
              stroke="#92400E"
              strokeWidth={isMale ? '0.8' : '0.6'}
              strokeDasharray="2 1.5"
              fill="none"
              opacity="0.75"
            />
            {/* Left & Right Torque End Caps */}
            <circle cx={cx - rx} cy={baseY - 1} r={isMale ? 3 : 2.3} fill="url(#goldKieng)" stroke="#78350F" strokeWidth="0.6" />
            <circle cx={cx - rx} cy={baseY - 1} r={isMale ? 1.3 : 0.9} fill="#FEF08A" />
            <circle cx={cx + rx} cy={baseY - 1} r={isMale ? 3 : 2.3} fill="url(#goldKieng)" stroke="#78350F" strokeWidth="0.6" />
            <circle cx={cx + rx} cy={baseY - 1} r={isMale ? 1.3 : 0.9} fill="#FEF08A" />

            {/* Center Traditional Carved Lotus Medallion / Khóa Khảm Sen */}
            <g transform={`translate(${cx}, ${arcY + 2.4})`}>
              <circle r={isMale ? 4.6 : 3.4} fill="url(#goldKieng)" stroke="#78350F" strokeWidth="0.7" />
              <circle r={isMale ? 3.2 : 2.3} fill="none" stroke="#92400E" strokeWidth="0.4" strokeDasharray="1 1" />
              {/* Central Jade Core */}
              <circle r={isMale ? 2.2 : 1.6} fill="#059669" stroke="#064E3B" strokeWidth="0.4" />
              <circle cx="-0.5" cy="-0.5" r={isMale ? 0.8 : 0.5} fill="#A7F3D0" />
            </g>
          </g>
        );
      })()}

      {/* ========================================================
          6. MÁY ẢNH RETRO GEN Z (Camera - SVG 8)
          ======================================================== */}
      {hasMayAnh && (() => {
        const scale = isNu ? 0.44 : 0.48;
        const tx = cx - 55 * scale;
        const ty = neckY - (isNu ? 10 : 8);
        return (
          <g id="mayAnh" filter="url(#accessoryShadow)" transform={`translate(${tx}, ${ty}) scale(${scale})`}>
            <path d="M17 112C22 87 37 43 38 22C38 6 73 6 73 22C74 44 88 87 94 112" stroke="#30343B" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M18 111C23 87 39 44 40 23M71 23C72 43 87 87 93 111" stroke="#555A60" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round"/>
            <rect x="29" y="58" width="7" height="10" rx="1.5" fill="#242A31"/>
            <rect x="76" y="58" width="7" height="10" rx="1.5" fill="#242A31"/>
            <rect x="78" y="96" width="10" height="5" rx="1.5" fill="#343A42"/>
            <rect x="76" y="100" width="14" height="3" rx="1" fill="#909AA0"/>
            <path d="M37 105L44 94H66L74 105H37Z" fill="#BCC3C5"/>
            <rect x="49" y="97" width="13" height="5" rx="1" fill="#343E47"/>
            <rect x="12" y="103" width="87" height="48" rx="5" fill="#30363E"/>
            <rect x="12" y="103" width="87" height="14" rx="4" fill="#C7CCCA"/>
            <rect x="12" y="112" width="87" height="6" fill="#C7CCCA"/>
            <rect x="83" y="115" width="13" height="32" rx="3" fill="#242A31"/>
            <rect x="19" y="148" width="74" height="4" rx="1.5" fill="#20262D"/>
            <rect x="9" y="106" width="6" height="9" rx="2" fill="#8F999C"/>
            <rect x="96" y="106" width="6" height="9" rx="2" fill="#8F999C"/>
            <rect x="10" y="105" width="4" height="6" rx="1" fill="#30343B"/>
            <rect x="97" y="105" width="4" height="6" rx="1" fill="#30343B"/>
            <rect x="19" y="106" width="15" height="6" rx="1" fill="#F2F0DF"/>
            <rect x="21" y="107" width="11" height="1" fill="#E0DCCE"/>
            <circle cx="79.5" cy="108.5" r="1.5" fill="#BD7C46"/>
            <circle cx="53.5" cy="130.5" r="21.5" fill="#909A9F"/>
            <circle cx="53.5" cy="130.5" r="18.5" fill="#202831"/>
            <circle cx="53.5" cy="130.5" r="15.5" fill="#4C5A65"/>
            <circle cx="53.5" cy="130.5" r="12.5" fill="#223F50"/>
            <circle cx="53" cy="128" r="8" fill="#34596A"/>
            <circle cx="52.5" cy="129.5" r="5.5" fill="#172C3B"/>
            <path d="M46 125C46.6667 121.667 48.6667 120 52 120" stroke="#94B5BD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="57.5" cy="134.5" r="1.5" fill="#628795"/>
            <path d="M47 115V117M54 113V116M61 115V118M68 122L65 123M69 132H66M62 141L61 138M46 141L47 138M39 132H42" stroke="#7A858D" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round"/>
            <rect x="19" y="123" width="8" height="2" rx="1" fill="#616C75"/>
            <rect x="19" y="128" width="5" height="2" rx="1" fill="#616C75"/>
          </g>
        );
      })()}

      {/* ========================================================
          7. TÚI XÁCH GEN Z (Crossbody Bag - SVG 6)
          ======================================================== */}
      {hasTuiXach && (() => {
        const scale = isNu ? 0.44 : 0.48;
        const tx = cx - (isNu ? 50 : 56);
        const ty = neckY - (isNu ? 6 : 4);
        return (
          <g id="tuiXach" filter="url(#accessoryShadow)" transform={`translate(${tx}, ${ty}) scale(${scale})`}>
            <path d="M23 11L32 6L124 145L115 151L23 11Z" fill="#29343C"/>
            <path d="M29 11L119 146" stroke="#49555C" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M66 68L77 61L85 73L74 81L66 68Z" fill="#83908E"/>
            <path d="M69 69L76 65L81 72L74 77L69 69Z" fill="#29343C"/>
            <path d="M70 71L79 66" stroke="#ADB5AD" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            <rect x="109" y="141" width="12" height="19" rx="2" fill="#253239"/>
            <path d="M111 145H121L123 153L113 154L111 145Z" stroke="#9AA39A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M162 146C167.333 146.667 170.333 149.333 171 154V210C169.667 214.667 166 217.333 160 218L151 210V150L162 146Z" fill="#283B42"/>
            <rect x="99" y="148" width="65" height="70" rx="7" fill="#3E555C"/>
            <path d="M103 169V207C103 211.667 105.667 214 111 214H155" stroke="#5D7073" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M101 148C101 145.333 103 144 107 144H156C160.667 144 163.667 145.667 165 149L161 173C160.333 176.333 158 178.333 154 179H113C107.667 177.667 104.333 175 103 171L101 148Z" fill="#526A6C"/>
            <path d="M105 172C107 174.667 110 176 114 176H153C156.333 175.333 158.333 173.667 159 171" stroke="#70827F" strokeLinecap="round" strokeLinejoin="round"/>
            <rect x="127" y="166" width="11" height="26" rx="2" fill="#293B40"/>
            <rect x="125" y="180" width="15" height="11" rx="2" fill="#A6ADA0"/>
            <rect x="129" y="183" width="7" height="5" rx="1" fill="#36494C"/>
            <rect x="110" y="194" width="43" height="14" rx="3" fill="#344B52"/>
            <path d="M113 197H150" stroke="#6D7B79" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/>
            <rect x="146" y="198" width="3" height="6" rx="1" fill="#B5B7A7"/>
          </g>
        );
      })()}

      {/* ========================================================
          8. ĐỒNG HỒ GEN Z (Digital Smartwatch - SVG 4)
          ======================================================== */}
      {hasDongHo && (() => {
        const scale = isNu ? 0.52 : 0.58;
        const tx = wristRight.x - 27 * scale;
        const ty = wristRight.y - 20 * scale;
        return (
          <g id="dongHo" filter="url(#accessoryShadow)" transform={`translate(${tx}, ${ty}) scale(${scale})`}>
            <rect x="4" y="13" width="18" height="14" rx="3" fill="#303942"/>
            <rect x="31" y="13" width="18" height="14" rx="3" fill="#303942"/>
            <rect x="5" y="14" width="8" height="2" rx="1" fill="#4A555E"/>
            <rect x="41" y="14" width="7" height="2" rx="1" fill="#4A555E"/>
            <rect x="39" y="15" width="2" height="7" rx="1" fill="#85949E"/>
            <rect x="13" y="7" width="27" height="27" rx="5" fill="#667780"/>
            <rect x="14.5" y="8.5" width="24" height="24" rx="4" fill="#242D35"/>
            <rect x="16" y="10" width="21" height="21" rx="3" fill="#142733"/>
            <rect x="18" y="11.5" width="15" height="1" rx="0.5" fill="#3D535D"/>
            <path d="M20.3626 17.6364V22H19.5721V18.4055H19.5465L18.5259 19.0575V18.3331L19.6105 17.6364H20.3626ZM23.0835 22.0831C22.7326 22.0831 22.4315 21.9943 22.1801 21.8168C21.9301 21.6378 21.7376 21.38 21.6027 21.0433C21.4691 20.7053 21.4024 20.2983 21.4024 19.8224C21.4038 19.3466 21.4713 18.9418 21.6048 18.608C21.7397 18.2727 21.9322 18.017 22.1822 17.8409C22.4336 17.6648 22.734 17.5767 23.0835 17.5767C23.4329 17.5767 23.7333 17.6648 23.9848 17.8409C24.2362 18.017 24.4286 18.2727 24.5622 18.608C24.6971 18.9432 24.7646 19.348 24.7646 19.8224C24.7646 20.2997 24.6971 20.7074 24.5622 21.0455C24.4286 21.3821 24.2362 21.6392 23.9848 21.8168C23.7348 21.9943 23.4343 22.0831 23.0835 22.0831ZM23.0835 21.4162C23.3562 21.4162 23.5714 21.282 23.7291 21.0135C23.8882 20.7436 23.9677 20.3466 23.9677 19.8224C23.9677 19.4759 23.9315 19.1847 23.859 18.9489C23.7866 18.7131 23.6843 18.5355 23.5522 18.4162C23.4201 18.2955 23.2639 18.2351 23.0835 18.2351C22.8122 18.2351 22.5977 18.37 22.44 18.6399C22.2823 18.9084 22.2028 19.3026 22.2014 19.8224C22.2 20.1705 22.2348 20.4631 22.3058 20.7003C22.3782 20.9375 22.4805 21.1165 22.6126 21.2372C22.7447 21.3565 22.9017 21.4162 23.0835 21.4162ZM25.9562 21.4759C25.8269 21.4759 25.7161 21.4304 25.6238 21.3395C25.5314 21.2472 25.486 21.1364 25.4874 21.0071C25.486 20.8793 25.5314 20.7699 25.6238 20.679C25.7161 20.5881 25.8269 20.5426 25.9562 20.5426C26.0812 20.5426 26.1898 20.5881 26.2822 20.679C26.3759 20.7699 26.4235 20.8793 26.4249 21.0071C26.4235 21.0937 26.4008 21.1726 26.3567 21.2436C26.3141 21.3146 26.2573 21.3714 26.1863 21.4141C26.1167 21.4553 26.04 21.4759 25.9562 21.4759ZM25.9562 19.3132C25.8269 19.3132 25.7161 19.2678 25.6238 19.1768C25.5314 19.0845 25.486 18.9737 25.4874 18.8445C25.486 18.7166 25.5314 18.6072 25.6238 18.5163C25.7161 18.424 25.8269 18.3778 25.9562 18.3778C26.0812 18.3778 26.1898 18.424 26.2822 18.5163C26.3759 18.6072 26.4235 18.7166 26.4249 18.8445C26.4235 18.9297 26.4008 19.0078 26.3567 19.0788C26.3141 19.1499 26.2573 19.2067 26.1863 19.2493C26.1167 19.2919 26.04 19.3132 25.9562 19.3132ZM28.8257 22.0831C28.4748 22.0831 28.1737 21.9943 27.9223 21.8168C27.6723 21.6378 27.4798 21.38 27.3448 21.0433C27.2113 20.7053 27.1446 20.2983 27.1446 19.8224C27.146 19.3466 27.2134 18.9418 27.347 18.608C27.4819 18.2727 27.6744 18.017 27.9244 17.8409C28.1758 17.6648 28.4762 17.5767 28.8257 17.5767C29.1751 17.5767 29.4755 17.6648 29.7269 17.8409C29.9784 18.017 30.1708 18.2727 30.3044 18.608C30.4393 18.9432 30.5068 19.348 30.5068 19.8224C30.5068 20.2997 30.4393 20.7074 30.3044 21.0455C30.1708 21.3821 29.9784 21.6392 29.7269 21.8168C29.4769 21.9943 29.1765 22.0831 28.8257 22.0831ZM28.8257 21.4162C29.0984 21.4162 29.3136 21.282 29.4713 21.0135C29.6303 20.7436 29.7099 20.3466 29.7099 19.8224C29.7099 19.4759 29.6737 19.1847 29.6012 18.9489C29.5288 18.7131 29.4265 18.5355 29.2944 18.4162C29.1623 18.2955 29.0061 18.2351 28.8257 18.2351C28.5544 18.2351 28.3399 18.37 28.1822 18.6399C28.0245 18.9084 27.945 19.3026 27.9436 19.8224C27.9421 20.1705 27.9769 20.4631 28.048 20.7003C28.1204 20.9375 28.2227 21.1165 28.3548 21.2372C28.4869 21.3565 28.6438 21.4162 28.8257 21.4162ZM32.7296 17.5767C32.9384 17.5781 33.1415 17.6151 33.339 17.6875C33.5378 17.7585 33.7168 17.875 33.8759 18.0369C34.035 18.1974 34.1614 18.4126 34.2552 18.6825C34.3489 18.9524 34.3958 19.2862 34.3958 19.6839C34.3972 20.0589 34.3574 20.3942 34.2765 20.6896C34.1969 20.9837 34.0826 21.2322 33.9334 21.4354C33.7843 21.6385 33.6046 21.7933 33.3944 21.8999C33.1841 22.0064 32.9476 22.0597 32.6849 22.0597C32.4093 22.0597 32.165 22.0057 31.9519 21.8977C31.7403 21.7898 31.5691 21.642 31.4384 21.4545C31.3077 21.267 31.2275 21.0526 31.1976 20.8111H31.9753C32.0151 20.9844 32.0961 21.1222 32.2182 21.2244C32.3418 21.3253 32.4974 21.3757 32.6849 21.3757C32.9874 21.3757 33.2204 21.2443 33.3837 20.9815C33.5471 20.7187 33.6288 20.3537 33.6288 19.8864H33.5989C33.5293 20.0114 33.4391 20.1193 33.3283 20.2102C33.2175 20.2997 33.0918 20.3686 32.9512 20.4169C32.812 20.4652 32.6643 20.4893 32.508 20.4893C32.2523 20.4893 32.0222 20.4283 31.8177 20.3061C31.6145 20.1839 31.4533 20.0163 31.334 19.8033C31.2161 19.5902 31.1564 19.3466 31.155 19.0724C31.155 18.7884 31.2204 18.5334 31.3511 18.3075C31.4832 18.0803 31.6671 17.9013 31.9029 17.7706C32.1387 17.6385 32.4143 17.5739 32.7296 17.5767ZM32.7317 18.2159C32.5783 18.2159 32.4398 18.2536 32.3163 18.3288C32.1941 18.4027 32.0975 18.5036 32.0265 18.6314C31.9569 18.7578 31.9221 18.8991 31.9221 19.0554C31.9235 19.2102 31.9583 19.3509 32.0265 19.4773C32.0961 19.6037 32.1905 19.7038 32.3099 19.7777C32.4306 19.8516 32.5684 19.8885 32.7232 19.8885C32.8383 19.8885 32.9455 19.8665 33.0449 19.8224C33.1444 19.7784 33.231 19.7173 33.3049 19.6392C33.3802 19.5597 33.4384 19.4695 33.4796 19.3686C33.5222 19.2678 33.5428 19.1612 33.5414 19.049C33.5414 18.8999 33.5059 18.7621 33.4349 18.6357C33.3653 18.5092 33.2694 18.4077 33.1472 18.331C33.0265 18.2543 32.888 18.2159 32.7317 18.2159Z" fill="#F3F6EE"/>
            <rect x="19" y="26" width="15" height="2" rx="1" fill="#344752"/>
            <rect x="19" y="26" width="10" height="2" rx="1" fill="#78B5AF"/>
            <rect x="43" y="21" width="1" height="1.8" rx="0.5" fill="#172A34"/>
            <rect x="45.6001" y="21" width="1" height="1.8" rx="0.5" fill="#172A34"/>
          </g>
        );
      })()}

      {/* ========================================================
          9. ĐỒ CẦM TAY TRUYỀN THỐNG (Handheld: Đàn nguyệt, Quạt)
          ======================================================== */}
      {handheld === 'dan_nguyet' && (
        <g id="danNguyet" filter="url(#accessoryShadow)">
          {/* Vietnamese Moon Lute (Đàn Nguyệt) held diagonally */}
          <g transform={`translate(${cx - (isNu ? 48 : 55)}, ${waistY - (isNu ? 25 : 30)}) rotate(32) scale(${isNu ? 0.86 : 1})`}>
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

      {handheld === 'quat' && (
        <g id="quat" filter="url(#accessoryShadow)">
          {/* Folded Silk Fan with tassel held in hand */}
          <g transform={`translate(${wristRight.x - (isNu ? 18 : 22)}, ${wristRight.y - (isNu ? 30 : 35)}) rotate(25) scale(${isNu ? 0.88 : 1})`}>
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
          10. GIÀY DÉP TRUYỀN THỐNG / SNEAKER (Footwear - SVG 2 & SVG 3)
          ======================================================== */}
      {footwear === 'guoc_moc' && (() => {
        const scale = isNu ? 0.44 : 0.50;
        const tx = cx - 115.5 * scale;
        const ty = feetY - (isNu ? 38 : 42) * scale;
        return (
          <g id="guocMoc" filter="url(#accessoryShadow)" transform={`translate(${tx}, ${ty}) scale(${scale})`}>
            {/* Guốc Mộc Left & Right (SVG 3) */}
            <path d="M14 45.5L26.25 35H84L91 42V56H71.75L68.25 50.75H29.75L24.5 56H14C9.33333 52.5 9.33333 49 14 45.5Z" fill="#BA7D37"/>
            <path d="M13.9998 43.75C11.6664 41.4167 13.4164 38.5 19.2498 35L80.4998 31.5C87.4998 31.5 90.9998 34.4167 90.9998 40.25V43.75H13.9998Z" fill="#E8BB70"/>
            <path d="M28 42L29.75 28C36.75 23.3333 43.75 23.3333 50.75 28L54.25 43.75L28 42Z" fill="#293039"/>
            <path d="M33.25 29.75C37.9167 27.4167 42.5833 27.4167 47.25 29.75L49 31.5C43.1667 29.75 37.9167 29.75 33.25 31.5V29.75Z" fill="#55505A"/>
            <path d="M19.25 47.25H35V48.3H19.25V47.25Z" fill="#D69A4D"/>
            <path d="M203 45.5L190.75 35H133L126 42V56H145.25L148.75 50.75H187.25L192.5 56H203C207.667 52.5 207.667 49 203 45.5Z" fill="#BA7D37"/>
            <path d="M129.5 43.75C127.166 41.4167 128.916 38.5 134.75 35L196 31.5C203 31.5 206.5 34.4167 206.5 40.25V43.75H129.5Z" fill="#E8BB70"/>
            <path d="M166.25 42L168 28C175 23.3333 182 23.3333 189 28L192.5 43.75L166.25 42Z" fill="#293039"/>
            <path d="M171.5 29.75C176.167 27.4167 180.833 27.4167 185.5 29.75L187.25 31.5C181.417 29.75 176.167 29.75 171.5 31.5V29.75Z" fill="#55505A"/>
            <path d="M134.75 47.25H150.5V48.3H134.75V47.25Z" fill="#D69A4D"/>
          </g>
        );
      })()}

      {footwear === 'sneaker' && (() => {
        const scale = isNu ? 0.44 : 0.50;
        const tx = cx - 115.5 * scale;
        const ty = feetY - (isNu ? 44 : 48) * scale;
        return (
          <g id="sneaker" filter="url(#accessoryShadow)" transform={`translate(${tx}, ${ty}) scale(${scale})`}>
            {/* Sneaker Left & Right (SVG 2) */}
            <path d="M11 51H102L103 59C101.667 63 98.6667 65 94 65H20C14.6667 64.3333 11.3333 62.3333 10 59L11 51Z" fill="#252B31"/>
            <path d="M11 47C37.6667 50.3333 68 50.3333 102 47L103 56C101 58.6667 98 60 94 60H21C15.6667 59.3333 12 57.6667 10 55L11 47Z" fill="#F4F1E8"/>
            <path d="M14 55C40 57 68.3333 57 99 55" stroke="#C9C9C2" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 46.9999C12 38.9999 16 34.9999 24 34.9999L41 30.9999C45 27.6666 48.3333 23.6666 51 18.9999C53.6667 15.6666 58 14.3333 64 14.9999L82 19.9999L86 29.9999L97 28.9999C100.333 32.3333 101.667 38.6666 101 47.9999C73 51.9999 43.3333 51.6666 12 46.9999Z" fill="#ECECE5"/>
            <path d="M12.0001 47C10.6667 41.6667 13.3334 38.3333 20.0001 37C25.3334 40.3333 32.3334 42.3333 41.0001 43L48.0001 48C37.3334 50.6667 25.3334 50.3333 12.0001 47Z" fill="#242A30"/>
            <path d="M18 36.9999C24 33.6666 32 32.6666 42 33.9999L49 40.9999C39 44.3332 29.6667 43.9999 21 39.9999L18 36.9999Z" fill="#F8F6EE"/>
            <path d="M81 21C85 21 87 24 87 30L97 29C100.333 32.3333 101.667 38.6667 101 48L86 50L84 37L76 34L81 21Z" fill="#252B31"/>
            <path d="M45 37L56 33L70 40H85L86 49L73 50L59 43L49 47L45 37Z" fill="#2B3036"/>
            <path d="M61 31H79L82 39L72 42L62 37L61 31Z" fill="#FAF7ED"/>
            <path d="M52 20.0001C54.6667 14.6668 58.6667 12.6668 64 14.0001L83 19.0001L81 27.0001L61 26.0001L52 20.0001Z" fill="#D8D5C8"/>
            <path d="M58 18.9999C64 16.3332 71 16.9999 79 20.9999L77 24.9999L63 23.9999L58 18.9999Z" fill="#56595A"/>
            <path d="M49 25.9999L54 16.9999C58.6667 15.6666 63.6667 16.3333 69 18.9999L65 33.9999L55 39.9999L43 35.9999L49 25.9999Z" fill="#F3F0E4"/>
            <path d="M46 28L64 30L59 41H46L37 36L46 28Z" fill="#262D34"/>
            <path d="M47 29L61 31" stroke="#FBFAF3" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M45.2 31.8L59.6 33.6" stroke="#FBFAF3" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M43.3999 34.6001L58.1999 36.2001" stroke="#FBFAF3" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M41.6001 37.3999L56.8001 38.7999" stroke="#FBFAF3" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M50.9999 31C42.9999 24 40.9999 32 49.9999 33C61.9999 28 64.9999 36 51.9999 34M49.9999 40L51.9999 33L57.9999 39" stroke="#FBFAF3" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M88 58L100 56L98 61H89L88 58Z" fill="#30363B"/>
            <path d="M14 58L30 60V63H20C16.6667 62.3333 14.6667 60.6667 14 58Z" fill="#30363B"/>
            <path d="M220 51H129L128 59C129.333 63 132.333 65 137 65H211C216.333 64.3333 219.667 62.3333 221 59L220 51Z" fill="#252B31"/>
            <path d="M220 47C193.333 50.3333 163 50.3333 129 47L128 56C130 58.6667 133 60 137 60H210C215.333 59.3333 219 57.6667 221 55L220 47Z" fill="#F4F1E8"/>
            <path d="M217 55C191 57 162.667 57 132 55" stroke="#C9C9C2" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M219 46.9999C219 38.9999 215 34.9999 207 34.9999L190 30.9999C186 27.6666 182.667 23.6666 180 18.9999C177.333 15.6666 173 14.3333 167 14.9999L149 19.9999L145 29.9999L134 28.9999C130.667 32.3333 129.333 38.6666 130 47.9999C158 51.9999 187.667 51.6666 219 46.9999Z" fill="#ECECE5"/>
            <path d="M219 47C220.333 41.6667 217.667 38.3333 211 37C205.667 40.3333 198.667 42.3333 190 43L183 48C193.667 50.6667 205.667 50.3333 219 47Z" fill="#242A30"/>
            <path d="M213 36.9999C207 33.6666 199 32.6666 189 33.9999L182 40.9999C192 44.3332 201.333 43.9999 210 39.9999L213 36.9999Z" fill="#F8F6EE"/>
            <path d="M150 21C146 21 144 24 144 30L134 29C130.667 32.3333 129.333 38.6666 130 48L145 50L147 37L155 34L150 21Z" fill="#252B31"/>
            <path d="M186 37L175 33L161 40H146L145 49L158 50L172 43L182 47L186 37Z" fill="#2B3036"/>
            <path d="M170 31H152L149 39L159 42L169 37L170 31Z" fill="#FAF7ED"/>
            <path d="M179 20.0001C176.333 14.6668 172.333 12.6668 167 14.0001L148 19.0001L150 27.0001L170 26.0001L179 20.0001Z" fill="#D8D5C8"/>
            <path d="M173 18.9999C167 16.3332 160 16.9999 152 20.9999L154 24.9999L168 23.9999L173 18.9999Z" fill="#56595A"/>
            <path d="M182 25.9999L177 16.9999C172.333 15.6666 167.333 16.3333 162 18.9999L166 33.9999L176 39.9999L188 35.9999L182 25.9999Z" fill="#F3F0E4"/>
            <path d="M185 28L167 30L172 41H185L194 36L185 28Z" fill="#262D34"/>
            <path d="M184 29L170 31" stroke="#FBFAF3" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M185.8 31.8L171.4 33.6" stroke="#FBFAF3" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M187.6 34.6001L172.8 36.2001" stroke="#FBFAF3" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M189.4 37.3999L174.2 38.7999" stroke="#FBFAF3" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M180 31C188 24 190 32 181 33C169 28 166 36 179 34M181 40L179 33L173 39" stroke="#FBFAF3" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M143 58L131 56L133 61H142L143 58Z" fill="#30363B"/>
            <path d="M217 58L201 60V63H211C214.333 62.3333 216.333 60.6667 217 58Z" fill="#30363B"/>
          </g>
        );
      })()}
        </>
      )}
    </svg>
  );
}
