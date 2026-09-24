import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { SitePageShell } from "@/components/layout/site-page-shell";
import { AcademicsLearningSliderSection } from "@/components/sections/academics-learning-slider-section";
import { AdmissionsFeeTermsSection } from "@/components/sections/admissions-fee-terms-section";
import { InnerPageNav } from "@/components/sections/inner-page-nav";
import { IntroFeatureSection } from "@/components/sections/intro-feature-section";
import { PageHero } from "@/components/sections/page-hero";
import { TitledImagesSection } from "@/components/sections/titled-images-section";
import { TourIntroSection } from "@/components/sections/tour-intro-section";
import { TourSection } from "@/components/sections/tour-section";
import { RichText } from "@/components/ui/rich-text";
import { getHomepage, getStudentProgramsPage } from "@/lib/sanity";
import { resolveStudentSectionNavItems, studentSectionNavItems } from "@/lib/student-section-navigation";
import type { InnerPageNavItem } from "@/components/sections/inner-page-nav";
import type { InnerNavigation } from "@/types/sanity";

const fallbackMetadata: Metadata = {
  title: "Student Programs | SAIS - UAQ",
  description: "Explore Student Programs in leadership, engagement and personal growth at SAIS - UAQ.",
};

const fallbackHero = {
  title: "Student Programs",
  image: {
    url: "/sais-hero-students.jpg",
    alt: "SAIS - UAQ students working together",
  },
  topLineColor: "#216B97",
  panelColor: "#00A5B2",
  waveColor: "#d97252",
  textColor: "#ffffff",
  imagePosition: "center",
  imageWidth: "58%",
};

const fallbackInnerNavigationItems: InnerPageNavItem[] = studentSectionNavItems;

const fallbackInnerNavigation: InnerNavigation = {
  items: fallbackInnerNavigationItems,
  activeHref: "/student-programs",
  activeColor: "#216B97",
  inactiveColor: "#d97252",
  textColor: "#ffffff",
  dividerColor: "#ffffff",
  topLineColor: "#ffffff",
  ariaLabel: "Student life sections",
};

type IntroStyle = CSSProperties & {
  "--student-life-overview-bg"?: string;
  "--student-life-overview-title"?: string;
  "--student-life-overview-text"?: string;
};

/* Content edits in the Studio should show without a rebuild, like the other section pages. */
export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getStudentProgramsPage();
  return {
    title: page?.seo?.title || fallbackMetadata.title,
    description: page?.seo?.description || fallbackMetadata.description,
  };
}

