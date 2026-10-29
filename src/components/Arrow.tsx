/** Flèche qui se retourne automatiquement en RTL. */
export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={`inline-block shrink-0 transition-transform rtl:-scale-x-100 ${className}`}>
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}
