import { CmsImage } from "@/components/ui/cms-image";
import { CtaLink } from "@/components/ui/cta-link";
import { SectionHeading } from "@/components/ui/section-heading";
import type { FeatureCard, SectionHeading as SectionHeadingType } from "@/types/sanity";

type CardGridSectionProps = {
  id?: string;
  heading?: SectionHeadingType;
  cards?: FeatureCard[];
  variant?: "quick" | "phase" | "news";
};

export function CardGridSection({ id, heading, cards = [], variant = "quick" }: CardGridSectionProps) {
  if (cards.length === 0) {
    return null;
  }

  const isPhase = variant === "phase";
  const isNews = variant === "news";

  return (
    <section id={id} className="py-10">
      <SectionHeading
        heading={heading}
        align={isPhase || isNews ? "center" : "left"}
        titleClassName="text-[color:var(--sais-accent)]"
        className="mb-7"
      />
      <div className={`grid gap-5 ${isNews ? "md:grid-cols-3" : "sm:grid-cols-2 lg:grid-cols-4"}`}>
        {cards.map((card, index) => (
          <article
            key={`${card.title}-${index}`}
            className={`overflow-hidden rounded-xl bg-white shadow-sm ${
              isPhase ? "border border-[#d8e3e6]" : "border border-white/40"
            }`}
          >
            <CmsImage
              image={card.image}
              fallbackLabel={card.title}
              className={isPhase ? "aspect-[4/3]" : "aspect-[5/4]"}
              sizes="(max-width: 768px) 100vw, 25vw"
            />
            <div className={`${isPhase ? "bg-[color:var(--sais-primary)] text-white" : "bg-white text-[#10324b]"} p-5`}>
              <h3 className="text-lg font-semibold">{card.title}</h3>
              {card.description && (
                <p className={`mt-2 text-sm leading-6 ${isPhase ? "text-white/82" : "text-[#5b7280]"}`}>
                  {card.description}
                </p>
              )}
              {card.cta && (
                <div className="mt-4">
                  <CtaLink
                    cta={{
                      ...card.cta,
                      variant: isPhase ? "primary" : card.cta.variant || "secondary",
                    }}
                    className="min-h-7 px-4"
                  />
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
