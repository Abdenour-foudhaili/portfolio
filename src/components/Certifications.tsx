"use client";
import { useState } from "react";
import raw from "@/data/certifications.json";
import type { CertificationMeta, Dictionary } from "@/types";
import { Section } from "./Section";
import { Shot } from "./Shot";
import { Lightbox } from "./Lightbox";
import { TechList } from "./TechList";
import { Arrow } from "./Arrow";
import { fmt } from "@/i18n/dictionary";

const certs = raw as unknown as CertificationMeta[];
const withImage = certs.filter((c) => c.image);

export function Certifications({ t, lightbox, rtl }: { t: Dictionary["certifications"]; lightbox: Dictionary["lightbox"]; rtl: boolean }) {
  const [zoom, setZoom] = useState<number | null>(null);
  const label = (c: CertificationMeta) => t.items[c.id]?.name ?? c.id;
  const items = withImage.map((c) => ({ src: c.image as string, alt: fmt(t.imageAlt, { name: label(c) }), caption: `${c.issuer}, ${label(c)}` }));
  return (
    <Section id="certifications" index="05" title={t.title} intro={t.intro} tone="band">
      <ul className="grid gap-x-8 gap-y-12 sm:grid-cols-2">
        {certs.map((c) => {
          const x = t.items[c.id];
          if (!x) return null;
          const idx = withImage.findIndex((w) => w.id === c.id);
          return (
            <li key={c.id} className="reveal flex flex-col">
              {/* Le document est présenté en entier (object-contain) sur un « passe-partout », jamais rogné. */}
              {c.image && (
                <button type="button" onClick={() => setZoom(idx)} aria-label={fmt(t.enlarge, { issuer: c.issuer })} className="group surface mb-5 block overflow-hidden p-3 transition-colors hover:border-lineStrong">
                  <Shot src={c.image} alt={fmt(t.imageAlt, { name: x.name })} label={t.imageSoon} className="aspect-[4/3] w-full rounded-md bg-surface2 object-contain transition-transform duration-500 group-hover:scale-[1.02]" />
                </button>
              )}
              <div className={`flex flex-1 flex-col ${c.image ? "" : "surface p-6"}`}>
                <p className="eyebrow"><bdi>{c.issuer}</bdi></p>
                <h3 className="mt-2 font-display text-lg leading-snug">{x.name}</h3>
                <p className="mt-1 text-sm text-fg2">{x.date}</p>
                <TechList items={c.skills} className="mt-3" />
                {c.verifyUrl && (
                  <div className="mt-auto pt-4 text-sm">
                    <a href={c.verifyUrl} target="_blank" rel="noopener noreferrer" className="link inline-flex items-center gap-2">{t.verify}<Arrow /></a>
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ul>
      <Lightbox items={items} index={zoom} setIndex={setZoom} t={lightbox} rtl={rtl} missingLabel={t.imageSoon} />
    </Section>
  );
}
