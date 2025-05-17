
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/utils/translations';

const SupplierAccount = () => {
  const { language } = useLanguage();
  
  return (
    <DashboardLayout role="supplier">
      <div className="flex flex-col gap-6">
        <h2 className="text-2xl font-bold">
          {t('myAccount', language)}
        </h2>
        
        <Tabs defaultValue="profile">
          <TabsList>
            <TabsTrigger value="profile">{t('profile', language)}</TabsTrigger>
            <TabsTrigger value="company">{t('companyInfo', language)}</TabsTrigger>
            <TabsTrigger value="verification">{t('verification', language)}</TabsTrigger>
            <TabsTrigger value="payment">{t('payment', language)}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>{t('personalInformation', language)}</CardTitle>
                <CardDescription>{t('managePersonalInfo', language)}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">{t('fullName', language)}</Label>
                    <Input id="name" defaultValue="Mohammed Ahmed" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">{t('email', language)}</Label>
                    <Input id="email" type="email" defaultValue="mohammed@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">{t('phone', language)}</Label>
                    <Input id="phone" type="tel" defaultValue="+20 123 456 7890" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="position">{t('position', language)}</Label>
                    <Input id="position" defaultValue={language === 'en' ? "Sales Manager" : "مدير مبيعات"} />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>{t('save', language)}</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>{t('security', language)}</CardTitle>
                <CardDescription>{t('managePassword', language)}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">{t('currentPassword', language)}</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">{t('newPassword', language)}</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">{t('confirmPassword', language)}</Label>
                  <Input id="confirm-password" type="password" />
                </div>
              </CardContent>
              <CardFooter>
                <Button>{t('updatePassword', language)}</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="company" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>{t('companyInformation', language)}</CardTitle>
                <CardDescription>{t('manageCompanyInfo', language)}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="company-name">{t('companyName', language)}</Label>
                    <Input id="company-name" defaultValue={language === 'en' ? "Tech Solutions Inc." : "شركة الحلول التقنية"} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tax-id">{t('taxId', language)}</Label>
                    <Input id="tax-id" defaultValue="123456789" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">{t('address', language)}</Label>
                    <Input id="address" defaultValue={language === 'en' ? "123 Business St., Cairo" : "123 شارع الأعمال، القاهرة"} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">{t('website', language)}</Label>
                    <Input id="website" type="url" defaultValue="https://techsolutions.example.com" />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>{t('save', language)}</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>{t('businessDocuments', language)}</CardTitle>
                <CardDescription>{t('uploadDocuments', language)}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="commercial-register">{t('commercialRegister', language)}</Label>
                  <div className="flex items-center gap-2">
                    <Input id="commercial-register" type="file" />
                    <Button variant="outline">{t('upload', language)}</Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tax-certificate">{t('taxCertificate', language)}</Label>
                  <div className="flex items-center gap-2">
                    <Input id="tax-certificate" type="file" />
                    <Button variant="outline">{t('upload', language)}</Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>{t('saveDocuments', language)}</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="verification">
            <Card>
              <CardHeader>
                <CardTitle>{t('verificationStatus', language)}</CardTitle>
                <CardDescription>{t('verificationDesc', language)}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="h-10 w-10 rounded-full bg-green-500 flex items-center justify-center text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                    </div>
                    <div>
                      <h3 className="font-medium">{t('emailVerification', language)}</h3>
                      <p className="text-sm text-green-600">{t('verified', language)}</p>
                    </div>
                  </div>
                  <Separator />
                  
                  <div className="flex items-center gap-2">
                    <div className="h-10 w-10 rounded-full bg-green-500 flex items-center justify-center text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                    </div>
                    <div>
                      <h3 className="font-medium">{t('phoneVerification', language)}</h3>
                      <p className="text-sm text-green-600">{t('verified', language)}</p>
                    </div>
                  </div>
                  <Separator />
                  
                  <div className="flex items-center gap-2">
                    <div className="h-10 w-10 rounded-full bg-yellow-500 flex items-center justify-center text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                    </div>
                    <div>
                      <h3 className="font-medium">{t('businessVerification', language)}</h3>
                      <p className="text-sm text-yellow-600">{t('pending', language)}</p>
                    </div>
                  </div>
                  <Separator />
                  
                  <div className="flex items-center gap-2">
                    <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                    </div>
                    <div>
                      <h3 className="font-medium">{t('kycVerification', language)}</h3>
                      <p className="text-sm text-gray-500">{t('notStarted', language)}</p>
                    </div>
                    <Button variant="outline" size="sm">
                      {t('start', language)}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="payment">
            <Card>
              <CardHeader>
                <CardTitle>{t('paymentMethods', language)}</CardTitle>
                <CardDescription>{t('managePaymentMethods', language)}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-10 w-10 bg-blue-100 rounded-md flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"></rect><line x1="2" x2="22" y1="10" y2="10"></line></svg>
                      </div>
                      <div>
                        <h3 className="font-medium">{t('bankTransfer', language)}</h3>
                        <p className="text-sm text-gray-500">**** **** **** 5678</p>
                      </div>
                    </div>
                    <div>
                      <Badge className="bg-green-100 text-green-800">{t('primary', language)}</Badge>
                    </div>
                  </div>
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-10 w-10 bg-blue-100 rounded-md flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"></rect><line x1="2" x2="22" y1="10" y2="10"></line></svg>
                      </div>
                      <div>
                        <h3 className="font-medium">Visa</h3>
                        <p className="text-sm text-gray-500">**** **** **** 1234</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      {t('setAsPrimary', language)}
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>
                  {t('addPaymentMethod', language)}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default SupplierAccount;
