import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowRight } from "lucide-react";
import { SectionReveal } from "@/components/ui/section-reveal";
import type { HomepageData } from "@/types/sanity";

const LearningPhasesCards = dynamic(
  () => import("@/components/sections/learning-phases-cards").then((module) => module.LearningPhasesCards),
);

type LearningPhasesSectionProps = {
  section?: HomepageData["learningPhases"];
  excludeHref?: string;
  excludeTitle?: string;
};

function SectionArrow() {
  return (
    <span className="learning-phases__arrow" aria-hidden="true">
      <ArrowRight size={17} strokeWidth={3} />
    </span>
  );
}

export function LearningPhasesSection({ section, excludeHref, excludeTitle }: LearningPhasesSectionProps) {
  if (!section?.cards?.length) {
    return null;
  }

  const title = section.heading?.title || "Our Learning Phases";
  const cta = section.cta;
  const cards = section.cards.filter((card) => {
    if (excludeTitle && card.title?.toLowerCase() === excludeTitle.toLowerCase()) return false;
    if (excludeHref && card.cta?.href === excludeHref) return false;
    return true;
  });

  return (
    <section id="learning-phases" className="learning-phases" aria-labelledby="learning-phases-title">
      <div className="learning-phases__inner">
        <SectionReveal className="learning-phases__top">
          <h2 id="learning-phases-title" className="learning-phases__title">
            {title}
          </h2>

          {cta && (
            <Link
              href={cta.href || "#"}
              target={cta.openInNewTab ? "_blank" : undefined}
              rel={cta.openInNewTab ? "noreferrer" : undefined}
              className="learning-phases__section-button"
            >
              <span>{cta.label || "See More"}</span>
              <SectionArrow />
            </Link>
          )}
        </SectionReveal>

        <LearningPhasesCards cards={cards} />
      </div>
    </section>
  );
}
