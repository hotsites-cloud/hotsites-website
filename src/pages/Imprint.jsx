import { useTranslation } from 'react-i18next';
import { SEO } from '../components/seo/SEO';
import { AnimatedSection } from '../components/ui/AnimatedSection';

export default function Imprint() {
  const { t } = useTranslation();

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: t('seo.imprint.title'),
  };

  const lines = [
    'legal.imprint.tradeName',
    'legal.imprint.legalName',
    'legal.imprint.company',
    'legal.imprint.legalForm',
    'legal.imprint.kvk',
    'legal.imprint.vat',
    'legal.imprint.address',
    'legal.imprint.email',
    'legal.imprint.phone',
    'legal.imprint.representative',
  ];

  return (
    <>
      <SEO
        title={t('seo.imprint.title')}
        description={t('seo.imprint.description')}
        canonical="/imprint"
        structuredData={structuredData}
      />
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <AnimatedSection>
          <h1 className="text-3xl font-bold tracking-tight text-brand-strong sm:text-4xl">
            {t('legal.imprint.h1')}
          </h1>
          <ul className="mt-8 space-y-3 text-brand-muted">
            {lines.map((key) => (
              <li key={key}>{t(key)}</li>
            ))}
          </ul>
        </AnimatedSection>
      </div>
    </>
  );
}
