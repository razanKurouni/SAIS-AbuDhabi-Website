import type { Metadata } from "next";
import { SitePageShell } from "@/components/layout/site-page-shell";
import { AcademicsElementaryAssessmentSection } from "@/components/sections/academics-elementary-assessment-section";
import { AcademicsSupportProgramsSliderSection } from "@/components/sections/academics-support-programs-slider-section";
import { EditorialSplitSection } from "@/components/sections/editorial-split-section";
import { InnerPageNav, type InnerPageNavItem } from "@/components/sections/inner-page-nav";
import { IntroFeatureSection } from "@/components/sections/intro-feature-section";
import { PageHero } from "@/components/sections/page-hero";
import { getAcademicsMiddleSchoolPage, getHomepage } from "@/lib/sanity";
import { LearningPhasesSection } from "@/components/sections/learning-phases-section";
import { TourIntroSection } from "@/components/sections/tour-intro-section";
import { TourSection } from "@/components/sections/tour-section";
import type {
  AcademicsKindergartenFeatureSection,
  AcademicsSupportProgramsSection as AcademicsSupportProgramsSectionData,
  ImageTextSection,
  InnerNavigationItem,
  PortableTextBlock,
} from "@/types/sanity";

const fallbackMetadata: Metadata = {
  title: "Middle School | Academics | SAIS - Abu Dhabi",
  description: "Explore Middle School academics at Sharjah American International School.",
};

export async function generateMetadata(): Promise<Metadata> {
  const middleSchoolPage = await getAcademicsMiddleSchoolPage();

  return {
    title: middleSchoolPage?.seo?.title || fallbackMetadata.title,
    description: middleSchoolPage?.seo?.description || fallbackMetadata.description,
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
  activeHref: "/academics/middle-school",
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
      if (!item.label || !item.href) {
        return [];
      }

      return [
        {
          label: item.label,
          href: item.href,
          openInNewTab: item.openInNewTab,
        },
      ];
    }) || []
  );
}

const fallbackHero = {
  eyebrow: "Academics",
  title: "Middle School",
  image: {
    url: "/academics-middle-school-hero.jpg",
    alt: "SAIS - Abu Dhabi middle school students reading together",
  },
  topLineColor: "var(--sais-primary)",
  panelColor: "#d97252",
  waveColor: "var(--sais-accent)",
  textColor: "#ffffff",
  imagePosition: "center",
  imageWidth: "60%",
};

const fallbackOverviewSection: ImageTextSection = {
  heading: {
    title: "Stepping Into Specialised Learning",
    description: [
      paragraph(
        "middle-school-overview",
        "As students transition into Grades 5 through 8, significant changes occur in their academic environment. They move from a homeroom setting to subject-based instruction, allowing for greater depth and specialization in each subject area. Additionally, students transition from co-educational to segregated classes, facilitating a focused learning environment that addresses the unique needs of learners at this stage of development."
      ),
    ],
  },
  image: {
    url: "/academics-middle-school-overview.png",
    alt: "SAIS - Abu Dhabi middle school students reading in the library",
  },
  imagePosition: "right",
  theme: "light",
  backgroundColor: "#ffffff",
  titleColor: "var(--sais-primary)",
  textColor: "#666b70",
};

const fallbackCurriculumSection: Required<AcademicsKindergartenFeatureSection> = {
  heading: { title: "The Curriculum" },
  image: {},
  imageSide: "left",
  imagePosition: "center",
  backgroundColor: "#ffffff",
  panelColor: "#00A5B2",
  waveColor: "#d97252",
  titleColor: "#ffffff",
  textColor: "#ffffff",
};

const fallbackAssessmentSection: Required<AcademicsKindergartenFeatureSection> = {
  heading: { title: "Assessment" },
  image: {},
  imageSide: "right",
  imagePosition: "center",
  backgroundColor: "#f2f2f2",
  panelColor: "#216B97",
  waveColor: "#00A5B2",
  titleColor: "#ffffff",
  textColor: "#ffffff",
};

const fallbackDayInLifeSection: Required<AcademicsKindergartenFeatureSection> = {
  heading: { title: "A Day in the Life" },
  image: {},
  imageSide: "right",
  imagePosition: "center",
  backgroundColor: "#ffffff",
  panelColor: "#d97252",
  waveColor: "#00A5B2",
  titleColor: "#ffffff",
  textColor: "#ffffff",
};

const fallbackSupportProgramsSection: AcademicsSupportProgramsSectionData = {
  heading: {
    title: "Inclusion & Support Programs",
  },
  backgroundColor: "#ffffff",
  titleColor: "#00A5B2",
  cardBorderColor: "#216B97",
  cardHoverBorderColor: "#00A5B2",
  cardTextColor: "#216B97",
  cards: [
    {
      _key: "students-of-determination",
      title: "Students of Determination",
      description:
        "Students with special educational needs and/or disabilities (SEND/SOD) are supported through individualized education plans (IEPs), push-in/pull-out support services, and tailored curriculum, instruction, and assessments.",
      iconType: "determination",
    },
    {
      _key: "gifted-and-talented",
      title: "Gifted and Talented Students",
      description:
        "Students with identified gifts and/or talents are provided with enrichment and accelerated programs as comprehensively stated and elaborated on in their advanced learning plans (ALPs).",
      iconType: "gifted",
    },
    {
      _key: "eal-learners",
      title: "EAL Learners",
      description:
        "Students with additional English language needs are identified through WIDA screener and supported with tiered interventions.",
      iconType: "eal",
    },
    {
      _key: "academic-counseling",
      title: "Academic Counseling",
      description:
        "Students in all phases are provided with integrated support through counseling, pastoral care, and academic planning.",
      iconType: "counseling",
    },
    {
      _key: "differentiation",
      title: "Differentiation",
      description:
        "Internal and external assessment data as well as observational feedback are used to design targeted interventions and personalized instruction.",
      iconType: "differentiation",
    },
  ],
};

