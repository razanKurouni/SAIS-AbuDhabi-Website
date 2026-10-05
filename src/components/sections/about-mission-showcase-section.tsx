import Image from "next/image";
import type { CSSProperties } from "react";
import { Reveal } from "@/components/ui/reveal";
import type { MissionShowcaseCard, MissionShowcaseSection } from "@/types/sanity";

type Props = { section?: MissionShowcaseSection };

const fallbackCards: MissionShowcaseCard[] = [
  {
    title: "Help",
    description: "Helping students achieve their personal goals, develop an individual purpose, and become college- and career-ready.",
    image: { url: "/images/about-mission/help.jpg", alt: "Teacher helping SAIS - Abu Dhabi students with their creative work" },
    color: "#287aa3",
  },
  {
    title: "Support",
    description: "Providing individualized support and removing barriers to learning, ensuring that every student has access to high-quality education and opportunities for growth and development.",
    image: { url: "/images/about-mission/support.jpg", alt: "Teacher supporting young SAIS - Abu Dhabi students in class" },
    color: "#00a5b2",
  },
  {
    title: "Promote",
    description: "Promoting character, critical thinking, communication, and creativity in a safe and socially enriching environment.",
    image: { url: "/images/about-mission/promote.jpg", alt: "SAIS - Abu Dhabi teacher celebrating learning with students" },
    color: "#7a7a7a",
  },
  {
    title: "Cultivate",
    description: "Cultivating well-being, leadership, and community service to prepare students for lifelong success.",
    image: { url: "/images/about-mission/cultivate.jpg", alt: "SAIS - Abu Dhabi student learning to play the violin" },
    color: "#df7150",
  },
];

export function AboutMissionShowcaseSection({ section }: Props) {
  const cards = fallbackCards.map((fallback, index) => ({ ...fallback, ...section?.cards?.[index] }));

  return (
    <section id="about-mission" className="about-mission-showcase" aria-labelledby="about-mission-title">
      <div className="about-mission-showcase__inner">
        <Reveal className="about-design-heading">
          <h2 id="about-mission-title">{section?.title || "Our Mission"}</h2>
          <span aria-hidden="true" />
        </Reveal>

        <div className="about-mission-showcase__layout">
          <Reveal className="about-mission-showcase__statement" threshold={0.12}>
            <Image src="/sais-tab-icon.png" alt="SAIS 1997" width={205} height={218} />
            <p>{section?.statement || "Our mission is to foster a culture of inclusion that recognizes and values the diversity of all students."}</p>
          </Reveal>

          <div className="about-mission-showcase__cards">
            {cards.map((card, index) => (
              <Reveal
                key={card._key || card.title || index}
                className="about-mission-card"
                delay={index * 70}
                threshold={0.1}
                style={{ "--mission-card-color": card.color || fallbackCards[index].color } as CSSProperties}
              >
                <div className="about-mission-card__media">
                  {card.image?.url ? (
                    <Image
                      src={card.image.url}
                      alt={card.image.alt || card.title || "SAIS - Abu Dhabi mission"}
                      fill
                      sizes="(max-width: 720px) 100vw, (max-width: 1024px) 50vw, 28vw"
                      style={{ objectPosition: card.imagePosition || "center" }}
                    />
                  ) : null}
                </div>
                <div className="about-mission-card__content">
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
