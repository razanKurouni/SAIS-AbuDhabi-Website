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
  throw new Error("SANITY_AUTH_TOKEN is required to seed the Academics High School page.");
}

async function uploadImage(path, filename, title) {
  if (!fs.existsSync(path)) {
    console.warn(`⚠️  Image not found at ${path} — skipping upload for "${title}".`);
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

function block(_key, text) {
  return {
    _key,
    _type: "block",
    style: "normal",
    markDefs: [],
    children: [{ _key: `${_key}-span`, _type: "span", text, marks: [] }],
  };
}

async function main() {
  console.log("Uploading images...");

  const [heroImage, overviewImage, excellenceImage, curriculumImage] = await Promise.all([
    uploadImage(
      "public/academics-high-school-hero.jpg",
      "academics-high-school-hero.jpg",
      "SAIS - Sharjah high school students in a science lab"
    ),
    uploadImage(
      "public/academics-high-school-overview.jpg",
      "academics-high-school-overview.jpg",
      "SAIS - Sharjah high school students doing a science experiment"
    ),
    uploadImage(
      "public/academics-high-school-excellence.jpg",
      "academics-high-school-excellence.jpg",
      "SAIS - Sharjah high school student painting a model in class"
    ),
    uploadImage(
      "public/academics-high-school-curriculum.jpg",
      "academics-high-school-curriculum.jpg",
      "SAIS - Sharjah high school students raising hands in class"
    ),
  ]);

  const navItems = [
    { _key: "nav-overview", _type: "object", label: "Overview", href: "/academics" },
    { _key: "nav-kindergarten", _type: "object", label: "Kindergarten", href: "/academics/kindergarten" },
    { _key: "nav-elementary", _type: "object", label: "Elementary", href: "/academics/elementary" },
    { _key: "nav-middle-school", _type: "object", label: "Middle School", href: "/academics/middle-school" },
    { _key: "nav-high-school", _type: "object", label: "High School", href: "/academics/high-school" },
  ];

  console.log("Creating Sanity document...");

  await client.createOrReplace({
    _id: "academics-high-school-page",
    _type: "academicsHighSchoolPage",
    seo: {
      _type: "seo",
      title: "High School | Academics | SAIS - Sharjah",
      description:
        "Explore High School academics at Sharjah American International School. Grades 9–12 with AP courses, electives, and college preparation.",
    },
    hero: {
      _type: "object",
      heading: {
        _type: "sectionHeading",
        eyebrow: "Academics",
        title: "High School",
      },
      ...(heroImage ? { image: heroImage } : {}),
      topLineColor: "#216B97",
      panelColor: "#6f7175",
      waveColor: "#00A5B2",
      textColor: "#ffffff",
      imagePosition: "center",
      imageWidth: "60%",
    },
    innerNavigation: {
      _type: "object",
      items: navItems,
      activeHref: "/academics/high-school",
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
        title: "Freedom to Explore,\nGuidance to Grow",
        description: [
          block(
            "hs-overview-1",
            "In Grades 9 through 12, students experience increased autonomy and agency in their learning journey."
          ),
          block(
            "hs-overview-2",
            "At SAIS - Sharjah, students have access to a wide range of choice and elective courses, allowing them to tailor their learning pathways to align with their interests, aspirations, and career goals. Pedagogical approaches in these grades are designed to respond to the diverse priorities and dynamics of student choice. Teachers employ a student-centered approach that encourages inquiry, critical thinking, and creativity, while also providing guidance and support to help students navigate their academic pursuits."
          ),
        ],
      },
      ...(overviewImage ? { image: overviewImage } : {}),
      backgroundColor: "#ffffff",
      titleColor: "#216B97",
      textColor: "#666b70",
    },
    excellenceSection: {
      _type: "object",
      heading: {
        _type: "sectionHeading",
        title: "Building Confident,\nFuture-Ready Graduates",
        description: [
          block(
            "hs-excellence",
            "Project-based learning, collaborative projects, and real-world applications of learning are emphasized, empowering students to take ownership of their education and become active participants in their learning process. Through a combination of personalized support, rigorous academic experiences, and opportunities for exploration and self-expression, students in Grades 9-12 develop the skills, knowledge, and dispositions needed to succeed in college, careers, and beyond."
          ),
        ],
      },
      ...(excellenceImage ? { image: excellenceImage } : {}),
      imageSide: "left",
      imagePosition: "center",
      panelColor: "#00A5B2",
      waveColor: "#d97252",
      titleColor: "#ffffff",
      textColor: "#ffffff",
    },
    curriculumSection: {
      _type: "object",
      heading: {
        _type: "sectionHeading",
        title: "The Curriculum",
        description: [
          block(
            "hs-curriculum",
            "High School (Grades 9–12): The curriculum enables the students to pursue a personalized pathway. Advanced Placement (AP) courses, elective options, and career guidance prepare students for university and beyond. College and career readiness, entrepreneurship, interdisciplinary learning, and leadership programs define our high school model."
          ),
        ],
      },
      ...(curriculumImage ? { image: curriculumImage } : {}),
    },
  });

  console.log("✅ Seeded academics-high-school-page successfully.");
}

function formatSeedError(error) {
  const message = error instanceof Error ? error.message : String(error);
  return message.replace(/Bearer\s+[^'"`\s]+/g, "Bearer [redacted]");
}

main().catch((error) => {
  console.error(`Failed to seed academics-high-school-page: ${formatSeedError(error)}`);
  process.exit(1);
});
