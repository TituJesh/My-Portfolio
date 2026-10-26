"use client";

import { useState } from "react";
import { ArrowLeft, ArrowUpRight } from "./Icons";

type T = { quote: string; name: string; role: string };

// One quote at a time with a counter and previous / next controls, like a page in a notebook.
export default function Testimonials({ items, source }: { items: T[]; source: string }) {
  const [i, setI] = useState(0);
  const t = items[i];
  const go = (d: number) => setI((v) => (v + d + items.length) % items.length);

  return (
    <div className="cell-pad border-b border-line py-8">
      <div className="flex items-center justify-between">
        <span className="mono-meta">Client words</span>
        <span className="mono-meta tabular-nums text-fg-3" aria-live="polite">
          {i + 1} / {items.length}
        </span>
      </div>
      <blockquote key={i} className="enter mt-5" style={{ "--d": "0ms" } as React.CSSProperties}>
        <p className="font-serif italic text-[clamp(22px,3.2vw,30px)] leading-snug">&ldquo;{t.quote}&rdquo;</p>
        <footer className="mt-4 text-[14px] text-fg-2">
          <span className="text-fg">{t.name}</span>, {t.role}
        </footer>
      </blockquote>
      <div className="mt-6 flex items-center justify-between">
        <div className="flex gap-2">
          <button type="button" className="grid h-9 w-9 place-items-center rounded-full border border-line-2 hover:border-fg" aria-label="Previous quote" onClick={() => go(-1)}>
            <ArrowLeft />
          </button>
          <button type="button" className="grid h-9 w-9 place-items-center rounded-full border border-line-2 hover:border-fg" aria-label="Next quote" onClick={() => go(1)}>
            <ArrowLeft style={{ transform: "rotate(180deg)" }} />
          </button>
        </div>
        <a href={source} rel="noreferrer" className="mono-meta inline-flex items-center gap-1 hover:text-fg">
          From the design gallery <ArrowUpRight size={14} />
        </a>
      </div>
    </div>
  );
}
