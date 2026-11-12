"use client";

import { useEffect, useId, useRef, useState, type CSSProperties } from "react";
import { stages } from "@/data/content";
import { ChevronDown, FileText, Terminal, GitHub, Calendar, Mail, Palette } from "./Icons";
import ThemeToggle from "./ThemeToggle";

const projectStages = [
  { id: "top", label: "TJ", short: "Top" },
  { id: "overview", label: "Overview", short: "Overview" },
  { id: "problem", label: "Problem", short: "Problem" },
  { id: "features", label: "Features", short: "Features" },
  { id: "architecture", label: "Architecture", short: "Architecture" },
  { id: "tech-stack", label: "Tech stack", short: "Tech stack" },
  { id: "result", label: "Result", short: "Result" },
] as const;
const sectionIcons: Record<string, typeof FileText> = { about: FileText, skills: Terminal, work: GitHub, log: Calendar, contact: Mail, design: Palette, overview: FileText, problem: FileText, features: Palette, architecture: GitHub, "tech-stack": Terminal, result: Calendar };

export default function PipelineNav({ home = true }: { home?: boolean }) {
  const [active, setActive] = useState<string>("top");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileScrolled, setMobileScrolled] = useState(false);
  const [pastProfile, setPastProfile] = useState(false);
  const [navHover, setNavHover] = useState(false);
  const [navFocus, setNavFocus] = useState(false);
  const [pinned, setPinned] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [focused, setFocused] = useState<string | null>(null);
  const header = useRef<HTMLElement>(null);
  const opener = useRef<HTMLButtonElement>(null);
  const notchId = useId();

  useEffect(() => {
    if (!navHover) return;
    const trackRevealPointer = (event: PointerEvent) => {
      if (!document.documentElement.classList.contains("theme-revealing")) return;
      const bounds = header.current?.getBoundingClientRect();
      if (bounds && (event.clientX < bounds.left || event.clientX > bounds.right ||
        event.clientY < bounds.top || event.clientY > bounds.bottom)) {
        setNavHover(false);
        setHovered(null);
      }
    };
    window.addEventListener("pointermove", trackRevealPointer);
    return () => window.removeEventListener("pointermove", trackRevealPointer);
  }, [navHover]);

  useEffect(() => {
    let previousY = window.scrollY;
    const onScroll = () => {
      const currentY = window.scrollY;
      if (window.innerWidth < 760 && Math.abs(currentY - previousY) > 1) {
        setMobileScrolled(currentY > 0);
        setPinned(false);
        setNavFocus(false);
        setNavHover(false);
        setOpen(false);
      }
      previousY = currentY;
    };
    const onResize = () => { if (window.innerWidth >= 760) setMobileScrolled(false); };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onResize); };
  }, []);

  useEffect(() => {
    const update = () => {
      const hero = document.querySelector(home ? ".hero-canvas" : ".project-page-header");
      const rect = hero?.getBoundingClientRect();
      setScrolled(rect ? rect.top + rect.height / 2 <= 0 : window.scrollY > 120);
      const name = document.querySelector(home ? ".profile-identity h1" : ".project-page-header h1");
      setPastProfile(home && name ? name.getBoundingClientRect().bottom <= (header.current?.getBoundingClientRect().bottom ?? 75) : false);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => { window.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, [home]);

  useEffect(() => {
    const sections = home ? stages : projectStages;
    let frame = 0;
    const update = () => {
      frame = 0;
      let current: string = "top";
      for (const stage of sections) {
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

  const sections = home ? stages : projectStages;
  const href = (id: string) => `#${!home && id === "top" ? "overview" : id}`;
  const compactMode = scrolled || mobileScrolled;
  const expanded = !compactMode || navHover || navFocus || pinned;
  const highlighted = hovered ?? focused ?? active;
  const stopStyle = { "--active-stop": Math.max(0, sections.findIndex(stage => stage.id === highlighted) - 1) } as CSSProperties;
  return (
    <>
    <header
      className="site-nav"
      data-expanded={expanded}
      data-scrolled={compactMode}
      data-past-profile={pastProfile}
      ref={header}
      onPointerEnter={event => { if (event.pointerType !== "touch") setNavHover(true); }}
      onPointerLeave={() => {
        // During the reveal, track actual pointer movement instead of the overlay's synthetic leave.
        if (document.documentElement.classList.contains("theme-revealing")) return;
        setNavHover(false);
        setHovered(null);
      }}
      onFocusCapture={event => { if (event.target.matches(":focus-visible")) setNavFocus(true); }}
      onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setNavFocus(false); }}
    >
      <div className="site-nav-bar" data-active={expanded && highlighted !== "top"} style={stopStyle}>
        <svg className="site-nav-surface" width="100%" height="100%" aria-hidden="true">
          <defs>
            <mask id={notchId} maskUnits="userSpaceOnUse" x="0" y="0" width="100%" height="100%">
              <rect width="100%" height="100%" fill="white" />
              <path className="site-nav-cutout" d="M-65 0 C-57 0 -58 14 -57 22 Q-56 34 -44 34 L44 34 Q56 34 57 22 C58 14 57 0 65 0 Z" fill="black" />
            </mask>
          </defs>
        </svg>
        <div className="site-nav-glass" aria-hidden="true" style={{ mask: `url(#${notchId})`, WebkitMask: `url(#${notchId})` }} />
        <button className="site-nav-brand" type="button" aria-label="Toggle navigation" aria-expanded={expanded} onClick={() => { if (compactMode) setPinned(!pinned); setOpen(false); setHovered(null); setFocused(null); }}>TJ<span aria-hidden>.</span></button>
        <nav className="site-nav-desktop" aria-label="Sections" hidden={!expanded} style={stopStyle} onPointerLeave={() => setHovered(null)}>
          <span className="site-nav-orbit" data-visible={highlighted !== "top"} aria-hidden="true" />
          {sections.slice(1).map((stage, index) => {
            const Icon = sectionIcons[stage.id];
            return <a key={stage.id} href={href(stage.id)} aria-label={stage.label} data-highlighted={highlighted === stage.id} onPointerEnter={event => { if (event.pointerType !== "touch") setHovered(stage.id); }} onFocus={event => { if (event.currentTarget.matches(":focus-visible")) setFocused(stage.id); }} onBlur={() => setFocused(null)} data-passed={index + 1 < sections.findIndex(item => item.id === active)} aria-current={active === stage.id ? "location" : undefined}><span className="site-nav-symbol" aria-hidden="true"><Icon size={16} /></span><span className="site-nav-label">{stage.label}</span></a>;
          })}
        </nav>
        <button className="site-nav-menu" type="button" ref={opener} aria-expanded={open} aria-controls="mobile-sections" onClick={() => setOpen(!open)}><span className="site-nav-mobile-node" aria-hidden="true" />{sections.find(stage => stage.id === active)?.short ?? "Explore"}<ChevronDown size={14} /></button>
        <ThemeToggle />
      </div>
      <nav id="mobile-sections" className="site-nav-mobile" aria-label="Mobile sections" hidden={!open}>
        {sections.map((stage, index) => <a key={stage.id} href={href(stage.id)} aria-current={active === stage.id ? "location" : undefined} onClick={() => { setOpen(false); opener.current?.focus({ preventScroll: true }); }}><span>0{index}</span>{stage.short}</a>)}
      </nav>
    </header>
    </>
  );
}
