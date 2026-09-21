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
  throw new Error("SANITY_AUTH_TOKEN is required to seed the Academics Middle School page.");
}

async function uploadImage(path, filename, title) {
  if (!fs.existsSync(path)) {
    throw new Error(`Image was not found at ${path}`);
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

function block(_key, text) {
  return {
    _key,
    _type: "block",
    children: [{ _key: `${_key}-span`, _type: "span", text }],
  };
}

const navItems = [
  { _key: "overview", label: "Overview", href: "/academics" },
  { _key: "kindergarten", label: "Kindergarten", href: "/academics/kindergarten" },
  { _key: "elementary", label: "Elementary", href: "/academics/elementary" },
  { _key: "middle-school", label: "Middle School", href: "/academics/middle-school" },
  { _key: "high-school", label: "High School", href: "/academics/high-school" },
].map((item) => ({
  ...item,
  _type: "object",
  openInNewTab: false,
}));

async function main() {
  const [
    heroImage,
    overviewImage,
    tailoredImage,
    curriculumClassroomImage,
    curriculumSupportImage,
    assessmentImage,
  ] = await Promise.all([
    uploadImage(
      "public/academics-middle-school-hero.jpg",
      "academics-middle-school-hero.jpg",
      "SAIS - Sharjah middle school students reading together"
    ),
    uploadImage(
      "public/academics-middle-school-overview.png",
      "academics-middle-school-overview.png",
      "SAIS - Sharjah middle school students reading in the library"
    ),
    uploadImage(
      "public/academics-middle-school-tailored.png",
      "academics-middle-school-tailored.png",
      "SAIS - Sharjah middle school student playing keyboard during music class"
    ),
    uploadImage(
      "public/academics-middle-school-curriculum-classroom.png",
      "academics-middle-school-curriculum-classroom.png",
      "SAIS - Sharjah middle school classroom discussion"
    ),
    uploadImage(
      "public/academics-middle-school-curriculum-support.png",
      "academics-middle-school-curriculum-support.png",
      "SAIS - Sharjah teacher supporting a middle school student"
    ),
    uploadImage(
      "public/academics-middle-school-assessment.png",
      "academics-middle-school-assessment.png",
      "SAIS - Sharjah middle school students reviewing a book together"
    ),
  ]);

  await client.createOrReplace({
    _id: "academics-middle-school-page",
    _type: "academicsMiddleSchoolPage",
    seo: {
      _type: "seo",
      title: "Middle School | Academics | SAIS - Sharjah",
      description: "Explore Middle School academics at Sharjah American International School.",
    },
    hero: {
      _type: "object",
      heading: {
        _type: "sectionHeading",
        eyebrow: "Academics",
        title: "Middle School",
      },
      image: heroImage,
      topLineColor: "#216B97",
      panelColor: "#d97252",
      waveColor: "#00A5B2",
      textColor: "#ffffff",
      imagePosition: "center",
      imageWidth: "60%",
    },
    innerNavigation: {
      _type: "object",
      items: navItems,
      activeHref: "/academics/middle-school",
      activeColor: "#00A5B2",
      inactiveColor: "#216B97",
      textColor: "#ffffff",
      dividerColor: "#ffffff",
      topLineColor: "#ffffff",
      ariaLabel: "Academics page navigation",
    },
    overviewSection: {
      _type: "object",
      heading: {
        _type: "sectionHeading",
        title: "Stepping Into Specialised Learning",
        description: [
          block(
            "middle-school-overview",
            "As students transition into Grades 5 through 8, significant changes occur in their academic environment. They move from a homeroom setting to subject-based instruction, allowing for greater depth and specialization in each subject area. Additionally, students transition from co-educational to segregated classes, facilitating a focused learning environment that addresses the unique needs of learners at this stage of development."
          ),
        ],
      },
      image: overviewImage,
      imagePosition: "right",
      backgroundColor: "#ffffff",
      titleColor: "#216B97",
      textColor: "#666b70",
    },
    tailoredInstructionSection: {
      _type: "object",
      heading: {
        _type: "sectionHeading",
        title: "Tailored Instruction for Every Stage of Learning",
        description: [
          block(
            "middle-school-tailored-instruction",
            "At SAIS - Sharjah, these transitions are carefully considered in the design of pedagogical approaches. Teachers utilize a variety of instructional strategies tailored to the subject area and the developmental stage of students, fostering independence, critical thinking, and collaborative skills. The curriculum is structured to provide a balanced blend of academic rigor, inquiry-based learning, and opportunities for exploration and self-discovery, ensuring that students thrive academically and socially during this transitional period."
          ),
        ],
      },
      image: tailoredImage,
      imageSide: "left",
      imagePosition: "center",
      panelColor: "#d97252",
      waveColor: "#00A5B2",
      titleColor: "#ffffff",
      textColor: "#ffffff",
    },
    curriculumOverviewSection: {
      _type: "object",
      heading: {
        _type: "sectionHeading",
        title: "The Curriculum",
        description: [
          block(
            "middle-school-curriculum-intro",
            'We use the DRDP (Desired Results Developmental Profile) assessment which is an observational and portfolio-based assessment that measures young children\'s learning and development. More specifically, it measures progress on the following six "desired results".'
          ),
        ],
      },
      backgroundColor: "#00A5B2",
      titleColor: "#216B97",
      textColor: "#ffffff",
      firstBlock: {
        _type: "imageTextSection",
        heading: {
          _type: "sectionHeading",
          title: "Middle School Program",
          description: [
            block(
              "middle-school-curriculum-program-1",
              "Our Middle School program offers a strong academic foundation across a wide range of subjects while nurturing the whole child. Students are encouraged to become active participants in their learning, with an emphasis on independence, innovation, and responsibility."
            ),
            block(
              "middle-school-curriculum-program-2",
              "In addition to that, our program is designed to meet the dynamic needs of the adolescent learner. With student voice at the center, we provide a learning experience that encourages independent thinking, responsible risk-taking, and bold exploration across all subject areas. Through collaborative learning, inquiry-based projects, and real-world application, our students learn how to think, not just what to think."
            ),
          ],
        },
        image: curriculumClassroomImage,
        imagePosition: "left",
        backgroundColor: "transparent",
        titleColor: "#216B97",
        textColor: "#ffffff",
      },
      secondBlock: {
        _type: "imageTextSection",
        heading: {
          _type: "sectionHeading",
          title: "Beyond the Classroom",
          description: [
            block(
              "middle-school-curriculum-beyond-1",
              "Beyond the classroom, SAIS Middle School offers a variety of extracurricular activities and after-school clubs, such as chess, robotics, cooking, and more. These programs develop students' interests, confidence, and leadership skills."
            ),
            block(
              "middle-school-curriculum-beyond-2",
              "Through local celebrations like National Day, Ramadan, and Eid, and global initiatives like Earth Day, Cancer Awareness Campaigns, and International Day, students gain a deeper appreciation of both their heritage and the wider world."
            ),
            block(
              "middle-school-curriculum-beyond-3",
              "We don't just prepare students for high school - we prepare them for life. We guide them to turn uncertainty into ambition, ideas into impact, and dreams into achievable goals."
            ),
          ],
        },
        image: curriculumSupportImage,
        imagePosition: "right",
        backgroundColor: "transparent",
        titleColor: "#216B97",
        textColor: "#ffffff",
      },
    },
    assessmentSection: {
      _type: "object",
      heading: {
        _type: "sectionHeading",
        title: "Assessment",
        description: [
          block(
            "middle-school-assessment",
            "Assessment in Middle School follows a balanced approach that integrates formative assessment, such as observations, classwork, and ongoing feedback, with summative assessment, including quizzes, projects, and exams to evaluate student understanding. This process is aligned with international standards and supported by global benchmarking tools such as MAP Growth (NWEA) and CAT4, as well as Arabic international assessments, ensuring data-driven instruction, continuous progress monitoring, and personalized learning that supports every student's academic growth and development across all subjects."
          ),
        ],
      },
      image: assessmentImage,
      imagePosition: "center",
      panelColor: "#d97252",
      waveColor: "#216B97",
      titleColor: "#ffffff",
      textColor: "#ffffff",
    },
    supportProgramsSection: {
      _type: "object",
      heading: {
        _type: "sectionHeading",
        title: "Inclusion & Support Programs",
      },
      backgroundColor: "#ffffff",
      titleColor: "#00A5B2",
      cardBorderColor: "#216B97",
      cardHoverBorderColor: "#00A5B2",
      cardTextColor: "#216B97",
      cards: [
        {
          _key: "students-of-determination",
          _type: "object",
          title: "Students of Determination",
          description:
            "Students with special educational needs and/or disabilities (SEND/SOD) are supported through individualized education plans (IEPs), push-in/pull-out support services, and tailored curriculum, instruction, and assessments.",
          iconType: "determination",
        },
        {
          _key: "gifted-and-talented",
          _type: "object",
          title: "Gifted and Talented Students",
          description:
            "Students with identified gifts and/or talents are provided with enrichment and accelerated programs as comprehensively stated and elaborated on in their advanced learning plans (ALPs).",
          iconType: "gifted",
        },
        {
          _key: "eal-learners",
          _type: "object",
          title: "EAL Learners",
          description:
            "Students with additional English language needs are identified through WIDA screener and supported with tiered interventions.",
          iconType: "eal",
        },
        {
          _key: "academic-counseling",
          _type: "object",
          title: "Academic Counseling",
          description:
            "Students in all phases are provided with integrated support through counseling, pastoral care, and academic planning.",
          iconType: "counseling",
        },
        {
          _key: "differentiation",
          _type: "object",
          title: "Differentiation",
          description:
            "Internal and external assessment data as well as observational feedback are used to design targeted interventions and personalized instruction.",
          iconType: "differentiation",
        },
      ],
    },
  });

  console.log("Seeded academics-middle-school-page with editable Sanity content.");
}

function formatSeedError(error) {
  const message = error instanceof Error ? error.message : String(error);
  return message.replace(/Bearer\s+[^'"`\s]+/g, "Bearer [redacted]");
}

main().catch((error) => {
  console.error(`Failed to seed academics-middle-school-page: ${formatSeedError(error)}`);
  process.exit(1);
});
