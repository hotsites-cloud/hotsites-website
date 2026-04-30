import { useCallback, useEffect, useRef, useState } from 'react';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { SEO } from '../components/seo/SEO';
import { AnimatedSection } from '../components/ui/AnimatedSection';
import { Button } from '../components/ui/Button';
import { FullBleedPhotoSection } from '../components/ui/FullBleedPhotoSection';
import {
  canSubmitContactForm,
  getEmailJsConfig,
  shouldMockEmailJsSend,
} from '../config/emailjs';
import { sitePhotoUrl } from '../config/photos';
import { SITE_ORIGIN } from '../config/site';
import i18n from '../i18n';
import { cn } from '../utils/cn';
import {
  buildContactAdminEmailHtml,
  buildContactVisitorEmailHtml,
} from '../utils/email-templates';

const TOPIC_KEYS = [
  'new_site',
  'redesign',
  'maintenance',
  'migration',
  'partnership',
  'other',
];

const TIMELINE_KEYS = ['asap', 'one_three_months', 'flexible', 'unknown'];

/** @param {string} raw */
function normalizeWebsiteUrl(raw) {
  const s = String(raw ?? '').trim();
  if (!s) {
    return '';
  }
  try {
    return new URL(s.startsWith('http') ? s : `https://${s}`).href;
  } catch {
    return s;
  }
}

