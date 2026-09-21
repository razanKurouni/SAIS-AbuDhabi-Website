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
  throw new Error("SANITY_AUTH_TOKEN is required to seed the Academics Kindergarten page.");
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
const [
  heroImage,
  excellenceImage,
  curriculumImage,
  socialIcon,
  effectiveLearnersIcon,
  physicalIcon,
  safeHealthyIcon,
  familySupportIcon,
  goalsIcon,
] = await Promise.all([
  uploadImage(
    "public/academics-kg-hero.png",
    "academics-kg-hero.png",
    "SAIS - Sharjah kindergarten students learning through play"
  ),
  uploadImage(
    "public/academics-kg-excellence.png",
    "academics-kg-excellence.png",
    "SAIS - Sharjah kindergarten students playing music together"
  ),
  uploadImage(
    "public/academics-kg-curriculum.png",
    "academics-kg-curriculum.png",
    "SAIS - Sharjah teacher guiding a kindergarten student during outdoor learning"
  ),
  uploadImage(
    "public/academics-kg-assessment-social.png",
    "academics-kg-assessment-social.png",
    "Children are personally and socially competent icon"
  ),
  uploadImage(
    "public/academics-kg-assessment-effective-learners.png",
    "academics-kg-assessment-effective-learners.png",
    "Children are effective learners icon"
  ),
  uploadImage(
    "public/academics-kg-assessment-physical.png",
    "academics-kg-assessment-physical.png",
    "Children show physical and motor competence icon"
  ),
  uploadImage(
    "public/academics-kg-assessment-safe-healthy.png",
    "academics-kg-assessment-safe-healthy.png",
    "Children are safe and healthy icon"
  ),
  uploadImage(
    "public/academics-kg-assessment-family-support.png",
    "academics-kg-assessment-family-support.png",
    "Families support their child's learning and development icon"
  ),
  uploadImage(
    "public/academics-kg-assessment-goals.png",
    "academics-kg-assessment-goals.png",
    "Families achieve their goals icon"
  ),
]);

await client.createOrReplace({
  _id: "academics-kindergarten-page",
  _type: "academicsKindergartenPage",
  seo: {
    _type: "seo",
    title: "Kindergarten | Academics | SAIS - Sharjah",
    description: "Explore Kindergarten academics at Sharjah American International School.",
  },
  hero: {
    _type: "object",
    heading: {
      _type: "sectionHeading",
      eyebrow: "Academics",
      title: "Kindergarten",
    },
    image: heroImage,
    topLineColor: "#d97252",
    panelColor: "#216B97",
    waveColor: "#00A5B2",
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
    activeHref: "/academics/kindergarten",
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
      title: "Building Success Through Collaboration",
      description: [
        block(
          "kg-intro",
          "In the early years at SAIS - Sharjah, our teaching and learning approaches prioritize play-based learning, exploration, and hands-on experiences to foster holistic development."
        ),
      ],
    },
    titleColor: "#00A5B2",
    textColor: "#216B97",
    backgroundColor: "#ffffff",
  },
  excellenceSection: {
    _type: "object",
    heading: {
      _type: "sectionHeading",
      title: "Driving Excellence\nThrough Continuous Review",
      description: [
        block(
          "kg-excellence",
          "Teachers utilize a combination of structured activities and child-directed learning opportunities to cater to individual learning styles and needs. Our curriculum emphasizes foundational skills such as literacy, numeracy, and social-emotional development, integrating them into engaging and developmentally appropriate learning experiences. Through a blend of structured lessons, interactive activities, and creative expression, students in KG-Grade 2 develop essential skills, knowledge, and attitudes that form the building blocks for future learning success."
        ),
      ],
    },
    image: excellenceImage,
    imagePosition: "center",
    backgroundColor: "#00A5B2",
    panelColor: "#216B97",
    waveColor: "#d97252",
    titleColor: "#00A5B2",
    textColor: "#ffffff",
  },
  curriculumSection: {
    _type: "imageTextSection",
    heading: {
      _type: "sectionHeading",
      title: "The Curriculum",
      description: [
        block(
          "kg-curriculum",
          "Early Years (KG-Grade 2): The curriculum provides hands-on, inquiry-based learning through thematic units and play-based exploration. Integrated with AERO and NGSS standards, the program emphasizes foundational literacy, numeracy, science, and social-emotional development."
        ),
      ],
    },
    image: curriculumImage,
    imagePosition: "right",
    theme: "light",
  },
  assessmentSection: {
    _type: "object",
    heading: {
      _type: "sectionHeading",
      title: "Assessment",
      description: [
        block(
          "kg-assessment",
          "We use the DRDP (Desired Results Developmental Profile) assessment which is an observational and portfolio-based assessment that measures young children's learning and development. More specifically, it measures progress on the following six desired results."
        ),
      ],
    },
    cards: [
      {
        _key: "personally-socially-competent",
        _type: "object",
        title: "Children Are Personally\nand Socially Competent",
        icon: socialIcon,
      },
      {
        _key: "effective-learners",
        _type: "object",
        title: "Children Are\nEffective Learners",
        icon: effectiveLearnersIcon,
      },
      {
        _key: "physical-motor-competence",
        _type: "object",
        title: "Children Show Physical\nand Motor Competence",
        icon: physicalIcon,
      },
      {
        _key: "safe-healthy",
        _type: "object",
        title: "Children Are Safe\nand Healthy",
        icon: safeHealthyIcon,
      },
      {
        _key: "families-support-learning",
        _type: "object",
        title: "Families Support their Child's\nLearning and Development",
        icon: familySupportIcon,
      },
      {
        _key: "families-achieve-goals",
        _type: "object",
        title: "Families Achieve Their Goals",
        icon: goalsIcon,
      },
    ],
    closingStatement: [
      block(
        "kg-assessment-closing-levels",
        "Teachers place each child on a specific developmental level for each measure."
      ),
      block("kg-assessment-closing-count", "There are four main developmental levels."),
    ],
    backgroundColor: "#216B97",
    titleColor: "#00A5B2",
    textColor: "#ffffff",
    cardTextColor: "#216B97",
    cardBorderColor: "#00A5B2",
    cardHoverBorderColor: "#d97252",
  },
});

console.log(
  "Seeded academics-kindergarten-page with editable hero, inner navigation, intro, excellence, curriculum, and assessment content."
);
}

function formatSeedError(error) {
  const message = error instanceof Error ? error.message : String(error);
  return message.replace(/Bearer\s+[^'"`\s]+/g, "Bearer [redacted]");
}

main().catch((error) => {
  console.error(`Failed to seed academics-kindergarten-page: ${formatSeedError(error)}`);
  process.exit(1);
});
