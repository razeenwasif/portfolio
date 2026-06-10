import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import type { ProjectDetail, ProjectSection } from "../data/site";
import { useReveal } from "../hooks/useReveal";

type DetailProps = {
  eyebrow: string;
  title: string;
  summary: string;
  stack?: string[];
  links: { label: string; href: string }[];
  detail?: ProjectDetail;
  backTo: string;
  backLabel: string;
  contributions?: string[];
  venue?: string;
};

export function Detail(props: DetailProps) {
  const { slug } = useParams<{ slug: string }>();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [slug]);

  if (!props.detail) {
    return <ComingSoon {...props} />;
  }

  return <DetailLayout {...props} detail={props.detail} />;
}

function ComingSoon(props: DetailProps) {
  return (
    <section className="relative py-40 md:py-56">
      <div className="mx-auto max-w-page px-6">
        <BackLink to={props.backTo} label={props.backLabel} />
        <p className="eyebrow mt-12">{props.eyebrow}</p>
        <h1 className="mt-4 font-display font-light text-chalk-50 text-[40px] md:text-[64px] leading-[1.05] tracking-tightish">
          {props.title}
        </h1>
        {props.venue && (
          <p className="mt-4 text-[13px] font-mono text-chalk-400">{props.venue}</p>
        )}
        <p className="mt-6 max-w-prose2 text-[15px] md:text-[16px] text-chalk-300 leading-relaxed">
          {props.summary}
        </p>
        <div className="mt-12 rounded-tokenLg border border-white/[0.06] bg-white/[0.02] p-8">
          <p className="eyebrow">Detail page</p>
          <p className="mt-3 text-[15px] text-chalk-200">
            Long-form write-up coming soon. In the meantime, see the links below.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {props.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 items-center gap-2 px-4 rounded-full border border-white/10 text-[11px] font-mono text-chalk-200 transition-all duration-300 hover:bg-white/10 hover:border-accent-soft hover:text-accent-soft"
              >
                {l.label}
                <Arrow />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function DetailLayout(props: DetailProps & { detail: ProjectDetail }) {
  const { detail } = props;
  const heroRef = useReveal<HTMLDivElement>();
  const overviewRef = useReveal<HTMLDivElement>();
  const statsRef = useReveal<HTMLDivElement>();
  const galleryRef = useReveal<HTMLDivElement>();

  return (
    <article className="relative">
      {/* Hero */}
      <section className="pt-32 md:pt-40 pb-16 md:pb-24">
        <div className="mx-auto max-w-page px-6">
          <BackLink to={props.backTo} label={props.backLabel} />
          <div ref={heroRef} className="reveal mt-12">
            <p className="eyebrow">{props.eyebrow}</p>
            <h1 className="mt-4 font-display font-light text-chalk-50 text-[40px] md:text-[64px] lg:text-[76px] leading-[1.02] tracking-tightish">
              {props.title}
            </h1>
            {props.venue && (
              <p className="mt-4 text-[13px] font-mono text-chalk-400">{props.venue}</p>
            )}
            <p className="mt-6 max-w-prose2 text-[17px] md:text-[19px] text-chalk-200 leading-relaxed text-balance">
              {detail.tagline}
            </p>

            {props.contributions && props.contributions.length > 0 && (
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 border-l border-accent/40 pl-5">
                {props.contributions.map((c) => (
                  <div key={c} className="flex items-center gap-2">
                    <span className="h-1 w-1 rounded-full bg-accent/60" />
                    <span className="text-[11px] font-mono uppercase tracking-wider text-chalk-300">
                      {c}
                    </span>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-10 flex flex-wrap gap-3">
              {props.links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 items-center gap-2 px-5 rounded-full border border-white/10 text-[12px] font-mono text-chalk-100 transition-all duration-300 hover:bg-white/10 hover:border-accent-soft hover:text-accent-soft"
                >
                  {l.label}
                  <Arrow />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-16 md:py-24 border-t border-white/[0.06]">
        <div className="mx-auto max-w-page px-6">
          <div ref={overviewRef} className="reveal grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-3">
              <p className="eyebrow">Overview</p>
            </div>
            <div className="lg:col-span-9 space-y-5 max-w-prose2">
              {detail.overview.map((para, i) => (
                <p
                  key={i}
                  className="text-[15px] md:text-[16px] text-chalk-200 leading-relaxed"
                >
                  {para}
                </p>
              ))}

              {props.stack && props.stack.length > 0 && (
                <div className="pt-4 flex flex-wrap gap-1.5">
                  {props.stack.map((t) => (
                    <span
                      key={t}
                      className="text-[11px] text-chalk-300 px-2.5 py-1 rounded-full border border-white/[0.07] bg-white/[0.02]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      {detail.stats && detail.stats.length > 0 && (
        <section className="py-16 md:py-20 border-t border-white/[0.06]">
          <div className="mx-auto max-w-page px-6">
            <div
              ref={statsRef}
              className="reveal grid grid-cols-2 md:grid-cols-4 gap-px bg-white/[0.05] border border-white/[0.05] rounded-tokenLg overflow-hidden"
            >
              {detail.stats.map((s) => (
                <div key={s.label} className="bg-ink-900 p-6 md:p-7">
                  <p className="eyebrow">{s.label}</p>
                  <p className="mt-3 font-display font-light text-chalk-50 text-[28px] md:text-[34px] leading-none tracking-tightish tabular-nums">
                    {s.value}
                  </p>
                  {s.sub && (
                    <p className="mt-2 text-[12px] text-chalk-400">{s.sub}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Sections */}
      {detail.sections.map((section, i) => (
        <SectionBlock key={`${section.eyebrow}-${i}`} section={section} />
      ))}

      {/* Gallery */}
      {detail.gallery && detail.gallery.length > 0 && (
        <section className="py-16 md:py-24 border-t border-white/[0.06]">
          <div className="mx-auto max-w-page px-6">
            <div ref={galleryRef} className="reveal grid grid-cols-1 lg:grid-cols-12 gap-10">
              <div className="lg:col-span-3">
                <p className="eyebrow">Gallery</p>
                <h2 className="mt-4 font-display font-light text-chalk-50 text-[28px] md:text-[36px] leading-[1.05] tracking-tightish">
                  Selected images.
                </h2>
              </div>
              <div className="lg:col-span-9 grid grid-cols-1 gap-6">
                {detail.gallery.map((img) => (
                  <figure
                    key={img.src}
                    className="rounded-tokenLg overflow-hidden border border-white/[0.06] bg-white/[0.02]"
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      loading="lazy"
                      className="block w-full h-auto"
                    />
                    {img.caption && (
                      <figcaption className="px-5 md:px-6 py-4 text-[13px] text-chalk-300 leading-relaxed border-t border-white/[0.06]">
                        {img.caption}
                      </figcaption>
                    )}
                  </figure>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Footer / next-up */}
      <section className="py-20 md:py-28 border-t border-white/[0.06]">
        <div className="mx-auto max-w-page px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <Link
            to={props.backTo}
            className="text-[13px] text-chalk-200 hairline border rounded-token px-4 py-2 transition-all duration-300 ease-soft hover:border-white/20 hover:bg-white/[0.03]"
          >
            ← Back to {props.backLabel}
          </Link>
          <Link
            to="/#contact"
            className="text-[13px] text-chalk-100 hairline border rounded-token px-4 py-2 transition-all duration-300 ease-soft hover:border-white/20 hover:bg-white/[0.03]"
          >
            Get in touch →
          </Link>
        </div>
      </section>
    </article>
  );
}

function SectionBlock({ section }: { section: ProjectSection }) {
  const r = useReveal<HTMLDivElement>();
  return (
    <section className="py-16 md:py-24 border-t border-white/[0.06]">
      <div className="mx-auto max-w-page px-6">
        <div ref={r} className="reveal grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-3">
            <p className="eyebrow">{section.eyebrow}</p>
            <h2 className="mt-4 font-display font-light text-chalk-50 text-[28px] md:text-[36px] leading-[1.05] tracking-tightish">
              {section.title}
            </h2>
          </div>
          <div className="lg:col-span-9 max-w-prose2 space-y-5">
            {section.body.map((para, i) => (
              <p
                key={i}
                className="text-[15px] md:text-[16px] text-chalk-200 leading-relaxed"
              >
                {para}
              </p>
            ))}
            {section.bullets && section.bullets.length > 0 && (
              <ul className="mt-6 border-l border-white/10 pl-5 space-y-2.5">
                {section.bullets.map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-3 text-[13px] md:text-[14px] text-chalk-300 leading-relaxed"
                  >
                    <span className="mt-2 h-1 w-1 rounded-full bg-accent/60 shrink-0" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function BackLink({ to, label }: { to: string; label: string }) {
  return (
    <Link
      to={to}
      className="inline-flex items-center gap-2 text-[12px] font-mono text-chalk-400 hover:text-chalk-100 transition-colors"
    >
      <span>←</span> {label}
    </Link>
  );
}

function Arrow() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
      <path
        d="M7 17 17 7m0 0H8m9 0v9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
