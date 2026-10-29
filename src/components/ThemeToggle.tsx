"use client";
import { useEffect, useSyncExternalStore } from "react";
import { THEME_KEY, applyTheme, readStoredTheme, type Theme } from "@/lib/theme";

type Props = { labelToLight: string; labelToDark: string };

const readTheme = (): Theme => (document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark");
const subscribe = (notify: () => void) => {
  const observer = new MutationObserver(notify);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
};

/** Bascule clair/sombre. L'icône vient du CSS ([data-theme]) ; seul le libellé accessible dépend de l'état React. */
export function ThemeToggle({ labelToLight, labelToDark }: Props) {
  // Le serveur suppose « dark » ; le client relit l'attribut posé par le script d'initialisation (pas d'erreur d'hydratation).
  const theme = useSyncExternalStore(subscribe, readTheme, () => "dark" as Theme);

  useEffect(() => {
    // Sans choix enregistré, suivre la préférence système si elle change ; synchroniser les autres onglets.
    const mq = window.matchMedia("(prefers-color-scheme: light)");
    const onSystem = () => { if (!readStoredTheme()) applyTheme(mq.matches ? "light" : "dark", true); };
    const onStorage = (e: StorageEvent) => {
      if (e.key !== THEME_KEY) return;
      const stored = readStoredTheme();
      applyTheme(stored ?? (mq.matches ? "light" : "dark"), true);
    };
    mq.addEventListener("change", onSystem);
    window.addEventListener("storage", onStorage);
    return () => { mq.removeEventListener("change", onSystem); window.removeEventListener("storage", onStorage); };
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    applyTheme(next, true);
    try { localStorage.setItem(THEME_KEY, next); } catch { /* stockage indisponible : le thème reste appliqué pour la session */ }
  };

  const label = theme === "dark" ? labelToLight : labelToDark;
  return (
    <button type="button" onClick={toggle} aria-label={label} title={label} className="btn-quiet !p-3 sm:!p-2">
      <span className="theme-icons">
        <svg className="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
        </svg>
        <svg className="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
      </span>
    </button>
  );
}
