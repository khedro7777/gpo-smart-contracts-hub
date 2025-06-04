
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

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

export const useCountries = () => {
  return useQuery({
    queryKey: ['countries'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('countries')
        .select('*')
        .eq('active', true)
        .order('name_en');
      
      if (error) throw error;
      return data as Country[];
    },
  });
};

export const useCurrencies = () => {
  return useQuery({
    queryKey: ['currencies'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('currencies')
        .select('*')
        .order('code');
      
      if (error) throw error;
      return data as Currency[];
    },
  });
};

export const useLanguages = () => {
  return useQuery({
    queryKey: ['languages'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('languages')
        .select('*')
        .eq('active', true)
        .order('name_en');
      
      if (error) throw error;
      return data as Language[];
    },
  });
};
