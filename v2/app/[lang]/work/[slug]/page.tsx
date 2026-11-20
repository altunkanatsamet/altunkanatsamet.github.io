import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { dictionaries, getDictionary, isLocale, locales, person } from "@/content/site";

export function generateStaticParams() {
  return locales.flatMap((lang) => dictionaries[lang].projects.map((p) => ({ lang, slug: p.slug })));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/[lang]/work/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLocale(lang)) return {};
  const p = getDictionary(lang).projects.find((x) => x.slug === slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.summary,
    alternates: {
      canonical: `/${lang}/work/${slug}/`,
      languages: { tr: `/tr/work/${slug}/`, en: `/en/work/${slug}/`, "x-default": `/tr/work/${slug}/` },
    },
    openGraph: {
      type: "article",
      title: p.title,
      description: p.summary,
      url: `/${lang}/work/${slug}/`,
      images: [{ url: `/og/${lang}.png`, width: 1200, height: 630, alt: person.name }],
    },
    twitter: { card: "summary_large_image", title: p.title, description: p.summary, images: [`/og/${lang}.png`] },
  };
}

export default async function CaseStudy({ params }: PageProps<"/[lang]/work/[slug]">) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang);
  const i = t.projects.findIndex((x) => x.slug === slug);
  if (i === -1) notFound();
  const p = t.projects[i];
  const next = t.projects[(i + 1) % t.projects.length];

  return (
    <article className="wrap">
      <header className="case-top">
        <Link href={`/${lang}#work`} className="back">
          <ArrowLeft aria-hidden />
          {t.work.back}
        </Link>
        <p className="case-context mono enter">{p.context}</p>
        <h1 className="case-title enter e2">{p.title}</h1>
        <p className="case-summary enter e3">{p.summary}</p>
      </header>

      <dl className="case-meta">
        <div>
          <dt>{t.work.caseLabel.context}</dt>
          <dd>{p.context}</dd>
        </div>
        <div>
          <dt>{t.work.caseLabel.role}</dt>
          <dd>{p.role}</dd>
        </div>
        <div>
          <dt>{t.work.caseLabel.stack}</dt>
          <dd>{p.stack.join(", ")}</dd>
        </div>
      </dl>

      <section className="case-block">
        <h2>{t.work.whatIDid}</h2>
        <div>
          <ol className="case-points">
            {p.points.map((pt) => (
              <li key={pt}>{pt}</li>
            ))}
          </ol>
          {p.note && <p className="case-note">{p.note}</p>}
        </div>
      </section>

      {p.images?.length ? (
        <section className="case-block">
          <h2>{t.work.screens}</h2>
          <div className="screens">
            {p.images.map((img) => (
              <figure key={img.src}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img.src} alt={img.alt} loading="lazy" width={600} height={1298} />
                <figcaption>{img.alt}</figcaption>
              </figure>
            ))}
          </div>
        </section>
      ) : null}

      <Link href={`/${lang}/work/${next.slug}`} className="next-link">
        <span>
          <span className="muted">{t.work.next}</span>
          <strong>{next.title}</strong>
        </span>
        <ArrowUpRight aria-hidden />
      </Link>
    </article>
  );
}
