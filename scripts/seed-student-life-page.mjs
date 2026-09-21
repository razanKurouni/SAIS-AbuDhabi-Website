import fs from "node:fs";
import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "uwffig4f",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "sais-uaq",
  apiVersion: "2023-01-01",
  token: process.env.SANITY_AUTH_TOKEN,
  useCdn: false,
});

if (!process.env.SANITY_AUTH_TOKEN) {
  throw new Error("SANITY_AUTH_TOKEN is required to seed the Student Life page.");
}

const imageSources = {
  hero: {
    path: "/Users/razan/Documents/GitHub/SAIS-Homepage-/public/about-values-community.jpg",
    filename: "student-life-hero.jpg",
    title: "SAIS - Sharjah students enjoying student life",
  },
  sga: {
    path: "public/student-life-sga.jpg",
    filename: "student-life-sga.jpg",
    title: "SAIS - Sharjah student government association meeting",
  },
  sgaShowcase: {
    path: "public/student-life-sga-emblem.png",
    filename: "student-life-sga-emblem.png",
    title: "SAIS - Sharjah Student Government Association emblem",
  },
  congress: {
    path: "public/student-life-congress.jpg",
    filename: "student-life-congress.jpg",
    title: "SAIS - Sharjah student presenting to the Student Congress",
  },
  programs: {
    path: "public/student-life-programs.jpg",
    filename: "student-life-programs.jpg",
    title: "SAIS - Sharjah students in their varsity jackets on campus",
  },
  miniSga: {
    path: "public/student-life-mini-sga.jpg",
    filename: "student-life-mini-sga.jpg",
    title: "SAIS - Sharjah elementary students walking through the school corridor",
  },
};

async function uploadImage({ path, filename, title }) {
  if (!fs.existsSync(path)) {
    return null;
  }

  const asset = await client.assets.upload("image", fs.createReadStream(path), {
    filename,
    title,
  });

  return {
    _type: "imageWithAlt",
    image: {
      _type: "image",
      asset: {
        _type: "reference",
        _ref: asset._id,
      },
    },
    alt: title,
  };
}

function block(key, text, options = {}) {
  return {
    _key: key,
    _type: "block",
    style: "normal",
    markDefs: [],
    children: [
      {
        _key: `${key}-text`,
        _type: "span",
        text,
        marks: options.strong ? ["strong"] : [],
      },
    ],
  };
}

const uploadedImages = Object.fromEntries(
  await Promise.all(
    Object.entries(imageSources).map(async ([key, source]) => [key, await uploadImage(source)])
  )
);

const existingPage = await client.getDocument("student-life-page").catch(() => null);
const heroImage = uploadedImages.hero || existingPage?.hero?.image;

