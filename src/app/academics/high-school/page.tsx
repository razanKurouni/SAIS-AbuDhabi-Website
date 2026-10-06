import type { Metadata } from "next";
import { SitePageShell } from "@/components/layout/site-page-shell";
import { AcademicsLearningSliderSection } from "@/components/sections/academics-learning-slider-section";
import { AcademicsSupportProgramsSliderSection } from "@/components/sections/academics-support-programs-slider-section";
import { EditorialSplitSection } from "@/components/sections/editorial-split-section";
import { IntroFeatureSection } from "@/components/sections/intro-feature-section";
import { InnerPageNav, type InnerPageNavItem } from "@/components/sections/inner-page-nav";
import { LearningPhasesSection } from "@/components/sections/learning-phases-section";
import { PageHero } from "@/components/sections/page-hero";
import { TourIntroSection } from "@/components/sections/tour-intro-section";
import { TourSection } from "@/components/sections/tour-section";
import { SectionHeading } from "@/components/ui/section-heading";
import { getAcademicsHighSchoolPage, getHomepage } from "@/lib/sanity";
import type {
  AcademicsKindergartenFeatureSection,
  AcademicsLearningSliderSection as AcademicsLearningSliderSectionData,
  AcademicsSupportProgramsSection,
  ImageTextSection,
  InnerNavigationItem,
  PortableTextBlock,
  SectionHeading as SectionHeadingData,
} from "@/types/sanity";

const fallbackMetadata: Metadata = {
  title: "High School | Academics | SAIS - Abu Dhabi",
  description: "Explore High School academics at Sharjah American International School.",
};

export async function generateMetadata(): Promise<Metadata> {
  const highSchoolPage = await getAcademicsHighSchoolPage();
  return {
    title: highSchoolPage?.seo?.title || fallbackMetadata.title,
    description: highSchoolPage?.seo?.description || fallbackMetadata.description,
  };
}

export const dynamic = "force-dynamic";

const fallbackInnerNavigation = {
  items: [
    { label: "Overview", href: "/academics" },
    { label: "Kindergarten", href: "/academics/kindergarten" },
    { label: "Elementary", href: "/academics/elementary" },
    { label: "Middle School", href: "/academics/middle-school" },
    { label: "High School", href: "/academics/high-school" },
  ],
  activeHref: "/academics/high-school",
  activeColor: "#00A5B2",
  inactiveColor: "var(--sais-primary)",
  textColor: "#ffffff",
  dividerColor: "#ffffff",
  topLineColor: "#ffffff",
  ariaLabel: "Academics page navigation",
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
  eyebrow: "Academics",
  title: "High School",
  image: {
    url: "/academics-high-school-hero.jpg",
    alt: "SAIS - Abu Dhabi high school students in a science lab",
  },
  topLineColor: "var(--sais-primary)",
  panelColor: "var(--sais-gray)",
  waveColor: "var(--sais-accent)",
  textColor: "#ffffff",
  imagePosition: "center",
  imageWidth: "60%",
};

function paragraph(_key: string, text: string): PortableTextBlock {
  return {
    _key,
    _type: "block",
    children: [{ _key: `${_key}-span`, _type: "span", text }],
  };
}

function resolveInnerNavItems(items?: InnerNavigationItem[]): InnerPageNavItem[] {
  return (
    items?.flatMap((item) => {
      if (!item.label || !item.href) return [];
      return [{ label: item.label, href: item.href, openInNewTab: item.openInNewTab }];
    }) || []
  );
}

const fallbackOverviewSection: ImageTextSection = {
  heading: {
    title: "Freedom to Explore,\nGuidance to Grow",
    description: [
      paragraph(
        "hs-overview-1",
        "Our High School program focuses on university and career readiness. Students receive individualized support to pursue pathways aligned with their future goals."
      ),
    ],
  },
  image: {},
  imagePosition: "right",
  theme: "light",
  backgroundColor: "#216B97",
  titleColor: "#00A5B2",
  textColor: "#ffffff",
};

function feature(
  title: string,
  colours: Pick<AcademicsKindergartenFeatureSection, "imageSide" | "panelColor" | "waveColor">
): Required<AcademicsKindergartenFeatureSection> {
  return {
    heading: { title },
    image: {},
    imageSide: colours.imageSide || "left",
    imagePosition: "center",
    backgroundColor: "#ffffff",
    panelColor: colours.panelColor || "#00A5B2",
    waveColor: colours.waveColor || "#216B97",
    titleColor: "#ffffff",
    textColor: "#ffffff",
  };
}

