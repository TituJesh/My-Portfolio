import type { ReactNode } from "react";

// A numbered section inside the ruled frame: a title row with a hatched band above it.
export default function Section({ id, number, title, count, children }: { id: string; number: string; title: string; count?: number; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-20" aria-labelledby={`${id}-title`}>
      <div className="hatch" aria-hidden />
      <div className="cell-pad flex items-baseline gap-3 border-b border-line py-3">
        <span className="mono-meta text-accent" data-reveal="wipe">
          {number}
        </span>
        <h2 id={`${id}-title`} className="text-[22px] sm:text-[24px]" data-reveal="wipe">
          {title}
          {typeof count === "number" ? <sup className="ml-1 font-mono text-[11px] text-fg-3">({count})</sup> : null}
        </h2>
      </div>
      {children}
    </section>
  );
}
