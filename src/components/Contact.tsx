import { profile as p } from "@/data/profile";
import { fmt } from "@/i18n/dictionary";
import type { Dictionary } from "@/types";
import { Section } from "./Section";
import { Arrow } from "./Arrow";

export function Contact({ t, status }: { t: Dictionary["contact"]; status: string }) {
  const rows = [
    [t.phone, p.phone, `tel:${p.phone.replace(/\s/g, "")}`],
    [t.github, "github.com/Abdenour-foudhaili", p.github],
    [t.linkedin, "linkedin.com/in/abdenour-foudhaili", p.linkedin],
  ] as const;
  return (
    <Section id="contact" index="08" title={t.title} tone="band" fill>
      <p className="reveal max-w-xl text-lg leading-relaxed text-fg2">{fmt(t.intro, { status })}</p>
      {/* Adresses, URL et numéros restent en LTR même au milieu d'une page RTL. */}
      <a dir="ltr" href={`mailto:${p.email}`} className="reveal group mt-8 inline-flex max-w-full items-center gap-3 break-all font-display text-2xl text-fg underline decoration-accent decoration-2 underline-offset-[10px] transition-colors hover:text-accent sm:text-4xl">
        {p.email}<Arrow className="shrink-0" />
      </a>
      <dl className="mt-14 divide-y divide-line border-y border-line">
        {rows.map(([k, label, href]) => (
          <div key={k} className="reveal grid gap-1 py-4 sm:grid-cols-[10rem_1fr]">
            <dt className="text-fg3">{k}</dt>
            <dd><a dir="ltr" href={href} {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="link inline-block break-all">{label}</a></dd>
          </div>
        ))}
        <div className="grid gap-1 py-4 sm:grid-cols-[10rem_1fr]"><dt className="text-fg3">{t.location}</dt><dd className="text-fg2">{t.locationValue}</dd></div>
      </dl>
    </Section>
  );
}
