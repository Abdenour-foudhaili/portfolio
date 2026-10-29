import type { SVGProps } from "react";

interface LogoProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
  withBadge?: boolean;
}

/**
 * Logo officiel d'Abdenour Foudhaili (Monogramme AF).
 * Construction géométrique d'inspiration architecturale :
 * - Le montant oblique et le mât central forment la lettre 'A'.
 * - Le mât central vertical et les deux branches horizontales forment la lettre 'F'.
 * - La branche supérieure porte la couleur d'accent "Braise" emblématique du portfolio.
 * - Le monogramme s'adapte automatiquement aux thèmes sombre et clair sans flash.
 */
export function Logo({ size = 32, withBadge = true, className = "", ...props }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 transition-transform duration-200 group-hover:scale-105 ${className}`}
      aria-hidden="true"
      {...props}
    >
      {withBadge && (
        <rect
          width="32"
          height="32"
          rx="7.5"
          className="fill-surface stroke-line transition-colors duration-200 group-hover:stroke-lineStrong"
          strokeWidth="1.2"
        />
      )}
      {/* Lettre A : diagonale ascendante */}
      <path
        d="M8 24L15.5 8"
        className="stroke-fg"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      {/* Mât central commun : jambe droite du A et tronc du F */}
      <path
        d="M15.5 8V24"
        className="stroke-fg"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      {/* Lettre F : branche supérieure en couleur d'accent "Braise" */}
      <path
        d="M15.5 8H24"
        className="stroke-accent"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      {/* Traverse architecturale continue : barre du A et branche médiane du F */}
      <path
        d="M11.75 16H21.5"
        className="stroke-fg"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}
