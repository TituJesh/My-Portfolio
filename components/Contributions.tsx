"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/data/content";
import { ArrowUpRight, ChevronDown, GitHub } from "./Icons";

type Day = { date: string; count: number; level: number };
type Payload = { total: Record<string, number>; contributions: Day[] };

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const fmt = new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric" });

export default function Contributions() {
  const [data, setData] = useState<Payload | null>(null);
  const [failed, setFailed] = useState(false);
  const [open, setOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const moveGradient = (pointer: PointerEvent) => {
      if (pointer.pointerType !== "mouse") return;
      const rect = card.getBoundingClientRect();
      const x = Math.max(0, Math.min(rect.width, pointer.clientX - rect.left));
      const y = Math.max(0, Math.min(rect.height, pointer.clientY - rect.top));
      card.style.setProperty("--pointer-x", `${x}px`);
      card.style.setProperty("--pointer-y", `${y}px`);
    };
    window.addEventListener("pointermove", moveGradient);
    return () => window.removeEventListener("pointermove", moveGradient);
  }, []);

  useEffect(() => {
    const ctrl = new AbortController();
    fetch(`https://github-contributions-api.jogruber.de/v4/${site.githubHandle}?y=last`, { signal: ctrl.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((j: Payload) => setData(j))
      .catch((e: unknown) => {
        if (e instanceof DOMException && e.name === "AbortError") return;
        setFailed(true);
      });
    return () => ctrl.abort();
  }, []);

  const days = data?.contributions ?? [];
  const total = days.reduce((sum, day) => sum + day.count, 0);
  const weeks: (Day | null)[][] = [];
  if (days.length) {
    let col: (Day | null)[] = Array(new Date(`${days[0].date}T12:00:00`).getDay()).fill(null);
    for (const day of days) {
      col.push(day);
      if (col.length === 7) { weeks.push(col); col = []; }
    }
    if (col.length) weeks.push([...col, ...Array<null>(7 - col.length).fill(null)]);
  }
  const cols = weeks.length || 53;
  const labels: { idx: number; text: string }[] = [];
  let last = -1;
  weeks.forEach((week, idx) => {
    const day = week.find(Boolean);
    if (!day) return;
    const month = new Date(`${day.date}T12:00:00`).getMonth();
    if (month !== last) {
      const prev = labels[labels.length - 1];
      if (prev && idx - prev.idx < 3) labels.pop();
      labels.push({ idx, text: MONTHS[month] });
      last = month;
    }
  });

  return (
    <div className="activity-card" ref={cardRef}>
      <button type="button" className="activity-heading activity-toggle" aria-expanded={open} aria-controls="activity-details" onClick={() => setOpen(!open)}>
        <div><p className="activity-eyebrow"><span /> THE BUILD JOURNAL</p><h2>Small commits. <em>Steady progress.</em></h2></div>
        <div className="activity-toggle-end"><div className="activity-total"><strong>{data ? total.toLocaleString() : "—"}</strong><span>contributions / past year</span></div><ChevronDown size={16} className={open ? "activity-chevron is-open" : "activity-chevron"} /></div>
      </button>
      {!open && data && <div className="activity-preview"><span>Recent activity</span><div className="activity-preview-tiles" aria-label="Most recent 14 days of GitHub activity">{days.slice(-14).map((day) => <i key={day.date} className="contrib-mini-tile" data-level={day.level} title={`${day.count} contributions on ${day.date}`} />)}</div><span>View year <span aria-hidden>↗</span></span></div>}
      <div id="activity-details" hidden={!open}>
      <div className="activity-graph" role="img" aria-label={data ? `${total} GitHub contributions in the past year. Activity heatmap.` : failed ? "GitHub activity unavailable" : "Loading GitHub activity"}>
        <div className="contrib" data-ready={!!data} style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
          {labels.filter((l) => l.idx < cols - 2).map((l) => <span key={l.idx} className="contrib-month" style={{ gridColumnStart: l.idx + 1 }}>{l.text}</span>)}
          {(weeks.length ? weeks : Array.from({ length: 53 }, () => Array<null>(7).fill(null))).map((w, i) => (
            <div key={i} className="contrib-col" style={{ gridColumnStart: i + 1 }}>
              {w.map((d, j) => <i key={j} data-level={d ? d.level : 0} style={!d && data ? { visibility: "hidden" } : undefined} title={d ? `${d.count} contributions on ${fmt.format(new Date(`${d.date}T12:00:00`))}` : undefined} />)}
            </div>
          ))}
        </div>
      </div>
      </div>
      {!data && <p className="activity-state" role="status">{failed ? "Activity couldn’t load. You can still explore my GitHub below." : "Fetching the latest activity…"}</p>}
      <div className="activity-footer">
        <a href={site.github} target="_blank" rel="noreferrer"><GitHub size={14} />@{site.githubHandle}<ArrowUpRight size={12} /></a>
        {open && <div className="activity-legend" aria-label="Contribution intensity from less to more"><span>Less</span>{[0, 1, 2, 3, 4].map(level => <i key={level} data-level={level} />)}<span>More</span></div>}
      </div>
    </div>
  );
}
