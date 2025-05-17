
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/utils/translations';

const SupplierNotifications = () => {
  const { language } = useLanguage();
  
  // Mock data for notifications
  const unreadNotifications = [
    {
      id: 1,
      title: language === 'en' ? 'New RFQ Received' : 'تم استلام طلب عرض أسعار جديد',
      description: language === 'en' ? 'You have received a new RFQ from Tech Startup Collective' : 'لقد استلمت طلب عرض أسعار جديد من مجموعة الشركات الناشئة التقنية',
      time: language === 'en' ? '2 hours ago' : 'منذ ساعتين',
      type: 'rfq',
    },
    {
      id: 2,
      title: language === 'en' ? 'Proposal Accepted' : 'تم قبول العرض',
      description: language === 'en' ? 'Your proposal for Healthcare Supplies has been accepted' : 'تم قبول عرضك الخاص بالمستلزمات الطبية',
      time: language === 'en' ? '1 day ago' : 'منذ يوم',
      type: 'success',
    },
  ];
  
  const readNotifications = [
    {
      id: 3,
      title: language === 'en' ? 'Payment Received' : 'تم استلام الدفعة',
      description: language === 'en' ? 'Payment of $35,200 has been processed for Software Licenses Bundle' : 'تمت معالجة دفعة بقيمة 35,200 دولار لحزمة تراخيص البرمجيات',
      time: language === 'en' ? '1 week ago' : 'منذ أسبوع',
      type: 'payment',
    },
    {
      id: 4,
      title: language === 'en' ? 'New Group Formed' : 'تم تشكيل مجموعة جديدة',
      description: language === 'en' ? 'A new purchasing group has been formed in your category' : 'تم تشكيل مجموعة شراء جديدة في فئتك',
      time: language === 'en' ? '2 weeks ago' : 'منذ أسبوعين',
      type: 'info',
    },
  ];
  
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'rfq':
        return (
          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><line x1="10" y1="9" x2="8" y2="9"></line></svg>
          </div>
        );
      case 'success':
        return (
          <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-700">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
          </div>
        );
      case 'payment':
        return (
          <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-700">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M16 8h-6.5a2.5 2.5 0 0 0 0 5h3a2.5 2.5 0 0 1 0 5H6"></path><line x1="12" y1="3" x2="12" y2="21"></line></svg>
          </div>
        );
      default:
        return (
          <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
          </div>
        );
    }
  };
  
  return (
    <DashboardLayout role="supplier">
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">
            {t('notifications', language)}
          </h2>
          <Button variant="outline">
            {t('markAllAsRead', language)}
          </Button>
        </div>
        
        <Tabs defaultValue="unread">
          <TabsList>
            <TabsTrigger value="unread">
              {t('unread', language)} 
              <Badge className="ml-2 bg-red-100 text-red-800 hover:bg-red-200">{unreadNotifications.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="all">{t('all', language)}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="unread">
            <Card className="w-full">
              <CardHeader>
                <CardTitle>{t('unreadNotifications', language)}</CardTitle>
                <CardDescription>
                  {t('unreadNotificationsDesc', language)}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {unreadNotifications.map((notification) => (
                    <div key={notification.id} className="flex gap-4">
                      {getNotificationIcon(notification.type)}
                      <div className="flex-1">
                        <h3 className="font-semibold">{notification.title}</h3>
                        <p className="text-sm text-gray-500">{notification.description}</p>
                        <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        {t('markAsRead', language)}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="all">
            <Card className="w-full">
              <CardHeader>
                <CardTitle>{t('allNotifications', language)}</CardTitle>
                <CardDescription>
                  {t('allNotificationsDesc', language)}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {unreadNotifications.concat(readNotifications).map((notification) => (
                    <React.Fragment key={notification.id}>
                      <div className="flex gap-4">
                        {getNotificationIcon(notification.type)}
                        <div className="flex-1">
                          <h3 className="font-semibold">{notification.title}</h3>
                          <p className="text-sm text-gray-500">{notification.description}</p>
                          <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                        </div>
                        {unreadNotifications.some(n => n.id === notification.id) && (
                          <Button variant="ghost" size="sm">
                            {t('markAsRead', language)}
                          </Button>
                        )}
                      </div>
                      <Separator />
                    </React.Fragment>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <Card className="w-full">
          <CardHeader>
            <CardTitle>{t('notificationSettings', language)}</CardTitle>
            <CardDescription>
              {t('notificationSettingsDesc', language)}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">{t('emailNotifications', language)}</h3>
                  <p className="text-sm text-gray-500">{t('receiveEmailNotifications', language)}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline">
                    {t('configure', language)}
                  </Button>
                </div>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">{t('pushNotifications', language)}</h3>
                  <p className="text-sm text-gray-500">{t('receivePushNotifications', language)}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline">
                    {t('configure', language)}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default SupplierNotifications;
