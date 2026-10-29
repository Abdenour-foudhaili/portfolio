import type fr from "@/messages/fr.json";

export type Shot = { src: string; alt: string; caption?: string };

/** Données techniques d'un projet, identiques dans toutes les langues (src/data/projects.json). */
export type ProjectMeta = {
  slug: string;
  featured: boolean;
  /** Identifiants de filtres : Spring, NestJS, Angular, DevOps, AI, Microservices, Java (libellés dans messages/*.json). */
  tags: string[];
  stack: string[];
  /** Chemins depuis /public. Le texte alternatif vient de messages/*.json (projects.items.<slug>.shots), sinon un texte générique. */
  images: { src: string }[];
  /** Image tirée de la vidéo de démo (aperçu de carte) ; null = schéma d'architecture généré à partir des données. */
  poster: string | null;
  video: string | null;
  github: string | null;
  demo: string | null;
};

/** Textes d'un projet, un jeu par langue (src/messages/<lang>.json → projects.items.<slug>). */
export type ProjectText = {
  title: string;
  tagline: string;
  summary: string;
  context: string;
  features: string[];
  architecture: { layer: string; items: string[] }[];
  role: string;
  contributions: string[];
  challenges: { problem: string; solution: string }[];
  shots: { alt: string; caption?: string }[];
};

export type Project = Omit<ProjectMeta, "images"> & ProjectText & { images: Shot[] };

export type CertificationMeta = {
  id: string;
  issuer: string;
  image: string | null;
  skills: string[];
  verifyUrl: string | null;
};

type Fr = typeof fr;
/** Forme du dictionnaire : dérivée de fr.json, avec des tables ouvertes pour les contenus ajoutables. */
export type Dictionary = Omit<Fr, "experience" | "education" | "certifications" | "projects"> & {
  experience: Omit<Fr["experience"], "items"> & { items: Record<string, Fr["experience"]["items"]["dsi"]> };
  education: Omit<Fr["education"], "items"> & { items: Record<string, Fr["education"]["items"]["esprit"]> };
  certifications: Omit<Fr["certifications"], "items"> & { items: Record<string, { name: string; date: string }> };
  projects: Omit<Fr["projects"], "items" | "filters"> & { filters: Record<string, string>; items: Record<string, ProjectText> };
};
