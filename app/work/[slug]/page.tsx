import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PipelineNav from "@/components/PipelineNav";
import Footer from "@/components/Footer";
import { ArrowLeft, ArrowUpRight } from "@/components/Icons";
import { projects } from "@/data/content";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) return {};
  return { title: p.title, description: p.outcome, alternates: { canonical: `/work/${p.slug}` }, openGraph: { title: p.title, description: p.outcome, url: `/work/${p.slug}` } };
}

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className="grid border-b border-line sm:grid-cols-[160px_1fr]" data-reveal="rise">
      <h2 className="mono-meta cell-pad pb-0 text-accent sm:border-r sm:border-line sm:pb-4">{label}</h2>
      <div className="cell-pad text-[15.5px] leading-relaxed text-fg-2">{children}</div>
    </section>
  );
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) notFound();

  return (
    <>
      <PipelineNav home={false} />
      <main id="main" className="frame pt-20">
        <div className="cell-pad flex items-center justify-between border-b border-line py-3">
          <Link href="/#work" className="mono-meta inline-flex items-center gap-2 hover:text-fg">
            <ArrowLeft size={14} /> Back to work
          </Link>
          <a href={p.repo} rel="noreferrer" className="mono-meta inline-flex items-center gap-1 hover:text-fg">
            Repository <ArrowUpRight size={14} />
          </a>
        </div>
        <header className="cell-pad border-b border-line py-8" data-reveal-group>
          <p className="mono-meta" data-reveal="rise">
            {p.meta} · {p.status}
          </p>
          <h1 className="mt-3 text-[clamp(32px,6vw,52px)] tracking-[-0.03em]" data-reveal="rise">
            {p.title}
          </h1>
          <p className="mt-3 font-serif italic text-[22px] leading-snug text-fg-2" data-reveal="rise">
            {p.outcome}
          </p>
        </header>
        {p.architecture.image?.src !== p.thumbnail.src ? (
          <div className="border-b border-line p-4 sm:p-5" data-reveal="rise">
            <div className="overflow-hidden rounded-md border border-line bg-bg-2">
              <Image src={p.thumbnail.src} alt={p.thumbnail.alt} width={p.thumbnail.width} height={p.thumbnail.height} priority className="h-auto w-full" />
            </div>
          </div>
        ) : null}

        <Block label="Problem">
          <p>{p.problem}</p>
        </Block>
        <Block label="Design decisions">
          <ul className="flex flex-col gap-2">
            {p.decisions.map((d, i) => (
              <li key={i} className="flex gap-3">
                <span className="mt-[11px] h-px w-3 shrink-0 bg-line-2" aria-hidden />
                {d}
              </li>
            ))}
          </ul>
        </Block>
        <Block label="Architecture">
          {p.architecture.image ? (
            <div className="mb-4 overflow-hidden rounded-md border border-line bg-white">
              <Image src={p.architecture.image.src} alt={p.architecture.image.alt} width={p.architecture.image.width} height={p.architecture.image.height} className="h-auto w-full" />
            </div>
          ) : null}
          <dl className="grid gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-2">
            {p.architecture.components.map((c) => (
              <div key={c.name} className="bg-bg px-3 py-2.5">
                <dt className="text-[14px] text-fg">{c.name}</dt>
                <dd className="mono-meta text-fg-3">{c.role}</dd>
              </div>
            ))}
          </dl>
        </Block>
        <Block label="Result">
          <p>{p.result}</p>
        </Block>
      </main>
      <Footer />
    </>
  );
}
