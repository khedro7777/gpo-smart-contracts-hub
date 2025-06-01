
import { commonTranslations } from './translations/common';
import { homepageTranslations } from './translations/homepage';
import { rolesTranslations } from './translations/roles';
import { dashboardTranslations } from './translations/dashboard';
import { freelancerTranslations } from './translations/freelancer';
import { supplierTranslations } from './translations/supplier';

// Combine all translation modules
export const translations = {
  en: {
    ...commonTranslations.en,
    ...homepageTranslations.en,
    ...rolesTranslations.en,
    ...dashboardTranslations.en,
    ...freelancerTranslations.en,
    ...supplierTranslations.en,
  },
  ar: {
    ...commonTranslations.ar,
    ...homepageTranslations.ar,
    ...rolesTranslations.ar,
    ...dashboardTranslations.ar,
    ...freelancerTranslations.ar,
    ...supplierTranslations.ar,
  }
};

export const t = (key: keyof typeof translations.en, lang: 'en' | 'ar') => {
  return translations[lang][key] || key;
};
