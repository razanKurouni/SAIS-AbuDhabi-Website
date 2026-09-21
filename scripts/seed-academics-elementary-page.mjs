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
  throw new Error("SANITY_AUTH_TOKEN is required to seed the Academics Elementary page.");
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

async function main() {
  const [heroImage, curriculumImage, assessmentImage] = await Promise.all([
    uploadImage(
      "public/academics-elementary-hero.png",
      "academics-elementary-hero.png",
      "SAIS - Sharjah elementary students raising their hands in class"
    ),
    uploadImage(
      "public/academics-elementary-curriculum.png",
      "academics-elementary-curriculum.png",
      "SAIS - Sharjah elementary students playing chess"
    ),
    uploadImage(
      "public/academics-elementary-assessment.png",
      "academics-elementary-assessment.png",
      "SAIS - Sharjah elementary student writing in class"
    ),
  ]);

  await client.createOrReplace({
    _id: "academics-elementary-page",
    _type: "academicsElementaryPage",
    seo: {
      _type: "seo",
      title: "Elementary | Academics | SAIS - Sharjah",
      description: "Explore Elementary academics at Sharjah American International School.",
    },
    hero: {
      _type: "object",
      heading: {
        _type: "sectionHeading",
        eyebrow: "Academics",
        title: "Elementary",
      },
      image: heroImage,
      topLineColor: "#216B97",
      panelColor: "#00A5B2",
      waveColor: "#d97252",
      textColor: "#ffffff",
      imagePosition: "center",
      imageWidth: "60%",
    },
    innerNavigation: {
      _type: "object",
      items: [
        {
          _key: "overview",
          _type: "object",
          label: "Overview",
          href: "/academics",
          openInNewTab: false,
        },
        {
          _key: "kindergarten",
          _type: "object",
          label: "Kindergarten",
          href: "/academics/kindergarten",
          openInNewTab: false,
        },
        {
          _key: "elementary",
          _type: "object",
          label: "Elementary",
          href: "/academics/elementary",
          openInNewTab: false,
        },
        {
          _key: "middle-school",
          _type: "object",
          label: "Middle School",
          href: "/academics/middle-school",
          openInNewTab: false,
        },
        {
          _key: "high-school",
          _type: "object",
          label: "High School",
          href: "/academics/high-school",
          openInNewTab: false,
        },
      ],
      activeHref: "/academics/elementary",
      activeColor: "#00A5B2",
      inactiveColor: "#216B97",
      textColor: "#ffffff",
      dividerColor: "#ffffff",
      topLineColor: "#ffffff",
      ariaLabel: "Academics page navigation",
    },
    intro: {
      _type: "object",
      heading: {
        _type: "sectionHeading",
        title: "Building Strong Foundations for Deeper Learning",
        description: [
          block(
            "elementary-intro",
            "In Grades 3 and 4, our teaching and learning approaches evolve to build upon the foundational skills acquired in the early years while further developing critical thinking, problem-solving, and collaboration skills."
          ),
        ],
      },
      titleColor: "#216B97",
      textColor: "#00A5B2",
      backgroundColor: "#ffffff",
    },
    curriculumSection: {
      _type: "object",
      heading: {
        _type: "sectionHeading",
        title: "The Curriculum",
        description: [
          block(
            "elementary-curriculum-primary",
            "Teachers employ a balanced approach that combines teacher-led instruction with opportunities for inquiry-based learning and project-based tasks. The curriculum is designed to promote interdisciplinary connections, allowing students to make meaningful connections across subject areas. Through a combination of whole-class instruction, small group activities, and independent inquiry, students in Grades 3 and 4 engage in deeper exploration of concepts and develop essential skills for academic success and lifelong learning."
          ),
          block(
            "elementary-curriculum-upper",
            "Upper Elementary (Grades 3-5): The curriculum engages the students in interdisciplinary learning, and a noticeable emphasis is placed on collaboration, curiosity, and real-world applications. Technology integration becomes an integral part of the curriculum."
          ),
        ],
      },
      image: curriculumImage,
      imagePosition: "center",
      backgroundColor: "#00A5B2",
      panelColor: "#216B97",
      waveColor: "#00A5B2",
      titleColor: "#00A5B2",
      textColor: "#ffffff",
    },
    assessmentSection: {
      _type: "object",
      heading: {
        _type: "sectionHeading",
        title: "Continuous Assessment",
        description: [
          block(
            "elementary-assessment-primary",
            "In Grades 1 and 2, SAIS - Sharjah is implementing an ongoing assessment model designed to provide a comprehensive and holistic view of each student's progress. This shift moves away from solely relying on periodic tests and instead focuses on continuous evaluation through observations, classwork, homework, projects, discussions, and quizzes. This approach enables teachers to better understand and support students' development throughout the year in a relaxed and stress-free environment. While multiple formative and summative assessments will take place across subjects, parents will not be informed prior to their administration, to ensure assessments reflect authentic learning and reduce performance anxiety. However, in response to parent feedback and to support home preparation, schedules will be shared in advance for Arabic and Islamic Studies assessments only."
          ),
          block(
            "elementary-assessment-scale",
            "We continue using our proficiency scale for grades 1 and 2 to better reflect the progress and achievements of our students. We do convert these proficiency scales into percentages for our internal data analyses."
          ),
        ],
      },
      image: assessmentImage,
      imagePosition: "center",
      panelColor: "#00A5B2",
      waveColor: "#216B97",
      titleColor: "#216B97",
      textColor: "#ffffff",
    },
  });

  console.log(
    "Seeded academics-elementary-page with editable hero, inner navigation, intro, curriculum, and assessment content."
  );
}

function formatSeedError(error) {
  const message = error instanceof Error ? error.message : String(error);
  return message.replace(/Bearer\s+[^'"`\s]+/g, "Bearer [redacted]");
}

main().catch((error) => {
  console.error(`Failed to seed academics-elementary-page: ${formatSeedError(error)}`);
  process.exit(1);
});
