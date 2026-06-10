import { useEffect, useRef } from "react";

export function ScrollProgress() {
  const fillRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      const scrollTop =
        window.scrollY || document.documentElement.scrollTop;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const ratio =
        docHeight > 0
          ? Math.min(1, Math.max(0, scrollTop / docHeight))
          : 0;
      const node = fillRef.current;
      if (node) {
        node.style.transform = `scaleY(${ratio.toFixed(4)})`;
      }
      raf = 0;
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="fixed top-0 right-2 bottom-0 w-[3px] z-40 pointer-events-none rounded-full"
    >
      <div className="absolute inset-0 bg-white/[0.04] rounded-full" />
      <div
        ref={fillRef}
        className="absolute inset-0 origin-top bg-accent/40 rounded-full"
        style={{ transform: "scaleY(0)" }}
      />
    </div>
  );
}
