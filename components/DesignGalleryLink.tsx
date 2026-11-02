"use client";

import { ChevronDown } from "./Icons";

export default function DesignGalleryLink() {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById("design");
    if (!target) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    history.replaceState(null, "", "#design");
  };

  return (
    <a
      href="#design"
      onClick={handleClick}
      className="gallery-word-link group inline-flex items-center gap-1.5 text-[13.5px] font-medium text-fg-2 hover:text-fg"
      title="Scroll to multimedia designer section"
    >
      <span>view my design gallery</span>
      <ChevronDown size={14} className="text-fg-3 group-hover:text-fg" />
    </a>
  );
}
