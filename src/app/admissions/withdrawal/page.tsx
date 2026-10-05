import type { Metadata } from "next";
import { SitePageShell } from "@/components/layout/site-page-shell";
import { InnerPageNav, type InnerPageNavItem } from "@/components/sections/inner-page-nav";
import { EditorialSplitSection } from "@/components/sections/editorial-split-section";
import { PageHero } from "@/components/sections/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { getAdmissionsWithdrawalPage, getHomepage } from "@/lib/sanity";
import styles from "../admissions.module.css";

const fallbackMetadata: Metadata = {
  title: "Student Withdrawal Process | SAIS - Abu Dhabi",
  description: "Learn about the student withdrawal process at SAIS - Abu Dhabi.",
};

/** Wraps any phone number in the lead sentence so it can take the accent colour. */
function highlightPhone(text: string) {
  const parts = text.split(/(\+?\d[\d ]{6,}\d)/);
  return parts.map((part, index) =>
    /^\+?\d[\d ]{6,}\d$/.test(part) ? (
      <span key={index} className="admissions-withdrawal-page__phone">
        {part}
      </span>
    ) : (
      part
    )
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await getAdmissionsWithdrawalPage();

  return {
    title: page?.seo?.title || fallbackMetadata.title,
    description: page?.seo?.description || fallbackMetadata.description,
  };
}

export const dynamic = "force-dynamic";

export default async function AdmissionsWithdrawalPage() {
  const [data, page] = await Promise.all([getHomepage(), getAdmissionsWithdrawalPage()]);
  const hero = page?.hero;
  const innerNavigation = page?.innerNavigation;
  const intro = page?.intro;
  const innerNavItems = (innerNavigation?.items || []).reduce<InnerPageNavItem[]>((items, item) => {
    if (item.label && item.href) {
      items.push({ label: item.label, href: item.href, openInNewTab: item.openInNewTab });
    }
    return items;
  }, []);

  return (
    <SitePageShell
      data={data}
      mainClassName={`site-page__main admissions-withdrawal-page__main ${styles.pageMain}`}
      pageClassName="admissions-withdrawal-page"
    >
      <PageHero
        className="admissions-withdrawal-hero"
        title={hero?.heading?.title || ""}
        image={hero?.image}
        titleId="admissions-withdrawal-hero-title"
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

      {intro ? (
        <section id="withdrawal-policy" className="admissions-withdrawal-policy" aria-labelledby="withdrawal-intro-title">
          {intro.heading?.title ? (
            <Reveal threshold={0.16} className="admissions-withdrawal-policy__lead-wrap">
              <h2 id="withdrawal-intro-title" className="about-intro-section__lead admissions-withdrawal-policy__lead">
                {highlightPhone(intro.heading.title)}
              </h2>
            </Reveal>
          ) : null}

          <EditorialSplitSection
            id="withdrawal-policy-details"
            title="Withdrawal process"
            section={{ heading: { title: "", description: intro.body }, image: intro.image, imagePosition: "left" }}
            fallbackImage={{}}
            fallbackParagraphs={[]}
            className="academics-steam-section admissions-withdrawal-policy__split"
            preserveRichText
          />
        </section>
      ) : null}
    </SitePageShell>
  );
}
