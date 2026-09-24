import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { SitePageShell } from "@/components/layout/site-page-shell";
import { AcademicsElementaryAssessmentSection } from "@/components/sections/academics-elementary-assessment-section";
import { ContactInfoSection } from "@/components/sections/contact-info-section";
import { EditorialSplitSection } from "@/components/sections/editorial-split-section";
import { InnerPageNav, type InnerPageNavItem } from "@/components/sections/inner-page-nav";
import { PageHero } from "@/components/sections/page-hero";
import { getHomepage, getStudentLifePage } from "@/lib/sanity";
import { resolveStudentSectionNavItems, studentSectionNavItems } from "@/lib/student-section-navigation";
import type {
  AcademicsKindergartenFeatureSection,
  ContactInfoSection as ContactInfoSectionData,
  ImageTextSection,
  PortableTextBlock,
} from "@/types/sanity";
import { TourIntroSection } from "@/components/sections/tour-intro-section";
import { TourSection } from "@/components/sections/tour-section";
import { RichText } from "@/components/ui/rich-text";

const fallbackMetadata: Metadata = {
  title: "Student Life | SAIS - UAQ",
  description: "Explore student life at Sharjah American International School.",
};

const fallbackInnerNavigation = {
  items: studentSectionNavItems,
  activeHref: "/student-life",
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

const fallbackHero = {
  title: "Student\nLife",
  image: {
    url: "/about-values-community.jpg",
    alt: "SAIS - UAQ students enjoying school life",
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

const fallbackBeyondClassroomIntro = {
  heading: {
    title: "Beyond the Classroom:",
    accentTitle: "Voices, Visions, and Ventures",
    description: [
      paragraph(
        "student-life-beyond-intro",
        "Student life is dynamic, inclusive, and intentionally designed to inspire leadership, creativity, and personal growth. Beyond academics, students are actively engaged in a wide range of enriching activities that help shape their confidence, character, and sense of belonging."
      ),
    ],
  },
  backgroundColor: "#ffffff",
  titleColor: "#00A5B2",
  accentColor: "#00A5B2",
  textColor: "#216B97",
};

const fallbackSgaSection: ContactInfoSectionData = {
  heading: {
    title: "The High School Student\nGovernment Association (SGA)",
    description: [
      paragraph(
        "student-life-sga-role",
        "The High School Student Government Association (SGA) serves as the voice of the student body and a vital bridge between students and school leadership. Composed of elected student leaders from Grades 9 to 12, the SGA plays a central role in representing student interests, promoting school spirit, organizing events, and leading service initiatives."
      ),
      paragraph(
        "student-life-sga-members",
        "Members of the SGA work collaboratively to foster a positive school environment, plan meaningful activities, and advocate for improvements that benefit the entire student community. Through teamwork, communication, and dedication, the SGA exemplifies leadership in action and inspires peers to become active, responsible members of the SAIS family."
      ),
    ],
  },
  image: {
    url: "/about-statement-mission.jpg",
    alt: "SAIS - UAQ student government association meeting",
  },
  items: [],
  imagePosition: "center",
  panelColor: "#00A5B2",
  waveColor: "#D97252",
  titleColor: "#ffffff",
  textColor: "#ffffff",
};

const fallbackStudentCongressSection: ImageTextSection = {
  heading: {
    title: "Student Congress Mission and Vision",
    description: [
      paragraph("student-life-congress-mission-label", "Mission", true),
      paragraph(
        "student-life-congress-mission",
        "The SAIS - UAQ Student Congress strives to enhance collaboration between Student Leadership Associations by creating effective pathways for leadership groups to accomplish their objectives and fulfill their agendas."
      ),
      paragraph("student-life-congress-vision-label", "Vision", true),
      paragraph(
        "student-life-congress-vision",
        "We are dedicated to promoting student wellbeing and ensuring student voices are heard at all levels of the school hierarchy. The Congress demonstrates the power of teamwork and integrity throughout."
      ),
    ],
  },
  image: {
    url: "/about-intro-students.jpg",
    alt: "SAIS - UAQ student presenting to the Student Congress",
  },
  imagePosition: "right",
  backgroundColor: "#F2F2F2",
  textColor: "#666B70",
};

const fallbackProgramsSection: ImageTextSection = {
  heading: {
    title: "Programs and Activities",
    description: [
      paragraph(
        "student-life-programs-1",
        "Students participate in a wide array of programs including environmental clubs, public speaking forums, chess clubs, and TED Talks, where they learn to express ideas that inspire change. Performers and artists take the spotlight during SAIS Got Talent, celebrating creativity and individuality across all grade levels."
      ),
      paragraph(
        "student-life-programs-2",
        "Athletic teams in basketball and football build discipline and school spirit, while the robotics program, science expos, and leadership forums empower students to solve problems, innovate, and lead with impact."
      ),
      paragraph(
        "student-life-programs-3",
        "Whether leading, competing, performing, or inventing, SAIS students are encouraged to pursue their passions and embrace every opportunity. Our student life is not just an extension of learning, it's where voices are heard, visions are shaped, and ventures take flight."
      ),
    ],
  },
  image: {
    url: "/sais-hero-students.jpg",
    alt: "SAIS - UAQ students in their varsity jackets on campus",
  },
  imagePosition: "right",
  backgroundColor: "#ffffff",
  titleColor: "#00A5B2",
  textColor: "#666B70",
};

const fallbackMiniSgaSection: Required<AcademicsKindergartenFeatureSection> = {
  heading: { title: "" },
  image: {},
  imageSide: "left",
  imagePosition: "center",
  backgroundColor: "#ffffff",
  panelColor: "#6F7175",
  waveColor: "#00A5B2",
  titleColor: "#ffffff",
  textColor: "#ffffff",
};

export async function generateMetadata(): Promise<Metadata> {
  const page = await getStudentLifePage();

  return {
    title: page?.seo?.title || fallbackMetadata.title,
    description: page?.seo?.description || fallbackMetadata.description,
  };
}

export const dynamic = "force-dynamic";

export default async function StudentLifePage() {
  const [data, page] = await Promise.all([getHomepage(), getStudentLifePage()]);
  const hero = page?.hero;
  const innerNavigation = page?.innerNavigation;
  const innerNavItems = resolveStudentSectionNavItems(innerNavigation?.items);
  const beyondIntro = page?.beyondClassroomIntro || fallbackBeyondClassroomIntro;

  return (
    <SitePageShell data={data} mainClassName="site-page__main student-life-page__main" pageClassName="student-life-page">
      <PageHero
        className="student-life-hero"
        title={hero?.heading?.title || fallbackHero.title}
        image={hero?.image || fallbackHero.image}
        titleId="student-life-hero-title"
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
        className="student-life-inner-nav student-community-inner-nav"
        ariaLabel={innerNavigation?.ariaLabel || fallbackInnerNavigation.ariaLabel}
      />

      <section
        id="student-life"
        className="student-life-overview student-life-beyond"
        aria-labelledby="student-life-beyond-title"
        style={{
          "--student-life-overview-bg": beyondIntro.backgroundColor || fallbackBeyondClassroomIntro.backgroundColor,
          "--student-life-overview-title": beyondIntro.titleColor || fallbackBeyondClassroomIntro.titleColor,
          "--student-life-overview-accent": beyondIntro.accentColor || fallbackBeyondClassroomIntro.accentColor,
          "--student-life-overview-text": beyondIntro.textColor || fallbackBeyondClassroomIntro.textColor,
        } as CSSProperties}
      >
        <div className="student-life-overview__inner">
          <h2 id="student-life-beyond-title" className="student-life-overview__title">
            {beyondIntro.heading?.title || fallbackBeyondClassroomIntro.heading.title}
            {beyondIntro.heading?.accentTitle ? (
              <>
                <br />
                <span className="student-life-overview__accent">{beyondIntro.heading.accentTitle}</span>
              </>
            ) : null}
          </h2>
          <div className="student-life-overview__body">
            <RichText
              blocks={beyondIntro.heading?.description?.length ? beyondIntro.heading.description : fallbackBeyondClassroomIntro.heading.description}
              className="student-life-overview__copy"
            />
          </div>
        </div>
      </section>

      <ContactInfoSection
        section={page?.sgaSection}
        fallbackSection={fallbackSgaSection}
        className="student-life-sga-section"
        titleId="student-life-sga-title"
        ariaLabel="High School Student Government Association"
      />

      <EditorialSplitSection
        id="student-life-congress"
        title={fallbackStudentCongressSection.heading.title}
        section={{
          ...page?.studentCongressSection,
          heading: page?.studentCongressSection?.heading ?? fallbackStudentCongressSection.heading,
          imagePosition:
            page?.studentCongressSection?.imagePosition || fallbackStudentCongressSection.imagePosition,
          backgroundColor:
            page?.studentCongressSection?.backgroundColor || fallbackStudentCongressSection.backgroundColor,
          textColor: page?.studentCongressSection?.textColor || fallbackStudentCongressSection.textColor,
        }}
        fallbackImage={fallbackStudentCongressSection.image || {}}
        fallbackParagraphs={[]}
        className="editorial-split-listed student-life-congress"
        imageSizes="(max-width: 767px) calc(100vw - 32px), 42vw"
        preserveRichText
      />

      <AcademicsElementaryAssessmentSection
        section={page?.miniSgaSection}
        fallbackSection={fallbackMiniSgaSection}
        className="student-life-learning-feature academics-middle-school-tailored-section"
        imageSide="left"
        titleId="student-life-mini-sga-title"
      />

      <EditorialSplitSection
        id="student-life-programs"
        title={fallbackProgramsSection.heading.title}
        section={{
          ...page?.programsSection,
          heading: page?.programsSection?.heading ?? fallbackProgramsSection.heading,
          imagePosition: page?.programsSection?.imagePosition || fallbackProgramsSection.imagePosition,
          backgroundColor:
            page?.programsSection?.backgroundColor || fallbackProgramsSection.backgroundColor,
          textColor: page?.programsSection?.textColor || fallbackProgramsSection.textColor,
        }}
        fallbackImage={fallbackProgramsSection.image || {}}
        fallbackParagraphs={[]}
        className="editorial-split-listed student-life-programs"
        imageSizes="(max-width: 767px) calc(100vw - 32px), 42vw"
        showTitle
        preserveRichText
      />

      <TourIntroSection  section={data?.tour} />
      <TourSection  section={data?.tour} />
    </SitePageShell>
  );
}
