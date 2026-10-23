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
  "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1600!2d54.6330314!3d24.3607139!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5e37d95555aaab%3A0x7ed3e7b1b6e679e6!2sSharjah%20American%20International%20School!5e1!3m2!1sen!2sae!4v1792407647768!5m2!1sen!2sae";

/** The map link from Sanity: either the embed link itself or the whole <iframe> code from Google Maps. */
function mapEmbedSrc(value?: string) {
  const src = value?.match(/src=["']([^"']+)["']/)?.[1] || value?.trim();
  return src?.startsWith("https://www.google.com/maps/embed") ? src.replace(/&amp;/g, "&") : MAP_EMBED_SRC;
}

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
            src={mapEmbedSrc(contactPage?.mapEmbedUrl)}
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
