import { DesktopKnowledgePlanet } from "@/components/DesktopKnowledgePlanet";
import { RichText } from "@/components/RichText";
import type { PlanetTag } from "@/lib/planetTags";

type HeroProps = {
  locale: "zh" | "en";
  hero: {
    eyebrow: string;
    titleLines: readonly string[];
    titleAlt: string;
    lead: string;
    body: string;
    primary: string;
    secondary: string;
    tertiary: string;
    planetTitle: string;
    directionLabel: string;
    planetNote: string;
  };
  links: {
    resume: string;
  };
  tags: PlanetTag[];
};

export function Hero({ locale, hero, links, tags }: HeroProps) {
  return (
    <section className="hero-section" id="portfolio">
      <div className="hero-copy">
        <p className="eyebrow">{hero.eyebrow}</p>
        <h1 className={locale === "en" ? "hero-title-en" : undefined}>
          <span className="hero-title-main">
            {hero.titleLines.map((line) => (
              <span className="hero-title-line" key={line}>
                {line}
              </span>
            ))}
          </span>
          <span className="hero-title-alt">{hero.titleAlt}</span>
        </h1>
        <p className="hero-lead">
          <RichText text={hero.lead} />
        </p>
        <p className="hero-body">
          <RichText text={hero.body} />
        </p>
        <div className="action-row">
          <a className="dark-button hero-primary-button" href="#projects">
            {hero.primary}
          </a>
          <a className="soft-button" href={links.resume}>
            {hero.secondary}
          </a>
          <a className="soft-button" href="#contact">
            {hero.tertiary}
          </a>
        </div>
      </div>

      <div className="planet-window">
        <div className="window-bar">
          <strong>{hero.planetTitle}</strong>
        </div>
        <DesktopKnowledgePlanet tags={tags} />
        <aside className="direction-note">
          <strong>{hero.directionLabel}</strong>
          <p>{hero.planetNote}</p>
        </aside>
      </div>
    </section>
  );
}
