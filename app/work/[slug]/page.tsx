import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PipelineNav from "@/components/PipelineNav";
import Footer from "@/components/Footer";
import { ArrowLeft } from "@/components/Icons";
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
    <section className="grid gap-3 border-t border-line py-8 sm:grid-cols-[180px_1fr] sm:gap-6" data-reveal="rise">
      <h2 className="mono-meta pt-1 text-accent">{label}</h2>
      <div className="text-[16px] leading-relaxed text-fg-2">{children}</div>
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
      <main id="main" className="col pt-32 pb-16">
        <Link href="/#work" className="mono-meta inline-flex items-center gap-2 hover:text-fg">
          <ArrowLeft size={14} /> Back to work
        </Link>
        <header className="mt-8" data-reveal-group>
          <p className="mono-meta" data-reveal="rise">
            {p.meta}
          </p>
          <h1 className="mt-3 text-[clamp(32px,6vw,52px)] tracking-[-0.03em]" data-reveal="rise">
            {p.title}
          </h1>
          <p className="mt-4 font-serif italic text-[22px] leading-snug text-fg-2" data-reveal="rise">
            {p.outcome}
          </p>
        </header>
        <div className="my-10 overflow-hidden rounded-md border border-line" data-reveal="rise">
          <Image src={p.thumbnail.src} alt={p.thumbnail.alt} width={p.thumbnail.width} height={p.thumbnail.height} priority className="h-auto w-full" />
        </div>

        <Block label="Problem">
          <p>{p.problem}</p>
        </Block>
        <Block label="Design decisions">
          <ul className="flex flex-col gap-2">
            {p.decisions.map((d) => (
              <li key={d} className="flex gap-3">
                <span className="mt-[11px] h-px w-3 shrink-0 bg-line-2" aria-hidden />
                {d}
              </li>
            ))}
          </ul>
        </Block>
        <Block label="Architecture">
          <div className="grid aspect-[16/9] place-items-center rounded-md border border-dashed border-line-2 text-center">
            <p className="mono-meta px-6">[PLACEHOLDER: architecture diagram for {p.title}]</p>
          </div>
        </Block>
        <Block label="Result">
          <p>{p.result}</p>
        </Block>
      </main>
      <Footer />
    </>
  );
}
