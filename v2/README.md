# Portfolyo v2

Samet Altunkanat'ın kişisel sitesi. Next.js (App Router), TypeScript, düz CSS.
Eski tek dosyalık site bir üst klasörde (`../index.html`) olduğu gibi duruyor.

## Çalıştırma

```bash
npm install
npm run dev        # http://localhost:3000/tr/
npm run build      # üretim derlemesi
```

## İçeriği düzenleme

Tüm metinler (TR/EN), projeler, deneyim ve yetkinlikler tek dosyada: `content/site.ts`.
Görseller `public/work/` altında.

## Yayınlama (GitHub Pages + sametaltunkanat.me)

Site statik olarak dışa aktarılır (`next.config.ts` → `output: "export"`, çıktı `out/`).
`main` dalına her push'ta `.github/workflows/pages.yml` siteyi derleyip GitHub Pages'e yükler.

Tek seferlik ayar: GitHub'da repo → **Settings → Pages → Build and deployment → Source**
kısmını **GitHub Actions** yap. Alan adı `public/CNAME` dosyasında (`sametaltunkanat.me`);
Namecheap'teki DNS kayıtları zaten GitHub Pages'i gösterdiği için değiştirmeye gerek yok.
Aynı sayfada **Enforce HTTPS** açık olsun.

Yayından sonra: https://search.google.com/search-console adresinde alan adını ekleyip
`https://sametaltunkanat.me/sitemap.xml` gönder. LinkedIn kartını
https://www.linkedin.com/post-inspector/ ile kontrol et.

## Yapı

- `app/[lang]/` — dile göre sayfalar (`/tr`, `/en`), `work/[slug]` proje detayları
- `app/og/[file]` — LinkedIn/X paylaşım görselleri (`/og/tr.png`, `/og/en.png`)
- `app/sitemap.ts`, `app/robots.ts` — arama motorları için
- `components/` — Header, HeroScene (kodla çizilmiş sahne), Covers (proje kapakları), CopyEmail

## Hero sahne görseli

Hero şu an `components/HeroScene.tsx` içinde kodla (SVG) çizilmiş sahneyi gösterir.
`public/hero/scene.webp` dosyası eklenirse onun yerine o görsel kullanılır. Görseli herhangi bir üretim aracıyla (fal, Replicate,
ChatGPT/OpenAI images, Midjourney vb.) üretip bu isimle kaydet ve siteyi yeniden derle.

Fikir (tek cümle): gece mavisinde, sadece bir penceresi yanan sessiz bir üniversite idari binası.

Prompt:

> A single lit office window glowing warm yellow in a quiet university administration building at blue hour, all other windows dark. A low modern campus building with a long, regular facade, clear winter evening sky, no snow. Deep ink-blue sky that fades to #0b0d14 at the edges and along the bottom, the only warm light is the yellow (#fbdb10) glow from that one window spilling softly onto the sill. Painted background art in the style of modern Japanese animated films, crisp clean shapes, soft light, calm and quiet. The building sits on the right half with the lit window right of center; the left half is calm open sky for a headline; the lower fifth is calm and dark. No text, no letters, no logos, no people, no UI, no watermark. 21:9, 2880×1234.

Kayıt: WebP, 2880×1234, `public/hero/scene.webp`.

---

Tasarım yönü [unslop](https://github.com/heydamir/unslop) (Damir Sokolovsky, CC BY 4.0) skill'i ile belirlendi.
