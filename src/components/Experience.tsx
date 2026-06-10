import { useState } from "react";
import { timeline } from "../data/site";
import { useReveal } from "../hooks/useReveal";

const INITIAL_VISIBLE = 4;

export function Experience() {
  const r = useReveal<HTMLDivElement>();
  const [expanded, setExpanded] = useState(false);
  const canCollapse = timeline.length > INITIAL_VISIBLE;
  const visible = expanded || !canCollapse
    ? timeline
    : timeline.slice(0, INITIAL_VISIBLE);
  const hiddenCount = timeline.length - INITIAL_VISIBLE;

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

          <div className="lg:col-span-9">
            <ol className="relative pl-6">
              <span
                aria-hidden
                className="absolute left-0 top-2 bottom-2 w-px bg-gradient-to-b from-transparent via-white/[0.12] to-transparent"
              />
              {visible.map((t, i) => {
                const isNewlyRevealed = expanded && i >= INITIAL_VISIBLE;
                return (
                  <li
                    key={t.year + t.role}
                    className={[
                      "relative grid grid-cols-12 gap-6 py-6 md:py-7",
                      isNewlyRevealed ? "animate-fade-up" : "",
                    ].join(" ")}
                    style={
                      isNewlyRevealed
                        ? { animationDelay: `${(i - INITIAL_VISIBLE) * 60}ms` }
                        : undefined
                    }
                  >
                    <span
                      aria-hidden
                      className={[
                        "absolute -left-[3px] top-9 h-1.5 w-1.5 rounded-full ring-4 ring-ink-900",
                        /now\s*$/i.test(t.year) ? "bg-amber" : "bg-accent/80",
                      ].join(" ")}
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
                    {i < visible.length - 1 && (
                      <span
                        aria-hidden
                        className="absolute left-6 right-0 bottom-0 h-px bg-white/[0.04]"
                      />
                    )}
                  </li>
                );
              })}
            </ol>

            {canCollapse && (
              <div className="mt-8 pl-6">
                <button
                  type="button"
                  onClick={() => setExpanded((v) => !v)}
                  aria-expanded={expanded}
                  className="inline-flex items-center gap-2 text-[12px] font-mono uppercase tracking-[0.18em] text-chalk-300 hover:text-accent-soft transition-colors duration-300 ease-soft"
                >
                  <span aria-hidden className="h-px w-8 bg-white/15" />
                  {expanded ? "Show less" : `Show ${hiddenCount} more`}
                  <span
                    aria-hidden
                    className={[
                      "inline-block transition-transform duration-300 ease-soft",
                      expanded ? "rotate-180" : "",
                    ].join(" ")}
                  >
                    ↓
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
