"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { galleryProjects, type GalleryProject } from "@/data/design-gallery-projects";
import { galleryProfile as profile, galleryTools, photographs } from "@/data/design-gallery";
import { testimonials } from "@/data/content";
import { AboutScene, MuseumScene, PhotoBoard, ReviewDecorations, ReviewBackdrop } from "./GalleryScenes";
import StudioEntrance from "./StudioEntrance";
import { useGalleryMotion } from "./useGalleryMotion";

const asset = (name: string) => `/design-gallery/${name}`;
const navigation = [["about", "About"], ["tools", "Tools"], ["projects", "Projects"], ["reviews", "Reviews"], ["photographs", "Photographs"], ["contact", "Contact"]];
const categories = ["All work", "Posters", "Branding", "Motion", "Invitations"];

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <span aria-hidden="true">{diagonal ? "↗" : "↗"}</span>;
}

function ProjectDialog({ project, close }: { project: GalleryProject; close: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(0);
  const media = project.media?.length ? project.media : [{ type: "image", src: project.image }];
  useEffect(() => {
    const node = dialog.current;
    node?.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { node?.close(); document.body.style.overflow = previous; };
  }, []);
  const current = media[index];
  return <dialog className="dg-dialog" ref={dialog} onCancel={close} onClick={(event) => { if (event.target === event.currentTarget) close(); }} aria-labelledby="dg-dialog-title">
    <button className="dg-dialog-close" onClick={close} aria-label="Close project">×</button>
    <div className="dg-dialog-media">
      {current.type === "video" ? <video key={current.src} src={current.src} controls playsInline preload="metadata" /> : <img src={current.src} alt={`${project.title}${media.length > 1 ? ` — image ${index + 1}` : ""}`} />}
      {media.length > 1 && <div className="dg-media-nav"><button aria-label="Previous image" onClick={() => setIndex((index + media.length - 1) % media.length)}>←</button><span>{index + 1} / {media.length}</span><button aria-label="Next image" onClick={() => setIndex((index + 1) % media.length)}>→</button></div>}
    </div>
    <div className="dg-dialog-info"><p className="dg-eyebrow">{project.category} / {project.year}</p><h2 id="dg-dialog-title">{project.title}</h2><p>{project.description}</p><dl><div><dt>CLIENT</dt><dd>{project.client}</dd></div><div><dt>DISCIPLINE</dt><dd>{project.categories?.join(" · ") || project.category}</dd></div></dl><a href="#contact" className="dg-link" onClick={close}>Have something in mind? Let’s talk <Arrow /></a></div>
  </dialog>;
}

export default function DesignGallery() {
  const [intro, setIntro] = useState(true);
  const [menu, setMenu] = useState(false);
  const [filter, setFilter] = useState("All work");
  const [expanded, setExpanded] = useState(false);
  const [selected, setSelected] = useState<GalleryProject | null>(null);
  const [tool, setTool] = useState(0);
  const [motionPaused, setMotionPaused] = useState(false);
  const [forceIntro, setForceIntro] = useState(false);
  const [copied, setCopied] = useState(false);
  const copyTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const done = useCallback(() => setIntro(false), []);
  useEffect(() => {
    const previous = document.documentElement.style.scrollbarGutter;
    document.documentElement.style.scrollbarGutter = "stable";
    return () => { document.documentElement.style.scrollbarGutter = previous; };
  }, []);
  useEffect(() => {
    if (!intro) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, [intro]);
  useEffect(() => () => { if (copyTimeout.current) clearTimeout(copyTimeout.current); }, []);
  useEffect(() => {
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    const change = () => setMotionPaused(preference.matches);
    change(); preference.addEventListener("change", change);
    return () => preference.removeEventListener("change", change);
  }, []);
  useGalleryMotion(motionPaused, intro);
  const replay = () => {
    history.replaceState(null, "", location.pathname + location.search);
    window.scrollTo({ top: 0, behavior: "instant" });
    setForceIntro(true); setIntro(true);
  };
  const filtered = galleryProjects.filter((item) => filter === "All work" || item.category === filter);
  const visible = expanded ? filtered : filtered.slice(0, 6);
  const selectedTool = galleryTools[tool];
  const copyEmail = async () => {
    try { await navigator.clipboard.writeText(profile.email); setCopied(true); copyTimeout.current = setTimeout(() => setCopied(false), 2500); }
    catch { location.href = `mailto:${profile.email}`; }
  };

  return <div className="dg-root dg-v2" data-motion={motionPaused ? "paused" : "playing"} data-entered={!intro}>
    <StudioEntrance active={intro} onDone={done} forceMotion={forceIntro}>
      <header className="dg-nav"><a className="dg-brand" href="#about" aria-label="Titu Jeshurun, back to top">titu<span>®</span><small>THE DESIGN GALLERY</small></a><nav aria-label="Gallery navigation" className={menu ? "is-open" : ""}>{navigation.map(([id, label]) => <a key={id} href={`#${id}`} onClick={() => setMenu(false)}>{label}</a>)}</nav><a className="dg-hire" href="#contact">Let’s create <Arrow /></a><button className="dg-motion-control" onClick={() => setMotionPaused(!motionPaused)} aria-label={motionPaused ? "Resume page motion" : "Pause page motion"} aria-pressed={motionPaused}>{motionPaused ? "▶" : "Ⅱ"}</button><button className="dg-menu" onClick={() => setMenu(!menu)} aria-expanded={menu} aria-label="Toggle gallery menu">{menu ? "Close −" : "Menu +"}</button></header>
      <main id="main">
        <AboutScene motionPaused={motionPaused} replay={replay} />

        <section id="tools" className="dg-tools dg-section dg-scene"><div className="dg-section-top"><p className="dg-eyebrow">02 / THE MAKING OF</p><span>THE TOOLS CHANGE. THE CURIOSITY DOESN’T.</span></div><div className="dg-heading-row"><h2>MY CREATIVE<br /><em>TOOLBOX.</em></h2><p>From the first rough layer<br />to the final frame.</p></div><div className="dg-tool-workspace"><div className="dg-tool-tabs" role="tablist" aria-label="Creative tools">{galleryTools.map((item, index) => <button key={item.mark} id={`tool-${index}`} role="tab" aria-selected={tool === index} aria-controls="tool-panel" tabIndex={tool === index ? 0 : -1} onKeyDown={(event) => { if (["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) { event.preventDefault(); const next = event.key === "Home" ? 0 : event.key === "End" ? 4 : (tool + (event.key === "ArrowRight" ? 1 : 4)) % 5; setTool(next); document.getElementById(`tool-${next}`)?.focus(); } }} onClick={() => setTool(index)} style={{ "--tool-color": item.color } as CSSProperties}><b>{item.mark}</b><span>{item.name}</span><small>0{index + 1}</small></button>)}</div><div className="dg-tool-panel" id="tool-panel" role="tabpanel" aria-labelledby={`tool-${tool}`} style={{ "--tool-color": selectedTool.color } as CSSProperties}><div className="dg-tool-art" aria-hidden="true"><span className="dg-tool-orbit dg-tool-orbit-one"/><span className="dg-tool-orbit dg-tool-orbit-two"/><span className="dg-tool-file">untitled_idea.psd</span><div className="dg-tool-selection"><b>{selectedTool.mark}</b><i /><i /><i /><i /></div><span className="dg-cursor-label">Titu’s playground ↖</span></div><div><p className="dg-eyebrow">ADOBE CREATIVE SUITE</p><h3>{selectedTool.name}</h3><p>{selectedTool.description}</p><div className="dg-proficiency"><span>{selectedTool.level}</span><b>{selectedTool.value}%</b></div><div className="dg-proficiency-track"><span style={{ width: `${selectedTool.value}%` }} /></div></div></div></div></section>

        <section id="projects" className="dg-projects dg-section dg-scene">
          <MuseumScene />
          <div id="project-collection" className="dg-project-collection">
          <div className="dg-work-lettering" aria-hidden="true"><span>SELEC</span><span>TED.</span><small>THE CREATIVE ARCHIVE / 01—26</small></div>
          <div className="dg-section-top"><p className="dg-eyebrow">03 / THE WORK</p><span>A COLLECTION, NOT JUST A PORTFOLIO.</span></div>
          <div className="dg-heading-row"><h2>GOOD IDEAS.<br /><span className="dg-outline">REAL IMPACT.</span></h2><div><p>Film worlds, first impressions, and identities.<br />A few things I’ve put my heart into.</p><span className="dg-handwritten">Pinned here. Made out there. ↙</span></div></div>
          <div className="dg-filters" aria-label="Filter projects">{categories.map((category) => <button key={category} aria-pressed={filter === category} onClick={() => { setFilter(category); setExpanded(false); }}>{category}<span>{category === "All work" ? galleryProjects.length : galleryProjects.filter(item => item.category === category).length}</span></button>)}</div>
          <div className="dg-thread-lead" aria-hidden="true"><span className="dg-pin dg-thread-hub"/><svg className="dg-pin-strings" viewBox="0 0 1000 120" preserveAspectRatio="none">{visible.slice(0,3).map((project,index)=><path key={project.id} className="dg-thread-desktop" d={`M70 15L${[167,500,833][index]} 110`}/>)}{visible.slice(0,2).map((project,index)=><path key={project.id} className="dg-thread-mobile" d={`M70 15L${[250,750][index]} 110`}/>)}</svg></div>
          <div className="dg-project-grid" aria-live="polite">{visible.map((project, index) => <button key={project.id} className="dg-project" onClick={() => setSelected(project)} style={{ "--tilt": `${index % 3 === 0 ? -2 : index % 3 === 1 ? 1.5 : -.7}deg` } as CSSProperties}>
            <span className="dg-pin" aria-hidden="true" /><span className="dg-project-image">{project.image ? <img src={project.image} alt={project.title} loading="lazy" decoding="async" /> : <span className="dg-motion-poster"><b>PLAY<br />THE IDEA.</b><span>{project.title}</span></span>}<span className="dg-project-open">{project.category === "Motion" ? "▶ VIEW MOTION" : "VIEW PROJECT ↗"}</span></span><span className="dg-project-meta">{project.category}<span>{project.year}</span></span><h3>{project.title}</h3><span className="dg-project-client">{project.client}</span>
          </button>)}</div>
          {filtered.length > 6 && <button className="dg-all-work" onClick={() => setExpanded(!expanded)}>{expanded ? "A little less" : `Explore all ${filtered.length} projects`} <span>{expanded ? "−" : "+"}</span></button>}
          <div className="dg-stats">{[["50+", "PROJECTS COMPLETED"], ["15+", "HAPPY CLIENTS"], ["5+", "YEARS OF CREATING"], ["98%", "CLIENT SATISFACTION"]].map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}</div>
          </div>
        </section>

        <section id="reviews" className="dg-reviews dg-section dg-scene"><ReviewBackdrop /><div className="dg-section-top"><p className="dg-eyebrow">04 / THE GOOD WORD</p><span>CREATIVE WORK IS ALWAYS A COLLABORATION.</span></div><h2>GOOD PEOPLE.<br /><em>GREAT ENERGY.</em></h2><div className="dg-review-stage"><ReviewDecorations /><div className="dg-review-sun" aria-hidden="true">✳</div><img className="dg-review-person" src={asset("titu-review.webp")} width="1151" height="1366" alt="Titu Jeshurun in profile" loading="lazy" /><span className="dg-review-scribble dg-handwritten">This part means a lot. ♡</span>{testimonials.map((review, index) => <figure className={`dg-quote dg-quote-${index + 1}`} key={review.name}><div className="dg-quote-top"><span>CLIENT NOTES / 0{index + 1}</span><b>“</b></div><blockquote>{review.quote}</blockquote><div className="dg-note-wave" aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /></div><figcaption><span className="dg-avatar">{review.name.split(" ").map(n => n[0]).slice(0, 2).join("")}</span><div><strong>{review.name}</strong><small>{review.role}</small></div><span aria-hidden="true">↗</span></figcaption></figure>)}</div></section>

        <section id="photographs" className="dg-photographs dg-section dg-scene">
          <div className="dg-photo-copy"><p className="dg-eyebrow">05 / THROUGH MY LENS</p><span className="dg-handwritten">Life, in the little things.</span><h2>LESS POSE.<br />MORE <em>LIFE.</em></h2><p>A place for the light, the places, and the moments I don’t want to forget.</p><div className="dg-film-label"><span>35 MM / PERSONAL ARCHIVE</span><b>{photographs.length ? `${photographs.length} FRAMES` : "THE FIRST ROLL IS COMING"}</b></div><p className="dg-photo-note">{photographs.length ? "A growing collection of photographs, seen through my eyes." : "My photographs will live here. A collection in the making."}</p></div>
          <PhotoBoard />
          {photographs.length > 0 && <div className="dg-photo-collection">{photographs.map((photo) => <a key={photo.src} href={photo.src} target="_blank" rel="noreferrer"><img src={photo.src} alt={photo.title} loading="lazy" /><span>{photo.title} {photo.location && ` / ${photo.location}`}</span></a>)}</div>}
        </section>

        <section id="contact" className="dg-contact dg-section dg-scene"><div className="dg-section-top"><p className="dg-eyebrow">06 / YOUR IDEA STARTS HERE</p><span>OPEN FOR CREATIVE COLLABORATIONS</span></div><div className="dg-contact-clock dg-contact-clock-one" aria-hidden="true"><i/><b/></div><div className="dg-contact-clock dg-contact-clock-two" aria-hidden="true"><i/><b/></div><div className="dg-contact-layout"><div className="dg-contact-copy"><div className="dg-me-we-art"><img src={asset("me-we-monochrome.webp")} alt="ME folding into WE, dimensional typography" loading="lazy"/><span className="dg-handwritten">from me, to we.</span></div><p>Good things happen<br />when <em>we</em> create together.</p><div className="dg-socials"><a href={profile.instagram} target="_blank" rel="noreferrer">Instagram ↗</a><a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a><a href={profile.github} target="_blank" rel="noreferrer">GitHub ↗</a></div></div><div className="dg-contact-paper"><span className="dg-pin"/><span className="dg-contact-paperclip" aria-hidden="true"/><span className="dg-paper-holes" aria-hidden="true" /><span className="dg-handwritten">Got a wild idea?</span><h2>LET’S MAKE<br />IT <span>REAL.</span></h2><p>Posters. Films. Brands. Or something<br />we haven’t thought of yet.</p><a className="dg-contact-email" href={`mailto:${profile.email}`}>{profile.email}<Arrow /></a><div className="dg-contact-actions"><a href={`mailto:${profile.email}?subject=Let%E2%80%99s%20create%20something`}>Start a conversation ↗</a><button onClick={copyEmail} aria-live="polite">{copied ? "Copied ✓" : "Copy email ⧉"}</button></div><span className="dg-contact-location">⌖ {profile.location}</span><span className="dg-contact-stamp">LET’S<br />COLLABORATE</span></div></div><footer className="dg-footer"><a href="#about" className="dg-brand">titu<span>®</span></a><span>© {new Date().getFullYear()} TITU JESHURUN B · MADE WITH FEELING.</span><a href="#about">Back to the top ↑</a></footer></section>
      </main>
    </StudioEntrance>
    {selected && <ProjectDialog key={selected.id} project={selected} close={() => setSelected(null)} />}
    <noscript><style>{`.dg-entrance{display:none!important}`}</style><p>This gallery uses JavaScript for the entrance and interactive project collection.</p></noscript>
  </div>;
}




