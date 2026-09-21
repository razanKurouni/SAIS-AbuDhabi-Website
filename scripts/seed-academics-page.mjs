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
  throw new Error("SANITY_AUTH_TOKEN is required to seed the Academics page.");
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

const [
  heroImage,
  curriculumImage,
  criticalThinkingIcon,
  communicationIcon,
  organizationIcon,
  researchIcon,
  resilienceIcon,
  empathyIcon,
  curiosityIcon,
  growthMindsetIcon,
  cat4AssessmentImage,
  mapTestingImage,
  ibtArabicImage,
  ngrtTestingImage,
] = await Promise.all([
  uploadImage(
    "public/academics-hero.jpg",
    "academics-hero.jpg",
    "SAIS - Sharjah students working in a science lab"
  ),
  uploadImage(
    "public/academics-curriculum.png",
    "academics-curriculum.png",
    "SAIS - Sharjah students learning with a microscope"
  ),
  uploadImage(
    "public/academics-icon-critical-thinking.png",
    "academics-icon-critical-thinking.png",
    "Critical and creative thinking icon"
  ),
  uploadImage(
    "public/academics-icon-communication.png",
    "academics-icon-communication.png",
    "Communication and collaboration icon"
  ),
  uploadImage(
    "public/academics-icon-organization.png",
    "academics-icon-organization.png",
    "Organization and self-management icon"
  ),
  uploadImage(
    "public/academics-icon-research.png",
    "academics-icon-research.png",
    "Research and problem-solving icon"
  ),
  uploadImage(
    "public/academics-icon-resilience.png",
    "academics-icon-resilience.png",
    "Resilience and adaptability icon"
  ),
  uploadImage(
    "public/academics-icon-empathy.png",
    "academics-icon-empathy.png",
    "Empathy icon"
  ),
  uploadImage(
    "public/academics-icon-curiosity.png",
    "academics-icon-curiosity.png",
    "Curiosity icon"
  ),
  uploadImage(
    "public/academics-icon-growth-mindset.png",
    "academics-icon-growth-mindset.png",
    "Growth mindset icon"
  ),
  uploadImage(
    "public/academics-learning-cat4.png",
    "academics-learning-cat4.png",
    "SAIS - Sharjah student during CAT4 assessment"
  ),
  uploadImage(
    "public/academics-learning-map.png",
    "academics-learning-map.png",
    "SAIS - Sharjah students participating in MAP testing"
  ),
  uploadImage(
    "public/academics-learning-ibt.png",
    "academics-learning-ibt.png",
    "SAIS - Sharjah students reading during Arabic testing"
  ),
  uploadImage(
    "public/academics-learning-ngrt.png",
    "academics-learning-ngrt.png",
    "SAIS - Sharjah students reading during NGRT testing"
  ),
]);

