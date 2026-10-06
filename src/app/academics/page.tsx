import type { Metadata } from "next";
import { FileCheck2, Landmark, NotebookPen, UsersRound } from "lucide-react";
import { SitePageShell } from "@/components/layout/site-page-shell";
import { AcademicsLearningSliderSection } from "@/components/sections/academics-learning-slider-section";
import { AcademicsSupportProgramsSliderSection } from "@/components/sections/academics-support-programs-slider-section";
import { AcademicsTeachingCommitmentsSection } from "@/components/sections/academics-teaching-commitments-section";
import { AcademicsKindergartenAssessmentSection } from "@/components/sections/academics-kindergarten-assessment-section";
import { ContactInfoSection } from "@/components/sections/contact-info-section";
import { EditorialSplitSection } from "@/components/sections/editorial-split-section";
import { InnerPageNav } from "@/components/sections/inner-page-nav";
import { IntroFeatureSection } from "@/components/sections/intro-feature-section";
import { PageHero } from "@/components/sections/page-hero";
import { getAcademicsPage, getHomepage } from "@/lib/sanity";
import type {
  AcademicsLearningSliderSection as AcademicsLearningSliderSectionData,
  AcademicsSupportProgramsSection as AcademicsSupportProgramsSectionData,
  AcademicsTeachingCommitmentsSection as AcademicsTeachingCommitmentsSectionData,
  AcademicsKindergartenAssessmentSection as AcademicsKindergartenAssessmentSectionData,
  ContactInfoSection as ContactInfoSectionData,
  ImageTextSection,
  PortableTextBlock,
} from "@/types/sanity";
import { LearningPhasesSection } from "@/components/sections/learning-phases-section";
import { AccreditationsSection } from "@/components/sections/accreditations-section";
import { TourIntroSection } from "@/components/sections/tour-intro-section";
import { TourSection } from "@/components/sections/tour-section";

const fallbackMetadata: Metadata = {
  title: "Academics | SAIS - Abu Dhabi",
  description: "Explore academics at Sharjah American International School.",
};

export async function generateMetadata(): Promise<Metadata> {
  const academicsPage = await getAcademicsPage();

  return {
    title: academicsPage?.seo?.title || fallbackMetadata.title,
    description: academicsPage?.seo?.description || fallbackMetadata.description,
  };
}

export const dynamic = "force-dynamic";

const fallbackHero = {
  title: "Academics\nat SAIS - Abu Dhabi",
  image: {
    url: "/academics-hero.jpg",
    alt: "SAIS - Abu Dhabi students working in a science lab",
  },
  topLineColor: "var(--sais-primary)",
  panelColor: "#707174",
  waveColor: "var(--sais-accent)",
  textColor: "#ffffff",
  imagePosition: "center",
  imageWidth: "60%",
};

const academicsInnerNavItems = [
  { label: "Overview", href: "/academics" },
  { label: "Kindergarten", href: "/academics/kindergarten" },
  { label: "Elementary", href: "/academics/elementary" },
  { label: "Middle School", href: "/academics/middle-school" },
  { label: "High School", href: "/academics/high-school" },
];

function paragraph(_key: string, text: string): PortableTextBlock {
  return {
    _key,
    _type: "block",
    children: [{ _key: `${_key}-span`, _type: "span", text }],
  };
}

const fallbackCurriculumSection: ContactInfoSectionData = {
  heading: {
    title: "Our Curriculum\nPhilosophy and Vision",
    description: [
      paragraph(
        "curriculum-overview",
        "At SAIS - Abu Dhabi, our curriculum is driven by a commitment to academic excellence, holistic development, and global readiness. Grounded in internationally recognized American standards - including AERO Common Core and the Next Generation Science Standards - our curriculum ensures that students acquire the knowledge, skills, and dispositions necessary for lifelong learning and success in a rapidly evolving world."
      ),
      paragraph(
        "curriculum-vision",
        "We envision a dynamic, standards-based curriculum that is coherent, vertically and horizontally aligned, and responsive to the diverse needs of our multicultural student body."
      ),
    ],
  },
  image: {
    url: "/academics-curriculum.png",
    alt: "SAIS - Abu Dhabi students learning with a microscope",
  },
  imagePosition: "center",
  panelColor: "#00A5B2",
  waveColor: "#d97252",
  textColor: "#ffffff",
  items: [],
};


const fallbackSteamSection: ImageTextSection = {
  heading: {
    title: "STEAM Integration",
    description: [
      paragraph(
        "steam-integration",
        "A strong emphasis is placed on STEAM integration (Science, Technology, Engineering, Arts, Mathematics), project-based learning, and interdisciplinary teaching approaches that promote creativity, collaboration, and independent inquiry."
      ),
      paragraph(
        "digital-literacy",
        "Digital literacy and responsible citizenship are embedded throughout the curriculum, supported by the use of educational technology platforms and personalized learning tools."
      ),
    ],
  },
  image: {
    url: "/images/academics-steam.jpg",
    alt: "SAIS - Abu Dhabi student completing classwork",
  },
  imagePosition: "left",
  backgroundColor: "#ffffff",
  textColor: "#707278",
};



