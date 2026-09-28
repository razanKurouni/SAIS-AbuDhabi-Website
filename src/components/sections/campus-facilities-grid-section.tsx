import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import { SectionReveal } from "@/components/ui/section-reveal";
import type { FeatureCard, SectionHeading } from "@/types/sanity";

type CampusFacilitiesGridSectionProps = {
  section?: { heading?: SectionHeading; cards: FeatureCard[] };
  className?: string;
};

export function CampusFacilitiesGridSection({ section, className = "" }: CampusFacilitiesGridSectionProps) {
  const cards = section?.cards || [];

  if (!cards.length) {
    return null;
  }

  const title = section?.heading?.title;

  return (
    <section
      className={`campus-facilities-grid ${className}`.trim()}
      aria-labelledby={title ? "campus-facilities-grid-title" : undefined}
      aria-label={title ? undefined : "Campus facilities"}
    >
      <SectionReveal className="campus-facilities-grid__inner">
        {title ? (
          <h2 id="campus-facilities-grid-title" className="campus-facilities-grid__title">
            {title}
          </h2>
        ) : null}

        <div className="campus-facilities-grid__grid">
          {cards.map((card, index) => (
            <Reveal as="article" className="campus-facility-card" delay={index * 70} key={`${card.title}-${index}`}>
              {card.image?.url ? (
                <div className="campus-facility-card__image">
                  <Image
                    src={card.image.url}
                    alt={card.image.alt || card.title}
                    fill
                    sizes="(max-width: 767px) calc(100vw - 32px), (max-width: 1023px) 46vw, 30vw"
                    className="campus-facility-card__img"
                  />
                </div>
              ) : null}
              <div className="campus-facility-card__body">
                <h3 className="campus-facility-card__title">{card.title}</h3>
                {card.description ? <p className="campus-facility-card__text">{card.description}</p> : null}
              </div>
            </Reveal>
          ))}
        </div>
      </SectionReveal>
    </section>
  );
}
