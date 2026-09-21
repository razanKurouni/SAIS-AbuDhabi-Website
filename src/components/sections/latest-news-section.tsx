import dynamic from "next/dynamic";
import { ArrowRight } from "lucide-react";
import type { HomepageData } from "@/types/sanity";

const LatestNewsCards = dynamic(
  () => import("@/components/sections/latest-news-cards").then((module) => module.LatestNewsCards),
);

type LatestNewsSectionProps = {
  section?: HomepageData["news"];
};

export function LatestNewsSection({ section }: LatestNewsSectionProps) {
  if (!section?.heading?.title && !section?.posts?.length) {
    return null;
  }

  return (
    <section className="latest-news" aria-labelledby="latest-news-title">
      <div className="latest-news__inner">
        <div className="latest-news__top">
          <h2 id="latest-news-title" className="latest-news__title">
            {section.heading?.title || "Latest News"}
          </h2>

          {section.cta?.href ? (
            <a
              href={section.cta.href}
              target={section.cta.openInNewTab ? "_blank" : undefined}
              rel={section.cta.openInNewTab ? "noreferrer" : undefined}
              className="latest-news__section-button"
            >
              <span>{section.cta.label || "See All"}</span>
              <span className="latest-news__arrow" aria-hidden="true">
                <ArrowRight size={17} strokeWidth={3} />
              </span>
            </a>
          ) : null}
        </div>

        <LatestNewsCards posts={section.posts || []} />
      </div>
    </section>
  );
}
