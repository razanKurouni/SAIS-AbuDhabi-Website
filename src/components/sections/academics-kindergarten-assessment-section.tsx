import type { ComponentType, CSSProperties } from "react";
import { HoverIconCard } from "@/components/ui/hover-icon-card";
import { Reveal } from "@/components/ui/reveal";
import { RichText } from "@/components/ui/rich-text";
import { SectionReveal } from "@/components/ui/section-reveal";
import type { AcademicsKindergartenAssessmentSection as AssessmentSection } from "@/types/sanity";

type AcademicsKindergartenAssessmentSectionProps = {
  section?: AssessmentSection;
  fallbackSection: AssessmentSection;
  className?: string;
  titleId?: string;
  fallbackIcons?: Array<ComponentType<{ size?: number; strokeWidth?: number }>>;
};

type AssessmentStyle = CSSProperties & {
  "--academics-kg-assessment-bg"?: string;
  "--academics-kg-assessment-title"?: string;
  "--academics-kg-assessment-text"?: string;
  "--academics-kg-assessment-card-text"?: string;
  "--academics-kg-assessment-card-border"?: string;
  "--academics-kg-assessment-card-hover-border"?: string;
};

export function AcademicsKindergartenAssessmentSection({
  section,
  fallbackSection,
  className = "",
  titleId = "academics-kg-assessment-title",
  fallbackIcons = [],
}: AcademicsKindergartenAssessmentSectionProps) {
  const heading = section?.heading || fallbackSection.heading;
  const cards = section?.cards?.length ? section.cards : fallbackSection.cards || [];
  const closingStatement = section?.closingStatement?.length
    ? section.closingStatement
    : fallbackSection.closingStatement;

  if (!heading?.title && !cards.length && !closingStatement?.length) {
    return null;
  }

  const style: AssessmentStyle = {
    "--academics-kg-assessment-bg": section?.backgroundColor || fallbackSection.backgroundColor,
    "--academics-kg-assessment-title": section?.titleColor || fallbackSection.titleColor,
    "--academics-kg-assessment-text": section?.textColor || fallbackSection.textColor,
    "--academics-kg-assessment-card-text": section?.cardTextColor || fallbackSection.cardTextColor,
    "--academics-kg-assessment-card-border": section?.cardBorderColor || fallbackSection.cardBorderColor,
    "--academics-kg-assessment-card-hover-border":
      section?.cardHoverBorderColor || fallbackSection.cardHoverBorderColor,
  };

  return (
    <section
      className={`academics-kg-assessment ${className}`.trim()}
      aria-labelledby={titleId}
      style={style}
    >
      <SectionReveal className="academics-kg-assessment__inner">
        {heading?.title ? (
          <h2 id={titleId} className="academics-kg-assessment__title">
            {heading.title}
          </h2>
        ) : null}

        <RichText blocks={heading?.description} className="academics-kg-assessment__intro" />

        {cards.length ? (
          <div className="academics-kg-assessment__cards">
            {cards.map((card, index) => (
              <Reveal
                key={card._key || `${card.title}-${index}`}
                className="academics-kg-assessment__card-reveal"
                delay={120 + index * 110}
              >
                <HoverIconCard
                  icon={card.icon}
                  fallbackIcon={fallbackIcons[index]}
                  title={card.title}
                  description={card.description}
                  className="academics-kg-assessment__card"
                  iconSizes="132px"
                />
              </Reveal>
            ))}
          </div>
        ) : null}

        {closingStatement?.length ? (
          <RichText blocks={closingStatement} className="academics-kg-assessment__closing" />
        ) : null}
      </SectionReveal>
    </section>
  );
}