const fallbackSupportProgramsSection: AcademicsSupportProgramsSectionData = { heading: { title: "" }, cards: [] };

const fallbackTeachingCommitmentsSection: AcademicsTeachingCommitmentsSectionData = {
  heading: {
    title: "Our Teaching Commitments",
  },
  cards: [
    {
      _key: "high-expectations",
      title: "High Expectations",
      description: "Maintain high expectations for every student",
      iconType: "expectations",
    },
    {
      _key: "engagement",
      title: "Engagement",
      description: "Understand that meaningful learning occurs when students engage in critical thinking",
      iconType: "engagement",
    },
    {
      _key: "achievement",
      title: "Achievement",
      description: "Emphasize the importance of effort and persistence in achievement",
      iconType: "achievement",
    },
  ],
};

const fallbackLearningSliderSection: AcademicsLearningSliderSectionData = {
  heading: {
    title: "Understanding Student Learning",
  },
  slides: [
    {
      _key: "cat4-assessment",
      title: "CAT4 Assessment",
      body:
        "The Cognitive Abilities Test (CAT4) helps us understand how students learn and their academic potential. Students in Grades 3-9 take this assessment upon enrollment to identify their learning styles, enabling teachers to:\n\n- Adapt teaching approaches and materials\n- Adjust instructional pace and emphasis\n- Implement differentiated instruction\n\nCAT4 measures four types of reasoning:\n\n- Verbal Reasoning - Understanding and reasoning through words\n- Quantitative Reasoning - Using numerical skills for problem-solving\n- Non-verbal Reasoning - Problem-solving using visual information\n- Spatial Ability - Thinking and drawing conclusions in three dimensions",
      image: {
        url: "/academics-learning-cat4.png",
        alt: "SAIS - Abu Dhabi student during CAT4 assessment",
      },
      backgroundColor: "#d97252",
      sideColor: "#00A5B2",
      ringColor: "var(--sais-primary)",
      textColor: "#ffffff",
      imagePosition: "center",
    },
    {
      _key: "nwea-map-testing",
      title: "NWEA MAP Testing",
      body:
        "Students in Grades 3-9 participate in MAP testing three times throughout the academic year. These computer-adaptive assessments:\n\n- Produce accurate data about each student's learning level\n- Identify areas of strength and opportunity\n- Measure overall performance in core subjects",
      image: {
        url: "/academics-learning-map.png",
        alt: "SAIS - Abu Dhabi students working with a teacher in a science lab",
      },
      backgroundColor: "var(--sais-primary)",
      sideColor: "#00A5B2",
      ringColor: "#d97252",
      textColor: "#ffffff",
      imagePosition: "center",
    },
    {
      _key: "ibt-arabic-testing",
      title: "IBT Arabic Testing",
      body:
        "To benchmark Arabic language proficiency against international standards, our students participate in IBT Arabic examinations conducted by ACER. This assessment provides valuable comparative data on student performance relative to peers in the region and worldwide.",
      image: {
        url: "/academics-learning-ibt.png",
        alt: "SAIS - Abu Dhabi students reading together",
      },
      backgroundColor: "#d97252",
      sideColor: "#00A5B2",
      ringColor: "var(--sais-primary)",
      textColor: "#ffffff",
      imagePosition: "center",
    },
    {
      _key: "ngrt-testing",
      title: "NGRT Testing",
      body:
        "The New Group Reading Test (NGRT) measures reading skills against national averages. This standardized assessment evaluates:\n\n- Phonics knowledge\n- Reading comprehension\n- Decoding ability\n- Vocabulary development\n- Grammatical understanding\n- Deduction and inference skills\n- Understanding of figurative and idiomatic language",
      image: {
        url: "/academics-learning-ngrt.png",
        alt: "SAIS - Abu Dhabi students reading a book",
      },
      backgroundColor: "var(--sais-primary)",
      sideColor: "#00A5B2",
      ringColor: "#d97252",
      textColor: "#ffffff",
      imagePosition: "center",
    },
  ],
};

const fallbackAssessmentProtocolSection: AcademicsKindergartenAssessmentSectionData = {
  heading: {
    title: "Assessment Protocol",
    description: [
      paragraph(
        "assessment-protocol-intro",
        "We implement four categories of assessment to comprehensively evaluate student progress:"
      ),
    ],
  },
  cards: [
    {
      _key: "formative-ongoing",
      title: "Formative/Ongoing\nAssessment",
      description: "Maintain high expectations\nfor every student",
    },
    {
      _key: "formative-quizzes",
      title: "Formative\nQuizzes",
      description: "Short-form assessments\nof understanding",
    },
    {
      _key: "summative-assessment",
      title: "Summative\nAssessment",
      description: "Quizzes, tests,\nexaminations",
    },
    {
      _key: "external-assessment",
      title: "External\nAssessment",
      description: "MAP, CAT4, PSAT, SAT,\nArabic IBT",
    },
  ],
  backgroundColor: "#ffffff",
  titleColor: "var(--sais-primary)",
  textColor: "#707278",
  cardTextColor: "var(--sais-primary)",
  cardBorderColor: "var(--sais-primary)",
  cardHoverBorderColor: "#df7150",
};



