"use client";

import { useEffect } from "react";

// Reveal-on-scroll, once. Elements opt in with data-reveal="rise" | "wipe".
// Children of a [data-reveal-group] get a 40ms stagger via the --d custom property.
export default function RevealObserver() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (!els.length) return;

    document.querySelectorAll<HTMLElement>("[data-reveal-group]").forEach((group) => {
      Array.from(group.children).forEach((child, i) => {
        if (child instanceof HTMLElement && child.hasAttribute("data-reveal")) child.style.setProperty("--d", `${i * 40}ms`);
      });
    });

    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const el = e.target as HTMLElement;
          el.classList.add("is-in");
          io.unobserve(el);
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
}
