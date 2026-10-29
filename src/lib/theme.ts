export const THEME_KEY = "portfolio-theme";
export type Theme = "light" | "dark";

/**
 * Script exécuté AVANT le premier rendu (dans <head>) : choisit le thème enregistré, sinon la préférence système,
 * sinon le sombre. Évite le flash d'un mauvais thème et ne dépend pas de React.
 */
export const themeInitScript = `(function(){var d=document.documentElement,t="dark";try{var s=localStorage.getItem("${THEME_KEY}");if(s==="light"||s==="dark"){t=s}else if(window.matchMedia("(prefers-color-scheme: light)").matches){t="light"}}catch(e){}d.setAttribute("data-theme",t)})();`;

/** Applique le thème au document ; `animate` ajoute un fondu court (désactivé si l'utilisateur réduit les animations). */
export function applyTheme(theme: Theme, animate: boolean) {
  const root = document.documentElement;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (animate && !reduce) {
    root.classList.add("theme-transition");
    window.setTimeout(() => root.classList.remove("theme-transition"), 350);
  }
  root.setAttribute("data-theme", theme);
}

export const readStoredTheme = (): Theme | null => {
  try {
    const s = localStorage.getItem(THEME_KEY);
    return s === "light" || s === "dark" ? s : null;
  } catch {
    return null;
  }
};
