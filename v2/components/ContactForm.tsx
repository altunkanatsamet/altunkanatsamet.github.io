"use client";

import { Send } from "lucide-react";
import { useState } from "react";
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
};

type Status = { kind: "idle" | "sending" | "ok" | "err"; text?: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactForm({ lang, labels }: { lang: Locale; labels: Labels }) {
  const [status, setStatus] = useState<Status>({ kind: "idle" });

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
    if (data._honey) {
      setStatus({ kind: "ok", text: labels.sent });
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
        }),
      });
      const body = await res.json().catch(() => ({}));
      if (res.ok && body.success === true) {
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
        <label htmlFor="cf-honey">Leave empty</label>
        <input id="cf-honey" name="_honey" tabIndex={-1} autoComplete="off" />
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
