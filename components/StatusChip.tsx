"use client";

import { useEffect, useState } from "react";
import { site } from "@/data/content";

// Mono status chip with a live IST clock that ticks every second.
export default function StatusChip() {
  const [time, setTime] = useState("--:--:--");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false, timeZone: site.timeZone });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <p className="mono-meta inline-flex max-w-full flex-wrap items-center gap-x-2 gap-y-1 rounded-full border border-line-2 px-3 py-1.5">
      <span className="relative inline-grid h-2.5 w-2.5 place-items-center" aria-hidden>
        <span className="pulse-dot absolute inset-0 rounded-full" />
        <span className="relative h-1.5 w-1.5 rounded-full bg-ok" />
      </span>
      <span>{site.region}</span>
      <span className="text-fg-3">·</span>
      <time suppressHydrationWarning>{time} IST</time>
      <span className="text-fg-3">·</span>
      <span>all systems operational</span>
    </p>
  );
}
