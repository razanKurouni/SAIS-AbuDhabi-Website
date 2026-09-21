import type { Metadata } from "next";
import { SitePageShell } from "@/components/layout/site-page-shell";
import { AcademicsApBenefitsSection } from "@/components/sections/academics-ap-benefits-section";
import { AcademicsElementaryAssessmentSection } from "@/components/sections/academics-elementary-assessment-section";
import { AcademicsLearningSliderSection } from "@/components/sections/academics-learning-slider-section";
import { AcademicsSupportProgramsSliderSection } from "@/components/sections/academics-support-programs-slider-section";
import { EditorialSplitSection } from "@/components/sections/editorial-split-section";
import { IntroFeatureSection } from "@/components/sections/intro-feature-section";
import { InnerPageNav, type InnerPageNavItem } from "@/components/sections/inner-page-nav";
import { LearningPhasesSection } from "@/components/sections/learning-phases-section";
import { PageHero } from "@/components/sections/page-hero";
import { TourIntroSection } from "@/components/sections/tour-intro-section";
import { TourSection } from "@/components/sections/tour-section";
import { SectionHeading } from "@/components/ui/section-heading";
import { getAcademicsHighSchoolPage, getHomepage } from "@/lib/sanity";
import type {
  AcademicsApBenefitsSection as AcademicsApBenefitsSectionData,
  AcademicsKindergartenFeatureSection,
  AcademicsLearningSliderSection as AcademicsLearningSliderSectionData,
  AcademicsSupportProgramsSection,
  ImageTextSection,
  InnerNavigationItem,
  PortableTextBlock,
  SectionHeading as SectionHeadingData,
} from "@/types/sanity";

const fallbackMetadata: Metadata = {
  title: "High School | Academics | SAIS - Sharjah",
  description: "Explore High School academics at Sharjah American International School.",
};

export async function generateMetadata(): Promise<Metadata> {
  const highSchoolPage = await getAcademicsHighSchoolPage();
  return {
    title: highSchoolPage?.seo?.title || fallbackMetadata.title,
    description: highSchoolPage?.seo?.description || fallbackMetadata.description,
  };
}

export const dynamic = "force-dynamic";

