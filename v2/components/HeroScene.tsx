// Hero sahnesi, kodla çizilmiş: gece mavisinde bir fakülte binası, tek penceresi yanıyor.
// public/hero/scene.webp eklenirse bunun yerine o görsel kullanılır.

const W = 1440;
const H = 900;
const HORIZON = 600;

// Ana blok ve kule pencereleri
const COL_W = 30;
const ROW_H = 44;
const STEP = 54;
const mainCols = Array.from({ length: 13 }, (_, i) => 786 + i * STEP);
const mainRows = [366, 436, 506];
const towerCols = [1056, 1110, 1164];
const towerRows = [296];
const LIT = { x: 1164, y: 436 };

// [x, y, yarıçap, parlama süresi (sn), gecikme (sn)]
const STARS: [number, number, number, number, number][] = [
  [880, 90, 1.4, 5.2, -1.1],
  [1010, 156, 1.2, 6.8, -3.4],
  [1150, 70, 1.8, 4.6, -0.6],
  [1384, 210, 1.3, 7.4, -5.2],
  [960, 240, 1.1, 5.9, -2.2],
  [1220, 190, 1.4, 6.3, -4.1],
  [1392, 96, 1.6, 5.5, -2.9],
  [1060, 36, 1.1, 7.9, -6.3],
  [820, 58, 1.2, 6.1, -1.7],
  [1180, 248, 1.0, 4.9, -3.8],
];

// Kayan yıldızlar: (x, y) başlangıç, kuyruk uzunluğu, tekrar aralığı ve ilk gecikme (sn)
const METEORS = [
  { id: "a", x: 1250, y: 52, tail: 150, every: 23, delay: 6 },
  { id: "b", x: 1110, y: 112, tail: 110, every: 37, delay: 19 },
];

function Window({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <rect x={x} y={y} width={COL_W} height={ROW_H} rx={1} fill="#0b1124" />
      <rect x={x} y={y + ROW_H - 3} width={COL_W} height={3} fill="#2a3660" />
      <line x1={x + COL_W / 2} y1={y} x2={x + COL_W / 2} y2={y + ROW_H - 3} stroke="#1a2442" strokeWidth={1.5} />
    </g>
  );
}

