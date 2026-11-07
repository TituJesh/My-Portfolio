"use client";

import { useEffect, useRef, useState } from "react";
import { galleryProfile as profile, photographs } from "@/data/design-gallery";

const asset = (name: string) => `/design-gallery/${name}`;

export function AboutPoster({ miniature = false }: { miniature?: boolean }) {
  return <div className={`dg-poster-art${miniature ? " dg-poster-mini" : ""}`} aria-hidden={miniature || undefined}>
    <div className="dg-poster-grid" />
    <span className="dg-poster-topline">A CREATIVE MIND / AN ORIGINAL POINT OF VIEW</span>
    <div className="dg-poster-orbit" />
    <span className="dg-poster-shape" />
    <span className="dg-poster-word">VISION</span>
    <span className="dg-poster-side">DESIGN IS A FEELING.</span>
    <img className="dg-about-subject" src={asset("titu-about-cutout.webp")} alt={miniature ? "" : "Titu Jeshurun, illustrated portrait with folded arms"} width="1000" height="1347" fetchPriority={miniature ? "auto" : "high"} />
    <div className="dg-poster-name"><span className="dg-pin" /><span className="dg-handwritten">Titu Jeshurun</span><small>VISUAL STORYTELLER</small></div>
    <span className="dg-poster-footer">EST. 2020 <span>IMAGINATION, IN FULL COLOUR.</span></span>
    <div className="dg-grain" />
  </div>;
}

function MusicVisual({ motionPaused }: { motionPaused: boolean }) {
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [music, setMusic] = useState(false);
  useEffect(() => {
    const node = video.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !motionPaused && !document.hidden) node.play().catch(() => {});
      else node.pause();
    }, { threshold: .25 });
    observer.observe(node);
    const onHidden = () => { if (document.hidden) node.pause(); };
    document.addEventListener("visibilitychange", onHidden);
    return () => { observer.disconnect(); node.pause(); document.removeEventListener("visibilitychange", onHidden); };
  }, [motionPaused]);
  return <div className="dg-listening-room">
    <div className="dg-video-print">
      <span className="dg-tape" />
      <video ref={video} src={asset("face-like-me-visual.mp4")} poster={asset("face-like-me-poster.webp")} muted loop playsInline preload="none" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} aria-label="Animated city walk visual, silent loop" />
      <button className="dg-video-toggle" aria-label={playing ? "Pause city walk video" : "Play city walk video"} onClick={() => { const node = video.current; if (node?.paused) node.play().catch(() => {}); else node?.pause(); }}>{playing ? "Ⅱ" : "▶"}</button>
      <span className="dg-video-caption">somewhere in my own world.</span>
    </div>
    <div className="dg-soundtrack"><span className="dg-handwritten">The soundtrack to my headspace ↙</span><p className="dg-eyebrow">ON REPEAT / AFTER HOURS</p>
      {music ? <iframe title="Face Like Me on Spotify" src={profile.spotify} width="100%" height="152" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" allowFullScreen /> : <button className="dg-music-preview" onClick={() => setMusic(true)}><span className="dg-record" aria-hidden="true"><i /></span><span><small>STUDIO SOUNDTRACK</small><strong>Face Like Me</strong><span>Broken Keo · Spotify</span></span><b aria-hidden="true">▶</b></button>}
      <a className="dg-spotify-link" href={profile.spotifyLink} target="_blank" rel="noreferrer">Open in Spotify ↗</a>
    </div>
  </div>;
}

export function AboutScene({ motionPaused, replay }: { motionPaused: boolean; replay: () => void }) {
  return <section id="about" className="dg-about-v2 dg-scene">
    <div className="dg-about-masthead"><span>01 / THE PERSON BEHIND THE PIXELS</span><span>CHENGALPATTU, INDIA ↗</span></div>
    <div className="dg-about-hero">
      <AboutPoster />
      <div className="dg-about-story">
        <span className="dg-handwritten dg-about-hello">Hey, I’m Titu.</span>
        <h1><span>MADE OF</span><span><em>ideas.</em></span><span>DRIVEN BY</span><span className="dg-title-outline">FEELING.</span></h1>
        <p className="dg-about-lead">Creative multimedia designer.<br />Turning ideas into things you can feel.</p>
        <div className="dg-about-intro"><p>{profile.bio[0]}</p><details><summary>A little more about me <span>+</span></summary>{profile.bio.slice(1).map(p => <p key={p}>{p}</p>)}</details></div>
        <div className="dg-about-actions"><a href="#projects">Explore my work <span>↗</span></a></div>
        <div className="dg-about-services"><span>Creative direction</span><span>Brand identity</span><span>Motion graphics</span><span>Print & digital art</span></div>
      </div>
    </div>
    <div className="dg-about-bottom"><div className="dg-about-margin"><span className="dg-handwritten">A few things that<br />make me, me.</span><div className="dg-mini-note"><span className="dg-pin" /><b>Always curious.<br />Always creating.</b><span>PS. There’s probably music playing.</span></div><button className="dg-replay" onClick={replay}>↻ Replay the studio entrance</button></div><MusicVisual motionPaused={motionPaused} /></div>
  </section>;
}

