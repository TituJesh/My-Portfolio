"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Project } from "@/data/content";
import { ArrowUpRight } from "./Icons";

// Case-study rows. On fine pointers a thumbnail preview follows the cursor with eased lerp;
// on touch the thumbnail is shown inline (CSS).
export default function WorkList({ projects }: { projects: Project[] }) {
  const [hover, setHover] = useState<number | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const cur = useRef({ x: 0, y: 0 });
  const raf = useRef(0);
  const fine = useRef<MediaQueryList | null>(null);
  const isFine = (e?: { pointerType?: string }) => !!fine.current?.matches && e?.pointerType !== "touch";

  useEffect(() => {
    fine.current = window.matchMedia("(pointer: fine)");
    const loop = () => {
      const el = previewRef.current;
      cur.current.x += (target.current.x - cur.current.x) * 0.12;
      cur.current.y += (target.current.y - cur.current.y) * 0.12;
      if (el) el.style.transform = `translate(${cur.current.x.toFixed(1)}px, ${cur.current.y.toFixed(1)}px)`;
      const still = Math.abs(target.current.x - cur.current.x) < 0.1 && Math.abs(target.current.y - cur.current.y) < 0.1;
      raf.current = still ? 0 : requestAnimationFrame(loop);
    };
    const onMove = (e: PointerEvent) => {
      if (!isFine(e)) return;
      target.current = { x: e.clientX + 24, y: e.clientY - 90 };
      if (!raf.current && !document.hidden) raf.current = requestAnimationFrame(loop);
    };
    const onVis = () => {
      if (document.hidden && raf.current) {
        cancelAnimationFrame(raf.current);
        raf.current = 0;
      }
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("visibilitychange", onVis);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("visibilitychange", onVis);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  const onEnter = (i: number, e: React.PointerEvent) => {
    if (!isFine(e)) return;
    // Jump straight to the cursor on first show so it does not glide in from the last position.
    if (hover === null) cur.current = { ...target.current };
    setHover(i);
  };

  return (
    <>
      <ul className="flex flex-col divide-y divide-line border-y border-line" data-reveal-group>
        {projects.map((p, i) => (
          <li key={p.slug} data-reveal="rise">
            <Link
              href={`/work/${p.slug}`}
              className="work-row group flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:gap-6"
              onPointerEnter={(e) => onEnter(i, e)}
              onPointerLeave={() => setHover(null)}
              onFocus={() => setHover(null)}
            >
              <div className="work-thumb-inline w-full shrink-0 overflow-hidden rounded-md border border-line sm:w-40">
                <Image src={p.thumbnail.src} alt={p.thumbnail.alt} width={p.thumbnail.width} height={p.thumbnail.height} className="h-auto w-full" />
              </div>
              <div className="work-text flex min-w-0 flex-1 flex-col gap-1.5">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-[19px] sm:text-[20px]">{p.title}</h3>
                  <ArrowUpRight className="shrink-0 text-fg-3 transition-colors group-hover:text-accent" />
                </div>
                <p className="mono-meta">{p.meta}</p>
                <p className="text-[15px] text-fg-2">{p.outcome}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      <div ref={previewRef} className="work-preview overflow-hidden rounded-md border border-line bg-bg" data-on={hover !== null} aria-hidden>
        {projects.map((p, i) => (
          <Image
            key={p.slug}
            src={p.thumbnail.src}
            alt=""
            width={p.thumbnail.width}
            height={p.thumbnail.height}
            className="h-auto w-full"
            style={{ display: hover === i ? "block" : "none" }}
          />
        ))}
      </div>
    </>
  );
}
