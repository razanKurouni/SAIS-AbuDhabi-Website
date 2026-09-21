import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2025-08-15" });

const span = (key, text) => ({
  _key: `${key}-span`,
  _type: "span",
  marks: [],
  text,
});

const paragraph = (key, text) => ({
  _key: key,
  _type: "block",
  children: [span(key, text)],
  markDefs: [],
  style: "normal",
});

const items = [
  {
    _key: "curriculum",
    _type: "object",
    question: "What curriculum does SAIS - Sharjah follow?",
    answer:
      "SAIS - Sharjah follows an American curriculum aligned with UAE Ministry of Education requirements and internationally recognized standards. Our academic program emphasizes strong foundations, critical thinking, creativity, and preparation for future study.",
  },
  {
    _key: "grades",
    _type: "object",
    question: "What grade levels does SAIS - Sharjah offer?",
    answer: "SAIS - Sharjah welcomes students from Kindergarten through Grade 12.",
  },
  {
    _key: "language",
    _type: "object",
    question: "What is the primary language of instruction?",
    answer:
      "The primary language of instruction is English, with additional courses in Arabic, Islamic Education, and French.",
  },
];

const result = await client
  .patch("admissions-faq-page")
  .set({
    "introSection.heading": {
      _type: "sectionHeading",
      title: "Modern Learning, Clearly Explained",
      description: [
        paragraph(
          "faq-intro-primary",
          "Welcome to our FAQ section, designed to provide parents and students with clear, helpful information about our school’s policies, academics, admissions, attendance, and extra-curricular activities.",
        ),
        paragraph(
          "faq-intro-secondary",
          "We are committed to transparency and open communication. Here you can find answers to common questions about school life, and our team is always ready to support you if you need further assistance.",
        ),
      ],
    },
    faqSection: {
      _type: "object",
      items,
    },
  })
  .commit({ autoGenerateArrayKeys: true });

console.log(
  JSON.stringify(
    {
      documentId: result._id,
      dataset: client.config().dataset,
      title: result.introSection?.heading?.title,
      faqCount: result.faqSection?.items?.length,
      imageAsset: result.introSection?.image?.image?.asset?._ref,
    },
    null,
    2,
  ),
);