export default async function AcademicsPage() {
  const [data, academicsPage] = await Promise.all([getHomepage(), getAcademicsPage()]);
  const inclusionFeature = academicsPage?.inclusionFeatureSection;
  const academicsHero = academicsPage?.hero;
  const heroTitle = academicsHero?.heading?.title || fallbackHero.title;
  const heroImage = academicsHero?.image || fallbackHero.image;

  return (
    <SitePageShell
      data={data}
      mainClassName="site-page__main academics-page__main"
      pageClassName="academics-page"
    >
      <PageHero
        className="academics-hero"
        title={heroTitle}
        image={heroImage}
        eyebrow={academicsHero?.heading?.eyebrow}
        titleId="academics-hero-title"
        priority
        topLineColor={academicsHero?.topLineColor || fallbackHero.topLineColor}
        panelColor={academicsHero?.panelColor || fallbackHero.panelColor}
        waveColor={academicsHero?.waveColor || fallbackHero.waveColor}
        textColor={academicsHero?.textColor || fallbackHero.textColor}
        imagePosition={academicsHero?.imagePosition || fallbackHero.imagePosition}
        imageWidth={academicsHero?.imageWidth || fallbackHero.imageWidth}
      />

      <InnerPageNav
        items={academicsInnerNavItems}
        activeHref="/academics"
        activeColor="#00A5B2"
        inactiveColor="var(--sais-primary)"
        textColor="#ffffff"
        dividerColor="#ffffff"
        topLineColor="#ffffff"
        className="academics-inner-nav"
        ariaLabel="Academics page navigation"
      />

      <ContactInfoSection
        className="academics-curriculum-section"
        section={academicsPage?.curriculumSection}
        fallbackSection={fallbackCurriculumSection}
        titleId="academics-curriculum-title"
      />

      <AcademicsTeachingCommitmentsSection
        section={academicsPage?.teachingCommitmentsSection}
        fallbackSection={fallbackTeachingCommitmentsSection}
      />

      <AcademicsLearningSliderSection
        section={academicsPage?.learningSliderSection}
        fallbackSection={fallbackLearningSliderSection}
      />

      <EditorialSplitSection
        id="academics-steam"
        title={academicsPage?.steamSection?.heading?.title || fallbackSteamSection.heading?.title || "STEAM"}
        section={academicsPage?.steamSection}
        fallbackImage={fallbackSteamSection.image!}
        fallbackParagraphs={[
          "A strong emphasis is placed on STEAM integration (Science, Technology, Engineering, Arts, Mathematics), project-based learning, and interdisciplinary teaching approaches that promote creativity, collaboration, and independent inquiry.",
        ]}
        className="academics-steam-section"
        preserveRichText
        showTitle
      />

      {academicsPage?.inclusionSection ? (
        <EditorialSplitSection
          id="academics-inclusion"
          title={academicsPage.inclusionSection.heading?.title || "Inclusion and Support"}
          section={academicsPage.inclusionSection}
          fallbackImage={{}}
          fallbackParagraphs={[]}
          className="academics-steam-section academics-inclusion-section"
          preserveRichText
          showTitle
        />
      ) : null}

      {inclusionFeature ? (
        <IntroFeatureSection
          className="academics-inclusion-feature-section"
          titleId="academics-inclusion-feature-title"
          section={{ heading: inclusionFeature.heading || { title: "" }, image: inclusionFeature.image }}
          fallbackSection={{ heading: { title: "" }, image: {} }}
          panelColor={inclusionFeature.panelColor || "#216B97"}
          accentColor={inclusionFeature.waveColor || "#D97252"}
          titleColor={inclusionFeature.titleColor || "#ffffff"}
          textColor={inclusionFeature.textColor || "#ffffff"}
          imagePosition={inclusionFeature.imagePosition || "center"}
        />
      ) : null}

      {academicsPage?.supportProgramsSection ? (
        <AcademicsSupportProgramsSliderSection
          section={academicsPage.supportProgramsSection}
          fallbackSection={fallbackSupportProgramsSection}
          className="academics-overview-support-programs"
          autoplayIntervalMs={3200}
          visibleCounts={{ desktop: 2, tablet: 2, mobile: 1 }}
          fallbackIconNames={["presentation", "eye", "sparkles", "handshake", "heart"]}
        />
      ) : null}

      <AcademicsKindergartenAssessmentSection
        section={academicsPage?.assessmentProtocolSection}
        fallbackSection={fallbackAssessmentProtocolSection}
        className="academics-assessment-protocol"
        titleId="academics-assessment-protocol-title"
        fallbackIcons={[FileCheck2, NotebookPen, UsersRound, Landmark]}
      />

      <LearningPhasesSection section={data?.learningPhases} />
      <AccreditationsSection section={data?.accreditations} />
      <TourIntroSection section={data?.tour} />
      <TourSection section={data?.tour} />
    </SitePageShell>
    
  );
}
