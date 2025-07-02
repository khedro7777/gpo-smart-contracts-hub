
// ============================================
// 🌍 COUNTRIES, CURRENCIES & LANGUAGES DATA HOOK
// ============================================
// Purpose: Provides static data for countries, currencies, and languages
// Used in: Header components, forms, internationalization
// Note: Using static data until database tables are created
// Location: Global utility hook for international support
// ============================================

import { useQuery } from '@tanstack/react-query';

// ============================================
// 📊 TYPE DEFINITIONS
// ============================================

export interface Country {
  id: string;
  code: string;
  name_en: string;
  name_ar: string;
  currency_code: string;
  timezone: string;
  flag_emoji: string;
  active: boolean;
}

export interface Currency {
  id: string;
  code: string;
  name_en: string;
  name_ar: string;
  symbol: string;
  exchange_rate: number;
}

export interface Language {
  id: string;
  code: string;
  name_en: string;
  name_native: string;
  direction: 'ltr' | 'rtl';
  active: boolean;
}

// ============================================
// 🌍 STATIC DATA (until database integration)
// ============================================

const COUNTRIES_DATA: Country[] = [
  {
    id: '1',
    code: 'US',
    name_en: 'United States',
    name_ar: 'الولايات المتحدة',
    currency_code: 'USD',
    timezone: 'America/New_York',
    flag_emoji: '🇺🇸',
    active: true
  },
  {
    id: '2',
    code: 'SA',
    name_en: 'Saudi Arabia',
    name_ar: 'المملكة العربية السعودية',
    currency_code: 'SAR',
    timezone: 'Asia/Riyadh',
    flag_emoji: '🇸🇦',
    active: true
  },
  {
    id: '3',
    code: 'AE',
    name_en: 'United Arab Emirates',
    name_ar: 'الإمارات العربية المتحدة',
    currency_code: 'AED',
    timezone: 'Asia/Dubai',
    flag_emoji: '🇦🇪',
    active: true
  }
];

const CURRENCIES_DATA: Currency[] = [
  {
    id: '1',
    code: 'USD',
    name_en: 'US Dollar',
    name_ar: 'دولار أمريكي',
    symbol: '$',
    exchange_rate: 1.0
  },
  {
    id: '2',
    code: 'SAR',
    name_en: 'Saudi Riyal',
    name_ar: 'ريال سعودي',
    symbol: '﷼',
    exchange_rate: 3.75
  },
  {
    id: '3',
    code: 'AED',
    name_en: 'UAE Dirham',
    name_ar: 'درهم إماراتي',
    symbol: 'د.إ',
    exchange_rate: 3.67
  }
];

const LANGUAGES_DATA: Language[] = [
  {
    id: '1',
    code: 'en',
    name_en: 'English',
    name_native: 'English',
    direction: 'ltr',
    active: true
  },
  {
    id: '2',
    code: 'ar',
    name_en: 'Arabic',
    name_native: 'العربية',
    direction: 'rtl',
    active: true
  },
  {
    id: '3',
    code: 'fr',
    name_en: 'French',
    name_native: 'Français',
    direction: 'ltr',
    active: true
  }
];

// ============================================
// 🎣 CUSTOM HOOKS
// ============================================

/**
 * Hook for fetching countries data
 * Returns: Query object with countries data
 * Used in: Country selection dropdowns
 */
export const useCountries = () => {
  return useQuery({
    queryKey: ['countries'],
    queryFn: async () => {
      // Simulate API call - replace with supabase call when database is ready
      return new Promise<Country[]>((resolve) => {
        setTimeout(() => resolve(COUNTRIES_DATA), 100);
      });
    },
  });
};

/**
 * Hook for fetching currencies data  
 * Returns: Query object with currencies data
 * Used in: Currency selection, pricing displays
 */
export const useCurrencies = () => {
  return useQuery({
    queryKey: ['currencies'],
    queryFn: async () => {
      // Simulate API call - replace with supabase call when database is ready
      return new Promise<Currency[]>((resolve) => {
        setTimeout(() => resolve(CURRENCIES_DATA), 100);
      });
    },
  });
};

/**
 * Hook for fetching languages data
 * Returns: Query object with languages data  
 * Used in: Language selection, i18n configuration
 */
export const useLanguages = () => {
  return useQuery({
    queryKey: ['languages'],
    queryFn: async () => {
      // Simulate API call - replace with supabase call when database is ready
      return new Promise<Language[]>((resolve) => {
        setTimeout(() => resolve(LANGUAGES_DATA), 100);
      });
    },
  });
};
