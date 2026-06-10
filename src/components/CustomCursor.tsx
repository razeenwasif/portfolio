import { useEffect, useRef, useState } from "react";

/**
 * Custom cursor — two layered elements:
 *   • Dot: small lavender disc that snaps to the mouse position with no lag.
 *   • Ring: larger lavender outline that lerps toward the mouse for smooth
 *     follow. Expands and fills when over interactive targets.
 *
 * Skips on coarse-pointer / touch devices and on prefers-reduced-motion.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Skip on touch / coarse pointer devices entirely.
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    document.documentElement.classList.add("custom-cursor-active");

    let mx = 0;
    let my = 0;
    let rx = 0;
    let ry = 0;
    let firstMove = true;

    const INTERACTIVE_SELECTOR =
      'a, button, [role="button"], label[for], summary, .cursor-zoom-in, [data-cursor="interactive"]';

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (firstMove) {
        rx = mx;
        ry = my;
        firstMove = false;
        setVisible(true);
      }
    };

    const onOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement | null)?.closest(
        INTERACTIVE_SELECTOR,
      );
      if (target) setHovered(true);
    };

    const onOut = (e: MouseEvent) => {
      const target = (e.target as HTMLElement | null)?.closest(
        INTERACTIVE_SELECTOR,
      );
      if (target) setHovered(false);
    };

    const onLeaveWindow = () => setVisible(false);
    const onEnterWindow = () => setVisible(true);

    let rafId = 0;
    const tick = () => {
      const dot = dotRef.current;
      const ring = ringRef.current;

      if (dot) {
        dot.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
      }

      // Ring lerps toward mouse — instant when reduced motion is on.
      const k = reduceMotion ? 1 : 0.22;
      rx += (mx - rx) * k;
      ry += (my - ry) * k;
      if (ring) {
        ring.style.transform = `translate3d(${rx.toFixed(2)}px, ${ry.toFixed(2)}px, 0) translate(-50%, -50%)`;
      }

      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    document.addEventListener("mouseleave", onLeaveWindow);
    document.addEventListener("mouseenter", onEnterWindow);
    rafId = requestAnimationFrame(tick);

    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      document.removeEventListener("mouseleave", onLeaveWindow);
      document.removeEventListener("mouseenter", onEnterWindow);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden
        className={[
          "fixed top-0 left-0 z-[100] pointer-events-none rounded-full bg-accent will-change-transform",
          hovered ? "h-1 w-1" : "h-1.5 w-1.5",
          "transition-[opacity,height,width] duration-200 ease-soft",
          visible ? "opacity-100" : "opacity-0",
        ].join(" ")}
      />
      <div
        ref={ringRef}
        aria-hidden
        className={[
          "fixed top-0 left-0 z-[99] pointer-events-none rounded-full border border-accent/55 will-change-transform",
          "transition-[opacity,height,width,background-color,border-color] duration-300 ease-soft",
          hovered
            ? "h-[52px] w-[52px] bg-accent/15 border-accent"
            : "h-[30px] w-[30px] bg-transparent",
          visible ? "opacity-100" : "opacity-0",
        ].join(" ")}
      />
    </>
  );
}
