import type { CSSProperties } from "react";
import type { SanityImage } from "@/types/sanity";

/**
 * For a photo drawn with object-fit: cover: the point the editor marked with the Studio's crop tool becomes the
 * object-position, so that point stays in the frame whatever its shape. Without one, the stylesheet's position applies.
 */
export function focalPointStyle(image?: SanityImage): CSSProperties | undefined {
  const x = image?.hotspot?.x;
  const y = image?.hotspot?.y;
  if (typeof x !== "number" || typeof y !== "number") return undefined;
  return { objectPosition: `${Math.round(x * 100)}% ${Math.round(y * 100)}%` };
}
