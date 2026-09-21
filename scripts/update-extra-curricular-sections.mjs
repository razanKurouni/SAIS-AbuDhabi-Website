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
  throw new Error("SANITY_AUTH_TOKEN is required to update the Extra Curricular Activities page.");
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
const musicImage = await uploadImage(
  "public/extra-curricular-music.jpg",
  "extra-curricular-music.jpg",
  "SAIS - Sharjah student playing the violin during a music lesson"
);
const sportsImage = await uploadImage(
  "public/extra-curricular-sports.jpg",
  "extra-curricular-sports.jpg",
  "SAIS - Sharjah students during a sports training session"
);
const clubsImage = await uploadImage(
  "public/extra-curricular-clubs.jpg",
  "extra-curricular-clubs.jpg",
  "SAIS - Sharjah students working together in a school club"
);

const slide = (key, title, body, image) => ({
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
});

const enrichingIntro = {
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
};

const activitiesSlider = {
  _type: "object",
  heading: { _type: "sectionHeading", title: "" },
  slides: [
    slide(
      "music",
      "Music",
      "Our music program invites students to explore the world of sound and rhythm through band, choir, and instrumental lessons. Students develop their musical skills, build confidence in performance, and enjoy opportunities to participate in concerts and school events. Music nurtures creativity, discipline, and a lifelong appreciation for the arts.",
      musicImage
    ),
    slide(
      "sports",
      "Sports",
      "Swimming, badminton, football, and volleyball run throughout the year, with structured training sessions and friendly matches. Students improve their technique and fitness while building the discipline, communication, and teamwork that competitive play asks of them, and represent the school in interschool fixtures.",
      sportsImage
    ),
    slide(
      "clubs-and-leadership",
      "Clubs and Leadership",
      "Environmental clubs, public speaking forums, chess, robotics, and student leadership groups give students a place to pursue what interests them and to lead. Members plan their own events, take part in competitions and expos, and learn to organise, collaborate, and speak for their peers with confidence.",
      clubsImage
    ),
  ],
};

const result = await client
  .patch("extra-curricular-activities-page")
  .set({ enrichingIntro, activitiesSlider })
  .unset(["introSection", "activitiesSection"])
  .commit({ autoGenerateArrayKeys: false });

console.log(
  JSON.stringify(
    {
      documentId: result._id,
      dataset: client.config().dataset,
      fields: ["enrichingIntro", "activitiesSlider"],
      unset: ["introSection", "activitiesSection"],
      imagesUploaded: {
        music: Boolean(musicImage),
        sports: Boolean(sportsImage),
        clubs: Boolean(clubsImage),
      },
    },
    null,
    2
  )
);
