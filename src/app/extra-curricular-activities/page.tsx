import type { Metadata } from "next";
import { SitePageShell } from "@/components/layout/site-page-shell";
import { InnerPageNav, type InnerPageNavItem } from "@/components/sections/inner-page-nav";
import { IntroFeatureSection } from "@/components/sections/intro-feature-section";
import { PageHero } from "@/components/sections/page-hero";
import { TourIntroSection } from "@/components/sections/tour-intro-section";
import { TourSection } from "@/components/sections/tour-section";
import { getExtraCurricularActivitiesPage, getHomepage } from "@/lib/sanity";
import { resolveStudentSectionNavItems, studentSectionNavItems } from "@/lib/student-section-navigation";
import type { AcademicsKindergartenFeatureSection } from "@/types/sanity";

const fallbackMetadata: Metadata = {
  title: "Extra Curricular Activities | SAIS - Abu Dhabi",
  description: "Explore extracurricular activities at Sharjah American International School.",
};

const fallbackHero = {
  title: "Extra Curricular\nActivities",
  image: {
    url: "/about-values-community.jpg",
    alt: "SAIS - Abu Dhabi students participating in extracurricular activities",
  },
  topLineColor: "#216B97",
  panelColor: "#707174",
  waveColor: "#00A5B2",
  textColor: "#ffffff",
  imagePosition: "center",
  imageWidth: "58%",
};

const fallbackInnerNavigation = {
  items: studentSectionNavItems,
  activeHref: "/extra-curricular-activities",
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

const fallbackEnriching: Required<AcademicsKindergartenFeatureSection> = {
  heading: { title: "Enriching Every Student Journey" },
  image: {},
  imageSide: "left",
  imagePosition: "center",
  backgroundColor: "#ffffff",
  panelColor: "#00A5B2",
  waveColor: "#6F7175",
  titleColor: "#ffffff",
  textColor: "#ffffff",
};

export async function generateMetadata(): Promise<Metadata> {
  const page = await getExtraCurricularActivitiesPage();

  return {
    title: page?.seo?.title || fallbackMetadata.title,
    description: page?.seo?.description || fallbackMetadata.description,
  };
}

export const dynamic = "force-dynamic";

export default async function ExtraCurricularActivitiesPage() {
  const [data, page] = await Promise.all([getHomepage(), getExtraCurricularActivitiesPage()]);
  const hero = page?.hero;
  const innerNavigation = page?.innerNavigation;
  const innerNavItems = resolveStudentSectionNavItems(innerNavigation?.items);
  const enriching = page?.enrichingSection;
  /* The tour block is shared site-wide; this page only swaps the heading line. */
  const tour =
    data?.tour && page?.tourIntro?.title
      ? { ...data.tour, heading: { ...data.tour.heading, title: page.tourIntro.title, accentTitle: page.tourIntro.accentTitle } }
      : data?.tour;

  return (
    <SitePageShell
      data={data}
      mainClassName="site-page__main extra-curricular-activities-page__main"
      pageClassName="extra-curricular-activities-page"
    >
      <PageHero
        className="extra-curricular-activities-hero"
        title={hero?.heading?.title || fallbackHero.title}
        image={hero?.image || fallbackHero.image}
        titleId="extra-curricular-activities-hero-title"
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
        className="extra-curricular-activities-inner-nav student-community-inner-nav"
        ariaLabel={innerNavigation?.ariaLabel || fallbackInnerNavigation.ariaLabel}
      />

      {enriching ? (
        <IntroFeatureSection
          className="academics-kg-day-feature extra-curricular-activities-feature"
          titleId="extra-curricular-activities-feature-title"
          section={{ heading: enriching.heading || fallbackEnriching.heading, image: enriching.image }}
          fallbackSection={{ heading: fallbackEnriching.heading, image: {} }}
          panelColor={enriching.panelColor || fallbackEnriching.panelColor}
          accentColor={enriching.waveColor || fallbackEnriching.waveColor}
          titleColor={enriching.titleColor || fallbackEnriching.titleColor}
          textColor={enriching.textColor || fallbackEnriching.textColor}
          imagePosition={enriching.imagePosition || fallbackEnriching.imagePosition}
          imageSide={enriching.imageSide || fallbackEnriching.imageSide}
        />
      ) : null}

      <TourIntroSection section={tour} />
      <TourSection section={tour} />
    </SitePageShell>
  );
}
