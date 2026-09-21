import { normalizeHref } from "@/lib/portal-links";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Cta } from "@/types/sanity";

type CtaLinkProps = {
  cta: Cta;
  className?: string;
  /** Render the label beside a circled arrow, like the header actions. */
  withArrow?: boolean;
};

export function CtaLink({ cta, className = "", withArrow = false }: CtaLinkProps) {
  const variant = cta.variant || "primary";

  return (
    <Link
      href={normalizeHref(cta.href) || "#"}
      target={cta.openInNewTab ? "_blank" : undefined}
      rel={cta.openInNewTab ? "noreferrer" : undefined}
      className={`cta-link cta-link--${variant} ${withArrow ? "cta-link--with-arrow" : ""} ${className}`.trim()}
    >
      <span>{cta.label}</span>
      {withArrow ? (
        <span className="cta-link__icon" aria-hidden="true">
          <ArrowRight size={17} strokeWidth={3} />
        </span>
      ) : null}
    </Link>
  );
}
