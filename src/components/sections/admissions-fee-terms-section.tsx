import { RichText } from "@/components/ui/rich-text";
import { SectionReveal } from "@/components/ui/section-reveal";
import { Reveal } from "@/components/ui/reveal";
import type { AdmissionsFeeTermsGroup, AdmissionsFeeTermsSection as AdmissionsFeeTermsSectionData } from "@/types/sanity";

type AdmissionsFeeTermsSectionProps = {
  section?: AdmissionsFeeTermsSectionData & { leftTitle?: string; rightTitle?: string };
  className?: string;
  /** Renders no section title (and no rule); each column may carry its own title. */
  columnsOnly?: boolean;
};

function TermsGroup({ group, delay }: { group: AdmissionsFeeTermsGroup; delay: number }) {
  return (
    <Reveal
      as="article"
      className={`admissions-fee-terms__group ${group.accentList ? "has-accent-list" : ""}`.trim()}
      delay={delay}
      threshold={0.08}
    >
      <h3 className="admissions-fee-terms__group-title">{group.title}</h3>
      <RichText blocks={group.body} className="admissions-fee-terms__body" />
    </Reveal>
  );
}

export function AdmissionsFeeTermsSection({ section, className = "", columnsOnly = false }: AdmissionsFeeTermsSectionProps) {
  const leftColumn = section?.leftColumn || [];
  const rightColumn = section?.rightColumn || [];

  if (!leftColumn.length && !rightColumn.length) return null;

  return (
    <section
      className={`admissions-fee-terms ${className}`.trim()}
      aria-labelledby={columnsOnly ? undefined : "admissions-fee-terms-title"}
      aria-label={columnsOnly ? section?.leftTitle || section?.heading?.title : undefined}
    >
      <SectionReveal className="admissions-fee-terms__inner">
        {columnsOnly ? null : (
          <h2 id="admissions-fee-terms-title" className="admissions-fee-terms__title">
            {section?.heading?.title || "Terms & Conditions"}
          </h2>
        )}

        <div className="admissions-fee-terms__columns">
          <div className="admissions-fee-terms__column">
            {section?.leftTitle ? <h2 className="admissions-fee-terms__column-title">{section.leftTitle}</h2> : null}
            {leftColumn.map((group, index) => (
              <TermsGroup key={group._key || `${group.title}-${index}`} group={group} delay={100 + index * 130} />
            ))}
          </div>
          <div className="admissions-fee-terms__column">
            {section?.rightTitle ? <h2 className="admissions-fee-terms__column-title">{section.rightTitle}</h2> : null}
            {rightColumn.map((group, index) => (
              <TermsGroup key={group._key || `${group.title}-${index}`} group={group} delay={180 + index * 130} />
            ))}
          </div>
        </div>
      </SectionReveal>
    </section>
  );
}
