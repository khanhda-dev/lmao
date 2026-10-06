import React from 'react';

// Props passed to female garment renderers
export interface FemaleCostumeProps {
  dressColor: string;
  liningColor: string;
  pantsColor: string;
  selectedHeadwearId?: string | null;
}

// 1. Áo Viên Lĩnh (Viên lĩnh nữ cổ tròn gài khuy vai, tà buông)
// Raw origin: center x=1771.5, top y=0. Offset to match female base (143.5, 0): dx = -1628
export const FemaleVienLinh: React.FC<FemaleCostumeProps> = ({ dressColor, pantsColor }) => {
  return (
    <g id="female-costume-vien-linh" transform="translate(-1628, 0)">
      {/* Quần */}
      <path 
        d="M1793.57 223.317C1804.36 222.357 1813.82 230.279 1814.76 241.066L1823.76 343.783C1824.78 355.367 1815.99 365.581 1804.39 366.31C1793.21 367.012 1783.62 358.624 1782.82 347.45L1775.47 244.585C1774.69 233.775 1782.78 224.278 1793.57 223.317Z" 
        fill={pantsColor || "#1A1A1A"} 
      />
      <path 
        d="M1750.7 223.317C1739.91 222.357 1730.46 230.279 1729.51 241.066L1720.51 343.783C1719.5 355.367 1728.28 365.581 1739.88 366.31C1751.06 367.012 1760.65 358.624 1761.45 347.45L1768.81 244.585C1769.58 233.775 1761.49 224.278 1750.7 223.317Z" 
        fill={pantsColor || "#1A1A1A"} 
      />
      <path 
        d="M1801.17 334.175L1803.63 334.01C1814.06 333.312 1823.24 340.955 1824.44 351.339L1840.18 487.027L1785.38 486.853L1783.09 353.829C1782.92 343.49 1790.85 334.865 1801.17 334.175Z" 
        fill={pantsColor || "#1A1A1A"} 
      />
      <path 
        d="M1743.1 334.175L1740.64 334.01C1730.21 333.312 1721.03 340.955 1719.83 351.339L1704.09 487.028L1758.89 486.853L1761.18 353.829C1761.36 343.49 1753.42 334.865 1743.1 334.175Z" 
        fill={pantsColor || "#1A1A1A"} 
      />
      <path 
        d="M1771.86 161.594C1787.97 161.594 1801.82 173.018 1804.89 188.836L1814.1 236.424C1814.49 238.441 1813.63 240.493 1811.91 241.624L1785.28 259.183C1776.99 264.651 1766.21 264.57 1758 258.977L1732.46 241.573C1730.84 240.469 1730.01 238.515 1730.36 236.584L1738.74 189.352C1741.59 173.294 1755.55 161.594 1771.86 161.594Z" 
        fill={pantsColor || "#1A1A1A"} 
      />
      <path d="M1735.64 224.448C1744.15 226.459 1751.27 215.965 1751.27 199.261" stroke="white" strokeLinecap="round" opacity="0.6" />
      <path d="M1807.63 224.448C1799.13 226.459 1792.01 215.965 1792.01 199.261" stroke="white" strokeLinecap="round" opacity="0.6" />

      {/* Tay áo trái & phải */}
      <path 
        d="M1738 91.8505C1716 90.8505 1698 98.8505 1688 116.85C1676 152.85 1675 204.85 1668 251.89L1702 254.61C1705 224.85 1718 189.85 1730 159.85L1738 104.85V91.8505Z" 
        fill={dressColor} 
        stroke="rgba(0,0,0,0.15)" 
        strokeLinecap="round"
      />
      <path d="M1668 251.89L1702 254.61" stroke="rgba(0,0,0,0.25)" strokeWidth="3" strokeLinejoin="round" />

      <path 
        d="M1806 91.8505C1828 90.8505 1846 98.8505 1856 116.85C1868 152.85 1869 204.85 1876 251.89L1842 254.61C1839 224.85 1826 189.85 1814 159.85L1806 104.85V91.8505Z" 
        fill={dressColor} 
        stroke="rgba(0,0,0,0.15)" 
        strokeLinecap="round"
      />
      <path d="M1876 251.89L1842 254.61" stroke="rgba(0,0,0,0.25)" strokeWidth="3" strokeLinejoin="round" />

      {/* Thân áo Viên lĩnh */}
      <path 
        d="M1738 91.8497H1806C1814 91.8497 1820 96.8497 1820 104.85C1818 154.85 1822 209.85 1830 264.85C1836 309.85 1841 364.85 1844 404.85C1804 412.85 1740 412.85 1700 404.85C1703 364.85 1708 309.85 1714 264.85C1722 209.85 1726 154.85 1724 104.85C1724 96.8497 1730 91.8497 1738 91.8497Z" 
        fill={dressColor} 
        stroke="rgba(0,0,0,0.15)" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />

      {/* Cổ tròn cong gài khuy sang phải */}
      <path 
        d="M1758 82.8497H1786V101.85C1786 105.85 1758 105.85 1758 101.85V82.8497Z" 
        fill={dressColor} 
        stroke="rgba(0,0,0,0.2)" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path d="M1760 84.3497H1784" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" opacity="0.8" />
      <path 
        d="M1768 101.85C1756 110.85 1744 122.85 1740 140.85L1739 176.85" 
        stroke="rgba(0,0,0,0.25)" 
        strokeWidth="1.4" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <circle cx="1762" cy="106.85" r="2" fill="#D9B25B" />
      <circle cx="1753" cy="114.85" r="2" fill="#D9B25B" />
      <circle cx="1745" cy="125.85" r="2" fill="#D9B25B" />
      <circle cx="1740.5" cy="142.85" r="2" fill="#D9B25B" />
      <circle cx="1739.3" cy="160.85" r="2" fill="#D9B25B" />
    </g>
  );
};

