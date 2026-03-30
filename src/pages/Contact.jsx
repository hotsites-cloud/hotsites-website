import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { SEO } from '../components/seo/SEO';
import { AnimatedSection } from '../components/ui/AnimatedSection';
import { Button } from '../components/ui/Button';
import { PatternSection } from '../components/ui/PatternSection';
import { SITE_ORIGIN } from '../config/site';

export default function Contact() {
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onBlur' });

  const onSubmit = (data) => {
    const subject = encodeURIComponent(`Contact: ${data.name}`);
    const body = encodeURIComponent(
      `${data.message}\n\n---\n${data.name}\n${data.email}${data.phone ? `\n${data.phone}` : ''}`,
    );
    const mail = t('contact.placeholdersContact.email');
    const mailtoUrl = `mailto:${mail}?subject=${subject}&body=${body}`;
    window.open(mailtoUrl, '_self', 'noopener,noreferrer');
    setSubmitted(true);
  };

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: t('structuredData.organizationName'),
    description: t('structuredData.organizationDescription'),
    url: SITE_ORIGIN,
    address: {
      '@type': 'PostalAddress',
      streetAddress: t('contact.placeholdersContact.address'),
    },
    telephone: t('contact.placeholdersContact.phone'),
    email: t('contact.placeholdersContact.email'),
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '17:00',
    },
  };

  return (
    <>
      <SEO
        title={t('seo.contact.title')}
        description={t('seo.contact.description')}
        canonical="/contact"
        structuredData={structuredData}
      />
      <PatternSection className="border-t-0">
        <AnimatedSection className="max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tight text-brand-strong sm:text-4xl md:text-5xl">
            {t('contact.hero.title')}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-brand md:text-xl">
            {t('contact.hero.lead')}
          </p>
        </AnimatedSection>
      </PatternSection>

      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
          <AnimatedSection>
            <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm ring-1 ring-black/[0.04] sm:p-8">
              {submitted ? (
                <p className="mb-6 rounded-lg border border-border bg-surface-elevated p-4 text-sm text-brand-strong">
                  {t('contact.success')}
                </p>
              ) : null}
              <form
                className="space-y-5"
                onSubmit={handleSubmit(onSubmit)}
                noValidate
              >
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-brand-strong">
                  {t('contact.fields.name')}
                </label>
                <input
                  id="name"
                  type="text"
                  autoComplete="name"
                  placeholder={t('contact.placeholders.name')}
                  className="mt-1 w-full rounded-lg border border-border bg-surface px-3 py-2 text-brand shadow-sm focus:border-brand-strong focus:outline-none focus:ring-2 focus:ring-brand-strong/20"
                  {...register('name', { required: true })}
                />
                {errors.name ? (
                  <p className="mt-1 text-sm text-red-600" role="alert">
                    {t('contact.errors.required')}
                  </p>
                ) : null}
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-brand-strong">
                  {t('contact.fields.email')}
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder={t('contact.placeholders.email')}
                  className="mt-1 w-full rounded-lg border border-border bg-surface px-3 py-2 text-brand shadow-sm focus:border-brand-strong focus:outline-none focus:ring-2 focus:ring-brand-strong/20"
                  {...register('email', {
                    required: true,
                    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  })}
                />
                {errors.email ? (
                  <p className="mt-1 text-sm text-red-600" role="alert">
                    {errors.email.type === 'required'
                      ? t('contact.errors.required')
                      : t('contact.errors.email')}
                  </p>
                ) : null}
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-brand-strong">
                  {t('contact.fields.phone')}
                </label>
                <input
                  id="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder={t('contact.placeholders.phone')}
                  className="mt-1 w-full rounded-lg border border-border bg-surface px-3 py-2 text-brand shadow-sm focus:border-brand-strong focus:outline-none focus:ring-2 focus:ring-brand-strong/20"
                  {...register('phone')}
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-brand-strong">
                  {t('contact.fields.message')}
                </label>
                <textarea
                  id="message"
                  rows={5}
                  placeholder={t('contact.placeholders.message')}
                  className="mt-1 w-full rounded-lg border border-border bg-surface px-3 py-2 text-brand shadow-sm focus:border-brand-strong focus:outline-none focus:ring-2 focus:ring-brand-strong/20"
                  {...register('message', { required: true })}
                />
                {errors.message ? (
                  <p className="mt-1 text-sm text-red-600" role="alert">
                    {t('contact.errors.required')}
                  </p>
                ) : null}
              </div>
              <Button type="submit">{t('contact.submit')}</Button>
              </form>
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm ring-1 ring-black/[0.04] sm:p-8">
              <h2 className="text-lg font-semibold text-brand-strong">
                {t('contact.business.hoursTitle')}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-brand-muted">
                {t('contact.business.hours')}
              </p>
              <dl className="mt-8 space-y-4 text-sm">
                <div>
                  <dt className="font-medium text-brand-strong">{t('contact.business.addressLabel')}</dt>
                  <dd className="mt-1 text-brand-muted">{t('contact.placeholdersContact.address')}</dd>
                </div>
                <div>
                  <dt className="font-medium text-brand-strong">{t('contact.business.phoneLabel')}</dt>
                  <dd className="mt-1 text-brand-muted">{t('contact.placeholdersContact.phone')}</dd>
                </div>
                <div>
                  <dt className="font-medium text-brand-strong">{t('contact.business.emailLabel')}</dt>
                  <dd className="mt-1 text-brand-muted">{t('contact.placeholdersContact.email')}</dd>
                </div>
              </dl>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </>
  );
}
