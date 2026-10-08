"use client";

import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { RichText } from "@/components/ui/rich-text";
import { SectionReveal } from "@/components/ui/section-reveal";
import type { ApplicationStepsSection as ApplicationStepsSectionData } from "@/types/sanity";

type ApplicationStepsSectionProps = {
  section?: ApplicationStepsSectionData;
  /** Lay the cards out in a wrapping grid of this many columns instead of the slider. */
  columns?: number;
};

type StepStyle = CSSProperties & {
  "--application-step-color"?: string;
};

type TrackStyle = CSSProperties & {
  "--application-steps-visible"?: number;
  "--application-steps-columns"?: number;
};

function useVisibleCount() {
  const [count, setCount] = useState(3);
  useEffect(() => {
    const update = () => setCount(window.innerWidth <= 767 ? 1 : window.innerWidth <= 1100 ? 2 : 3);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return count;
}

/** Numbered step cards; more cards than fit side by side slide one at a time with dots. */
export function ApplicationStepsSection({ section, columns }: ApplicationStepsSectionProps) {
  const steps = section?.steps || [];
  const visibleInSlider = useVisibleCount();
  const isGrid = Boolean(columns);
  const visible = isGrid ? steps.length || 1 : visibleInSlider;
  const [start, setStart] = useState(0);
  const maxStart = isGrid ? 0 : Math.max(0, steps.length - visible);
  const safeStart = Math.min(start, maxStart);
  const dots = useMemo(() => Array.from({ length: maxStart + 1 }, (_, index) => index), [maxStart]);

  if (!steps.length) {
    return null;
  }

  const trackStyle: TrackStyle = isGrid
    ? { "--application-steps-visible": visible, "--application-steps-columns": columns }
    : {
        "--application-steps-visible": visible,
        transform: `translateX(calc(-${safeStart} * ((100% - (${visible - 1} * var(--application-steps-gap))) / ${visible} + var(--application-steps-gap))))`,
      };

  return (
    <section className="application-steps" aria-labelledby={section?.heading?.title ? "application-steps-title" : undefined}>
      <SectionReveal className="application-steps__inner">
        {section?.heading?.title ? (
          <h2 id="application-steps-title" className="application-steps__title">
            {section.heading.title}
          </h2>
        ) : null}

        <div className="application-steps__viewport">
          <div className={`application-steps__track ${isGrid ? "application-steps__track--grid" : ""}`.trim()} style={trackStyle}>
            {steps.map((step, index) => (
              <article
                className="application-step"
                key={step._key || `${step.number}-${step.title}`}
                style={{ "--application-step-color": step.backgroundColor } as StepStyle}
              >
                <span className="application-step__number" aria-hidden="true">
                  {step.number || index + 1}
                </span>
                <h3 className="application-step__title">{step.title}</h3>
                {step.body?.length ? (
                  <RichText blocks={step.body} className="application-step__body" />
                ) : step.description ? (
                  <p className="application-step__description">{step.description}</p>
                ) : null}
              </article>
            ))}
          </div>
        </div>

        {dots.length > 1 ? (
          <div className="application-steps__dots" aria-label="Application steps slider controls">
            {dots.map((index) => (
              <button
                key={index}
                type="button"
                className={`application-steps__dot ${safeStart === index ? "is-active" : ""}`.trim()}
                aria-label={`Show steps from ${index + 1}`}
                aria-pressed={safeStart === index}
                onClick={() => setStart(index)}
              />
            ))}
          </div>
        ) : null}
      </SectionReveal>
    </section>
  );
}
