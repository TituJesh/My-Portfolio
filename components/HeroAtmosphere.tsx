"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

/** Open Skies + Golden Air. CSS runs the scenery; JS only eases pointer input. */
export default function HeroAtmosphere({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scene = ref.current;
    if (!scene) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const pointer = matchMedia("(hover: hover) and (pointer: fine)");
    let visible = false;
    let frame = 0;
    let last = 0;
    let x = 0, y = 0, targetX = 0, targetY = 0;
    const active = () => visible && !document.hidden && !reduced.matches;
    const reset = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      x = y = targetX = targetY = 0;
      scene.style.setProperty("--sky-x", "0px");
      scene.style.setProperty("--sky-y", "0px");
    };
    const sync = () => {
      scene.dataset.motion = active() ? "running" : "paused";
      if (!active() || !pointer.matches) reset();
    };
    const tick = (time: number) => {
      frame = 0;
      if (!active()) return;
      const dt = last ? Math.min(time - last, 64) : 16;
      last = time;
      const ease = 1 - Math.exp(-dt / 160);
      x += (targetX - x) * ease;
      y += (targetY - y) * ease;
      scene.style.setProperty("--sky-x", `${x.toFixed(3)}px`);
      scene.style.setProperty("--sky-y", `${y.toFixed(3)}px`);
      if (Math.abs(x - targetX) + Math.abs(y - targetY) > 0.01) frame = requestAnimationFrame(tick);
    };
    const schedule = () => { if (!frame) { last = 0; frame = requestAnimationFrame(tick); } };
    const move = (event: PointerEvent) => {
      if (!active() || !pointer.matches || event.pointerType === "touch") return;
      const rect = scene.getBoundingClientRect();
      // Travel always fits within the image's 1.5% overscan, including phones.
      targetX = ((event.clientX - rect.left) / rect.width * 2 - 1) * Math.min(6, rect.width * 0.008);
      targetY = ((event.clientY - rect.top) / rect.height * 2 - 1) * Math.min(2, rect.height * 0.008);
      schedule();
    };
    const leave = () => { targetX = targetY = 0; if (active() && pointer.matches) schedule(); };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
    observer.observe(scene);
    scene.addEventListener("pointermove", move, { passive: true });
    scene.addEventListener("pointerleave", leave);
    document.addEventListener("visibilitychange", sync);
    reduced.addEventListener("change", sync);
    pointer.addEventListener("change", sync);
    sync();
    return () => {
      observer.disconnect();
      reset();
      scene.removeEventListener("pointermove", move);
      scene.removeEventListener("pointerleave", leave);
      document.removeEventListener("visibilitychange", sync);
      reduced.removeEventListener("change", sync);
      pointer.removeEventListener("change", sync);
    };
  }, []);

  return (
    <div ref={ref} className="hero-canvas relative overflow-hidden border-b border-line" data-motion="paused">
      {children}
      <div className="hero-air" aria-hidden="true">
        <div className="hero-flock">
          {Array.from({ length: 5 }, (_, i) => (
            <svg key={i} className="hero-bird" viewBox="0 0 40 16" focusable="false" style={{ left: `${i * 4.5}%`, top: `${(i % 3) * 7}px`, animationDelay: `${-i * 0.19}s` }}>
              <path d="M2 12 Q10 1 20 12 Q30 1 38 12" />
            </svg>
          ))}
        </div>
      </div>
      <div className="hero-dust" aria-hidden="true">
        {Array.from({ length: 18 }, (_, i) => (
          <i key={i} style={{
            "--mote-left": `${5 + (i * 37) % 92}%`,
            "--mote-top": `${18 + (i * 23) % 66}%`,
            "--mote-size": `${i % 4 === 0 ? 2.5 : 1.5}px`,
            "--mote-speed": `${10 + i % 7}s`,
            "--mote-delay": `${-i * 0.83}s`,
          } as CSSProperties} />
        ))}
      </div>
    </div>
  );
}
