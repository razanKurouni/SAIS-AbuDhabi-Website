import Image from "next/image";
import type { CSSProperties } from "react";
import type { LogoItem } from "@/types/sanity";

type AccreditationsLogoRailProps = {
  logos?: LogoItem[];
};

export function AccreditationsLogoRail({ logos = [] }: AccreditationsLogoRailProps) {
  /* Three logos or fewer sit still; past that the rail scrolls. */
  const shouldSlide = logos.length > 3;
  const logoGroups = shouldSlide ? [0, 1] : [0];
  const railStyle = {
    "--accreditations-scroll-duration": `${Math.max(18, logos.length * 4.2)}s`,
  } as CSSProperties;

  if (logos.length === 0) {
    return null;
  }

  return (
    <div className={`accreditations-rail ${shouldSlide ? "is-slider" : ""}`}>
      <div
        className="accreditations-rail__track"
        style={railStyle}
      >
        {logoGroups.map((groupIndex) => (
          <div className="accreditations-rail__group" key={`accreditations-group-${groupIndex}`}>
            {logos.map((logo, index) => (
              <div
                className="accreditations-rail__item"
                key={`${logo.name}-${groupIndex}-${index}`}
                aria-hidden={groupIndex > 0}
              >
                {logo.image?.url ? (
                  <Image
                    src={logo.image.url}
                    alt={groupIndex > 0 ? "" : logo.image.alt || logo.name}
                    width={300}
                    height={170}
                    className="accreditations-rail__image"
                    sizes="(max-width: 767px) 46vw, 240px"
                  />
                ) : (
                  <span className="accreditations-rail__fallback">{logo.name}</span>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
