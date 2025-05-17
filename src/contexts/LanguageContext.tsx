
import React, { createContext, useState, useContext, useEffect } from 'react';

type LanguageContextType = {
  language: 'ar' | 'en';
  direction: 'rtl' | 'ltr';
  toggleLanguage: () => void;
  setLanguage: (lang: 'ar' | 'en') => void;
};

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  direction: 'ltr',
  toggleLanguage: () => {},
  setLanguage: () => {},
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<'ar' | 'en'>('en');
  const direction = language === 'ar' ? 'rtl' : 'ltr';

  const toggleLanguage = () => {
    setLanguageState((prevLang) => (prevLang === 'ar' ? 'en' : 'ar'));
  };

  const setLanguage = (lang: 'ar' | 'en') => {
    setLanguageState(lang);
  };

  useEffect(() => {
    // Apply direction and language to HTML element
    document.documentElement.setAttribute('dir', direction);
    document.documentElement.setAttribute('lang', language);
  }, [direction, language]);

  return (
    <LanguageContext.Provider value={{ language, direction, toggleLanguage, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
