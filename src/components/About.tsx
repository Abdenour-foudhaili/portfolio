import type { Dictionary } from "@/types";
import type { Locale } from "@/i18n/config";
import { Section } from "./Section";

export function About({ t, lang }: { t: Dictionary["about"]; lang: Locale }) {
  const sep = lang === "ar" ? "، " : ", ";
  return (
    <Section id="apropos" index="01" title={t.title}>
      <p className="reveal font-display text-2xl leading-snug text-fg md:text-[1.75rem]">{t.summary}</p>
      <p className="reveal mt-6 max-w-2xl leading-relaxed text-fg2">{t.objective}</p>
      <div className="reveal mt-12 grid gap-10 border-t border-line pt-8 md:grid-cols-[1.4fr_1fr]">
        <div>
          <h3 className="eyebrow">{t.interestsTitle}</h3>
          <ul className="mt-4 space-y-3 text-fg2">
            {t.interests.map((i) => <li key={i} className="border-s-2 border-accent/70 ps-4">{i}</li>)}
          </ul>
        </div>
        <div>
          <h3 className="eyebrow">{t.languagesTitle}</h3>
          <p className="mt-4 text-fg2">{t.languages.map((l) => `${l.name} (${l.level})`).join(sep)}</p>
        </div>
      </div>
    </Section>
  );
}
