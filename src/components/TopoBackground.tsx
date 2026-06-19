import { useEffect, useState } from "react";

/**
 * Ambient background overlay — eight pre-computed topographic contour designs
 * (dbrand Area-51-ish) that crossfade on a 10-second cycle, plus a static
 * survey grid, scattered technical fragments, and corner registration marks.
 *
 * All geometry is computed once at module load — the cycle itself is just
 * an opacity swap between pre-rendered SVG groups.
 */

const VIEWBOX_W = 1600;
const VIEWBOX_H = 1200;

type Peak = { cx: number; cy: number; amp: number; sigma: number };
type DesignConfig = {
  peaks: Peak[];
  noisePhase: number;
  noiseFreq: number;
};

/**
 * Eight distinct compositions. Each design scatters several medium peaks
 * (and a basin or two — negative amp) across the frame so closed loops show
 * up everywhere, like the dbrand reference, rather than only at the corners.
 * Peak placement still gives each design a distinct centre of gravity.
 */
const DESIGNS: DesignConfig[] = [
  // 1. Top-right + bottom-left emphasis (the resting state)
  {
    peaks: [
      { cx: 1320, cy: 260, amp: 1.3, sigma: 60000 },
      { cx: 260, cy: 940, amp: 1.3, sigma: 70000 },
      { cx: 760, cy: 620, amp: 1.0, sigma: 45000 },
      { cx: 520, cy: 180, amp: -0.9, sigma: 55000 },
      { cx: 1180, cy: 950, amp: 1.1, sigma: 50000 },
    ],
    noisePhase: 0,
    noiseFreq: 1.0,
  },
  // 2. Top-left + bottom-right — mirrored
  {
    peaks: [
      { cx: 280, cy: 240, amp: 1.2, sigma: 65000 },
      { cx: 1340, cy: 980, amp: 1.3, sigma: 60000 },
      { cx: 880, cy: 420, amp: 1.0, sigma: 40000 },
      { cx: 1100, cy: 150, amp: -0.8, sigma: 50000 },
      { cx: 420, cy: 760, amp: 1.1, sigma: 55000 },
    ],
    noisePhase: 1.3,
    noiseFreq: 0.95,
  },
  // 3. Top-centre + bottom-centre — vertical bands
  {
    peaks: [
      { cx: 800, cy: 180, amp: 1.2, sigma: 70000 },
      { cx: 800, cy: 1020, amp: 1.2, sigma: 70000 },
      { cx: 340, cy: 560, amp: 1.0, sigma: 45000 },
      { cx: 1260, cy: 620, amp: 1.0, sigma: 45000 },
      { cx: 800, cy: 600, amp: -0.9, sigma: 60000 },
    ],
    noisePhase: 2.5,
    noiseFreq: 1.1,
  },
  // 4. Left-centre + right-centre — horizontal bands
  {
    peaks: [
      { cx: 220, cy: 600, amp: 1.2, sigma: 70000 },
      { cx: 1380, cy: 600, amp: 1.2, sigma: 70000 },
      { cx: 760, cy: 260, amp: 1.0, sigma: 45000 },
      { cx: 840, cy: 980, amp: 1.0, sigma: 45000 },
    ],
    noisePhase: 3.8,
    noiseFreq: 1.05,
  },
  // 5. Big central peak ringed by satellites
  {
    peaks: [
      { cx: 820, cy: 600, amp: 1.6, sigma: 90000 },
      { cx: 300, cy: 300, amp: 1.0, sigma: 50000 },
      { cx: 1300, cy: 900, amp: 1.0, sigma: 50000 },
      { cx: 1350, cy: 250, amp: -0.8, sigma: 45000 },
      { cx: 250, cy: 950, amp: -0.8, sigma: 45000 },
    ],
    noisePhase: 5.1,
    noiseFreq: 0.9,
  },
  // 6. Three-peak triangle — top + bottom-left + bottom-right
  {
    peaks: [
      { cx: 800, cy: 220, amp: 1.2, sigma: 55000 },
      { cx: 300, cy: 980, amp: 1.2, sigma: 55000 },
      { cx: 1320, cy: 980, amp: 1.2, sigma: 55000 },
      { cx: 820, cy: 720, amp: -0.9, sigma: 60000 },
      { cx: 1500, cy: 400, amp: 0.9, sigma: 40000 },
    ],
    noisePhase: 6.3,
    noiseFreq: 1.15,
  },
  // 7. Three-peak triangle — bottom + top-left + top-right (inverted)
  {
    peaks: [
      { cx: 800, cy: 1000, amp: 1.2, sigma: 55000 },
      { cx: 290, cy: 240, amp: 1.2, sigma: 55000 },
      { cx: 1330, cy: 240, amp: 1.2, sigma: 55000 },
      { cx: 800, cy: 500, amp: -0.9, sigma: 60000 },
      { cx: 120, cy: 800, amp: 0.9, sigma: 40000 },
    ],
    noisePhase: 7.5,
    noiseFreq: 1.0,
  },
  // 8. Diagonal sweep — opposing far corners pull contours across the frame
  {
    peaks: [
      { cx: 1480, cy: 160, amp: 1.5, sigma: 80000 },
      { cx: 160, cy: 1040, amp: 1.5, sigma: 80000 },
      { cx: 820, cy: 620, amp: 1.0, sigma: 50000 },
      { cx: 500, cy: 300, amp: -0.8, sigma: 45000 },
      { cx: 1150, cy: 900, amp: -0.8, sigma: 45000 },
    ],
    noisePhase: 8.7,
    noiseFreq: 0.85,
  },
];

