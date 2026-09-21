export const cta = {
  name: "cta",
  title: "Button / CTA",
  type: "object",
  fields: [
    {
      name: "label",
      title: "Button Label",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "href",
      title: "Button Link",
      type: "string",
      description: "Use # for a placeholder, #section-id for page anchors, or a full URL.",
      initialValue: "#",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "variant",
      title: "Style",
      type: "string",
      options: {
        list: [
          { title: "Primary", value: "primary" },
          { title: "Secondary", value: "secondary" },
          { title: "Ghost", value: "ghost" },
        ],
        layout: "radio",
      },
      initialValue: "primary",
    },
    {
      name: "openInNewTab",
      title: "Open in new tab",
      type: "boolean",
      initialValue: false,
    },
  ],
};
