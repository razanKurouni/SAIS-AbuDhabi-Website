import fs from "node:fs";
import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2023-01-01" });

async function uploadImage(path, filename, title) {
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

function paragraph(_key, text) {
  return {
    _type: "block",
    _key,
    style: "normal",
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: `${_key}-text`,
        text,
        marks: [],
      },
    ],
  };
}

const approachImage = await uploadImage(
  "/Users/razan/Downloads/Mask Group 2.png",
  "sais-educational-approach.png",
  "SAIS students exploring classroom learning activities"
);

await client
  .patch("homepage-main")
  .set({
    whySection: {
      _type: "imageTextSection",
      heading: {
        _type: "sectionHeading",
        title: "Educational Approach",
        subtitle:
          "Our educational approach is grounded in evidence-based practices and contemporary pedagogical research.",
        description: [
          paragraph(
            "professional-development",
            "Professional development for our faculty remains a cornerstone of our excellence, ensuring our teaching methodologies reflect the most current and effective educational strategies. We recognize that students possess diverse learning styles, and our instructional approaches are thoughtfully differentiated to address these variations."
          ),
          paragraph(
            "parental-partnership",
            "We deeply value parental partnership and actively encourage family involvement in our school community. Parents are essential collaborators in their children's educational journey, and we continuously develop meaningful opportunities for engagement."
          ),
        ],
      },
      image: approachImage,
      imagePosition: "right",
      theme: "teal",
      ctas: [
        {
          _type: "cta",
          _key: "see-more",
          label: "See More",
          href: "#why-sais",
          variant: "primary",
          openInNewTab: false,
        },
      ],
    },
  })
  .commit();

console.log("Updated homepage-main.whySection and uploaded the approach image.");
