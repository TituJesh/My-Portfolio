"use client";

import { useEffect, useRef } from "react";

// Dashed lines from four labeled nodes toward the name. Lines draw in on load (CSS),
// then march slowly. On fine pointers the nodes drift a few pixels with eased lerp.
const nodes = [
  { id: "vpc", label: "VPC", x: 60, y: 44, k: 0.018 },
  { id: "cdn", label: "CDN", x: 660, y: 44, k: -0.016 },
  { id: "iac", label: "IaC", x: 60, y: 236, k: 0.014 },
  { id: "ui", label: "UI / UX", x: 660, y: 236, k: -0.02 },
];

const paths: Record<string, string> = {
  vpc: "M 96 44 C 200 44, 240 120, 330 128",
  cdn: "M 624 44 C 520 44, 480 120, 390 128",
  iac: "M 96 236 C 200 236, 240 160, 330 152",
  ui: "M 606 236 C 520 236, 480 160, 390 152",
};

export default function HeroLines() {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = ref.current;
    if (!svg) return;
    if (!window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)").matches) return;

    const groups = nodes.map((n) => svg.querySelector<SVGGElement>(`[data-node="${n.id}"]`));
    const target = { x: 0, y: 0 };
    const cur = { x: 0, y: 0 };
    let raf = 0;
    let running = false;

    const frame = () => {
      cur.x += (target.x - cur.x) * 0.08;
      cur.y += (target.y - cur.y) * 0.08;
      groups.forEach((g, i) => {
        if (!g) return;
        const k = nodes[i].k;
        g.style.transform = `translate(${(cur.x * k).toFixed(2)}px, ${(cur.y * k * 0.8).toFixed(2)}px)`;
      });
      if (Math.abs(target.x - cur.x) > 0.05 || Math.abs(target.y - cur.y) > 0.05) raf = requestAnimationFrame(frame);
      else running = false;
    };
    const start = () => {
      if (running || document.hidden) return;
      running = true;
      raf = requestAnimationFrame(frame);
    };
    const onMove = (e: PointerEvent) => {
      const r = svg.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      target.x = Math.max(-320, Math.min(320, dx));
      target.y = Math.max(-320, Math.min(320, dy));
      start();
    };
    const onLeave = () => {
      target.x = 0;
      target.y = 0;
      start();
    };
    const onVis = () => {
      if (document.hidden && raf) {
        cancelAnimationFrame(raf);
        running = false;
      } else start();
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVis);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <svg ref={ref} className="pointer-events-none absolute top-1/2 left-[-22%] w-[144%] -translate-y-1/2 sm:left-0 sm:w-full" viewBox="0 0 720 280" fill="none" aria-hidden>
      {nodes.map((n) => (
        <g key={n.id} data-node={n.id} className="hero-node" style={{ transformBox: "fill-box", transformOrigin: "center" }}>
          <path d={paths[n.id]} className="hero-line" stroke="var(--line-2)" strokeWidth="1" strokeLinecap="round" />
          <rect x={n.x - 36} y={n.y - 13} width={n.label.length > 3 ? 86 : 72} height="26" rx="13" fill="var(--bg)" stroke="var(--line-2)" />
          <text x={n.x + (n.label.length > 3 ? 7 : 0)} y={n.y + 4} textAnchor="middle" fontFamily="var(--font-mono), monospace" fontSize="11" fill="var(--fg-2)">
            {n.label}
          </text>
        </g>
      ))}
    </svg>
  );
}
