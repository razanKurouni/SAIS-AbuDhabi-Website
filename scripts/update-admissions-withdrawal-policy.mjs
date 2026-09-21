import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "uwffig4f";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "sais-uaq";
const token = process.env.SANITY_AUTH_TOKEN;

if (!token) {
  throw new Error("SANITY_AUTH_TOKEN is required to update the admissions withdrawal policy.");
}

const client = createClient({ projectId, dataset, token, apiVersion: "2023-01-01", useCdn: false });

function block(key, text, marks = []) {
  return {
    _key: key,
    _type: "block",
    style: "normal",
    markDefs: [],
    children: [{ _key: `${key}-span`, _type: "span", marks, text }],
  };
}

function numberedBlock(key, text) {
  return { ...block(key, text), listItem: "number", level: 1 };
}

const body = [
  numberedBlock(
    "withdrawal-step-1",
    "When a parent requires withdrawing their child from SAIS, that parent needs to fill the ‘Student Withdrawal Clearance Form’.",
  ),
  numberedBlock(
    "withdrawal-step-2",
    "The registrar will then send the ‘Form’ to the school principal for signature.",
  ),
  numberedBlock(
    "withdrawal-step-3",
    "The school principal will then decide whether a follow-up meeting or call is required.",
  ),
  numberedBlock(
    "withdrawal-step-4",
    "Once the school principal is satisfied that the process is complete, then he or she will sign the ‘Form’ and send it back to the registration office.",
  ),
  numberedBlock(
    "withdrawal-step-5",
    "The registrar will then send a copy of the ‘Form’ to the accounts office for fee clearance.",
  ),
  numberedBlock(
    "withdrawal-step-6",
    "Once the fee clearance is complete, the accounts office should inform the registration office to release the student’s documents.",
  ),
  {
    _key: "withdrawal-contact",
    _type: "block",
    style: "normal",
    markDefs: [],
    children: [
      {
        _key: "withdrawal-contact-label",
        _type: "span",
        marks: ["strong"],
        text: "For further information, please contact us: ",
      },
      {
        _key: "withdrawal-contact-phone",
        _type: "span",
        marks: ["strong", "accentGreen"],
        text: "6 538 0000.",
      },
    ],
  },
];

await client
  .patch("admissions-withdrawal-page")
  .set({
    "intro.policyTitle": "Policy on Student Withdrawal 2024–2025\nRegistration Department:",
    "intro.body": body,
  })
  .commit({ autoGenerateArrayKeys: true });

console.log("Updated the admissions withdrawal policy content in Sanity.");
