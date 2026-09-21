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
  throw new Error("SANITY_AUTH_TOKEN is required to seed the Transportation Safety Guidelines page.");
}

const imageSources = {
  hero: {
    path: "/Users/razan/Downloads/_DEL4056.JPG",
    filename: "transportation-safety-hero.jpg",
    title: "SAIS - Sharjah school bus transportation",
  },
  highlight: {
    path: "/Users/razan/Downloads/transportation-safety-students.jpg",
    filename: "transportation-safety-students.jpg",
    title: "SAIS - Sharjah students gathered in the school yard",
    optional: true,
  },
  boarding: {
    path: "/Users/razan/Downloads/transportation-safety-boarding.jpg",
    filename: "transportation-safety-boarding.jpg",
    title: "SAIS - Sharjah student carrying a project kit",
    optional: true,
  },
};

async function uploadImage({ path, filename, title, optional }) {
  if (!fs.existsSync(path)) {
    if (optional) {
      return null;
    }

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

function block(key, text) {
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
        marks: [],
      },
    ],
  };
}

function updateCommunityCard(page) {
  const cards = page?.linksSection?.cards;
  if (!Array.isArray(cards)) return null;

  return cards.map((card) => {
    const isTransportationCard =
      card?._key === "transportation-safety-guidelines" ||
      card?.title === "Transportation Safety Guidelines";

    if (!isTransportationCard) return card;

    return {
      ...card,
      cta: {
        ...(card.cta || {}),
        _type: "cta",
        label: card.cta?.label || "See More",
        href: "/transportation-safety-guidelines",
        variant: card.cta?.variant || "primary",
        openInNewTab: false,
      },
    };
  });
}

const [uploadedImages, existingPage, communityPage] = await Promise.all([
  Promise.all(Object.entries(imageSources).map(async ([key, source]) => [key, await uploadImage(source)])),
  client.getDocument("transportation-safety-page").catch(() => null),
  client.getDocument("our-community-page").catch(() => null),
]).then(([images, page, community]) => [Object.fromEntries(images), page, community]);

await client.createOrReplace({
  _id: "transportation-safety-page",
  _type: "transportationSafetyPage",
  seo: {
    _type: "seo",
    title: "School Transportation Safety Guidelines | SAIS - Sharjah",
    description: "Learn about school transportation safety guidelines at SAIS - Sharjah.",
    image: existingPage?.seo?.image || uploadedImages.hero,
  },
  hero: existingPage?.hero || {
    _type: "object",
    heading: {
      _type: "sectionHeading",
      title: "School Transportation\nSafety Guidelines",
    },
    image: uploadedImages.hero,
    topLineColor: "#216B97",
    panelColor: "#00A5B2",
    waveColor: "#d97252",
    textColor: "#ffffff",
    imagePosition: "center",
    imageWidth: "58%",
  },
  safetyHighlight: {
    _type: "object",
    heading: {
      _type: "sectionHeading",
      title: "Student Safety on Every Journey",
      description: [
        block(
          "transportation-safety-highlight-intro",
          "Student safety and wellbeing are at the forefront of our transportation services. All school buses are equipped with live monitoring systems, internal surveillance cameras, and GPS tracking to ensure secure and efficient travel."
        ),
      ],
    },
    image:
      uploadedImages.highlight || existingPage?.safetyHighlight?.image || uploadedImages.hero,
    imagePosition: "center",
    backgroundColor: "#216B97",
    titleColor: "#00A5B2",
    textColor: "#ffffff",
  },
  boardingSection: {
    _type: "imageTextSection",
    heading: {
      _type: "sectionHeading",
      title: "Boarding & Supervision",
      description: [
        block(
          "transportation-boarding-1",
          "To maintain safety and organization, seating assignments follow a structured route-based system. Boarding procedures are designed to minimize student conflict."
        ),
        block(
          "transportation-boarding-2",
          "Each bus is staffed with a licensed driver and a trained assistant who ensure student supervision, manage attendance, and support younger children. Detailed attendance records are maintained daily, and absences are promptly reported to the school administration."
        ),
        block(
          "transportation-boarding-3",
          "Additionally, all buses undergo regular cleaning and sanitization to uphold the highest standards of hygiene and safety."
        ),
      ],
    },
    image: uploadedImages.boarding || existingPage?.boardingSection?.image || uploadedImages.hero,
    imagePosition: "left",
    theme: "light",
  },
});

const updatedCards = updateCommunityCard(communityPage);

if (updatedCards) {
  await client.patch("our-community-page").set({ "linksSection.cards": updatedCards }).commit();
}

console.log("Seeded Transportation Safety Guidelines page and linked the community card.");
