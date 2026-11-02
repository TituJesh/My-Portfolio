"use client";

import { useSyncExternalStore, type MouseEvent } from "react";
import { Moon, Sun } from "./Icons";

type Theme = "light" | "dark";
let activeTransition: ViewTransition | null = null;
let requestedTheme: Theme | null = null;
let requestId = 0;
let transitionTimer: ReturnType<typeof setTimeout> | undefined;

// The theme lives on <html data-theme>. Subscribe to attribute changes so every toggle stays in sync.
function subscribe(cb: () => void) {
  const mo = new MutationObserver(cb);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => mo.disconnect();
}
const getSnapshot = (): Theme => (document.documentElement.dataset.theme === "dark" ? "dark" : "light");
const getServerSnapshot = (): Theme => "light";

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const dark = theme === "dark";

  const toggle = (event: MouseEvent<HTMLButtonElement>) => {
    const root = document.documentElement;
    const next: Theme = (requestedTheme ?? getSnapshot()) === "dark" ? "light" : "dark";
    requestedTheme = next;
    const id = ++requestId;
    activeTransition?.skipTransition();
    clearTimeout(transitionTimer);
    root.classList.remove("theme-changing");
    const apply = () => {
      if (id !== requestId) return;
      root.dataset.theme = next;
      try { localStorage.setItem("theme", next); } catch {}
    };
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !document.startViewTransition) {
      root.classList.remove("theme-revealing");
      if (!reduce) root.classList.add("theme-changing");
      apply();
      requestedTheme = null;
      transitionTimer = setTimeout(() => root.classList.remove("theme-changing"), 180);
      return;
    }
    const rect = event.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    root.classList.add("theme-revealing");
    try {
      const transition = document.startViewTransition(apply);
      activeTransition = transition;
      void transition.ready.then(() => root.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 700, easing: "cubic-bezier(.4,0,.2,1)", pseudoElement: "::view-transition-new(root)" },
      ).finished).catch(() => { apply(); });
      void transition.finished.catch(() => { apply(); }).finally(() => {
        if (id === requestId) {
          activeTransition = null;
          requestedTheme = null;
          root.classList.remove("theme-revealing");
        }
      });
    } catch {
      apply();
      requestedTheme = null;
      root.classList.remove("theme-revealing");
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      aria-pressed={dark}
      className={`theme-switch ${className}`}
      data-dark={dark}
    >
      <span className="theme-switch-glyph" aria-hidden>
        <Sun size={16} className="theme-switch-sun" />
        <Moon size={16} className="theme-switch-moon" />
      </span>
    </button>
  );
}
