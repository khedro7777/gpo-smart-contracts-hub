
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, Lock } from 'lucide-react';

interface FormData {
  email: string;
  password: string;
}

interface LoginFormProps {
  formData: FormData;
  setFormData: (data: FormData) => void;
  onSubmit: (e: React.FormEvent) => void;
  onSendCodeToEmail: () => void;
  isLoading: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({ 
  formData, 
  setFormData, 
  onSubmit, 
  onSendCodeToEmail, 
  isLoading 
}) => {
  const { i18n } = useTranslation();

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <Label htmlFor="loginEmail">{i18n.language === 'ar' ? 'البريد الإلكتروني' : 'Email'}</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            id="loginEmail"
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
        <Label htmlFor="password">{i18n.language === 'ar' ? 'كلمة المرور' : 'Password'}</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            id="password"
            type="password"
            placeholder={i18n.language === 'ar' ? 'أدخل كلمة المرور' : 'Enter your password'}
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            className="pl-10"
            required
          />
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? (i18n.language === 'ar' ? 'جاري تسجيل الدخول...' : 'Signing In...') : (i18n.language === 'ar' ? 'تسجيل دخول' : 'Sign In')}
      </Button>
      
      <Button type="button" variant="outline" className="w-full" onClick={onSendCodeToEmail} disabled={isLoading}>
        {i18n.language === 'ar' ? 'إرسال رمز للبريد الإلكتروني' : 'Send Code to Email'}
      </Button>
    </form>
  );
};

export default LoginForm;
