import type { Metadata } from "next";
import { FileCheck2, Landmark, NotebookPen, UsersRound } from "lucide-react";
import { SitePageShell } from "@/components/layout/site-page-shell";
import { AcademicsCurriculumOverviewSection } from "@/components/sections/academics-curriculum-overview-section";
import { AcademicsElementaryAssessmentSection } from "@/components/sections/academics-elementary-assessment-section";
import { AcademicsLearningSliderSection } from "@/components/sections/academics-learning-slider-section";
import { AcademicsSkillsSection } from "@/components/sections/academics-skills-section";
import { AcademicsTeachingCommitmentsSection } from "@/components/sections/academics-teaching-commitments-section";
import { AcademicsKindergartenAssessmentSection } from "@/components/sections/academics-kindergarten-assessment-section";
import { ContactInfoSection } from "@/components/sections/contact-info-section";
import { ApproachSectionBase } from "@/components/sections/approach-section";
import { EditorialSplitSection } from "@/components/sections/editorial-split-section";
import { InnerPageNav } from "@/components/sections/inner-page-nav";
import { IntroFeatureSection } from "@/components/sections/intro-feature-section";
import { PageHero } from "@/components/sections/page-hero";
import { getAcademicsPage, getHomepage } from "@/lib/sanity";
import type {
  AcademicsCurriculumOverviewSection as AcademicsCurriculumOverviewSectionData,
  AcademicsLearningSliderSection as AcademicsLearningSliderSectionData,
  AcademicsSkillsSection as AcademicsSkillsSectionData,
  AcademicsTeachingCommitmentsSection as AcademicsTeachingCommitmentsSectionData,
  AcademicsKindergartenAssessmentSection as AcademicsKindergartenAssessmentSectionData,
  AcademicsKindergartenFeatureSection,
  ContactInfoSection as ContactInfoSectionData,
  ImageTextSection,
  PortableTextBlock,
} from "@/types/sanity";
import { LearningPhasesSection } from "@/components/sections/learning-phases-section";
import { AccreditationsSection } from "@/components/sections/accreditations-section";
import { TourIntroSection } from "@/components/sections/tour-intro-section";
import { TourSection } from "@/components/sections/tour-section";

const fallbackMetadata: Metadata = {
  title: "Academics | SAIS - UAQ",
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
  title: "Academics\nat SAIS - UAQ",
  image: {
    url: "/academics-hero.jpg",
    alt: "SAIS - UAQ students working in a science lab",
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
        "At SAIS - UAQ, our curriculum is driven by a commitment to academic excellence, holistic development, and global readiness. Grounded in internationally recognized American standards - including AERO Common Core and the Next Generation Science Standards - our curriculum ensures that students acquire the knowledge, skills, and dispositions necessary for lifelong learning and success in a rapidly evolving world."
      ),
      paragraph(
        "curriculum-vision",
        "We envision a dynamic, standards-based curriculum that is coherent, vertically and horizontally aligned, and responsive to the diverse needs of our multicultural student body."
      ),
    ],
  },
  image: {
    url: "/academics-curriculum.png",
    alt: "SAIS - UAQ students learning with a microscope",
  },
  imagePosition: "center",
  panelColor: "#00A5B2",
  waveColor: "#d97252",
  textColor: "#ffffff",
  items: [],
};

const fallbackCultureSection: ImageTextSection = {
  heading: {
    title: "Rooted in Culture, Prepared for the World",
    description: [
      paragraph(
        "culture-requirements",
        "In line with the UAE Ministry of Education requirements, we incorporate Arabic Language, Islamic Studies, UAE Social Studies, and Moral Education across all grade levels. This ensures students remain rooted in their cultural identity while embracing global perspectives."
      ),
      paragraph(
        "culture-support",
        "Both native and non-native speakers receive targeted support in Arabic, and Islamic education is offered in both Arabic and English."
      ),
    ],
  },
  image: {
    url: "/images/academics-culture.jpg",
    alt: "SAIS - UAQ students connecting with Emirati culture",
  },
  imagePosition: "center",
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
    alt: "SAIS - UAQ student completing classwork",
  },
  imagePosition: "left",
  backgroundColor: "#ffffff",
  textColor: "#707278",
};

