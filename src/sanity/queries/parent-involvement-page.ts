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

export const parentInvolvementPageQuery = `*[_type == "parentInvolvementPage" && _id == "parent-involvement-page"][0] {
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
  engagementSection {
    heading ${headingProjection},
    bodyText,
    bandColor,
    titleColor,
    textColor
  },
  proactiveIntroSection {
    heading ${headingProjection},
    image ${imageWithAltProjection},
    imagePosition,
    theme,
    backgroundColor,
    titleColor,
    textColor
  },
  proactiveApproach {
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
    cardBorderColor,
    cardHoverBorderColor
  },
  videoSection {
    poster ${imageWithAltProjection},
    "videoFileUrl": videoFile.asset->url,
    "videoFilename": videoFile.asset->originalFilename,
    videoUrl
  }
}`;
