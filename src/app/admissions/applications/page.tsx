import type { Metadata } from "next";
import { SitePageShell } from "@/components/layout/site-page-shell";
import { IntroFeatureSection } from "@/components/sections/intro-feature-section";
import { ApplicationStepsSection } from "@/components/sections/application-steps-section";
import { AdmissionsRegistrationPopup } from "@/components/sections/admissions-registration-popup";
import { EditorialSplitSection } from "@/components/sections/editorial-split-section";
import { InnerPageNav, type InnerPageNavItem } from "@/components/sections/inner-page-nav";
import { MograHubAppBand } from "@/components/sections/mograhub-app-band";
import { PageHero } from "@/components/sections/page-hero";
import { getAdmissionsApplicationPage, getHomepage } from "@/lib/sanity";
import styles from "../admissions.module.css";

const fallbackMetadata: Metadata = {
  title: "Admissions Application | SAIS - UAQ",
  description: "Learn about the SAIS - UAQ application process and registration timelines.",
};

export async function generateMetadata(): Promise<Metadata> {
  const page = await getAdmissionsApplicationPage();

  return {
    title: page?.seo?.title || fallbackMetadata.title,
    description: page?.seo?.description || fallbackMetadata.description,
  };
}

export const dynamic = "force-dynamic";

export default async function AdmissionsApplicationPage() {
  const [data, page] = await Promise.all([getHomepage(), getAdmissionsApplicationPage()]);
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
      mainClassName={`site-page__main admissions-application-page__main ${styles.pageMain}`}
      pageClassName="admissions-application-page"
    >
      <PageHero
        className="admissions-application-hero"
        title={hero?.heading?.title || ""}
        image={hero?.image}
        titleId="admissions-application-hero-title"
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

      {page?.applicationProcess ? (
        <EditorialSplitSection
          id="admissions-application-process"
          title={page.applicationProcess.heading?.title || "Application Process"}
          section={{
            heading: page.applicationProcess.heading ?? { title: "Application Process" },
            image: page.applicationProcess.image,
            imagePosition: page.applicationProcess.imageSide === "left" ? "left" : "right",
          }}
          fallbackImage={page.applicationProcess.image || {}}
          fallbackParagraphs={[]}
          className="editorial-split-listed admissions-application-process"
          imageSizes="(max-width: 767px) calc(100vw - 32px), 42vw"
          showTitle
          preserveRichText
        />
      ) : null}

      {page?.timelinesSection ? (
        <IntroFeatureSection
          section={page.timelinesSection}
          fallbackSection={page.timelinesSection}
          className="admissions-application-requirements"
          titleId="admissions-application-requirements-title"
          panelColor="#00a5b2"
          accentColor="var(--sais-coral)"
          titleColor="#ffffff"
          textColor="#ffffff"
        />
      ) : null}

      {page?.stepsSection ? (
        <ApplicationStepsSection section={page.stepsSection} />
      ) : null}

      {page?.finalCta ? <AdmissionsRegistrationPopup section={page.finalCta} /> : null}

      <MograHubAppBand section={page?.mograHubAppBand} />
    </SitePageShell>
  );
}
