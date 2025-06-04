
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
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
  const { i18n } = useTranslation();
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call with role-based logic
      const endpoint = authMode === 'register' ? '/api/auth/register' : '/api/auth/login';
      const payload = authMode === 'register' ? formData : { email: formData.email, password: formData.password };
      
      console.log(`Sending ${authMode} request to ${endpoint}:`, payload);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (authMode === 'register') {
        toast({
          title: i18n.language === 'ar' ? 'تم إنشاء الحساب' : 'Account Created',
          description: i18n.language === 'ar' ? 'تم إرسال رمز التحقق' : 'Verification code sent',
        });
        setCurrentStep('otp');
      } else {
        toast({
          title: i18n.language === 'ar' ? 'تم تسجيل الدخول بنجاح' : 'Login Successful',
          description: i18n.language === 'ar' ? 'أهلاً بعودتك!' : 'Welcome back!',
        });
        
        // Navigate based on role
        const targetRole = formData.role || 'client';
        navigate(`/dashboard/${targetRole}`);
      }
    } catch (error) {
      toast({
        title: i18n.language === 'ar' ? 'خطأ' : 'Error',
        description: i18n.language === 'ar' ? 'حدث خطأ. يرجى المحاولة مرة أخرى.' : 'Something went wrong. Please try again.',
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
      console.log('Verifying OTP:', { email: formData.email, otp: otpCode, role: formData.role });
      
      // Simulate OTP verification
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (otpCode.length === 6) {
        toast({
          title: i18n.language === 'ar' ? 'تم التحقق بنجاح' : 'Verification Successful',
          description: i18n.language === 'ar' ? 'تم التحقق من الحساب بنجاح!' : 'Account verified successfully!',
        });
        
        // Navigate based on selected role
        navigate(`/dashboard/${formData.role}`);
      } else {
        throw new Error('Invalid OTP');
      }
    } catch (error) {
      toast({
        title: i18n.language === 'ar' ? 'رمز غير صحيح' : 'Invalid Code',
        description: i18n.language === 'ar' ? 'يرجى التحقق من الرمز والمحاولة مرة أخرى.' : 'Please check your code and try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resendOTP = async () => {
    setIsLoading(true);
    try {
      console.log('Resending OTP to:', formData.email);
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: i18n.language === 'ar' ? 'تم إعادة الإرسال' : 'Code Resent',
        description: i18n.language === 'ar' ? 'تم إرسال رمز التحقق' : 'Verification code sent',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const sendCodeToEmail = async () => {
    if (!formData.email) {
      toast({
        title: i18n.language === 'ar' ? 'خطأ' : 'Error',
        description: i18n.language === 'ar' ? 'يرجى إدخال البريد الإلكتروني' : 'Please enter your email',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    try {
      console.log('Sending login code to:', formData.email);
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: i18n.language === 'ar' ? 'تم إرسال الرمز' : 'Code Sent',
        description: i18n.language === 'ar' ? 'تم إرسال رمز تسجيل الدخول' : 'Login code sent to your email',
      });
      setCurrentStep('otp');
    } finally {
      setIsLoading(false);
    }
  };

  if (currentStep === 'otp') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white p-4">
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
              <Mail className="h-8 w-8 text-blue-600" />
            </div>
            <CardTitle>{i18n.language === 'ar' ? 'التحقق من البريد الإلكتروني' : 'Email Verification'}</CardTitle>
            <CardDescription>
              {i18n.language === 'ar' ? 'تم إرسال رمز التحقق' : 'Verification code sent'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleOTPVerification} className="space-y-4">
              <div>
                <Label htmlFor="otp">{i18n.language === 'ar' ? 'أدخل الرمز' : 'Enter Code'}</Label>
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
                {isLoading ? (i18n.language === 'ar' ? 'جاري التحقق...' : 'Verifying...') : (i18n.language === 'ar' ? 'تأكيد تسجيل الدخول' : 'Confirm Login')}
              </Button>
              <Button type="button" variant="outline" onClick={resendOTP} className="w-full" disabled={isLoading}>
                {i18n.language === 'ar' ? 'إعادة إرسال الرمز' : 'Resend Code'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white p-4">
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
            <Shield className="h-8 w-8 text-blue-600" />
          </div>
          <CardTitle className="text-2xl">GPO SaaS</CardTitle>
          <CardDescription>
            {i18n.language === 'ar' ? 'انضم إلى منصة التعاقد الذكي' : 'Join the smart contracting platform'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={authMode} onValueChange={(value) => setAuthMode(value as 'login' | 'register')}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="register">{i18n.language === 'ar' ? 'تسجيل' : 'Register'}</TabsTrigger>
              <TabsTrigger value="login">{i18n.language === 'ar' ? 'دخول' : 'Login'}</TabsTrigger>
            </TabsList>
            
            <TabsContent value="register">
              <form onSubmit={handleSubmit} className="space-y-4">
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
            </TabsContent>
            
            <TabsContent value="login">
              <form onSubmit={handleSubmit} className="space-y-4">
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
                
                <Button type="button" variant="outline" className="w-full" onClick={sendCodeToEmail} disabled={isLoading}>
                  {i18n.language === 'ar' ? 'إرسال رمز للبريد الإلكتروني' : 'Send Code to Email'}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="mt-6 text-center text-sm text-gray-600">
            <div className="flex items-center gap-2 justify-center">
              <Shield className="h-4 w-4" />
              <span>{i18n.language === 'ar' ? 'حماية ضد القيود المعدلة' : 'Rate Limit Protection'}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
