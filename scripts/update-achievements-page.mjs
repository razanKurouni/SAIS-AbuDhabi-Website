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
  throw new Error("SANITY_AUTH_TOKEN is required to update the Achievements page.");
}

const block = (key, text) => ({
  _key: key,
  _type: "block",
  style: "normal",
  markDefs: [],
  children: [{ _key: `${key}-text`, _type: "span", marks: [], text }],
});

async function uploadImage(path, filename, title) {
  if (!fs.existsSync(path)) {
    return null;
  }

  const asset = await client.assets.upload("image", fs.createReadStream(path), { filename, title });

  return {
    _type: "imageWithAlt",
    image: { _type: "image", asset: { _type: "reference", _ref: asset._id } },
    alt: title,
  };
}

// Optional: drop the real photos in public/ under these names and they are uploaded too.
const excellenceImage = await uploadImage(
  "public/achievements-excellence.jpg",
  "achievements-excellence.jpg",
  "SAIS - Sharjah swimming coach guiding a student in the pool"
);
const highlightsImage = await uploadImage(
  "public/achievements-highlights.jpg",
  "achievements-highlights.jpg",
  "SAIS - Sharjah student playing the violin during a music lesson"
);
const communityImage = await uploadImage(
  "public/achievements-community.jpg",
  "achievements-community.jpg",
  "SAIS - Sharjah students celebrating at a school chess tournament"
);

const excellenceIntro = {
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
  ...(excellenceImage ? { image: excellenceImage } : {}),
  imagePosition: "right",
  backgroundColor: "#ffffff",
  titleColor: "#216B97",
  textColor: "#666B70",
};

const highlightsSection = {
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
  ...(highlightsImage ? { image: highlightsImage } : {}),
};

const communitySection = {
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
  ...(communityImage ? { image: communityImage } : {}),
  imagePosition: "right",
  backgroundColor: "#F2F2F2",
  textColor: "#666B70",
};

const result = await client
  .patch("student-programs-page")
  .set({
    "seo.title": "Achievements | SAIS - Sharjah",
    "seo.description": "Explore student achievements in academics, sports, and leadership at SAIS - Sharjah.",
    "hero.heading.title": "Achievements",
    "innerNavigation.items[_key == \"student-programs\"].label": "Achievements",
    excellenceIntro,
    highlightsSection,
    communitySection,
  })
  .unset([
    "introSection",
    "proactiveApproach",
    "studentCongressSection",
    "sgaGoalsSection",
    "coreValuesSection",
    "leadershipStructureSection",
    "eligibilitySection",
  ])
  .commit({ autoGenerateArrayKeys: false });

// The other two pages in this navigation carry the same label.
for (const id of ["student-life-page", "extra-curricular-activities-page"]) {
  await client
    .patch(id)
    .set({ 'innerNavigation.items[_key == "student-programs"].label': "Achievements" })
    .commit()
    .catch((error) => console.warn(`Could not update ${id}: ${error.message}`));
}

console.log(
  JSON.stringify(
    {
      documentId: result._id,
      dataset: client.config().dataset,
      fields: ["excellenceIntro", "highlightsSection", "communitySection", "hero.heading.title", "seo"],
      unset: [
        "introSection",
        "proactiveApproach",
        "studentCongressSection",
        "sgaGoalsSection",
        "coreValuesSection",
        "leadershipStructureSection",
        "eligibilitySection",
      ],
      imagesUploaded: {
        excellence: Boolean(excellenceImage),
        highlights: Boolean(highlightsImage),
        community: Boolean(communityImage),
      },
    },
    null,
    2
  )
);
