import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/data/content";
import { ArrowUpRight } from "./Icons";

export default function WorkGrid({ projects }: { projects: Project[] }) {
  return (
    <ul className="grid sm:grid-cols-3" data-reveal-group>
      {projects.map((p, i) => (
        <li key={p.slug} className={`border-b border-line ${i < projects.length - 1 ? "sm:border-r" : ""}`} data-reveal="rise">
          <Link href={`/work/${p.slug}`} className="work-card group flex h-full flex-col gap-3 p-4 transition-colors hover:bg-bg-2 sm:p-5">
            <div className="work-thumb overflow-hidden rounded-md border border-line bg-bg-2">
              <Image src={p.thumbnail.src} alt={p.thumbnail.alt} width={p.thumbnail.width} height={p.thumbnail.height} className="aspect-[16/10] h-auto w-full object-cover" />
            </div>
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="text-[17px] group-hover:text-accent">{p.title}</h3>
              <ArrowUpRight className="shrink-0 text-fg-3" />
            </div>
            <p className="mono-meta -mt-1">{p.meta}</p>
            <p className="text-[14px] text-fg-2">{p.outcome}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
