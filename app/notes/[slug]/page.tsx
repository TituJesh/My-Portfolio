import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PipelineNav from "@/components/PipelineNav";
import Footer from "@/components/Footer";
import { ArrowLeft } from "@/components/Icons";
import { notes } from "@/data/content";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return notes.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const n = notes.find((x) => x.slug === slug);
  if (!n) return {};
  return { title: n.title, alternates: { canonical: `/notes/${n.slug}` } };
}

export default async function NotePage({ params }: Params) {
  const { slug } = await params;
  const n = notes.find((x) => x.slug === slug);
  if (!n) notFound();
  const date = new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "long", year: "numeric" }).format(new Date(n.date));

  return (
    <>
      <PipelineNav home={false} />
      <main id="main" className="col pt-32 pb-16">
        <Link href="/#notes" className="mono-meta inline-flex items-center gap-2 hover:text-fg">
          <ArrowLeft size={14} /> Back to notes
        </Link>
        <header className="mt-8" data-reveal-group>
          <p className="mono-meta" data-reveal="rise">
            <time dateTime={n.date}>{date}</time> · {n.readTime} read
          </p>
          <h1 className="mt-3 text-[clamp(32px,6vw,52px)] tracking-[-0.03em]" data-reveal="rise">
            {n.title}
          </h1>
        </header>
        <article className="mt-10 flex flex-col gap-5 border-t border-line pt-8 text-[17px] leading-relaxed text-fg-2" data-reveal="rise">
          <p>[PLACEHOLDER: note body. Replace this with the actual writing for &ldquo;{n.title}&rdquo;.]</p>
          <p>[PLACEHOLDER: second paragraph.]</p>
        </article>
      </main>
      <Footer />
    </>
  );
}
