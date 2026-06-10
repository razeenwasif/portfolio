import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getLenis } from "../hooks/useLenis";

export function ScrollToHash() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace(/^#/, "");
      requestAnimationFrame(() => {
        const el = document.getElementById(id);
        if (!el) return;
        const lenis = getLenis();
        if (lenis) {
          lenis.scrollTo(el, { offset: -16 });
        } else {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
      return;
    }
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant" as ScrollBehavior,
      });
    }
  }, [pathname, hash]);

  return null;
}
