import { commonTranslations } from './translations/common';
import { homepageTranslations } from './translations/homepage';
import { rolesTranslations } from './translations/roles';
import { dashboardTranslations } from './translations/dashboard';
import { freelancerTranslations } from './translations/freelancer';
import { supplierTranslations } from './translations/supplier';
import { authTranslations } from './translations/auth';
import { groupsTranslations } from './translations/groups';
import { votingTranslations } from './translations/voting';
import { offersTranslations } from './translations/offers';
import { arbitrationTranslations } from './translations/arbitration';
import { mcpTranslations } from './translations/mcp';
import { chatbotTranslations } from './translations/chatbot';
import { contractsTranslations } from './translations/contracts';
import { suppliersTranslations } from './translations/suppliers';

// Combine all translation modules
export const translations = {
  en: {
    ...commonTranslations.en,
    ...homepageTranslations.en,
    ...rolesTranslations.en,
    ...dashboardTranslations.en,
    ...freelancerTranslations.en,
    ...supplierTranslations.en,
    ...authTranslations.en,
    ...groupsTranslations.en,
    ...votingTranslations.en,
    ...offersTranslations.en,
    ...arbitrationTranslations.en,
    ...mcpTranslations.en,
    ...chatbotTranslations.en,
    ...contractsTranslations.en,
    ...suppliersTranslations.en,
  },
  ar: {
    ...commonTranslations.ar,
    ...homepageTranslations.ar,
    ...rolesTranslations.ar,
    ...dashboardTranslations.ar,
    ...freelancerTranslations.ar,
    ...supplierTranslations.ar,
    ...authTranslations.ar,
    ...groupsTranslations.ar,
    ...votingTranslations.ar,
    ...offersTranslations.ar,
    ...arbitrationTranslations.ar,
    ...mcpTranslations.ar,
    ...chatbotTranslations.ar,
    ...contractsTranslations.ar,
    ...suppliersTranslations.ar,
  }
};

export const t = (key: keyof typeof translations.en, lang: 'en' | 'ar') => {
  return translations[lang][key] || key;
};
