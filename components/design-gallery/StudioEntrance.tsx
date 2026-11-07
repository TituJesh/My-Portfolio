"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import "../../app/design-gallery/entrance.css";

type Point = number[];
// Exact planar homography; CSS matrix decomposition would drift at the corners.
function projection(from: Point[], to: Point[]) {
  const rows: number[][] = [];
  from.forEach(([x,y],i) => {
    const [u,v] = to[i];
    rows.push([x,y,1,0,0,0,-u*x,-u*y,u],[0,0,0,x,y,1,-v*x,-v*y,v]);
  });
  for (let col=0; col<8; col++) {
    let pivot=col;
    for (let row=col+1;row<8;row++) if (Math.abs(rows[row][col])>Math.abs(rows[pivot][col])) pivot=row;
    [rows[col],rows[pivot]]=[rows[pivot],rows[col]];
    const divisor=rows[col][col];
    for(let k=col;k<9;k++) rows[col][k]/=divisor;
    for(let row=0;row<8;row++) if(row!==col) {
      const factor=rows[row][col];
      for(let k=col;k<9;k++) rows[row][k]-=factor*rows[col][k];
    }
  }
  const [a,b,c,d,e,f,g,h]=rows.map(row=>row[8]);
  return `matrix3d(${a},${d},0,${g},${b},${e},0,${h},0,0,1,0,${c},${f},0,1)`;
}
const ease=(value:number)=>{ const t=Math.max(0,Math.min(1,value)); return t*t*(3-2*t); };
const mix=(from:Point[],to:Point[],t:number)=>from.map(([x,y],i)=>[x+(to[i][0]-x)*t,y+(to[i][1]-y)*t]);

export default function StudioEntrance({ active, children, onDone, forceMotion=false }: { active:boolean; children:ReactNode; onDone:()=>void; forceMotion?:boolean }) {
  const scene=useRef<HTMLDivElement>(null);
  const image=useRef<HTMLImageElement>(null);
  const page=useRef<HTMLDivElement>(null);
  const overlay=useRef<HTMLDivElement>(null);
  const [ready,setReady]=useState(false);
  const [phase,setPhase]=useState("overhead");
  useEffect(()=>{
    if(!active) return;
    if(!forceMotion && matchMedia("(prefers-reduced-motion: reduce)").matches) { onDone(); return; }
    window.scrollTo({top:0,behavior:"instant"});
    setPhase("overhead");
    if(image.current?.complete && image.current.naturalWidth) setReady(true);
    const safety=setTimeout(onDone,14000);
    return ()=>clearTimeout(safety);
  },[active,forceMotion,onDone]);
  useEffect(()=>{
    if(!active || !ready || !scene.current || !page.current) return;
    const node=scene.current, livePage=page.current;
    const rect=node.getBoundingClientRect();
    // Inner glass corners measured in the original 1122 x 1402 photograph.
    // No second trapezoid clip: the page and desk share the same geometry.
    const glass=[[241,98],[874,98],[810,350],[312,350]].map(([x,y])=>[x/1122*rect.width,y/1402*rect.height]);
    const screen=glass.map(([x,y])=>[rect.left+x,rect.top+y]);
    const width=overlay.current?.clientWidth || innerWidth,height=innerHeight;
    const viewport=[[0,0],[width,0],[width,height],[0,height]];
    const monitorPageHeight=width/(16/9);
    const pageHeight=Math.max(height,monitorPageHeight);
    livePage.style.height=`${pageHeight}px`;
    const frontWidth=Math.min(width*.86,height*1.52),frontHeight=frontWidth/(16/9);
    const left=(width-frontWidth)/2,top=(height-frontHeight)/2;
    const straight=[[left,top],[left+frontWidth,top],[left+frontWidth,top+frontHeight],[left,top+frontHeight]];
    const paint=(corners:Point[],contentHeight:number)=>{
      node.style.transform=projection(glass,corners.map(([x,y])=>[x-rect.left,y-rect.top]));
      // Reveal more of the real page as the monitor opens into a tall viewport,
      // instead of stretching a whole portrait page into a landscape display.
      livePage.style.transform=projection([[0,0],[width,0],[width,contentHeight],[0,contentHeight]],corners);
      livePage.style.clipPath=`inset(0 0 ${Math.max(0,pageHeight-contentHeight)}px 0)`;
      livePage.style.visibility="visible";
    };
    paint(screen,monitorPageHeight);
    const start=performance.now();
    let frame=0,currentPhase="overhead";
    const tick=(now:number)=>{
      const elapsed=now-start;
      // 0-.35s overhead; .35-1.7s pan/straighten; 1.7-2.85s viewport fit;
      // final .15s identity hold. The real page is never replaced or enlarged past 1:1.
      const fit=ease((elapsed-1700)/1150);
      paint(elapsed<1700 ? mix(screen,straight,ease((elapsed-350)/1350)) : mix(straight,viewport,fit),monitorPageHeight+(height-monitorPageHeight)*fit);
      const nextPhase=elapsed<350?"overhead":elapsed<1700?"approaching":elapsed<2850?"entering":"arrived";
      if(nextPhase!==currentPhase) {currentPhase=nextPhase;setPhase(nextPhase);}
      overlay.current?.style.setProperty("--intro-chrome",String(1-ease((elapsed-2200)/400)));
      if(elapsed>=3000) onDone(); else frame=requestAnimationFrame(tick);
    };
    frame=requestAnimationFrame(tick);
    const finishOnResize=()=>onDone();
    window.addEventListener("resize",finishOnResize,{once:true});
    return ()=>{
      cancelAnimationFrame(frame);
      window.removeEventListener("resize",finishOnResize);
      livePage.style.transform="";livePage.style.visibility="";livePage.style.height="";livePage.style.clipPath="";node.style.transform="";
      overlay.current?.style.removeProperty("--intro-chrome");
    };
  },[active,ready,onDone]);
  return <div className={active?"dg-entrance dg-studio-v3":"dg-studio-complete"} ref={overlay} data-phase={phase}>
    {active && <><div className="dg-studio-ambient"/><div className="dg-desk" ref={scene}><img ref={image} src="/design-gallery/desk-entry.webp" width="1122" height="1402" alt="Top-down view of Titu’s desk, approaching the monitor" fetchPriority="high" onLoad={()=>setReady(true)} onError={onDone}/></div></>}
    <div ref={page} className="dg-live-page" inert={active || undefined}>{children}</div>
    {active && <><div className="dg-entrance-top"><span>TJ® / INSIDE THE CREATIVE ROOM</span><button onClick={onDone}>Skip intro ↗</button></div><div className="dg-entrance-bottom"><span>{phase==="overhead"?"01 / EVERY IDEA STARTS HERE.":phase==="approaching"?"02 / A CHANGE IN PERSPECTIVE.":"03 / WELCOME TO MY WORLD."}</span><span className="dg-camera-progress"><i className={ready?"is-running":""}/></span><span>{phase==="overhead"?"LOOK AROUND":phase==="approaching"?"MOVING CLOSER":"STEP INSIDE"} <span className="dg-loading-dot">●</span></span></div></>}
  </div>;
}
