"use client";
import { useEffect, useRef, type ReactNode } from "react";

type Props = { open: boolean; onClose: () => void; label: string; className?: string; onKeyDown?: (e: React.KeyboardEvent) => void; children: ReactNode };

/** <dialog> natif : piège le focus, se ferme avec Échap, clic sur le fond pour fermer. */
export function Dialog({ open, onClose, label, className = "", onKeyDown, children }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);
  useEffect(() => {
    if (!open) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => { document.documentElement.style.overflow = prev; };
  }, [open]);
  return (
    <dialog
      ref={ref}
      aria-label={label}
      onClose={onClose}
      onKeyDown={onKeyDown}
      onClick={(e) => { if (e.target === ref.current) onClose(); }}
      className={`m-auto border border-line bg-surface p-0 text-fg shadow-pop backdrop:bg-black/70 backdrop:backdrop-blur-sm ${className}`}
    >
      {open ? children : null}
    </dialog>
  );
}
