import { profile as p } from "@/data/profile";
import { asset } from "@/lib/asset";
import type { Dictionary, Project } from "@/types";
import type { Locale } from "@/i18n/config";
import { Arrow } from "./Arrow";

export function Hero({ t, lang, projects }: { t: Dictionary["hero"]; lang: Locale; projects: Project[] }) {
  const delay = (i: number) => ({ "--i": i }) as React.CSSProperties;
  const featured = projects.filter((x) => x.featured).slice(0, 3);
  return (
    <section id="accueil" className="wrap pb-16 pt-10 md:pb-24 md:pt-16">
      <div className="grid grid-cols-[minmax(0,1fr)] items-start gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-16">
        {/* Portrait : petit repère d'identité (avatar sur mobile, carte sur grand écran). */}
        <figure className="rise surface w-36 overflow-hidden sm:w-48 lg:order-last lg:w-full" style={delay(2)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={asset(p.photo)} alt={t.photoAlt} width={440} height={500} className="aspect-[4/4.6] w-full object-cover object-top" />
        </figure>
        <div className="min-w-0">
          <p className="rise inline-flex items-center gap-2.5 rounded-full border border-line bg-surface px-3.5 py-1.5 text-sm text-fg2" style={delay(0)}>
            <span className="h-2 w-2 shrink-0 rounded-full bg-ok" aria-hidden="true" />
            {t.status}
          </p>
          <h1 className="rise mt-7 text-5xl font-medium leading-[1.02] tracking-tight sm:text-7xl" style={delay(1)}>{p.name}</h1>
          <p className="rise mt-4 font-display text-2xl text-fg2 sm:text-3xl" style={delay(2)}>{t.title}</p>
          <p className="rise mt-6 max-w-2xl text-lg leading-relaxed text-fg" style={delay(3)}>{t.headline}</p>
          <p className="rise mt-3 text-base text-fg3" style={delay(3.5)}>{t.sub}</p>
          <div className="rise mt-8 flex flex-wrap items-center gap-3" style={delay(4)}>
            <a href="#projets" className="btn-primary">{t.ctaProjects}</a>
            <a href={asset(p.cv[lang])} download className="btn-quiet">{t.ctaCv}</a>
            <a href="#contact" className="link ms-2 inline-flex min-h-11 items-center text-sm sm:min-h-0">{t.ctaContact}</a>
          </div>
          <p className="rise mt-7 text-sm text-fg3" style={delay(4.5)}>
            <span className="font-medium text-fg">{t.techLabel}</span> {t.techList}
          </p>
          <p className="rise mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm" style={delay(4.8)}>
            <a href={p.github} target="_blank" rel="noopener noreferrer" className="link">GitHub</a>
            <a href={p.linkedin} target="_blank" rel="noopener noreferrer" className="link">LinkedIn</a>
            <a href={`mailto:${p.email}`} className="link">{p.email}</a>
          </p>
          {featured.length > 0 && (
            <nav aria-label={t.projectsLabel} className="rise mt-12 border-t border-line pt-6" style={delay(5)}>
              <p className="eyebrow">{t.projectsLabel}</p>
              <ol className="mt-2 divide-y divide-line">
                {featured.map((x, i) => (
                  <li key={x.slug}>
                    <a href="#projets" className="group flex items-center justify-between gap-4 py-3.5">
                      <span className="flex min-w-0 items-baseline gap-4">
                        <span className="font-mono text-xs text-fg3" dir="ltr">0{i + 1}</span>
                        <span className="font-display text-lg leading-snug transition-colors group-hover:text-accent">{x.title}</span>
                      </span>
                      <Arrow className="text-fg3 group-hover:translate-x-1 group-hover:text-accent rtl:group-hover:-translate-x-1" />
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          )}
        </div>
      </div>
    </section>
  );
}
