import Image from "next/image";
import type { CSSProperties } from "react";
import { Reveal } from "@/components/ui/reveal";
import type { AboutBenefitsSection as AboutBenefitsSectionData } from "@/types/sanity";

type AboutBenefitsSectionProps = {
  section?: AboutBenefitsSectionData;
};

type AboutBenefitsStyle = CSSProperties & {
  "--about-benefits-bg"?: string;
  "--about-benefits-title"?: string;
  "--about-benefits-subtitle"?: string;
};

function BenefitsWave() {
  return (
    <svg className="quick-links-card__wave" viewBox="0 0 96 320" preserveAspectRatio="none" aria-hidden="true">
      <path pathLength={1} d="M52 -24 C16 42 16 92 42 154 C70 220 70 274 38 344" />
    </svg>
  );
}

function BenefitsCurveMask() {
  return (
    <svg className="quick-links-card__curve-mask" viewBox="0 0 96 320" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0 -32 H52 C16 42 16 92 42 154 C70 220 70 274 38 352 H0 Z" />
    </svg>
  );
}

/** Title, subtitle and a grid of image cards; shares the Quick Links card layout. */
export function AboutBenefitsSection({ section }: AboutBenefitsSectionProps) {
  const heading = section?.heading;
  const cards = section?.cards || [];

  if (!heading?.title && !cards.length) {
    return null;
  }

  const style: AboutBenefitsStyle = {
    "--about-benefits-bg": section?.backgroundColor,
    "--about-benefits-title": section?.titleColor,
    "--about-benefits-subtitle": section?.subtitleColor,
  };

  return (
    <section className="about-benefits" aria-labelledby="about-benefits-title" style={style}>
      <div className="about-benefits__inner">
        <Reveal className="about-benefits__heading">
          {heading?.title ? (
            <h2 id="about-benefits-title" className="about-benefits__title">
              {heading.title}
            </h2>
          ) : null}
          {heading?.subtitle ? <p className="about-benefits__subtitle">{heading.subtitle}</p> : null}
        </Reveal>

        {cards.length ? (
          <div className="about-benefits__grid">
            {cards.map((card, index) => (
              <Reveal
                as="article"
                key={`${card.title}-${index}`}
                className="quick-links-card about-benefits__card academics-card-reveal"
                delay={100 + index * 120}
                threshold={0.12}
              >
                <div className="quick-links-card__copy">
                  <h3 className="quick-links-card__title">{card.title}</h3>
                  {card.description ? <p className="quick-links-card__text">{card.description}</p> : null}
                </div>

                <BenefitsWave />
                <BenefitsCurveMask />

                <div className="quick-links-card__image-wrap">
                  {card.image?.url ? (
                    <Image
                      src={card.image.url}
                      alt={card.image.alt || card.title}
                      fill
                      quality={82}
                      sizes="(max-width: 767px) 92vw, (max-width: 1200px) 42vw, 520px"
                      className="quick-links-card__image"
                    />
                  ) : (
                    <div className="quick-links-card__fallback">{card.title}</div>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
