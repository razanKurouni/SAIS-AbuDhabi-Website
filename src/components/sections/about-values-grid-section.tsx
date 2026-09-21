import Image from "next/image";
import { Globe2, HeartHandshake, Lightbulb, Puzzle, ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import type { ValuesGridItem, ValuesGridSection } from "@/types/sanity";

type Props = { section?: ValuesGridSection };

const fallbackItems: ValuesGridItem[] = [
  { title: "Tolerance", icon: "tolerance" },
  { title: "Integrity", icon: "integrity" },
  { title: "Global Citizenship", icon: "globalCitizenship" },
  { title: "Equity", icon: "equity" },
  { title: "Innovation", icon: "innovation" },
];

const icons = {
  tolerance: HeartHandshake,
  integrity: ShieldCheck,
  globalCitizenship: Globe2,
  equity: Puzzle,
  innovation: Lightbulb,
};

export function AboutValuesGridSection({ section }: Props) {
  const items = fallbackItems.map((fallback, index) => ({ ...fallback, ...section?.items?.[index] }));

  return (
    <section id="about-values" className="about-values-grid" aria-labelledby="about-values-grid-title">
      <div className="about-values-grid__inner">
        <Reveal className="about-design-heading">
          <h2 id="about-values-grid-title">{section?.title || "Our Values"}</h2>
          <span aria-hidden="true" />
        </Reveal>

        <div className="about-values-grid__items">
          {items.map((item, index) => {
            const Icon = icons[item.icon || fallbackItems[index].icon || "tolerance"];
            return (
              <Reveal key={item._key || item.title || index} className="about-values-grid__item" delay={index * 65} threshold={0.12}>
                {item.iconImage?.url ? (
                  <Image
                    src={item.iconImage.url}
                    alt={item.iconImage.alt || `${item.title || "Value"} icon`}
                    width={112}
                    height={112}
                    className="about-values-grid__icon-image"
                  />
                ) : (
                  <Icon aria-hidden="true" strokeWidth={1.65} />
                )}
                <h3>{item.title}</h3>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
