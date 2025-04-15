"use client"

const AnimatedLogo = () => {
  return (
    <div className="flex items-center justify-center w-screen h-screen bg-white fixed inset-0 z-50">
      <div className="w-full max-w-[700px] max-h-[400px]">
        <svg viewBox="0 0 530 300" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#F05A28" />
              <stop offset="100%" stopColor="#F05A28" />
            </linearGradient>
          </defs>

          <g transform="translate(160, 30) scale(1.2, 1.2)">
            <path
              d="M32 20C60 1 101 16 106.5 53.5L113 35.5C100.5 8 75.5 0.5 61.5 1.45612e-06C33.5 -0.399999 13.8333 18.5 8.5 28C-7.49999 55.2 2.83334 82.3333 10 92.5C24.8 114.5 49.1667 119 59.5 118.5C71.0432 118.072 85.5 114 94 107C110.5 95 115.925 75.8664 118.5 69L135.5 21.5L171.5 118.5H183.5L142 1.5H129.5L108 63.5L105 71L101.5 79C98 88.5 90.5 95 90.5 95C81.5 103 75.5 104 75.5 104C51 112.481 34 100.5 28.5 96C16.7175 86.3597 13 73.5 11.5 66.5C8.5 40.5 23 25.6667 32 20Z"
              fill="none"
              stroke="#F05A28"
              strokeWidth="2"
              strokeDasharray="1200"
              strokeDashoffset="1200"
            >
              <animate attributeName="stroke-dashoffset" from="1200" to="0" dur="2.5s" begin="0s" fill="freeze" />
              <animate attributeName="fill" from="none" to="url(#logoGradient)" dur="0.1s" begin="2.5s" fill="freeze" />
            </path>

            <path
              d="M32 20C60 1 101 16 106.5 53.5L113 35.5C100.5 8 75.5 0.5 61.5 1.45612e-06C33.5 -0.399999 13.8333 18.5 8.5 28C-7.49999 55.2 2.83334 82.3333 10 92.5C24.8 114.5 49.1667 119 59.5 118.5C71.0432 118.072 85.5 114 94 107C110.5 95 115.925 75.8664 118.5 69L135.5 21.5L171.5 118.5H183.5L142 1.5H129.5L108 63.5L105 71L101.5 79C98 88.5 90.5 95 90.5 95C81.5 103 75.5 104 75.5 104C51 112.481 34 100.5 28.5 96C16.7175 86.3597 13 73.5 11.5 66.5C8.5 40.5 23 25.6667 32 20Z"
              fill="url(#logoGradient)"
              opacity="0"
            >
              <animate attributeName="opacity" from="0" to="1" dur="0.5s" begin="2.5s" fill="freeze" />
            </path>
          </g>

          <g transform="translate(175, 220)">
            <defs>
              <clipPath id="opulentClip">
                <text x="0" y="0" fontFamily="Arial, sans-serif" fontSize="30" fontWeight="500">
                  Opulent
                </text>
              </clipPath>
              <clipPath id="abodesClip">
                <text x="120" y="0" fontFamily="Arial, sans-serif" fontSize="30" fontWeight="500">
                  Abodes
                </text>
              </clipPath>
            </defs>

            <rect x="0" y="-25" width="0" height="35" fill="#F05A28" clipPath="url(#opulentClip)">
              <animate attributeName="width" from="0" to="120" dur="0.5s" begin="3s" fill="freeze" />
            </rect>
            <text x="0" y="0" fontFamily="Arial, sans-serif" fontSize="100" fontWeight="500" fill="transparent">
              Opulent
            </text>

            <rect x="120" y="-25" width="0" height="35" fill="#000000" clipPath="url(#abodesClip)">
              <animate attributeName="width" from="0" to="110" dur="0.5s" begin="3.5s" fill="freeze" />
            </rect>
            <text x="120" y="0" fontFamily="Arial, sans-serif" fontSize="40" fontWeight="500" fill="transparent">
              Abodes
            </text>
          </g>
        </svg>
      </div>
    </div>
  )
}

export default AnimatedLogo