function makeField(config: DesignConfig) {
  const ph = config.noisePhase;
  const fq = config.noiseFreq;
  return (x: number, y: number): number => {
    // Higher-frequency octaves than a classic "two big hills" field — the
    // dbrand reference is a busy terrain of small islands and basins, so
    // feature wavelengths sit around 350–1000px in viewBox units.
    const noise =
      Math.sin(x * 0.0058 * fq + 0.5 + ph) *
        Math.cos(y * 0.0066 * fq + 1.2 + ph) +
      0.65 *
        Math.sin(x * 0.0105 * fq + y * 0.0048 * fq + 2.1 + ph * 1.3) +
      0.45 *
        Math.cos(x * 0.0036 * fq - y * 0.0088 * fq + 0.8 + ph * 0.7) +
      0.3 *
        Math.sin(x * 0.0152 * fq - y * 0.0124 * fq + 1.6 + ph * 1.7);

    let peakSum = 0;
    for (const p of config.peaks) {
      const dx = x - p.cx;
      const dy = y - p.cy;
      peakSum += p.amp * Math.exp(-(dx * dx + dy * dy) / p.sigma);
    }

    return noise + peakSum;
  };
}

const CELL = 22;
const COLS = Math.ceil(VIEWBOX_W / CELL) + 1;
const ROWS = Math.ceil(VIEWBOX_H / CELL) + 1;

function lerpPoint(
  x1: number,
  y1: number,
  v1: number,
  x2: number,
  y2: number,
  v2: number,
  t: number,
): [number, number] {
  const k = (t - v1) / (v2 - v1);
  return [x1 + k * (x2 - x1), y1 + k * (y2 - y1)];
}

/**
 * Standard marching squares over a pre-sampled grid — returns the SVG `d`
 * attribute for every iso-line at the given threshold.
 */
