/** Étiquette technique discrète. dir="ltr" par défaut : les noms de technologies ne doivent pas être réordonnés en RTL. */
export function Chip({ children, dir = "ltr" }: { children: React.ReactNode; dir?: "ltr" | "rtl" | "auto"; strong?: boolean }) {
  return <span dir={dir} className="tag">{children}</span>;
}