// 2. Áo Nhật Bình (Cổ chữ nhật xẻ giữa thêu hoa văn, tay viền ngũ sắc, tà váy xếp)
// Raw origin: center x=163.5, top y=448. Offset: translate(-20, -448)
export const FemaleNhatBinh: React.FC<FemaleCostumeProps> = ({ dressColor, liningColor, pantsColor, selectedHeadwearId }) => {
  return (
    <g id="female-costume-nhat-binh" transform="translate(-20, -448)">
      {/* Quần bên trong */}
      <path 
        d="M166.969 692.626C166.176 681.541 174.466 671.804 185.534 670.818C196.594 669.834 206.292 677.957 207.261 689.017L216.259 791.735C217.299 803.6 208.302 814.062 196.416 814.809C184.967 815.528 175.142 806.936 174.324 795.49L166.969 692.626Z" 
        fill={pantsColor || "#F1DECA"} 
      />
      <path 
        d="M161.305 692.626C162.097 681.541 153.808 671.804 142.739 670.819C131.679 669.834 121.982 677.957 121.013 689.017L112.014 791.735C110.975 803.601 119.971 814.062 131.857 814.809C143.306 815.528 153.131 806.937 153.95 795.49L161.305 692.626Z" 
        fill={pantsColor || "#F1DECA"} 
      />
      <path 
        d="M174.594 801.834C174.411 791.23 182.547 782.384 193.133 781.676L195.598 781.511C206.292 780.796 215.705 788.635 216.941 799.285L232.745 935.53L176.889 935.352L174.594 801.834Z" 
        fill={pantsColor || "#F1DECA"} 
      />
      <path 
        d="M153.68 801.834C153.862 791.23 145.726 782.384 135.141 781.676L132.676 781.511C121.981 780.796 112.568 788.635 111.333 799.285L95.5281 935.53L151.385 935.352L153.68 801.834Z" 
        fill={pantsColor || "#F1DECA"} 
      />
      <path 
        d="M130.249 637.264C133.143 620.967 147.31 609.094 163.862 609.094C180.213 609.094 194.268 620.688 197.377 636.741L206.593 684.329C207.022 686.544 206.072 688.8 204.188 690.042L177.557 707.6C169.094 713.18 158.099 713.097 149.721 707.389L124.175 689.986C122.392 688.771 121.487 686.622 121.864 684.497L130.249 637.264Z" 
        fill={pantsColor || "#F1DECA"} 
      />

      {/* Váy lót dài bên dưới áo Nhật Bình */}
      <path 
        d="M122 620.85H206C210 712.85 234 842.85 242 938.85C206 944.85 122 944.85 86 938.85C94 842.85 118 712.85 122 620.85Z" 
        fill="#F6EEDC" 
        stroke="#E5DFC9" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <circle cx="141" cy="822.85" r="2.6" fill="#3E73C4" />
      <circle cx="141" cy="822.85" r="1" fill="#D63A2E" />
      <circle cx="186" cy="822.85" r="2.6" fill="#3E73C4" />
      <circle cx="186" cy="822.85" r="1" fill="#D63A2E" />
      <circle cx="164" cy="860.85" r="2.6" fill="#3E73C4" />
      <circle cx="164" cy="860.85" r="1" fill="#D63A2E" />
      <path d="M89 900.85H239L242 940.85H86L89 900.85Z" fill="#E2A93B" />
      <path d="M89 900.85H239" stroke="#213C8A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M86.5 936.85H241.5" stroke="#213C8A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="101" cy="918.85" r="2.3" fill="#D63A2E" />
      <circle cx="126" cy="918.85" r="2.3" fill="#3E73C4" />
      <circle cx="151" cy="918.85" r="2.3" fill="#D63A2E" />
      <circle cx="176" cy="918.85" r="2.3" fill="#3E73C4" />
      <circle cx="201" cy="918.85" r="2.3" fill="#D63A2E" />
      <circle cx="226" cy="918.85" r="2.3" fill="#3E73C4" />

      {/* Tay áo trái với dải viền ngũ sắc tượng trưng ngũ hành */}
      <path 
        d="M130 539.85C108 538.85 90 546.85 80 564.85C62 598.85 36 652.85 10 690.85L99 692.85C106 667.85 113 634.85 122 607.85L130 552.85V539.85Z" 
        fill={dressColor} 
      />
      <path d="M10 690.85L27.8 691.25L19 725.65L0 724.85L10 690.85Z" fill="#D63A2E" />
      <path d="M27.8 691.25L45.6 691.65L38 726.45L19 725.65L27.8 691.25Z" fill="white" />
      <path d="M45.6 691.65L63.4 692.05L57 727.25L38 726.45L45.6 691.65Z" fill="#2B4FA0" />
      <path d="M63.4 692.05L81.2 692.45L76 728.05L57 727.25L63.4 692.05Z" fill="#F2B01E" />
      <path d="M81.2 692.45L99 692.85L95 728.85L76 728.05L81.2 692.45Z" fill="#4F8A4B" />

      {/* Tay áo phải với dải viền ngũ sắc */}
      <path 
        d="M198 539.85C220 538.85 238 546.85 248 564.85C266 598.85 292 652.85 318 690.85L229 692.85C222 667.85 215 634.85 206 607.85L198 552.85V539.85Z" 
        fill={dressColor} 
      />
      <path d="M318 690.85L300.2 691.25L309 725.65L328 724.85L318 690.85Z" fill="#D63A2E" />
      <path d="M300.2 691.25L282.4 691.65L290 726.45L309 725.65L300.2 691.25Z" fill="white" />
      <path d="M282.4 691.65L264.6 692.05L271 727.25L290 726.45L282.4 691.65Z" fill="#2B4FA0" />
      <path d="M264.6 692.05L246.8 692.45L252 728.05L271 727.25L264.6 692.05Z" fill="#F2B01E" />
      <path d="M246.8 692.45L229 692.85L233 728.85L252 728.05L246.8 692.45Z" fill="#4F8A4B" />

      {/* Thân áo Nhật Bình chính */}
      <path 
        d="M130 539.85H198C206 539.85 212 544.85 212 552.85L229 760.85C196 768.85 132 768.85 99 760.85L116 552.85C116 544.85 122 539.85 130 539.85Z" 
        fill={dressColor} 
        stroke="rgba(0,0,0,0.2)" 
        strokeLinecap="round" 
      />
      <path d="M164 608.85V764.85" stroke="rgba(0,0,0,0.25)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />

      {/* Cổ lót trong màu trắng */}
      <path d="M148 540.85H180V552.85C180 555.85 148 555.85 148 552.85V540.85Z" fill="white" stroke="#D9D4C7" strokeLinecap="round" strokeLinejoin="round" />

      {/* Nẹp cổ hình chữ nhật to bản đặc trưng Nhật Bình thêu hoa văn ngũ hành */}
      <path d="M137 540.85H191V632.85H137V540.85Z" fill={liningColor || "#3E73C4"} />
      <path d="M143 540.85H185V626.85H143V540.85Z" fill="#F6EEDC" />
      <circle cx="155" cy="573.85" r="2" fill="#4F8A4B" />
      <circle cx="173" cy="573.85" r="2" fill="#4F8A4B" />
      <circle cx="164" cy="585.85" r="2" fill="#4F8A4B" />
      <circle cx="155" cy="599.85" r="2" fill="#4F8A4B" />
      <circle cx="173" cy="599.85" r="2" fill="#4F8A4B" />
      <circle cx="164" cy="618.85" r="2" fill="#4F8A4B" />
      <circle cx="164" cy="565.85" r="4" fill="#D63A2E" />
      <circle cx="164" cy="565.85" r="1.7" fill="#F2B01E" />
      <circle cx="154" cy="585.85" r="3" fill="#F2B01E" />
      <circle cx="154" cy="585.85" r="1.2" fill="#D63A2E" />
      <circle cx="174" cy="585.85" r="3" fill="#F2B01E" />
      <circle cx="174" cy="585.85" r="1.2" fill="#D63A2E" />
      <circle cx="164" cy="604.85" r="3.8" fill="#D63A2E" />
      <circle cx="164" cy="604.85" r="1.5" fill="#F2B01E" />
      <circle cx="154" cy="614.85" r="2.4" fill="#D63A2E" />
      <circle cx="154" cy="614.85" r="1" fill="#F2B01E" />
      <circle cx="174" cy="614.85" r="2.4" fill="#D63A2E" />
      <circle cx="174" cy="614.85" r="1" fill="#F2B01E" />

      {/* Khăn vành đóng đội đầu nếu người dùng chọn khăn xếp / khăn vành */}
      {selectedHeadwearId === 'khan-xep' && (
        <g id="female-khan-vanh" transform="translate(-420, 0)">
          <path d="M584 433.35C602.729 433.35 619.661 436.476 631.893 441.513C638.01 444.032 642.927 447.018 646.308 450.309C649.686 453.598 651.5 457.16 651.5 460.85C651.5 464.539 649.686 468.101 646.308 471.391C642.927 474.681 638.01 477.668 631.893 480.187C619.661 485.223 602.729 488.35 584 488.35C565.271 488.35 548.339 485.223 536.107 480.187C529.99 477.668 525.073 474.681 521.692 471.391C518.314 468.101 516.5 464.539 516.5 460.85C516.5 457.16 518.314 453.598 521.692 450.309C525.073 447.018 529.99 444.032 536.107 441.513C548.339 436.476 565.271 433.35 584 433.35Z" fill="#2A5DB0" stroke="#1B3F85" />
          <ellipse cx="584" cy="455.85" rx="56" ry="20" fill="#1F4A99" />
          <path d="M584 441.35C596.665 441.35 608.11 443.025 616.372 445.719C620.506 447.067 623.815 448.661 626.08 450.407C628.352 452.159 629.5 454.002 629.5 455.85C629.5 457.697 628.352 459.54 626.08 461.292C623.815 463.038 620.506 464.633 616.372 465.981C608.11 468.675 596.665 470.35 584 470.35C571.335 470.35 559.89 468.675 551.628 465.981C547.494 464.633 544.185 463.038 541.92 461.292C539.648 459.54 538.5 457.697 538.5 455.85C538.5 454.002 539.648 452.159 541.92 450.407C544.185 448.661 547.494 447.067 551.628 445.719C559.89 443.025 571.335 441.35 584 441.35Z" stroke="#4F86D6" />
          <path d="M584 445.85C593.907 445.85 602.858 447.022 609.315 448.905C612.547 449.848 615.127 450.96 616.887 452.174C618.662 453.398 619.5 454.649 619.5 455.85C619.5 457.051 618.662 458.301 616.887 459.525C615.127 460.739 612.547 461.851 609.315 462.794C602.858 464.677 593.907 465.85 584 465.85C574.093 465.85 565.142 464.677 558.685 462.794C555.453 461.851 552.873 460.739 551.113 459.525C549.338 458.301 548.5 457.051 548.5 455.85C548.5 454.649 549.338 453.398 551.113 452.174C552.873 450.96 555.453 449.848 558.685 448.905C565.142 447.022 574.093 445.85 584 445.85Z" stroke="#4F86D6" />
          <path d="M584 449.35C591.149 449.35 597.603 450.13 602.255 451.383C604.584 452.01 606.434 452.748 607.688 453.547C608.967 454.361 609.5 455.151 609.5 455.85C609.5 456.548 608.967 457.338 607.688 458.152C606.434 458.951 604.584 459.689 602.255 460.316C597.603 461.569 591.149 462.35 584 462.35C576.851 462.35 570.397 461.569 565.745 460.316C563.416 459.689 561.566 458.951 560.312 458.152C559.033 457.338 558.5 456.548 558.5 455.85C558.5 455.151 559.033 454.361 560.312 453.547C561.566 452.748 563.416 452.01 565.745 451.383C570.397 450.13 576.851 449.35 584 449.35Z" stroke="#4F86D6" />
          <path d="M584 452.35C588.39 452.35 592.347 452.795 595.192 453.506C596.619 453.863 597.738 454.279 598.488 454.723C599.272 455.186 599.5 455.583 599.5 455.85C599.5 456.116 599.272 456.513 598.488 456.977C597.738 457.42 596.619 457.837 595.192 458.193C592.347 458.905 588.39 459.35 584 459.35C579.61 459.35 575.653 458.905 572.808 458.193C571.381 457.837 570.262 457.42 569.512 456.977C568.728 456.513 568.5 456.116 568.5 455.85C568.5 455.583 568.728 455.186 569.512 454.723C570.262 454.279 571.381 453.863 572.808 453.506C575.653 452.795 579.61 452.35 584 452.35Z" stroke="#4F86D6" />
        </g>
      )}
    </g>
  );
};

