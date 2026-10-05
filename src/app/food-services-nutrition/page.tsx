import type { Metadata } from "next";
import { SitePageShell } from "@/components/layout/site-page-shell";
import { EditorialSplitSection } from "@/components/sections/editorial-split-section";
import { IntroFeatureSection } from "@/components/sections/intro-feature-section";
import { CmsImage } from "@/components/ui/cms-image";
import { RichText } from "@/components/ui/rich-text";
import { SectionReveal } from "@/components/ui/section-reveal";
import { PageHero } from "@/components/sections/page-hero";
import { CommunityInnerNav } from "@/components/sections/community-inner-nav";
import { TourIntroSection } from "@/components/sections/tour-intro-section";
import { TourSection } from "@/components/sections/tour-section";
import { getFoodServicesNutritionPage, getHomepage } from "@/lib/sanity";

const fallbackMetadata: Metadata = {
  title: "Food Services & Nutrition | SAIS - Abu Dhabi",
  description: "Learn about food services and nutrition at SAIS - Abu Dhabi.",
};

const fallbackHero = {
  title: "Food\nNutrition",
  image: {
    url: "/contact-campus-building.jpg",
    alt: "SAIS - Abu Dhabi food services and nutrition",
  },
  topLineColor: "#216B97",
  panelColor: "#00A5B2",
  waveColor: "#d97252",
  textColor: "#ffffff",
  imagePosition: "center",
  imageWidth: "58%",
};

export async function generateMetadata(): Promise<Metadata> {
  const page = await getFoodServicesNutritionPage();

  return {
    title: page?.seo?.title || fallbackMetadata.title,
    description: page?.seo?.description || fallbackMetadata.description,
  };
}

export const dynamic = "force-dynamic";

export default async function FoodServicesNutritionPage() {
  const [data, page] = await Promise.all([getHomepage(), getFoodServicesNutritionPage()]);
  const hero = page?.hero;
  const heroTitle = hero?.heading?.title || fallbackHero.title;
  const heroImage = hero?.image || fallbackHero.image;

  return (
    <SitePageShell
      data={data}
      mainClassName="site-page__main food-services-nutrition-page__main"
      pageClassName="food-services-nutrition-page"
    >
      <PageHero
        className="food-services-nutrition-hero"
        title={heroTitle}
        image={heroImage}
        titleId="food-services-nutrition-hero-title"
        priority
        topLineColor={hero?.topLineColor || fallbackHero.topLineColor}
        panelColor={hero?.panelColor || fallbackHero.panelColor}
        waveColor={hero?.waveColor || fallbackHero.waveColor}
        textColor={hero?.textColor || fallbackHero.textColor}
        imagePosition={hero?.imagePosition || fallbackHero.imagePosition}
        imageWidth={hero?.imageWidth || fallbackHero.imageWidth}
      />
      <CommunityInnerNav activeHref="/food-services-nutrition" />

      <section className="wellbeing-commitment food-services-intro-band" aria-labelledby="food-services-intro-title">
        <div className="wellbeing-commitment__inner">
          <SectionReveal className="wellbeing-commitment__copy">
            <h2 id="food-services-intro-title" className="wellbeing-commitment__title">
              {page?.introSection?.heading?.title || "Growing Strong Minds Through Good Nutrition"}
            </h2>
            <RichText blocks={page?.introSection?.heading?.description} className="wellbeing-commitment__body" />
          </SectionReveal>

          {page?.introSection?.image?.url ? (
            <SectionReveal className="wellbeing-commitment__media">
              <CmsImage
                image={page.introSection.image}
                fallbackLabel={page.introSection.heading?.title || "Food and nutrition"}
                className="wellbeing-commitment__image"
                imageClassName="object-cover"
                sizes="(max-width: 767px) 90vw, 78vw"
              />
            </SectionReveal>
          ) : null}
        </div>
      </section>

      {page?.cafeteriaSection ? (
        <EditorialSplitSection
          id="food-services-cafeteria"
          title="School Cafeteria"
          section={page.cafeteriaSection}
          fallbackImage={{}}
          fallbackParagraphs={[]}
          className="academics-steam-section wellbeing-counseling-section food-services-split"
          imageSizes="(max-width: 767px) calc(100vw - 32px), 44vw"
          showTitle
          preserveRichText
        />
      ) : null}

      <IntroFeatureSection
        className="food-services-hygiene-feature"
        titleId="food-services-hygiene-title"
        section={page?.hygieneSection}
        panelColor={page?.hygieneSection?.backgroundColor || "#216B97"}
        accentColor="#D97252"
        titleColor={page?.hygieneSection?.titleColor || "#00A5B2"}
        textColor={page?.hygieneSection?.textColor || "#ffffff"}
        imagePosition={page?.hygieneSection?.imagePosition || "center"}
        imageSide="right"
      />

      {page?.teamSection ? (
        <EditorialSplitSection
          id="food-services-team"
          title="Our Qualified Team"
          section={page.teamSection}
          fallbackImage={{}}
          fallbackParagraphs={[]}
          className="academics-steam-section wellbeing-counseling-section food-services-split"
          imageSizes="(max-width: 767px) calc(100vw - 32px), 44vw"
          showTitle
          preserveRichText
        />
      ) : null}

      <TourIntroSection section={data?.tour} />
      <TourSection section={data?.tour} />
    </SitePageShell>
  );
}
