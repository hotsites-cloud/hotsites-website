import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Building2, Users } from 'lucide-react';
import { SEO } from '../components/seo/SEO';
import { AnimatedSection } from '../components/ui/AnimatedSection';
import { Card } from '../components/ui/Card';
import { FullBleedPhotoSection } from '../components/ui/FullBleedPhotoSection';
import { HeroScrollDownCta } from '../components/ui/HeroScrollDownCta';
import { sitePhotoUrl } from '../config/photos';
import { SITE_ORIGIN } from '../config/site';

const START_ROUTES_ID = 'start-routes';

export default function Start() {
  const { t } = useTranslation();

  const scrollToRouteChoices = useCallback(() => {
    const el = document.getElementById(START_ROUTES_ID);
    if (!el) {
      return;
    }
    const reduceMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    requestAnimationFrame(() => {
      el.focus({ preventScroll: true });
    });
  }, []);

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

      <FullBleedPhotoSection
        imageUrl={sitePhotoUrl('homeHero')}
        minHeight="min-h-[88vh]"
        overlay="darker"
        overlayEntrance
        backgroundSlowLoop
        contentClassName="mx-auto max-w-3xl text-center"
        bottomContent={
          <HeroScrollDownCta
            hintId="start-scroll-hint"
            onScroll={scrollToRouteChoices}
            hintText={t('start.scrollHint')}
            ctaText={t('start.scrollCta')}
          />
        }
      >
        <p className="text-xs font-bold uppercase tracking-[0.35em] text-white/80 sm:text-sm">
          {t('common.companyName')}
        </p>
        <h1 className="mt-5 text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
          {t('start.title')}
        </h1>
        <p className="mt-8 text-xl font-bold leading-snug text-white/95 sm:text-2xl md:text-3xl">
          {t('start.lead')}
        </p>
      </FullBleedPhotoSection>

      <div
        id={START_ROUTES_ID}
        className="mx-auto max-w-6xl scroll-mt-24 px-4 py-16 sm:scroll-mt-28 sm:px-6 sm:py-20"
        tabIndex={-1}
        aria-label={t('start.choiceLegend')}
      >
        <AnimatedSection>
          <ul
            className="grid gap-8 md:grid-cols-2 md:gap-10"
            aria-label={t('start.choiceLegend')}
          >
            <li>
              <Link to="/resellers" className="group block h-full outline-none">
                <Card
                  as="article"
                  className="h-full min-h-[min(20rem,50vh)] p-8 transition-shadow sm:min-h-0 sm:p-10 md:p-12 group-hover:border-brand-strong/30 group-hover:shadow-lg group-focus-visible:ring-2 group-focus-visible:ring-brand-strong group-focus-visible:ring-offset-2"
                >
                  <div className="flex h-full min-h-0 items-start gap-5 sm:gap-6">
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-strong/10 text-brand-strong sm:h-16 sm:w-16">
                      <Building2 className="h-7 w-7 sm:h-8 sm:w-8" aria-hidden />
                    </span>
                    <div className="min-w-0 flex-1 text-left">
                      <h2 className="text-2xl font-semibold leading-snug tracking-tight text-brand-strong md:text-3xl">
                        {t('start.resellers.title')}
                      </h2>
                      <p className="mt-3 text-base leading-relaxed text-brand-muted sm:mt-4 sm:text-lg">
                        {t('start.resellers.description')}
                      </p>
                      <span className="mt-6 inline-block text-base font-medium text-brand-strong underline-offset-4 group-hover:underline sm:mt-8">
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
                  className="h-full min-h-[min(20rem,50vh)] p-8 transition-shadow sm:min-h-0 sm:p-10 md:p-12 group-hover:border-brand-strong/30 group-hover:shadow-lg group-focus-visible:ring-2 group-focus-visible:ring-brand-strong group-focus-visible:ring-offset-2"
                >
                  <div className="flex h-full min-h-0 items-start gap-5 sm:gap-6">
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-strong/10 text-brand-strong sm:h-16 sm:w-16">
                      <Users className="h-7 w-7 sm:h-8 sm:w-8" aria-hidden />
                    </span>
                    <div className="min-w-0 flex-1 text-left">
                      <h2 className="text-2xl font-semibold leading-snug tracking-tight text-brand-strong md:text-3xl">
                        {t('start.sme.title')}
                      </h2>
                      <p className="mt-3 text-base leading-relaxed text-brand-muted sm:mt-4 sm:text-lg">
                        {t('start.sme.description')}
                      </p>
                      <span className="mt-6 inline-block text-base font-medium text-brand-strong underline-offset-4 group-hover:underline sm:mt-8">
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
