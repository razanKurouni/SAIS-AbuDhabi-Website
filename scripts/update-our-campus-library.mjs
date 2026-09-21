import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "uwffig4f";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "sais-uaq";
const token = process.env.SANITY_AUTH_TOKEN;

if (!token) {
  throw new Error("SANITY_AUTH_TOKEN is required to update the Our Campus library section.");
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

const librarySection = {
  _type: "imageTextSection",
  heading: {
    _type: "sectionHeading",
    title: "The Library",
    description: [
      block(
        "library-overview",
        "Our library is a vibrant center for learning, imagination, and exploration. We are proud to offer two dedicated libraries to meet the unique needs of our students at every stage.",
      ),
    ],
  },
  image: {
    _type: "imageWithAlt",
    image: {
      _type: "image",
      asset: {
        _type: "reference",
        _ref: "image-86e2560ca921228affb05409df160770bbe8916a-1528x1312-jpg",
      },
    },
    alt: "SAIS students and staff in a modern campus learning space",
  },
  imagePosition: "left",
  theme: "blue",
};

await client.patch("our-campus-page").set({ librarySection }).commit({ autoGenerateArrayKeys: true });

console.log("Updated the Our Campus library section in Sanity.");
