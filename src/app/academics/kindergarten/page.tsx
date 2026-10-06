import type { Metadata } from "next";
import { SitePageShell } from "@/components/layout/site-page-shell";
import { AcademicsLearningSliderSection } from "@/components/sections/academics-learning-slider-section";
import { AcademicsTeachingCommitmentsSection } from "@/components/sections/academics-teaching-commitments-section";
import { EditorialSplitSection } from "@/components/sections/editorial-split-section";
import { IntroFeatureSection } from "@/components/sections/intro-feature-section";
import { InnerPageNav, type InnerPageNavItem } from "@/components/sections/inner-page-nav";
import { PageHero } from "@/components/sections/page-hero";
import { getAcademicsKindergartenPage, getHomepage } from "@/lib/sanity";
import type {
  AcademicsKindergartenFeatureSection,
  AcademicsTeachingCommitmentsSection as AcademicsTeachingCommitmentsSectionData,
  AcademicsLearningSliderSection as AcademicsLearningSliderSectionData,
  InnerNavigationItem,
  PortableTextBlock,
} from "@/types/sanity";
import { LearningPhasesSection } from "@/components/sections/learning-phases-section";
import { TourIntroSection } from "@/components/sections/tour-intro-section";
import { TourSection } from "@/components/sections/tour-section";

const fallbackMetadata: Metadata = {
  title: "Kindergarten | Academics | SAIS - Abu Dhabi",
  description: "Explore Kindergarten academics at Sharjah American International School.",
};

