/** Export statique : `npm run build` génère le dossier `out/` (Vercel, GitHub Pages, Netlify...).
 *  GitHub Pages sous-dossier : définir NEXT_PUBLIC_BASE_PATH=/nom-du-depot avant le build. */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
export default {
  output: "export",
  basePath,
  images: { unoptimized: true },
  eslint: { ignoreDuringBuilds: true },
  trailingSlash: true,
};
