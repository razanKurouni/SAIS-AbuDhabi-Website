import type { Metadata } from "next";
import { SitePageShell } from "@/components/layout/site-page-shell";
import { EditorialSplitSection } from "@/components/sections/editorial-split-section";
import { PageHero } from "@/components/sections/page-hero";
import { CommunityInnerNav } from "@/components/sections/community-inner-nav";
import { TourIntroSection } from "@/components/sections/tour-intro-section";
import { TourSection } from "@/components/sections/tour-section";
import { getFoodServicesNutritionPage, getHomepage } from "@/lib/sanity";
import type { ImageTextSection, PortableTextBlock } from "@/types/sanity";

const fallbackMetadata: Metadata = {
  title: "Food Services & Nutrition | SAIS - Sharjah",
  description: "Learn about food services and nutrition at SAIS - Sharjah.",
};

const fallbackHero = {
  title: "Food\nNutrition",
  image: {
    url: "/contact-campus-building.jpg",
    alt: "SAIS - Sharjah food services and nutrition",
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

function bullet(_key: string, text: string): PortableTextBlock {
  return {
    ...paragraph(_key, text),
    listItem: "bullet",
    level: 1,
  };
}

const fallbackIntroSection: ImageTextSection = {
  heading: {
    title: "School Cafeteria",
    description: [
      paragraph(
        "food-services-intro-1",
        "Our air-conditioned school cafeteria is operated by a registered food and nutrition company that adheres to strict regulations established by:"
      ),
      bullet("food-services-khda", "Strategic Planning and Educational Affairs Authority (SPEA)"),
      bullet("food-services-dubai-municipality", "Dubai Municipality"),
      paragraph(
        "food-services-intro-2",
        "We provide students with high-quality, nutritious food options that fully comply with Islamic dietary requirements. The menu is refreshed annually, incorporating student suggestions whenever possible to ensure both nutritional excellence and student satisfaction."
      ),
    ],
  },
  image: {
    url: "/contact-campus-building.jpg",
    alt: "SAIS - Sharjah cafeteria",
  },
  imagePosition: "center",
  theme: "blue",
};

const fallbackIntroParagraphs = [
  "Our air-conditioned school cafeteria is operated by a registered food and nutrition company that adheres to strict regulations established by the Strategic Planning and Educational Affairs Authority (SPEA) and the municipality.",
  "We provide students with high-quality, nutritious food options that fully comply with Islamic dietary requirements. The menu is refreshed annually, incorporating student suggestions whenever possible to ensure both nutritional excellence and student satisfaction.",
];

export async function generateMetadata(): Promise<Metadata> {
  const page = await getFoodServicesNutritionPage();

  return {
    title: page?.seo?.title || fallbackMetadata.title,
    description: page?.seo?.description || fallbackMetadata.description,
  };
}

export const dynamic = "force-dynamic";

export default async function FoodServicesNutritionPage() {
  const [data, page] = await Promise.all([getHomepage(), getFoodServicesNutritionPage()]);
  const hero = page?.hero;
  const heroTitle = hero?.heading?.title || fallbackHero.title;
  const heroImage = hero?.image || fallbackHero.image;

  return (
    <SitePageShell
      data={data}
      mainClassName="site-page__main food-services-nutrition-page__main"
      pageClassName="food-services-nutrition-page"
    >
      <PageHero
        className="food-services-nutrition-hero"
        title={heroTitle}
        image={heroImage}
        titleId="food-services-nutrition-hero-title"
        priority
        topLineColor={hero?.topLineColor || fallbackHero.topLineColor}
        panelColor={hero?.panelColor || fallbackHero.panelColor}
        waveColor={hero?.waveColor || fallbackHero.waveColor}
        textColor={hero?.textColor || fallbackHero.textColor}
        imagePosition={hero?.imagePosition || fallbackHero.imagePosition}
        imageWidth={hero?.imageWidth || fallbackHero.imageWidth}
      />
      <CommunityInnerNav activeHref="/food-services-nutrition" />

      <EditorialSplitSection
        id="food-services-nutrition-intro"
        title={fallbackIntroSection.heading.title}
        section={page?.introSection}
        fallbackImage={fallbackIntroSection.image || {}}
        fallbackParagraphs={fallbackIntroParagraphs}
        className="food-services-nutrition-intro"
        imageSizes="(max-width: 767px) calc(100vw - 32px), 42vw"
        showTitle
      />

      <TourIntroSection section={data?.tour} />
      <TourSection section={data?.tour} />
    </SitePageShell>
  );
}
