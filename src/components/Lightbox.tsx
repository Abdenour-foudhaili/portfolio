"use client";
import { Dialog } from "./Dialog";
import { Shot } from "./Shot";
import { fmt } from "@/i18n/dictionary";
import type { Dictionary, Shot as ShotT } from "@/types";

type Props = { items: ShotT[]; index: number | null; setIndex: (i: number | null) => void; t: Dictionary["lightbox"]; rtl: boolean; missingLabel: string };

export function Lightbox({ items, index, setIndex, t, rtl, missingLabel }: Props) {
  const open = index !== null;
  const i = index ?? 0;
  const go = (d: number) => setIndex((i + d + items.length) % items.length);
  const item = items[i];
  // Flèches : en RTL, « suivant » est à gauche.
  const next = rtl ? "ArrowLeft" : "ArrowRight";
  const prev = rtl ? "ArrowRight" : "ArrowLeft";
  return (
    <Dialog
      open={open}
      onClose={() => setIndex(null)}
      label={t.label}
      className="w-[96vw] max-w-6xl rounded-xl"
      onKeyDown={(e) => {
        if (items.length < 2) return;
        if (e.key === next) go(1);
        if (e.key === prev) go(-1);
      }}
    >
      {item && (
        <div className="relative flex max-h-[92dvh] flex-col">
          <div className="flex items-center justify-between gap-4 border-b border-line px-4 py-3 text-sm">
            <span className="truncate text-fg2">{item.caption ?? item.alt}</span>
            <span className="flex shrink-0 items-center gap-2">
              {items.length > 1 && <span dir="ltr" className="font-mono text-xs text-fg3">{fmt(t.counter, { n: i + 1, total: items.length })}</span>}
              <button type="button" onClick={() => setIndex(null)} className="btn-quiet btn-sm">{t.close}</button>
            </span>
          </div>
          <div className="min-h-0 flex-1 overflow-auto bg-surface2 p-2">
            <Shot src={item.src} alt={item.alt} label={missingLabel} className="mx-auto max-h-[78dvh] w-auto max-w-full rounded" />
          </div>
          {items.length > 1 && (
            <div className="flex justify-between border-t border-line p-3">
              <button type="button" onClick={() => go(-1)} className="btn-quiet btn-sm">{t.prev}</button>
              <button type="button" onClick={() => go(1)} className="btn-quiet btn-sm">{t.next}</button>
            </div>
          )}
        </div>
      )}
    </Dialog>
  );
}