export default function HeroScene({ label }: { label: string }) {
  const lx = LIT.x;
  const ly = LIT.y;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMaxYMax slice" role="img" aria-label={label}>
      <defs>
        <linearGradient id="meteor" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="0.25" stopColor="#ffe9b0" stopOpacity="0.5" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#070b1f" />
          <stop offset="0.36" stopColor="#13204a" />
          <stop offset="0.54" stopColor="#2a4278" />
          <stop offset="0.61" stopColor="#6a6f96" />
          <stop offset="0.67" stopColor="#e8976a" />
        </linearGradient>
        <radialGradient id="sun" cx="0.62" cy="0.67" r="0.45">
          <stop offset="0" stopColor="#ffb27a" stopOpacity="0.45" />
          <stop offset="1" stopColor="#ffb27a" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#fbdb10" stopOpacity="0.22" />
          <stop offset="1" stopColor="#fbdb10" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="room" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffe45c" />
          <stop offset="1" stopColor="#f2c200" />
        </linearGradient>
        <linearGradient id="spill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fbdb10" stopOpacity="0.1" />
          <stop offset="1" stopColor="#fbdb10" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Gökyüzü: mavi saat, ufukta günbatımı sonrası parıltı */}
      <rect width={W} height={H} fill="url(#sky)" />
      <rect width={W} height={H} fill="url(#sun)" />

      {/* Hilal */}
      <circle cx={1296} cy={128} r={22} fill="#f4ecd6" />
      <circle cx={1306} cy={121} r={20} fill="#0b1230" />

      {/* Yıldızlar: her biri kendi temposunda yavaşça parlayıp söner */}
      {STARS.map(([x, y, r, d, delay]) => (
        <circle
          key={`${x}-${y}`}
          className="star"
          cx={x}
          cy={y}
          r={r}
          fill="#ffffff"
          opacity={0.55}
          style={{ animationDuration: `${d}s`, animationDelay: `${delay}s` }}
        />
      ))}

      {/* Kayan yıldızlar: iki farklı rota, farklı aralıklarla */}
      {METEORS.map((m) => (
        <g key={m.id} className="meteor" style={{ animationDuration: `${m.every}s`, animationDelay: `${m.delay}s` }}>
          <g transform={`translate(${m.x} ${m.y}) rotate(-24.8)`}>
            <rect x={0} y={-0.9} width={m.tail} height={1.8} rx={0.9} fill="url(#meteor)" />
            <circle cx={0} cy={0} r={1.8} fill="#ffffff" />
          </g>
        </g>
      ))}

      {/* Uzak tepeler */}
      <path
        d={`M0 ${HORIZON - 18} C 180 ${HORIZON - 52}, 320 ${HORIZON - 40}, 470 ${HORIZON - 62} S 760 ${HORIZON - 30}, 900 ${HORIZON - 48} S 1220 ${HORIZON - 70}, 1440 ${HORIZON - 44} L 1440 ${HORIZON} L 0 ${HORIZON} Z`}
        fill="#24305a"
      />
      <path
        d={`M0 ${HORIZON - 4} C 220 ${HORIZON - 22}, 420 ${HORIZON - 12}, 640 ${HORIZON - 26} S 1000 ${HORIZON - 8}, 1440 ${HORIZON - 20} L 1440 ${HORIZON} L 0 ${HORIZON} Z`}
        fill="#18213f"
      />

      {/* Kule */}
      <rect x={1030} y={262} width={190} height={HORIZON - 262} fill="#141d38" />
      <rect x={1022} y={256} width={206} height={6} fill="#2a3660" />

      {/* Ana blok */}
      <rect x={760} y={340} width={W - 760} height={HORIZON - 340} fill="#131b34" />
      <rect x={752} y={334} width={W - 752} height={6} fill="#2a3660" />
      <rect x={760} y={HORIZON - 14} width={W - 760} height={14} fill="#0b111d" />

      {/* Pencereler */}
      {towerRows.flatMap((y) => towerCols.map((x) => <Window key={`t${x}-${y}`} x={x} y={y} />))}
      {mainRows.flatMap((y) =>
        mainCols
          .filter((x) => !(x === LIT.x && y === LIT.y))
          .map((x) => <Window key={`m${x}-${y}`} x={x} y={y} />),
      )}

      {/* Giriş */}
      <rect x={1098} y={HORIZON - 58} width={54} height={44} fill="#090d17" />
      <rect x={1090} y={HORIZON - 64} width={70} height={6} fill="#2a3660" />

      {/* Yanan pencere: ışık söndüğünde altındaki karanlık pencere görünür */}
      <Window x={lx} y={ly} />
      <g className="lit">
        <ellipse cx={lx + COL_W / 2} cy={ly + ROW_H / 2} rx={92} ry={78} fill="url(#glow)" />
        <rect x={lx} y={ly} width={COL_W} height={ROW_H} rx={1} fill="url(#room)" />
        {/* Masa ve ekran silueti */}
        <rect x={lx + 4} y={ly + 22} width={17} height={11} rx={1} fill="#3a2f05" opacity={0.75} />
        <rect x={lx + 11} y={ly + 33} width={3} height={5} fill="#3a2f05" opacity={0.75} />
        <rect x={lx} y={ly + 38} width={COL_W} height={3} fill="#3a2f05" opacity={0.55} />
        <line x1={lx + COL_W / 2} y1={ly} x2={lx + COL_W / 2} y2={ly + ROW_H - 3} stroke="#4a3c06" strokeWidth={1.5} opacity={0.6} />
        <rect x={lx - 2} y={ly + ROW_H - 3} width={COL_W + 4} height={3} fill="#fbdb10" opacity={0.55} />
        {/* Duvara ve zemine düşen ışık */}
        <polygon points={`${lx - 6},${ly + ROW_H} ${lx + COL_W + 6},${ly + ROW_H} ${lx + COL_W + 40},${ly + ROW_H + 70} ${lx - 40},${ly + ROW_H + 70}`} fill="url(#spill)" />
      </g>

      {/* Zemin */}
      <rect x={0} y={HORIZON} width={W} height={H - HORIZON} fill="#0a0f1f" />
      <g className="lit">
        <polygon points={`${lx - 10},${HORIZON} ${lx + COL_W + 10},${HORIZON} ${lx + COL_W + 120},${HORIZON + 90} ${lx - 120},${HORIZON + 90}`} fill="url(#spill)" opacity={0.6} />
      </g>

      {/* Ağaçlar */}
      {[
        [700, 54, 92],
        [742, 40, 70],
        [902, 46, 78],
        [948, 34, 58],
        [1262, 50, 84],
        [1310, 38, 64],
        [1394, 56, 96],
      ].map(([x, r, h]) => (
        <g key={x} fill="#0a0f20">
          <rect x={x - 2} y={HORIZON - 24} width={4} height={24} />
          <ellipse cx={x} cy={HORIZON - h / 2 - 14} rx={r / 2} ry={h / 2} />
        </g>
      ))}
    </svg>
  );
}
