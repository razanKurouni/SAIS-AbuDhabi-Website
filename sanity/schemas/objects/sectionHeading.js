export const sectionHeading = {
  name: "sectionHeading",
  title: "Section Heading",
  type: "object",
  fields: [
    {
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
      description: "Small label above the heading. Optional.",
    },
    {
      name: "title",
      title: "Title",
      type: "string",
      description: "Optional. Leave it empty for sections that are designed without a heading.",
    },
    {
      name: "accentTitle",
      title: "Accent Title",
      type: "string",
      description: "Optional highlighted part of the title, shown in the accent color.",
    },
    {
      name: "subtitle",
      title: "Subtitle",
      type: "string",
      description: "Short supporting line. Optional.",
    },
    {
      name: "description",
      title: "Description",
      type: "blockContent",
      description: "Paragraph copy for this section.",
    },
  ],
};
