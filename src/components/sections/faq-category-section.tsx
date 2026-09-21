import { Reveal } from "@/components/ui/reveal";
import { SectionReveal } from "@/components/ui/section-reveal";
import type { FaqSection } from "@/types/sanity";

type FaqCategorySectionProps = {
  section?: FaqSection;
  id?: string;
  className?: string;
};

export function FaqCategorySection({
  section,
  id = "faq-category-title",
  className = "",
}: FaqCategorySectionProps) {
  const items = section?.items || [];

  if (!items.length) return null;

  return (
    <section className={`faq-category-section ${className}`.trim()} aria-labelledby={id}>
      <SectionReveal className="faq-category-section__inner">
        <h2 id={id} className="faq-category-section__title">
          {section?.heading?.title || "Admissions and Orientation"}
        </h2>

        <div className="faq-category-section__items">
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
      </SectionReveal>
    </section>
  );
}
