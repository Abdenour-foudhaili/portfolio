/** Préfixe les chemins publics avec le basePath (utile pour GitHub Pages). */
export const asset = (path: string) =>
  /^https?:/.test(path) ? path : `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
