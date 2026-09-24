import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import type { SanityImage } from "@/types/sanity";

export type TitledImage = {
  _key?: string;
  title?: string;
  image?: SanityImage;
};

type TitledImagesSectionProps = {
  items?: TitledImage[];
  className?: string;
  ariaLabel?: string;
};

/** A stack of blocks, each a teal title over a rule and a wide photo in its natural proportions. */
export function TitledImagesSection({ items = [], className = "", ariaLabel }: TitledImagesSectionProps) {
  const blocks = items.filter((item) => item.title || item.image?.url);
  if (!blocks.length) return null;

  return (
    <section className={`titled-images ${className}`.trim()} aria-label={ariaLabel}>
      <div className="titled-images__inner">
        {blocks.map((item, index) => (
          <Reveal as="article" className="titled-images__block" key={item._key || `${item.title}-${index}`} delay={index * 120} threshold={0.1}>
            {item.title ? (
              <>
                <h2 className="titled-images__title">{item.title}</h2>
                <div className="titled-images__divider" aria-hidden="true" />
              </>
            ) : null}
            {item.image?.url ? (
              <div
                className="titled-images__media"
                style={{ aspectRatio: item.image.width && item.image.height ? `${item.image.width} / ${item.image.height}` : "3.8 / 1" }}
              >
                <Image
                  src={item.image.url}
                  alt={item.image.alt || item.title || ""}
                  fill
                  sizes="(max-width: 767px) calc(100vw - 32px), 85vw"
                  quality={86}
                  className="titled-images__image"
                />
              </div>
            ) : null}
          </Reveal>
        ))}
      </div>
    </section>
  );
}
