import { Reveal } from "@/components/ui/reveal";
import { SectionReveal } from "@/components/ui/section-reveal";
import type { CareersRequirementsSection as CareersRequirementsSectionData } from "@/types/sanity";

type CareersRequirementsSectionProps = {
  section?: CareersRequirementsSectionData;
  fallbackSection: CareersRequirementsSectionData;
};

export function CareersRequirementsSection({
  section,
  fallbackSection,
}: CareersRequirementsSectionProps) {
  const columns = section?.columns?.length ? section.columns : fallbackSection.columns || [];

  if (!columns.length) {
    return null;
  }

  return (
    <section className="careers-requirements" aria-label="Careers commitments and requirements">
      <SectionReveal className="careers-requirements__inner">
        {columns.map((column, index) => (
          <Reveal
            as="article"
            className="careers-requirements__column"
            delay={index * 90}
            key={column._key || `${column.title}-${index}`}
          >
            {column.title ? <h2 className="careers-requirements__title">{column.title}</h2> : null}
            {column.intro ? <p className="careers-requirements__intro">{column.intro}</p> : null}
            {column.items?.length ? (
              <ul className="careers-requirements__list">
                {column.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}
          </Reveal>
        ))}
      </SectionReveal>
    </section>
  );
}
