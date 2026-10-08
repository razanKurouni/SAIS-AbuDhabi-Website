import type { Metadata } from "next";
import { SitePageShell } from "@/components/layout/site-page-shell";
import { AcademicsElementaryAssessmentSection } from "@/components/sections/academics-elementary-assessment-section";
import { EditorialSplitSection } from "@/components/sections/editorial-split-section";
import { IntroFeatureSection } from "@/components/sections/intro-feature-section";
import { PageHero } from "@/components/sections/page-hero";
import { CommunityInnerNav } from "@/components/sections/community-inner-nav";
import { CmsImage } from "@/components/ui/cms-image";
import { HoverIconCard } from "@/components/ui/hover-icon-card";
import { Reveal } from "@/components/ui/reveal";
import { RichText } from "@/components/ui/rich-text";
import { SectionReveal } from "@/components/ui/section-reveal";
import { getHomepage, getStudentStaffWellbeingPage } from "@/lib/sanity";
import type { AcademicsKindergartenFeatureSection } from "@/types/sanity";
import { TourSection } from "@/components/sections/tour-section";
import { TourIntroSection } from "@/components/sections/tour-intro-section";

const fallbackCounselling: Required<AcademicsKindergartenFeatureSection> = {
  heading: { title: "Counselling and Support Services" },
  image: {},
  imageSide: "left",
  imagePosition: "center",
  backgroundColor: "#ffffff",
  panelColor: "#00A5B2",
  waveColor: "#D97252",
  titleColor: "#ffffff",
  textColor: "#ffffff",
};

const fallbackFramework: Required<AcademicsKindergartenFeatureSection> = {
  heading: { title: "Wellbeing Framework" },
  image: {},
  imageSide: "right",
  imagePosition: "center",
  backgroundColor: "#ffffff",
  panelColor: "#00A5B2",
  waveColor: "#216B97",
  titleColor: "#ffffff",
  textColor: "#ffffff",
};

const fallbackMetadata: Metadata = {
  title: "Student & Staff Wellbeing | SAIS - Abu Dhabi",
  description: "Learn about student and staff wellbeing support at SAIS - Abu Dhabi.",
};

const fallbackHero = {
  title: "Student &\nStaff Wellbeing",
  image: {
    url: "/contact-campus-building.jpg",
    alt: "SAIS - Abu Dhabi campus building",
  },
  topLineColor: "#216B97",
  panelColor: "#707174",
  waveColor: "#00A5B2",
  textColor: "#ffffff",
  imagePosition: "center",
  imageWidth: "58%",
};

export async function generateMetadata(): Promise<Metadata> {
  const page = await getStudentStaffWellbeingPage();

  return {
    title: page?.seo?.title || fallbackMetadata.title,
    description: page?.seo?.description || fallbackMetadata.description,
  };
}

export const dynamic = "force-dynamic";