await client.createOrReplace({
  _id: "student-life-page",
  _type: "studentLifePage",
  seo: existingPage?.seo || {
    _type: "seo",
    title: "Student Life | SAIS - Sharjah",
    description: "Explore student life, programs, and extracurricular opportunities at SAIS - Sharjah.",
    ...(heroImage ? { image: heroImage } : {}),
  },
  hero: {
    _type: "object",
    heading: {
      _type: "sectionHeading",
      title: "Student\nLife",
    },
    ...(heroImage ? { image: heroImage } : {}),
    topLineColor: "#d97252",
    panelColor: "#216B97",
    waveColor: "#00A5B2",
    textColor: "#ffffff",
    imagePosition: "center",
    imageWidth: "58%",
  },
  innerNavigation: {
    _type: "object",
    items: [
      { _key: "student-life", _type: "object", label: "Student Life", href: "/student-life", openInNewTab: false },
      { _key: "student-programs", _type: "object", label: "Student Programs", href: "/student-programs", openInNewTab: false },
      {
        _key: "extra-curricular-activities",
        _type: "object",
        label: "Extra Curricular Activities",
        href: "#extra-curricular-activities",
        openInNewTab: false,
      },
    ],
    activeHref: "/student-life",
    activeColor: "#216B97",
    inactiveColor: "#d97252",
    textColor: "#ffffff",
    dividerColor: "#ffffff",
    topLineColor: "#ffffff",
    ariaLabel: "Student Life page navigation",
  },
  beyondClassroomIntro: {
    _type: "object",
    heading: {
      _type: "sectionHeading",
      title: "Beyond the Classroom:",
      accentTitle: "Voices, Visions, and Ventures",
      description: [
        block(
          "student-life-beyond-intro",
          "Student life is dynamic, inclusive, and intentionally designed to inspire leadership, creativity, and personal growth. Beyond academics, students are actively engaged in a wide range of enriching activities that help shape their confidence, character, and sense of belonging."
        ),
      ],
    },
    backgroundColor: "#ffffff",
    titleColor: "#00A5B2",
    accentColor: "#00A5B2",
    textColor: "#216B97",
  },
  sgaSection: {
    _type: "object",
    heading: {
      _type: "sectionHeading",
      title: "The High School Student\nGovernment Association (SGA)",
      description: [
        block(
          "student-life-sga-role",
          "The High School Student Government Association (SGA) serves as the voice of the student body and a vital bridge between students and school leadership. Composed of elected student leaders from Grades 9 to 12, the SGA plays a central role in representing student interests, promoting school spirit, organizing events, and leading service initiatives."
        ),
        block(
          "student-life-sga-members",
          "Members of the SGA work collaboratively to foster a positive school environment, plan meaningful activities, and advocate for improvements that benefit the entire student community. Through teamwork, communication, and dedication, the SGA exemplifies leadership in action and inspires peers to become active, responsible members of the SAIS family."
        ),
      ],
    },
    ...(uploadedImages.sga ? { image: uploadedImages.sga } : existingPage?.sgaSection?.image ? { image: existingPage.sgaSection.image } : {}),
    imagePosition: "center",
    panelColor: "#00A5B2",
    waveColor: "#D97252",
    titleColor: "#ffffff",
    textColor: "#ffffff",
  },
  studentCongressSection: {
    _type: "object",
    heading: {
      _type: "sectionHeading",
      title: "Student Congress Mission and Vision",
      description: [
        block("student-life-congress-mission-label", "Mission", { strong: true }),
        block(
          "student-life-congress-mission",
          "The SAIS - Sharjah Student Congress strives to enhance collaboration between Student Leadership Associations by creating effective pathways for leadership groups to accomplish their objectives and fulfill their agendas."
        ),
        block("student-life-congress-vision-label", "Vision", { strong: true }),
        block(
          "student-life-congress-vision",
          "We are dedicated to promoting student wellbeing and ensuring student voices are heard at all levels of the school hierarchy. The Congress demonstrates the power of teamwork and integrity throughout."
        ),
      ],
    },
    ...(uploadedImages.congress
      ? { image: uploadedImages.congress }
      : existingPage?.studentCongressSection?.image
        ? { image: existingPage.studentCongressSection.image }
        : {}),
    imagePosition: "right",
    backgroundColor: "#F2F2F2",
    textColor: "#666B70",
  },
  ministriesSlider: {
    _type: "object",
    heading: {
      _type: "sectionHeading",
      title: "SGA Ministries & Leadership Structure",
      subtitle:
        "The SGA operates through a dynamic structure of specialized ministries, each designed to address key areas of student life and leadership:",
    },
    cards: [
      {
        _key: "ministry-of-relations",
        _type: "ministryCard",
        title: "Ministry\nof Relations",
        description: "Building communication and collaboration.",
      },
      {
        _key: "ministry-of-well-being",
        _type: "ministryCard",
        title: "Ministry of\nWell-being",
        description: "Supporting student wellness and care.",
      },
      {
        _key: "ministry-of-finance",
        _type: "ministryCard",
        title: "Ministry of\nFinance",
        description: "Managing budgets and resources.",
      },
      {
        _key: "ministry-of-activity",
        _type: "ministryCard",
        title: "Ministry of\nActivity",
        description: "Organizing engaging events, programs, and activities.",
      },
    ],
    backgroundColor: "#ffffff",
    titleColor: "#00A5B2",
    cardTextColor: "#216B97",
    cardIconColor: "#D97252",
    cardBorderColor: "#216B97",
    cardHoverBorderColor: "#D97252",
  },
  programsSection: {
    _type: "object",
    heading: {
      _type: "sectionHeading",
      description: [
        block(
          "student-life-programs-1",
          "Students participate in a wide array of programs including environmental clubs, public speaking forums, chess clubs, and TED Talks, where they learn to express ideas that inspire change. Performers and artists take the spotlight during SAIS Got Talent, celebrating creativity and individuality across all grade levels."
        ),
        block(
          "student-life-programs-2",
          "Athletic teams in basketball and football build discipline and school spirit, while the robotics program, science expos, and leadership forums empower students to solve problems, innovate, and lead with impact."
        ),
        block(
          "student-life-programs-3",
          "Whether leading, competing, performing, or inventing, SAIS students are encouraged to pursue their passions and embrace every opportunity. Our student life is not just an extension of learning, it's where voices are heard, visions are shaped, and ventures take flight."
        ),
      ],
    },
    ...(uploadedImages.programs ? { image: uploadedImages.programs } : existingPage?.programsSection?.image ? { image: existingPage.programsSection.image } : {}),
    imagePosition: "right",
    backgroundColor: "#ffffff",
    titleColor: "#00A5B2",
    textColor: "#666B70",
  },
  miniSgaSection: {
    _type: "object",
    heading: {
      _type: "sectionHeading",
      title: "Mini SGA",
      description: [
        block(
          "student-life-mini-sga-1",
          "In 2025, we introduced the Mini Student Government Association (Mini SGA), a new leadership initiative for students in Grades 5 to 8. The Mini SGA is designed to develop essential skills such as communication, organization, teamwork, and responsibility at an early age. Students have the opportunity to run for positions including a president, a vice president, Ambassadors of Wellbeing, Innovation, Sustainability, Activities, Sports, Culture and Diversity, secretary, treasurer, and class representatives."
        ),
        block(
          "student-life-mini-sga-2",
          "Members meet to discuss school improvement ideas, plan student-led activities, support school events, and represent the voices of their peers. This initiative not only encourages active participation in school life but also prepares students for future leadership roles within the SAIS community."
        ),
      ],
    },
    ...(uploadedImages.miniSga ? { image: uploadedImages.miniSga } : existingPage?.miniSgaSection?.image ? { image: existingPage.miniSgaSection.image } : {}),
    imagePosition: "center",
    panelColor: "#00A5B2",
    waveColor: "#1E6F9B",
    titleColor: "#ffffff",
    textColor: "#ffffff",
  },
  sgaShowcaseSection: {
    _type: "object",
    heading: {
      _type: "sectionHeading",
      title: "Student Government Association\n(SGA)",
      description: [
        block(
          "student-life-sga-showcase-1",
          "Through the Student Government Association (SGA), student leaders take initiative in planning school-wide events, advocating for their peers, and promoting a strong sense of community. Our students proudly represent SAIS on open days in university, local and international competitions, leadership forums, and academic fairs, gaining valuable exposure to real-world experiences. Whether competing in debate tournaments, science expos, or athletic championships, or joining one of our many sports teams, students learn teamwork, resilience, and school pride."
        ),
        block(
          "student-life-sga-showcase-2",
          "From celebrating cultural heritage during National Day festivities to showcasing talent in interschool competitions, student life thrives with purpose and pride."
        ),
      ],
    },
    ...(uploadedImages.sgaShowcase ? { image: uploadedImages.sgaShowcase } : existingPage?.sgaShowcaseSection?.image ? { image: existingPage.sgaShowcaseSection.image } : {}),
    imagePosition: "left",
    backgroundColor: "#216B97",
    titleColor: "#ffffff",
    textColor: "#ffffff",
  },
});

console.log("Seeded Student Life page.");
