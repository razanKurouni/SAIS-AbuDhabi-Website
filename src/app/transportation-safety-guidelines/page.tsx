import type { Metadata } from "next";
import { SitePageShell } from "@/components/layout/site-page-shell";
import { AcademicsElementaryAssessmentSection } from "@/components/sections/academics-elementary-assessment-section";
import { EditorialSplitSection } from "@/components/sections/editorial-split-section";
import { SafetyHighlightSection } from "@/components/sections/safety-highlight-section";
import { PageHero } from "@/components/sections/page-hero";
import { CommunityInnerNav } from "@/components/sections/community-inner-nav";
import { TourIntroSection } from "@/components/sections/tour-intro-section";
import { TourSection } from "@/components/sections/tour-section";
import { getHomepage, getTransportationSafetyPage } from "@/lib/sanity";
import type {
  AcademicsKindergartenFeatureSection,
  PortableTextBlock,
  SafetyHighlightSection as SafetyHighlightSectionData,
} from "@/types/sanity";

const fallbackMetadata: Metadata = {
  title: "School Transportation Safety Guidelines | SAIS - UAQ",
  description: "Learn about school transportation safety guidelines at SAIS - UAQ.",
};

const fallbackHero = {
  title: "School Transportation\nSafety Guidelines",
  image: {
    url: "/contact-campus-building.jpg",
    alt: "SAIS - UAQ school transportation",
  },
  topLineColor: "#216B97",
  panelColor: "#00A5B2",
  waveColor: "#d97252",
  textColor: "#ffffff",
  imagePosition: "center",
  imageWidth: "58%",
};

function paragraph(_key: string, text: string): PortableTextBlock {
  return {
    _key,
    _type: "block",
    children: [{ _key: `${_key}-span`, _type: "span", text, marks: [] }],
  };
}

const fallbackSafetyHighlight: SafetyHighlightSectionData = {
  heading: {
    title: "Student Safety on Every Journey",
    description: [
      paragraph(
        "transportation-safety-highlight-intro",
        "Student safety and wellbeing are at the forefront of our transportation services. All school buses are equipped with live monitoring systems, internal surveillance cameras, and GPS tracking to ensure secure and efficient travel."
      ),
    ],
  },
  image: {
    url: "/about-intro-students.jpg",
    alt: "SAIS - UAQ students gathered in the school yard",
  },
  imagePosition: "center",
  backgroundColor: "#216B97",
  titleColor: "#00A5B2",
  textColor: "#ffffff",
};

const fallbackEnrollSection: Required<AcademicsKindergartenFeatureSection> = {
  heading: { title: "" },
  image: {},
  imageSide: "right",
  imagePosition: "center",
  backgroundColor: "#ffffff",
  panelColor: "#216B97",
  waveColor: "#00A5B2",
  titleColor: "#00A5B2",
  textColor: "#ffffff",
};

export async function generateMetadata(): Promise<Metadata> {
  const page = await getTransportationSafetyPage();

  return {
    title: page?.seo?.title || fallbackMetadata.title,
    description: page?.seo?.description || fallbackMetadata.description,
  };
}

export const dynamic = "force-dynamic";

export default async function TransportationSafetyGuidelinesPage() {
  const [data, page] = await Promise.all([getHomepage(), getTransportationSafetyPage()]);
  const hero = page?.hero;
  const heroTitle = hero?.heading?.title || fallbackHero.title;
  const heroImage = hero?.image || fallbackHero.image;

  return (
    <SitePageShell
      data={data}
      mainClassName="site-page__main transportation-safety-page__main"
      pageClassName="transportation-safety-page"
    >
      <PageHero
        className="transportation-safety-hero"
        title={heroTitle}
        image={heroImage}
        titleId="transportation-safety-hero-title"
        priority
        topLineColor={hero?.topLineColor || fallbackHero.topLineColor}
        panelColor={hero?.panelColor || fallbackHero.panelColor}
        waveColor={hero?.waveColor || fallbackHero.waveColor}
        textColor={hero?.textColor || fallbackHero.textColor}
        imagePosition={hero?.imagePosition || fallbackHero.imagePosition}
        imageWidth={hero?.imageWidth || fallbackHero.imageWidth}
      />
      <CommunityInnerNav activeHref="/transportation-safety-guidelines" />

      <SafetyHighlightSection
        section={page?.safetyHighlight}
        fallbackSection={fallbackSafetyHighlight}
        className="transportation-safety-highlight"
        titleId="transportation-safety-highlight-title"
      />

      {page?.featuresSection ? (
        <EditorialSplitSection
          id="transportation-features"
          title="Key Features of Our Service"
          section={page.featuresSection}
          fallbackImage={{}}
          fallbackParagraphs={[]}
          className="academics-steam-section wellbeing-counseling-section transportation-features"
          imageSizes="(max-width: 767px) calc(100vw - 32px), 44vw"
          showTitle
          preserveRichText
        />
      ) : null}

      <AcademicsElementaryAssessmentSection
        section={page?.enrollSection}
        fallbackSection={fallbackEnrollSection}
        className="transportation-enroll-feature academics-middle-school-tailored-section"
        imageSide={page?.enrollSection?.imageSide || "right"}
        titleId="transportation-enroll-title"
      />

      <TourIntroSection section={data?.tour} />
      <TourSection section={data?.tour} />
    </SitePageShell>
  );
}
