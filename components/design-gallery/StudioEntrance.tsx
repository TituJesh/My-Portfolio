"use client";

import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import "../../app/design-gallery/entrance.css";

const duration = 4500;
const focalLength = 1000;
const studio = "/design-gallery/studio";
const props = ["keyboard", "mouse", "plant", "coffee", "sketchbook", "designer"] as const;

function ease(t: number) {
  const p = Math.max(0, Math.min(1, t));
  return p * p * (3 - 2 * p);
}

function Workstation() {
  return <div className="studio-furniture" aria-hidden="true">
    <div className="studio-wall" />
    <div className="studio-wall-poster studio-wall-poster-brand">
      <img src={`${studio}/wall-rameez.webp`} alt="" draggable={false} />
    </div>
    <div className="studio-wall-poster studio-wall-poster-mission">
      <img src={`${studio}/wall-murder-mystery.webp`} alt="" draggable={false} />
    </div>
    <div className="studio-wall-poster studio-wall-poster-film">
      <img src={`${studio}/wall-short-film.webp`} alt="" draggable={false} />
    </div>
    <div className="studio-desk-top" />
    <div className="studio-mat" />
    <div className="studio-stand-foot" />
    <div className="studio-stand-neck" />
    <div className="studio-monitor"><span>TJ STUDIO</span></div>
    <div className="studio-light" />
    {props.map(name => <img key={name} alt="" className={`studio-prop studio-${name}`} src={`${studio}/${name}.webp`} draggable={false} />)}
  </div>;
}

export default function StudioEntrance({ active, children, onDone, forceMotion = false }: {
  active: boolean; children: ReactNode; onDone: () => void; forceMotion?: boolean;
}) {
  const stage = useRef<HTMLDivElement>(null);
  const world = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState(0);

  useLayoutEffect(() => {
    if (!active || !stage.current || !world.current) return;
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    if (preference.matches && !forceMotion) { onDone(); return; }
    window.scrollTo({ top: 0, behavior: "instant" });
    const camera = world.current;
    const width = stage.current.clientWidth;
    const height = stage.current.clientHeight;
    // A tall viewport occupies a narrower window within the physical 16:9 monitor.
    const pageScale = Math.min(640 / width, 360 / height);
    camera.style.setProperty("--screen-scale", String(pageScale));
    camera.style.setProperty("--page-width", width + "px");
    camera.style.setProperty("--page-height", height + "px");
    const openingWidth = width < height ? 845 : 1250;
    const startDistance = focalLength * Math.max(openingWidth / width, 1060 / height) + 180;
    const straightDistance = focalLength * Math.max(820 / width, 510 / height);
    const endDistance = focalLength * pageScale;
    const start = performance.now();
    let frame = 0;
    let previousPhase = -1;
    function paint(now: number) {
      const elapsed = now - start;
      const pan = ease((elapsed - 450) / 2450);
      const zoom = ease((elapsed - 2900) / 1550);
      const distance = startDistance + (straightDistance - startDistance) * pan + (endDistance - straightDistance) * zoom;
      const remaining = 1 - pan;
      camera.style.transform = `translateZ(${focalLength - distance}px) rotateX(${-58 * remaining}deg) translate3d(0,${-115 * remaining}px,${-230 * remaining}px)`;
      const currentPhase = elapsed < 450 ? 0 : elapsed < 2900 ? 1 : 2;
      if (currentPhase !== previousPhase) { previousPhase = currentPhase; setPhase(currentPhase); }
      if (elapsed >= duration) onDone();
      else frame = requestAnimationFrame(paint);
    }
    paint(start);
    window.addEventListener("resize", onDone, { once: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", onDone);
      camera.style.removeProperty("transform");
    };
  }, [active, forceMotion, onDone]);

  return <div className={active ? "dg-entrance dg-workstation" : "dg-studio-complete"}>
    <div ref={stage} className="studio-viewport">
      <div ref={world} className="studio-world">
        {active && <Workstation />}
        <div className="dg-live-page" inert={active || undefined}>{children}</div>
      </div>
    </div>
    {active && <>
      <div className="dg-entrance-top">
        <div className="studio-credit" data-fading={phase === 2}>
          <strong>Titu Jeshurun</strong>
          <span>Creative multimedia designer</span>
        </div>
        <button onClick={onDone}>Skip intro ↗</button>
      </div>
      <div className="dg-entrance-bottom"><span>{["LOOK AROUND", "APPROACHING THE MONITOR", "STEP INSIDE"][phase]}</span><span className="dg-camera-progress"><i /></span></div>
    </>}
  </div>;
}
