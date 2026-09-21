export const ourTeamPage = {
  name: "ourTeamPage",
  title: "Our Team Page",
  type: "document",
  fields: [
    { name: "seo", title: "SEO", type: "seo", options: { collapsible: true, collapsed: false } },
    {
      name: "hero",
      title: "Hero",
      type: "object",
      options: { collapsible: true, collapsed: false },
      description: "Editable hero content and colors for the Our Team page.",
      fields: [
        { name: "heading", title: "Hero Text", type: "sectionHeading" },
        { name: "image", title: "Hero Image (Desktop)", type: "imageWithAlt" },
        { name: "mobileImage", title: "Hero Image (Mobile)", type: "imageWithAlt", description: "Optional image used on screens up to 920px wide. Falls back to the desktop image when empty." },
        {
          name: "topLineColor",
          title: "Top Line Color",
          type: "string",
          description: "Optional CSS color, for example #216B97.",
        },
        {
          name: "panelColor",
          title: "Dark Panel Background Color",
          type: "string",
          description: "Optional CSS color for the left hero panel, for example #00A5B2.",
        },
        {
          name: "waveColor",
          title: "Curved Line Color",
          type: "string",
          description: "Optional CSS color for the curved divider, for example #d97252.",
        },
        {
          name: "textColor",
          title: "Text Color",
          type: "string",
          description: "Optional CSS color for the hero title.",
        },
        {
          name: "imagePosition",
          title: "Image Position",
          type: "string",
          description: "Optional CSS object-position value, for example center, right center, or 60% center.",
        },
        {
          name: "imageWidth",
          title: "Desktop Image Width",
          type: "string",
          description: "Optional CSS width for desktop, for example 60%. Mobile stays 100%.",
        },
      ],
    },
    {
      name: "leadershipSection",
      title: "Leadership Team Section",
      type: "object",
      options: { collapsible: true, collapsed: false },
      description: "Editable academic team intro and leadership cards shown below the hero.",
      fields: [
        { name: "heading", title: "Intro Text", type: "sectionHeading" },
        {
          name: "groupTitle",
          title: "Group Title",
          type: "string",
          description: "Example: Senior Leadership Team.",
        },
        {
          name: "members",
          title: "Team Members",
          type: "array",
          of: [{ type: "boardGovernorMember" }],
        },
        {
          name: "backgroundColor",
          title: "Section Background Color",
          type: "string",
          description: "Optional CSS color, for example #ffffff.",
        },
        {
          name: "introColor",
          title: "Intro Text Color",
          type: "string",
          description: "Optional CSS color for the large intro text.",
        },
        {
          name: "bodyColor",
          title: "Small Text Color",
          type: "string",
          description: "Optional CSS color for the small paragraph under the intro.",
        },
        {
          name: "titleColor",
          title: "Group Title Color",
          type: "string",
          description: "Optional CSS color for the group title.",
        },
        {
          name: "lineColor",
          title: "Divider Line Color",
          type: "string",
          description: "Optional CSS color for the line under the group title.",
        },
      ],
    },
  ],
  preview: {
    select: {
      title: "hero.heading.title",
      subtitle: "seo.description",
      media: "hero.image.image",
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || "Our Team Page",
        subtitle,
        media,
      };
    },
  },
};
