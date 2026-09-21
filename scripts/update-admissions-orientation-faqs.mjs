import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2025-08-15" });

const items = [
  {
    _key: "application-timing",
    _type: "object",
    question: "When can I apply for admission?",
    answer:
      "Applications are accepted for the same year from September to December and for the following year from February onwards, but early enrollment is recommended due to limited seat availability.",
  },
  {
    _key: "application-support",
    _type: "object",
    question: "How does SAIS support new student applications?",
    answer:
      "Our admissions team supports families throughout the application process, answers questions, and helps ensure a clear and smooth transition into the SAIS community.",
  },
  {
    _key: "student-transition",
    _type: "object",
    question: "How does SAIS support new student transitions?",
    answer:
      "SAIS offers orientation programs for new students and parents, including guided tours, counseling sessions, and transition workshops in Elementary, Middle, and High School.",
  },
  {
    _key: "placement-test",
    _type: "object",
    question: "Is there a placement test for new students?",
    answer:
      "Yes, students undergo an academic assessment in English and Math to determine placement and support needs.",
  },
];

const admissionsOrientationSection = {
  _type: "object",
  heading: {
    _type: "sectionHeading",
    title: "Admissions and\nOrientation",
  },
  items,
};

const result = await client
  .patch("admissions-faq-page")
  .set({ admissionsOrientationSection })
  .commit({ autoGenerateArrayKeys: true });

console.log(
  JSON.stringify(
    {
      documentId: result._id,
      dataset: client.config().dataset,
      title: result.admissionsOrientationSection?.heading?.title,
      itemCount: result.admissionsOrientationSection?.items?.length,
    },
    null,
    2,
  ),
);
