import { useEffect, useState } from "react";

const links = [
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#stack", label: "Stack" },
  { href: "#contact", label: "Contact" },
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
          <a
            href="#top"
            className="font-display text-[15px] font-medium tracking-tightish text-chalk-50"
          >
            <span className="text-accent">·</span> R.W.
          </a>

          <ul className="hidden md:flex items-center gap-8 text-[13px] text-chalk-300">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="transition-colors duration-300 ease-soft hover:text-chalk-50"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#contact"
            className="text-[13px] text-chalk-100 hairline border rounded-token px-3.5 py-1.5 transition-all duration-300 ease-soft hover:border-white/20 hover:bg-white/[0.03]"
          >
            Get in touch
          </a>
        </nav>
      </div>
    </header>
  );
}
