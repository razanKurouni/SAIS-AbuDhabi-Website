import { RichText } from "@/components/ui/rich-text";
import type { SectionHeading } from "@/types/sanity";

type SectionHeadingProps = {
  heading?: SectionHeading;
  align?: "left" | "center";
  eyebrowClassName?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  descriptionClassName?: string;
  className?: string;
  titleId?: string;
};

export function SectionHeading({
  heading,
  align = "left",
  eyebrowClassName = "text-[color:var(--sais-accent)]",
  titleClassName = "text-[color:var(--sais-primary)]",
  subtitleClassName = "mt-3 text-sm text-[#557189]",
  descriptionClassName = "text-[#557189]",
  className = "",
  titleId,
}: SectionHeadingProps) {
  if (!heading?.title) {
    return null;
  }

  return (
    <div className={`${align === "center" ? "text-center" : ""} ${className}`}>
      {heading.eyebrow && (
        <p className={`mb-2 text-xs font-bold uppercase tracking-[0.18em] ${eyebrowClassName}`}>
          {heading.eyebrow}
        </p>
      )}
      <h2 id={titleId} className={`text-2xl font-semibold leading-tight md:text-3xl ${titleClassName}`}>
        {heading.title}
      </h2>
      {heading.subtitle && <p className={subtitleClassName}>{heading.subtitle}</p>}
      <RichText
        blocks={heading.description}
        className={`mt-4 space-y-3 text-sm leading-7 ${descriptionClassName}`}
      />
    </div>
  );
}
