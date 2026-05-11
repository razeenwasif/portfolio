import { timeline } from "../data/site";
import { useReveal } from "../hooks/useReveal";

export function Experience() {
  const r = useReveal<HTMLDivElement>();

  return (
    <section id="experience" className="relative py-28 md:py-40">
      <div className="mx-auto max-w-page px-6">
        <div ref={r} className="reveal grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-3">
            <p className="eyebrow">Experience</p>
            <h2 className="mt-4 font-display font-light text-chalk-50 text-[28px] md:text-[36px] leading-[1.05] tracking-tightish">
              A short rail.
            </h2>
          </div>

          <ol className="lg:col-span-9 relative pl-6">
            <span
              aria-hidden
              className="absolute left-0 top-2 bottom-2 w-px bg-gradient-to-b from-transparent via-white/[0.12] to-transparent"
            />
            {timeline.map((t, i) => (
              <li
                key={t.year + t.role}
                className="relative grid grid-cols-12 gap-6 py-6 md:py-7"
              >
                <span
                  aria-hidden
                  className="absolute -left-[3px] top-9 h-1.5 w-1.5 rounded-full bg-accent/80 ring-4 ring-ink-900"
                />
                <div className="col-span-12 sm:col-span-3 font-mono text-[12px] text-chalk-400 pt-1">
                  {t.year}
                </div>
                <div className="col-span-12 sm:col-span-9">
                  <h3 className="font-display text-[20px] md:text-[24px] text-chalk-50 tracking-tightish">
                    {t.role}{" "}
                    <span className="text-chalk-400 font-sans text-[15px]">
                      · {t.org}
                    </span>
                  </h3>
                  <p className="mt-1.5 text-[14px] text-chalk-300 max-w-prose2">
                    {t.detail}
                  </p>
                </div>
                {i < timeline.length - 1 && (
                  <span
                    aria-hidden
                    className="absolute left-6 right-0 bottom-0 h-px bg-white/[0.04]"
                  />
                )}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
