import { CtaLink } from "@/components/ui/cta-link";
import type { Cta } from "@/types/sanity";

type CtaListProps = {
  ctas?: Cta[];
  className?: string;
  withArrow?: boolean;
};

export function CtaList({ ctas, className = "mt-6 flex flex-wrap gap-3", withArrow = false }: CtaListProps) {
  if (!ctas?.length) return null;

  return (
    <div className={className}>
      {ctas.map((cta) => (
        <CtaLink key={`${cta.label}-${cta.href}`} cta={cta} withArrow={withArrow} />
      ))}
    </div>
  );
}
