"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Reveal-on-scroll, once. Elements opt in with data-reveal="rise" | "wipe".
// Children of a [data-reveal-group] get a 40ms stagger via the --d custom property.
// The observer lives in the root layout, so it re-runs on every route change (the layout itself never
// remounts on client navigation) and also watches the DOM for elements added later.
export default function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const seen = new WeakSet<Element>();

    const stagger = (root: ParentNode) => {
      root.querySelectorAll<HTMLElement>("[data-reveal-group]").forEach((group) => {
        Array.from(group.children).forEach((child, i) => {
          if (child instanceof HTMLElement && child.hasAttribute("data-reveal")) child.style.setProperty("--d", `${i * 40}ms`);
        });
      });
    };

    const io =
      "IntersectionObserver" in window
        ? new IntersectionObserver(
            (entries) => {
              for (const e of entries) {
                if (!e.isIntersecting) continue;
                e.target.classList.add("is-in");
                io?.unobserve(e.target);
              }
            },
            { rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
          )
        : null;

    const watch = (root: ParentNode) => {
      stagger(root);
      root.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
        if (seen.has(el)) return;
        seen.add(el);
        if (io) io.observe(el);
        else el.classList.add("is-in");
      });
    };

    watch(document);

    // pick up elements that arrive after navigation or from lazy-loaded components
    const mo = new MutationObserver((records) => {
      for (const r of records) {
        r.addedNodes.forEach((n) => {
          if (!(n instanceof HTMLElement)) return;
          if (n.hasAttribute("data-reveal") && !seen.has(n)) {
            seen.add(n);
            if (io) io.observe(n);
            else n.classList.add("is-in");
          }
          watch(n);
        });
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      mo.disconnect();
      io?.disconnect();
    };
  }, [pathname]);

  return null;
}
