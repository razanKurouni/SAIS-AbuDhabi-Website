import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2025-02-19" });

const block = (_key, text) => ({
  _key,
  _type: "block",
  style: "normal",
  markDefs: [],
  children: [{ _key: `${_key}-span`, _type: "span", marks: [], text }],
});

const assessmentProtocolSection = {
  _type: "object",
  heading: {
    _type: "sectionHeading",
    title: "Assessment Protocol",
    description: [
      block(
        "assessment-protocol-intro",
        "We implement four categories of assessment to comprehensively evaluate student progress:"
      ),
    ],
  },
  cards: [
    {
      _key: "formative-ongoing",
      _type: "object",
      title: "Formative/Ongoing\nAssessment",
      description: "Maintain high expectations\nfor every student",
    },
    {
      _key: "formative-quizzes",
      _type: "object",
      title: "Formative\nQuizzes",
      description: "Short-form assessments\nof understanding",
    },
    {
      _key: "summative-assessment",
      _type: "object",
      title: "Summative\nAssessment",
      description: "Quizzes, tests,\nexaminations",
    },
    {
      _key: "external-assessment",
      _type: "object",
      title: "External\nAssessment",
      description: "MAP, CAT4, PSAT, SAT,\nArabic IBT",
    },
  ],
  backgroundColor: "#FFFFFF",
  titleColor: "#216B97",
  textColor: "#707278",
  cardTextColor: "#216B97",
  cardBorderColor: "#216B97",
  cardHoverBorderColor: "#DF7150",
};

await client.patch("academics-page").set({ assessmentProtocolSection }).commit();
console.log(JSON.stringify({ status: "updated", dataset: client.config().dataset }, null, 2));
