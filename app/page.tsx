import Link from "next/link";
import PipelineNav from "@/components/PipelineNav";
import Hero from "@/components/Hero";
import Section from "@/components/Section";
import WorkList from "@/components/WorkList";
import Footer from "@/components/Footer";
import { Calendar, GitHub, LinkedIn, Mail, XLogo } from "@/components/Icons";
import { bio, identities, notes, projects, site, stack } from "@/data/content";

const dateFmt = new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric" });

export default function Page() {
  return (
    <>
      <PipelineNav />
      <main id="main">
        <Hero />

        <Section id="index" number="01" title="Index">
          <div className="flex flex-col gap-1 text-[17px] leading-relaxed" data-reveal-group>
            {bio.map((line, i) => (
              <p key={i} data-reveal="rise">
                {line}
              </p>
            ))}
          </div>
          <div className="mt-10 grid gap-8 sm:grid-cols-2" data-reveal-group>
            {identities.map((it) => (
              <div key={it.title} className="flex flex-col gap-3" data-reveal="rise">
                <h3 className="text-[18px]">{it.title}</h3>
                <p className="font-serif italic text-[20px] leading-snug text-fg-2">{it.lead}</p>
                <ul className="mt-1 flex flex-col gap-1.5 text-[15px] text-fg-2">
                  {it.points.map((pt, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="mt-[11px] h-px w-3 shrink-0 bg-line-2" aria-hidden />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        <Section id="work" number="02" title="Work">
          <WorkList projects={projects} />
        </Section>

        <Section id="stack" number="03" title="Stack">
          <dl className="flex flex-col divide-y divide-line border-y border-line" data-reveal-group>
            {stack.map((g) => (
              <div key={g.group} className="grid gap-2 py-4 sm:grid-cols-[180px_1fr] sm:gap-6" data-reveal="rise">
                <dt className="mono-meta pt-1">{g.group}</dt>
                <dd className="flex flex-wrap gap-x-5 gap-y-1 text-[15px]">
                  {g.items.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section id="notes" number="04" title="Notes">
          <ul className="flex flex-col divide-y divide-line border-y border-line" data-reveal-group>
            {notes.map((n) => (
              <li key={n.slug} data-reveal="rise">
                <Link href={`/notes/${n.slug}`} className="group flex items-baseline justify-between gap-4 py-4">
                  <span className="text-[16px] group-hover:text-accent">{n.title}</span>
                  <span className="mono-meta flex shrink-0 gap-3">
                    <time dateTime={n.date}>{dateFmt.format(new Date(n.date))}</time>
                    <span className="text-fg-3">{n.readTime}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="contact" number="05" title="Contact">
          <h3 className="font-serif italic text-[clamp(30px,6vw,52px)] leading-[1.05] text-fg" data-reveal="rise">
            Let&rsquo;s build something that ships.
          </h3>
          <div className="mt-8 flex flex-wrap gap-3" data-reveal-group>
            <a className="pill-btn" data-variant="solid" href={`mailto:${site.email}`} data-reveal="rise">
              <Mail /> {site.email}
            </a>
            <a className="pill-btn" href={site.calendarUrl} data-reveal="rise">
              <Calendar /> Book a call
            </a>
          </div>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[14px]" data-reveal-group>
            <li data-reveal="rise">
              <a className="inline-flex items-center gap-2 text-fg-2 hover:text-fg" href={site.social.github} rel="me noreferrer">
                <GitHub /> GitHub
              </a>
            </li>
            <li data-reveal="rise">
              <a className="inline-flex items-center gap-2 text-fg-2 hover:text-fg" href={site.social.linkedin} rel="me noreferrer">
                <LinkedIn /> LinkedIn
              </a>
            </li>
            <li data-reveal="rise">
              <a className="inline-flex items-center gap-2 text-fg-2 hover:text-fg" href={site.social.x} rel="me noreferrer">
                <XLogo /> X
              </a>
            </li>
          </ul>
        </Section>
      </main>
      <Footer />
    </>
  );
}