const fallbackCurriculumSection = feature("The Curriculum", { imageSide: "left", panelColor: "#00A5B2", waveColor: "#d97252" });
const fallbackApDiplomaSection = feature("What is AP?", { imageSide: "left", panelColor: "#00A5B2", waveColor: "#216B97" });
const fallbackDayInLifeSection = feature("A Day in the Life", { imageSide: "right", panelColor: "#6F7175", waveColor: "#00A5B2" });

const fallbackCareerGuidanceIntroSection: SectionHeadingData = {
  title: "Career Guidance",
  subtitle:
    "At SAIS Abu Dhabi, we believe that every student’s journey is unique and we’re here to guide that journey with purpose and clarity.",
};

const fallbackSlider: AcademicsLearningSliderSectionData = { heading: { title: "" }, slides: [] };

const fallbackCareerGuidanceSection: ImageTextSection = {
  heading: { title: "Career Guidance" },
  image: {},
  imagePosition: "right",
  backgroundColor: "#f2f2f2",
  titleColor: "#00A5B2",
  textColor: "#6f7175",
};

const fallbackPathwaysSection: ImageTextSection = {
  heading: { title: "High School Pathways" },
  image: {},
  imagePosition: "right",
  backgroundColor: "#ffffff",
  titleColor: "#216B97",
  textColor: "#6f7175",
};

const fallbackApBenefitsSection: AcademicsSupportProgramsSection = {
  heading: { title: "Benefits of AP Courses" },
  backgroundColor: "#f2f2f2",
  titleColor: "#216B97",
  cardBorderColor: "#216B97",
  cardHoverBorderColor: "#d97252",
  cardTextColor: "#216B97",
  cards: [],
};

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

