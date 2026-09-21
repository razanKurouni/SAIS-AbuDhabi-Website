import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@sanity/client";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "uwffig4f",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "sais-uaq",
  apiVersion: "2023-01-01",
  token: process.env.SANITY_AUTH_TOKEN,
  useCdn: false,
});

if (!process.env.SANITY_AUTH_TOKEN) {
  throw new Error("SANITY_AUTH_TOKEN is required to seed the Extra Curricular Activities page.");
}

const imageSources = {
  hero: {
    path: path.join(projectRoot, "public/about-values-community.jpg"),
    filename: "extra-curricular-activities-hero.jpg",
    title: "SAIS - Sharjah extracurricular activities",
  },
  music: {
    path: path.join(projectRoot, "public/extra-curricular-music.jpg"),
    filename: "extra-curricular-music.jpg",
    title: "SAIS - Sharjah student playing the violin during a music lesson",
  },
  sports: {
    path: path.join(projectRoot, "public/extra-curricular-sports.jpg"),
    filename: "extra-curricular-sports.jpg",
    title: "SAIS - Sharjah students during a sports training session",
  },
  clubs: {
    path: path.join(projectRoot, "public/extra-curricular-clubs.jpg"),
    filename: "extra-curricular-clubs.jpg",
    title: "SAIS - Sharjah students working together in a school club",
  },
};

async function uploadImage({ path: imagePath, filename, title }) {
  if (!fs.existsSync(imagePath)) {
    return null;
  }

  const asset = await client.assets.upload("image", fs.createReadStream(imagePath), {
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

function slide({ key, title, body, image }) {
  return {
    _key: key,
    _type: "activitySlide",
    title,
    body,
    ...(image ? { image } : {}),
    backgroundColor: "#216B97",
    sideColor: "#00A5B2",
    ringColor: "#D97252",
    titleColor: "#ffffff",
    textColor: "#ffffff",
    imagePosition: "center",
  };
}

const uploadedImages = await Promise.all(
  Object.entries(imageSources).map(async ([key, source]) => [key, await uploadImage(source)]),
).then(Object.fromEntries);

await client.createOrReplace({
  _id: "extra-curricular-activities-page",
  _type: "extraCurricularActivitiesPage",
  seo: {
    _type: "seo",
    title: "Extra Curricular Activities | SAIS - Sharjah",
    description: "Explore extracurricular activities at Sharjah American International School.",
    image: uploadedImages.hero,
  },
  hero: {
    _type: "object",
    heading: {
      _type: "sectionHeading",
      title: "Extra Curricular\nActivities",
    },
    image: uploadedImages.hero,
    topLineColor: "#216B97",
    panelColor: "#707174",
    waveColor: "#00A5B2",
    textColor: "#ffffff",
    imagePosition: "center",
    imageWidth: "58%",
  },
  innerNavigation: {
    _type: "object",
    items: [
      {
        _key: "student-life",
        label: "Student Life",
        href: "/student-life",
        openInNewTab: false,
      },
      {
        _key: "student-programs",
        label: "Student Programs",
        href: "/student-programs",
        openInNewTab: false,
      },
      {
        _key: "extra-curricular-activities",
        label: "Extra Curricular Activities",
        href: "/extra-curricular-activities",
        openInNewTab: false,
      },
    ],
    activeHref: "/extra-curricular-activities",
    activeColor: "#216B97",
    inactiveColor: "#d97252",
    textColor: "#ffffff",
    dividerColor: "#ffffff",
    topLineColor: "#ffffff",
    ariaLabel: "Student Life page navigation",
  },
  enrichingIntro: {
    _type: "object",
    heading: {
      _type: "sectionHeading",
      title: "Enriching Every Student Journey",
      subtitle:
        "Our Extra-Curricular Program enriches students' learning beyond the classroom through a structured range of clubs, sports, arts, and leadership activities offered throughout the school year.",
      description: [
        block(
          "extra-curricular-intro",
          "Students participate in regular sessions, events, and competitions that allow them to explore their interests, develop new skills, and take on leadership roles. Through active engagement, collaboration, and real-life experiences, the program fosters confidence, teamwork, creativity, and personal growth."
        ),
      ],
    },
    backgroundColor: "#ffffff",
    titleColor: "#216B97",
    subtitleColor: "#00A5B2",
    textColor: "#666B70",
  },
  activitiesSlider: {
    _type: "object",
    heading: {
      _type: "sectionHeading",
      title: "",
    },
    slides: [
      slide({
        key: "music",
        title: "Music",
        body:
          "Our music program invites students to explore the world of sound and rhythm through band, choir, and instrumental lessons. Students develop their musical skills, build confidence in performance, and enjoy opportunities to participate in concerts and school events. Music nurtures creativity, discipline, and a lifelong appreciation for the arts.",
        image: uploadedImages.music,
      }),
      slide({
        key: "sports",
        title: "Sports",
        body:
          "Swimming, badminton, football, and volleyball run throughout the year, with structured training sessions and friendly matches. Students improve their technique and fitness while building the discipline, communication, and teamwork that competitive play asks of them, and represent the school in interschool fixtures.",
        image: uploadedImages.sports,
      }),
      slide({
        key: "clubs-and-leadership",
        title: "Clubs and Leadership",
        body:
          "Environmental clubs, public speaking forums, chess, robotics, and student leadership groups give students a place to pursue what interests them and to lead. Members plan their own events, take part in competitions and expos, and learn to organise, collaborate, and speak for their peers with confidence.",
        image: uploadedImages.clubs,
      }),
    ],
  },
});

console.log("Seeded Extra Curricular Activities page.");