// 3. Áo Tấc / Áo thụng nữ (Tay áo thụng rộng buông dài, cài 5 cúc bên nẹp ngực phải)
// Raw origin: center x=1063.5, top y=448. Offset: translate(-920, -448)
export const FemaleAoTac: React.FC<FemaleCostumeProps> = ({ dressColor, liningColor, pantsColor }) => {
  return (
    <g id="female-costume-ao-tac" transform="translate(-920, -448)">
      {/* Váy lót sẫm màu bên trong */}
      <path 
        d="M1022 620.85H1106C1110 712.85 1134 842.85 1142 938.85C1106 944.85 1022 944.85 986 938.85C994 842.85 1018 712.85 1022 620.85Z" 
        fill={pantsColor || "#23407A"} 
        stroke="rgba(0,0,0,0.2)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />

      {/* Tay áo thụng rộng bên trái có viền nẹp kim tuyến */}
      <path 
        d="M1030 539.85C1008 538.85 990 546.85 980 564.85C964 598.85 940 652.85 916 696.85C940 716.85 974 716.85 998 698.85C1005 670.85 1013 636.85 1022 607.85L1030 552.85V539.85Z" 
        fill={dressColor} 
      />
      <path d="M916 696.85C940 716.85 974 716.85 998 698.85" stroke={liningColor || "#EBDCC3"} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />

      {/* Tay áo thụng rộng bên phải có viền nẹp kim tuyến */}
      <path 
        d="M1098 539.85C1120 538.85 1138 546.85 1148 564.85C1164 598.85 1188 652.85 1212 696.85C1188 716.85 1154 716.85 1130 698.85C1123 670.85 1115 636.85 1106 607.85L1098 552.85V539.85Z" 
        fill={dressColor} 
      />
      <path d="M1212 696.85C1188 716.85 1154 716.85 1130 698.85" stroke={liningColor || "#EBDCC3"} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />

      {/* Thân Áo Tấc dài thụng */}
      <path 
        d="M1030 539.85H1098C1106 539.85 1112 544.85 1112 552.85L1126 802.85C1094 809.85 1034 809.85 1002 802.85L1016 552.85C1016 544.85 1022 539.85 1030 539.85Z" 
        fill={dressColor} 
        stroke="rgba(0,0,0,0.15)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />

      {/* Cổ áo giao lót trong & cổ đứng ngũ thân 5 cúc */}
      <path d="M1045 539.85C1045 552.85 1053 561.85 1064 561.85C1075 561.85 1083 552.85 1083 539.85H1045Z" fill="rgba(0,0,0,0.2)" />
      <path d="M1050 539.85C1050 549.85 1056 556.85 1064 556.85C1072 556.85 1078 549.85 1078 539.85H1050Z" fill="white" stroke="#E5E0D8" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M1048 548.85C1034 548.85 1022 558.85 1020 578.85L1021 598.85" stroke="rgba(0,0,0,0.3)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="1042" cy="549.35" r="2.2" fill="#E3B778" />
      <circle cx="1034.4" cy="552.55" r="2.2" fill="#E3B778" />
      <circle cx="1024.3" cy="563.45" r="2.2" fill="#E3B778" />
      <circle cx="1020" cy="584.85" r="2.2" fill="#E3B778" />
      <circle cx="1020.5" cy="594.85" r="2.2" fill="#E3B778" />
    </g>
  );
};

