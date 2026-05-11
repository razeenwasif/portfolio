import { site } from "../data/site";

export function Footer() {
  return (
    <footer className="relative py-10 border-t border-white/[0.05]">
      <div className="mx-auto max-w-page px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[12px] text-chalk-500">
        <span>
          © {new Date().getFullYear()} {site.name}. Crafted with care.
        </span>
        <span className="font-mono">v1.0</span>
      </div>
    </footer>
  );
}
