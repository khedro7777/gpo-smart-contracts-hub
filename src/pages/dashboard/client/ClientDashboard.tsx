
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

const ClientDashboard = () => {
  const { language } = useLanguage();
  
  return (
    <DashboardLayout role="client">
      <h2 className="text-2xl font-bold mb-6">
        {language === 'en' ? 'Client Dashboard' : 'لوحة تحكم العميل'}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>{language === 'en' ? 'Active Groups' : 'المجموعات النشطة'}</CardTitle>
            <CardDescription>{language === 'en' ? 'Groups you are part of' : 'المجموعات التي أنت جزء منها'}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">3</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>{language === 'en' ? 'Active Contracts' : 'العقود النشطة'}</CardTitle>
            <CardDescription>{language === 'en' ? 'Your ongoing contracts' : 'العقود الجارية الخاصة بك'}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">2</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>{language === 'en' ? 'Pending Invoices' : 'الفواتير المعلقة'}</CardTitle>
            <CardDescription>{language === 'en' ? 'Invoices waiting for payment' : 'الفواتير التي تنتظر الدفع'}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">1</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{language === 'en' ? 'Recent Activities' : 'الأنشطة الأخيرة'}</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="pb-4 border-b">
                <p className="font-medium">{language === 'en' ? 'Group Contract Signed' : 'تم توقيع عقد المجموعة'}</p>
                <p className="text-sm text-gray-500">{language === 'en' ? '2 days ago' : 'منذ يومين'}</p>
              </li>
              <li className="pb-4 border-b">
                <p className="font-medium">{language === 'en' ? 'New Group Invitation' : 'دعوة مجموعة جديدة'}</p>
                <p className="text-sm text-gray-500">{language === 'en' ? '3 days ago' : 'منذ 3 أيام'}</p>
              </li>
              <li>
                <p className="font-medium">{language === 'en' ? 'Invoice Received' : 'تم استلام فاتورة'}</p>
                <p className="text-sm text-gray-500">{language === 'en' ? '5 days ago' : 'منذ 5 أيام'}</p>
              </li>
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>{language === 'en' ? 'Recommended Groups' : 'المجموعات الموصى بها'}</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="pb-4 border-b">
                <p className="font-medium">{language === 'en' ? 'Electronics Bulk Purchase' : 'شراء إلكترونيات بالجملة'}</p>
                <p className="text-sm text-gray-500">{language === 'en' ? '12 members' : '12 عضواً'}</p>
              </li>
              <li className="pb-4 border-b">
                <p className="font-medium">{language === 'en' ? 'Office Supplies Cooperative' : 'تعاونية مستلزمات المكاتب'}</p>
                <p className="text-sm text-gray-500">{language === 'en' ? '8 members' : '8 أعضاء'}</p>
              </li>
              <li>
                <p className="font-medium">{language === 'en' ? 'Software Licensing Group' : 'مجموعة تراخيص البرمجيات'}</p>
                <p className="text-sm text-gray-500">{language === 'en' ? '15 members' : '15 عضواً'}</p>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ClientDashboard;
