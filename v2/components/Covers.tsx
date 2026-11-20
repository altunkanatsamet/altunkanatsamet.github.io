import type { Locale, Project } from "@/content/site";

// Proje kapakları: her projenin kendi rengi ve gerçek bir özelliğini anlatan, kodla çizilmiş bir sahne.
// Sayı ya da örnek veri içermez.

export const coverColor: Record<string, string> = {
  "kalite-yonetim-sistemi": "#0f9b8e",
  "hedef-sonuc-programi": "#f2a516",
  "afet-yardim-platformu": "#e5484d",
  vitalis: "#1d5fd6",
};

const W = 600;
const H = 280;

// KYS: rol-yetki ve rapor panosu
function Kys() {
  const rows = [0, 1, 2, 3];
  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMax meet" aria-hidden>
      <g transform="translate(64 44)">
        <rect width="472" height="236" rx="14" fill="#ffffff" fillOpacity="0.14" />
        <rect width="472" height="236" rx="14" fill="none" stroke="#ffffff" strokeOpacity="0.35" />
        {/* yan menü */}
        <rect x="16" y="16" width="96" height="204" rx="8" fill="#ffffff" fillOpacity="0.1" />
        {rows.map((i) => (
          <rect key={i} x="28" y={32 + i * 26} width={i === 1 ? 72 : 56} height="10" rx="5" fill="#ffffff" fillOpacity={i === 1 ? 0.9 : 0.4} />
        ))}
        {/* çizgi grafik */}
        <path d="M136 132 C 176 120, 196 82, 236 92 S 300 128, 336 96 S 400 52, 448 60" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
        <path d="M136 132 C 176 120, 196 82, 236 92 S 300 128, 336 96 S 400 52, 448 60 L 448 148 L 136 148 Z" fill="#ffffff" fillOpacity="0.12" />
        <line x1="136" y1="148" x2="448" y2="148" stroke="#ffffff" strokeOpacity="0.3" />
        {/* tablo satırları */}
        {[0, 1].map((i) => (
          <g key={i} transform={`translate(136 ${168 + i * 26})`}>
            <rect width="312" height="18" rx="6" fill="#ffffff" fillOpacity="0.1" />
            <rect x="10" y="5" width="90" height="8" rx="4" fill="#ffffff" fillOpacity="0.55" />
            <rect x="250" y="5" width="50" height="8" rx="4" fill="#ffffff" fillOpacity="0.3" />
          </g>
        ))}
      </g>
      {/* kilit: birime göre erişim */}
      <g transform="translate(474 18)">
        <circle cx="40" cy="40" r="34" fill="#0b0d14" />
        <rect x="26" y="38" width="28" height="22" rx="5" fill="#fbdb10" />
        <path d="M31 38 v-6 a9 9 0 0 1 18 0 v6" fill="none" stroke="#fbdb10" strokeWidth="4" />
        <circle cx="40" cy="48" r="3" fill="#0b0d14" />
      </g>
    </svg>
  );
}

// Hedef–Sonuç: bölüm başkanı → dekan → rektörlük onay zinciri
function Chain({ lang }: { lang: Locale }) {
  const labels = lang === "tr" ? ["Bölüm başkanı", "Dekan", "Rektörlük"] : ["Dept. head", "Dean", "Rectorate"];
  const xs = [140, 300, 460];
  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet" aria-hidden>
      {/* form kağıdı */}
      <g transform="translate(244 26) rotate(-4)">
        <rect width="112" height="82" rx="8" fill="#fffaf0" />
        <rect x="14" y="16" width="60" height="8" rx="4" fill="#0b0d14" fillOpacity="0.7" />
        <rect x="14" y="34" width="84" height="6" rx="3" fill="#0b0d14" fillOpacity="0.25" />
        <rect x="14" y="48" width="76" height="6" rx="3" fill="#0b0d14" fillOpacity="0.25" />
        <rect x="14" y="62" width="40" height="6" rx="3" fill="#0b0d14" fillOpacity="0.25" />
      </g>
      <line x1={xs[0]} y1="170" x2={xs[2]} y2="170" stroke="#0b0d14" strokeOpacity="0.25" strokeWidth="3" />
      <line x1={xs[0]} y1="170" x2={xs[1]} y2="170" stroke="#0b0d14" strokeWidth="3" />
      {xs.map((x, i) => (
        <g key={x}>
          <circle cx={x} cy="170" r="26" fill={i < 2 ? "#0b0d14" : "#f2a516"} stroke="#0b0d14" strokeWidth="3" />
          {i < 2 && <path d={`M${x - 10} 170 l7 7 l13 -14`} fill="none" stroke="#f2a516" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />}
          <text x={x} y="228" textAnchor="middle" fontSize="17" fontFamily="var(--font-sans), sans-serif" fontWeight="500" fill="#0b0d14">
            {labels[i]}
          </text>
        </g>
      ))}
    </svg>
  );
}

// Afet: harita üzerinde yardım talepleri
function MapCover() {
  const pins: [number, number][] = [
    [150, 96],
    [236, 196],
    [420, 84],
    [508, 192],
  ];
  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" aria-hidden>
      <g stroke="#ffffff" strokeOpacity="0.22" strokeWidth="2" fill="none">
        <path d="M-20 70 L620 120" />
        <path d="M-20 210 L620 160" />
        <path d="M120 -20 L180 300" />
        <path d="M330 -20 L300 300" />
        <path d="M470 -20 L540 300" />
        <path d="M-20 260 C 160 230, 260 250, 620 230" strokeOpacity="0.12" strokeWidth="14" />
      </g>
      <path d="M150 96 C 220 120, 260 140, 330 140" fill="none" stroke="#ffffff" strokeWidth="3" strokeDasharray="2 8" strokeLinecap="round" />
      {pins.map(([x, y]) => (
        <path key={x} d={`M${x} ${y} c -10 -14 -16 -20 -16 -28 a16 16 0 0 1 32 0 c 0 8 -6 14 -16 28 z`} fill="#ffffff" fillOpacity="0.7" />
      ))}
      {/* öne çıkan talep */}
      <circle cx="330" cy="140" r="48" fill="#ffffff" fillOpacity="0.12" />
      <circle cx="330" cy="140" r="28" fill="#ffffff" fillOpacity="0.2" />
      <path d="M330 140 c -14 -18 -22 -26 -22 -38 a22 22 0 0 1 44 0 c 0 12 -8 20 -22 38 z" fill="#ffffff" />
      <circle cx="330" cy="102" r="8" fill="#e5484d" />
    </svg>
  );
}

export function Cover({ project, lang }: { project: Project; lang: Locale }) {
  const bg = coverColor[project.slug] ?? "#1a1e28";
  let art: React.ReactNode = null;
  if (project.slug === "kalite-yonetim-sistemi") art = <Kys />;
  else if (project.slug === "hedef-sonuc-programi") art = <Chain lang={lang} />;
  else if (project.slug === "afet-yardim-platformu") art = <MapCover />;
  else if (project.images?.length)
    art = (
      <div className="cover-phones">
        {project.images.slice(0, 2).map((img, i) => (
          <div key={img.src} className={`phone ${i === 0 ? "a" : "b"}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={img.src} alt="" width={600} height={1298} loading="lazy" />
          </div>
        ))}
      </div>
    );
  return (
    <div className="cover" style={{ background: bg }}>
      <div className="cover-art">{art}</div>
    </div>
  );
}
