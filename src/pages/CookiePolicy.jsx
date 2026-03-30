import { useTranslation } from 'react-i18next';
import { SEO } from '../components/seo/SEO';
import { AnimatedSection } from '../components/ui/AnimatedSection';
import { LegalSections } from '../components/legal/LegalSections';

export default function CookiePolicy() {
  const { t } = useTranslation();
  const sections = t('legal.cookies.sections', { returnObjects: true });
  const rows = t('legal.cookies.table.rows', { returnObjects: true });

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: t('seo.cookiesPage.title'),
  };

  return (
    <>
      <SEO
        title={t('seo.cookiesPage.title')}
        description={t('seo.cookiesPage.description')}
        canonical="/cookies"
        structuredData={structuredData}
      />
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <AnimatedSection>
          <h1 className="text-3xl font-bold tracking-tight text-brand-strong sm:text-4xl">
            {t('legal.cookies.h1')}
          </h1>
          <p className="mt-6 text-brand-muted">{t('legal.cookies.intro')}</p>
        </AnimatedSection>
        <AnimatedSection className="mt-10">
          <LegalSections sections={sections} />
        </AnimatedSection>
        <AnimatedSection className="mt-10 overflow-x-auto">
          <table className="w-full min-w-[28rem] border-collapse text-left text-sm">
            <caption className="mb-3 text-left font-medium text-brand-strong">
              {t('legal.cookies.table.caption')}
            </caption>
            <thead>
              <tr className="border-b border-border">
                <th className="py-2 pr-4 font-semibold text-brand-strong">
                  {t('legal.cookies.table.name')}
                </th>
                <th className="py-2 pr-4 font-semibold text-brand-strong">
                  {t('legal.cookies.table.purpose')}
                </th>
                <th className="py-2 font-semibold text-brand-strong">
                  {t('legal.cookies.table.duration')}
                </th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(rows) &&
                rows.map((row) => (
                  <tr key={row.name} className="border-b border-border">
                    <td className="py-3 pr-4 align-top text-brand-muted">{row.name}</td>
                    <td className="py-3 pr-4 align-top text-brand-muted">{row.purpose}</td>
                    <td className="py-3 align-top text-brand-muted">{row.duration}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </AnimatedSection>
      </div>
    </>
  );
}
