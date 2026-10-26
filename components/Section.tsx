import type { ReactNode } from "react";

export default function Section({ id, number, title, children }: { id: string; number: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="col scroll-mt-24 py-16 sm:py-20" aria-labelledby={`${id}-title`}>
      <div className="mb-8 flex items-baseline gap-4 border-b border-line pb-4">
        <span className="mono-meta text-accent" data-reveal="wipe">
          {number}
        </span>
        <h2 id={`${id}-title`} className="text-[22px] sm:text-[24px]" data-reveal="wipe">
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}
