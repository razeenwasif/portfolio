import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useResumeModal } from "./resumeModalContext";
import { getLenis } from "../hooks/useLenis";

const links = [
  { to: "/#work", label: "Work" },
  { to: "/#research", label: "Research" },
  { to: "/#about", label: "About" },
  { to: "/#stack", label: "Stack" },
  { to: "/#contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { open: openResume } = useResumeModal();
  const location = useLocation();

  // Auto-close the mobile sheet when the route or hash changes.
  useEffect(() => {
    const id = window.setTimeout(() => setMenuOpen(false), 0);
    return () => window.clearTimeout(id);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const onScroll = () => {
      const next = window.scrollY > 20;
      setScrolled((prev) => (prev === next ? prev : next));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Body scroll lock + Lenis pause while the mobile sheet is open.
  useEffect(() => {
    if (!menuOpen) return;
    const lenis = getLenis();
    lenis?.stop();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
      lenis?.start();
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={[
          "fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-soft",
          scrolled ? "py-3" : "py-5",
        ].join(" ")}
      >
        <div className="mx-auto max-w-page px-6">
          <nav
            className={[
              "flex items-center justify-between rounded-tokenLg px-4 py-2.5 transition-all duration-500 ease-soft",
              scrolled || menuOpen
                ? "glass"
                : "bg-transparent border border-transparent",
            ].join(" ")}
            aria-label="Primary"
          >
            <Link
              to="/"
              className="font-display text-[15px] font-medium tracking-tightish text-chalk-50"
            >
              <span className="text-accent">·</span> R.W.
            </Link>

            {/* Desktop link list */}
            <ul className="hidden md:flex items-center gap-8 text-[13px] text-chalk-300">
              {links.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="transition-colors duration-300 ease-soft hover:text-chalk-50"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={openResume}
                  className="transition-colors duration-300 ease-soft hover:text-chalk-50"
                >
                  Resume
                </button>
              </li>
            </ul>

            {/* Desktop CTA */}
            <Link
              to="/#contact"
              className="hidden md:inline-flex text-[13px] text-chalk-100 hairline border rounded-token px-3.5 py-1.5 transition-all duration-300 ease-soft hover:border-white/20 hover:bg-white/[0.03]"
            >
              Get in touch
            </Link>

            {/* Mobile hamburger / close — swaps icon on open state */}
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              className="md:hidden h-9 w-9 inline-flex items-center justify-center rounded-full border border-white/10 text-chalk-100 transition-all duration-300 hover:border-accent-soft hover:text-accent-soft"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden
              >
                {menuOpen ? (
                  <path
                    d="M6 6l12 12M6 18 18 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                ) : (
                  <>
                    <path
                      d="M4 8h16"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M4 16h16"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </>
                )}
              </svg>
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile sheet — backdrop + glass card with the link stack */}
      {menuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 z-40 md:hidden bg-black/70 backdrop-blur-md animate-fade-up"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute inset-x-6 top-24 glass p-6"
          >
            <p className="eyebrow text-chalk-300">Menu</p>
            <ul className="mt-5 divide-y divide-white/[0.06]">
              {links.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    onClick={() => setMenuOpen(false)}
                    className="block py-3 font-display font-light text-[26px] text-chalk-50 hover:text-accent-soft transition-colors duration-300 tracking-tightish"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    openResume();
                  }}
                  className="block w-full text-left py-3 font-display font-light text-[26px] text-chalk-50 hover:text-accent-soft transition-colors duration-300 tracking-tightish"
                >
                  Resume
                </button>
              </li>
            </ul>

            <Link
              to="/#contact"
              onClick={() => setMenuOpen(false)}
              className="mt-6 block w-full text-center text-[13px] text-chalk-100 hairline border rounded-token px-4 py-3 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.03]"
            >
              Get in touch →
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
