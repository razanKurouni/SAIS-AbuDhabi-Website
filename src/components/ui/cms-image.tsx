import Image from "next/image";
import type { SanityImage } from "@/types/sanity";

type CmsImageProps = {
  image?: SanityImage;
  alt?: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  sizes?: string;
  fallbackLabel?: string;
};

export function CmsImage({
  image,
  alt,
  className = "aspect-[16/10]",
  imageClassName = "object-cover",
  priority = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
  fallbackLabel = "Image",
}: CmsImageProps) {
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ backgroundColor: "var(--sais-primary)" }}
    >
      {image?.url ? (
        <Image
          src={image.url}
          alt={image.alt || alt || fallbackLabel}
          fill
          sizes={sizes}
          className={imageClassName}
          priority={priority}
        />
      ) : (
        <div
          className="flex h-full w-full flex-col justify-end p-5 text-white"
          style={{
            background:
              "radial-gradient(circle at 20% 18%, rgba(255,255,255,0.32), transparent 35%), linear-gradient(135deg, var(--sais-primary), var(--sais-accent))",
          }}
        >
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
            Image Slot
          </span>
          <span className="mt-2 text-lg font-semibold">{fallbackLabel}</span>
        </div>
      )}
    </div>
  );
}
