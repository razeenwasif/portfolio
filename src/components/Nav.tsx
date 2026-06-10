import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const links = [
  { to: "/#work", label: "Work" },
  { to: "/#research", label: "Research" },
  { to: "/#about", label: "About" },
  { to: "/#stack", label: "Stack" },
  { to: "/#contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
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
            scrolled
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
              <a
                href="/main.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors duration-300 ease-soft hover:text-chalk-50"
                download
              >
                Resume
              </a>
            </li>
          </ul>

          <Link
            to="/#contact"
            className="text-[13px] text-chalk-100 hairline border rounded-token px-3.5 py-1.5 transition-all duration-300 ease-soft hover:border-white/20 hover:bg-white/[0.03]"
          >
            Get in touch
          </Link>
        </nav>
      </div>
    </header>
  );
}
