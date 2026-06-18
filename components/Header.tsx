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
  localeHref?: string;
  navPrefix?: string;
};

export function Header({ locale, brand, nav, links, localeHref, navPrefix = "" }: HeaderProps) {
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
        <a href={`${navPrefix}#about`}>{nav.about}</a>
        <a href={`${navPrefix}#ground`}>{nav.ground}</a>
        <a href={`${navPrefix}#projects`}>{nav.projects}</a>
        <a href={`${navPrefix}#lab`}>{nav.lab}</a>
        <a href={`${navPrefix}#contact`}>{nav.contact}</a>
      </nav>

      <div className="header-actions">
        <Link className="soft-button" href={localeHref ?? `/${nextLocale}`}>
          {locale === "zh" ? "EN" : "中文"}
        </Link>
        <a className="dark-button" href={links.resume}>
          {nav.resume}
        </a>
      </div>
    </header>
  );
}
