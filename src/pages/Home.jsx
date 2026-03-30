import { useTranslation } from 'react-i18next';
import {
  Lock,
  Gauge,
  Globe2,
  Building2,
  Wrench,
  Unlink,
} from 'lucide-react';
import { SEO } from '../components/seo/SEO';
import { CustomerJourney } from '../components/home/CustomerJourney';
import { ValueCard } from '../components/home/ValueCard';
import { AnimatedSection } from '../components/ui/AnimatedSection';
import { Card } from '../components/ui/Card';
import { PatternSection } from '../components/ui/PatternSection';
import { SITE_ORIGIN } from '../config/site';

const valueIcons = [Lock, Gauge, Globe2, Building2, Wrench, Unlink];

export default function Home() {
  const { t } = useTranslation();
  const values = t('home.values.items', { returnObjects: true });
  const steps = t('home.journey.steps', { returnObjects: true });
  const initialBullets = t('home.pricing.initialBullets', { returnObjects: true });
  const bullets = t('home.pricing.annualBullets', { returnObjects: true });

  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: t('structuredData.organizationName'),
      description: t('structuredData.organizationDescription'),
      url: SITE_ORIGIN,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: t('structuredData.organizationName'),
      url: SITE_ORIGIN,
      publisher: {
        '@type': 'Organization',
        name: t('structuredData.organizationName'),
      },
    },
  ];

  return (
    <>
      <SEO
        title={t('seo.home.title')}
        description={t('seo.home.description')}
        canonical="/"
        structuredData={structuredData}
      />

      <PatternSection className="border-t-0">
        <AnimatedSection className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-brand-muted">
            {t('common.companyName')}
          </p>
          <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-brand-strong sm:text-4xl md:text-5xl">
            {t('home.intro.title')}
          </h1>
          <p className="mt-5 max-w-prose text-lg leading-relaxed text-brand md:text-xl">
            {t('home.intro.lead')}
          </p>
        </AnimatedSection>
      </PatternSection>

      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <AnimatedSection>
          <h2 className="text-2xl font-semibold tracking-tight text-brand-strong md:text-3xl">
            {t('home.values.title')}
          </h2>
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:gap-6">
            {Array.isArray(values) &&
              values.map((item, index) => {
                const Icon = valueIcons[index] ?? Lock;
                return (
                  <li key={item.title}>
                    <ValueCard
                      title={item.title}
                      summary={item.summary ?? item.description}
                      detail={item.detail ?? ''}
                      readMoreLabel={t('common.readMore')}
                      readLessLabel={t('common.readLess')}
                      icon={Icon}
                    />
                  </li>
                );
              })}
          </ul>
        </AnimatedSection>

        <AnimatedSection className="mt-20">
          <CustomerJourney
            title={t('home.journey.title')}
            lead={t('home.journey.lead')}
            eyebrow={t('home.journey.eyebrow')}
            getStepLabel={(index) =>
              t('home.journey.stepLabel', {
                current: index + 1,
                total: Array.isArray(steps) ? steps.length : 0,
              })
            }
            steps={Array.isArray(steps) ? steps : []}
          />
        </AnimatedSection>
      </div>

      <PatternSection className="border-b-0">
        <AnimatedSection>
          <h2 className="text-2xl font-semibold tracking-tight text-brand-strong md:text-3xl">
            {t('home.pricing.title')}
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <Card>
              <h3 className="text-sm font-medium uppercase tracking-wider text-brand-muted">
                {t('home.pricing.initialLabel')}
              </h3>
              <p className="mt-3 text-2xl font-bold text-brand-strong md:text-3xl">
                {t('home.pricing.initialPrice')}
              </p>
              {Array.isArray(initialBullets) && initialBullets.length > 0 ? (
                <ul className="mt-5 list-inside list-disc space-y-2 text-sm leading-relaxed text-brand-muted">
                  {initialBullets.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              ) : null}
            </Card>
            <Card>
              <h3 className="text-sm font-medium uppercase tracking-wider text-brand-muted">
                {t('home.pricing.annualLabel')}
              </h3>
              <p className="mt-3 text-2xl font-bold text-brand-strong md:text-3xl">
                {t('home.pricing.annualPrice')}
              </p>
              {Array.isArray(bullets) ? (
                <ul className="mt-5 list-inside list-disc space-y-2 text-sm leading-relaxed text-brand-muted">
                  {bullets.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              ) : null}
            </Card>
          </div>
        </AnimatedSection>
      </PatternSection>
    </>
  );
}
