import { lazy } from 'react';

export const HomePage = lazy(() => import('./pages/Home.jsx'));
export const AboutPage = lazy(() => import('./pages/About.jsx'));
export const ServicesPage = lazy(() => import('./pages/Services.jsx'));
export const ContactPage = lazy(() => import('./pages/Contact.jsx'));
export const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicy.jsx'));
export const TermsConditionsPage = lazy(() => import('./pages/TermsConditions.jsx'));
export const CookiePolicyPage = lazy(() => import('./pages/CookiePolicy.jsx'));
export const ImprintPage = lazy(() => import('./pages/Imprint.jsx'));
