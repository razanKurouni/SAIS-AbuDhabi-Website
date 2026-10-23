import { Instagram } from "lucide-react";
import { CmsImage } from "@/components/ui/cms-image";
import { Reveal } from "@/components/ui/reveal";
import { FacebookBrandIcon, LinkedinBrandIcon } from "@/components/ui/social-icons";
import type { InstagramPost } from "@/lib/instagram";
import type { HomepageData } from "@/types/sanity";

type SocialSectionProps = {
  section?: HomepageData["instagram"];
  posts?: InstagramPost[];
};

// Abu Dhabi only has a Facebook page so far; the other icons stay, without a link, until its accounts exist.
const socialPlatforms = [
  {
    label: "Instagram",
    href: "",
    Icon: Instagram,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/12Saisabudhabi",
    Icon: FacebookBrandIcon,
  },
  {
    label: "LinkedIn",
    href: "",
    Icon: LinkedinBrandIcon,
  },
];

export function SocialSection({ section, posts = [] }: SocialSectionProps) {
  if (!section) {
    return null;
  }

  const links = socialPlatforms.map(({ label, href, Icon }) => {
    const configuredLink = section.socialLinks?.find(
      (link) => link.label?.toLowerCase() === label.toLowerCase(),
    );
    const resolvedHref = configuredLink?.href && !configuredLink.href.startsWith("#")
      ? configuredLink.href
      : href;

    return { label, href: resolvedHref, Icon };
  });
  // The photos open the first account that has a page.
  const feedLink = links.find((link) => link.href);

  return (
    <section className="social-feed" aria-labelledby="social-feed-title">
      <div className="social-feed__inner">
        <div className="social-feed__top">
          <h2 id="social-feed-title" className="social-feed__title">
            {section.heading?.title || "Follow Us"}
          </h2>

          <div className="social-feed__links" aria-label="Social media links">
            {links.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href || undefined}
                target={href ? "_blank" : undefined}
                rel={href ? "noreferrer" : undefined}
                aria-label={label}
                className="social-feed__link"
              >
                <Icon aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>

        <div className="social-feed__grid">
          {(posts.length
            ? posts.map((post, index) => ({
                image: { url: post.mediaUrl, alt: post.caption || "SAIS - Abu Dhabi Instagram post" },
                href: post.permalink,
                label: `Open Instagram post ${index + 1}`,
                key: post.id,
              }))
            : (section.images || []).slice(0, 4).map((image, index) => ({
                image,
                href: feedLink?.href,
                label: feedLink ? `Open SAIS - Abu Dhabi on ${feedLink.label}` : undefined,
                key: `${image.url || "social"}-${index}`,
              })))
            .map((item, index) => (
            <Reveal
              key={item.key}
              className="social-feed__item"
              delay={index * 80}
              threshold={0.2}
            >
              <a
                href={item.href || undefined}
                target={item.href ? "_blank" : undefined}
                rel={item.href ? "noreferrer" : undefined}
                aria-label={item.label}
              >
                <CmsImage
                  image={item.image}
                  fallbackLabel={`Social image ${index + 1}`}
                  className="social-feed__image-wrap"
                  imageClassName="social-feed__image"
                  sizes="(max-width: 767px) 88vw, (max-width: 1024px) 42vw, 270px"
                />
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
