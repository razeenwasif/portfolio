import { useEffect } from "react";
import Lenis from "lenis";

let globalLenis: Lenis | null = null;

export function useLenis() {
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
    });
    globalLenis = lenis;

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    // Hijack same-page anchor clicks so they use the Lenis scrollTo curve.
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey) return;
      const anchor = (e.target as HTMLElement | null)?.closest("a");
      if (!anchor) return;
      if (anchor.target === "_blank") return;
      const href = anchor.getAttribute("href");
      if (!href) return;
      // Same-page hash links: "#contact"
      if (href.startsWith("#")) {
        const el = document.getElementById(href.slice(1));
        if (!el) return;
        e.preventDefault();
        lenis.scrollTo(el, { offset: -16 });
      }
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(raf);
      lenis.destroy();
      globalLenis = null;
    };
  }, []);
}

export function getLenis(): Lenis | null {
  return globalLenis;
}
