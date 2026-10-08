import type { Metadata } from "next";
import { SitePageShell } from "@/components/layout/site-page-shell";
import { AdmissionsTourFormSection } from "@/components/sections/admissions-tour-form-section";
import { InnerPageNav, type InnerPageNavItem } from "@/components/sections/inner-page-nav";
import { PageHero } from "@/components/sections/page-hero";
import { getAdmissionsRegisterInterestPage, getHomepage } from "@/lib/sanity";
import styles from "../admissions.module.css";

const fallbackMetadata: Metadata = {
  title: "Register Your Interest | SAIS - Abu Dhabi",
  description: "Register your interest in joining SAIS - Abu Dhabi.",
};

export async function generateMetadata(): Promise<Metadata> {
  const page = await getAdmissionsRegisterInterestPage();

  return {
    title: page?.seo?.title || fallbackMetadata.title,
    description: page?.seo?.description || fallbackMetadata.description,
  };
}

export const dynamic = "force-dynamic";

export default async function AdmissionsRegisterInterestPage() {
  const [data, page] = await Promise.all([getHomepage(), getAdmissionsRegisterInterestPage()]);
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
      mainClassName={`site-page__main admissions-register-interest-page__main ${styles.pageMain}`}
      pageClassName="admissions-register-interest-page"
    >
      <PageHero
        className="admissions-register-interest-hero"
        title={hero?.heading?.title || ""}
        image={hero?.image}
        titleId="admissions-register-interest-hero-title"
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

      <AdmissionsTourFormSection section={page?.formSection} introSection={page?.introSection} source="register-interest" />
    </SitePageShell>
  );
}
