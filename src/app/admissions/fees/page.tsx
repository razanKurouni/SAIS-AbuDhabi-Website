import type { Metadata } from "next";
import { SitePageShell } from "@/components/layout/site-page-shell";
import { AdmissionsFeeStructureSection } from "@/components/sections/admissions-fee-structure-section";
import { AdmissionsFeesJourneySection } from "@/components/sections/admissions-fees-journey-section";
import { AdmissionsFeeTermsSection } from "@/components/sections/admissions-fee-terms-section";
import { InnerPageNav, type InnerPageNavItem } from "@/components/sections/inner-page-nav";
import { PageHero } from "@/components/sections/page-hero";
import { getAdmissionsFeesPage, getHomepage } from "@/lib/sanity";
import styles from "../admissions.module.css";

const fallbackMetadata: Metadata = {
  title: "Admissions Fees | SAIS - Abu Dhabi",
  description: "Learn about tuition fees and discount policies at SAIS - Abu Dhabi.",
};

export async function generateMetadata(): Promise<Metadata> {
  const page = await getAdmissionsFeesPage();

  return {
    title: page?.seo?.title || fallbackMetadata.title,
    description: page?.seo?.description || fallbackMetadata.description,
  };
}

export const dynamic = "force-dynamic";

export default async function AdmissionsFeesPage() {
  const [data, page] = await Promise.all([getHomepage(), getAdmissionsFeesPage()]);
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
      mainClassName={`site-page__main admissions-fees-page__main ${styles.pageMain}`}
      pageClassName="admissions-fees-page"
    >
      <PageHero
        className="admissions-fees-hero"
        title={hero?.heading?.title || ""}
        image={hero?.image}
        titleId="admissions-fees-hero-title"
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

      <AdmissionsFeesJourneySection section={page?.journeySection} />

      <AdmissionsFeeStructureSection section={page?.feeStructure} />
      <AdmissionsFeeTermsSection section={page?.termsSection} />
    </SitePageShell>
  );
}
