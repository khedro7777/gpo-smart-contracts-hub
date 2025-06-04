
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { 
  Globe, 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram,
  ArrowRight
} from 'lucide-react';

const Footer = () => {
  const { language, direction } = useLanguage();

  const footerSections = [
    {
      title: language === 'en' ? 'Platform' : 'المنصة',
      links: [
        { href: '/about', label: language === 'en' ? 'About Us' : 'من نحن' },
        { href: '/how-it-works', label: language === 'en' ? 'How It Works' : 'كيف تعمل' },
        { href: '/workspace', label: language === 'en' ? 'Workspace' : 'مساحة العمل' },
        { href: '/services/arbitration', label: language === 'en' ? 'Arbitration' : 'التحكيم' },
      ]
    },
    {
      title: language === 'en' ? 'Services' : 'الخدمات',
      links: [
        { href: '/dashboard/client/groups', label: language === 'en' ? 'Group Buying' : 'الشراء التعاوني' },
        { href: '/services/company-incorporation', label: language === 'en' ? 'Company Formation' : 'تأسيس الشركات' },
        { href: '/dashboard/freelancer-management', label: language === 'en' ? 'Freelancers' : 'المستقلون' },
        { href: '/dashboard/supplier', label: language === 'en' ? 'Suppliers' : 'الموردون' },
      ]
    },
    {
      title: language === 'en' ? 'Legal & Compliance' : 'القانونية والامتثال',
      links: [
        { href: '/legal/privacy', label: language === 'en' ? 'Privacy Policy' : 'سياسة الخصوصية' },
        { href: '/legal/terms', label: language === 'en' ? 'Terms of Service' : 'شروط الخدمة' },
        { href: '/legal/compliance', label: language === 'en' ? 'Compliance' : 'الامتثال' },
        { href: '/legal/cookies', label: language === 'en' ? 'Cookie Policy' : 'سياسة ملفات تعريف الارتباط' },
      ]
    },
    {
      title: language === 'en' ? 'Support' : 'الدعم',
      links: [
        { href: '/support/help', label: language === 'en' ? 'Help Center' : 'مركز المساعدة' },
        { href: '/support/contact', label: language === 'en' ? 'Contact Us' : 'اتصل بنا' },
        { href: '/support/documentation', label: language === 'en' ? 'Documentation' : 'التوثيق' },
        { href: '/support/api', label: language === 'en' ? 'API Reference' : 'مرجع API' },
      ]
    }
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Instagram, href: '#', label: 'Instagram' },
  ];

  const offices = [
    {
      city: language === 'en' ? 'Riyadh' : 'الرياض',
      country: language === 'en' ? 'Saudi Arabia' : 'السعودية',
      address: language === 'en' ? 'King Fahd Road, Olaya District' : 'طريق الملك فهد، حي العليا',
      phone: '+966 11 123 4567'
    },
    {
      city: language === 'en' ? 'Dubai' : 'دبي',
      country: language === 'en' ? 'UAE' : 'الإمارات',
      address: language === 'en' ? 'Sheikh Zayed Road, DIFC' : 'شارع الشيخ زايد، مركز دبي المالي',
      phone: '+971 4 123 4567'
    },
    {
      city: language === 'en' ? 'Cairo' : 'القاهرة',
      country: language === 'en' ? 'Egypt' : 'مصر',
      address: language === 'en' ? 'New Cairo, Fifth Settlement' : 'القاهرة الجديدة، التجمع الخامس',
      phone: '+20 2 123 4567'
    }
  ];

  return (
    <footer className={`bg-gray-900 text-white ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
      {/* Newsletter Section */}
      <div className="border-b border-gray-800">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">
              {language === 'en' 
                ? 'Stay Updated with GPO Platform' 
                : 'ابق على اطلاع مع منصة GPO'
              }
            </h3>
            <p className="text-gray-400 mb-6">
              {language === 'en' 
                ? 'Get the latest updates on international business opportunities and platform features'
                : 'احصل على آخر التحديثات حول الفرص التجارية الدولية وميزات المنصة'
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input 
                type="email" 
                placeholder={language === 'en' ? 'Enter your email' : 'أدخل بريدك الإلكتروني'}
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
              />
              <Button className="bg-gpo-blue hover:bg-gpo-blue/90">
                {language === 'en' ? 'Subscribe' : 'اشترك'}
                <ArrowRight className={`h-4 w-4 ${direction === 'rtl' ? 'mr-2 rotate-180' : 'ml-2'}`} />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">GPO</span>
              </div>
              <span className="font-bold text-xl">GPO Platform</span>
            </div>
            <p className="text-gray-400 mb-6 text-sm leading-relaxed">
              {language === 'en' 
                ? 'Professional business collaboration platform built on Harvard Business School methodologies and international trade standards.'
                : 'منصة تعاون الأعمال المهنية المبنية على منهجيات كلية هارفارد للأعمال ومعايير التجارة الدولية.'
              }
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social, index) => (
                <a 
                  key={index}
                  href={social.href}
                  className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gpo-blue transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h4 className="font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link 
                      to={link.href}
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="bg-gray-800 mb-8" />

        {/* Office Locations */}
        <div className="mb-8">
          <h4 className="font-semibold mb-6 text-center">
            {language === 'en' ? 'Global Offices' : 'المكاتب العالمية'}
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {offices.map((office, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-2">
                  <MapPin className="h-5 w-5 text-gpo-blue" />
                </div>
                <h5 className="font-medium text-white">{office.city}, {office.country}</h5>
                <p className="text-gray-400 text-sm mb-1">{office.address}</p>
                <p className="text-gray-400 text-sm">{office.phone}</p>
              </div>
            ))}
          </div>
        </div>

        <Separator className="bg-gray-800 mb-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-6 text-sm text-gray-400">
            <span>
              © 2024 GPO Platform. {language === 'en' ? 'All rights reserved.' : 'جميع الحقوق محفوظة.'}
            </span>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Globe className="h-4 w-4" />
                <span>{language === 'en' ? 'Global Reach' : 'نطاق عالمي'}</span>
              </div>
              <div className="flex items-center gap-1">
                <Mail className="h-4 w-4" />
                <span>info@gpoplatform.com</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <span>
              {language === 'en' ? 'Powered by' : 'مدعوم بواسطة'}
            </span>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-white">Harvard Business</span>
              <span>•</span>
              <span className="font-semibold text-white">ISO 44001</span>
              <span>•</span>
              <span className="font-semibold text-white">WTO Standards</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
