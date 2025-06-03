import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/utils/translations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ServiceCard from '@/components/ServiceCard';
import WorkflowDiagram from '@/components/WorkflowDiagram';
import GPOMachine from '@/components/GPOMachine';
import OpenOffersSection from '@/components/OpenOffersSection';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Globe, DollarSign, Clock, Building2, Scale, FileText } from 'lucide-react';

const Index = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [searchFilters, setSearchFilters] = useState({
    gateway: '',
    country: '',
    sector: '',
    status: ''
  });
  
  const services = [
    {
      id: 'groupBuying',
      title: t('groupBuying', language),
      description: t('groupBuyingDesc', language),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-users"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
      ),
      action: () => navigate('/role-select')
    },
    {
      id: 'cooperativeMarketing',
      title: t('cooperativeMarketing', language),
      description: t('cooperativeMarketingDesc', language),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-megaphone"><path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/></svg>
      ),
      action: () => navigate('/role-select')
    },
    {
      id: 'freelancers',
      title: t('freelancers', language),
      description: t('freelancersDesc', language),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
      ),
      action: () => navigate('/role-select')
    },
    {
      id: 'suppliers',
      title: t('suppliers', language),
      description: t('suppliersDesc', language),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-package"><path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>
      ),
      action: () => navigate('/role-select')
    },
    {
      id: 'companyIncorporation',
      title: language === 'en' ? 'Company Incorporation' : 'تأسيس الشركات',
      description: language === 'en' 
        ? 'Establish your company in Egypt, UK, USA, UAE, or Saudi Arabia with expert guidance'
        : 'أسس شركتك في مصر أو المملكة المتحدة أو الولايات المتحدة أو الإمارات أو السعودية مع إرشاد الخبراء',
      icon: <Building2 className="w-9 h-9" />,
      action: () => navigate('/services/company-incorporation')
    },
    {
      id: 'commercialArbitration',
      title: language === 'en' ? 'Commercial Arbitration (ORDA)' : 'التحكيم التجاري (ORDA)',
      description: language === 'en' 
        ? 'Resolve business disputes through our advanced online dispute resolution system'
        : 'حل النزاعات التجارية من خلال نظام حل النزاعات الإلكتروني المتقدم',
      icon: <Scale className="w-9 h-9" />,
      action: () => navigate('/services/arbitration')
    },
    {
      id: 'contractDocumentation',
      title: language === 'en' ? 'Contract Documentation' : 'توثيق العقود',
      description: language === 'en' 
        ? 'Upload, sign, and store contracts securely with blockchain verification'
        : 'ارفع ووقع واحفظ العقود بأمان مع التحقق بتقنية البلوك تشين',
      icon: <FileText className="w-9 h-9" />,
      action: () => navigate('/services/contract-documentation')
    }
  ];

  const workflowSteps = [
    { id: 'verification', label: t('verification', language) },
    { id: 'registration', label: t('registration', language) },
    { id: 'verificationInvoice', label: t('verificationInvoice', language) },
    { id: 'adminPanel', label: t('adminPanel', language) },
    { id: 'serviceSelection', label: t('serviceSelection', language) },
    { id: 'contract', label: t('contract', language) },
  ];

  const countries = [
    { value: 'all', label: language === 'en' ? 'All Countries' : 'كل البلدان' },
    { value: 'sa', label: language === 'en' ? 'Saudi Arabia' : 'السعودية' },
    { value: 'ae', label: language === 'en' ? 'UAE' : 'الإمارات' },
    { value: 'eg', label: language === 'en' ? 'Egypt' : 'مصر' },
    { value: 'jo', label: language === 'en' ? 'Jordan' : 'الأردن' },
  ];

  const sectors = [
    { value: 'all', label: language === 'en' ? 'All Sectors' : 'كل القطاعات' },
    { value: 'tech', label: language === 'en' ? 'Technology' : 'التكنولوجيا' },
    { value: 'health', label: language === 'en' ? 'Healthcare' : 'الرعاية الصحية' },
    { value: 'food', label: language === 'en' ? 'Food & Agriculture' : 'الغذاء والزراعة' },
    { value: 'construction', label: language === 'en' ? 'Construction' : 'البناء' },
  ];

  const statusOptions = [
    { value: 'all', label: language === 'en' ? 'All Status' : 'كل الحالات' },
    { value: 'active', label: language === 'en' ? 'Active' : 'نشط' },
    { value: 'voting', label: language === 'en' ? 'Voting' : 'تصويت' },
    { value: 'negotiation', label: language === 'en' ? 'Negotiation' : 'تفاوض' },
  ];
  
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gpo-lightBlue to-white py-12 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-6 md:mb-8">
            <img 
              src="/api/placeholder/600/300" 
              alt="GPO Platform" 
              className="mx-auto mb-4 md:mb-6 rounded-lg shadow-lg max-w-full h-auto"
            />
          </div>
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-gpo-blue mb-4 md:mb-6 px-2">
            {t('tagline', language)}
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-gray-700 mb-6 md:mb-8 px-4">
            {language === 'en' 
              ? 'Smart contracting platform between buyers, suppliers, and freelancers'
              : 'منصة التعاقد الذكي بين المشترين والموردين والمستقلين'
            }
          </p>
          <Button size="lg" onClick={() => navigate('/auth')} className="px-6 py-3 text-base md:text-lg">
            {t('getStarted', language)}
          </Button>
        </div>
      </section>
      
      {/* Main Services */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12 px-2">
            {t('ourServices', language)}
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            {services.map((service) => (
              <div key={service.id} className="w-full">
                <ServiceCard
                  id={service.id}
                  title={service.title}
                  description={service.description}
                  icon={service.icon}
                  action={service.action}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* How It Works */}
      <section className="py-12 md:py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12 px-2">
            {t('howItWorks', language)}
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            <WorkflowDiagram 
              title={t('standardWorkflow', language)}
              steps={workflowSteps}
            />
            
            <WorkflowDiagram 
              title={t('groupBuyingWorkflow', language)}
              steps={[
                { id: 'verification', label: t('verification', language) },
                { id: 'groupBuying', label: t('groupBuying', language) },
                { id: 'serviceSelection', label: t('serviceSelection', language) },
                { id: 'verificationInvoice', label: t('verificationInvoice', language) },
                { id: 'contract', label: t('contract', language) },
                { id: 'registration', label: t('registration', language) },
              ]}
            />
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-6 md:py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <h3 className="text-lg md:text-xl font-semibold mb-4 px-2">{t('searchFilters', language)}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 md:gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input 
                placeholder={language === 'en' ? 'Search groups...' : 'البحث في المجموعات...'}
                className="pl-10 text-sm"
              />
            </div>
            <Select value={searchFilters.gateway} onValueChange={(value) => setSearchFilters({...searchFilters, gateway: value})}>
              <SelectTrigger className="text-sm">
                <SelectValue placeholder={t('selectGateway', language)} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{language === 'en' ? 'All Gateways' : 'كل البوابات'}</SelectItem>
                <SelectItem value="buying">{t('groupBuying', language)}</SelectItem>
                <SelectItem value="marketing">{t('cooperativeMarketing', language)}</SelectItem>
                <SelectItem value="freelance">{t('freelancers', language)}</SelectItem>
                <SelectItem value="supplier">{t('suppliers', language)}</SelectItem>
              </SelectContent>
            </Select>
            <Select value={searchFilters.country} onValueChange={(value) => setSearchFilters({...searchFilters, country: value})}>
              <SelectTrigger className="text-sm">
                <SelectValue placeholder={t('filterByCountry', language)} />
              </SelectTrigger>
              <SelectContent>
                {countries.map(country => (
                  <SelectItem key={country.value} value={country.value}>{country.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={searchFilters.sector} onValueChange={(value) => setSearchFilters({...searchFilters, sector: value})}>
              <SelectTrigger className="text-sm">
                <SelectValue placeholder={t('filterBySector', language)} />
              </SelectTrigger>
              <SelectContent>
                {sectors.map(sector => (
                  <SelectItem key={sector.value} value={sector.value}>{sector.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={searchFilters.status} onValueChange={(value) => setSearchFilters({...searchFilters, status: value})}>
              <SelectTrigger className="text-sm">
                <SelectValue placeholder={t('filterByStatus', language)} />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map(status => (
                  <SelectItem key={status.value} value={status.value}>{status.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Open Offers Section */}
      <OpenOffersSection />

      <GPOMachine />
    </Layout>
  );
};

export default Index;
