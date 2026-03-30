import { useTranslation } from 'react-i18next';
import { SEO } from '../components/seo/SEO';
import { AnimatedSection } from '../components/ui/AnimatedSection';
import { LegalSections } from '../components/legal/LegalSections';

export default function TermsConditions() {
  const { t } = useTranslation();
  const company = t('common.companyName');
  const rawSections = t('legal.terms.sections', { returnObjects: true });
  const sections = Array.isArray(rawSections)
    ? rawSections.map((s) => ({
        ...s,
        body: s.body.replaceAll('{{company}}', company),
      }))
    : [];

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: t('seo.terms.title'),
  };

  return (
    <>
      <SEO
        title={t('seo.terms.title')}
        description={t('seo.terms.description')}
        canonical="/terms"
        structuredData={structuredData}
      />
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <AnimatedSection>
          <h1 className="text-3xl font-bold tracking-tight text-brand-strong sm:text-4xl">
            {t('legal.terms.h1')}
          </h1>
        </AnimatedSection>
        <AnimatedSection className="mt-10">
          <LegalSections sections={sections} />
        </AnimatedSection>
      </div>
    </>
  );
}
