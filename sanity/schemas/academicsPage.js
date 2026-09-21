export const academicsPage = {
  name: "academicsPage",
  title: "Academics Introduction Page",
  type: "document",
  fields: [
    { name: "seo", title: "SEO", type: "seo", options: { collapsible: true, collapsed: false } },
    {
      name: "hero",
      title: "Hero",
      type: "object",
      options: { collapsible: true, collapsed: false },
      description: "Editable hero content and colors for the Academics introduction page.",
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
          title: "Panel Background Color",
          type: "string",
          description: "Optional CSS color for the left hero panel, for example #707174.",
        },
        {
          name: "waveColor",
          title: "Curved Line Color",
          type: "string",
          description: "Optional CSS color for the curved divider, for example #00A5B2.",
        },
        {
          name: "textColor",
          title: "Text Color",
          type: "string",
          description: "Optional CSS color for the title, for example #ffffff.",
        },
        {
          name: "imagePosition",
          title: "Image Position",
          type: "string",
          description: "Optional CSS object-position value, for example center or 60% center.",
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
      name: "curriculumSection",
      title: "Curriculum Philosophy Section",
      type: "object",
      options: { collapsible: true, collapsed: false },
      description: "Editable curved image panel shown below the Academics navigation.",
      fields: [
        { name: "heading", title: "Text Content", type: "sectionHeading" },
        { name: "image", title: "Image", type: "imageWithAlt" },
        {
          name: "imagePosition",
          title: "Image Position",
          type: "string",
          description: "Optional CSS object-position value, for example center or 45% center.",
        },
        {
          name: "panelColor",
          title: "Panel Background Color",
          type: "string",
          description: "Optional CSS color, for example #00A5B2.",
        },
        {
          name: "waveColor",
          title: "Curved Line Color",
          type: "string",
          description: "Optional CSS color, for example #d97252.",
        },
        {
          name: "textColor",
          title: "Text Color",
          type: "string",
          description: "Optional CSS color, for example #ffffff.",
        },
      ],
    },
    {
      name: "cultureSection",
      title: "Rooted in Culture Section",
      type: "imageTextSection",
      options: { collapsible: true, collapsed: false },
      description: "The blue image and text section shown directly below Curriculum Philosophy and Vision.",
    },
    {
      name: "steamSection",
      title: "STEAM Integration Section",
      type: "imageTextSection",
      options: { collapsible: true, collapsed: false },
      description: "The white image and text section shown below Rooted in Culture.",
    },
    {
      name: "skillsSection",
      title: "Key Skills & Dispositions Section",
      type: "object",
      options: { collapsible: true, collapsed: false },
      description: "Editable intro text and icon cards shown below the curriculum panel.",
      fields: [
        { name: "heading", title: "Intro Text", type: "sectionHeading" },
        {
          name: "groups",
          title: "Groups",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                { name: "title", title: "Group Title", type: "string" },
                {
                  name: "items",
                  title: "Cards",
                  type: "array",
                  of: [
                    {
                      type: "object",
                      fields: [
                        { name: "title", title: "Card Title", type: "string" },
                        { name: "icon", title: "Optional Icon Image", type: "imageWithAlt" },
                        {
                          name: "iconType",
                          title: "Fallback Icon Type",
                          type: "string",
                          options: {
                            list: [
                              { title: "Critical / Thinking", value: "critical" },
                              { title: "Communication", value: "communication" },
                              { title: "Organization", value: "organization" },
                              { title: "Research", value: "research" },
                              { title: "Resilience", value: "resilience" },
                              { title: "Empathy", value: "empathy" },
                              { title: "Curiosity", value: "curiosity" },
                              { title: "Growth Mindset", value: "growth" },
                            ],
                            layout: "dropdown",
                          },
                        },
                        {
                          name: "theme",
                          title: "Card Accent Color",
                          type: "string",
                          options: {
                            list: [
                              { title: "Teal", value: "teal" },
                              { title: "Orange", value: "orange" },
                            ],
                            layout: "radio",
                          },
                          initialValue: "teal",
                        },
                      ],
                      preview: {
                        select: {
                          title: "title",
                          subtitle: "iconType",
                          media: "icon.image",
                        },
                      },
                    },
                  ],
                },
              ],
              preview: {
                select: {
                  title: "title",
                },
              },
            },
          ],
        },
      ],
    },
    {
      name: "curriculumOverviewSection",
      title: "Our Curriculum Overview Section",
      type: "object",
      options: { collapsible: true, collapsed: false },
      description: "Editable curriculum section with text on the left and an image on the right.",
      fields: [
        {
          name: "firstBlock",
          title: "First Row",
          type: "imageTextSection",
          description: "Shown as text on the left and image on the right.",
        },
      ],
    },
    {
      name: "teachingCommitmentsSection",
      title: "Teaching Commitments Section",
      type: "object",
      options: { collapsible: true, collapsed: false },
      description: "Editable commitment cards with icons and hover animation.",
      fields: [
        { name: "heading", title: "Heading", type: "sectionHeading" },
        {
          name: "cards",
          title: "Cards",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                { name: "title", title: "Card Title", type: "string" },
                { name: "description", title: "Card Description", type: "text", rows: 3 },
                { name: "icon", title: "Icon Image", type: "imageWithAlt" },
                {
                  name: "iconType",
                  title: "Fallback Icon Type",
                  type: "string",
                  options: {
                    list: [
                      { title: "High Expectations", value: "expectations" },
                      { title: "Engagement", value: "engagement" },
                      { title: "Achievement", value: "achievement" },
                    ],
                    layout: "dropdown",
                  },
                },
              ],
              preview: {
                select: {
                  title: "title",
                  subtitle: "description",
                  media: "icon.image",
                },
              },
            },
          ],
        },
      ],
    },
    {
      name: "learningSliderSection",
      title: "Understanding Student Learning Slider",
      type: "object",
      options: { collapsible: true, collapsed: false },
      description: "Editable four-card slider for assessments and testing information.",
      fields: [
        { name: "heading", title: "Section Heading", type: "sectionHeading" },
        {
          name: "slides",
          title: "Slides",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                { name: "title", title: "Slide Title", type: "string" },
                {
                  name: "body",
                  title: "Slide Body",
                  type: "text",
                  rows: 10,
                  description: "Use blank lines between paragraphs. Start lines with - for bullet lists.",
                },
                { name: "image", title: "Slide Image", type: "imageWithAlt" },
                {
                  name: "backgroundColor",
                  title: "Main Background Color",
                  type: "string",
                  description: "Optional CSS color, for example #d97252 or #216B97.",
                },
                {
                  name: "sideColor",
                  title: "Side Background Color",
                  type: "string",
                  description: "Optional CSS color for the left curved panel, for example #00A5B2.",
                },
                {
                  name: "ringColor",
                  title: "Curved Ring Color",
                  type: "string",
                  description: "Optional CSS color for the curved stripe, for example #216B97.",
                },
                {
                  name: "textColor",
                  title: "Text Color",
                  type: "string",
                  description: "Optional CSS color for slide text, for example #ffffff.",
                },
                {
                  name: "imagePosition",
                  title: "Image Position",
                  type: "string",
                  description: "Optional CSS object-position value, for example center or 45% center.",
                },
              ],
              preview: {
                select: {
                  title: "title",
                  subtitle: "body",
                  media: "image.image",
                },
              },
            },
          ],
        },
      ],
    },
    {
      name: "assessmentProtocolSection",
      title: "Assessment Protocol Section",
      type: "object",
      options: { collapsible: true, collapsed: false },
      description: "The four assessment protocol cards shown below Understanding Student Learning.",
      fields: [
        { name: "heading", title: "Heading and Intro", type: "sectionHeading" },
        {
          name: "cards",
          title: "Assessment Cards",
          type: "array",
          validation: (Rule) => Rule.max(4),
          of: [
            {
              type: "object",
              fields: [
                { name: "title", title: "Title", type: "string" },
                { name: "description", title: "Description", type: "text", rows: 3 },
                { name: "icon", title: "Optional Icon Image", type: "imageWithAlt" },
              ],
              preview: { select: { title: "title", subtitle: "description", media: "icon.image" } },
            },
          ],
        },
        { name: "backgroundColor", title: "Background Color", type: "string" },
        { name: "titleColor", title: "Title Color", type: "string" },
        { name: "textColor", title: "Intro Text Color", type: "string" },
        { name: "cardTextColor", title: "Card Text Color", type: "string" },
        { name: "cardBorderColor", title: "Card Border Color", type: "string" },
        { name: "cardHoverBorderColor", title: "Card Hover Border Color", type: "string" },
      ],
    },
    {
      name: "calendarDownload",
      title: "Calendar Download Section",
      type: "object",
      options: { collapsible: true, collapsed: false },
      description: "The download banner for the school calendar PDF.",
      fields: [
        {
          name: "text",
          title: "Label Text",
          type: "string",
          description: 'Text shown on the left, e.g. "Download the full school calendar here:"',
          initialValue: "Download the full school calendar here:",
        },
        {
          name: "buttonLabel",
          title: "Button Label",
          type: "string",
          initialValue: "Download",
        },
        {
          name: "file",
          title: "PDF File",
          type: "file",
          description: "Upload the school calendar PDF here.",
          options: { accept: ".pdf" },
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
        title: title || "Academics Introduction Page",
        subtitle,
        media,
      };
    },
  },
};