export default async function StudentStaffWellbeingPage() {
  const [data, page] = await Promise.all([getHomepage(), getStudentStaffWellbeingPage()]);
  const hero = page?.hero;
  const heroTitle = hero?.heading?.title || fallbackHero.title;
  const heroImage = hero?.image || fallbackHero.image;
  const proactive = page?.proactiveSection;
  const counselling = page?.counselingSupportSection;
  const sel = page?.selSection;
  const framework = page?.wellbeingFramework;

  return (
    <SitePageShell
      data={data}
      mainClassName="site-page__main wellbeing-page__main"
      pageClassName="wellbeing-page"
    >
      <PageHero
        className="wellbeing-hero"
        title={heroTitle}
        image={heroImage}
        titleId="wellbeing-hero-title"
        priority
        topLineColor={hero?.topLineColor || fallbackHero.topLineColor}
        panelColor={hero?.panelColor || fallbackHero.panelColor}
        waveColor={hero?.waveColor || fallbackHero.waveColor}
        textColor={hero?.textColor || fallbackHero.textColor}
        imagePosition={hero?.imagePosition || fallbackHero.imagePosition}
        imageWidth={hero?.imageWidth || fallbackHero.imageWidth}
      />
      <CommunityInnerNav activeHref="/student-staff-wellbeing" />

      <section className="wellbeing-commitment" aria-labelledby="wellbeing-commitment-title">
        <div className="wellbeing-commitment__inner">
          <SectionReveal className="wellbeing-commitment__copy">
            <h2 id="wellbeing-commitment-title" className="wellbeing-commitment__title">
              {page?.commitment?.heading?.title || "Our Commitment"}
            </h2>
            <RichText blocks={page?.commitment?.heading?.description} className="wellbeing-commitment__body" />
          </SectionReveal>

          <SectionReveal className="wellbeing-commitment__media">
            <CmsImage
              image={page?.commitment?.image}
              fallbackLabel={page?.commitment?.heading?.title || "Our Commitment"}
              className="wellbeing-commitment__image"
              imageClassName="object-cover"
              sizes="(max-width: 767px) 90vw, 78vw"
            />
          </SectionReveal>
        </div>
      </section>

      {proactive?.heading?.title || proactive?.cards?.length ? (
        <section className="wellbeing-proactive" aria-labelledby="wellbeing-proactive-title">
          <div className="wellbeing-proactive__inner">
            <SectionReveal className="wellbeing-proactive__header">
              <h2 id="wellbeing-proactive-title" className="wellbeing-proactive__title">
                {proactive.heading?.title || "A Proactive Approach"}
              </h2>
            </SectionReveal>
            <RichText blocks={proactive.heading?.description} className="wellbeing-proactive__intro" />
            {proactive.cards?.length ? (
              <div className="wellbeing-proactive__cards">
                {proactive.cards.map((card, index) => (
                  <Reveal key={card._key || index} delay={100 + index * 130} threshold={0.12}>
                    <HoverIconCard
                      icon={card.icon}
                      description={card.description}
                      className="wellbeing-proactive__card"
                      iconSizes="100px"
                    />
                  </Reveal>
                ))}
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      {counselling ? (
        <IntroFeatureSection
          className="academics-kg-day-feature wellbeing-counselling-feature"
          titleId="wellbeing-counselling-title"
          section={{ heading: counselling.heading || fallbackCounselling.heading, image: counselling.image }}
          fallbackSection={{ heading: fallbackCounselling.heading, image: {} }}
          panelColor={counselling.panelColor || fallbackCounselling.panelColor}
          accentColor={counselling.waveColor || fallbackCounselling.waveColor}
          titleColor={counselling.titleColor || fallbackCounselling.titleColor}
          textColor={counselling.textColor || fallbackCounselling.textColor}
          imagePosition={counselling.imagePosition || fallbackCounselling.imagePosition}
          imageSide={counselling.imageSide || fallbackCounselling.imageSide}
        />
      ) : null}

      {sel ? (
        <EditorialSplitSection
          id="wellbeing-sel"
          title={sel.heading?.title || "Social and Emotional Learning Program (SEL)"}
          section={{ ...sel, imagePosition: "right" }}
          fallbackImage={{}}
          fallbackParagraphs={[]}
          className="wellbeing-sel-section"
          imageSizes="(max-width: 767px) calc(100vw - 32px), 44vw"
          preserveRichText
          showTitle
        />
      ) : null}

      {framework ? (
        <AcademicsElementaryAssessmentSection
          section={framework}
          fallbackSection={fallbackFramework}
          className="wellbeing-framework-section academics-middle-school-tailored-section"
          imageSide={framework.imageSide || fallbackFramework.imageSide}
          titleId="wellbeing-framework-title"
        />
      ) : null}

      <TourIntroSection section={data?.tour} />
      <TourSection section={data?.tour} />
    </SitePageShell>
  );
}
