import { site } from "@/data/content";

export default function Footer() {
  return (
    <footer className="frame">
      <div className="hatch" aria-hidden />
      <p className="mono-meta cell-pad flex flex-wrap items-center gap-x-2 gap-y-1 py-5">
        <span>Deployed on {site.deployHost}</span>
        <span className="text-fg-3">·</span>
        <span>{site.version}</span>
        <span className="text-fg-3">·</span>
        <span>
          © {site.year} {site.fullName}
        </span>
      </p>
    </footer>
  );
}
