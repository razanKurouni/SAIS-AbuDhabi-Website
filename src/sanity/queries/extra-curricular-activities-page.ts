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

export const extraCurricularActivitiesPageQuery = `*[_type == "extraCurricularActivitiesPage" && _id == "extra-curricular-activities-page"][0] {
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
  enrichingIntro {
    heading ${headingProjection},
    backgroundColor,
    titleColor,
    subtitleColor,
    textColor
  },
  activitiesSlider {
    heading ${headingProjection},
    slides[] {
      _key,
      title,
      body,
      image ${imageWithAltProjection},
      backgroundColor,
      sideColor,
      ringColor,
      titleColor,
      textColor,
      imagePosition
    }
  }
}`;
