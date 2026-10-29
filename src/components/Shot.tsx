"use client";
import { useState } from "react";
import { asset } from "@/lib/asset";

type Props = { src?: string | null; alt: string; label: string; className?: string };

/** Image réelle. Si le fichier est absent ou introuvable : bloc neutre sans texte visible (jamais de fausse capture, jamais de message technique). */
export function Shot({ src, alt, label, className = "" }: Props) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) return <div role="img" aria-label={label} className={`border border-line bg-surface2 ${className}`} />;
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={asset(src)} alt={alt} loading="lazy" decoding="async" onError={() => setFailed(true)} className={className} />;
}
