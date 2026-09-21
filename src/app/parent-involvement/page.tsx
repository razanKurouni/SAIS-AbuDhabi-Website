import type { Metadata } from "next";
import { SitePageShell } from "@/components/layout/site-page-shell";
import { AcademicsSupportProgramsSliderSection } from "@/components/sections/academics-support-programs-slider-section";
import { EditorialSplitSection } from "@/components/sections/editorial-split-section";
import { VideoFeatureSection } from "@/components/sections/video-feature-section";
import { PageHero } from "@/components/sections/page-hero";
import { CommunityInnerNav } from "@/components/sections/community-inner-nav";
import { getHomepage, getParentInvolvementPage } from "@/lib/sanity";
import type {
  AcademicsSupportProgramsSection as OpportunitiesSection,
  ImageTextSection,
  ParentEngagementSection,
  PortableTextBlock,
  SanityImage,
} from "@/types/sanity";
import { TourSection } from "@/components/sections/tour-section";
import { TourIntroSection } from "@/components/sections/tour-intro-section";

const fallbackMetadata: Metadata = {
  title: "Parent Involvement | SAIS - UAQ",
  description: "Learn how SAIS - UAQ partners with parents to support student success.",
};

const fallbackHero = {
  title: "Parent\nInvolvement",
  image: {
    url: "/contact-campus-building.jpg",
    alt: "SAIS - UAQ parent involvement",
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
    children: [{ _key: `${_key}-span`, _type: "span", text }],
  };
}

const fallbackEngagementSection: ParentEngagementSection = {
  heading: {
    title: "Engaging Families\nin Every Step of Learning",
    description: [
      paragraph(
        "parent-involvement-engagement-intro",
        "We believe that strong schools are built on strong partnerships with families. Parents are not just observers, they are active contributors to the school's life and culture. Their involvement plays a vital role in supporting student achievement, wellbeing, and a positive school climate."
      ),
    ],
  },
  bodyText: [
    paragraph(
      "parent-involvement-engagement-body",
      "We foster a dynamic relationship between home and school, where parents are encouraged to participate in meaningful ways. From observing classroom lessons to joining school celebrations, and from volunteering in events to contributing through our active Parent-Teacher Association, PTA, our families are deeply engaged in the SAIS experience."
    ),
  ],
  bandColor: "var(--sais-accent)",
  titleColor: "var(--sais-primary)",
  textColor: "var(--sais-primary)",
};

const fallbackProactiveIntroImage: SanityImage = {
  url: "/about-intro-students.jpg",
  alt: "SAIS - UAQ students in a music lesson",
};

const fallbackProactiveIntroParagraphs = [
  "We are proud to maintain a VERY GOOD rating in parental engagement and community relationships, as noted in our most recent school inspection report, a reflection of our strong and consistent collaboration with families.",
  "We offer diverse opportunities for parent involvement, including:",
];

const fallbackOpportunitiesSection: OpportunitiesSection = {
  heading: {
    title: "We offer diverse opportunities for parent involvement, including:",
  },
  cards: [
    { _key: "parent-teacher-conferences", title: "Parent-Teacher Conferences held twice per semester" },
    { _key: "teacher-meetings", title: "One-on-one teacher meetings upon request" },
    { _key: "lesson-observation", title: "Lesson Observation Opportunities" },
    { _key: "school-wide-events", title: "Participation In School-Wide Events, Projects, And Activities" },
    { _key: "celebrations", title: "Celebrations of Islamic, UAE, and International Observances" },
    { _key: "academic-showcases", title: "Academic Showcases and Exhibitions" },
  ],
  backgroundColor: "#F2F2F2",
  titleColor: "var(--sais-primary)",
  cardTextColor: "var(--sais-accent)",
  cardBorderColor: "var(--sais-primary)",
  cardHoverBorderColor: "#d97252",
};

export async function generateMetadata(): Promise<Metadata> {
  const page = await getParentInvolvementPage();

  return {
    title: page?.seo?.title || fallbackMetadata.title,
    description: page?.seo?.description || fallbackMetadata.description,
  };
}

export const dynamic = "force-dynamic";

export default async function ParentInvolvementPage() {
  const [data, page] = await Promise.all([getHomepage(), getParentInvolvementPage()]);
  const hero = page?.hero;
  const heroTitle = hero?.heading?.title || fallbackHero.title;
  const heroImage = hero?.image || fallbackHero.image;
  // The design puts the image on the right; editors can still flip it in the Studio.
  const proactiveIntroSection: ImageTextSection = {
    ...page?.proactiveIntroSection,
    heading: page?.proactiveIntroSection?.heading ?? { title: "A Proactive Approach" },
    imagePosition: page?.proactiveIntroSection?.imagePosition || "right",
  };

  return (
    <SitePageShell
      data={data}
      mainClassName="site-page__main parent-involvement-page__main"
      pageClassName="parent-involvement-page"
    >
      <PageHero
        className="parent-involvement-hero"
        title={heroTitle}
        image={heroImage}
        titleId="parent-involvement-hero-title"
        priority
        topLineColor={hero?.topLineColor || fallbackHero.topLineColor}
        panelColor={hero?.panelColor || fallbackHero.panelColor}
        waveColor={hero?.waveColor || fallbackHero.waveColor}
        textColor={hero?.textColor || fallbackHero.textColor}
        imagePosition={hero?.imagePosition || fallbackHero.imagePosition}
        imageWidth={hero?.imageWidth || fallbackHero.imageWidth}
      />
      <CommunityInnerNav activeHref="/parent-involvement" />

      <VideoFeatureSection
        section={page?.engagementSection}
        fallbackSection={fallbackEngagementSection}
        video={page?.videoSection}
        className="parent-involvement-engagement"
        titleId="parent-involvement-engagement-title"
      />

      <EditorialSplitSection
        id="parent-involvement-proactive-intro"
        title="A Proactive Approach"
        section={proactiveIntroSection}
        fallbackImage={fallbackProactiveIntroImage}
        fallbackParagraphs={fallbackProactiveIntroParagraphs}
        className="parent-involvement-proactive-intro"
        imageSizes="(max-width: 767px) calc(100vw - 32px), 42vw"
        showTitle
      />

      <AcademicsSupportProgramsSliderSection
        section={page?.proactiveApproach}
        fallbackSection={fallbackOpportunitiesSection}
        className="support-slider-compact parent-involvement-opportunities"
        visibleCounts={{ desktop: 4, tablet: 2, mobile: 1 }}
        fallbackIconNames={["calendar", "messages", "eye", "megaphone", "celebration", "presentation"]}
      />

      <TourIntroSection section={data?.tour} />
      <TourSection section={data?.tour} />

      
    </SitePageShell>
  );
}
