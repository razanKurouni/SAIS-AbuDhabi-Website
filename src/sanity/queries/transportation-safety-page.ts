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

export const transportationSafetyPageQuery = `*[_type == "transportationSafetyPage" && _id == "transportation-safety-page"][0] {
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
  safetyHighlight {
    heading ${headingProjection},
    image ${imageWithAltProjection},
    imagePosition,
    backgroundColor,
    titleColor,
    textColor
  },
  boardingSection {
    heading ${headingProjection},
    image ${imageWithAltProjection},
    imagePosition,
    theme,
    backgroundColor,
    titleColor,
    textColor
  }
}`;
