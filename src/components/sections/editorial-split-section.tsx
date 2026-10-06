import Image from "next/image";
import type { CSSProperties } from "react";
import { blocksFromText } from "@/lib/content";
import { SectionReveal } from "@/components/ui/section-reveal";
import { RichText } from "@/components/ui/rich-text";
import { CtaList } from "@/components/ui/cta-list";
import type { ImageTextSection, SanityImage } from "@/types/sanity";

type EditorialSplitSectionProps = {
  id?: string;
  title: string;
  section?: ImageTextSection;
  fallbackImage: SanityImage;
  fallbackParagraphs: string[];
  className?: string;
  imageSizes?: string;
  showTitle?: boolean;
  preserveRichText?: boolean;
  /** Renders the section's buttons under the copy. */
  showCtas?: boolean;
};

type EditorialSplitStyle = CSSProperties & {
  "--editorial-split-image-position"?: string;
  "--editorial-split-bg"?: string;
  "--editorial-split-title-color"?: string;
  "--editorial-split-text-color"?: string;
};

export function EditorialSplitSection({
  id,
  title,
  section,
  fallbackImage,
  fallbackParagraphs,
  className = "",
  imageSizes = "(max-width: 767px) calc(100vw - 32px), 42vw",
  showTitle = false,
  preserveRichText = false,
  showCtas = false,
}: EditorialSplitSectionProps) {
  const image = section?.image || fallbackImage;
  const bodyBlocks = section?.heading?.description?.length
    ? section.heading.description
    : blocksFromText(fallbackParagraphs.join("\n"));
  const imageFirst = section?.imagePosition !== "right";
  const resolvedTitle = section?.heading?.title || title;
  const style: EditorialSplitStyle = {
    "--editorial-split-image-position": "center",
    "--editorial-split-bg": section?.backgroundColor,
    "--editorial-split-title-color": section?.titleColor,
    "--editorial-split-text-color": section?.textColor,
  };

  if (!image?.url && bodyBlocks.length === 0) {
    return null;
  }

  return (
    <section
      id={id}
      className={`editorial-split-section ${imageFirst ? "is-image-left" : "is-image-right"} ${className}`.trim()}
      aria-labelledby={id && resolvedTitle ? `${id}-title` : undefined}
      style={style}
    >
      <SectionReveal className="editorial-split-section__reveal">
        <div className="editorial-split-section__inner">
          {!showTitle ? (
            <h2 id={id ? `${id}-title` : undefined} className="sr-only">
              {resolvedTitle}
            </h2>
          ) : null}

          {image?.url ? (
            <div className="editorial-split-section__media">
              <Image
                src={image.url}
                alt={image.alt || title}
                fill
                sizes={imageSizes}
                quality={84}
                className="editorial-split-section__image"
              />
            </div>
          ) : null}

          <div className="editorial-split-section__body">
            {showTitle && resolvedTitle ? (
              <h2 id={id ? `${id}-title` : undefined} className="editorial-split-section__title">
                {resolvedTitle}
              </h2>
            ) : null}
            {preserveRichText ? (
              <RichText blocks={section?.heading?.description} className="editorial-split-section__rich-text" />
            ) : (
              <RichText blocks={bodyBlocks} className="editorial-split-section__copy" />
            )}
            {showCtas && section?.ctas?.length ? (
              <CtaList ctas={section.ctas} className="editorial-split-section__actions" withArrow />
            ) : null}
          </div>
        </div>
      </SectionReveal>
    </section>
  );
}
