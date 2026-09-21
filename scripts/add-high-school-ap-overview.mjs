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

const imagePath = resolve("public/academics-high-school-ap-overview.png");
const asset = await client.assets.upload("image", createReadStream(imagePath), {
  filename: "academics-high-school-ap-overview.png",
});

const apOverviewSection = {
  _type: "imageTextSection",
  heading: {
    _type: "sectionHeading",
    title: "Advanced Placement Courses Overview",
    description: [
      block(
        "ap-overview-lead",
        "Advanced Placement courses, developed by the College Board, are globally recognized for their rigor and relevance. At SAIS, AP courses:",
        { strong: true }
      ),
      block("ap-overview-critical-thinking", "Develop critical thinking, analytical writing, and time management skills.", { listItem: "bullet" }),
      block("ap-overview-transcripts", "Enhance student transcripts and strengthen college applications.", { listItem: "bullet" }),
      block("ap-overview-credit", "Offer the opportunity to earn university credit while still in high school.", { listItem: "bullet" }),
      block("ap-overview-success", "Prepare students for academic success in higher education and beyond.", { listItem: "bullet" }),
      block("ap-overview-standards", "Align with international standards and support the UAE’s National Agenda goals for academic achievement.", { listItem: "bullet" }),
    ],
  },
  image: {
    _type: "imageWithAlt",
    alt: "SAIS - Sharjah high school students learning with a Van de Graaff generator",
    image: {
      _type: "image",
      asset: { _type: "reference", _ref: asset._id },
    },
  },
  imagePosition: "left",
  theme: "light",
  backgroundColor: "#ffffff",
  textColor: "#6f7175",
};

const result = await client
  .patch("academics-high-school-page")
  .set({ apOverviewSection })
  .commit({ autoGenerateArrayKeys: true });

console.log(
  JSON.stringify(
    {
      documentId: result._id,
      dataset: client.config().dataset,
      field: "apOverviewSection",
      imageAssetId: asset._id,
    },
    null,
    2
  )
);
