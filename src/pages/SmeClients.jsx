import { useTranslation } from 'react-i18next';
import { SEO } from '../components/seo/SEO';
import { AnimatedSection } from '../components/ui/AnimatedSection';
import { PatternSection } from '../components/ui/PatternSection';
import { SITE_ORIGIN } from '../config/site';

export default function SmeClients() {
  const { t } = useTranslation();
  const includes = t('audience.sme.includes', { returnObjects: true });

  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: t('structuredData.organizationName'),
      description: t('structuredData.organizationDescription'),
      url: SITE_ORIGIN,
    },
  ];

  return (
    <>
      <SEO
        title={t('seo.sme.title')}
        description={t('seo.sme.description')}
        canonical="/mkb"
        structuredData={structuredData}
      />

      <PatternSection className="border-t-0">
        <AnimatedSection className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-brand-muted">
            {t('audience.sme.audienceLabel')}
          </p>
          <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-brand-strong sm:text-4xl md:text-5xl">
            {t('common.companyName')}
          </h1>
          <p className="mt-5 max-w-prose text-lg leading-relaxed text-brand md:text-xl">
            {t('audience.sme.intro')}
          </p>
        </AnimatedSection>
      </PatternSection>

      <div className="mx-auto max-w-3xl space-y-14 px-4 py-16 sm:px-6 sm:py-20">
        <AnimatedSection>
          <h2 className="text-2xl font-semibold tracking-tight text-brand-strong md:text-3xl">
            {t('audience.sme.whatTitle')}
          </h2>
          <p className="mt-4 max-w-prose leading-relaxed text-brand-muted">
            {t('audience.sme.whatBody')}
          </p>
        </AnimatedSection>

        <AnimatedSection>
          <h2 className="text-2xl font-semibold tracking-tight text-brand-strong md:text-3xl">
            {t('audience.sme.includesTitle')}
          </h2>
          {Array.isArray(includes) ? (
            <ul className="mt-5 list-inside list-disc space-y-2 leading-relaxed text-brand-muted">
              {includes.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          ) : null}
        </AnimatedSection>

        <AnimatedSection>
          <h2 className="text-2xl font-semibold tracking-tight text-brand-strong md:text-3xl">
            {t('audience.sme.noWordPressTitle')}
          </h2>
          <p className="mt-4 max-w-prose leading-relaxed text-brand-muted">
            {t('audience.sme.noWordPressBody')}
          </p>
        </AnimatedSection>
      </div>
    </>
  );
}
