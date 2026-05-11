import { site } from "../data/site";
import { useReveal } from "../hooks/useReveal";

export function Hero() {
  const r1 = useReveal<HTMLDivElement>();
  const r2 = useReveal<HTMLDivElement>();

  return (
    <section
      id="top"
      className="relative isolate overflow-hidden pt-40 pb-28 md:pt-56 md:pb-40"
    >
      {/* Subtle gradient orb — single, off-center */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -right-24 h-[520px] w-[520px] rounded-full opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, rgba(139,124,246,0.35), rgba(139,124,246,0) 60%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -left-20 h-[420px] w-[420px] rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(94,77,209,0.25), rgba(94,77,209,0) 60%)",
        }}
      />
      {/* Faint top-down vignette */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.02) 0%, rgba(0,0,0,0) 50%)",
        }}
      />

      <div className="relative mx-auto max-w-page px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-end">
          <div ref={r1} className="reveal lg:col-span-8">
            <p className="eyebrow mb-7">
              <span className="inline-block h-1 w-1 rounded-full bg-accent align-middle mr-2" />
              {site.location} · Available for select work
            </p>

            <h1 className="font-display font-light text-chalk-50 text-balance leading-[0.95] tracking-tighter2 text-[44px] sm:text-[68px] md:text-[88px] lg:text-[104px]">
              {site.name}.
            </h1>

            <p className="mt-8 max-w-prose2 text-[17px] md:text-[19px] leading-relaxed text-chalk-300 text-balance">
              <span className="text-chalk-100">{site.role}</span> — {site.tagline}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a href="#work" className="btn-primary">
                See selected work
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M5 12h14m0 0-6-6m6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
              <a href="#contact" className="btn-ghost">
                Contact
              </a>
            </div>
          </div>

          {/* Floating glass info panel — offset, asymmetric */}
          <div
            ref={r2}
            className="reveal lg:col-span-4 lg:translate-y-2"
            style={{ transitionDelay: "120ms" }}
          >
            <div className="glass p-6 md:p-7 relative">
              <div
                aria-hidden
                className="absolute -top-px left-6 right-6 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
              />

              <div className="flex items-center justify-between">
                <p className="eyebrow">Currently</p>
                <span className="inline-flex items-center gap-1.5 text-[11px] text-chalk-300">
                  <span className="relative inline-flex h-1.5 w-1.5">
                    <span className="absolute inset-0 rounded-full bg-accent opacity-60 animate-ping" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
                  </span>
                  Online
                </span>
              </div>

              <p className="mt-4 text-[15px] text-chalk-100 leading-snug text-balance">
                Building <span className="text-accent-soft">neuro-symbolic</span>{" "}
                systems and shipping a feedback platform with ANU.
              </p>

              <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-3 text-[12px]">
                <Stat k="Focus" v="ML · Systems" />
                <Stat k="Stack" v="PyTorch · CUDA" />
                <Stat k="Based" v="Canberra" />
                <Stat k="Open to" v="Grad roles" />
              </div>
            </div>
          </div>
        </div>

        {/* Hairline marquee under hero */}
        <div className="mt-24 md:mt-36 flex items-center gap-6 text-[11px] uppercase tracking-[0.22em] text-chalk-500">
          <span>Selected work</span>
          <span className="h-px flex-1 bg-white/[0.06]" />
          <span>2020 — 2026</span>
        </div>
      </div>
    </section>
  );
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-baseline justify-between border-b border-white/[0.05] pb-2 last:border-0">
      <span className="text-chalk-400">{k}</span>
      <span className="font-mono text-chalk-100">{v}</span>
    </div>
  );
}
