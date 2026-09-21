import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2025-08-15" });

const academicsSupportSection = {
  _type: "object",
  heading: {
    _type: "sectionHeading",
    title: "Academics and\nSupport",
  },
  items: [
    {
      _key: "ap-courses",
      _type: "object",
      question: "Are Advanced Placement (AP) courses available?",
      answer:
        "Yes, SAIS offers a variety of AP courses in subjects such as Calculus, Biology, Chemistry, Computer Science, and English.",
    },
    {
      _key: "inclusion-support",
      _type: "object",
      question: "Does SAIS provide inclusion support for Students of Determination?",
      answer: "Yes, SAIS has a dedicated Inclusion Department.",
    },
    {
      _key: "counseling-guidance",
      _type: "object",
      question: "Are there counseling and career guidance services?",
      answer:
        "Yes, SAIS offers academic, personal, and career counseling, including university planning and NAPO ambassador programs.",
    },
  ],
};

const result = await client
  .patch("admissions-faq-page")
  .set({ academicsSupportSection })
  .commit({ autoGenerateArrayKeys: true });

console.log(
  JSON.stringify(
    {
      documentId: result._id,
      dataset: client.config().dataset,
      title: result.academicsSupportSection?.heading?.title,
      itemCount: result.academicsSupportSection?.items?.length,
    },
    null,
    2,
  ),
);
