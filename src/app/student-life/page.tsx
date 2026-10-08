import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { SitePageShell } from "@/components/layout/site-page-shell";
import { AcademicsLearningSliderSection } from "@/components/sections/academics-learning-slider-section";
import { IntroFeatureSection } from "@/components/sections/intro-feature-section";
import { InnerPageNav, type InnerPageNavItem } from "@/components/sections/inner-page-nav";
import { PageHero } from "@/components/sections/page-hero";
import { getHomepage, getStudentLifePage } from "@/lib/sanity";
import { resolveStudentSectionNavItems, studentSectionNavItems } from "@/lib/student-section-navigation";
import type { PortableTextBlock } from "@/types/sanity";
import { TourIntroSection } from "@/components/sections/tour-intro-section";
import { TourSection } from "@/components/sections/tour-section";
import { RichText } from "@/components/ui/rich-text";

const fallbackMetadata: Metadata = {
  title: "Student Life | SAIS - Abu Dhabi",
  description: "Explore student life at Sharjah American International School.",
};

const fallbackInnerNavigation = {
  items: studentSectionNavItems,
  activeHref: "/student-life",
  activeColor: "var(--sais-primary)",
  inactiveColor: "#d97252",
  textColor: "#ffffff",
  dividerColor: "#ffffff",
  topLineColor: "#ffffff",
  ariaLabel: "Student Life page navigation",
} satisfies {
  items: InnerPageNavItem[];
  activeHref: string;
  activeColor: string;
  inactiveColor: string;
  textColor: string;
  dividerColor: string;
  topLineColor: string;
  ariaLabel: string;
};

const fallbackHero = {
  title: "Student\nLife",
  image: {
    url: "/about-values-community.jpg",
    alt: "SAIS - Abu Dhabi students enjoying school life",
  },
  topLineColor: "#d97252",
  panelColor: "#216B97",
  waveColor: "#00A5B2",
  textColor: "#ffffff",
  imagePosition: "center",
  imageWidth: "58%",
};

function paragraph(_key: string, text: string, strong = false): PortableTextBlock {
  return {
    _key,
    _type: "block",
    children: [{ _key: `${_key}-span`, _type: "span", text, marks: strong ? ["strong"] : [] }],
  };
}

const fallbackBeyondClassroomIntro = {
  heading: {
    title: "Beyond the Classroom:",
    accentTitle: "Voices, Visions, and Ventures",
    description: [
      paragraph(
        "student-life-beyond-intro",
        "Student life is dynamic, inclusive, and intentionally designed to inspire leadership, creativity, and personal growth. Beyond academics, students are actively engaged in a wide range of enriching activities that help shape their confidence, character, and sense of belonging."
      ),
    ],
  },
  backgroundColor: "#ffffff",
  titleColor: "#00A5B2",
  accentColor: "#00A5B2",
  textColor: "#216B97",
};

export default async function StudentLifePage() {
  const [data, page] = await Promise.all([getHomepage(), getStudentLifePage()]);
  const hero = page?.hero;
  const innerNavigation = page?.innerNavigation;
  const innerNavItems = resolveStudentSectionNavItems(innerNavigation?.items);
  const beyondIntro = page?.beyondClassroomIntro || fallbackBeyondClassroomIntro;
  const lifeFeature = page?.lifeFeature;
  const committees = page?.committeesSection;

  return (
    <SitePageShell data={data} mainClassName="site-page__main student-life-page__main" pageClassName="student-life-page">
      <PageHero
        className="student-life-hero"
        title={hero?.heading?.title || fallbackHero.title}
        image={hero?.image || fallbackHero.image}
        titleId="student-life-hero-title"
        priority
        topLineColor={hero?.topLineColor || fallbackHero.topLineColor}
        panelColor={hero?.panelColor || fallbackHero.panelColor}
        waveColor={hero?.waveColor || fallbackHero.waveColor}
        textColor={hero?.textColor || fallbackHero.textColor}
        imagePosition={hero?.imagePosition || fallbackHero.imagePosition}
        imageWidth={hero?.imageWidth || fallbackHero.imageWidth}
      />

      <InnerPageNav
        items={innerNavItems}
        activeHref={fallbackInnerNavigation.activeHref}
        activeColor={innerNavigation?.activeColor || fallbackInnerNavigation.activeColor}
        inactiveColor={innerNavigation?.inactiveColor || fallbackInnerNavigation.inactiveColor}
        textColor={innerNavigation?.textColor || fallbackInnerNavigation.textColor}
        dividerColor={innerNavigation?.dividerColor || fallbackInnerNavigation.dividerColor}
        topLineColor={innerNavigation?.topLineColor || fallbackInnerNavigation.topLineColor}
        className="student-life-inner-nav student-community-inner-nav"
        ariaLabel={innerNavigation?.ariaLabel || fallbackInnerNavigation.ariaLabel}
      />

      <section
        id="student-life"
        className="student-life-overview student-life-beyond"
        aria-labelledby="student-life-beyond-title"
        style={{
          "--student-life-overview-bg": beyondIntro.backgroundColor || fallbackBeyondClassroomIntro.backgroundColor,
          "--student-life-overview-title": beyondIntro.titleColor || fallbackBeyondClassroomIntro.titleColor,
          "--student-life-overview-accent": beyondIntro.accentColor || fallbackBeyondClassroomIntro.accentColor,
          "--student-life-overview-text": beyondIntro.textColor || fallbackBeyondClassroomIntro.textColor,
        } as CSSProperties}
      >
        <div className="student-life-overview__inner">
          <h2 id="student-life-beyond-title" className="student-life-overview__title">
            {beyondIntro.heading?.title || fallbackBeyondClassroomIntro.heading.title}
            {beyondIntro.heading?.accentTitle ? (
              <>
                <br />
                <span className="student-life-overview__accent">{beyondIntro.heading.accentTitle}</span>
              </>
            ) : null}
          </h2>
          <div className="student-life-overview__body">
            <RichText
              blocks={beyondIntro.heading?.description?.length ? beyondIntro.heading.description : fallbackBeyondClassroomIntro.heading.description}
              className="student-life-overview__copy"
            />
          </div>
        </div>
      </section>

      {lifeFeature ? (
        <IntroFeatureSection
          className="academics-kg-day-feature student-life-feature"
          titleId="student-life-feature-title"
          section={{ heading: lifeFeature.heading || { title: "" }, image: lifeFeature.image }}
          fallbackSection={{ heading: { title: "" }, image: {} }}
          panelColor={lifeFeature.panelColor || "#216B97"}
          accentColor={lifeFeature.waveColor || "#d97252"}
          titleColor={lifeFeature.titleColor || "#ffffff"}
          textColor={lifeFeature.textColor || "#ffffff"}
          imagePosition={lifeFeature.imagePosition || "center"}
          imageSide={lifeFeature.imageSide || "left"}
        />
      ) : null}

      {committees ? (
        <AcademicsLearningSliderSection
          section={committees}
          fallbackSection={{ heading: { title: "" }, slides: [] }}
          className="student-life-committees"
        />
      ) : null}

      <TourIntroSection  section={data?.tour} />
      <TourSection  section={data?.tour} />
    </SitePageShell>
  );
}
