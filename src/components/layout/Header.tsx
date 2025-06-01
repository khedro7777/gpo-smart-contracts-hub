
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/utils/translations';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';
import { Menu, X, Globe, DollarSign, Clock, HeadphonesIcon } from 'lucide-react';

const Header = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState('');

  const countries = [
    { value: 'sa', label: language === 'en' ? 'Saudi Arabia' : 'السعودية', flag: '🇸🇦' },
    { value: 'ae', label: language === 'en' ? 'UAE' : 'الإمارات', flag: '🇦🇪' },
    { value: 'eg', label: language === 'en' ? 'Egypt' : 'مصر', flag: '🇪🇬' },
    { value: 'jo', label: language === 'en' ? 'Jordan' : 'الأردن', flag: '🇯🇴' },
    { value: 'kw', label: language === 'en' ? 'Kuwait' : 'الكويت', flag: '🇰🇼' },
    { value: 'qa', label: language === 'en' ? 'Qatar' : 'قطر', flag: '🇶🇦' },
    { value: 'bh', label: language === 'en' ? 'Bahrain' : 'البحرين', flag: '🇧🇭' },
    { value: 'om', label: language === 'en' ? 'Oman' : 'عُمان', flag: '🇴🇲' },
  ];

  const currencies = [
    { value: 'sar', label: 'SAR - Saudi Riyal', symbol: 'ر.س' },
    { value: 'aed', label: 'AED - UAE Dirham', symbol: 'د.إ' },
    { value: 'egp', label: 'EGP - Egyptian Pound', symbol: 'ج.م' },
    { value: 'jod', label: 'JOD - Jordanian Dinar', symbol: 'د.أ' },
    { value: 'kwd', label: 'KWD - Kuwaiti Dinar', symbol: 'د.ك' },
    { value: 'qar', label: 'QAR - Qatari Riyal', symbol: 'ر.ق' },
    { value: 'bhd', label: 'BHD - Bahraini Dinar', symbol: '.د.ب' },
    { value: 'omr', label: 'OMR - Omani Rial', symbol: 'ر.ع.' },
    { value: 'usd', label: 'USD - US Dollar', symbol: '$' },
    { value: 'eur', label: 'EUR - Euro', symbol: '€' },
  ];

  const navLinks = [
    { 
      href: '/about', 
      label: t('aboutUs', language),
      description: language === 'en' ? 'Our mission and philosophy' : 'رسالتنا وفلسفتنا'
    },
    { 
      href: '/how-it-works', 
      label: t('howItWorksPage', language),
      description: language === 'en' ? 'Smart platform overview' : 'نظرة ذكية على المنصة'
    },
    { 
      href: '/support', 
      label: t('supportHelp', language),
      description: language === 'en' ? 'Department managers, Chat bot, Tickets' : 'مدراء الأقسام، الدردشة الآلية، التذاكر'
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4">
        {/* Top bar with settings */}
        <div className="flex items-center justify-between py-2 text-sm border-b">
          <div className="flex items-center gap-4">
            {/* Logo */}
            <Link to="/" className="font-bold text-gpo-blue text-xl">
              GPO SaaS
            </Link>
          </div>
          
          <div className="hidden md:flex items-center gap-4">
            {/* Country Selector */}
            <Select value={selectedCountry} onValueChange={setSelectedCountry}>
              <SelectTrigger className="w-40">
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-gray-400" />
                  <SelectValue placeholder={t('selectCountry', language)} />
                </div>
              </SelectTrigger>
              <SelectContent>
                {countries.map(country => (
                  <SelectItem key={country.value} value={country.value}>
                    <div className="flex items-center gap-2">
                      <span>{country.flag}</span>
                      <span>{country.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Currency Selector */}
            <Select value={selectedCurrency} onValueChange={setSelectedCurrency}>
              <SelectTrigger className="w-40">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-gray-400" />
                  <SelectValue placeholder={t('selectCurrency', language)} />
                </div>
              </SelectTrigger>
              <SelectContent>
                {currencies.map(currency => (
                  <SelectItem key={currency.value} value={currency.value}>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs">{currency.symbol}</span>
                      <span>{currency.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Language Switcher */}
            <LanguageSwitcher />

            {/* Quick Support */}
            <Button variant="ghost" size="sm" className="flex items-center gap-2">
              <HeadphonesIcon className="h-4 w-4" />
              <span className="hidden lg:inline">{t('quickSupport', language)}</span>
            </Button>
          </div>
        </div>

        {/* Main navigation */}
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-8">
            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-sm hover:text-gpo-blue transition-colors group"
                >
                  <div>
                    <div className="font-medium">{link.label}</div>
                    <div className="text-xs text-gray-500 group-hover:text-gpo-blue/70">
                      {link.description}
                    </div>
                  </div>
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2">
              <Clock className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-600">
                {language === 'en' ? 'GMT+3' : 'توقيت المنطقة'}
              </span>
            </div>
            
            <Button onClick={() => navigate('/auth')} variant="outline">
              {t('login', language)}
            </Button>
            <Button onClick={() => navigate('/auth')} className="bg-gpo-blue hover:bg-gpo-blue/90">
              {t('register', language)}
            </Button>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t py-4 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="block py-2 text-sm hover:text-gpo-blue transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="font-medium">{link.label}</div>
                <div className="text-xs text-gray-500">{link.description}</div>
              </Link>
            ))}
            
            <div className="pt-4 border-t space-y-2">
              <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                <SelectTrigger>
                  <SelectValue placeholder={t('selectCountry', language)} />
                </SelectTrigger>
                <SelectContent>
                  {countries.map(country => (
                    <SelectItem key={country.value} value={country.value}>
                      {country.flag} {country.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={selectedCurrency} onValueChange={setSelectedCurrency}>
                <SelectTrigger>
                  <SelectValue placeholder={t('selectCurrency', language)} />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map(currency => (
                    <SelectItem key={currency.value} value={currency.value}>
                      {currency.symbol} {currency.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
