import Image from "next/image";
import { RichText } from "@/components/ui/rich-text";
import { SectionReveal } from "@/components/ui/section-reveal";
import type { ImageTextSection } from "@/types/sanity";

type AdmissionsFeesJourneySectionProps = {
  section?: ImageTextSection;
};

export function AdmissionsFeesJourneySection({ section }: AdmissionsFeesJourneySectionProps) {
  const heading = section?.heading;
  const image = section?.image;

  if (!heading?.title && !heading?.subtitle && !heading?.description?.length && !image?.url) {
    return null;
  }

  return (
    <section className="admissions-fees-journey" aria-labelledby="admissions-fees-journey-title">
      <SectionReveal className="admissions-fees-journey__reveal">
        <div className="admissions-fees-journey__inner">
          <header className="admissions-fees-journey__header">
            {heading?.title ? (
              <h2 id="admissions-fees-journey-title" className="admissions-fees-journey__title">
                {heading.title}
              </h2>
            ) : null}
            {heading?.subtitle ? (
              <p className="admissions-fees-journey__subtitle">{heading.subtitle}</p>
            ) : null}
          </header>

          <div className="admissions-fees-journey__content">
            <RichText blocks={heading?.description} className="admissions-fees-journey__copy" />
            {image?.url ? (
              <div className="admissions-fees-journey__media">
                <Image
                  src={image.url}
                  alt={image.alt || heading?.title || "SAIS students in the classroom"}
                  fill
                  sizes="(max-width: 767px) calc(100vw - 32px), 42vw"
                  quality={88}
                  className="admissions-fees-journey__image"
                />
              </div>
            ) : null}
          </div>
        </div>
      </SectionReveal>
    </section>
  );
}
