"use client";
import { useState } from "react";
import type { Dictionary, Project } from "@/types";
import { Section } from "./Section";
import { Dialog } from "./Dialog";
import { Shot } from "./Shot";
import { ProjectVisual } from "./ProjectVisual";
import { ArchitectureDiagram } from "./ArchitectureDiagram";
import { Lightbox } from "./Lightbox";
import { Chip } from "./Chip";
import { TechList } from "./TechList";
import { Arrow } from "./Arrow";
import { asset } from "@/lib/asset";
import { fmt } from "@/i18n/dictionary";

type T = Dictionary["projects"];
type LB = Dictionary["lightbox"];
type Props = { projects: Project[]; t: T; lightbox: LB; rtl: boolean };

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-9">
      <h3 className="eyebrow !text-accent">{title}</h3>
      <div className="mt-3">{children}</div>
    </section>
  );
}

function Gallery({ project, t, lightbox, rtl }: { project: Project; t: T; lightbox: LB; rtl: boolean }) {
  const [current, setCurrent] = useState(0);
  const [zoom, setZoom] = useState<number | null>(null);
  const imgs = project.images;
  if (imgs.length === 0) return null;
  return (
    <div>
      <button type="button" onClick={() => setZoom(current)} className="block w-full overflow-hidden rounded-card border border-line bg-surface2 transition-opacity hover:opacity-95" aria-label={t.enlarge}>
        <Shot src={imgs[current].src} alt={imgs[current].alt} label={t.placeholder} className="h-auto w-full object-contain" />
      </button>
      {imgs.length > 1 && (
        <ul className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {imgs.map((im, i) => (
            <li key={im.src} className="shrink-0">
              <button type="button" onClick={() => setCurrent(i)} aria-label={fmt(t.showShot, { n: i + 1 })} aria-current={i === current} className={`block overflow-hidden rounded-md border ${i === current ? "border-accent" : "border-line"}`}>
                <Shot src={im.src} alt="" label={t.placeholder} className="h-16 w-28 object-cover object-top" />
              </button>
            </li>
          ))}
        </ul>
      )}
      <Lightbox items={imgs} index={zoom} setIndex={setZoom} t={lightbox} rtl={rtl} missingLabel={t.placeholder} />
    </div>
  );
}

function Detail({ project: p, t, lightbox, rtl, onClose }: { project: Project; t: T; lightbox: LB; rtl: boolean; onClose: () => void }) {
  const s = t.sections;
  return (
    <div className="max-h-[92dvh] overflow-y-auto">
      <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-line bg-surface/95 px-5 py-4 backdrop-blur sm:px-8">
        <div>
          <h2 className="text-2xl leading-tight md:text-3xl">{p.title}</h2>
          <p className="mt-1 text-sm text-fg2">{p.tagline}</p>
        </div>
        <button type="button" onClick={onClose} className="btn-quiet btn-sm shrink-0">{t.close}</button>
      </div>
      <div className="px-5 pb-10 pt-6 sm:px-8">
        <Gallery project={p} t={t} lightbox={lightbox} rtl={rtl} />
        {p.video && (
          <Block title={s.video}>
            <video controls preload="metadata" poster={p.poster ? asset(p.poster) : undefined} className="w-full rounded-card border border-line" src={asset(p.video)} />
          </Block>
        )}
        <Block title={s.presentation}>
          <p className="leading-relaxed text-fg2">{p.summary}</p>
          {p.context && <p className="mt-3 leading-relaxed text-fg2">{p.context}</p>}
        </Block>
        <Block title={s.features}>
          <ul className="list-disc space-y-2 ps-5 text-sm leading-relaxed text-fg2 marker:text-lineStrong">{p.features.map((f) => <li key={f}>{f}</li>)}</ul>
        </Block>
        {p.architecture.length > 0 && (
          <Block title={s.architecture}>
            <ArchitectureDiagram layers={p.architecture} variant="full" className="rounded-card border border-line" />
          </Block>
        )}
        <Block title={s.role}>
          <p className="text-fg">{p.role}</p>
          <ul className="mt-3 list-disc space-y-2 ps-5 text-sm leading-relaxed text-fg2 marker:text-lineStrong">{p.contributions.map((c) => <li key={c}>{c}</li>)}</ul>
        </Block>
        {p.challenges.length > 0 && (
          <Block title={s.challenges}>
            <ul className="space-y-3 text-sm text-fg2">{p.challenges.map((c) => <li key={c.problem}><span className="text-fg">{c.problem}</span> : {c.solution}</li>)}</ul>
          </Block>
        )}
        <Block title={s.stack}>
          <div className="flex flex-wrap gap-2">{p.stack.map((x) => <Chip key={x}>{x}</Chip>)}</div>
        </Block>
        {(p.github || p.demo) && (
          <Block title={s.links}>
            <div className="flex flex-wrap gap-3">
              {p.github && <a href={p.github} target="_blank" rel="noopener noreferrer" className="btn-primary">{t.github}</a>}
              {p.demo && <a href={p.demo} target="_blank" rel="noopener noreferrer" className="btn-quiet">{t.demo}</a>}
            </div>
          </Block>
        )}
      </div>
    </div>
  );
}

