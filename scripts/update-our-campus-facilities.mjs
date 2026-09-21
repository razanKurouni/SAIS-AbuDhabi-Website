import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "uwffig4f";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "sais-uaq";
const token = process.env.SANITY_AUTH_TOKEN;

if (!token) {
  throw new Error("SANITY_AUTH_TOKEN is required to update the Our Campus facilities section.");
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

const facilities = {
  _type: "imageTextSection",
  heading: {
    _type: "sectionHeading",
    title: "Facilities",
    description: [
      block(
        "facilities-overview",
        "We provide world-class facilities to support every aspect of student learning and development. From modern classrooms and science and computer labs to arts studios, sports arenas, and recreational spaces, our campus is equipped to inspire creativity, innovation, and active learning. Every facility is designed with student growth, safety, and well-being in mind.",
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
    alt: "SAIS students and staff meeting in a modern campus learning space",
  },
  imagePosition: "right",
  theme: "teal",
  titleColor: "#FFFFFF",
  textColor: "#FFFFFF",
};

await client.patch("our-campus-page").set({ facilities }).commit({ autoGenerateArrayKeys: true });

console.log("Updated the Our Campus facilities section in Sanity.");
