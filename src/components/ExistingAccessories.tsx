import React from 'react';

// Existing accessory artwork retained from App.tsx.
type Props = { selectedGenZ: string[]; selectedJewelry: string[]; collarOverlay?: React.ReactNode; headphonesAtNeck?: boolean };

function CameraStrap({ female = false, rear = false }: { female?: boolean; rear?: boolean }) {
  // The visible shoulder segments and hidden nape arc share the same endpoints.
  // Female camera artwork is offset by (29.5, -2), including its rear arc.
  const left = female ? 103 : 98;
  const right = female ? 125 : 130;
  const y = female ? 80 : 99;
  const shoulderY = female ? 96 : 104;
  const curve = rear
    ? `M${left} ${y} C${left} ${y-14}, ${right} ${y-14}, ${right} ${y}`
    : `M${left} ${y} C${left-6} ${y+4}, 92 ${shoulderY}, 93 108 C91 128, 95 154, 97 178 M${right} ${y} C${right+6} ${y+4}, 136 ${shoulderY}, 135 108 C137 128, 133 154, 131 178`;
  return <g transform={rear && female ? 'translate(29.5 -2)' : undefined}
    fill="none" strokeLinecap="round" data-accessory={`camera-${rear ? 'rear' : 'front'}-strap`}>
    {!rear && <path d={curve} stroke="#000000" strokeWidth="5" opacity="0.25" transform="translate(0.8 1.2)" />}
    <path d={curve} stroke="#18181B" strokeWidth="4.8" />
    <path d={curve} stroke="#27272A" strokeWidth="2.8" />
    <path d={curve} stroke="#D4AF37" strokeWidth="0.8" strokeDasharray="3 2" />
  </g>;
}

function NeckHeadphones({ female, rear = false }: { female: boolean; rear?: boolean }) {
  const halfWidth = female ? 28 : 31;
  const napeHalfWidth = female ? 14 : 18;
  const napeY = female ? -20 : -23;
  const rearArc = `M-${napeHalfWidth} ${napeY} Q0 ${napeY-12} ${napeHalfWidth} ${napeY}`;
  const sideArms = `M-${napeHalfWidth} ${napeY} C-${napeHalfWidth+7} ${napeY+3} -${halfWidth} -9 -${halfWidth} 2 M${napeHalfWidth} ${napeY} C${napeHalfWidth+7} ${napeY+3} ${halfWidth} -9 ${halfWidth} 2`;
  return <g transform={`translate(${female ? 143.047 : 114} ${female ? 102 : 127})`}
    fill="none" data-accessory={`headphones-neck-${rear ? 'rear' : 'front'}`}>
    {rear ? <g strokeLinecap="round">
      <path d={rearArc} stroke="#09090B" strokeWidth="7" />
      <path d={rearArc}
        stroke="#334155" strokeWidth="3" />
    </g> : <>
      <g strokeLinecap="round" data-headphone-side-arms="true">
        <path d={sideArms} stroke="#09090B" strokeWidth="7" />
        <path d={sideArms} stroke="#334155" strokeWidth="3" />
      </g>
      {[-1, 1].map(side => <g key={side} transform={`translate(${side*halfWidth} 16) rotate(${side*14})`}>
        <rect x="-3" y="-23" width="6" height="12" rx="2" fill="#27272A" stroke="#64748B" strokeWidth=".8" />
        <ellipse rx="13" ry="18" fill="#09090B" stroke="#18181B" strokeWidth="1.5" />
        <ellipse rx="10.5" ry="15.5" fill="#18181B" />
        <ellipse cx={side*2} rx="8" ry="13" fill="#0F172A" stroke="#475569" strokeWidth="1.1" />
        <path d={`M${side*5}-7 Q${side*8} 0 ${side*5} 7`} stroke="#94A3B8" strokeWidth="1" opacity=".5" strokeLinecap="round" />
        <circle cx={side*2} r="2.4" fill="#475569" stroke="#64748B" strokeWidth=".7" />
      </g>)}
    </>}
  </g>;
}

