import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { getDictionary, isLocale, locales, person } from "@/content/site";

// LinkedIn, X, WhatsApp vb. link paylaşımlarında görünen kart (1200×630).
// Statik export'ta /og/tr.png ve /og/en.png dosyaları olarak üretilir.

export const dynamic = "force-static";

export function generateStaticParams() {
  return locales.map((lang) => ({ file: `${lang}.png` }));
}

const size = { width: 1200, height: 630 };
const photo = readFile(join(process.cwd(), "public", "profil.jpg")).then((b) => `data:image/jpeg;base64,${b.toString("base64")}`);

export async function GET(_req: Request, { params }: { params: Promise<{ file: string }> }) {
  const { file } = await params;
  const lang = file.replace(/\.png$/, "");
  const t = getDictionary(isLocale(lang) ? lang : "tr");
  const src = await photo;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "linear-gradient(180deg, #070b1f 0%, #13204a 58%, #2a4278 82%, #6a6f96 92%, #e8976a 100%)",
          color: "#eef0f5",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 56, flex: 1 }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse içinde next/image kullanılamaz */}
          <img
            src={src}
            width={200}
            height={200}
            alt=""
            style={{ borderRadius: 200, border: "6px solid #fbdb10", objectFit: "cover" }}
          />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 26, color: "#fbdb10", marginBottom: 12 }}>{t.hero.role}</div>
            <div style={{ fontSize: 84, lineHeight: 1, letterSpacing: "-0.03em" }}>{person.name}</div>
            <div style={{ fontSize: 34, lineHeight: 1.3, color: "#c9cedb", marginTop: 20, maxWidth: 760 }}>{t.hero.tagline}</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 26, color: "#eef0f5" }}>
          <div style={{ width: 14, height: 18, borderRadius: 3, background: "#fbdb10" }} />
          sametaltunkanat.me
        </div>
      </div>
    ),
    { ...size },
  );
}
