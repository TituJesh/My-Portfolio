"use client";

import { useEffect, useRef } from "react";

// Lighting-only luminance pass: 337 frames at 24 fps, matching the reference.
// Screen blending leaves the original photo visible during every calm interval.
export default function HeroCloudLight() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    const sync = () => {
      if (visible && !document.hidden && !motion.matches) {
        void video.play().catch(() => { /* Keep the static hero if autoplay is unavailable. */ });
      } else {
        video.pause();
      }
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    observer.observe(video);
    motion.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    return () => {
      observer.disconnect();
      motion.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
      video.pause();
    };
  }, []);

  return <video ref={ref} className="hero-photo hero-cloud-light" src="/hero-intracloud-light.mp4" muted loop playsInline preload="none" aria-hidden tabIndex={-1} disablePictureInPicture />;
}
