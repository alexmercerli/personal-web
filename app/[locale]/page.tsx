import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { BeyondWork } from "@/components/BeyondWork";
import { ContactActions } from "@/components/ContactActions";
import { ProjectCard } from "@/components/ProjectCard";
import { RichText } from "@/components/RichText";
import { SectionHeading } from "@/components/SectionHeading";
import { content, type Locale } from "@/lib/content";
import { planetTags } from "@/lib/planetTags";
import type { Metadata } from "next";
import Image from "next/image";

const locales: Locale[] = ["zh", "en"];

const educationLogos = {
  清华大学: {
    src: "/images/logos/tsinghua-university.png",
    alt: "清华大学校徽"
  },
  "Tsinghua University": {
    src: "/images/logos/tsinghua-university.png",
    alt: "Tsinghua University logo"
  },
  深圳大学: {
    src: "/images/logos/shenzhen-university.svg",
    alt: "深圳大学校徽"
  },
  "Shenzhen University": {
    src: "/images/logos/shenzhen-university.svg",
    alt: "Shenzhen University logo"
  }
} as const;

function resolveLocale(locale: string): Locale {
  return locales.includes(locale as Locale) ? (locale as Locale) : "zh";
}

function splitEducationDetail(detail: string) {
  const parts = detail.split(/([；;])/);
  const segments: string[] = [];

  for (let index = 0; index < parts.length; index += 2) {
    const text = parts[index]?.trim();
    if (!text) continue;

    segments.push(`${text}${parts[index + 1] ?? ""}`);
  }

  return segments.length > 0 ? segments : [detail];
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
            <p>
              <RichText text={t.about.text} />
            </p>
            <div className="tag-row">
              {t.about.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </div>
        </section>

        <section className={`studio-section education-section education-section-${lang}`}>
          <SectionHeading title={t.educationTitle} eyebrow={t.sectionEyebrows.education} />
          <div className="timeline">
            {t.education.map(([school, detail]) => {
              const logo = educationLogos[school as keyof typeof educationLogos];

              return (
                <article className={logo ? "has-logo" : undefined} key={school}>
                  <div className="timeline-school">
                    <h3>{school}</h3>
                    {logo ? (
                      <Image className="school-logo" src={logo.src} alt={logo.alt} width={72} height={72} unoptimized />
                    ) : null}
                  </div>
                  <p className="education-detail">
                    {splitEducationDetail(detail).map((segment) => (
                      <span key={segment}>
                        <RichText text={segment} />
                      </span>
                    ))}
                  </p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="split-section">
          <article className="studio-section" id="ground">
            <SectionHeading title={t.ground.title} eyebrow={t.sectionEyebrows.ground} />
            <div className="organization-strip">
              <Image
                src="/images/logos/siemens-healthineers.png"
                alt="Siemens Healthineers logo"
                width={450}
                height={112}
                unoptimized
              />
              <span>西门子医疗</span>
            </div>
            <p>
              <RichText text={t.ground.text} />
            </p>
            <ul className="check-list">
              {t.ground.items.map((item) => (
                <li key={item}>
                  <RichText text={item} />
                </li>
              ))}
            </ul>
          </article>

          <article className="studio-section" id="data">
            <SectionHeading title={t.data.title} eyebrow={t.sectionEyebrows.data} />
            <p>
              <RichText text={t.data.text} />
            </p>
            <ul className="check-list">
              {t.data.items.map((item) => (
                <li key={item}>
                  <RichText text={item} />
                </li>
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
            <p>
              <RichText text={t.lab.text} />
            </p>
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
                  <p>
                    <RichText text={body} />
                  </p>
                </section>
              ))}
            </div>
          </article>
        </section>

        <BeyondWork content={t.beyondWork} />

        <section className="studio-section career-section">
          <SectionHeading title={t.career.title} eyebrow={t.sectionEyebrows.career} />
          <p>
            <RichText text={t.career.text} />
          </p>
          <div className="tag-row center">
            {t.career.roles.map((role) => (
              <span key={role}>{role}</span>
            ))}
          </div>
        </section>

        <section className="studio-section contact-section" id="contact">
          <SectionHeading title={t.contact.title} eyebrow={t.sectionEyebrows.contact} />
          <p>
            <RichText text={t.contact.text} />
          </p>
          <ContactActions labels={t.contact.buttons} links={t.links} dialog={t.contact.emailDialog} />
        </section>
      </main>
    </>
  );
}