export default async function AcademicsMiddleSchoolPage() {
  const [data, middleSchoolPage] = await Promise.all([getHomepage(), getAcademicsMiddleSchoolPage()]);
  const hero = middleSchoolPage?.hero;
  const innerNavigation = middleSchoolPage?.innerNavigation;
  const innerNavItems = resolveInnerNavItems(innerNavigation?.items);
  const overviewSection: ImageTextSection = {
    ...fallbackOverviewSection,
    ...middleSchoolPage?.overviewSection,
    heading: middleSchoolPage?.overviewSection?.heading || fallbackOverviewSection.heading,
    image: middleSchoolPage?.overviewSection?.image || fallbackOverviewSection.image,
    imagePosition: "right",
  };
  const curriculumSection = middleSchoolPage?.curriculumSection || fallbackCurriculumSection;
  const assessmentSection = middleSchoolPage?.assessmentSection;
  const dayInLifeSection = middleSchoolPage?.dayInLifeSection;
  const supportProgramsSection =
    middleSchoolPage?.supportProgramsSection || fallbackSupportProgramsSection;
  const learningPhasesSection = data?.learningPhases
    ? {
        ...data.learningPhases,
        cards: data.learningPhases.cards?.map((card) =>
          card.title?.trim().toLowerCase() === "elementary" && middleSchoolPage?.learningPhasesElementaryImage
            ? { ...card, image: middleSchoolPage.learningPhasesElementaryImage }
            : card,
        ),
      }
    : undefined;

  return (
    <SitePageShell
      data={data}
      mainClassName="site-page__main academics-middle-school-page__main"
      pageClassName="academics-middle-school-page"
    >
      <PageHero
        className="academics-middle-school-hero"
        title={hero?.heading?.title || fallbackHero.title}
        image={hero?.image || fallbackHero.image}
        eyebrow={hero?.heading?.eyebrow || fallbackHero.eyebrow}
        titleId="academics-middle-school-hero-title"
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
        id="academics-middle-school-overview"
        title="Stepping Into Specialised Learning"
        section={overviewSection}
        fallbackImage={fallbackOverviewSection.image || {}}
        fallbackParagraphs={[]}
        className="academics-middle-school-overview-section"
        imageSizes="(max-width: 767px) calc(100vw - 32px), 44vw"
        showTitle
      />

      <AcademicsElementaryAssessmentSection
        className="academics-middle-school-tailored-section"
        imageSide={curriculumSection.imageSide || fallbackCurriculumSection.imageSide}
        titleId="academics-middle-school-curriculum-title"
        section={curriculumSection}
        fallbackSection={fallbackCurriculumSection}
      />

      {assessmentSection ? (
        <IntroFeatureSection
          className="academics-kg-day-feature academics-middle-school-assessment-feature"
          titleId="academics-middle-school-assessment-title"
          section={{ heading: assessmentSection.heading || fallbackAssessmentSection.heading, image: assessmentSection.image }}
          fallbackSection={{ heading: fallbackAssessmentSection.heading, image: {} }}
          panelColor={assessmentSection.panelColor || fallbackAssessmentSection.panelColor}
          accentColor={assessmentSection.waveColor || fallbackAssessmentSection.waveColor}
          titleColor={assessmentSection.titleColor || fallbackAssessmentSection.titleColor}
          textColor={assessmentSection.textColor || fallbackAssessmentSection.textColor}
          imagePosition={assessmentSection.imagePosition || fallbackAssessmentSection.imagePosition}
          imageSide="right"
        />
      ) : null}

      {middleSchoolPage?.assessmentDetailSection ? (
        <EditorialSplitSection
          id="academics-middle-school-assessment-detail"
          title="Assessment – Details"
          section={middleSchoolPage.assessmentDetailSection}
          fallbackImage={{}}
          fallbackParagraphs={[]}
          className="academics-steam-section academics-career-guidance-outreach-section academics-middle-school-assessment-detail-section"
          preserveRichText
        />
      ) : null}

      <AcademicsSupportProgramsSliderSection
        section={supportProgramsSection}
        fallbackSection={fallbackSupportProgramsSection}
        className="academics-middle-school-support-programs"
        autoplayIntervalMs={3200}
      />

      {dayInLifeSection ? (
        <IntroFeatureSection
          className="academics-kg-day-feature academics-middle-school-day-feature"
          titleId="academics-middle-school-day-title"
          section={{ heading: dayInLifeSection.heading || fallbackDayInLifeSection.heading, image: dayInLifeSection.image }}
          fallbackSection={{ heading: fallbackDayInLifeSection.heading, image: {} }}
          panelColor={dayInLifeSection.panelColor || fallbackDayInLifeSection.panelColor}
          accentColor={dayInLifeSection.waveColor || fallbackDayInLifeSection.waveColor}
          titleColor={dayInLifeSection.titleColor || fallbackDayInLifeSection.titleColor}
          textColor={dayInLifeSection.textColor || fallbackDayInLifeSection.textColor}
          imagePosition={dayInLifeSection.imagePosition || fallbackDayInLifeSection.imagePosition}
          imageSide="right"
        />
      ) : null}

      <LearningPhasesSection section={learningPhasesSection} excludeTitle="Middle School" />
      <TourIntroSection section={data?.tour} />
      <TourSection section={data?.tour} />
    </SitePageShell>
  );
}