export default async function AcademicsHighSchoolPage() {
  const [data, highSchoolPage] = await Promise.all([getHomepage(), getAcademicsHighSchoolPage()]);

  const hero = highSchoolPage?.hero;
  const innerNavigation = highSchoolPage?.innerNavigation;
  const innerNavItems = resolveInnerNavItems(innerNavigation?.items);

  const overviewSection: ImageTextSection = {
    ...fallbackOverviewSection,
    ...highSchoolPage?.overviewSection,
    heading: highSchoolPage?.overviewSection?.heading || fallbackOverviewSection.heading,
    image: highSchoolPage?.overviewSection?.image || fallbackOverviewSection.image,
    imagePosition: "right",
  };
  const curriculumSection = highSchoolPage?.curriculumSection;
  const careerGuidanceSlider = highSchoolPage?.careerGuidanceSliderSection;
  const careerGuidanceSection = highSchoolPage?.careerGuidanceSection;
  const pathwaysSection = highSchoolPage?.pathwaysSection;
  const pathwaysSlider = highSchoolPage?.pathwaysSliderSection;
  const apDiplomaSection = highSchoolPage?.apDiplomaSection;
  const apBenefitsSection = highSchoolPage?.apBenefitsSection;
  const dayInLifeSection = highSchoolPage?.dayInLifeSection;
  const apProgramTitle = apDiplomaSection?.heading?.eyebrow || "Advanced Placement (AP) College board program";

  return (
    <SitePageShell
      data={data}
      mainClassName="site-page__main academics-high-school-page__main"
      pageClassName="academics-high-school-page"
    >
      <PageHero
        className="academics-high-school-hero"
        title={hero?.heading?.title || fallbackHero.title}
        image={hero?.image || fallbackHero.image}
        eyebrow={hero?.heading?.eyebrow || fallbackHero.eyebrow}
        titleId="academics-high-school-hero-title"
        priority
        topLineColor={hero?.topLineColor || fallbackHero.topLineColor}
        panelColor={hero?.panelColor || fallbackHero.panelColor}
        waveColor={hero?.waveColor || fallbackHero.waveColor}
        textColor={hero?.textColor || fallbackHero.textColor}
        imagePosition={hero?.imagePosition || fallbackHero.imagePosition}
        imageWidth={hero?.imageWidth || fallbackHero.imageWidth}
      />

      <InnerPageNav
        items={innerNavItems.length ? innerNavItems : fallbackInnerNavigation.items}
        activeHref={innerNavigation?.activeHref || fallbackInnerNavigation.activeHref}
        activeColor={innerNavigation?.activeColor || fallbackInnerNavigation.activeColor}
        inactiveColor={innerNavigation?.inactiveColor || fallbackInnerNavigation.inactiveColor}
        textColor={innerNavigation?.textColor || fallbackInnerNavigation.textColor}
        dividerColor={innerNavigation?.dividerColor || fallbackInnerNavigation.dividerColor}
        topLineColor={innerNavigation?.topLineColor || fallbackInnerNavigation.topLineColor}
        className="academics-inner-nav"
        ariaLabel={innerNavigation?.ariaLabel || fallbackInnerNavigation.ariaLabel}
      />

      <EditorialSplitSection
        id="academics-high-school-overview"
        title={overviewSection.heading?.title || "Freedom to Explore, Guidance to Grow"}
        section={overviewSection}
        fallbackImage={{}}
        fallbackParagraphs={[]}
        className="academics-high-school-overview-section"
        imageSizes="(max-width: 767px) calc(100vw - 32px), 44vw"
        preserveRichText
        showTitle
      />

      {curriculumSection ? (
        <IntroFeatureSection
          className="academics-high-school-excellence-feature"
          titleId="academics-high-school-curriculum-title"
          {...featureProps(curriculumSection, fallbackCurriculumSection)}
        />
      ) : null}

      <section
        className="academics-high-school-career-guidance-center bg-[#f4f4f4] px-[7.5%] py-14 md:py-16"
        aria-labelledby="academics-high-school-career-guidance-intro-title"
      >
        <SectionHeading
          heading={highSchoolPage?.careerGuidanceIntroSection || fallbackCareerGuidanceIntroSection}
          titleId="academics-high-school-career-guidance-intro-title"
          align="center"
          className="mx-auto max-w-[900px]"
          titleClassName="text-[1.75rem] font-semibold leading-tight text-[#00A5B2] md:text-[2rem]"
          subtitleClassName="mx-auto mt-7 max-w-[900px] text-[1.05rem] font-semibold leading-[1.55] text-[#216B97]"
          descriptionClassName="mx-auto mt-7 max-w-[650px] text-[1.05rem] leading-[1.55] text-[#6F7175]"
        />
      </section>

      {careerGuidanceSlider ? (
        <AcademicsLearningSliderSection
          section={{ ...careerGuidanceSlider, heading: { ...careerGuidanceSlider.heading, title: "" } }}
          fallbackSection={fallbackSlider}
          className="academics-high-school-pathways-slider academics-high-school-career-guidance-slider"
        />
      ) : null}

      {careerGuidanceSection ? (
        <EditorialSplitSection
          id="academics-high-school-career-guidance"
          title={careerGuidanceSection.heading?.title || "Career Guidance"}
          section={{ ...fallbackCareerGuidanceSection, ...careerGuidanceSection, imagePosition: "right" }}
          fallbackImage={{}}
          fallbackParagraphs={[]}
          className="academics-high-school-career-guidance-section"
          imageSizes="(max-width: 767px) calc(100vw - 32px), 44vw"
          preserveRichText
          showTitle
        />
      ) : null}

      {pathwaysSection ? (
        <EditorialSplitSection
          id="academics-high-school-pathways-details"
          title={pathwaysSection.heading?.title || "High School Pathways"}
          section={{ ...fallbackPathwaysSection, ...pathwaysSection, imagePosition: "right" }}
          fallbackImage={{}}
          fallbackParagraphs={[]}
          className="academics-high-school-pathways-section"
          imageSizes="(max-width: 767px) calc(100vw - 32px), 44vw"
          preserveRichText
          showTitle
        />
      ) : null}

      {pathwaysSlider ? (
        <AcademicsLearningSliderSection
          section={{ ...pathwaysSlider, heading: { ...pathwaysSlider.heading, title: "" } }}
          fallbackSection={fallbackSlider}
          className="academics-high-school-pathways-slider"
        />
      ) : null}

      {apDiplomaSection ? (
        <>
          <section className="academics-high-school-ap-program-heading" aria-labelledby="academics-high-school-ap-program-title">
            <h2 id="academics-high-school-ap-program-title" className="academics-high-school-ap-program-heading__title">
              {apProgramTitle}
            </h2>
          </section>
          <IntroFeatureSection
            className="academics-high-school-ap-feature"
            titleId="academics-high-school-ap-title"
            {...featureProps(apDiplomaSection, fallbackApDiplomaSection)}
          />
        </>
      ) : null}

      {apBenefitsSection ? (
        <AcademicsSupportProgramsSliderSection
          section={apBenefitsSection}
          fallbackSection={fallbackApBenefitsSection}
          className="academics-high-school-ap-benefits-slider"
          visibleCounts={{ desktop: 3, tablet: 2, mobile: 1 }}
          autoplayIntervalMs={3200}
        />
      ) : null}

      {dayInLifeSection ? (
        <IntroFeatureSection
          className="academics-kg-day-feature academics-high-school-day-feature"
          titleId="academics-high-school-day-title"
          {...featureProps(dayInLifeSection, fallbackDayInLifeSection)}
        />
      ) : null}

      <LearningPhasesSection section={data?.learningPhases} excludeTitle="High School" />
      <TourIntroSection section={data?.tour} />
      <TourSection section={data?.tour} />
    </SitePageShell>
  );
}
