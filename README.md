# Portfolio d’Abdenour Foudhaili

Next.js 15 (export statique) · TypeScript · Tailwind CSS 3. Aucun backend, aucune clé API.

## Installer et lancer
```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # génère le dossier out/ (site statique)
npm run typecheck    # vérification TypeScript
```


## Internationalisation (FR / EN / AR)
- **URL :** `/fr/`, `/en/`, `/ar/` (la racine `/` redirige vers la langue mémorisée, sinon le français).
- **Textes :** `src/messages/fr.json`, `en.json`, `ar.json` (mêmes clés partout). Les données non traduisibles (technologies, liens, fichiers) restent dans `src/data/*`.
- **Vérifier la cohérence des traductions :** `npm run check:i18n`
- **`lang` / `dir` :** posés sur `<html>` par `src/app/[lang]/layout.tsx` (`ar` → `rtl`).
- **CV :** un fichier par langue, déclaré dans `src/data/profile.ts` (`cv`), dossier `public/cv/`.
- **Ajouter un projet :** une entrée dans `projects.json` (données techniques) **et** un bloc `projects.items.<slug>` dans les trois fichiers de messages.
- **Ajouter un certificat :** une entrée dans `certifications.json` **et** `certifications.items.<id>` (nom, date) dans les trois messages.
- **Captures :** listez `{ "src": "..." }` dans `images` ; le texte alternatif vient de `projects.items.<slug>.shots` (même ordre), sinon un texte générique est utilisé.
- **Ajouter une langue :** ajouter le code dans `src/i18n/config.ts`, créer `src/messages/<code>.json`, l'importer dans `src/i18n/dictionary.ts` et ajouter un CV dans `profile.ts`.

## Visuels de projets
Ordre de priorité pour l'image d'une carte : **capture d'écran** (`images[0]`) → **image de la démo** (`poster`) → **schéma des composants** généré depuis `architecture` (ou, à défaut, `stack`). Rien n'est affiché comme « à venir » : un champ vide disparaît de la page.
- **Ajouter l'image d'une vidéo :** `ffmpeg -ss 00:00:35 -i public/media/videos/demo.mp4 -frames:v 1 -vf scale=1400:-1 public/media/projects/<slug>/poster.webp`, puis `"poster": "/media/projects/<slug>/poster.webp"` dans `projects.json`. Vérifiez qu'aucune donnée personnelle n'apparaît à l'écran.
- **Liens :** `github` et `demo` à `null` = aucun bouton affiché.
- **Compétences principales :** `core` dans `src/data/profile.ts` (les autres technologies s'affichent dans « complémentaires », sans doublon).

## Design system « Graphite & Braise »
- **Source unique :** les variables CSS de `src/app/globals.css` (`:root` = sombre, `[data-theme="light"]` = clair). `tailwind.config.ts` ne fait que les exposer (`bg`, `surface`, `surface2`, `line`, `fg`, `fg2`, `fg3`, `accent`, `accentFg`, `ok`). Changer une couleur = modifier une variable, jamais un hexadécimal dans un composant.
- **Surfaces :** fond (`bg`) < surface (`surface`) < surface 2 (`surface2`, utilisée pour les bandes de sections). **Texte :** `fg` (titres) / `fg2` (courant) / `fg3` (tertiaire). **Accent :** une seule couleur braise, avec `accentFg` pour le texte posé dessus.
- **Typographie :** Fraunces (titres), Geist (texte), Geist Mono (détails techniques), Noto Sans Arabic (repli pour l'arabe) : `src/lib/fonts.ts`.
- **Composants utilitaires :** `.btn-primary`, `.btn-quiet`, `.link`, `.tag`, `.eyebrow`, `.surface`, `.wrap` (globals.css).
- **Mouvement :** apparition à l'arrivée (`.rise`) et au défilement (`.reveal`, CSS pur), désactivés avec `prefers-reduced-motion`.

## Thème clair / sombre
- **Bouton :** `src/components/ThemeToggle.tsx`, dans l'en-tête à côté du sélecteur de langue. Libellés traduits : `a11y.themeToLight` / `a11y.themeToDark` dans `src/messages/*.json`.
- **Choix :** mémorisé dans `localStorage` (clé `portfolio-theme`). Sans choix enregistré, la préférence système est suivie (y compris si elle change), sinon thème sombre.
- **Anti-flash :** `src/lib/theme.ts` contient le script exécuté avant l'hydratation (via `next/script`, `beforeInteractive`, dans les deux layouts). Il pose `data-theme="light|dark"` sur `<html>`.
- **Couleurs :** `tailwind.config.ts` référence des variables CSS (`--c-ink`, `--c-panel`, `--c-accent`...) définies dans `src/app/globals.css` pour `:root` (sombre) et `[data-theme="light"]`. Pour changer une couleur, modifier uniquement ces variables. N'utilisez plus de couleurs hexadécimales dans les composants.

## Où modifier quoi
| Besoin | Fichier |
|---|---|
| Contact, liens, listes de technologies, fichiers CV | `src/data/profile.ts` |
| Tous les textes (résumé, expériences, formation, interface) | `src/messages/*.json` |
| Projets | `src/data/projects.json` |
| Certifications | `src/data/certifications.json` |
| Photo, certificats, captures, vidéos | `public/media/...` |
| CV (remplacer le PDF en gardant le nom) | `public/cv/CV_Abdenour_Foudhaili.pdf` |
| Couleurs | `tailwind.config.ts` (clés `ink`, `panel`, `accent`...) |

## Ajouter un projet
Ajouter un objet dans `src/data/projects.json` (copier un existant). Champs : `slug`, `title`, `tagline`, `featured`, `tags` (filtres), `summary`, `features`, `stack`, `architecture` (couches), `role`, `contributions`, `challenges` (`[]` si inconnu : la section est masquée), `images`, `video`, `github`, `demo`. Un lien à `null` affiche « lien à venir ».

## Ajouter des captures d’écran
1. Déposer les fichiers (WebP ou PNG, ~1600 px de large) dans `public/media/projects/<slug>/`.
2. Les lister dans `images` du projet :
```json
"images": [
  { "src": "/media/projects/flashdrop/01-catalogue.webp", "alt": "Catalogue des ventes flash", "caption": "Page catalogue" }
]
```
Vidéo : déposer le MP4 dans `public/media/videos/` puis `"video": "/media/videos/flashdrop.mp4"` (garder < 20 Mo). Masquer toute donnée sensible avant d’ajouter une capture.

## Ajouter une certification
Déposer l’image dans `public/media/certifications/` puis ajouter une entrée dans `certifications.json` (`image: null` affiche un emplacement « à venir »). `verifyUrl` : uniquement un lien officiel de vérification.

## Déployer
- **Vercel / Netlify** : importer le dépôt, commande `npm run build`, dossier de sortie `out`.
- **GitHub Pages** (site dans un sous-dossier) : `NEXT_PUBLIC_BASE_PATH=/nom-du-depot npm run build`, puis publier `out/`.

## Arborescence
```
src/app/            layout, page, styles globaux
src/components/     Hero, Projects (fiches + galerie), Certifications, Lightbox, Dialog...
src/data/           profile.ts, projects.json, certifications.json
public/media/       profile/ certifications/ projects/<slug>/ videos/
public/cv/          CV en PDF
```
