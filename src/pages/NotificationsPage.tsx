
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTranslation } from 'react-i18next';
import { 
  Bell, 
  CheckCircle, 
  AlertTriangle, 
  Info, 
  Clock, 
  Trash2, 
  Check,
  Settings,
  MessageSquare,
  DollarSign,
  FileText,
  Users
} from 'lucide-react';

const NotificationsPage = () => {
  const { i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState('all');

  const notifications = [
    {
      id: 1,
      title: i18n.language === 'ar' ? 'فاتورة جديدة مستحقة' : 'New Invoice Due',
      message: i18n.language === 'ar' 
        ? 'فاتورة INV-2024-002 مستحقة للدفع خلال 3 أيام'
        : 'Invoice INV-2024-002 is due for payment in 3 days',
      type: 'payment',
      priority: 'high',
      timestamp: '2024-01-15T10:30:00Z',
      read: false,
      icon: DollarSign
    },
    {
      id: 2,
      title: i18n.language === 'ar' ? 'عقد جديد بحاجة للمراجعة' : 'New Contract Needs Review',
      message: i18n.language === 'ar'
        ? 'عقد المعدات الطبية بحاجة لمراجعة وموافقة'
        : 'Medical Equipment contract needs review and approval',
      type: 'contract',
      priority: 'medium',
      timestamp: '2024-01-15T09:15:00Z',
      read: false,
      icon: FileText
    },
    {
      id: 3,
      title: i18n.language === 'ar' ? 'دعوة جديدة للمجموعة' : 'New Group Invitation',
      message: i18n.language === 'ar'
        ? 'تم دعوتك للانضمام لمجموعة "شراء معدات المكاتب"'
        : 'You have been invited to join "Office Equipment Procurement" group',
      type: 'group',
      priority: 'medium',
      timestamp: '2024-01-15T08:45:00Z',
      read: true,
      icon: Users
    },
    {
      id: 4,
      title: i18n.language === 'ar' ? 'تحديث نظام' : 'System Update',
      message: i18n.language === 'ar'
        ? 'سيتم إجراء صيانة للنظام غداً من 2:00 إلى 4:00 صباحاً'
        : 'System maintenance scheduled tomorrow from 2:00 AM to 4:00 AM',
      type: 'system',
      priority: 'low',
      timestamp: '2024-01-14T16:20:00Z',
      read: true,
      icon: Settings
    },
    {
      id: 5,
      title: i18n.language === 'ar' ? 'رسالة جديدة' : 'New Message',
      message: i18n.language === 'ar'
        ? 'لديك رسالة جديدة من مورد TechCorp Inc.'
        : 'You have a new message from supplier TechCorp Inc.',
      type: 'message',
      priority: 'medium',
      timestamp: '2024-01-14T14:10:00Z',
      read: false,
      icon: MessageSquare
    },
    {
      id: 6,
      title: i18n.language === 'ar' ? 'اكتمال الطلب' : 'Order Completed',
      message: i18n.language === 'ar'
        ? 'تم اكتمال طلب اللوازم المكتبية بنجاح'
        : 'Office supplies order has been completed successfully',
      type: 'order',
      priority: 'low',
      timestamp: '2024-01-14T11:30:00Z',
      read: true,
      icon: CheckCircle
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'high': return i18n.language === 'ar' ? 'عالي' : 'High';
      case 'medium': return i18n.language === 'ar' ? 'متوسط' : 'Medium';
      case 'low': return i18n.language === 'ar' ? 'منخفض' : 'Low';
      default: return priority;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'payment': return 'text-red-600 bg-red-50';
      case 'contract': return 'text-blue-600 bg-blue-50';
      case 'group': return 'text-purple-600 bg-purple-50';
      case 'system': return 'text-gray-600 bg-gray-50';
      case 'message': return 'text-green-600 bg-green-50';
      case 'order': return 'text-orange-600 bg-orange-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const filteredNotifications = (filter: string) => {
    switch (filter) {
      case 'unread': return notifications.filter(n => !n.read);
      case 'read': return notifications.filter(n => n.read);
      case 'high': return notifications.filter(n => n.priority === 'high');
      default: return notifications;
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return i18n.language === 'ar' ? 'منذ قليل' : 'Just now';
    if (diffInHours < 24) return i18n.language === 'ar' ? `منذ ${diffInHours} ساعة` : `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return i18n.language === 'ar' ? `منذ ${diffInDays} يوم` : `${diffInDays}d ago`;
  };

  const unreadCount = notifications.filter(n => !n.read).length;
  const highPriorityCount = notifications.filter(n => n.priority === 'high').length;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
              <Bell className="h-8 w-8" />
              {i18n.language === 'ar' ? 'الإشعارات' : 'Notifications'}
              {unreadCount > 0 && (
                <Badge className="bg-red-500 text-white">
                  {unreadCount}
                </Badge>
              )}
            </h1>
            <p className="text-gray-600">
              {i18n.language === 'ar' 
                ? 'تتبع جميع التحديثات والرسائل المهمة'
                : 'Stay updated with all important messages and alerts'
              }
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              {i18n.language === 'ar' ? 'الإعدادات' : 'Settings'}
            </Button>
            <Button size="sm">
              <CheckCircle className="h-4 w-4 mr-2" />
              {i18n.language === 'ar' ? 'قراءة الكل' : 'Mark All Read'}
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">
                    {i18n.language === 'ar' ? 'غير مقروءة' : 'Unread'}
                  </p>
                  <p className="text-2xl font-bold text-blue-600">{unreadCount}</p>
                </div>
                <Bell className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">
                    {i18n.language === 'ar' ? 'أولوية عالية' : 'High Priority'}
                  </p>
                  <p className="text-2xl font-bold text-red-600">{highPriorityCount}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">
                    {i18n.language === 'ar' ? 'المجموع' : 'Total'}
                  </p>
                  <p className="text-2xl font-bold text-gray-600">{notifications.length}</p>
                </div>
                <Info className="h-8 w-8 text-gray-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle>{i18n.language === 'ar' ? 'جميع الإشعارات' : 'All Notifications'}</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-6">
                <TabsTrigger value="all">
                  {i18n.language === 'ar' ? 'الكل' : 'All'}
                </TabsTrigger>
                <TabsTrigger value="unread">
                  {i18n.language === 'ar' ? 'غير مقروءة' : 'Unread'}
                </TabsTrigger>
                <TabsTrigger value="high">
                  {i18n.language === 'ar' ? 'أولوية عالية' : 'High Priority'}
                </TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab}>
                <div className="space-y-4">
                  {filteredNotifications(activeTab).map((notification) => (
                    <Card 
                      key={notification.id} 
                      className={`transition-all hover:shadow-md ${
                        !notification.read ? 'border-l-4 border-l-blue-500 bg-blue-50/30' : ''
                      }`}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-4 flex-1">
                            <div className={`p-2 rounded-lg ${getTypeColor(notification.type)}`}>
                              <notification.icon className="h-5 w-5" />
                            </div>
                            
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className={`font-semibold ${!notification.read ? 'font-bold' : ''}`}>
                                  {notification.title}
                                </h3>
                                {!notification.read && (
                                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                )}
                                <Badge className={getPriorityColor(notification.priority)}>
                                  {getPriorityText(notification.priority)}
                                </Badge>
                              </div>
                              
                              <p className="text-gray-600 text-sm mb-2">
                                {notification.message}
                              </p>
                              
                              <div className="flex items-center gap-2 text-xs text-gray-500">
                                <Clock className="h-3 w-3" />
                                {formatTime(notification.timestamp)}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 ml-4">
                            {!notification.read && (
                              <Button variant="ghost" size="sm">
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                            )}
                            <Button variant="ghost" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                {filteredNotifications(activeTab).length === 0 && (
                  <div className="text-center py-12">
                    <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      {i18n.language === 'ar' ? 'لا توجد إشعارات' : 'No notifications'}
                    </h3>
                    <p className="text-gray-600">
                      {i18n.language === 'ar' 
                        ? 'لا توجد إشعارات في هذه الفئة'
                        : 'No notifications in this category'
                      }
                    </p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NotificationsPage;
