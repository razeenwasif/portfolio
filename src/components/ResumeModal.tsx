import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { getLenis } from "../hooks/useLenis";

type ResumeModalCtx = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

const Ctx = createContext<ResumeModalCtx | null>(null);

export function useResumeModal(): ResumeModalCtx {
  const v = useContext(Ctx);
  if (!v) throw new Error("useResumeModal must be used within ResumeModalProvider");
  return v;
}

export function ResumeModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const lenis = getLenis();
    lenis?.stop();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      lenis?.start();
    };
  }, [isOpen]);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return (
    <Ctx.Provider value={{ isOpen, open, close }}>
      {children}
      {isOpen && <ResumeModal onClose={close} />}
    </Ctx.Provider>
  );
}

/**
 * Inline PDF preview only works where the browser has a built-in viewer —
 * desktop Chrome/Firefox/Safari/Edge do, iOS Safari and most Android browsers
 * don't (they show a blank iframe). Use the modern API when available and
 * fall back to a UA + width sniff.
 */
function canPreviewPdf(): boolean {
  if (typeof navigator === "undefined" || typeof window === "undefined") {
    return false;
  }
  if ("pdfViewerEnabled" in navigator) {
    return Boolean(
      (navigator as Navigator & { pdfViewerEnabled?: boolean })
        .pdfViewerEnabled,
    );
  }
  const ua = (navigator as Navigator).userAgent ?? "";
  const isMobileUA = /iPhone|iPad|iPod|Android|Mobile/i.test(ua);
  const wide = window.matchMedia("(min-width: 768px)").matches;
  return wide && !isMobileUA;
}

function ResumeModal({ onClose }: { onClose: () => void }) {
  const canPreview = canPreviewPdf();
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Razeen Wasif resume"
      onClick={onClose}
      className="fixed inset-0 z-[80] flex items-center justify-center p-4 md:p-8 bg-black/70 backdrop-blur-md animate-fade-up"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="glass relative w-full max-w-4xl h-[90vh] flex flex-col overflow-hidden"
      >
        {/* Header — title + actions */}
        <div className="flex items-center justify-between gap-4 px-5 py-3 border-b border-white/[0.06]">
          <div className="flex items-center gap-3 min-w-0">
            <span className="eyebrow text-amber-soft inline-flex items-center gap-1.5 shrink-0">
              <span className="relative inline-flex h-1.5 w-1.5">
                <span className="absolute inset-0 rounded-full bg-amber opacity-60 animate-ping" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-amber" />
              </span>
              Resume
            </span>
            <span className="text-[12px] font-mono text-chalk-400 truncate">
              · Razeen Wasif · 2026
            </span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <a
              href="/main.pdf"
              download
              className="inline-flex h-9 items-center gap-2 px-4 rounded-full border border-white/10 text-[11px] font-mono uppercase tracking-wider text-chalk-200 transition-all duration-300 hover:bg-white/10 hover:border-accent-soft hover:text-accent-soft"
            >
              Download
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 4v12m0 0 4-4m-4 4-4-4M4 20h16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <a
              href="/main.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex h-9 items-center gap-2 px-4 rounded-full border border-white/10 text-[11px] font-mono uppercase tracking-wider text-chalk-200 transition-all duration-300 hover:bg-white/10 hover:border-accent-soft hover:text-accent-soft"
            >
              New tab
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                <path
                  d="M7 17 17 7m0 0H8m9 0v9"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close resume preview"
              className="h-9 w-9 rounded-full border border-white/10 hover:border-accent-soft hover:bg-white/[0.05] hover:text-accent-soft text-chalk-200 transition-all duration-300 inline-flex items-center justify-center"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path
                  d="M6 6l12 12M6 18 18 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* PDF viewer (where the browser supports inline rendering) or a
            styled fallback panel on iOS / Android / older browsers. */}
        {canPreview ? (
          <iframe
            src="/main.pdf#toolbar=0&navpanes=0&scrollbar=0&view=FitH"
            title="Razeen Wasif resume"
            className="w-full flex-1 bg-white"
          />
        ) : (
          <div className="flex-1 flex items-center justify-center p-6 md:p-10">
            <div className="max-w-md text-center">
              <p className="eyebrow text-chalk-300">Preview unavailable</p>
              <h2 className="mt-4 font-display font-light text-chalk-50 text-[24px] md:text-[30px] leading-tight tracking-tightish">
                Your browser doesn't preview PDFs inline.
              </h2>
              <p className="mt-4 text-[14px] text-chalk-300 leading-relaxed">
                Tap below to download the file, or open it in a new tab — most
                mobile browsers will render it in their full-screen viewer
                there.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="/main.pdf"
                  download
                  className="inline-flex h-11 items-center gap-2 px-5 rounded-full bg-chalk-50 text-ink-900 text-[13px] font-medium transition-all duration-300 hover:bg-white justify-center"
                >
                  Download PDF
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 4v12m0 0 4-4m-4 4-4-4M4 20h16"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
                <a
                  href="/main.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 items-center gap-2 px-5 rounded-full border border-white/15 text-[13px] font-medium text-chalk-100 transition-all duration-300 hover:bg-white/10 hover:border-accent-soft hover:text-accent-soft justify-center"
                >
                  Open in new tab
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M7 17 17 7m0 0H8m9 0v9"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
