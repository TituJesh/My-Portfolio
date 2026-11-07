"use client";

import { useEffect } from "react";

// Bounds are read once per input event. The short settling tail writes only
// transforms through CSS variables and never renders React on scroll.
export function useGalleryMotion(paused: boolean, intro: boolean) {
  useEffect(() => {
    const root=document.querySelector<HTMLElement>(".dg-root");
    if(!root || intro) return;
    const scenes=[...root.querySelectorAll<HTMLElement>(".dg-scene")];
    const active=new Set<HTMLElement>();
    const values=new Map<HTMLElement,{current:number;target:number}>();
    let frame=0,dirty=true,lastTime=0;
    const update=(now:number)=>{
      frame=0;
      if(paused || document.hidden) return;
      if(dirty) {
        const measurements=[...active].map(scene=>{
          const bounds=scene.getBoundingClientRect();
          // The opening scene starts at zero so its layers don't jump when the
          // camera hands control back to scrolling.
          const progress=scene.id==="about" ? Math.max(0,Math.min(1,scrollY/bounds.height)) : Math.max(-1,Math.min(1,(innerHeight/2-bounds.top-bounds.height/2)/((innerHeight+bounds.height)/2)));
          return [scene,progress] as const;
        });
        measurements.forEach(([scene,target])=>{
          const value=values.get(scene);
          if(value) value.target=target; else values.set(scene,{current:target,target});
        });
        dirty=false;
      }
      const factor=1-Math.exp(-Math.min(40,now-(lastTime || now-16))/80);
      lastTime=now;
      let settling=false;
      active.forEach(scene=>{
        const value=values.get(scene);
        if(!value) return;
        value.current+=(value.target-value.current)*factor;
        if(Math.abs(value.target-value.current)>.0005) settling=true;
        scene.style.setProperty("--scene-progress",value.current.toFixed(4));
      });
      if(settling) frame=requestAnimationFrame(update);
    };
    const schedule=()=>{dirty=true;if(!frame&&!paused)frame=requestAnimationFrame(update);};
    const sceneObserver=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        const scene=entry.target as HTMLElement;
        scene.classList.toggle("dg-in-view",entry.isIntersecting);
        if(entry.isIntersecting)active.add(scene);else active.delete(scene);
      });
      schedule();
    },{threshold:0,rootMargin:"80px 0px"});
    scenes.forEach(scene=>sceneObserver.observe(scene));
    const revealSelector=".dg-section-top,.dg-heading-row,.dg-tool-workspace,.dg-project,.dg-quote,.dg-contact-paper,.dg-photo-print,.dg-about-story>*,.dg-listening-room,.dg-museum-heading,.dg-reviews>h2,.dg-photo-copy>*,.dg-contact-copy>p,.dg-contact-copy>.dg-socials";
    const revealTargets=new Set<HTMLElement>();
    const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{
      if(entry.isIntersecting){entry.target.classList.add("dg-arrived");revealObserver.unobserve(entry.target);}
    }),{threshold:.08});
    const registerReveals=()=>{
      root.querySelectorAll<HTMLElement>(revealSelector).forEach((element,index)=>{
        if(revealTargets.has(element))return;
        revealTargets.add(element);
        element.style.setProperty("--reveal-delay",`${(index%3)*100}ms`);
        if(paused)return;
        // Keep the live screen's content visible through the intro handoff.
        const bounds=element.getBoundingClientRect();
        element.classList.add("dg-v2-reveal");
        if(bounds.top<innerHeight && bounds.bottom>0)element.classList.add("dg-arrived");
        else revealObserver.observe(element);
      });
    };
    registerReveals();
    // Project filters and "all projects" insert new cards after initial mount.
    const mutationObserver=new MutationObserver(()=>{registerReveals();schedule();});
    const grid=root.querySelector(".dg-project-grid");
    if(grid)mutationObserver.observe(grid,{childList:true});
    const resizeObserver=new ResizeObserver(schedule);
    scenes.forEach(scene=>resizeObserver.observe(scene));
    window.addEventListener("scroll",schedule,{passive:true});
    window.addEventListener("resize",schedule);
    document.addEventListener("visibilitychange",schedule);
    return ()=>{
      cancelAnimationFrame(frame);
      sceneObserver.disconnect();revealObserver.disconnect();mutationObserver.disconnect();resizeObserver.disconnect();
      window.removeEventListener("scroll",schedule);window.removeEventListener("resize",schedule);document.removeEventListener("visibilitychange",schedule);
      scenes.forEach(scene=>{scene.classList.remove("dg-in-view");scene.style.removeProperty("--scene-progress");});
      revealTargets.forEach(element=>element.classList.remove("dg-v2-reveal","dg-arrived"));
    };
  },[paused,intro]);
}
