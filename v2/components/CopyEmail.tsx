"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

export default function CopyEmail({ email, copy, copied }: { email: string; copy: string; copied: string }) {
  const [done, setDone] = useState(false);

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(email);
      setDone(true);
      setTimeout(() => setDone(false), 1600);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  }

  return (
    <button type="button" className="btn primary" onClick={onCopy} aria-live="polite">
      {done ? <Check aria-hidden /> : <Copy aria-hidden />}
      {done ? copied : copy}
    </button>
  );
}