function GoldNeckRing({ female, rear = false }: { female: boolean; rear?: boolean }) {
  const napeHalfWidth = female ? 12 : 16;
  const napeY = female ? -20 : -24;
  // Both pieces meet beside the nape. The front includes the visible sides
  // running up the neck; only the connecting back arc is hidden by the wearer.
  const curve = rear
    ? `M-${napeHalfWidth} ${napeY} A${napeHalfWidth} 6 0 0 1 ${napeHalfWidth} ${napeY}`
    : `M-${napeHalfWidth} ${napeY} C-20 ${napeY + 5} -24 -6 -22 0 A22 12 0 0 0 22 0 C24 -6 20 ${napeY + 5} ${napeHalfWidth} ${napeY}`;
  return <g transform={`translate(${female ? 143.5 : 114} ${female ? 102 : 127})`}
    fill="none" strokeLinecap="round" data-accessory={`kieng-co-${rear ? 'rear' : 'front'}`}>
    <path d={curve} stroke="#80551B" strokeWidth="5" />
    <path d={curve} stroke="#D6AC39" strokeWidth="3.7" />
    <path d={curve} stroke="#FFF1AA" strokeWidth="1.25" transform="translate(0 -0.7)" />
  </g>;
}

// Back arcs are painted before the original hair, skin and collar, so the
// accessories wrap around the wearer instead of crossing the front of the neck.
export function RearExistingAccessories({ selectedGenZ, selectedJewelry, female, headphonesAtNeck = false }: Props & { female: boolean }) {
  return <g fill="none" data-rear-accessories="true">
    {headphonesAtNeck && selectedGenZ.includes('tai-nghe-trum-dau') && <NeckHeadphones female={female} rear />}
    {selectedGenZ.includes('may-anh') && <CameraStrap female={female} rear />}
    {selectedJewelry.includes('kieng-co') && <GoldNeckRing female={female} rear />}
  </g>;
}

export function FemaleExistingAccessories({ selectedGenZ, selectedJewelry, headphonesAtNeck = false }: Props) {
 return <g fill="none">
{selectedGenZ.includes('giay-sneaker') && (
            <g>
              <rect x="56" y="512" width="74" height="6.5" rx="2" fill="#ffffff" stroke="#e2e8f0" strokeWidth="0.8" />
              <line x1="60" y1="515.5" x2="126" y2="515.5" stroke="#ef4444" strokeWidth="1.2" />
              <rect x="156" y="512" width="74" height="6.5" rx="2" fill="#ffffff" stroke="#e2e8f0" strokeWidth="0.8" />
              <line x1="160" y1="515.5" x2="226" y2="515.5" stroke="#ef4444" strokeWidth="1.2" />
              <path d="M78 497 L88 505 M88 497 L98 505" stroke="#09090b" strokeWidth="1" strokeLinecap="round" />
              <path d="M198 497 L208 505 M208 497 L218 505" stroke="#09090b" strokeWidth="1" strokeLinecap="round" />
            </g>
          )}

{selectedJewelry.includes('kieng-co') && <GoldNeckRing female />}
{selectedGenZ.includes('tui-xach') && (
            <g transform="translate(46, -24)">
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
{selectedGenZ.includes('may-anh') && (
            <g transform="translate(29.5, -2)">
              <CameraStrap female />
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

{selectedGenZ.includes('kinh-ram') && (
            <g transform="translate(29.65, -13.5)">
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
{!headphonesAtNeck && selectedGenZ.includes('tai-nghe-trum-dau') && (
            <g transform="translate(29.5, -9.5)">
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
{headphonesAtNeck && selectedGenZ.includes('tai-nghe-trum-dau') && <NeckHeadphones female />}
</g>;
}

export function MaleExistingAccessories({ selectedGenZ, selectedJewelry, collarOverlay, headphonesAtNeck = false }: Props) {
 return <g fill="none">

{selectedGenZ.includes('kinh-ram') && (
          <g>
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
{!headphonesAtNeck && selectedGenZ.includes('tai-nghe-trum-dau') && (
          <g>
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
{selectedJewelry.includes('kieng-co') && <g>
  <GoldNeckRing female={false} />
  {collarOverlay}
</g>}
{selectedGenZ.includes('tui-xach') && (
          <g>
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
{selectedGenZ.includes('may-anh') && (
          <g>
            <CameraStrap />
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

{headphonesAtNeck && selectedGenZ.includes('tai-nghe-trum-dau') && <NeckHeadphones female={false} />}
</g>;
}
