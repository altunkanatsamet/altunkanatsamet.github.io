import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Header from "@/components/Header";
import { getDictionary, isLocale, locales, person } from "@/content/site";

const sans = Geist({ variable: "--font-sans", subsets: ["latin", "latin-ext"] });
const mono = Geist_Mono({ variable: "--font-mono", subsets: ["latin", "latin-ext"] });

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const dynamicParams = false;

export const viewport: Viewport = { themeColor: "#0b0d14" };

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = getDictionary(lang);
  return {
    metadataBase: new URL(person.site),
    title: { default: t.meta.title, template: `%s — ${person.name}` },
    description: t.meta.description,
    applicationName: person.name,
    authors: [{ name: person.name, url: person.site }],
    creator: person.name,
    alternates: { canonical: `/${lang}/`, languages: { tr: "/tr/", en: "/en/", "x-default": "/tr/" } },
    openGraph: {
      type: "profile",
      firstName: "Samet",
      lastName: "Altunkanat",
      siteName: person.name,
      title: t.meta.title,
      description: t.meta.description,
      url: `/${lang}/`,
      locale: lang === "tr" ? "tr_TR" : "en_US",
      alternateLocale: lang === "tr" ? ["en_US"] : ["tr_TR"],
      images: [{ url: `/og/${lang}.png`, width: 1200, height: 630, alt: person.name }],
    },
    twitter: { card: "summary_large_image", title: t.meta.title, description: t.meta.description, images: [`/og/${lang}.png`] },
    robots: { index: true, follow: true },
  };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang);

  return (
    <html lang={lang} className={`${sans.variable} ${mono.variable}`}>
      <body>
        <a className="skip" href="#main">
          {lang === "tr" ? "İçeriğe geç" : "Skip to content"}
        </a>
        <Header lang={lang} labels={{ ...t.nav, menu: t.menu, close: t.close }} />
        <main id="main">{children}</main>
        <footer className="footer">
          <div className="wrap footer-inner">
            <span>© 2026 {person.name}</span>
            <span>{t.footer.colophon}</span>
            <span>{t.footer.updated}</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
