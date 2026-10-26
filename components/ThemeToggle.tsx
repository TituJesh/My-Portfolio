"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "./Icons";

type Theme = "light" | "dark";

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

  const toggle = () => {
    const next: Theme = dark ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      aria-pressed={dark}
      className={`relative grid h-9 w-9 place-items-center rounded-full text-fg-2 hover:text-fg ${className}`}
    >
      <span className="theme-icon absolute" style={{ opacity: dark ? 0 : 1, transform: dark ? "rotate(-90deg)" : "none" }}>
        <Sun />
      </span>
      <span className="theme-icon absolute" style={{ opacity: dark ? 1 : 0, transform: dark ? "none" : "rotate(90deg)" }}>
        <Moon />
      </span>
    </button>
  );
}
