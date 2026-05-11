import { useReveal } from "../hooks/useReveal";

const strengths = [
  "ML & deep learning",
  "GPU acceleration",
  "Full-stack engineering",
  "Quantitative rigour",
];

export function About() {
  const r = useReveal<HTMLDivElement>();

  return (
    <section id="about" className="relative py-28 md:py-40">
      <div className="mx-auto max-w-page px-6">
        <div ref={r} className="reveal grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-3">
            <p className="eyebrow">About</p>
          </div>
          <div className="lg:col-span-9">
            <h2 className="font-display font-light text-chalk-50 text-[32px] md:text-[44px] lg:text-[52px] leading-[1.05] tracking-tightish text-balance">
              Physics-trained engineer working across ML, GPU systems,
              <span className="text-accent-soft"> and product</span>.
            </h2>

            <p className="mt-8 max-w-prose2 text-[16px] md:text-[17px] leading-relaxed text-chalk-300 text-balance">
              I build things that need to be both fast and right — from custom
              CUDA kernels and neuro-symbolic models to full-stack platforms
              shipped on Power Platform and React.
            </p>

            <ul className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-y-3 gap-x-4 text-[13px]">
              {strengths.map((s) => (
                <li
                  key={s}
                  className="flex items-center gap-2 text-chalk-200"
                >
                  <span className="h-px w-3 bg-accent/70" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
