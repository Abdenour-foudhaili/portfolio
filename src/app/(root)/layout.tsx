import type { Metadata, Viewport } from "next";
import "../globals.css";
import { fontClasses } from "@/lib/fonts";
import Script from "next/script";
import { themeInitScript } from "@/lib/theme";

export const metadata: Metadata = { title: "Abdenour Foudhaili", robots: { index: false } };
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0e1013" },
    { media: "(prefers-color-scheme: light)", color: "#f5f3ee" },
  ],
};

// Layout racine de la page « / » (redirection). Le site vit sous /fr, /en et /ar.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" dir="ltr" className={fontClasses} suppressHydrationWarning>
      <body>{children}</body>
      {/* Exécuté avant l'hydratation : pose data-theme (thème enregistré, sinon préférence système) pour éviter tout flash. */}
      <Script id="theme-init" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: themeInitScript }} />
    </html>
  );
}
