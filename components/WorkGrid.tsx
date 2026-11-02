import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/data/content";
import { ArrowUpRight } from "./Icons";

export default function WorkGrid({ projects }: { projects: Project[] }) {
  return (
    <ul className="project-collection" data-reveal-group>
      {projects.map((p, i) => (
        <li key={p.slug} className="project-entry" data-reveal="rise">
          <Link href={`/work/${p.slug}`} className="project-link work-card">
            <div className="project-topline"><span>PROJECT <span className="project-index">/ 0{i + 1}</span></span><span className="project-status"><span aria-hidden="true" />{p.status}</span></div>
            <div className="project-info">
              <div className="project-title-row">
                <h3>{p.title}</h3>
              </div>
              <p className="project-outcome">{p.outcome}</p>
              <div className="project-footer"><span className="project-meta-label">BUILT WITH</span><span>{p.meta}</span></div>
              <span className="project-view">Explore project <span className="project-arrow"><ArrowUpRight size={16} /></span></span>
            </div>
            <div className="project-art work-thumb">
              <Image src={p.thumbnail.src} alt={p.thumbnail.alt} width={p.thumbnail.width} height={p.thumbnail.height} className="project-image" />
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