export default function Contact() {
  const { t } = useTranslation();
  const emailJsReady = canSubmitContactForm();
  const mockEmailJs = shouldMockEmailJsSend();
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formCardRef = useRef(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      topic: '',
      name: '',
      email: '',
      company: '',
      phone: '',
      website: '',
      timeline: '',
      message: '',
    },
  });

  useEffect(() => {
    if (submitted && formCardRef.current) {
      formCardRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [submitted]);

  const isLocalDevHost =
    import.meta.env.DEV &&
    typeof window !== 'undefined' &&
    (window.location.hostname === 'localhost' ||
      window.location.hostname === '127.0.0.1' ||
      window.location.hostname === '[::1]');

  const fillMockContactData = useCallback(() => {
    setValue('topic', 'new_site', { shouldValidate: true, shouldDirty: true });
    setValue('name', 'Test Gebruiker', { shouldValidate: true, shouldDirty: true });
    setValue('email', 'test@voorbeeld.nl', { shouldValidate: true, shouldDirty: true });
    setValue('company', 'Voorbeeld BV', { shouldDirty: true });
    setValue('phone', '+31 6 12345678', { shouldDirty: true });
    setValue('website', 'https://www.hotsites.nl', { shouldValidate: true, shouldDirty: true });
    setValue('timeline', 'one_three_months', { shouldDirty: true });
    setValue('message', t('contact.devMockMessage'), { shouldValidate: true, shouldDirty: true });
  }, [setValue, t]);

  const onSubmit = async (data) => {
    setSubmitError(null);

    if (!canSubmitContactForm()) {
      setSubmitError(t('contact.errors.configMissing'));
      return;
    }

    if (mockEmailJs) {
      setIsSubmitting(true);
      try {
        await new Promise((r) => setTimeout(r, 450));
        setSubmitted(true);
      } finally {
        setIsSubmitting(false);
      }
      return;
    }

    const topicLabel = t(`contact.topics.${data.topic}`);
    const subject = t('contact.emailSubject', {
      topic: topicLabel,
      name: data.name,
    });
    const { serviceId, templateId, publicKey, adminEmail } = getEmailJsConfig();
    const logoUrl = `${SITE_ORIGIN}/email/hotsites-logo.svg`;
    const siteName = t('common.companyName');
    const websiteDisplay = normalizeWebsiteUrl(data.website);

    const nl = { lng: 'nl' };
    const topicLabelNl = i18n.t(`contact.topics.${data.topic}`, nl);

    /** @type {{ label: string; value: string }[]} */
    const visitorSummaryExtra = [
      { label: i18n.t('contact.fields.topic', nl), value: topicLabelNl },
    ];
    const co = (data.company ?? '').trim();
    if (co) {
      visitorSummaryExtra.push({
        label: i18n.t('contact.fields.company', nl),
        value: co,
      });
    }
    const ph = (data.phone ?? '').trim();
    if (ph) {
      visitorSummaryExtra.push({
        label: i18n.t('contact.fields.phone', nl),
        value: ph,
      });
    }
    if (websiteDisplay) {
      visitorSummaryExtra.push({
        label: i18n.t('contact.fields.website', nl),
        value: websiteDisplay,
      });
    }
    if (data.timeline) {
      visitorSummaryExtra.push({
        label: i18n.t('contact.fields.timeline', nl),
        value: i18n.t(`contact.timelines.${data.timeline}`, nl),
      });
    }

    const visitorHtml = buildContactVisitorEmailHtml({
      logoUrl,
      siteUrl: SITE_ORIGIN,
      siteName,
      title: i18n.t('contact.emailConfirm.title', { ...nl, name: data.name }),
      body: i18n.t('contact.emailConfirm.body', nl),
      summaryLabel: i18n.t('contact.emailConfirm.summaryLabel', nl),
      nameLabel: i18n.t('contact.fields.name', nl),
      emailLabel: i18n.t('contact.emailConfirm.emailLabel', nl),
      visitorName: data.name,
      visitorEmail: data.email,
      footer: i18n.t('contact.emailConfirm.footer', { ...nl, siteUrl: SITE_ORIGIN }),
      tagline: i18n.t('contact.emailConfirm.tagline', { ...nl, siteName }),
      kicker: i18n.t('contact.emailConfirm.kicker', nl),
      summaryExtraRows: visitorSummaryExtra,
    });

    const adminLang = i18n.language?.toLowerCase().startsWith('nl') ? 'nl' : 'en';
    /** @type {{ label: string; value: string }[]} */
    const adminMeta = [{ label: t('contact.emailAdmin.labelTopic'), value: topicLabel }];
    if (co) {
      adminMeta.push({ label: t('contact.emailAdmin.labelCompany'), value: co });
    }
    if (ph) {
      adminMeta.push({ label: t('contact.emailAdmin.labelPhone'), value: ph });
    }
    if (websiteDisplay) {
      adminMeta.push({ label: t('contact.emailAdmin.labelWebsite'), value: websiteDisplay });
    }
    if (data.timeline) {
      adminMeta.push({
        label: t('contact.emailAdmin.labelTimeline'),
        value: t(`contact.timelines.${data.timeline}`),
      });
    }

    const adminHtml = buildContactAdminEmailHtml({
      htmlLang: adminLang,
      siteUrl: SITE_ORIGIN,
      siteName,
      visitorName: data.name,
      visitorEmail: data.email,
      visitorMessage: data.message,
      badge: t('contact.emailAdmin.badge'),
      headline: t('contact.emailAdmin.headline', { siteName }),
      intro: t('contact.emailAdmin.intro'),
      labelName: t('contact.emailAdmin.labelName'),
      labelEmail: t('contact.emailAdmin.labelEmail'),
      labelMessage: t('contact.emailAdmin.labelMessage'),
      footer: t('contact.emailAdmin.footer', { name: data.name }),
      metaRows: adminMeta,
    });

    const adminPayload = {
      to_email: adminEmail,
      subject,
      from_name: data.name,
      reply_to: data.email,
      message: adminHtml,
    };

    const userPayload = {
      to_email: data.email,
      subject: i18n.t('contact.emailConfirm.subject', nl),
      message: visitorHtml,
    };

    setIsSubmitting(true);
    try {
      await Promise.all([
        emailjs.send(serviceId, templateId, userPayload, { publicKey }),
        emailjs.send(serviceId, templateId, adminPayload, { publicKey }),
      ]);
      setSubmitted(true);
    } catch (err) {
      let suffix = '';
      if (err instanceof EmailJSResponseStatus) {
        suffix = err.text?.trim() || `HTTP ${err.status}`;
      } else if (err instanceof Error) {
        suffix = err.message;
      }
      setSubmitError(
        suffix ? `${t('contact.errors.sendFailed')}: ${suffix}` : t('contact.errors.sendFailed'),
      );
    } finally {
      setIsSubmitting(false);
    }
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
    email: t('contact.placeholdersContact.email'),
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '17:00',
    },
  };

  const fieldClass = (invalid) =>
    cn(
      'mt-1.5 w-full rounded-lg border bg-surface px-3 py-2.5 text-sm text-brand shadow-sm transition-[border-color,box-shadow]',
      'focus:border-brand-strong focus:outline-none focus:ring-2 focus:ring-brand-strong/25',
      invalid ? 'border-red-400 ring-1 ring-red-200' : 'border-border',
    );

  const labelClass = 'block text-sm font-semibold text-brand-strong';
  const optional = (
    <span className="font-normal text-brand-muted"> ({t('contact.optionalHint')})</span>
  );

  return (
    <>
      <SEO
        title={t('seo.contact.title')}
        description={t('seo.contact.description')}
        canonical="/contact"
        structuredData={structuredData}
      />
      <FullBleedPhotoSection
        imageUrl={sitePhotoUrl('contactHero')}
        minHeight="min-h-[60vh] sm:min-h-[70vh]"
        overlay="darker"
        className="border-t-0"
        contentClassName="max-w-3xl"
      >
        <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
          {t('contact.hero.title')}
        </h1>
        <p className="mt-6 text-lg font-semibold leading-relaxed text-white/90 sm:text-xl md:text-2xl">
          {t('contact.hero.lead')}
        </p>
      </FullBleedPhotoSection>

      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
          <AnimatedSection>
            <div
              ref={formCardRef}
              className="rounded-2xl border border-border bg-surface p-6 shadow-sm ring-1 ring-black/[0.04] sm:p-8"
            >
              {!emailJsReady ? (
                <p
                  className="mb-6 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-950"
                  role="status"
                >
                  {t('contact.errors.configMissing')}
                </p>
              ) : null}
              {submitError ? (
                <p
                  className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800"
                  role="alert"
                >
                  {submitError}
                </p>
              ) : null}
              {mockEmailJs ? (
                <p
                  className="mb-6 rounded-lg border border-sky-200 bg-sky-50 p-4 text-sm text-sky-950"
                  role="status"
                >
                  {t('contact.mockEmailJsBanner')}
                </p>
              ) : null}

              {submitted ? (
                <div className="flex flex-col items-center py-10 text-center sm:py-12">
                  <div
                    className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-brand-strong/10"
                    aria-hidden
                  >
                    <CheckCircle2 className="h-9 w-9 text-brand-strong" strokeWidth={2} />
                  </div>
                  <h2 className="text-xl font-bold tracking-tight text-brand-strong sm:text-2xl">
                    {t('contact.successTitle')}
                  </h2>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-brand-muted">
                    {t('contact.success')}
                  </p>
                  <Link
                    to="/"
                    className={cn(
                      'mt-8 inline-flex items-center justify-center rounded-lg border border-border',
                      'bg-surface px-5 py-2.5 text-sm font-medium text-brand-strong transition-colors',
                      'hover:bg-surface-elevated focus-visible:outline-none focus-visible:ring-2',
                      'focus-visible:ring-brand-muted focus-visible:ring-offset-2',
                    )}
                  >
                    {t('contact.backHome')}
                  </Link>
                </div>
              ) : (
                <>
                  <p className="text-sm leading-relaxed text-brand-muted">{t('contact.formIntro')}</p>
                  {isLocalDevHost ? (
                    <div className="mt-4 flex flex-col gap-2 rounded-lg border border-dashed border-border bg-surface-elevated/60 px-3 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                      <Button
                        type="button"
                        variant="secondary"
                        className="w-full shrink-0 text-xs sm:w-auto"
                        onClick={fillMockContactData}
                      >
                        {t('contact.devMockFill')}
                      </Button>
                      <p className="text-xs leading-snug text-brand-muted">{t('contact.devMockHint')}</p>
                    </div>
                  ) : null}
                  <form
                    className="mt-8 space-y-8"
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate
                  >
                    <fieldset
                      className="space-y-5 border-0 p-0"
                      aria-label={t('contact.sections.yourProject')}
                    >
                      <div>
                        <label htmlFor="topic" className={labelClass}>
                          {t('contact.fields.topic')}
                        </label>
                        <select
                          id="topic"
                          className={fieldClass(!!errors.topic)}
                          aria-invalid={errors.topic ? true : undefined}
                          aria-required
                          {...register('topic', { required: true })}
                        >
                          <option value="">{t('contact.fields.topicPlaceholder')}</option>
                          {TOPIC_KEYS.map((key) => (
                            <option key={key} value={key}>
                              {t(`contact.topics.${key}`)}
                            </option>
                          ))}
                        </select>
                        {errors.topic ? (
                          <p className="mt-1.5 text-sm text-red-600" role="alert">
                            {t('contact.errors.required')}
                          </p>
                        ) : null}
                      </div>
                      <div>
                        <label htmlFor="message" className={labelClass}>
                          {t('contact.fields.message')}
                        </label>
                        <textarea
                          id="message"
                          rows={6}
                          placeholder={t('contact.placeholders.message')}
                          className={cn(fieldClass(!!errors.message), 'min-h-[140px] resize-y')}
                          aria-invalid={errors.message ? true : undefined}
                          aria-required
                          {...register('message', { required: true })}
                        />
                        {errors.message ? (
                          <p className="mt-1.5 text-sm text-red-600" role="alert">
                            {t('contact.errors.required')}
                          </p>
                        ) : null}
                      </div>
                      <div>
                        <label htmlFor="timeline" className={labelClass}>
                          {t('contact.fields.timeline')}
                          {optional}
                        </label>
                        <select
                          id="timeline"
                          className={fieldClass(false)}
                          {...register('timeline')}
                        >
                          <option value="">{t('contact.fields.timelinePlaceholder')}</option>
                          {TIMELINE_KEYS.map((key) => (
                            <option key={key} value={key}>
                              {t(`contact.timelines.${key}`)}
                            </option>
                          ))}
                        </select>
                      </div>
                    </fieldset>

                    <fieldset className="space-y-5 border-0 p-0">
                      <legend className={cn(labelClass, 'mb-3 w-full border-b border-border pb-2')}>
                        {t('contact.sections.yourDetails')}
                      </legend>
                      <div className="grid gap-5 sm:grid-cols-2">
                        <div className="sm:col-span-2">
                          <label htmlFor="name" className={labelClass}>
                            {t('contact.fields.name')}
                          </label>
                          <input
                            id="name"
                            type="text"
                            autoComplete="name"
                            placeholder={t('contact.placeholders.name')}
                            className={fieldClass(!!errors.name)}
                            aria-invalid={errors.name ? true : undefined}
                            aria-required
                            {...register('name', { required: true })}
                          />
                          {errors.name ? (
                            <p className="mt-1.5 text-sm text-red-600" role="alert">
                              {t('contact.errors.required')}
                            </p>
                          ) : null}
                        </div>
                        <div className="sm:col-span-2">
                          <label htmlFor="email" className={labelClass}>
                            {t('contact.fields.email')}
                          </label>
                          <input
                            id="email"
                            type="email"
                            autoComplete="email"
                            placeholder={t('contact.placeholders.email')}
                            className={fieldClass(!!errors.email)}
                            aria-invalid={errors.email ? true : undefined}
                            aria-required
                            {...register('email', {
                              required: true,
                              pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            })}
                          />
                          {errors.email ? (
                            <p className="mt-1.5 text-sm text-red-600" role="alert">
                              {errors.email.type === 'required'
                                ? t('contact.errors.required')
                                : t('contact.errors.email')}
                            </p>
                          ) : null}
                        </div>
                        <div>
                          <label htmlFor="company" className={labelClass}>
                            {t('contact.fields.company')}
                            {optional}
                          </label>
                          <input
                            id="company"
                            type="text"
                            autoComplete="organization"
                            placeholder={t('contact.placeholders.company')}
                            className={fieldClass(false)}
                            {...register('company')}
                          />
                        </div>
                        <div>
                          <label htmlFor="phone" className={labelClass}>
                            {t('contact.fields.phone')}
                            {optional}
                          </label>
                          <input
                            id="phone"
                            type="tel"
                            autoComplete="tel"
                            placeholder={t('contact.placeholders.phone')}
                            className={fieldClass(false)}
                            {...register('phone')}
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <label htmlFor="website" className={labelClass}>
                            {t('contact.fields.website')}
                            {optional}
                          </label>
                          <input
                            id="website"
                            type="url"
                            autoComplete="url"
                            inputMode="url"
                            placeholder={t('contact.placeholders.website')}
                            className={fieldClass(!!errors.website)}
                            aria-invalid={errors.website ? true : undefined}
                            {...register('website', {
                              validate: (v) => {
                                const s = String(v ?? '').trim();
                                if (!s) {
                                  return true;
                                }
                                try {
                                  new URL(s.startsWith('http') ? s : `https://${s}`);
                                  return true;
                                } catch {
                                  return t('contact.errors.url');
                                }
                              },
                            })}
                          />
                          {errors.website ? (
                            <p className="mt-1.5 text-sm text-red-600" role="alert">
                              {String(errors.website.message)}
                            </p>
                          ) : null}
                        </div>
                      </div>
                    </fieldset>

                    <p className="text-xs leading-relaxed text-brand-muted">
                      {t('contact.privacyNote')}{' '}
                      <Link
                        to="/privacy"
                        className="font-medium text-brand-strong underline decoration-brand-strong/30 underline-offset-2 hover:decoration-brand-strong"
                      >
                        {t('contact.privacyLink')}
                      </Link>
                    </p>

                    <div className="flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-center">
                      <Button
                        type="submit"
                        disabled={isSubmitting || !emailJsReady}
                        className="w-full min-h-11 sm:w-auto sm:min-w-[9rem]"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2
                              className="mr-2 h-4 w-4 shrink-0 animate-spin"
                              aria-hidden
                            />
                            {t('contact.sending')}
                          </>
                        ) : (
                          t('contact.submit')
                        )}
                      </Button>
                    </div>
                  </form>
                </>
              )}
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
                  <dt className="font-medium text-brand-strong">
                    {t('contact.business.addressLabel')}
                  </dt>
                  <dd className="mt-1 text-brand-muted">
                    {t('contact.placeholdersContact.address')}
                  </dd>
                </div>
                <div>
                  <dt className="font-medium text-brand-strong">
                    {t('contact.business.emailLabel')}
                  </dt>
                  <dd className="mt-1 text-brand-muted">
                    {t('contact.placeholdersContact.email')}
                  </dd>
                </div>
              </dl>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </>
  );
}
