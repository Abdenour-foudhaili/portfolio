type Layer = { layer: string; items: string[] };
type Props = { layers: Layer[]; variant: "card" | "full"; className?: string };

/**
 * Schéma des composants d'un projet, généré uniquement à partir des données réelles (couches et technologies).
 * Les couches sont des « voies » : aucun ordre ni flux n'est suggéré, seulement la composition.
 * `card` : aperçu décoratif compact (masqué aux lecteurs d'écran, le titre de la carte suffit). `full` : liste complète et accessible.
 */
export function ArchitectureDiagram({ layers, variant, className = "" }: Props) {
  const card = variant === "card";
  const lanes = card ? layers.slice(0, 6) : layers;
  return (
    <div
      aria-hidden={card ? true : undefined}
      className={`overflow-hidden bg-surface2 bg-[linear-gradient(rgb(var(--line)/.55)_1px,transparent_1px),linear-gradient(90deg,rgb(var(--line)/.55)_1px,transparent_1px)] bg-[size:22px_22px] ${className}`}
    >
      <ol className={`flex h-full flex-col justify-center ${card ? "gap-2 p-4" : "gap-3 p-5"}`}>
        {lanes.map((l) => (
          <li key={l.layer} className={`grid items-center gap-3 ${card ? "grid-cols-[30%_1fr]" : "sm:grid-cols-[13rem_1fr]"}`}>
            <span className={`text-fg3 ${card ? "truncate text-[0.68rem] leading-4" : "text-sm text-fg2"}`}>{l.layer}</span>
            <span className="flex min-w-0 flex-wrap gap-1.5">
              {(card ? l.items.slice(0, 2) : l.items).map((i) => (
                <span key={i} dir="auto" className={`rounded border border-lineStrong bg-surface font-mono text-fg ${card ? "max-w-full truncate px-1.5 py-0.5 text-[0.68rem] leading-4" : "px-2 py-1 text-xs"}`}>{i}</span>
              ))}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
