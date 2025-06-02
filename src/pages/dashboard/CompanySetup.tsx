
import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from '@/contexts/LanguageContext';
import { Building2, FileText, Shield, CreditCard } from 'lucide-react';
import ProgressIndicator from '@/components/company-setup/ProgressIndicator';
import CompanyInfoStep from '@/components/company-setup/CompanyInfoStep';
import LegalDocumentsStep from '@/components/company-setup/LegalDocumentsStep';
import VerificationStep from '@/components/company-setup/VerificationStep';
import PaymentSetupStep from '@/components/company-setup/PaymentSetupStep';
import StepNavigation from '@/components/company-setup/StepNavigation';

const CompanySetup = () => {
  const { language } = useLanguage();
  const [currentStep, setCurrentStep] = useState(1);
  const [companyForm, setCompanyForm] = useState({
    name: '',
    type: '',
    country: '',
    industry: '',
    size: '',
    description: '',
    website: '',
    phone: '',
    email: '',
    address: ''
  });

  const steps = [
    { id: 1, title: language === 'en' ? 'Company Info' : 'معلومات الشركة', icon: Building2 },
    { id: 2, title: language === 'en' ? 'Legal Documents' : 'الوثائق القانونية', icon: FileText },
    { id: 3, title: language === 'en' ? 'Verification' : 'التحقق', icon: Shield },
    { id: 4, title: language === 'en' ? 'Payment Setup' : 'إعداد الدفع', icon: CreditCard }
  ];

  const handleNext = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const handlePrevious = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <CompanyInfoStep companyForm={companyForm} setCompanyForm={setCompanyForm} language={language} />;
      case 2:
        return <LegalDocumentsStep language={language} />;
      case 3:
        return <VerificationStep language={language} />;
      case 4:
        return <PaymentSetupStep language={language} />;
      default:
        return null;
    }
  };

  return (
    <DashboardLayout role="supplier">
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Building2 className="h-8 w-8 text-blue-600" />
          <div>
            <h1 className="text-3xl font-bold">
              {language === 'en' ? 'Company Setup Gateway' : 'بوابة تأسيس الشركات'}
            </h1>
            <p className="text-gray-600">
              {language === 'en' 
                ? 'Complete your company registration and verification process'
                : 'أكمل عملية تسجيل شركتك والتحقق منها'
              }
            </p>
          </div>
        </div>

        <ProgressIndicator steps={steps} currentStep={currentStep} />

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {React.createElement(steps[currentStep - 1].icon, { className: "h-6 w-6" })}
              {steps[currentStep - 1].title}
            </CardTitle>
            <Progress value={(currentStep / 4) * 100} className="w-full" />
          </CardHeader>
          <CardContent>
            {renderStepContent()}
            <StepNavigation 
              currentStep={currentStep}
              totalSteps={4}
              onPrevious={handlePrevious}
              onNext={handleNext}
              language={language}
            />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default CompanySetup;
