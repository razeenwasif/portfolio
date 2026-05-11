import { projects, type Project } from "../data/site";
import { useReveal } from "../hooks/useReveal";

export function Projects() {
  const r = useReveal<HTMLDivElement>();

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
            {String(projects.length).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
          </span>
        </div>

        <ul className="divide-y divide-white/[0.06] border-y border-white/[0.06]">
          {projects.map((p, i) => (
            <ProjectRow key={p.index} project={p} delay={i * 60} />
          ))}
        </ul>
      </div>
    </section>
  );
}

function ProjectRow({ project, delay }: { project: Project; delay: number }) {
  const r = useReveal<HTMLLIElement>();
  return (
    <li
      ref={r}
      className="reveal group relative"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <a
        href={project.links[0]?.href ?? "#"}
        className="grid grid-cols-12 items-baseline gap-6 py-7 md:py-9 px-2 -mx-2 rounded-tokenLg transition-colors duration-500 ease-soft hover:bg-white/[0.02]"
      >
        <span className="col-span-1 font-mono text-[12px] text-chalk-500 group-hover:text-accent-soft transition-colors duration-500 ease-soft">
          {project.index}
        </span>

        <div className="col-span-12 sm:col-span-7 md:col-span-6">
          <h3 className="font-display font-light text-chalk-50 text-[24px] md:text-[34px] lg:text-[40px] leading-tight tracking-tightish transition-transform duration-500 ease-soft group-hover:-translate-y-0.5">
            {project.title}
          </h3>
          <p className="mt-2 text-[14px] md:text-[15px] text-chalk-300 max-w-prose2 text-balance">
            {project.summary}
          </p>
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

        <div className="col-span-12 sm:col-span-1 md:col-span-2 flex sm:justify-end items-center gap-3 text-[12px] font-mono text-chalk-400">
          <span>{project.year}</span>
          <span
            aria-hidden
            className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-white/10 text-chalk-200 transition-all duration-500 ease-soft group-hover:border-accent/50 group-hover:text-accent-soft group-hover:translate-x-0.5"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <path
                d="M7 17 17 7m0 0H8m9 0v9"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      </a>
    </li>
  );
}
