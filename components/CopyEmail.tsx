"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Mail } from "./Icons";

// Click copies the address and shows "copied" for a moment. Falls back to a mailto link if the clipboard is unavailable.
export default function CopyEmail({ email, className = "", solid = false }: { email: string; className?: string; solid?: boolean }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef(0);

  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!navigator.clipboard) return; // let the mailto: link work
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 1600);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <a href={`mailto:${email}`} onClick={copy} className={`inline-flex items-center gap-2 ${className}`} data-variant={solid ? "solid" : undefined} aria-live="polite" title="Click to copy">
      {copied ? <Check className="text-ok" /> : <Mail className={solid ? undefined : "text-fg-3"} />}
      <span className={copied ? "text-ok" : undefined}>{copied ? "copied" : email}</span>
    </a>
  );
}
