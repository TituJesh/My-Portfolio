"use client";

import { useEffect, useRef, useState } from "react";
import { stages, type StageId } from "@/data/content";
import { ChevronDown } from "./Icons";
import ThemeToggle from "./ThemeToggle";

export default function PipelineNav({ home = true }: { home?: boolean }) {
  const [active, setActive] = useState<StageId>("top");
  const [open, setOpen] = useState(false);
  const header = useRef<HTMLElement>(null);
  const opener = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!home) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      let current: StageId = "top";
      for (const stage of stages) {
        const section = document.getElementById(stage.id);
        if (section && section.getBoundingClientRect().top <= 120) current = stage.id;
      }
      setActive(current);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    const observer = new ResizeObserver(schedule);
    observer.observe(document.body);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [home]);

  useEffect(() => {
    if (!open) return;
    const outside = (event: PointerEvent) => {
      if (event.target instanceof Node && !header.current?.contains(event.target)) setOpen(false);
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOpen(false); opener.current?.focus({ preventScroll: true }); }
    };
    const resize = () => { if (window.innerWidth >= 760) setOpen(false); };
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", escape);
    window.addEventListener("resize", resize);
    return () => {
      document.removeEventListener("pointerdown", outside);
      document.removeEventListener("keydown", escape);
      window.removeEventListener("resize", resize);
    };
  }, [open]);

  const href = (id: StageId) => `${home ? "" : "/"}#${id}`;
  return (
    <header className="site-nav" ref={header}>
      <div className="site-nav-bar">
        <a className="site-nav-brand" href={href("top")} aria-label="Titu Jeshurun, back to top" onClick={() => setOpen(false)}>TJ<span aria-hidden>.</span></a>
        <nav className="site-nav-desktop" aria-label="Sections">
          {stages.slice(1).map((stage, index) => <a key={stage.id} href={href(stage.id)} data-passed={home && index + 1 < stages.findIndex(item => item.id === active)} aria-current={home && active === stage.id ? "location" : undefined}><span className="site-nav-node" aria-hidden="true" />{stage.label}</a>)}
        </nav>
        <button className="site-nav-menu" type="button" ref={opener} aria-expanded={open} aria-controls="mobile-sections" onClick={() => setOpen(!open)}><span className="site-nav-mobile-node" aria-hidden="true" />{stages.find(stage => stage.id === active)?.short ?? "Explore"}<ChevronDown size={14} /></button>
        <ThemeToggle />
      </div>
      <nav id="mobile-sections" className="site-nav-mobile" aria-label="Mobile sections" hidden={!open}>
        {stages.map((stage, index) => <a key={stage.id} href={href(stage.id)} aria-current={home && active === stage.id ? "location" : undefined} onClick={() => { setOpen(false); opener.current?.focus({ preventScroll: true }); }}><span>0{index}</span>{stage.short}</a>)}
      </nav>
    </header>
  );
}
