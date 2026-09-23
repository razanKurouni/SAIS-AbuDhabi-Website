import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { CSSProperties } from "react";
import { RichText } from "@/components/ui/rich-text";
import { Reveal } from "@/components/ui/reveal";
import { SaisCurvedPanel } from "@/components/ui/sais-curved-panel";
import type { AboutKhdaSection as AboutKhdaSectionData, PortableTextBlock } from "@/types/sanity";

type AboutKhdaSectionProps = {
  section?: AboutKhdaSectionData;
};

type AboutKhdaStyle = CSSProperties & {
  "--about-khda-bg"?: string;
  "--about-khda-panel"?: string;
  "--about-khda-accent"?: string;
  "--about-khda-title"?: string;
  "--about-khda-text"?: string;
  "--about-khda-image-position"?: string;
};

const fallbackDescription: PortableTextBlock[] = [
  {
    _key: "about-khda-description",
    _type: "block",
    children: [
      {
        _key: "about-khda-description-span",
        _type: "span",
        marks: [],
        text:
          "The Strategic Planning and Educational Affairs Authority (SPEA) is the official government body responsible for regulating and monitoring private education in the Emirate of Sharjah. SPEA works to ensure high-quality educational standards across private schools and educational institutions by conducting inspections, supporting continuous improvement, and assisting families with concerns that remain unaddressed at the school level."
      },
    ],
  },
];

const fallbackSection: AboutKhdaSectionData = {
  heading: {
    title: "The Strategic Planning and Educational Affairs Authority (SPEA)",
    description: fallbackDescription,
  },
  image: {
    url: "/sais-building-futures.png",
    alt: "SAIS - UAQ students learning in a science lab",
  },
  badge: {
    url: "/about-khda-badge.png",
    alt: "Licensed and approved by SPEA",
  },
  cta: {
    label: "See More",
    href: "https://spea.shj.ae/en/",
    openInNewTab: true,
  },
  imagePosition: "center",
  backgroundColor: "#ffffff",
  panelColor: "#27779d",
  accentColor: "#00a5b2",
  titleColor: "#00a5b2",
  textColor: "#ffffff",
};

export function AboutKhdaSection({ section }: AboutKhdaSectionProps) {
  const title = section?.heading?.title || fallbackSection.heading?.title;
  const description = section?.heading?.description?.length
    ? section.heading.description
    : fallbackSection.heading?.description;
  const image = section?.image?.url ? section.image : fallbackSection.image;
  // The badge and the button only appear when the CMS section provides them.
  const badge = section ? (section.badge?.url ? section.badge : undefined) : fallbackSection.badge;
  const cta = section ? section.cta : fallbackSection.cta;
  const style: AboutKhdaStyle = {
    "--about-khda-bg": section?.backgroundColor || fallbackSection.backgroundColor,
    "--about-khda-panel": section?.panelColor || fallbackSection.panelColor,
    "--about-khda-accent": section?.accentColor || fallbackSection.accentColor,
    "--about-khda-title": section?.titleColor || fallbackSection.titleColor,
    "--about-khda-text": section?.textColor || fallbackSection.textColor,
    "--about-khda-image-position": section?.imagePosition || fallbackSection.imagePosition,
  };

  if (!title && !description?.length && !image?.url && !badge?.url) {
    return null;
  }

  return (
    <section
      id="about-khda"
      className="about-khda"
      aria-labelledby="about-khda-title"
      style={style}
    >
      <Reveal className="about-khda__layout" threshold={0.18}>
        <div className="about-khda__media">
          <div className="about-khda__image-shell">
            {image?.url ? (
              <Image
                src={image.url}
                alt={image.alt || title || "SAIS - UAQ students"}
                fill
                sizes="(max-width: 767px) calc(100vw - 50px), 44vw"
                className="about-khda__image"
              />
            ) : null}
          </div>
        </div>

        <SaisCurvedPanel
          className="about-khda__shape"
          contentClassName="about-khda__shape-content"
          fillColor={section?.panelColor || fallbackSection.panelColor}
          accentColor={section?.accentColor || fallbackSection.accentColor}
          strokeWidth={88}
          flipped
        >
          <div className="about-khda__content">
            {title ? (
              <h2 id="about-khda-title" className="about-khda__title">
                {title}
              </h2>
            ) : null}
            {description?.length ? <RichText blocks={description} className="about-khda__description" /> : null}
            <div className="about-khda__bottom">
              {cta?.label ? (
                <Link
                  href={cta.href || "#"}
                  target={cta.openInNewTab ? "_blank" : undefined}
                  rel={cta.openInNewTab ? "noreferrer" : undefined}
                  className="about-khda__button"
                >
                  <span>{cta.label}</span>
                  <span className="about-khda__button-icon" aria-hidden="true">
                    <ArrowRight size={18} strokeWidth={3} />
                  </span>
                </Link>
              ) : null}
              {badge?.url ? (
                <Image
                  src={badge.url}
                  alt={badge.alt || "Licensed and approved by SPEA"}
                  width={300}
                  height={168}
                  className="about-khda__badge"
                  sizes="(max-width: 767px) 220px, 190px"
                />
              ) : null}
            </div>
          </div>
          <div className="about-khda__mobile-divider" aria-hidden="true">
            <svg className="about-khda__curve-mask" viewBox="0 0 96 320" preserveAspectRatio="none">
              <path d="M0 -32 H52 C16 42 16 92 42 154 C70 220 70 274 38 352 H0 Z" />
            </svg>
            <svg className="about-khda__wave" viewBox="0 0 96 320" preserveAspectRatio="none">
              <path d="M52 -24 C16 42 16 92 42 154 C70 220 70 274 38 344" />
            </svg>
          </div>
        </SaisCurvedPanel>
      </Reveal>
    </section>
  );
}
