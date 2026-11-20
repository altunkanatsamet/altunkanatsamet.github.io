import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";

const sans = Geist({ variable: "--font-sans", subsets: ["latin", "latin-ext"] });
const mono = Geist_Mono({ variable: "--font-mono", subsets: ["latin", "latin-ext"] });

export const metadata: Metadata = { title: "404 — Samet Altunkanat" };

export default function GlobalNotFound() {
  return (
    <html lang="tr" className={`${sans.variable} ${mono.variable}`}>
      <body>
        <main className="wrap nf">
          <p className="mono muted">404</p>
          <h1 className="case-title">
            Bu sayfa bulunamadı
          </h1>
          <p className="secondary">This page doesn&apos;t exist</p>
          <p style={{ display: "flex", gap: 12 }}>
            <Link className="btn primary" href="/tr">
              Ana sayfa
            </Link>
            <Link className="btn secondary" href="/en">
              Home
            </Link>
          </p>
        </main>
      </body>
    </html>
  );
}
