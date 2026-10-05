import React from 'react';

export interface FemaleCostumeProps {
  children?: React.ReactNode;
  dressColor?: string;
  liningColor?: string;
  pantsColor?: string;
  selectedHeadwearId?: string | null;
}

// 1. Áo Nhật Bình Nữ - Trang phục cung đình đặc trưng triều Nguyễn
export const FemaleNhatBinh: React.FC<FemaleCostumeProps> = ({ children }) => {
  return (
    <svg 
      viewBox="0 0 360 610" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full object-contain"
    >
      {/* 1. Chân váy kem sáng xếp nếp & Hài thêu mũi cong */}
      {/* Váy xếp ly kem sáng với hoa văn 3 chấm xanh đặc trưng triều Nguyễn */}
      <path d="M112 430 L95 558 C135 566, 195 566, 235 558 L218 430 Z" fill="#FBF8EE" stroke="#E2DAC7" strokeWidth="1.2" />
      {/* Các đường nếp ly váy */}
      <line x1="125" y1="440" x2="115" y2="556" stroke="#EDE5D2" strokeWidth="1.2" />
      <line x1="145" y1="440" x2="140" y2="560" stroke="#EDE5D2" strokeWidth="1.2" />
      <line x1="165" y1="440" x2="165" y2="562" stroke="#EDE5D2" strokeWidth="1.2" />
      <line x1="185" y1="440" x2="190" y2="560" stroke="#EDE5D2" strokeWidth="1.2" />
      <line x1="205" y1="440" x2="215" y2="556" stroke="#EDE5D2" strokeWidth="1.2" />
      {/* Họa tiết 3 chấm xanh hoàng gia triều Nguyễn */}
      {[
        [120, 480], [145, 510], [170, 475], [195, 515], [210, 470],
        [135, 535], [165, 530], [185, 540]
      ].map(([x, y], idx) => (
        <g key={idx}>
          <circle cx={x} cy={y} r="2" fill="#2563EB" />
          <circle cx={x + 3.5} cy={y + 1.5} r="1.8" fill="#2563EB" />
          <circle cx={x + 1.8} cy={y - 3} r="1.8" fill="#2563EB" />
        </g>
      ))}

      {/* Cổ chân thon thả nữ */}
      <path d="M125 552 C132 552, 138 556, 138 565 C138 574, 132 580, 125 580 C118 580, 112 574, 112 565 C112 556, 118 552, 125 552 Z" fill="#FCE7D6" />
      <path d="M205 552 C212 552, 218 556, 218 565 C218 574, 212 580, 205 580 C198 580, 192 574, 192 565 C192 556, 198 552, 205 552 Z" fill="#FCE7D6" />

      {/* Đôi hài thêu hoa sen mũi cong truyền thống */}
      <path d="M140 568 H106 C102 568, 98 571, 94 574 L78 588 C74 591, 72 593, 72 595 C72 597, 74 598, 78 598 H142 C145 598, 147 596, 147 593 V576 C147 571, 144 568, 140 568 Z" fill="#B91C1C" />
      <path d="M72 595 L142 595 L142 598 L72 598 Z" fill="#FFFFFF" opacity="0.9" />
      <circle cx="86" cy="587" r="2.2" fill="#F59E0B" />

      <path d="M190 568 H224 C228 568, 232 571, 236 574 L252 588 C256 591, 258 593, 258 595 C258 597, 256 598, 252 598 H188 C185 598, 183 596, 183 593 V576 C183 571, 186 568, 190 568 Z" fill="#B91C1C" />
      <path d="M188 595 L258 595 L258 598 L188 598 Z" fill="#FFFFFF" opacity="0.9" />
      <circle cx="244" cy="587" r="2.2" fill="#F59E0B" />

      {/* 2. Cổ và Khuôn mặt thiếu nữ */}
      <path d="M165 125 C172 125, 178 131, 178 138 V152 C178 159, 172 165, 165 165 C158 165, 152 159, 152 152 V138 C152 131, 158 125, 165 125 Z" fill="#FCE7D6" />

      {/* 3. Thân áo Nhật Bình xanh lam hoàng gia (Royal Blue) */}
      <path d="M115 162 C100 168, 92 185, 90 215 L82 450 C125 460, 205 460, 248 450 L240 215 C238 185, 230 168, 215 162 Z" fill="#16246E" />
      <path d="M125 160 H205 C218 162, 226 174, 225 198 L232 445 C192 455, 138 455, 98 445 L105 198 C104 174, 112 162, 125 160 Z" fill="#1F3294" stroke="#17257A" strokeWidth="1.2" strokeLinejoin="round" />
      
      {/* 4. Ống tay áo thụng viền ngũ sắc ngũ hành ở cổ tay */}
      {/* Ống tay trái */}
      <path d="M125 160 C98 162, 75 180, 62 210 L38 315 C32 340, 28 368, 25 395 C45 408, 80 408, 102 395 C105 348, 112 280, 122 215 Z" fill="#1F3294" stroke="#17257A" strokeWidth="1.2" />
      {/* Dải ngũ sắc ngũ hành viền cửa tay áo: Đỏ, Vàng, Lam, Trắng, Lục */}
      <path d="M25 395 C45 408, 80 408, 102 395" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" />
      <path d="M26 391 C46 404, 79 404, 101 391" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M27 387 C47 400, 78 400, 100 387" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M28 383 C48 396, 77 396, 99 383" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M29 379 C49 392, 76 392, 98 379" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" />

      {/* Ống tay phải */}
      <path d="M205 160 C232 162, 255 180, 268 210 L292 315 C298 340, 302 368, 305 395 C285 408, 250 408, 228 395 C225 348, 218 280, 208 215 Z" fill="#1F3294" stroke="#17257A" strokeWidth="1.2" />
      {/* Dải ngũ sắc ngũ hành viền cửa tay áo phải */}
      <path d="M305 395 C285 408, 250 408, 228 395" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" />
      <path d="M304 391 C284 404, 251 404, 229 391" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M303 387 C283 400, 252 400, 230 387" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M302 383 C282 396, 253 396, 231 383" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M301 379 C281 392, 254 392, 232 379" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" />

      {/* Búp măng bàn tay nữ thanh tú lấp ló trong tay áo */}
      <path d="M60 375 C62 384, 66 392, 70 395 C74 392, 78 384, 78 375 Z" fill="#FCE7D6" />
      <path d="M252 375 C250 384, 246 392, 242 395 C238 392, 234 384, 234 375 Z" fill="#FCE7D6" />

      {/* 5. CỔ ÁO NHẬT BÌNH TO BẢN HÌNH CHỮ NHẬT ĐẶC TRƯNG (Rectangular Collar) */}
      {/* Khối nẹp cổ chữ nhật xẻ dọc giữa ngực */}
      <path d="M142 144 H188 V320 H142 Z" fill="#F59E0B" stroke="#B45309" strokeWidth="1.2" />
      {/* Vạch nẹp xẻ giữa */}
      <line x1="165" y1="144" x2="165" y2="320" stroke="#B45309" strokeWidth="1.2" />
      {/* Dải hoa văn ngũ sắc trên nẹp cổ chữ nhật */}
      <rect x="145" y="148" width="17" height="168" fill="#DC2626" opacity="0.85" />
      <rect x="168" y="148" width="17" height="168" fill="#DC2626" opacity="0.85" />
      <line x1="153" y1="148" x2="153" y2="316" stroke="#FEF08A" strokeWidth="2" strokeDasharray="3 3" />
      <line x1="177" y1="148" x2="177" y2="316" stroke="#FEF08A" strokeWidth="2" strokeDasharray="3 3" />
      {/* Các họa tiết phụng vũ / mây ngũ sắc trên nẹp cổ */}
      {[165, 195, 225, 255, 285].map((y, i) => (
        <g key={i}>
          <circle cx="153" cy={y} r="2.8" fill="#10B981" />
          <circle cx="177" cy={y} r="2.8" fill="#10B981" />
          <circle cx="153" cy={y} r="1.4" fill="#FFFFFF" />
          <circle cx="177" cy={y} r="1.4" fill="#FFFFFF" />
        </g>
      ))}

      {/* Dải ngọc bội kết nối nẹp cổ */}
      <circle cx="165" cy="205" r="4.5" fill="#10B981" stroke="#059669" strokeWidth="1" />
      <circle cx="165" cy="245" r="4.5" fill="#10B981" stroke="#059669" strokeWidth="1" />
      <circle cx="165" cy="285" r="4.5" fill="#F59E0B" stroke="#D97706" strokeWidth="1" />
      {/* Tua rua đỏ dưới dải ngọc bội */}
      <path d="M164 290 L162 315 L166 315 Z" fill="#DC2626" />

      {/* 6. Đầu, Tóc và Khuôn mặt dịu dàng của thiếu nữ */}
      {/* Đôi khuyên tai ngọc trai buông nhẹ */}
      <circle cx="134" cy="115" r="2.5" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="0.8" />
      <circle cx="196" cy="115" r="2.5" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="0.8" />

      {/* Khuôn mặt V-line mềm mại */}
      <path d="M138 88 C138 68, 155 56, 172 62 C184 66, 192 76, 192 88 V110 C192 124, 180 135, 165 135 C150 135, 138 124, 138 110 Z" fill="#FCE7D6" stroke="#FCE7D6" />

      {/* Tóc đen mượt buông lọn nhẹ 2 bên */}
      <path d="M120 78 C120 54, 140 40, 165 40 C190 40, 210 54, 210 78 C210 95, 204 112, 198 122 C194 112, 192 98, 192 86 C192 74, 182 66, 165 66 C148 66, 138 74, 138 86 C138 98, 136 112, 132 122 C126 112, 120 95, 120 78 Z" fill="#1C1917" />
      {/* Lọn tóc mai duyên dáng ôm má */}
      <path d="M136 90 C134 105, 135 118, 138 125 C139 122, 138 110, 139 95 Z" fill="#1C1917" />
      <path d="M194 90 C196 105, 195 118, 192 125 C191 122, 192 110, 191 95 Z" fill="#1C1917" />

      {/* Chân mày lá liễu mềm mại */}
      <path d="M144 94 C148 91, 154 91, 158 94" stroke="#44403C" strokeWidth="1.1" strokeLinecap="round" />
      <path d="M172 94 C176 91, 182 91, 186 94" stroke="#44403C" strokeWidth="1.1" strokeLinecap="round" />

      {/* Đôi mắt bồ câu hạt tiêu hiền dịu với hàng mi */}
      <circle cx="151" cy="99" r="2.8" fill="#1C1917" />
      <circle cx="152" cy="98" r="0.9" fill="#FFFFFF" />
      <path d="M147 97 C150 95, 154 95, 156 97" stroke="#1C1917" strokeWidth="0.8" />

      <circle cx="179" cy="99" r="2.8" fill="#1C1917" />
      <circle cx="180" cy="98" r="0.9" fill="#FFFFFF" />
      <path d="M174 97 C177 95, 181 95, 183 97" stroke="#1C1917" strokeWidth="0.8" />

      {/* Sống mũi thanh tú & nụ cười mỉm môi hồng đào */}
      <path d="M165 99 V109 H167" stroke="#D97706" strokeWidth="0.9" strokeLinecap="round" />
      <path d="M159 118 C162 121, 168 121, 171 118" stroke="#E11D48" strokeWidth="1.5" strokeLinecap="round" />

      {/* 7. Khăn vành dây xanh lam quấn xếp nhiều lớp trên đầu */}
      <ellipse cx="165" cy="48" rx="46" ry="16" fill="#2563EB" stroke="#1D4ED8" strokeWidth="1.2" />
      <ellipse cx="165" cy="46" rx="42" ry="14" fill="#1D4ED8" stroke="#60A5FA" strokeWidth="0.8" />
      <ellipse cx="165" cy="44" rx="38" ry="12" fill="#2563EB" stroke="#60A5FA" strokeWidth="0.8" />
      <ellipse cx="165" cy="42" rx="34" ry="10" fill="#1E40AF" stroke="#60A5FA" strokeWidth="0.8" />

      {children}
    </svg>
  );
};

