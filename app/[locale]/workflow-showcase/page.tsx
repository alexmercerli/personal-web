import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { WorkflowShowcaseExperience } from "@/components/WorkflowShowcaseExperience";
import { content, type Locale } from "@/lib/content";
import { workflowShowcase } from "@/lib/workflowShowcase";

const locales: Locale[] = ["zh", "en"];

type PageProps = {
  params: Promise<{ locale: string }>;
};

function resolveLocale(locale: string): Locale {
  return locales.includes(locale as Locale) ? (locale as Locale) : "zh";
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const lang = resolveLocale(locale);

  return {
    title:
      lang === "zh"
        ? "Industrial AI Multi-Agent Workflow Showcase｜李奕成 Mercer"
        : "Industrial AI Multi-Agent Workflow Showcase | Yicheng Li / Mercer",
    description: workflowShowcase[lang].lead,
    alternates: {
      canonical: `/${lang}/workflow-showcase`,
      languages: {
        zh: "/zh/workflow-showcase",
        en: "/en/workflow-showcase"
      }
    }
  };
}

export default async function WorkflowShowcasePage({ params }: PageProps) {
  const { locale } = await params;
  const lang = resolveLocale(locale);
  const t = content[lang];
  const nextLocale = lang === "zh" ? "en" : "zh";

  return (
    <>
      <Header
        locale={lang}
        brand={t.brand}
        nav={t.nav}
        links={t.links}
        localeHref={`/${nextLocale}/workflow-showcase`}
        navPrefix={`/${lang}`}
      />
      <main className="workflow-main">
        <WorkflowShowcaseExperience content={workflowShowcase[lang]} />
      </main>
    </>
  );
}
