
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import enCommon from './locales/en/common.json';
import arCommon from './locales/ar/common.json';
import enNavigation from './locales/en/navigation.json';
import arNavigation from './locales/ar/navigation.json';
import enDashboard from './locales/en/dashboard.json';
import arDashboard from './locales/ar/dashboard.json';

const resources = {
  en: {
    common: enCommon,
    navigation: enNavigation,
    dashboard: enDashboard,
  },
  ar: {
    common: arCommon,
    navigation: arNavigation,
    dashboard: arDashboard,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    
    interpolation: {
      escapeValue: false,
    },
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
  });

export default i18n;
