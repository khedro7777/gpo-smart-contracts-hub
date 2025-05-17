
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/utils/translations';
import LanguageSwitcher from '../ui/LanguageSwitcher';
import { Button } from '@/components/ui/button';

const Header: React.FC = () => {
  const { language } = useLanguage();
  
  return (
    <header className="bg-white shadow-sm py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-bold text-gpo-blue">
            GPO
          </Link>
        </div>
        
        <nav className={`hidden md:flex items-center gap-6 ${language === 'ar' ? 'mr-10' : 'ml-10'}`}>
          <Link to="/" className="text-gray-700 hover:text-gpo-blue transition-colors">
            {t('home', language)}
          </Link>
          <Link to="/about" className="text-gray-700 hover:text-gpo-blue transition-colors">
            {t('about', language)}
          </Link>
          <Link to="/how-it-works" className="text-gray-700 hover:text-gpo-blue transition-colors">
            {t('howItWorks', language)}
          </Link>
        </nav>
        
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <div className="hidden md:flex items-center gap-2">
            <Link to="/login">
              <Button variant="outline">
                {t('login', language)}
              </Button>
            </Link>
            <Link to="/register">
              <Button>
                {t('register', language)}
              </Button>
            </Link>
          </div>
          <Button variant="ghost" className="md:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
