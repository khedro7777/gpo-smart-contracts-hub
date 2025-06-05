
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate } from 'react-router-dom';
import { Shield, ArrowLeft } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import OTPVerification from '@/components/auth/OTPVerification';
import RegistrationForm from '@/components/auth/RegistrationForm';
import LoginForm from '@/components/auth/LoginForm';

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
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const endpoint = authMode === 'register' ? '/api/auth/register' : '/api/auth/login';
      const payload = authMode === 'register' ? formData : { email: formData.email, password: formData.password };
      
      console.log(`Sending ${authMode} request to ${endpoint}:`, payload);
      
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
        <OTPVerification 
          email={formData.email}
          role={formData.role}
          onBack={() => setCurrentStep('form')}
        />
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
              <RegistrationForm 
                formData={formData}
                setFormData={setFormData}
                onSubmit={handleSubmit}
                isLoading={isLoading}
              />
            </TabsContent>
            
            <TabsContent value="login">
              <LoginForm 
                formData={{ email: formData.email, password: formData.password }}
                setFormData={(data) => setFormData({...formData, ...data})}
                onSubmit={handleSubmit}
                onSendCodeToEmail={sendCodeToEmail}
                isLoading={isLoading}
              />
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
