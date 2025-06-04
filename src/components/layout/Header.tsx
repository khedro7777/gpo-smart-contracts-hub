
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/utils/translations';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';
import { 
  Menu, 
  X, 
  Globe, 
  DollarSign, 
  Clock, 
  HeadphonesIcon,
  Moon,
  Sun,
  Bell,
  User,
  Settings
} from 'lucide-react';

const Header = () => {
  const { language, direction } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('sa');
  const [selectedCurrency, setSelectedCurrency] = useState('sar');

  const countries = [
    { value: 'sa', label: language === 'en' ? 'Saudi Arabia' : 'السعودية', flag: '🇸🇦', timezone: 'GMT+3' },
    { value: 'ae', label: language === 'en' ? 'UAE' : 'الإمارات', flag: '🇦🇪', timezone: 'GMT+4' },
    { value: 'eg', label: language === 'en' ? 'Egypt' : 'مصر', flag: '🇪🇬', timezone: 'GMT+2' },
    { value: 'us', label: language === 'en' ? 'United States' : 'الولايات المتحدة', flag: '🇺🇸', timezone: 'GMT-5' },
    { value: 'gb', label: language === 'en' ? 'United Kingdom' : 'المملكة المتحدة', flag: '🇬🇧', timezone: 'GMT+0' },
    { value: 'ee', label: language === 'en' ? 'Estonia' : 'إستونيا', flag: '🇪🇪', timezone: 'GMT+2' },
    { value: 'jo', label: language === 'en' ? 'Jordan' : 'الأردن', flag: '🇯🇴', timezone: 'GMT+3' },
  ];

  const currencies = [
    { value: 'sar', label: 'SAR', symbol: 'ر.س', name: 'Saudi Riyal' },
    { value: 'aed', label: 'AED', symbol: 'د.إ', name: 'UAE Dirham' },
    { value: 'egp', label: 'EGP', symbol: 'ج.م', name: 'Egyptian Pound' },
    { value: 'usd', label: 'USD', symbol: '$', name: 'US Dollar' },
    { value: 'gbp', label: 'GBP', symbol: '£', name: 'British Pound' },
    { value: 'eur', label: 'EUR', symbol: '€', name: 'Euro' },
    { value: 'jod', label: 'JOD', symbol: 'د.أ', name: 'Jordanian Dinar' },
  ];

  const currentCountry = countries.find(c => c.value === selectedCountry);
  const currentCurrency = currencies.find(c => c.value === selectedCurrency);
  const currentTime = new Date().toLocaleTimeString('en-US', { 
    timeZone: 'Asia/Riyadh',
    hour12: false,
    hour: '2-digit',
    minute: '2-digit'
  });

  const navigationItems = [
    {
      href: '/about',
      label: language === 'en' ? 'About Us' : 'من نحن',
    },
    {
      href: '/how-it-works',
      label: language === 'en' ? 'How It Works' : 'كيف تعمل',
    },
    {
      href: '/workspace',
      label: language === 'en' ? 'Workspace' : 'مساحة العمل',
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:bg-gray-900/95">
      <div className="container mx-auto px-4">
        {/* Top Control Bar */}
        <div className="flex items-center justify-between py-2 text-sm border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-4">
            {/* Brand */}
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">GPO</span>
              </div>
              <span className="font-bold text-gpo-blue text-lg">GPO Platform</span>
            </Link>
            
            {/* Status Badge */}
            <Badge variant="outline" className="hidden md:flex items-center gap-1 text-green-600 border-green-200">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              {language === 'en' ? 'Live' : 'مباشر'}
            </Badge>
          </div>
          
          <div className="hidden lg:flex items-center gap-4">
            {/* Country Selector */}
            <Select value={selectedCountry} onValueChange={setSelectedCountry}>
              <SelectTrigger className="w-40 h-8">
                <div className="flex items-center gap-2">
                  <Globe className="h-3 w-3 text-gray-400" />
                  <span className="text-xs">{currentCountry?.flag} {currentCountry?.label}</span>
                </div>
              </SelectTrigger>
              <SelectContent>
                {countries.map(country => (
                  <SelectItem key={country.value} value={country.value}>
                    <div className="flex items-center gap-2">
                      <span>{country.flag}</span>
                      <span>{country.label}</span>
                      <span className="text-xs text-gray-500">{country.timezone}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Currency Selector */}
            <Select value={selectedCurrency} onValueChange={setSelectedCurrency}>
              <SelectTrigger className="w-32 h-8">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-3 w-3 text-gray-400" />
                  <span className="text-xs">{currentCurrency?.symbol} {currentCurrency?.label}</span>
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

            {/* Time Display */}
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <Clock className="h-3 w-3" />
              <span>{currentTime} {currentCountry?.timezone}</span>
            </div>

            {/* Language & Theme */}
            <div className="flex items-center gap-2">
              <LanguageSwitcher />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="h-8 w-8 p-0"
              >
                {isDarkMode ? <Sun className="h-3 w-3" /> : <Moon className="h-3 w-3" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="flex items-center justify-between py-4">
          <nav className="hidden md:flex items-center gap-8">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="text-sm font-medium hover:text-gpo-blue transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {/* Quick Support */}
            <Button variant="ghost" size="sm" className="hidden lg:flex items-center gap-2 h-8">
              <HeadphonesIcon className="h-3 w-3" />
              <span className="text-xs">{t('quickSupport', language)}</span>
            </Button>

            {/* Notifications */}
            <Button variant="ghost" size="sm" className="relative h-8 w-8 p-0">
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center">
                3
              </span>
            </Button>

            {/* User Menu */}
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <User className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Settings className="h-4 w-4" />
              </Button>
            </div>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center gap-2">
              <Link to="/auth">
                <Button variant="outline" size="sm" className="h-8 text-xs">
                  {t('login', language)}
                </Button>
              </Link>
              <Link to="/auth">
                <Button size="sm" className="h-8 text-xs bg-gpo-blue hover:bg-gpo-blue/90">
                  {t('register', language)}
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden h-8 w-8 p-0"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4 space-y-4">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="block py-2 text-sm hover:text-gpo-blue transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            
            <div className="pt-4 border-t border-gray-200 space-y-3">
              <div className="flex items-center gap-3">
                <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                  <SelectTrigger className="flex-1">
                    <SelectValue />
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
                  <SelectTrigger className="flex-1">
                    <SelectValue />
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
              
              <div className="flex gap-2">
                <Link to="/auth" className="flex-1">
                  <Button variant="outline" size="sm" className="w-full">
                    {t('login', language)}
                  </Button>
                </Link>
                <Link to="/auth" className="flex-1">
                  <Button size="sm" className="w-full bg-gpo-blue hover:bg-gpo-blue/90">
                    {t('register', language)}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
