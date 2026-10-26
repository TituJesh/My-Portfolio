"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { stages, type StageId } from "@/data/content";
import { Check, ChevronDown, Close } from "./Icons";
import ThemeToggle from "./ThemeToggle";

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

export default function PipelineNav({ home = true }: { home?: boolean }) {
  const [active, setActive] = useState<StageId>("top");
  const [condensed, setCondensed] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const highlightRef = useRef<HTMLSpanElement>(null);
  const segRefs = useRef<(HTMLElement | null)[]>([]);
  const sheetRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLButtonElement>(null);

  const activeIndex = stages.findIndex((s) => s.id === active);

  // Active stage from the section sitting in the middle band of the viewport.
  useEffect(() => {
    if (!home) return;
    const targets = stages.map((s) => document.getElementById(s.id)).filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (hit) setActive(hit.target.id as StageId);
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.01, 0.5, 1] },
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, [home]);

  // Scroll: condense after 80px, hide on fast scroll down, reveal on scroll up, and fill the
  // pipeline segment by segment as the viewport moves from one section to the next.
  useEffect(() => {
    let lastY = window.scrollY;
    let raf = 0;
    let tops: number[] = [];
    const measure = () => {
      const offset = window.innerHeight * 0.4;
      tops = stages.map((s) => {
        const el = document.getElementById(s.id);
        return el ? el.getBoundingClientRect().top + window.scrollY - offset : Number.POSITIVE_INFINITY;
      });
    };
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      const dy = y - lastY;
      lastY = y;
      setCondensed(y > 80);
      if (dy > 14 && y > 160) setHidden(true);
      else if (dy < -4 || y < 80) setHidden(false);

      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, Math.max(0, y / max)) : 0);
      if (!home) return;
      if (!tops.length) measure();
      segRefs.current.forEach((seg, k) => {
        if (!seg) return;
        const a = tops[k];
        const b = tops[k + 1];
        const f = Number.isFinite(a) && Number.isFinite(b) && b > a ? Math.min(1, Math.max(0, (y - a) / (b - a))) : 0;
        seg.style.transform = `scaleX(${f.toFixed(3)})`;
      });
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    const onResize = () => {
      measure();
      onScroll();
    };
    measure();
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [home]);

  // Slide the highlight pill under the active stage (transform only).
  useEffect(() => {
    const track = trackRef.current;
    const hl = highlightRef.current;
    if (!track || !hl) return;
    const el = track.querySelector<HTMLElement>(`[data-stage="${active}"]`);
    if (!el) return;
    hl.style.width = `${el.offsetWidth}px`;
    hl.style.transform = `translateX(${el.offsetLeft}px)`;
  }, [active, condensed]);

  // Sheet: focus trap, Escape, restore focus.
  useEffect(() => {
    if (!open) return;
    const sheet = sheetRef.current;
    const opener = openerRef.current;
    if (!sheet) return;
    const focusables = () => Array.from(sheet.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"));
    focusables()[0]?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
        return;
      }
      if (e.key !== "Tab") return;
      const list = focusables();
      if (!list.length) return;
      const first = list[0];
      const last = list[list.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      opener?.focus();
    };
  }, [open]);

  const go = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, id: StageId) => {
      if (!home) return; // let the browser navigate to /#id
      e.preventDefault();
      const el = document.getElementById(id);
      if (!el) return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
      history.replaceState(null, "", id === "top" ? location.pathname : `#${id}`);
      setActive(id);
      setOpen(false);
    },
    [home],
  );

  const href = (id: StageId) => (home ? (id === "top" ? "/" : `#${id}`) : id === "top" ? "/" : `/#${id}`);
  const ring = 2 * Math.PI * 8;

  return (
    <>
      <header className="nav enter-nav" data-condensed={condensed} data-hidden={hidden && !open}>
        {/* Desktop: the pipeline */}
        <nav className="nav-pill hidden sm:flex" aria-label="Sections">
          <div className="nav-track" ref={trackRef} style={{ transition: `transform 300ms ${EASE}` }}>
            <span className="nav-highlight" ref={highlightRef} aria-hidden />
            {stages.map((s, i) => {
              const state = i < activeIndex ? "done" : i === activeIndex ? "active" : "next";
              return (
                <span key={s.id} className="contents">
                  {i > 0 ? (
                    <span className="nav-seg" aria-hidden>
                      <i
                        ref={(el) => {
                          segRefs.current[i - 1] = el;
                        }}
                      />
                    </span>
                  ) : null}
                  <a
                    href={href(s.id)}
                    className="nav-stage"
                    data-stage={s.id}
                    data-state={state}
                    aria-current={state === "active" ? "true" : undefined}
                    onClick={(e) => go(e, s.id)}
                  >
                    <span className="nav-dot" aria-hidden>
                      {state === "done" ? <Check size={12} className="text-bg" style={{ position: "absolute", zIndex: 1 }} /> : null}
                      {state === "active" ? <span className="spinner spin" /> : null}
                      <span className="ring" />
                    </span>
                    {s.label}
                  </a>
                </span>
              );
            })}
          </div>
          <span className="mx-1 h-5 w-px bg-line-2" aria-hidden />
          <ThemeToggle />
        </nav>

        {/* Mobile: compact pill with progress ring */}
        <div className="nav-pill flex sm:hidden">
          <button
            ref={openerRef}
            type="button"
            className="inline-flex h-9 items-center gap-2 rounded-full px-3 text-[13px] font-medium"
            aria-haspopup="dialog"
            aria-expanded={open}
            aria-controls="stage-sheet"
            onClick={() => setOpen(true)}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden>
              <circle cx="10" cy="10" r="8" fill="none" stroke="var(--line-2)" strokeWidth="1.5" />
              <circle
                cx="10"
                cy="10"
                r="8"
                fill="none"
                stroke="var(--accent)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeDasharray={ring}
                strokeDashoffset={ring * (1 - progress)}
                transform="rotate(-90 10 10)"
              />
            </svg>
            <span className="font-mono text-[11px] text-fg-3">0{Math.max(activeIndex, 0)}</span>
            {stages[activeIndex]?.short ?? "Top"}
            <ChevronDown size={14} className="text-fg-3" />
          </button>
          <ThemeToggle />
        </div>
      </header>

      {/* Bottom sheet (mobile) */}
      <div data-open={open} className="sm:hidden">
        <div className="sheet-backdrop" onClick={() => setOpen(false)} aria-hidden />
        <div
          id="stage-sheet"
          ref={sheetRef}
          className="sheet"
          role="dialog"
          aria-modal="true"
          aria-label="Sections"
          hidden={!open}
        >
          <div className="flex items-center justify-between pb-2">
            <span className="mono-meta">pipeline</span>
            <button type="button" className="grid h-9 w-9 place-items-center rounded-full" aria-label="Close" onClick={() => setOpen(false)}>
              <Close />
            </button>
          </div>
          <ol className="flex flex-col">
            {stages.map((s, i) => {
              const state = i < activeIndex ? "done" : i === activeIndex ? "active" : "next";
              return (
                <li key={s.id}>
                  <a
                    href={href(s.id)}
                    className="nav-stage !h-12 w-full"
                    data-state={state}
                    aria-current={state === "active" ? "true" : undefined}
                    onClick={(e) => go(e, s.id)}
                  >
                    <span className="nav-dot" aria-hidden>
                      {state === "done" ? <Check size={12} className="text-bg" style={{ position: "absolute", zIndex: 1 }} /> : null}
                      {state === "active" ? <span className="spinner spin" /> : null}
                      <span className="ring" />
                    </span>
                    <span className="font-mono text-[11px] text-fg-3">0{i}</span>
                    {s.label === "TJ" ? "Top" : s.label}
                  </a>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </>
  );
}
