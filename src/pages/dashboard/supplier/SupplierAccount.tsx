
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';

const SupplierAccount = () => {
  const { language } = useLanguage();
  
  return (
    <DashboardLayout role="supplier">
      <div className="flex flex-col gap-6">
        <h2 className="text-2xl font-bold">
          {language === 'en' ? 'Account Settings' : 'إعدادات الحساب'}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>{language === 'en' ? 'Profile Information' : 'معلومات الملف الشخصي'}</CardTitle>
                <CardDescription>
                  {language === 'en' ? 'Update your account details and company information' : 'تحديث تفاصيل حسابك ومعلومات الشركة'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="companyName">{language === 'en' ? 'Company Name' : 'اسم الشركة'}</Label>
                      <Input id="companyName" placeholder={language === 'en' ? 'Enter company name' : 'أدخل اسم الشركة'} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">{language === 'en' ? 'Email Address' : 'البريد الإلكتروني'}</Label>
                      <Input id="email" type="email" placeholder="example@company.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">{language === 'en' ? 'Phone Number' : 'رقم الهاتف'}</Label>
                      <Input id="phone" placeholder="+1 (555) 000-0000" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="website">{language === 'en' ? 'Website' : 'الموقع الإلكتروني'}</Label>
                      <Input id="website" placeholder="https://example.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="country">{language === 'en' ? 'Country' : 'الدولة'}</Label>
                      <Input id="country" placeholder={language === 'en' ? 'Select country' : 'اختر الدولة'} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">{language === 'en' ? 'City' : 'المدينة'}</Label>
                      <Input id="city" placeholder={language === 'en' ? 'Enter city' : 'أدخل المدينة'} />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="address">{language === 'en' ? 'Address' : 'العنوان'}</Label>
                      <Input id="address" placeholder={language === 'en' ? 'Enter full address' : 'أدخل العنوان الكامل'} />
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <Button type="submit">
                      {language === 'en' ? 'Save Changes' : 'حفظ التغييرات'}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>{language === 'en' ? 'Company Documents' : 'وثائق الشركة'}</CardTitle>
                <CardDescription>
                  {language === 'en' ? 'Upload your company registration and verification documents' : 'قم بتحميل وثائق تسجيل وتحقق الشركة'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border rounded-md p-4">
                      <h3 className="font-medium mb-2">{language === 'en' ? 'Trade License' : 'الرخصة التجارية'}</h3>
                      <p className="text-sm text-gray-500 mb-4">{language === 'en' ? 'PDF, JPG or PNG, max 2MB' : 'PDF أو JPG أو PNG، بحد أقصى 2 ميجابايت'}</p>
                      <Button variant="outline" size="sm">
                        {language === 'en' ? 'Upload Document' : 'تحميل المستند'}
                      </Button>
                    </div>
                    <div className="border rounded-md p-4">
                      <h3 className="font-medium mb-2">{language === 'en' ? 'Tax Registration' : 'التسجيل الضريبي'}</h3>
                      <p className="text-sm text-gray-500 mb-4">{language === 'en' ? 'PDF, JPG or PNG, max 2MB' : 'PDF أو JPG أو PNG، بحد أقصى 2 ميجابايت'}</p>
                      <div className="flex items-center gap-2">
                        <div className="text-sm text-green-600">{language === 'en' ? 'Uploaded' : 'تم التحميل'}</div>
                        <Badge className="bg-green-100 text-green-800">{language === 'en' ? 'Verified' : 'تم التحقق'}</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle>{language === 'en' ? 'Account Status' : 'حالة الحساب'}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>{language === 'en' ? 'Verification Status' : 'حالة التحقق'}</span>
                    <Badge className="bg-yellow-100 text-yellow-800">
                      {language === 'en' ? 'Pending' : 'قيد الانتظار'}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>{language === 'en' ? 'Membership' : 'العضوية'}</span>
                    <span className="text-sm font-medium">{language === 'en' ? 'Standard' : 'قياسية'}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>{language === 'en' ? 'Joined Date' : 'تاريخ الانضمام'}</span>
                    <span className="text-sm">{language === 'en' ? 'May 10, 2025' : '10 مايو 2025'}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>{language === 'en' ? 'RFQs Responded' : 'طلبات العروض التي تم الرد عليها'}</span>
                    <span className="text-sm">15</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>{language === 'en' ? 'Active Contracts' : 'العقود النشطة'}</span>
                    <span className="text-sm">3</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>{language === 'en' ? 'Security Settings' : 'إعدادات الأمان'}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button variant="outline" className="w-full">
                    {language === 'en' ? 'Change Password' : 'تغيير كلمة المرور'}
                  </Button>
                  <Button variant="outline" className="w-full">
                    {language === 'en' ? 'Enable Two-Factor Authentication' : 'تفعيل المصادقة الثنائية'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SupplierAccount;
