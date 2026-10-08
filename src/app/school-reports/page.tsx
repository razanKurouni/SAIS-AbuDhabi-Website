import type { Metadata } from "next";
import { SitePageShell } from "@/components/layout/site-page-shell";
import { CommunityInnerNav } from "@/components/sections/community-inner-nav";
import { PageHero } from "@/components/sections/page-hero";
import { TourIntroSection } from "@/components/sections/tour-intro-section";
import { TourSection } from "@/components/sections/tour-section";
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

      {intro?.heading?.title || intro?.heading?.description?.length ? (
        /* Same intro layout as the School Calendar page until the School Reports design arrives. */
        <section className="school-calendar-content" aria-labelledby="school-reports-content-title">
          <SectionReveal className="school-calendar-content__inner">
            <div className="school-calendar-content__header">
              <h2 id="school-reports-content-title" className="school-calendar-content__title">
                {intro.heading?.title || fallbackHero.title}
              </h2>
              <RichText blocks={intro.heading?.description} className="school-calendar-content__intro" />
            </div>
          </SectionReveal>
        </section>
      ) : null}

      <TourIntroSection section={data?.tour} />
      <TourSection section={data?.tour} />
    </SitePageShell>
  );
}
