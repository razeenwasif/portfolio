import { useState } from "react";
import { Link } from "react-router-dom";
import { projects, type Project } from "../data/site";
import { useReveal } from "../hooks/useReveal";

const INITIAL_VISIBLE = 4;

export function Projects() {
  const r = useReveal<HTMLDivElement>();
  const [expanded, setExpanded] = useState(false);
  const canCollapse = projects.length > INITIAL_VISIBLE;
  const visible = expanded || !canCollapse
    ? projects
    : projects.slice(0, INITIAL_VISIBLE);
  const hiddenCount = projects.length - INITIAL_VISIBLE;

  return (
    <section id="work" className="relative py-28 md:py-40">
      <div className="mx-auto max-w-page px-6">
        <div ref={r} className="reveal mb-14 md:mb-20 flex items-end justify-between gap-8">
          <div>
            <p className="eyebrow">Selected work</p>
            <h2 className="mt-4 font-display font-light text-chalk-50 text-[32px] md:text-[44px] lg:text-[52px] leading-[1.05] tracking-tightish">
              A small set, picked carefully.
            </h2>
          </div>
          <span className="hidden sm:inline-block text-[12px] font-mono text-chalk-400">
            {String(visible.length).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
          </span>
        </div>

        <ul className="space-y-3">
          {visible.map((p, i) => (
            <ProjectRow
              key={p.index}
              project={p}
              delay={i * 60}
              fadeIn={expanded && i >= INITIAL_VISIBLE}
              fadeDelay={(i - INITIAL_VISIBLE) * 60}
            />
          ))}
        </ul>

        {canCollapse && (
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              aria-expanded={expanded}
              className="inline-flex items-center gap-3 text-[12px] font-mono uppercase tracking-[0.18em] text-chalk-300 hover:text-accent-soft transition-colors duration-300 ease-soft"
            >
              <span aria-hidden className="h-px w-10 bg-white/15" />
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
              <span aria-hidden className="h-px w-10 bg-white/15" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

function ProjectRow({
  project,
  delay,
  fadeIn,
  fadeDelay,
}: {
  project: Project;
  delay: number;
  fadeIn?: boolean;
  fadeDelay?: number;
}) {
  const r = useReveal<HTMLLIElement>();

  const inner = (
    <div className="grid grid-cols-12 items-baseline gap-6 p-6 md:p-8">
      <span className="col-span-1 font-mono text-[12px] text-chalk-500 group-hover:text-accent-soft transition-colors duration-500 ease-soft">
        {project.index}
      </span>

      <div className="col-span-12 sm:col-span-7 md:col-span-6">
        <h3 className="font-display font-light text-chalk-50 text-[24px] md:text-[34px] lg:text-[40px] leading-tight tracking-tightish transition-transform duration-500 ease-soft group-hover:-translate-y-0.5 group-hover:text-accent-soft">
          {project.title}
        </h3>
        <p className="mt-2 text-[14px] md:text-[15px] text-chalk-300 max-w-prose2 text-balance leading-relaxed">
          {project.summary}
        </p>

        {project.insights && (
          <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 border-l border-white/10 pl-5 group-hover:border-accent/40 transition-colors duration-500 ease-soft">
            {project.insights.map((insight) => (
              <div key={insight} className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-accent/60" />
                <span className="text-[11px] font-mono uppercase tracking-wider text-chalk-400">
                  {insight}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="col-span-12 sm:col-span-3 md:col-span-3 flex flex-wrap gap-1.5 sm:justify-start">
        {project.stack.map((t) => (
          <span
            key={t}
            className="text-[11px] text-chalk-300 px-2.5 py-1 rounded-full border border-white/[0.07] bg-white/[0.02]"
          >
            {t}
          </span>
        ))}
      </div>

      <div className="col-span-12 sm:col-span-1 md:col-span-2 flex flex-col sm:items-end justify-center gap-4">
        <div className="text-[12px] font-mono text-chalk-400">
          {project.year}
        </div>
        <div className="flex flex-wrap sm:justify-end gap-3">
          {project.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
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
    </div>
  );

  const panelClasses = [
    "block group relative rounded-tokenLg border border-white/[0.06] bg-white/[0.015]",
    "transition-all duration-500 ease-soft",
    project.slug
      ? "cursor-pointer hover:bg-white/[0.035] hover:border-accent/35 hover:shadow-[0_0_0_1px_rgba(139,124,246,0.18),0_18px_60px_-22px_rgba(139,124,246,0.45)]"
      : "",
  ].join(" ");

  return (
    <li
      ref={r}
      className={["reveal", fadeIn ? "animate-fade-up" : ""].join(" ")}
      style={
        fadeIn
          ? { animationDelay: `${fadeDelay ?? 0}ms` }
          : { transitionDelay: `${delay}ms` }
      }
    >
      {project.slug ? (
        <Link
          to={`/work/${project.slug}`}
          className={panelClasses}
          aria-label={`Open details for ${project.title}`}
        >
          {inner}
        </Link>
      ) : (
        <div className={panelClasses}>{inner}</div>
      )}
    </li>
  );
}
