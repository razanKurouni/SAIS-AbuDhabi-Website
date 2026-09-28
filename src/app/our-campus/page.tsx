import type { Metadata } from "next";
import { SitePageShell } from "@/components/layout/site-page-shell";
import { CampusVideoSection } from "@/components/sections/campus-video-section";
import { EditorialSplitSection } from "@/components/sections/editorial-split-section";
import { PageHero } from "@/components/sections/page-hero";
import { CommunityInnerNav } from "@/components/sections/community-inner-nav";
import { RichText } from "@/components/ui/rich-text";
import { SectionReveal } from "@/components/ui/section-reveal";
import { getHomepage, getOurCampusPage } from "@/lib/sanity";
import type { ImageTextSection, PortableTextBlock } from "@/types/sanity";
import { TourSection } from "@/components/sections/tour-section";
import { TourIntroSection } from "@/components/sections/tour-intro-section";
import { IntroFeatureSection } from "@/components/sections/intro-feature-section";

const fallbackMetadata: Metadata = {
  title: "Our Campus | SAIS - UAQ",
  description: "Explore SAIS - UAQ's modern campus, facilities, learning spaces, and sports environments.",
};

const fallbackHero = {
  title: "Our\nCampus",
  image: {
    url: "/contact-campus-building.jpg",
    alt: "SAIS - UAQ campus",
  },
  topLineColor: "#d97252",
  panelColor: "#216B97",
  waveColor: "#00A5B2",
  textColor: "#ffffff",
  imagePosition: "center",
  imageWidth: "58%",
};

function paragraph(_key: string, text: string, strong = false): PortableTextBlock {
  return {
    _key,
    _type: "block",
    children: [{ _key: `${_key}-span`, _type: "span", text, marks: strong ? ["strong"] : [] }],
  };
}

function bullet(_key: string, text: string): PortableTextBlock {
  return {
    _key,
    _type: "block",
    listItem: "bullet",
    children: [{ _key: `${_key}-span`, _type: "span", text }],
  };
}

const fallbackElementaryLibrary: ImageTextSection = {
  heading: {
    title: "Elementary School Library",
    description: [
      paragraph(
        "elementary-library-intro",
        "A welcoming and engaging space designed to spark curiosity and build a strong foundation in reading."
      ),
      paragraph("elementary-library-offers", "The Library offers:", true),
      bullet("elementary-library-1", "Age-appropriate fiction and non-fiction books"),
      bullet("elementary-library-2", "Interactive storytelling sessions and read-alouds"),
      bullet("elementary-library-3", "Visual aids, early learning games, and leveled readers"),
      bullet(
        "elementary-library-4",
        "Weekly library lessons integrated into the curriculum to develop reading habits and research basics"
      ),
    ],
  },
  image: {
    url: "/about-intro-students.jpg",
    alt: "SAIS - UAQ elementary students reading together",
  },
  imagePosition: "right",
  titleColor: "#00A5B2",
};

/* The slider takes plain text and turns "• " lines into a list, so keep the bullets as bullets. */
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
          showTitle
          preserveRichText
        />
      ) : null}
      {ourCampusPage?.librarySection?.image ? (
        <IntroFeatureSection
          section={ourCampusPage.librarySection}
          className="campus-library-feature"
          titleId="campus-library-title"
          panelColor="var(--sais-primary)"
          accentColor="var(--sais-coral)"
          titleColor="var(--sais-body-text-color-on-dark)"
          textColor="var(--sais-body-text-color-on-dark)"
        />
      ) : null}
      <EditorialSplitSection
        id="campus-elementary-library"
        title={fallbackElementaryLibrary.heading.title}
        section={{
          ...ourCampusPage?.elementaryLibrarySection,
          heading:
            ourCampusPage?.elementaryLibrarySection?.heading ?? fallbackElementaryLibrary.heading,
          imagePosition:
            ourCampusPage?.elementaryLibrarySection?.imagePosition ||
            fallbackElementaryLibrary.imagePosition,
          titleColor:
            ourCampusPage?.elementaryLibrarySection?.titleColor ||
            fallbackElementaryLibrary.titleColor,
        }}
        fallbackImage={fallbackElementaryLibrary.image || {}}
        fallbackParagraphs={[]}
        className="editorial-split-listed"
        imageSizes="(max-width: 767px) calc(100vw - 32px), 42vw"
        showTitle
        preserveRichText
      />

      <TourIntroSection section={data?.tour} />
      <TourSection section={data?.tour} />
    </SitePageShell>
  );
}
