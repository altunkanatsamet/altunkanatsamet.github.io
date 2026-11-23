"use client";

import { Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/content/site";

// Site statik (GitHub Pages) olduğu için mesajlar Web3Forms üzerinden e-postaya iletilir.
// Bu anahtar gizli değildir; Web3Forms onu sayfanın içinde kullanılmak üzere verir.
const ENDPOINT = "https://api.web3forms.com/submit";
const ACCESS_KEY = "d1448953-7445-4230-bd65-bfb1c5587cb5";

type Labels = {
  name: string;
  email: string;
  message: string;
  placeholder: string;
  send: string;
  sending: string;
  sent: string;
  error: string;
  required: string;
  tooMany: string;
};

type Status = { kind: "idle" | "sending" | "ok" | "err"; text?: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Kötüye kullanıma karşı tarayıcı tarafı sınırlar:
// iki mesaj arasında en az 1 dakika, aynı tarayıcıdan günde en fazla 3 mesaj.
const COOLDOWN_MS = 60_000;
const DAY_MS = 24 * 60 * 60 * 1000;
const MAX_PER_DAY = 3;
// Sayfa açıldıktan 3 saniye içinde gelen gönderimler insan işi değildir.
const MIN_FILL_MS = 3_000;
const STORE_KEY = "contact-sends";

function recentSends(now: number): number[] {
  try {
    const list = JSON.parse(localStorage.getItem(STORE_KEY) || "[]");
    return Array.isArray(list) ? list.filter((t) => typeof t === "number" && now - t < DAY_MS) : [];
  } catch {
    return [];
  }
}

function rememberSend(now: number) {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify([...recentSends(now), now]));
  } catch {}
}

export default function ContactForm({ lang, labels }: { lang: Locale; labels: Labels }) {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const openedAt = useRef(0);

  useEffect(() => {
    openedAt.current = Date.now();
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    const name = data.name?.trim() ?? "";
    const email = data.email?.trim() ?? "";
    const message = data.message?.trim() ?? "";

    if (!name || !message || !EMAIL_RE.test(email)) {
      setStatus({ kind: "err", text: labels.required });
      return;
    }
    // Botlar: gizli tuzak alanı dolduran ya da formu anında gönderen istekler sessizce düşürülür.
    const now = Date.now();
    if (data.botcheck || now - openedAt.current < MIN_FILL_MS) {
      setStatus({ kind: "ok", text: labels.sent });
      return;
    }
    const sends = recentSends(now);
    if (sends.length >= MAX_PER_DAY || (sends.length && now - sends[sends.length - 1] < COOLDOWN_MS)) {
      setStatus({ kind: "err", text: labels.tooMany });
      return;
    }

    setStatus({ kind: "sending" });
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: `${lang === "tr" ? "Siteden mesaj" : "Message from site"}: ${name}`,
          from_name: "sametaltunkanat.me",
          name,
          email,
          message,
          botcheck: "",
        }),
      });
      const body = await res.json().catch(() => ({}));
      if (res.ok && body.success === true) {
        rememberSend(now);
        form.reset();
        setStatus({ kind: "ok", text: labels.sent });
        return;
      }
      throw new Error(body.message || "send failed");
    } catch {
      setStatus({ kind: "err", text: labels.error });
    }
  }

  return (
    <form className="form" onSubmit={onSubmit} noValidate>
      <div className="field">
        <label htmlFor="cf-name">{labels.name}</label>
        <input id="cf-name" name="name" autoComplete="name" maxLength={100} required />
      </div>
      <div className="field">
        <label htmlFor="cf-email">{labels.email}</label>
        <input id="cf-email" name="email" type="email" autoComplete="email" maxLength={200} required />
      </div>
      <div className="field full">
        <label htmlFor="cf-message">{labels.message}</label>
        <textarea id="cf-message" name="message" rows={5} maxLength={4000} placeholder={labels.placeholder} required />
      </div>
      <div className="hp" aria-hidden>
        <label htmlFor="cf-botcheck">Leave empty</label>
        <input id="cf-botcheck" name="botcheck" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="form-foot">
        <button className="btn primary" type="submit" disabled={status.kind === "sending"}>
          <Send aria-hidden />
          {status.kind === "sending" ? labels.sending : labels.send}
        </button>
        <p className={`form-status ${status.kind === "ok" ? "ok" : status.kind === "err" ? "err" : ""}`} role="status" aria-live="polite">
          {status.text}
        </p>
      </div>
    </form>
  );
}
