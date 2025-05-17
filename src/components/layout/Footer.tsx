
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/utils/translations';

const Footer: React.FC = () => {
  const { language } = useLanguage();
  
  return (
    <footer className="bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link to="/" className="text-xl font-bold text-gpo-blue mb-4 block">
              GPO
            </Link>
            <p className="text-gray-600">
              {language === 'en' 
                ? 'Smart Contracts & Negotiation Platform'
                : 'منصة التفاوض والعقود الذكية'}
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">{t('about', language)}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-600 hover:text-gpo-blue transition-colors">
                  {t('about', language)}
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-gray-600 hover:text-gpo-blue transition-colors">
                  {t('howItWorks', language)}
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">{t('dashboard', language)}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/dashboard/client" className="text-gray-600 hover:text-gpo-blue transition-colors">
                  {t('client', language)}
                </Link>
              </li>
              <li>
                <Link to="/dashboard/freelancer" className="text-gray-600 hover:text-gpo-blue transition-colors">
                  {t('freelancer', language)}
                </Link>
              </li>
              <li>
                <Link to="/dashboard/supplier" className="text-gray-600 hover:text-gpo-blue transition-colors">
                  {t('supplier', language)}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-6 text-center">
          <p className="text-gray-500">
            © {new Date().getFullYear()} GPO. {language === 'en' ? 'All rights reserved.' : 'جميع الحقوق محفوظة.'}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
