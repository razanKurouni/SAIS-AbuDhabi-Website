import Image from "next/image";
import type { CSSProperties } from "react";
import { RichText } from "@/components/ui/rich-text";
import { Reveal } from "@/components/ui/reveal";
import { SectionReveal } from "@/components/ui/section-reveal";
import type { SafetyHighlightSection as SafetyHighlightSectionData } from "@/types/sanity";

type SafetyHighlightSectionProps = {
  section?: SafetyHighlightSectionData;
  fallbackSection?: SafetyHighlightSectionData;
  className?: string;
  titleId?: string;
};

type SafetyHighlightStyle = CSSProperties & {
  "--safety-highlight-bg"?: string;
  "--safety-highlight-title"?: string;
  "--safety-highlight-text"?: string;
};

export function SafetyHighlightSection({
  section,
  fallbackSection,
  className = "",
  titleId = "safety-highlight-title",
}: SafetyHighlightSectionProps) {
  const title = section?.heading?.title || fallbackSection?.heading?.title;
  const description = section?.heading?.description?.length
    ? section.heading.description
    : fallbackSection?.heading?.description;
  const image = section?.image?.url ? section.image : fallbackSection?.image;

  if (!title && !description?.length && !image?.url) {
    return null;
  }

  const style: SafetyHighlightStyle = {
    "--safety-highlight-bg": section?.backgroundColor || fallbackSection?.backgroundColor,
    "--safety-highlight-title": section?.titleColor || fallbackSection?.titleColor,
    "--safety-highlight-text": section?.textColor || fallbackSection?.textColor,
  };

  return (
    <section
      className={`safety-highlight ${className}`.trim()}
      aria-labelledby={title ? titleId : undefined}
      style={style}
    >
      <SectionReveal className="safety-highlight__inner">
        {title ? (
          <h2 id={titleId} className="safety-highlight__title">
            {title}
          </h2>
        ) : null}

        <RichText blocks={description} className="safety-highlight__description" />

        {image?.url ? (
          <Reveal className="safety-highlight__media" threshold={0.12}>
            <Image
              src={image.url}
              alt={image.alt || title || "SAIS - UAQ students"}
              fill
              sizes="(max-width: 767px) calc(100vw - 32px), 85vw"
              quality={84}
              className="safety-highlight__image"
              style={{ objectPosition: section?.imagePosition || fallbackSection?.imagePosition || "center" }}
            />
          </Reveal>
        ) : null}
      </SectionReveal>
    </section>
  );
}
