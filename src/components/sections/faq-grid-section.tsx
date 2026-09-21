import Image from "next/image";
import { RichText } from "@/components/ui/rich-text";
import { Reveal } from "@/components/ui/reveal";
import { SectionReveal } from "@/components/ui/section-reveal";
import type { ContactInfoSection, FaqSection } from "@/types/sanity";

type FaqGridSectionProps = {
  section?: FaqSection;
  introSection?: ContactInfoSection;
};

export function FaqGridSection({ section, introSection }: FaqGridSectionProps) {
  const items = section?.items || [];

  if (!items.length) {
    return null;
  }

  return (
    <section className="faq-grid-section" aria-labelledby="faq-grid-title">
      <SectionReveal className="faq-grid-section__inner">
        {introSection?.heading?.title ? (
          <h2 id="faq-grid-title" className="faq-grid-section__title">
            {introSection.heading.title}
          </h2>
        ) : null}
        <RichText
          blocks={introSection?.heading?.description}
          className="faq-grid-section__introduction"
        />

        <div className="faq-grid-section__content">
          {introSection?.image?.url ? (
            <Reveal className="faq-grid-section__media">
              <Image
                src={introSection.image.url}
                alt={introSection.image.alt || "SAIS - Sharjah student"}
                fill
                sizes="(max-width: 767px) 100vw, 42vw"
                className="faq-grid-section__image"
              />
            </Reveal>
          ) : null}

          <div className="faq-grid-section__grid">
            {items.map((item, index) => (
              <Reveal
                as="article"
                className={`faq-grid-card faq-grid-card--${index % 2 === 0 ? "blue" : "teal"}`}
                delay={index * 70}
                key={item._key || item.question}
              >
                <h3 className="faq-grid-card__question">{item.question}</h3>
                <p className="faq-grid-card__answer">{item.answer}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </SectionReveal>
    </section>
  );
}
