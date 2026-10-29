import { notFound } from "next/navigation";
import { profile } from "@/data/profile";
import { getProjects } from "@/lib/projects";
import { dirOf, isLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { Experience } from "@/components/Experience";
import { Certifications } from "@/components/Certifications";
import { Education } from "@/components/Education";
import { CvSection } from "@/components/CvSection";
import { Contact } from "@/components/Contact";

export const dynamicParams = false;
export const generateStaticParams = () => locales.map((lang) => ({ lang }));

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang);
  const rtl = dirOf(lang) === "rtl";
  const projects = getProjects(t);
  return (
    <>
      <a href="#projets" className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-fg focus:px-3 focus:py-2 focus:text-bg">{t.a11y.skip}</a>
      <Header name={profile.name} lang={lang} nav={t.nav} a11y={t.a11y} />
      <main>
        <Hero t={t.hero} lang={lang} projects={projects} />
        <About t={t.about} lang={lang} />
        <Projects projects={projects} t={t.projects} lightbox={t.lightbox} rtl={rtl} />
        <Skills t={t.skills} />
        <Experience t={t.experience} />
        <Certifications t={t.certifications} lightbox={t.lightbox} rtl={rtl} />
        <Education t={t.education} />
        <CvSection t={t.cv} lang={lang} />
        <Contact t={t.contact} status={t.hero.status} />
      </main>
      <footer className="border-t border-line">
        <div className="wrap flex flex-wrap items-center justify-between gap-4 py-8 text-sm text-fg3">
          <p>© {new Date().getFullYear()} <bdi>{profile.name}</bdi>. {t.footer.rights}</p>
          <p className="flex gap-5">
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="link">{t.contact.github}</a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="link">{t.contact.linkedin}</a>
          </p>
        </div>
      </footer>
    </>
  );
}
