import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2025-08-15" });

const paragraph = (_key, text) => ({
  _key,
  _type: "block",
  style: "normal",
  markDefs: [],
  children: [{ _key: `${_key}-span`, _type: "span", marks: [], text }],
});

const careerGuidanceIntroSection = {
  _type: "sectionHeading",
  title: "Career Guidance",
  subtitle:
    "Our Career and University Guidance Department plays a vital role in preparing students for life beyond high school.",
  description: [
    paragraph(
      "career-guidance-intro-body",
      "We are committed to helping every student discover their strengths, explore opportunities, and make informed decisions about their future academic and professional paths."
    ),
  ],
};

const result = await client
  .patch("academics-high-school-page")
  .set({ careerGuidanceIntroSection })
  .commit({ autoGenerateArrayKeys: true });

console.log(
  JSON.stringify(
    {
      documentId: result._id,
      dataset: client.config().dataset,
      field: "careerGuidanceIntroSection",
      title: result.careerGuidanceIntroSection?.title,
    },
    null,
    2
  )
);