// 2. Áo Tấc Nữ - Đại lễ phục trang trọng tay thụng
export const FemaleAoTac: React.FC<FemaleCostumeProps> = ({ children }) => {
  return (
    <svg 
      viewBox="0 0 360 610" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full object-contain"
    >
      {/* Quần lụa trắng và hài thêu */}
      <path d="M118 480 L110 558 C125 562, 145 562, 155 558 L160 480 Z" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1" />
      <path d="M202 480 L198 558 C215 562, 235 562, 245 558 L238 480 Z" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1" />
      <path d="M125 552 C132 552, 138 556, 138 565 C138 574, 132 580, 125 580 C118 580, 112 574, 112 565 C112 556, 118 552, 125 552 Z" fill="#FCE7D6" />
      <path d="M205 552 C212 552, 218 556, 218 565 C218 574, 212 580, 205 580 C198 580, 192 574, 192 565 C192 556, 198 552, 205 552 Z" fill="#FCE7D6" />
      <path d="M140 568 H106 C102 568, 98 571, 94 574 L78 588 C74 591, 72 593, 72 595 C72 597, 74 598, 78 598 H142 V576 C142 571, 140 568, 140 568 Z" fill="#7F1D1D" />
      <path d="M190 568 H224 C228 568, 232 571, 236 574 L252 588 C256 591, 258 593, 258 595 C258 597, 256 598, 252 598 H188 V576 C188 571, 190 568, 190 568 Z" fill="#7F1D1D" />

      {/* Cổ thiếu nữ */}
      <path d="M165 125 C172 125, 178 131, 178 138 V152 C178 159, 172 165, 165 165 C158 165, 152 159, 152 152 V138 C152 131, 158 125, 165 125 Z" fill="#FCE7D6" />

      {/* Tà áo thụng đỏ thắm phía sau */}
      <path d="M110 162 C90 168, 82 185, 80 215 L68 505 C125 518, 205 518, 262 505 L250 215 C248 185, 240 168, 220 162 Z" fill="#7F1D1D" />

      {/* Thân áo Tấc đỏ thắm / đỏ rượu quý phái */}
      <path d="M125 160 H205 C222 162, 232 174, 230 198 L242 500 C195 512, 135 512, 88 500 L100 198 C98 174, 108 162, 125 160 Z" fill="#991B1B" stroke="#7F1D1D" strokeWidth="1.2" />
      <path d="M88 500 C135 512, 195 512, 242 500" stroke="#FDE047" strokeWidth="2" strokeLinecap="round" />

      {/* Vạt phụ ngũ thân cài bên ngực phải */}
      <path d="M165 160 L198 230 L204 340 L168 502" stroke="#FDE047" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="166" cy="166" r="2.8" fill="#F59E0B" stroke="#B45309" strokeWidth="0.8" />
      <circle cx="178" cy="190" r="2.8" fill="#F59E0B" stroke="#B45309" strokeWidth="0.8" />
      <circle cx="190" cy="216" r="2.8" fill="#F59E0B" stroke="#B45309" strokeWidth="0.8" />
      <circle cx="198" cy="248" r="2.8" fill="#F59E0B" stroke="#B45309" strokeWidth="0.8" />
      <circle cx="203" cy="287" r="2.8" fill="#F59E0B" stroke="#B45309" strokeWidth="0.8" />

      {/* Cổ áo đứng 5 thân */}
      <path d="M146 144 H184 C188 144, 190 148, 188 160 L142 160 C140 148, 142 144, 146 144 Z" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="1.2" />
      <circle cx="165" cy="152" r="2.4" fill="#F59E0B" stroke="#B45309" strokeWidth="0.6" />

      {/* Ống tay áo thụng rất rộng buông thõng qua đầu gối */}
      <path d="M125 160 C95 162, 68 180, 55 210 L28 340 C22 370, 20 405, 18 438 C42 452, 85 452, 114 438 C116 385, 120 310, 126 230 Z" fill="#991B1B" stroke="#7F1D1D" strokeWidth="1.2" />
      <path d="M18 438 C42 452, 85 452, 114 438 L112 444 C84 458, 42 458, 18 444 Z" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="1.2" />

      <path d="M205 160 C235 162, 262 180, 275 210 L302 340 C308 370, 310 405, 312 438 C288 452, 245 452, 216 438 C214 385, 210 310, 204 230 Z" fill="#991B1B" stroke="#7F1D1D" strokeWidth="1.2" />
      <path d="M312 438 C288 452, 245 452, 216 438 L218 444 C246 458, 288 458, 312 444 Z" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="1.2" />

      {/* Bàn tay trong ống tay thụng */}
      <path d="M60 410 C62 422, 68 432, 74 436 C78 432, 82 422, 82 410 Z" fill="#FCE7D6" />
      <path d="M250 410 C248 422, 242 432, 236 436 C232 432, 228 422, 228 410 Z" fill="#FCE7D6" />

      {/* Đầu, Tóc và Khuôn mặt thiếu nữ */}
      <circle cx="134" cy="115" r="2.5" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="0.8" />
      <circle cx="196" cy="115" r="2.5" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="0.8" />
      <path d="M138 88 C138 68, 155 56, 172 62 C184 66, 192 76, 192 88 V110 C192 124, 180 135, 165 135 C150 135, 138 124, 138 110 Z" fill="#FCE7D6" />
      <path d="M120 78 C120 54, 140 40, 165 40 C190 40, 210 54, 210 78 C210 95, 204 112, 198 122 C194 112, 192 98, 192 86 C192 74, 182 66, 165 66 C148 66, 138 74, 138 86 C138 98, 136 112, 132 122 C126 112, 120 95, 120 78 Z" fill="#1C1917" />
      <path d="M144 94 C148 91, 154 91, 158 94" stroke="#44403C" strokeWidth="1.1" strokeLinecap="round" />
      <path d="M172 94 C176 91, 182 91, 186 94" stroke="#44403C" strokeWidth="1.1" strokeLinecap="round" />
      <circle cx="151" cy="99" r="2.8" fill="#1C1917" />
      <circle cx="152" cy="98" r="0.9" fill="#FFFFFF" />
      <circle cx="179" cy="99" r="2.8" fill="#1C1917" />
      <circle cx="180" cy="98" r="0.9" fill="#FFFFFF" />
      <path d="M165 99 V109 H167" stroke="#D97706" strokeWidth="0.9" strokeLinecap="round" />
      <path d="M159 118 C162 121, 168 121, 171 118" stroke="#E11D48" strokeWidth="1.5" strokeLinecap="round" />

      {/* Khăn vành dây đỏ hoàng gia */}
      <ellipse cx="165" cy="48" rx="46" ry="16" fill="#991B1B" stroke="#7F1D1D" strokeWidth="1.2" />
      <ellipse cx="165" cy="46" rx="42" ry="14" fill="#B91C1C" stroke="#FDE047" strokeWidth="0.8" />
      <ellipse cx="165" cy="44" rx="38" ry="12" fill="#991B1B" stroke="#FDE047" strokeWidth="0.8" />

      {children}
    </svg>
  );
};

