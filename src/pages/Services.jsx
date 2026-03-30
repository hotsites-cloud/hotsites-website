import { useTranslation } from 'react-i18next';
import { SEO } from '../components/seo/SEO';
import { AnimatedSection } from '../components/ui/AnimatedSection';
import { Card } from '../components/ui/Card';
import { PatternSection } from '../components/ui/PatternSection';
import { SITE_ORIGIN } from '../config/site';

export default function Services() {
  const { t } = useTranslation();
  const items = t('services.items', { returnObjects: true });

  const serviceSchemas = Array.isArray(items)
    ? items.map((item) => ({
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: item.title,
        description: item.description,
        provider: {
          '@type': 'Organization',
          name: t('structuredData.organizationName'),
          url: SITE_ORIGIN,
        },
        areaServed: 'NL',
      }))
    : [];

  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: t('seo.services.title'),
    },
    ...serviceSchemas,
  ];

  return (
    <>
      <SEO
        title={t('seo.services.title')}
        description={t('seo.services.description')}
        canonical="/services"
        structuredData={structuredData}
      />
      <PatternSection className="border-t-0">
        <AnimatedSection className="max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tight text-brand-strong sm:text-4xl md:text-5xl">
            {t('services.hero.title')}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-brand md:text-xl">
            {t('services.hero.lead')}
          </p>
        </AnimatedSection>
      </PatternSection>
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
        <ul className="grid gap-5 sm:grid-cols-2 lg:gap-6">
          {Array.isArray(items) &&
            items.map((item) => (
              <li key={item.title}>
                <Card className="h-full">
                  <h2 className="text-lg font-semibold text-brand-strong">{item.title}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-brand-muted">{item.description}</p>
                </Card>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
}
