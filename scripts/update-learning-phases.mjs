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

const kindergartenImage = await uploadImage(
  "/Users/razan/Downloads/_DEL4494.jpg",
  "sais-kindergarten-learning-phase.jpg",
  "Kindergarten students reading with their teacher"
);

const elementaryImage = await uploadImage(
  "/Users/razan/Downloads/_DEL44942.jpg",
  "sais-elementary-learning-phase.jpg",
  "Elementary students reading in the library"
);

const middleSchoolImage = await uploadImage(
  "/Users/razan/Downloads/_DEL44943.jpg",
  "sais-middle-school-learning-phase.jpg",
  "Middle school students working with microscopes"
);

const highSchoolImage = await uploadImage(
  "/Users/razan/Downloads/_DEL44945.jpg",
  "sais-high-school-learning-phase.jpg",
  "High school students in a science lab"
);

await client
  .patch("homepage-main")
  .set({
    learningPhases: {
      _type: "object",
      heading: {
        _type: "sectionHeading",
        title: "Our Learning Phases",
      },
      cta: {
        _type: "cta",
        label: "See More",
        href: "#learning-phases",
        variant: "primary",
        openInNewTab: false,
      },
      cards: [
        {
          _type: "featureCard",
          _key: "kindergarten",
          title: "Kindergarten",
          description: "KG - Grade 2",
          theme: "blue",
          image: kindergartenImage,
          cta: {
            _type: "cta",
            label: "See More",
            href: "#kindergarten",
            variant: "primary",
            openInNewTab: false,
          },
        },
        {
          _type: "featureCard",
          _key: "elementary",
          title: "Elementary",
          description: "Grades 3 & 4",
          theme: "teal",
          image: elementaryImage,
          cta: {
            _type: "cta",
            label: "See More",
            href: "#elementary",
            variant: "primary",
            openInNewTab: false,
          },
        },
        {
          _type: "featureCard",
          _key: "middle-school",
          title: "Middle School",
          description: "Grades 6 - 8",
          theme: "orange",
          image: middleSchoolImage,
          cta: {
            _type: "cta",
            label: "See More",
            href: "#middle-school",
            variant: "primary",
            openInNewTab: false,
          },
        },
        {
          _type: "featureCard",
          _key: "high-school",
          title: "High School",
          description: "Grades 9 - 12",
          theme: "gray",
          image: highSchoolImage,
          cta: {
            _type: "cta",
            label: "See More",
            href: "#high-school",
            variant: "primary",
            openInNewTab: false,
          },
        },
      ],
    },
  })
  .commit();

console.log("Updated homepage-main.learningPhases and uploaded the four phase images.");
