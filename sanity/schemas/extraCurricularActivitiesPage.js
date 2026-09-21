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
  colorField("activeColor", "Active Background Color", "Optional CSS color, for example #216B97."),
  colorField("inactiveColor", "Inactive Background Color", "Optional CSS color, for example #d97252."),
  colorField("textColor", "Text Color", "Optional CSS color, for example #ffffff."),
  colorField("dividerColor", "Divider Color", "Optional CSS color, for example #ffffff."),
  colorField("topLineColor", "Top Line Color", "Optional CSS color, for example #ffffff."),
  { name: "ariaLabel", title: "Accessibility Label", type: "string" },
];

export const extraCurricularActivitiesPage = {
  name: "extraCurricularActivitiesPage",
  title: "Extra Curricular Activities Page",
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
        colorField("topLineColor", "Top Line Color", "Optional CSS color, for example #216B97."),
        colorField("panelColor", "Panel Background Color", "Optional CSS color, for example #707174."),
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
      name: "enrichingIntro",
      title: "Enriching Every Student Journey",
      type: "object",
      options: { collapsible: true, collapsed: false },
      description: "Centered title, a highlighted lead line, and the supporting paragraph.",
      fields: [
        {
          name: "heading",
          title: "Text Content",
          type: "sectionHeading",
          description: "Title, then Subtitle as the highlighted line, then Description for the smaller copy.",
        },
        colorField("backgroundColor", "Background Color", "Optional CSS color, for example #ffffff."),
        colorField("titleColor", "Title Color", "Optional CSS color, for example #216B97."),
        colorField("subtitleColor", "Highlighted Line Color", "Optional CSS color, for example #00A5B2."),
        colorField("textColor", "Paragraph Color", "Optional CSS color, for example #666B70."),
      ],
    },
    {
      name: "activitiesSlider",
      title: "Activities Slider",
      type: "object",
      options: { collapsible: true, collapsed: false },
      description: "One slide per activity: image beside copy on the curved panel.",
      fields: [
        { name: "heading", title: "Section Heading", type: "sectionHeading" },
        {
          name: "slides",
          title: "Slides",
          type: "array",
          of: [
            {
              type: "object",
              name: "activitySlide",
              title: "Activity Slide",
              fields: [
                { name: "title", title: "Slide Title", type: "string" },
                {
                  name: "body",
                  title: "Slide Body",
                  type: "text",
                  rows: 8,
                  description: "Use blank lines between paragraphs. Start lines with - for bullet lists.",
                },
                { name: "image", title: "Slide Image", type: "imageWithAlt" },
                colorField("backgroundColor", "Main Background Color", "Optional CSS color, for example #216B97."),
                colorField("sideColor", "Side Background Color", "Optional CSS color, for example #00A5B2."),
                colorField("ringColor", "Curved Line Color", "Optional CSS color, for example #D97252."),
                colorField("titleColor", "Title Color", "Optional CSS color, for example #ffffff."),
                colorField("textColor", "Text Color", "Optional CSS color, for example #ffffff."),
                {
                  name: "imagePosition",
                  title: "Image Position",
                  type: "string",
                  description: "Optional CSS object-position value, for example center.",
                },
              ],
              preview: { select: { title: "title", subtitle: "body", media: "image.image" } },
            },
          ],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: "hero.heading.title",
    },
    prepare({ title }) {
      return {
        title: title || "Extra Curricular Activities",
        subtitle: "Student life detail page",
      };
    },
  },
};
