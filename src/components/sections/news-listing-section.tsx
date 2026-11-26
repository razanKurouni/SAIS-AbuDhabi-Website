"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionReveal } from "@/components/ui/section-reveal";
import { focalPointStyle } from "@/lib/focal-point";
import type { NewsPost } from "@/types/sanity";

type NewsListingSectionProps = {
  newsPosts: NewsPost[];
  newsletterPosts: NewsPost[];
  newsHeading?: string;
  newslettersHeading?: string;
  buttonLabel?: string;
};

function NewsButton({ post, label }: { post: NewsPost; label: string }) {
  return (
    <Link className="news-listing-card__button" href={`/news-events/${post.slug}`}>
      <span>{label}</span>
      <span className="news-listing-card__arrow" aria-hidden="true">
        <ArrowRight size={16} strokeWidth={3} />
      </span>
    </Link>
  );
}

function NewsCard({ post, buttonLabel }: { post: NewsPost; buttonLabel: string }) {
  return (
    <article className="news-listing-card">
      <Link className="news-listing-card__media" href={`/news-events/${post.slug}`} tabIndex={-1}>
        {post.image?.url ? (
          <Image
            src={post.image.url}
            alt={post.image.alt || post.title || "News image"}
            fill
            sizes="(max-width: 767px) calc(100vw - 32px), 28vw"
            className="news-listing-card__image"
            style={focalPointStyle(post.image)}
          />
        ) : null}
      </Link>
      <div className="news-listing-card__body">
        <h3><Link href={`/news-events/${post.slug}`}>{post.title}</Link></h3>
        {post.excerpt ? <p>{post.excerpt}</p> : null}
        <NewsButton post={post} label={buttonLabel} />
      </div>
    </article>
  );
}

/** Every post as a card in the grid (three across on desktop, two on tablet, one on phones); no slider. */
function NewsCardsCollection({ posts, buttonLabel }: { posts: NewsPost[]; buttonLabel: string }) {
  return (
    <div className="news-listing__grid">
      {posts.map((post) => <NewsCard key={post._id || post.slug} post={post} buttonLabel={buttonLabel} />)}
    </div>
  );
}

export function NewsListingSection({
  newsPosts,
  newsletterPosts,
  newsHeading = "Latest News & Events",
  newslettersHeading = "Newsletters",
  buttonLabel = "See More",
}: NewsListingSectionProps) {
  const orderedNews = [...newsPosts.filter((post) => post.featured), ...newsPosts.filter((post) => !post.featured)];

  return (
    <div className="news-listing">
      {newsPosts.length ? (
        <section className="news-listing__section news-listing__section--newsletters" aria-labelledby="news-listing-heading">
          <SectionReveal className="news-listing__inner">
            <h2 id="news-listing-heading" className="news-listing__heading">{newsHeading}</h2>
            <NewsCardsCollection posts={orderedNews} buttonLabel={buttonLabel} />
          </SectionReveal>
        </section>
      ) : null}

      {newsletterPosts.length ? (
        <section className="news-listing__section news-listing__section--newsletters" aria-labelledby="newsletter-listing-heading">
          <SectionReveal className="news-listing__inner">
            <h2 id="newsletter-listing-heading" className="news-listing__heading">{newslettersHeading}</h2>
            <NewsCardsCollection posts={newsletterPosts} buttonLabel={buttonLabel} />
          </SectionReveal>
        </section>
      ) : null}
    </div>
  );
}
