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

export const studentLifePageQuery = `*[_type == "studentLifePage" && _id == "student-life-page"][0] {
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
  beyondClassroomIntro {
    heading ${headingProjection},
    backgroundColor,
    titleColor,
    accentColor,
    textColor
  },
  sgaSection {
    heading ${headingProjection},
    image ${imageWithAltProjection},
    imagePosition,
    panelColor,
    waveColor,
    titleColor,
    textColor
  },
  studentCongressSection {
    heading ${headingProjection},
    image ${imageWithAltProjection},
    imagePosition,
    backgroundColor,
    textColor
  },
  ministriesSlider {
    heading ${headingProjection},
    cards[] {
      _key,
      title,
      description,
      icon ${imageWithAltProjection}
    },
    backgroundColor,
    titleColor,
    cardTextColor,
    cardIconColor,
    cardBorderColor,
    cardHoverBorderColor
  },
  programsSection {
    heading ${headingProjection},
    image ${imageWithAltProjection},
    imagePosition,
    backgroundColor,
    titleColor,
    textColor
  },
  miniSgaSection {
    heading ${headingProjection},
    image ${imageWithAltProjection},
    imagePosition,
    panelColor,
    waveColor,
    titleColor,
    textColor
  },
  sgaShowcaseSection {
    heading ${headingProjection},
    image ${imageWithAltProjection},
    imagePosition,
    backgroundColor,
    titleColor,
    textColor
  }
}`;
