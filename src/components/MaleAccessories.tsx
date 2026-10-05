import React from 'react';

interface MaleAccessoriesProps {
  headwearId?: string | null;
  jewelryIds: string[];
  genZIds: string[];
  handheldId?: string;
}

export const MaleAccessories: React.FC<MaleAccessoriesProps> = ({
  headwearId,
  jewelryIds,
  genZIds,
  handheldId,
}) => {
  return (
    <g id="male-accessories-layer">
      {/* 1. DÂY MÁY ẢNH VÒNG QUA CỔ (Sau ngực) */}
      {genZIds.includes('may-anh') && (
        <path 
          d="M148 140 C146 115, 184 115, 182 140" 
          fill="none" 
          stroke="#18181b" 
          strokeWidth="4.5" 
          strokeLinecap="round" 
        />
      )}

      {/* 2. ĐỒ ĐỘI ĐẦU TRUYỀN THỐNG (Khăn xếp / Nón lá / Nón dấu / Mũ) */}
      {headwearId === 'khan-xep' && (
        <g id="acc-khan-xep">
          <path 
            d="M125 46 C124 24, 200 24, 199 46 C200 56, 190 60, 162 57 C134 60, 124 56, 125 46 Z" 
            fill="#18181b" 
            stroke="#09090b" 
            strokeWidth="1.2" 
          />
          <path d="M127 41 C127 28, 197 28, 197 41" stroke="#27272a" strokeWidth="1.8" fill="none" />
          <path d="M132 37 C132 26, 192 26, 192 37" stroke="#3f3f46" strokeWidth="1.5" fill="none" />
          <path d="M154 41 L162 52 L170 41" stroke="#3f3f46" strokeWidth="1.8" strokeLinecap="round" fill="none" />
        </g>
      )}

      {headwearId === 'non-la' && (
        <g id="acc-non-la">
          <path d="M96 52 L162 8 L228 52 Z" fill="#FEF3C7" stroke="#D97706" strokeWidth="1.5" strokeLinejoin="round" />
          <ellipse cx="162" cy="52" rx="66" ry="9" fill="#FDE68A" stroke="#D97706" strokeWidth="1" />
          <path d="M115 52 C120 90, 162 100, 162 100 C162 100, 204 90, 209 52" fill="none" stroke="#60A5FA" strokeWidth="2.2" strokeLinecap="round" />
        </g>
      )}

      {headwearId === 'non-dau' && (
        <g id="acc-non-dau">
          <path d="M112 50 L162 10 L212 50 Z" fill="#D97706" stroke="#92400E" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M108 50 C124 54, 200 54, 216 50 C216 52, 200 56, 162 56 C124 56, 108 52, 108 50 Z" fill="#B45309" />
          <circle cx="162" cy="10" r="5" fill="#FCD34D" stroke="#D97706" strokeWidth="1" />
          <circle cx="162" cy="5" r="3" fill="#F59E0B" />
          <path d="M124 52 C128 88, 162 98, 162 98 C162 98, 196 88, 200 52" fill="none" stroke="#DC2626" strokeWidth="2.5" strokeLinecap="round" />
        </g>
      )}

      {/* 3. TAI NGHE TRÙM ĐẦU GEN Z (Over-ear Headphones) */}
      {genZIds.includes('tai-nghe-trum-dau') && (
        <g id="acc-tai-nghe">
          {/* Vòng quàng qua đỉnh đầu */}
          <path d="M122 80 C114 16, 210 16, 202 80" fill="none" stroke="#09090b" strokeWidth="10" strokeLinecap="round" />
          <path d="M123 78 C116 20, 208 20, 201 78" fill="none" stroke="#1e293b" strokeWidth="6" strokeLinecap="round" />
          {/* Củ tai trái (Bên trái người xem) */}
          <ellipse cx="120" cy="98" rx="10" ry="16" fill="#0f172a" stroke="#334155" strokeWidth="2" />
          <circle cx="120" cy="98" r="4" fill="#64748b" />
          {/* Củ tai phải (Bên phải người xem) */}
          <ellipse cx="204" cy="98" rx="10" ry="16" fill="#0f172a" stroke="#334155" strokeWidth="2" />
          <circle cx="204" cy="98" r="4" fill="#64748b" />
        </g>
      )}

      {/* 4. KÍNH RÂM GEN Z (Sunglasses vừa vặn đôi mắt) */}
      {genZIds.includes('kinh-ram') && (
        <g id="acc-kinh-ram">
          {/* Gọng kính ngang */}
          <path 
            d="M136 93 C136 89, 158 88, 160 92 C162 91, 166 91, 168 92 C170 88, 192 89, 192 93 L191 103 C190 108, 169 108, 164 102 C163 102, 161 102, 160 102 C155 108, 137 108, 136 103 Z" 
            fill="#18181b" 
            stroke="#27272a" 
            strokeWidth="1.2" 
          />
          {/* Tròng kính đen trái & phải */}
          <rect x="139" y="92" width="19" height="11" rx="3.5" fill="#09090b" opacity="0.95" />
          <rect x="170" y="92" width="19" height="11" rx="3.5" fill="#09090b" opacity="0.95" />
          {/* Vệt phản quang */}
          <line x1="142" y1="94" x2="149" y2="101" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
          <line x1="173" y1="94" x2="180" y2="101" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
          {/* Càng kính ra tai */}
          <path d="M136 94 L127 96" stroke="#18181b" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M192 94 L201 96" stroke="#18181b" strokeWidth="1.8" strokeLinecap="round" />
        </g>
      )}

      {/* 5. KIỀNG CỔ BẠC TRUYỀN THỐNG */}
      {jewelryIds.includes('kieng-co') && (
        <g id="acc-kieng-co">
          <ellipse cx="165" cy="154" rx="25" ry="13" fill="none" stroke="#e2e8f0" strokeWidth="3" />
          <ellipse cx="165" cy="154" rx="25" ry="13" fill="none" stroke="#94a3b8" strokeWidth="1" />
          <circle cx="165" cy="167" r="3" fill="#e2e8f0" stroke="#64748b" strokeWidth="0.8" />
        </g>
      )}

      {/* 6. MÁY ẢNH VINTAGE GEN Z TRƯỚC NGỰC */}
      {genZIds.includes('may-anh') && (
        <g id="acc-may-anh">
          {/* Dây đeo chúc xuống máy ảnh */}
          <path d="M148 140 L150 205 M182 140 L180 205" fill="none" stroke="#27272a" strokeWidth="3.2" strokeLinecap="round" />
          {/* Thân máy ảnh */}
          <g transform="translate(145, 205)">
            <rect x="0" y="5" width="40" height="24" rx="3.5" fill="#18181b" stroke="#09090b" strokeWidth="1" />
            <rect x="0" y="0" width="40" height="6.5" rx="2" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="0.8" />
            <circle cx="20" cy="17" r="8.5" fill="#27272a" stroke="#cbd5e1" strokeWidth="1.5" />
            <circle cx="20" cy="17" r="5" fill="#0284c7" opacity="0.7" />
            <circle cx="34" cy="3" r="1.8" fill="#ef4444" />
          </g>
        </g>
      )}

      {/* 7. TÚI XÁCH SHOULDER BAG GEN Z (Đeo vai bên trái người xem) */}
      {genZIds.includes('tui-xach') && (
        <g id="acc-tui-xach">
          <path d="M102 160 C100 200, 88 250, 84 290" fill="none" stroke="#09090b" strokeWidth="6.5" strokeLinecap="round" />
          <g transform="translate(62, 290)">
            <path d="M4 4 C4 -3, 44 -3, 46 4 L50 38 C50 54, 40 64, 26 64 C12 64, 1 54, 1 38 Z" fill="#18181b" stroke="#09090b" strokeWidth="1.5" />
            <path d="M3 6 C13 11, 37 11, 47 6 L46 26 C37 31, 13 31, 4 26 Z" fill="#27272a" />
          </g>
        </g>
      )}

      {/* 8. ĐỒNG HỒ ĐEO TAY GEN Z (Cổ tay phải người xem) */}
      {genZIds.includes('dong-ho') && (
        <g id="acc-dong-ho" transform="translate(254, 345)">
          <rect x="-16" y="-3.5" width="32" height="7" rx="2" fill="#18181b" stroke="#09090b" strokeWidth="1" />
          <circle cx="0" cy="0" r="8" fill="#09090b" stroke="#27272a" strokeWidth="1" />
          <circle cx="0" cy="0" r="6.8" fill="#e2e8f0" />
          <line x1="0" y1="0" x2="0" y2="-4" stroke="#09090b" strokeWidth="1" strokeLinecap="round" />
          <line x1="0" y1="0" x2="3" y2="1.5" stroke="#ef4444" strokeWidth="0.8" strokeLinecap="round" />
        </g>
      )}

      {/* 9. ĐỒ CẦM TAY: QUẠT XẾP (Cầm ở tay phải người xem) */}
      {handheldId === 'quat' && (
        <g id="acc-quat" transform="translate(258, 365) rotate(25)">
          <path d="M0 45 L-30 6 C-16 -5, 16 -5, 30 6 Z" fill="#FDF6E2" stroke="#D1B888" strokeWidth="1.2" />
          <path d="M-22 10 C-11 2, 11 2, 22 10" stroke="#DC2626" strokeWidth="1.4" fill="none" />
          <line x1="0" y1="45" x2="-24" y2="6" stroke="#8D5B28" strokeWidth="1.2" />
          <line x1="0" y1="45" x2="-12" y2="2" stroke="#8D5B28" strokeWidth="1.2" />
          <line x1="0" y1="45" x2="0" y2="0" stroke="#8D5B28" strokeWidth="1.2" />
          <line x1="0" y1="45" x2="12" y2="2" stroke="#8D5B28" strokeWidth="1.2" />
          <line x1="0" y1="45" x2="24" y2="6" stroke="#8D5B28" strokeWidth="1.2" />
          <circle cx="0" cy="45" r="3" fill="#D97706" />
          <path d="M0 48 L0 70" stroke="#DC2626" strokeWidth="2.2" strokeLinecap="round" />
        </g>
      )}

      {/* 10. GIÀY SNEAKER GEN Z (Phủ lên giày ở đáy) */}
      {genZIds.includes('giay-sneaker') && (
        <g id="acc-sneaker">
          {/* Giày trái */}
          <g transform="translate(60, 574)">
            <path d="M4 15 L24 2 C28 0, 48 0, 52 4 L76 15 L78 24 L2 24 Z" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.2" />
            <rect x="0" y="20" width="80" height="6" rx="2" fill="#FFFFFF" stroke="#0F172A" strokeWidth="1" />
            <line x1="12" y1="12" x2="52" y2="12" stroke="#EF4444" strokeWidth="2.2" strokeLinecap="round" />
          </g>
          {/* Giày phải */}
          <g transform="translate(190, 574)">
            <path d="M76 15 L56 2 C52 0, 32 0, 28 4 L4 15 L2 24 L78 24 Z" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.2" />
            <rect x="0" y="20" width="80" height="6" rx="2" fill="#FFFFFF" stroke="#0F172A" strokeWidth="1" />
            <line x1="28" y1="12" x2="68" y2="12" stroke="#EF4444" strokeWidth="2.2" strokeLinecap="round" />
          </g>
        </g>
      )}
    </g>
  );
};