function marchingSquares(samples: number[], threshold: number): string {
  let d = "";
  for (let row = 0; row < ROWS - 1; row++) {
    for (let col = 0; col < COLS - 1; col++) {
      const x0 = col * CELL;
      const y0 = row * CELL;
      const x1 = x0 + CELL;
      const y1 = y0 + CELL;

      const tl = samples[row * COLS + col];
      const tr = samples[row * COLS + col + 1];
      const br = samples[(row + 1) * COLS + col + 1];
      const bl = samples[(row + 1) * COLS + col];

      const code =
        (tl >= threshold ? 8 : 0) |
        (tr >= threshold ? 4 : 0) |
        (br >= threshold ? 2 : 0) |
        (bl >= threshold ? 1 : 0);

      if (code === 0 || code === 15) continue;

      const top = () => lerpPoint(x0, y0, tl, x1, y0, tr, threshold);
      const right = () => lerpPoint(x1, y0, tr, x1, y1, br, threshold);
      const bottom = () => lerpPoint(x0, y1, bl, x1, y1, br, threshold);
      const left = () => lerpPoint(x0, y0, tl, x0, y1, bl, threshold);

      const seg = (a: [number, number], b: [number, number]) => {
        d +=
          `M${a[0].toFixed(1)},${a[1].toFixed(1)} ` +
          `L${b[0].toFixed(1)},${b[1].toFixed(1)} `;
      };

      switch (code) {
        case 1:
        case 14:
          seg(left(), bottom());
          break;
        case 2:
        case 13:
          seg(bottom(), right());
          break;
        case 3:
        case 12:
          seg(left(), right());
          break;
        case 4:
        case 11:
          seg(top(), right());
          break;
        case 6:
        case 9:
          seg(top(), bottom());
          break;
        case 7:
        case 8:
          seg(top(), left());
          break;
        case 5:
          seg(top(), left());
          seg(bottom(), right());
          break;
        case 10:
          seg(top(), right());
          seg(bottom(), left());
          break;
      }
    }
  }
  return d.trim();
}

// 12 thresholds at 0.35 spacing — dense banding like the reference.
const THRESHOLDS = [
  -1.6, -1.25, -0.9, -0.55, -0.2, 0.15, 0.5, 0.85, 1.2, 1.55, 1.9, 2.25,
];

type TopoLine = { d: string; variant: 0 | 1 | 2 | 3 };

function buildDesign(config: DesignConfig): TopoLine[] {
  const fieldFn = makeField(config);
  const samples = new Array(COLS * ROWS);
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      samples[row * COLS + col] = fieldFn(col * CELL, row * CELL);
    }
  }
  return THRESHOLDS.map((threshold, i) => ({
    d: marchingSquares(samples, threshold),
    variant: (i % 4) as 0 | 1 | 2 | 3,
  }));
}

const ALL_DESIGNS: TopoLine[][] = DESIGNS.map(buildDesign);

type Variant = {
  stroke: string;
  strokeOpacity: number;
  dash: string | undefined;
  animClass: string | undefined;
};

/**
 * Strictly alternating solid / dashed by elevation — like real topo maps
 * (solid index contours, dashed intermediates) and like the reference skin.
 * Solid lines read brighter; dashed sit a step dimmer.
 */
const VARIANTS: readonly Variant[] = [
  {
    stroke: "rgb(245,245,247)",
    strokeOpacity: 0.038,
    dash: undefined,
    animClass: undefined,
  },
  {
    stroke: "rgb(245,245,247)",
    strokeOpacity: 0.022,
    dash: "5 6",
    animClass: "animate-topo-dash",
  },
  {
    stroke: "rgb(186,168,250)",
    strokeOpacity: 0.068,
    dash: undefined,
    animClass: undefined,
  },
  {
    stroke: "rgb(186,168,250)",
    strokeOpacity: 0.05,
    dash: "1 5",
    animClass: "animate-topo-dot",
  },
] as const;

/**
 * Survey grid — faint full-span section lines with brighter `+` crosshair
 * ticks at the intersections, straight from the reference skin. Static; it
 * does not cycle with the contour designs.
 */
const GRID_X = [400, 800, 1200];
const GRID_Y = [400, 800];
const CROSS_ARM = 11;

function gridLinesPath(): string {
  const v = GRID_X.map((x) => `M${x},0 L${x},${VIEWBOX_H}`).join(" ");
  const h = GRID_Y.map((y) => `M0,${y} L${VIEWBOX_W},${y}`).join(" ");
  return `${v} ${h}`;
}

