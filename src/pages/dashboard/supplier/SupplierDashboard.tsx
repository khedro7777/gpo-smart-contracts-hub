
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

const SupplierDashboard = () => {
  const { language } = useLanguage();
  
  return (
    <DashboardLayout role="supplier">
      <h2 className="text-2xl font-bold mb-6">
        {language === 'en' ? 'Supplier Dashboard' : 'لوحة تحكم المورد'}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>{language === 'en' ? 'Active RFQs' : 'طلبات العروض النشطة'}</CardTitle>
            <CardDescription>{language === 'en' ? 'Requests for quotation' : 'طلبات عروض الأسعار'}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">5</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>{language === 'en' ? 'Active Orders' : 'الطلبات النشطة'}</CardTitle>
            <CardDescription>{language === 'en' ? 'Confirmed purchase orders' : 'أوامر الشراء المؤكدة'}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">2</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>{language === 'en' ? 'Invoices Issued' : 'الفواتير الصادرة'}</CardTitle>
            <CardDescription>{language === 'en' ? 'Payments to be received' : 'المدفوعات التي سيتم استلامها'}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">3</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{language === 'en' ? 'Recent RFQs' : 'طلبات العروض الأخيرة'}</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="pb-4 border-b">
                <p className="font-medium">{language === 'en' ? 'Office Equipment (Group A)' : 'معدات مكتبية (المجموعة أ)'}</p>
                <p className="text-sm text-gray-500">{language === 'en' ? 'Received 2 days ago' : 'تم استلامها منذ يومين'}</p>
              </li>
              <li className="pb-4 border-b">
                <p className="font-medium">{language === 'en' ? 'IT Hardware (Group B)' : 'أجهزة تكنولوجيا المعلومات (المجموعة ب)'}</p>
                <p className="text-sm text-gray-500">{language === 'en' ? 'Received 4 days ago' : 'تم استلامها منذ 4 أيام'}</p>
              </li>
              <li>
                <p className="font-medium">{language === 'en' ? 'Software Licenses (Group C)' : 'تراخيص البرمجيات (المجموعة ج)'}</p>
                <p className="text-sm text-gray-500">{language === 'en' ? 'Received 6 days ago' : 'تم استلامها منذ 6 أيام'}</p>
              </li>
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>{language === 'en' ? 'Active Groups' : 'المجموعات النشطة'}</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="pb-4 border-b">
                <p className="font-medium">{language === 'en' ? 'Tech Startup Collective' : 'مجموعة الشركات الناشئة التقنية'}</p>
                <p className="text-sm text-gray-500">{language === 'en' ? '15 members' : '15 عضواً'}</p>
              </li>
              <li className="pb-4 border-b">
                <p className="font-medium">{language === 'en' ? 'Healthcare Procurement Alliance' : 'تحالف المشتريات الصحية'}</p>
                <p className="text-sm text-gray-500">{language === 'en' ? '8 members' : '8 أعضاء'}</p>
              </li>
              <li>
                <p className="font-medium">{language === 'en' ? 'Educational Institutions Group' : 'مجموعة المؤسسات التعليمية'}</p>
                <p className="text-sm text-gray-500">{language === 'en' ? '12 members' : '12 عضواً'}</p>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default SupplierDashboard;
