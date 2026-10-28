"use client";

import { useEffect, useState } from "react";
import { site } from "@/data/content";

// Live clock in the site's time zone. By default hours and minutes, ticking on the minute (the dimension
// label beside the avatar); with `seconds` it shows HH:MM:SS and ticks every second; with `dot` a green
// status dot sits before the time (the phone layout, where it rides on the role line).
export default function DimClock({ className, seconds = false, dot = false }: { className?: string; seconds?: boolean; dot?: boolean }) {
  const [time, setTime] = useState(seconds ? "--:--:--" : "--:--");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", ...(seconds ? { second: "2-digit" } : {}), hour12: false, timeZone: site.timeZone });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    if (seconds) {
      const id = setInterval(tick, 1000);
      return () => clearInterval(id);
    }
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
  }, [seconds]);
  return (
    <time className={className} suppressHydrationWarning aria-hidden>
      {dot ? <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-ok align-middle" aria-hidden /> : null}
      {time}
    </time>
  );
}
