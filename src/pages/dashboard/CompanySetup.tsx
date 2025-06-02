
import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Building2, 
  FileText, 
  Shield, 
  CreditCard, 
  CheckCircle,
  Upload,
  Users,
  Globe,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';

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

  const companyTypes = [
    { value: 'llc', label: language === 'en' ? 'Limited Liability Company (LLC)' : 'شركة ذات مسؤولية محدودة' },
    { value: 'corp', label: language === 'en' ? 'Corporation' : 'شركة مساهمة' },
    { value: 'partnership', label: language === 'en' ? 'Partnership' : 'شراكة' },
    { value: 'sole', label: language === 'en' ? 'Sole Proprietorship' : 'مؤسسة فردية' }
  ];

  const industries = [
    { value: 'tech', label: language === 'en' ? 'Technology' : 'التكنولوجيا' },
    { value: 'healthcare', label: language === 'en' ? 'Healthcare' : 'الرعاية الصحية' },
    { value: 'finance', label: language === 'en' ? 'Finance' : 'المالية' },
    { value: 'retail', label: language === 'en' ? 'Retail' : 'التجزئة' },
    { value: 'manufacturing', label: language === 'en' ? 'Manufacturing' : 'التصنيع' },
    { value: 'services', label: language === 'en' ? 'Services' : 'الخدمات' }
  ];

  const handleNext = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const handlePrevious = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
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

        {/* Progress Indicator */}
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                currentStep >= step.id 
                  ? 'bg-blue-600 border-blue-600 text-white' 
                  : 'border-gray-300 text-gray-400'
              }`}>
                {currentStep > step.id ? (
                  <CheckCircle className="h-5 w-5" />
                ) : (
                  <step.icon className="h-5 w-5" />
                )}
              </div>
              <span className={`ml-2 text-sm font-medium ${
                currentStep >= step.id ? 'text-blue-600' : 'text-gray-500'
              }`}>
                {step.title}
              </span>
              {index < steps.length - 1 && (
                <div className={`ml-4 w-16 h-0.5 ${
                  currentStep > step.id ? 'bg-blue-600' : 'bg-gray-300'
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {React.createElement(steps[currentStep - 1].icon, { className: "h-6 w-6" })}
              {steps[currentStep - 1].title}
            </CardTitle>
            <Progress value={(currentStep / 4) * 100} className="w-full" />
          </CardHeader>
          <CardContent>
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">
                      {language === 'en' ? 'Company Name' : 'اسم الشركة'} *
                    </Label>
                    <Input 
                      id="companyName"
                      value={companyForm.name}
                      onChange={(e) => setCompanyForm({...companyForm, name: e.target.value})}
                      placeholder={language === 'en' ? 'Enter company name' : 'أدخل اسم الشركة'}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>{language === 'en' ? 'Company Type' : 'نوع الشركة'} *</Label>
                    <Select value={companyForm.type} onValueChange={(value) => 
                      setCompanyForm({...companyForm, type: value})
                    }>
                      <SelectTrigger>
                        <SelectValue placeholder={language === 'en' ? 'Select company type' : 'اختر نوع الشركة'} />
                      </SelectTrigger>
                      <SelectContent>
                        {companyTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>{language === 'en' ? 'Country' : 'الدولة'} *</Label>
                    <Select value={companyForm.country} onValueChange={(value) => 
                      setCompanyForm({...companyForm, country: value})
                    }>
                      <SelectTrigger>
                        <SelectValue placeholder={language === 'en' ? 'Select country' : 'اختر الدولة'} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="uae">UAE</SelectItem>
                        <SelectItem value="saudi">Saudi Arabia</SelectItem>
                        <SelectItem value="egypt">Egypt</SelectItem>
                        <SelectItem value="qatar">Qatar</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>{language === 'en' ? 'Industry' : 'الصناعة'} *</Label>
                    <Select value={companyForm.industry} onValueChange={(value) => 
                      setCompanyForm({...companyForm, industry: value})
                    }>
                      <SelectTrigger>
                        <SelectValue placeholder={language === 'en' ? 'Select industry' : 'اختر الصناعة'} />
                      </SelectTrigger>
                      <SelectContent>
                        {industries.map((industry) => (
                          <SelectItem key={industry.value} value={industry.value}>
                            {industry.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>{language === 'en' ? 'Company Description' : 'وصف الشركة'}</Label>
                  <Textarea 
                    value={companyForm.description}
                    onChange={(e) => setCompanyForm({...companyForm, description: e.target.value})}
                    placeholder={language === 'en' 
                      ? 'Describe your company activities and services...'
                      : 'اوصف أنشطة وخدمات شركتك...'
                    }
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Globe className="h-4 w-4" />
                      {language === 'en' ? 'Website' : 'الموقع الإلكتروني'}
                    </Label>
                    <Input 
                      value={companyForm.website}
                      onChange={(e) => setCompanyForm({...companyForm, website: e.target.value})}
                      placeholder="https://example.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      {language === 'en' ? 'Phone Number' : 'رقم الهاتف'}
                    </Label>
                    <Input 
                      value={companyForm.phone}
                      onChange={(e) => setCompanyForm({...companyForm, phone: e.target.value})}
                      placeholder="+971 50 123 4567"
                    />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        {language === 'en' ? 'Trade License' : 'الرخصة التجارية'}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                        <p className="text-sm text-gray-600 mb-4">
                          {language === 'en' 
                            ? 'Upload your trade license document'
                            : 'حمل وثيقة الرخصة التجارية'
                          }
                        </p>
                        <Button variant="outline">
                          {language === 'en' ? 'Choose File' : 'اختر ملف'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        {language === 'en' ? 'Tax Certificate' : 'شهادة ضريبية'}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                        <p className="text-sm text-gray-600 mb-4">
                          {language === 'en' 
                            ? 'Upload your tax registration certificate'
                            : 'حمل شهادة التسجيل الضريبي'
                          }
                        </p>
                        <Button variant="outline">
                          {language === 'en' ? 'Choose File' : 'اختر ملف'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      {language === 'en' ? 'Additional Documents' : 'وثائق إضافية'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-sm text-gray-600">
                        {language === 'en' 
                          ? 'Upload any additional documents required for your industry or country'
                          : 'حمل أي وثائق إضافية مطلوبة لصناعتك أو بلدك'
                        }
                      </p>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                        <Button variant="outline">
                          {language === 'en' ? 'Upload Documents' : 'حمل الوثائق'}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="text-center">
                  <Shield className="h-16 w-16 mx-auto text-blue-600 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">
                    {language === 'en' ? 'Verification in Progress' : 'التحقق قيد التقدم'}
                  </h3>
                  <p className="text-gray-600">
                    {language === 'en' 
                      ? 'Our team is reviewing your documents. This process typically takes 2-3 business days.'
                      : 'يراجع فريقنا وثائقك. تستغرق هذه العملية عادة 2-3 أيام عمل.'
                    }
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <CheckCircle className="h-8 w-8 mx-auto text-green-600 mb-2" />
                      <p className="text-sm font-medium">
                        {language === 'en' ? 'Documents Received' : 'تم استلام الوثائق'}
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="h-8 w-8 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-2">
                        <Shield className="h-4 w-4 text-blue-600" />
                      </div>
                      <p className="text-sm font-medium">
                        {language === 'en' ? 'Under Review' : 'قيد المراجعة'}
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="h-8 w-8 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-2">
                        <CheckCircle className="h-4 w-4 text-gray-400" />
                      </div>
                      <p className="text-sm font-medium text-gray-400">
                        {language === 'en' ? 'Approval Pending' : 'في انتظار الموافقة'}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="text-center">
                  <CreditCard className="h-16 w-16 mx-auto text-blue-600 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">
                    {language === 'en' ? 'Payment Setup' : 'إعداد الدفع'}
                  </h3>
                  <p className="text-gray-600">
                    {language === 'en' 
                      ? 'Configure your payment methods and billing information'
                      : 'قم بتكوين طرق الدفع ومعلومات الفوترة'
                    }
                  </p>
                </div>

                <Tabs defaultValue="billing" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="billing">
                      {language === 'en' ? 'Billing Info' : 'معلومات الفوترة'}
                    </TabsTrigger>
                    <TabsTrigger value="payment">
                      {language === 'en' ? 'Payment Methods' : 'طرق الدفع'}
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="billing" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>{language === 'en' ? 'Billing Address' : 'عنوان الفوترة'}</Label>
                        <Textarea placeholder={language === 'en' ? 'Enter billing address' : 'أدخل عنوان الفوترة'} />
                      </div>
                      <div className="space-y-2">
                        <Label>{language === 'en' ? 'Tax ID' : 'الرقم الضريبي'}</Label>
                        <Input placeholder={language === 'en' ? 'Enter tax identification number' : 'أدخل رقم التعريف الضريبي'} />
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="payment" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <CreditCard className="h-6 w-6" />
                              <span>{language === 'en' ? 'Credit Card' : 'بطاقة ائتمان'}</span>
                            </div>
                            <Button variant="outline" size="sm">
                              {language === 'en' ? 'Add Card' : 'إضافة بطاقة'}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Building2 className="h-6 w-6" />
                              <span>{language === 'en' ? 'Bank Transfer' : 'تحويل مصرفي'}</span>
                            </div>
                            <Button variant="outline" size="sm">
                              {language === 'en' ? 'Setup' : 'إعداد'}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6">
              <Button 
                variant="outline" 
                onClick={handlePrevious}
                disabled={currentStep === 1}
              >
                {language === 'en' ? 'Previous' : 'السابق'}
              </Button>
              
              <Button 
                onClick={handleNext}
                disabled={currentStep === 4}
              >
                {currentStep === 4 
                  ? (language === 'en' ? 'Complete Setup' : 'إكمال الإعداد')
                  : (language === 'en' ? 'Next' : 'التالي')
                }
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default CompanySetup;
