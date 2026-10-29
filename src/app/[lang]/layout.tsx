import type { Metadata, Viewport } from "next";
import "../globals.css";
import { fontClasses } from "@/lib/fonts";
import { themeInitScript } from "@/lib/theme";
import { asset } from "@/lib/asset";
import { defaultLocale, dirOf, isLocale, locales, ogLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";

type Props = { children: React.ReactNode; params: Promise<{ lang: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => locales.map((lang) => ({ lang }));
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0e1013" },
    { media: "(prefers-color-scheme: light)", color: "#f5f3ee" },
  ],
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : defaultLocale;
  const d = getDictionary(locale);
  const path = (l: Locale) => asset(`/${l}/`);
  return {
    metadataBase: new URL(siteUrl),
    title: d.meta.title,
    description: d.meta.description,
    alternates: {
      canonical: path(locale),
      languages: { ...Object.fromEntries(locales.map((l) => [l, path(l)])), "x-default": path(defaultLocale) },
    },
    openGraph: {
      title: d.meta.ogTitle,
      description: d.meta.description,
      type: "website",
      locale: ogLocale[locale],
      alternateLocale: locales.filter((l) => l !== locale).map((l) => ogLocale[l]),
      url: path(locale),
    },
  };
}

export default async function LangLayout({ children, params }: Props) {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : defaultLocale;
  return (
    <html lang={locale} dir={dirOf(locale)} className={fontClasses} suppressHydrationWarning>
      <head>
        {/* Exécuté avant l'hydratation : pose data-theme (thème enregistré, sinon préférence système) pour éviter tout flash. */}
        <script id="theme-init" dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
