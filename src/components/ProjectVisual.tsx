import type { Dictionary, Project } from "@/types";
import { fmt } from "@/i18n/dictionary";
import { Shot } from "./Shot";
import { ArchitectureDiagram } from "./ArchitectureDiagram";

type Props = { p: Project; t: Dictionary["projects"]; aspect: string };

/** Visuel d'une carte, par ordre de priorité : capture d'écran réelle, image tirée de la démo vidéo, sinon schéma généré depuis les données du projet. */
export function ProjectVisual({ p, t, aspect }: Props) {
  const shot = p.images[0];
  const image = shot ? { src: shot.src, alt: shot.alt } : p.poster ? { src: p.poster, alt: fmt(t.posterAlt, { title: p.title }) } : null;
  if (image) {
    return (
      <span className="relative block h-full w-full overflow-hidden bg-surface2">
        <Shot
          src={image.src}
          alt={image.alt}
          label={t.placeholder}
          className={`${aspect} w-full rounded-none border-0 object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]`}
        />
      </span>
    );
  }
  const layers = p.architecture.length > 0 ? p.architecture : [{ layer: t.sections.stack, items: p.stack }];
  return <ArchitectureDiagram layers={layers} variant="card" className={`${aspect} w-full`} />;
}