export function MuseumScene() {
  return <><div className="dg-gallery-threshold dg-scene" aria-hidden="true">
    <svg className="dg-gallery-wires" viewBox="0 0 1200 190" preserveAspectRatio="none"><path d="M0 38 C190 38 150 160 340 185 M1200 27 C1030 27 1110 158 920 190"/><circle cx="150" cy="63" r="3"/><circle cx="1080" cy="63" r="3"/></svg>
    <div className="dg-gallery-caption"><small>FROM THE STUDIO</small><span>Into the frame.</span><i>POSTERS / FILM / IDENTITIES</i></div>
    <div className="dg-gallery-ticket"><span>THE DESIGN GALLERY</span><strong>ADMIT ONE <b>↘</b></strong><small>A CLOSER LOOK AT THE WORK</small><i>NO. 003</i></div>
    <span className="dg-gallery-margin">IDEAS BECOME ART ↓</span>
  </div><div className="dg-museum dg-scene">
    <div className="dg-museum-top-fade" />
    <div className="dg-museum-pattern" />
    <div className="dg-museum-beam" />
    <div className="dg-museum-heading"><span className="dg-handwritten">Echoes beyond the frame</span><h2>ART &<br />HEART.</h2><span>SELECTED WORKS / TITU JESHURUN</span><img src={asset("ornate-gold-frame.webp")} alt="" aria-hidden="true" /></div>
    <a className="dg-museum-art dg-museum-art-one" href="#project-collection"><img className="dg-framed-work" src="/design/ring-meant-to-be.webp" alt="Meant To Be poster" loading="lazy" /><img className="dg-ornament" src={asset("ornate-gold-frame.webp")} alt="" /></a>
    <a className="dg-museum-art dg-museum-art-two" href="#project-collection"><img className="dg-framed-work" src="/design/ring-soa.webp" alt="Singam Onaai Aatukutty film poster" loading="lazy" /><img className="dg-ornament" src={asset("ornate-gold-frame.webp")} alt="" /></a>
    <a className="dg-museum-art dg-museum-art-three" href="#project-collection"><img className="dg-framed-work" src="/design/ring-mission-impossible.webp" alt="Mission Impossible event poster" loading="lazy" /><img className="dg-ornament" src={asset("ornate-gold-frame.webp")} alt="" /></a>
    <img className="dg-golden-echo" src={asset("titu-projects-gold.webp")} alt="" aria-hidden="true" loading="lazy" />
    <img className="dg-golden-subject" src={asset("titu-projects-gold.webp")} alt="Titu in a cinematic golden light with a soft motion trail" loading="lazy" width="1440" height="1092" />
    <div className="dg-museum-bottom"><span className="dg-handwritten">Every frame has a feeling.</span><a href="#project-collection">ENTER THE COLLECTION ↓</a></div><div className="dg-grain" />
  </div></>;
}

export function PhotoBoard() {
  return <div className="dg-photo-table dg-scene" aria-label="Photography scrapbook, ready for Titu’s photograph collection">
    <div className="dg-photo-clipboard"><span className="dg-clipboard-name dg-handwritten">Through my eyes.</span><div className="dg-metal-clip" /><div className="dg-loose-paper dg-loose-paper-one" /><div className="dg-loose-paper dg-loose-paper-two" />
      <div className="dg-film-strip" aria-hidden="true"><i /><i /><i /></div>
      {[0, 1, 2, 3, 4].map((index) => <div className={`dg-photo-print dg-photo-print-${index + 1}`} key={index}>{photographs[index] ? <img src={photographs[index].src} alt={photographs[index].title} loading="lazy" /> : <div className="dg-photo-blank"><span>+</span><small>FRAME 0{index + 1}</small></div>}<span className="dg-handwritten">{photographs[index]?.title || ["the in-between.", "little things.", "chasing light.", "slow days.", "one to remember."][index]}</span></div>)}
      <div className="dg-photo-pen" aria-hidden="true" />
    </div>
    <div className="dg-camera-object" aria-hidden="true"><span>35 mm</span><div className="dg-camera-lens"><i /></div><b /></div>
    <span className="dg-photo-table-note dg-handwritten">A collection in the making. ↖</span>
  </div>;
}

export function ReviewDecorations() {
  return <div className="dg-honey-decoration" aria-hidden="true"><img className="dg-cloud dg-cloud-one" src={asset("honey-cloud.webp")} alt="" loading="lazy" /><img className="dg-cloud dg-cloud-two" src={asset("honey-cloud.webp")} alt="" loading="lazy" /><img className="dg-bee dg-bee-one" src={asset("honey-bee.webp")} alt="" loading="lazy" /><img className="dg-bee dg-bee-two" src={asset("honey-bee.webp")} alt="" loading="lazy" /><img className="dg-bee dg-bee-three" src={asset("honey-bee.webp")} alt="" loading="lazy" /></div>;
}

export function ReviewBackdrop() {
  return <div className="dg-review-backdrop" aria-hidden="true">
    <div className="dg-review-type"><span>GOOD</span><span>WORDS.</span></div>
    <div className="dg-review-lines" />
    <div className="dg-review-vinyl"><i/><span>SIDE A<br/>GOOD ENERGY<br/>33⅓ RPM</span></div>
    <div className="dg-review-session"><span>THE COLLABORATION TAPES</span><b>VOL. 01</b><div><i/><i/></div><small>IDEAS → PEOPLE → SOMETHING REAL</small></div>
    <div className="dg-review-contact-strip"><img src="/design/ring-meant-to-be.webp" alt="" loading="lazy"/><img src="/design/ring-soa.webp" alt="" loading="lazy"/><img src="/design/ring-mission-impossible.webp" alt="" loading="lazy"/></div>
    <span className="dg-review-margin">KEEP THE GOOD ENERGY / PASS IT ON</span>
    <div className="dg-grain" />
  </div>;
}
