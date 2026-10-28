"use client";

import { useEffect, useState } from "react";
import { site } from "@/data/content";

type Day = { date: string; count: number; level: number };
type Payload = { total: Record<string, number>; contributions: Day[] };

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const fmt = new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric" });

// Last year of GitHub contributions, fetched on the client. Renders nothing if the request fails.
export default function Contributions() {
  const [data, setData] = useState<Payload | null>(null);
  const [failed, setFailed] = useState(false);

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

  if (failed) return null;

  const days = data?.contributions ?? [];
  const total = data ? Object.values(data.total).reduce((a, b) => a + b, 0) : 0;
  const weeks: (Day | null)[][] = [];
  if (days.length) {
    let col: (Day | null)[] = Array(new Date(days[0].date).getDay()).fill(null);
    for (const d of days) {
      col.push(d);
      if (col.length === 7) {
        weeks.push(col);
        col = [];
      }
    }
    if (col.length) weeks.push(col);
  }
  const cols = weeks.length || 53;
  const labels: { idx: number; text: string }[] = [];
  let last = -1;
  weeks.forEach((w, i) => {
    const d = w.find(Boolean);
    if (!d) return;
    const m = new Date(d.date).getMonth();
    if (m !== last) {
      // the window starts mid-month, so the first label can sit a column or two before the next one and overlap it;
      // a month with fewer than three week columns gives way to the month after it
      const prev = labels[labels.length - 1];
      if (prev && i - prev.idx < 3) labels.pop();
      labels.push({ idx: i, text: MONTHS[m] });
      last = m;
    }
  });

  return (
    <div className="cell-pad border-b border-line">
      <p className="mono-meta mb-3">GitHub contributions</p>
      <div className="overflow-x-auto">
        <div className="contrib" data-ready={!!data} style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
          {labels.map((l) => (
            <span key={l.idx} className="contrib-month" style={{ gridColumnStart: l.idx + 1 }}>
              {l.text}
            </span>
          ))}
          {(weeks.length ? weeks : Array.from({ length: 53 }, () => Array<null>(7).fill(null))).map((w, i) => (
            <div key={i} className="contrib-col" style={{ gridColumnStart: i + 1 }}>
              {w.map((d, j) => (
                <i key={j} data-level={d ? d.level : 0} title={d ? `${d.count} on ${d.date}` : undefined} />
              ))}
            </div>
          ))}
        </div>
      </div>
      <p className="mono-meta mt-3 text-fg-3">
        {data ? `${total.toLocaleString()} contributions, ${fmt.format(new Date(days[0].date))} to ${fmt.format(new Date(days[days.length - 1].date))}.` : "Loading…"}{" "}
        <a className="hover:text-fg" href={site.github} rel="noreferrer">
          Source: GitHub.
        </a>
      </p>
    </div>
  );
}
