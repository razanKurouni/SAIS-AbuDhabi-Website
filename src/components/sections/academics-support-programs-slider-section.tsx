"use client";

import {
  Accessibility,
  BrainCircuit,
  CalendarCheck,
  Calculator,
  ChevronLeft,
  ChevronRight,
  Eye,
  Globe2,
  Handshake,
  HeartHandshake,
  Megaphone,
  MessagesSquare,
  PartyPopper,
  PencilRuler,
  Presentation,
  Sparkles,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { CSSProperties } from "react";
import { HoverIconCard } from "@/components/ui/hover-icon-card";
import { Reveal } from "@/components/ui/reveal";
import type {
  AcademicsSupportProgramCard,
  AcademicsSupportProgramsSection as AcademicsSupportProgramsSectionData,
} from "@/types/sanity";

type VisibleCounts = {
  desktop?: number;
  tablet?: number;
  mobile?: number;
};

type AcademicsSupportProgramsSliderSectionProps = {
  section?: AcademicsSupportProgramsSectionData;
  fallbackSection: AcademicsSupportProgramsSectionData;
  className?: string;
  autoplayIntervalMs?: number;
  /** How many cards sit side by side. Defaults to 3 / 2 / 1. */
  visibleCounts?: VisibleCounts;
  /** Icon names used, by card order, for cards with no uploaded icon and no iconType. */
  fallbackIconNames?: FallbackIconName[];
};

type SupportProgramsStyle = CSSProperties & {
  "--support-programs-bg"?: string;
  "--support-programs-title"?: string;
  "--support-card-border"?: string;
  "--support-card-hover-border"?: string;
  "--support-card-text"?: string;
  "--support-card-icon"?: string;
};

type SupportProgramsTrackStyle = CSSProperties & {
  "--support-visible-count"?: number;
};

const fallbackIconMap = {
  determination: Accessibility,
  gifted: Sparkles,
  eal: Globe2,
  counseling: MessagesSquare,
  differentiation: BrainCircuit,
} satisfies Record<NonNullable<AcademicsSupportProgramCard["iconType"]>, typeof Accessibility>;

/* Names rather than components, because a Server Component cannot pass a function to this one. */
const namedIconMap = {
  accessibility: Accessibility,
  brain: BrainCircuit,
  calculator: Calculator,
  calendar: CalendarCheck,
  celebration: PartyPopper,
  eye: Eye,
  globe: Globe2,
  handshake: Handshake,
  heart: HeartHandshake,
  megaphone: Megaphone,
  messages: MessagesSquare,
  presentation: Presentation,
  ruler: PencilRuler,
  sparkles: Sparkles,
};

export type FallbackIconName = keyof typeof namedIconMap;

function getVisibleCount({ desktop = 3, tablet = 2, mobile = 1 }: VisibleCounts = {}) {
  if (typeof window === "undefined") {
    return desktop;
  }

  if (window.innerWidth >= 960) {
    return desktop;
  }

  if (window.innerWidth >= 640) {
    return tablet;
  }

  return mobile;
}

export function AcademicsSupportProgramsSliderSection({
  section,
  fallbackSection,
  className = "",
  autoplayIntervalMs = 5000,
  visibleCounts,
  fallbackIconNames,
}: AcademicsSupportProgramsSliderSectionProps) {
  const heading = section?.heading || fallbackSection.heading;
  const cards = section?.cards?.length ? section.cards : fallbackSection.cards || [];
  const [visibleCount, setVisibleCount] = useState(visibleCounts?.desktop ?? 3);
  const [activeStart, setActiveStart] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const maxStart = Math.max(0, cards.length - visibleCount);
  const safeActiveStart = Math.min(activeStart, maxStart);
  const dots = useMemo(() => Array.from({ length: maxStart + 1 }, (_, index) => index), [maxStart]);

  const goToPrev = useCallback(() => setActiveStart((s) => (s <= 0 ? maxStart : s - 1)), [maxStart]);
  const goToNext = useCallback(() => setActiveStart((s) => (s >= maxStart ? 0 : s + 1)), [maxStart]);

  useEffect(() => {
    if (maxStart <= 0 || isHovered || (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches)) return;
    const timer = window.setInterval(goToNext, autoplayIntervalMs);
    return () => window.clearInterval(timer);
  }, [autoplayIntervalMs, goToNext, maxStart, isHovered]);

  const desktopCount = visibleCounts?.desktop;
  const tabletCount = visibleCounts?.tablet;
  const mobileCount = visibleCounts?.mobile;

  useEffect(() => {
    const updateVisibleCount = () => {
      setVisibleCount(getVisibleCount({ desktop: desktopCount, tablet: tabletCount, mobile: mobileCount }));
    };

    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);

    return () => window.removeEventListener("resize", updateVisibleCount);
  }, [desktopCount, tabletCount, mobileCount]);

  if (!heading?.title && !cards.length) {
    return null;
  }

  const style: SupportProgramsStyle = {
    "--support-programs-bg": section?.backgroundColor || fallbackSection.backgroundColor,
    "--support-programs-title": section?.titleColor || fallbackSection.titleColor,
    "--support-card-border": section?.cardBorderColor || fallbackSection.cardBorderColor,
    "--support-card-hover-border": section?.cardHoverBorderColor || fallbackSection.cardHoverBorderColor,
    "--support-card-text": section?.cardTextColor || fallbackSection.cardTextColor,
    "--support-card-icon": section?.cardIconColor || fallbackSection.cardIconColor,
  };
  const trackStyle: SupportProgramsTrackStyle = {
    "--support-visible-count": visibleCount,
    transform: `translateX(calc(-${safeActiveStart} * ((100% - (${visibleCount - 1} * var(--support-slider-gap))) / ${visibleCount} + var(--support-slider-gap))))`,
  };

  return (
    <section
      className={`academics-support-programs ${className}`.trim()}
      aria-labelledby={heading?.title ? "academics-support-programs-title" : undefined}
      style={style}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Reveal className="academics-support-programs__inner">
        {heading?.title ? (
          <h2 id="academics-support-programs-title" className="academics-support-programs__title">
            {heading.title}
          </h2>
        ) : null}

        {heading?.subtitle ? (
          <p className="academics-support-programs__subtitle">{heading.subtitle}</p>
        ) : null}

        {cards.length ? (
          <>
            {dots.length > 1 ? (
              <div className="academics-support-programs__arrows">
                <button
                  type="button"
                  className="academics-support-programs__arrow academics-support-programs__arrow--prev"
                  aria-label="Previous"
                  onClick={goToPrev}
                  disabled={false}
                >
                  <ChevronLeft aria-hidden="true" strokeWidth={1.8} />
                </button>
                <button
                  type="button"
                  className="academics-support-programs__arrow academics-support-programs__arrow--next"
                  aria-label="Next"
                  onClick={goToNext}
                  disabled={false}
                >
                  <ChevronRight aria-hidden="true" strokeWidth={1.8} />
                </button>
              </div>
            ) : null}

            <div className="academics-support-programs__viewport">
              <div className="academics-support-programs__track" style={trackStyle}>
                {cards.map((card, index) => {
                  const namedIcon = fallbackIconNames?.[index]
                    ? namedIconMap[fallbackIconNames[index]]
                    : undefined;
                  const FallbackIcon = card.iconType
                    ? fallbackIconMap[card.iconType]
                    : namedIcon || Accessibility;

                  return (
                    <HoverIconCard
                      key={card._key || `${card.title}-${index}`}
                      className="academics-support-programs__card"
                      icon={card.icon}
                      fallbackIcon={FallbackIcon}
                      title={card.title}
                      description={card.description}
                      iconSizes="96px"
                    />
                  );
                })}
              </div>
            </div>

            {dots.length > 1 ? (
              <div className="academics-support-programs__dots" aria-label="Support programs slider controls">
                {dots.map((startIndex) => (
                  <button
                    key={startIndex}
                    type="button"
                    className={`academics-support-programs__dot ${safeActiveStart === startIndex ? "is-active" : ""}`.trim()}
                    aria-label={`Show support programs ${startIndex + 1}`}
                    aria-pressed={safeActiveStart === startIndex}
                    onClick={() => setActiveStart(startIndex)}
                  />
                ))}
              </div>
            ) : null}
          </>
        ) : null}
      </Reveal>
    </section>
  );
}
