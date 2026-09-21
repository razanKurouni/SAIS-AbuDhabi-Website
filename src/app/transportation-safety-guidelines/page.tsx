import type { Metadata } from "next";
import { SitePageShell } from "@/components/layout/site-page-shell";
import { EditorialSplitSection } from "@/components/sections/editorial-split-section";
import { SafetyHighlightSection } from "@/components/sections/safety-highlight-section";
import { PageHero } from "@/components/sections/page-hero";
import { CommunityInnerNav } from "@/components/sections/community-inner-nav";
import { TourIntroSection } from "@/components/sections/tour-intro-section";
import { TourSection } from "@/components/sections/tour-section";
import { getHomepage, getTransportationSafetyPage } from "@/lib/sanity";
import type {
  ImageTextSection,
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

const fallbackBoardingParagraphs = [
  "To maintain safety and organization, seating assignments follow a structured route-based system. Boarding procedures are designed to minimize student conflict.",
  "Each bus is staffed with a licensed driver and a trained assistant who ensure student supervision, manage attendance, and support younger children. Detailed attendance records are maintained daily, and absences are promptly reported to the school administration.",
  "Additionally, all buses undergo regular cleaning and sanitization to uphold the highest standards of hygiene and safety.",
];

const fallbackBoardingSection: ImageTextSection = {
  heading: {
    title: "Boarding & Supervision",
    description: fallbackBoardingParagraphs.map((text, index) =>
      paragraph(`transportation-boarding-${index + 1}`, text)
    ),
  },
  image: {
    url: "/images/academics-steam.jpg",
    alt: "SAIS - UAQ student carrying a project kit",
  },
  imagePosition: "left",
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

      <EditorialSplitSection
        id="transportation-boarding"
        title={fallbackBoardingSection.heading.title}
        section={page?.boardingSection}
        fallbackImage={fallbackBoardingSection.image || {}}
        fallbackParagraphs={fallbackBoardingParagraphs}
        className="transportation-boarding"
        imageSizes="(max-width: 767px) calc(100vw - 32px), 42vw"
      />

      <TourIntroSection section={data?.tour} />
      <TourSection section={data?.tour} />
    </SitePageShell>
  );
}
