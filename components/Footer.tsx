import { site } from "@/data/content";

export default function Footer() {
  return (
    <footer className="col py-10">
      <p className="mono-meta flex flex-wrap items-center gap-x-2 gap-y-1 border-t border-line pt-6">
        <span>Deployed on {site.deployHost}</span>
        <span className="text-fg-3">·</span>
        <span>{site.version}</span>
        <span className="text-fg-3">·</span>
        <span>
          © {site.year} {site.name}
        </span>
      </p>
    </footer>
  );
}
