"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "./Icons";

type Theme = "light" | "dark";

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    setTheme((document.documentElement.dataset.theme as Theme) ?? "light");
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
    setTheme(next);
  };

  const dark = theme === "dark";
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
