import type { Metadata } from "next";
import { SitePageShell } from "@/components/layout/site-page-shell";
import { AcademicsElementaryAssessmentSection } from "@/components/sections/academics-elementary-assessment-section";
import { EditorialSplitSection } from "@/components/sections/editorial-split-section";
import { IntroFeatureSection } from "@/components/sections/intro-feature-section";
import { PageHero } from "@/components/sections/page-hero";
import { CommunityInnerNav } from "@/components/sections/community-inner-nav";
import { CmsImage } from "@/components/ui/cms-image";
import { RichText } from "@/components/ui/rich-text";
import { SectionReveal } from "@/components/ui/section-reveal";
import { getHomepage, getStudentStaffWellbeingPage } from "@/lib/sanity";
import type { AcademicsKindergartenFeatureSection } from "@/types/sanity";
import { TourSection } from "@/components/sections/tour-section";
import { TourIntroSection } from "@/components/sections/tour-intro-section";

const fallbackClassroomSection: Required<AcademicsKindergartenFeatureSection> = {
  heading: { title: "" },
  image: {},
  imageSide: "left",
  imagePosition: "center",
  backgroundColor: "#ffffff",
  panelColor: "#00A5B2",
  waveColor: "#216B97",
  titleColor: "#ffffff",
  textColor: "#ffffff",
};

const fallbackMetadata: Metadata = {
  title: "Student & Staff Wellbeing | SAIS - Abu Dhabi",
  description: "Learn about student and staff wellbeing support at SAIS - Abu Dhabi.",
};

const fallbackHero = {
  title: "Student &\nStaff Wellbeing",
  image: {
    url: "/contact-campus-building.jpg",
    alt: "SAIS - Abu Dhabi campus building",
  },
  topLineColor: "#216B97",
  panelColor: "#707174",
  waveColor: "#00A5B2",
  textColor: "#ffffff",
  imagePosition: "center",
  imageWidth: "58%",
};

export async function generateMetadata(): Promise<Metadata> {
  const page = await getStudentStaffWellbeingPage();

  return {
    title: page?.seo?.title || fallbackMetadata.title,
    description: page?.seo?.description || fallbackMetadata.description,
  };
}

export const dynamic = "force-dynamic";

export default async function StudentStaffWellbeingPage() {
  const [data, page] = await Promise.all([getHomepage(), getStudentStaffWellbeingPage()]);
  const hero = page?.hero;
  const heroTitle = hero?.heading?.title || fallbackHero.title;
  const heroImage = hero?.image || fallbackHero.image;

  return (
    <SitePageShell
      data={data}
      mainClassName="site-page__main wellbeing-page__main"
      pageClassName="wellbeing-page"
    >
      <PageHero
        className="wellbeing-hero"
        title={heroTitle}
        image={heroImage}
        titleId="wellbeing-hero-title"
        priority
        topLineColor={hero?.topLineColor || fallbackHero.topLineColor}
        panelColor={hero?.panelColor || fallbackHero.panelColor}
        waveColor={hero?.waveColor || fallbackHero.waveColor}
        textColor={hero?.textColor || fallbackHero.textColor}
        imagePosition={hero?.imagePosition || fallbackHero.imagePosition}
        imageWidth={hero?.imageWidth || fallbackHero.imageWidth}
      />
      <CommunityInnerNav activeHref="/student-staff-wellbeing" />

      <section className="wellbeing-commitment" aria-labelledby="wellbeing-commitment-title">
        <div className="wellbeing-commitment__inner">
          <SectionReveal className="wellbeing-commitment__copy">
            <h2 id="wellbeing-commitment-title" className="wellbeing-commitment__title">
              {page?.commitment?.heading?.title || "Our Commitment"}
            </h2>
            <RichText blocks={page?.commitment?.heading?.description} className="wellbeing-commitment__body" />
          </SectionReveal>

          <SectionReveal className="wellbeing-commitment__media">
            <CmsImage
              image={page?.commitment?.image}
              fallbackLabel={page?.commitment?.heading?.title || "Our Commitment"}
              className="wellbeing-commitment__image"
              imageClassName="object-cover"
              sizes="(max-width: 767px) 90vw, 78vw"
            />
          </SectionReveal>
        </div>
      </section>

      {page?.counselingSupportSection ? (
        <EditorialSplitSection
          id="wellbeing-counseling"
          title="Dedicated Counseling & Support Services"
          section={page.counselingSupportSection}
          fallbackImage={{}}
          fallbackParagraphs={[]}
          className="academics-steam-section wellbeing-counseling-section"
          imageSizes="(max-width: 767px) calc(100vw - 32px), 44vw"
          showTitle
          preserveRichText
        />
      ) : null}

      <IntroFeatureSection
        className="wellbeing-sel-feature"
        titleId="wellbeing-sel-title"
        section={page?.selSection}
        panelColor={page?.selSection?.backgroundColor || "#00A5B2"}
        accentColor="#D97252"
        titleColor={page?.selSection?.titleColor || "#ffffff"}
        textColor={page?.selSection?.textColor || "#ffffff"}
        imagePosition={page?.selSection?.imagePosition || "center"}
        imageSide="right"
      />

      <IntroFeatureSection
        className="wellbeing-framework-feature"
        titleId="wellbeing-framework-title"
        section={page?.wellbeingFramework}
        panelColor={page?.wellbeingFramework?.backgroundColor || "#216B97"}
        accentColor="#D97252"
        titleColor={page?.wellbeingFramework?.titleColor || "#00A5B2"}
        textColor={page?.wellbeingFramework?.textColor || "#ffffff"}
        imagePosition={page?.wellbeingFramework?.imagePosition || "center"}
      />

      {page?.wellnessCampaigns ? (
        <EditorialSplitSection
          id="wellbeing-campaigns"
          title="Campus-Wide Wellness Campaigns"
          section={page.wellnessCampaigns}
          fallbackImage={{}}
          fallbackParagraphs={[]}
          className="academics-steam-section wellbeing-counseling-section wellbeing-campaigns-section"
          imageSizes="(max-width: 767px) calc(100vw - 32px), 44vw"
          showTitle
          preserveRichText
        />
      ) : null}

      <AcademicsElementaryAssessmentSection
        section={page?.classroomIntegration}
        fallbackSection={fallbackClassroomSection}
        className="wellbeing-classroom-feature academics-middle-school-tailored-section"
        imageSide={page?.classroomIntegration?.imageSide || "left"}
        titleId="wellbeing-classroom-title"
      />

      <TourIntroSection section={data?.tour} />
            <TourSection section={data?.tour} />
    </SitePageShell>
  );
}
