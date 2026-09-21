import { createReadStream } from "node:fs";
import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2025-08-15" });
const imagePath = "/Users/razan/Downloads/_DEL3869.jpg";

const span = (key, text) => ({
  _key: `${key}-span`,
  _type: "span",
  marks: [],
  text,
});

const paragraph = (key, text) => ({
  _key: key,
  _type: "block",
  children: [span(key, text)],
  markDefs: [],
  style: "normal",
});

const bullet = (key, text) => ({
  ...paragraph(key, text),
  level: 1,
  listItem: "bullet",
});

const asset = await client.assets.upload("image", createReadStream(imagePath), {
  filename: "sais-sharjah-virtual-tour.jpg",
});

const virtualTourSection = {
  _type: "imageTextSection",
  heading: {
    _type: "sectionHeading",
    title: "Virtual Tour Experience",
    description: [
      paragraph(
        "virtual-tour-intro",
        "Can’t visit in person? Take a 360° virtual tour of our campus from anywhere in the world.",
      ),
      paragraph("virtual-tour-list-heading", "Our interactive virtual tour includes:"),
      bullet("virtual-tour-spaces", "Panoramic views of learning spaces"),
      bullet("virtual-tour-activities", "Video highlights of student activities and events"),
      bullet("virtual-tour-facilities", "Narrated walkthroughs of key facilities"),
      bullet("virtual-tour-life", "Insights into student life at SAIS"),
    ],
  },
  image: {
    _type: "imageWithAlt",
    alt: "SAIS - Sharjah students learning in the classroom",
    image: {
      _type: "image",
      asset: { _type: "reference", _ref: asset._id },
    },
  },
  ctas: [
    {
      _key: "virtual-tour",
      _type: "cta",
      label: "Virtual Tour",
      href: "#",
      openInNewTab: false,
      variant: "primary",
    },
  ],
  imagePosition: "left",
  theme: "light",
  backgroundColor: "#808080",
  titleColor: "#ffffff",
  textColor: "#ffffff",
};

const result = await client
  .patch("admissions-book-tour-page")
  .set({ virtualTourSection })
  .commit({ autoGenerateArrayKeys: true });

console.log(
  JSON.stringify(
    {
      documentId: result._id,
      dataset: client.config().dataset,
      title: result.virtualTourSection?.heading?.title,
      imageAsset: asset._id,
    },
    null,
    2,
  ),
);
