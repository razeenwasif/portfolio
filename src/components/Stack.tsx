import { stack } from "../data/site";
import { useReveal } from "../hooks/useReveal";

// Speed = seconds for one full loop. Tuned per row length so the visual cadence
// matches across categories instead of long rows scrolling slowly and short
// rows scrolling fast.
const SECONDS_PER_ITEM = 6;
const MIN_DURATION = 55;

export function Stack() {
  const r = useReveal<HTMLDivElement>();
  const groups = Object.entries(stack);

  return (
    <section id="stack" className="relative py-28 md:py-40">
      <div className="mx-auto max-w-page px-6">
        <div ref={r} className="reveal mb-12 md:mb-16">
          <p className="eyebrow">Stack</p>
          <h2 className="mt-4 font-display font-light text-chalk-50 text-[32px] md:text-[44px] lg:text-[52px] leading-[1.05] tracking-tightish">
            The tools I reach for.
          </h2>
        </div>
      </div>

      <div className="space-y-10 md:space-y-14">
        {groups.map(([label, items], i) => (
          <MarqueeRow
            key={label}
            label={label}
            items={items}
            direction={i % 2 === 0 ? "left" : "right"}
            duration={Math.max(MIN_DURATION, items.length * SECONDS_PER_ITEM)}
          />
        ))}
      </div>
    </section>
  );
}

function MarqueeRow({
  label,
  items,
  direction,
  duration,
}: {
  label: string;
  items: string[];
  direction: "left" | "right";
  duration: number;
}) {
  const r = useReveal<HTMLDivElement>();

  return (
    <div ref={r} className="reveal">
      <div className="mx-auto max-w-page px-6 mb-3 md:mb-4">
        <p className="eyebrow">{label}</p>
      </div>

      <div className="relative overflow-hidden marquee-mask py-1">
        <div
          className={[
            "flex w-max items-center gap-0 whitespace-nowrap select-none",
            direction === "left"
              ? "animate-marquee-left"
              : "animate-marquee-right",
          ].join(" ")}
          style={{ animationDuration: `${duration}s` }}
        >
          <Strip items={items} />
          <Strip items={items} aria-hidden />
        </div>
      </div>
    </div>
  );
}

function Strip({
  items,
  ...rest
}: { items: string[] } & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className="flex items-center gap-0" {...rest}>
      {items.map((item, idx) => (
        <span key={`${item}-${idx}`} className="flex items-center">
          <span
            className={[
              "font-display font-light uppercase tracking-tightish",
              "text-[44px] md:text-[64px] lg:text-[80px] leading-none",
              "px-7 md:px-10",
              idx % 2 === 0 ? "text-chalk-50" : "text-accent-soft/55",
            ].join(" ")}
          >
            {item}
          </span>
          <Separator />
        </span>
      ))}
    </div>
  );
}

function Separator() {
  return (
    <span
      aria-hidden
      className="text-accent/70 text-[14px] md:text-[18px] font-mono leading-none px-2"
    >
      ✦
    </span>
  );
}
