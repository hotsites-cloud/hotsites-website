import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Check, Gauge, Globe2, MessageCircle, Package } from 'lucide-react';
import { SEO } from '../components/seo/SEO';
import { AnimatedSection } from '../components/ui/AnimatedSection';
import { BackToStartLink } from '../components/ui/BackToStartLink';
import { Card } from '../components/ui/Card';
import { InPageAnchor } from '../components/ui/InPageAnchor';
import { PatternSection } from '../components/ui/PatternSection';
import { SITE_ORIGIN } from '../config/site';
import { cn } from '../utils/cn';

const navIds = [
  'mkb-highlights',
  'mkb-what',
  'mkb-wordpress',
  'mkb-eu',
  'mkb-lockin',
  'mkb-maintenance',
  'mkb-contact',
];

export default function SmeClients() {
  const { t } = useTranslation();
  const wordPressBullets = t('audience.sme.wordPressBullets', { returnObjects: true });

  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: t('structuredData.organizationName'),
      description: t('structuredData.organizationDescription'),
      url: SITE_ORIGIN,
    },
  ];

  const highlightItems = [
    { key: '1', text: t('audience.sme.highlight1'), icon: Gauge },
    { key: '2', text: t('audience.sme.highlight2'), icon: Globe2 },
    { key: '3', text: t('audience.sme.highlight3'), icon: Package },
  ];

  const navItems = [
    { id: 'mkb-highlights', label: t('audience.sme.navHighlights') },
    { id: 'mkb-what', label: t('audience.sme.navWhat') },
    { id: 'mkb-wordpress', label: t('audience.sme.navWordPress') },
    { id: 'mkb-eu', label: t('audience.sme.navEu') },
    { id: 'mkb-lockin', label: t('audience.sme.navLockIn') },
    { id: 'mkb-maintenance', label: t('audience.sme.navMaintenance') },
    { id: 'mkb-contact', label: t('audience.sme.navContact') },
  ];

  const primaryLinkClass = cn(
    'inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-sm font-medium transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'bg-brand-strong text-brand-foreground hover:opacity-90 focus-visible:ring-brand-strong',
  );

  const pillLinkClass = cn(
    'inline-block max-w-full truncate rounded-full border border-border bg-surface px-3 py-1.5',
    'text-xs font-medium text-brand-strong shadow-sm transition-colors',
    'hover:border-brand-strong/40 hover:bg-surface-elevated',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-strong focus-visible:ring-offset-2',
  );

  const sideNavLinkClass = cn(
    'block rounded-md py-1.5 pl-2 text-sm text-brand-muted transition-colors',
    'hover:bg-surface-elevated/80 hover:text-brand-strong',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-strong',
  );

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
          <BackToStartLink />
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-brand-muted">
            {t('audience.sme.audienceLabel')}
          </p>
          <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-brand-strong sm:text-4xl md:text-5xl">
            <span className="block">{t('common.companyName')}</span>
            <span className="mt-2 block text-2xl font-semibold leading-snug text-brand sm:text-3xl md:text-4xl">
              {t('audience.sme.pageTitle')}
            </span>
          </h1>
          <p className="mt-6 max-w-prose text-lg leading-relaxed text-brand md:text-xl">
            {t('audience.sme.intro')}
          </p>
        </AnimatedSection>
      </PatternSection>

      <div className="sticky top-0 z-20 border-b border-border/80 bg-page/90 backdrop-blur-md lg:hidden">
        <nav
          className="mx-auto max-w-6xl px-4 py-3 sm:px-6"
          aria-label={t('audience.sme.navLabel')}
        >
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-brand-muted">
            {t('audience.sme.navLabel')}
          </p>
          <ul className="flex flex-wrap gap-2">
            {navItems.map((item) => (
              <li key={item.id}>
                <InPageAnchor targetId={item.id} className={pillLinkClass}>
                  {item.label}
                </InPageAnchor>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <AnimatedSection id="mkb-highlights" className="scroll-mt-28">
          <h2 className="text-2xl font-semibold tracking-tight text-brand-strong md:text-3xl">
            {t('audience.sme.highlightsTitle')}
          </h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {highlightItems.map((item) => {
              const HighlightIcon = item.icon;
              return (
                <li key={item.key}>
                  <Card as="article" className="h-full border-brand-strong/10 p-5 sm:p-6">
                    <div className="flex gap-4">
                      <span
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-strong/10 text-brand-strong"
                        aria-hidden
                      >
                        <HighlightIcon className="h-5 w-5" strokeWidth={2} />
                      </span>
                      <p className="text-sm leading-relaxed text-brand-muted">{item.text}</p>
                    </div>
                  </Card>
                </li>
              );
            })}
          </ul>
        </AnimatedSection>

        <div className="mt-16 space-y-16 lg:mt-20 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-x-12 lg:space-y-0">
          <div className="hidden lg:block">
            <nav
              className="sticky top-28 space-y-1 border-l-2 border-border py-1 pl-4"
              aria-label={t('audience.sme.navLabel')}
            >
              {navIds.map((id) => {
                const item = navItems.find((n) => n.id === id);
                if (!item) {
                  return null;
                }
                return (
                  <InPageAnchor key={id} targetId={id} className={sideNavLinkClass}>
                    {item.label}
                  </InPageAnchor>
                );
              })}
            </nav>
          </div>

          <div className="min-w-0 space-y-16 lg:space-y-20">
            <AnimatedSection id="mkb-what" className="scroll-mt-28">
              <h2 className="text-2xl font-semibold tracking-tight text-brand-strong md:text-3xl">
                {t('audience.sme.whatTitle')}
              </h2>
              <div className="mt-6 max-w-prose space-y-4 leading-relaxed text-brand-muted">
                <p>{t('audience.sme.whatBody')}</p>
                <p className="rounded-xl border-2 border-brand-strong/20 bg-brand-strong/[0.07] px-5 py-4 text-base font-semibold leading-relaxed text-brand-strong shadow-sm ring-1 ring-brand-strong/10 sm:rounded-2xl sm:px-6 sm:py-5 sm:text-lg">
                  {t('audience.sme.whatBodySecond')}
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection id="mkb-wordpress" className="scroll-mt-28">
              <h2 className="text-2xl font-semibold tracking-tight text-brand-strong md:text-3xl">
                {t('audience.sme.wordPressCompareTitle')}
              </h2>
              <Card className="mt-8 border-brand-strong/15 bg-surface p-6 sm:p-8">
                <div className="max-w-prose space-y-4 leading-relaxed text-brand-muted">
                  <p>{t('audience.sme.wordPressCompareBody')}</p>
                  <p>{t('audience.sme.wordPressCompareSecurity')}</p>
                </div>
                {Array.isArray(wordPressBullets) ? (
                  <ul className="mt-6 space-y-3" role="list">
                    {wordPressBullets.map((line) => (
                      <li key={line} className="flex gap-3 text-sm leading-relaxed text-brand-muted">
                        <span
                          className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-strong text-brand-foreground"
                          aria-hidden
                        >
                          <Check className="h-3 w-3" strokeWidth={3} />
                        </span>
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </Card>
            </AnimatedSection>

            <div className="grid gap-8 lg:grid-cols-2 lg:gap-6">
              <AnimatedSection id="mkb-eu" className="scroll-mt-28">
                <Card className="h-full border-brand-strong/10 p-6 sm:p-7">
                  <h2 className="text-xl font-semibold tracking-tight text-brand-strong md:text-2xl">
                    {t('audience.sme.euDataTitle')}
                  </h2>
                  <p className="mt-4 text-sm leading-relaxed text-brand-muted md:text-base">
                    {t('audience.sme.euDataBody')}
                  </p>
                </Card>
              </AnimatedSection>

              <AnimatedSection id="mkb-lockin" className="scroll-mt-28">
                <Card className="h-full border-brand-strong/10 p-6 sm:p-7">
                  <h2 className="text-xl font-semibold tracking-tight text-brand-strong md:text-2xl">
                    {t('audience.sme.noLockInTitle')}
                  </h2>
                  <p className="mt-4 text-sm leading-relaxed text-brand-muted md:text-base">
                    {t('audience.sme.noLockInBody')}
                  </p>
                </Card>
              </AnimatedSection>
            </div>

            <AnimatedSection id="mkb-maintenance" className="scroll-mt-28">
              <h2 className="text-2xl font-semibold tracking-tight text-brand-strong md:text-3xl">
                {t('audience.sme.maintenanceTitle')}
              </h2>
              <Card className="mt-6 max-w-prose border-border bg-surface p-6 leading-relaxed text-brand-muted sm:p-8">
                {t('audience.sme.maintenanceBody')}
              </Card>
            </AnimatedSection>

            <AnimatedSection id="mkb-contact" className="scroll-mt-28">
              <Card className="flex flex-col gap-6 border-brand-strong/25 bg-gradient-to-br from-surface to-surface-elevated/40 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
                <div className="flex min-w-0 gap-4">
                  <span
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-strong text-brand-foreground"
                    aria-hidden
                  >
                    <MessageCircle className="h-6 w-6" />
                  </span>
                  <div className="min-w-0">
                    <h2 className="text-xl font-semibold tracking-tight text-brand-strong">
                      {t('audience.sme.ctaTitle')}
                    </h2>
                    <p className="mt-2 max-w-prose text-sm leading-relaxed text-brand-muted">
                      {t('audience.sme.ctaBody')}
                    </p>
                  </div>
                </div>
                <div className="flex shrink-0 flex-col gap-3 sm:items-end">
                  <Link to="/contact" className={primaryLinkClass}>
                    {t('audience.sme.ctaButton')}
                  </Link>
                  <Link
                    to="/resellers"
                    className="text-center text-sm font-medium text-brand-strong underline-offset-4 hover:underline sm:text-right"
                  >
                    {t('audience.sme.ctaSecondary')}
                  </Link>
                </div>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </>
  );
}
