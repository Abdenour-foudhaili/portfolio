import { Fraunces, Geist, Geist_Mono, Noto_Naskh_Arabic, Noto_Sans_Arabic } from "next/font/google";

/** Titres : Fraunces (serif éditoriale). Texte : Geist. Détails techniques : Geist Mono. */
export const display = Fraunces({ subsets: ["latin"], variable: "--font-display", display: "swap" });
export const body = Geist({ subsets: ["latin"], variable: "--font-body", display: "swap" });
export const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });
/** Arabe : repli glyphe par glyphe derrière les polices latines (les textes mixtes arabe/latin restent cohérents). */
export const arabic = Noto_Sans_Arabic({ subsets: ["arabic"], variable: "--font-arabic", display: "swap" });
/** Titres en arabe : Naskh, serif et contrastée, pour la même hiérarchie que Fraunces en latin. Le latin reste en Fraunces (premier de la pile). */
export const arabicDisplay = Noto_Naskh_Arabic({ subsets: ["arabic"], variable: "--font-arabic-display", display: "swap" });
export const fontClasses = `${display.variable} ${body.variable} ${mono.variable} ${arabic.variable} ${arabicDisplay.variable}`;
