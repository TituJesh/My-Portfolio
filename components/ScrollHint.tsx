"use client";

import { useEffect, useState } from "react";

export default function ScrollHint() {
  const [gone, setGone] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 8) {
        setGone(true);
        window.removeEventListener("scroll", onScroll);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div
      className="scroll-hint absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 mono-meta"
      style={{ opacity: gone ? 0 : undefined, transition: "opacity 300ms var(--ease)" }}
      aria-hidden
    >
      scroll to deploy
      <span className="bar block h-6 w-px bg-line-2" />
    </div>
  );
}
