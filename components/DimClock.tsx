"use client";

import { useEffect, useState } from "react";
import { site } from "@/data/content";

// The dimension label beside the avatar shows the current time in the site's time zone, hours and minutes only.
export default function DimClock({ className }: { className?: string }) {
  const [time, setTime] = useState("--:--");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: site.timeZone });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    // tick on the minute so the label never lags
    let id: ReturnType<typeof setInterval> | undefined;
    const t = setTimeout(() => {
      tick();
      id = setInterval(tick, 60_000);
    }, 60_000 - (Date.now() % 60_000));
    return () => {
      clearTimeout(t);
      if (id) clearInterval(id);
    };
  }, []);
  return (
    <time className={className} suppressHydrationWarning aria-hidden>
      {time}
    </time>
  );
}
