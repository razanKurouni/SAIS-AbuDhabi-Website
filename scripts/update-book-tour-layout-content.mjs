import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2025-08-15" });

const span = (key, text, marks = []) => ({
  _key: `${key}-span`,
  _type: "span",
  marks,
  text,
});

const paragraph = (key, text, marks = []) => ({
  _key: key,
  _type: "block",
  children: [span(key, text, marks)],
  markDefs: [],
  style: "normal",
});

const bullet = (key, text) => ({
  ...paragraph(key, text),
  level: 1,
  listItem: "bullet",
});

const introSection = {
  _type: "imageTextSection",
  heading: {
    _type: "sectionHeading",
    title: "Book A Campus Tour",
    description: [
      paragraph(
        "tour-intro",
        "We believe the best way to experience our community is to see it in action. Our campus tours offer prospective students and their families a firsthand look at our vibrant learning environment, facilities, and welcoming culture.",
      ),
      paragraph("tour-list-heading", "During the tour you will:"),
      bullet("tour-classrooms", "Visit our classrooms, science labs, libraries, and sports areas"),
      bullet("tour-programs", "Learn about our academic programs and extracurricular activities"),
      bullet("tour-faculty", "Meet faculty and administrators"),
      bullet("tour-community", "Discover what makes SAIS a unique place to learn and grow"),
      paragraph(
        "tour-availability",
        "Tours are available by appointment throughout the week.\nWe welcome families of all grade levels and encourage you to bring any questions you may have.",
        ["strong"],
      ),
      paragraph("tour-hours", "Tour Hours: Monday to Thursday; 3:00 - 4:30 PM.", ["strong"]),
    ],
  },
  imagePosition: "left",
  theme: "light",
};

const formFields = [
  { _key: "name", _type: "object", label: "Name:", name: "name", type: "text", required: true },
  { _key: "surname", _type: "object", label: "Surname", name: "surname", type: "text", required: true },
  { _key: "phone", _type: "object", label: "Phone Number:", name: "phone", type: "tel", required: true },
  { _key: "email", _type: "object", label: "Email", name: "email", type: "email", required: true },
  { _key: "visit-date", _type: "object", label: "Preferred Visit Date:", name: "preferredVisitDate", type: "date", required: true },
  { _key: "time", _type: "object", label: "Preferred Visit Time:", name: "preferredTime", type: "time", required: true },
  { _key: "message", _type: "object", label: "Message", name: "message", type: "textarea", required: true },
];

const result = await client
  .patch("admissions-book-tour-page")
  .set({ introSection, "formSection.fields": formFields, "formSection.submitLabel": "Submit" })
  .commit({ autoGenerateArrayKeys: true });

console.log(
  JSON.stringify(
    {
      documentId: result._id,
      dataset: client.config().dataset,
      title: result.introSection?.heading?.title,
      fieldCount: result.formSection?.fields?.length,
    },
    null,
    2,
  ),
);
