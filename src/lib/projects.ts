import metaRaw from "@/data/projects.json";
import { fmt } from "@/i18n/dictionary";
import type { Dictionary, Project, ProjectMeta } from "@/types";

const metas = metaRaw as unknown as ProjectMeta[];

/** Fusionne les données techniques (projects.json) et les textes de la langue courante. */
export function getProjects(t: Dictionary): Project[] {
  return metas.flatMap((m) => {
    const text = t.projects.items[m.slug];
    if (!text) return []; // projet sans traduction : ignoré plutôt qu'affiché à moitié
    return [{
      ...m,
      ...text,
      images: m.images.map((im, i) => ({
        src: im.src,
        alt: text.shots[i]?.alt ?? fmt(t.projects.shotAlt, { n: i + 1, title: text.title }),
        caption: text.shots[i]?.caption,
      })),
    }];
  });
}
