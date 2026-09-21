import fs from "node:fs";
import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "uwffig4f";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "sais-uaq";
const token = process.env.SANITY_AUTH_TOKEN;

if (!token) {
  throw new Error("SANITY_AUTH_TOKEN is required to update the admissions fees page.");
}

const client = createClient({ projectId, dataset, token, apiVersion: "2023-01-01", useCdn: false });

function block(key, text) {
  return {
    _key: key,
    _type: "block",
    style: "normal",
    markDefs: [],
    children: [{ _key: `${key}-span`, _type: "span", marks: [], text }],
  };
}

const imagePath = "/Users/razan/Downloads/_DEL3869.jpg";
const imageAlt = "SAIS - Sharjah students learning together in the classroom";
const asset = await client.assets.upload("image", fs.createReadStream(imagePath), {
  filename: "admissions-fees-students-learning.jpg",
  title: imageAlt,
});

const journeySection = {
  _type: "imageTextSection",
  heading: {
    _type: "sectionHeading",
    title: "Begin Your Child’s Journey With Us",
    subtitle: "Our admissions process is designed to be welcoming, transparent, and student-centered.",
    description: [
      block(
        "journey-readiness",
        "We are committed to enrolling students who demonstrate a readiness to thrive in our academically rigorous and values-driven learning environment.",
      ),
      block(
        "journey-support",
        "Our admissions team provides personalized support to families throughout the application process, ensuring a smooth transition into the SAIS community. We invite prospective parents and students to visit our campus, meet our faculty, and discover how SAIS fosters academic excellence, character development, and global citizenship from KG through Grade 12.",
      ),
    ],
  },
  image: {
    _type: "imageWithAlt",
    image: { _type: "image", asset: { _type: "reference", _ref: asset._id } },
    alt: imageAlt,
  },
  imagePosition: "right",
  theme: "light",
  backgroundColor: "#ffffff",
  titleColor: "#00a5b2",
  textColor: "#707278",
};

await client
  .patch("admissions-fees-page")
  .set({ journeySection })
  .unset(["feesIntro", "discountPolicy"])
  .commit({ autoGenerateArrayKeys: true });

console.log(`Updated admissions-fees-page with journey section using ${asset._id}.`);
