
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

const FreelancerDashboard = () => {
  const { language } = useLanguage();
  
  return (
    <DashboardLayout role="freelancer">
      <h2 className="text-2xl font-bold mb-6">
        {language === 'en' ? 'Freelancer Dashboard' : 'لوحة تحكم المستقل'}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>{language === 'en' ? 'Active Projects' : 'المشاريع النشطة'}</CardTitle>
            <CardDescription>{language === 'en' ? 'Your ongoing work' : 'العمل الجاري الخاص بك'}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">4</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>{language === 'en' ? 'Active Contracts' : 'العقود النشطة'}</CardTitle>
            <CardDescription>{language === 'en' ? 'Your signed agreements' : 'الاتفاقيات الموقعة الخاصة بك'}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">3</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>{language === 'en' ? 'Pending Invoices' : 'الفواتير المعلقة'}</CardTitle>
            <CardDescription>{language === 'en' ? 'Payments to be received' : 'المدفوعات التي سيتم استلامها'}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">2</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{language === 'en' ? 'Recent Projects' : 'المشاريع الأخيرة'}</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="pb-4 border-b">
                <p className="font-medium">{language === 'en' ? 'Translation Services for Group A' : 'خدمات الترجمة للمجموعة أ'}</p>
                <p className="text-sm text-gray-500">{language === 'en' ? 'Started 3 days ago' : 'بدأ منذ 3 أيام'}</p>
              </li>
              <li className="pb-4 border-b">
                <p className="font-medium">{language === 'en' ? 'Contract Review for Client B' : 'مراجعة العقد للعميل ب'}</p>
                <p className="text-sm text-gray-500">{language === 'en' ? 'Started 5 days ago' : 'بدأ منذ 5 أيام'}</p>
              </li>
              <li>
                <p className="font-medium">{language === 'en' ? 'Legal Consultation for Group C' : 'استشارة قانونية للمجموعة ج'}</p>
                <p className="text-sm text-gray-500">{language === 'en' ? 'Started 1 week ago' : 'بدأ منذ أسبوع'}</p>
              </li>
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>{language === 'en' ? 'Available Opportunities' : 'الفرص المتاحة'}</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="pb-4 border-b">
                <p className="font-medium">{language === 'en' ? 'Document Translation (English-Arabic)' : 'ترجمة مستندات (إنجليزي-عربي)'}</p>
                <p className="text-sm text-gray-500">{language === 'en' ? 'Group project' : 'مشروع جماعي'}</p>
              </li>
              <li className="pb-4 border-b">
                <p className="font-medium">{language === 'en' ? 'Contract Drafting for Tech Products' : 'صياغة عقد لمنتجات تقنية'}</p>
                <p className="text-sm text-gray-500">{language === 'en' ? 'Solo project' : 'مشروع فردي'}</p>
              </li>
              <li>
                <p className="font-medium">{language === 'en' ? 'Legal Review of Purchase Agreement' : 'مراجعة قانونية لاتفاقية شراء'}</p>
                <p className="text-sm text-gray-500">{language === 'en' ? 'Group project' : 'مشروع جماعي'}</p>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default FreelancerDashboard;