/** Projet phare : grande rangée éditoriale, image et texte en alternance. */
function FeaturedRow({
  p,
  n,
  flip,
  t,
  onOpen,
  onOpenVideo,
}: {
  p: Project;
  n: number;
  flip: boolean;
  t: T;
  onOpen: () => void;
  onOpenVideo: () => void;
}) {
  return (
    <div className="reveal group grid w-full gap-6 text-start md:grid-cols-12 md:items-center md:gap-10">
      <button
        type="button"
        onClick={onOpen}
        aria-label={p.title}
        className={`block overflow-hidden rounded-card border border-line shadow-card text-start transition-colors hover:border-lineStrong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent md:col-span-7 ${flip ? "md:order-last" : ""}`}
      >
        <ProjectVisual p={p} t={t} aspect="aspect-[16/9]" />
      </button>
      <div className="block md:col-span-5">
        <span className="font-mono text-sm text-accent" dir="ltr">0{n}</span>
        <button
          type="button"
          onClick={onOpen}
          className="mt-2 block text-start font-display text-2xl leading-tight transition-colors hover:text-accent md:text-3xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
        >
          {p.title}
        </button>
        <p className="mt-3 block leading-relaxed text-fg2">{p.tagline}</p>
        <TechList items={p.stack.slice(0, 6)} className="mt-5" />
        <div className="mt-6 flex flex-col items-start gap-2.5 text-sm">
          <button
            type="button"
            onClick={onOpen}
            className="inline-flex items-center gap-2 font-medium text-fg transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
          >
            <span>{t.viewDetail}</span>
            <Arrow className="transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
          </button>
          {p.video && (
            <button
              type="button"
              onClick={onOpenVideo}
              className="inline-flex items-center gap-2 font-medium text-accent transition-colors hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
            >
              <svg viewBox="0 0 16 16" width="13" height="13" fill="currentColor" aria-hidden="true" className="shrink-0 rtl:-scale-x-100">
                <path d="M4 3.5v9l9-4.5z" />
              </svg>
              <span>{t.sections.video}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/** Projet secondaire : carte compacte. */
function CompactCard({
  p,
  t,
  onOpen,
  onOpenVideo,
}: {
  p: Project;
  t: T;
  onOpen: () => void;
  onOpenVideo: () => void;
}) {
  return (
    <div className="reveal group surface flex h-full w-full flex-col overflow-hidden text-start transition-colors hover:border-lineStrong">
      <button
        type="button"
        onClick={onOpen}
        aria-label={p.title}
        className="block w-full overflow-hidden border-b border-line text-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        <ProjectVisual p={p} t={t} aspect="aspect-[16/8]" />
      </button>
      <div className="flex flex-1 flex-col p-6">
        <button
          type="button"
          onClick={onOpen}
          className="text-start font-display text-xl leading-snug transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
        >
          {p.title}
        </button>
        <p className="mt-2 block text-sm leading-relaxed text-fg2">{p.tagline}</p>
        <TechList items={p.stack.slice(0, 5)} className="mt-4" />
        <div className="mt-auto flex flex-col items-start gap-2 pt-5 text-sm">
          <button
            type="button"
            onClick={onOpen}
            className="inline-flex items-center gap-2 text-fg hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
          >
            <span>{t.viewDetail}</span>
            <Arrow className="transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
          </button>
          {p.video && (
            <button
              type="button"
              onClick={onOpenVideo}
              className="inline-flex items-center gap-2 font-medium text-accent hover:opacity-85 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
            >
              <svg viewBox="0 0 16 16" width="13" height="13" fill="currentColor" aria-hidden="true" className="shrink-0 rtl:-scale-x-100">
                <path d="M4 3.5v9l9-4.5z" />
              </svg>
              <span>{t.sections.video}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export function Projects({ projects, t, lightbox, rtl }: Props) {
  const filterIds = ["all", ...Array.from(new Set(projects.flatMap((p) => p.tags)))];
  const [filter, setFilter] = useState("all");
  const [active, setActive] = useState<Project | null>(null);
  const [activeVideo, setActiveVideo] = useState<Project | null>(null);
  const list = projects.filter((p) => filter === "all" || p.tags.includes(filter));
  const featured = list.filter((p) => p.featured);
  const others = list.filter((p) => !p.featured);

  return (
    <Section id="projets" index="02" title={t.title} intro={t.intro}>
      <div role="group" aria-label={t.filterLabel} className="mb-12 flex flex-wrap gap-2">
        {filterIds.map((f) => (
          <button
            key={f}
            type="button"
            aria-pressed={filter === f}
            onClick={() => setFilter(f)}
            className={`min-h-11 rounded-full border px-4 text-sm transition-colors sm:min-h-0 sm:px-3.5 sm:py-1.5 ${filter === f ? "border-fg bg-fg text-bg" : "border-line text-fg2 hover:border-lineStrong hover:text-fg"}`}
          >
            {t.filters[f] ?? f}
          </button>
        ))}
      </div>

      <ul className="space-y-16 md:space-y-24">
        {featured.map((p, i) => (
          <li key={p.slug} className="fade-in">
            <FeaturedRow
              p={p}
              n={i + 1}
              flip={i % 2 === 1}
              t={t}
              onOpen={() => setActive(p)}
              onOpenVideo={() => setActiveVideo(p)}
            />
          </li>
        ))}
      </ul>

      {others.length > 0 && (
        <ul className={`grid gap-5 sm:grid-cols-2 ${featured.length > 0 ? "mt-16 md:mt-24" : ""}`}>
          {others.map((p) => (
            <li key={p.slug} className="fade-in">
              <CompactCard
                p={p}
                t={t}
                onOpen={() => setActive(p)}
                onOpenVideo={() => setActiveVideo(p)}
              />
            </li>
          ))}
        </ul>
      )}

      {/* Modal Fiche Détaillée */}
      <Dialog
        open={active !== null}
        onClose={() => setActive(null)}
        label={active ? `${t.projectLabel} ${active.title}` : t.projectLabel}
        className="w-[96vw] max-w-4xl rounded-2xl"
      >
        {active && <Detail project={active} t={t} lightbox={lightbox} rtl={rtl} onClose={() => setActive(null)} />}
      </Dialog>

      {/* Modal Démonstration Vidéo */}
      <Dialog
        open={activeVideo !== null}
        onClose={() => setActiveVideo(null)}
        label={activeVideo ? `${t.sections.video} : ${activeVideo.title}` : t.sections.video}
        className="w-[96vw] max-w-4xl rounded-2xl overflow-hidden"
      >
        {activeVideo && activeVideo.video && (
          <div className="bg-surface">
            <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-4 sm:px-6">
              <div className="min-w-0">
                <span className="eyebrow !text-accent">{t.sections.video}</span>
                <h3 className="truncate font-display text-xl text-fg sm:text-2xl">{activeVideo.title}</h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveVideo(null)}
                className="btn-quiet btn-sm shrink-0"
              >
                {t.close}
              </button>
            </div>
            <div className="bg-black/90 p-2 sm:p-4">
              <video
                controls
                autoPlay
                preload="metadata"
                poster={activeVideo.poster ? asset(activeVideo.poster) : undefined}
                className="aspect-video w-full rounded-lg border border-line/40 shadow-2xl"
                src={asset(activeVideo.video)}
              />
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line px-5 py-3.5 sm:px-6">
              <p className="max-w-md text-xs text-fg2">{activeVideo.tagline}</p>
              <button
                type="button"
                onClick={() => {
                  const pr = activeVideo;
                  setActiveVideo(null);
                  setActive(pr);
                }}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-fg hover:text-accent transition-colors"
              >
                <span>{t.viewDetail}</span>
                <Arrow />
              </button>
            </div>
          </div>
        )}
      </Dialog>
    </Section>
  );
}
