import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { SEO } from '../components/seo/SEO';
import { AnimatedSection } from '../components/ui/AnimatedSection';
import { PatternSection } from '../components/ui/PatternSection';
import { SITE_ORIGIN } from '../config/site';

function isSpecRow(value) {
  return (
    value !== null &&
    typeof value === 'object' &&
    typeof value.term === 'string' &&
    typeof value.detail === 'string'
  );
}

export default function Resellers() {
  const { t } = useTranslation();
  const specs = t('audience.resellers.specs', { returnObjects: true });
  const deliverables = t('audience.resellers.deliverables', { returnObjects: true });
  const specRows = Array.isArray(specs) ? specs.filter(isSpecRow) : [];

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
        title={t('seo.resellers.title')}
        description={t('seo.resellers.description')}
        canonical="/resellers"
        structuredData={structuredData}
      />

      <PatternSection className="border-t-0">
        <AnimatedSection className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-brand-muted">
            {t('audience.resellers.audienceLabel')}
          </p>
          <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-brand-strong sm:text-4xl md:text-5xl">
            {t('common.companyName')}
          </h1>
          <p className="mt-5 max-w-prose text-lg leading-relaxed text-brand md:text-xl">
            {t('audience.resellers.intro')}
          </p>
        </AnimatedSection>
      </PatternSection>

      <div className="mx-auto max-w-3xl space-y-14 px-4 py-16 sm:px-6 sm:py-20">
        <AnimatedSection>
          <h2 className="text-2xl font-semibold tracking-tight text-brand-strong md:text-3xl">
            {t('audience.resellers.whatTitle')}
          </h2>
          <p className="mt-4 max-w-prose leading-relaxed text-brand-muted">
            {t('audience.resellers.whatBody')}
          </p>
          <p className="mt-4 max-w-prose leading-relaxed text-brand-muted">
            {t('audience.resellers.whatBodySecond')}
          </p>
        </AnimatedSection>

        <AnimatedSection>
          <h2 className="text-2xl font-semibold tracking-tight text-brand-strong md:text-3xl">
            {t('audience.resellers.specsTitle')}
          </h2>
          {specRows.length > 0 ? (
            <dl className="mt-6 space-y-4 border-t border-border pt-6 text-brand-muted">
              {specRows.map((row) => (
                <Fragment key={row.term}>
                  <dt className="text-sm font-semibold uppercase tracking-wider text-brand-strong">
                    {row.term}
                  </dt>
                  <dd className="mt-1 leading-relaxed">{row.detail}</dd>
                </Fragment>
              ))}
            </dl>
          ) : null}
        </AnimatedSection>

        <AnimatedSection>
          <h2 className="text-2xl font-semibold tracking-tight text-brand-strong md:text-3xl">
            {t('audience.resellers.deliverTitle')}
          </h2>
          <p className="mt-4 max-w-prose leading-relaxed text-brand-muted">
            {t('audience.resellers.deliverLead')}
          </p>
          {Array.isArray(deliverables) ? (
            <ul className="mt-5 list-inside list-disc space-y-2 leading-relaxed text-brand-muted">
              {deliverables.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          ) : null}
        </AnimatedSection>

        <AnimatedSection>
          <h2 className="text-2xl font-semibold tracking-tight text-brand-strong md:text-3xl">
            {t('audience.resellers.maintenanceTitle')}
          </h2>
          <p className="mt-4 max-w-prose leading-relaxed text-brand-muted">
            {t('audience.resellers.maintenanceBody')}
          </p>
          <p className="mt-4 max-w-prose leading-relaxed text-brand-muted">
            {t('audience.resellers.maintenanceFootnote')}
          </p>
        </AnimatedSection>
      </div>
    </>
  );
}
