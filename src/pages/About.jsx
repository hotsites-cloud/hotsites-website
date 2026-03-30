import { useTranslation } from 'react-i18next';
import { SEO } from '../components/seo/SEO';
import { AnimatedSection } from '../components/ui/AnimatedSection';
import { PatternSection } from '../components/ui/PatternSection';

export default function About() {
  const { t } = useTranslation();

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: t('seo.about.title'),
    description: t('seo.about.description'),
  };

  return (
    <>
      <SEO
        title={t('seo.about.title')}
        description={t('seo.about.description')}
        canonical="/about"
        structuredData={structuredData}
      />
      <PatternSection className="border-t-0">
        <AnimatedSection className="max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tight text-brand-strong sm:text-4xl md:text-5xl">
            {t('about.hero.title')}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-brand md:text-xl">
            {t('about.hero.lead')}
          </p>
        </AnimatedSection>
      </PatternSection>
      <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-16">
        <AnimatedSection>
          <p className="whitespace-pre-line leading-relaxed text-brand-muted">{t('about.body')}</p>
        </AnimatedSection>
      </div>
    </>
  );
}
