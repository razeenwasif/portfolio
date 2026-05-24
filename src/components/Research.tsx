import { research, type Research as ResearchItem } from "../data/site";
import { useReveal } from "../hooks/useReveal";

export function Research() {
  const r = useReveal<HTMLDivElement>();

  return (
    <section id="research" className="relative py-28 md:py-40">
      <div className="mx-auto max-w-page px-6">
        <div ref={r} className="reveal mb-14 md:mb-20 flex items-end justify-between gap-8">
          <div>
            <p className="eyebrow">Research</p>
            <h2 className="mt-4 font-display font-light text-chalk-50 text-[32px] md:text-[44px] lg:text-[52px] leading-[1.05] tracking-tightish">
              Papers and benchmarks.
            </h2>
          </div>
          <span className="hidden sm:inline-block text-[12px] font-mono text-chalk-400">
            {String(research.length).padStart(2, "0")} / {String(research.length).padStart(2, "0")}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/[0.05] border border-white/[0.05] rounded-tokenLg overflow-hidden">
          {research.map((item, i) => (
            <ResearchCard key={item.index} item={item} delay={i * 80} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ResearchCard({ item, delay }: { item: ResearchItem; delay: number }) {
  const r = useReveal<HTMLDivElement>();
  return (
    <div
      ref={r}
      className="reveal group relative bg-ink-900 p-7 md:p-9 transition-colors duration-500 ease-soft hover:bg-ink-800"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="flex items-center justify-between gap-4">
        <span className="font-mono text-[12px] text-chalk-500 group-hover:text-accent-soft transition-colors duration-500 ease-soft">
          {item.index}
        </span>
        <span className="text-[10px] font-mono uppercase tracking-wider text-chalk-300 px-2.5 py-1 rounded-full border border-white/10 bg-white/[0.02]">
          {item.status}
        </span>
      </div>

      <h3 className="mt-5 font-display font-light text-chalk-50 text-[22px] md:text-[28px] leading-tight tracking-tightish transition-transform duration-500 ease-soft group-hover:-translate-y-0.5">
        {item.title}
      </h3>

      <p className="mt-3 text-[12px] font-mono text-chalk-400">
        {item.venue} · {item.year}
      </p>

      <p className="mt-4 text-[14px] md:text-[15px] text-chalk-300 max-w-prose2 text-balance leading-relaxed">
        {item.summary}
      </p>

      {item.contribution && (
        <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 border-l border-white/10 pl-5">
          {item.contribution.map((c) => (
            <div key={c} className="flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-accent/60" />
              <span className="text-[11px] font-mono uppercase tracking-wider text-chalk-400">
                {c}
              </span>
            </div>
          ))}
        </div>
      )}

      <div className="mt-7 flex flex-wrap gap-3">
        {item.links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-9 items-center gap-2 px-4 rounded-full border border-white/10 text-[11px] font-mono text-chalk-200 transition-all duration-300 hover:bg-white/10 hover:border-accent-soft hover:text-accent-soft whitespace-nowrap"
          >
            {link.label}
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
              <path
                d="M7 17 17 7m0 0H8m9 0v9"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        ))}
      </div>
    </div>
  );
}
