export const imageWithAlt = {
  name: "imageWithAlt",
  title: "Image",
  type: "object",
  fields: [
    {
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "alt",
      title: "Alt text",
      type: "string",
      description: "Describe the image for accessibility and SEO.",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "caption",
      title: "Caption",
      type: "string",
      description: "Optional short caption or internal note.",
    },
  ],
};
