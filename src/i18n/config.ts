export const locales = ["fr", "en", "ar"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "fr";
export const STORAGE_KEY = "portfolio-lang";

export const isLocale = (v: string): v is Locale => (locales as readonly string[]).includes(v);
export const dirOf = (l: Locale): "ltr" | "rtl" => (l === "ar" ? "rtl" : "ltr");

export const nativeName: Record<Locale, string> = { fr: "Français", en: "English", ar: "العربية" };
export const shortName: Record<Locale, string> = { fr: "FR", en: "EN", ar: "AR" };
export const ogLocale: Record<Locale, string> = { fr: "fr_FR", en: "en_US", ar: "ar_AR" };
