import React from 'react';

export interface FemaleAccessoriesProps {
  headwearId?: string | null;
  jewelryIds: string[];
  genZIds: string[];
  handheldId?: string;
}

export const FemaleAccessories: React.FC<FemaleAccessoriesProps> = ({
  headwearId,
  jewelryIds,
  genZIds,
  handheldId,
}) => {
  return (
    <g id="female-accessories-layer">
      {/* 1. DÂY MÁY ẢNH VÒNG QUA CỔ (Sau gáy) */}
      {genZIds.includes('may-anh') && (
        <path 
          d="M148 140 C146 115, 184 115, 182 140" 
          fill="none" 
          stroke="#18181b" 
          strokeWidth="4.5" 
          strokeLinecap="round" 
        />
      )}

      {/* 2. PHỤ KIỆN ĐỘI ĐẦU NỮ */}
      {(headwearId === 'khan-vanh-day' || headwearId === 'khan-xep') && (
        <g id="female-acc-khan-vanh" transform="translate(0, -6)">
          <path d="M164 12C182.729 12 199.661 15.1266 211.893 20.1631C218.01 22.6818 222.927 25.6683 226.308 28.959C229.686 32.2482 231.5 35.8104 231.5 39.5C231.5 43.1896 229.686 46.7518 226.308 50.041C222.927 53.3317 218.01 56.3182 211.893 58.8369C199.661 63.8734 182.729 67 164 67C145.271 67 128.339 63.8734 116.107 58.8369C109.99 56.3182 105.073 53.3317 101.692 50.041C98.3137 46.7518 96.5 43.1896 96.5 39.5C96.5 35.8104 98.3137 32.2482 101.692 28.959C105.073 25.6683 109.99 22.6818 116.107 20.1631C128.339 15.1266 145.271 12 164 12Z" fill="#2A5DB0" stroke="#1B3F85" />
          <ellipse cx="164" cy="39" rx="56" ry="18" fill="#1F4A99" />
          <path d="M164 20C176.665 20 188.11 21.675 196.372 24.3691C200.506 25.7171 203.815 27.3113 206.08 29.0576C208.352 30.8092 209.5 32.6527 209.5 34.5C209.5 36.3473 208.352 38.1908 206.08 39.9424C203.815 41.6887 200.506 43.2829 196.372 44.6309C188.11 47.325 176.665 49 164 49C151.335 49 139.89 47.325 131.628 44.6309C127.494 43.2829 124.185 41.6887 121.92 39.9424C119.648 38.1908 118.5 36.3473 118.5 34.5C118.5 32.6527 119.648 30.8092 121.92 29.0576C124.185 27.3113 127.494 25.7171 131.628 24.3691C139.89 21.675 151.335 20 164 20Z" stroke="#4F86D6" />
          <path d="M164 25C173.907 25 182.858 26.1722 189.315 28.0557C192.547 28.9983 195.127 30.1108 196.887 31.3242C198.662 32.5484 199.5 33.7992 199.5 35C199.5 36.2008 198.662 37.4516 196.887 38.6758C195.127 39.8892 192.547 41.0017 189.315 41.9443C182.858 43.8278 173.907 45 164 45C154.093 45 145.142 43.8278 138.685 41.9443C135.453 41.0017 132.873 39.8892 131.113 38.6758C129.338 37.4516 128.5 36.2008 128.5 35C128.5 33.7992 129.338 32.5484 131.113 31.3242C132.873 30.1108 135.453 28.9983 138.685 28.0557C145.142 26.1722 154.093 25 164 25Z" stroke="#4F86D6" />
          <path d="M164 28.5C171.149 28.5 177.603 29.2808 182.255 30.5332C184.584 31.1604 186.434 31.8985 187.688 32.6973C188.967 33.5112 189.5 34.3014 189.5 35C189.5 35.6986 188.967 36.4888 187.688 37.3027C186.434 38.1015 184.584 38.8396 182.255 39.4668C177.603 40.7192 171.149 41.5 164 41.5C156.851 41.5 150.397 40.7192 145.745 39.4668C143.416 38.8396 141.566 38.1015 140.312 37.3027C139.033 36.4888 138.5 35.6986 138.5 35C138.5 34.3014 139.033 33.5112 140.312 32.6973C141.566 31.8985 143.416 31.1604 145.745 30.5332C150.397 29.2808 156.851 28.5 164 28.5Z" stroke="#4F86D6" />
        </g>
      )}

      {headwearId === 'non-ba-tam' && (
        <g id="female-acc-non-ba-tam">
          <ellipse cx="164" cy="30" rx="82" ry="18" fill="#FDE68A" stroke="#D97706" strokeWidth="1.8" />
          <ellipse cx="164" cy="30" rx="76" ry="14" fill="#FEF3C7" stroke="#D97706" strokeWidth="0.8" />
          <path d="M112 32 C116 95, 164 145, 164 145 C164 145, 212 95, 216 32" fill="none" stroke="#F43F5E" strokeWidth="3" strokeLinecap="round" />
          <circle cx="164" cy="145" r="3.5" fill="#BE123C" />
        </g>
      )}

      {headwearId === 'non-la' && (
        <g id="female-acc-non-la">
          <path d="M102 46 L164 2 L226 46 Z" fill="#FEF3C7" stroke="#D97706" strokeWidth="1.5" strokeLinejoin="round" />
          <ellipse cx="164" cy="46" rx="62" ry="9" fill="#FDE68A" stroke="#D97706" strokeWidth="1" />
          <path d="M120 46 C124 84, 164 94, 164 94 C164 94, 204 84, 208 46" fill="none" stroke="#F472B6" strokeWidth="2.2" strokeLinecap="round" />
        </g>
      )}

      {/* 3. KIỀNG CỔ NỮ */}
      {jewelryIds.includes('kieng-co') && (
        <g id="female-acc-kieng-co">
          <ellipse cx="164" cy="154" rx="22" ry="12" fill="none" stroke="#E2E8F0" strokeWidth="3" />
          <ellipse cx="164" cy="154" rx="22" ry="12" fill="none" stroke="#94A3B8" strokeWidth="1" />
          <circle cx="164" cy="166" r="2.8" fill="#E2E8F0" stroke="#64748B" strokeWidth="0.8" />
        </g>
      )}

      {/* 4. KÍNH RÂM GEN Z */}
      {genZIds.includes('kinh-ram') && (
        <g id="female-acc-kinh-ram">
          <path 
            d="M137 78 C137 74, 157 73, 159 77 C161 76, 165 76, 167 77 C169 73, 189 74, 189 78 L188 86 C187 90, 168 90, 164 85 C162 85, 160 85, 158 85 C154 90, 138 90, 137 86 Z" 
            fill="#18181b" 
            stroke="#27272a" 
            strokeWidth="1.2" 
            strokeLinejoin="round" 
          />
          <rect x="139" y="76" width="18" height="9.5" rx="3" fill="#09090b" opacity="0.95" />
          <rect x="166" y="76" width="18" height="9.5" rx="3" fill="#09090b" opacity="0.95" />
          <line x1="142" y1="77.5" x2="148" y2="83.5" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" opacity="0.45" />
          <line x1="169" y1="77.5" x2="175" y2="83.5" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" opacity="0.45" />
          <path d="M137 79 L129 81" stroke="#18181b" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M189 79 L197 81" stroke="#18181b" strokeWidth="1.8" strokeLinecap="round" />
        </g>
      )}

      {/* 5. TAI NGHE TRÙM ĐẦU GEN Z */}
      {genZIds.includes('tai-nghe-trum-dau') && (
        <g id="female-acc-tai-nghe">
          <path 
            d="M125 68 C121 18, 207 18, 203 68" 
            fill="none" 
            stroke="#09090b" 
            strokeWidth="9" 
            strokeLinecap="round" 
          />
          <path 
            d="M126 66 C123 22, 205 22, 202 66" 
            fill="none" 
            stroke="#1e293b" 
            strokeWidth="5" 
            strokeLinecap="round" 
          />
          <path 
            d="M128 65 C125 25, 203 25, 200 65" 
            fill="none" 
            stroke="#475569" 
            strokeWidth="1.2" 
            strokeLinecap="round" 
            strokeDasharray="4 3" 
          />
          <rect x="122" y="62" width="6" height="9" rx="1.5" fill="#cbd5e1" stroke="#64748b" strokeWidth="0.8" />
          <rect x="200" y="62" width="6" height="9" rx="1.5" fill="#cbd5e1" stroke="#64748b" strokeWidth="0.8" />
          <g transform="translate(126, 81.5) rotate(-6)">
            <ellipse cx="0" cy="0" rx="11.5" ry="18" fill="#09090b" stroke="#18181b" strokeWidth="1.5" />
            <ellipse cx="0" cy="0" rx="9" ry="15" fill="#18181b" />
            <ellipse cx="-2" cy="0" rx="7" ry="13" fill="#0f172a" stroke="#475569" strokeWidth="1.2" />
            <circle cx="-2" cy="0" r="2.8" fill="#64748b" stroke="#94a3b8" strokeWidth="0.8" />
          </g>
          <g transform="translate(202, 81.5) rotate(6)">
            <ellipse cx="0" cy="0" rx="11.5" ry="18" fill="#09090b" stroke="#18181b" strokeWidth="1.5" />
            <ellipse cx="0" cy="0" rx="9" ry="15" fill="#18181b" />
            <ellipse cx="2" cy="0" rx="7" ry="13" fill="#0f172a" stroke="#475569" strokeWidth="1.2" />
            <circle cx="2" cy="0" r="2.8" fill="#64748b" stroke="#94a3b8" strokeWidth="0.8" />
          </g>
        </g>
      )}

      {/* 6. TÚI XÁCH SHOULDER BAG */}
      {genZIds.includes('tui-xach') && (
        <g id="female-acc-tui-xach" transform="translate(50, 0)">
          <path d="M102 148 C101 185, 91 235, 86 278" fill="none" stroke="#09090b" strokeWidth="6.5" strokeLinecap="round" />
          <path d="M102 149 C101 185, 91 234, 86 277" fill="none" stroke="#27272a" strokeWidth="1.2" strokeLinecap="round" strokeDasharray="3 2" />
          <ellipse cx="86" cy="278" rx="3.5" ry="2.2" fill="none" stroke="#a1a1aa" strokeWidth="1.5" />
          <path d="M66 280 C66 273, 106 273, 108 280 L113 315 C113 331, 102 342, 88 342 C74 342, 63 331, 63 315 Z" fill="#18181b" stroke="#09090b" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M64 282 C74 287, 100 287, 110 282 L109 304 C100 309, 74 309, 65 304 Z" fill="#27272a" stroke="#09090b" strokeWidth="1" />
          <rect x="84.5" y="301" width="7" height="4.5" rx="1.2" fill="#e4e4e7" stroke="#71717a" strokeWidth="0.8" />
        </g>
      )}

      {/* 7. MÁY ẢNH TRƯỚC NGỰC */}
      {genZIds.includes('may-anh') && (
        <g id="female-acc-may-anh">
          <path d="M148 140 C146 160, 150 186, 152 208 M182 140 C184 160, 180 186, 178 208" fill="none" stroke="#18181b" strokeWidth="4.8" strokeLinecap="round" />
          <rect x="142" y="207" width="44" height="26" rx="3.5" fill="#18181b" stroke="#09090b" strokeWidth="1" />
          <rect x="142" y="204" width="44" height="6.5" rx="2" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="0.8" />
          <circle cx="150" cy="214" r="1.5" fill="#ef4444" />
          <circle cx="164" cy="219" r="9.5" fill="#27272a" stroke="#cbd5e1" strokeWidth="1.5" />
          <circle cx="164" cy="219" r="7" fill="#09090b" />
          <circle cx="164" cy="219" r="5" fill="#0284c7" opacity="0.65" />
          <ellipse cx="162" cy="217" rx="2" ry="1.2" fill="#ffffff" opacity="0.85" />
        </g>
      )}

      {/* 8. ĐỒNG HỒ ĐEO TAY NỮ */}
      {genZIds.includes('dong-ho') && (
        <g id="female-acc-dong-ho" transform="translate(245, 335) scale(0.85) rotate(-18)">
          <path d="M-22 -2.8 C-11 -4, 11 -4, 22 -2.8 C23.5 -1.8, 23.5 2, 22 3.2 C11 4.5, -11 4.5, -22 3.2 C-23.5 2, -23.5 -1.8, -22 -2.8 Z" fill="#18181b" stroke="#09090b" strokeWidth="1.2" strokeLinejoin="round" />
          <circle cx="0" cy="0" r="8.8" fill="#09090b" stroke="#27272a" strokeWidth="1" />
          <circle cx="0" cy="0" r="7.6" fill="#e2e8f0" stroke="#09090b" strokeWidth="1.2" />
          <circle cx="0" cy="0" r="6.2" fill="#cbd5e1" />
          <circle cx="0" cy="0" r="1.1" fill="#09090b" />
          <line x1="0" y1="0" x2="0" y2="-4" stroke="#09090b" strokeWidth="1" strokeLinecap="round" />
          <line x1="0" y1="0" x2="2.8" y2="1.4" stroke="#09090b" strokeWidth="1" strokeLinecap="round" />
          <line x1="0" y1="0" x2="-1.8" y2="3.2" stroke="#ef4444" strokeWidth="0.6" strokeLinecap="round" />
        </g>
      )}

      {/* 9. ĐỒ CẦM TAY NỮ (HANDHELD) */}
      {handheldId === 'quat' && (
        <g id="female-acc-quat" transform="translate(68, 325) rotate(-16)">
          <path d="M0 45 L-28 8 C-15 -2, 15 -2, 28 8 Z" fill="#FDF6E2" stroke="#D1B888" strokeWidth="1" />
          <path d="M-20 12 C-10 4, 10 4, 20 12" stroke="#DC2626" strokeWidth="1.2" fill="none" />
          <line x1="0" y1="45" x2="-22" y2="8" stroke="#8D5B28" strokeWidth="1.2" />
          <line x1="0" y1="45" x2="-11" y2="4" stroke="#8D5B28" strokeWidth="1.2" />
          <line x1="0" y1="45" x2="0" y2="2" stroke="#8D5B28" strokeWidth="1.2" />
          <line x1="0" y1="45" x2="11" y2="4" stroke="#8D5B28" strokeWidth="1.2" />
          <line x1="0" y1="45" x2="22" y2="8" stroke="#8D5B28" strokeWidth="1.2" />
          <circle cx="0" cy="45" r="2.8" fill="#D97706" />
          <path d="M0 48 L0 68" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" />
        </g>
      )}

      {handheldId === 'o-du' && (
        <g id="female-acc-o-du" transform="translate(255, 205) rotate(12)">
          <path d="M0 0 C-45 -5, -70 30, -75 48 L75 48 C70 30, 45 -5, 0 0 Z" fill="#DC2626" stroke="#991B1B" strokeWidth="1.5" />
          <path d="M-60 48 C-35 38, 35 38, 60 48" stroke="#FDE68A" strokeWidth="1.5" fill="none" />
          <line x1="0" y1="0" x2="0" y2="190" stroke="#78350F" strokeWidth="4" strokeLinecap="round" />
          <path d="M0 190 C0 202, -14 202, -14 192" fill="none" stroke="#78350F" strokeWidth="4" strokeLinecap="round" />
        </g>
      )}

      {handheldId === 'dan-nguyet' && (
        <g id="female-acc-dan-nguyet" transform="translate(150, 245) rotate(-34)">
          <rect x="-4" y="-70" width="8" height="130" rx="2" fill="#78350F" stroke="#451A03" strokeWidth="1" />
          <circle cx="0" cy="-68" r="7" fill="#B45309" />
          <line x1="-8" y1="-55" x2="8" y2="-55" stroke="#FDE68A" strokeWidth="2.5" />
          <circle cx="0" cy="60" r="38" fill="#FBBF24" stroke="#78350F" strokeWidth="3" />
          <circle cx="0" cy="60" r="32" fill="#FEF3C7" stroke="#D97706" strokeWidth="1.2" />
          <rect x="-8" y="70" width="16" height="5" rx="1" fill="#78350F" />
          <line x1="-2" y1="-55" x2="-2" y2="70" stroke="#713F12" strokeWidth="1" />
          <line x1="2" y1="-55" x2="2" y2="70" stroke="#713F12" strokeWidth="1" />
        </g>
      )}
    </g>
  );
};
