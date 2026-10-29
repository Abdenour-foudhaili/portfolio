"use client";
import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { STORAGE_KEY, defaultLocale, isLocale, locales, nativeName } from "@/i18n/config";

/** « / » : redirige vers la langue enregistrée, sinon le français (langue par défaut). */
export default function RootRedirect() {
  const router = useRouter();
  useEffect(() => {
    let lang: string = defaultLocale;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && isLocale(saved)) lang = saved;
    } catch { /* stockage indisponible : on garde le français */ }
    router.replace(`/${lang}/`);
  }, [router]);
  return (
    <main className="wrap flex min-h-dvh flex-col items-center justify-center gap-4 text-center">
      <p className="font-mono text-fg2">Abdenour Foudhaili</p>
      <nav aria-label="Language" className="flex gap-3">
        {locales.map((l) => <Link key={l} href={`/${l}/`} lang={l} className="btn-quiet">{nativeName[l]}</Link>)}
      </nav>
    </main>
  );
}
