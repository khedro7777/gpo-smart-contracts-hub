
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Globe, Phone } from 'lucide-react';

interface CompanyForm {
  name: string;
  type: string;
  country: string;
  industry: string;
  size: string;
  description: string;
  website: string;
  phone: string;
  email: string;
  address: string;
}

interface CompanyInfoStepProps {
  companyForm: CompanyForm;
  setCompanyForm: (form: CompanyForm) => void;
  language: 'en' | 'ar';
}

const CompanyInfoStep: React.FC<CompanyInfoStepProps> = ({ companyForm, setCompanyForm, language }) => {
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

  return (
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
  );
};

export default CompanyInfoStep;
