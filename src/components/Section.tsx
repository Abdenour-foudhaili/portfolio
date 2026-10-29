import type { ReactNode } from "react";

type Props = { id: string; index: string; title: string; intro?: string; tone?: "plain" | "band"; /** Dernière section : hauteur minimale d'un écran, pour que l'ancre puisse se caler sous le header. */ fill?: boolean; children: ReactNode };

/** Gabarit commun : titre à gauche (fixe au défilement sur grand écran), contenu à droite. `band` = fond de surface pour rythmer la page. */
export function Section({ id, index, title, intro, tone = "plain", fill = false, children }: Props) {
  return (
    <section id={id} className={`${tone === "band" ? "border-y border-line bg-surface2/50" : ""} ${fill ? "min-h-[calc(100dvh-4rem)]" : ""}`}>
      <div className="wrap grid grid-cols-[minmax(0,1fr)] gap-10 py-20 md:py-28 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-16">
        <header className="reveal lg:sticky lg:top-24 lg:self-start">
          <p className="font-mono text-sm text-accent" dir="ltr">{index}</p>
          <h2 className="mt-3 text-3xl leading-tight tracking-tight md:text-4xl">{title}</h2>
          {intro && <p className="mt-4 max-w-sm text-sm leading-relaxed text-fg2">{intro}</p>}
        </header>
        <div className="min-w-0">{children}</div>
      </div>
    </section>
  );
}
