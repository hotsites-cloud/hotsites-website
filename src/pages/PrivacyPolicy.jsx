import { useTranslation } from 'react-i18next';
import { SEO } from '../components/seo/SEO';
import { AnimatedSection } from '../components/ui/AnimatedSection';
import { LegalSections } from '../components/legal/LegalSections';

export default function PrivacyPolicy() {
  const { t } = useTranslation();
  const company = t('common.companyName');
  const rawSections = t('legal.privacy.sections', { returnObjects: true });
  const sections = Array.isArray(rawSections)
    ? rawSections.map((s) => ({
        ...s,
        body: s.body.replaceAll('{{company}}', company),
      }))
    : [];

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: t('seo.privacy.title'),
  };

  return (
    <>
      <SEO
        title={t('seo.privacy.title')}
        description={t('seo.privacy.description')}
        canonical="/privacy"
        structuredData={structuredData}
      />
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <AnimatedSection>
          <h1 className="text-3xl font-bold tracking-tight text-brand-strong sm:text-4xl">
            {t('legal.privacy.h1')}
          </h1>
          <p className="mt-6 text-brand-muted">
            {t('legal.privacy.intro', { company })}
          </p>
        </AnimatedSection>
        <AnimatedSection className="mt-10">
          <LegalSections sections={sections} />
        </AnimatedSection>
      </div>
    </>
  );
}
