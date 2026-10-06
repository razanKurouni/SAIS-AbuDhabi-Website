import type { Metadata } from "next";
import { SitePageShell } from "@/components/layout/site-page-shell";
import { AcademicsElementaryAssessmentSection } from "@/components/sections/academics-elementary-assessment-section";
import { EditorialSplitSection } from "@/components/sections/editorial-split-section";
import { InnerPageNav, type InnerPageNavItem } from "@/components/sections/inner-page-nav";
import { IntroFeatureSection } from "@/components/sections/intro-feature-section";
import { PageHero } from "@/components/sections/page-hero";
import { getAcademicsElementaryPage, getHomepage } from "@/lib/sanity";
import type {
  AcademicsKindergartenFeatureSection,
  ImageTextSection,
  InnerNavigationItem,
  PortableTextBlock,
} from "@/types/sanity";
import { TourIntroSection } from "@/components/sections/tour-intro-section";
import { LearningPhasesSection } from "@/components/sections/learning-phases-section";
import { TourSection } from "@/components/sections/tour-section";

const fallbackMetadata: Metadata = {
  title: "Elementary | Academics | SAIS - Abu Dhabi",
  description: "Explore Elementary academics at Sharjah American International School.",
};

export async function generateMetadata(): Promise<Metadata> {
  const elementaryPage = await getAcademicsElementaryPage();

  return {
    title: elementaryPage?.seo?.title || fallbackMetadata.title,
    description: elementaryPage?.seo?.description || fallbackMetadata.description,
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
  activeHref: "/academics/elementary",
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
  title: "Elementary",
  image: {
    url: "/academics-elementary-hero.png",
    alt: "SAIS - Abu Dhabi elementary students raising their hands in class",
  },
  topLineColor: "var(--sais-primary)",
  panelColor: "var(--sais-accent)",
  waveColor: "#d97252",
  textColor: "#ffffff",
  imagePosition: "center",
  imageWidth: "60%",
};

const fallbackCurriculumSection: Required<AcademicsKindergartenFeatureSection> = {
  heading: {
    title: "The Curriculum",
    description: [
      paragraph(
        "elementary-curriculum-primary",
        "Teachers employ a balanced approach that combines teacher-led instruction with opportunities for inquiry-based learning and project-based tasks. The curriculum is designed to promote interdisciplinary connections, allowing students to make meaningful connections across subject areas. Through a combination of whole-class instruction, small group activities, and independent inquiry, students in Grades 3 and 4 engage in deeper exploration of concepts and develop essential skills for academic success and lifelong learning."
      ),
      paragraph(
        "elementary-curriculum-upper",
        "Upper Elementary (Grades 3-5): The curriculum engages the students in interdisciplinary learning, and a noticeable emphasis is placed on collaboration, curiosity, and real-world applications. Technology integration becomes an integral part of the curriculum."
      ),
    ],
  },
  image: {
    url: "/academics-elementary-curriculum.png",
    alt: "SAIS - Abu Dhabi elementary students playing chess",
  },
  imageSide: "right",
  imagePosition: "center",
  backgroundColor: "var(--sais-accent)",
  panelColor: "var(--sais-primary)",
  waveColor: "var(--sais-accent)",
  titleColor: "var(--sais-accent)",
  textColor: "#ffffff",
};

const fallbackAssessmentSection: Required<AcademicsKindergartenFeatureSection> = {
  heading: {
    title: "Continuous Assessment",
    description: [
      paragraph(
        "elementary-assessment-primary",
        "In Grades 1 and 2, SAIS - Abu Dhabi is implementing an ongoing assessment model designed to provide a comprehensive and holistic view of each student's progress. This shift moves away from solely relying on periodic tests and instead focuses on continuous evaluation through observations, classwork, homework, projects, discussions, and quizzes. This approach enables teachers to better understand and support students' development throughout the year in a relaxed and stress-free environment. While multiple formative and summative assessments will take place across subjects, parents will not be informed prior to their administration, to ensure assessments reflect authentic learning and reduce performance anxiety. However, in response to parent feedback and to support home preparation, schedules will be shared in advance for Arabic and Islamic Studies assessments only."
      ),
      paragraph(
        "elementary-assessment-scale",
        "We continue using our proficiency scale for grades 1 and 2 to better reflect the progress and achievements of our students. We do convert these proficiency scales into percentages for our internal data analyses."
      ),
    ],
  },
  image: {
    url: "/academics-elementary-assessment.png",
    alt: "SAIS - Abu Dhabi elementary student writing in class",
  },
  imageSide: "right",
  imagePosition: "center",
  backgroundColor: "var(--sais-accent)",
  panelColor: "var(--sais-accent)",
  waveColor: "var(--sais-primary)",
  titleColor: "var(--sais-primary)",
  textColor: "#ffffff",
};

const fallbackDayInLifeSection: Required<AcademicsKindergartenFeatureSection> = {
  heading: { title: "A Day in the Life" },
  image: {},
  imageSide: "right",
  imagePosition: "center",
  backgroundColor: "#ffffff",
  panelColor: "#00A5B2",
  waveColor: "#216B97",
  titleColor: "#ffffff",
  textColor: "#ffffff",
};

export default async function AcademicsElementaryPage() {
  const [data, elementaryPage] = await Promise.all([getHomepage(), getAcademicsElementaryPage()]);
  const hero = elementaryPage?.hero;
  const curriculumSection = elementaryPage?.curriculumSection || fallbackCurriculumSection;
  const assessmentSection = elementaryPage?.assessmentSection || fallbackAssessmentSection;
  const assessmentDetailSection = elementaryPage?.assessmentDetailSection;
  const dayInLifeSection = elementaryPage?.dayInLifeSection;
  const innerNavigation = elementaryPage?.innerNavigation;
  const innerNavItems = resolveInnerNavItems(innerNavigation?.items);
  const curriculumIntroSection: ImageTextSection = {
    heading: curriculumSection.heading || fallbackCurriculumSection.heading,
    image: curriculumSection.image || fallbackCurriculumSection.image,
    imagePosition: "left",
    theme: "blue",
  };
  const fallbackCurriculumIntroSection: ImageTextSection = {
    heading: fallbackCurriculumSection.heading,
    image: fallbackCurriculumSection.image,
    imagePosition: "left",
    theme: "blue",
  };

  return (
    <SitePageShell
      data={data}
      mainClassName="site-page__main academics-elementary-page__main"
      pageClassName="academics-elementary-page"
    >
      <PageHero
        className="academics-elementary-hero"
        title={hero?.heading?.title || fallbackHero.title}
        image={hero?.image || fallbackHero.image}
        eyebrow={hero?.heading?.eyebrow || fallbackHero.eyebrow}
        titleId="academics-elementary-hero-title"
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

      <IntroFeatureSection
        className="academics-elementary-curriculum-feature"
        titleId="academics-elementary-curriculum-title"
        section={curriculumIntroSection}
        fallbackSection={fallbackCurriculumIntroSection}
        panelColor={curriculumSection.panelColor || fallbackCurriculumSection.panelColor}
        accentColor={curriculumSection.waveColor || fallbackCurriculumSection.waveColor}
        titleColor={curriculumSection.titleColor || fallbackCurriculumSection.titleColor}
        textColor={curriculumSection.textColor || fallbackCurriculumSection.textColor}
        imagePosition={curriculumSection.imagePosition || fallbackCurriculumSection.imagePosition}
      />

      <AcademicsElementaryAssessmentSection
        section={assessmentSection}
        fallbackSection={fallbackAssessmentSection}
      />

      {assessmentDetailSection ? (
        <EditorialSplitSection
          id="academics-elementary-assessment-detail"
          title={assessmentDetailSection.heading?.title || "Assessment"}
          section={assessmentDetailSection}
          fallbackImage={{}}
          fallbackParagraphs={[]}
          className="academics-steam-section academics-elementary-assessment-detail"
          preserveRichText
        />
      ) : null}

      {dayInLifeSection ? (
        <IntroFeatureSection
          className="academics-kg-day-feature academics-elementary-day-feature"
          titleId="academics-elementary-day-title"
          section={{ heading: dayInLifeSection.heading || { title: "" }, image: dayInLifeSection.image }}
          fallbackSection={{ heading: fallbackDayInLifeSection.heading, image: {} }}
          panelColor={dayInLifeSection.panelColor || fallbackDayInLifeSection.panelColor}
          accentColor={dayInLifeSection.waveColor || fallbackDayInLifeSection.waveColor}
          titleColor={dayInLifeSection.titleColor || fallbackDayInLifeSection.titleColor}
          textColor={dayInLifeSection.textColor || fallbackDayInLifeSection.textColor}
          imagePosition={dayInLifeSection.imagePosition || fallbackDayInLifeSection.imagePosition}
          imageSide="right"
        />
      ) : null}

      <LearningPhasesSection section={data?.learningPhases} excludeTitle="Elementary" />
      <TourIntroSection section={data?.tour} />
      <TourSection section={data?.tour} />
    </SitePageShell>
  );
}
