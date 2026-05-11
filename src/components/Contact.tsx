import { site } from "../data/site";
import { useReveal } from "../hooks/useReveal";

export function Contact() {
  const r = useReveal<HTMLDivElement>();

  return (
    <section id="contact" className="relative py-28 md:py-40">
      <div className="mx-auto max-w-page px-6">
        <div ref={r} className="reveal relative">
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-x-10 -top-10 -bottom-10 -z-10 opacity-50 blur-3xl"
            style={{
              background:
                "radial-gradient(60% 50% at 50% 50%, rgba(139,124,246,0.18), rgba(0,0,0,0) 70%)",
            }}
          />

          <p className="eyebrow">Contact</p>

          <h2 className="mt-4 font-display font-light text-chalk-50 text-[40px] sm:text-[64px] md:text-[88px] leading-[0.95] tracking-tighter2 text-balance">
            Let's make
            <br />
            something
            <span className="text-accent-soft"> sharp.</span>
          </h2>

          <div className="mt-12 flex flex-col md:flex-row md:items-center md:justify-between gap-8 border-t border-white/[0.06] pt-10">
            <a
              href={`mailto:${site.email}`}
              className="group inline-flex items-baseline gap-3"
            >
              <span className="font-display text-[22px] md:text-[28px] text-chalk-50 link-underline">
                {site.email}
              </span>
            </a>

            <ul className="flex flex-wrap items-center gap-2">
              <SocialLink href={site.socials.github} label="GitHub" />
              <SocialLink href={site.socials.linkedin} label="LinkedIn" />
              <SocialLink href={site.socials.kaggle} label="Kaggle" />
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function SocialLink({ href, label }: { href: string; label: string }) {
  return (
    <li>
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 text-[13px] text-chalk-200 border border-white/10 rounded-token px-3.5 py-2 transition-all duration-300 ease-soft hover:border-white/20 hover:bg-white/[0.03] hover:text-chalk-50"
      >
        {label}
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M7 17 17 7m0 0H8m9 0v9"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </a>
    </li>
  );
}
