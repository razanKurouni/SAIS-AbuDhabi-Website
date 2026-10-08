import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { SitePageShell } from "@/components/layout/site-page-shell";
import { EditorialSplitSection } from "@/components/sections/editorial-split-section";
import { PageHero } from "@/components/sections/page-hero";
import { CommunityInnerNav } from "@/components/sections/community-inner-nav";
import { TourSection } from "@/components/sections/tour-section";
import { TourIntroSection } from "@/components/sections/tour-intro-section";
import { Reveal } from "@/components/ui/reveal";
import { SectionReveal } from "@/components/ui/section-reveal";
import { getHomepage, getParentInvolvementPage } from "@/lib/sanity";

type GoalCardStyle = CSSProperties & {
  "--parent-goal-title"?: string;
  "--parent-goal-curve"?: string;
};

const fallbackMetadata: Metadata = {
  title: "Parent Involvement | SAIS - Abu Dhabi",
  description: "Learn how SAIS - Abu Dhabi partners with parents to support student success.",
};

const fallbackHero = {
  title: "Parent\nInvolvement",
  image: {
    url: "/contact-campus-building.jpg",
    alt: "SAIS - Abu Dhabi parent involvement",
  },
  topLineColor: "#216B97",
  panelColor: "#00A5B2",
  waveColor: "#d97252",
  textColor: "#ffffff",
  imagePosition: "center",
  imageWidth: "58%",
};

export async function generateMetadata(): Promise<Metadata> {
  const page = await getParentInvolvementPage();

  return {
    title: page?.seo?.title || fallbackMetadata.title,
    description: page?.seo?.description || fallbackMetadata.description,
  };
}

export const dynamic = "force-dynamic";

export default async function ParentInvolvementPage() {
  const [data, page] = await Promise.all([getHomepage(), getParentInvolvementPage()]);
  const hero = page?.hero;
  const heroTitle = hero?.heading?.title || fallbackHero.title;
  const heroImage = hero?.image || fallbackHero.image;
  const goals = page?.goalsSection;

  return (
    <SitePageShell
      data={data}
      mainClassName="site-page__main parent-involvement-page__main"
      pageClassName="parent-involvement-page"
    >
      <PageHero
        className="parent-involvement-hero"
        title={heroTitle}
        image={heroImage}
        titleId="parent-involvement-hero-title"
        priority
        topLineColor={hero?.topLineColor || fallbackHero.topLineColor}
        panelColor={hero?.panelColor || fallbackHero.panelColor}
        waveColor={hero?.waveColor || fallbackHero.waveColor}
        textColor={hero?.textColor || fallbackHero.textColor}
        imagePosition={hero?.imagePosition || fallbackHero.imagePosition}
        imageWidth={hero?.imageWidth || fallbackHero.imageWidth}
      />
      <CommunityInnerNav activeHref="/parent-involvement" />

      {page?.partnershipSection ? (
        <EditorialSplitSection
          id="parent-involvement-partnership"
          title="Parent Partnership"
          section={page.partnershipSection}
          fallbackImage={{}}
          fallbackParagraphs={[]}
          className="academics-steam-section wellbeing-counseling-section parent-involvement-partnership"
          imageSizes="(max-width: 767px) calc(100vw - 32px), 44vw"
          showTitle
          preserveRichText
        />
      ) : null}

      {goals?.cards?.length ? (
        <section className="parent-goals" aria-labelledby="parent-goals-title">
          <div className="parent-goals__inner">
            <SectionReveal className="parent-goals__header">
              <h2 id="parent-goals-title" className="parent-goals__title">
                {goals.heading?.title || "Goals to be Achieved through the Policy"}
              </h2>
            </SectionReveal>
            <div className="parent-goals__grid">
              {goals.cards.map((card, index) => (
                <Reveal
                  key={card._key || index}
                  className="parent-goal-card"
                  delay={100 + index * 120}
                  threshold={0.12}
                  style={{ "--parent-goal-title": card.titleColor, "--parent-goal-curve": card.curveColor } as GoalCardStyle}
                >
                  <div className="parent-goal-card__body">
                    {card.title ? <h3 className="parent-goal-card__title">{card.title}</h3> : null}
                    {card.description ? <p className="parent-goal-card__text">{card.description}</p> : null}
                  </div>
                  <div className="parent-goal-card__media" aria-hidden={card.image?.alt ? undefined : true}>
                    {card.image?.url ? (
                      <Image
                        src={card.image.url}
                        alt={card.image.alt || ""}
                        fill
                        sizes="(max-width: 767px) 42vw, 20vw"
                        className="parent-goal-card__image"
                      />
                    ) : null}
                    <svg className="parent-goal-card__curve" viewBox="0 0 96 320" preserveAspectRatio="none" aria-hidden="true">
                      <path className="parent-goal-card__curve-mask" d="M0 -32 H52 C16 42 16 92 42 154 C70 220 70 274 38 352 H0 Z" />
                      <path className="parent-goal-card__curve-line" d="M52 -24 C16 42 16 92 42 154 C70 220 70 274 38 344" />
                    </svg>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <TourIntroSection section={data?.tour} />
      <TourSection section={data?.tour} />
    </SitePageShell>
  );
}