await client.createOrReplace({
  _id: "academics-page",
  _type: "academicsPage",
  seo: {
    _type: "seo",
    title: "Academics | SAIS - Sharjah",
    description: "Explore academics at Sharjah American International School.",
    image: heroImage,
  },
  hero: {
    _type: "object",
    heading: {
      _type: "sectionHeading",
      title: "Academics\nat SAIS - Sharjah",
    },
    image: heroImage,
    topLineColor: "#216B97",
    panelColor: "#707174",
    waveColor: "#00A5B2",
    textColor: "#ffffff",
    imagePosition: "center",
    imageWidth: "60%",
  },
  curriculumSection: {
    _type: "object",
    heading: {
      _type: "sectionHeading",
      title: "Our Curriculum\nPhilosophy and Vision",
      description: [
        block(
          "curriculum-overview",
          "At SAIS - Sharjah, our curriculum is driven by a commitment to academic excellence, holistic development, and global readiness. Grounded in internationally recognized American standards - including AERO Common Core and the Next Generation Science Standards - our curriculum ensures that students acquire the knowledge, skills, and dispositions necessary for lifelong learning and success in a rapidly evolving world."
        ),
        block(
          "curriculum-vision",
          "We envision a dynamic, standards-based curriculum that is coherent, vertically and horizontally aligned, and responsive to the diverse needs of our multicultural student body."
        ),
      ],
    },
    image: curriculumImage,
    imagePosition: "center",
    panelColor: "#00A5B2",
    waveColor: "#d97252",
    textColor: "#ffffff",
  },
  skillsSection: {
    _type: "object",
    heading: {
      _type: "sectionHeading",
      title: "Skills and Dispositions",
      description: [
        block(
          "skills-intro",
          "Through purposeful design rooted in intentional planning using the Backward Design Model, we ensure that every unit of study is capstoned with a summative performance task, where students are expected to apply and demonstrate their learning through four Key Skills and four dispositions."
        ),
      ],
    },
    groups: [
      {
        _key: "key-skills",
        _type: "object",
        title: "Key Skills",
        items: [
          {
            _key: "critical-thinking",
            _type: "object",
            title: "Critical and\nCreative Thinking",
            icon: criticalThinkingIcon,
            iconType: "critical",
            theme: "teal",
          },
          {
            _key: "communication",
            _type: "object",
            title: "Communication and Collaboration",
            icon: communicationIcon,
            iconType: "communication",
            theme: "teal",
          },
          {
            _key: "organization",
            _type: "object",
            title: "Organization and\nSelf-Management",
            icon: organizationIcon,
            iconType: "organization",
            theme: "teal",
          },
          {
            _key: "research",
            _type: "object",
            title: "Research and\nProblem-Solving",
            icon: researchIcon,
            iconType: "research",
            theme: "teal",
          },
        ],
      },
      {
        _key: "dispositions",
        _type: "object",
        title: "Dispositions",
        items: [
          {
            _key: "resilience",
            _type: "object",
            title: "Resilience\nand Adaptability",
            icon: resilienceIcon,
            iconType: "resilience",
            theme: "orange",
          },
          {
            _key: "empathy",
            _type: "object",
            title: "Empathy",
            icon: empathyIcon,
            iconType: "empathy",
            theme: "orange",
          },
          {
            _key: "curiosity",
            _type: "object",
            title: "Curiosity",
            icon: curiosityIcon,
            iconType: "curiosity",
            theme: "orange",
          },
          {
            _key: "growth",
            _type: "object",
            title: "Growth Mindset",
            icon: growthMindsetIcon,
            iconType: "growth",
            theme: "orange",
          },
        ],
      },
    ],
  },
  curriculumOverviewSection: {
    _type: "object",
    firstBlock: {
      _type: "imageTextSection",
      heading: {
        _type: "sectionHeading",
        title: "Our Curriculum",
        description: [
          block(
            "overview-curriculum-1",
            "Our Curriculum is designed to ensure students' experience is active and skills-focused, rigorous, and aligned with clearly defined outcomes. Our approach integrates 21st-century competencies, active and interactive learning, and real-world applications, encouraging students to become critical thinkers, creative problem-solvers, effective communicators, and compassionate global citizens."
          ),
          block(
            "overview-curriculum-2",
            "With robust student support systems, differentiated instruction, and meaningful and varied assessment practices, we aim to meet each learner where they are while guiding them to where they need to be."
          ),
        ],
      },
      image: heroImage,
      imagePosition: "right",
      theme: "light",
    },
  },
  teachingCommitmentsSection: {
    _type: "object",
    heading: {
      _type: "sectionHeading",
      title: "Our Teaching Commitments",
    },
    cards: [
      {
        _key: "high-expectations",
        _type: "object",
        title: "High Expectations",
        description: "Maintain high expectations for every student",
        iconType: "expectations",
      },
      {
        _key: "engagement",
        _type: "object",
        title: "Engagement",
        description: "Understand that meaningful learning occurs when students engage in critical thinking",
        iconType: "engagement",
      },
      {
        _key: "achievement",
        _type: "object",
        title: "Achievement",
        description: "Emphasize the importance of effort and persistence in achievement",
        iconType: "achievement",
      },
    ],
  },
  learningSliderSection: {
    _type: "object",
    heading: {
      _type: "sectionHeading",
      title: "Understanding Student Learning",
    },
    slides: [
      {
        _key: "cat4-assessment",
        _type: "object",
        title: "CAT4 Assessment",
        body:
          "The Cognitive Abilities Test (CAT4) helps us understand how students learn and their academic potential. Students in Grades 3-9 take this assessment upon enrollment to identify their learning styles, enabling teachers to:\n\n- Adapt teaching approaches and materials\n- Adjust instructional pace and emphasis\n- Implement differentiated instruction\n\nCAT4 measures four types of reasoning:\n\n- Verbal Reasoning - Understanding and reasoning through words\n- Quantitative Reasoning - Using numerical skills for problem-solving\n- Non-verbal Reasoning - Problem-solving using visual information\n- Spatial Ability - Thinking and drawing conclusions in three dimensions",
        image: cat4AssessmentImage,
        backgroundColor: "#d97252",
        sideColor: "#00A5B2",
        ringColor: "#216B97",
        textColor: "#ffffff",
        imagePosition: "center",
      },
      {
        _key: "nwea-map-testing",
        _type: "object",
        title: "NWEA MAP Testing",
        body:
          "Students in Grades 3-9 participate in MAP testing three times throughout the academic year. These computer-adaptive assessments:\n\n- Produce accurate data about each student's learning level\n- Identify areas of strength and opportunity\n- Measure overall performance in core subjects",
        image: mapTestingImage,
        backgroundColor: "#216B97",
        sideColor: "#00A5B2",
        ringColor: "#d97252",
        textColor: "#ffffff",
        imagePosition: "center",
      },
      {
        _key: "ibt-arabic-testing",
        _type: "object",
        title: "IBT Arabic Testing",
        body:
          "To benchmark Arabic language proficiency against international standards, our students participate in IBT Arabic examinations conducted by ACER. This assessment provides valuable comparative data on student performance relative to peers in the region and worldwide.",
        image: ibtArabicImage,
        backgroundColor: "#d97252",
        sideColor: "#00A5B2",
        ringColor: "#216B97",
        textColor: "#ffffff",
        imagePosition: "center",
      },
      {
        _key: "ngrt-testing",
        _type: "object",
        title: "NGRT Testing",
        body:
          "The New Group Reading Test (NGRT) measures reading skills against national averages. This standardized assessment evaluates:\n\n- Phonics knowledge\n- Reading comprehension\n- Decoding ability\n- Vocabulary development\n- Grammatical understanding\n- Deduction and inference skills\n- Understanding of figurative and idiomatic language",
        image: ngrtTestingImage,
        backgroundColor: "#216B97",
        sideColor: "#00A5B2",
        ringColor: "#d97252",
        textColor: "#ffffff",
        imagePosition: "center",
      },
    ],
  },
});

console.log("Seeded academics-page with editable hero, curriculum, skills, overview, teaching commitment, and learning slider content.");