function gridCrossesPath(): string {
  let d = "";
  for (const x of GRID_X) {
    for (const y of GRID_Y) {
      d +=
        `M${x - CROSS_ARM},${y} L${x + CROSS_ARM},${y} ` +
        `M${x},${y - CROSS_ARM} L${x},${y + CROSS_ARM} `;
    }
  }
  return d.trim();
}

const GRID_LINES_D = gridLinesPath();
const GRID_CROSSES_D = gridCrossesPath();

/** Summit `+` marker path for one design — one cross per positive peak. */
function peakMarkersPath(config: DesignConfig): string {
  const ARM = 7;
  return config.peaks
    .filter((p) => p.amp > 0)
    .map(
      (p) =>
        `M${p.cx - ARM},${p.cy} L${p.cx + ARM},${p.cy} ` +
        `M${p.cx},${p.cy - ARM} L${p.cx},${p.cy + ARM}`,
    )
    .join(" ");
}

const PEAK_MARKERS: string[] = DESIGNS.map(peakMarkersPath);

type Fragment = { x: number; y: number; text: string; size?: number };

const FRAGMENTS: Fragment[] = [
  // Top-right cluster
  { x: 1200, y: 60, text: "35.2809°S 149.1300°E", size: 11 },
  { x: 1180, y: 140, text: "BIOCLIP·VIT-H/14", size: 11 },
  { x: 1450, y: 360, text: "MACRO F1 0.418", size: 10 },
  { x: 1280, y: 480, text: "TILE 4×4 · 224 / 336", size: 10 },
  { x: 1380, y: 600, text: "✦", size: 14 },
  { x: 1430, y: 100, text: "◇", size: 14 },

  // Bottom-left cluster
  { x: 70, y: 760, text: "MISTRAL-7B-V0.3", size: 11 },
  { x: 90, y: 840, text: "FP16 → Q8 → Q4 → Q2", size: 10 },
  { x: 360, y: 900, text: "NCCL·LIVENESS=OK", size: 10 },
  { x: 130, y: 1090, text: "RANK 0 · 1 · 2 · 3", size: 10 },
  { x: 60, y: 660, text: "◊", size: 14 },
  { x: 460, y: 1130, text: "7,806 CLASSES · LONG-TAIL", size: 10 },

  // Math / physics — scattered margin-note glyphs and short formulas
  { x: 170, y: 120, text: "ψ ∈ ℋ", size: 13 },
  { x: 240, y: 240, text: "ℏω = E", size: 12 },
  { x: 720, y: 100, text: "S = −Σ p log p", size: 11 },
  { x: 1240, y: 230, text: "e^(iπ) + 1 = 0", size: 11 },
  { x: 90, y: 410, text: "θ ∈ [0, 2π]", size: 11 },
  { x: 900, y: 360, text: "∫ e^(−x²) dx", size: 11 },
  { x: 1140, y: 460, text: "∂L/∂θ", size: 13 },
  { x: 480, y: 720, text: "δ(x − x₀)", size: 11 },
  { x: 720, y: 560, text: "∇L(θ)", size: 14 },
  { x: 1240, y: 700, text: "argmin ℒ", size: 12 },
  { x: 320, y: 600, text: "ε → 0", size: 12 },
  { x: 1080, y: 880, text: "ω = 2πf", size: 11 },
  { x: 540, y: 1060, text: "∮ E·dl", size: 11 },
  { x: 980, y: 1180, text: "lim x→∞", size: 11 },
  { x: 1380, y: 1100, text: "F = ma", size: 11 },
];

const CORNERS = [
  { x: VIEWBOX_W - 24, y: 24 },
  { x: 24, y: VIEWBOX_H - 24 },
];

const CYCLE_MS = 10000;
// Long crossfade so both designs hang in the air together for half the cycle
// before the previous one fully dissolves — reads as a continuous flow.
const CROSSFADE_MS = 3500;

