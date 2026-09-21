import type { Metadata } from "next";
import { SitePageShell } from "@/components/layout/site-page-shell";
import { ApproachSectionBase } from "@/components/sections/approach-section";
import { EditorialSplitSection } from "@/components/sections/editorial-split-section";
import { InnerPageNav } from "@/components/sections/inner-page-nav";
import { PageHero } from "@/components/sections/page-hero";
import { TourIntroSection } from "@/components/sections/tour-intro-section";
import { TourSection } from "@/components/sections/tour-section";
import { getHomepage, getStudentProgramsPage } from "@/lib/sanity";
import { resolveStudentSectionNavItems, studentSectionNavItems } from "@/lib/student-section-navigation";
import type { InnerPageNavItem } from "@/components/sections/inner-page-nav";
import type { ImageTextSection, InnerNavigation, PortableTextBlock } from "@/types/sanity";

const fallbackMetadata: Metadata = {
  title: "Achievements | SAIS - UAQ",
  description: "Explore student achievements in academics, sports, and leadership at SAIS - UAQ.",
};

const fallbackHero = {
  title: "Achievements",
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
  activeHref: "/achievements",
  activeColor: "#216B97",
  inactiveColor: "#d97252",
  textColor: "#ffffff",
  dividerColor: "#ffffff",
  topLineColor: "#ffffff",
  ariaLabel: "Student life sections",
};

function paragraph(_key: string, text: string): PortableTextBlock {
  return {
    _key,
    _type: "block",
    style: "normal",
    markDefs: [],
    children: [{ _key: `${_key}-span`, _type: "span", text, marks: [] }],
  };
}

const fallbackExcellenceIntro: ImageTextSection = {
  heading: {
    title: "Honoring Excellence in\nEvery Journey",
    description: [
      paragraph(
        "achievements-intro-1",
        "Excellence is more than a goal it is a continuous journey reflected in the accomplishments of our vibrant student body and dedicated staff. Our school takes pride in nurturing learners who excel in academics, sports, leadership, creativity, and innovation."
      ),
      paragraph(
        "achievements-intro-2",
        "Throughout the academic year, our students have distinguished themselves in a wide array of local and national competitions, demonstrating critical thinking, communication, and collaborative skills. From mathematics challenges and reading contests to national-level innovation fairs and debate forums, our students consistently represent the school with pride and intellect."
      ),
    ],
  },
  image: {
    url: "/about-values-growth.jpg",
    alt: "SAIS - UAQ swimming coach guiding a student in the pool",
  },
  imagePosition: "right",
  backgroundColor: "#ffffff",
  titleColor: "#216B97",
  textColor: "#666B70",
};

const fallbackHighlightsSection: ImageTextSection = {
  heading: {
    title: "Competitions and Platforms",
    description: [
      paragraph(
        "achievements-highlight-sports",
        "In the sports arena, our teams have earned top rankings in inter-school tournaments, including a remarkable second place in the Canadian University Football Championship and active participation in the AUS Sharakah Sports Festival."
      ),
      paragraph(
        "achievements-highlight-chess",
        "Our chess players have also made notable strides, participating in inter-school chess tournaments that celebrate strategic thinking and mental agility."
      ),
      paragraph(
        "achievements-highlight-culture",
        "Beyond academics and sports, our students shine in cultural, creative, and leadership platforms, whether through SAIS TALKS, entrepreneurship expos, sustainability initiatives, or the widely celebrated “Made in UAE” innovation showcase."
      ),
    ],
  },
  image: {
    url: "/about-values-character.jpg",
    alt: "SAIS - UAQ student playing the violin during a music lesson",
  },
};

const fallbackCommunitySection: ImageTextSection = {
  heading: {
    title: "A Community That Celebrates Together",
    description: [
      paragraph(
        "achievements-community-1",
        "The school also hosts vibrant community-building events, such as the annual Carnival, which brings together students, parents, and staff in a festive celebration of talent, culture, and creativity."
      ),
      paragraph(
        "achievements-community-2",
        "These achievements are a testament to the school's holistic approach to education where curiosity is encouraged, talents are nurtured, and every student is empowered to reach their fullest potential."
      ),
      paragraph(
        "achievements-community-3",
        "SAIS - UAQ remains committed to building a generation of confident, capable, and compassionate individuals prepared to lead and contribute meaningfully to the world."
      ),
    ],
  },
  image: {
    url: "/about-values-community.jpg",
    alt: "SAIS - UAQ students celebrating at a school chess tournament",
  },
  imagePosition: "right",
  backgroundColor: "#F2F2F2",
  textColor: "#666B70",
};

