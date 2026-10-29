import { profile as p } from "@/data/profile";
import type { Dictionary } from "@/types";
import { Section } from "./Section";

export function Education({ t }: { t: Dictionary["education"] }) {
  return (
    <Section id="formation" index="06" title={t.title}>
      <ul className="divide-y divide-line border-y border-line">
        {p.education.map((e) => {
          const x = t.items[e.id];
          if (!x) return null;
          return (
            <li key={e.id} className="reveal grid gap-2 py-6 md:grid-cols-[11rem_minmax(0,1fr)] md:gap-10">
              <p className="font-mono text-sm text-accent">{x.period}</p>
              <div>
                <h3 className="text-lg md:text-xl">{x.degree}</h3>
                <p className="mt-1 text-fg2"><bdi>{e.school}</bdi></p>
                <p className="text-sm text-fg3">{x.place}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
