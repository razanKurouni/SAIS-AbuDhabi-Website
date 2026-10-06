import type { ImageLoaderProps } from "next/image";

/**
 * Image loader that skips Vercel's image optimizer.
 *
 * Sanity's CDN resizes and re-encodes on the fly, so pictures from
 * cdn.sanity.io are requested at the width next/image asks for, with the
 * requested quality and the best format the browser accepts. Anything else
 * (files in /public, Instagram thumbnails) is served as-is.
 */
export default function imageLoader({ src, width, quality }: ImageLoaderProps): string {
  if (!src.startsWith("https://cdn.sanity.io/")) {
    return src;
  }

  const url = new URL(src);
  url.searchParams.set("w", String(width));
  url.searchParams.set("q", String(quality || 75));
  url.searchParams.set("auto", "format");
  url.searchParams.set("fit", "max");
  return url.toString();
}
