import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import type { FeatureCard } from "@/types/sanity";

type LatestNewsCardsProps = {
  posts?: FeatureCard[];
};

function NewsArrow() {
  return (
    <span className="latest-news-card__arrow" aria-hidden="true">
      <ArrowRight size={17} strokeWidth={3} />
    </span>
  );
}

export function LatestNewsCards({ posts = [] }: LatestNewsCardsProps) {
  return (
    <div className="latest-news__grid">
      {posts.map((post, index) => {
        const href = post.cta?.href || "#";

        return (
          <Reveal
            as="article"
            key={`${post.title}-${index}`}
            className="latest-news-card"
            delay={index * 90}
            threshold={0.16}
          >
            <div className="latest-news-card__image-wrap">
              {post.image?.url ? (
                <Image
                  src={post.image.url}
                  alt={post.image.alt || post.title}
                  fill
                  quality={82}
                  sizes="(max-width: 767px) 92vw, (max-width: 1200px) 30vw, 360px"
                  className="latest-news-card__image"
                />
              ) : (
                <div className="latest-news-card__fallback">{post.title}</div>
              )}
            </div>

            <div className="latest-news-card__body">
              <h3 className="latest-news-card__title">{post.title}</h3>
              {post.description && <p className="latest-news-card__text">{post.description}</p>}

              <Link
                href={href}
                target={post.cta?.openInNewTab ? "_blank" : undefined}
                rel={post.cta?.openInNewTab ? "noreferrer" : undefined}
                className="latest-news-card__button"
              >
                <span>{post.cta?.label || "See More"}</span>
                <NewsArrow />
              </Link>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
