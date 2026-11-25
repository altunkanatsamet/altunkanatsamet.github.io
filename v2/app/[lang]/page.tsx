import { existsSync } from "node:fs";
import { join } from "node:path";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowDown, ArrowUpRight, Mail } from "lucide-react";
import HeroScene from "@/components/HeroScene";
import { Cover } from "@/components/Covers";
import CopyEmail from "@/components/CopyEmail";
import { GitHubIcon, LinkedInIcon } from "@/components/BrandIcons";
import ContactForm from "@/components/ContactForm";
import { getDictionary, isLocale, person } from "@/content/site";

// Sahne görseli public/hero/scene.webp olarak eklendiğinde otomatik görünür.
const SCENE = "/hero/scene.webp";
const hasScene = existsSync(join(process.cwd(), "public", SCENE));

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang);
  const sceneAlt =
    lang === "tr" ? "Gece mavisinde, tek penceresi yanan bir üniversite binası" : "A university building at blue hour with one lit window";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: person.name,
    url: `${person.site}/${lang}/`,
    image: `${person.site}/profil.jpg`,
    email: `mailto:${person.email}`,
    jobTitle: lang === "tr" ? "Yazılım Geliştirici" : "Software Developer",
    description: t.meta.description,
    address: { "@type": "PostalAddress", addressLocality: "Konya", addressCountry: "TR" },
    alumniOf: { "@type": "CollegeOrUniversity", name: "Selçuk Üniversitesi", url: "https://www.selcuk.edu.tr" },
    knowsAbout: t.skills.flatMap((g) => g.items),
    knowsLanguage: ["tr", "en"],
    sameAs: [person.github, person.linkedin],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <section className="hero">
        <div className="scene">
          {hasScene ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={SCENE} alt={sceneAlt} fetchPriority="high" width={2880} height={1234} />
          ) : (
            <HeroScene label={sceneAlt} />
          )}
        </div>

        <div className="wrap">
          <div className="hero-copy">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="hero-photo enter" src="/profil.jpg" alt={person.name} width={160} height={160} fetchPriority="high" />
            <p className="hero-role enter e2">{t.hero.role}</p>
            <h1 className="enter e2">{person.name}</h1>
            <p className="hero-tagline enter e3">{t.hero.tagline}</p>
            <p className="hero-sub enter e3">{t.hero.intro}</p>
            <div className="hero-actions enter e4">
              <a className="btn primary" href="#work">
                {t.hero.ctaWork}
                <ArrowDown aria-hidden />
              </a>
              <a className="btn secondary" href="#contact">
                <Mail aria-hidden />
                {t.hero.ctaContact}
              </a>
            </div>
          </div>

        </div>
      </section>

      <section id="work" className="section">
        <div className="wrap">
          <div className="section-head">
            <h2 className="section-title">{t.sections.work}</h2>
          </div>
          <div className="work">
            {t.projects.map((p) => (
              <Link key={p.slug} href={`/${lang}/work/${p.slug}`} className={`card card-${p.slug}`}>
                <Cover project={p} lang={lang} />
                <div className="card-copy">
                  <div className="card-top">
                    <p className="work-meta mono">{p.context}</p>
                    <ArrowUpRight className="go" aria-hidden />
                  </div>
                  <h3>{p.title}</h3>
                  <p className="card-summary">{p.summary}</p>
                  <p className="work-stack mono">{p.stack.join(" · ")}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="experience" className="section">
        <div className="wrap">
          <div className="section-head">
            <h2 className="section-title">{t.sections.experience}</h2>
          </div>
          <ol className="jobs">
            {t.jobs.map((j) => (
              <li key={j.period + j.role} className="job">
                <span className="job-period mono">{j.period}</span>
                <div>
                  <h3>{j.role}</h3>
                  <p className="job-org">
                    {j.org}, {j.place}
                  </p>
                </div>
                <ul>
                  {j.points.map((pt) => (
                    <li key={pt}>{pt}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="skills" className="section">
        <div className="wrap">
          <div className="section-head">
            <h2 className="section-title">{t.sections.skills}</h2>
          </div>
          <dl className="skills">
            {t.skills.map((g) => (
              <div key={g.group} className="skill-row">
                <dt>{g.group}</dt>
                <dd>{g.items.join(", ")}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section id="about" className="section">
        <div className="wrap">
          <div className="section-head">
            <h2 className="section-title">{t.sections.about}</h2>
          </div>
          <div className="about">
            <div className="about-text">
              {t.about.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <dl className="facts">
              <div>
                <dt>{t.about.locationTitle}</dt>
                <dd>{t.about.location}</dd>
              </div>
              <div>
                <dt>{t.about.educationTitle}</dt>
                <dd>{t.about.education}</dd>
              </div>
              <div>
                <dt>{t.about.languagesTitle}</dt>
                <dd>{t.about.languages}</dd>
              </div>
              <div>
                <dt>{t.about.interestsTitle}</dt>
                <dd>{t.about.interests.join(", ")}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section id="contact" className="section">
        <div className="wrap">
          <div className="contact">
            <div className="contact-left">
              <h2>{t.contact.heading}</h2>
              <p className="contact-sub">{t.contact.sub}</p>
              <p className="contact-or">{t.contact.or}</p>
              <a className="email" href={`mailto:${person.email}`}>
                {person.email}
              </a>
              <div className="contact-links">
                <CopyEmail email={person.email} copy={t.contact.copy} copied={t.contact.copied} />
                <a className="btn secondary" href={person.linkedin} target="_blank" rel="noopener">
                  <LinkedInIcon className="brand-icon" />
                  LinkedIn
                  <ArrowUpRight className="ext" aria-hidden />
                </a>
                <a className="btn secondary" href={person.github} target="_blank" rel="noopener">
                  <GitHubIcon className="brand-icon" />
                  GitHub
                  <ArrowUpRight className="ext" aria-hidden />
                </a>
              </div>
            </div>
            <ContactForm lang={lang} labels={t.contact.form} />
          </div>
        </div>
      </section>
    </>
  );
}
