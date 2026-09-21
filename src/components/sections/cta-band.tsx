import { CtaLink } from "@/components/ui/cta-link";
import type { Cta, HomepageData } from "@/types/sanity";

type CtaBandProps = {
  section?: HomepageData["ctaBand"];
};

const fallback: { text: string; ctas: Cta[] } = {
  text: "For applications, school tours, or potential career opportunities, please don't hesitate to get in touch with our team.",
  ctas: [
    { label: "Book a Tour", href: "/contact-us", variant: "primary" },
    { label: "Apply Now",   href: "/contact-us", variant: "primary" },
    { label: "Careers",     href: "/careers",    variant: "primary" },
  ],
};

export function CtaBand({ section }: CtaBandProps) {
  const text = section?.text || fallback.text;
  const ctas = section?.ctas?.length ? section.ctas : fallback.ctas;

  return (
    <section className="cta-band rounded-lg px-6 py-8 text-center text-white">
      <p className="mx-auto max-w-2xl text-sm leading-7">{text}</p>
      <div className="mt-5 flex flex-wrap justify-center gap-3">
        {ctas.map((cta) => (
          <CtaLink key={`${cta.label}-${cta.href}`} cta={cta} />
        ))}
      </div>
    </section>
  );
}
