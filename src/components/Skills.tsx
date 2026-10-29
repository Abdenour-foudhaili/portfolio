import { profile as p } from "@/data/profile";
import type { Dictionary } from "@/types";
import { Section } from "./Section";
import { TechList } from "./TechList";

/** Deux niveaux : technologies principales (en grand) puis compétences complémentaires (le reste du CV, sans doublon). */
export function Skills({ t }: { t: Dictionary["skills"] }) {
  const shown = new Set(p.core.flatMap((c) => [...c.parts, ...c.related]));
  const others = p.skills
    .map((g) => ({ id: g.id, items: g.items.filter((i) => !shown.has(i)) }))
    .filter((g) => g.items.length > 0);
  return (
    <Section id="competences" index="03" title={t.title} intro={t.intro} tone="band">
      <h3 className="eyebrow">{t.coreTitle}</h3>
      <ul className="reveal mt-5 grid gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-2">
        {p.core.map((c) => (
          <li key={c.name} className="bg-surface p-6">
            <p className="font-display text-2xl leading-tight"><bdi>{c.name}</bdi></p>
            <TechList items={c.related} className="mt-4" />
          </li>
        ))}
      </ul>
      <h3 className="eyebrow mt-14">{t.otherTitle}</h3>
      <dl className="mt-5 divide-y divide-line border-y border-line">
        {others.map((g) => (
          <div key={g.id} className="reveal grid gap-2 py-4 sm:grid-cols-[13rem_1fr] sm:gap-8">
            <dt className="text-fg2">{t.groups[g.id as keyof typeof t.groups]}</dt>
            <dd><TechList items={g.items} /></dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
