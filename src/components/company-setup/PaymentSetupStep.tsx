
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CreditCard, Building2 } from 'lucide-react';

interface PaymentSetupStepProps {
  language: 'en' | 'ar';
}

const PaymentSetupStep: React.FC<PaymentSetupStepProps> = ({ language }) => {
  return (
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
  );
};

export default PaymentSetupStep;
