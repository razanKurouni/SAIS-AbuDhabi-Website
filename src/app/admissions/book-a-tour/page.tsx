import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { Reveal } from "@/components/ui/reveal";
import { SitePageShell } from "@/components/layout/site-page-shell";
import { AdmissionsTourFormSection } from "@/components/sections/admissions-tour-form-section";
import { InnerPageNav, type InnerPageNavItem } from "@/components/sections/inner-page-nav";
import { IntroFeatureSection } from "@/components/sections/intro-feature-section";
import { PageHero } from "@/components/sections/page-hero";
import { getAdmissionsBookTourPage, getHomepage } from "@/lib/sanity";
import styles from "../admissions.module.css";

const fallbackMetadata: Metadata = {
  title: "Book a Tour | SAIS - Abu Dhabi",
  description: "Book a campus tour and experience SAIS - Abu Dhabi first-hand.",
};

export async function generateMetadata(): Promise<Metadata> {
  const page = await getAdmissionsBookTourPage();

  return {
    title: page?.seo?.title || fallbackMetadata.title,
    description: page?.seo?.description || fallbackMetadata.description,
  };
}

export const dynamic = "force-dynamic";

export default async function AdmissionsBookTourPage() {
  const [data, page] = await Promise.all([getHomepage(), getAdmissionsBookTourPage()]);
  const hero = page?.hero;
  const innerNavigation = page?.innerNavigation;
  const innerNavItems = (innerNavigation?.items || []).reduce<InnerPageNavItem[]>((items, item) => {
    if (item.label && item.href) {
      items.push({ label: item.label, href: item.href, openInNewTab: item.openInNewTab });
    }
    return items;
  }, []);

  return (
    <SitePageShell
      data={data}
      mainClassName={`site-page__main admissions-book-tour-page__main ${styles.pageMain}`}
      pageClassName="admissions-book-tour-page"
    >
      <PageHero
        className="admissions-book-tour-hero"
        title={hero?.heading?.title || ""}
        image={hero?.image}
        titleId="admissions-book-tour-hero-title"
        priority
        topLineColor={hero?.topLineColor}
        panelColor={hero?.panelColor}
        waveColor={hero?.waveColor}
        textColor={hero?.textColor}
        imagePosition={hero?.imagePosition}
        imageWidth={hero?.imageWidth}
      />

      <InnerPageNav
        items={innerNavItems}
        activeHref={innerNavigation?.activeHref}
        activeColor={innerNavigation?.activeColor}
        inactiveColor={innerNavigation?.inactiveColor}
        textColor={innerNavigation?.textColor}
        dividerColor={innerNavigation?.dividerColor}
        topLineColor={innerNavigation?.topLineColor}
        className={styles.stickyNav}
        ariaLabel={innerNavigation?.ariaLabel}
      />

      <section
        className="admissions-tour-band"
        aria-labelledby="admissions-tour-band-title"
        style={{ "--admissions-tour-band-bg": page?.introSection?.backgroundColor || "#00a5b2" } as CSSProperties}
      >
        {page?.introSection?.heading?.title || page?.introSection?.heading?.subtitle ? (
          <Reveal className="admissions-tour-band__header" threshold={0.16}>
            {page.introSection.heading?.title ? (
              <h2 id="admissions-tour-band-title" className="admissions-tour-band__title">
                {page.introSection.heading.title}
              </h2>
            ) : null}
            {page.introSection.heading?.subtitle ? (
              <p className="admissions-tour-band__subtitle">{page.introSection.heading.subtitle}</p>
            ) : null}
          </Reveal>
        ) : null}

        {page?.experienceSection ? (
          <IntroFeatureSection
            section={page.experienceSection}
            fallbackSection={page.experienceSection}
            className="admissions-tour-experience"
            titleId="admissions-tour-experience-title"
            panelColor={page.experienceSection.backgroundColor || "#27779D"}
            accentColor="#D97252"
            titleColor={page.experienceSection.titleColor || "#ffffff"}
            textColor={page.experienceSection.textColor || "#ffffff"}
            imagePosition={page.experienceSection.imagePosition || "center"}
          />
        ) : null}

        <AdmissionsTourFormSection section={page?.formSection} />
      </section>
    </SitePageShell>
  );
}
