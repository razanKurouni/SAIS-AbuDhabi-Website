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

const curriculumSection = {
  _type: "imageTextSection",
  heading: {
    _type: "sectionHeading",
    title: "The Curriculum",
    description: [
      block(
        "kg-curriculum-program",
        "Our devoted teachers implement an academic program that focuses on each students’ uniqueness and individual capabilities. The students receive instruction whereby Mathematics, Science, and Social studies are infused with literacy enriched activities, rather than being taught as separate subject areas. Additionally, every student is encouraged to make choices and explore curiosities to motivate them to enjoy learning.",
      ),
      block(
        "kg-curriculum-language",
        "Language development is a key component of the kindergarten curriculum. Enhanced language skills prepare our kindergarten students to think critically and problem-solve. The teachers strive to provide the best possible education to our students by offering them limitless opportunities to succeed in establishing the building blocks of their education while preparing them for their forthcoming years.",
      ),
    ],
  },
  image: {
    _type: "imageWithAlt",
    alt: "SAIS - Sharjah teacher guiding a kindergarten student",
    image: {
      _type: "image",
      asset: {
        _type: "reference",
        _ref: "image-2016f797e854f0fc8ec1c6a30e39f84fddf2befe-1556x1252-png",
      },
    },
  },
  imagePosition: "right",
  theme: "light",
};

await client.patch("academics-kindergarten-page").set({ curriculumSection }).commit();

console.log(JSON.stringify({
  status: "updated",
  dataset: client.config().dataset,
  documentId: "academics-kindergarten-page",
  field: "curriculumSection",
}, null, 2));
