import { RichText } from "@/components/ui/rich-text";
import { SectionReveal } from "@/components/ui/section-reveal";
import type { HomepageData } from "@/types/sanity";

type TourIntroSectionProps = {
  section?: HomepageData["tour"];
};

export function TourIntroSection({ section }: TourIntroSectionProps) {
  const heading = section?.heading;

  if (!heading?.title) {
    return null;
  }

  return (
    <section className="tour-intro" aria-labelledby="tour-intro-title">
      <SectionReveal className="tour-intro__inner">
        <h2 id="tour-intro-title" className="tour-intro__title">
          <span>{heading.title}</span>
          {heading.accentTitle && <span className="tour-intro__title-accent"> {heading.accentTitle}</span>}
        </h2>

        {heading.subtitle && <p className="tour-intro__subtitle">{heading.subtitle}</p>}

        <RichText blocks={heading.description} className="tour-intro__description" />
      </SectionReveal>
    </section>
  );
}
