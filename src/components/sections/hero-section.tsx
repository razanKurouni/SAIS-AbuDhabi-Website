import { CmsImage } from "@/components/ui/cms-image";
import { RichText } from "@/components/ui/rich-text";
import { CtaList } from "@/components/ui/cta-list";
import type { HomepageData } from "@/types/sanity";

type HeroSectionProps = {
  hero: NonNullable<HomepageData["hero"]>;
};

export function HeroSection({ hero }: HeroSectionProps) {
  return (
    <section id="home" className="relative min-h-[620px] overflow-hidden md:min-h-[92vh]">
      <CmsImage
        image={hero.image}
        priority
        fallbackLabel="Hero main banner"
        className="absolute inset-0 h-full w-full"
        imageClassName="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#08395d]/75 via-[#0d5b78]/45 to-transparent" />
      <div className="relative z-10 mx-auto flex min-h-[620px] max-w-6xl flex-col justify-center px-4 pb-12 pt-28 md:min-h-[92vh] md:px-8">
        <div
          className="max-w-lg rounded-br-[90px] px-7 py-9 text-white shadow-2xl"
          style={{ backgroundColor: "rgba(var(--sais-primary-rgb), 0.95)" }}
        >
          {hero.subtitle && <p className="mb-3 text-sm font-semibold text-white/80">{hero.subtitle}</p>}
          <h1 className="text-3xl font-semibold leading-tight md:text-5xl">{hero.heading}</h1>
          <RichText blocks={hero.description} className="mt-5 space-y-3 text-sm leading-7 text-white/90" />
          <CtaList ctas={hero.ctas} />
        </div>
        {hero.valueBar && hero.valueBar.length > 0 && (
          <div className="mt-10 grid rounded-2xl border border-white/35 bg-[#0b4468]/55 p-3 text-center text-[0.68rem] font-bold uppercase tracking-[0.16em] text-white backdrop-blur sm:grid-cols-2 lg:grid-cols-5">
            {hero.valueBar.map((item) => (
              <span key={item} className="px-2 py-2">
                {item}
              </span>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
