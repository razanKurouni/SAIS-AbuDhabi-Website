import { createReadStream } from "node:fs";
import { resolve } from "node:path";
import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2025-08-15" });

const block = (_key, text, options = {}) => ({
  _key,
  _type: "block",
  style: "normal",
  markDefs: [],
  children: [
    {
      _key: `${_key}-span`,
      _type: "span",
      marks: options.strong ? ["strong"] : [],
      text,
    },
  ],
  ...(options.listItem ? { listItem: options.listItem, level: 1 } : {}),
});

const imagePath = resolve("public/academics-high-school-ap-support.png");
const asset = await client.assets.upload("image", createReadStream(imagePath), {
  filename: "academics-high-school-ap-support.png",
});

const apSupportSection = {
  _type: "object",
  heading: {
    _type: "sectionHeading",
    title: "AP Courses Support",
    description: [
      block("ap-support-lead", "AP courses are supported by:", { strong: true }),
      block("ap-support-teachers", "Qualified AP-certified teachers with strong subject expertise", { listItem: "bullet" }),
      block("ap-support-advising", "Academic advising to help students choose the right AP pathway", { listItem: "bullet" }),
      block("ap-support-resources", "Access to digital AP resources and College Board tools", { listItem: "bullet" }),
      block("ap-support-preparation", "SAT, TOEFL, and IELTS preparation to complement college readiness", { listItem: "bullet" }),
      block("ap-support-counseling", "Alignment with our University and Career Counseling Program", { listItem: "bullet" }),
      block(
        "ap-support-outcome",
        "With the combination of the American High School Diploma and AP courses and exams, SAIS graduates are well-prepared for entry into universities in the USA, UK, Europe, Canada, the UAE, and beyond."
      ),
    ],
  },
  image: {
    _type: "imageWithAlt",
    alt: "SAIS - Sharjah high school student discussing future university pathways",
    image: {
      _type: "image",
      asset: { _type: "reference", _ref: asset._id },
    },
  },
  imageSide: "right",
  imagePosition: "center",
  panelColor: "#27779d",
  waveColor: "#00a5b2",
  titleColor: "#ffffff",
  textColor: "#ffffff",
};

const result = await client
  .patch("academics-high-school-page")
  .set({ apSupportSection })
  .commit({ autoGenerateArrayKeys: true });

console.log(
  JSON.stringify(
    {
      documentId: result._id,
      dataset: client.config().dataset,
      field: "apSupportSection",
      imageAssetId: asset._id,
    },
    null,
    2
  )
);
