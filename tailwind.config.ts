import type { Config } from "tailwindcss";

// Toutes les couleurs viennent des variables CSS de src/app/globals.css (thèmes clair et sombre).
const token = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: token("bg"),
        surface: token("surface"),
        surface2: token("surface-2"),
        line: token("line"),
        lineStrong: token("line-strong"),
        fg: token("fg"),
        fg2: token("fg-2"),
        fg3: token("fg-3"),
        accent: token("accent"),
        accentFg: token("accent-fg"),
        ok: token("ok"),
      },
      fontFamily: {
        sans: ["var(--font-body)", "var(--font-arabic)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-arabic-display)", "var(--font-arabic)", "Georgia", "serif"],
        mono: ["var(--font-mono)", "var(--font-arabic)", "ui-monospace", "monospace"],
      },
      borderRadius: { card: "var(--radius)" },
      boxShadow: { card: "var(--shadow-card)", pop: "var(--shadow-pop)" },
    },
  },
  plugins: [],
};
export default config;
