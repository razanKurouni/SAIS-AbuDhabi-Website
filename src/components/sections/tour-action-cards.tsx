import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CmsImage } from "@/components/ui/cms-image";
import { Reveal } from "@/components/ui/reveal";
import { SaisCurvedPanel } from "@/components/ui/sais-curved-panel";
import type { FeatureCard } from "@/types/sanity";

type TourActionCardsProps = {
  cards?: FeatureCard[];
};

const toneMap = {
  blue: {
    fill: "var(--sais-primary)",
    accent: "var(--sais-accent)",
  },
  teal: {
    fill: "var(--sais-accent)",
    accent: "var(--sais-primary)",
  },
};

function ArrowBadge() {
  return (
    <span className="tour-action-card__arrow" aria-hidden="true">
      <ArrowRight size={17} strokeWidth={3} />
    </span>
  );
}

export function TourActionCards({ cards = [] }: TourActionCardsProps) {
  return (
    <div className="tour-actions__grid">
      {cards.map((card, index) => {
        const tone = index % 2 === 0 ? "blue" : "teal";
        const colors = toneMap[tone];
        const title = card.title || (index % 2 === 0 ? "Book a Tour" : "Start Your Application");

        return (
          <Reveal
            as="article"
            key={`${title}-${index}`}
            className={`tour-action-card tour-action-card--${tone}`}
            delay={index * 120}
            threshold={0.16}
          >
            <CmsImage
              image={card.image}
              fallbackLabel={title}
              className="tour-action-card__image"
              imageClassName="object-cover"
              sizes="(max-width: 767px) 92vw, 42vw"
            />

            <SaisCurvedPanel
              className="tour-action-card__panel"
              contentClassName="tour-action-card__panel-content"
              fillColor={colors.fill}
              accentColor={colors.accent}
              strokeWidth={82}
            >
              <h3 className="tour-action-card__title">{title}</h3>

              {card.cta && (
                <Link
                  href={card.cta.href || "#"}
                  target={card.cta.openInNewTab ? "_blank" : undefined}
                  rel={card.cta.openInNewTab ? "noreferrer" : undefined}
                  className="tour-action-card__button"
                >
                  <span>{card.cta.label}</span>
                  <ArrowBadge />
                </Link>
              )}
            </SaisCurvedPanel>
          </Reveal>
        );
      })}
    </div>
  );
}
