import { useEffect, useRef, useState } from "react";
import { site } from "../data/site";
import { useReveal } from "../hooks/useReveal";
import { useResumeModal } from "./ResumeModal";

export function Hero() {
  const r1 = useReveal<HTMLDivElement>();
  const orbARef = useRef<HTMLDivElement | null>(null);
  const orbBRef = useRef<HTMLDivElement | null>(null);
  const [scrambleRev, setScrambleRev] = useState(0);
  const lastScrambleAtRef = useRef(0);
  const { open: openResume } = useResumeModal();

  const handleNameHover = () => {
    const now = performance.now();
    // Cooldown — hovering across the name shouldn't restart it on every pixel.
    if (now - lastScrambleAtRef.current < 1200) return;
    lastScrambleAtRef.current = now;
    setScrambleRev((v) => v + 1);
  };

  // Cursor-follow orbs — slow lerp toward mouse position, capped offset.
  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) return;

    const orbA = orbARef.current;
    const orbB = orbBRef.current;
    if (!orbA && !orbB) return;

    let mx = 0,
      my = 0;
    let ax = 0,
      ay = 0,
      bx = 0,
      by = 0;
    const STIFF = 0.06;
    const MAX_A = 70;
    const MAX_B = 110; // back orb drifts further for a hint of depth

    const onMove = (e: MouseEvent) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      mx = (e.clientX / w - 0.5) * 2;
      my = (e.clientY / h - 0.5) * 2;
    };

    let raf = 0;
    const loop = () => {
      const tax = mx * MAX_A;
      const tay = my * MAX_A;
      const tbx = -mx * MAX_B;
      const tby = -my * MAX_B;
      ax += (tax - ax) * STIFF;
      ay += (tay - ay) * STIFF;
      bx += (tbx - bx) * STIFF;
      by += (tby - by) * STIFF;
      if (orbA)
        orbA.style.transform = `translate3d(${ax.toFixed(2)}px, ${ay.toFixed(2)}px, 0)`;
      if (orbB)
        orbB.style.transform = `translate3d(${bx.toFixed(2)}px, ${by.toFixed(2)}px, 0)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    loop();
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      id="top"
      className="relative isolate overflow-hidden pt-40 pb-28 md:pt-56 md:pb-40"
    >
      {/* Subtle gradient orb — single, off-center, drifts with cursor */}
      <div
        ref={orbARef}
        aria-hidden
        className="pointer-events-none absolute -top-32 -right-24 h-[520px] w-[520px] rounded-full opacity-60 blur-3xl will-change-transform"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, rgba(139,124,246,0.35), rgba(139,124,246,0) 60%)",
        }}
      />
      <div
        ref={orbBRef}
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -left-20 h-[420px] w-[420px] rounded-full opacity-40 blur-3xl will-change-transform"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(94,77,209,0.25), rgba(94,77,209,0) 60%)",
        }}
      />
      {/* Faint top-down vignette */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.02) 0%, rgba(0,0,0,0) 50%)",
        }}
      />

      {/* Editorial vertical rail — PORTFOLIO · 2026 · RAZEEN WASIF rotated
          down the right edge of the hero */}
      <div
        aria-hidden
        className="hidden lg:block absolute right-6 top-32 bottom-32 pointer-events-none"
      >
        <p
          className="text-[10px] font-mono uppercase tracking-[0.35em] text-chalk-500 whitespace-nowrap"
          style={{ writingMode: "vertical-rl" }}
        >
          Portfolio · 2026 · Razeen Wasif
        </p>
      </div>

      <div className="relative mx-auto max-w-page px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-end">
          <div ref={r1} className="reveal lg:col-span-11">
            <p className="eyebrow mb-5">
              <span className="inline-block h-1 w-1 rounded-full bg-accent align-middle mr-2" />
              {site.location} ·{" "}
              <RotatingWord
                words={["Building", "Shipping", "Researching"]}
              />
            </p>

            <h1
              onMouseEnter={handleNameHover}
              className="font-display font-light text-chalk-50 text-balance leading-[0.95] tracking-tighter2 text-[44px] sm:text-[68px] md:text-[88px] lg:text-[104px] cursor-default"
            >
              <ScrambleText runKey={scrambleRev}>{`${site.name}.`}</ScrambleText>
            </h1>

            <p className="mt-8 max-w-prose2 text-[17px] md:text-[19px] leading-relaxed text-chalk-300 text-balance">
              <span className="text-chalk-100">{site.role}</span> — {site.tagline}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a href="#work" className="btn-primary">
                See selected work
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M5 12h14m0 0-6-6m6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
              <button
                type="button"
                onClick={openResume}
                className="btn-ghost"
              >
                Resume
              </button>
              <a href="#contact" className="btn-ghost">
                Contact
              </a>
            </div>

            {/* Currently line — postscript under the CTAs, reads as a live
                update. No reveal class; it inherits visibility from the
                parent's reveal so it doesn't get stuck below the fold. */}
            <p className="max-w-prose2 mt-10 text-[15px] md:text-[16px] leading-relaxed text-chalk-300 italic font-display">
              <span className="not-italic font-sans inline-flex items-center gap-1.5 mr-2 text-amber-soft align-middle">
                <span className="relative inline-flex h-1.5 w-1.5">
                  <span className="absolute inset-0 rounded-full bg-amber opacity-60 animate-ping" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-amber" />
                </span>
                <span className="eyebrow !text-amber-soft">Currently</span>
              </span>
              Shipping an{" "}
              <span className="not-italic text-accent-soft">
                identification
              </span>{" "}
              platform and a feedback dashboard with ANU.
            </p>

            {/* Mono signature one-liner — physics / maths fingerprint. Each
                term + trailing separator is bound in a whitespace-nowrap
                unit so a · never dangles at a line break on narrow widths. */}
            <p className="mt-10 text-[11px] font-mono uppercase tracking-[0.22em] text-chalk-400 leading-relaxed">
              <span className="whitespace-nowrap">
                <span className="text-chalk-500">ℏ</span> Physics{" "}
                <span className="text-chalk-500">·</span>
              </span>{" "}
              <span className="whitespace-nowrap">
                <span className="text-chalk-500">H</span> Information theory{" "}
                <span className="text-chalk-500">·</span>
              </span>{" "}
              <span className="whitespace-nowrap">
                <span className="text-chalk-500">Δ</span> Quantization{" "}
                <span className="text-chalk-500">·</span>
              </span>{" "}
              <span className="whitespace-nowrap">
                <span className="text-chalk-500">∇</span> Optimization{" "}
                <span className="text-chalk-500">·</span>
              </span>{" "}
              <span className="whitespace-nowrap text-amber-soft">
                Open to grad roles
              </span>
            </p>
          </div>

          {/* Right column intentionally empty — typography carries the
              weight. The vertical PORTFOLIO rail is absolutely positioned
              above outside this grid. */}
          <div className="hidden lg:block lg:col-span-1" aria-hidden />
        </div>

        {/* Hairline marquee under hero */}
        <div className="mt-24 md:mt-36 flex items-center gap-6 text-[11px] uppercase tracking-[0.22em] text-chalk-500">
          <span>Selected work</span>
          <span className="h-px flex-1 bg-white/[0.06]" />
          <span>2020 — 2026</span>
        </div>
      </div>
    </section>
  );
}

function RotatingWord({
  words,
  duration = 4000,
  transition = 600,
}: {
  words: string[];
  duration?: number;
  transition?: number;
}) {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const id = window.setInterval(() => {
      setI((v) => (v + 1) % words.length);
    }, duration);
    return () => window.clearInterval(id);
  }, [words.length, duration]);

  const longest = words.reduce(
    (a, b) => (a.length > b.length ? a : b),
    "",
  );

  return (
    <span className="relative inline-grid align-baseline">
      <span className="col-start-1 row-start-1 invisible italic">
        {longest}
      </span>
      {words.map((w, idx) => (
        <span
          key={w}
          aria-hidden={idx !== i}
          className="col-start-1 row-start-1 italic text-amber-soft"
          style={{
            opacity: idx === i ? 1 : 0,
            transition: `opacity ${transition}ms cubic-bezier(0.22, 1, 0.36, 1)`,
          }}
        >
          {w}
        </span>
      ))}
    </span>
  );
}

const SCRAMBLE_GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#&%@$*/?+•◊◇✦";

function randGlyph(): string {
  return SCRAMBLE_GLYPHS[Math.floor(Math.random() * SCRAMBLE_GLYPHS.length)];
}

function isStable(ch: string): boolean {
  // Preserve whitespace and punctuation as-is; scramble alpha-numerics only.
  return /[\s.,!?;:'"\-()]/.test(ch);
}

function ScrambleText({
  children,
  runKey = 0,
}: {
  children: string;
  runKey?: number;
}) {
  const target = children;
  const [display, setDisplay] = useState<string>(() => {
    if (typeof window === "undefined") return target;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return target;
    return target
      .split("")
      .map((ch) => (isStable(ch) ? ch : randGlyph()))
      .join("");
  });

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setDisplay(target);
      return;
    }

    // Seed the display with a fresh batch of glyphs so the next run starts
    // from a scrambled state (not from the previously-settled final text).
    setDisplay(
      target
        .split("")
        .map((ch) => (isStable(ch) ? ch : randGlyph()))
        .join(""),
    );

    const len = target.length;
    const PER_CHAR_LOCK = 65; // ms between successive char locks
    const FLIP_INTERVAL = 55; // ms between glyph flips
    let elapsed = 0;

    const id = window.setInterval(() => {
      elapsed += FLIP_INTERVAL;
      let done = true;
      let result = "";
      for (let i = 0; i < len; i++) {
        const ch = target[i];
        if (isStable(ch)) {
          result += ch;
          continue;
        }
        const lockTime = i * PER_CHAR_LOCK;
        if (elapsed >= lockTime) {
          result += ch;
        } else {
          done = false;
          result += randGlyph();
        }
      }
      setDisplay(result);
      if (done) window.clearInterval(id);
    }, FLIP_INTERVAL);

    return () => window.clearInterval(id);
  }, [target, runKey]);

  return <>{display}</>;
}
