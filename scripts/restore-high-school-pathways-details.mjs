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

const pathwaysDetailsSection = {
  _type: "imageTextSection",
  heading: {
    _type: "sectionHeading",
    title: "High School Pathways Details",
    description: [
      block(
        "hs-pathways-details-health",
        "For those interested in health-related professions, the Health and Life Sciences Pathway focuses on biology, chemistry, and anatomy, laying the groundwork for careers in healthcare, nursing, and environmental science.",
      ),
      block(
        "hs-pathways-details-options",
        "Students with a creative flair may pursue the Creative Arts and Design Pathway, which nurtures talent in visual arts, digital media, design thinking, and communication. Those who are drawn to social change, culture, or public service can follow the Humanities and Social Sciences Pathway, which emphasizes global studies, psychology, history, and law. We also offer a Career Readiness and Life Skills Pathway, supporting students of determination and those seeking practical, vocational, and functional life skills that lead to employment and independence. Lastly, the Advanced Placement (AP) Pathway offers high-achieving students the chance to challenge themselves with college-level courses and exams across multiple subjects, earning university credit and academic distinction.",
      ),
    ],
  },
  image: {
    _type: "imageWithAlt",
    alt: "SAIS - Sharjah high school students playing football",
    image: {
      _type: "image",
      asset: {
        _type: "reference",
        _ref: "image-ca7fcf0fc83f77f9374465abfdb00fe8c4fb8a1d-1560x1252-jpg",
      },
    },
  },
  imagePosition: "right",
  theme: "light",
};

await client
  .patch("academics-high-school-page")
  .set({ pathwaysDetailsSection })
  .commit();

console.log(
  JSON.stringify(
    {
      status: "restored",
      dataset: client.config().dataset,
      documentId: "academics-high-school-page",
      field: "pathwaysDetailsSection",
    },
    null,
    2,
  ),
);
