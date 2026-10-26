import Link from "next/link";
import PipelineNav from "@/components/PipelineNav";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <PipelineNav home={false} />
      <main id="main" className="frame min-h-screen-dvh flex flex-col justify-center">
        <div className="cell-pad py-24">
          <p className="mono-meta text-accent">404</p>
          <h1 className="mt-3 text-[clamp(32px,6vw,52px)] tracking-[-0.03em]">Nothing deployed here.</h1>
          <p className="mt-4 font-serif italic text-[22px] text-fg-2">The route you asked for does not exist.</p>
          <Link href="/" className="pill-btn mt-8" data-variant="solid">
            Back home
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
