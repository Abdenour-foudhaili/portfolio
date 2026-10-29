/** Liste de technologies en ligne, séparées par des barres obliques : lisible sans empiler des badges. */
export function TechList({ items, className = "" }: { items: string[]; className?: string }) {
  return (
    <ul className={`flex flex-wrap gap-x-3 gap-y-1 font-mono text-[0.8rem] leading-6 text-fg2 ${className}`}>
      {items.map((i) => (
        <li key={i} dir="ltr" className="after:ms-3 after:text-lineStrong after:content-['/'] last:after:hidden">{i}</li>
      ))}
    </ul>
  );
}
