import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Check, Layers, MessageCircle, Server, Shield } from 'lucide-react';
import { SEO } from '../components/seo/SEO';
import { AnimatedSection } from '../components/ui/AnimatedSection';
import { BackToStartLink } from '../components/ui/BackToStartLink';
import { Card } from '../components/ui/Card';
import { PatternSection } from '../components/ui/PatternSection';
import { SITE_ORIGIN } from '../config/site';
import { cn } from '../utils/cn';

function isSpecRow(value) {
  return (
    value !== null &&
    typeof value === 'object' &&
    typeof value.term === 'string' &&
    typeof value.detail === 'string'
  );
}

const navIds = [
  'resellers-highlights',
  'resellers-what',
  'resellers-specs',
  'resellers-deliver',
  'resellers-maintenance',
  'resellers-contact',
];

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

  const highlightItems = [
    { key: '1', text: t('audience.resellers.highlight1'), icon: Layers },
    { key: '2', text: t('audience.resellers.highlight2'), icon: Server },
    { key: '3', text: t('audience.resellers.highlight3'), icon: Shield },
  ];

  const navItems = [
    { id: 'resellers-highlights', label: t('audience.resellers.highlightsTitle') },
    { id: 'resellers-what', label: t('audience.resellers.whatTitle') },
    { id: 'resellers-specs', label: t('audience.resellers.specsTitle') },
    { id: 'resellers-deliver', label: t('audience.resellers.deliverTitle') },
    { id: 'resellers-maintenance', label: t('audience.resellers.maintenanceTitle') },
    { id: 'resellers-contact', label: t('audience.resellers.navContact') },
  ];

  const primaryLinkClass = cn(
    'inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-sm font-medium transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'bg-brand-strong text-brand-foreground hover:opacity-90 focus-visible:ring-brand-strong',
  );

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
          <BackToStartLink />
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-brand-muted">
            {t('audience.resellers.audienceLabel')}
          </p>
          <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-brand-strong sm:text-4xl md:text-5xl">
            <span className="block">{t('common.companyName')}</span>
            <span className="mt-2 block text-2xl font-semibold leading-snug text-brand sm:text-3xl md:text-4xl">
              {t('audience.resellers.pageTitle')}
            </span>
          </h1>
          <p className="mt-6 max-w-prose text-lg leading-relaxed text-brand md:text-xl">
            {t('audience.resellers.intro')}
          </p>
        </AnimatedSection>
      </PatternSection>

      <div className="sticky top-0 z-20 border-b border-border/80 bg-page/90 backdrop-blur-md lg:hidden">
        <nav
          className="mx-auto max-w-6xl px-4 py-3 sm:px-6"
          aria-label={t('audience.resellers.navLabel')}
        >
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-brand-muted">
            {t('audience.resellers.navLabel')}
          </p>
          <ul className="flex flex-wrap gap-2">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={cn(
                    'inline-block max-w-full truncate rounded-full border border-border bg-surface px-3 py-1.5',
                    'text-xs font-medium text-brand-strong shadow-sm transition-colors',
                    'hover:border-brand-strong/40 hover:bg-surface-elevated',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-strong focus-visible:ring-offset-2',
                  )}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <AnimatedSection id="resellers-highlights" className="scroll-mt-28">
          <h2 className="text-2xl font-semibold tracking-tight text-brand-strong md:text-3xl">
            {t('audience.resellers.highlightsTitle')}
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
              aria-label={t('audience.resellers.navLabel')}
            >
              {navIds.map((id) => {
                const item = navItems.find((n) => n.id === id);
                if (!item) {
                  return null;
                }
                return (
                  <a
                    key={id}
                    href={`#${id}`}
                    className={cn(
                      'block rounded-md py-1.5 pl-2 text-sm text-brand-muted transition-colors',
                      'hover:bg-surface-elevated/80 hover:text-brand-strong',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-strong',
                    )}
                  >
                    {item.label}
                  </a>
                );
              })}
            </nav>
          </div>

          <div className="min-w-0 space-y-16 lg:space-y-20">
            <AnimatedSection id="resellers-what" className="scroll-mt-28">
              <h2 className="text-2xl font-semibold tracking-tight text-brand-strong md:text-3xl">
                {t('audience.resellers.whatTitle')}
              </h2>
              <div className="mt-6 max-w-prose space-y-4 leading-relaxed text-brand-muted">
                <p>{t('audience.resellers.whatBody')}</p>
                <p>{t('audience.resellers.whatBodySecond')}</p>
              </div>
            </AnimatedSection>

            <AnimatedSection id="resellers-specs" className="scroll-mt-28">
              <h2 className="text-2xl font-semibold tracking-tight text-brand-strong md:text-3xl">
                {t('audience.resellers.specsTitle')}
              </h2>
              {specRows.length > 0 ? (
                <dl className="mt-8 grid gap-4 sm:grid-cols-2">
                  {specRows.map((row) => (
                    <div key={row.term}>
                      <Card as="div" className="h-full p-5">
                        <dt className="text-xs font-semibold uppercase tracking-wider text-brand-strong">
                          {row.term}
                        </dt>
                        <dd className="mt-2 text-sm leading-relaxed text-brand-muted">{row.detail}</dd>
                      </Card>
                    </div>
                  ))}
                </dl>
              ) : null}
            </AnimatedSection>

            <AnimatedSection id="resellers-deliver" className="scroll-mt-28">
              <h2 className="text-2xl font-semibold tracking-tight text-brand-strong md:text-3xl">
                {t('audience.resellers.deliverTitle')}
              </h2>
              <Card className="mt-8 border-brand-strong/15 bg-surface p-6 sm:p-8">
                <p className="max-w-prose leading-relaxed text-brand-muted">
                  {t('audience.resellers.deliverLead')}
                </p>
                {Array.isArray(deliverables) ? (
                  <ul className="mt-6 space-y-3" role="list">
                    {deliverables.map((line) => (
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

            <AnimatedSection id="resellers-maintenance" className="scroll-mt-28">
              <h2 className="text-2xl font-semibold tracking-tight text-brand-strong md:text-3xl">
                {t('audience.resellers.maintenanceTitle')}
              </h2>
              <div className="mt-6 max-w-prose space-y-4 leading-relaxed text-brand-muted">
                <p>{t('audience.resellers.maintenanceBody')}</p>
                <p className="rounded-xl border border-dashed border-border bg-surface-elevated/50 px-4 py-3 text-sm">
                  {t('audience.resellers.maintenanceFootnote')}
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection id="resellers-contact" className="scroll-mt-28">
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
                      {t('audience.resellers.partnerCtaTitle')}
                    </h2>
                    <p className="mt-2 max-w-prose text-sm leading-relaxed text-brand-muted">
                      {t('audience.resellers.partnerCtaBody')}
                    </p>
                  </div>
                </div>
                <div className="flex shrink-0 flex-col gap-3 sm:items-end">
                  <Link to="/contact" className={primaryLinkClass}>
                    {t('audience.resellers.partnerCtaButton')}
                  </Link>
                  <Link
                    to="/mkb"
                    className="text-center text-sm font-medium text-brand-strong underline-offset-4 hover:underline sm:text-right"
                  >
                    {t('audience.resellers.partnerCtaSecondary')}
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
