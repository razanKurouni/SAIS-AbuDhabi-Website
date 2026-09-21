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

const curriculumLifeSection = {
  _type: "imageTextSection",
  heading: {
    _type: "sectionHeading",
    title: "",
    description: [
      block(
        "middle-school-curriculum-life-activities",
        "Beyond the classroom, we offer a variety of extracurricular activities and after-school clubs, such as chess, robotics, cooking, and more. These programs develop students’ interests, confidence, and leadership skills.",
      ),
      block(
        "middle-school-curriculum-life-celebrations",
        "Through local celebrations like National Day, Ramadan, and Eid, and global initiatives like Earth Day, Cancer Awareness Campaigns, and International Day, students gain a deeper appreciation of both their heritage and the wider world.",
      ),
      block(
        "middle-school-curriculum-life-future",
        "We don’t just prepare students for high school, we prepare them for life. We guide them to turn uncertainty into ambition, ideas into impact, and dreams into achievable goals.",
      ),
    ],
  },
  image: {
    _type: "imageWithAlt",
    alt: "SAIS - Sharjah students participating in class",
    image: {
      _type: "image",
      asset: {
        _type: "reference",
        _ref: "image-afff5f58a744e3b8fae87f673bc800711e8fad09-1528x1252-jpg",
      },
    },
  },
  imagePosition: "right",
  theme: "light",
  backgroundColor: "#ffffff",
  textColor: "#666b70",
};

await client
  .patch("academics-middle-school-page")
  .set({ curriculumLifeSection })
  .commit();

console.log(
  JSON.stringify(
    {
      status: "updated",
      dataset: client.config().dataset,
      documentId: "academics-middle-school-page",
      field: "curriculumLifeSection",
    },
    null,
    2,
  ),
);