// 3. Áo Ngũ Thân Tay Chẽn Nữ - Tiền thân của Áo Dài Việt Nam
export const FemaleNguThan: React.FC<FemaleCostumeProps> = ({ children }) => {
  return (
    <svg 
      viewBox="0 0 360 610" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full object-contain"
    >
      {/* Quần lụa trắng dài thướt tha */}
      <path d="M125 430 L114 558 C128 562, 146 562, 156 558 L162 430 Z" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
      <path d="M198 430 L204 558 C214 562, 232 562, 246 558 L235 430 Z" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
      <path d="M125 552 C132 552, 138 556, 138 565 C138 574, 132 580, 125 580 C118 580, 112 574, 112 565 C112 556, 118 552, 125 552 Z" fill="#FCE7D6" />
      <path d="M205 552 C212 552, 218 556, 218 565 C218 574, 212 580, 205 580 C198 580, 192 574, 192 565 C192 556, 198 552, 205 552 Z" fill="#FCE7D6" />
      <path d="M140 568 H106 C102 568, 98 571, 94 574 L78 588 C74 591, 72 593, 72 595 C72 597, 74 598, 78 598 H142 V576 C142 571, 140 568, 140 568 Z" fill="#1C1917" />
      <path d="M190 568 H224 C228 568, 232 571, 236 574 L252 588 C256 591, 258 593, 258 595 C258 597, 256 598, 252 598 H188 V576 C188 571, 190 568, 190 568 Z" fill="#1C1917" />

      {/* Cổ thiếu nữ */}
      <path d="M165 125 C172 125, 178 131, 178 138 V152 C178 159, 172 165, 165 165 C158 165, 152 159, 152 152 V138 C152 131, 158 125, 165 125 Z" fill="#FCE7D6" />

      {/* Tà áo sau */}
      <path d="M120 162 C105 168, 98 185, 96 215 L88 508 C135 518, 195 518, 242 508 L234 215 C232 185, 225 168, 210 162 Z" fill="#CA8A04" />

      {/* Thân áo ngũ thân tay chẽn vàng hoàng yến (Elegance Yellow) */}
      <path d="M128 160 H202 C214 162, 222 174, 220 198 L228 505 C190 514, 140 514, 102 505 L110 198 C108 174, 116 162, 128 160 Z" fill="#EAB308" stroke="#CA8A04" strokeWidth="1.2" />
      <path d="M102 505 C140 514, 190 514, 228 505" stroke="#CA8A04" strokeWidth="1.5" />

      {/* Nẹp cài 5 cúc bên ngực phải */}
      <path d="M165 160 L194 225 L196 330 L168 506" stroke="#92400E" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="166" cy="166" r="2.5" fill="#F59E0B" stroke="#78350F" strokeWidth="0.8" />
      <circle cx="176" cy="188" r="2.5" fill="#F59E0B" stroke="#78350F" strokeWidth="0.8" />
      <circle cx="186" cy="212" r="2.5" fill="#F59E0B" stroke="#78350F" strokeWidth="0.8" />
      <circle cx="192" cy="242" r="2.5" fill="#F59E0B" stroke="#78350F" strokeWidth="0.8" />
      <circle cx="196" cy="278" r="2.5" fill="#F59E0B" stroke="#78350F" strokeWidth="0.8" />

      {/* Cổ đứng 5 cúc thanh mảnh */}
      <path d="M148 144 H182 C186 144, 188 148, 186 160 L144 160 C142 148, 144 144, 148 144 Z" fill="#FEF08A" stroke="#CA8A04" strokeWidth="1.2" />
      <circle cx="165" cy="152" r="2.2" fill="#F59E0B" stroke="#78350F" strokeWidth="0.6" />

      {/* Ống tay chẽn gọn gàng ôm sát cánh tay thiếu nữ */}
      <path d="M128 160 C110 162, 92 174, 84 195 L66 268 C62 292, 58 318, 58 335 C68 340, 84 340, 94 335 C95 315, 102 270, 118 225 L128 195 Z" fill="#EAB308" stroke="#CA8A04" strokeWidth="1.2" />
      <path d="M58 335 C68 340, 84 340, 94 335" stroke="#FEF08A" strokeWidth="2.5" strokeLinecap="round" />

      <path d="M202 160 C220 162, 238 174, 246 195 L264 268 C268 292, 272 318, 272 335 C262 340, 246 340, 236 335 C235 315, 228 270, 212 225 L202 195 Z" fill="#EAB308" stroke="#CA8A04" strokeWidth="1.2" />
      <path d="M272 335 C262 340, 246 340, 236 335" stroke="#FEF08A" strokeWidth="2.5" strokeLinecap="round" />

      {/* Đôi bàn tay búp măng trắng ngần thanh tú */}
      <path d="M68 335 C70 348, 76 358, 82 368 C86 364, 88 352, 88 335 Z" fill="#FCE7D6" />
      <path d="M262 335 C260 348, 254 358, 248 368 C244 364, 242 352, 242 335 Z" fill="#FCE7D6" />

      {/* Đầu, Tóc và Khuôn mặt thiếu nữ */}
      <circle cx="134" cy="115" r="2.5" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="0.8" />
      <circle cx="196" cy="115" r="2.5" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="0.8" />
      <path d="M138 88 C138 68, 155 56, 172 62 C184 66, 192 76, 192 88 V110 C192 124, 180 135, 165 135 C150 135, 138 124, 138 110 Z" fill="#FCE7D6" />
      <path d="M120 78 C120 54, 140 40, 165 40 C190 40, 210 54, 210 78 C210 95, 204 112, 198 122 C194 112, 192 98, 192 86 C192 74, 182 66, 165 66 C148 66, 138 74, 138 86 C138 98, 136 112, 132 122 C126 112, 120 95, 120 78 Z" fill="#1C1917" />
      <path d="M144 94 C148 91, 154 91, 158 94" stroke="#44403C" strokeWidth="1.1" strokeLinecap="round" />
      <path d="M172 94 C176 91, 182 91, 186 94" stroke="#44403C" strokeWidth="1.1" strokeLinecap="round" />
      <circle cx="151" cy="99" r="2.8" fill="#1C1917" />
      <circle cx="152" cy="98" r="0.9" fill="#FFFFFF" />
      <circle cx="179" cy="99" r="2.8" fill="#1C1917" />
      <circle cx="180" cy="98" r="0.9" fill="#FFFFFF" />
      <path d="M165 99 V109 H167" stroke="#D97706" strokeWidth="0.9" strokeLinecap="round" />
      <path d="M159 118 C162 121, 168 121, 171 118" stroke="#E11D48" strokeWidth="1.5" strokeLinecap="round" />

      {/* Khăn xếp lụa đen vấn gọn gàng */}
      <ellipse cx="165" cy="48" rx="46" ry="16" fill="#1C1917" stroke="#0C0A09" strokeWidth="1.2" />
      <ellipse cx="165" cy="46" rx="42" ry="14" fill="#292524" stroke="#78716C" strokeWidth="0.8" />
      <ellipse cx="165" cy="44" rx="38" ry="12" fill="#1C1917" stroke="#78716C" strokeWidth="0.8" />

      {children}
    </svg>
  );
};

