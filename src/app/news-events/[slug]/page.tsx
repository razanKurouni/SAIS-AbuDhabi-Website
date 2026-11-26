import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SitePageShell } from "@/components/layout/site-page-shell";
import { InnerPageNav } from "@/components/sections/inner-page-nav";
import { RichText } from "@/components/ui/rich-text";
import { SectionReveal } from "@/components/ui/section-reveal";
import { focalPointStyle } from "@/lib/focal-point";
import { getHomepage, getNewsPostBySlug } from "@/lib/sanity";

type NewsPostPageProps = {
  params: Promise<{ slug: string }>;
};

const innerNavItems = [
  { label: "Latest News", href: "/news-events" },
  { label: "Contact Us", href: "/contact-us" },
  { label: "Careers", href: "/careers" },
];

export async function generateMetadata({ params }: NewsPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getNewsPostBySlug(slug);

  if (!post) {
    return {
      title: "News | SAIS - Abu Dhabi",
      robots: { index: false, follow: false },
    };
  }

  const title = post.seo?.title || `${post.title || "News"} | SAIS - Abu Dhabi`;
  const description = post.seo?.description || post.excerpt || "Latest news and events from SAIS - Abu Dhabi.";
  const image = post.seo?.image?.url || post.image?.url;
  const imageAlt = post.seo?.image?.alt || post.image?.alt || post.title || "SAIS - Abu Dhabi news";
  const canonicalPath = `/news-events/${slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      type: "article",
      url: canonicalPath,
      siteName: "SAIS - Abu Dhabi",
      title,
      description,
      publishedTime: post.publishedAt,
      images: image
        ? [
            {
              url: image,
              alt: imageAlt,
              width: post.seo?.image?.width || post.image?.width,
              height: post.seo?.image?.height || post.image?.height,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
}

export const dynamic = "force-dynamic";

export default async function NewsPostPage({ params }: NewsPostPageProps) {
  const { slug } = await params;
  const [data, post] = await Promise.all([getHomepage(), getNewsPostBySlug(slug)]);
  if (!post) notFound();

  const publishedDate = post.publishedAt
    ? new Intl.DateTimeFormat("en-AE", { day: "numeric", month: "long", year: "numeric" }).format(new Date(post.publishedAt))
    : null;

  // Portrait photos (taller than wide) get a 4:3 frame on tablet/desktop too, so heads are not cropped.
  const isPortraitImage = (post.image?.height ?? 0) > (post.image?.width ?? 0);
  const isPortrait = (image?: { width?: number; height?: number }) => (image?.height ?? 0) > (image?.width ?? 0);
  const gallery = (post.gallery || []).filter((image) => image?.url);

  return (
    <SitePageShell data={data} mainClassName="site-page__main news-post-page__main" pageClassName="news-post-page">
      <InnerPageNav
        className="news-contact-careers-inner-nav"
        items={innerNavItems}
        activeHref="/news-events"
        activeColor="#00A5B2"
        inactiveColor="#707174"
        textColor="#ffffff"
        dividerColor="#ffffff"
        topLineColor="#ffffff"
        ariaLabel="News, contact and careers navigation"
      />
      <article className="news-post">
        <SectionReveal className="news-post__inner">
          <header className="news-post__header">
            <p className="news-post__eyebrow">{post.category === "newsletter" ? "Newsletter" : "News & Events"}</p>
            <h1>{post.title}</h1>
            {publishedDate ? <time dateTime={post.publishedAt}>{publishedDate}</time> : null}
          </header>
          {post.image?.url ? (
            <div className={`news-post__image-wrap ${isPortraitImage ? "news-post__image-wrap--portrait" : ""}`.trim()}>
              <Image
                src={post.image.url}
                alt={post.image.alt || post.title || "News image"}
                fill
                priority
                sizes="(max-width: 767px) calc(100vw - 32px), 85vw"
                className="news-post__image"
                style={focalPointStyle(post.image)}
              />
            </div>
          ) : null}
          <RichText blocks={post.body} fallback={post.excerpt} className="news-post__body" />
          {gallery.length ? (
            <div className="news-post__gallery">
              {gallery.map((image, index) => (
                <div
                  key={image.url}
                  className={`news-post__image-wrap ${isPortrait(image) ? "news-post__image-wrap--portrait" : ""}`.trim()}
                >
                  <Image
                    src={image.url as string}
                    alt={image.alt || `${post.title || "News"} photo ${index + 2}`}
                    fill
                    sizes="(max-width: 767px) calc(100vw - 32px), 85vw"
                    className="news-post__image"
                    style={focalPointStyle(image)}
                  />
                </div>
              ))}
            </div>
          ) : null}
        </SectionReveal>
      </article>
    </SitePageShell>
  );
}
