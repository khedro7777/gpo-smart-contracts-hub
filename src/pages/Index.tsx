
import React from 'react';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/utils/translations';
import { Button } from '@/components/ui/button';
import ServiceCard from '@/components/ServiceCard';
import WorkflowDiagram from '@/components/WorkflowDiagram';
import GPOMachine from '@/components/GPOMachine';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  
  const services = [
    {
      id: 'groupBuying',
      title: t('groupBuying', language),
      description: language === 'en' 
        ? 'Join forces with others for better deals and shared benefits.'
        : 'انضم إلى الآخرين للحصول على صفقات أفضل ومنافع مشتركة.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-users"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
      ),
      action: () => navigate('/role-select')
    },
    {
      id: 'soloContracting',
      title: t('soloContracting', language),
      description: language === 'en' 
        ? 'Direct contracting with freelancers and service providers.'
        : 'تعاقد مباشر مع المستقلين ومقدمي الخدمات.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
      ),
      action: () => navigate('/role-select')
    },
    {
      id: 'suppliers',
      title: t('suppliers', language),
      description: language === 'en' 
        ? 'Find quality suppliers or offer your products and services.'
        : 'ابحث عن موردين ذو جودة عالية أو اعرض منتجاتك وخدماتك.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-package"><path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>
      ),
      action: () => navigate('/role-select')
    },
    {
      id: 'arbitration',
      title: t('arbitration', language),
      description: language === 'en' 
        ? 'Resolve disputes with our fair and transparent system.'
        : 'حل النزاعات من خلال نظامنا العادل والشفاف.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-scale"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/></svg>
      ),
      action: () => navigate('/role-select')
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
  
  return (
    <Layout>
      <section className="bg-gradient-to-b from-gpo-lightBlue to-white py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gpo-blue mb-6">
            {t('welcome', language)}
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8">
            {t('tagline', language)}
          </p>
          <Button size="lg" onClick={() => navigate('/role-select')}>
            {t('getStarted', language)}
          </Button>
        </div>
      </section>
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            {language === 'en' ? 'Our Services' : 'خدماتنا'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service) => (
              <ServiceCard
                key={service.id}
                id={service.id}
                title={service.title}
                description={service.description}
                icon={service.icon}
                action={service.action}
              />
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            {language === 'en' ? 'How It Works' : 'كيف تعمل المنصة؟'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <WorkflowDiagram 
              title={language === 'en' ? 'Standard Workflow' : 'سير العمل القياسي'}
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

      <GPOMachine />
    </Layout>
  );
};

export default Index;