// 4. Áo Giao Lĩnh Nữ - Cổ chéo chữ V giao vạt thắt lưng duyên dáng
export const FemaleGiaoLinh: React.FC<FemaleCostumeProps> = ({ children }) => {
  return (
    <svg 
      viewBox="0 0 360 610" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full object-contain"
    >
      {/* Váy xếp ly kem sáng thướt tha */}
      <path d="M115 420 L98 558 C138 566, 192 566, 232 558 L215 420 Z" fill="#F5F0E4" stroke="#E2DAC7" strokeWidth="1.2" />
      <line x1="125" y1="430" x2="115" y2="556" stroke="#EDE5D2" strokeWidth="1.2" />
      <line x1="145" y1="430" x2="140" y2="560" stroke="#EDE5D2" strokeWidth="1.2" />
      <line x1="165" y1="430" x2="165" y2="562" stroke="#EDE5D2" strokeWidth="1.2" />
      <line x1="185" y1="430" x2="190" y2="560" stroke="#EDE5D2" strokeWidth="1.2" />
      <line x1="205" y1="430" x2="215" y2="556" stroke="#EDE5D2" strokeWidth="1.2" />

      {/* Cổ chân và hài thêu */}
      <path d="M125 552 C132 552, 138 556, 138 565 C138 574, 132 580, 125 580 C118 580, 112 574, 112 565 C112 556, 118 552, 125 552 Z" fill="#FCE7D6" />
      <path d="M205 552 C212 552, 218 556, 218 565 C218 574, 212 580, 205 580 C198 580, 192 574, 192 565 C192 556, 198 552, 205 552 Z" fill="#FCE7D6" />
      <path d="M140 568 H106 C102 568, 98 571, 94 574 L78 588 C74 591, 72 593, 72 595 C72 597, 74 598, 78 598 H142 V576 C142 571, 140 568, 140 568 Z" fill="#1E3A8A" />
      <path d="M190 568 H224 C228 568, 232 571, 236 574 L252 588 C256 591, 258 593, 258 595 C258 597, 256 598, 252 598 H188 V576 C188 571, 190 568, 190 568 Z" fill="#1E3A8A" />

      {/* Cổ thiếu nữ */}
      <path d="M165 125 C172 125, 178 131, 178 138 V152 C178 159, 172 165, 165 165 C158 165, 152 159, 152 152 V138 C152 131, 158 125, 165 125 Z" fill="#FCE7D6" />

      {/* Thân áo Giao Lĩnh xanh pastel dịu mát */}
      <path d="M102 160 C118 152, 134 148, 149 148 H181 C196 150, 212 154, 228 162 L218 280 L234 460 C212 468, 188 471, 165 470 C142 472, 118 468, 96 460 L112 280 Z" fill="#769CBE" stroke="#5E82A2" strokeWidth="1.2" />

      {/* Nẹp cổ chéo chữ V giao vạt (Vạt trái đè vạt phải) */}
      <path d="M148 142 H182 L196 168 L163 213 L133 171 Z" fill="#F4EEE1" />
      <path d="M102 160 L148 148 L166 183 L198 254 L208 282 H112 Z" fill="#6288AF" />
      <path d="M182 148 L228 162 L216 280 H112 L120 256 L148 206 Z" fill="#7FA3C6" />
      <path d="M148 141 L160 144 L181 177 L171 192 L143 158 Z" fill="#F4EEE1" />
      <path d="M182 141 L190 158 L157 217 L128 278 H114 L146 203 Z" fill="#F4EEE1" />

      {/* Ống tay áo buông rủ */}
      <path d="M107 156 C94 152, 85 158, 79 174 L60 235 C52 260, 45 294, 37 338 C46 347, 62 353, 84 355 C102 355, 117 352, 127 346 L116 286 L115 208 Z" fill="#91AFCC" />
      <path d="M223 156 C236 152, 245 158, 251 174 L270 235 C278 260, 285 294, 293 338 C284 347, 268 353, 246 355 C228 355, 213 352, 203 346 L214 286 L215 208 Z" fill="#91AFCC" />

      {/* Bàn tay thả lỏng */}
      <path d="M58 335 C60 348, 66 358, 72 368 C76 364, 78 352, 78 335 Z" fill="#FCE7D6" />
      <path d="M272 335 C270 348, 264 358, 258 368 C254 364, 252 352, 252 335 Z" fill="#FCE7D6" />

      {/* Đai thắt lưng xanh đậm buộc ngang eo & nơ hoa dải thao buông dài */}
      <path d="M114 274 H216 V286 H114 Z" fill="#354E62" />
      {/* Nơ thắt trung tâm */}
      <circle cx="165" cy="280" r="5" fill="#354E62" stroke="#4B6B82" />
      <path d="M165 285 L158 365 L164 365 L168 285 Z" fill="#354E62" />
      <path d="M165 285 L172 365 L166 365 L162 285 Z" fill="#354E62" />
      {/* Tua rua ở đuôi dải thao */}
      <line x1="158" y1="365" x2="158" y2="378" stroke="#354E62" strokeWidth="1.8" />
      <line x1="161" y1="365" x2="161" y2="380" stroke="#354E62" strokeWidth="1.8" />
      <line x1="169" y1="365" x2="169" y2="380" stroke="#354E62" strokeWidth="1.8" />
      <line x1="172" y1="365" x2="172" y2="378" stroke="#354E62" strokeWidth="1.8" />

      {/* Đầu, Tóc và Khuôn mặt thiếu nữ */}
      <circle cx="134" cy="115" r="2.5" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="0.8" />
      <circle cx="196" cy="115" r="2.5" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="0.8" />
      <path d="M138 88 C138 68, 155 56, 172 62 C184 66, 192 76, 192 88 V110 C192 124, 180 135, 165 135 C150 135, 138 124, 138 110 Z" fill="#FCE7D6" />
      <path d="M120 78 C120 54, 140 40, 165 40 C190 40, 210 54, 210 78 C210 95, 204 112, 198 122 C194 112, 192 98, 192 86 C192 74, 182 66, 165 66 C148 66, 138 74, 138 86 C138 98, 136 112, 132 122 C126 112, 120 95, 120 78 Z" fill="#1C1917" />
      <path d="M144 94 C148 91, 154 91, 158 94" stroke="#44403C" strokeWidth="1.1" strokeLinecap="round" />
      <path d="M172 94 C176 91, 182 91, 186 94" stroke="#44403C" strokeWidth="1.1" strokeLinecap="round" />
      <circle cx="151" cy="99" r="2.8" fill="#1C1917" />
      <circle cx="152" cy="98" r="0.9" fill="#FFFFFF" />
      <circle cx="179" cy="99" r="2.8" fill="#1C1917" />
      <circle cx="180" cy="98" r="0.9" fill="#FFFFFF" />
      <path d="M165 99 V109 H167" stroke="#D97706" strokeWidth="0.9" strokeLinecap="round" />
      <path d="M159 118 C162 121, 168 121, 171 118" stroke="#E11D48" strokeWidth="1.5" strokeLinecap="round" />

      {/* Tóc búi cao cài trâm ngọc */}
      <circle cx="165" cy="38" r="14" fill="#1C1917" />
      <line x1="148" y1="36" x2="182" y2="40" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="182" cy="40" r="3" fill="#10B981" />

      {children}
    </svg>
  );
};

