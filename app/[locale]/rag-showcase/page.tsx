import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { RagShowcaseExperience } from "@/components/RagShowcaseExperience";
import { content, type Locale } from "@/lib/content";
import { ragShowcase } from "@/lib/ragShowcase";

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
    title: lang === "zh" ? "RAG Document Intelligence Lab｜李奕成 Mercer" : "RAG Document Intelligence Lab | Yicheng Li / Mercer",
    description: ragShowcase[lang].lead,
    alternates: {
      canonical: `/${lang}/rag-showcase`,
      languages: {
        zh: "/zh/rag-showcase",
        en: "/en/rag-showcase"
      }
    }
  };
}

export default async function RagShowcasePage({ params }: PageProps) {
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
        localeHref={`/${nextLocale}/rag-showcase`}
        navPrefix={`/${lang}`}
      />
      <main className="rag-main">
        <Link className="rag-back-link" href={`/${lang}`}>
          {lang === "zh" ? "返回主页" : "Back to Home"}
        </Link>
        <RagShowcaseExperience content={ragShowcase[lang]} />
      </main>
    </>
  );
}
