import Link from "next/link";
import type { Locale } from "@/lib/content";

type HeaderProps = {
  locale: Locale;
  brand: {
    name: string;
    subtitle: string;
  };
  nav: {
    portfolio: string;
    about: string;
    ground: string;
    data: string;
    projects: string;
    lab: string;
    capability: string;
    contact: string;
    resume: string;
  };
  links: {
    resume: string;
  };
};

export function Header({ locale, brand, nav, links }: HeaderProps) {
  const nextLocale = locale === "zh" ? "en" : "zh";

  return (
    <header className="site-header">
      <Link href={`/${locale}`} className="brand-block" aria-label="Home">
        <span className="brand-mark" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
        <span>
          <strong>{brand.name}</strong>
          <small>{brand.subtitle}</small>
        </span>
      </Link>

      <nav className="desktop-nav" aria-label="Main navigation">
        <a href="#about">{nav.about}</a>
        <a href="#ground">{nav.ground}</a>
        <a href="#data">{nav.data}</a>
        <a href="#projects">{nav.projects}</a>
        <a href="#lab">{nav.lab}</a>
        <a href="#portfolio">{nav.portfolio}</a>
        <a href="#contact">{nav.contact}</a>
      </nav>

      <div className="header-actions">
        <Link className="soft-button" href={`/${nextLocale}`}>
          {locale === "zh" ? "EN" : "中文"}
        </Link>
        <a className="dark-button" href={links.resume}>
          {nav.resume}
        </a>
      </div>
    </header>
  );
}
