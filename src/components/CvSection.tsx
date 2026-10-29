import { profile as p } from "@/data/profile";
import { asset } from "@/lib/asset";
import type { Dictionary } from "@/types";
import { locales, nativeName, type Locale } from "@/i18n/config";
import { Section } from "./Section";

export function CvSection({ t, lang }: { t: Dictionary["cv"]; lang: Locale }) {
  return (
    <Section id="cv" index="07" title={t.title}>
      <ul className="divide-y divide-line border-y border-line">
        {locales.map((l) => (
          <li key={l} className="reveal flex flex-wrap items-center justify-between gap-x-6 gap-y-3 py-5">
            <p className="flex items-center gap-3">
              <span lang={l} className="font-display text-lg">{nativeName[l]}</span>
              <span className="font-mono text-xs text-fg3">PDF</span>
              {l === lang && <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />}
            </p>
            <span className="flex items-center gap-3">
              <a href={asset(p.cv[l])} target="_blank" rel="noopener noreferrer" className="btn-quiet btn-sm" aria-label={`${t.view} (${nativeName[l]})`}>{t.view}</a>
              <a href={asset(p.cv[l])} download className="btn-primary btn-sm" aria-label={`${t.download} (${nativeName[l]})`}>{t.download}</a>
            </span>
          </li>
        ))}
      </ul>
    </Section>
  );
}
