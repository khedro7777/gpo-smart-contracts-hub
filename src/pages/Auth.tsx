
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/utils/translations';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Globe, Shield, ArrowLeft } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Auth = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<'form' | 'otp'>('form');
  const [authMode, setAuthMode] = useState<'login' | 'register'>('register');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    country: '',
    role: ''
  });
  const [otpCode, setOtpCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const countries = [
    { value: 'sa', label: language === 'en' ? 'Saudi Arabia' : 'السعودية' },
    { value: 'ae', label: language === 'en' ? 'UAE' : 'الإمارات' },
    { value: 'eg', label: language === 'en' ? 'Egypt' : 'مصر' },
    { value: 'jo', label: language === 'en' ? 'Jordan' : 'الأردن' },
    { value: 'kw', label: language === 'en' ? 'Kuwait' : 'الكويت' },
    { value: 'qa', label: language === 'en' ? 'Qatar' : 'قطر' },
    { value: 'bh', label: language === 'en' ? 'Bahrain' : 'البحرين' },
    { value: 'om', label: language === 'en' ? 'Oman' : 'عُمان' },
  ];

  const roles = [
    { value: 'client', label: t('client', language) },
    { value: 'supplier', label: t('supplier', language) },
    { value: 'freelancer', label: t('freelancer', language) },
    { value: 'browse', label: t('justBrowse', language) },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (authMode === 'register') {
        toast({
          title: t('accountCreated', language),
          description: t('otpSent', language),
        });
        setCurrentStep('otp');
      } else {
        toast({
          title: t('loginSuccessful', language),
          description: language === 'en' ? 'Welcome back!' : 'أهلاً بعودتك!',
        });
        navigate('/dashboard/client');
      }
    } catch (error) {
      toast({
        title: language === 'en' ? 'Error' : 'خطأ',
        description: language === 'en' ? 'Something went wrong. Please try again.' : 'حدث خطأ. يرجى المحاولة مرة أخرى.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOTPVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate OTP verification
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (otpCode.length === 6) {
        toast({
          title: t('verificationSuccessful', language),
          description: language === 'en' ? 'Account verified successfully!' : 'تم التحقق من الحساب بنجاح!',
        });
        navigate('/dashboard/client');
      } else {
        throw new Error('Invalid OTP');
      }
    } catch (error) {
      toast({
        title: t('invalidCode', language),
        description: language === 'en' ? 'Please check your code and try again.' : 'يرجى التحقق من الرمز والمحاولة مرة أخرى.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resendOTP = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: language === 'en' ? 'Code Resent' : 'تم إعادة الإرسال',
        description: t('otpSent', language),
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (currentStep === 'otp') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gpo-lightBlue to-white p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setCurrentStep('form')}
                className="absolute left-4 top-4"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <Mail className="h-8 w-8 text-gpo-blue" />
            </div>
            <CardTitle>{t('emailVerification', language)}</CardTitle>
            <CardDescription>
              {t('otpSent', language)}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleOTPVerification} className="space-y-4">
              <div>
                <Label htmlFor="otp">{t('enterOTP', language)}</Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="123456"
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  maxLength={6}
                  className="text-center text-lg tracking-widest"
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading || otpCode.length !== 6}>
                {isLoading ? (language === 'en' ? 'Verifying...' : 'جاري التحقق...') : t('confirmLogin', language)}
              </Button>
              <Button type="button" variant="outline" onClick={resendOTP} className="w-full">
                {t('resendOTP', language)}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gpo-lightBlue to-white p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate('/')}
              className="absolute left-4 top-4"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <Shield className="h-8 w-8 text-gpo-blue" />
          </div>
          <CardTitle className="text-2xl">GPO SaaS</CardTitle>
          <CardDescription>
            {language === 'en' ? 'Join the smart contracting platform' : 'انضم إلى منصة التعاقد الذكي'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={authMode} onValueChange={(value) => setAuthMode(value as 'login' | 'register')}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="register">{t('register', language)}</TabsTrigger>
              <TabsTrigger value="login">{t('login', language)}</TabsTrigger>
            </TabsList>
            
            <TabsContent value="register">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="fullName">{t('fullName', language)}</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="fullName"
                      type="text"
                      placeholder={language === 'en' ? 'Enter your full name' : 'أدخل اسمك الكامل'}
                      value={formData.fullName}
                      onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="email">{t('email', language)}</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder={language === 'en' ? 'Enter your email' : 'أدخل بريدك الإلكتروني'}
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="country">{t('country', language)}</Label>
                  <Select value={formData.country} onValueChange={(value) => setFormData({...formData, country: value})}>
                    <SelectTrigger>
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4 text-gray-400" />
                        <SelectValue placeholder={t('selectCountry', language)} />
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
                  <Label htmlFor="role">{t('selectRole', language)}</Label>
                  <Select value={formData.role} onValueChange={(value) => setFormData({...formData, role: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder={t('selectRole', language)} />
                    </SelectTrigger>
                    <SelectContent>
                      {roles.map(role => (
                        <SelectItem key={role.value} value={role.value}>{role.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (language === 'en' ? 'Creating Account...' : 'جاري إنشاء الحساب...') : t('createAccount', language)}
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="login">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="loginEmail">{t('email', language)}</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="loginEmail"
                      type="email"
                      placeholder={language === 'en' ? 'Enter your email' : 'أدخل بريدك الإلكتروني'}
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="password">{t('password', language)}</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="password"
                      type="password"
                      placeholder={language === 'en' ? 'Enter your password' : 'أدخل كلمة المرور'}
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (language === 'en' ? 'Signing In...' : 'جاري تسجيل الدخول...') : t('signIn', language)}
                </Button>
                
                <Button type="button" variant="outline" className="w-full">
                  {t('sendCodeToEmail', language)}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="mt-6 text-center text-sm text-gray-600">
            <div className="flex items-center gap-2 justify-center">
              <Shield className="h-4 w-4" />
              <span>{t('rateLimitProtection', language)}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