function resolveInnerNavItems(innerNavigation?: InnerNavigation) {
  const items = resolveStudentSectionNavItems(innerNavigation?.items);
  const activeHref = fallbackInnerNavigation.activeHref;

  return { items, activeHref };
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await getStudentProgramsPage();

  return {
    title: page?.seo?.title || fallbackMetadata.title,
    description: page?.seo?.description || fallbackMetadata.description,
  };
}

export const dynamic = "force-dynamic";

export default async function StudentProgramsPage() {
  const [data, page] = await Promise.all([getHomepage(), getStudentProgramsPage()]);
  const hero = page?.hero;
  const heroTitle = hero?.heading?.title || fallbackHero.title;
  const heroImage = hero?.image || fallbackHero.image;
  const innerNavigation = page?.innerNavigation || fallbackInnerNavigation;
  const highlightsSection = page?.highlightsSection || fallbackHighlightsSection;
  const { items: navItems, activeHref } = resolveInnerNavItems(innerNavigation);

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
        items={navItems}
        activeHref={activeHref}
        activeColor={innerNavigation.activeColor || fallbackInnerNavigation.activeColor}
        inactiveColor={innerNavigation.inactiveColor || fallbackInnerNavigation.inactiveColor}
        textColor={innerNavigation.textColor || fallbackInnerNavigation.textColor}
        dividerColor={innerNavigation.dividerColor || fallbackInnerNavigation.dividerColor}
        topLineColor={innerNavigation.topLineColor || fallbackInnerNavigation.topLineColor}
        ariaLabel={innerNavigation.ariaLabel || fallbackInnerNavigation.ariaLabel}
      />

      <EditorialSplitSection
        id="achievements-intro"
        title={fallbackExcellenceIntro.heading.title}
        section={{
          ...page?.excellenceIntro,
          heading: page?.excellenceIntro?.heading ?? fallbackExcellenceIntro.heading,
          imagePosition: page?.excellenceIntro?.imagePosition || fallbackExcellenceIntro.imagePosition,
          backgroundColor:
            page?.excellenceIntro?.backgroundColor || fallbackExcellenceIntro.backgroundColor,
          titleColor: page?.excellenceIntro?.titleColor || fallbackExcellenceIntro.titleColor,
          textColor: page?.excellenceIntro?.textColor || fallbackExcellenceIntro.textColor,
        }}
        fallbackImage={fallbackExcellenceIntro.image || {}}
        fallbackParagraphs={[]}
        className="editorial-split-listed achievements-intro"
        imageSizes="(max-width: 767px) calc(100vw - 32px), 42vw"
        showTitle
        preserveRichText
      />

      <ApproachSectionBase
        id="achievements-highlights"
        className="approach-section--home achievements-highlights"
        title={highlightsSection.heading?.title || fallbackHighlightsSection.heading.title}
        content={highlightsSection.heading?.description || fallbackHighlightsSection.heading.description}
        image={highlightsSection.image || fallbackHighlightsSection.image}
        imageSizes="(max-width: 767px) 100vw, 50vw"
        showTitle={false}
      />

      <EditorialSplitSection
        id="achievements-community"
        title={fallbackCommunitySection.heading.title}
        section={{
          ...page?.communitySection,
          heading: page?.communitySection?.heading ?? fallbackCommunitySection.heading,
          imagePosition: page?.communitySection?.imagePosition || fallbackCommunitySection.imagePosition,
          backgroundColor:
            page?.communitySection?.backgroundColor || fallbackCommunitySection.backgroundColor,
          textColor: page?.communitySection?.textColor || fallbackCommunitySection.textColor,
        }}
        fallbackImage={fallbackCommunitySection.image || {}}
        fallbackParagraphs={[]}
        className="editorial-split-listed achievements-community"
        imageSizes="(max-width: 767px) calc(100vw - 32px), 42vw"
        preserveRichText
      />

      <TourIntroSection section={data?.tour} />
      <TourSection section={data?.tour} />
    </SitePageShell>
  );
}
