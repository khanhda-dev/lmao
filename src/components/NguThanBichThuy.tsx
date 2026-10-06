import React from 'react';

interface NguThanBichThuyProps {
  robeColor?: string;
  pantsColor?: string;
  sashColor?: string;
  useCustomColors?: boolean;
}

export default function NguThanBichThuy({
  robeColor,
  pantsColor,
  sashColor,
  useCustomColors = false
}: NguThanBichThuyProps) {
  const currentRobeColor = useCustomColors && robeColor ? robeColor : '#0D7482';
  const currentPantsColor = useCustomColors && pantsColor ? pantsColor : '#1A1A1A';
  const currentSashColor = useCustomColors && sashColor ? sashColor : '#D9B25B';

  return (
    <div className="w-full h-full flex items-center justify-center relative select-none">
      <svg
        width="175"
        height="427"
        viewBox="0 0 175 427"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full max-h-[500px] drop-shadow-md object-contain transition-all duration-300"
      >
        {/* Right Leg & Shoe */}
        <path
          d="M108.599 131.967C119.386 131.007 128.843 138.929 129.789 149.716L138.787 252.434C139.802 264.018 131.019 274.231 119.416 274.96C108.239 275.662 98.6466 267.274 97.8476 256.1L90.4926 153.236C89.7196 142.425 97.8045 132.928 108.599 131.967Z"
          fill={currentPantsColor}
          stroke={currentPantsColor}
        />
        <path
          d="M118.969 238.671C129.775 238.671 138.534 247.431 138.534 258.237C138.534 269.043 129.774 277.802 118.969 277.802C108.163 277.802 99.4026 269.043 99.4023 258.237C99.4023 247.431 108.163 238.671 118.969 238.671Z"
          fill={currentPantsColor}
          stroke={currentPantsColor}
        />
        <path
          d="M126.731 371.284C138.336 370.756 148.19 379.694 148.793 391.295L149.152 398.208C149.786 410.395 140.075 420.624 127.872 420.624C116.103 420.624 106.563 411.083 106.562 399.314V392.392C106.563 381.096 115.447 371.798 126.731 371.284Z"
          fill="#FDBA90"
          stroke="#FDBA90"
        />
        <path
          d="M101.948 422.769C101.948 424.978 103.738 426.769 105.948 426.769H170.317C173.907 426.769 175.679 422.407 173.108 419.903L172.243 419.061H101.948V422.769Z"
          fill="#131313"
        />
        <path
          d="M155.439 402.699C154.693 401.972 153.691 401.565 152.649 401.565H105.948C103.738 401.565 101.948 403.356 101.948 405.565V419.061H172.243L155.439 402.699Z"
          fill="white"
        />
        <path
          d="M116.195 242.825L118.66 242.66C129.088 241.963 138.265 249.605 139.47 259.989L155.209 395.678L100.406 395.504L98.1199 262.479C97.9422 252.14 105.874 243.515 116.195 242.825Z"
          fill={currentPantsColor}
          stroke={currentPantsColor}
        />

        {/* Left Leg & Shoe */}
        <path
          d="M65.7262 131.967C54.9396 131.007 45.4819 138.929 44.5367 149.716L35.5378 252.434C34.523 264.018 43.3062 274.231 54.9095 274.96C66.0865 275.662 75.6788 267.274 76.4777 256.1L83.8327 153.236C84.6057 142.425 76.5209 132.928 65.7262 131.967Z"
          fill={currentPantsColor}
          stroke={currentPantsColor}
        />
        <path
          d="M55.3566 238.671C44.5507 238.671 35.7911 247.431 35.7911 258.237C35.7913 269.043 44.5509 277.802 55.3566 277.803C66.1625 277.803 74.9228 269.043 74.923 258.237C74.923 247.431 66.1626 238.671 55.3566 238.671Z"
          fill={currentPantsColor}
          stroke={currentPantsColor}
        />
        <path
          d="M47.5939 371.284C35.9897 370.756 26.1355 379.694 25.5323 391.295L25.173 398.208C24.5395 410.395 34.2499 420.624 46.4532 420.624C58.222 420.624 67.7627 411.083 67.7628 399.314V392.392C67.7627 381.096 58.8781 371.798 47.5939 371.284Z"
          fill="#FDBA90"
          stroke="#FDBA90"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M72.3777 418.966V422.769C72.3777 424.978 70.5868 426.769 68.3777 426.769H4.00809C0.418709 426.769 -1.35406 422.407 1.21762 419.903L2.1799 418.966H72.3777Z"
          fill="#131313"
        />
        <path
          d="M18.886 402.699C19.6328 401.972 20.634 401.565 21.6764 401.565H68.3777C70.5868 401.565 72.3777 403.356 72.3777 405.565V418.966H2.1799L18.886 402.699Z"
          fill="white"
        />
        <path
          d="M58.13 242.825L55.6648 242.66C45.2377 241.963 36.0602 249.606 34.8556 259.989L19.1166 395.678L73.9194 395.504L76.2053 262.479C76.383 252.141 68.4508 243.515 58.13 242.825Z"
          fill={currentPantsColor}
          stroke={currentPantsColor}
        />

        {/* Pelvis / Body Base */}
        <path
          d="M86.8871 70.2441C102.999 70.2441 116.848 81.6685 119.911 97.4863L129.127 145.074C129.518 147.091 128.654 149.144 126.939 150.274L100.308 167.833C92.0139 173.301 81.2381 173.22 73.0277 167.627L47.4828 150.224C45.8616 149.119 45.0393 147.166 45.3822 145.234L53.7679 98.002C56.6188 81.9439 70.5779 70.2443 86.8871 70.2441Z"
          fill={currentPantsColor}
          stroke={currentPantsColor}
        />
        <path d="M50.6649 133.099C59.1728 135.109 66.2932 124.616 66.2932 107.912" stroke="white" strokeLinecap="round" />
        <path d="M122.66 133.099C114.152 135.109 107.032 124.616 107.032 107.912" stroke="white" strokeLinecap="round" />

        {/* Thân Áo Ngũ Thân Xanh Bích Thủy */}
        <path
          d="M53.0259 0.5H121.026C129.026 0.5 135.026 5.5 135.026 13.5C133.026 63.5 137.026 118.5 145.026 173.5C151.026 218.5 156.026 273.5 159.026 313.5C119.026 321.5 55.0259 321.5 15.0259 313.5C18.0259 273.5 23.0259 218.5 29.0259 173.5C37.0259 118.5 41.0259 63.5 39.0259 13.5C39.0259 5.5 45.0259 0.5 53.0259 0.5Z"
          fill={currentRobeColor}
          stroke="#085A66"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Vạt hò & Nẹp áo */}
        <path
          d="M83.0259 10.5C71.0259 19.5 59.0259 31.5 55.0259 49.5L54.0259 85.5"
          stroke="#064A52"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Hàng cúc ngọc / cúc vàng ngũ thường */}
        <circle cx="77.0259" cy="15.5" r="2" fill={currentSashColor} />
        <circle cx="68.0259" cy="23.5" r="2" fill={currentSashColor} />
        <circle cx="60.0259" cy="34.5" r="2" fill={currentSashColor} />
        <circle cx="55.5259" cy="51.5" r="2" fill={currentSashColor} />
        <circle cx="54.3259" cy="69.5" r="2" fill={currentSashColor} />
      </svg>
    </div>
  );
}
