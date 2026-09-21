import fs from "node:fs";
import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2023-01-01" });
const sourcePath = "/Users/razan/Downloads/_DEL3869.jpg";

if (!fs.existsSync(sourcePath)) {
  throw new Error(`Homepage growth section image was not found at ${sourcePath}`);
}

function block(_key, text) {
  return {
    _type: "block",
    _key,
    style: "normal",
    markDefs: [],
    children: [{ _type: "span", _key: `${_key}-text`, text, marks: [] }],
  };
}

const asset = await client.assets.upload("image", fs.createReadStream(sourcePath), {
  filename: "homepage-sais-growth-classroom.jpg",
  title: "SAIS - Sharjah students participating in class",
});

await client.patch("homepage-main").set({
  growthSection: {
    _type: "imageTextSection",
    heading: {
      _type: "sectionHeading",
      title: "SAIS Growth and Curriculum",
      description: [
        block("growth-section-body-1", "In response to growing demand and a commitment to educational accessibility, the SAIS Group expanded its reach across the UAE. A second campus was opened in Dubai in 2005, followed by a branch in Umm Al Quwain in 2014, and another in Abu Dhabi in 2016. Each school maintains the SAIS commitment to diversity, innovation, and academic rigor, while serving a wide range of learners across different communities."),
        block("growth-section-body-2", "The school offers a rigorous American Curriculum based on the California State Education Framework and aligned with internationally recognized standards such as the Common Core State Standards (CCSS) for English and Math and the Next Generation Science Standards (NGSS) for Science."),
      ],
    },
    image: {
      _type: "imageWithAlt",
      image: { _type: "image", asset: { _type: "reference", _ref: asset._id } },
      alt: "SAIS - Sharjah students participating in a classroom lesson",
    },
    imagePosition: "right",
    theme: "teal",
    ctas: [],
  },
}).commit();

console.log(`Updated homepage-main.growthSection with ${asset._id}`);
