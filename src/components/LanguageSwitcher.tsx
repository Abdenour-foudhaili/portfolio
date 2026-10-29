"use client";
import { useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { STORAGE_KEY, locales, nativeName, shortName, type Locale } from "@/i18n/config";

type Props = { lang: Locale; label: string; variant: "compact" | "list"; onChoose?: () => void };

/** Change la langue par navigation côté client (pas de rechargement), garde l'ancre (#projets...) et mémorise le choix. */
export function LanguageSwitcher({ lang, label, variant, onChoose }: Props) {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, lang); } catch { /* ignoré */ }
  }, [lang]);

  const hrefFor = (l: Locale) => {
    const parts = pathname.split("/");
    parts[1] = l;
    return parts.join("/");
  };

  return (
    <div role="group" aria-label={label} className={variant === "compact" ? "flex rounded-lg border border-line p-0.5" : "grid grid-cols-3 gap-2"}>
      {locales.map((l) => {
        const active = l === lang;
        return (
          <Link
            key={l}
            href={hrefFor(l)}
            lang={l}
            hrefLang={l}
            aria-current={active ? "true" : undefined}
            title={nativeName[l]}
            onClick={(e) => {
              if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
              e.preventDefault();
              try { localStorage.setItem(STORAGE_KEY, l); } catch { /* ignoré */ }
              router.push(hrefFor(l) + window.location.hash, { scroll: false });
              onChoose?.();
            }}
            className={`text-center text-sm transition-colors ${
              variant === "compact" ? "inline-flex min-h-11 min-w-10 items-center justify-center rounded-md px-2 text-xs font-medium sm:min-h-0 sm:min-w-0 sm:px-2.5 sm:py-1" : "flex min-h-11 items-center justify-center rounded-lg border border-line px-3"
            } ${active ? "bg-fg text-bg" : "text-fg2 hover:text-fg"}`}
          >
            {variant === "compact" ? shortName[l] : nativeName[l]}
          </Link>
        );
      })}
    </div>
  );
}
