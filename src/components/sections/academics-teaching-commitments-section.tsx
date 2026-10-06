import { Activity, BookOpenText, BrainCog, ClipboardCheck, Globe2, Goal, HeartHandshake, Medal, Network, PersonStanding, ShieldCheck, Target, Users, UsersRound } from "lucide-react";
import type { ComponentType } from "react";
import { HoverIconCard } from "@/components/ui/hover-icon-card";
import { SectionReveal } from "@/components/ui/section-reveal";
import { Reveal } from "@/components/ui/reveal";
import { RichText } from "@/components/ui/rich-text";
import type { AcademicsTeachingCommitmentsSection as AcademicsTeachingCommitmentsSectionData } from "@/types/sanity";

type AcademicsTeachingCommitmentsSectionProps = {
  section?: AcademicsTeachingCommitmentsSectionData;
  fallbackSection: AcademicsTeachingCommitmentsSectionData;
};

type IconProps = {
  size?: number;
  strokeWidth?: number;
};

const iconMap: Record<string, ComponentType<IconProps>> = {
  expectations: Goal,
  engagement: UsersRound,
  achievement: Medal,
  standards: ClipboardCheck,
  pbl: BrainCog,
  udl: PersonStanding,
  identity: ShieldCheck,
  social: Globe2,
  connections: Network,
  people: UsersRound,
  book: BookOpenText,
  activity: Activity,
  care: HeartHandshake,
  family: Users,
  target: Target,
};

export function AcademicsTeachingCommitmentsSection({
  section,
  fallbackSection,
}: AcademicsTeachingCommitmentsSectionProps) {
  const heading = section?.heading || fallbackSection.heading;
  const cards = section?.cards?.length ? section.cards : fallbackSection.cards || [];

  if (!heading?.title && !cards.length) {
    return null;
  }

  return (
    <section className="academics-teaching" aria-labelledby="academics-teaching-title">
      <SectionReveal className="academics-teaching__inner">
        {heading?.title ? (
          <h2 id="academics-teaching-title" className="academics-teaching__title">
            {heading.title}
          </h2>
        ) : null}

        {cards.length ? (
          <div className="academics-teaching__cards">
            {cards.map((card, index) => {
              const Icon = iconMap[card.iconType || "achievement"] || Medal;

              return (
                <Reveal
                  key={card._key || `${card.title}-${index}`}
                  className="academics-card-reveal"
                  delay={100 + index * 130}
                  threshold={0.12}
                >
                  <HoverIconCard
                    icon={card.icon}
                    fallbackIcon={Icon}
                    title={card.title}
                    description={card.description}
                    className="academics-teaching__card"
                    iconSizes="84px"
                  />
                </Reveal>
              );
            })}
          </div>
        ) : null}

        {heading?.description?.length ? (
          <RichText blocks={heading.description} className="academics-teaching__outro" />
        ) : null}
      </SectionReveal>
    </section>
  );
}
