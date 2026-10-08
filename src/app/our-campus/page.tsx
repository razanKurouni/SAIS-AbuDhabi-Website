import type { Metadata } from "next";
import { SitePageShell } from "@/components/layout/site-page-shell";
import { CampusVideoSection } from "@/components/sections/campus-video-section";
import { EditorialSplitSection } from "@/components/sections/editorial-split-section";
import { PageHero } from "@/components/sections/page-hero";
import { CommunityInnerNav } from "@/components/sections/community-inner-nav";
import { RichText } from "@/components/ui/rich-text";
import { SectionReveal } from "@/components/ui/section-reveal";
import { getHomepage, getOurCampusPage } from "@/lib/sanity";
import type { AcademicsKindergartenFeatureSection } from "@/types/sanity";
import { TourSection } from "@/components/sections/tour-section";
import { TourIntroSection } from "@/components/sections/tour-intro-section";
import { IntroFeatureSection } from "@/components/sections/intro-feature-section";

const fallbackMetadata: Metadata = {
  title: "Our Campus | SAIS - Abu Dhabi",
  description: "Explore SAIS - Abu Dhabi's modern campus, facilities, learning spaces, and sports environments.",
};

const fallbackHero = {
  title: "Our\nCampus",
  image: {
    url: "/contact-campus-building.jpg",
    alt: "SAIS - Abu Dhabi campus",
  },
  topLineColor: "#d97252",
  panelColor: "#216B97",
  waveColor: "#00A5B2",
  textColor: "#ffffff",
  imagePosition: "center",
  imageWidth: "58%",
};

/* The navy feature panels of this page share one look; the design overlay carries the colours. */
const featureFallback: Required<AcademicsKindergartenFeatureSection> = {
  heading: { title: "" },
  image: {},
  imageSide: "left",
  imagePosition: "center",
  backgroundColor: "#ffffff",
  panelColor: "#216B97",
  waveColor: "#D97252",
  titleColor: "#ffffff",
  textColor: "#ffffff",
};

function featureProps(section: AcademicsKindergartenFeatureSection) {
  return {
    section: { heading: section.heading || featureFallback.heading, image: section.image },
    fallbackSection: { heading: featureFallback.heading, image: {} },
    panelColor: section.panelColor || featureFallback.panelColor,
    accentColor: section.waveColor || featureFallback.waveColor,
    titleColor: section.titleColor || featureFallback.titleColor,
    textColor: section.textColor || featureFallback.textColor,
    imagePosition: section.imagePosition || featureFallback.imagePosition,
    imageSide: section.imageSide || featureFallback.imageSide,
  };
}

export async function generateMetadata(): Promise<Metadata> {
  const ourCampusPage = await getOurCampusPage();

  return {
    title: ourCampusPage?.seo?.title || fallbackMetadata.title,
    description: ourCampusPage?.seo?.description || fallbackMetadata.description,
  };
}

export const dynamic = "force-dynamic";

export default async function OurCampusPage() {
  const [data, ourCampusPage] = await Promise.all([getHomepage(), getOurCampusPage()]);
  const hero = ourCampusPage?.hero;
  const heroTitle = hero?.heading?.title || fallbackHero.title;
  const heroImage = hero?.image || fallbackHero.image;
  const sectionsFeature = ourCampusPage?.sectionsFeature;
  const classroom = ourCampusPage?.classroomSection;
  const library = ourCampusPage?.librarySection;
  const makerspace = ourCampusPage?.makerspaceSection;
  const gym = ourCampusPage?.gymSection;
  const pool = ourCampusPage?.poolSection;

  return (
    <SitePageShell data={data} mainClassName="site-page__main our-campus-page__main" pageClassName="our-campus-page">
      <PageHero
        className="our-campus-hero"
        title={heroTitle}
        image={heroImage}
        titleId="our-campus-hero-title"
        priority
        topLineColor={hero?.topLineColor || fallbackHero.topLineColor}
        panelColor={hero?.panelColor || fallbackHero.panelColor}
        waveColor={hero?.waveColor || fallbackHero.waveColor}
        textColor={hero?.textColor || fallbackHero.textColor}
        imagePosition={hero?.imagePosition || fallbackHero.imagePosition}
        imageWidth={hero?.imageWidth || fallbackHero.imageWidth}
      />
      <CommunityInnerNav activeHref="/our-campus" />

      <section className="campus-intro" aria-labelledby="campus-intro-title">
        <SectionReveal className="campus-intro__inner">
          <h2 id="campus-intro-title" className="campus-intro__title">
            {ourCampusPage?.intro?.heading?.title || "Modern Spaces for Modern Learning"}
          </h2>
          <RichText blocks={ourCampusPage?.intro?.heading?.description} className="campus-intro__body" />
        </SectionReveal>
      </section>

      <CampusVideoSection section={ourCampusPage?.videoSection} />

      {ourCampusPage?.facilities?.image ? (
        <EditorialSplitSection
          id="campus-facilities"
          title={ourCampusPage.facilities.heading?.title || "Facilities"}
          section={ourCampusPage.facilities}
          fallbackImage={ourCampusPage.facilities.image}
          fallbackParagraphs={[]}
          className="campus-facilities-showcase"
          showTitle={Boolean(ourCampusPage.facilities.heading?.title)}
          preserveRichText
        />
      ) : null}

      {sectionsFeature ? (
        <IntroFeatureSection
          className="academics-kg-day-feature campus-feature campus-sections-feature"
          titleId="campus-sections-title"
          {...featureProps(sectionsFeature)}
        />
      ) : null}

      {classroom ? (
        <IntroFeatureSection
          className="academics-kg-day-feature campus-feature campus-classroom-feature"
          titleId="campus-classroom-title"
          {...featureProps(classroom)}
        />
      ) : null}

      {library ? (
        <EditorialSplitSection
          id="campus-library"
          title={library.heading?.title || "The Library"}
          section={{ ...library, imagePosition: "right" }}
          fallbackImage={{}}
          fallbackParagraphs={[]}
          className="campus-split-section campus-library-section"
          imageSizes="(max-width: 767px) calc(100vw - 32px), 44vw"
          preserveRichText
          showTitle
        />
      ) : null}

      {makerspace ? (
        <IntroFeatureSection
          className="academics-kg-day-feature campus-feature campus-makerspace-feature"
          titleId="campus-makerspace-title"
          {...featureProps(makerspace)}
        />
      ) : null}

      {gym ? (
        <EditorialSplitSection
          id="campus-gym"
          title={gym.heading?.title || "Gym"}
          section={{ ...gym, imagePosition: "right" }}
          fallbackImage={{}}
          fallbackParagraphs={[]}
          className="campus-split-section campus-gym-section"
          imageSizes="(max-width: 767px) calc(100vw - 32px), 44vw"
          preserveRichText
          showTitle
        />
      ) : null}

      {pool ? (
        <IntroFeatureSection
          className="academics-kg-day-feature campus-feature campus-pool-feature"
          titleId="campus-pool-title"
          {...featureProps(pool)}
        />
      ) : null}

      <TourIntroSection section={data?.tour} />
      <TourSection section={data?.tour} />
    </SitePageShell>
  );
}
