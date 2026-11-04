import PipelineNav from "@/components/PipelineNav";
import Hero from "@/components/Hero";
import Section from "@/components/Section";
import WorkGrid from "@/components/WorkGrid";
import Footer from "@/components/Footer";
import CopyEmail from "@/components/CopyEmail";
import DesignerPoster from "@/components/DesignerPoster";
import Skills from "@/components/Skills";
import { ArrowUpRight, GitHub, LinkedIn } from "@/components/Icons";
import { certifications, identities, log, projects, pullQuote, site } from "@/data/content";

export default function Page() {
  return (
    <>
      <PipelineNav />
      <main id="main" className="frame">
        <Hero />

        <Section
          id="about"
          number="01"
          title="About"

        >
          <div className="cell-pad about-story border-b border-line text-[16px] leading-relaxed text-fg-2" data-reveal-group>
            <div className="flex flex-col gap-3.5">
            <p data-reveal="rise">
              I&apos;m Titu, a <strong className="font-medium text-fg">cloud engineer</strong> from Chennai. I work mostly on <span className="font-medium text-accent transition-colors hover:text-fg">AWS</span>, writing infrastructure in <span className="font-medium text-accent transition-colors hover:text-fg">Terraform</span>, packaging services with <span className="font-medium text-accent transition-colors hover:text-fg">Docker</span> and shipping them through <span className="font-medium text-accent transition-colors hover:text-fg">GitHub Actions</span>.
            </p>
            <blockquote className="my-2 border-l-2 border-accent pl-4 font-serif italic text-[clamp(20px,2.6vw,24px)] leading-snug text-fg" data-reveal="rise">
              &ldquo;{pullQuote}&rdquo;
            </blockquote>
            <p data-reveal="rise">
              A lot of my time goes into making sure the systems I run are <strong className="font-medium text-fg">secure</strong>, <strong className="font-medium text-fg">cost-aware</strong> and <strong className="font-medium text-fg">tested on every push</strong>.
            </p>
            <p data-reveal="rise">
              The other half of me designs: five years of <strong className="font-medium text-fg">posters</strong>, <strong className="font-medium text-fg">first-look reveals</strong>, <strong className="font-medium text-fg">reels</strong> and <strong className="font-medium text-fg">logos</strong> for brands and short films.
            </p>
            </div>
            <div className="about-practice" data-reveal="rise">
            {identities.map((it, i) => (
              <details key={it.title} className="about-practice-item">
                <summary className="about-practice-summary">
                  <span className="about-practice-number" aria-hidden="true">0{i + 1}</span>
                  <span className="about-practice-copy"><span className="about-practice-title">{it.title === "Cloud" ? "Engineering" : "Design"}</span><span className="about-practice-lead">{it.lead}</span></span>
                  <span className="about-practice-toggle" aria-hidden="true"><span>Explore</span><span className="about-practice-plus">+</span></span>
                </summary>
                <p className="about-practice-description">{it.description}</p>
              </details>
            ))}
            </div>
          </div>
        </Section>

        <Section id="skills" number="02" title="Skills">
          <Skills />
        </Section>

        <Section id="work" number="03" title="Projects" count={projects.length}>
          <WorkGrid projects={projects} />
        </Section>

        <Section id="log" number="04" title="Work Experience">
          <ol className="experience-list" data-reveal-group>
            {log.map((e) => (
              <li key={e.title} className="experience-item" data-reveal="rise">
                <span className="experience-marker" aria-hidden="true"><span /></span>
                <article className="experience-card">
                  <div className="experience-header"><span className="experience-date">{e.when}</span></div>
                  <h3>{e.title}</h3>
                  <p className="experience-place">{e.where}</p>
                  <ul className="experience-bullets">
                    {e.bullets.map((b, k) => (
                      <li key={k}>
                        <span aria-hidden="true">—</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </article>
              </li>
            ))}
          </ol>
          <div className="certifications-heading cell-pad">
            <span>Certifications</span><span>{String(certifications.length).padStart(2, "0")} / COMPLETED</span>
          </div>
          <ul className="certifications-list" data-reveal-group>
            {certifications.map((c, i) => (
              <li key={c.name} className="certification-row" data-reveal="rise">
                <span className="certification-icon" aria-hidden="true">
                  <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3 14 4l2.2-.2 1 2 2 .9-.2 2.3 1 2-1 2 .2 2.3-2 .9-1 2L14 18l-2 1-2-1-2.2.2-1-2-2-.9.2-2.3-1-2 1-2-.2-2.3 2-.9 1-2L10 4z" /><path d="m9 11 2 2 4-4M8.5 18l-1 3 4.5-2 4.5 2-1-3" /></svg>
                </span>
                <div className="certification-copy"><span className="certification-issuer">{c.issuer}</span><h3>{c.name}</h3></div>
                <span className="certification-index" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="contact" number="05" title="Contact">
          <div className="contact-studio">
            <div className="contact-kicker"><span /> OPEN FOR THE NEXT CHAPTER <span className="contact-location">CHENNAI / INDIA</span></div>
            <div className="contact-intro">
              <h3>Good things start<br />with <em>a hello.</em></h3>
              <p>{site.availability}. Have a cloud challenge or a creative brief? Let’s talk.</p>
            </div>
            <div className="contact-email-row">
              <div><span className="contact-label">DROP ME A LINE</span><a className="contact-address" href={`mailto:${site.email}`}>{site.email}<ArrowUpRight size={22} /></a></div>
              <CopyEmail email={site.email} label="Copy email" className="contact-copy" />
            </div>
            <div className="contact-bottom"><span>Find me elsewhere</span><div>{[{ href: site.github, label: "GitHub", Icon: GitHub }, { href: site.linkedin, label: "LinkedIn", Icon: LinkedIn }].map(({ href, label, Icon }) => <a key={label} href={href} target="_blank" rel="me noreferrer"><Icon size={15} />{label}<ArrowUpRight size={12} /></a>)}</div></div>
          </div>
        </Section>

        <DesignerPoster />
      </main>
      <Footer />
    </>
  );
}
