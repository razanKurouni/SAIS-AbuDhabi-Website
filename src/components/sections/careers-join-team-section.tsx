import { HoverIconCard } from "@/components/ui/hover-icon-card";
import { Reveal } from "@/components/ui/reveal";
import { RichText } from "@/components/ui/rich-text";
import { SectionReveal } from "@/components/ui/section-reveal";
import type { CareersJoinTeamSection as CareersJoinTeamSectionData } from "@/types/sanity";

/** An email address that has to wrap breaks before its "@" ("hrrecruitment" / "@saisabudhabi.com"), not mid-word. */
function withEmailBreak(text: string) {
  if (!text.includes("@")) return text;
  return text.split("@").flatMap((part, index) => (index === 0 ? [part] : [<wbr key={index} />, `@${part}`]));
}

/** Each line of a card's text wraps on its own, so it can balance without leaving one word alone. */
function cardLines(text?: string) {
  return text?.split("\n").map((line, index) => (
    <span key={index} className="careers-join-team__card-line">
      {withEmailBreak(line)}
    </span>
  ));
}

type CareersJoinTeamSectionProps = {
  section?: CareersJoinTeamSectionData;
  fallbackSection: CareersJoinTeamSectionData;
};

export function CareersJoinTeamSection({
  section,
  fallbackSection,
}: CareersJoinTeamSectionProps) {
  const heading = section?.heading || fallbackSection.heading;
  const cards = section?.cards?.length ? section.cards : fallbackSection.cards || [];

  if (!heading?.title && !cards.length) {
    return null;
  }

  return (
    <section className="careers-join-team" aria-labelledby="careers-join-team-title">
      <SectionReveal className="careers-join-team__inner">
        <div className="careers-join-team__header">
          {heading?.title ? (
            <h2 id="careers-join-team-title" className="careers-join-team__title">
              {heading.title}
            </h2>
          ) : null}
          <RichText blocks={heading?.description} className="careers-join-team__body" />
        </div>

        {cards.length ? (
          <div className="careers-join-team__cards">
            {cards.map((card, index) => (
              <Reveal
                key={card._key || `${card.label}-${index}`}
                className="careers-join-team__card-reveal"
                delay={index * 90}
              >
                <HoverIconCard
                  href={card.href}
                  icon={card.icon}
                  title={card.label}
                  description={cardLines(card.text)}
                  className="careers-join-team__card"
                  iconSizes="96px"
                />
              </Reveal>
            ))}
          </div>
        ) : null}
      </SectionReveal>
    </section>
  );
}
