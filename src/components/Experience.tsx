import { profile as p } from "@/data/profile";
import type { Dictionary } from "@/types";
import { Section } from "./Section";
import { TechList } from "./TechList";
import { Arrow } from "./Arrow";

export function Experience({ t }: { t: Dictionary["experience"] }) {
  return (
    <Section id="experience" index="04" title={t.title}>
      <ol className="divide-y divide-line border-y border-line">
        {p.experience.map((e) => {
          const x = t.items[e.id];
          if (!x) return null;
          return (
            <li key={e.id} className="reveal grid gap-4 py-8 md:grid-cols-[11rem_minmax(0,1fr)] md:gap-10">
              <div>
                <p className="font-mono text-sm text-accent">{x.period}</p>
                <p className="mt-1 text-sm text-fg3">{x.place}</p>
              </div>
              <div>
                <h3 className="text-xl leading-snug md:text-2xl">{x.role}</h3>
                <p className="mt-1 text-fg2">{x.org}</p>
                <ul className="mt-5 list-disc space-y-2 ps-5 leading-relaxed text-fg2 marker:text-lineStrong">
                  {x.points.map((pt) => <li key={pt}>{pt}</li>)}
                </ul>
                <TechList items={e.stack} className="mt-5" />
                {e.link && (
                  <a href={e.link} target="_blank" rel="noopener noreferrer" className="link mt-5 inline-flex items-center gap-2 text-sm">
                    {t.repo}<Arrow />
                  </a>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
