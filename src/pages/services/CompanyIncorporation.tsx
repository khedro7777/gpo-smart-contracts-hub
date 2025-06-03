
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '@/contexts/LanguageContext';
import { Building2, Globe, Users, FileText, CheckCircle } from 'lucide-react';

const CompanyIncorporation = () => {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    companyName: '',
    jurisdiction: '',
    entityType: '',
    shareholders: '',
    businessActivity: '',
    email: '',
    phone: ''
  });

  const jurisdictions = [
    { value: 'eg', label: language === 'en' ? 'Egypt' : 'مصر', flag: '🇪🇬' },
    { value: 'uk', label: language === 'en' ? 'United Kingdom' : 'المملكة المتحدة', flag: '🇬🇧' },
    { value: 'us-de', label: language === 'en' ? 'Delaware, USA' : 'ديلاوير، الولايات المتحدة', flag: '🇺🇸' },
    { value: 'ae', label: language === 'en' ? 'UAE' : 'الإمارات العربية المتحدة', flag: '🇦🇪' },
    { value: 'sa', label: language === 'en' ? 'Saudi Arabia' : 'المملكة العربية السعودية', flag: '🇸🇦' },
  ];

  const entityTypes = [
    { value: 'llc', label: language === 'en' ? 'Limited Liability Company (LLC)' : 'شركة ذات مسؤولية محدودة' },
    { value: 'corp', label: language === 'en' ? 'Corporation' : 'شركة مساهمة' },
    { value: 'partnership', label: language === 'en' ? 'Partnership' : 'شراكة' },
    { value: 'branch', label: language === 'en' ? 'Branch Office' : 'مكتب فرع' },
    { value: 'subsidiary', label: language === 'en' ? 'Subsidiary' : 'شركة تابعة' },
  ];

  const benefits = [
    {
      icon: <Globe className="h-6 w-6" />,
      title: language === 'en' ? 'Global Reach' : 'وصول عالمي',
      description: language === 'en' 
        ? 'Establish presence in major business jurisdictions'
        : 'تأسيس حضور في الولايات القضائية التجارية الرئيسية'
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: language === 'en' ? 'Expert Guidance' : 'إرشاد الخبراء',
      description: language === 'en' 
        ? 'Professional legal and regulatory support'
        : 'دعم قانوني وتنظيمي محترف'
    },
    {
      icon: <CheckCircle className="h-6 w-6" />,
      title: language === 'en' ? 'Fast Processing' : 'معالجة سريعة',
      description: language === 'en' 
        ? 'Streamlined incorporation process'
        : 'عملية تأسيس مُبسطة'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Company incorporation form submitted:', formData);
    // Handle form submission logic here
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <Building2 className="h-16 w-16 text-blue-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {language === 'en' ? 'Company Incorporation Gateway' : 'بوابة تأسيس الشركات'}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {language === 'en' 
              ? 'Establish your business in the jurisdiction that best fits your needs with expert guidance and streamlined processes.'
              : 'أسس عملك في الولاية القضائية التي تناسب احتياجاتك بشكل أفضل مع إرشاد الخبراء والعمليات المُبسطة.'
            }
          </p>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {benefits.map((benefit, index) => (
            <Card key={index} className="text-center">
              <CardContent className="pt-6">
                <div className="flex justify-center mb-4 text-blue-600">
                  {benefit.icon}
                </div>
                <h3 className="font-semibold mb-2">{benefit.title}</h3>
                <p className="text-sm text-gray-600">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Incorporation Form */}
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-center">
              {language === 'en' ? 'Start Your Incorporation' : 'ابدأ تأسيس شركتك'}
            </CardTitle>
            <CardDescription className="text-center">
              {language === 'en' 
                ? 'Fill out this form to get started with your company incorporation'
                : 'املأ هذا النموذج للبدء في تأسيس شركتك'
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">
                    {language === 'en' ? 'Company Name' : 'اسم الشركة'} *
                  </Label>
                  <Input
                    id="companyName"
                    value={formData.companyName}
                    onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                    placeholder={language === 'en' ? 'Enter company name' : 'أدخل اسم الشركة'}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>{language === 'en' ? 'Jurisdiction' : 'الولاية القضائية'} *</Label>
                  <Select value={formData.jurisdiction} onValueChange={(value) => setFormData({...formData, jurisdiction: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder={language === 'en' ? 'Select jurisdiction' : 'اختر الولاية القضائية'} />
                    </SelectTrigger>
                    <SelectContent>
                      {jurisdictions.map((jurisdiction) => (
                        <SelectItem key={jurisdiction.value} value={jurisdiction.value}>
                          <div className="flex items-center gap-2">
                            <span>{jurisdiction.flag}</span>
                            <span>{jurisdiction.label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>{language === 'en' ? 'Entity Type' : 'نوع الكيان'} *</Label>
                  <Select value={formData.entityType} onValueChange={(value) => setFormData({...formData, entityType: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder={language === 'en' ? 'Select entity type' : 'اختر نوع الكيان'} />
                    </SelectTrigger>
                    <SelectContent>
                      {entityTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    {language === 'en' ? 'Number of Shareholders' : 'عدد المساهمين'} *
                  </Label>
                  <Select value={formData.shareholders} onValueChange={(value) => setFormData({...formData, shareholders: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder={language === 'en' ? 'Select number' : 'اختر العدد'} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">{language === 'en' ? '1 (Sole Proprietor)' : '1 (مالك وحيد)'}</SelectItem>
                      <SelectItem value="2-5">2-5</SelectItem>
                      <SelectItem value="6-10">6-10</SelectItem>
                      <SelectItem value="11+">{language === 'en' ? '11 or more' : '11 أو أكثر'}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">
                    {language === 'en' ? 'Email Address' : 'البريد الإلكتروني'} *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder={language === 'en' ? 'your@email.com' : 'your@email.com'}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">
                    {language === 'en' ? 'Phone Number' : 'رقم الهاتف'} *
                  </Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder={language === 'en' ? '+1 234 567 8900' : '+1 234 567 8900'}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="businessActivity">
                  {language === 'en' ? 'Business Activity Description' : 'وصف النشاط التجاري'}
                </Label>
                <Textarea
                  id="businessActivity"
                  value={formData.businessActivity}
                  onChange={(e) => setFormData({...formData, businessActivity: e.target.value})}
                  placeholder={language === 'en' 
                    ? 'Describe your main business activities...'
                    : 'اوصف أنشطتك التجارية الرئيسية...'
                  }
                  rows={3}
                />
              </div>

              <Button type="submit" className="w-full">
                {language === 'en' ? 'Submit Incorporation Request' : 'إرسال طلب التأسيس'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default CompanyIncorporation;
