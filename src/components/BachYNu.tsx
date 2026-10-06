import React from 'react';

interface BachYNuProps {
  robeColor?: string;
  pantsColor?: string;
  sashColor?: string;
  useCustomColors?: boolean;
}

export default function BachYNu({
  robeColor,
  pantsColor,
  sashColor,
  useCustomColors = false
}: BachYNuProps) {
  const currentRobeColor = useCustomColors && robeColor ? robeColor : '#FFFFFF';
  const currentPantsColor = useCustomColors && pantsColor ? pantsColor : '#FAFAFA';
  const currentSashColor = useCustomColors && sashColor ? sashColor : '#2E9B73';

  return (
    <div className="w-full h-full flex items-center justify-center relative select-none">
      <svg
        width="340"
        height="519"
        viewBox="0 0 340 519"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full max-h-[500px] drop-shadow-md object-contain transition-all duration-300 overflow-visible"
        style={{ overflow: 'visible' }}
      >
        <g transform="translate(0, -19.091)">
          {/* Left hand details */}
        <path d="M65.0259 278.95C68.5203 269.495 74.8581 265.781 85.8007 267.803C96.7433 269.826 100.745 275.84 101.085 289.113C101.335 298.88 100.826 311.654 97.3029 316.899C95.8873 319.007 93.2534 320.744 91.3264 319.693C89.3994 318.643 90.0068 316.357 90.9685 313.842C92.0554 311 92.7743 307.003 90.6202 305.881C89.3496 305.219 86.9068 306.532 86.1131 308.375C84.8108 311.4 84.2043 314.052 83.6883 317.473C83.3352 319.813 83.066 321.916 82.8852 323.433C82.7949 324.191 82.7268 324.801 82.6815 325.219L82.6185 325.817C82.2271 328.59 80.2578 329.996 78.2121 329.793C74.2855 329.403 74.5832 325.677 74.6454 325.149C74.5573 325.822 74.4915 326.353 74.4476 326.718C74.425 326.905 74.3972 327.143 74.3972 327.143C74.1698 329.186 72.587 330.262 70.6322 330.074C68.6773 329.886 67.4638 328.111 67.2932 326.748C67.1226 325.385 67.3399 323.431 67.3399 323.431C63.2982 323.598 61.6557 320.869 61.5376 319.005C61.4194 317.142 61.6328 314.787 62.162 311.648C62.2415 311.177 62.3013 310.854 62.3763 310.443C61.825 310.719 61.1903 310.845 60.532 310.771C58.7157 310.57 57.996 308.994 57.9909 307.091C57.9857 305.188 58.8257 298.603 59.9131 294.652C61.0005 290.701 61.5315 288.406 65.0259 278.95Z" fill="#FDBA90"/>
        <path d="M62.3763 310.443C61.825 310.719 61.1903 310.845 60.532 310.771C58.7157 310.57 57.996 308.994 57.9909 307.091C57.9857 305.188 58.8257 298.603 59.9131 294.652C61.0005 290.701 61.5315 288.406 65.0259 278.95C68.5203 269.495 74.8581 265.781 85.8007 267.803C96.7433 269.826 100.745 275.84 101.085 289.113C101.335 298.88 100.826 311.654 97.3029 316.899C95.8873 319.007 93.2534 320.744 91.3264 319.693C89.3994 318.643 90.0068 316.357 90.9685 313.842C92.0554 311 92.7743 307.003 90.6202 305.881C89.3496 305.219 86.9068 306.532 86.1131 308.375C84.8108 311.4 84.2043 314.052 83.6883 317.473C83.3352 319.813 83.066 321.916 82.8852 323.433C82.7949 324.191 82.7268 324.801 82.6815 325.219L82.6185 325.817C82.2271 328.59 80.2578 329.996 78.2121 329.793C73.9851 329.373 74.6535 325.087 74.6535 325.087M64.6712 299.678C64.0981 301.174 62.9421 307.131 62.3763 310.443C62.3013 310.854 62.2415 311.177 62.162 311.648C61.6328 314.787 61.4194 317.142 61.5376 319.005C61.6557 320.869 63.2982 323.598 67.3399 323.431M70.234 305.289C69.189 309.831 68.6073 312.922 67.9696 317.539C67.8818 318.216 67.3399 323.431 67.3399 323.431M67.3399 323.431C67.3399 323.431 67.7424 319.832 67.9696 317.539M67.3399 323.431C67.3399 323.431 67.1226 325.385 67.2932 326.748C67.4638 328.111 68.6773 329.886 70.6322 330.074C72.587 330.262 74.1698 329.186 74.3972 327.143C74.3972 327.143 74.425 326.905 74.4476 326.718C74.4928 326.342 74.5613 325.789 74.6535 325.087M74.6535 325.087C74.8379 323.683 75.1163 321.687 75.4913 319.332C75.4913 319.332 76.7306 312.037 77.6318 308.009M74.6535 325.087C74.6535 325.087 74.7341 324.525 74.758 324.304C74.8059 323.862 74.9114 323.323 75.0053 322.536C75.1928 320.962 75.9937 316.314 75.9937 316.314" stroke="#FDBA90" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M63.5348 304.271C64.113 300.818 65.6202 293.704 67.023 292.875M68.0679 318.31C68.7138 312.604 70.6419 300.376 73.187 297.117M80.9123 298.54C79.2868 302.966 75.8697 314.039 75.2051 322.926" stroke="#ED9D63" strokeLinecap="round" strokeLinejoin="round"/>

        {/* Left inner sleeve */}
        <path d="M136.783 111.401C114.783 110.401 96.7832 118.401 86.7832 136.401C62.7832 174.401 44.7832 234.401 26.7832 292.401C50.7832 310.401 80.7832 310.401 104.783 292.401C108.783 269.401 116.783 232.401 128.783 179.401L136.783 124.401V111.401Z" fill={currentRobeColor} stroke="#C9CED6" strokeWidth="1.2" strokeLinecap="round"/>
        <path d="M26.7827 292.4C50.7827 310.4 80.7827 310.4 104.783 292.4" stroke="#AEB6C2" strokeWidth="2" strokeLinejoin="round"/>

        {/* Right hand details */}
        <path d="M275.933 278.95C272.438 269.495 266.1 265.781 255.158 267.803C244.215 269.826 240.214 275.84 239.874 289.113C239.624 298.88 240.132 311.654 243.656 316.899C245.071 319.007 247.705 320.744 249.632 319.693C251.559 318.643 250.952 316.357 249.99 313.842C248.903 311 248.184 307.003 250.338 305.881C251.609 305.219 254.052 306.532 254.845 308.375C256.148 311.4 256.754 314.052 257.27 317.473C257.623 319.813 257.892 321.916 258.073 323.433C258.164 324.191 258.232 324.801 258.277 325.219L258.34 325.817C258.731 328.59 260.701 329.996 262.746 329.793C266.673 329.403 266.375 325.677 266.313 325.149C266.401 325.822 266.467 326.353 266.511 326.718C266.533 326.905 266.561 327.143 266.561 327.143C266.789 329.186 268.371 330.262 270.326 330.074C272.281 329.886 273.495 328.111 273.665 326.748C273.836 325.385 273.619 323.431 273.619 323.431C277.66 323.598 279.303 320.869 279.421 319.005C279.539 317.142 279.326 314.787 278.796 311.648C278.717 311.177 278.657 310.854 278.582 310.443C279.133 310.719 279.768 310.845 280.426 310.771C282.243 310.57 282.962 308.994 282.968 307.091C282.973 305.188 282.133 298.603 281.045 294.652C279.958 290.701 279.427 288.406 275.933 278.95Z" fill="#FDBA90"/>
        <path d="M278.582 310.443C279.133 310.719 279.768 310.845 280.426 310.771C282.243 310.57 282.962 308.994 282.968 307.091C282.973 305.188 282.133 298.603 281.045 294.652C279.958 290.701 279.427 288.406 275.933 278.95C272.438 269.495 266.1 265.781 255.158 267.803C244.215 269.826 240.214 275.84 239.874 289.113C239.624 298.88 240.132 311.654 243.656 316.899C245.071 319.007 247.705 320.744 249.632 319.693C251.559 318.643 250.952 316.357 249.99 313.842C248.903 311 248.184 307.003 250.338 305.881C251.609 305.219 254.052 306.532 254.845 308.375C256.148 311.4 256.754 314.052 257.27 317.473C257.623 319.813 257.892 321.916 258.073 323.433C258.164 324.191 258.232 324.801 258.277 325.219L258.34 325.817C258.731 328.59 260.701 329.996 262.746 329.793C266.973 329.373 266.305 325.087 266.305 325.087M276.287 299.678C276.86 301.174 278.016 307.131 278.582 310.443C278.657 310.854 278.717 311.177 278.796 311.648C279.326 314.787 279.539 317.142 279.421 319.005C279.303 320.869 277.66 323.598 273.619 323.431M270.725 305.289C271.77 309.831 272.351 312.922 272.989 317.539C273.077 318.216 273.619 323.431 273.619 323.431M273.619 323.431C273.619 323.431 273.216 319.832 272.989 317.539M273.619 323.431C273.619 323.431 273.836 325.385 273.665 326.748C273.495 328.111 272.281 329.886 270.326 330.074C268.371 330.262 266.789 329.186 266.561 327.143C266.561 327.143 266.533 326.905 266.511 326.718C266.466 326.342 266.397 325.789 266.305 325.087M266.305 325.087C266.121 323.683 265.842 321.687 265.467 319.332C265.467 319.332 264.228 312.037 263.327 308.009M266.305 325.087C266.305 325.087 266.224 324.525 266.2 324.304C266.153 323.862 266.047 323.323 265.953 322.536C265.766 320.962 264.965 316.314 264.965 316.314" stroke="#FDBA90" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M277.827 306.071C277.249 302.618 275.742 295.504 274.339 294.675M273.294 320.11C272.648 314.404 270.72 302.177 268.175 298.917M260.45 300.34C262.075 304.766 265.492 315.839 266.157 324.726" stroke="#ED9D63" strokeLinecap="round" strokeLinejoin="round"/>

        {/* Right inner sleeve */}
        <path d="M204.783 111.401C226.783 110.401 244.783 118.401 254.783 136.401C278.783 174.401 296.783 234.401 314.783 292.401C290.783 310.401 260.783 310.401 236.783 292.401C232.783 269.401 224.783 232.401 212.783 179.401L204.783 124.401V111.401Z" fill={currentRobeColor} stroke="#C9CED6" strokeWidth="1.2" strokeLinecap="round"/>
        <path d="M314.783 292.4C290.783 310.4 260.783 310.4 236.783 292.4" stroke="#AEB6C2" strokeWidth="2" strokeLinejoin="round"/>

        {/* Right Leg & Shoes */}
        <path d="M192.356 242.401C203.143 241.441 212.6 249.363 213.545 260.15L222.544 362.868C223.559 374.452 214.776 384.665 203.173 385.394C191.996 386.096 182.403 377.708 181.604 366.534L174.249 263.67C173.476 252.859 181.561 243.363 192.356 242.401Z" fill={currentPantsColor} stroke={currentPantsColor}/>
        <path d="M202.726 349.105C213.531 349.105 222.291 357.865 222.291 368.671C222.291 379.477 213.531 388.236 202.726 388.237C191.92 388.237 183.159 379.477 183.159 368.671C183.159 357.865 191.92 349.105 202.726 349.105Z" fill={currentPantsColor} stroke={currentPantsColor}/>
        <path d="M210.488 481.718C222.092 481.19 231.947 490.129 232.55 501.729L232.909 508.642C233.543 520.829 223.832 531.058 211.629 531.058C199.86 531.058 190.32 521.517 190.319 509.749V502.826C190.319 491.53 199.204 482.232 210.488 481.718Z" fill="#FDBA90" stroke="#FDBA90"/>
        <path d="M185.705 533.203C185.705 535.412 187.495 537.203 189.705 537.203H254.074C257.664 537.203 259.436 532.841 256.865 530.337L256 529.495H185.705V533.203Z" fill="#B8C0CC"/>
        <path d="M239.196 513.133C238.449 512.406 237.448 511.999 236.406 511.999H189.705C187.495 511.999 185.705 513.79 185.705 515.999V529.495H256L239.196 513.133Z" fill="white"/>
        <path d="M199.952 353.259L202.417 353.094C212.844 352.397 222.022 360.04 223.226 370.423L238.965 506.112L184.163 505.938L181.877 372.913C181.699 362.575 189.631 353.949 199.952 353.259Z" fill={currentPantsColor} stroke={currentPantsColor}/>

        {/* Left Leg & Shoes */}
        <path d="M149.483 242.402C138.696 241.441 129.239 249.363 128.293 260.15L119.295 362.868C118.28 374.452 127.063 384.665 138.666 385.394C149.843 386.096 159.435 377.708 160.234 366.534L167.589 263.67C168.362 252.859 160.278 243.363 149.483 242.402Z" fill={currentPantsColor} stroke={currentPantsColor}/>
        <path d="M139.113 349.105C128.307 349.105 119.548 357.866 119.548 368.671C119.548 379.477 128.308 388.237 139.113 388.237C149.919 388.237 158.679 379.477 158.68 368.671C158.68 357.865 149.919 349.105 139.113 349.105Z" fill={currentPantsColor} stroke={currentPantsColor}/>
        <path d="M131.351 481.719C119.746 481.19 109.892 490.129 109.289 501.729L108.93 508.642C108.296 520.829 118.007 531.058 130.21 531.058C141.979 531.058 151.519 521.518 151.52 509.749V502.826C151.519 491.53 142.635 482.232 131.351 481.719Z" fill="#FDBA90" stroke="#FDBA90"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M156.134 529.4V533.203C156.134 535.412 154.343 537.203 152.134 537.203H87.7647C84.1753 537.203 82.4025 532.841 84.9742 530.337L85.9365 529.4H156.134Z" fill="#B8C0CC"/>
        <path d="M102.643 513.134C103.389 512.406 104.391 511.999 105.433 511.999H152.134C154.343 511.999 156.134 513.79 156.134 515.999V529.4H85.9365L102.643 513.134Z" fill="white"/>
        <path d="M141.887 353.259L139.422 353.094C128.995 352.397 119.817 360.04 118.612 370.423L102.873 506.112L157.676 505.938L159.962 372.913C160.14 362.575 152.208 353.95 141.887 353.259Z" fill={currentPantsColor} stroke={currentPantsColor}/>

        {/* Torso & Main Gown */}
        <path d="M170.644 180.678C186.756 180.678 200.605 192.103 203.668 207.921L212.884 255.508C213.275 257.525 212.411 259.578 210.696 260.709L184.065 278.267C175.771 283.736 164.995 283.655 156.785 278.061L131.24 260.658C129.619 259.553 128.796 257.6 129.139 255.669L137.525 208.436C140.376 192.378 154.335 180.679 170.644 180.678Z" fill={currentRobeColor} stroke={currentRobeColor}/>
        <path d="M134.422 243.533C142.93 245.544 150.05 235.05 150.05 218.346" stroke="white" strokeLinecap="round"/>
        <path d="M206.417 243.533C197.909 245.544 190.789 235.05 190.789 218.346" stroke="white" strokeLinecap="round"/>

        {/* Main Robe Outer Layer */}
        <path d="M136.783 111.4H204.783C212.783 111.4 218.783 116.4 218.783 124.4L248.783 454.4C206.783 464.4 134.783 464.4 92.7832 454.4L122.783 124.4C122.783 116.4 128.783 111.4 136.783 111.4Z" fill={currentRobeColor} stroke="#C9CED6" strokeWidth="1.2" strokeLinecap="round"/>
        <path d="M166.783 121.4C154.783 130.4 142.783 142.4 138.783 160.4L136.783 204.4" stroke="#AEB6C2" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="160.783" cy="126.4" r="1.4" fill="#E4E8EE" stroke="#AEB6C2" strokeWidth="0.8"/>
        <circle cx="151.783" cy="134.4" r="1.4" fill="#E4E8EE" stroke="#AEB6C2" strokeWidth="0.8"/>
        <circle cx="143.783" cy="145.4" r="1.4" fill="#E4E8EE" stroke="#AEB6C2" strokeWidth="0.8"/>
        <circle cx="139.283" cy="162.4" r="1.4" fill="#E4E8EE" stroke="#AEB6C2" strokeWidth="0.8"/>
        <circle cx="137.783" cy="182.4" r="1.4" fill="#E4E8EE" stroke="#AEB6C2" strokeWidth="0.8"/>

        {/* Scalloped Translucent Overlap Layer */}
        <path d="M136.783 111.4H204.783C212.783 111.4 218.783 116.4 218.783 124.4L246.783 474.4C241.716 484.4 226.516 484.4 221.449 474.4C216.383 484.4 201.183 484.4 196.116 474.4C191.049 484.4 175.849 484.4 170.783 474.4C165.716 484.4 150.516 484.4 145.449 474.4C140.383 484.4 125.183 484.4 120.116 474.4C115.049 484.4 99.8494 484.4 94.7827 474.4L122.783 124.4C122.783 116.4 128.783 111.4 136.783 111.4Z" fill="white" fillOpacity="0.42" stroke="#AEB6C2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M169.067 125.4C166.167 221.664 162.3 337.182 156.5 460.4M172.933 125.4C175.833 221.664 179.7 337.182 185.5 460.4" stroke="#AEB6C2" strokeLinecap="round" strokeLinejoin="round"/>

        {/* Embroidered Lotus Flowers */}
        <path d="M202.782 229.4C196.382 229.25 192.432 224.63 191.292 219.76C196.282 220.03 201.522 223.12 202.782 229.4Z" fill="white" stroke="#AEB6C2" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M202.783 229.4C197.043 226.56 195.413 220.7 196.443 215.81C200.853 218.16 204.293 223.18 202.783 229.4Z" fill="white" stroke="#AEB6C2" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M202.783 229.4C198.783 224.4 199.783 218.4 202.783 214.4C205.783 218.4 206.783 224.4 202.783 229.4Z" fill="white" stroke="#AEB6C2" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M202.783 229.4C201.273 223.18 204.713 218.16 209.123 215.81C210.153 220.7 208.523 226.56 202.783 229.4Z" fill="white" stroke="#AEB6C2" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M202.783 229.4C204.043 223.12 209.283 220.03 214.273 219.76C213.133 224.63 209.183 229.25 202.783 229.4Z" fill="white" stroke="#AEB6C2" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M195.783 229.4C198.783 233.4 206.783 233.4 209.783 229.4" stroke="#AEB6C2" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round"/>

        <path d="M138.782 284.4C132.382 284.25 128.432 279.63 127.292 274.76C132.282 275.03 137.522 278.12 138.782 284.4Z" fill="white" stroke="#AEB6C2" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M138.783 284.4C133.043 281.56 131.413 275.7 132.443 270.81C136.853 273.16 140.293 278.18 138.783 284.4Z" fill="white" stroke="#AEB6C2" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M138.783 284.4C134.783 279.4 135.783 273.4 138.783 269.4C141.783 273.4 142.783 279.4 138.783 284.4Z" fill="white" stroke="#AEB6C2" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M138.783 284.4C137.273 278.18 140.713 273.16 145.123 270.81C146.153 275.7 144.523 281.56 138.783 284.4Z" fill="white" stroke="#AEB6C2" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M138.783 284.4C140.043 278.12 145.283 275.03 150.273 274.76C149.133 279.63 145.183 284.25 138.783 284.4Z" fill="white" stroke="#AEB6C2" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M131.783 284.4C134.783 288.4 142.783 288.4 145.783 284.4" stroke="#AEB6C2" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round"/>

        {/* Lower Lotus & Clouds */}
        <path d="M204.783 417.9C199.023 417.77 195.463 413.6 194.443 409.22C198.933 409.47 203.653 412.25 204.783 417.9Z" fill="white" stroke="#AEB6C2" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M204.783 417.9C199.623 415.34 198.153 410.07 199.073 405.66C203.043 407.79 206.143 412.3 204.783 417.9Z" fill="white" stroke="#AEB6C2" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M204.783 417.9C201.183 413.4 202.083 408 204.783 404.4C207.483 408 208.383 413.4 204.783 417.9Z" fill="white" stroke="#AEB6C2" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M204.783 417.9C203.423 412.3 206.523 407.79 210.493 405.66C211.413 410.07 209.943 415.34 204.783 417.9Z" fill="white" stroke="#AEB6C2" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M204.783 417.9C205.913 412.25 210.633 409.47 215.123 409.22C214.103 413.6 210.543 417.77 204.783 417.9Z" fill="white" stroke="#AEB6C2" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M198.483 417.9C201.183 421.5 208.383 421.5 211.083 417.9" stroke="#AEB6C2" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round"/>

        {/* Swirling Auspicious Clouds */}
        <path d="M181.783 163.4C177.783 155.4 187.783 150.4 192.783 155.4C196.783 148.4 207.783 152.4 204.783 159.4C209.783 159.4 209.783 166.4 203.783 166.4H183.783C178.783 166.4 178.783 163.4 181.783 163.4Z" stroke="#AEB6C2" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M133.783 178.4C129.783 170.4 139.783 165.4 144.783 170.4C148.783 163.4 159.783 167.4 156.783 174.4C161.783 174.4 161.783 181.4 155.783 181.4H135.783C130.783 181.4 130.783 178.4 133.783 178.4Z" stroke="#AEB6C2" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M119.547 324.058C115.547 316.058 125.547 311.058 130.547 316.058C134.547 309.058 145.547 313.058 142.547 320.058C147.547 320.058 147.547 327.058 141.547 327.058H121.547C116.547 327.058 116.547 324.058 119.547 324.058Z" stroke="#AEB6C2" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M185.783 313.4C181.783 305.4 191.783 300.4 196.783 305.4C200.783 298.4 211.783 302.4 208.783 309.4C213.783 309.4 213.783 316.4 207.783 316.4H187.783C182.783 316.4 182.783 313.4 185.783 313.4Z" stroke="#AEB6C2" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M117.783 253.4C113.783 245.4 123.783 240.4 128.783 245.4C132.783 238.4 143.783 242.4 140.783 249.4C145.783 249.4 145.783 256.4 139.783 256.4H119.783C114.783 256.4 114.783 253.4 117.783 253.4Z" stroke="#AEB6C2" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M201.783 253.4C197.783 245.4 207.783 240.4 212.783 245.4C216.783 238.4 227.783 242.4 224.783 249.4C229.783 249.4 229.783 256.4 223.783 256.4H203.783C198.783 256.4 198.783 253.4 201.783 253.4Z" stroke="#AEB6C2" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M159.783 296.4C155.783 288.4 165.783 283.4 170.783 288.4C174.783 281.4 185.783 285.4 182.783 292.4C187.783 292.4 187.783 299.4 181.783 299.4H161.783C156.783 299.4 156.783 296.4 159.783 296.4Z" stroke="#AEB6C2" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round"/>

        {/* Water / Wave Bottom Ripples */}
        <path d="M93.5 447.65C96.7 440.65 106.3 440.65 109.5 447.65C112.7 440.65 122.3 440.65 125.5 447.65C128.7 440.65 138.3 440.65 141.5 447.65C144.7 440.65 154.3 440.65 157.5 447.65C160.7 440.65 170.3 440.65 173.5 447.65C176.7 440.65 186.3 440.65 189.5 447.65C192.7 440.65 202.3 440.65 205.5 447.65" stroke="#AEB6C2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M153.051 461.688C155.499 454.391 165.046 453.385 168.962 460.01C171.411 452.713 180.958 451.707 184.874 458.333C187.322 451.036 196.869 450.029 200.786 456.655C203.234 449.358 212.781 448.351 216.698 454.977C219.146 447.68 228.693 446.673 232.609 453.299C235.058 446.002 244.605 444.995 248.521 451.621" stroke="#AEB6C2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M148.5 431.9C151.7 425.9 161.3 425.9 164.5 431.9C167.7 425.9 177.3 425.9 180.5 431.9C183.7 425.9 193.3 425.9 196.5 431.9C199.7 425.9 209.3 425.9 212.5 431.9C215.7 425.9 225.3 425.9 228.5 431.9C231.7 425.9 241.3 425.9 244.5 431.9" stroke="#AEB6C2" strokeLinecap="round" strokeLinejoin="round"/>

        {/* Jade Belt Sash */}
        <path d="M124.783 186.4H216.783L215.783 195.4H125.783L124.783 186.4Z" fill={currentSashColor} stroke="#1B6B50" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M168.783 194.4L156.783 230.4L163.783 232.4L172.783 196.4L168.783 194.4Z" fill={currentSashColor} stroke="#1B6B50" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M172.783 194.4L184.783 227.4L177.783 230.4L168.783 196.4L172.783 194.4Z" fill={currentSashColor} stroke="#1B6B50" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="170.783" cy="190.9" r="4.3" fill={currentSashColor} stroke="#B8860B" strokeWidth="0.8"/>

        {/* Flowing Wide Sleeves */}
        <path d="M134.934 112.483C112.934 111.483 94.9338 119.483 84.9338 137.483C54.9338 177.483 18.9338 237.483 0.933815 300.483C-3.06618 340.483 20.9338 371.483 58.9338 377.483C100.934 387.483 95 423.4 102.5 377.483C92.5 341.483 146.934 265.483 126.934 205.483L128.934 165.483L134.934 125.483V112.483Z" fill="white" fillOpacity="0.42" stroke="#AEB6C2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M204.5 111.483C226.5 110.483 244.5 118.483 254.5 136.483C284.5 176.483 320.5 236.483 338.5 299.483C342.5 339.483 318.5 370.483 280.5 376.483C238.5 386.483 246.5 410.9 238 376.483C248 340.483 196 266.4 216 206.4L210.5 164.483L204.5 124.483V111.483Z" fill="white" fillOpacity="0.42" stroke="#AEB6C2" strokeLinecap="round" strokeLinejoin="round"/>

        {/* Hair & Head Details */}
        <path d="M131.128 62.6897C130.709 38.9928 147.909 19.473 169.545 19.0908C191.182 18.7086 209.03 35.8789 209.448 59.5758C209.647 70.8114 216.43 91.4012 210.162 99.9479C201.288 112.047 182.439 104.704 171.061 104.905C158.62 105.124 142.701 111.653 131.81 101.332C120.256 90.3818 131.306 72.76 131.128 62.6897Z" fill="#20150B"/>
        <path d="M170.33 84.2128C176.467 84.2129 181.442 89.1886 181.442 95.326V109.959C181.442 116.096 176.467 121.071 170.33 121.071C164.193 121.071 159.217 116.096 159.217 109.959V95.326C159.217 89.1885 164.193 84.2128 170.33 84.2128Z" fill="#FDBA90" stroke="#FDBA90"/>

        {/* Ears and Face */}
        <path d="M195.295 64.0282C199.133 64.0283 202.245 67.1401 202.245 70.9784C202.245 74.8166 199.133 77.9285 195.295 77.9286C191.457 77.9286 188.345 74.8167 188.345 70.9784C188.345 67.14 191.457 64.0282 195.295 64.0282Z" fill="#FDBA90" stroke="#FDBA90"/>
        <path d="M145.364 64.0282C149.203 64.0283 152.314 67.1401 152.314 70.9784C152.314 74.8166 149.202 77.9285 145.364 77.9286C141.526 77.9286 138.414 74.8167 138.414 70.9784C138.414 67.14 141.526 64.0282 145.364 64.0282Z" fill="#FDBA90" stroke="#FDBA90"/>
        <path d="M200.001 69.1394C198.174 69.1394 197.457 71.5064 197.341 72.8167" stroke="#20150B" strokeLinecap="round"/>
        <path d="M140.863 69.1394C142.691 69.1394 143.408 71.5064 143.524 72.8167" stroke="#20150B" strokeLinecap="round"/>
        <path d="M167.485 35.4037H173.172C185.002 35.4037 194.601 45.1038 194.602 57.0814V71.389C194.602 84.9625 182.845 96.7406 170.222 96.7406C157.603 96.7405 146.056 84.9681 146.056 71.389V57.0814C146.056 45.1038 155.655 35.4037 167.485 35.4037Z" fill="#FDBA90" stroke="#FDBA90"/>
        <path d="M180.584 28.1978C180.584 34.4938 176.724 42.3856 169.802 49.71C162.88 57.0344 140.809 57.3182 140.809 57.3182C138.753 41.6907 156.881 17.363 180.584 28.1978Z" fill="#20150B"/>
        <path d="M175.504 29.5636C177.285 32.7664 178.415 44.0025 184.055 51.2437C189.694 58.4849 199.313 58.7226 199.313 58.7226C197.806 44.6302 188.054 29.5636 175.504 29.5636Z" fill="#20150B"/>

        {/* Eyes, Nose, Mouth */}
        <path d="M166.298 85.8574C168.303 87.1385 174.168 86.7935 175.754 84.9999" stroke="#20150B" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M169.413 67.997L167.497 75.9452C167.497 75.9452 169.189 77.8656 171.966 77.7657" stroke="#20150B" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M151.223 59.1288C153.726 56.173 162.652 55.3758 165.058 59.1288" stroke="#20150B" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M175.01 59.1288C177.514 56.173 186.439 55.3758 188.845 59.1288" stroke="#20150B" strokeLinecap="round" strokeLinejoin="round"/>
        <ellipse cx="181.943" cy="66.0721" rx="2.78392" ry="3.6967" fill="#20150B"/>
        <ellipse cx="157.918" cy="66.0721" rx="2.78392" ry="3.6967" fill="#20150B"/>

        {/* Standing Inner Collar */}
        <path d="M156.783 102.4H184.783V121.4C184.783 125.4 156.783 125.4 156.783 121.4V102.4Z" fill="white" stroke="#C9CED6" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>

        {/* Imperial Crown & Hairpins */}
        <path d="M120.783 30.4C120.783 10.4 148.783 3.40002 170.783 3.40002C192.783 3.40002 220.783 10.4 220.783 30.4C220.783 44.4 194.783 48.4 170.783 48.4C146.783 48.4 120.783 44.4 120.783 30.4Z" fill="white" stroke="#C9CED6" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M138.783 14.4C147.783 24.4 152.783 36.4 154.783 46.4M170.783 6.40002C170.783 19.4 170.783 34.4 170.783 47.4M202.783 14.4C193.783 24.4 188.783 36.4 186.783 46.4" stroke="#C9CED6" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M116.783 24.4C138.783 -7.59998 202.783 -7.59998 224.783 24.4C226.783 36.4 218.783 46.4 212.783 48.4H128.783C120.783 46.4 114.783 36.4 116.783 24.4Z" fill="white" fillOpacity="0.35" stroke="#AEB6C2" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round"/>

        {/* Crown Radiating Hairpins */}
        <path d="M126.783 24.4L102.783 4.40002" stroke="#AEB6C2" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="102.783" cy="4.40002" r="1.6" fill="white" stroke="#AEB6C2" strokeWidth="0.8"/>
        <path d="M214.783 24.4L238.783 4.40002" stroke="#AEB6C2" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="238.783" cy="4.40002" r="1.6" fill="white" stroke="#AEB6C2" strokeWidth="0.8"/>
        <path d="M124.783 32.4L96.7827 22.4" stroke="#AEB6C2" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="96.7827" cy="22.4" r="1.6" fill="white" stroke="#AEB6C2" strokeWidth="0.8"/>
        <path d="M216.783 32.4L244.783 22.4" stroke="#AEB6C2" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="244.783" cy="22.4" r="1.6" fill="white" stroke="#AEB6C2" strokeWidth="0.8"/>
        <path d="M128.783 40.4H100.783" stroke="#AEB6C2" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="100.783" cy="40.4" r="1.6" fill="white" stroke="#AEB6C2" strokeWidth="0.8"/>
        <path d="M212.783 40.4H240.783" stroke="#AEB6C2" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="240.783" cy="40.4" r="1.6" fill="white" stroke="#AEB6C2" strokeWidth="0.8"/>

        {/* Crown Pearl Flowers */}
        <circle cx="204.783" cy="24.2601" r="3.1" fill="white" stroke="#C9CED6" strokeWidth="0.7"/>
        <circle cx="208.72" cy="27.1207" r="3.1" fill="white" stroke="#C9CED6" strokeWidth="0.7"/>
        <circle cx="207.216" cy="31.7493" r="3.1" fill="white" stroke="#C9CED6" strokeWidth="0.7"/>
        <circle cx="202.349" cy="31.7493" r="3.1" fill="white" stroke="#C9CED6" strokeWidth="0.7"/>
        <circle cx="200.846" cy="27.1207" r="3.1" fill="white" stroke="#C9CED6" strokeWidth="0.7"/>
        <circle cx="204.783" cy="28.4" r="1.77" fill="#E9ECF1" stroke="#C9CED6" strokeWidth="0.6"/>

        {/* Emerald and Gold Tiered Necklaces */}
        <path d="M152.783 124.4C150.083 132.8 168.683 138.4 170.783 138.4C172.883 138.4 191.483 132.8 188.783 124.4" stroke="#2E9B73" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="152.783" cy="124.4" r="1.75" fill="#2E9B73" stroke="#B8860B" strokeWidth="0.5"/>
        <circle cx="153.417" cy="129.082" r="1.75" fill="#2E9B73" stroke="#B8860B" strokeWidth="0.5"/>
        <circle cx="157.348" cy="132.957" r="1.75" fill="#2E9B73" stroke="#B8860B" strokeWidth="0.5"/>
        <circle cx="162.762" cy="135.891" r="1.75" fill="#2E9B73" stroke="#B8860B" strokeWidth="0.5"/>
        <circle cx="167.846" cy="137.75" r="1.75" fill="#2E9B73" stroke="#B8860B" strokeWidth="0.5"/>
        <circle cx="170.783" cy="138.4" r="1.75" fill="#2E9B73" stroke="#B8860B" strokeWidth="0.5"/>
        <circle cx="173.721" cy="137.75" r="1.75" fill="#2E9B73" stroke="#B8860B" strokeWidth="0.5"/>
        <circle cx="178.804" cy="135.891" r="1.75" fill="#2E9B73" stroke="#B8860B" strokeWidth="0.5"/>
        <circle cx="184.218" cy="132.957" r="1.75" fill="#2E9B73" stroke="#B8860B" strokeWidth="0.5"/>
        <circle cx="188.149" cy="129.082" r="1.75" fill="#2E9B73" stroke="#B8860B" strokeWidth="0.5"/>
        <circle cx="188.783" cy="124.4" r="1.75" fill="#2E9B73" stroke="#B8860B" strokeWidth="0.5"/>

        {/* Gold Bead Necklace Tiers */}
        <path d="M152.787 124.4C127.587 155.6 151.187 176.4 170.787 176.4C190.387 176.4 213.987 155.6 188.787 124.4" stroke="#E8B923" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M152.783 124.4C116.783 173.6 142.783 206.4 170.783 206.4C198.783 206.4 224.783 173.6 188.783 124.4" stroke="#E8B923" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M152.79 124.4C105.99 190.4 134.39 234.4 170.79 234.4C207.19 234.4 235.59 190.4 188.79 124.4" stroke="#E8B923" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>

        {/* Central Pendant & Hanging Tassels */}
        <path d="M171 235.9C176.627 235.9 181 239.575 181 243.9C181 248.225 176.627 251.9 171 251.9C165.373 251.9 161 248.225 161 243.9C161 239.575 165.373 235.9 171 235.9Z" fill="#E8B923" stroke="#B8860B"/>
        <circle cx="170.783" cy="242.4" r="4" fill="#2E9B73" stroke="#1B6B50" strokeWidth="0.8"/>
        <circle cx="170.783" cy="242.4" r="1.6" fill="#EE7B5C"/>

        <path d="M162.783 249.4L159.583 281.4" stroke="#E8B923" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M166.783 249.4L165.183 291.4" stroke="#E8B923" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M170.783 249.4V297.4" stroke="#E8B923" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M174.783 249.4L176.383 291.4" stroke="#E8B923" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M178.5 249.4L181.7 281.4" stroke="#E8B923" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>

        {/* Ear Tassels Left & Right */}
        <circle cx="114.783" cy="34.4" r="6" fill="#E8B923" stroke="#B8860B"/>
        <circle cx="114.783" cy="31" r="2.15" fill="#EE7B5C" stroke="#C8563A" strokeWidth="0.5"/>
        <circle cx="118.017" cy="33.3493" r="2.15" fill="#EE7B5C" stroke="#C8563A" strokeWidth="0.5"/>
        <circle cx="116.782" cy="37.1507" r="2.15" fill="#EE7B5C" stroke="#C8563A" strokeWidth="0.5"/>
        <circle cx="112.785" cy="37.1507" r="2.15" fill="#EE7B5C" stroke="#C8563A" strokeWidth="0.5"/>
        <circle cx="111.549" cy="33.3493" r="2.15" fill="#EE7B5C" stroke="#C8563A" strokeWidth="0.5"/>
        <circle cx="114.783" cy="34.4" r="1.55" fill="white" stroke="#C9CED6" strokeWidth="0.5"/>
        <path d="M109.183 41.4L105.183 91.4" stroke="#E8B923" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M111.983 41.4L109.983 105.4" stroke="#E8B923" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M114.783 41.4V117.4" stroke="#E8B923" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M117.583 41.4L119.583 105.4" stroke="#E8B923" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M120.383 41.4L124.383 91.4" stroke="#E8B923" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/>

        <circle cx="226.783" cy="34.4" r="6" fill="#E8B923" stroke="#B8860B"/>
        <circle cx="226.783" cy="31" r="2.15" fill="#EE7B5C" stroke="#C8563A" strokeWidth="0.5"/>
        <circle cx="230.017" cy="33.3493" r="2.15" fill="#EE7B5C" stroke="#C8563A" strokeWidth="0.5"/>
        <circle cx="228.782" cy="37.1507" r="2.15" fill="#EE7B5C" stroke="#C8563A" strokeWidth="0.5"/>
        <circle cx="224.785" cy="37.1507" r="2.15" fill="#EE7B5C" stroke="#C8563A" strokeWidth="0.5"/>
        <circle cx="223.549" cy="33.3493" r="2.15" fill="#EE7B5C" stroke="#C8563A" strokeWidth="0.5"/>
        <circle cx="226.783" cy="34.4" r="1.55" fill="white" stroke="#C9CED6" strokeWidth="0.5"/>
        <path d="M221.183 41.4L217.183 91.4" stroke="#E8B923" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M223.983 41.4L221.983 105.4" stroke="#E8B923" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M226.783 41.4V117.4" stroke="#E8B923" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M229.583 41.4L231.583 105.4" stroke="#E8B923" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M232.383 41.4L236.383 91.4" stroke="#E8B923" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/>

        {/* Ear Drops */}
        <path d="M141.783 76.4V92.4" stroke="#E8B923" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M141.783 94.6005C142.408 94.6005 143.05 95.0424 143.558 95.9227C144.06 96.7927 144.383 98.0217 144.383 99.4003C144.383 100.779 144.06 102.007 143.558 102.877C143.05 103.757 142.408 104.2 141.783 104.2C141.158 104.2 140.517 103.757 140.009 102.877C139.507 102.007 139.184 100.779 139.184 99.4003C139.184 98.0217 139.507 96.7927 140.009 95.9227C140.517 95.0424 141.158 94.6005 141.783 94.6005Z" fill="#2E9B73" stroke="#B8860B" strokeWidth="0.8"/>
        <path d="M199.783 76.4V92.4" stroke="#E8B923" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M199.783 94.6005C200.408 94.6005 201.05 95.0424 201.558 95.9227C202.06 96.7927 202.383 98.0217 202.383 99.4003C202.383 100.779 202.06 102.007 201.558 102.877C201.05 103.757 200.408 104.2 199.783 104.2C199.158 104.2 198.517 103.757 198.009 102.877C197.507 102.007 197.184 100.779 197.184 99.4003C197.184 98.0217 197.507 96.7927 198.009 95.9227C198.517 95.0424 199.158 94.6005 199.783 94.6005Z" fill="#2E9B73" stroke="#B8860B" strokeWidth="0.8"/>
        </g>
      </svg>
    </div>
  );
}
