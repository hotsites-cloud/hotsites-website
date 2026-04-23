import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Building2, ChevronRight, Users } from 'lucide-react';
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
        minHeight="min-h-[80vh] sm:min-h-[88vh]"
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
        className="mx-auto max-w-6xl scroll-mt-24 px-4 py-10 sm:scroll-mt-28 sm:px-6 sm:py-16 md:py-20"
        tabIndex={-1}
        aria-label={t('start.choiceLegend')}
      >
        <AnimatedSection>
          <ul
            className="grid gap-4 sm:gap-8 md:grid-cols-2 md:gap-10"
            aria-label={t('start.choiceLegend')}
          >
            <li>
              <Link
                to="/resellers"
                className="group block h-full rounded-2xl outline-none transition active:scale-[0.99] motion-reduce:transition-none motion-reduce:active:scale-100"
              >
                <Card
                  as="article"
                  className="h-full min-h-0 p-5 transition-shadow sm:p-8 md:min-h-[17rem] md:p-10 lg:p-12 group-hover:border-brand-strong/30 group-hover:shadow-lg group-focus-visible:ring-2 group-focus-visible:ring-brand-strong group-focus-visible:ring-offset-2 group-active:bg-surface-elevated/40"
                >
                  <div className="flex h-full min-h-0 items-start gap-3.5 sm:gap-6">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-strong/10 text-brand-strong sm:h-16 sm:w-16 sm:rounded-2xl">
                      <Building2 className="h-6 w-6 sm:h-8 sm:w-8" aria-hidden />
                    </span>
                    <div className="min-w-0 flex-1 text-left">
                      <h2 className="text-xl font-semibold leading-snug tracking-tight text-brand-strong sm:text-2xl md:text-3xl">
                        {t('start.resellers.title')}
                      </h2>
                      <p className="mt-2 text-sm leading-relaxed text-brand-muted sm:mt-3 sm:text-base sm:text-lg">
                        {t('start.resellers.description')}
                      </p>
                      <span className="mt-4 flex min-h-11 max-w-full items-center gap-1.5 text-sm font-semibold text-brand-strong sm:mt-5 sm:min-h-0 sm:text-base">
                        <span className="min-w-0 border-b-2 border-transparent pb-0.5 transition group-hover:border-brand-strong/40">
                          {t('start.resellers.cta')}
                        </span>
                        <ChevronRight
                          className="h-4 w-4 shrink-0 text-brand-strong/80 transition group-hover:translate-x-0.5 motion-reduce:transition-none sm:h-5 sm:w-5"
                          aria-hidden
                        />
                      </span>
                    </div>
                  </div>
                </Card>
              </Link>
            </li>
            <li>
              <Link
                to="/mkb"
                className="group block h-full rounded-2xl outline-none transition active:scale-[0.99] motion-reduce:transition-none motion-reduce:active:scale-100"
              >
                <Card
                  as="article"
                  className="h-full min-h-0 p-5 transition-shadow sm:p-8 md:min-h-[17rem] md:p-10 lg:p-12 group-hover:border-brand-strong/30 group-hover:shadow-lg group-focus-visible:ring-2 group-focus-visible:ring-brand-strong group-focus-visible:ring-offset-2 group-active:bg-surface-elevated/40"
                >
                  <div className="flex h-full min-h-0 items-start gap-3.5 sm:gap-6">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-strong/10 text-brand-strong sm:h-16 sm:w-16 sm:rounded-2xl">
                      <Users className="h-6 w-6 sm:h-8 sm:w-8" aria-hidden />
                    </span>
                    <div className="min-w-0 flex-1 text-left">
                      <h2 className="text-xl font-semibold leading-snug tracking-tight text-brand-strong sm:text-2xl md:text-3xl">
                        {t('start.sme.title')}
                      </h2>
                      <p className="mt-2 text-sm leading-relaxed text-brand-muted sm:mt-3 sm:text-base sm:text-lg">
                        {t('start.sme.description')}
                      </p>
                      <span className="mt-4 flex min-h-11 max-w-full items-center gap-1.5 text-sm font-semibold text-brand-strong sm:mt-5 sm:min-h-0 sm:text-base">
                        <span className="min-w-0 border-b-2 border-transparent pb-0.5 transition group-hover:border-brand-strong/40">
                          {t('start.sme.cta')}
                        </span>
                        <ChevronRight
                          className="h-4 w-4 shrink-0 text-brand-strong/80 transition group-hover:translate-x-0.5 motion-reduce:transition-none sm:h-5 sm:w-5"
                          aria-hidden
                        />
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
