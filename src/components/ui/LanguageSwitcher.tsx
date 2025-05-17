
import React from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/utils/translations';

const LanguageSwitcher: React.FC = () => {
  const { language, toggleLanguage } = useLanguage();
  
  return (
    <Button 
      variant="ghost" 
      size="sm"
      onClick={toggleLanguage}
      className="font-semibold"
    >
      {t('language', language)}
    </Button>
  );
};

export default LanguageSwitcher;
