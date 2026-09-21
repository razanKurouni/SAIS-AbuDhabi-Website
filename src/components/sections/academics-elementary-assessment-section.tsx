import Image from "next/image";
import type { CSSProperties } from "react";
import { RichText } from "@/components/ui/rich-text";
import { SaisCurvedPanel } from "@/components/ui/sais-curved-panel";
import { SectionReveal } from "@/components/ui/section-reveal";
import type { AcademicsKindergartenFeatureSection } from "@/types/sanity";

type AcademicsElementaryAssessmentSectionProps = {
  section?: AcademicsKindergartenFeatureSection;
  fallbackSection: Required<AcademicsKindergartenFeatureSection>;
  className?: string;
  imageSide?: "left" | "right";
  titleId?: string;
  showTitle?: boolean;
};

type ElementaryAssessmentStyle = CSSProperties & {
  "--academics-elementary-assessment-bg"?: string;
  "--academics-elementary-assessment-wave"?: string;
  "--academics-elementary-assessment-title"?: string;
  "--academics-elementary-assessment-text"?: string;
  "--academics-elementary-assessment-image-position"?: string;
};

export function AcademicsElementaryAssessmentSection({
  section,
  fallbackSection,
  className = "",
  imageSide,
  titleId = "academics-elementary-assessment-title",
  showTitle = true,
}: AcademicsElementaryAssessmentSectionProps) {
  const heading = section?.heading || fallbackSection.heading;
  const image = section?.image || fallbackSection.image;
  const panelColor = section?.panelColor || fallbackSection.panelColor;
  const waveColor = section?.waveColor || fallbackSection.waveColor;
  const resolvedImageSide = imageSide || section?.imageSide || fallbackSection.imageSide || "right";
  const style: ElementaryAssessmentStyle = {
    "--academics-elementary-assessment-bg": panelColor,
    "--academics-elementary-assessment-wave": waveColor,
    "--academics-elementary-assessment-title": section?.titleColor || fallbackSection.titleColor,
    "--academics-elementary-assessment-text": section?.textColor || fallbackSection.textColor,
    "--academics-elementary-assessment-image-position": section?.imagePosition || fallbackSection.imagePosition,
  };

  if (!heading?.title && !heading?.description?.length && !image?.url) {
    return null;
  }

  return (
    <section
      className={`academics-elementary-assessment is-image-${resolvedImageSide} ${className}`.trim()}
      aria-labelledby={titleId}
      style={style}
    >
      {image?.url ? (
        <div className="academics-elementary-assessment__media">
          <Image
            src={image.url}
            alt={image.alt || heading?.title || ""}
            fill
            sizes="(max-width: 767px) 100vw, 46vw"
            quality={86}
            className="academics-elementary-assessment__image"
          />
        </div>
      ) : null}

      <SaisCurvedPanel
        className="academics-elementary-assessment__panel"
        contentClassName="academics-elementary-assessment__panel-content"
        fillColor={panelColor}
        accentColor={waveColor}
        strokeWidth={82}
        flipped={resolvedImageSide === "left"}
      >
        <SectionReveal className="academics-elementary-assessment__content">
          {heading?.title ? (
            <h2
              id={titleId}
              className={showTitle ? "academics-elementary-assessment__title" : "sr-only"}
            >
              {heading.title}
            </h2>
          ) : null}
          <RichText blocks={heading?.description} className="academics-elementary-assessment__body" />
        </SectionReveal>
      </SaisCurvedPanel>
    </section>
  );
}
