import Image from "next/image";
import { Play } from "lucide-react";
import type { CSSProperties } from "react";
import { RichText } from "@/components/ui/rich-text";
import { Reveal } from "@/components/ui/reveal";
import { SectionReveal } from "@/components/ui/section-reveal";
import type { CampusVideoSection, ParentEngagementSection } from "@/types/sanity";

type VideoFeatureSectionProps = {
  section?: ParentEngagementSection;
  fallbackSection?: ParentEngagementSection;
  video?: CampusVideoSection;
  className?: string;
  titleId?: string;
};

type VideoFeatureStyle = CSSProperties & {
  "--video-feature-band"?: string;
  "--video-feature-title"?: string;
  "--video-feature-text"?: string;
};

export function VideoFeatureSection({
  section,
  fallbackSection,
  video,
  className = "",
  titleId = "video-feature-title",
}: VideoFeatureSectionProps) {
  const title = section?.heading?.title || fallbackSection?.heading?.title;
  const description = section?.heading?.description?.length
    ? section.heading.description
    : fallbackSection?.heading?.description;
  const bodyText = section?.bodyText?.length ? section.bodyText : fallbackSection?.bodyText;
  const poster = video?.poster;
  const videoUrl = video?.videoFileUrl || video?.videoUrl;
  const hasVideo = Boolean(poster?.url || videoUrl);

  if (!title && !description?.length && !bodyText?.length && !hasVideo) {
    return null;
  }

  const style: VideoFeatureStyle = {
    "--video-feature-band": section?.bandColor || fallbackSection?.bandColor,
    "--video-feature-title": section?.titleColor || fallbackSection?.titleColor,
    "--video-feature-text": section?.textColor || fallbackSection?.textColor,
  };

  return (
    <section
      className={`video-feature ${className}`.trim()}
      aria-labelledby={title ? titleId : undefined}
      style={style}
    >
      {title || description?.length ? (
        <SectionReveal className="video-feature__intro">
          {title ? (
            <h2 id={titleId} className="video-feature__title">
              {title}
            </h2>
          ) : null}
          <RichText blocks={description} className="video-feature__description" />
        </SectionReveal>
      ) : null}

      {hasVideo ? (
        <div className="video-feature__stage">
          <span className="video-feature__band" aria-hidden="true" />
          <Reveal className="video-feature__frame" threshold={0.12}>
            {videoUrl ? (
              <video className="video-feature__media" controls preload="metadata" poster={poster?.url}>
                <source src={videoUrl} />
              </video>
            ) : poster?.url ? (
              <Image
                src={poster.url}
                alt={poster.alt || title || "SAIS - Sharjah parents video"}
                fill
                sizes="(max-width: 767px) 100vw, 85vw"
                className="video-feature__poster"
              />
            ) : null}

            {!videoUrl ? (
              <span className="video-feature__play" aria-hidden="true">
                <Play size={48} strokeWidth={2.2} fill="currentColor" />
              </span>
            ) : null}
          </Reveal>
        </div>
      ) : null}

      {bodyText?.length ? (
        <SectionReveal className="video-feature__outro">
          <RichText blocks={bodyText} className="video-feature__body" />
        </SectionReveal>
      ) : null}
    </section>
  );
}
