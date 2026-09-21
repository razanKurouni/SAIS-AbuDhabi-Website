import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2025-08-15" });

const image = (assetId, alt) => ({
  _type: "imageWithAlt",
  alt,
  image: {
    _type: "image",
    asset: { _type: "reference", _ref: assetId },
  },
});

const cards = [
  {
    _key: "ap-sciences",
    _type: "object",
    title: "Sciences",
    description: "• AP Biology\n• AP Chemistry\n• AP Physics 1\n• AP Physics 2\n• AP Environmental Science",
    icon: image("image-13fea8ba757b35d1b8ac92800f9bf5e7976e1be6-316x343-png", "Sciences"),
  },
  {
    _key: "ap-mathematics",
    _type: "object",
    title: "Mathematics",
    description: "• AP Calculus AB\n• AP Calculus BC\n• AP Statistics",
    icon: image("image-8476f05afb48fe1eb6750b4579bc52bd9188bc7a-339x333-png", "Mathematics"),
  },
  {
    _key: "ap-english",
    _type: "object",
    title: "English",
    description: "• AP English Language and Composition\n• AP English Literature and Composition",
    icon: image("image-855a97810cf27ddcb4c3c8c044d82987702e5c5e-430x346-png", "English"),
  },
  {
    _key: "ap-social-sciences",
    _type: "object",
    title: "Social Sciences",
    description: "• AP Psychology",
    icon: image("image-a3e5f5c78671f99cd75c32c6682fd2ec17ae0e09-373x343-png", "Social Sciences"),
  },
  {
    _key: "ap-advanced-sciences",
    _type: "object",
    title: "Advanced Sciences",
    description: "• AP Physics C: Mechanics\n• AP Physics C: Electricity and Magnetism",
    icon: image("image-3e8f50c0f00d78be7590e9e41b4440a4d576245a-252x333-png", "Advanced Sciences"),
  },
];

const apCoursesSection = {
  _type: "object",
  heading: {
    _type: "sectionHeading",
    title: "Advanced Placement (AP) Courses",
    subtitle: "We offer a range of AP courses to challenge and prepare students for higher education:",
  },
  backgroundColor: "#f4f4f4",
  titleColor: "#00A5B2",
  cardBorderColor: "#216B97",
  cardHoverBorderColor: "#00A5B2",
  cardTextColor: "#216B97",
  cards,
};

const result = await client
  .patch("academics-high-school-page")
  .set({ apCoursesSection })
  .commit({ autoGenerateArrayKeys: true });

console.log(
  JSON.stringify(
    {
      documentId: result._id,
      dataset: client.config().dataset,
      field: "apCoursesSection",
      cardCount: result.apCoursesSection?.cards?.length,
    },
    null,
    2
  )
);
