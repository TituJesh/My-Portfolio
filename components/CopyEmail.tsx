"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Mail } from "./Icons";

// Click copies the address and shows "copied" for a moment. Falls back to a mailto link if the clipboard is unavailable.
export default function CopyEmail({
  email,
  className = "",
  solid = false,
  label,
}: {
  email: string;
  className?: string;
  solid?: boolean;
  label?: string;
}) {
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
    <a
      href={`mailto:${email}`}
      onClick={copy}
      className={`inline-flex items-center gap-2 ${className}`}
      data-variant={solid ? "solid" : undefined}
      aria-live="polite"
      title="Click to copy email address"
    >
      {copied ? <Check className="text-ok shrink-0" size={16} /> : <Mail size={16} className={solid ? "shrink-0" : "text-fg-3 shrink-0"} />}
      <span className={copied ? "text-ok" : undefined}>{copied ? "copied" : (label ?? email)}</span>
    </a>
  );
}