const fallbackSkillsSection: AcademicsSkillsSectionData = {
  heading: {
    title: "Skills and Dispositions",
    description: [
      paragraph(
        "skills-intro",
        "Through purposeful design rooted in intentional planning using the Backward Design Model, we ensure that every unit of study is capstoned with a summative performance task, where students are expected to apply and demonstrate their learning through four Key Skills and four dispositions."
      ),
    ],
  },
  groups: [
    {
      _key: "key-skills",
      title: "Key Skills",
      items: [
        {
          _key: "critical-thinking",
          title: "Critical and\nCreative Thinking",
          icon: { url: "/academics-icon-critical-thinking.png", alt: "" },
          iconType: "critical",
          theme: "teal",
        },
        {
          _key: "communication",
          title: "Communication and Collaboration",
          icon: { url: "/academics-icon-communication.png", alt: "" },
          iconType: "communication",
          theme: "teal",
        },
        {
          _key: "organization",
          title: "Organization and\nSelf-Management",
          icon: { url: "/academics-icon-organization.png", alt: "" },
          iconType: "organization",
          theme: "teal",
        },
        {
          _key: "research",
          title: "Research and\nProblem-Solving",
          icon: { url: "/academics-icon-research.png", alt: "" },
          iconType: "research",
          theme: "teal",
        },
      ],
    },
    {
      _key: "dispositions",
      title: "Dispositions",
      items: [
        {
          _key: "resilience",
          title: "Resilience\nand Adaptability",
          icon: { url: "/academics-icon-resilience.png", alt: "" },
          iconType: "resilience",
          theme: "orange",
        },
        {
          _key: "empathy",
          title: "Empathy",
          icon: { url: "/academics-icon-empathy.png", alt: "" },
          iconType: "empathy",
          theme: "orange",
        },
        {
          _key: "curiosity",
          title: "Curiosity",
          icon: { url: "/academics-icon-curiosity.png", alt: "" },
          iconType: "curiosity",
          theme: "orange",
        },
        {
          _key: "growth",
          title: "Growth Mindset",
          icon: { url: "/academics-icon-growth-mindset.png", alt: "" },
          iconType: "growth",
          theme: "orange",
        },
      ],
    },
  ],
};

const fallbackCurriculumOverviewSection: Omit<Required<AcademicsCurriculumOverviewSectionData>, "secondBlock"> = {
  heading: {
    title: "",
  },
  backgroundColor: "#ffffff",
  titleColor: "var(--sais-primary)",
  textColor: "#666b70",
  firstBlock: {
    heading: {
      title: "Our Curriculum",
      description: [
        paragraph(
          "overview-curriculum-1",
          "Our Curriculum is designed to ensure students' experience is active and skills-focused, rigorous, and aligned with clearly defined outcomes. Our approach integrates 21st-century competencies, active and interactive learning, and real-world applications, encouraging students to become critical thinkers, creative problem-solvers, effective communicators, and compassionate global citizens."
        ),
        paragraph(
          "overview-curriculum-2",
          "With robust student support systems, differentiated instruction, and meaningful and varied assessment practices, we aim to meet each learner where they are while guiding them to where they need to be."
        ),
      ],
    },
    image: {
      url: "/academics-hero.jpg",
      alt: "SAIS - UAQ students working on a STEM project",
    },
    imagePosition: "right",
  },
};

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
        alt: "SAIS - UAQ student during CAT4 assessment",
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
        alt: "SAIS - UAQ students working with a teacher in a science lab",
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
        alt: "SAIS - UAQ students reading together",
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
        alt: "SAIS - UAQ students reading a book",
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

const fallbackTestingExcellenceSection: Required<AcademicsKindergartenFeatureSection> = {
  heading: { title: "" },
  image: {},
  imageSide: "right",
  imagePosition: "center",
  backgroundColor: "#ffffff",
  panelColor: "#6F7175",
  waveColor: "#D97252",
  titleColor: "#ffffff",
  textColor: "#ffffff",
};

const fallbackCareerGuidanceSection: Required<AcademicsKindergartenFeatureSection> = {
  heading: { title: "" },
  image: {},
  imageSide: "right",
  imagePosition: "center",
  backgroundColor: "#ffffff",
  panelColor: "#6F7175",
  waveColor: "#00A5B2",
  titleColor: "#ffffff",
  textColor: "#ffffff",
};

