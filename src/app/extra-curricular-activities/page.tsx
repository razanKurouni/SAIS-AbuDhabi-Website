import type { Metadata } from "next";
import { SitePageShell } from "@/components/layout/site-page-shell";
import { AcademicsApBenefitsSection } from "@/components/sections/academics-ap-benefits-section";
import { AcademicsLearningSliderSection } from "@/components/sections/academics-learning-slider-section";
import { InnerPageNav, type InnerPageNavItem } from "@/components/sections/inner-page-nav";
import { PageHero } from "@/components/sections/page-hero";
import { TourIntroSection } from "@/components/sections/tour-intro-section";
import { TourSection } from "@/components/sections/tour-section";
import { getExtraCurricularActivitiesPage, getHomepage } from "@/lib/sanity";
import { resolveStudentSectionNavItems, studentSectionNavItems } from "@/lib/student-section-navigation";
import type {
  AcademicsApBenefitsSection as AcademicsApBenefitsSectionData,
  AcademicsLearningSliderSection as AcademicsLearningSliderSectionData,
  PortableTextBlock,
} from "@/types/sanity";

const fallbackMetadata: Metadata = {
  title: "Extra Curricular Activities | SAIS - UAQ",
  description: "Explore extracurricular activities at Sharjah American International School.",
};

const fallbackHero = {
  title: "Extra Curricular\nActivities",
  image: {
    url: "/about-values-community.jpg",
    alt: "SAIS - UAQ students participating in extracurricular activities",
  },
  topLineColor: "#216B97",
  panelColor: "#707174",
  waveColor: "#00A5B2",
  textColor: "#ffffff",
  imagePosition: "center",
  imageWidth: "58%",
};

const fallbackInnerNavigation = {
  items: studentSectionNavItems,
  activeHref: "/extra-curricular-activities",
  activeColor: "var(--sais-primary)",
  inactiveColor: "#d97252",
  textColor: "#ffffff",
  dividerColor: "#ffffff",
  topLineColor: "#ffffff",
  ariaLabel: "Student Life page navigation",
} satisfies {
  items: InnerPageNavItem[];
  activeHref: string;
  activeColor: string;
  inactiveColor: string;
  textColor: string;
  dividerColor: string;
  topLineColor: string;
  ariaLabel: string;
};

function paragraph(_key: string, text: string): PortableTextBlock {
  return {
    _key,
    _type: "block",
    children: [{ _key: `${_key}-span`, _type: "span", text }],
  };
}

const fallbackEnrichingIntro: AcademicsApBenefitsSectionData = {
  heading: {
    title: "Enriching Every Student Journey",
    subtitle:
      "Our Extra-Curricular Program enriches students' learning beyond the classroom through a structured range of clubs, sports, arts, and leadership activities offered throughout the school year.",
    description: [
      paragraph(
        "extra-curricular-intro",
        "Students participate in regular sessions, events, and competitions that allow them to explore their interests, develop new skills, and take on leadership roles. Through active engagement, collaboration, and real-life experiences, the program fosters confidence, teamwork, creativity, and personal growth."
      ),
    ],
  },
  cards: [],
  backgroundColor: "#ffffff",
  titleColor: "#216B97",
  subtitleColor: "#00A5B2",
  textColor: "#666B70",
};

const activitySlide = (
  _key: string,
  title: string,
  body: string,
  image: { url: string; alt: string }
) => ({
  _key,
  title,
  body,
  image,
  backgroundColor: "#216B97",
  sideColor: "#00A5B2",
  ringColor: "#D97252",
  titleColor: "#ffffff",
  textColor: "#ffffff",
  imagePosition: "center",
});

