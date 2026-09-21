const colorField = (name, title, description) => ({
  name,
  title,
  type: "string",
  description,
});

const innerNavigationFields = [
  {
    name: "items",
    title: "Navigation Items",
    type: "array",
    of: [
      {
        type: "object",
        fields: [
          { name: "label", title: "Label", type: "string" },
          { name: "href", title: "Link", type: "string" },
          { name: "openInNewTab", title: "Open in New Tab", type: "boolean", initialValue: false },
        ],
        preview: {
          select: {
            title: "label",
            subtitle: "href",
          },
        },
      },
    ],
  },
  { name: "activeHref", title: "Active Link", type: "string" },
  colorField("activeColor", "Active Background Color", "Optional CSS color, for example #00A5B2."),
  colorField("inactiveColor", "Inactive Background Color", "Optional CSS color, for example #216B97."),
  colorField("textColor", "Text Color", "Optional CSS color, for example #ffffff."),
  colorField("dividerColor", "Divider Color", "Optional CSS color, for example #ffffff."),
  colorField("topLineColor", "Top Line Color", "Optional CSS color, for example #ffffff."),
  { name: "ariaLabel", title: "Accessibility Label", type: "string" },
];

export const studentLifePage = {
  name: "studentLifePage",
  title: "Student Life Page",
  type: "document",
  fields: [
    { name: "seo", title: "SEO", type: "seo", options: { collapsible: true, collapsed: false } },
    {
      name: "hero",
      title: "Hero",
      type: "object",
      options: { collapsible: true, collapsed: false },
      fields: [
        { name: "heading", title: "Hero Text", type: "sectionHeading" },
        { name: "image", title: "Hero Image (Desktop)", type: "imageWithAlt" },
        { name: "mobileImage", title: "Hero Image (Mobile)", type: "imageWithAlt", description: "Optional image used on screens up to 920px wide. Falls back to the desktop image when empty." },
        colorField("topLineColor", "Top Line Color", "Optional CSS color, for example #d97252."),
        colorField("panelColor", "Panel Background Color", "Optional CSS color, for example #216B97."),
        colorField("waveColor", "Curved Line Color", "Optional CSS color, for example #00A5B2."),
        colorField("textColor", "Text Color", "Optional CSS color, for example #ffffff."),
        {
          name: "imagePosition",
          title: "Image Position",
          type: "string",
          description: "Optional CSS object-position value, for example center.",
        },
        {
          name: "imageWidth",
          title: "Desktop Image Width",
          type: "string",
          description: "Optional CSS width for desktop, for example 58%. Mobile stays 100%.",
        },
      ],
    },
    {
      name: "innerNavigation",
      title: "Inner Navigation",
      type: "object",
      options: { collapsible: true, collapsed: false },
      fields: innerNavigationFields,
    },
    {
      name: "beyondClassroomIntro",
      title: "Beyond the Classroom Intro",
      type: "object",
      options: { collapsible: true, collapsed: false },
      description: "Centered heading and paragraph above the student leadership panel.",
      fields: [
        {
          name: "heading",
          title: "Heading",
          type: "sectionHeading",
          description:
            "Title is the first line. Accent Title is an optional second line, shown in the accent color.",
        },
        colorField("backgroundColor", "Background Color", "Optional CSS color, for example #ffffff."),
        colorField("titleColor", "Title Color", "Optional CSS color, for example #00A5B2."),
        colorField("accentColor", "Accent Title Color", "Optional CSS color, for example #00A5B2."),
        colorField("textColor", "Text Color", "Optional CSS color, for example #216B97."),
      ],
    },
    {
      name: "sgaSection",
      title: "Student Government Association (SGA)",
      type: "object",
      options: { collapsible: true, collapsed: false },
      description: "Image beside a colored panel, below the Beyond the Classroom intro.",
      fields: [
        { name: "heading", title: "Heading Text", type: "sectionHeading" },
        { name: "image", title: "Image", type: "imageWithAlt" },
        {
          name: "imagePosition",
          title: "Image Position",
          type: "string",
          description: "Optional CSS object-position value, for example center.",
        },
        colorField("panelColor", "Panel Background Color", "Optional CSS color, for example #00A5B2."),
        colorField("waveColor", "Corner Accent Color", "Optional CSS color, for example #D97252."),
        colorField("titleColor", "Title Color", "Optional CSS color, for example #ffffff."),
        colorField("textColor", "Text Color", "Optional CSS color, for example #ffffff."),
      ],
    },
    {
      name: "studentCongressSection",
      title: "Student Congress Mission & Vision",
      type: "object",
      options: { collapsible: true, collapsed: false },
      description: "Copy beside an image, below the SGA panel. Bold a line to make it a label such as Mission or Vision.",
      fields: [
        {
          name: "heading",
          title: "Text Content",
          type: "sectionHeading",
          description: "Only the Description is shown. Bold a paragraph to turn it into a label.",
        },
        { name: "image", title: "Image", type: "imageWithAlt" },
        {
          name: "imagePosition",
          title: "Image Side",
          type: "string",
          options: {
            list: [
              { title: "Left", value: "left" },
              { title: "Right", value: "right" },
            ],
            layout: "radio",
          },
          initialValue: "right",
        },
        colorField("backgroundColor", "Background Color", "Optional CSS color, for example #F2F2F2."),
        colorField("textColor", "Text Color", "Optional CSS color, for example #666B70."),
      ],
    },
    {
      name: "ministriesSlider",
      title: "SGA Ministries Slider",
      type: "object",
      options: { collapsible: true, collapsed: false },
      description: "Title, intro line, and the ministry cards shown four at a time.",
      fields: [
        {
          name: "heading",
          title: "Heading Text",
          type: "sectionHeading",
          description: "Title is the section heading. Subtitle is the bold line under the rule.",
        },
        {
          name: "cards",
          title: "Ministry Cards",
          type: "array",
          of: [
            {
              type: "object",
              name: "ministryCard",
              title: "Ministry Card",
              fields: [
                { name: "title", title: "Title", type: "string" },
                { name: "description", title: "Description", type: "text", rows: 3 },
                { name: "icon", title: "Icon", type: "imageWithAlt" },
              ],
              preview: {
                select: { title: "title", subtitle: "description", media: "icon.image" },
              },
            },
          ],
        },
        colorField("backgroundColor", "Background Color", "Optional CSS color, for example #ffffff."),
        colorField("titleColor", "Title Color", "Optional CSS color, for example #00A5B2."),
        colorField("cardTextColor", "Card Text Color", "Optional CSS color, for example #216B97."),
        colorField("cardIconColor", "Card Icon Color", "Optional CSS color, for example #D97252."),
        colorField("cardBorderColor", "Card Border Color", "Optional CSS color, for example #216B97."),
        colorField("cardHoverBorderColor", "Card Hover Border Color", "Optional CSS color, for example #D97252."),
      ],
    },
    {
      name: "sgaShowcaseSection",
      title: "SGA Highlights",
      type: "object",
      options: { collapsible: true, collapsed: false },
      description: "Image beside copy on a colored band, below the ministries slider.",
      fields: [
        { name: "heading", title: "Text Content", type: "sectionHeading" },
        { name: "image", title: "Image", type: "imageWithAlt" },
        {
          name: "imagePosition",
          title: "Image Side",
          type: "string",
          options: {
            list: [
              { title: "Left", value: "left" },
              { title: "Right", value: "right" },
            ],
            layout: "radio",
          },
          initialValue: "left",
        },
        colorField("backgroundColor", "Background Color", "Optional CSS color, for example #216B97."),
        colorField("titleColor", "Title Color", "Optional CSS color, for example #ffffff."),
        colorField("textColor", "Text Color", "Optional CSS color, for example #ffffff."),
      ],
    },
    {
      name: "programsSection",
      title: "Programs & Activities",
      type: "object",
      options: { collapsible: true, collapsed: false },
      description: "Copy beside an image, below the SGA highlights.",
      fields: [
        { name: "heading", title: "Text Content", type: "sectionHeading" },
        { name: "image", title: "Image", type: "imageWithAlt" },
        {
          name: "imagePosition",
          title: "Image Side",
          type: "string",
          options: {
            list: [
              { title: "Left", value: "left" },
              { title: "Right", value: "right" },
            ],
            layout: "radio",
          },
          initialValue: "right",
        },
        colorField("backgroundColor", "Background Color", "Optional CSS color, for example #ffffff."),
        colorField("titleColor", "Title Color", "Optional CSS color, for example #00A5B2."),
        colorField("textColor", "Text Color", "Optional CSS color, for example #666B70."),
      ],
    },
    {
      name: "miniSgaSection",
      title: "Mini SGA",
      type: "object",
      options: { collapsible: true, collapsed: false },
      description: "Image beside a colored panel, the same layout as the SGA section above.",
      fields: [
        { name: "heading", title: "Heading Text", type: "sectionHeading" },
        { name: "image", title: "Image", type: "imageWithAlt" },
        {
          name: "imagePosition",
          title: "Image Position",
          type: "string",
          description: "Optional CSS object-position value, for example center.",
        },
        colorField("panelColor", "Panel Background Color", "Optional CSS color, for example #00A5B2."),
        colorField("waveColor", "Corner Accent Color", "Optional CSS color, for example #1E6F9B."),
        colorField("titleColor", "Title Color", "Optional CSS color, for example #ffffff."),
        colorField("textColor", "Text Color", "Optional CSS color, for example #ffffff."),
      ],
    },
  ],
  preview: {
    select: {
      title: "hero.heading.title",
    },
    prepare({ title }) {
      return {
        title: title || "Student Life Page",
      };
    },
  },
};
