
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Mail, User, Globe } from 'lucide-react';

interface FormData {
  fullName: string;
  email: string;
  password: string;
  country: string;
  role: string;
}

interface RegistrationFormProps {
  formData: FormData;
  setFormData: (data: FormData) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ 
  formData, 
  setFormData, 
  onSubmit, 
  isLoading 
}) => {
  const { i18n } = useTranslation();

  const countries = [
    { value: 'sa', label: i18n.language === 'ar' ? 'السعودية' : 'Saudi Arabia' },
    { value: 'ae', label: i18n.language === 'ar' ? 'الإمارات' : 'UAE' },
    { value: 'eg', label: i18n.language === 'ar' ? 'مصر' : 'Egypt' },
    { value: 'jo', label: i18n.language === 'ar' ? 'الأردن' : 'Jordan' },
    { value: 'kw', label: i18n.language === 'ar' ? 'الكويت' : 'Kuwait' },
    { value: 'qa', label: i18n.language === 'ar' ? 'قطر' : 'Qatar' },
    { value: 'bh', label: i18n.language === 'ar' ? 'البحرين' : 'Bahrain' },
    { value: 'om', label: i18n.language === 'ar' ? 'عُمان' : 'Oman' },
  ];

  const roles = [
    { value: 'client', label: i18n.language === 'ar' ? 'عميل' : 'Client' },
    { value: 'supplier', label: i18n.language === 'ar' ? 'مورد' : 'Supplier' },
    { value: 'freelancer', label: i18n.language === 'ar' ? 'مستقل' : 'Freelancer' },
    { value: 'browse', label: i18n.language === 'ar' ? 'تصفح فقط' : 'Just Browse' },
  ];

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <Label htmlFor="fullName">{i18n.language === 'ar' ? 'الاسم الكامل' : 'Full Name'}</Label>
        <div className="relative">
          <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            id="fullName"
            type="text"
            placeholder={i18n.language === 'ar' ? 'أدخل اسمك الكامل' : 'Enter your full name'}
            value={formData.fullName}
            onChange={(e) => setFormData({...formData, fullName: e.target.value})}
            className="pl-10"
            required
          />
        </div>
      </div>
      
      <div>
        <Label htmlFor="email">{i18n.language === 'ar' ? 'البريد الإلكتروني' : 'Email'}</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            id="email"
            type="email"
            placeholder={i18n.language === 'ar' ? 'أدخل بريدك الإلكتروني' : 'Enter your email'}
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="pl-10"
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="country">{i18n.language === 'ar' ? 'البلد' : 'Country'}</Label>
        <Select value={formData.country} onValueChange={(value) => setFormData({...formData, country: value})}>
          <SelectTrigger>
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-gray-400" />
              <SelectValue placeholder={i18n.language === 'ar' ? 'اختر البلد' : 'Select Country'} />
            </div>
          </SelectTrigger>
          <SelectContent>
            {countries.map(country => (
              <SelectItem key={country.value} value={country.value}>{country.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="role">{i18n.language === 'ar' ? 'اختر الدور' : 'Select Role'}</Label>
        <Select value={formData.role} onValueChange={(value) => setFormData({...formData, role: value})}>
          <SelectTrigger>
            <SelectValue placeholder={i18n.language === 'ar' ? 'اختر الدور' : 'Select Role'} />
          </SelectTrigger>
          <SelectContent>
            {roles.map(role => (
              <SelectItem key={role.value} value={role.value}>{role.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? (i18n.language === 'ar' ? 'جاري إنشاء الحساب...' : 'Creating Account...') : (i18n.language === 'ar' ? 'إنشاء حساب' : 'Create Account')}
      </Button>
    </form>
  );
};

export default RegistrationForm;
