import Image from "next/image";
import type { ReactNode } from "react";
import { SaisCurvedPanel } from "@/components/ui/sais-curved-panel";
import type { SanityImage } from "@/types/sanity";

/**
 * Shared layout: floating image card on the left + SaisCurvedPanel on the right.
 * Renders only the inner container — the caller owns the outer <section> wrapper.
 * Pass `mediaSlot` to override the default <Image> rendering (e.g. when the
 * image needs an extra shell div like in IntroFeatureSection).
 */
type ImageCurvedPanelProps = {
  // Inner container
  innerClassName?: string;
  // Default image rendering
  image?: SanityImage;
  imageSizes?: string;
  imageQuality?: number;
  priority?: boolean;
  mediaClassName?: string;
  imageClassName?: string;
  // Custom media slot — overrides image/mediaClassName when provided
  mediaSlot?: ReactNode;
  // SaisCurvedPanel
  fillColor?: string;
  accentColor?: string;
  strokeWidth?: number;
  flipped?: boolean;
  minHeight?: string;
  panelClassName?: string;
  panelContentClassName?: string;
  // Panel content
  children: ReactNode;
};

export function ImageCurvedPanel({
  innerClassName = "",
  image,
  imageSizes = "(max-width: 767px) 100vw, 44vw",
  imageQuality = 84,
  priority = false,
  mediaClassName = "",
  imageClassName = "",
  mediaSlot,
  fillColor = "var(--sais-primary)",
  accentColor = "var(--sais-accent)",
  strokeWidth = 88,
  flipped = false,
  minHeight,
  panelClassName = "",
  panelContentClassName = "",
  children,
}: ImageCurvedPanelProps) {
  const media = mediaSlot ?? (
    <div className={mediaClassName}>
      {image?.url && (
        <Image
          src={image.url}
          alt={image.alt || ""}
          fill
          sizes={imageSizes}
          quality={imageQuality}
          priority={priority}
          className={imageClassName}
        />
      )}
    </div>
  );

  return (
    <div className={innerClassName}>
      {media}
      <SaisCurvedPanel
        fillColor={fillColor}
        accentColor={accentColor}
        strokeWidth={strokeWidth}
        flipped={flipped}
        minHeight={minHeight}
        className={panelClassName}
        contentClassName={panelContentClassName}
      >
        {children}
      </SaisCurvedPanel>
    </div>
  );
}
