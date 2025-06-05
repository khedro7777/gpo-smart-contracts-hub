
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';
import { Mail, ArrowLeft } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface OTPVerificationProps {
  email: string;
  role: string;
  onBack: () => void;
}

const OTPVerification: React.FC<OTPVerificationProps> = ({ email, role, onBack }) => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const [otpCode, setOtpCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleOTPVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log('Verifying OTP:', { email, otp: otpCode, role });
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (otpCode.length === 6) {
        toast({
          title: i18n.language === 'ar' ? 'تم التحقق بنجاح' : 'Verification Successful',
          description: i18n.language === 'ar' ? 'تم التحقق من الحساب بنجاح!' : 'Account verified successfully!',
        });
        
        navigate(`/dashboard/${role}`);
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
      console.log('Resending OTP to:', email);
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: i18n.language === 'ar' ? 'تم إعادة الإرسال' : 'Code Resent',
        description: i18n.language === 'ar' ? 'تم إرسال رمز التحقق' : 'Verification code sent',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onBack}
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
  );
};

export default OTPVerification;
