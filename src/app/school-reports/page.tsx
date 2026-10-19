import type { Metadata } from "next";
import { SitePageShell } from "@/components/layout/site-page-shell";
import { CommunityInnerNav } from "@/components/sections/community-inner-nav";
import { PageHero } from "@/components/sections/page-hero";
import { TourIntroSection } from "@/components/sections/tour-intro-section";
import { TourSection } from "@/components/sections/tour-section";
import { SchoolDocumentCard } from "@/components/sections/school-document-card";
import { RichText } from "@/components/ui/rich-text";
import { SectionReveal } from "@/components/ui/section-reveal";
import { getHomepage, getSchoolReportsPage } from "@/lib/sanity";
import type { SanityImage } from "@/types/sanity";

const fallbackMetadata: Metadata = {
  title: "School Reports | SAIS - Abu Dhabi",
  description: "School reports and inspection outcomes for SAIS - Abu Dhabi.",
};

const fallbackHero = {
  title: "School Reports",
  image: {
    url: "/contact-campus-building.jpg",
    alt: "SAIS - Abu Dhabi school reports",
  },
  topLineColor: "#d97252",
  panelColor: "#216B97",
  waveColor: "#00A5B2",
  textColor: "#ffffff",
  imagePosition: "center",
  imageWidth: "58%",
};

/* Covers come from Sanity; without one the card shows its plain cover panel. */
const fallbackCover: SanityImage = {};

export async function generateMetadata(): Promise<Metadata> {
  const page = await getSchoolReportsPage();

  return {
    title: page?.seo?.title || fallbackMetadata.title,
    description: page?.seo?.description || fallbackMetadata.description,
  };
}

export const dynamic = "force-dynamic";

export default async function SchoolReportsPage() {
  const [data, page] = await Promise.all([getHomepage(), getSchoolReportsPage()]);
  const hero = page?.hero;
  const heroImage: SanityImage = hero?.image || fallbackHero.image;
  const intro = page?.intro;
  const reports = page?.reports || [];

  return (
    <SitePageShell
      data={data}
      mainClassName="site-page__main school-reports-page__main"
      pageClassName="school-reports-page"
    >
      <PageHero
        className="school-reports-hero"
        title={hero?.heading?.title || fallbackHero.title}
        image={heroImage}
        titleId="school-reports-hero-title"
        priority
        topLineColor={hero?.topLineColor || fallbackHero.topLineColor}
        panelColor={hero?.panelColor || fallbackHero.panelColor}
        waveColor={hero?.waveColor || fallbackHero.waveColor}
        textColor={hero?.textColor || fallbackHero.textColor}
        imagePosition={hero?.imagePosition || fallbackHero.imagePosition}
        imageWidth={hero?.imageWidth || fallbackHero.imageWidth}
      />
      <CommunityInnerNav activeHref="/school-reports" />

      {/* Intro and report cards share the School Policies look: one grey band, document covers below. */}
      {intro?.heading?.title || intro?.heading?.description?.length ? (
        <section
          id="school-reports-intro"
          className="student-life-overview school-policies-intro school-reports-intro"
          aria-labelledby="school-reports-intro-title"
        >
          <div className="student-life-overview__inner">
            <h2 id="school-reports-intro-title" className="student-life-overview__title">
              {intro.heading?.title || fallbackHero.title}
            </h2>
            <div className="student-life-overview__body">
              <RichText blocks={intro.heading?.description} className="student-life-overview__copy" />
            </div>
          </div>
        </section>
      ) : null}

      {reports.length ? (
        <section className="school-policies-content school-reports-content" aria-label="Report documents">
          <SectionReveal className="school-policies-content__inner" threshold={0.01}>
            <div className="school-policies-grid school-reports-grid">
              {reports.map((report, index) => (
                <SchoolDocumentCard
                  key={report._key || `${report.title}-${index}`}
                  document={report}
                  index={index}
                  fallbackCover={fallbackCover}
                  fallbackTitle="School Report"
                />
              ))}
            </div>
          </SectionReveal>
        </section>
      ) : null}

      <TourIntroSection section={data?.tour} />
      <TourSection section={data?.tour} />
    </SitePageShell>
  );
}
