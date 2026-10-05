import type { Metadata } from "next";
import { SitePageShell } from "@/components/layout/site-page-shell";
import { AcademicsElementaryAssessmentSection } from "@/components/sections/academics-elementary-assessment-section";
import { IntroFeatureSection } from "@/components/sections/intro-feature-section";
import { PageHero } from "@/components/sections/page-hero";
import { CommunityInnerNav } from "@/components/sections/community-inner-nav";
import { TourIntroSection } from "@/components/sections/tour-intro-section";
import { TourSection } from "@/components/sections/tour-section";
import { getHealthSafetyPage, getHomepage } from "@/lib/sanity";
import type { AcademicsKindergartenFeatureSection, ImageTextSection, PortableTextBlock } from "@/types/sanity";

const fallbackMetadata: Metadata = {
  title: "Health & Safety | SAIS - Abu Dhabi",
  description: "Learn about health and safety care at SAIS - Abu Dhabi.",
};

const fallbackHero = {
  title: "Health\n& Safety",
  image: {
    url: "/contact-campus-building.jpg",
    alt: "SAIS - Abu Dhabi health and safety",
  },
  topLineColor: "#d97252",
  panelColor: "#216B97",
  waveColor: "#00A5B2",
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

const fallbackIntroSection: ImageTextSection = {
  heading: {
    title: "Professional Care,\nEvery School Day",
    description: [
      paragraph(
        "health-safety-intro",
        "The school medical includes a licensed and approved Doctor and 2 nurses in a dedicated clinic area as per Strategic Planning and Educational Affairs Authority (SPEA) requirements. The medical staffs are available during school hours to provide assistance and support to students in any medical situation. The medical staff are available will always assess and monitor the condition of the student and make a professional decision about appropriate treatment required."
      ),
    ],
  },
  image: {
    url: "/contact-campus-building.jpg",
    alt: "SAIS - Abu Dhabi medical care",
  },
  imagePosition: "left",
  theme: "teal",
};

const fallbackApproachSection: Required<AcademicsKindergartenFeatureSection> = {
  heading: { title: "" },
  image: {},
  imageSide: "right",
  imagePosition: "center",
  backgroundColor: "#ffffff",
  panelColor: "#00A5B2",
  waveColor: "#D97252",
  titleColor: "#ffffff",
  textColor: "#ffffff",
};

export async function generateMetadata(): Promise<Metadata> {
  const page = await getHealthSafetyPage();

  return {
    title: page?.seo?.title || fallbackMetadata.title,
    description: page?.seo?.description || fallbackMetadata.description,
  };
}

export const dynamic = "force-dynamic";

export default async function HealthSafetyPage() {
  const [data, page] = await Promise.all([getHomepage(), getHealthSafetyPage()]);
  const hero = page?.hero;
  const heroTitle = hero?.heading?.title || fallbackHero.title;
  const heroImage = hero?.image || fallbackHero.image;

  return (
    <SitePageShell
      data={data}
      mainClassName="site-page__main health-safety-page__main"
      pageClassName="health-safety-page"
    >
      <PageHero
        className="health-safety-hero"
        title={heroTitle}
        image={heroImage}
        titleId="health-safety-hero-title"
        priority
        topLineColor={hero?.topLineColor || fallbackHero.topLineColor}
        panelColor={hero?.panelColor || fallbackHero.panelColor}
        waveColor={hero?.waveColor || fallbackHero.waveColor}
        textColor={hero?.textColor || fallbackHero.textColor}
        imagePosition={hero?.imagePosition || fallbackHero.imagePosition}
        imageWidth={hero?.imageWidth || fallbackHero.imageWidth}
      />
      <CommunityInnerNav activeHref="/health-safety" />

      <IntroFeatureSection
        section={page?.introSection}
        fallbackSection={fallbackIntroSection}
        className="health-safety-intro-feature"
        titleId="health-safety-intro-title"
        panelColor={page?.introSection?.backgroundColor || "#00A5B2"}
        accentColor="#D97252"
        titleColor={page?.introSection?.titleColor || "#ffffff"}
        textColor={page?.introSection?.textColor || "#ffffff"}
        imagePosition={page?.introSection?.imagePosition || "center"}
      />

      <AcademicsElementaryAssessmentSection
        section={page?.approachSection}
        fallbackSection={fallbackApproachSection}
        className="health-safety-services-feature academics-middle-school-tailored-section"
        imageSide={page?.approachSection?.imageSide || "right"}
        titleId="health-safety-services-title"
      />

      <TourIntroSection section={data?.tour} />
      <TourSection section={data?.tour} />
    </SitePageShell>
  );
}
