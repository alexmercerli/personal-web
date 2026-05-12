import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { BeyondWork } from "@/components/BeyondWork";
import { ProjectCard } from "@/components/ProjectCard";
import { SectionHeading } from "@/components/SectionHeading";
import { content, type Locale } from "@/lib/content";
import { planetTags } from "@/lib/planetTags";
import type { Metadata } from "next";

const locales: Locale[] = ["zh", "en"];

function resolveLocale(locale: string): Locale {
  return locales.includes(locale as Locale) ? (locale as Locale) : "zh";
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const lang = resolveLocale(locale);
  const t = content[lang];

  return {
    title: lang === "zh" ? "李奕成 Mercer｜工业 AI 作品集" : "Yicheng Li / Mercer — Industrial AI Portfolio",
    description: t.hero.lead,
    alternates: {
      canonical: `/${lang}`,
      languages: {
        zh: "/zh",
        en: "/en"
      }
    }
  };
}

export default async function LocalePage({ params }: PageProps) {
  const { locale } = await params;
  const lang = resolveLocale(locale);
  const t = content[lang];

  return (
    <>
      <Header locale={lang} brand={t.brand} nav={t.nav} links={t.links} />
      <main>
        <Hero hero={t.hero} links={t.links} tags={planetTags} />

        <section className="studio-section identity-section" id="about">
          <SectionHeading title={t.about.title} eyebrow={t.sectionEyebrows.about} />
          <div>
            <p>{t.about.text}</p>
            <div className="tag-row">
              {t.about.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </div>
        </section>

        <BeyondWork content={t.beyondWork} />

        <section className="split-section">
          <article className="studio-section" id="ground">
            <SectionHeading title={t.ground.title} eyebrow={t.sectionEyebrows.ground} />
            <p>{t.ground.text}</p>
            <ul className="check-list">
              {t.ground.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article className="studio-section" id="data">
            <SectionHeading title={t.data.title} eyebrow={t.sectionEyebrows.data} />
            <p>{t.data.text}</p>
            <ul className="check-list">
              {t.data.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </section>

        <section className="studio-section" id="projects">
          <SectionHeading title={t.projectsTitle} eyebrow={t.sectionEyebrows.projects} />
          <div className="projects-grid">
            {t.projects.map((project, index) => (
              <ProjectCard key={project.title} project={project} index={index} labels={t.projectLabels} />
            ))}
          </div>
        </section>

        <section className="lab-section" id="lab">
          <article className="studio-section lab-copy">
            <SectionHeading title={t.lab.title} eyebrow={t.sectionEyebrows.lab} />
            <p>{t.lab.text}</p>
            <div className="tag-row">
              {t.lab.items.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </article>

          <article className="studio-section" id="capability">
            <SectionHeading title={t.capabilityTitle} eyebrow={t.sectionEyebrows.capability} />
            <div className="capability-board">
              {t.capabilities.map(([title, body]) => (
                <section key={title}>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </section>
              ))}
            </div>
          </article>
        </section>

        <section className="studio-section education-section">
          <SectionHeading title={t.educationTitle} eyebrow={t.sectionEyebrows.education} />
          <div className="timeline">
            {t.education.map(([school, detail]) => (
              <article key={school}>
                <h3>{school}</h3>
                <p>{detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="studio-section career-section">
          <SectionHeading title={t.career.title} eyebrow={t.sectionEyebrows.career} />
          <p>{t.career.text}</p>
          <div className="tag-row center">
            {t.career.roles.map((role) => (
              <span key={role}>{role}</span>
            ))}
          </div>
        </section>

        <section className="studio-section contact-section" id="contact">
          <SectionHeading title={t.contact.title} eyebrow={t.sectionEyebrows.contact} />
          <p>{t.contact.text}</p>
          <div className="action-row center">
            <a className="dark-button" href={t.links.resume}>
              {t.contact.buttons[0]}
            </a>
            <a className="soft-button" href={t.links.email}>
              {t.contact.buttons[1]}
            </a>
            <a className="soft-button" href={t.links.linkedin}>
              {t.contact.buttons[2]}
            </a>
            <a className="soft-button" href={t.links.github}>
              {t.contact.buttons[3]}
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