export async function generateMetadata(): Promise<Metadata> {
  const kindergartenPage = await getAcademicsKindergartenPage();

  return {
    title: kindergartenPage?.seo?.title || fallbackMetadata.title,
    description: kindergartenPage?.seo?.description || fallbackMetadata.description,
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
  activeHref: "/academics/kindergarten",
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

const fallbackHero = {
  eyebrow: "Academics",
  title: "Kindergarten",
  image: {
    url: "/academics-kg-hero.png",
    alt: "SAIS - Abu Dhabi kindergarten students learning through play",
  },
  topLineColor: "#d97252",
  panelColor: "var(--sais-primary)",
  waveColor: "var(--sais-accent)",
  textColor: "#ffffff",
  imagePosition: "center",
  imageWidth: "60%",
};


const fallbackDrdpSection: AcademicsTeachingCommitmentsSectionData = { heading: { title: "" }, cards: [] };

const fallbackExcellenceSection: Required<AcademicsKindergartenFeatureSection> = {
  heading: {
    title: "Driving Excellence\nThrough Continuous Review",
    description: [
      paragraph(
        "kg-excellence",
        "Teachers utilize a combination of structured activities and child-directed learning opportunities to cater to individual learning styles and needs. Our curriculum emphasizes foundational skills such as literacy, numeracy, and social-emotional development, integrating them into engaging and developmentally appropriate learning experiences. Through a blend of structured lessons, interactive activities, and creative expression, students in KG-Grade 2 develop essential skills, knowledge, and attitudes that form the building blocks for future learning success."
      ),
    ],
  },
  image: {
    url: "/academics-kg-excellence.png",
    alt: "SAIS - Abu Dhabi kindergarten students playing music together",
  },
  imageSide: "right",
  imagePosition: "center",
  backgroundColor: "var(--sais-accent)",
  panelColor: "var(--sais-primary)",
  waveColor: "#d97252",
  titleColor: "var(--sais-accent)",
  textColor: "#ffffff",
};

function blocksToPlainText(blocks?: PortableTextBlock[]) {
  return (
    blocks
      ?.map((block) => block.children?.map((child) => child.text || "").join("") || "")
      .filter(Boolean)
      .join("\n\n") || ""
  );
}

function resolveInnerNavItems(items?: InnerNavigationItem[]): InnerPageNavItem[] {
  return (
    items
      ?.flatMap((item) => {
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
      })
      || []
  );
}

function toExcellenceSliderSection(
  section: AcademicsKindergartenFeatureSection | undefined,
  fallbackSection: Required<AcademicsKindergartenFeatureSection>,
): AcademicsLearningSliderSectionData {
  const heading = section?.heading || fallbackSection.heading;

  return {
    slides: [
      {
        _key: "kindergarten-excellence",
        title: heading?.title,
        body: blocksToPlainText(heading?.description),
        image: section?.image || fallbackSection.image,
        backgroundColor: section?.panelColor || fallbackSection.panelColor,
        sideColor: section?.backgroundColor || fallbackSection.backgroundColor,
        ringColor: section?.waveColor || fallbackSection.waveColor,
        titleColor: section?.titleColor || fallbackSection.titleColor,
        textColor: section?.textColor || fallbackSection.textColor,
        imagePosition: section?.imagePosition || fallbackSection.imagePosition,
      },
    ],
  };
}

export default async function AcademicsKindergartenPage() {
  const [data, kindergartenPage] = await Promise.all([getHomepage(), getAcademicsKindergartenPage()]);
  const hero = kindergartenPage?.hero;
  const excellenceSection = kindergartenPage?.excellenceSection || fallbackExcellenceSection;
  const curriculumSection = kindergartenPage?.curriculumSection;
  const arabicPolicySection = kindergartenPage?.arabicPolicySection;
  const drdpSection = kindergartenPage?.drdpSection;
  const dayInLifeSection = kindergartenPage?.dayInLifeSection;
  const innerNavigation = kindergartenPage?.innerNavigation;
  const innerNavItems = resolveInnerNavItems(innerNavigation?.items);
  const heroTitle = hero?.heading?.title || fallbackHero.title;
  const heroEyebrow = hero?.heading?.eyebrow || fallbackHero.eyebrow;
  const heroImage = hero?.image || fallbackHero.image;
  const excellenceSliderSection = toExcellenceSliderSection(excellenceSection, fallbackExcellenceSection);

  return (
    <SitePageShell
      data={data}
      mainClassName="site-page__main academics-kindergarten-page__main"
      pageClassName="academics-kindergarten-page"
    >
      <PageHero
        className="academics-kindergarten-hero"
        title={heroTitle}
        image={heroImage}
        eyebrow={heroEyebrow}
        titleId="academics-kindergarten-hero-title"
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

      <AcademicsLearningSliderSection
        className="academics-kg-excellence-slider"
        section={excellenceSliderSection}
        fallbackSection={toExcellenceSliderSection(undefined, fallbackExcellenceSection)}
      />

      {curriculumSection ? (
        <IntroFeatureSection
          className="academics-kg-curriculum-feature"
          titleId="academics-kg-curriculum-title"
          section={{ heading: curriculumSection.heading || { title: "" }, image: curriculumSection.image }}
          fallbackSection={{ heading: { title: "The Curriculum" }, image: {} }}
          panelColor={curriculumSection.panelColor || "#6F7175"}
          accentColor={curriculumSection.waveColor || "#00A5B2"}
          titleColor={curriculumSection.titleColor || "#ffffff"}
          textColor={curriculumSection.textColor || "#ffffff"}
          imagePosition={curriculumSection.imagePosition || "center"}
          imageSide="right"
        />
      ) : null}

      {arabicPolicySection ? (
        <EditorialSplitSection
          id="academics-kg-arabic-policy"
          title={arabicPolicySection.heading?.title || "Arabic Language Policy"}
          section={arabicPolicySection}
          fallbackImage={{}}
          fallbackParagraphs={[]}
          className="academics-steam-section academics-kg-arabic-policy-section"
          preserveRichText
          showTitle
          showCtas
        />
      ) : null}

      {drdpSection ? (
        <AcademicsTeachingCommitmentsSection section={drdpSection} fallbackSection={fallbackDrdpSection} />
      ) : null}

      {dayInLifeSection ? (
        <IntroFeatureSection
          className="academics-kg-day-feature"
          titleId="academics-kg-day-title"
          section={{ heading: dayInLifeSection.heading || { title: "" }, image: dayInLifeSection.image }}
          fallbackSection={{ heading: { title: "" }, image: {} }}
          panelColor={dayInLifeSection.panelColor || "#216B97"}
          accentColor={dayInLifeSection.waveColor || "#00A5B2"}
          titleColor={dayInLifeSection.titleColor || "#ffffff"}
          textColor={dayInLifeSection.textColor || "#ffffff"}
          imagePosition={dayInLifeSection.imagePosition || "center"}
          imageSide="right"
        />
      ) : null}
      <LearningPhasesSection section={data?.learningPhases} excludeTitle="Kindergarten" />
      <TourIntroSection section={data?.tour} />
      <TourSection section={data?.tour} />
    </SitePageShell>
  );
}
