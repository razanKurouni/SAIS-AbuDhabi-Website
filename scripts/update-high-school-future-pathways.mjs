import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2025-08-15" });

const block = (key, text) => ({
  _key: key,
  _type: "block",
  style: "normal",
  markDefs: [],
  children: [
    {
      _key: `${key}-span`,
      _type: "span",
      marks: [],
      text,
    },
  ],
});

const pathwaysSection = {
  _type: "object",
  heading: {
    _type: "sectionHeading",
    title: "Shaping Confident\nFuture Pathways",
    description: [
      block(
        "hs-pathways-confident-decisions",
        "Our Career and Guidance program is designed to support students in making informed and confident decisions about their future.",
      ),
      block(
        "hs-pathways-personalized-guidance",
        "We provide personalized guidance, reliable resources, and meaningful opportunities that help students understand their strengths, explore career pathways, and navigate university options.",
      ),
    ],
  },
  image: {
    _type: "imageWithAlt",
    alt: "SAIS - Sharjah high school students receiving career guidance",
    image: {
      _type: "image",
      asset: {
        _type: "reference",
        _ref: "image-ca7fcf0fc83f77f9374465abfdb00fe8c4fb8a1d-1560x1252-jpg",
      },
    },
  },
  imageSide: "left",
  imagePosition: "center",
  backgroundColor: "#ffffff",
  panelColor: "#00A5B2",
  waveColor: "#df7150",
  titleColor: "#ffffff",
  textColor: "#ffffff",
};

await client
  .patch("academics-high-school-page")
  .set({ pathwaysSection })
  .commit();

console.log(
  JSON.stringify(
    {
      status: "updated",
      dataset: client.config().dataset,
      documentId: "academics-high-school-page",
      field: "pathwaysSection",
    },
    null,
    2,
  ),
);
