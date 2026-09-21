import { QuickLinksCards } from "@/components/sections/quick-links-cards";
import type { HomepageData } from "@/types/sanity";

type QuickLinksSectionProps = {
  section?: HomepageData["quickLinks"];
};

export function QuickLinksSection({ section }: QuickLinksSectionProps) {
  if (!section?.heading?.title && !section?.cards?.length) {
    return null;
  }

  const title = section.heading?.title || "Quick Links";

  return (
    <section className="quick-links" aria-labelledby="quick-links-title">
      <div className="quick-links__inner">
        <div className="quick-links__heading">
          <h2 id="quick-links-title" className="quick-links__title">
            {title}
          </h2>
        </div>

        <QuickLinksCards cards={section.cards || []} />
      </div>
    </section>
  );
}
