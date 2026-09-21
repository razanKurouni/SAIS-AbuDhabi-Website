import fs from "node:fs";
import path from "node:path";
import { createClient } from "@sanity/client";

const projectRoot = process.cwd();

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "uwffig4f",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "sais-uaq",
  apiVersion: "2023-01-01",
  token: process.env.SANITY_AUTH_TOKEN,
  useCdn: false,
});

if (!process.env.SANITY_AUTH_TOKEN) {
  throw new Error("SANITY_AUTH_TOKEN is required to seed the Achievements page.");
}

const imageSources = {
  hero: {
    path: path.join(projectRoot, "public/sais-hero-students.jpg"),
    filename: "achievements-hero.jpg",
    title: "SAIS - Sharjah students working together",
  },
  excellence: {
    path: path.join(projectRoot, "public/achievements-excellence.jpg"),
    filename: "achievements-excellence.jpg",
    title: "SAIS - Sharjah swimming coach guiding a student in the pool",
  },
  highlights: {
    path: path.join(projectRoot, "public/achievements-highlights.jpg"),
    filename: "achievements-highlights.jpg",
    title: "SAIS - Sharjah student playing the violin during a music lesson",
  },
  community: {
    path: path.join(projectRoot, "public/achievements-community.jpg"),
    filename: "achievements-community.jpg",
    title: "SAIS - Sharjah students celebrating at a school chess tournament",
  },
};

async function uploadImage({ path: imagePath, filename, title }) {
  if (!fs.existsSync(imagePath)) {
    console.warn(`Skipping missing image at ${imagePath}`);
    return undefined;
  }

  const asset = await client.assets.upload("image", fs.createReadStream(imagePath), {
    filename,
    title,
  });

  return {
    _type: "imageWithAlt",
    image: {
      _type: "image",
      asset: { _type: "reference", _ref: asset._id },
    },
    alt: title,
  };
}

function block(key, text) {
  return {
    _key: key,
    _type: "block",
    style: "normal",
    markDefs: [],
    children: [{ _key: `${key}-text`, _type: "span", marks: [], text }],
  };
}

const uploadedImages = Object.fromEntries(
  await Promise.all(
    Object.entries(imageSources).map(async ([key, source]) => [key, await uploadImage(source)])
  )
);

const existingPage = await client.getDocument("student-programs-page").catch(() => null);
const image = (key, storedSection) =>
  uploadedImages[key] || existingPage?.[storedSection]?.image
    ? { image: uploadedImages[key] || existingPage?.[storedSection]?.image }
    : {};

await client.createOrReplace({
  _id: "student-programs-page",
  _type: "studentProgramsPage",
  seo: {
    _type: "seo",
    title: "Achievements | SAIS - Sharjah",
    description: "Explore student achievements in academics, sports, and leadership at SAIS - Sharjah.",
    ...(uploadedImages.hero ? { image: uploadedImages.hero } : {}),
  },
  hero: {
    _type: "object",
    heading: {
      _type: "sectionHeading",
      title: "Achievements",
    },
    ...(uploadedImages.hero ? { image: uploadedImages.hero } : {}),
    topLineColor: "#216B97",
    panelColor: "#00A5B2",
    waveColor: "#d97252",
    textColor: "#ffffff",
    imagePosition: "center",
    imageWidth: "58%",
  },
  innerNavigation: {
    _type: "object",
    items: [
      { _key: "student-life", _type: "object", label: "Student Life", href: "/student-life", openInNewTab: false },
      {
        _key: "student-programs",
        _type: "object",
        label: "Achievements",
        href: "/student-programs",
        openInNewTab: false,
      },
      {
        _key: "extra-curricular-activities",
        _type: "object",
        label: "Extra Curricular Activities",
        href: "/extra-curricular-activities",
        openInNewTab: false,
      },
    ],
    activeHref: "/student-programs",
    activeColor: "#216B97",
    inactiveColor: "#d97252",
    textColor: "#ffffff",
    dividerColor: "#ffffff",
    topLineColor: "#ffffff",
    ariaLabel: "Student life sections",
  },
  excellenceIntro: {
    _type: "object",
    heading: {
      _type: "sectionHeading",
      title: "Honoring Excellence in\nEvery Journey",
      description: [
        block(
          "achievements-intro-1",
          "Excellence is more than a goal it is a continuous journey reflected in the accomplishments of our vibrant student body and dedicated staff. Our school takes pride in nurturing learners who excel in academics, sports, leadership, creativity, and innovation."
        ),
        block(
          "achievements-intro-2",
          "Throughout the academic year, our students have distinguished themselves in a wide array of local and national competitions, demonstrating critical thinking, communication, and collaborative skills. From mathematics challenges and reading contests to national-level innovation fairs and debate forums, our students consistently represent the school with pride and intellect."
        ),
      ],
    },
    ...image("excellence", "excellenceIntro"),
    imagePosition: "right",
    backgroundColor: "#ffffff",
    titleColor: "#216B97",
    textColor: "#666B70",
  },
  highlightsSection: {
    _type: "object",
    heading: {
      _type: "sectionHeading",
      title: "Competitions and Platforms",
      description: [
        block(
          "achievements-highlight-sports",
          "In the sports arena, our teams have earned top rankings in inter-school tournaments, including a remarkable second place in the Canadian University Football Championship and active participation in the AUS Sharakah Sports Festival."
        ),
        block(
          "achievements-highlight-chess",
          "Our chess players have also made notable strides, participating in inter-school chess tournaments that celebrate strategic thinking and mental agility."
        ),
        block(
          "achievements-highlight-culture",
          "Beyond academics and sports, our students shine in cultural, creative, and leadership platforms, whether through SAIS TALKS, entrepreneurship expos, sustainability initiatives, or the widely celebrated “Made in UAE” innovation showcase."
        ),
      ],
    },
    ...image("highlights", "highlightsSection"),
  },
  communitySection: {
    _type: "object",
    heading: {
      _type: "sectionHeading",
      title: "A Community That Celebrates Together",
      description: [
        block(
          "achievements-community-1",
          "The school also hosts vibrant community-building events, such as the annual Carnival, which brings together students, parents, and staff in a festive celebration of talent, culture, and creativity."
        ),
        block(
          "achievements-community-2",
          "These achievements are a testament to the school's holistic approach to education where curiosity is encouraged, talents are nurtured, and every student is empowered to reach their fullest potential."
        ),
        block(
          "achievements-community-3",
          "SAIS - Sharjah remains committed to building a generation of confident, capable, and compassionate individuals prepared to lead and contribute meaningfully to the world."
        ),
      ],
    },
    ...image("community", "communitySection"),
    imagePosition: "right",
    backgroundColor: "#F2F2F2",
    textColor: "#666B70",
  },
});

console.log("Seeded Achievements page.");
