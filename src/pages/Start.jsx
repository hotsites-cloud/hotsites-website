import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Building2, Users } from 'lucide-react';
import { SEO } from '../components/seo/SEO';
import { AnimatedSection } from '../components/ui/AnimatedSection';
import { Card } from '../components/ui/Card';
import { PatternSection } from '../components/ui/PatternSection';
import { SITE_ORIGIN } from '../config/site';

export default function Start() {
  const { t } = useTranslation();

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
        title={t('seo.start.title')}
        description={t('seo.start.description')}
        canonical="/"
        structuredData={structuredData}
      />

      <PatternSection className="border-t-0">
        <AnimatedSection className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-brand-muted">
            {t('common.companyName')}
          </p>
          <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-brand-strong sm:text-4xl md:text-5xl">
            {t('start.title')}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-brand md:text-xl">
            {t('start.lead')}
          </p>
        </AnimatedSection>
      </PatternSection>

      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <AnimatedSection>
          <p className="sr-only">{t('start.choiceLegend')}</p>
          <ul className="grid gap-6 md:grid-cols-2">
            <li>
              <Link to="/resellers" className="group block h-full outline-none">
                <Card
                  as="article"
                  className="h-full transition-shadow group-hover:border-brand-strong/30 group-hover:shadow-lg group-focus-visible:ring-2 group-focus-visible:ring-brand-strong group-focus-visible:ring-offset-2"
                >
                  <div className="flex items-start gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-strong/10 text-brand-strong">
                      <Building2 className="h-6 w-6" aria-hidden />
                    </span>
                    <div className="min-w-0 text-left">
                      <h2 className="text-xl font-semibold tracking-tight text-brand-strong">
                        {t('start.resellers.title')}
                      </h2>
                      <p className="mt-2 text-sm text-brand-muted">
                        {t('start.resellers.description')}
                      </p>
                      <span className="mt-4 inline-block text-sm font-medium text-brand-strong underline-offset-4 group-hover:underline">
                        {t('start.resellers.cta')}
                      </span>
                    </div>
                  </div>
                </Card>
              </Link>
            </li>
            <li>
              <Link to="/mkb" className="group block h-full outline-none">
                <Card
                  as="article"
                  className="h-full transition-shadow group-hover:border-brand-strong/30 group-hover:shadow-lg group-focus-visible:ring-2 group-focus-visible:ring-brand-strong group-focus-visible:ring-offset-2"
                >
                  <div className="flex items-start gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-strong/10 text-brand-strong">
                      <Users className="h-6 w-6" aria-hidden />
                    </span>
                    <div className="min-w-0 text-left">
                      <h2 className="text-xl font-semibold tracking-tight text-brand-strong">
                        {t('start.sme.title')}
                      </h2>
                      <p className="mt-2 text-sm text-brand-muted">
                        {t('start.sme.description')}
                      </p>
                      <span className="mt-4 inline-block text-sm font-medium text-brand-strong underline-offset-4 group-hover:underline">
                        {t('start.sme.cta')}
                      </span>
                    </div>
                  </div>
                </Card>
              </Link>
            </li>
          </ul>
        </AnimatedSection>
      </div>
    </>
  );
}
