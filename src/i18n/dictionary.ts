import type { Dictionary } from "@/types";
import fr from "@/messages/fr.json";
import en from "@/messages/en.json";
import ar from "@/messages/ar.json";
import type { Locale } from "./config";

// Les trois fichiers ont exactement les mêmes clés (voir le script de vérification dans le README).
const dictionaries = { fr, en, ar } as unknown as Record<Locale, Dictionary>;

export const getDictionary = (lang: Locale): Dictionary => dictionaries[lang];

/** Remplace {variable} dans un libellé : fmt("Capture {n}", { n: 2 }). */
export const fmt = (text: string, vars: Record<string, string | number>) =>
  text.replace(/\{(\w+)\}/g, (_, k: string) => String(vars[k] ?? `{${k}}`));