// 5. Áo Viên Lĩnh Nữ (Phượng Bào Cổ Tròn) - Cổ tròn đính ngọc trai quý tộc
export const FemaleVienLinh: React.FC<FemaleCostumeProps> = ({ children }) => {
  return (
    <svg 
      viewBox="0 0 360 610" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full object-contain"
    >
      {/* Chân váy kem sáng và hài thêu */}
      <path d="M112 430 L95 558 C135 566, 195 566, 235 558 L218 430 Z" fill="#FBF8EE" stroke="#E2DAC7" strokeWidth="1.2" />
      <path d="M125 552 C132 552, 138 556, 138 565 C138 574, 132 580, 125 580 C118 580, 112 574, 112 565 C112 556, 118 552, 125 552 Z" fill="#FCE7D6" />
      <path d="M205 552 C212 552, 218 556, 218 565 C218 574, 212 580, 205 580 C198 580, 192 574, 192 565 C192 556, 198 552, 205 552 Z" fill="#FCE7D6" />
      <path d="M140 568 H106 C102 568, 98 571, 94 574 L78 588 C74 591, 72 593, 72 595 C72 597, 74 598, 78 598 H142 V576 C142 571, 140 568, 140 568 Z" fill="#D97706" />
      <path d="M190 568 H224 C228 568, 232 571, 236 574 L252 588 C256 591, 258 593, 258 595 C258 597, 256 598, 252 598 H188 V576 C188 571, 190 568, 190 568 Z" fill="#D97706" />

      {/* Cổ thiếu nữ */}
      <path d="M165 125 C172 125, 178 131, 178 138 V152 C178 159, 172 165, 165 165 C158 165, 152 159, 152 152 V138 C152 131, 158 125, 165 125 Z" fill="#FCE7D6" />

      {/* Thân áo Viên Lĩnh vàng hoàng gia */}
      <path d="M115 160 H215 C228 162, 236 174, 235 198 L242 490 C198 502, 132 502, 88 490 L95 198 C94 174, 102 162, 115 160 Z" fill="#F59E0B" stroke="#D97706" strokeWidth="1.2" />

      {/* Cổ áo tròn khép kín (Viên lĩnh) đính chuỗi hạt ngọc trai */}
      <path d="M142 150 C142 168, 152 178, 165 178 C178 178, 188 168, 188 150 H142 Z" fill="#ECC348" stroke="#D97706" strokeWidth="1.2" />
      <circle cx="146" cy="158" r="2.2" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="0.6" />
      <circle cx="151" cy="165" r="2.2" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="0.6" />
      <circle cx="158" cy="171" r="2.2" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="0.6" />
      <circle cx="165" cy="174" r="2.2" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="0.6" />
      <circle cx="172" cy="171" r="2.2" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="0.6" />
      <circle cx="179" cy="165" r="2.2" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="0.6" />
      <circle cx="184" cy="158" r="2.2" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="0.6" />

      {/* Họa tiết phượng hoàng uốn lượn thêu trước ngực */}
      <circle cx="165" cy="215" r="18" fill="#FBBF24" opacity="0.6" />
      <path d="M156 210 C160 205, 170 205, 174 210 C172 218, 168 224, 165 228 C162 224, 158 218, 156 210 Z" fill="#D97706" />
      <circle cx="165" cy="206" r="3" fill="#DC2626" />

      {/* Đai ngọc bích viền vàng ngang eo */}
      <path d="M110 255 H220 V270 H110 Z" fill="#D97706" />
      <rect x="150" y="252" width="30" height="22" rx="3" fill="#10B981" stroke="#FDE047" strokeWidth="1.5" />
      <circle cx="165" cy="263" r="3.5" fill="#DC2626" />

      {/* Sóng nước thủy ba ngũ sắc ở gấu áo */}
      <path d="M92 480 C110 472, 130 488, 148 480 C165 472, 185 488, 202 480 C220 472, 238 488, 246 480" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
      <path d="M90 485 C108 477, 128 493, 146 485 C163 477, 183 493, 200 485 C218 477, 236 493, 244 485" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" />

      {/* Ống tay áo thụng quý phái */}
      <path d="M115 160 C92 162, 72 180, 60 210 L38 315 C32 340, 28 368, 25 395 C45 408, 80 408, 102 395 C105 348, 112 280, 122 215 Z" fill="#F59E0B" stroke="#D97706" strokeWidth="1.2" />
      <path d="M25 395 C45 408, 80 408, 102 395" stroke="#DC2626" strokeWidth="3" strokeLinecap="round" />

      <path d="M215 160 C238 162, 258 180, 270 210 L292 315 C298 340, 302 368, 305 395 C285 408, 250 408, 228 395 C225 348, 218 280, 208 215 Z" fill="#F59E0B" stroke="#D97706" strokeWidth="1.2" />
      <path d="M305 395 C285 408, 250 408, 228 395" stroke="#DC2626" strokeWidth="3" strokeLinecap="round" />

      {/* Bàn tay */}
      <path d="M60 375 C62 384, 66 392, 70 395 C74 392, 78 384, 78 375 Z" fill="#FCE7D6" />
      <path d="M252 375 C250 384, 246 392, 242 395 C238 392, 234 384, 234 375 Z" fill="#FCE7D6" />

      {/* Đầu, Tóc và Khuôn mặt thiếu nữ */}
      <circle cx="134" cy="115" r="2.5" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="0.8" />
      <circle cx="196" cy="115" r="2.5" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="0.8" />
      <path d="M138 88 C138 68, 155 56, 172 62 C184 66, 192 76, 192 88 V110 C192 124, 180 135, 165 135 C150 135, 138 124, 138 110 Z" fill="#FCE7D6" />
      <path d="M120 78 C120 54, 140 40, 165 40 C190 40, 210 54, 210 78 C210 95, 204 112, 198 122 C194 112, 192 98, 192 86 C192 74, 182 66, 165 66 C148 66, 138 74, 138 86 C138 98, 136 112, 132 122 C126 112, 120 95, 120 78 Z" fill="#1C1917" />
      <path d="M144 94 C148 91, 154 91, 158 94" stroke="#44403C" strokeWidth="1.1" strokeLinecap="round" />
      <path d="M172 94 C176 91, 182 91, 186 94" stroke="#44403C" strokeWidth="1.1" strokeLinecap="round" />
      <circle cx="151" cy="99" r="2.8" fill="#1C1917" />
      <circle cx="152" cy="98" r="0.9" fill="#FFFFFF" />
      <circle cx="179" cy="99" r="2.8" fill="#1C1917" />
      <circle cx="180" cy="98" r="0.9" fill="#FFFFFF" />
      <path d="M165 99 V109 H167" stroke="#D97706" strokeWidth="0.9" strokeLinecap="round" />
      <path d="M159 118 C162 121, 168 121, 171 118" stroke="#E11D48" strokeWidth="1.5" strokeLinecap="round" />

      {/* Mũ miện / Khăn vành hoàng hậu vàng kim */}
      <ellipse cx="165" cy="48" rx="46" ry="16" fill="#D97706" stroke="#B45309" strokeWidth="1.2" />
      <ellipse cx="165" cy="46" rx="42" ry="14" fill="#F59E0B" stroke="#FEF08A" strokeWidth="0.8" />
      <ellipse cx="165" cy="44" rx="38" ry="12" fill="#D97706" stroke="#FEF08A" strokeWidth="0.8" />

      {children}
    </svg>
  );
};

// 6. Cổn Phục Nữ (dùng chung phong cách đại lễ)
export const FemaleConPhuc: React.FC<FemaleCostumeProps> = (props) => {
  return <FemaleNhatBinh {...props} />;
};
