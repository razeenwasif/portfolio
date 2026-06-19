import { createContext, useContext } from "react";

export type ResumeModalCtx = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

export const ResumeModalContext = createContext<ResumeModalCtx | null>(null);

export function useResumeModal(): ResumeModalCtx {
  const value = useContext(ResumeModalContext);
  if (!value) {
    throw new Error("useResumeModal must be used within ResumeModalProvider");
  }
  return value;
}
