import { stack } from "../data/site";
import { useReveal } from "../hooks/useReveal";

export function Stack() {
  const r = useReveal<HTMLDivElement>();
  const groups = Object.entries(stack);

  return (
    <section id="stack" className="relative py-28 md:py-40">
      <div className="mx-auto max-w-page px-6">
        <div ref={r} className="reveal grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-3">
            <p className="eyebrow">Stack</p>
            <h2 className="mt-4 font-display font-light text-chalk-50 text-[28px] md:text-[36px] leading-[1.05] tracking-tightish">
              The tools I reach for.
            </h2>
          </div>

          <div className="lg:col-span-9 grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/[0.05] border border-white/[0.05] rounded-tokenLg overflow-hidden">
            {groups.map(([label, items]) => (
              <div
                key={label}
                className="bg-ink-900 p-6 md:p-7 transition-colors duration-500 ease-soft hover:bg-ink-800"
              >
                <p className="eyebrow">{label}</p>
                <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-[14px] text-chalk-100">
                  {items.map((it) => (
                    <li key={it} className="font-display tracking-tightish">
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
