"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import type { Locale } from "@/content/site";
import { person } from "@/content/site";

type Labels = { work: string; experience: string; about: string; contact: string; menu: string; close: string };

export default function Header({ lang, labels }: { lang: Locale; labels: Labels }) {
  const pathname = usePathname() || `/${lang}`;
  const [open, setOpen] = useState(false);

  const swap = (target: Locale) => pathname.replace(/^\/(tr|en)(?=\/|$)/, `/${target}`);
  const home = `/${lang}`;
  const links = [
    { href: `${home}#work`, label: labels.work },
    { href: `${home}#experience`, label: labels.experience },
    { href: `${home}#about`, label: labels.about },
    { href: `${home}#contact`, label: labels.contact },
  ];

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const lang_ = (
    <div className="lang" role="group" aria-label="Language">
      {(["tr", "en"] as const).map((l) => (
        <Link key={l} href={swap(l)} aria-current={l === lang} hrefLang={l} scroll={false}>
          {l.toUpperCase()}
        </Link>
      ))}
    </div>
  );

  const brand = (
    <Link href={home} className="brand" onClick={() => setOpen(false)}>
      <span className="brand-mark" aria-hidden />
      {person.name}
    </Link>
  );

  return (
    <header className="header">
      <div className="wrap header-inner">
        {brand}
        <div style={{ display: "flex", alignItems: "center" }}>
          <nav className="nav" aria-label={labels.menu}>
            {links.map((l) => (
              <Link key={l.href} href={l.href}>
                {l.label}
              </Link>
            ))}
          </nav>
          {lang_}
          <button type="button" className="icon-btn menu-btn" onClick={() => setOpen(true)} aria-expanded={open} aria-label={labels.menu}>
            <Menu aria-hidden />
          </button>
        </div>
      </div>

      {open && (
        <div className="sheet" role="dialog" aria-modal="true" aria-label={labels.menu}>
          <div className="sheet-top">
            {brand}
            <button type="button" className="icon-btn" onClick={() => setOpen(false)} aria-label={labels.close} autoFocus>
              <X aria-hidden />
            </button>
          </div>
          <nav>
            {links.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)}>
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="sheet-foot">{lang_}</div>
        </div>
      )}
    </header>
  );
}
