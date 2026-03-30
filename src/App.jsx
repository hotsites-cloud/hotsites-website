import { useTranslation } from 'react-i18next';
import CookieConsent from 'react-cookie-consent';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import {
  COOKIE_CONSENT_NAME,
  setAnalyticsConsent,
} from './config/cookies';
import {
  ContactPage,
  CookiePolicyPage,
  HomePage,
  ImprintPage,
  PrivacyPolicyPage,
  TermsConditionsPage,
} from './routes';

function CookieBanner() {
  const { t } = useTranslation();
  return (
    <CookieConsent
      location="bottom"
      cookieName={COOKIE_CONSENT_NAME}
      expires={365}
      buttonText={t('cookieBanner.accept')}
      declineButtonText={t('cookieBanner.decline')}
      enableDeclineButton
      onAccept={() => setAnalyticsConsent('true')}
      onDecline={() => setAnalyticsConsent('false')}
      style={{
        alignItems: 'center',
        background: 'var(--color-text-strong)',
        color: 'var(--color-on-emphasis)',
        fontSize: '0.875rem',
        padding: '1rem 1.25rem',
      }}
      buttonStyle={{
        background: 'var(--color-on-emphasis)',
        borderRadius: '0.5rem',
        color: 'var(--color-text-strong)',
        fontSize: '0.875rem',
        fontWeight: 600,
        padding: '0.5rem 1rem',
      }}
      declineButtonStyle={{
        background: 'transparent',
        border: '1px solid var(--color-on-emphasis)',
        borderRadius: '0.5rem',
        color: 'var(--color-on-emphasis)',
        fontSize: '0.875rem',
        fontWeight: 600,
        padding: '0.5rem 1rem',
      }}
      contentStyle={{ flex: '1 1 auto', margin: 0 }}
    >
      {t('cookieBanner.message')}
    </CookieConsent>
  );
}

export default function App() {
  return (
    <HashRouter>
      <CookieBanner />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
          <Route path="/terms" element={<TermsConditionsPage />} />
          <Route path="/cookies" element={<CookiePolicyPage />} />
          <Route path="/imprint" element={<ImprintPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
