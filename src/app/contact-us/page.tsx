import type { Metadata } from "next";
import { SitePageShell } from "@/components/layout/site-page-shell";
import { ContactInfoSection } from "@/components/sections/contact-info-section";
import { HeroContactBand } from "@/components/sections/hero-contact-band";
import { InnerPageNav } from "@/components/sections/inner-page-nav";
import { PageHero } from "@/components/sections/page-hero";
import { SectionReveal } from "@/components/ui/section-reveal";
import { getContactPage, getHomepage } from "@/lib/sanity";

const fallbackMetadata: Metadata = {
  title: "Contact Us | SAIS - Abu Dhabi",
  description: "Contact Sharjah American International School.",
};

const fallbackHero = {
  title: "Contact Sharjah American International School",
  image: {
    url: "/about-hero-building.jpg",
    alt: "Sharjah American International School campus building",
  },
  imageWidth: "60%",
};

const contactInnerNavItems = [
  { label: "Latest News", href: "/news-events" },
  { label: "Contact Us", href: "/contact-us" },
  { label: "Careers", href: "/careers" },
];

const MAP_EMBED_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3394.7873680416133!2d55.5862808!3d25.5016975!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ef5fbd959cca1d1%3A0x8e14e4c7843736be!2sSAIS%20Umm%20Al%20Quwain!5e1!3m2!1sen!2sae!4v1790255839786!5m2!1sen!2sae";

export async function generateMetadata(): Promise<Metadata> {
  const contactPage = await getContactPage();

  return {
    title: contactPage?.seo?.title || fallbackMetadata.title,
    description: contactPage?.seo?.description || fallbackMetadata.description,
  };
}

export const dynamic = "force-dynamic";

export default async function ContactUsPage() {
  const [data, contactPage] = await Promise.all([getHomepage(), getContactPage()]);
  const contactHero = contactPage?.hero;
  const heroTitle = contactHero?.heading?.title || fallbackHero.title;
  const heroImage = contactHero?.image || fallbackHero.image;

  return (
    <SitePageShell
      data={data}
      mainClassName="site-page__main contact-page__main"
      pageClassName="contact-page"
    >
      <PageHero
        className="contact-hero"
        title={heroTitle}
        image={heroImage}
        titleId="contact-hero-title"
        priority
        topLineColor={contactHero?.topLineColor}
        panelColor={contactHero?.panelColor}
        waveColor={contactHero?.waveColor}
        textColor={contactHero?.textColor}
        imagePosition={contactHero?.imagePosition}
        imageWidth={contactHero?.imageWidth || fallbackHero.imageWidth}
      />

      <InnerPageNav
        className="news-contact-careers-inner-nav"
        items={contactInnerNavItems}
        activeHref="/contact-us"
        activeColor="var(--sais-accent)"
        inactiveColor="#707174"
        textColor="#ffffff"
        dividerColor="#ffffff"
        topLineColor="#ffffff"
        ariaLabel="Contact page navigation"
      />

      <ContactInfoSection section={contactPage?.contactInfo} />

      <HeroContactBand section={data?.heroContactBand} />

      <section className="contact-map" aria-label="Campus location map">
        <SectionReveal>
          <iframe
            src={MAP_EMBED_SRC}
            className="contact-map__iframe"
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            title="Sharjah American International School — Abu Dhabi Campus location"
          />
        </SectionReveal>
      </section>
    </SitePageShell>
  );
}
