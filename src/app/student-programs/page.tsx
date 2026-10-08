import type { Metadata } from "next";
import { SitePageShell } from "@/components/layout/site-page-shell";
import { EditorialSplitSection } from "@/components/sections/editorial-split-section";
import { InnerPageNav } from "@/components/sections/inner-page-nav";
import { IntroFeatureSection } from "@/components/sections/intro-feature-section";
import { PageHero } from "@/components/sections/page-hero";
import { TourIntroSection } from "@/components/sections/tour-intro-section";
import { TourSection } from "@/components/sections/tour-section";
import { getHomepage, getStudentProgramsPage } from "@/lib/sanity";
import { resolveStudentSectionNavItems, studentSectionNavItems } from "@/lib/student-section-navigation";
import type { InnerPageNavItem } from "@/components/sections/inner-page-nav";
import type { AcademicsKindergartenFeatureSection, InnerNavigation } from "@/types/sanity";

const fallbackMetadata: Metadata = {
  title: "Student Programs | SAIS - Abu Dhabi",
  description: "Explore Student Programs in leadership, engagement and personal growth at SAIS - Abu Dhabi.",
};

const fallbackHero = {
  title: "Student Programs",
  image: {
    url: "/sais-hero-students.jpg",
    alt: "SAIS - Abu Dhabi students working together",
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

const fallbackLeadership: Required<AcademicsKindergartenFeatureSection> = {
  heading: { title: "Student Leadership Program" },
  image: {},
  imageSide: "left",
  imagePosition: "center",
  backgroundColor: "#ffffff",
  panelColor: "#216B97",
  waveColor: "#00A5B2",
  titleColor: "#00A5B2",
  textColor: "#ffffff",
};

const fallbackHouseCaptains: Required<AcademicsKindergartenFeatureSection> = {
  heading: { title: "SAIS House Captain System" },
  image: {},
  imageSide: "right",
  imagePosition: "center",
  backgroundColor: "#ffffff",
  panelColor: "#00A5B2",
  waveColor: "#216B97",
  titleColor: "#ffffff",
  textColor: "#ffffff",
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

/* The feature panels share the Kindergarten "day in the life" layout; colours come from the design overlay. */
function featureProps(
  section: AcademicsKindergartenFeatureSection | undefined,
  fallback: Required<AcademicsKindergartenFeatureSection>
) {
  return {
    section: { heading: section?.heading || fallback.heading, image: section?.image },
    fallbackSection: { heading: fallback.heading, image: {} },
    panelColor: section?.panelColor || fallback.panelColor,
    accentColor: section?.waveColor || fallback.waveColor,
    titleColor: section?.titleColor || fallback.titleColor,
    textColor: section?.textColor || fallback.textColor,
    imagePosition: section?.imagePosition || fallback.imagePosition,
    imageSide: section?.imageSide || fallback.imageSide,
  };
}

export default async function StudentProgramsPage() {
  const [data, page] = await Promise.all([getHomepage(), getStudentProgramsPage()]);
  const hero = page?.hero;
  const heroTitle = hero?.heading?.title || fallbackHero.title;
  const heroImage = hero?.image || fallbackHero.image;
  const innerNavigation = page?.innerNavigation || fallbackInnerNavigation;
  const innerNavItems = resolveStudentSectionNavItems(innerNavigation.items);
  const leadership = page?.highlightsSection;
  const objectives = page?.objectivesSection;
  const houseCaptains = page?.houseCaptainsSection;
  /* The tour block is shared site-wide; this page only swaps the heading line. */
  const tour =
    data?.tour && page?.tourIntro?.title
      ? { ...data.tour, heading: { ...data.tour.heading, title: page.tourIntro.title, accentTitle: page.tourIntro.accentTitle } }
      : data?.tour;

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

      {leadership ? (
        <IntroFeatureSection
          className="academics-kg-day-feature student-programs-leadership"
          titleId="student-programs-leadership-title"
          {...featureProps(leadership, fallbackLeadership)}
        />
      ) : null}

      {objectives ? (
        <EditorialSplitSection
          id="student-programs-objectives"
          title={objectives.heading?.title || "Objectives of the Students Leadership Program"}
          section={{ ...objectives, imagePosition: "right" }}
          fallbackImage={{}}
          fallbackParagraphs={[]}
          className="student-programs-objectives-section"
          imageSizes="(max-width: 767px) calc(100vw - 32px), 44vw"
          preserveRichText
          showTitle
        />
      ) : null}

      {houseCaptains ? (
        <IntroFeatureSection
          className="academics-kg-day-feature student-programs-house-captains"
          titleId="student-programs-house-captains-title"
          {...featureProps(houseCaptains, fallbackHouseCaptains)}
        />
      ) : null}

      <TourIntroSection section={tour} />
      <TourSection section={tour} />
    </SitePageShell>
  );
}
