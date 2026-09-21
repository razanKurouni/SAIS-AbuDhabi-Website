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

const buildingImage = await uploadImage(
  "/Users/razan/Downloads/_DEL4004.jpg",
  "sais-dubai-building.jpg",
  "Sharjah American International School building"
);

const icons = await Promise.all([
  uploadImage("/Users/razan/Downloads/Ellipse 47.svg", "why-dubai-student-icon.svg", "Student achievement icon background"),
  uploadImage("/Users/razan/Downloads/Ellipse 442.svg", "why-dubai-globe-icon.svg", "Teaching standards icon background"),
  uploadImage("/Users/razan/Downloads/Ellipse 46.svg", "why-dubai-learning-icon.svg", "Adaptive learning icon background"),
  uploadImage("/Users/razan/Downloads/Ellipse 45.svg", "why-dubai-family-icon.svg", "School community icon background"),
]);

await client
  .patch("homepage-main")
  .set({
    whyDubai: {
      _type: "object",
      heading: {
        _type: "sectionHeading",
        title: "Why SAIS - Sharjah?",
        subtitle:
          "Sharjah American International School offers an American based curriculum within the framework of Islamic values.",
      },
      image: buildingImage,
      items: [
        {
          _type: "whyDubaiItem",
          _key: "well-rounded",
          title: "Well-rounded students",
          description:
            "Aims to develop well-rounded, bilingual students equipped for the 21st century",
          iconType: "student",
          icon: icons[0],
        },
        {
          _type: "whyDubaiItem",
          _key: "staff-development",
          title: "Staff development",
          description: "Focuses on staff development to maintain high teaching standards",
          iconType: "globe",
          icon: icons[1],
        },
        {
          _type: "whyDubaiItem",
          _key: "adaptive-learning",
          title: "Adaptive learning",
          description:
            "Recognizes that children learn in different ways and adapts teaching accordingly",
          iconType: "learning",
          icon: icons[2],
        },
        {
          _type: "whyDubaiItem",
          _key: "school-experience",
          title: "School experience",
          description:
            "Creates an enriching and fulfilling school experience for students and families",
          iconType: "family",
          icon: icons[3],
        },
      ],
    },
  })
  .commit();

console.log("Updated homepage-main.whyDubai and uploaded the building image/icons.");