const fallbackInnerNavigation = {
  items: [
    { label: "Overview", href: "/academics" },
    { label: "Kindergarten", href: "/academics/kindergarten" },
    { label: "Elementary", href: "/academics/elementary" },
    { label: "Middle School", href: "/academics/middle-school" },
    { label: "High School", href: "/academics/high-school" },
  ],
  activeHref: "/academics/high-school",
  activeColor: "#00A5B2",
  inactiveColor: "var(--sais-primary)",
  textColor: "#ffffff",
  dividerColor: "#ffffff",
  topLineColor: "#ffffff",
  ariaLabel: "Academics page navigation",
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

const fallbackHero = {
  eyebrow: "Academics",
  title: "High School",
  image: {
    url: "/academics-high-school-hero.jpg",
    alt: "SAIS - Sharjah high school students in a science lab",
  },
  topLineColor: "var(--sais-primary)",
  panelColor: "var(--sais-gray)",
  waveColor: "var(--sais-accent)",
  textColor: "#ffffff",
  imagePosition: "center",
  imageWidth: "60%",
};

function paragraph(_key: string, text: string): PortableTextBlock {
  return {
    _key,
    _type: "block",
    children: [{ _key: `${_key}-span`, _type: "span", text }],
  };
}

function resolveInnerNavItems(items?: InnerNavigationItem[]): InnerPageNavItem[] {
  return (
    items?.flatMap((item) => {
      if (!item.label || !item.href) return [];
      return [{ label: item.label, href: item.href, openInNewTab: item.openInNewTab }];
    }) || []
  );
}

const fallbackOverviewSection: ImageTextSection = {
  heading: {
    title: "Freedom to Explore,\nGuidance to Grow",
    description: [
      paragraph(
        "hs-overview-1",
        "In Grades 9 through 12, students experience increased autonomy and agency in their learning journey."
      ),
      paragraph(
        "hs-overview-2",
        "At SAIS - Sharjah, students have access to a wide range of choice and elective courses, allowing them to tailor their learning pathways to align with their interests, aspirations, and career goals. Pedagogical approaches in these grades are designed to respond to the diverse priorities and dynamics of student choice. Teachers employ a student-centered approach that encourages inquiry, critical thinking, and creativity, while also providing guidance and support to help students navigate their academic pursuits."
      ),
    ],
  },
  image: {
    url: "/academics-high-school-overview.jpg",
    alt: "SAIS - Sharjah high school students doing a science experiment",
  },
  imagePosition: "right",
  theme: "light",
  backgroundColor: "var(--sais-primary)",
  titleColor: "var(--sais-accent)",
  textColor: "var(--sais-body-text-color-on-dark)",
};

const fallbackExcellenceSection: Required<AcademicsKindergartenFeatureSection> = {
  heading: {
    title: "Building Confident,\nFuture-Ready Graduates",
    description: [
      paragraph(
        "hs-excellence",
        "Project-based learning, collaborative projects, and real-world applications of learning are emphasized, empowering students to take ownership of their education and become active participants in their learning process. Through a combination of personalized support, rigorous academic experiences, and opportunities for exploration and self-expression, students in Grades 9-12 develop the skills, knowledge, and dispositions needed to succeed in college, careers, and beyond."
      ),
    ],
  },
  image: {
    url: "/academics-high-school-excellence.jpg",
    alt: "SAIS - Sharjah high school student painting a model in class",
  },
  imageSide: "left",
  imagePosition: "center",
  backgroundColor: "#ffffff",
  panelColor: "var(--sais-accent)",
  waveColor: "var(--sais-primary)",
  titleColor: "#ffffff",
  textColor: "#ffffff",
};

const fallbackCareerGuidanceSection: Required<AcademicsKindergartenFeatureSection> = {
  heading: {
    title: "Career Guidance",
    description: [
      paragraph(
        "hs-career-1",
        "Career guidance empowers students to make informed, careful, and personalized choices for higher education and career readiness. Our program supports students in academic planning, course selection, goal setting, career exploration, soft-skills development and post-secondary transition, including admissions processes and financial responsibilities."
      ),
      paragraph(
        "hs-career-2",
        "Our Career Guidance curriculum develops higher education and career readiness through these key themes:"
      ),
    ],
  },
  image: {
    url: "/academics-high-school-career.jpg",
    alt: "SAIS - Sharjah high school student reading a college brochure",
  },
  imageSide: "right",
  imagePosition: "center",
  backgroundColor: "#6F7175",
  panelColor: "#6F7175",
  waveColor: "#216B97",
  titleColor: "#00A5B2",
  textColor: "#ffffff",
};

const fallbackCurriculumSection: ImageTextSection = {
  heading: {
    title: "The Curriculum",
    description: [
      paragraph(
        "hs-curriculum",
        "High School (Grades 9–12): The curriculum enables the students to pursue a personalized pathway. Advanced Placement (AP) courses, elective options, and career guidance prepare students for university and beyond. College and career readiness, entrepreneurship, interdisciplinary learning, and leadership programs define our high school model."
      ),
    ],
  },
  image: {
    url: "/academics-high-school-curriculum.jpg",
    alt: "SAIS - Sharjah high school students raising hands in class",
  },
  imagePosition: "right",
};


const fallbackPathwaysSection: Required<AcademicsKindergartenFeatureSection> = {
  heading: {
    title: "Shaping Confident\nFuture Pathways",
    description: [
      paragraph(
        "hs-pathways-1",
        "Our Career and Guidance program is designed to support students in making informed and confident decisions about their future."
      ),
      paragraph(
        "hs-pathways-2",
        "We provide personalized guidance, reliable resources, and meaningful opportunities that help students understand their strengths, explore career pathways, and navigate university options."
      ),
    ],
  },
  image: {
    url: "https://cdn.sanity.io/images/uwffig4f/sais-sharjah/ca7fcf0fc83f77f9374465abfdb00fe8c4fb8a1d-1560x1252.jpg",
    alt: "SAIS - Sharjah high school students receiving career guidance",
  },
  imageSide: "left",
  imagePosition: "center",
  backgroundColor: "#ffffff",
  panelColor: "#00A5B2",
  waveColor: "#df7150",
  titleColor: "#ffffff",
  textColor: "#ffffff",
};

const fallbackPathwaysSlider: AcademicsLearningSliderSectionData = {
  heading: { title: "" },
  slides: [
    {
      _key: "slide-science",
      title: "Science and Engineering Pathway",
      body: "Students in this pathway solve problems, develop new technologies, and drive innovation. This rigorous college preparatory curriculum focuses on advanced mathematics and science, preparing students for university-level work.\n\nParticipants apply essential math and science content in real-world contexts. Career possibilities range from science and math educators to laboratory technicians to NASA astronauts",
      backgroundColor: "#00A5B2",
      sideColor: "#216B97",
      ringColor: "#d97252",
      textColor: "#ffffff",
    },
  ],
};

const fallbackPathwaysDetailsSection: ImageTextSection = {
  heading: {
    title: "High School Pathways Details",
    description: [
      paragraph(
        "hs-pathways-details-health",
        "For those interested in health-related professions, the Health and Life Sciences Pathway focuses on biology, chemistry, and anatomy, laying the groundwork for careers in healthcare, nursing, and environmental science."
      ),
      paragraph(
        "hs-pathways-details-options",
        "Students with a creative flair may pursue the Creative Arts and Design Pathway, which nurtures talent in visual arts, digital media, design thinking, and communication. Those who are drawn to social change, culture, or public service can follow the Humanities and Social Sciences Pathway, which emphasizes global studies, psychology, history, and law. We also offer a Career Readiness and Life Skills Pathway, supporting students of determination and those seeking practical, vocational, and functional life skills that lead to employment and independence. Lastly, the Advanced Placement (AP) Pathway offers high-achieving students the chance to challenge themselves with college-level courses and exams across multiple subjects, earning university credit and academic distinction."
      ),
    ],
  },
  image: {
    url: "https://cdn.sanity.io/images/uwffig4f/sais-sharjah/ca7fcf0fc83f77f9374465abfdb00fe8c4fb8a1d-1560x1252.jpg",
    alt: "SAIS - Sharjah high school students playing football",
  },
  imagePosition: "right",
  theme: "light",
  backgroundColor: "#ffffff",
  textColor: "#666b70",
};

const fallbackCareerGuidanceIntroSection: SectionHeadingData = {
  title: "Career Guidance",
  subtitle:
    "Our Career and University Guidance Department plays a vital role in preparing students for life beyond high school.",
  description: [
    paragraph(
      "hs-career-guidance-intro",
      "We are committed to helping every student discover their strengths, explore opportunities, and make informed decisions about their future academic and professional paths."
    ),
  ],
};

const fallbackApDiplomaSection: ImageTextSection = {
  heading: {
    title: "Advanced Placement (AP) Diploma",
    description: [
      paragraph("hs-ap-1", "Advanced Placement (AP) is a College Board program that allows high school students to take courses that can earn college credits and/or qualify them for advanced university classes. AP courses are weighted (1.25) provided students achieve qualifying scores on the respective College Board Exam."),
      paragraph("hs-ap-2", "AP classes are optional. All enrolled students must sit for the College Board AP exam and cover the cost of required resources and exams."),
    ],
  },
  image: { url: "/academics-high-school-ap-diploma.jpg", alt: "SAIS - Sharjah high school students in AP class" },
  imagePosition: "right",
  backgroundColor: "#ffffff",
  titleColor: "var(--sais-primary)",
  textColor: "#666b70",
};

const fallbackApOverviewSection: ImageTextSection = {
  heading: {
    title: "Advanced Placement Courses Overview",
    description: [
      {
        ...paragraph(
          "hs-ap-overview-lead",
          "Advanced Placement courses, developed by the College Board, are globally recognized for their rigor and relevance. At SAIS, AP courses:"
        ),
        children: [
          {
            _key: "hs-ap-overview-lead-span",
            _type: "span",
            marks: ["strong"],
            text: "Advanced Placement courses, developed by the College Board, are globally recognized for their rigor and relevance. At SAIS, AP courses:",
          },
        ],
      },
      ...[
        "Develop critical thinking, analytical writing, and time management skills.",
        "Enhance student transcripts and strengthen college applications.",
        "Offer the opportunity to earn university credit while still in high school.",
        "Prepare students for academic success in higher education and beyond.",
        "Align with international standards and support the UAE’s National Agenda goals for academic achievement.",
      ].map((text, index) => ({
        ...paragraph(`hs-ap-overview-${index + 1}`, text),
        listItem: "bullet" as const,
        level: 1,
      })),
    ],
  },
  image: {
    url: "/academics-high-school-ap-overview.png",
    alt: "SAIS - Sharjah high school students learning with a Van de Graaff generator",
  },
  imagePosition: "left",
  theme: "light",
  backgroundColor: "#ffffff",
  textColor: "#6f7175",
};

const fallbackApSupportSection: Required<AcademicsKindergartenFeatureSection> = {
  heading: {
    title: "AP Courses Support",
    description: [
      {
        ...paragraph("hs-ap-support-lead", "AP courses are supported by:"),
        children: [
          {
            _key: "hs-ap-support-lead-span",
            _type: "span",
            marks: ["strong"],
            text: "AP courses are supported by:",
          },
        ],
      },
      ...[
        "Qualified AP-certified teachers with strong subject expertise",
        "Academic advising to help students choose the right AP pathway",
        "Access to digital AP resources and College Board tools",
        "SAT, TOEFL, and IELTS preparation to complement college readiness",
        "Alignment with our University and Career Counseling Program",
      ].map((text, index) => ({
        ...paragraph(`hs-ap-support-${index + 1}`, text),
        listItem: "bullet" as const,
        level: 1,
      })),
      paragraph(
        "hs-ap-support-outcome",
        "With the combination of the American High School Diploma and AP courses and exams, SAIS graduates are well-prepared for entry into universities in the USA, UK, Europe, Canada, the UAE, and beyond."
      ),
    ],
  },
  image: {
    url: "/academics-high-school-ap-support.png",
    alt: "SAIS - Sharjah high school student discussing future university pathways",
  },
  imageSide: "right",
  imagePosition: "center",
  backgroundColor: "#27779d",
  panelColor: "#27779d",
  waveColor: "#00a5b2",
  titleColor: "#ffffff",
  textColor: "#ffffff",
};

const fallbackApBenefitsSection: AcademicsApBenefitsSectionData = {
  heading: {
    title: "Benefits of AP Courses",
    subtitle: "SAIS - Sharjah offers a range of AP courses to challenge and prepare students for higher education:",
  },
  backgroundColor: "#00A5B2",
  titleColor: "#ffffff",
  subtitleColor: "#ffffff",
  cardIconColor: "#d97252",
  cardTitleColor: "#216B97",
  cardTextColor: "#666b70",
  cards: [
    { _key: "benefit-admission", title: "Stand Out In The Admission Process", description: "AP coursework signals to admissions officers that a student is capable of rigorous, college-level work, strengthening their application." },
    { _key: "benefit-learning", title: "College-Level Learning", description: "Understand that meaningful learning occurs when students engage in critical thinking." },
    { _key: "benefit-recognition", title: "Global Recognition", description: "Emphasize the importance of effort and persistence in achievement." },
    { _key: "benefit-savings", title: "Cost Savings", description: "Most colleges and universities worldwide grant credit and/or placement for qualifying AP exam scores." },
    { _key: "benefit-advantage", title: "Academic Advantage", description: "AP students typically achieve higher college GPAs." },
    { _key: "benefit-scholarship", title: "Scholarship Opportunities", description: "AP participation may increase eligibility for certain scholarships." },
  ],
};

const fallbackApCoursesSection: AcademicsSupportProgramsSection = {
  heading: {
    title: "Advanced Placement (AP) Courses",
    subtitle: "We offer a range of AP courses to challenge and prepare students for higher education:",
  },
  backgroundColor: "#f0f2f5",
  titleColor: "var(--sais-primary)",
  cardBorderColor: "var(--sais-primary)",
  cardHoverBorderColor: "var(--sais-accent)",
  cardTextColor: "var(--sais-primary)",
  cards: [
    {
      _key: "ap-sciences",
      title: "Sciences",
      description: "• AP Biology\n• AP Chemistry\n• AP Physics 1\n• AP Physics 2\n• AP Environmental Science",
      icon: {
        url: "https://cdn.sanity.io/images/uwffig4f/production/13fea8ba757b35d1b8ac92800f9bf5e7976e1be6-316x343.png",
        alt: "Sciences",
      },
    },
    {
      _key: "ap-mathematics",
      title: "Mathematics",
      description: "• AP Calculus AB\n• AP Calculus BC\n• AP Statistics",
      icon: {
        url: "https://cdn.sanity.io/images/uwffig4f/production/8476f05afb48fe1eb6750b4579bc52bd9188bc7a-339x333.png",
        alt: "Mathematics",
      },
    },
    {
      _key: "ap-english",
      title: "English",
      description: "• AP English Language and Composition\n• AP English Literature and Composition",
      icon: {
        url: "https://cdn.sanity.io/images/uwffig4f/production/855a97810cf27ddcb4c3c8c044d82987702e5c5e-430x346.png",
        alt: "English",
      },
    },
    {
      _key: "ap-social-sciences",
      title: "Social Sciences",
      description: "• AP Psychology",
      icon: {
        url: "https://cdn.sanity.io/images/uwffig4f/production/a3e5f5c78671f99cd75c32c6682fd2ec17ae0e09-373x343.png",
        alt: "Social Sciences",
      },
    },
    {
      _key: "ap-advanced-sciences",
      title: "Advanced Sciences",
      description: "• AP Physics C: Mechanics\n• AP Physics C: Electricity and Magnetism",
      icon: {
        url: "https://cdn.sanity.io/images/uwffig4f/production/3e8f50c0f00d78be7590e9e41b4440a4d576245a-252x333.png",
        alt: "Advanced Sciences",
      },
    },
  ],
};

export default async function AcademicsHighSchoolPage() {
  const [data, highSchoolPage] = await Promise.all([getHomepage(), getAcademicsHighSchoolPage()]);

  const hero = highSchoolPage?.hero;
  const innerNavigation = highSchoolPage?.innerNavigation;
  const innerNavItems = resolveInnerNavItems(innerNavigation?.items);

  const overviewSection: ImageTextSection = {
    ...fallbackOverviewSection,
    ...highSchoolPage?.overviewSection,
    heading: highSchoolPage?.overviewSection?.heading || fallbackOverviewSection.heading,
    image: highSchoolPage?.overviewSection?.image || fallbackOverviewSection.image,
    imagePosition: "right",
    /* The section is a dark band; a light text colour is the only readable one. */
    titleColor: fallbackOverviewSection.titleColor,
    textColor: fallbackOverviewSection.textColor,
  };

  const excellenceSection = highSchoolPage?.excellenceSection || fallbackExcellenceSection;
  const excellenceIntroSection: ImageTextSection = {
    heading: excellenceSection.heading || fallbackExcellenceSection.heading,
    image: excellenceSection.image || fallbackExcellenceSection.image,
    imagePosition: "left",
    theme: "blue",
  };

  const curriculumSection: ImageTextSection = {
    ...fallbackCurriculumSection,
    ...highSchoolPage?.curriculumSection,
    heading: highSchoolPage?.curriculumSection?.heading || fallbackCurriculumSection.heading,
    image: highSchoolPage?.curriculumSection?.image || fallbackCurriculumSection.image,
    imagePosition: "right",
  };

  const careerGuidanceSection = highSchoolPage?.careerGuidanceSection || fallbackCareerGuidanceSection;

  const pathwaysSection = highSchoolPage?.pathwaysSection || fallbackPathwaysSection;
  const pathwaysIntroSection: ImageTextSection = {
    heading: pathwaysSection.heading || fallbackPathwaysSection.heading,
    image: pathwaysSection.image || fallbackPathwaysSection.image,
    imagePosition: "left",
    theme: "teal",
  };

  const storedPathwaysSlider = highSchoolPage?.pathwaysSliderSection || fallbackPathwaysSlider;
  /* The Career Guidance heading sits directly above this slider, so the slider
     runs without a title of its own, whatever the Studio still holds. */
  const pathwaysSlider = {
    ...storedPathwaysSlider,
    heading: { ...storedPathwaysSlider.heading, title: "" },
  };
  const pathwaysDetailsSection: ImageTextSection = {
    ...fallbackPathwaysDetailsSection,
    ...highSchoolPage?.pathwaysDetailsSection,
    heading: highSchoolPage?.pathwaysDetailsSection?.heading || fallbackPathwaysDetailsSection.heading,
    image: highSchoolPage?.pathwaysDetailsSection?.image || fallbackPathwaysDetailsSection.image,
    imagePosition: "right",
  };

  const apDiplomaSection: ImageTextSection = {
    ...fallbackApDiplomaSection,
    ...highSchoolPage?.apDiplomaSection,
    heading: highSchoolPage?.apDiplomaSection?.heading || fallbackApDiplomaSection.heading,
    image: highSchoolPage?.apDiplomaSection?.image || fallbackApDiplomaSection.image,
    imagePosition: "right",
  };

  const apOverviewSection: ImageTextSection = {
    ...fallbackApOverviewSection,
    ...highSchoolPage?.apOverviewSection,
    heading: highSchoolPage?.apOverviewSection?.heading || fallbackApOverviewSection.heading,
    image: highSchoolPage?.apOverviewSection?.image || fallbackApOverviewSection.image,
    imagePosition: "left",
  };

  const apSupportSection = highSchoolPage?.apSupportSection || fallbackApSupportSection;

  const apCoursesSection = highSchoolPage?.apCoursesSection || fallbackApCoursesSection;
  const apBenefitsSection = highSchoolPage?.apBenefitsSection || fallbackApBenefitsSection;

  return (
    <SitePageShell
      data={data}
      mainClassName="site-page__main academics-high-school-page__main"
      pageClassName="academics-high-school-page"
    >
      <PageHero
        className="academics-high-school-hero"
        title={hero?.heading?.title || fallbackHero.title}
        image={hero?.image || fallbackHero.image}
        eyebrow={hero?.heading?.eyebrow || fallbackHero.eyebrow}
        titleId="academics-high-school-hero-title"
        priority
        topLineColor={hero?.topLineColor || fallbackHero.topLineColor}
        panelColor={hero?.panelColor || fallbackHero.panelColor}
        waveColor={hero?.waveColor || fallbackHero.waveColor}
        textColor={hero?.textColor || fallbackHero.textColor}
        imagePosition={hero?.imagePosition || fallbackHero.imagePosition}
        imageWidth={hero?.imageWidth || fallbackHero.imageWidth}
      />

      <InnerPageNav
        items={innerNavItems.length ? innerNavItems : fallbackInnerNavigation.items}
        activeHref={innerNavigation?.activeHref || fallbackInnerNavigation.activeHref}
        activeColor={innerNavigation?.activeColor || fallbackInnerNavigation.activeColor}
        inactiveColor={innerNavigation?.inactiveColor || fallbackInnerNavigation.inactiveColor}
        textColor={innerNavigation?.textColor || fallbackInnerNavigation.textColor}
        dividerColor={innerNavigation?.dividerColor || fallbackInnerNavigation.dividerColor}
        topLineColor={innerNavigation?.topLineColor || fallbackInnerNavigation.topLineColor}
        className="academics-inner-nav"
        ariaLabel={innerNavigation?.ariaLabel || fallbackInnerNavigation.ariaLabel}
      />

      <EditorialSplitSection
        id="academics-high-school-overview"
        title="Freedom to Explore, Guidance to Grow"
        section={overviewSection}
        fallbackImage={fallbackOverviewSection.image || {}}
        fallbackParagraphs={[]}
        className="academics-high-school-overview-section"
        imageSizes="(max-width: 767px) calc(100vw - 32px), 44vw"
        showTitle
      />

      <IntroFeatureSection
        className="academics-high-school-excellence-feature"
        titleId="academics-high-school-excellence-title"
        section={excellenceIntroSection}
        fallbackSection={{
          heading: fallbackExcellenceSection.heading,
          image: fallbackExcellenceSection.image,
          imagePosition: "left",
          theme: "blue",
        }}
        panelColor={excellenceSection.panelColor || fallbackExcellenceSection.panelColor}
        accentColor={excellenceSection.waveColor || fallbackExcellenceSection.waveColor}
        titleColor={excellenceSection.titleColor || fallbackExcellenceSection.titleColor}
        textColor={excellenceSection.textColor || fallbackExcellenceSection.textColor}
        imagePosition={excellenceSection.imageSide || fallbackExcellenceSection.imageSide}
      />

      <EditorialSplitSection
        id="academics-high-school-curriculum"
        title="The Curriculum"
        section={{ ...curriculumSection, imagePosition: "right" }}
        fallbackImage={fallbackCurriculumSection.image || {}}
        fallbackParagraphs={[]}
        className="academics-high-school-curriculum-section"
        imageSizes="(max-width: 767px) calc(100vw - 32px), 42vw"
        showTitle={false}
      />

      <AcademicsElementaryAssessmentSection
        section={careerGuidanceSection}
        fallbackSection={fallbackCareerGuidanceSection}
        className="academics-high-school-pathways-feature academics-middle-school-tailored-section"
        imageSide="left"
        titleId="academics-high-school-pathways-title"
      />

      
      <EditorialSplitSection
        id="academics-high-school-pathways-details"
        title="High School Pathways Details"
        section={pathwaysDetailsSection}
        fallbackImage={fallbackPathwaysDetailsSection.image || {}}
        fallbackParagraphs={[]}
        className="academics-high-school-pathways-section"
        imageSizes="(max-width: 767px) calc(100vw - 32px), 44vw"
        showTitle={false}
      />

      <IntroFeatureSection
      
        className="academics-elementary-curriculum-feature academics-high-school-future-pathways-feature grey"
        titleId="academics-high-school-future-pathways-title"
        section={pathwaysIntroSection}
        fallbackSection={{
          heading: fallbackPathwaysSection.heading,
          image: fallbackPathwaysSection.image,
          imagePosition: "left",
          theme: "teal",
        }}
        panelColor={pathwaysSection.panelColor || fallbackPathwaysSection.panelColor}
        accentColor={pathwaysSection.waveColor || fallbackPathwaysSection.waveColor}
        titleColor={pathwaysSection.titleColor || fallbackPathwaysSection.titleColor}
        textColor={pathwaysSection.textColor || fallbackPathwaysSection.textColor}
        imagePosition={pathwaysSection.imagePosition || fallbackPathwaysSection.imagePosition}
      />

      <section
        className="academics-high-school-career-guidance-center bg-[#f4f4f4] px-[7.5%] py-14 md:py-16"
        aria-labelledby="academics-high-school-career-guidance-intro-title"
      >
        <SectionHeading
          heading={highSchoolPage?.careerGuidanceIntroSection || fallbackCareerGuidanceIntroSection}
          titleId="academics-high-school-career-guidance-intro-title"
          align="center"
          className="mx-auto max-w-[760px]"
          titleClassName="text-[1.75rem] font-semibold leading-tight text-[#216B97] md:text-[2rem]"
          subtitleClassName="mx-auto mt-7 max-w-[690px] text-[1.05rem] font-semibold leading-[1.55] text-[#216B97]"
          descriptionClassName="mx-auto mt-7 max-w-[650px] text-[1.05rem] leading-[1.55] text-[#6F7175]"
        />
      </section>

      <AcademicsLearningSliderSection
        section={pathwaysSlider}
        fallbackSection={fallbackPathwaysSlider}
        className="academics-high-school-pathways-slider"
      />

      <EditorialSplitSection
        id="academics-high-school-ap-diploma"
        title="Advanced Placement (AP) Diploma"
        section={apDiplomaSection}
        fallbackImage={fallbackApDiplomaSection.image || {}}
        fallbackParagraphs={[]}
        className="academics-high-school-ap-diploma-section"
        imageSizes="(max-width: 767px) calc(100vw - 32px), 44vw"
        showTitle
      />

      <EditorialSplitSection
        id="academics-high-school-ap-overview"
        title="Advanced Placement Courses Overview"
        section={apOverviewSection}
        fallbackImage={fallbackApOverviewSection.image || {}}
        fallbackParagraphs={[]}
        className="academics-high-school-pathways-section"
        imageSizes="(max-width: 767px) calc(100vw - 32px), 44vw"
        showTitle={false}
        preserveRichText
      />

      <AcademicsElementaryAssessmentSection
        section={apSupportSection}
        fallbackSection={fallbackApSupportSection}
        className="academics-high-school-ap-support-section"
        imageSide="right"
        titleId="academics-high-school-ap-support-title"
        showTitle={false}
      />

      <AcademicsSupportProgramsSliderSection
        section={apCoursesSection}
        fallbackSection={fallbackApCoursesSection}
        className="academics-high-school-ap-courses"
      />

      <AcademicsApBenefitsSection
        section={apBenefitsSection}
        fallbackSection={fallbackApBenefitsSection}
        className="academics-high-school-ap-benefits"
      />

      <LearningPhasesSection section={data?.learningPhases} excludeTitle="High School" />
      <TourIntroSection section={data?.tour} />
      <TourSection section={data?.tour} />
    </SitePageShell>
  );
}
