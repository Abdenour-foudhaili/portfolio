// Vérifie que fr.json, en.json et ar.json ont exactement les mêmes clés et les mêmes longueurs de listes,
// qu'aucune valeur n'est vide (hors "context"), et que chaque projet/certificat/expérience a ses traductions.
import { readFileSync } from "node:fs";
const load = (p) => JSON.parse(readFileSync(new URL(p, import.meta.url), "utf8"));
const langs = ["fr", "en", "ar"];
const msgs = Object.fromEntries(langs.map((l) => [l, load(`../src/messages/${l}.json`)]));
const errors = [];
const walk = (ref, other, path, lang) => {
  if (Array.isArray(ref)) {
    if (!Array.isArray(other) || other.length !== ref.length) return errors.push(`${lang}: ${path} (longueur ${other?.length} au lieu de ${ref.length})`);
    ref.forEach((v, i) => walk(v, other[i], `${path}[${i}]`, lang));
  } else if (ref && typeof ref === "object") {
    for (const k of Object.keys(ref)) {
      if (!(k in (other ?? {}))) errors.push(`${lang}: clé manquante ${path}.${k}`);
      else walk(ref[k], other[k], `${path}.${k}`, lang);
    }
    for (const k of Object.keys(other ?? {})) if (!(k in ref)) errors.push(`${lang}: clé en trop ${path}.${k}`);
  } else if (typeof other !== "string" || (other === "" && ref !== "" )) errors.push(`${lang}: valeur invalide/vide ${path}`);
};
for (const l of langs.slice(1)) walk(msgs.fr, msgs[l], "", l);
const projects = load("../src/data/projects.json");
const certs = load("../src/data/certifications.json");
for (const l of langs) {
  for (const p of projects) if (!msgs[l].projects.items[p.slug]) errors.push(`${l}: projet sans texte ${p.slug}`);
  for (const c of certs) if (!msgs[l].certifications.items[c.id]) errors.push(`${l}: certificat sans texte ${c.id}`);
}
if (errors.length) { console.error(errors.join("\n")); process.exit(1); }
console.log(`i18n OK : ${langs.join(", ")} ont les mêmes clés ; ${projects.length} projets, ${certs.length} certifications traduits.`);
