"use client";

import { useEffect, useRef } from "react";

// Dashed lines from four labeled nodes toward the name. Lines draw in on load (CSS),
// then march slowly. On fine pointers the nodes drift a few pixels with eased lerp.
const nodes = [
  { id: "vpc", label: "VPC", x: 70, y: 46, k: 0.018, w: 64 },
  { id: "cdn", label: "CDN", x: 650, y: 46, k: -0.016, w: 64 },
  { id: "iac", label: "IaC", x: 70, y: 234, k: 0.014, w: 64 },
  { id: "ui", label: "UI / UX", x: 650, y: 234, k: -0.02, w: 82 },
];

const paths: Record<string, string> = {
  vpc: "M 102 46 C 200 46, 240 118, 318 128",
  cdn: "M 618 46 C 520 46, 480 118, 402 128",
  iac: "M 102 234 C 200 234, 240 162, 318 152",
  ui: "M 609 234 C 520 234, 480 162, 402 152",
};

export default function HeroLines() {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = ref.current;
    if (!svg) return;
    const mq = window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)");
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
      if (!mq.matches || e.pointerType === "touch") return;
      const r = svg.getBoundingClientRect();
      target.x = Math.max(-320, Math.min(320, e.clientX - (r.left + r.width / 2)));
      target.y = Math.max(-320, Math.min(320, e.clientY - (r.top + r.height / 2)));
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
    <svg ref={ref} className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 720 280" preserveAspectRatio="xMidYMid meet" fill="none" aria-hidden>
      {nodes.map((n) => (
        <g key={n.id} data-node={n.id} className={`hero-node ${n.y > 140 ? "hidden sm:block" : ""}`} style={{ transformBox: "fill-box", transformOrigin: "center" }}>
          <path d={paths[n.id]} className="hero-line" stroke="var(--line-2)" strokeWidth="1" strokeLinecap="round" />
          <rect x={n.x - n.w / 2} y={n.y - 13} width={n.w} height="26" rx="13" fill="var(--bg)" stroke="var(--line-2)" />
          <text x={n.x} y={n.y + 4} textAnchor="middle" fontFamily="var(--font-mono), monospace" fontSize="11" fill="var(--fg-2)">
            {n.label}
          </text>
        </g>
      ))}
    </svg>
  );
}
