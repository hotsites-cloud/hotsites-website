import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { SEO } from '../components/seo/SEO';
import { AnimatedSection } from '../components/ui/AnimatedSection';
import { Card } from '../components/ui/Card';
import { FullBleedPhotoSection } from '../components/ui/FullBleedPhotoSection';
import { HeroScrollDownCta } from '../components/ui/HeroScrollDownCta';
import { PatternSection } from '../components/ui/PatternSection';
import { sitePhotoUrl } from '../config/photos';
import { cn } from '../utils/cn';

const STEP_INDEXES = [1, 2, 3, 4];
const STEP_PHOTO_KEYS = [
  'approachStep1',
  'approachStep2',
  'approachStep3',
  'approachStep4',
];
const APPROACH_CONTENT_ID = 'approach-stappen';

export default function Approach() {
  const { t } = useTranslation();

  const scrollToSteps = useCallback(() => {
    const el = document.getElementById(APPROACH_CONTENT_ID);
    if (!el) {
      return;
    }
    const reduceMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
  }, []);

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: t('seo.approach.title'),
    description: t('seo.approach.description'),
  };

  return (
    <>
      <SEO
        title={t('seo.approach.title')}
        description={t('seo.approach.description')}
        canonical="/werkwijze"
        structuredData={structuredData}
      />

      <FullBleedPhotoSection
        imageUrl={sitePhotoUrl('approachHero')}
        imageLabel={t('approach.heroImageLabel')}
        minHeight="min-h-[78vh] sm:min-h-[82vh]"
        overlay="dark"
        backgroundPosition="center 38%"
        className="border-t-0"
        contentClassName="w-full max-w-3xl"
        bottomContent={
          <HeroScrollDownCta
            hintId="approach-hero-scroll-hint"
            onScroll={scrollToSteps}
            hintText={t('common.scrollPageHint')}
            ctaText={t('common.scrollPageCta')}
          />
        }
      >
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/80 sm:text-sm">
          {t('approach.heroKicker')}
        </p>
        <h1 className="mt-4 text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
          {t('approach.h1')}
        </h1>
        <p className="mt-6 max-w-2xl text-base font-medium leading-relaxed text-white/90 sm:text-lg md:text-xl">
          {t('approach.intro')}
        </p>
      </FullBleedPhotoSection>

      <PatternSection className="border-t-0">
        <AnimatedSection>
          <div id={APPROACH_CONTENT_ID} className="scroll-mt-20">
            <h2 className="text-2xl font-bold tracking-tight text-brand-strong sm:text-3xl">
              {t('approach.processTitle')}
            </h2>
            <p className="mt-2 max-w-2xl text-base leading-relaxed text-brand-muted sm:text-lg">
              {t('approach.processLead')}
            </p>
          </div>

          <ul className="mt-12 list-none space-y-12 p-0 sm:space-y-16 lg:space-y-20">
            {STEP_INDEXES.map((index) => {
              const isReversed = index % 2 === 0;
              const photoKey = STEP_PHOTO_KEYS[index - 1];
              return (
                <li key={index}>
                  <article
                    className={cn(
                      'grid items-center gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-14',
                      isReversed && 'lg:grid-flow-dense',
                    )}
                  >
                    <div
                      className={cn(
                        'min-w-0',
                        isReversed ? 'lg:col-start-2 lg:row-start-1' : '',
                      )}
                    >
                      <div className="overflow-hidden rounded-2xl border border-border/80 bg-surface shadow-md ring-1 ring-black/[0.05]">
                        <img
                          src={sitePhotoUrl(photoKey)}
                          alt={t(`approach.step${index}ImageAlt`)}
                          loading={index <= 2 ? 'eager' : 'lazy'}
                          decoding="async"
                          className="aspect-[4/3] w-full object-cover sm:aspect-[16/10]"
                        />
                      </div>
                    </div>
                    <div
                      className={cn('min-w-0', isReversed ? 'lg:col-start-1 lg:row-start-1' : '')}
                    >
                      <div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand-strong text-sm font-bold text-brand-foreground sm:h-10 sm:w-10 sm:text-base">
                        {index}
                      </div>
                      <h3 className="mt-4 text-xl font-bold tracking-tight text-brand-strong sm:text-2xl">
                        {t(`approach.step${index}Title`)}
                      </h3>
                      <p className="mt-3 text-base leading-relaxed text-brand-muted sm:text-lg">
                        {t(`approach.step${index}Body`)}
                      </p>
                    </div>
                  </article>
                </li>
              );
            })}
          </ul>
        </AnimatedSection>
      </PatternSection>

      <div className="border-t border-border/70 bg-surface-elevated/30">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <AnimatedSection>
            <Card className="w-full border-brand-strong/15 bg-surface p-8 shadow-sm sm:p-10 lg:mx-auto lg:max-w-5xl lg:p-12">
              <h2 className="text-2xl font-bold tracking-tight text-brand-strong sm:text-3xl lg:text-4xl">
                {t('approach.aiTitle')}
              </h2>
              <p className="mt-5 text-base leading-relaxed text-brand-muted sm:mt-6 sm:text-lg lg:mt-8 lg:text-xl">
                {t('approach.aiBody')}
              </p>
            </Card>
          </AnimatedSection>
        </div>
      </div>
    </>
  );
}