export function TopoBackground() {
  // Only the active design and the one fading out are mounted — keeping all
  // eight in the DOM meant ~100 huge paths with dash animations running on
  // invisible groups. `activeOn` starts false for a freshly mounted active
  // group so its opacity can transition 0 → 1.
  const [pair, setPair] = useState<{ active: number; prev: number | null }>({
    active: 0,
    prev: null,
  });
  const [activeOn, setActiveOn] = useState(true);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      (window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
        window.matchMedia("(max-width: 768px)").matches)
    )
      return;
    const id = window.setInterval(() => {
      setPair((p) => ({
        active: (p.active + 1) % ALL_DESIGNS.length,
        prev: p.active,
      }));
      setActiveOn(false);
    }, CYCLE_MS);
    return () => window.clearInterval(id);
  }, []);

  // On cycle: let the new group paint at opacity 0, flip it on next frame so
  // the CSS transition runs, then unmount the outgoing group once it's done.
  useEffect(() => {
    if (pair.prev === null) return;
    let raf = requestAnimationFrame(() => {
      raf = requestAnimationFrame(() => setActiveOn(true));
    });
    const t = window.setTimeout(
      () => setPair((p) => ({ ...p, prev: null })),
      CROSSFADE_MS + 100,
    );
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(t);
    };
  }, [pair]);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <svg
        viewBox={`0 0 ${VIEWBOX_W} ${VIEWBOX_H}`}
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full"
      >
        {/* Survey grid — static section lines + crosshair intersections,
            sitting under the contours */}
        <g fill="none" strokeLinecap="round">
          <path
            d={GRID_LINES_D}
            stroke="rgb(245,245,247)"
            strokeOpacity="0.045"
            strokeWidth="0.7"
          />
          <path
            d={GRID_CROSSES_D}
            stroke="rgb(245,245,247)"
            strokeOpacity="0.18"
            strokeWidth="1"
          />
        </g>

        {/* The active design plus the outgoing one, crossfading. Screen
            blending makes the overlap during a crossfade additive — the
            "between" state reads as full instead of dim. */}
        <g style={{ mixBlendMode: "screen" }}>
          {[pair.prev, pair.active].map((designIdx) => {
            if (designIdx === null) return null;
            const lines = ALL_DESIGNS[designIdx];
            return (
            <g
              key={designIdx}
              strokeWidth="2.1"
              fill="none"
              strokeLinecap="round"
              style={{
                opacity: designIdx === pair.active && activeOn ? 1 : 0,
                transition: `opacity ${CROSSFADE_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`,
              }}
            >
              {lines.map((line, i) => {
                const v = VARIANTS[line.variant];
                return (
                  <path
                    key={i}
                    d={line.d}
                    stroke={v.stroke}
                    strokeOpacity={v.strokeOpacity}
                    strokeDasharray={v.dash}
                    className={v.animClass}
                  />
                );
              })}
              {/* Summit markers — a small + at each positive peak, fading
                  in and out with its design */}
              <path
                d={PEAK_MARKERS[designIdx]}
                stroke="rgb(245,245,247)"
                strokeOpacity="0.25"
                strokeWidth="1"
              />
            </g>
            );
          })}
        </g>

        {/* Scattered technical fragments — static, do not cycle. Hidden on
            narrow viewports where xMidYMid slice crops them off-screen. */}
        <g
          className="topo-meta"
          fill="rgb(154,154,166)"
          fillOpacity="0.18"
          style={{
            fontFamily:
              '"JetBrains Mono", ui-monospace, SFMono-Regular, monospace',
            letterSpacing: "0.08em",
          }}
        >
          {FRAGMENTS.map((f, i) => (
            <text key={i} x={f.x} y={f.y} fontSize={f.size ?? 11}>
              {f.text}
            </text>
          ))}
        </g>

        {/* Corner registration marks — same crop concern as the fragments */}
        <g className="topo-meta" fill="rgb(154,154,166)" fillOpacity="0.22">
          {CORNERS.map((c, i) => (
            <text
              key={i}
              x={c.x}
              y={c.y}
              fontSize="14"
              style={{
                fontFamily:
                  '"JetBrains Mono", ui-monospace, SFMono-Regular, monospace',
              }}
            >
              ⊕
            </text>
          ))}
        </g>
      </svg>
    </div>
  );
}
