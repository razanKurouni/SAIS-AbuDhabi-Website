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
  throw new Error("SANITY_AUTH_TOKEN is required to seed the Parent Involvement page.");
}

const imageSources = {
  hero: {
    path: "/Users/razan/Downloads/DSC05652.jpg",
    filename: "parent-involvement-hero.jpg",
    title: "SAIS - Sharjah students smiling in school",
  },
  parentTeacherMeetings: {
    path: "/Users/razan/Downloads/Repeat Grid 3.png",
    filename: "parent-teacher-meetings-icon.png",
    title: "Parent teacher meetings icon",
  },
  teacherConferences: {
    path: "/Users/razan/Downloads/Group 511.png",
    filename: "teacher-conferences-icon.png",
    title: "Teacher conferences icon",
  },
  celebrations: {
    path: "/Users/razan/Downloads/Group 512.png",
    filename: "celebrations-icon.png",
    title: "Celebrations icon",
  },
  awarenessCampaigns: {
    path: "/Users/razan/Downloads/Group 513.png",
    filename: "awareness-campaigns-icon.png",
    title: "Awareness campaigns icon",
  },
  culturalObservances: {
    path: "/Users/razan/Downloads/Group 515.png",
    filename: "cultural-observances-icon.png",
    title: "Cultural observances icon",
  },
  showcases: {
    path: "/Users/razan/Downloads/Group 510.png",
    filename: "showcases-icon.png",
    title: "Showcases icon",
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
    const isParentInvolvementCard = card?._key === "parent-involvement" || card?.title === "Parent Involvement";
    if (!isParentInvolvementCard) return card;

    return {
      ...card,
      cta: {
        ...(card.cta || {}),
        _type: "cta",
        label: card.cta?.label || "See More",
        href: "/parent-involvement",
        variant: card.cta?.variant || "primary",
        openInNewTab: false,
      },
    };
  });
}

const relatedContent = await client.fetch(`{
  "parentCard": *[_type == "ourCommunityPage" && _id == "our-community-page"][0].linksSection.cards[_key == "parent-involvement"][0] {
    image
  },
  "videoPoster": *[_type == "studentStaffWellbeingPage" && _id == "student-staff-wellbeing-page"][0].counsellingSection {
    image
  }
}`);

const uploadedImages = Object.fromEntries(
  await Promise.all(
    Object.entries(imageSources).map(async ([key, source]) => [key, await uploadImage(source)])
  )
);

const heroImage = uploadedImages.hero || relatedContent?.parentCard?.image || relatedContent?.videoPoster?.image;
const existingPage = await client.getDocument("parent-involvement-page").catch(() => null);

await client.createOrReplace({
  _id: "parent-involvement-page",
  _type: "parentInvolvementPage",
  seo: existingPage?.seo || {
    _type: "seo",
    title: "Parent Involvement | SAIS - Sharjah",
    description: "Learn how SAIS - Sharjah partners with parents to support student success.",
    ...(heroImage ? { image: heroImage } : {}),
  },
  hero: existingPage?.hero || {
    _type: "object",
    heading: {
      _type: "sectionHeading",
      title: "Parent\nInvolvement",
    },
    ...(heroImage ? { image: heroImage } : {}),
    topLineColor: "#216B97",
    panelColor: "#00A5B2",
    waveColor: "#d97252",
    textColor: "#ffffff",
    imagePosition: "center",
    imageWidth: "58%",
  },
  engagementSection: existingPage?.engagementSection || {
    _type: "object",
    heading: {
      _type: "sectionHeading",
      title: "Engaging Families\nin Every Step of Learning",
      description: [
        block(
          "parent-involvement-engagement-intro",
          "We believe that strong schools are built on strong partnerships with families. Parents are not just observers, they are active contributors to the school's life and culture. Their involvement plays a vital role in supporting student achievement, wellbeing, and a positive school climate."
        ),
      ],
    },
    bodyText: [
      block(
        "parent-involvement-engagement-body",
        "We foster a dynamic relationship between home and school, where parents are encouraged to participate in meaningful ways. From observing classroom lessons to joining school celebrations, and from volunteering in events to contributing through our active Parent-Teacher Association, PTA, our families are deeply engaged in the SAIS experience."
      ),
    ],
    bandColor: "#00A5B2",
    titleColor: "#216B97",
    textColor: "#216B97",
  },
  proactiveIntroSection: existingPage?.proactiveIntroSection || {
    _type: "imageTextSection",
    heading: {
      _type: "sectionHeading",
      title: "A Proactive Approach",
      description: [
        block(
          "parent-involvement-proactive-intro-1",
          "We are proud to maintain a VERY GOOD rating in parental engagement and community relationships, as noted in our most recent school inspection report, a reflection of our strong and consistent collaboration with families."
        ),
        block(
          "parent-involvement-proactive-intro-2",
          "We offer diverse opportunities for parent involvement, including:"
        ),
      ],
    },
    ...(relatedContent?.parentCard?.image || heroImage
      ? { image: relatedContent?.parentCard?.image || heroImage }
      : {}),
    imagePosition: "right",
    theme: "light",
    backgroundColor: "#F2F2F2",
    titleColor: "#00A5B2",
    textColor: "#707278",
    ctas: [],
  },
  proactiveApproach: {
    _type: "object",
    heading: {
      _type: "sectionHeading",
      title: "We offer diverse opportunities for parent involvement, including:",
    },
    cards: [
      {
        _key: "parent-teacher-conferences",
        _type: "parentInvolvementIconCard",
        title: "Parent-Teacher Conferences held twice per semester",
      },
      {
        _key: "teacher-meetings",
        _type: "parentInvolvementIconCard",
        title: "One-on-one teacher meetings upon request",
      },
      {
        _key: "lesson-observation",
        _type: "parentInvolvementIconCard",
        title: "Lesson Observation Opportunities",
      },
      {
        _key: "school-wide-events",
        _type: "parentInvolvementIconCard",
        title: "Participation In School-Wide Events, Projects, And Activities",
      },
      {
        _key: "celebrations",
        _type: "parentInvolvementIconCard",
        title: "Celebrations of Islamic, UAE, and International Observances",
      },
      {
        _key: "academic-showcases",
        _type: "parentInvolvementIconCard",
        title: "Academic Showcases and Exhibitions",
      },
    ],
    backgroundColor: "#F2F2F2",
    titleColor: "#216B97",
    cardTextColor: "#00A5B2",
    cardBorderColor: "#216B97",
    cardHoverBorderColor: "#d97252",
  },
  videoSection: existingPage?.videoSection || {
    _type: "object",
    ...(relatedContent?.videoPoster?.image || heroImage
      ? { poster: relatedContent?.videoPoster?.image || heroImage }
      : {}),
  },
});

const communityPage = await client.getDocument("our-community-page");
const updatedCards = updateCommunityCard(communityPage);

if (updatedCards) {
  await client.patch("our-community-page").set({ "linksSection.cards": updatedCards }).commit();
}

console.log("Seeded Parent Involvement page and linked the community card.");
