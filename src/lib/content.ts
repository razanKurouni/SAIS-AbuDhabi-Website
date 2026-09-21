import type {
  Cta,
  FeatureCard,
  HomepageData,
  LegacyHomeSection,
  LinkField,
  MetricItem,
  PortableTextBlock,
  SanityImage,
  SectionHeading,
} from "@/types/sanity";

export function richTextToPlainText(blocks?: PortableTextBlock[] | null) {
  return (blocks || [])
    .map((block) =>
      (block.children || [])
        .map((child) => child.text || "")
        .join("")
        .trim()
    )
    .filter(Boolean)
    .join("\n\n");
}

export function richTextToParagraphs(blocks?: PortableTextBlock[] | null) {
  return richTextToPlainText(blocks)
    .split("\n\n")
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

export function blocksFromText(text: string): PortableTextBlock[] {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line, index) => ({
      _key: `paragraph-${index}`,
      _type: "block",
      children: [{ _key: `span-${index}`, _type: "span", text: line }],
    }));
}

export function asHeading(title: string, subtitle?: string): SectionHeading {
  return { title, subtitle };
}

function headingFromLegacy(section: LegacyHomeSection | undefined, fallbackTitle: string): SectionHeading {
  return {
    title: section?.title || fallbackTitle,
    subtitle: section?.subtitle,
    description: section?.body,
  };
}

export function asCta(label: string, href = "#", variant: Cta["variant"] = "primary"): Cta {
  return { label, href, variant };
}

export function parseHeadline(value: string, fallbackCta = "Learn More") {
  const [title, ...rest] = value.split(" - ");
  return {
    title: title?.trim() || value,
    ctaLabel: rest.join(" - ").trim() || fallbackCta,
  };
}

export function splitMetric(value: string): MetricItem {
  const [numberPart, ...labelParts] = value.split(" - ");
  return {
    value: numberPart?.trim() || value,
    label: labelParts.join(" - ").trim() || "",
  };
}

function sectionByOrder(sections: LegacyHomeSection[], order: number) {
  return sections.find((section) => section.order === order);
}

function firstImage(section?: LegacyHomeSection, index = 0): SanityImage | undefined {
  return section?.images?.[index];
}

function cardsFromLegacy(section?: LegacyHomeSection, fallbackCta = "Learn More"): FeatureCard[] {
  return (section?.items || []).map((item, index) => {
    const parsed = parseHeadline(item, fallbackCta);
    return {
      title: parsed.title,
      image: firstImage(section, index),
      cta: asCta(parsed.ctaLabel, "#", "secondary"),
    };
  });
}

function linksFromLabels(labels: string[] = []): LinkField[] {
  return labels.map((label) => ({
    label,
    href: "#",
  }));
}

export function mapLegacySectionsToHomepage(sections: LegacyHomeSection[]): HomepageData {
  const hero = sectionByOrder(sections, 1);
  const intro = sectionByOrder(sections, 2);
  const accreditations = sectionByOrder(sections, 4);
  const why = sectionByOrder(sections, 5);
  const facts = sectionByOrder(sections, 6);
  const quickLinks = sectionByOrder(sections, 7);
  const phases = sectionByOrder(sections, 8);
  const tour = sectionByOrder(sections, 10);
  const news = sectionByOrder(sections, 11);
  const instagram = sectionByOrder(sections, 12);
  const footer = sectionByOrder(sections, 13);

  const heroItems = hero?.items || [];
  const navLabels = heroItems.slice(0, 3);
  const valueBar = heroItems.slice(3);

  return {
    seo: {
      title: "SAIS - Sharjah | School Website",
      description: "Modern responsive Next.js frontend connected to Sanity content.",
      image: firstImage(hero),
    },
    navigation:
      navLabels.length > 0
        ? linksFromLabels(navLabels)
        : [
            { label: "Home", href: "#home" },
            { label: "Menu", href: "#quick-links" },
            { label: "Parent Portal", href: "#" },
          ],
    hero: {
      heading: hero?.title || "Empowering Students to Achieve Their Highest Potential",
      subtitle: hero?.subtitle,
      description: hero?.body,
      image: firstImage(hero),
      ctas: hero?.ctas?.map((label) => asCta(label)) || [],
      valueBar:
        valueBar.length > 0
          ? valueBar
          : ["Tolerance", "Equity", "Integrity", "Innovation", "Global Citizenship"],
    },
    intro: {
      heading: headingFromLegacy(intro, "Building Bright Futures with Purpose and Passion"),
      image: firstImage(intro),
      theme: "blue",
      imagePosition: "left",
      ctas: intro?.ctas?.map((label) => asCta(label, "#", "secondary")),
    },
    ctaBand: {
      text: "For applications, school tours, or general inquiries, please contact our admissions team.",
      ctas: [asCta("Apply Now"), asCta("Book a Tour", "#", "secondary"), asCta("Contact Us", "#", "ghost")],
    },
    accreditations: {
      heading: asHeading(accreditations?.title || "Accreditations & Affiliations"),
      logos: (accreditations?.items || []).map((name, index) => ({
        name,
        image: firstImage(accreditations, index),
      })),
    },
    whySection: {
      heading: headingFromLegacy(why, "Why SAIS?"),
      image: firstImage(why, 1) || firstImage(why),
      imagePosition: "right",
      theme: "teal",
      ctas: why?.ctas?.map((label) => asCta(label)) || [asCta("Learn More")],
    },
    facts: {
      heading: asHeading(facts?.title || "Facts & Figures"),
      items: (facts?.items || []).map(splitMetric),
    },
    quickLinks: {
      heading: asHeading(quickLinks?.title || "Quick Links"),
      cards: cardsFromLegacy(quickLinks, "See More"),
    },
    learningPhases: {
      heading: asHeading(phases?.title || "Our Learning Phases"),
      cta: asCta("See More", "#learning-phases"),
      cards: cardsFromLegacy(phases, "Learn More"),
    },
    tour: {
      heading: headingFromLegacy(tour, "Discover a Place Where Your Child Can Thrive"),
      cards: [
        {
          title: "Book a Tour",
          description: richTextToPlainText(tour?.body),
          image: firstImage(tour, 0),
          cta: asCta("Book a Tour"),
        },
        {
          title: "Start Your Application",
          image: firstImage(tour, 1),
          cta: asCta("Apply Now"),
        },
      ],
    },
    news: {
      heading: asHeading(news?.title || "Latest News"),
      posts: cardsFromLegacy(news, "Read More"),
    },
    instagram: {
      heading: asHeading(instagram?.title || "Follow Us"),
      images: instagram?.images || [],
      socialLinks: [
        { label: "Instagram", href: "#" },
        { label: "Facebook", href: "#" },
        { label: "Twitter", href: "#" },
      ],
    },
    footer: {
      logoText: "SAIS",
      contactText: footer?.body,
      columns: [
        {
          title: "School",
          links: linksFromLabels((footer?.items || []).slice(0, 6)),
        },
        {
          title: "Admissions",
          links: linksFromLabels((footer?.items || []).slice(6, 12)),
        },
        {
          title: "Legal",
          links: linksFromLabels((footer?.items || []).slice(12)),
        },
      ],
      legalLinks: linksFromLabels(footer?.ctas || ["Privacy Policy", "Terms & Conditions"]),
    },
  };
}
