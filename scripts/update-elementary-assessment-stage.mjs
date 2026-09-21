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

const assessmentSection = {
  _type: "object",
  heading: {
    _type: "sectionHeading",
    title: "......",
    description: [
      block(
        "elementary-assessment-curriculum",
        "Our curriculum blends academic rigor with creativity and personal development. Students study a rich range of subjects, including English, Mathematics, Science, Arabic, Islamic Studies, UAE Social Studies, Moral Education, Art, Physical Education, and ICT. Learning is active and student-centered, with a focus on developing essential skills such as problem-solving, collaboration, and critical thinking from an early age.",
      ),
      block(
        "elementary-assessment-support",
        "We take pride in creating a learning atmosphere where every child feels valued, supported, and challenged. Instruction is personalized to meet diverse learning styles, ensuring all students have the opportunity to succeed at their own pace and ability level.",
      ),
      block(
        "elementary-assessment-values",
        "Beyond academics, our elementary program promotes strong character and values. Through a dedicated value-based education framework, students are guided to practice respect, responsibility, honesty, cooperation, and cleanliness qualities that shape them into thoughtful and compassionate individuals.",
      ),
    ],
  },
  image: {
    _type: "imageWithAlt",
    alt: "SAIS - Sharjah elementary student writing in class",
    image: {
      _type: "image",
      asset: {
        _type: "reference",
        _ref: "image-398e52cc7a39aca9b0b3d4a4af377f83473bbe41-2606x1826-png",
      },
    },
  },
  imagePosition: "center",
  panelColor: "#00A5B2",
  waveColor: "#216B97",
  titleColor: "#216B97",
  textColor: "#ffffff",
};

const assessmentStageSection = {
  _type: "object",
  heading: {
    _type: "sectionHeading",
    title: "Assessment for Every Stage of Learning",
    description: [
      block(
        "elementary-assessment-ongoing",
        "We use an ongoing assessment approach to provide a clear and comprehensive understanding of each student’s progress. Rather than relying solely on tests, teachers regularly assess learning through classwork, homework, projects, discussions, and short quizzes.",
      ),
      block(
        "elementary-assessment-support",
        "This approach allows us to support each child’s development in a calm, supportive, and low-stress environment.",
      ),
      block(
        "elementary-assessment-formal",
        "Formal assessments are scheduled on alternating weeks, with a focus on languages, as well as math and science. Assessment schedules are shared with parents through the weekly plan to support preparation at home.",
      ),
    ],
  },
  image: {
    _type: "imageWithAlt",
    alt: "SAIS - Sharjah elementary students participating in class",
    image: {
      _type: "image",
      asset: {
        _type: "reference",
        _ref: "image-afff5f58a744e3b8fae87f673bc800711e8fad09-1528x1252-jpg",
      },
    },
  },
  imagePosition: "center",
  panelColor: "#df7150",
  waveColor: "#216B97",
  titleColor: "#ffffff",
  textColor: "#ffffff",
};

await client
  .patch("academics-elementary-page")
  .set({ assessmentSection, assessmentStageSection })
  .commit();

console.log(JSON.stringify({
  status: "updated",
  dataset: client.config().dataset,
  documentId: "academics-elementary-page",
  fields: ["assessmentSection", "assessmentStageSection"],
}, null, 2));
