import PipelineNav from "@/components/PipelineNav";
import Hero from "@/components/Hero";
import Section from "@/components/Section";
import WorkGrid from "@/components/WorkGrid";
import Footer from "@/components/Footer";
import CopyEmail from "@/components/CopyEmail";
import Testimonials from "@/components/Testimonials";
import DesignerPoster from "@/components/DesignerPoster";
import { Calendar, GitHub, LinkedIn } from "@/components/Icons";
import { bio, certifications, identities, log, now, projects, pullQuote, site, stack, testimonials } from "@/data/content";

export default function Page() {
  return (
    <>
      <PipelineNav />
      <main id="main" className="frame">
        <Hero />

        <Section id="index" number="01" title="Index">
          <div className="cell-pad flex flex-col gap-3 border-b border-line text-[16px] leading-relaxed" data-reveal-group>
            <p data-reveal="rise">{bio[0]}</p>
            <blockquote className="my-2 border-l-2 border-accent pl-4 font-serif italic text-[clamp(20px,2.6vw,24px)] leading-snug text-fg" data-reveal="rise">
              {pullQuote}
            </blockquote>
            {bio.slice(1).map((line, i) => (
              <p key={i} data-reveal="rise">
                {line}
              </p>
            ))}
          </div>

          <div className="cell-pad flex items-baseline justify-between border-b border-line py-2">
            <span className="mono-meta">Right now</span>
            <span className="mono-meta text-fg-3">{now.asOf}</span>
          </div>
          <dl data-reveal-group>
            {now.items.map((it) => (
              <div key={it.label} className="grid gap-1 border-b border-line sm:grid-cols-[150px_1fr]" data-reveal="rise">
                <dt className="mono-meta cell-pad pb-0 text-accent sm:border-r sm:border-line sm:pb-4">{it.label}</dt>
                <dd className="cell-pad pt-1 text-[15px] sm:pt-4">{it.text}</dd>
              </div>
            ))}
          </dl>
          <div className="grid sm:grid-cols-2" data-reveal-group>
            {identities.map((it, i) => (
              <div key={it.title} className={`cell-pad flex flex-col gap-3 border-b border-line ${i === 0 ? "sm:border-r" : ""}`} data-reveal="rise">
                <h3 className="text-[17px]">{it.title}</h3>
                <p className="font-serif italic text-[20px] leading-snug text-fg-2">{it.lead}</p>
                <ul className="mt-1 flex flex-col gap-2 text-[14.5px] text-fg-2">
                  {it.points.map((pt, k) => (
                    <li key={k} className="flex gap-3">
                      <span className="mt-[11px] h-px w-3 shrink-0 bg-line-2" aria-hidden />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        <Section id="work" number="02" title="Work" count={projects.length}>
          <WorkGrid projects={projects} />
        </Section>

        <Section id="stack" number="03" title="Stack">
          <dl className="grid sm:grid-cols-2" data-reveal-group>
            {stack.map((g, i) => (
              <div key={g.group} className={`cell-pad flex flex-col gap-2 border-b border-line ${i % 2 === 0 ? "sm:border-r" : ""}`} data-reveal="rise">
                <dt className="mono-meta">{g.group}</dt>
                <dd className="flex flex-wrap gap-x-4 gap-y-1 text-[14.5px]">
                  {g.items.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section id="log" number="04" title="Log">
          <ol data-reveal-group>
            {log.map((e) => (
              <li key={e.title} className="grid border-b border-line sm:grid-cols-[150px_1fr]" data-reveal="rise">
                <span className="mono-meta cell-pad pb-0 text-accent sm:border-r sm:border-line sm:pb-4">{e.when}</span>
                <div className="cell-pad">
                  <h3 className="text-[16px]">{e.title}</h3>
                  <p className="text-[13.5px] text-fg-2">{e.where}</p>
                  <ul className="mt-2 flex flex-col gap-1 text-[14px] text-fg-2">
                    {e.bullets.map((b, k) => (
                      <li key={k} className="flex gap-3">
                        <span className="mt-[10px] h-px w-3 shrink-0 bg-line-2" aria-hidden />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
          <p className="mono-meta cell-pad border-b border-line py-2">Certifications</p>
          <ul className="grid sm:grid-cols-2" data-reveal-group>
            {certifications.map((c, i) => (
              <li key={c.name} className={`cell-pad flex flex-col gap-0.5 border-b border-line ${i % 2 === 0 ? "sm:border-r" : ""}`} data-reveal="rise">
                <span className="text-[14px]">{c.name}</span>
                <span className="mono-meta text-fg-3">{c.issuer}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="words" number="05" title="Words" count={testimonials.length}>
          <Testimonials items={testimonials} source={site.gallery} />
        </Section>

        <Section id="contact" number="06" title="Contact">
          <div className="cell-pad border-b border-line py-10">
            <h3 className="font-serif italic text-[clamp(30px,6vw,52px)] leading-[1.05]" data-reveal="rise">
              Let&rsquo;s build something that ships.
            </h3>
            <p className="mt-4 max-w-[46ch] text-[15px] text-fg-2" data-reveal="rise">
              {site.availability}. Cloud and DevOps work, a poster for your film, or a conversation.
            </p>
            <div className="mt-7 flex flex-wrap gap-3" data-reveal="rise">
              <CopyEmail email={site.email} className="pill-btn" solid />
              <a className="pill-btn" href={site.linkedin} rel="me noreferrer">
                <Calendar /> Reach out on LinkedIn
              </a>
            </div>
          </div>
          <ul className="grid grid-cols-2" data-reveal-group>
            {[
              { href: site.github, label: "GitHub", Icon: GitHub },
              { href: site.linkedin, label: "LinkedIn", Icon: LinkedIn },
            ].map(({ href, label, Icon }, i) => (
              <li key={label} className={`${i === 0 ? "border-r border-line" : ""}`} data-reveal="rise">
                <a href={href} rel="me noreferrer" className="cell-pad flex items-center justify-center gap-2 text-[14px] transition-colors hover:bg-bg-2">
                  <Icon className="text-fg-3" /> {label}
                </a>
              </li>
            ))}
          </ul>
        </Section>

        <DesignerPoster />
      </main>
      <Footer />
    </>
  );
}
