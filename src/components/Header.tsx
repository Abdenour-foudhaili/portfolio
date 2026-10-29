"use client";
import { useState } from "react";
import type { Dictionary } from "@/types";
import type { Locale } from "@/i18n/config";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ThemeToggle } from "./ThemeToggle";

type Props = { name: string; lang: Locale; nav: Dictionary["nav"]; a11y: Dictionary["a11y"] };

export function Header({ name, lang, nav, a11y }: Props) {
  const [open, setOpen] = useState(false);
  const links = [
    ["#projets", nav.projects], ["#competences", nav.skills], ["#experience", nav.experience],
    ["#certifications", nav.certifications], ["#formation", nav.education], ["#contact", nav.contact],
  ] as const;
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/85 backdrop-blur-md">
      <div className="wrap flex h-16 items-center justify-between gap-3">
        <a href="#accueil" className="flex shrink-0 items-center gap-3" aria-label={`${name}, ${a11y.home}`}>
          <span aria-hidden="true" className="grid h-8 w-8 place-items-center rounded-lg bg-fg font-mono text-xs font-semibold text-bg">AF</span>
          <span aria-hidden="true" className="hidden text-sm font-medium sm:inline">{name}</span>
        </a>
        <nav aria-label={a11y.mainNav} className="hidden items-center gap-6 text-sm text-fg2 lg:flex">
          {links.map(([h, l]) => <a key={h} href={h} className="transition-colors hover:text-fg">{l}</a>)}
          <a href="#cv" className="btn-quiet btn-sm">{nav.cv}</a>
        </nav>
        <div className="flex items-center gap-2">
          <LanguageSwitcher lang={lang} label={a11y.language} variant="compact" />
          <ThemeToggle labelToLight={a11y.themeToLight} labelToDark={a11y.themeToDark} />
          <button type="button" className="btn-quiet !h-11 !w-11 !p-0 lg:hidden" aria-label={open ? a11y.menuClose : a11y.menuOpen} aria-expanded={open} aria-controls="menu-mobile" onClick={() => setOpen(!open)}>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>
      {open && (
        <nav id="menu-mobile" aria-label={a11y.mobileNav} className="wrap grid gap-1 pb-5 lg:hidden">
          {[...links, ["#cv", nav.cv] as const].map(([h, l]) => (
            <a key={h} href={h} onClick={() => setOpen(false)} className="border-b border-line py-3 font-display text-xl text-fg">{l}</a>
          ))}
          <div className="mt-4"><LanguageSwitcher lang={lang} label={a11y.language} variant="list" onChoose={() => setOpen(false)} /></div>
        </nav>
      )}
    </header>
  );
}