export default async function AcademicsPage() {
  const [data, academicsPage] = await Promise.all([getHomepage(), getAcademicsPage()]);
  const careerGuidanceDetail = academicsPage?.careerGuidanceDetailSection;
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

      <ApproachSectionBase
        id="academics-culture"
        title={academicsPage?.cultureSection?.heading?.title || fallbackCultureSection.heading?.title}
        lead={academicsPage?.cultureSection?.heading?.title || fallbackCultureSection.heading?.title}
        className="approach-section--governance academics-culture-section"
        content={academicsPage?.cultureSection?.heading?.description || fallbackCultureSection.heading?.description}
        image={academicsPage?.cultureSection?.image?.url ? academicsPage.cultureSection.image : fallbackCultureSection.image}
        imageSizes="(max-width: 767px) calc(100vw - 32px), 42vw"
        showTitle={false}
        naturalImage
      />

      <EditorialSplitSection
        id="academics-steam"
        title={academicsPage?.steamSection?.heading?.title || fallbackSteamSection.heading?.title || "STEAM Integration"}
        section={academicsPage?.steamSection}
        fallbackImage={fallbackSteamSection.image!}
        fallbackParagraphs={[
          "A strong emphasis is placed on STEAM integration (Science, Technology, Engineering, Arts, Mathematics), project-based learning, and interdisciplinary teaching approaches that promote creativity, collaboration, and independent inquiry.",
          "Digital literacy and responsible citizenship are embedded throughout the curriculum, supported by the use of educational technology platforms and personalized learning tools.",
        ]}
        className="academics-steam-section"
        preserveRichText
      />

      <AcademicsElementaryAssessmentSection
        section={academicsPage?.careerGuidanceSection}
        fallbackSection={fallbackCareerGuidanceSection}
        className="academics-career-guidance-section academics-middle-school-tailored-section"
        imageSide="right"
        titleId="academics-career-guidance-title"
      />

      {careerGuidanceDetail ? (
        <IntroFeatureSection
          className="academics-career-guidance-detail-section"
          titleId="academics-career-guidance-detail-title"
          section={{ heading: careerGuidanceDetail.heading || { title: "" }, image: careerGuidanceDetail.image }}
          fallbackSection={{ heading: { title: "" }, image: {} }}
          panelColor={careerGuidanceDetail.panelColor || "#D97252"}
          accentColor={careerGuidanceDetail.waveColor || "#216B97"}
          titleColor={careerGuidanceDetail.titleColor || "#ffffff"}
          textColor={careerGuidanceDetail.textColor || "#ffffff"}
          imagePosition={careerGuidanceDetail.imagePosition || "center"}
        />
      ) : null}

      {academicsPage?.careerGuidanceOutreachSection ? (
        <EditorialSplitSection
          id="academics-career-guidance-outreach"
          title="Career and Guidance Counseling – Universities"
          section={academicsPage.careerGuidanceOutreachSection}
          fallbackImage={{}}
          fallbackParagraphs={[]}
          className="academics-steam-section academics-career-guidance-outreach-section"
          preserveRichText
        />
      ) : null}

      <AcademicsSkillsSection
        section={academicsPage?.skillsSection}
        fallbackSection={fallbackSkillsSection}
      />

      <AcademicsCurriculumOverviewSection
        section={academicsPage?.curriculumOverviewSection}
        fallbackSection={fallbackCurriculumOverviewSection}
      />

      {academicsPage?.curriculumOverviewSection?.secondBlock ? (
        <EditorialSplitSection
          id="academics-curriculum-second"
          title="Curriculum at SAIS - UAQ"
          section={academicsPage.curriculumOverviewSection.secondBlock}
          fallbackImage={{}}
          fallbackParagraphs={[]}
          className="academics-steam-section academics-curriculum-second-section"
          preserveRichText
        />
      ) : null}

      <AcademicsElementaryAssessmentSection
        section={academicsPage?.testingExcellenceSection}
        fallbackSection={fallbackTestingExcellenceSection}
        className="academics-testing-excellence-section academics-middle-school-tailored-section"
        imageSide="right"
        titleId="academics-testing-excellence-title"
      />

      {academicsPage?.stemProgramSection ? (
        <EditorialSplitSection
          id="academics-stem-program"
          title="Our STEM Program"
          section={academicsPage.stemProgramSection}
          fallbackImage={{}}
          fallbackParagraphs={[]}
          className="academics-steam-section academics-stem-program-section"
          preserveRichText
          showTitle
        />
      ) : null}

      <AcademicsTeachingCommitmentsSection
        section={academicsPage?.teachingCommitmentsSection}
        fallbackSection={fallbackTeachingCommitmentsSection}
      />

      <AcademicsLearningSliderSection
        section={academicsPage?.learningSliderSection}
        fallbackSection={fallbackLearningSliderSection}
      />

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
