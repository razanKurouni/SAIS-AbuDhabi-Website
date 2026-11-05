import Image from "next/image";
import type { CSSProperties } from "react";
import { Reveal } from "@/components/ui/reveal";
import { blocksFromText } from "@/lib/content";
import type { AboutAccreditationsSection as AboutAccreditationsSectionData, AccreditationLogo } from "@/types/sanity";
import { RichText } from "@/components/ui/rich-text";

type AboutAccreditationsSectionProps = {
  section?: AboutAccreditationsSectionData;
};

const fallbackBody = [
  "Our school is proud to be supported by a distinguished network of internationally recognized accreditations, certifications, and educational partnerships that reflect our commitment to academic excellence, innovation, student wellbeing, and continuous professional growth.",
  "Through affiliations with respected organizations and platforms such as Cognia, College Board, NCDA, Pearson Education, Apple Teacher, STEM.org, Microsoft Certified Educator, ABRSM, and other leading educational providers, we ensure that our students benefit from high-quality learning opportunities, globally aligned standards, advanced academic pathways, and a future-focused educational experience.",
  "These partnerships strengthen our curriculum, enrich teaching and learning practices, and reinforce our mission to provide a well-rounded, internationally benchmarked education for every learner.",
];

const fallbackLogos: AccreditationLogo[] = [
  {
    name: "Cognia Accredited",
    image: {
      url: "https://cdn.sanity.io/images/zpdqig01/abudhabi/f17667e3b060f311677be7c754f81893370b93b3-248x248.png",
      alt: "Cognia Accredited badge",
    },
  },
  {
    name: "College Board AP / SAT",
    image: {
      url: "https://cdn.sanity.io/images/zpdqig01/abudhabi/fd96310c1e86730a37ded4e8bf4b1a06ab631c8a-284x140.png",
      alt: "College Board AP / SAT logo",
    },
  },
  {
    name: "Nearpod Certified Educator",
    image: {
      url: "https://cdn.sanity.io/images/zpdqig01/abudhabi/910ef5250e169565002b0d14dff96651cb39732a-216x216.png",
      alt: "Nearpod Certified Educator badge",
    },
  },
  {
    name: "IXL Learning",
    image: {
      url: "https://cdn.sanity.io/images/zpdqig01/abudhabi/f99f75efbcd04183f12f6002579171f462ae8454-284x144.png",
      alt: "IXL Learning logo",
    },
  },
  {
    name: "Safeguarding Initiative",
    image: {
      url: "https://cdn.sanity.io/images/zpdqig01/abudhabi/620ffd5f15fd31f0618d585666d243d981f99af6-284x281.png",
      alt: "Safeguarding Initiative during COVID-19 badge",
    },
  },
  {
    name: "Follett",
    image: {
      url: "https://cdn.sanity.io/images/zpdqig01/abudhabi/755faa06bec63dda789ce98f277691ff72b80b7b-284x82.png",
      alt: "Follett logo",
    },
  },
  {
    name: "Pearson Education",
    image: {
      url: "https://cdn.sanity.io/images/zpdqig01/abudhabi/4fd4f3da9b846c01eedbfddbcba3d9b0875d0089-248x146.png",
      alt: "Pearson Education logo",
    },
  },
  {
    name: "Iqraa",
    image: {
      url: "https://cdn.sanity.io/images/zpdqig01/abudhabi/d229b8b994f27e16836a8b537687ca1fe54bb4b4-248x248.png",
      alt: "Iqraa logo",
    },
  },
  {
    name: "SchoolsMaster",
    image: {
      url: "https://cdn.sanity.io/images/zpdqig01/abudhabi/32e30885b0881a1e0da89dd561beb6e777a10658-280x124.png",
      alt: "SchoolsMaster – Helping Students Find Their Purpose logo",
    },
  },
  {
    name: "ABRSM",
    image: {
      url: "https://cdn.sanity.io/images/zpdqig01/abudhabi/bdc43af789ab63e561d3c955865a69718462f632-275x280.png",
      alt: "ABRSM logo",
    },
  },
  {
    name: "Islamic Treasures",
    image: {
      url: "https://cdn.sanity.io/images/zpdqig01/abudhabi/d2923e8effc18448debb32f9cd28b7f232867a6b-248x248.png",
      alt: "Islamic Treasures logo",
    },
  },
  {
    name: "Alef Education",
    image: {
      url: "https://cdn.sanity.io/images/zpdqig01/abudhabi/a7df0c9eb7be5a80a72d45145c9742899a4ab05d-248x128.png",
      alt: "Alef Education logo",
    },
  },
  {
    name: "Savvas Realize",
    image: {
      url: "https://cdn.sanity.io/images/zpdqig01/abudhabi/626bf3e34977eb1e4619851c27a8c9221a924d0a-248x65.png",
      alt: "Savvas Realize logo",
    },
  },
  {
    name: "Raz-Kids",
    image: {
      url: "https://cdn.sanity.io/images/zpdqig01/abudhabi/0ff2fe332b583f3d317a231014722a3ecb976690-248x87.png",
      alt: "Raz-Kids logo",
    },
  },
  {
    name: "Anti-Bullying Alliance",
    image: {
      url: "https://cdn.sanity.io/images/zpdqig01/abudhabi/5a05e56c4786e9a591304034981aeb712cdabad4-284x49.png",
      alt: "Anti-Bullying Alliance logo",
    },
  },
  {
    name: "Microsoft Certified Educator",
    image: {
      url: "https://cdn.sanity.io/images/zpdqig01/abudhabi/cf08fc9951f7c7a7825687027995f7e9a4a2cad6-248x248.png",
      alt: "Microsoft Certified Educator badge",
    },
  },
  {
    name: "SAM Labs",
    image: {
      url: "https://cdn.sanity.io/images/zpdqig01/abudhabi/a775a60a8c478bee1ab59e20f4672037fb4aa5e9-284x180.png",
      alt: "SAM Labs logo",
    },
  },
  {
    name: "McGraw Hill",
    image: {
      url: "https://cdn.sanity.io/images/zpdqig01/abudhabi/b308e7e6ed4cdeb022ae47c1a03261d7e3ae1cfb-180x180.png",
      alt: "McGraw Hill logo",
    },
  },
  {
    name: "BravoBravo",
    image: {
      url: "https://cdn.sanity.io/images/zpdqig01/abudhabi/b060fdd5a148272ea3c644781e6ce2cd4ff1fffc-248x205.png",
      alt: "BravoBravo logo",
    },
  },
  {
    name: "STEM.org Certified Educational Instructor",
    image: {
      url: "https://cdn.sanity.io/images/zpdqig01/abudhabi/b5c0a56188f9ecb312242f53b9ed9c004e1d3bc4-212x212.png",
      alt: "STEM.org Certified Educational Instructor badge",
    },
  },
  {
    name: "PASCO",
    image: {
      url: "https://cdn.sanity.io/images/zpdqig01/abudhabi/7b661280bb98b78e0b51929b96be64d19ccb87a8-284x79.png",
      alt: "PASCO logo",
    },
  },
  {
    name: "PocketLab",
    image: {
      url: "https://cdn.sanity.io/images/zpdqig01/abudhabi/faf78bf45e3abf4f8ec9085a890cb5ddbc04f3fa-316x81.png",
      alt: "PocketLab – Science. Everywhere. logo",
    },
  },
  {
    name: "Edmentum",
    image: {
      url: "https://cdn.sanity.io/images/zpdqig01/abudhabi/1bbb2f17d839ace579e4f3858761ae44195c5f5f-284x43.png",
      alt: "Edmentum logo",
    },
  },
  {
    name: "National Career Development Association (NCDA)",
    image: {
      url: "https://cdn.sanity.io/images/zpdqig01/abudhabi/5fcdcc87f6eb078c42d05670f61553775c5972bc-320x51.png",
      alt: "NCDA – National Career Development Association logo",
    },
  },
  {
    name: "Achieve3000",
    image: {
      url: "https://cdn.sanity.io/images/zpdqig01/abudhabi/788cbbe752a290aa8f82e0d2acb1148ad9bc6b7c-284x100.png",
      alt: "Achieve3000 logo",
    },
  },
  {
    name: "Cengage",
    image: {
      url: "https://cdn.sanity.io/images/zpdqig01/abudhabi/cc804703a5bd293455f5639f40ca8f6f8bbbd34c-284x64.png",
      alt: "Cengage logo",
    },
  },
  {
    name: "Apple Teacher",
    image: {
      url: "https://cdn.sanity.io/images/zpdqig01/abudhabi/81dd0914dde389051ab9ae36c1ad1286b80e6da8-284x64.png",
      alt: "Apple Teacher logo",
    },
  },
];

