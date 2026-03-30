import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import nl from './locales/nl/translation.json';
import en from './locales/en/translation.json';

const STORAGE_KEY = 'hotsites_i18n_language';

function getInitialLanguage() {
  if (typeof window === 'undefined') {
    return 'nl';
  }
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === 'nl' || stored === 'en') {
      return stored;
    }
  } catch {
    // ignore
  }
  return 'nl';
}

i18n.use(initReactI18next).init({
  resources: {
    nl: { translation: nl },
    en: { translation: en },
  },
  lng: getInitialLanguage(),
  fallbackLng: 'nl',
  interpolation: {
    escapeValue: false,
  },
});

export function persistLanguage(lng) {
  try {
    window.localStorage.setItem(STORAGE_KEY, lng);
  } catch {
    // ignore
  }
}

export default i18n;
