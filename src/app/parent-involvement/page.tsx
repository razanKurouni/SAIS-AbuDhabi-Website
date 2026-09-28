import type { Metadata } from "next";
import { SitePageShell } from "@/components/layout/site-page-shell";
import { AcademicsElementaryAssessmentSection } from "@/components/sections/academics-elementary-assessment-section";
import { CampusVideoSection } from "@/components/sections/campus-video-section";
import { EditorialSplitSection } from "@/components/sections/editorial-split-section";
import { IntroFeatureSection } from "@/components/sections/intro-feature-section";
import { PageHero } from "@/components/sections/page-hero";
import { CommunityInnerNav } from "@/components/sections/community-inner-nav";
import { TourSection } from "@/components/sections/tour-section";
import { TourIntroSection } from "@/components/sections/tour-intro-section";
import { getHomepage, getParentInvolvementPage } from "@/lib/sanity";
import type { AcademicsKindergartenFeatureSection } from "@/types/sanity";

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

const fallbackProgramSection: Required<AcademicsKindergartenFeatureSection> = {
  heading: { title: "" },
  image: {},
  imageSide: "right",
  imagePosition: "center",
  backgroundColor: "#ffffff",
  panelColor: "#707174",
  waveColor: "#00A5B2",
  titleColor: "#ffffff",
  textColor: "#ffffff",
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

      {page?.partnershipSection ? (
        <EditorialSplitSection
          id="parent-involvement-partnership"
          title="Parent Partnership"
          section={page.partnershipSection}
          fallbackImage={{}}
          fallbackParagraphs={[]}
          className="academics-steam-section wellbeing-counseling-section parent-involvement-partnership"
          imageSizes="(max-width: 767px) calc(100vw - 32px), 44vw"
          showTitle
          preserveRichText
        />
      ) : null}

      <CampusVideoSection section={page?.videoSection} />

      <AcademicsElementaryAssessmentSection
        section={page?.programSection}
        fallbackSection={fallbackProgramSection}
        className="parent-involvement-program-feature academics-middle-school-tailored-section"
        imageSide={page?.programSection?.imageSide || "right"}
        titleId="parent-involvement-program-title"
      />

      <IntroFeatureSection
        className="parent-involvement-community-feature"
        titleId="parent-involvement-community-title"
        section={page?.communitySection}
        fallbackSection={{ heading: { title: "" }, image: {} }}
        panelColor={page?.communitySection?.backgroundColor || "#216B97"}
        accentColor="#D97252"
        titleColor={page?.communitySection?.titleColor || "#ffffff"}
        textColor={page?.communitySection?.textColor || "#ffffff"}
        imagePosition={page?.communitySection?.imagePosition || "center"}
      />

      <TourIntroSection section={data?.tour} />
      <TourSection section={data?.tour} />
    </SitePageShell>
  );
}