export function AboutAccreditationsSection({ section }: AboutAccreditationsSectionProps) {
  const title = section?.heading?.title || "Accreditations";
  const body = section?.body?.length ? section.body : blocksFromText(fallbackBody.join("\n"));
  const paragraphs = body;
  const logos = section?.logos?.length ? section.logos : fallbackLogos;

  if (!title && paragraphs.length === 0 && logos.length === 0) {
    return null;
  }

  return (
    <section
      id="about-accreditations"
      className="about-accreditations"
      aria-labelledby="about-accreditations-title"
      style={
        {
          "--about-accreditations-bg": section?.backgroundColor || "#f3f3f3",
          "--about-accreditations-title": section?.titleColor || "#00a5b2",
          "--about-accreditations-line": section?.lineColor || "#216b97",
          "--about-accreditations-text": section?.textColor || "#6f7378",
        } as CSSProperties
      }
    >
      <div className="about-accreditations__inner">
        <Reveal threshold={0.16}>
          <h2 id="about-accreditations-title" className="about-accreditations__title">
            {title}
          </h2>
          <div className="about-accreditations__divider" />
        </Reveal>

        <div className="about-accreditations__layout">
          <Reveal className="about-accreditations__copy" threshold={0.14}>
            <RichText blocks={body} className="about-accreditations__copy-text" />
          </Reveal>

          <Reveal className="about-accreditations__logos" threshold={0.14}>
            {logos.map((logo, index) => (
              <div className="about-accreditations__logo-card" key={logo._key || `${logo.name}-${index}`}>
                {logo.image?.url ? (
                  <Image
                    src={logo.image.url}
                    alt={logo.image.alt || logo.name || "Accreditation logo"}
                    width={320}
                    height={140}
                    className="about-accreditations__logo"
                    sizes="(max-width: 767px) 66vw, 260px"
                    style={{ "--about-accreditations-logo-width": logo.width || undefined } as CSSProperties}
                  />
                ) : (
                  <span className="about-accreditations__logo-fallback">{logo.name}</span>
                )}
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
