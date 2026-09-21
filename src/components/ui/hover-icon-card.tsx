import Image from "next/image";
import Link from "next/link";
import type { ComponentType, ReactNode } from "react";
import type { SanityImage } from "@/types/sanity";

type IconProps = {
  size?: number;
  strokeWidth?: number;
};

type HoverIconCardProps = {
  icon?: SanityImage;
  fallbackIcon?: ComponentType<IconProps>;
  title?: ReactNode;
  description?: ReactNode;
  href?: string;
  className?: string;
  iconSizes?: string;
};

function HoverIconCardContent({
  icon,
  fallbackIcon: FallbackIcon,
  title,
  description,
  iconSizes = "96px",
}: Omit<HoverIconCardProps, "href" | "className">) {
  return (
    <>
      {icon?.url || FallbackIcon ? (
        <span className="hover-icon-card__icon" aria-hidden="true">
          {icon?.url ? (
            <Image
              src={icon.url}
              alt={icon.alt || ""}
              fill
              sizes={iconSizes}
              className="hover-icon-card__icon-image"
            />
          ) : FallbackIcon ? (
            <FallbackIcon size={72} strokeWidth={1.75} />
          ) : null}
        </span>
      ) : null}
      {title ? <span className="hover-icon-card__title">{title}</span> : null}
      {description ? <span className="hover-icon-card__description">{description}</span> : null}
    </>
  );
}

export function HoverIconCard({ href, className = "", ...contentProps }: HoverIconCardProps) {
  const classes = `hover-icon-card ${className}`.trim();

  if (href) {
    const isExternal = href.startsWith("http");

    return (
      <Link
        href={href}
        className={classes}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
      >
        <HoverIconCardContent {...contentProps} />
      </Link>
    );
  }

  return (
    <article className={classes}>
      <HoverIconCardContent {...contentProps} />
    </article>
  );
}
