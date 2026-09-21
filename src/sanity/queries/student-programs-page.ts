const imageWithAltProjection = `{
  alt,
  caption,
  "url": image.asset->url,
  "mobileUrl": ^.mobileImage.image.asset->url,
  "mobileAlt": ^.mobileImage.alt
}`;

const headingProjection = `{
  eyebrow,
  title,
  accentTitle,
  subtitle,
  description
}`;

export const studentProgramsPageQuery = `*[_type == "studentProgramsPage" && _id == "student-programs-page"][0] {
  seo {
    title,
    description,
    image ${imageWithAltProjection}
  },
  hero {
    heading ${headingProjection},
    image ${imageWithAltProjection},
    topLineColor,
    panelColor,
    waveColor,
    textColor,
    imagePosition,
    imageWidth
  },
  innerNavigation {
    items[] {
      _key,
      label,
      href,
      openInNewTab
    },
    activeHref,
    activeColor,
    inactiveColor,
    textColor,
    dividerColor,
    topLineColor,
    ariaLabel
  },
  excellenceIntro {
    heading ${headingProjection},
    image ${imageWithAltProjection},
    imagePosition,
    backgroundColor,
    titleColor,
    textColor
  },
  highlightsSection {
    heading ${headingProjection},
    image ${imageWithAltProjection}
  },
  communitySection {
    heading ${headingProjection},
    image ${imageWithAltProjection},
    imagePosition,
    backgroundColor,
    textColor
  }
}`;
