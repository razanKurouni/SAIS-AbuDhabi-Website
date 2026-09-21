import type { CSSProperties } from "react";
import { EditorialSplitSection } from "@/components/sections/editorial-split-section";
import { RichText } from "@/components/ui/rich-text";
import type {
  AcademicsCurriculumOverviewSection as AcademicsCurriculumOverviewSectionData,
  ImageTextSection,
} from "@/types/sanity";

type AcademicsCurriculumOverviewFallback = AcademicsCurriculumOverviewSectionData & {
  firstBlock: ImageTextSection;
};

type AcademicsCurriculumOverviewSectionProps = {
  section?: AcademicsCurriculumOverviewSectionData;
  fallbackSection: AcademicsCurriculumOverviewFallback;
  className?: string;
  titleId?: string;
  idPrefix?: string;
  firstImagePosition?: "left" | "right";
  showFirstBlockTitle?: boolean;
};

type AcademicsCurriculumOverviewStyle = CSSProperties & {
  "--academics-curriculum-overview-bg"?: string;
  "--academics-curriculum-overview-heading-color"?: string;
  "--academics-curriculum-overview-text-color"?: string;
};

export function AcademicsCurriculumOverviewSection({
  section,
  fallbackSection,
  className = "",
  titleId = "academics-curriculum-overview-title",
  idPrefix = "academics-curriculum",
  firstImagePosition = "right",
  showFirstBlockTitle = true,
}: AcademicsCurriculumOverviewSectionProps) {
  const firstBlock: ImageTextSection = section?.firstBlock || fallbackSection.firstBlock;
  const heading = section?.heading || fallbackSection.heading;
  const hasHeading = Boolean(heading?.title || heading?.description?.length);
  const backgroundColor = section?.backgroundColor || fallbackSection.backgroundColor;
  const titleColor = section?.titleColor || fallbackSection.titleColor;
  const textColor = section?.textColor || fallbackSection.textColor;
  const style: AcademicsCurriculumOverviewStyle = {
    "--academics-curriculum-overview-bg": backgroundColor,
    "--academics-curriculum-overview-heading-color": titleColor,
    "--academics-curriculum-overview-text-color": textColor,
  };

  return (
    <section
      className={`academics-curriculum-overview ${className}`.trim()}
      style={style}
      aria-labelledby={hasHeading ? titleId : undefined}
    >
      {hasHeading ? (
        <div className="academics-curriculum-overview__heading">
          {heading?.title ? (
            <h2 id={titleId} className="academics-curriculum-overview__title">
              {heading.title}
            </h2>
          ) : null}
          {heading?.description?.length ? (
            <div className="academics-curriculum-overview__intro">
              <RichText blocks={heading?.description} className="academics-curriculum-overview__copy" />
            </div>
          ) : null}
        </div>
      ) : null}

      <EditorialSplitSection
        id={`${idPrefix}-overview`}
        title="Our Curriculum"
        section={{
          ...firstBlock,
          imagePosition: firstImagePosition,
          textColor: firstBlock.textColor || textColor,
          titleColor: firstBlock.titleColor || titleColor,
        }}
        fallbackImage={fallbackSection.firstBlock.image || {}}
        fallbackParagraphs={[]}
        className="academics-curriculum-overview__row academics-curriculum-overview__row--top"
        imageSizes="(max-width: 767px) calc(100vw - 32px), 38vw"
        showTitle={showFirstBlockTitle}
      />
    </section>
  );
}