export default async function StudentProgramsPage() {
  const [data, page] = await Promise.all([getHomepage(), getStudentProgramsPage()]);
  const hero = page?.hero;
  const heroTitle = hero?.heading?.title || fallbackHero.title;
  const heroImage = hero?.image || fallbackHero.image;
  const innerNavigation = page?.innerNavigation || fallbackInnerNavigation;
  const innerNavItems = resolveStudentSectionNavItems(innerNavigation.items);
  const intro = page?.excellenceIntro;
  const leadership = page?.highlightsSection;
  const potential = page?.potentialIntro;
  const potentialSlider = page?.potentialSlider;
  const potentialStyle: IntroStyle = {
    "--student-life-overview-bg": potential?.backgroundColor || "#f2f2f2",
    "--student-life-overview-title": potential?.titleColor || "#00A5B2",
    "--student-life-overview-text": potential?.textColor || "#216B97",
  };
  const introStyle: IntroStyle = {
    "--student-life-overview-bg": intro?.backgroundColor || "#ffffff",
    "--student-life-overview-title": intro?.titleColor || "#00A5B2",
    "--student-life-overview-text": intro?.textColor || "#216B97",
  };

  return (
    <SitePageShell
      data={data}
      mainClassName="site-page__main student-programs-page__main"
      pageClassName="student-programs-page"
    >
      <PageHero
        className="student-programs-hero"
        title={heroTitle}
        image={heroImage}
        titleId="student-programs-hero-title"
        priority
        topLineColor={hero?.topLineColor || fallbackHero.topLineColor}
        panelColor={hero?.panelColor || fallbackHero.panelColor}
        waveColor={hero?.waveColor || fallbackHero.waveColor}
        textColor={hero?.textColor || fallbackHero.textColor}
        imagePosition={hero?.imagePosition || fallbackHero.imagePosition}
        imageWidth={hero?.imageWidth || fallbackHero.imageWidth}
      />

      <InnerPageNav
        className="student-community-inner-nav"
        items={innerNavItems}
        activeHref={fallbackInnerNavigation.activeHref}
        activeColor={innerNavigation.activeColor || fallbackInnerNavigation.activeColor}
        inactiveColor={innerNavigation.inactiveColor || fallbackInnerNavigation.inactiveColor}
        textColor={innerNavigation.textColor || fallbackInnerNavigation.textColor}
        dividerColor={innerNavigation.dividerColor || fallbackInnerNavigation.dividerColor}
        topLineColor={innerNavigation.topLineColor || fallbackInnerNavigation.topLineColor}
        ariaLabel={innerNavigation.ariaLabel || fallbackInnerNavigation.ariaLabel}
      />

      {intro?.heading?.title || intro?.heading?.description?.length ? (
        <section
          id="student-programs-intro"
          className="student-life-overview student-programs-intro"
          aria-labelledby="student-programs-intro-title"
          style={introStyle}
        >
          <div className="student-life-overview__inner">
            {intro.heading?.title ? (
              <h2 id="student-programs-intro-title" className="student-life-overview__title">
                {intro.heading.title}
              </h2>
            ) : null}
            <div className="student-life-overview__body">
              <RichText blocks={intro.heading?.description} className="student-life-overview__copy" />
            </div>
          </div>
        </section>
      ) : null}

      {leadership ? (
        <IntroFeatureSection
          section={leadership}
          fallbackSection={leadership}
          className="student-programs-leadership"
          titleId="student-programs-leadership-title"
          panelColor={leadership.backgroundColor || "#27779D"}
          accentColor="#00A5B2"
          titleColor={leadership.titleColor || "#5FC1C7"}
          textColor={leadership.textColor || "#ffffff"}
          imagePosition={leadership.imagePosition || "center"}
          imageSide="right"
        />
      ) : null}

      {potential?.heading?.title || potential?.heading?.description?.length ? (
        <section
          id="student-programs-potential"
          className="student-life-overview student-programs-intro student-programs-potential"
          aria-labelledby="student-programs-potential-title"
          style={potentialStyle}
        >
          <div className="student-life-overview__inner">
            {potential.heading?.title ? (
              <h2 id="student-programs-potential-title" className="student-life-overview__title">
                {potential.heading.title}
              </h2>
            ) : null}
            <div className="student-life-overview__body">
              <RichText blocks={potential.heading?.description} className="student-life-overview__copy" />
            </div>
          </div>
        </section>
      ) : null}

      {potentialSlider?.slides?.length ? (
        <AcademicsLearningSliderSection
          section={{ ...potentialSlider, heading: { title: "" } }}
          fallbackSection={{ heading: { title: "" }, slides: [] }}
          className="student-programs-slider"
        />
      ) : null}

      {page?.sgaSection || page?.sgaRoles ? (
        <div className="student-programs-sga">
          {page.sgaSection ? (
            <IntroFeatureSection
              section={page.sgaSection}
              fallbackSection={page.sgaSection}
              className="student-programs-sga__panel"
              titleId="student-programs-sga-title"
              panelColor={page.sgaSection.backgroundColor || "#2FB5BC"}
              accentColor="#D97252"
              titleColor={page.sgaSection.titleColor || "#ffffff"}
              textColor={page.sgaSection.textColor || "#ffffff"}
              imagePosition={page.sgaSection.imagePosition || "center"}
              imageSide="right"
            />
          ) : null}
          {page.sgaRoles ? (
            <AdmissionsFeeTermsSection section={page.sgaRoles} className="student-programs-sga__roles" columnsOnly />
          ) : null}
        </div>
      ) : null}

      <TitledImagesSection items={page?.sgaTeams?.items} className="student-programs-teams" ariaLabel="Student Government teams" />

      <TourIntroSection section={data?.tour} />
      <TourSection section={data?.tour} />
    </SitePageShell>
  );
}