// 4. Áo Ngũ Thân tay chẽn nữ (Ống tay bó gọn gàng, cổ đứng cài 5 cúc mạ vàng, tà dài bay bổng)
// Raw origin: center x=1563.5, top y=448. Offset: translate(-1420, -448)
export const FemaleNguThan: React.FC<FemaleCostumeProps> = ({ dressColor, pantsColor }) => {
  return (
    <g id="female-costume-ngu-than" transform="translate(-1420, -448)">
      {/* Quần lụa ống suông */}
      <path 
        d="M1585.57 671.317C1596.36 670.357 1605.82 678.279 1606.76 689.066L1615.76 791.783C1616.78 803.367 1607.99 813.581 1596.39 814.31C1585.21 815.012 1575.62 806.624 1574.82 795.45L1567.47 692.585C1566.69 681.775 1574.78 672.278 1585.57 671.317Z" 
        fill={pantsColor || "#FAFAFA"} 
      />
      <path 
        d="M1542.7 671.317C1531.91 670.357 1522.46 678.279 1521.51 689.066L1512.51 791.783C1511.5 803.367 1520.28 813.581 1531.88 814.31C1543.06 815.012 1552.65 806.624 1553.45 795.45L1560.81 692.585C1561.58 681.775 1553.49 672.278 1542.7 671.317Z" 
        fill={pantsColor || "#FAFAFA"} 
      />
      <path 
        d="M1593.17 782.175L1595.63 782.01C1606.06 781.312 1615.24 788.955 1616.44 799.339L1632.18 935.027L1577.38 934.853L1575.09 801.829C1574.92 791.49 1582.85 782.865 1593.17 782.175Z" 
        fill={pantsColor || "#FAFAFA"} 
      />
      <path 
        d="M1535.1 782.175L1532.64 782.01C1522.21 781.312 1513.03 788.955 1511.83 799.339L1496.09 935.028L1550.89 934.853L1553.18 801.829C1553.36 791.49 1545.42 782.865 1535.1 782.175Z" 
        fill={pantsColor || "#FAFAFA"} 
      />

      {/* Tay áo chẽn thon gọn bên trái */}
      <path 
        d="M1530 539.85C1508 538.85 1490 546.85 1480 564.85C1456 602.85 1438 662.85 1420 720.85C1444 738.85 1474 738.85 1498 720.85C1502 697.85 1510 660.85 1522 607.85L1530 552.85V539.85Z" 
        fill={dressColor} 
        stroke="rgba(0,0,0,0.12)" 
        strokeLinecap="round" 
      />

      {/* Tay áo chẽn thon gọn bên phải */}
      <path 
        d="M1598 539.85C1620 538.85 1638 546.85 1648 564.85C1672 602.85 1690 662.85 1708 720.85C1684 738.85 1654 738.85 1630 720.85C1626 697.85 1618 660.85 1606 607.85L1598 552.85V539.85Z" 
        fill={dressColor} 
        stroke="rgba(0,0,0,0.12)" 
        strokeLinecap="round" 
      />

      {/* Thân Áo Ngũ Thân tay chẽn dáng dài duyên dáng */}
      <path 
        d="M1530 539.85H1598C1606 539.85 1612 544.85 1612 552.85L1642 882.85C1600 892.85 1528 892.85 1486 882.85L1516 552.85C1516 544.85 1522 539.85 1530 539.85Z" 
        fill={dressColor} 
        stroke="rgba(0,0,0,0.15)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />

      {/* Cổ đứng & đường lượn 5 cúc bên nẹp phải */}
      <path 
        d="M1550 530.85H1578V549.85C1578 553.85 1550 553.85 1550 549.85V530.85Z" 
        fill={dressColor} 
        stroke="rgba(0,0,0,0.15)" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path d="M1550 534.85H1578" stroke="rgba(255,255,255,0.7)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path 
        d="M1560 549.85C1548 558.85 1536 570.85 1532 588.85L1531 624.85" 
        stroke="rgba(0,0,0,0.25)" 
        strokeWidth="1.4" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <circle cx="1554" cy="554.85" r="2.2" fill="#C9A55B" />
      <circle cx="1545" cy="562.85" r="2.2" fill="#C9A55B" />
      <circle cx="1537" cy="573.85" r="2.2" fill="#C9A55B" />
      <circle cx="1532.5" cy="590.85" r="2.2" fill="#C9A55B" />
      <circle cx="1531.3" cy="608.85" r="2.2" fill="#C9A55B" />
    </g>
  );
};

