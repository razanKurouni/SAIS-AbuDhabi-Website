import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "uwffig4f",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "sais-uaq",
  apiVersion: "2023-01-01",
  token: process.env.SANITY_AUTH_TOKEN,
  useCdn: false,
});

if (!process.env.SANITY_AUTH_TOKEN) {
  throw new Error("SANITY_AUTH_TOKEN is required to update the Academics Kindergarten page.");
}

const block = (_key, text) => ({
  _key,
  _type: "block",
  style: "normal",
  markDefs: [],
  children: [{ _key: `${_key}-span`, _type: "span", marks: [], text }],
});

const closingStatement = [
  block(
    "kg-assessment-closing-levels",
    "Teachers place each child on a specific developmental level for each measure."
  ),
  block("kg-assessment-closing-count", "There are four main developmental levels."),
];

const result = await client
  .patch("academics-kindergarten-page")
  .set({ "assessmentSection.closingStatement": closingStatement })
  .commit({ autoGenerateArrayKeys: false });

console.log(
  JSON.stringify({ documentId: result._id, dataset: client.config().dataset, field: "assessmentSection.closingStatement" }, null, 2)
);