const fallbackActivitiesSlider: AcademicsLearningSliderSectionData = {
  heading: {
    title: "",
  },
  slides: [
    activitySlide(
      "music",
      "Music",
      "Our music program invites students to explore the world of sound and rhythm through band, choir, and instrumental lessons. Students develop their musical skills, build confidence in performance, and enjoy opportunities to participate in concerts and school events. Music nurtures creativity, discipline, and a lifelong appreciation for the arts.",
      {
        url: "/about-values-growth.jpg",
        alt: "SAIS - UAQ student playing the violin during a music lesson",
      }
    ),
    activitySlide(
      "sports",
      "Sports",
      "Swimming, badminton, football, and volleyball run throughout the year, with structured training sessions and friendly matches. Students improve their technique and fitness while building the discipline, communication, and teamwork that competitive play asks of them, and represent the school in interschool fixtures.",
      {
        url: "/about-values-community.jpg",
        alt: "SAIS - UAQ students during a sports training session",
      }
    ),
    activitySlide(
      "clubs-and-leadership",
      "Clubs and Leadership",
      "Environmental clubs, public speaking forums, chess, robotics, and student leadership groups give students a place to pursue what interests them and to lead. Members plan their own events, take part in competitions and expos, and learn to organise, collaborate, and speak for their peers with confidence.",
      {
        url: "/about-values-character.jpg",
        alt: "SAIS - UAQ students working together in a school club",
      }
    ),
  ],
};

export async function generateMetadata(): Promise<Metadata> {
  const page = await getExtraCurricularActivitiesPage();

  return {
    title: page?.seo?.title || fallbackMetadata.title,
    description: page?.seo?.description || fallbackMetadata.description,
  };
}

export const dynamic = "force-dynamic";

export default async function ExtraCurricularActivitiesPage() {
  const [data, page] = await Promise.all([getHomepage(), getExtraCurricularActivitiesPage()]);
  const hero = page?.hero;
  const innerNavigation = page?.innerNavigation;
  const innerNavItems = resolveStudentSectionNavItems(innerNavigation?.items);

  return (
    <SitePageShell
      data={data}
      mainClassName="site-page__main extra-curricular-activities-page__main"
      pageClassName="extra-curricular-activities-page"
    >
      <PageHero
        className="extra-curricular-activities-hero"
        title={hero?.heading?.title || fallbackHero.title}
        image={hero?.image || fallbackHero.image}
        titleId="extra-curricular-activities-hero-title"
        priority
        topLineColor={hero?.topLineColor || fallbackHero.topLineColor}
        panelColor={hero?.panelColor || fallbackHero.panelColor}
        waveColor={hero?.waveColor || fallbackHero.waveColor}
        textColor={hero?.textColor || fallbackHero.textColor}
        imagePosition={hero?.imagePosition || fallbackHero.imagePosition}
        imageWidth={hero?.imageWidth || fallbackHero.imageWidth}
      />

      <InnerPageNav
        items={innerNavItems}
        activeHref={fallbackInnerNavigation.activeHref}
        activeColor={innerNavigation?.activeColor || fallbackInnerNavigation.activeColor}
        inactiveColor={innerNavigation?.inactiveColor || fallbackInnerNavigation.inactiveColor}
        textColor={innerNavigation?.textColor || fallbackInnerNavigation.textColor}
        dividerColor={innerNavigation?.dividerColor || fallbackInnerNavigation.dividerColor}
        topLineColor={innerNavigation?.topLineColor || fallbackInnerNavigation.topLineColor}
        className="extra-curricular-activities-inner-nav student-community-inner-nav"
        ariaLabel={innerNavigation?.ariaLabel || fallbackInnerNavigation.ariaLabel}
      />

      <AcademicsApBenefitsSection
        section={page?.enrichingIntro}
        fallbackSection={fallbackEnrichingIntro}
        className="extra-curricular-activities-intro"
        showDescription
      />

      <AcademicsLearningSliderSection
        section={page?.activitiesSlider}
        fallbackSection={fallbackActivitiesSlider}
        className="extra-curricular-activities-slider"
      />

      <TourIntroSection section={data?.tour} />
      <TourSection section={data?.tour} />
    </SitePageShell>
  );
}
